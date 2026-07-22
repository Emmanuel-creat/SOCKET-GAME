/**
 * Point d'entrée du serveur.
 * Rôle : composer les modules (composition root) et démarrer HTTP + Socket.IO.
 * Aucune logique métier ici — elle vit dans users/, rooms/, lobby/, sockets/.
 */
import http from 'node:http';
import { ClassementService } from './classement/ClassementService.js';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import express from 'express';
import { Server } from 'socket.io';

import { UserManager } from './users/UserManager.js';
import { RoomManager } from './rooms/RoomManager.js';
import { LobbyManager } from './lobby/LobbyManager.js';
import { GameRegistry } from './games/GameRegistry.js';
import { registerSocketHandlers } from './sockets/registerSocketHandlers.js';
import { AdminService } from './admin/AdminService.js';
import { DiagnosticService } from './admin/DiagnosticService.js';
import { ReconnexionGrace } from './rooms/ReconnexionGrace.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const PORT = process.env.PORT || 3000;

// --- Application Express (fichiers statiques uniquement) ---
const app = express();
// Derrière le proxy de Render : sans ceci, tous les clients auraient l'IP du proxy.
app.set('trust proxy', true);
app.use(express.static(path.join(ROOT, 'client'), {
  maxAge: '1h',        // le navigateur ne re-télécharge plus les assets à chaque partie
  etag: true,
}));
// Le code partagé est servi tel quel : le client l'importe en ES module.
app.use('/shared', express.static(path.join(ROOT, 'shared')));

// Petit endpoint de santé, utile en supervision/déploiement.
app.get('/health', (_req, res) => res.json({ status: 'ok', uptime: process.uptime() }));

/* ------------------------------------------------------------------ *
 * Classement : le fichier de données, servi en dur par le site.
 *
 * GET  /classement.json          → le fichier (toujours à jour, lu en mémoire)
 * POST /classement/import        → restaure un fichier (protégé par le code admin)
 *
 * L'import existe parce que l'hébergement gratuit efface le disque à chaque
 * redéploiement et à chaque réveil : il suffit de re-téléverser le dernier
 * fichier téléchargé pour retrouver le palmarès.
 * ------------------------------------------------------------------ */
app.get('/classement.json', (_req, res) => {
  res.type('application/json').send(classement.serialiser());
});

app.post('/classement/import', express.json({ limit: '2mb' }), (req, res) => {
  const code = req.get('X-Admin-Code') || req.query.code || '';
  if (!admin.codeValide(String(code))) return res.status(403).json({ error: 'Code incorrect.' });
  const n = classement.importer(req.body);
  if (n < 0) return res.status(400).json({ error: 'Fichier invalide.' });
  res.json({ ok: true, joueurs: n });
});

// --- Serveur HTTP + Socket.IO ---
const httpServer = http.createServer(app);
const io = new Server(httpServer, {
  // Plan Render Free : 0,1 CPU. Chaque message coûte, sa taille beaucoup moins.
  perMessageDeflate: false,   // compresser 60 petits messages/s coûte plus de CPU que ça n'économise de bande passante
  httpCompression: false,     // idem pour le transport polling
  maxHttpBufferSize: 1e5,     // 100 Ko : largement au-dessus de la plus grosse vue (par défaut : 1 Mo)
  pingInterval: 25_000,       // battements de cœur plus espacés (défaut : 25 s / 20 s, on garde mais explicite)
  pingTimeout: 20_000,
});

// --- Composition des services ---
const gameRegistry = new GameRegistry(path.join(ROOT, 'client', 'games', 'games.json'));
await gameRegistry.load();

const users = new UserManager();
const rooms = new RoomManager({ users });
const lobby = new LobbyManager({ io, users, rooms, gameRegistry });
const admin = new AdminService({ io, users, rooms, gameRegistry });
// Classement général (victoires tous jeux). Le stockage est choisi tout seul :
// GitHub Gist si GIST_ID + GITHUB_TOKEN sont fournis (indispensable sur une
// offre sans disque persistant, où le système de fichiers est effacé à chaque
// redéploiement ET à chaque réveil), fichier local sinon.
const classement = new ClassementService();
classement.charger().then(() => {
  console.log(`[arcade] Classement chargé depuis ${classement.stockage.nom} — ${classement.entrees.size} joueur(s)`);
});
const diagnostics = new DiagnosticService({ io, users, rooms, gameRegistry, admin });
// Grâce de reconnexion : un joueur en partie qui perd sa socket garde sa place
// (et son identifiant) le temps de revenir — un F5 n'est plus une exclusion.
const grace = new ReconnexionGrace();

// Rafraîchissement de la page programmeur (uniquement s'il y a quelqu'un derrière).
setInterval(() => admin.diffuser(), 2000);

io.on('connection', (socket) => {
  admin.onConnect(socket);
  registerSocketHandlers({ io, socket, users, rooms, lobby, gameRegistry, admin, diagnostics, grace, classement });
});

httpServer.listen(PORT, () => {
  console.log(`[arcade] Serveur démarré : http://localhost:${PORT}`);
  console.log(`[arcade] ${gameRegistry.all().length} jeux référencés dans games.json`);
});
