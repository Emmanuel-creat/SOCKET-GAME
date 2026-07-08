/**
 * Store — état global du client.
 * Toute mutation passe par set() qui notifie le bus (`store:changed:<clé>`).
 * Les vues lisent l'état, elles ne le modifient jamais directement.
 */
import { bus } from './EventBus.js';

class Store {
  constructor() {
    this.state = {
      /** @type {object|null} profil du joueur local */
      me: null,
      /** @type {object[]} joueurs connectés */
      players: [],
      /** @type {object[]} salons publics */
      rooms: [],
      /** @type {object[]} catalogue des jeux (games.json, servi par le lobby) */
      games: [],
      /** @type {object|null} salon courant (état complet, avec chat) */
      room: null,
      /** @type {{gameId: string, context: object}|null} partie en cours */
      activeGame: null,
    };
  }

  get(key) {
    return this.state[key];
  }

  /** Met à jour une clé et notifie les abonnés de cette clé. */
  set(key, value) {
    this.state[key] = value;
    bus.emit(`store:changed:${key}`, value);
  }

  /** Abonnement pratique : rappelé immédiatement avec la valeur courante. */
  subscribe(key, handler) {
    handler(this.state[key]);
    return bus.on(`store:changed:${key}`, handler);
  }
}

/** Instance unique. */
export const store = new Store();
