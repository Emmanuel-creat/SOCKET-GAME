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

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const PORT = process.env.PORT || 3000;

// --- Application Express (fichiers statiques uniquement) ---
const app = express();
app.use(express.static(path.join(ROOT, 'client')));
// Le code partagé est servi tel quel : le client l'importe en ES module.
app.use('/shared', express.static(path.join(ROOT, 'shared')));

// Petit endpoint de santé, utile en supervision/déploiement.
app.get('/health', (_req, res) => res.json({ status: 'ok', uptime: process.uptime() }));

// --- Serveur HTTP + Socket.IO ---
const httpServer = http.createServer(app);
const io = new Server(httpServer);

// --- Composition des services ---
const gameRegistry = new GameRegistry(path.join(ROOT, 'client', 'games', 'games.json'));
await gameRegistry.load();

const users = new UserManager();
const rooms = new RoomManager({ users });
const lobby = new LobbyManager({ io, users, rooms, gameRegistry });

io.on('connection', (socket) => {
  registerSocketHandlers({ io, socket, users, rooms, lobby, gameRegistry });
});

httpServer.listen(PORT, () => {
  console.log(`[arcade] Serveur démarré : http://localhost:${PORT}`);
  console.log(`[arcade] ${gameRegistry.all().length} jeux référencés dans games.json`);
});
