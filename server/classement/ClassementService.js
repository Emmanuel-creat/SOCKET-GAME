/**
 * ClassementService.js — classement général des joueurs, tous jeux confondus.
 *
 * IDENTITÉ D'UN JOUEUR : le couple (adresse IP publique, cid navigateur).
 *  - l'IP empêche de repartir de zéro en changeant simplement de pseudo ;
 *  - le cid (identifiant stable stocké par le navigateur, déjà utilisé pour la
 *    reconnexion) distingue plusieurs personnes derrière la même box.
 * Le PSEUDO affiché est le dernier utilisé par cette identité : on change de
 * nom quand on veut, le palmarès suit.
 *
 * COMPTAGE : une victoire par joueur du camp gagnant (jeux en équipe comme
 * Loup-Garou ou La Traque), une victoire pour le premier au score (jeux
 * individuels). C'est le module de jeu qui désigne les gagnants dans le
 * résultat de fin de partie.
 *
 * PERSISTANCE : un simple fichier JSON, écrit de façon différée (au plus une
 * écriture toutes les 2 s) pour ne pas solliciter le disque à chaque partie.
 *
 * ⚠️ LIMITE ASSUMÉE : le résultat de fin de partie est produit par le Host de
 * la partie (architecture host-autoritaire). Le classement est donc aussi
 * fiable que le Host — l'IP empêche le blanchiment par changement de pseudo,
 * elle n'empêche pas un Host malveillant de déclarer un faux résultat.
 */

import { creerStockage } from './stockage.js';

// Écriture groupée : sur un stockage distant (Gist), chaque écriture est un
// appel réseau. On attend donc quelques secondes après la dernière partie
// plutôt que d'écrire à chaque fin de partie.
const SAVE_DEBOUNCE_MS = 5000;
const RETRY_MS = 30_000;        // nouvelle tentative si le réseau a échoué
const MAX_ENTREES = 5000;          // garde-fou mémoire
const PSEUDO_MAX = 32;

/** Normalise une adresse IP (IPv6 mappée, proxy Render, valeur absente). */
export function normaliserIp(brut) {
  let ip = String(brut ?? '').trim();
  if (!ip) return 'inconnue';
  // Derrière un proxy (Render, Cloudflare…), x-forwarded-for peut contenir une
  // liste : « client, proxy1, proxy2 » — le client est le premier.
  if (ip.includes(',')) ip = ip.split(',')[0].trim();
  // IPv4 encapsulée en IPv6 : ::ffff:203.0.113.7
  if (ip.startsWith('::ffff:')) ip = ip.slice(7);
  return ip || 'inconnue';
}

/** Extrait l'IP d'un socket Socket.IO, en tenant compte du proxy. */
export function ipDeSocket(socket) {
  const head = socket?.handshake?.headers ?? {};
  return normaliserIp(head['x-forwarded-for'] || socket?.handshake?.address);
}

/** Clé d'identité : IP + cid. Sans cid, l'IP seule sert de repli. */
export function cleIdentite(ip, cid) {
  const i = normaliserIp(ip);
  const c = typeof cid === 'string' && cid ? cid.slice(0, 64) : '-';
  return `${i}|${c}`;
}

export class ClassementService {
  /**
   * @param {{lire:Function, ecrire:Function, nom:string}} [stockage]
   *   Adaptateur de persistance. Par défaut, choisi d'après l'environnement :
   *   GitHub Gist si GIST_ID + GITHUB_TOKEN sont fournis, fichier local sinon.
   */
  constructor(stockage = creerStockage()) {
    this.stockage = stockage;
    /** @type {Map<string, {pseudo:string, victoires:number, parties:number, parJeu:Object, maj:number}>} */
    this.entrees = new Map();
    this._timer = null;
    this._ecritureEnCours = false;
    this._aRejouer = false;      // une modification est arrivée pendant l'écriture
    this.pret = false;           // true une fois les données chargées
  }

  /**
   * Charge les données depuis le stockage. À appeler au démarrage. Un échec
   * (réseau, jeton invalide) n'empêche pas le serveur de tourner : le
   * classement démarre vide et repartira à la prochaine écriture réussie.
   */
  async charger() {
    try {
      const texte = await this.stockage.lire();
      if (!texte) { this.pret = true; return; }
      const brut = JSON.parse(texte);
      for (const [cle, val] of Object.entries(brut.entrees ?? {})) {
        this.entrees.set(cle, {
          pseudo: String(val.pseudo ?? '?').slice(0, PSEUDO_MAX),
          victoires: Number(val.victoires) || 0,
          parties: Number(val.parties) || 0,
          parJeu: val.parJeu && typeof val.parJeu === 'object' ? val.parJeu : {},
          maj: Number(val.maj) || 0,
        });
      }
      this.pret = true;
    } catch (err) {
      // Fichier illisible, corrompu ou stockage injoignable : on repart d'un
      // classement vide plutôt que d'empêcher le serveur de démarrer.
      this.entrees = new Map();
      this.pret = true;
      console.warn(`[classement] lecture impossible (${this.stockage.nom}) : ${err.message}`);
    }
  }

  /** Écriture différée : au plus une par SAVE_DEBOUNCE_MS. */
  planifierSauvegarde() {
    if (this._timer) return;
    this._timer = setTimeout(() => {
      this._timer = null;
      this.sauvegarder();
    }, SAVE_DEBOUNCE_MS);
    if (this._timer.unref) this._timer.unref();
  }

  /** Contenu du fichier de données, tel qu'il sera écrit. */
  serialiser() {
    const entrees = {};
    for (const [cle, val] of this.entrees) entrees[cle] = val;
    return JSON.stringify({ version: 1, maj: Date.now(), entrees });
  }

  /**
   * Écrit le fichier. Jamais deux écritures en parallèle : si des données
   * changent pendant un envoi réseau, une seconde écriture est enchaînée.
   * En cas d'échec, on retente plus tard — les données restent en mémoire
   * entre-temps, le service continue de fonctionner normalement.
   */
  async sauvegarder() {
    if (this._ecritureEnCours) { this._aRejouer = true; return; }
    this._ecritureEnCours = true;
    try {
      await this.stockage.ecrire(this.serialiser());
    } catch (err) {
      console.warn(`[classement] écriture impossible (${this.stockage.nom}) : ${err.message}`);
      // Nouvelle tentative différée : une coupure réseau ne doit pas perdre
      // définitivement les victoires accumulées depuis le démarrage.
      const t = setTimeout(() => this.sauvegarder(), RETRY_MS);
      if (t.unref) t.unref();
    } finally {
      this._ecritureEnCours = false;
      if (this._aRejouer) { this._aRejouer = false; this.planifierSauvegarde(); }
    }
  }

  /** Purge les entrées les plus anciennes si l'on dépasse le garde-fou. */
  elaguer() {
    if (this.entrees.size <= MAX_ENTREES) return;
    const tri = [...this.entrees.entries()].sort((a, b) => a[1].maj - b[1].maj);
    const aSupprimer = this.entrees.size - MAX_ENTREES;
    for (let i = 0; i < aSupprimer; i += 1) this.entrees.delete(tri[i][0]);
  }

  entree(cle) {
    let e = this.entrees.get(cle);
    if (!e) {
      e = { pseudo: '?', victoires: 0, parties: 0, parJeu: {}, maj: 0 };
      this.entrees.set(cle, e);
    }
    return e;
  }

  /**
   * Enregistre la fin d'une partie.
   * @param {{cle:string, pseudo:string, gagnant:boolean}[]} participants
   * @param {string} jeuId identifiant du jeu (pour le détail par jeu)
   */
  enregistrerPartie(participants, jeuId = 'inconnu') {
    for (const p of participants) {
      if (!p?.cle) continue;
      const e = this.entree(p.cle);
      // Le pseudo affiché est TOUJOURS le dernier utilisé par cette identité.
      if (p.pseudo) e.pseudo = String(p.pseudo).slice(0, PSEUDO_MAX);
      e.parties += 1;
      if (p.gagnant) {
        e.victoires += 1;
        e.parJeu[jeuId] = (e.parJeu[jeuId] || 0) + 1;
      }
      e.maj = Date.now();
    }
    this.elaguer();
    this.planifierSauvegarde();
  }

  /**
   * Restaure un classement depuis un fichier téléversé (même format que celui
   * produit par serialiser()). Utile après un redéploiement sur un hébergement
   * où le disque est effacé : on re-téléverse le dernier fichier téléchargé.
   *
   * FUSION plutôt qu'écrasement : pour chaque joueur, on garde le meilleur des
   * deux totaux. Ainsi, restaurer une vieille sauvegarde n'efface pas les
   * parties jouées depuis.
   *
   * @returns {number} nombre de joueurs après import, ou -1 si le fichier est invalide
   */
  importer(donnees) {
    const brut = donnees?.entrees;
    if (!brut || typeof brut !== 'object') return -1;
    for (const [cle, val] of Object.entries(brut)) {
      if (!val || typeof val !== 'object') continue;
      const victoires = Number(val.victoires) || 0;
      const parties = Number(val.parties) || 0;
      const e = this.entree(cle);
      // On ne régresse jamais : le total le plus élevé gagne.
      if (victoires >= e.victoires) {
        e.victoires = victoires;
        e.parJeu = (val.parJeu && typeof val.parJeu === 'object') ? val.parJeu : e.parJeu;
        if (val.pseudo) e.pseudo = String(val.pseudo).slice(0, PSEUDO_MAX);
      }
      e.parties = Math.max(e.parties, parties);
      e.maj = Math.max(e.maj, Number(val.maj) || Date.now());
    }
    this.elaguer();
    this.planifierSauvegarde();
    return this.entrees.size;
  }

  /** Classement trié : victoires décroissantes, puis ratio, puis parties. */
  top(limite = 50) {
    return [...this.entrees.values()]
      .filter((e) => e.parties > 0)
      .sort((a, b) => (b.victoires - a.victoires)
        || ((b.victoires / b.parties) - (a.victoires / a.parties))
        || (b.parties - a.parties))
      .slice(0, Math.max(1, Math.min(200, limite)))
      .map((e, i) => ({
        rang: i + 1,
        pseudo: e.pseudo,
        victoires: e.victoires,
        parties: e.parties,
        ratio: e.parties ? Math.round((e.victoires / e.parties) * 100) : 0,
        parJeu: e.parJeu,
      }));
  }

  /** Statistiques d'une identité précise (pour afficher « votre rang »). */
  pour(cle) {
    const e = this.entrees.get(cle);
    if (!e || !e.parties) return null;
    const tous = this.top(200);
    const trouve = tous.find((t) => t.pseudo === e.pseudo && t.victoires === e.victoires);
    return {
      pseudo: e.pseudo,
      victoires: e.victoires,
      parties: e.parties,
      ratio: e.parties ? Math.round((e.victoires / e.parties) * 100) : 0,
      rang: trouve ? trouve.rang : null,
      parJeu: e.parJeu,
    };
  }
}
