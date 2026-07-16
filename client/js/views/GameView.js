/**
 * GameView — écran hôte d'une partie.
 * Le moteur monte ici le module du jeu (via GameLoader) et lui transmet
 * le contexte (salon, joueurs, joueur local, fin de partie).
 * À la fin d'une partie, le retour au salon est automatique.
 */
import { el, replaceChildrenOf } from '../ui/dom.js';
import { store } from '../core/Store.js';
import { bus } from '../core/EventBus.js';
import { GameLoader } from '../games/GameLoader.js';

export class GameView {
  /** @param {{socket: object}} deps */
  constructor({ socket }) {
    this.socket = socket;
    this.container = document.getElementById('view-game');
    this.loader = new GameLoader();

    store.subscribe('activeGame', (activeGame) => {
      if (activeGame) this.mountGame(activeGame);
      else this.unmountGame();
    });
  }

  async mountGame({ gameId, context }) {
    const me = store.get('me');
    const gameContainer = el('div', { className: 'game-screen' });
    replaceChildrenOf(this.container, gameContainer);

    try {
      await this.loader.load(gameId, gameContainer, {
        ...context,
        me,
        socket: this.socket,
        // Communication en jeu : envoi (ciblé ou diffusé) + abonnement aux messages.
        sendMessage: (data, to = null) => this.socket.sendGameMessage(data, to),
        onMessage: (handler) => bus.on('game:message', handler),
        // Le module signale la fin de partie : le serveur ramène tout le salon.
        onEnd: (result) => this.socket.endGame(result),
      });
    } catch (error) {
      // Module absent ou incomplet : écran d'attente + retour possible.
      console.warn(`[arcade] Module de jeu indisponible (${gameId}) :`, error.message);
      this.renderFallback(gameId);
    }
  }

  /** Écran affiché si le module du jeu n'est pas encore développé. */
  renderFallback(gameId) {
    const game = this.loader.getDefinition(gameId);
    const me = store.get('me');
    const room = store.get('room');
    const isHost = room && me && room.hostId === me.id;

    replaceChildrenOf(
      this.container,
      el('div', { className: 'game-screen' }, [
        el('div', { className: 'card game-screen__panel' }, [
          el('span', { className: 'game-screen__icon', 'aria-hidden': 'true' }, [game?.icone ?? '🎮']),
          el('h2', {}, [game?.nom ?? 'Jeu']),
          el('p', { style: { color: 'var(--text-dim)' } },
            ['Ce jeu est actuellement en développement. Son module sera chargé automatiquement dès qu\'il existera.']),
          isHost
            ? el('button', { className: 'btn btn--primary', onClick: () => this.socket.endGame(null) }, ['Retour au salon'])
            : el('p', { style: { color: 'var(--text-faint)', fontSize: '0.85rem' } }, ['En attente du Host…']),
        ]),
      ]),
    );
  }

  async unmountGame() {
    await this.loader.unload();
    this.container.replaceChildren();
  }
}
