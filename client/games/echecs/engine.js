/**
 * Moteur d'échecs — logique pure, sans DOM, testable en Node (perft, etc.).
 * Représentation : plateau de 64 cases, index = rang*8 + colonne (a1=0 … h8=63).
 * Pièces : chaîne 2 caractères "wP", "bQ", ... ou null (case vide).
 */

export const WHITE = 'w';
export const BLACK = 'b';
const FILES = 'abcdefgh';

export function sq(file, rank) { return rank * 8 + file; }
export function fileOf(index) { return index % 8; }
export function rankOf(index) { return Math.floor(index / 8); }
export function squareName(index) { return FILES[fileOf(index)] + (rankOf(index) + 1); }
export function parseSquare(name) { return sq(FILES.indexOf(name[0]), Number(name[1]) - 1); }
function inBounds(file, rank) { return file >= 0 && file <= 7 && rank >= 0 && rank <= 7; }
function other(color) { return color === WHITE ? BLACK : WHITE; }

export const PIECE_NAMES = { K: 'Roi', Q: 'Dame', R: 'Tour', B: 'Fou', N: 'Cavalier', P: 'Pion' };
export const PIECE_VALUES = { P: 100, N: 320, B: 330, R: 500, Q: 900, K: 0 };

const KNIGHT_DELTAS = [[1, 2], [2, 1], [2, -1], [1, -2], [-1, -2], [-2, -1], [-2, 1], [-1, 2]];
const KING_DELTAS = [[1, 0], [1, 1], [0, 1], [-1, 1], [-1, 0], [-1, -1], [0, -1], [1, -1]];
const BISHOP_DIRS = [[1, 1], [1, -1], [-1, 1], [-1, -1]];
const ROOK_DIRS = [[1, 0], [-1, 0], [0, 1], [0, -1]];

export class ChessEngine {
  constructor(fen = ChessEngine.START_FEN) {
    this.setFEN(fen);
    this.moveHistory = [];
    this.positionCounts = new Map();
    this._recordPosition();
  }

  static get START_FEN() {
    return 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
  }

  clone() {
    const c = Object.create(ChessEngine.prototype);
    c.board = this.board.slice();
    c.turn = this.turn;
    c.castling = { ...this.castling };
    c.epTarget = this.epTarget;
    c.halfmoveClock = this.halfmoveClock;
    c.fullmoveNumber = this.fullmoveNumber;
    c.moveHistory = this.moveHistory.slice();
    c.positionCounts = new Map(this.positionCounts);
    return c;
  }

  setFEN(fen) {
    const parts = fen.trim().split(/\s+/);
    const [placement, turn, castling, ep, halfmove, fullmove] = parts;
    this.board = new Array(64).fill(null);
    const ranks = placement.split('/');
    for (let i = 0; i < 8; i++) {
      const rank = 7 - i;
      let file = 0;
      for (const ch of ranks[i]) {
        if (/[1-8]/.test(ch)) { file += Number(ch); continue; }
        const color = ch === ch.toUpperCase() ? WHITE : BLACK;
        this.board[sq(file, rank)] = color + ch.toUpperCase();
        file += 1;
      }
    }
    this.turn = turn === 'b' ? BLACK : WHITE;
    this.castling = {
      K: !!castling?.includes('K'),
      Q: !!castling?.includes('Q'),
      k: !!castling?.includes('k'),
      q: !!castling?.includes('q'),
    };
    this.epTarget = (!ep || ep === '-') ? null : parseSquare(ep);
    this.halfmoveClock = Number(halfmove ?? 0);
    this.fullmoveNumber = Number(fullmove ?? 1);
  }

  toFEN() {
    let placement = '';
    for (let rank = 7; rank >= 0; rank--) {
      let empty = 0;
      for (let file = 0; file <= 7; file++) {
        const p = this.board[sq(file, rank)];
        if (!p) { empty += 1; continue; }
        if (empty) { placement += empty; empty = 0; }
        placement += p[0] === WHITE ? p[1] : p[1].toLowerCase();
      }
      if (empty) placement += empty;
      if (rank > 0) placement += '/';
    }
    const castling = `${this.castling.K ? 'K' : ''}${this.castling.Q ? 'Q' : ''}${this.castling.k ? 'k' : ''}${this.castling.q ? 'q' : ''}` || '-';
    const ep = this.epTarget === null ? '-' : squareName(this.epTarget);
    return `${placement} ${this.turn} ${castling} ${ep} ${this.halfmoveClock} ${this.fullmoveNumber}`;
  }

  /** Clé de position pour la détection de répétition (simplification standard incluant les droits/EP). */
  positionKey() {
    return this.toFEN().split(' ').slice(0, 4).join(' ');
  }

  _recordPosition() {
    const key = this.positionKey();
    this.positionCounts.set(key, (this.positionCounts.get(key) ?? 0) + 1);
  }

  repetitionCount() {
    return this.positionCounts.get(this.positionKey()) ?? 0;
  }

  isAttacked(index, byColor, board = this.board) {
    const file = fileOf(index); const rank = rankOf(index);
    const pawnRankDelta = byColor === WHITE ? -1 : 1;
    for (const df of [-1, 1]) {
      const f = file + df; const r = rank + pawnRankDelta;
      if (inBounds(f, r) && board[sq(f, r)] === byColor + 'P') return true;
    }
    for (const [df, dr] of KNIGHT_DELTAS) {
      const f = file + df; const r = rank + dr;
      if (inBounds(f, r) && board[sq(f, r)] === byColor + 'N') return true;
    }
    for (const [df, dr] of KING_DELTAS) {
      const f = file + df; const r = rank + dr;
      if (inBounds(f, r) && board[sq(f, r)] === byColor + 'K') return true;
    }
    for (const [df, dr] of ROOK_DIRS) {
      let f = file + df; let r = rank + dr;
      while (inBounds(f, r)) {
        const p = board[sq(f, r)];
        if (p) { if (p[0] === byColor && (p[1] === 'R' || p[1] === 'Q')) return true; break; }
        f += df; r += dr;
      }
    }
    for (const [df, dr] of BISHOP_DIRS) {
      let f = file + df; let r = rank + dr;
      while (inBounds(f, r)) {
        const p = board[sq(f, r)];
        if (p) { if (p[0] === byColor && (p[1] === 'B' || p[1] === 'Q')) return true; break; }
        f += df; r += dr;
      }
    }
    return false;
  }

  kingSquare(color, board = this.board) { return board.indexOf(color + 'K'); }

  inCheck(color = this.turn, board = this.board) {
    const kingSq = this.kingSquare(color, board);
    if (kingSq === -1) return false;
    return this.isAttacked(kingSq, other(color), board);
  }

  _pseudoMoves(color = this.turn) {
    const moves = [];
    for (let index = 0; index < 64; index++) {
      const p = this.board[index];
      if (!p || p[0] !== color) continue;
      const type = p[1];
      const file = fileOf(index); const rank = rankOf(index);
      if (type === 'P') this._pawnMoves(index, color, moves);
      else if (type === 'N') { for (const [df, dr] of KNIGHT_DELTAS) this._stepMove(index, file + df, rank + dr, color, moves); }
      else if (type === 'K') {
        for (const [df, dr] of KING_DELTAS) this._stepMove(index, file + df, rank + dr, color, moves);
        this._castleMoves(color, moves);
      } else {
        const dirs = type === 'B' ? BISHOP_DIRS : type === 'R' ? ROOK_DIRS : [...ROOK_DIRS, ...BISHOP_DIRS];
        for (const [df, dr] of dirs) this._rayMoves(index, df, dr, color, moves);
      }
    }
    return moves;
  }

  _stepMove(from, f, r, color, moves) {
    if (!inBounds(f, r)) return;
    const to = sq(f, r);
    const target = this.board[to];
    if (target && target[0] === color) return;
    moves.push({ from, to, piece: this.board[from], captured: target ?? null, promotion: null, flags: {} });
  }

  _rayMoves(from, df, dr, color, moves) {
    let f = fileOf(from) + df; let r = rankOf(from) + dr;
    while (inBounds(f, r)) {
      const to = sq(f, r);
      const target = this.board[to];
      if (target) {
        if (target[0] !== color) moves.push({ from, to, piece: this.board[from], captured: target, promotion: null, flags: {} });
        break;
      }
      moves.push({ from, to, piece: this.board[from], captured: null, promotion: null, flags: {} });
      f += df; r += dr;
    }
  }

  _pawnMoves(from, color, moves) {
    const file = fileOf(from); const rank = rankOf(from);
    const dir = color === WHITE ? 1 : -1;
    const startRank = color === WHITE ? 1 : 6;
    const lastRank = color === WHITE ? 7 : 0;
    const oneRank = rank + dir;
    if (inBounds(file, oneRank) && !this.board[sq(file, oneRank)]) {
      this._addPawnMove(from, sq(file, oneRank), color, null, {}, moves, lastRank);
      const twoRank = rank + dir * 2;
      if (rank === startRank && !this.board[sq(file, twoRank)]) {
        this._addPawnMove(from, sq(file, twoRank), color, null, { doublePawn: true }, moves, lastRank);
      }
    }
    for (const df of [-1, 1]) {
      const f = file + df; const r = oneRank;
      if (!inBounds(f, r)) continue;
      const to = sq(f, r);
      const target = this.board[to];
      if (target && target[0] !== color) {
        this._addPawnMove(from, to, color, target, {}, moves, lastRank);
      } else if (!target && this.epTarget === to) {
        const capturedSq = sq(f, rank);
        this._addPawnMove(from, to, color, this.board[capturedSq], { enPassant: true, epCaptureSquare: capturedSq }, moves, lastRank);
      }
    }
  }

  _addPawnMove(from, to, color, captured, flags, moves, lastRank) {
    if (rankOf(to) === lastRank) {
      for (const promo of ['Q', 'R', 'B', 'N']) {
        moves.push({ from, to, piece: color + 'P', captured: captured ?? null, promotion: promo, flags: { ...flags } });
      }
    } else {
      moves.push({ from, to, piece: color + 'P', captured: captured ?? null, promotion: null, flags: { ...flags } });
    }
  }

  _castleMoves(color, moves) {
    const rank = color === WHITE ? 0 : 7;
    const rights = this.castling;
    const kingSide = color === WHITE ? rights.K : rights.k;
    const queenSide = color === WHITE ? rights.Q : rights.q;
    const kingFrom = sq(4, rank);
    if (this.board[kingFrom] !== color + 'K') return;
    if (this.inCheck(color)) return;
    const enemy = other(color);
    if (kingSide && !this.board[sq(5, rank)] && !this.board[sq(6, rank)]
      && this.board[sq(7, rank)] === color + 'R'
      && !this.isAttacked(sq(5, rank), enemy) && !this.isAttacked(sq(6, rank), enemy)) {
      moves.push({ from: kingFrom, to: sq(6, rank), piece: color + 'K', captured: null, promotion: null, flags: { castle: 'K' } });
    }
    if (queenSide && !this.board[sq(3, rank)] && !this.board[sq(2, rank)] && !this.board[sq(1, rank)]
      && this.board[sq(0, rank)] === color + 'R'
      && !this.isAttacked(sq(3, rank), enemy) && !this.isAttacked(sq(2, rank), enemy)) {
      moves.push({ from: kingFrom, to: sq(2, rank), piece: color + 'K', captured: null, promotion: null, flags: { castle: 'Q' } });
    }
  }

  /** Simule un coup sur un plateau cloné (léger) et dit s'il laisse le roi de `color` en échec. */
  _leavesKingInCheck(move, color) {
    const board = this.board.slice();
    const { from, to, piece, promotion, flags } = move;
    board[from] = null;
    if (flags.enPassant) board[flags.epCaptureSquare] = null;
    board[to] = promotion ? color + promotion : piece;
    if (flags.castle === 'K') {
      const rank = rankOf(from);
      board[sq(5, rank)] = board[sq(7, rank)]; board[sq(7, rank)] = null;
    } else if (flags.castle === 'Q') {
      const rank = rankOf(from);
      board[sq(3, rank)] = board[sq(0, rank)]; board[sq(0, rank)] = null;
    }
    const kingSq = board.indexOf(color + 'K');
    if (kingSq === -1) return false;
    return this.isAttacked(kingSq, other(color), board);
  }

  legalMoves(color = this.turn) {
    return this._pseudoMoves(color).filter((m) => !this._leavesKingInCheck(m, color));
  }

  legalMovesFrom(index) {
    if (!this.board[index] || this.board[index][0] !== this.turn) return [];
    return this.legalMoves(this.turn).filter((m) => m.from === index);
  }

  _applyMove(move) {
    const { from, to, piece, promotion, flags } = move;
    const color = piece[0];
    this.board[from] = null;
    if (flags.enPassant) this.board[flags.epCaptureSquare] = null;
    this.board[to] = promotion ? color + promotion : piece;
    if (flags.castle === 'K') {
      const rank = rankOf(from);
      this.board[sq(5, rank)] = this.board[sq(7, rank)]; this.board[sq(7, rank)] = null;
    } else if (flags.castle === 'Q') {
      const rank = rankOf(from);
      this.board[sq(3, rank)] = this.board[sq(0, rank)]; this.board[sq(0, rank)] = null;
    }
    if (piece === 'wK') { this.castling.K = false; this.castling.Q = false; }
    if (piece === 'bK') { this.castling.k = false; this.castling.q = false; }
    if (from === sq(0, 0) || to === sq(0, 0)) this.castling.Q = false;
    if (from === sq(7, 0) || to === sq(7, 0)) this.castling.K = false;
    if (from === sq(0, 7) || to === sq(0, 7)) this.castling.q = false;
    if (from === sq(7, 7) || to === sq(7, 7)) this.castling.k = false;
    this.epTarget = flags.doublePawn ? sq(fileOf(from), (rankOf(from) + rankOf(to)) / 2) : null;
    if (piece[1] === 'P' || move.captured) this.halfmoveClock = 0; else this.halfmoveClock += 1;
    if (color === BLACK) this.fullmoveNumber += 1;
    this.turn = other(color);
  }

  /** Joue un coup légal (from/to/promotion?) ; renvoie {ok, san?, move?, error?}. */
  makeMove({ from, to, promotion = null }) {
    const legal = this.legalMoves(this.turn);
    const found = legal.find((m) => m.from === from && m.to === to && (m.promotion ?? null) === promotion);
    if (!found) return { ok: false, error: 'Coup illégal.' };
    const san = this._sanFor(found, legal);
    this._applyMove(found);
    this._recordPosition();
    const entry = { ...found, san, fenAfter: this.toFEN() };
    this.moveHistory.push(entry);
    return { ok: true, move: found, san };
  }

  _sanFor(move, legalMoves) {
    if (move.flags.castle === 'K') return this._withCheckSuffix('O-O', move);
    if (move.flags.castle === 'Q') return this._withCheckSuffix('O-O-O', move);
    const type = move.piece[1];
    const isCapture = !!move.captured;
    let s = '';
    if (type === 'P') {
      if (isCapture) s += FILES[fileOf(move.from)] + 'x';
      s += squareName(move.to);
      if (move.promotion) s += `=${move.promotion}`;
    } else {
      s += type;
      const ambiguous = legalMoves.filter((m) => m !== move && m.piece === move.piece && m.to === move.to);
      if (ambiguous.length) {
        const sameFile = ambiguous.some((m) => fileOf(m.from) === fileOf(move.from));
        const sameRank = ambiguous.some((m) => rankOf(m.from) === rankOf(move.from));
        if (!sameFile) s += FILES[fileOf(move.from)];
        else if (!sameRank) s += String(rankOf(move.from) + 1);
        else s += squareName(move.from);
      }
      if (isCapture) s += 'x';
      s += squareName(move.to);
    }
    return this._withCheckSuffix(s, move);
  }

  _withCheckSuffix(s, move) {
    const clone = this.clone();
    clone._applyMove(move);
    if (clone.inCheck(clone.turn)) {
      const hasReply = clone.legalMoves(clone.turn).length > 0;
      return s + (hasReply ? '+' : '#');
    }
    return s;
  }

  /** État de la partie du point de vue du joueur au trait. */
  status() {
    const color = this.turn;
    const legal = this.legalMoves(color);
    const inCheck = this.inCheck(color);
    if (legal.length === 0) {
      return inCheck
        ? { over: true, result: other(color), reason: 'echec-et-mat' }
        : { over: true, result: 'nulle', reason: 'pat' };
    }
    if (this.halfmoveClock >= 100) return { over: true, result: 'nulle', reason: 'regle-50-coups' };
    if (this.repetitionCount() >= 3) return { over: true, result: 'nulle', reason: 'repetition' };
    if (this._insufficientMaterial()) return { over: true, result: 'nulle', reason: 'materiel-insuffisant' };
    return { over: false, inCheck };
  }

  _insufficientMaterial() {
    const nonKings = [];
    for (let i = 0; i < 64; i++) {
      const p = this.board[i];
      if (p && p[1] !== 'K') nonKings.push({ type: p[1], squareColor: (fileOf(i) + rankOf(i)) % 2 });
    }
    if (nonKings.length === 0) return true;
    if (nonKings.length === 1 && (nonKings[0].type === 'B' || nonKings[0].type === 'N')) return true;
    if (nonKings.length === 2 && nonKings.every((x) => x.type === 'B') && nonKings[0].squareColor === nonKings[1].squareColor) return true;
    return false;
  }

  /** Nombre de perft (test standard de comptage de coups, utilisé pour valider le générateur). */
  perft(depth) {
    if (depth === 0) return 1;
    const moves = this.legalMoves(this.turn);
    if (depth === 1) return moves.length;
    let count = 0;
    for (const m of moves) {
      const c = this.clone();
      c._applyMove(m);
      count += c.perft(depth - 1);
    }
    return count;
  }
}
