/**
 * registerSocketHandlers — couche transport.
 * Traduit les événements Socket.IO en appels aux managers, puis diffuse.
 * Aucune règle métier ici : uniquement de l'orchestration.
 */
import { EVENTS } from '../../shared/events.js';
import { GAME_STATE, LIMITS, ROOM_STATUS } from '../../shared/constants.js';
import { sanitizeText, isValidChatMessage } from '../../shared/validation.js';

export function registerSocketHandlers({ io, socket, users, rooms, lobby, gameRegistry, admin = null, diagnostics = null, grace = null }) {
  /** Raccourci : émet une erreur normalisée au client courant. */
  const fail = (code, message) => socket.emit(EVENTS.SYS_ERROR, { code, message });

  // --- Supervision : compteur de messages et mesure de latence ---
  if (admin) {
    socket.onAny(() => admin.onMessage(socket.id));
    socket.on(EVENTS.SYS_PONG, (payload) => admin.onPong(socket, payload));

    // Page programmeur : le code est vérifié SERVEUR, avec limitation par IP.
    socket.on(EVENTS.ADMIN_AUTH, ({ code } = {}) => {
      const res = admin.auth(socket, code);
      socket.emit(EVENTS.ADMIN_AUTHED, res);
      if (res.ok) socket.emit(EVENTS.ADMIN_STATS, admin.stats());
    });
    socket.on(EVENTS.ADMIN_LEAVE, () => admin.quitter(socket.id));

    // Diagnostic réseau contre un client ciblé — réservé aux admins déjà
    // authentifiés : la garde est ICI, pas dans le service, pour qu'aucun
    // client lambda ne puisse déclencher une batterie de tests sur un autre.
    socket.on(EVENTS.DIAG_RUN, ({ socketId } = {}) => {
      if (!admin.estAdmin(socket.id) || !diagnostics) return;
      diagnostics.lancer(socket, socketId);
    });
  }

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
    // REPRISE DE PARTIE — le cœur du correctif « mes commandes n'arrivent jamais ».
    // Si ce navigateur (identifié par son cid persistant) a quitté une partie en
    // cours il y a moins de GRACE_MS, on ne crée PAS un inconnu : on lui rend SON
    // utilisateur — même id, même place au salon. L'engine du Host le reconnaît
    // donc immédiatement, et ses commandes redeviennent valides sans rien changer.
    const reprise = payload.cid && grace ? grace.reprendre(payload.cid) : null;
    if (reprise) {
      const user = users.rattacher(reprise.user, socket.id);
      const room = rooms.get(reprise.roomId);
      socket.emit(EVENTS.USER_REGISTERED, { user: users.toPublic(user) });
      lobby.sendSnapshot(socket);
      if (room && room.has(user.id)) {
        socket.join(room.id);
        socket.emit(EVENTS.ROOM_JOINED, { room: room.toPublic((u) => users.toPublic(u)) });
        lobby.notifyRoom(room, 'info', `${user.pseudo} est revenu.`);
        lobby.broadcastRoomState(room);
        // La partie tourne toujours : on la lui renvoie. Son module remonte, envoie
        // son « hello », reçoit un état complet — et il rejoue, avec le même id.
        if (room.status === ROOM_STATUS.IN_GAME && room.gameId) {
          const context = {
            roomId: room.id,
            roomName: room.name,
            hostId: room.hostId,
            players: room.players.map((u) => users.toPublic(u)),
          };
          socket.emit(EVENTS.GAME_STARTED, { gameId: room.gameId, context });
        }
      }
      lobby.broadcastPlayers();
      console.log(`[pipeline] reprise : ${user.pseudo} (${user.id.slice(0, 8)}) a récupéré sa place`);
      return;
    }

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

    // Jeu présélectionné (flux « Jouer » → carte d'un jeu) : associé dès la
    // création, même validation que room:setGame. Un id invalide est ignoré
    // sans faire échouer la création.
    if (payload.gameId) {
      const sel = gameRegistry.canSelect(payload.gameId, room.players.length);
      if (sel.ok) room.gameId = payload.gameId;
    }

    socket.join(room.id);
    socket.emit(EVENTS.ROOM_JOINED, { room: room.toPublic((u) => users.toPublic(u)) });
    const game = room.gameId ? gameRegistry.get(room.gameId) : null;
    notify('success', `Salon « ${room.name} » créé${game ? ` pour ${game.nom}` : ''}. Code : ${room.code}`);
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
    admin?.onGameStart();
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

  // Journal du pipeline : chaque message jeté est COMPTÉ et LOGGUÉ (throttlé).
  // Un relais qui jette en silence, c'est des heures de débogage à l'aveugle : le
  // symptôme « mes commandes n'arrivent jamais » a tenu des semaines précisément
  // parce que rien, nulle part, ne disait où elles mouraient.
  const pipelineDrops = registerSocketHandlers._drops ??= new Map();   // raison -> { n, depuis, dernierLog }
  const dropPipeline = (raison, detail) => {
    const e = pipelineDrops.get(raison) ?? { n: 0, dernierLog: 0 };
    e.n += 1;
    const now = Date.now();
    if (now - e.dernierLog > 2000) {   // au plus un log toutes les 2 s par raison
      console.warn(`[pipeline] ${raison} ×${e.n} — ${detail}`);
      e.dernierLog = now;
      e.n = 0;
    }
    pipelineDrops.set(raison, e);
  };

  socket.on(EVENTS.GAME_MESSAGE, ({ to = null, data } = {}) => {
    const user = requireUser();
    const room = user && requireRoom(user);
    if (!room) return;   // requireUser/requireRoom ont déjà émis l'erreur au client
    if (room.status !== ROOM_STATUS.IN_GAME) {
      dropPipeline('NO_GAME_RUNNING', `de ${user.pseudo}`);
      return fail('NO_GAME_RUNNING', 'Aucune partie en cours.');
    }
    if (data === undefined) {
      dropPipeline('PAYLOAD_VIDE', `de ${user.pseudo}`);
      return fail('EMPTY_GAME_MESSAGE', 'Message de jeu vide.');
    }

    const envelope = { from: user.id, data };
    if (to) {
      // Message ciblé (ex. : envoyer sa main privée à un joueur précis).
      const target = users.getById(to);
      if (!target || !room.has(target.id)) {
        // Destinataire simplement ABSENT (en grâce de reconnexion) : ce n'est pas
        // une erreur. Ses vues se perdent le temps de son retour — il recevra un
        // état complet via son « hello ». On compte, on ne crie pas.
        if (grace?.enGrace(to)) { dropPipeline('DESTINATAIRE_EN_GRACE', `vers ${to.slice(0, 8)}`); return; }
        dropPipeline('TARGET_NOT_IN_ROOM', `de ${user.pseudo} vers ${String(to).slice(0, 8)}`);
        return fail('TARGET_NOT_IN_ROOM', 'Destinataire introuvable dans le salon.');
      }
      const targetSocket = io.sockets.sockets.get(target.socketId);
      if (!targetSocket) {
        // Membre du salon mais socket morte (grâce en cours) : même traitement.
        dropPipeline('SOCKET_ABSENTE', `vers ${target.pseudo}`);
        return;
      }
      targetSocket.emit(EVENTS.GAME_MESSAGE, envelope);
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
    admin?.onDisconnect(socket);
    const user = users.get(socket.id);
    if (!user) return;

    // GRÂCE DE RECONNEXION — si ce joueur est dans une partie EN COURS et porte une
    // identité stable, on ne le retire pas : on le détache de sa socket morte et on
    // l'attend GRACE_MS. Un rafraîchissement de page n'est plus une exclusion : au
    // retour (même cid), il récupère son utilisateur — même id — et l'engine du
    // Host, qui ne connaît que les joueurs du lancement, le reconnaît. C'est CE
    // mécanisme qui garantit que ses commandes atteignent à nouveau l'autorité.
    const room = user.roomId ? rooms.get(user.roomId) : null;
    if (grace && room && room.status === ROOM_STATUS.IN_GAME && user.cid) {
      users.detacher(socket.id);
      const ok = grace.differer(user, room, (parti, etaitHost) => {
        // Personne n'est revenu : retrait réel, ANNONCÉ.
        console.log(`[pipeline] grâce expirée : ${parti.pseudo} (${parti.id.slice(0, 8)})${etaitHost ? ` — c'était le Host` : ''}`);
        const r = parti.roomId ? rooms.get(parti.roomId) : null;
        if (r && etaitHost && r.status === ROOM_STATUS.IN_GAME) {
          // L'autorité de la partie vivait dans SON navigateur : sans lui, les
          // invités commanderaient dans le vide pour toujours. On termine
          // proprement — plus de partie zombie silencieuse.
          rooms.endGame(r);
          io.to(r.id).emit(EVENTS.GAME_ENDED, { result: { interrompu: true, message: `Partie interrompue : ${parti.pseudo} (l'hôte) ne s'est pas reconnecté.` } });
        }
        if (r) {
          const { deleted, newHostId } = rooms.leave(parti);
          if (!deleted) {
            if (newHostId) lobby.notifyRoom(r, 'warning', 'Le Host a quitté : nouveau Host désigné.');
            lobby.notifyRoom(r, 'info', `${parti.pseudo} a quitté la partie (déconnecté).`);
            lobby.broadcastRoomState(r);
          }
          lobby.broadcastRooms();
        }
        lobby.broadcastPlayers();
      });
      if (ok) {
        lobby.notifyRoom(room, 'warning', `${user.pseudo} a perdu la connexion — il peut revenir.`);
        lobby.broadcastRoomState(room);
        lobby.broadcastPlayers();
        console.log(`[pipeline] grâce ouverte : ${user.pseudo} (${user.id.slice(0, 8)}) — retour possible`);
        return;
      }
      // Pas d'identité stable : on retombe sur le comportement historique.
      users.rattacher(user, socket.id);
    }

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
