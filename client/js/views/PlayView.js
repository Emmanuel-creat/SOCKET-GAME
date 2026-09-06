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
            games.map((game) => GameCard(game, () => this.enterGame(game), (g) => this.enterSolo(g)))),
    );
  }

  /**
   * Un jeu disponible mène à la création d'un salon pré-configuré avec ce jeu —
   * SAUF les entrées marquées `sansSalon` (ex. Pause Café), qui n'ont ni hôte,
   * ni capacité, ni partie : elles mènent directement à leur propre vue.
   */
  enterGame(game) {
    if (game.sansSalon) { bus.emit('app:navigate', 'lounge'); return; }
    if (store.get('room')) {
      bus.emit('app:navigate', 'room');
      return;
    }
    openCreateRoomModal({ socket: this.socket, game });
  }

  /**
   * Lancement DIRECT en solo : on court-circuite le salon et le serveur en
   * posant nous-mêmes `activeGame` avec un contexte marqué `solo:true`. La
   * GameView reconnaît ce contexte et branche des callbacks locaux (pas de
   * socket, pas de fin de partie côté serveur) ; le bouton « Quitter » du
   * jeu ramène ici.
   */
  enterSolo(game) {
    const me = store.get('me') ?? { id: 'solo-' + Math.random().toString(36).slice(2, 8), pseudo: 'Joueur', avatar: '🙂' };
    const soloMe = { id: me.id, pseudo: me.pseudo, avatar: me.avatar };
    store.set('activeGame', {
      gameId: game.id,
      context: {
        solo: true,
        roomId: 'solo',
        roomName: `Solo — ${game.nom}`,
        hostId: soloMe.id,
        players: [soloMe],
      },
    });
    bus.emit('app:navigate', 'game');
  }
}
