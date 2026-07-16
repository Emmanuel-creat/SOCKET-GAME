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
    // WebSocket EN PREMIER. Par défaut Socket.IO démarre en polling (une requête
    // HTTP par message !) puis tente une bascule. Un invité resté en polling
    // sature à lui seul un serveur à 0,1 CPU. Si le WebSocket est bloqué par le
    // réseau, on retombe sur le mode par défaut.
    this.socket = io({ transports: ['websocket'], upgrade: false });
    this.socket.on('connect_error', () => {
      if (this.secours || this.socket.connected) return;
      this.secours = true;
      this.socket.io.opts.transports = ['polling', 'websocket'];
      this.socket.io.opts.upgrade = true;
    });
    this.diagEcho = null; // écho de diagnostic en cours (un seul à la fois)
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

    // Données de jeu relayées pendant une partie (le module de jeu s'y abonne).
    // Exception : les paquets `t:'diag'` sont interceptés ICI, avant tout module
    // de jeu — aucun module ne les reconnaît (ils utilisent 'action'/'view'/
    // 'error'), c'est uniquement le retour de l'écho de diagnostic déclenché
    // par diag:echoRequest ci-dessous.
    s.on(EVENTS.GAME_MESSAGE, ({ from, data }) => {
      if (data?.t === 'diag') { this.onDiagEcho(data); return; }
      bus.emit('game:message', { from, data });
    });

    // --- Diagnostic réseau (page programmeur) ---
    // TOUT client répond à ceci, admin ou non : c'est lui qu'on peut tester
    // depuis le tableau des clients connectés, pas seulement l'admin lui-même.
    s.on(EVENTS.DIAG_PING, ({ id, seq, sentAt, payload }) => {
      s.emit(EVENTS.DIAG_PONG, { id, seq, sentAt, payload });
    });
    s.on(EVENTS.DIAG_ECHO_REQUEST, ({ id, count, paceMs }) => this.runDiagEcho(id, count, paceMs));

    s.on(EVENTS.DIAG_PROGRESS, (p) => bus.emit('diag:progress', p));
    s.on(EVENTS.DIAG_RESULT, (r) => bus.emit('diag:result', r));

    // Mesure de latence : on renvoie l'horodatage tel quel, le serveur fait le calcul.
    s.on(EVENTS.SYS_PING, ({ t }) => s.emit(EVENTS.SYS_PONG, { t }));

    // Supervision (page programmeur).
    s.on(EVENTS.ADMIN_AUTHED, (res) => bus.emit('admin:authed', res));
    s.on(EVENTS.ADMIN_STATS, (stats) => bus.emit('admin:stats', stats));

    s.on(EVENTS.SYS_NOTIFICATION, ({ type, message }) => bus.emit('notify', { type, message }));
    s.on(EVENTS.SYS_ERROR, ({ message }) => bus.emit('notify', { type: 'error', message }));

    s.on('disconnect', () => bus.emit('notify', { type: 'error', message: 'Connexion au serveur perdue.' }));
  }

  /**
   * Répond à diag:echoRequest en s'envoyant À SOI-MÊME `count` paquets réels
   * via sendGameMessage — la MÊME méthode que toute commande de jeu, aucune
   * copie. Ça exerce exactement le relais que La Traque emprunte (salon
   * IN_GAME, destinataire trouvé), sans dépendre d'un deuxième joueur.
   */
  runDiagEcho(id, count, paceMs) {
    const me = store.get('me');
    if (!me) { this.socket.emit(EVENTS.DIAG_ECHO_REPORT, { id, recus: 0, moy: null }); return; }

    const attendus = new Map();
    this.diagEcho = { id, attendus };

    let i = 0;
    const envoyer = () => {
      if (i >= count) {
        setTimeout(() => this.finDiagEcho(id), Math.max(1500, paceMs * 4));
        return;
      }
      const seq = i;
      i += 1;
      attendus.set(seq, { sentAt: Date.now(), recuAt: null });
      this.sendGameMessage({ t: 'diag', id, seq, sentAt: Date.now() }, me.id);
      setTimeout(envoyer, paceMs);
    };
    envoyer();
  }

  /** Reçoit un paquet diag:'diag' revenu par le relais réel — pointé depuis bindIncoming(). */
  onDiagEcho(data) {
    if (!this.diagEcho || data?.id !== this.diagEcho.id) return;
    const e = this.diagEcho.attendus.get(data.seq);
    if (e && e.recuAt === null) e.recuAt = Date.now();
  }

  finDiagEcho(id) {
    if (!this.diagEcho || this.diagEcho.id !== id) return;
    const vals = [...this.diagEcho.attendus.values()];
    const recus = vals.filter((v) => v.recuAt !== null);
    const moy = recus.length ? Math.round(recus.reduce((s, v) => s + (v.recuAt - v.sentAt), 0) / recus.length) : null;
    this.socket.emit(EVENTS.DIAG_ECHO_REPORT, { id, recus: recus.length, moy });
    this.diagEcho = null;
  }

  // --- API sortante (une méthode par intention utilisateur) ---

  adminAuth(code) { this.socket.emit(EVENTS.ADMIN_AUTH, { code }); }
  adminLeave() { this.socket.emit(EVENTS.ADMIN_LEAVE); }
  /** Lance la batterie de diagnostic contre un client précis (page programmeur). */
  runDiagnostic(targetSocketId) { this.socket.emit(EVENTS.DIAG_RUN, { targetSocketId }); }

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
  /** Relais de données de jeu : `to` cible un joueur (id), sinon diffusion au salon. */
  sendGameMessage(data, to = null) { this.socket.emit(EVENTS.GAME_MESSAGE, { to, data }); }
}
