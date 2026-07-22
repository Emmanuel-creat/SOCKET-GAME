/**
 * RoomView — intérieur d'un salon.
 * Colonne principale : sélection du jeu + réglages Host.
 * Colonne latérale : joueurs + chat.
 */
import { el, replaceChildrenOf } from '../ui/dom.js';
import { store } from '../core/Store.js';
import { bus } from '../core/EventBus.js';
import { GAME_STATE, LIMITS } from '/shared/constants.js';
import { Chat } from '../components/Chat.js';
import { PlayerRow } from '../components/PlayerRow.js';
import { openInviteModal, openConfirmModal } from '../ui/modals.js';

export class RoomView {
  /** @param {{socket: object}} deps */
  constructor({ socket }) {
    this.socket = socket;
    this.container = document.getElementById('view-room');
    this.chat = null;

    store.subscribe('room', () => this.render());
    bus.on('view:activated:room', () => this.render());
  }

  render() {
    const room = store.get('room');
    if (!room) {
      // Sortie de salon : on nettoie le chat et on vide la vue.
      this.chat?.destroy();
      this.chat = null;
      this.currentRoomId = null;
      this.container.replaceChildren();
      return;
    }
    if (this.container.hidden) return;

    const me = store.get('me');
    const isHost = room.hostId === me?.id;

    // Le chat est persistant entre les rendus (saisie conservée),
    // mais recréé si l'on change de salon.
    if (this.chat && this.currentRoomId !== room.id) {
      this.chat.destroy();
      this.chat = null;
    }
    if (!this.chat) {
      this.chat = new Chat({ socket: this.socket });
      this.chat.setHistory(room.chat);
      this.currentRoomId = room.id;
    }

    // Le re-render détache le chat du DOM (scrollTop repasse à 0). On mémorise
    // la position avant, on la restaure après : les actions du salon ne font
    // plus « remonter » le chat, le focus reste sur le dernier message.
    this.chat.captureScroll();

    replaceChildrenOf(
      this.container,
      this.header(room, isHost),
      el('div', { className: 'room-layout' }, [
        el('div', { className: 'room-main' }, [
          this.gamePicker(room, isHost),
          isHost ? this.hostSettings(room) : '',
        ]),
        el('div', { className: 'room-side' }, [
          this.playersPanel(room, me, isHost),
          this.chat.element,
        ]),
      ]),
    );

    this.chat.restoreScroll();
  }

  header(room, isHost) {
    return el('div', { className: 'room-header' }, [
      el('div', { className: 'room-header__infos' }, [
        el('h1', { className: 'view__title', style: { marginBottom: 0 } }, [room.name]),
        el('button', {
          className: 'code-pill', title: 'Copier le code du salon',
          onClick: () => navigator.clipboard?.writeText(room.code)
            .then(() => bus.emit('notify', { type: 'success', message: 'Code copié.' })),
        }, [room.code]),
      ]),
      el('div', { className: 'room-header__actions' }, [
        el('button', { className: 'btn', onClick: () => openInviteModal() }, ['✉️ Inviter']),
        isHost
          ? el('button', {
              className: 'btn btn--danger',
              onClick: () => openConfirmModal({
                title: 'Fermer le salon ?',
                message: 'Tous les joueurs seront renvoyés vers la liste des salons.',
                confirmLabel: 'Fermer le salon',
                onConfirm: () => this.leaveCleanly(() => this.socket.closeRoom()),
              }),
            }, ['Fermer le salon'])
          : '',
        el('button', {
          className: 'btn btn--ghost',
          onClick: () => this.leaveCleanly(() => this.socket.leaveRoom()),
        }, ['Quitter le salon']),
      ]),
    ]);
  }

  /** Grille de sélection du jeu (Host) / affichage du jeu choisi (autres). */
  gamePicker(room, isHost) {
    const games = store.get('games');
    const selected = games.find((g) => g.id === room.gameId) ?? null;
    const canStart = Boolean(
      selected &&
      selected.etat === GAME_STATE.AVAILABLE &&
      room.players.length >= selected.joueursMin,
    );

    return el('div', { className: 'card' }, [
      el('h3', {}, [isHost ? '🎮 Choisir un jeu' : '🎮 Jeu du salon']),
      el('div', { className: 'room-games-grid' },
        games.map((game) => el('button', {
          className: `game-tile ${game.id === room.gameId ? 'is-selected' : ''}`,
          disabled: !isHost,
          title: game.etat !== GAME_STATE.AVAILABLE ? 'Ce jeu est actuellement en développement.' : game.description,
          onClick: () => this.socket.setRoomGame(game.id),
        }, [
          el('span', { className: 'game-tile__icon', 'aria-hidden': 'true' }, [game.icone]),
          el('span', { className: 'game-tile__name' }, [game.nom]),
          el('span', { className: 'game-tile__players' }, [`${game.joueursMin}–${game.joueursMax} j.`]),
        ])),
      ),
      selected && selected.etat !== GAME_STATE.AVAILABLE
        ? el('p', { className: 'game-card__dev-note', style: { marginTop: '12px' } },
            [`« ${selected.nom} » est actuellement en développement.`])
        : '',
      isHost
        ? el('div', { style: { marginTop: '16px' } }, [
            el('button', {
              className: 'btn btn--primary',
              disabled: !canStart,
              onClick: () => this.socket.startGame(),
            }, ['🚀 Lancer la partie']),
          ])
        : '',
    ]);
  }

  /** Réglages réservés au Host (capacité du salon). */
  hostSettings(room) {
    const input = el('input', {
      type: 'number', id: 'room-capacity', value: room.maxPlayers,
      min: Math.max(LIMITS.ROOM_PLAYERS_MIN, room.players.length), max: LIMITS.ROOM_PLAYERS_MAX,
    });
    return el('div', { className: 'card' }, [
      el('h3', {}, ['⚙️ Réglages du salon']),
      el('div', { className: 'field' }, [
        el('label', { htmlFor: 'room-capacity' }, ['Nombre maximum de joueurs']),
        el('div', { style: { display: 'flex', gap: '10px' } }, [
          input,
          el('button', {
            className: 'btn',
            onClick: () => this.socket.setRoomMaxPlayers(Number(input.value)),
          }, ['Appliquer']),
        ]),
      ]),
    ]);
  }

  playersPanel(room, me, isHost) {
    return el('div', { className: 'card' }, [
      el('h3', { style: { fontSize: '1rem' } }, [`👥 Joueurs (${room.players.length}/${room.maxPlayers})`]),
      ...room.players.map((player) => PlayerRow(player, {
        isHost: player.id === room.hostId,
        action: isHost && player.id !== me.id
          ? el('button', {
              className: 'btn btn--danger btn--small',
              title: `Expulser ${player.pseudo}`,
              onClick: () => openConfirmModal({
                title: `Expulser ${player.pseudo} ?`,
                message: 'Ce joueur sera renvoyé vers la liste des salons.',
                confirmLabel: 'Expulser',
                onConfirm: () => this.socket.kickPlayer(player.id),
              }),
            }, ['Expulser'])
          : null,
      })),
    ]);
  }

  /** Détruit le chat local avant de quitter (évite les fuites d'abonnements). */
  leaveCleanly(action) {
    this.chat?.destroy();
    this.chat = null;
    action();
  }
}
