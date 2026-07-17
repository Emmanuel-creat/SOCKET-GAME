/**
 * PIPELINE DES COMMANDES — la preuve, étage par étage.
 *
 * Le symptôme : « les commandes des invités n'arrivent que très rarement, voire
 * jamais, au serveur autoritaire — même en local ». Ce test ne suppose rien : il
 * COMPTE, à chaque étage, ce que devient chaque commande :
 *
 *    [1 générée] → [2 émise] → [3 relayée serveur] → [4 reçue Host] → [5 appliquée moteur]
 *
 * … dans les scénarios qui arrivent vraiment en local :
 *
 *    A. partie nominale (2 invités qui jouent)          — la référence
 *    B. l'invité RAFRAÎCHIT SA PAGE en pleine partie     — le scénario du symptôme
 *    C. le HOST rafraîchit sa page en pleine partie      — la partie zombie
 *
 * Chaque scénario imprime son tableau. L'étage où le compte chute désigne le
 * coupable — pas d'hypothèse, des nombres.
 */
import { io } from 'socket.io-client';
import { TraqueEngine, TICK_MS, stepCollision } from './client/games/la-traque/engine.js';

const URL = 'http://localhost:3000';
const attendre = (ms) => new Promise((r) => setTimeout(r, ms));
function client(n) { return new Promise((res, rej) => { const s = io(URL, { transports: ['websocket'], forceNew: true }); s.on('connect', () => res(s)); s.on('connect_error', (e) => rej(new Error(n + ' ' + e.message))); setTimeout(() => rej(new Error(n + ' connexion timeout')), 4000); }); }
const evt = (s, ev, ms = 5000) => new Promise((res, rej) => { const to = setTimeout(() => rej(new Error('timeout ' + ev)), ms); s.once(ev, (d) => { clearTimeout(to); res(d); }); });
const demander = (s, e, p, r) => { const q = evt(s, r); s.emit(e, p); return q; };

/** Un profil avec identité persistante simulée (le localStorage d'un navigateur). */
const navigateurs = new Map();   // nom -> { cid }
function profil(nom) {
  if (!navigateurs.has(nom)) navigateurs.set(nom, { cid: `cid-${nom}-${Math.random().toString(36).slice(2, 8)}` });
  return { pseudo: nom, avatar: '🎮', color: '#88f', cid: navigateurs.get(nom).cid };
}

/** Un invité instrumenté : génère des commandes comme le vrai client (mêmes garde-fous). */
function inviteInstrumente(s, hostId) {
  const c = { generees: 0, emises: 0, erreursServeur: [], vuesRecues: 0, resyncs: 0 };
  const etat = { lastSent: 0, lastSig: null };
  const INPUT_MIN_MS = 60;
  let seq = 0;

  s.on('sys:error', (e) => c.erreursServeur.push(e.code ?? e.message));
  s.on('game:message', ({ data }) => {
    if (data?.t === 'view') c.vuesRecues += 1;
    if (data?.t === 'resync') { c.resyncs += 1; s.emit('game:message', { to: hostId(), data: { t: 'hello' } }); }
  });

  return {
    compteurs: c,
    // Reproduit sendInput() : signature + limiteur, et l'appel à chaque image (40 Hz).
    jouer(dx, dy) {
      c.generees += 1;
      const now = Date.now();
      const sig = `${dx}|${dy}`;
      if (sig === etat.lastSig) return;
      if (now - etat.lastSent < INPUT_MIN_MS) return;   // le limiteur garde la commande « neuve »
      etat.lastSig = sig; etat.lastSent = now;
      c.emises += 1;
      s.emit('game:message', { to: hostId(), data: { t: 'action', action: { a: 'input', dx, dy, aim: 0, sneak: false, sprint: false, ts: Date.now(), seq: (seq += 1) } } });
    },
  };
}

/** Le Host instrumenté : vrai moteur, et le compte de ce qui lui parvient. */
function hostInstrumente(s, monId, ctx) {
  const c = { recues: 0, appliquees: 0, rejetees: 0, raisons: new Map(), hellos: 0 };
  const engine = new TraqueEngine(ctx.players, { hostId: ctx.hostId });
  engine.start(monId);
  engine.phase = 'traque'; engine.phaseEnd = Date.now() + 600_000;
  const sync = new Map();
  const etat = () => ({ grid: engine.mapVersion, rosterVersion: engine.rosterVersion, optionsVersion: engine.optionsVersion, chatSeq: engine.chatSeq, logSeq: engine.logSeq });

  s.on('game:message', ({ from, data }) => {
    if (data?.t === 'hello') { c.hellos += 1; sync.delete(from); return; }
    if (data?.t !== 'action' || data.action?.a !== 'input') return;
    c.recues += 1;
    const res = engine.handleAction(from, data.action);
    if (res?.ok) c.appliquees += 1;
    else {
      c.rejetees += 1;
      const raison = res?.error ?? 'inconnue';
      c.raisons.set(raison, (c.raisons.get(raison) ?? 0) + 1);
    }
  });
  const boucle = setInterval(() => {
    engine.tick();
    for (const p of engine.players) {
      if (p.id === monId) continue;
      s.emit('game:message', { to: p.id, data: { t: 'view', view: engine.getViewFor(p.id, sync.get(p.id) ?? null) } });
      sync.set(p.id, etat());
    }
  }, TICK_MS * 2);

  return { compteurs: c, engine, stop: () => clearInterval(boucle) };
}

function tableau(nom, inv, host, notes = []) {
  console.log(`\n── ${nom} ──`);
  console.log(`   1. générées (clavier)        : ${inv.generees}`);
  console.log(`   2. émises (après limiteur)    : ${inv.emises}`);
  console.log(`   4. reçues par le Host         : ${host ? host.recues : '—'}`);
  console.log(`   5. appliquées par le moteur   : ${host ? host.appliquees : '—'}${host && host.rejetees ? `   (❗ ${host.rejetees} rejetées : ${[...host.raisons].map(([r, n]) => `${r} ×${n}`).join(', ')})` : ''}`);
  console.log(`      vues reçues par l'invité   : ${inv.vuesRecues} · erreurs serveur reçues : ${inv.erreursServeur.length}${inv.erreursServeur.length ? ` (${[...new Set(inv.erreursServeur)].join(', ')})` : ''}`);
  for (const n of notes) console.log(`      ${n}`);
}

/** Fait jouer un invité pendant `ms` : il court et change de direction comme un humain. */
async function jouer(pad, ms) {
  const dirs = [[1, 0], [0, 1], [-1, 0], [0, -1]];
  const fin = Date.now() + ms;
  let i = 0;
  while (Date.now() < fin) {
    const [dx, dy] = dirs[i % 4];
    const change = Date.now() + 400;
    while (Date.now() < change && Date.now() < fin) { pad.jouer(dx, dy); await attendre(25); }   // 40 Hz, comme frame()
    i += 1;
  }
}

async function monterPartie(scenario = 'X') {
  const hostS = await client('host');
  const invS = await client('invite');
  const uH = await demander(hostS, 'user:register', profil(`Host${scenario}`), 'user:registered');
  const uI = await demander(invS, 'user:register', profil(`Invite${scenario}`), 'user:registered');
  const cr = await demander(hostS, 'room:create', { name: 'Pipeline test', maxPlayers: 6, gameId: 'la-traque' }, 'room:joined');
  await demander(invS, 'room:join', { code: cr.room.code }, 'room:joined');
  await attendre(150);
  const sH = evt(hostS, 'game:started'); const sI = evt(invS, 'game:started');
  hostS.emit('game:start', {});
  const [{ context }] = await Promise.all([sH, sI]);
  return { hostS, invS, uH, uI, context, code: cr.room.code };
}

(async () => {
  /* ───────────── A. Partie nominale ───────────── */
  {
    const { hostS, invS, uH, uI, context } = await monterPartie('A');
    const host = hostInstrumente(hostS, uH.user.id, context);
    const inv = inviteInstrumente(invS, () => context.hostId);
    invS.emit('game:message', { to: context.hostId, data: { t: 'hello' } });
    await attendre(150);
    await jouer(inv, 3000);
    await attendre(300);
    tableau('A. Partie nominale (référence)', inv.compteurs, host.compteurs);
    const ok = host.compteurs.appliquees > 0 && host.compteurs.appliquees === host.compteurs.recues && host.compteurs.recues === inv.compteurs.emises;
    console.log(ok ? '   ✅ chaque commande émise est reçue et appliquée' : '   ❌ des commandes se perdent DÉJÀ en nominal');
    host.stop(); hostS.close(); invS.close(); await attendre(200);
  }

  /* ───────────── B. L'invité rafraîchit sa page ───────────── */
  {
    const { hostS, invS, uH, context, code } = await monterPartie('B');
    const host = hostInstrumente(hostS, uH.user.id, context);
    const inv1 = inviteInstrumente(invS, () => context.hostId);
    invS.emit('game:message', { to: context.hostId, data: { t: 'hello' } });
    await attendre(150);
    await jouer(inv1, 1200);                       // il joue normalement…
    const avantRefresh = { ...host.compteurs };

    invS.close();                                   // …puis F5 : la socket meurt
    await attendre(400);

    // Le navigateur revient : même localStorage (même cid), nouvelle socket.
    const invS2 = await client('invite-retour');
    const notes = [];
    let inv2 = null;
    try {
      const uI2 = await demander(invS2, 'user:register', profil('InviteB'), 'user:registered');
      notes.push(`au retour : user.id ${uI2.user.id === undefined ? '?' : (uI2.user.id ? 'obtenu' : '—')}`);
      // Tente de revenir dans la partie : re-join, puis rejoue.
      try {
        await demander(invS2, 'room:join', { code }, 'room:joined');
        notes.push('re-join du salon : accepté');
      } catch { notes.push('re-join du salon : REFUSÉ (salon plus ouvert) — il tente de jouer quand même'); }
      inv2 = inviteInstrumente(invS2, () => context.hostId);
      invS2.emit('game:message', { to: context.hostId, data: { t: 'hello' } });
      await attendre(150);
      await jouer(inv2, 2500);
      await attendre(300);
    } catch (e) { notes.push(`retour impossible : ${e.message}`); }

    const apres = host.compteurs;
    tableau('B. L\'invité rafraîchit sa page en pleine partie', inv2?.compteurs ?? { generees: 0, emises: 0, vuesRecues: 0, erreursServeur: [] }, apres, [
      `avant le refresh : ${avantRefresh.appliquees} commandes appliquées (ça marchait)`,
      ...notes,
      `APRÈS le refresh : ${apres.appliquees - avantRefresh.appliquees} commandes appliquées sur ${inv2?.compteurs.emises ?? 0} émises`,
    ]);
    const rejoue = (apres.appliquees - avantRefresh.appliquees) > 0;
    console.log(rejoue ? '   ✅ l\'invité rejoue après son refresh' : '   ❌ SYMPTÔME REPRODUIT : plus AUCUNE commande n\'atteint l\'autorité après le refresh');
    host.stop(); hostS.close(); invS2.close(); await attendre(200);
  }

  /* ───────────── C. Le Host rafraîchit sa page ───────────── */
  {
    const { hostS, invS, uH, context } = await monterPartie('C');
    const host = hostInstrumente(hostS, uH.user.id, context);
    const inv = inviteInstrumente(invS, () => context.hostId);
    invS.emit('game:message', { to: context.hostId, data: { t: 'hello' } });
    await attendre(150);
    await jouer(inv, 1000);
    const avant = { ...host.compteurs };
    // On écoute la fin de partie AVANT de couper le Host : la grâce peut expirer
    // pendant que l'invité joue encore, et l'annonce ne repasse pas deux fois.
    let finPropre = null;
    invS.on('game:ended', ({ result }) => { finPropre = result; });
    host.stop(); hostS.close();                    // F5 côté Host : l'autorité disparaît
    await attendre(400);
    const emisesAvant = inv.compteurs.emises;
    await jouer(inv, 2000);                        // l'invité, lui, continue de jouer
    await attendre(300);
    // Après le correctif : le Host absent est « en grâce ». S'il ne revient pas,
    // la partie doit se TERMINER PROPREMENT (annonce à tous) — plus de zombie.
    await attendre(Number(process.env.GRACE_MS || 45000) + 800);

    tableau('C. Le Host rafraîchit sa page… et ne revient pas', inv.compteurs, null, [
      `avant : ${avant.appliquees} commandes appliquées (ça marchait)`,
      `après : l'invité a émis ${inv.compteurs.emises - emisesAvant} commandes de plus — vers un Host absent`,
      `fin de partie annoncée à l'invité ? ${finPropre ? `OUI — « ${finPropre.message ?? JSON.stringify(finPropre)} »` : 'NON (zombie)'}`,
    ]);
    console.log(finPropre ? '   ✅ plus de partie zombie : fin propre annoncée' : '   ❌ partie zombie');
    invS.close(); await attendre(200);
  }

  /* ───────────── D. Le Host rafraîchit… et REVIENT à temps ───────────── */
  {
    const { hostS, invS, uH, context, code } = await monterPartie('D');
    const host1 = hostInstrumente(hostS, uH.user.id, context);
    const inv = inviteInstrumente(invS, () => context.hostId);
    invS.emit('game:message', { to: context.hostId, data: { t: 'hello' } });
    await attendre(150);
    await jouer(inv, 800);
    host1.stop(); hostS.close();                     // F5 côté Host
    await attendre(400);

    // Le navigateur du Host revient (même localStorage → même cid).
    const hostS2 = await client('host-retour');
    const notes = [];
    const repriseP = evt(hostS2, 'game:started', 4000).catch(() => null);
    const uH2 = await demander(hostS2, 'user:register', profil('HostD'), 'user:registered');
    notes.push(`identité au retour : ${uH2.user.id === uH.user.id ? 'MÊME user.id ✓' : 'NOUVEL id ✗'}`);
    const reprise = await repriseP;
    notes.push(`partie renvoyée au Host : ${reprise ? 'oui' : 'non'}`);
    let host2 = null;
    if (reprise) {
      host2 = hostInstrumente(hostS2, uH2.user.id, reprise.context);   // engine neuf, mêmes joueurs
      await attendre(200);
      const vuesAvant = inv.compteurs.vuesRecues;
      await jouer(inv, 2000);
      await attendre(300);
      notes.push(`l'invité reçoit à nouveau des vues : ${inv.compteurs.vuesRecues - vuesAvant > 0 ? 'oui' : 'non'}`);
    }
    tableau('D. Le Host revient pendant la grâce', inv.compteurs, host2?.compteurs ?? null, notes);
    const ok = host2 && host2.compteurs.appliquees > 0 && uH2.user.id === uH.user.id;
    console.log(ok ? '   ✅ le Host récupère sa partie, l\'invité rejoue' : '   ❌ la reprise du Host échoue');
    host2?.stop(); hostS2.close(); invS.close(); await attendre(200);
  }

  /* ───────────── E. Charge : 10 joueurs qui jouent en même temps ───────────── */
  {
    const hostS = await client('host');
    const uH = await demander(hostS, 'user:register', profil('HostE'), 'user:registered');
    const cr = await demander(hostS, 'room:create', { name: 'Charge pipeline', maxPlayers: 10, gameId: 'la-traque' }, 'room:joined');
    const invites = [];
    for (let i = 0; i < 9; i += 1) {
      const s = await client(`j${i}`);
      const u = await demander(s, 'user:register', profil(`JoueurE${i}`), 'user:registered');
      await demander(s, 'room:join', { code: cr.room.code }, 'room:joined');
      invites.push({ s, u });
    }
    await attendre(200);
    const started = [evt(hostS, 'game:started'), ...invites.map((i) => evt(i.s, 'game:started'))];
    hostS.emit('game:start', {});
    const [{ context }] = await Promise.all(started);
    const host = hostInstrumente(hostS, uH.user.id, context);
    const pads = invites.map((i) => inviteInstrumente(i.s, () => context.hostId));
    for (const i of invites) i.s.emit('game:message', { to: context.hostId, data: { t: 'hello' } });
    await attendre(200);
    await Promise.all(pads.map((p) => jouer(p, 3000)));
    await attendre(400);
    const emisesTotal = pads.reduce((a, p) => a + p.compteurs.emises, 0);
    console.log('\n── E. Charge : 9 invités simultanés pendant 3 s ──');
    console.log(`   émises au total  : ${emisesTotal}`);
    console.log(`   reçues par Host  : ${host.compteurs.recues}`);
    console.log(`   appliquées       : ${host.compteurs.appliquees}${host.compteurs.rejetees ? ` (❗ ${host.compteurs.rejetees} rejetées)` : ''}`);
    const ok = host.compteurs.appliquees === emisesTotal && emisesTotal > 0;
    console.log(ok ? '   ✅ zéro perte, zéro rejet, à 10 joueurs' : '   ❌ pertes sous charge');
    host.stop(); hostS.close(); invites.forEach((i) => i.s.close()); await attendre(200);
  }

  console.log('\n(fin du diagnostic — les tableaux ci-dessus désignent les étages fautifs)');
  process.exit(0);
})().catch((e) => { console.error('ERREUR:', e.message); process.exit(1); });
