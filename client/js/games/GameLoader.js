/**
 * GameLoader — chargement dynamique des modules de jeu.
 *
 * CONTRAT DE MODULE (à respecter par chaque futur jeu) :
 *   export default {
 *     async mount(container, context) { ... },  // context : { room, players, me, socket, onEnd(result) }
 *     async unmount() { ... },                  // nettoyage complet du jeu
 *   }
 *
 * Le moteur ne contient AUCUNE logique de jeu : il importe le module
 * indiqué par games.json, le monte, puis le démonte à la fin de la partie.
 */
import { store } from '../core/Store.js';

export class GameLoader {
  constructor() {
    /** @type {{module: object, gameId: string}|null} */
    this.active = null;
  }

  /** Retrouve la fiche d'un jeu dans le catalogue chargé (games.json). */
  getDefinition(gameId) {
    return store.get('games').find((g) => g.id === gameId) ?? null;
  }

  /**
   * Charge et monte le module d'un jeu.
   * @param {string} gameId Identifiant du jeu (clé de games.json).
   * @param {HTMLElement} container Conteneur DOM dédié au jeu.
   * @param {object} context Données transmises au jeu (salon, joueurs, callbacks).
   * @returns {Promise<boolean>} vrai si le module a pu être monté.
   */
  async load(gameId, container, context) {
    const definition = this.getDefinition(gameId);
    if (!definition) throw new Error(`Jeu inconnu : ${gameId}`);

    // Import dynamique : le chemin vient exclusivement de games.json.
    const moduleUrl = `${definition.chemin}${definition.module}`;
    const imported = await import(moduleUrl);
    const gameModule = imported.default;

    if (typeof gameModule?.mount !== 'function') {
      throw new Error(`Le module « ${definition.nom} » n'expose pas de fonction mount().`);
    }

    await gameModule.mount(container, context);
    this.active = { module: gameModule, gameId };
    return true;
  }

  /** Démonte proprement le jeu en cours (fin de partie ou sortie). */
  async unload() {
    if (!this.active) return;
    try {
      await this.active.module.unmount?.();
    } finally {
      this.active = null;
    }
  }
}
