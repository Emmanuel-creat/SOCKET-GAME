/**
 * Room — entité salon.
 * Contient l'état d'un salon et les règles qui lui sont propres.
 * Ne fait aucune entrée/sortie (pas de Socket.IO ici).
 */
import { randomUUID } from 'node:crypto';
import { ROOM_STATUS, LIMITS } from '../../shared/constants.js';

export class Room {
  /**
   * @param {object} options
   * @param {string} options.name Nom affiché du salon.
   * @param {string} options.code Code de partage (6 caractères).
   * @param {object} options.host Utilisateur créateur (devient Host).
   * @param {number} options.maxPlayers Capacité maximale.
   */
  constructor({ name, code, host, maxPlayers }) {
    this.id = randomUUID();
    this.name = name;
    this.code = code;
    this.hostId = host.id;
    this.maxPlayers = maxPlayers;
    this.status = ROOM_STATUS.OPEN;
    this.gameId = null;
    this.createdAt = Date.now();
    /** @type {object[]} joueurs présents (objets UserManager, référence vivante) */
    this.players = [host];
    /** @type {object[]} historique du chat, borné */
    this.chat = [];
  }

  get isFull() {
    return this.players.length >= this.maxPlayers;
  }

  has(userId) {
    return this.players.some((p) => p.id === userId);
  }

  isHost(userId) {
    return this.hostId === userId;
  }

  addPlayer(user) {
    if (this.isFull || this.has(user.id)) return false;
    this.players.push(user);
    return true;
  }

  /**
   * Retire un joueur. Si le Host part, le joueur le plus ancien le remplace.
   * @returns {{removed: boolean, newHostId: string|null}}
   */
  removePlayer(userId) {
    const before = this.players.length;
    this.players = this.players.filter((p) => p.id !== userId);
    const removed = this.players.length < before;
    let newHostId = null;
    if (removed && this.hostId === userId && this.players.length > 0) {
      this.hostId = this.players[0].id;
      newHostId = this.hostId;
    }
    return { removed, newHostId };
  }

  /** Réduit la capacité sans jamais descendre sous l'effectif actuel. */
  setMaxPlayers(n) {
    this.maxPlayers = Math.max(n, this.players.length);
    return this.maxPlayers;
  }

  /** Ajoute un message au chat en bornant l'historique. */
  pushChatMessage(message) {
    this.chat.push(message);
    if (this.chat.length > LIMITS.CHAT_HISTORY_MAX) this.chat.shift();
    return message;
  }

  /**
   * Vue publique sérialisable du salon.
   * @param {(user: object) => object} toPublicUser projection d'un joueur.
   */
  toPublic(toPublicUser) {
    return {
      id: this.id,
      name: this.name,
      code: this.code,
      hostId: this.hostId,
      maxPlayers: this.maxPlayers,
      status: this.status,
      gameId: this.gameId,
      createdAt: this.createdAt,
      players: this.players.map(toPublicUser),
      chat: this.chat,
    };
  }

  /** Vue allégée pour la liste des salons du lobby (sans chat). */
  toSummary(toPublicUser) {
    const { chat, ...summary } = this.toPublic(toPublicUser);
    return summary;
  }
}
