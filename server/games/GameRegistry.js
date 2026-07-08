/**
 * GameRegistry — lecture du catalogue `client/games/games.json`.
 * Le moteur ne connaît AUCUN jeu : ce fichier est sa seule source de vérité.
 * Ajouter un jeu = ajouter une entrée dans games.json + un dossier module.
 */
import { readFile } from 'node:fs/promises';
import { GAME_STATE } from '../../shared/constants.js';

export class GameRegistry {
  /** @param {string} filePath Chemin absolu vers games.json. */
  constructor(filePath) {
    this.filePath = filePath;
    /** @type {Map<string, object>} clé = game.id */
    this.games = new Map();
  }

  /** Charge (ou recharge) le catalogue depuis le disque. */
  async load() {
    const raw = await readFile(this.filePath, 'utf-8');
    const { games } = JSON.parse(raw);
    this.games = new Map(games.map((g) => [g.id, g]));
    return this.all();
  }

  get(gameId) {
    return this.games.get(gameId) ?? null;
  }

  /** Catalogue complet (les placeholders masqués sont filtrés). */
  all() {
    return [...this.games.values()].filter((g) => g.visible !== false);
  }

  /** Un jeu ne peut être lancé que s'il est disponible. */
  isPlayable(gameId) {
    return this.get(gameId)?.etat === GAME_STATE.AVAILABLE;
  }

  /**
   * Vérifie qu'un jeu est sélectionnable pour un salon donné.
   * @returns {{ok: boolean, error?: string}}
   */
  canSelect(gameId, playerCount) {
    const game = this.get(gameId);
    if (!game) return { ok: false, error: 'Jeu inconnu.' };
    if (playerCount > game.joueursMax) {
      return { ok: false, error: `${game.nom} accepte au maximum ${game.joueursMax} joueurs.` };
    }
    return { ok: true };
  }
}
