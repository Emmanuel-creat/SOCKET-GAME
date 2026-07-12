/**
 * IA d'échecs — négamax + élagage alpha-bêta + quiescence (captures), recherche itérative
 * bornée en temps. Pure logique, sans DOM : testable en Node, exécutée en pratique dans un
 * Web Worker (voir ai-worker.js) pour ne jamais bloquer l'interface.
 */
import { fileOf, rankOf, sq, PIECE_VALUES } from './engine.js';

const WHITE = 'w';
const MATE_SCORE = 1_000_000;
const TIME_UP = Symbol('time-up');

function sideSign(color) { return color === WHITE ? 1 : -1; }

function buildPST(fn) {
  const t = new Array(64).fill(0);
  for (let rank = 0; rank < 8; rank++) {
    for (let file = 0; file < 8; file++) t[sq(file, rank)] = fn(file, rank);
  }
  return t;
}
const centerDist = (file, rank) => Math.max(Math.abs(file - 3.5), Math.abs(rank - 3.5));

const PST = {
  P: buildPST((file, rank) => {
    if (rank === 0 || rank === 7) return 0;
    return (rank - 1) * (rank - 1) * 2 + (file >= 2 && file <= 5 ? 6 : 0);
  }),
  N: buildPST((file, rank) => Math.round((3 - centerDist(file, rank)) * 10)),
  B: buildPST((file, rank) => Math.round((3 - centerDist(file, rank)) * 6)),
  R: buildPST((file, rank) => (rank === 6 ? 15 : 0) + (file === 3 || file === 4 ? 4 : 0)),
  Q: buildPST((file, rank) => Math.round((3 - centerDist(file, rank)) * 4)),
  K_MIDDLE: buildPST((file, rank) => (rank === 0 ? 20 : rank === 1 ? 5 : -10 * rank) + ((file <= 1 || file >= 6) ? 10 : 0)),
  K_END: buildPST((file, rank) => Math.round((3 - centerDist(file, rank)) * 8)),
};

/** Évaluation statique d'une position, du point de vue des BLANCS (positif = mieux pour les blancs). */
export function evaluate(engine) {
  let whiteMat = 0; let blackMat = 0;
  for (let i = 0; i < 64; i++) {
    const p = engine.board[i];
    if (!p || p[1] === 'K') continue;
    if (p[0] === 'w') whiteMat += PIECE_VALUES[p[1]]; else blackMat += PIECE_VALUES[p[1]];
  }
  const endgame = (whiteMat + blackMat) < 2600;
  let score = whiteMat - blackMat;
  for (let i = 0; i < 64; i++) {
    const p = engine.board[i];
    if (!p) continue;
    const file = fileOf(i); const rank = rankOf(i);
    const pst = p[1] === 'K' ? (endgame ? PST.K_END : PST.K_MIDDLE) : PST[p[1]];
    const idx = p[0] === 'w' ? i : sq(file, 7 - rank);
    const bonus = pst[idx];
    score += p[0] === 'w' ? bonus : -bonus;
  }
  return score;
}

function moveScore(m) {
  let s = m.captured ? PIECE_VALUES[m.captured[1]] * 10 - PIECE_VALUES[m.piece[1]] : 0;
  if (m.promotion) s += 800;
  return s;
}

function orderedMoves(engine) {
  return engine.legalMoves(engine.turn).sort((a, b) => moveScore(b) - moveScore(a));
}

function checkTime(deadline) {
  if (Date.now() > deadline) throw TIME_UP;
}

function quiescence(engine, alpha, beta, deadline) {
  checkTime(deadline);
  const standPat = sideSign(engine.turn) * evaluate(engine);
  if (standPat >= beta) return beta;
  if (standPat > alpha) alpha = standPat;
  const captures = engine.legalMoves(engine.turn)
    .filter((m) => m.captured)
    .sort((a, b) => moveScore(b) - moveScore(a));
  for (const m of captures) {
    const child = engine.clone();
    child._applyMove(m);
    const val = -quiescence(child, -beta, -alpha, deadline);
    if (val >= beta) return beta;
    if (val > alpha) alpha = val;
  }
  return alpha;
}

function negamax(engine, depth, alpha, beta, deadline, ply) {
  checkTime(deadline);
  const status = engine.status();
  if (status.over) {
    if (status.reason === 'echec-et-mat') return -(MATE_SCORE - ply);
    return 0;
  }
  if (depth <= 0) return quiescence(engine, alpha, beta, deadline);
  let best = -Infinity;
  for (const m of orderedMoves(engine)) {
    const child = engine.clone();
    child._applyMove(m);
    const val = -negamax(child, depth - 1, -beta, -alpha, deadline, ply + 1);
    if (val > best) best = val;
    if (best > alpha) alpha = best;
    if (alpha >= beta) break;
  }
  return best;
}

function searchRoot(engine, depth, deadline) {
  let bestMove = null; let bestScore = -Infinity; let alpha = -Infinity; const beta = Infinity;
  for (const m of orderedMoves(engine)) {
    const child = engine.clone();
    child._applyMove(m);
    const val = -negamax(child, depth - 1, -beta, -alpha, deadline, 1);
    if (val > bestScore || bestMove === null) { bestScore = val; bestMove = m; }
    if (bestScore > alpha) alpha = bestScore;
  }
  return { move: bestMove, score: bestScore };
}

export const DIFFICULTIES = {
  debutant: { key: 'debutant', label: 'Débutant', maxDepth: 1, timeMs: 150, blunderChance: 0.5 },
  facile: { key: 'facile', label: 'Facile', maxDepth: 2, timeMs: 350, blunderChance: 0.22 },
  moyen: { key: 'moyen', label: 'Moyen', maxDepth: 3, timeMs: 700, blunderChance: 0.06 },
  difficile: { key: 'difficile', label: 'Difficile', maxDepth: 4, timeMs: 1400, blunderChance: 0 },
  expert: { key: 'expert', label: 'Expert', maxDepth: 6, timeMs: 3000, blunderChance: 0 },
};

/**
 * Choisit un coup pour l'IA. `rng` est injectable (tests déterministes).
 * Renvoie le move engine (from/to/promotion/...) ou null s'il n'y a aucun coup légal.
 */
export function chooseAiMove(engine, difficultyKey = 'moyen', rng = Math.random) {
  const diff = DIFFICULTIES[difficultyKey] ?? DIFFICULTIES.moyen;
  const legal = engine.legalMoves(engine.turn);
  if (legal.length === 0) return null;
  if (rng() < diff.blunderChance) return legal[Math.floor(rng() * legal.length)];

  const deadline = Date.now() + diff.timeMs;
  let bestMove = legal[0];
  try {
    for (let depth = 1; depth <= diff.maxDepth; depth++) {
      const result = searchRoot(engine, depth, deadline);
      if (result.move) bestMove = result.move;
    }
  } catch (err) {
    if (err !== TIME_UP) throw err;
  }
  return bestMove;
}
