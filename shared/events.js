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

  // --- Système ---
  SYS_NOTIFICATION: 'sys:notification', // serveur -> client : { type, message }
  SYS_ERROR: 'sys:error', // serveur -> client : { code, message }
});
