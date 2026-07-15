/**
 * Banc de charge — version Windows (aucune dépendance à /proc).
 *
 * Identique à test-charge.mjs (même trafic simulé : 6 joueurs, La Traque/Among Us),
 * mais mesure le CPU serveur via l'endpoint HTTP /debug/cpu (process.cpuUsage(),
 * natif Node.js) au lieu de lire /proc/<PID>/stat, qui n'existe pas sous Windows.
 *
 * Prérequis côté serveur : la route GET /debug/cpu doit exister dans server/server.js
 * (voir le patch fourni avec ce script).
 */
import { io } from 'socket.io-client';

const URL = process.argv[2] ?? 'http://localhost:3000';
const HZ_VUES = Number(process.argv[3] ?? 10);       // diffusions par seconde
const HZ_ENTREES = Number(process.argv[4] ?? 16);    // envois d'entrées par invité
const OCTETS_VUE = Number(process.argv[5] ?? 1150);  // taille d'une vue
const TRANSPORT = process.argv[6] ?? 'websocket';
const SECONDES = 12;
const JOUEURS = 6;

/** Lit le CPU cumulé du process serveur via l'endpoint de diagnostic. */
async function cpuServeur() {
  const res = await fetch(`${URL}/debug/cpu`);
  if (!res.ok) throw new Error(`GET /debug/cpu a échoué (${res.status}) — le patch server.js est-il bien appliqué ?`);
  const { userMicros, systemMicros } = await res.json();
  return (userMicros + systemMicros) / 1e6; // microsecondes -> secondes
}

const attendre = (s, ev, ms = 5000) => new Promise((res, rej) => {
  const t = setTimeout(() => rej(new Error(`timeout ${ev}`)), ms);
  s.once(ev, (d) => { clearTimeout(t); res(d); });
});
const dodo = (ms) => new Promise((r) => setTimeout(r, ms));

// --- Vérification préalable : le serveur et /debug/cpu répondent-ils ? ---
try {
  await cpuServeur();
} catch (err) {
  console.error(`❌ Impossible de lire /debug/cpu sur ${URL} : ${err.message}`);
  console.error('   Vérifie que le serveur tourne (npm start) et que le patch a été ajouté à server/server.js.');
  process.exit(1);
}

// --- 6 joueurs, un vrai salon, une vraie partie ---
const sockets = [];
const ids = [];
for (let i = 0; i < JOUEURS; i += 1) {
  const s = io(URL, { transports: [TRANSPORT], upgrade: false });
  s.on('sys:ping', ({ t }) => s.emit('sys:pong', { t }));
  await attendre(s, 'connect');
  s.emit('user:register', { pseudo: `J${i}`, avatar: '🦊', color: '#ff9f45' });
  const u = await attendre(s, 'user:registered');
  ids.push(u.user?.id ?? u.id ?? s.id);
  sockets.push(s);
}

const host = sockets[0];
host.emit('room:create', { name: 'Charge', gameId: 'la-traque', maxPlayers: 8 });
const salon = await attendre(host, 'room:joined');
const code = salon.room.code;
for (let i = 1; i < JOUEURS; i += 1) {
  sockets[i].emit('room:join', { code });
  await attendre(sockets[i], 'room:joined');
}
host.emit('game:start');
await attendre(host, 'game:started');
await dodo(300);

// --- charge : le Host diffuse, les invités pianotent ---
const charge = 'x'.repeat(Math.max(0, OCTETS_VUE - 90));
let msgHost = 0;
let msgInvites = 0;
let recus = 0;
for (let i = 1; i < JOUEURS; i += 1) sockets[i].on('game:message', () => { recus += 1; });

const cpu0 = await cpuServeur();
const t0 = Date.now();

const tDiff = setInterval(() => {
  for (let i = 1; i < JOUEURS; i += 1) {
    host.emit('game:message', { to: ids[i], data: { t: 'view', view: { n: msgHost, p: charge } } });
    msgHost += 1;
  }
}, 1000 / HZ_VUES);

const tEntrees = sockets.slice(1).map((s) => setInterval(() => {
  s.emit('game:message', { to: ids[0], data: { t: 'action', a: { a: 'input', dx: 0.7071, dy: -0.7071 } } });
  msgInvites += 1;
}, 1000 / HZ_ENTREES));

await dodo(SECONDES * 1000);
clearInterval(tDiff);
tEntrees.forEach(clearInterval);
await dodo(400);

const cpu = (await cpuServeur()) - cpu0;
console.log(`(contrôle) serveur mesuré : ${URL}`);
console.log(`(contrôle) messages effectivement reçus par les invités : ${recus}`);
const dt = (Date.now() - t0) / 1000;
const pct = (cpu / dt) * 100;
const msgs = (msgHost + msgInvites) / dt;

console.log(`Transport : ${TRANSPORT}`);
console.log(`Trafic simulé : ${HZ_VUES} diffusions/s × 5 invités + ${HZ_ENTREES} entrées/s × 5 invités`);
console.log(`  → ${msgs.toFixed(0)} messages/s relayés par le serveur (${(msgHost / dt).toFixed(0)} vues + ${(msgInvites / dt).toFixed(0)} entrées)`);
console.log(`  → ${((msgHost * OCTETS_VUE) / dt / 1024).toFixed(0)} Ko/s de vues`);
console.log(`CPU serveur mesuré : ${cpu.toFixed(2)} s sur ${dt.toFixed(1)} s → ${pct.toFixed(1)} % d'un cœur`);
console.log(pct > 10
  ? `❌ DÉPASSE le plan Render Free (0,1 CPU = 10 %) — facteur ${(pct / 10).toFixed(1)}× : le serveur est étranglé, les invités saccadent.`
  : `✅ Tient dans le plan Render Free (0,1 CPU = 10 %) avec ${(10 - pct).toFixed(1)} points de marge.`);

sockets.forEach((s) => s.close());
process.exit(0);
