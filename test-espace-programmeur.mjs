/**
 * PREUVE — l'espace programmeur revit : authentification, stats, diagnostic.
 *
 * Le zip déployé avait perdu tout le câblage (events.js, SocketClient.js et
 * registerSocketHandlers.js revenus à une génération antérieure à l'espace
 * programmeur) : le serveur n'écoutait plus admin:auth, le client n'avait plus
 * de quoi l'émettre. Ce test vérifie la chaîne reconstruite, de bout en bout,
 * sur le vrai serveur :
 *
 *   1. mauvais code  → refus propre, avec compte d'essais restants (pas de déconnexion !)
 *   2. bon code      → accès + réception des stats
 *   3. non-admin     → diag:run ignoré (garde de sécurité)
 *   4. diagnostic complet contre un client EN PARTIE (répondant, RTT, débit,
 *      intégrité, relais auto + croisé via le vrai canal game:message)
 *
 * Les clients de ce test embarquent les mêmes répondeurs diag que le
 * SocketClient livré (miroir fidèle de surPaquetDiag/lancerEcho/finirEcho).
 */
import { io } from 'socket.io-client';

const URL = 'http://localhost:3000';
const CODE = process.env.ADMIN_CODE || '200307';
const attendre = (ms) => new Promise((r) => setTimeout(r, ms));
function client(n) { return new Promise((res, rej) => { const s = io(URL, { transports: ['websocket'], forceNew: true }); s.on('connect', () => res(s)); s.on('connect_error', (e) => rej(new Error(n + ' ' + e.message))); setTimeout(() => rej(new Error(n + ' timeout')), 4000); }); }
const evt = (s, ev, ms = 6000) => new Promise((res, rej) => { const to = setTimeout(() => rej(new Error('timeout ' + ev)), ms); s.once(ev, (d) => { clearTimeout(to); res(d); }); });
const demander = (s, e, p, r) => { const q = evt(s, r); s.emit(e, p); return q; };

/** Équipe un client des répondeurs diagnostic — miroir du SocketClient livré. */
function equiperDiag(s, monUserId) {
  const etat = { echo: null };
  s.on('diag:ping', (paquet) => s.emit('diag:pong', paquet));
  s.on('game:message', ({ from, data }) => {
    if (data?.t !== 'diag') return;
    const e = etat.echo;
    if (e && data.id === e.id) {
      if (!e.vus.has(data.seq)) {
        e.vus.add(data.seq);
        e.latences.push(Date.now() - data.sentAt);
        if (e.vus.size >= e.count) finir();
      }
      return;
    }
    s.emit('game:message', { to: from, data: { ...data } });   // relais croisé
  });
  const finir = () => {
    const e = etat.echo;
    if (!e) return;
    etat.echo = null;
    clearTimeout(e.timer); clearTimeout(e.fin);
    const moy = e.latences.length ? Math.round(e.latences.reduce((a, b) => a + b, 0) / e.latences.length) : null;
    s.emit('diag:echo:report', { id: e.id, recus: e.vus.size, moy });
  };
  s.on('diag:echo:request', ({ id, count, paceMs, to }) => {
    if (etat.echo) finir();
    const e = { id, count, vus: new Set(), latences: [], timer: null, fin: null };
    etat.echo = e;
    let seq = 0;
    const envoyer = () => {
      if (etat.echo !== e) return;
      s.emit('game:message', { to, data: { t: 'diag', id, seq, sentAt: Date.now() } });
      seq += 1;
      if (seq < count) e.timer = setTimeout(envoyer, Math.max(0, paceMs ?? 0));
      else e.fin = setTimeout(finir, Math.max(600, (paceMs ?? 0) * 4 + 600));
    };
    envoyer();
  });
  return etat;
}

(async () => {
  let echecs = 0;
  const exiger = (ok, m) => { if (ok) console.log(`   ✅ ${m}`); else { console.error(`   ❌ ${m}`); echecs += 1; } };

  /* ---------- 1+2. Authentification ---------- */
  console.log('── Authentification de l\'espace programmeur ──');
  const adminS = await client('admin');
  await demander(adminS, 'user:register', { pseudo: 'Prog', avatar: '🛠️', color: '#ffaa00' }, 'user:registered');

  const mauvais = await demander(adminS, 'admin:auth', { code: '000000' }, 'admin:authed');
  exiger(mauvais.ok === false && typeof mauvais.reste === 'number',
    `mauvais code refusé proprement (${mauvais.error} — ${mauvais.reste} essais restants), sans déconnexion`);
  exiger(adminS.connected, 'la socket est toujours connectée après le refus');

  const statsP = evt(adminS, 'admin:stats');
  const bon = await demander(adminS, 'admin:auth', { code: CODE }, 'admin:authed');
  exiger(bon.ok === true, 'bon code accepté');
  const stats = await statsP;
  exiger(Array.isArray(stats?.clients), `stats reçues (${stats.clients.length} client(s) vus par le serveur)`);

  /* ---------- 3. Garde : un non-admin ne peut pas lancer de diagnostic ---------- */
  console.log('\n── Garde de sécurité ──');
  const intrus = await client('intrus');
  await demander(intrus, 'user:register', { pseudo: 'Intrus', avatar: '🥷', color: '#333333' }, 'user:registered');
  let intrusARecu = false;
  intrus.on('diag:progress', () => { intrusARecu = true; });
  intrus.on('diag:result', () => { intrusARecu = true; });
  intrus.emit('diag:run', { socketId: adminS.id });
  await attendre(800);
  exiger(!intrusARecu, 'diag:run émis par un non-admin : ignoré (aucune réponse)');

  /* ---------- 4. Diagnostic complet contre un client en partie ---------- */
  console.log('\n── Diagnostic d\'un client en partie ──');
  const hostS = await client('host');
  const cibleS = await client('cible');
  const uH = await demander(hostS, 'user:register', { pseudo: 'HostJeu', avatar: '🎩', color: '#ff0000' }, 'user:registered');
  const uC = await demander(cibleS, 'user:register', { pseudo: 'Cible', avatar: '🎯', color: '#00ff00' }, 'user:registered');
  equiperDiag(hostS, uH.user.id);
  equiperDiag(cibleS, uC.user.id);
  const cr = await demander(hostS, 'room:create', { name: 'Diag e2e', maxPlayers: 4, gameId: 'la-traque' }, 'room:joined');
  await demander(cibleS, 'room:join', { code: cr.room.code }, 'room:joined');
  await attendre(200);
  const sH = evt(hostS, 'game:started'); const sC = evt(cibleS, 'game:started');
  hostS.emit('game:start', {});
  await Promise.all([sH, sC]);

  const progres = [];
  adminS.on('diag:progress', (p) => progres.push(p));
  const resultatP = evt(adminS, 'diag:result', 30_000);
  adminS.emit('diag:run', { socketId: cibleS.id });
  const rapport = await resultatP;

  exiger(!rapport.erreur, `rapport reçu sans erreur${rapport.erreur ? ` (« ${rapport.erreur} »)` : ''}`);
  exiger(rapport.identite?.pseudo === 'Cible' && rapport.identite?.role === 'Invité',
    `fiche d'identité correcte (${rapport.identite?.pseudo}, ${rapport.identite?.role}, jeu ${rapport.identite?.jeu?.nom ?? '?'})`);
  const etapes = new Map((rapport.etapes ?? []).map((e) => [e.nom, e]));
  for (const nom of ['Répondant', 'RTT / gigue', 'Débit soutenu', 'Intégrité charge utile']) {
    const e = etapes.get(nom);
    exiger(e?.ok === true, `étape « ${nom} » : ${e?.detail ?? 'ABSENTE'}`);
  }
  const auto = etapes.get('Relais — auto (soi-même)');
  exiger(auto?.ok === true, `relais auto (vrai canal game:message) : ${auto?.detail ?? 'ABSENT'}`);
  const croise = [...etapes.keys()].find((k) => k.startsWith('Relais — vers'));
  exiger(croise && etapes.get(croise)?.ok === true, `relais croisé : ${croise ? etapes.get(croise).detail : 'ABSENT'}`);
  exiger(progres.length >= 6, `progression diffusée en direct (${progres.length} mises à jour reçues)`);

  [adminS, intrus, hostS, cibleS].forEach((s) => s.close());
  await attendre(150);

  console.log(echecs === 0
    ? '\n✅ Espace programmeur pleinement fonctionnel : auth, stats, garde, diagnostic complet.'
    : `\n❌ ${echecs} vérification(s) en échec.`);
  process.exit(echecs === 0 ? 0 : 1);
})().catch((e) => { console.error('ERREUR:', e.message); process.exit(1); });
