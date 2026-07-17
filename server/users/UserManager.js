/**
 * UserManager — registre des joueurs connectés.
 * Responsabilité unique : cycle de vie et profil des utilisateurs.
 * Ne connaît ni les salons ni Socket.IO (découplage).
 */
import { randomUUID } from 'node:crypto';
import { USER_STATUS } from '../../shared/constants.js';
import { sanitizeText, isValidPseudo, isValidUserStatus } from '../../shared/validation.js';

export class UserManager {
  constructor() {
    /** @type {Map<string, object>} clé = socketId */
    this.bySocket = new Map();
  }

  /**
   * Crée un utilisateur pour un socket donné.
   * @returns {object|null} l'utilisateur créé, ou null si profil invalide.
   */
  register(socketId, { pseudo, avatar, color, cid }) {
    if (!isValidPseudo(pseudo)) return null;
    const user = {
      id: randomUUID(),
      socketId,
      // Identité STABLE du navigateur (localStorage) : c'est elle qui permet à un
      // joueur de récupérer sa place — et son identifiant — après un rafraîchissement
      // de page en pleine partie. Sans elle, chaque connexion est un inconnu.
      cid: typeof cid === 'string' && cid.length > 0 && cid.length <= 64 ? cid : null,
      pseudo: sanitizeText(pseudo),
      avatar: sanitizeText(avatar) || '🎮',
      color: /^#[0-9a-fA-F]{6}$/.test(color) ? color : '#7c5cff',
      status: USER_STATUS.ONLINE,
      roomId: null,
      connectedAt: Date.now(),
    };
    this.bySocket.set(socketId, user);
    return user;
  }

  /** Met à jour le profil (champs optionnels, validés individuellement). */
  updateProfile(socketId, { pseudo, avatar, color } = {}) {
    const user = this.bySocket.get(socketId);
    if (!user) return null;
    if (pseudo !== undefined && isValidPseudo(pseudo)) user.pseudo = sanitizeText(pseudo);
    if (avatar !== undefined) user.avatar = sanitizeText(avatar) || user.avatar;
    if (color !== undefined && /^#[0-9a-fA-F]{6}$/.test(color)) user.color = color;
    return user;
  }

  /** Change le statut d'un joueur si celui-ci est valide. */
  setStatus(socketId, status) {
    const user = this.bySocket.get(socketId);
    if (!user || !isValidUserStatus(status)) return null;
    user.status = status;
    return user;
  }

  /** Associe (ou dissocie avec null) un joueur à un salon. */
  setRoom(socketId, roomId) {
    const user = this.bySocket.get(socketId);
    if (!user) return null;
    user.roomId = roomId;
    user.status = roomId ? USER_STATUS.IN_ROOM : USER_STATUS.ONLINE;
    return user;
  }

  get(socketId) {
    return this.bySocket.get(socketId) ?? null;
  }

  /** Recherche par identifiant public (utile pour l'expulsion). */
  getById(userId) {
    for (const user of this.bySocket.values()) {
      if (user.id === userId) return user;
    }
    return null;
  }

  remove(socketId) {
    const user = this.bySocket.get(socketId);
    this.bySocket.delete(socketId);
    return user ?? null;
  }

  /**
   * Détache un utilisateur de sa socket morte SANS le détruire : il part « en
   * grâce » (il garde son id, son salon, son profil) en attendant un éventuel
   * retour. À utiliser en tandem avec rattacher().
   */
  detacher(socketId) {
    const user = this.bySocket.get(socketId);
    this.bySocket.delete(socketId);
    if (user) user.socketId = null;
    return user ?? null;
  }

  /** Le joueur revient : on raccroche SON utilisateur à sa nouvelle socket. */
  rattacher(user, socketId) {
    user.socketId = socketId;
    this.bySocket.set(socketId, user);
    return user;
  }

  /** Vue publique d'un utilisateur (jamais exposer socketId). */
  toPublic(user) {
    const { id, pseudo, avatar, color, status } = user;
    return { id, pseudo, avatar, color, status };
  }

  /** Liste publique de tous les joueurs connectés. */
  listPublic() {
    return [...this.bySocket.values()].map((u) => this.toPublic(u));
  }
}
