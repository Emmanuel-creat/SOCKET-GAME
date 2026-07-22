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
    // Les paquets t:'diag' (diagnostic réseau lancé depuis la page programmeur)
    // empruntent volontairement CE canal — le même trajet qu'une vraie commande de
    // jeu — mais aucun module ne les connaît : on les intercepte ici, avant le bus.
    s.on(EVENTS.GAME_MESSAGE, ({ from, data }) => {
      if (data?.t === 'diag') { this.surPaquetDiag(from, data); return; }
      bus.emit('game:message', { from, data });
    });

    // --- Diagnostic réseau : ce client peut être la CIBLE d'une batterie de tests ---
    // Ping brut : on renvoie le paquet tel quel (le serveur mesure la latence et
    // vérifie l'intégrité de la charge octet pour octet).
    s.on(EVENTS.DIAG_PING, (paquet) => s.emit(EVENTS.DIAG_PONG, paquet));

    // Écho relais : on envoie `count` paquets RÉELS via game:message vers `to`
    // (soi-même ou une contrepartie du salon), on compte ceux qui reviennent,
    // et on rapporte notre propre bilan. C'est le test qui reproduit exactement
    // le trajet d'une commande de jeu.
    s.on(EVENTS.DIAG_ECHO_REQUEST, ({ id, count, paceMs, to } = {}) => this.lancerEcho(id, count, paceMs, to));

    // Progression et résultat d'un diagnostic (côté admin, page programmeur).
    s.on(EVENTS.DIAG_PROGRESS, (p) => bus.emit('diag:progress', p));
    s.on(EVENTS.DIAG_RESULT, (r) => bus.emit('diag:result', r));

    // Mesure de latence : on renvoie l'horodatage tel quel, le serveur fait le calcul.
    s.on(EVENTS.SYS_PING, ({ t }) => s.emit(EVENTS.SYS_PONG, { t }));

    // Supervision (page programmeur).
    s.on(EVENTS.ADMIN_AUTHED, (res) => bus.emit('admin:authed', res));
    s.on(EVENTS.ADMIN_STATS, (stats) => bus.emit('admin:stats', stats));

    s.on(EVENTS.CLASSEMENT_DATA, (data) => bus.emit('classement:data', data));
    s.on(EVENTS.SYS_NOTIFICATION, ({ type, message }) => bus.emit('notify', { type, message }));
    s.on(EVENTS.SYS_ERROR, ({ code, message }) => {
      bus.emit('sys:error', { code, message });
      // Le refus de pseudo a sa propre page plein écran : pas de toast en doublon.
      if (code !== 'PSEUDO_RESERVE') bus.emit('notify', { type: 'error', message });
    });

    s.on('disconnect', () => bus.emit('notify', { type: 'error', message: 'Connexion au serveur perdue.' }));
  }

  // --- API sortante (une méthode par intention utilisateur) ---

  demanderClassement() { this.socket.emit(EVENTS.CLASSEMENT_GET, {}); }

  adminAuth(code) { this.socket.emit(EVENTS.ADMIN_AUTH, { code }); }
  adminLeave() { this.socket.emit(EVENTS.ADMIN_LEAVE); }
  runDiagnostic(socketId) { this.socket.emit(EVENTS.DIAG_RUN, { socketId }); }

  /* --- Diagnostic réseau : mécanique côté client ciblé --------------------- */

  /**
   * Un paquet t:'diag' arrive par game:message.
   * — S'il porte l'identifiant de NOTRE écho en cours, c'est un de nos paquets qui
   *   a bouclé : on note sa latence.
   * — Sinon, nous sommes la CONTREPARTIE d'un écho croisé : on le renvoie tel quel
   *   à son expéditeur. C'est ce renvoi qui permet de tester un aller-retour réel
   *   entre deux joueurs sans que le serveur orchestre les deux bouts.
   */
  surPaquetDiag(from, data) {
    const e = this.echoEnCours;
    if (e && data.id === e.id) {
      if (!e.vus.has(data.seq)) {
        e.vus.add(data.seq);
        e.latences.push(Date.now() - data.sentAt);
        if (e.vus.size >= e.count) this.finirEcho();   // tout est revenu : bilan immédiat
      }
      return;
    }
    this.sendGameMessage({ ...data }, from);   // relais croisé : retour à l'envoyeur
  }

  lancerEcho(id, count, paceMs, to) {
    if (!id || !Number.isFinite(count) || count <= 0 || !to) return;
    if (this.echoEnCours) this.finirEcho();    // un seul écho à la fois : on solde l'ancien
    const e = { id, count, to, vus: new Set(), latences: [], timer: null, fin: null };
    this.echoEnCours = e;

    let seq = 0;
    const envoyer = () => {
      if (this.echoEnCours !== e) return;
      this.sendGameMessage({ t: 'diag', id, seq, sentAt: Date.now() }, to);
      seq += 1;
      if (seq < count) e.timer = setTimeout(envoyer, Math.max(0, paceMs ?? 0));
      else e.fin = setTimeout(() => this.finirEcho(), Math.max(600, (paceMs ?? 0) * 4 + 600));
    };
    envoyer();
  }

  finirEcho() {
    const e = this.echoEnCours;
    if (!e) return;
    this.echoEnCours = null;
    clearTimeout(e.timer);
    clearTimeout(e.fin);
    const moy = e.latences.length
      ? Math.round(e.latences.reduce((a, b) => a + b, 0) / e.latences.length)
      : null;
    this.socket.emit(EVENTS.DIAG_ECHO_REPORT, { id: e.id, recus: e.vus.size, moy });
  }

  register(profile) {
    // Identité stable du navigateur : générée une fois, gardée en localStorage.
    // C'est elle qui permet de récupérer sa place (et son identifiant) dans une
    // partie en cours après un rafraîchissement de page — sans elle, chaque F5
    // faisait de vous un inconnu que le moteur du Host ignorait à jamais.
    let cid = null;
    try {
      cid = localStorage.getItem('arcade:cid');
      if (!cid) { cid = crypto.randomUUID(); localStorage.setItem('arcade:cid', cid); }
    } catch { cid = null; }
    this.socket.emit(EVENTS.USER_REGISTER, { ...profile, cid });
  }
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
