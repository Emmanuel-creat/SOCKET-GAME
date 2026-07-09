/**
 * registerSocketHandlers — couche transport.
 * Traduit les événements Socket.IO en appels aux managers, puis diffuse.
 * Aucune règle métier ici : uniquement de l'orchestration.
 */
import { EVENTS } from '../../shared/events.js';
import { GAME_STATE, LIMITS, ROOM_STATUS } from '../../shared/constants.js';
import { sanitizeText, isValidChatMessage } from '../../shared/validation.js';

export function registerSocketHandlers({ io, socket, users, rooms, lobby, gameRegistry }) {
  /** Raccourci : émet une erreur normalisée au client courant. */
  const fail = (code, message) => socket.emit(EVENTS.SYS_ERROR, { code, message });

  /** Raccourci : notification personnelle. */
  const notify = (type, message) => socket.emit(EVENTS.SYS_NOTIFICATION, { type, message });

  /** Récupère l'utilisateur courant ou émet une erreur. */
  const requireUser = () => {
    const user = users.get(socket.id);
    if (!user) fail('NOT_REGISTERED', 'Créez d\'abord votre profil.');
    return user;
  };

  /** Récupère le salon de l'utilisateur, avec vérification Host optionnelle. */
  const requireRoom = (user, { hostOnly = false } = {}) => {
    const room = user?.roomId ? rooms.get(user.roomId) : null;
    if (!room) {
      fail('NOT_IN_ROOM', 'Vous n\'êtes dans aucun salon.');
      return null;
    }
    if (hostOnly && !room.isHost(user.id)) {
      fail('NOT_HOST', 'Seul le Host peut effectuer cette action.');
      return null;
    }
    return room;
  };

  // ------------------------------------------------------------------
  // Utilisateur
  // ------------------------------------------------------------------

  socket.on(EVENTS.USER_REGISTER, (payload = {}) => {
    const user = users.register(socket.id, payload);
    if (!user) return fail('INVALID_PROFILE', `Pseudo invalide (${LIMITS.PSEUDO_MIN} à ${LIMITS.PSEUDO_MAX} caractères).`);
    socket.emit(EVENTS.USER_REGISTERED, { user: users.toPublic(user) });
    lobby.sendSnapshot(socket);
    lobby.broadcastPlayers();
    socket.broadcast.emit(EVENTS.SYS_NOTIFICATION, { type: 'info', message: `${user.pseudo} vient de se connecter.` });
  });

  socket.on(EVENTS.USER_UPDATE_PROFILE, (payload = {}) => {
    const user = users.updateProfile(socket.id, payload);
    if (!user) return;
    socket.emit(EVENTS.USER_REGISTERED, { user: users.toPublic(user) });
    lobby.broadcastPlayers();
    const room = user.roomId ? rooms.get(user.roomId) : null;
    if (room) lobby.broadcastRoomState(room);
  });

  socket.on(EVENTS.USER_SET_STATUS, ({ status } = {}) => {
    const user = users.setStatus(socket.id, status);
    if (!user) return;
    lobby.broadcastPlayers();
    const room = user.roomId ? rooms.get(user.roomId) : null;
    if (room) lobby.broadcastRoomState(room);
  });

  // ------------------------------------------------------------------
  // Salons
  // ------------------------------------------------------------------

  socket.on(EVENTS.ROOM_CREATE, (payload = {}) => {
    const user = requireUser();
    if (!user) return;
    const { room, error } = rooms.create(user, payload);
    if (error) return fail('ROOM_CREATE_FAILED', error);

    socket.join(room.id);
    socket.emit(EVENTS.ROOM_JOINED, { room: room.toPublic((u) => users.toPublic(u)) });
    notify('success', `Salon « ${room.name} » créé. Code : ${room.code}`);
    lobby.broadcastRooms();
    lobby.broadcastPlayers();
  });

  socket.on(EVENTS.ROOM_JOIN, ({ code } = {}) => {
    const user = requireUser();
    if (!user) return;
    const { room, error } = rooms.join(user, code);
    if (error) return fail('ROOM_JOIN_FAILED', error);

    socket.join(room.id);
    socket.emit(EVENTS.ROOM_JOINED, { room: room.toPublic((u) => users.toPublic(u)) });
    lobby.notifyRoom(room, 'info', `${user.pseudo} a rejoint le salon.`);
    lobby.broadcastRoomState(room);
    lobby.broadcastRooms();
    lobby.broadcastPlayers();
  });

  socket.on(EVENTS.ROOM_LEAVE, () => leaveCurrentRoom('Vous avez quitté le salon.'));

  socket.on(EVENTS.ROOM_KICK, ({ userId } = {}) => {
    const user = requireUser();
    const room = user && requireRoom(user, { hostOnly: true });
    if (!room) return;
    const target = users.getById(userId);
    if (!target || !room.has(target.id)) return fail('KICK_FAILED', 'Joueur introuvable dans ce salon.');
    if (target.id === user.id) return fail('KICK_FAILED', 'Le Host ne peut pas s\'expulser lui-même.');

    rooms.leave(target);
    const targetSocket = io.sockets.sockets.get(target.socketId);
    if (targetSocket) {
      targetSocket.leave(room.id);
      targetSocket.emit(EVENTS.ROOM_LEFT, { reason: 'Vous avez été expulsé du salon.' });
    }
    lobby.notifyRoom(room, 'warning', `${target.pseudo} a été expulsé du salon.`);
    lobby.broadcastRoomState(room);
    lobby.broadcastRooms();
    lobby.broadcastPlayers();
  });

  socket.on(EVENTS.ROOM_SET_GAME, ({ gameId } = {}) => {
    const user = requireUser();
    const room = user && requireRoom(user, { hostOnly: true });
    if (!room) return;
    const { ok, error } = gameRegistry.canSelect(gameId, room.players.length);
    if (!ok) return fail('GAME_SELECT_FAILED', error);

    room.gameId = gameId;
    const game = gameRegistry.get(gameId);
    lobby.notifyRoom(room, 'info', `Jeu sélectionné : ${game.nom}.`);
    lobby.broadcastRoomState(room);
    lobby.broadcastRooms();
  });

  socket.on(EVENTS.ROOM_SET_MAX_PLAYERS, ({ maxPlayers } = {}) => {
    const user = requireUser();
    const room = user && requireRoom(user, { hostOnly: true });
    if (!room) return;
    const n = Number(maxPlayers);
    if (!Number.isInteger(n) || n < LIMITS.ROOM_PLAYERS_MIN || n > LIMITS.ROOM_PLAYERS_MAX) {
      return fail('INVALID_CAPACITY', 'Capacité hors limites.');
    }
    room.setMaxPlayers(n);
    lobby.broadcastRoomState(room);
    lobby.broadcastRooms();
  });

  socket.on(EVENTS.ROOM_CLOSE, () => {
    const user = requireUser();
    const room = user && requireRoom(user, { hostOnly: true });
    if (!room) return;
    io.to(room.id).emit(EVENTS.ROOM_LEFT, { reason: 'Le salon a été fermé par le Host.' });
    io.in(room.id).socketsLeave(room.id);
    rooms.close(room);
    lobby.broadcastRooms();
    lobby.broadcastPlayers();
  });

  // ------------------------------------------------------------------
  // Chat
  // ------------------------------------------------------------------

  socket.on(EVENTS.CHAT_MESSAGE, ({ text } = {}) => {
    const user = requireUser();
    const room = user && requireRoom(user);
    if (!room) return;
    if (!isValidChatMessage(text)) return fail('INVALID_MESSAGE', 'Message vide ou trop long.');

    const message = room.pushChatMessage({
      id: `${Date.now()}-${user.id.slice(0, 8)}`,
      authorId: user.id,
      pseudo: user.pseudo,
      avatar: user.avatar,
      color: user.color,
      text: sanitizeText(text),
      at: Date.now(),
    });
    io.to(room.id).emit(EVENTS.CHAT_NEW_MESSAGE, { message });
  });

  // ------------------------------------------------------------------
  // Cycle de vie d'une partie
  // ------------------------------------------------------------------

  socket.on(EVENTS.GAME_START, () => {
    const user = requireUser();
    const room = user && requireRoom(user, { hostOnly: true });
    if (!room) return;
    if (!room.gameId) return fail('NO_GAME_SELECTED', 'Sélectionnez d\'abord un jeu.');

    const game = gameRegistry.get(room.gameId);
    if (game.etat !== GAME_STATE.AVAILABLE) {
      return fail('GAME_NOT_AVAILABLE', `« ${game.nom} » est actuellement en développement.`);
    }
    if (room.players.length < game.joueursMin) {
      return fail('NOT_ENOUGH_PLAYERS', `« ${game.nom} » nécessite au moins ${game.joueursMin} joueurs.`);
    }

    rooms.startGame(room);
    // Contexte transmis au module de jeu : le moteur ne fait que passer les données.
    const context = {
      roomId: room.id,
      roomName: room.name,
      hostId: room.hostId,
      players: room.players.map((u) => users.toPublic(u)),
    };
    io.to(room.id).emit(EVENTS.GAME_STARTED, { gameId: room.gameId, context });
    lobby.broadcastRoomState(room);
    lobby.broadcastRooms();
    lobby.broadcastPlayers();
  });

  socket.on(EVENTS.GAME_MESSAGE, ({ to = null, data } = {}) => {
    const user = requireUser();
    const room = user && requireRoom(user);
    if (!room) return;
    if (room.status !== ROOM_STATUS.IN_GAME) return fail('NO_GAME_RUNNING', 'Aucune partie en cours.');
    if (data === undefined) return;

    const envelope = { from: user.id, data };
    if (to) {
      // Message ciblé (ex. : envoyer sa main privée à un joueur précis).
      const target = users.getById(to);
      if (!target || !room.has(target.id)) return fail('TARGET_NOT_IN_ROOM', 'Destinataire introuvable dans le salon.');
      const targetSocket = io.sockets.sockets.get(target.socketId);
      targetSocket?.emit(EVENTS.GAME_MESSAGE, envelope);
    } else {
      // Diffusion à tous les autres membres du salon.
      socket.to(room.id).emit(EVENTS.GAME_MESSAGE, envelope);
    }
  });

  socket.on(EVENTS.GAME_END, ({ result } = {}) => {
    const user = requireUser();
    const room = user && requireRoom(user);
    if (!room) return;

    rooms.endGame(room);
    // Retour automatique au salon pour tous les membres.
    io.to(room.id).emit(EVENTS.GAME_ENDED, { result: result ?? null });
    lobby.broadcastRoomState(room);
    lobby.broadcastRooms();
    lobby.broadcastPlayers();
  });

  // ------------------------------------------------------------------
  // Déconnexion
  // ------------------------------------------------------------------

  socket.on('disconnect', () => {
    const user = users.get(socket.id);
    if (!user) return;
    leaveCurrentRoom(null);
    users.remove(socket.id);
    lobby.broadcastPlayers();
    socket.broadcast.emit(EVENTS.SYS_NOTIFICATION, { type: 'info', message: `${user.pseudo} s'est déconnecté.` });
  });

  /** Sortie de salon factorisée (départ volontaire, expulsion, déconnexion). */
  function leaveCurrentRoom(personalMessage) {
    const user = users.get(socket.id);
    if (!user?.roomId) return;
    const { room, deleted, newHostId } = rooms.leave(user);
    socket.leave(room.id);
    if (personalMessage) socket.emit(EVENTS.ROOM_LEFT, { reason: personalMessage });

    if (!deleted) {
      lobby.notifyRoom(room, 'info', `${user.pseudo} a quitté le salon.`);
      if (newHostId) {
        const newHost = room.players.find((p) => p.id === newHostId);
        lobby.notifyRoom(room, 'info', `${newHost.pseudo} devient Host du salon.`);
      }
      lobby.broadcastRoomState(room);
    }
    lobby.broadcastRooms();
    lobby.broadcastPlayers();
  }
}
