/**
 * LobbyManager — diffusion des données globales (joueurs, salons, catalogue).
 * Seul module autorisé à faire du broadcast "monde entier".
 */
import { EVENTS } from '../../shared/events.js';

export class LobbyManager {
  constructor({ io, users, rooms, gameRegistry }) {
    this.io = io;
    this.users = users;
    this.rooms = rooms;
    this.gameRegistry = gameRegistry;
  }

  /** Diffuse la liste des joueurs connectés à tout le monde. */
  broadcastPlayers() {
    this.io.emit(EVENTS.LOBBY_PLAYERS, { players: this.users.listPublic() });
  }

  /** Diffuse la liste des salons à tout le monde. */
  broadcastRooms() {
    this.io.emit(EVENTS.LOBBY_ROOMS, { rooms: this.rooms.listSummaries() });
  }

  /** Envoie l'état complet du lobby à un socket (à la connexion). */
  sendSnapshot(socket) {
    socket.emit(EVENTS.LOBBY_GAMES, { games: this.gameRegistry.all() });
    socket.emit(EVENTS.LOBBY_PLAYERS, { players: this.users.listPublic() });
    socket.emit(EVENTS.LOBBY_ROOMS, { rooms: this.rooms.listSummaries() });
  }

  /** Diffuse l'état complet d'un salon à ses membres. */
  broadcastRoomState(room) {
    const toPublic = (u) => this.users.toPublic(u);
    this.io.to(room.id).emit(EVENTS.ROOM_STATE, { room: room.toPublic(toPublic) });
  }

  /** Notification ciblée sur les membres d'un salon. */
  notifyRoom(room, type, message) {
    this.io.to(room.id).emit(EVENTS.SYS_NOTIFICATION, { type, message });
  }
}
