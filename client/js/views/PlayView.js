/**
 * PlayView — vue « Jouer » : catalogue des jeux sous forme de grandes cartes.
 * Cliquer « Entrer » sur un jeu disponible ouvre la création de salon
 * (le jeu se choisit ensuite dans le salon).
 */
import { el, replaceChildrenOf } from '../ui/dom.js';
import { store } from '../core/Store.js';
import { bus } from '../core/EventBus.js';
import { GameCard } from '../components/GameCard.js';
import { openCreateRoomModal } from '../ui/modals.js';

export class PlayView {
  /** @param {{socket: object}} deps */
  constructor({ socket }) {
    this.socket = socket;
    this.container = document.getElementById('view-play');
    store.subscribe('games', () => this.render());
    bus.on('view:activated:play', () => this.render());
  }

  render() {
    if (this.container.hidden) return;
    const games = store.get('games');

    replaceChildrenOf(
      this.container,
      el('h1', { className: 'view__title' }, ['Jouer']),
      el('p', { className: 'view__subtitle' }, ['Choisissez un jeu, créez un salon et invitez vos amis.']),
      games.length === 0
        ? el('div', { className: 'empty' }, [el('span', { className: 'empty__icon' }, ['🕹️']), 'Chargement du catalogue…'])
        : el('div', { className: 'games-grid' },
            games.map((game) => GameCard(game, () => this.enterGame()))),
    );
  }

  /** Un jeu disponible mène à la création d'un salon (cœur du flux plateforme). */
  enterGame() {
    if (store.get('room')) {
      bus.emit('app:navigate', 'room');
      return;
    }
    openCreateRoomModal({ socket: this.socket });
  }
}
