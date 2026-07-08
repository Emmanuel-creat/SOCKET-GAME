/**
 * PlayerRow — ligne d'affichage d'un joueur (liste globale ou salon).
 */
import { el } from '../ui/dom.js';
import { LABELS } from '/shared/constants.js';

/**
 * @param {object} player Vue publique d'un joueur.
 * @param {object} [options]
 * @param {boolean} [options.isHost] Affiche le badge Host.
 * @param {Node|null} [options.action] Bouton d'action optionnel (ex. expulser).
 */
export function PlayerRow(player, { isHost = false, action = null } = {}) {
  return el('div', { className: 'player-row' }, [
    el('span', { className: 'player-row__avatar', 'aria-hidden': 'true' }, [player.avatar]),
    el('span', { className: 'player-row__pseudo', style: { color: player.color } }, [
      player.pseudo,
      isHost ? el('span', { className: 'host-tag' }, ['Host']) : '',
    ]),
    el('span', { className: 'player-row__status' }, [
      el('span', { className: `status-dot status-dot--${player.status}`, 'aria-hidden': 'true' }),
      LABELS.userStatus[player.status] ?? player.status,
    ]),
    action ?? '',
  ]);
}
