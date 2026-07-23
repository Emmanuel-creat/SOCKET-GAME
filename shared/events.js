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
  // Pause Café : chat global en direct, hors système de salons.
  LOUNGE_JOIN: 'lounge:join',              // client -> serveur
  LOUNGE_LEAVE: 'lounge:leave',            // client -> serveur
  LOUNGE_MESSAGE: 'lounge:message',        // client -> serveur : { text }
  LOUNGE_NEW_MESSAGE: 'lounge:newMessage', // serveur -> présents : { message }
  LOUNGE_HISTORY: 'lounge:history',        // serveur -> client à l'entrée : { messages }
  LOUNGE_ROSTER: 'lounge:roster',          // serveur -> présents : { roster }

  // Classement général (victoires tous jeux, identité = IP + cid navigateur).
  CLASSEMENT_GET: 'classement:get',   // client -> serveur : {}
  CLASSEMENT_DATA: 'classement:data', // serveur -> client : { top:[], moi }

  SYS_ERROR: 'sys:error', // serveur -> client : { code, message }
  SYS_PING: 'sys:ping', // serveur -> client : { t } (mesure de latence)
  SYS_PONG: 'sys:pong', // client -> serveur : { t }

  // --- Supervision (page programmeur, accès par code vérifié côté serveur) ---
  ADMIN_AUTH: 'admin:auth', // client -> serveur : { code }
  ADMIN_AUTHED: 'admin:authed', // serveur -> client : { ok, error? }
  ADMIN_STATS: 'admin:stats', // serveur -> admin : { serveur, capacite, reseau, clients, salons, historique }
  ADMIN_LEAVE: 'admin:leave', // client -> serveur : fin de la supervision

  // --- Diagnostic réseau (page programmeur → un client ciblé) ---
  DIAG_RUN: 'diag:run', // admin -> serveur : { socketId } (garde : admins authentifiés seulement)
  DIAG_PROGRESS: 'diag:progress', // serveur -> admin : { etape, ok, detail } (au fil des tests)
  DIAG_RESULT: 'diag:result', // serveur -> admin : rapport final { erreur? | identite, etapes }
  DIAG_PING: 'diag:ping', // serveur -> client ciblé : { id, seq, sentAt, payload? }
  DIAG_PONG: 'diag:pong', // client ciblé -> serveur : le paquet renvoyé tel quel (latence + intégrité)
  DIAG_ECHO_REQUEST: 'diag:echo:request', // serveur -> cible : { id, count, paceMs, to } — envoie des paquets RÉELS via game:message
  DIAG_ECHO_REPORT: 'diag:echo:report', // cible -> serveur : { id, recus, moy } — son propre bilan d'aller-retours
});
