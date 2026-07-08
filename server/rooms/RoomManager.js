/**
 * RoomManager — création, recherche et suppression des salons.
 * Orchestration pure : les règles internes d'un salon vivent dans Room.
 */
import { Room } from './Room.js';
import { ROOM_CODE_ALPHABET, LIMITS, ROOM_STATUS, USER_STATUS } from '../../shared/constants.js';
import { sanitizeText, isValidRoomName, isValidMaxPlayers } from '../../shared/validation.js';

export class RoomManager {
  /** @param {{users: import('../users/UserManager.js').UserManager}} deps */
  constructor({ users }) {
    this.users = users;
    /** @type {Map<string, Room>} clé = room.id */
    this.rooms = new Map();
    /** @type {Map<string, string>} code -> room.id */
    this.byCode = new Map();
  }

  /** Génère un code de partage unique de 6 caractères non ambigus. */
  generateCode() {
    let code;
    do {
      code = Array.from({ length: LIMITS.ROOM_CODE_LENGTH }, () =>
        ROOM_CODE_ALPHABET[Math.floor(Math.random() * ROOM_CODE_ALPHABET.length)],
      ).join('');
    } while (this.byCode.has(code));
    return code;
  }

  /**
   * Crée un salon dont `host` devient automatiquement Host.
   * @returns {{room?: Room, error?: string}}
   */
  create(host, { name, maxPlayers }) {
    if (!host) return { error: 'Profil requis pour créer un salon.' };
    if (host.roomId) return { error: 'Vous êtes déjà dans un salon.' };
    if (!isValidRoomName(name)) return { error: 'Nom de salon invalide (3 à 30 caractères).' };
    const capacity = Number(maxPlayers);
    if (!isValidMaxPlayers(capacity)) {
      return { error: `Capacité invalide (${LIMITS.ROOM_PLAYERS_MIN} à ${LIMITS.ROOM_PLAYERS_MAX} joueurs).` };
    }

    const room = new Room({
      name: sanitizeText(name),
      code: this.generateCode(),
      host,
      maxPlayers: capacity,
    });
    this.rooms.set(room.id, room);
    this.byCode.set(room.code, room.id);
    this.users.setRoom(host.socketId, room.id);
    return { room };
  }

  /**
   * Fait rejoindre `user` au salon correspondant au code.
   * @returns {{room?: Room, error?: string}}
   */
  join(user, code) {
    if (!user) return { error: 'Profil requis pour rejoindre un salon.' };
    if (user.roomId) return { error: 'Vous êtes déjà dans un salon.' };
    const room = this.getByCode(code);
    if (!room) return { error: 'Aucun salon ne correspond à ce code.' };
    if (room.status !== ROOM_STATUS.OPEN) return { error: 'Ce salon n\'accepte plus de joueurs.' };
    if (room.isFull) return { error: 'Ce salon est complet.' };
    room.addPlayer(user);
    this.users.setRoom(user.socketId, room.id);
    return { room };
  }

  /**
   * Retire `user` de son salon. Supprime le salon s'il devient vide.
   * @returns {{room: Room|null, deleted: boolean, newHostId: string|null}}
   */
  leave(user) {
    const room = user?.roomId ? this.rooms.get(user.roomId) : null;
    if (!room) return { room: null, deleted: false, newHostId: null };

    const { newHostId } = room.removePlayer(user.id);
    this.users.setRoom(user.socketId, null);

    if (room.players.length === 0) {
      this.delete(room);
      return { room, deleted: true, newHostId: null };
    }
    return { room, deleted: false, newHostId };
  }

  /** Ferme un salon : tous les membres sont détachés, le salon est supprimé. */
  close(room) {
    room.status = ROOM_STATUS.CLOSED;
    for (const player of [...room.players]) {
      this.users.setRoom(player.socketId, null);
    }
    room.players = [];
    this.delete(room);
  }

  /** Passe le salon (et ses joueurs) en mode partie. */
  startGame(room) {
    room.status = ROOM_STATUS.IN_GAME;
    for (const player of room.players) player.status = USER_STATUS.IN_GAME;
  }

  /** Retour au salon en fin de partie. */
  endGame(room) {
    room.status = ROOM_STATUS.OPEN;
    for (const player of room.players) player.status = USER_STATUS.IN_ROOM;
  }

  delete(room) {
    this.byCode.delete(room.code);
    this.rooms.delete(room.id);
  }

  get(roomId) {
    return this.rooms.get(roomId) ?? null;
  }

  getByCode(code) {
    const id = this.byCode.get(String(code ?? '').toUpperCase().trim());
    return id ? this.rooms.get(id) : null;
  }

  /** Liste publique des salons (résumés, sans chat). */
  listSummaries() {
    const toPublic = (u) => this.users.toPublic(u);
    return [...this.rooms.values()].map((r) => r.toSummary(toPublic));
  }
}
