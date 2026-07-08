/**
 * RoomsView — vue « Salons » : liste des salons publics + actions
 * (créer, rejoindre avec un code, rejoindre en un clic).
 */
import { el, replaceChildrenOf } from '../ui/dom.js';
import { store } from '../core/Store.js';
import { bus } from '../core/EventBus.js';
import { LABELS, ROOM_STATUS } from '/shared/constants.js';
import { openCreateRoomModal, openJoinRoomModal } from '../ui/modals.js';

export class RoomsView {
  /** @param {{socket: object}} deps */
  constructor({ socket }) {
    this.socket = socket;
    this.container = document.getElementById('view-rooms');
    store.subscribe('rooms', () => this.render());
    bus.on('view:activated:rooms', () => this.render());
  }

  render() {
    if (this.container.hidden) return;
    const rooms = store.get('rooms');
    const games = store.get('games');

    replaceChildrenOf(
      this.container,
      el('h1', { className: 'view__title' }, ['Salons']),
      el('div', { className: 'rooms-toolbar' }, [
        el('button', { className: 'btn btn--primary', onClick: () => openCreateRoomModal({ socket: this.socket }) }, ['➕ Créer un salon']),
        el('button', { className: 'btn', onClick: () => openJoinRoomModal({ socket: this.socket }) }, ['🔑 Rejoindre avec un code']),
      ]),
      rooms.length === 0
        ? el('div', { className: 'empty' }, [
            el('span', { className: 'empty__icon' }, ['🚪']),
            'Aucun salon pour le moment. Créez le premier !',
          ])
        : el('div', { className: 'rooms-grid' }, rooms.map((room) => this.roomCard(room, games))),
    );
  }

  roomCard(room, games) {
    const game = room.gameId ? games.find((g) => g.id === room.gameId) : null;
    const joinable = room.status === ROOM_STATUS.OPEN && room.players.length < room.maxPlayers;

    return el('article', { className: 'card' }, [
      el('div', { className: 'room-card__head' }, [
        el('h3', { className: 'room-card__name' }, [room.name]),
        el('span', { className: `badge badge--${room.status === ROOM_STATUS.OPEN ? 'disponible' : 'maintenance'}` },
          [LABELS.roomStatus[room.status] ?? room.status]),
      ]),
      el('div', { className: 'room-card__meta' }, [
        el('span', {}, [`👥 ${room.players.length}/${room.maxPlayers}`]),
        el('span', {}, [game ? `${game.icone} ${game.nom}` : '🎮 Aucun jeu choisi']),
        el('span', { className: 'room-card__code' }, [room.code]),
      ]),
      el('button', {
        className: 'btn btn--primary',
        disabled: !joinable,
        onClick: () => this.socket.joinRoom(room.code),
      }, [joinable ? 'Rejoindre' : 'Indisponible']),
    ]);
  }
}
