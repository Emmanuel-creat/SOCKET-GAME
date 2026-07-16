/**
 * Catalogue des événements Socket.IO.
 * Convention : `domaine:action`. Utilisé côté client ET serveur
 * afin d'éliminer toute chaîne magique.
 */
export const EVENTS = Object.freeze({
  // --- Cycle de vie utilisateur ---
  USER_REGISTER: 'user:register', // client -> serveur : { pseudo, avatar, color }
  USER_REGISTERED: 'user:registered', // serveur -> client : { user }
  USER_UPDATE_PROFILE: 'user:updateProfile', // client -> serveur : { pseudo?, avatar?, color? }
  USER_SET_STATUS: 'user:setStatus', // client -> serveur : { status }

  // --- Lobby (données globales) ---
  LOBBY_PLAYERS: 'lobby:players', // serveur -> tous : { players: [] }
  LOBBY_ROOMS: 'lobby:rooms', // serveur -> tous : { rooms: [] }
  LOBBY_GAMES: 'lobby:games', // serveur -> client : { games: [] }

  // --- Salons ---
  ROOM_CREATE: 'room:create', // client -> serveur : { name, maxPlayers }
  ROOM_JOIN: 'room:join', // client -> serveur : { code }
  ROOM_LEAVE: 'room:leave', // client -> serveur
  ROOM_KICK: 'room:kick', // client(host) -> serveur : { userId }
  ROOM_SET_GAME: 'room:setGame', // client(host) -> serveur : { gameId }
  ROOM_SET_MAX_PLAYERS: 'room:setMaxPlayers', // client(host) -> serveur : { maxPlayers }
  ROOM_CLOSE: 'room:close', // client(host) -> serveur
  ROOM_STATE: 'room:state', // serveur -> membres : { room }
  ROOM_JOINED: 'room:joined', // serveur -> client : { room }
  ROOM_LEFT: 'room:left', // serveur -> client : { reason }

  // --- Chat de salon ---
  CHAT_MESSAGE: 'chat:message', // client -> serveur : { text }
  CHAT_NEW_MESSAGE: 'chat:newMessage', // serveur -> membres : { message }

  // --- Cycle de vie d'une partie ---
  GAME_START: 'game:start', // client(host) -> serveur
  GAME_STARTED: 'game:started', // serveur -> membres : { gameId, context }
  GAME_END: 'game:end', // client(host ou module) -> serveur : { result }
  GAME_ENDED: 'game:ended', // serveur -> membres : { result }
  // Relais générique de données de jeu pendant une partie. Le serveur ne lit
  // jamais `data` : il route seulement (à un joueur ciblé, ou au reste du salon).
  GAME_MESSAGE: 'game:message', // client <-> serveur : { to?, data } / reçu : { from, data }

  // --- Système ---
  SYS_NOTIFICATION: 'sys:notification', // serveur -> client : { type, message }
  SYS_ERROR: 'sys:error', // serveur -> client : { code, message }
  SYS_PING: 'sys:ping', // serveur -> client : { t } (mesure de latence)
  SYS_PONG: 'sys:pong', // client -> serveur : { t }

  // --- Supervision (page programmeur, accès par code vérifié côté serveur) ---
  ADMIN_AUTH: 'admin:auth', // client -> serveur : { code }
  ADMIN_AUTHED: 'admin:authed', // serveur -> client : { ok, error? }
  ADMIN_STATS: 'admin:stats', // serveur -> admin : { serveur, capacite, reseau, clients, salons, historique }
  ADMIN_LEAVE: 'admin:leave', // client -> serveur : fin de la supervision

  // --- Diagnostic réseau (page programmeur) ---
  // Un admin choisit un client dans le tableau et lance une batterie de tests
  // CONTRE CE CLIENT PRÉCIS (pas contre lui-même) : répondant, RTT/gigue, débit,
  // intégrité de charge utile, et — le test qui compte pour La Traque — le
  // relais réel `game:message` (mêmes vérifications serveur qu'une commande en
  // partie : salon IN_GAME, destinataire trouvé).
  DIAG_RUN: 'diag:run', // admin -> serveur : { targetSocketId }
  DIAG_PROGRESS: 'diag:progress', // serveur -> admin : { etape, ok, detail } (au fil de l'eau)
  DIAG_RESULT: 'diag:result', // serveur -> admin : rapport complet, ou { erreur }
  DIAG_PING: 'diag:ping', // serveur -> client ciblé : { id, seq, sentAt, payload? }
  DIAG_PONG: 'diag:pong', // client -> serveur : renvoie {id, seq, sentAt, payload?} tel quel
  DIAG_ECHO_REQUEST: 'diag:echoRequest', // serveur -> client ciblé : { id, count, paceMs }
  DIAG_ECHO_REPORT: 'diag:echoReport', // client ciblé -> serveur : { id, recus, moy }
});
