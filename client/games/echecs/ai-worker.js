/**
 * Worker dédié au calcul de l'IA — s'exécute hors du thread principal pour que l'interface
 * (animations, horloge, chat) ne gèle jamais pendant la réflexion de l'IA.
 */
import { ChessEngine } from './engine.js';
import { chooseAiMove } from './ai.js';

self.onmessage = (event) => {
  const { requestId, fen, difficulty } = event.data ?? {};
  try {
    const engine = new ChessEngine(fen);
    const move = chooseAiMove(engine, difficulty);
    self.postMessage({ requestId, fen, move });
  } catch (err) {
    self.postMessage({ requestId, fen, move: null, error: String(err?.message ?? err) });
  }
};
