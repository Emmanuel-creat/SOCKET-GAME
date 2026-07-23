/**
 * LoungeService — « Pause Café » : chat en direct global, accessible sans
 * créer ni rejoindre de salon. Une seule instance, partagée par tout le
 * monde — délibérément indépendante du système Room/RoomManager (qui
 * suppose un hôte, un jeu, une capacité, un cycle de vie par partie —
 * rien de tout ça n'a de sens ici).
 *
 * Le "lounge" socket.io (`socket.join('lounge')`) est un simple groupement
 * technique pour diffuser efficacement ; ce n'est PAS une Room de la
 * plateforme (pas de code, pas d'hôte, pas de capacité).
 */
import { EVENTS } from '../../shared/events.js';
import { isValidChatMessage, sanitizeText } from '../../shared/validation.js';

const LOUNGE_CHANNEL = 'lounge';
const HISTORY_MAX = 200;
const HISTORY_SENT_ON_JOIN = 100;

export class LoungeService {
  constructor({ io, users }) {
    this.io = io;
    this.users = users;
    this.members = new Map(); // socketId -> { id, pseudo, avatar, color }
    this.history = [];
  }

  join(socket) {
    const user = this.users.get(socket.id);
    if (!user) return;
    if (this.members.has(socket.id)) return; // déjà présent (double clic, re-render...)
    this.members.set(socket.id, { id: user.id, pseudo: user.pseudo, avatar: user.avatar, color: user.color });
    socket.join(LOUNGE_CHANNEL);
    socket.emit(EVENTS.LOUNGE_HISTORY, { messages: this.history.slice(-HISTORY_SENT_ON_JOIN) });
    this.broadcastRoster();
  }

  leave(socket) {
    if (!this.members.has(socket.id)) return;
    this.members.delete(socket.id);
    socket.leave(LOUNGE_CHANNEL);
    this.broadcastRoster();
  }

  message(socket, text) {
    const user = this.users.get(socket.id);
    const member = this.members.get(socket.id);
    if (!user || !member) return; // il faut avoir rejoint avant de parler
    if (!isValidChatMessage(text)) return;

    const message = {
      id: `${Date.now()}-${user.id.slice(0, 8)}`,
      authorId: user.id,
      pseudo: user.pseudo,
      avatar: user.avatar,
      color: user.color,
      text: sanitizeText(text),
      at: Date.now(),
    };
    this.history.push(message);
    if (this.history.length > HISTORY_MAX) this.history.shift();
    this.io.to(LOUNGE_CHANNEL).emit(EVENTS.LOUNGE_NEW_MESSAGE, { message });
  }

  broadcastRoster() {
    const roster = [...this.members.values()];
    this.io.to(LOUNGE_CHANNEL).emit(EVENTS.LOUNGE_ROSTER, { roster });
  }

  /** À appeler depuis le handler de déconnexion socket.io — évite les fantômes dans le roster. */
  disconnect(socket) { this.leave(socket); }
}
