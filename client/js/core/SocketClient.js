/**
 * SocketClient — unique point de contact avec le serveur.
 * Reçoit les événements réseau, met à jour le Store et relaie sur le bus.
 * Les vues n'importent JAMAIS socket.io directement.
 */
import { EVENTS } from '/shared/events.js';
import { bus } from './EventBus.js';
import { store } from './Store.js';

export class SocketClient {
  constructor() {
    /* global io */
    this.socket = io();
    this.bindIncoming();
  }

  /** Câblage des événements serveur -> état client. */
  bindIncoming() {
    const s = this.socket;

    s.on(EVENTS.USER_REGISTERED, ({ user }) => store.set('me', user));
    s.on(EVENTS.LOBBY_PLAYERS, ({ players }) => {
      store.set('players', players);
      // Le statut du joueur local peut changer côté serveur (salon, partie...) :
      // on resynchronise `me` à partir de la liste diffusée.
      const me = store.get('me');
      const fresh = me && players.find((p) => p.id === me.id);
      if (fresh) store.set('me', fresh);
    });
    s.on(EVENTS.LOBBY_ROOMS, ({ rooms }) => store.set('rooms', rooms));
    s.on(EVENTS.LOBBY_GAMES, ({ games }) => store.set('games', games));

    s.on(EVENTS.ROOM_JOINED, ({ room }) => {
      store.set('room', room);
      bus.emit('app:navigate', 'room');
    });

    s.on(EVENTS.ROOM_STATE, ({ room }) => store.set('room', room));

    s.on(EVENTS.ROOM_LEFT, ({ reason }) => {
      store.set('room', null);
      store.set('activeGame', null);
      if (reason) bus.emit('notify', { type: 'info', message: reason });
      bus.emit('app:navigate', 'rooms');
    });

    s.on(EVENTS.CHAT_NEW_MESSAGE, ({ message }) => bus.emit('chat:newMessage', message));

    s.on(EVENTS.GAME_STARTED, ({ gameId, context }) => {
      store.set('activeGame', { gameId, context });
      bus.emit('app:navigate', 'game');
    });

    s.on(EVENTS.GAME_ENDED, ({ result }) => {
      // Retour automatique au salon en fin de partie.
      store.set('activeGame', null);
      bus.emit('app:navigate', 'room');
      if (result?.summary) bus.emit('notify', { type: 'success', message: result.summary });
    });

    s.on(EVENTS.SYS_NOTIFICATION, ({ type, message }) => bus.emit('notify', { type, message }));
    s.on(EVENTS.SYS_ERROR, ({ message }) => bus.emit('notify', { type: 'error', message }));

    s.on('disconnect', () => bus.emit('notify', { type: 'error', message: 'Connexion au serveur perdue.' }));
  }

  // --- API sortante (une méthode par intention utilisateur) ---

  register(profile) { this.socket.emit(EVENTS.USER_REGISTER, profile); }
  updateProfile(profile) { this.socket.emit(EVENTS.USER_UPDATE_PROFILE, profile); }
  setStatus(status) { this.socket.emit(EVENTS.USER_SET_STATUS, { status }); }

  createRoom(payload) { this.socket.emit(EVENTS.ROOM_CREATE, payload); }
  joinRoom(code) { this.socket.emit(EVENTS.ROOM_JOIN, { code }); }
  leaveRoom() { this.socket.emit(EVENTS.ROOM_LEAVE); }
  kickPlayer(userId) { this.socket.emit(EVENTS.ROOM_KICK, { userId }); }
  setRoomGame(gameId) { this.socket.emit(EVENTS.ROOM_SET_GAME, { gameId }); }
  setRoomMaxPlayers(maxPlayers) { this.socket.emit(EVENTS.ROOM_SET_MAX_PLAYERS, { maxPlayers }); }
  closeRoom() { this.socket.emit(EVENTS.ROOM_CLOSE); }

  sendChatMessage(text) { this.socket.emit(EVENTS.CHAT_MESSAGE, { text }); }

  startGame() { this.socket.emit(EVENTS.GAME_START); }
  endGame(result) { this.socket.emit(EVENTS.GAME_END, { result }); }
}
