/**
 * PlayersView — vue « Joueurs » : tous les joueurs connectés et leur statut.
 */
import { el, replaceChildrenOf } from '../ui/dom.js';
import { store } from '../core/Store.js';
import { bus } from '../core/EventBus.js';
import { PlayerRow } from '../components/PlayerRow.js';

export class PlayersView {
  constructor() {
    this.container = document.getElementById('view-players');
    store.subscribe('players', () => this.render());
    bus.on('view:activated:players', () => this.render());
  }

  render() {
    if (this.container.hidden) return;
    const players = store.get('players');
    const me = store.get('me');

    replaceChildrenOf(
      this.container,
      el('h1', { className: 'view__title' }, ['Joueurs']),
      el('p', { className: 'view__subtitle' }, [`${players.length} joueur${players.length > 1 ? 's' : ''} en ligne`]),
      el('div', { className: 'card' },
        players.length === 0
          ? [el('div', { className: 'empty' }, ['Personne en ligne pour le moment.'])]
          : players.map((p) => PlayerRow(p, { isHost: false, action: p.id === me?.id ? el('span', { className: 'badge badge--disponible' }, ['Vous']) : null })),
      ),
    );
  }
}
