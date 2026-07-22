/**
 * GameCard — grande carte d'un jeu du catalogue.
 * Purement présentation : reçoit les données et un callback `onEnter`.
 */
import { el } from '../ui/dom.js';
import { GAME_STATE, LABELS } from '/shared/constants.js';

/**
 * @param {object} game Entrée de games.json.
 * @param {(game: object) => void} onEnter Appelé quand l'utilisateur clique « Entrer ».
 */
export function GameCard(game, onEnter) {
  const available = game.etat === GAME_STATE.AVAILABLE;

  // Couverture : utilise l'image si le fichier existe vraiment, sinon retombe sur
  // l'emoji. On ne peut pas savoir à l'avance si /assets/cover.png a été fourni —
  // onerror bascule sur l'emoji si l'image ne charge pas (404, format invalide, etc).
  const emojiCover = el('div', { className: 'game-card__cover', 'aria-hidden': 'true' }, [game.icone]);
  let cover = emojiCover;
  if (game.image) {
    const img = el('img', {
      className: 'game-card__cover game-card__cover--img',
      src: game.image,
      alt: '',
      'aria-hidden': 'true',
      loading: 'lazy',
      onError: () => { img.replaceWith(emojiCover); },
    });
    cover = img;
  }

  return el('article', { className: 'card game-card' }, [
    cover,
    el('div', { className: 'game-card__body' }, [
      el('div', { className: 'game-card__head' }, [
        el('h3', { className: 'game-card__name' }, [game.nom]),
        el('span', { className: `badge badge--${game.etat}` }, [LABELS.gameState[game.etat] ?? game.etat]),
      ]),
      el('p', { className: 'game-card__desc' }, [game.description]),
      el('span', { className: 'game-card__meta' }, [
        `👥 ${game.joueursMin === game.joueursMax ? game.joueursMin : `${game.joueursMin} à ${game.joueursMax}`} joueurs`,
      ]),
      available
        ? el('button', { className: 'btn btn--primary', onClick: () => onEnter(game) }, ['Entrer'])
        : el('p', { className: 'game-card__dev-note' }, ['Ce jeu est actuellement en développement.']),
    ]),
  ]);
}
