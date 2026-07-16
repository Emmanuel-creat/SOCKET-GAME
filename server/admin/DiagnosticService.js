/**
 * DiagnosticService — batterie de tests réseau CONTRE UN CLIENT CIBLÉ, lancée
 * depuis la page programmeur (bouton « 🩺 Diagnostiquer » sur une ligne du
 * tableau des clients connectés).
 *
 * Pourquoi ce service existe : « mon perso avance, puis revient à sa position
 * initiale — le Host n'a jamais reçu mon déplacement ». La prédiction locale
 * fonctionne (elle ne dépend pas du réseau) ; le doute porte sur la
 * TRANSMISSION des commandes. Ce service mesure exactement ça, en cinq temps,
 * du plus général au plus spécifique :
 *
 *   1. Répondant     — le client répond-il encore ?
 *   2. RTT / gigue    — salve de pings au même pas que le moteur (50 ms).
 *   3. Débit soutenu  — rafale sans délai : perd-on des messages sous charge ?
 *   4. Charge utile   — l'intégrité survit-elle à une commande / une vue / un labyrinthe ?
 *   5. Relais en partie (game:message) — LE test qui compte : on ne simule
 *      rien, on fait emprunter au client le même chemin qu'une vraie commande
 *      (`sendGameMessage`), avec les mêmes vérifications serveur (salon
 *      IN_GAME, destinataire trouvé). Si les tests 1-4 passent mais que
 *      celui-ci échoue, le problème n'est pas le réseau : il est dans le
 *      relais ciblé lui-même (salon plus IN_GAME, identifiant qui a changé,
 *      etc.) — exactement le genre de panne silencieuse qu'un joueur ne peut
 *      pas voir depuis son écran.
 *
 * Rien ici ne touche au moteur d'un jeu : les paquets `t:'diag'` transitent
 * par le canal réel `game:message`, mais aucun module de jeu ne les
 * reconnaît (ils utilisent `t:'action'`/`'view'`/`'error'`) — le client les
 * intercepte avant qu'ils n'atteignent le module, dans SocketClient.js.
 */
import { EVENTS } from '../../shared/events.js';
import { ROOM_STATUS } from '../../shared/constants.js';

const PING_N = 24; // salve RTT : 24 échantillons au pas du moteur
const PING_PACE_MS = 50; // le même pas que predictor.js / engine.js — pas un hasard
const PING_TIMEOUT_MS = PING_N * PING_PACE_MS + 2500;

const BURST_N = 150; // débit soutenu : rafale sans délai
const BURST_TIMEOUT_MS = 4000;

const PAYLOADS = [
  { label: 'léger (≈ une commande, 80 o)', size: 80 },
  { label: 'moyen (≈ une vue de jeu, 1 Ko)', size: 1024 },
  { label: 'lourd (≈ un labyrinthe, 20 Ko)', size: 20 * 1024 },
];
const PAYLOAD_TIMEOUT_MS = 3000;

const ECHO_N = 60; // relais game:message réel
const ECHO_PACE_MS = 50;
const ECHO_TIMEOUT_MS = 6000;

/** Chaîne pseudo-aléatoire de longueur `n`, pour vérifier qu'un paquet arrive intact. */
function chargeAleatoire(n) {
  let s = '';
  while (s.length < n) s += Math.random().toString(36).slice(2);
  return s.slice(0, n);
}

function idAleatoire() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export class DiagnosticService {
  constructor({ io, users, rooms }) {
    this.io = io;
    this.users = users;
    this.rooms = rooms;
    this.enCours = new Set(); // socketId cible : un seul diagnostic à la fois par client
  }

  /**
   * Point d'entrée : lance la batterie contre `targetSocketId`, et rapporte
   * la progression + le résultat final sur `adminSocket`.
   */
  async lancer(adminSocket, targetSocketId) {
    const progres = (etape, ok, detail) => adminSocket.emit(EVENTS.DIAG_PROGRESS, { etape, ok, detail });
    const rater = (erreur) => adminSocket.emit(EVENTS.DIAG_RESULT, { erreur });

    if (typeof targetSocketId !== 'string' || !targetSocketId) return rater('Client cible manquant.');
    const cible = this.io.sockets.sockets.get(targetSocketId);
    const user = this.users.get(targetSocketId);
    if (!cible || !user) return rater('Ce client est introuvable — déconnecté depuis l\'ouverture du tableau ?');
    if (this.enCours.has(targetSocketId)) return rater('Un diagnostic est déjà en cours pour ce client.');

    this.enCours.add(targetSocketId);
    const rapport = { pseudo: user.pseudo, socketId: targetSocketId, debut: Date.now(), etapes: [] };
    const noter = (nom, ok, detail) => {
      rapport.etapes.push({ nom, ok, detail });
      progres(nom, ok, detail);
    };

    try {
      // 1) Répondant
      progres('Répondant', null, 'ping unique…');
      const rep = await this.ping(cible, [0], 3000, 0);
      const repOk = rep.recus === 1;
      noter('Répondant', repOk, repOk ? `répond en ${rep.latences[0]} ms` : 'aucune réponse sous 3 s — client injoignable');
      if (!repOk) {
        noter('Diagnostic interrompu', false, 'le client ne répond plus, les tests suivants n\'auraient aucun sens');
        this.finir(adminSocket, rapport, targetSocketId);
        return;
      }

      // 2) RTT / gigue
      progres('RTT / gigue', null, `salve de ${PING_N} pings, cadence ${PING_PACE_MS} ms…`);
      const seqsRtt = Array.from({ length: PING_N }, (_, i) => i);
      const rtt = await this.ping(cible, seqsRtt, PING_TIMEOUT_MS, PING_PACE_MS);
      const perteRtt = Math.round((1 - rtt.recus / PING_N) * 100);
      const moy = rtt.latences.length ? Math.round(rtt.latences.reduce((a, b) => a + b, 0) / rtt.latences.length) : null;
      const min = rtt.latences.length ? Math.min(...rtt.latences) : null;
      const max = rtt.latences.length ? Math.max(...rtt.latences) : null;
      const variance = rtt.latences.length ? rtt.latences.reduce((s, x) => s + (x - moy) ** 2, 0) / rtt.latences.length : 0;
      const gigue = Math.round(Math.sqrt(variance));
      noter(
        'RTT / gigue',
        perteRtt < 10 && (moy === null || moy < 300),
        `${rtt.recus}/${PING_N} reçus (${perteRtt}% perte) · moyenne ${moy ?? '—'} ms · min ${min ?? '—'} · max ${max ?? '—'} · gigue ${gigue} ms`,
      );

      // 3) Débit soutenu
      progres('Débit soutenu', null, `rafale de ${BURST_N} messages, sans délai…`);
      const t0 = Date.now();
      const seqsBurst = Array.from({ length: BURST_N }, (_, i) => i);
      const burst = await this.ping(cible, seqsBurst, BURST_TIMEOUT_MS, 0);
      const dureeS = Math.max(0.001, (Date.now() - t0) / 1000);
      const debit = Math.round(burst.recus / dureeS);
      const perteBurst = Math.round((1 - burst.recus / BURST_N) * 100);
      noter(
        'Débit soutenu',
        perteBurst < 15,
        `${burst.recus}/${BURST_N} reçus en ${dureeS.toFixed(2)} s (${perteBurst}% perte) · ≈ ${debit} msg/s`,
      );

      // 4) Charge utile : latence + intégrité par taille
      progres('Intégrité charge utile', null, 'trois tailles de charge…');
      const resPayloads = [];
      for (const p of PAYLOADS) {
        const payload = chargeAleatoire(p.size);
        // eslint-disable-next-line no-await-in-loop -- volontairement séquentiel : on isole chaque taille
        const r = await this.pingCharge(cible, payload, PAYLOAD_TIMEOUT_MS);
        resPayloads.push({ ...p, ...r });
      }
      const payloadOk = resPayloads.every((r) => r.ok);
      noter(
        'Intégrité charge utile',
        payloadOk,
        resPayloads.map((r) => `${r.label} : ${r.ok ? `${r.latence} ms, intact` : (r.latence === null ? 'perdu (timeout)' : 'ALTÉRÉ en transit')}`).join(' · '),
      );

      // 5) Cohérence salon / identité — ce que le SERVEUR voit réellement pour ce
      // client, avant même de tester le relais. Ça remplace la devinette par un
      // fait : est-ce que `room.has(user.id)` (la vérification qui garde le
      // relais ciblé) est vraie en ce moment, pour ce client précis ?
      const roomActuel = user.roomId ? this.rooms.get(user.roomId) : null;
      if (!roomActuel) {
        noter('Cohérence salon (vu par le serveur)', null, 'ce client n\'est associé à aucun salon en ce moment');
      } else {
        const present = roomActuel.has(user.id);
        const estHost = roomActuel.isHost(user.id);
        noter(
          'Cohérence salon (vu par le serveur)',
          present,
          `salon « ${roomActuel.name} » (${roomActuel.status}) · ${roomActuel.players.length} joueur(s) listé(s) · `
          + `ce client est-il dans room.players ? ${present ? 'OUI' : 'NON — c\'est la cause : la vérification qui garde le relais ciblé échoue pour lui'} · `
          + `Host de ce salon ? ${estHost ? 'oui' : 'non'}`,
        );
      }

      // 6) Relais réel game:message — seulement si le client est actuellement en partie
      const room = user.roomId ? this.rooms.get(user.roomId) : null;
      if (!room || room.status !== ROOM_STATUS.IN_GAME) {
        noter('Relais en partie (game:message)', null, 'non applicable — ce client n\'est pas en partie en ce moment');
      } else {
        progres('Relais en partie (game:message)', null, `${ECHO_N} paquets via le relais réel du jeu…`);
        const echo = await this.echoRelais(cible, ECHO_N, ECHO_PACE_MS, ECHO_TIMEOUT_MS);
        if (echo.timeout && echo.recus === 0) {
          noter(
            'Relais en partie (game:message)',
            false,
            'AUCUN paquet revenu — le relais game:message ne fonctionne pas pour ce client en ce moment (salon plus IN_GAME, identifiant obsolète, ou transport bloqué)',
          );
        } else {
          const perteEcho = Math.round((1 - echo.recus / ECHO_N) * 100);
          noter(
            'Relais en partie (game:message)',
            perteEcho < 5,
            `${echo.recus}/${ECHO_N} paquets revenus par le relais réel (${perteEcho}% perte) · latence moyenne ${echo.moy ?? '—'} ms`,
          );
        }
      }

      rapport.fin = Date.now();
      this.finir(adminSocket, rapport, targetSocketId);
    } catch (e) {
      this.enCours.delete(targetSocketId);
      rater(`Diagnostic interrompu par une erreur : ${e.message}`);
    }
  }

  finir(adminSocket, rapport, targetSocketId) {
    this.enCours.delete(targetSocketId);
    adminSocket.emit(EVENTS.DIAG_RESULT, rapport);
  }

  /**
   * Salve de pings bruts (hors salon, hors jeu) : mesure combien reviennent
   * et en combien de temps. `paceMs` = 0 pour une rafale sans délai (test de
   * débit), > 0 pour une cadence régulière (test de RTT/gigue).
   */
  ping(cible, seqs, timeoutMs, paceMs) {
    return new Promise((resolve) => {
      const id = idAleatoire();
      const attendus = new Map(seqs.map((s) => [s, null]));
      let fini = false;

      const terminer = () => {
        if (fini) return;
        fini = true;
        cible.off(EVENTS.DIAG_PONG, onPong);
        const latences = [...attendus.values()].filter((v) => v !== null);
        resolve({ recus: latences.length, latences });
      };

      let i = 0;
      const onPong = (data) => {
        if (fini || data?.id !== id || !attendus.has(data.seq)) return;
        if (attendus.get(data.seq) === null) attendus.set(data.seq, Date.now() - data.sentAt);
        // Tout est arrivé (et tout a été envoyé) : inutile d'attendre le délai
        // maximum jusqu'au bout — un aller-retour rapide ne doit pas coûter
        // le prix d'un aller-retour lent.
        if (i >= seqs.length && [...attendus.values()].every((v) => v !== null)) terminer();
      };
      cible.on(EVENTS.DIAG_PONG, onPong);

      const envoyer = () => {
        if (fini || i >= seqs.length) return;
        if (!cible.connected) { terminer(); return; }
        cible.emit(EVENTS.DIAG_PING, { id, seq: seqs[i], sentAt: Date.now() });
        i += 1;
        if (i < seqs.length) setTimeout(envoyer, paceMs);
      };
      envoyer();
      setTimeout(terminer, timeoutMs);
    });
  }

  /** Un seul aller-retour avec charge utile : latence + vérification d'intégrité octet pour octet. */
  pingCharge(cible, payload, timeoutMs) {
    return new Promise((resolve) => {
      const id = idAleatoire();
      const sentAt = Date.now();
      let fini = false;

      const onPong = (data) => {
        if (fini || data?.id !== id) return;
        fini = true;
        cible.off(EVENTS.DIAG_PONG, onPong);
        resolve({ ok: data.payload === payload, latence: Date.now() - sentAt });
      };
      cible.on(EVENTS.DIAG_PONG, onPong);
      cible.emit(EVENTS.DIAG_PING, { id, seq: 0, sentAt, payload });
      setTimeout(() => {
        if (fini) return;
        fini = true;
        cible.off(EVENTS.DIAG_PONG, onPong);
        resolve({ ok: false, latence: null });
      }, timeoutMs);
    });
  }

  /**
   * LE test qui compte : demande au client de s'envoyer À LUI-MÊME `count`
   * paquets réels via `sendGameMessage` (même fonction que toutes les
   * commandes de jeu), et attend son propre bilan. Le serveur ne fait ici
   * QUE lancer la demande et récupérer le rapport — le relais lui-même est
   * le relais `GAME_MESSAGE` de production, inchangé, sans raccourci.
   */
  echoRelais(cible, count, paceMs, timeoutMs) {
    return new Promise((resolve) => {
      const id = idAleatoire();
      let fini = false;

      const onReport = (data) => {
        if (fini || data?.id !== id) return;
        fini = true;
        cible.off(EVENTS.DIAG_ECHO_REPORT, onReport);
        resolve({ recus: data.recus ?? 0, moy: data.moy ?? null, timeout: false });
      };
      cible.on(EVENTS.DIAG_ECHO_REPORT, onReport);
      cible.emit(EVENTS.DIAG_ECHO_REQUEST, { id, count, paceMs });

      setTimeout(() => {
        if (fini) return;
        fini = true;
        cible.off(EVENTS.DIAG_ECHO_REPORT, onReport);
        resolve({ recus: 0, moy: null, timeout: true });
      }, timeoutMs);
    });
  }
}
