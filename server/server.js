/**
 * Point d'entrée du serveur.
 * Rôle : composer les modules (composition root) et démarrer HTTP + Socket.IO.
 * Aucune logique métier ici — elle vit dans users/, rooms/, lobby/, sockets/.
 */
import http from 'node:http';
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
const diagnostics = new DiagnosticService({ io, users, rooms, gameRegistry, admin });

// Rafraîchissement de la page programmeur (uniquement s'il y a quelqu'un derrière).
setInterval(() => admin.diffuser(), 2000);

io.on('connection', (socket) => {
  admin.onConnect(socket);
  registerSocketHandlers({ io, socket, users, rooms, lobby, gameRegistry, admin, diagnostics });
});

httpServer.listen(PORT, () => {
  console.log(`[arcade] Serveur démarré : http://localhost:${PORT}`);
  console.log(`[arcade] ${gameRegistry.all().length} jeux référencés dans games.json`);
});
