/**
 * Dominos — jeu complet pour la plateforme Arcade.
 * Double-six par défaut (extensible double-neuf / double-douze).
 *
 * Le moteur pur (DominoEngine) et l'IA (aiChooseAction) ci-dessous sont
 * identiques à ceux testés dans test-engine.mjs (281 assertions, parties
 * complètes simulées 2 à 4 joueurs, IA, sauvegarde/reprise) — copiés tels
 * quels, aucune divergence entre la version testée et la version livrée.
 */

export const MAX_PIPS_DEFAULT = 6;
export const HAND_SIZE_DEFAULT = 7;
export const TARGET_SCORE_DEFAULT = 100;

/** Jeu complet de dominos pour une variante donnée (double-six par défaut = 28 pièces). */
export function buildSet(maxPips = MAX_PIPS_DEFAULT) {
  const tiles = [];
  let id = 0;
  for (let a = 0; a <= maxPips; a += 1) {
    for (let b = a; b <= maxPips; b += 1) {
      tiles.push({ id: id += 1, a, b });
    }
  }
  return tiles;
}

function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export class DominoEngine {
  /**
   * @param {string[]} playerIds Ordre de jeu (siège = index dans ce tableau).
   * @param {object} opts { maxPips, handSize, mode: 'classique'|'cible'|'rapide', targetScore }
   */
  constructor(playerIds, opts = {}) {
    this.playerIds = [...playerIds];
    this.maxPips = opts.maxPips ?? MAX_PIPS_DEFAULT;
    this.handSize = opts.handSize ?? HAND_SIZE_DEFAULT;
    this.mode = opts.mode ?? 'classique'; // classique | cible | rapide
    this.targetScore = this.mode === 'rapide' ? Infinity : (opts.targetScore ?? TARGET_SCORE_DEFAULT);
    this.scores = Object.fromEntries(this.playerIds.map((id) => [id, 0]));
    this.forfeited = new Set();
    this.roundNo = 0;
    this.matchPhase = 'playing'; // playing | roundEnd | matchEnd
    this.matchWinner = null;
    this.startRound();
  }

  /* ---------------- joueurs actifs / tours ---------------- */

  activePlayers() { return this.playerIds.filter((id) => !this.forfeited.has(id)); }

  nextActiveAfter(id) {
    const active = this.activePlayers();
    if (!active.length) return null;
    const i = active.indexOf(id);
    if (i === -1) return active[0];
    return active[(i + 1) % active.length];
  }

  advanceTurn() { this.turn = this.nextActiveAfter(this.turn); }

  /* ---------------- distribution ---------------- */

  /** Nouvelle manche : mélange, distribution, celui qui commence. */
  startRound(starterId = null) {
    this.roundNo += 1;
    const full = shuffle(buildSet(this.maxPips));
    const active = this.activePlayers();

    this.hands = {};
    for (const id of this.playerIds) this.hands[id] = [];
    let i = 0;
    for (let k = 0; k < this.handSize; k += 1) {
      for (const id of active) { this.hands[id].push(full[i]); i += 1; }
    }
    this.boneyard = full.slice(i);

    this.chain = [];        // [{id,a,b,left,right}] gauche→droite dans l'ordre de pose
    this.leftEnd = null;
    this.rightEnd = null;
    this.roundPhase = 'playing'; // playing | won | blocked
    this.roundWinner = null;
    this.lastRoundPoints = {};
    this.passStreak = 0;
    this.lastMove = null;

    let starter = starterId && active.includes(starterId) ? starterId : null;
    if (!starter) {
      let best = null;
      for (const id of active) {
        for (const t of this.hands[id]) {
          if (t.a === t.b && (!best || t.a > best.val)) best = { id, val: t.a };
        }
      }
      starter = best ? best.id : active[0];
    }
    this.turn = starter;
    this.matchPhase = 'playing';
  }

  /* ---------------- coups valides ---------------- */

  canPlay(playerId) {
    if (this.chain.length === 0) return this.hands[playerId].length > 0;
    const hand = this.hands[playerId];
    return hand.some((t) => t.a === this.leftEnd || t.b === this.leftEnd || t.a === this.rightEnd || t.b === this.rightEnd);
  }

  /** Tous les coups jouables : [{tileId, end}], end = 'left'|'right'|'any' (premier domino). */
  validMoves(playerId) {
    const hand = this.hands[playerId];
    if (this.chain.length === 0) return hand.map((t) => ({ tileId: t.id, end: 'any' }));
    const moves = [];
    for (const t of hand) {
      if (t.a === this.leftEnd || t.b === this.leftEnd) moves.push({ tileId: t.id, end: 'left' });
      if (t.a === this.rightEnd || t.b === this.rightEnd) moves.push({ tileId: t.id, end: 'right' });
    }
    return moves;
  }

  /* ---------------- actions ---------------- */

  play(playerId, tileId, end) {
    if (this.roundPhase !== 'playing') return { ok: false, error: 'La manche est terminée.' };
    if (playerId !== this.turn) return { ok: false, error: 'Ce n\'est pas votre tour.' };
    const hand = this.hands[playerId];
    const idx = hand.findIndex((t) => t.id === tileId);
    if (idx === -1) return { ok: false, error: 'Ce domino n\'est pas dans votre main.' };
    const tile = hand[idx];

    if (this.chain.length === 0) {
      this.chain.push({ id: tile.id, a: tile.a, b: tile.b, left: tile.a, right: tile.b });
      this.leftEnd = tile.a;
      this.rightEnd = tile.b;
      this.lastMove = { playerId, tileId: tile.id, end: 'first' };
    } else {
      if (end !== 'left' && end !== 'right') return { ok: false, error: 'Extrémité invalide.' };
      const target = end === 'left' ? this.leftEnd : this.rightEnd;
      if (tile.a !== target && tile.b !== target) return { ok: false, error: 'Ce domino ne correspond pas à cette extrémité.' };
      const touchingA = tile.a === target;
      const outer = touchingA ? tile.b : tile.a;
      if (end === 'left') {
        this.chain.unshift({ id: tile.id, a: tile.a, b: tile.b, left: outer, right: target });
        this.leftEnd = outer;
      } else {
        this.chain.push({ id: tile.id, a: tile.a, b: tile.b, left: target, right: outer });
        this.rightEnd = outer;
      }
      this.lastMove = { playerId, tileId: tile.id, end };
    }

    hand.splice(idx, 1);
    this.passStreak = 0;

    if (hand.length === 0) {
      this.endRound('domino', playerId);
      return { ok: true, tile, end, roundOver: true };
    }
    this.advanceTurn();
    return { ok: true, tile, end, roundOver: false };
  }

  draw(playerId) {
    if (this.roundPhase !== 'playing') return { ok: false, error: 'La manche est terminée.' };
    if (playerId !== this.turn) return { ok: false, error: 'Ce n\'est pas votre tour.' };
    if (this.canPlay(playerId)) return { ok: false, error: 'Vous avez un coup jouable — vous ne pouvez pas piocher.' };
    if (this.boneyard.length === 0) return { ok: false, error: 'La pioche est vide.' };
    const tile = this.boneyard.pop();
    this.hands[playerId].push(tile);
    return { ok: true, tile, canPlayNow: this.canPlay(playerId) };
  }

  pass(playerId) {
    if (this.roundPhase !== 'playing') return { ok: false, error: 'La manche est terminée.' };
    if (playerId !== this.turn) return { ok: false, error: 'Ce n\'est pas votre tour.' };
    if (this.canPlay(playerId)) return { ok: false, error: 'Vous devez jouer.' };
    if (this.boneyard.length > 0) return { ok: false, error: 'Vous devez piocher avant de passer.' };
    this.passStreak += 1;
    if (this.passStreak >= this.activePlayers().length) {
      this.endRound('blocked');
      return { ok: true, blocked: true, roundOver: true };
    }
    this.advanceTurn();
    return { ok: true, blocked: false, roundOver: false };
  }

  /* ---------------- forfait (déconnexion) ---------------- */

  forfeit(playerId) {
    if (this.forfeited.has(playerId)) return { ok: false };
    this.forfeited.add(playerId);
    const active = this.activePlayers();
    if (this.roundPhase === 'playing') {
      if (active.length <= 1) {
        this.endRound('forfeit', active[0] ?? null);
      } else {
        if (this.turn === playerId) this.advanceTurn();
        this.passStreak = 0;
      }
    }
    if (active.length <= 1 && this.matchPhase !== 'matchEnd') {
      this.matchPhase = 'matchEnd';
      this.matchWinner = active[0] ?? null;
    }
    return { ok: true };
  }

  /* ---------------- fin de manche / scores ---------------- */

  handValue(id) { return this.hands[id].reduce((s, t) => s + t.a + t.b, 0); }

  endRound(kind, winnerId = null) {
    this.roundPhase = kind === 'domino' ? 'won' : (kind === 'forfeit' ? 'won' : 'blocked');

    if (kind === 'domino' || kind === 'forfeit') {
      this.roundWinner = winnerId;
      this.lastRoundPoints = {};
      if (winnerId) {
        const pts = this.activePlayers()
          .filter((id) => id !== winnerId)
          .reduce((s, id) => s + this.handValue(id), 0);
        this.scores[winnerId] = (this.scores[winnerId] ?? 0) + pts;
        this.lastRoundPoints[winnerId] = pts;
      }
    } else {
      // Bloqué : le plus petit total en main remporte la manche (règle classique).
      const totals = this.activePlayers().map((id) => ({ id, val: this.handValue(id) }));
      const min = Math.min(...totals.map((t) => t.val));
      const winners = totals.filter((t) => t.val === min);
      this.lastRoundPoints = {};
      if (winners.length === 1) {
        const w = winners[0].id;
        const pts = totals.filter((t) => t.id !== w).reduce((s, t) => s + t.val, 0);
        this.scores[w] = (this.scores[w] ?? 0) + pts;
        this.roundWinner = w;
        this.lastRoundPoints[w] = pts;
      } else {
        this.roundWinner = null; // égalité : personne ne marque cette manche
      }
    }

    if (this.mode === 'rapide') {
      this.matchPhase = 'matchEnd';
      this.matchWinner = this.roundWinner
        ?? Object.entries(this.scores).sort((a, b) => b[1] - a[1])[0]?.[0] ?? null;
      return;
    }
    const reached = this.activePlayers().filter((id) => this.scores[id] >= this.targetScore);
    if (reached.length) {
      this.matchPhase = 'matchEnd';
      this.matchWinner = reached.sort((a, b) => this.scores[b] - this.scores[a])[0];
    } else {
      this.matchPhase = 'roundEnd';
    }
  }

  /** Manche suivante : le gagnant de la précédente commence (sinon le plus haut double). */
  nextRound() {
    if (this.matchPhase !== 'roundEnd') return { ok: false, error: 'Pas encore le moment.' };
    this.startRound(this.roundWinner);
    return { ok: true };
  }

  /* ---------------- vues sérialisables ---------------- */

  /** Info publique visible de tous (aucune main adverse). */
  snapshotPublic() {
    return {
      roundNo: this.roundNo,
      chain: this.chain.map((t) => ({ ...t })),
      leftEnd: this.leftEnd,
      rightEnd: this.rightEnd,
      boneyardCount: this.boneyard.length,
      handCounts: Object.fromEntries(this.playerIds.map((id) => [id, this.hands[id].length])),
      turn: this.turn,
      roundPhase: this.roundPhase,
      roundWinner: this.roundWinner,
      lastRoundPoints: { ...this.lastRoundPoints },
      matchPhase: this.matchPhase,
      matchWinner: this.matchWinner,
      scores: { ...this.scores },
      lastMove: this.lastMove ? { ...this.lastMove } : null,
      forfeited: [...this.forfeited],
      mode: this.mode,
      maxPips: this.maxPips,
      targetScore: Number.isFinite(this.targetScore) ? this.targetScore : null,
    };
  }

  /** Vue privée pour un joueur précis : ajoute SA main et SES coups valides. */
  viewFor(playerId) {
    const pub = this.snapshotPublic();
    const hand = (this.hands[playerId] ?? []).map((t) => ({ ...t }));
    const myTurn = this.roundPhase === 'playing' && this.turn === playerId;
    return {
      ...pub,
      hand,
      validMoves: myTurn ? this.validMoves(playerId) : [],
      canDraw: myTurn && !this.canPlay(playerId) && this.boneyard.length > 0,
      canPass: myTurn && !this.canPlay(playerId) && this.boneyard.length === 0,
    };
  }

  /* ---------------- sauvegarde / reprise ---------------- */

  /** Sérialise TOUT l'état privé (mains incluses) — pour la reprise de partie côté Host uniquement. */
  toJSON() {
    return {
      playerIds: this.playerIds, maxPips: this.maxPips, handSize: this.handSize, mode: this.mode,
      targetScore: this.targetScore, scores: this.scores, forfeited: [...this.forfeited], roundNo: this.roundNo,
      matchPhase: this.matchPhase, matchWinner: this.matchWinner, hands: this.hands, boneyard: this.boneyard,
      chain: this.chain, leftEnd: this.leftEnd, rightEnd: this.rightEnd, roundPhase: this.roundPhase,
      roundWinner: this.roundWinner, lastRoundPoints: this.lastRoundPoints, passStreak: this.passStreak,
      lastMove: this.lastMove, turn: this.turn,
    };
  }

  /** Reconstruit une instance depuis toJSON() SANS repasser par le constructeur (pas de nouvelle donne). */
  static fromJSON(data) {
    const e = Object.create(DominoEngine.prototype);
    Object.assign(e, data);
    e.forfeited = new Set(data.forfeited ?? []);
    return e;
  }
}

/* ====================================================================== */
/* IA — 3 niveaux, heuristique (pas de recherche en profondeur)           */
/* ====================================================================== */

export const AI_LEVELS = ['facile', 'moyen', 'difficile'];

/** Tuiles NON visibles par playerId qui portent la valeur donnée (pioche + mains adverses). */
function countHiddenWithValue(engine, playerId, value) {
  let n = 0;
  for (const t of engine.boneyard) if (t.a === value || t.b === value) n += 1;
  for (const id of engine.activePlayers()) {
    if (id === playerId) continue;
    for (const t of engine.hands[id]) if (t.a === value || t.b === value) n += 1;
  }
  return n;
}

/**
 * Choisit l'action de l'IA pour `playerId`. Ne modifie rien — c'est à
 * l'appelant (Host) d'exécuter l'action retournée via engine.play/draw/pass.
 * @returns {{action:'play',tileId:number,end:string}|{action:'draw'}|{action:'pass'}}
 */
export function aiChooseAction(engine, playerId, level = 'moyen') {
  if (!engine.canPlay(playerId)) {
    return engine.boneyard.length > 0 ? { action: 'draw' } : { action: 'pass' };
  }
  const moves = engine.validMoves(playerId);
  if (level === 'facile') {
    return { action: 'play', ...moves[Math.floor(Math.random() * moves.length)] };
  }

  const hand = engine.hands[playerId];
  const scoreMove = (m) => {
    const tile = hand.find((t) => t.id === m.tileId);
    let score = tile.a + tile.b; // se délester des grosses valeurs en priorité
    if (tile.a === tile.b) score += 4; // les doubles se replacent plus difficilement : jouer tôt

    if (level === 'difficile' && engine.chain.length > 0) {
      const target = m.end === 'left' ? engine.leftEnd : (m.end === 'right' ? engine.rightEnd : null);
      const outer = target === null ? null : (tile.a === target ? tile.b : tile.a);
      if (outer !== null) {
        // Pénalise les coups qui laissent une extrémité facile à jouer pour les adversaires.
        score -= countHiddenWithValue(engine, playerId, outer) * 1.4;
      }
    }
    return score;
  };

  let best = moves[0];
  let bestScore = -Infinity;
  for (const m of moves) {
    const s = scoreMove(m);
    if (s > bestScore) { bestScore = s; best = m; }
  }
  return { action: 'play', ...best };
}


/* ====================================================================== */
/* Dominos — module de jeu pour la plateforme Arcade                      */
/*                                                                        */
/* Architecture « Host autoritaire », comme tous les jeux de la           */
/* plateforme : le client du Host exécute DominoEngine (moteur pur        */
/* ci-dessus, testé indépendamment dans test-engine.mjs) et diffuse à     */
/* CHAQUE joueur SA PROPRE vue (sa main est privée — jamais envoyée aux   */
/* autres). Les invités envoient leurs actions au Host, qui valide via    */
/* le moteur et ne rediffuse que si le coup est légal.                    */
/*                                                                        */
/* Contrat de plateforme :                                                */
/*   export default { mount(container, context), unmount() }              */
/*   context = { roomId, roomName, hostId, players, me, socket,           */
/*               sendMessage(data, to = null), onMessage(handler),        */
/*               onEnd(result) }                                          */
/*                                                                        */
/* Canaux ('k') :                                                        */
/*   'hello'  invité → Host, à l'arrivée                                  */
/*   'lobby'  Host → tous, config avant le début du match                 */
/*   'view'   Host → UN joueur précis (jamais de diffusion : contient sa  */
/*            main privée)                                                */
/*   'm'      joueur → Host, action demandée {action,tileId?,end?}        */
/*   'c' / 'c:sync'  chat, comme les autres jeux                          */
/*   'h'      heartbeat (détection de déconnexion, par joueur)            */
/* ====================================================================== */

const HB_MS = 2000;
const LOST_MS = 6000;
const FORFEIT_MS = 30000;
const CHAT_MAX = 200;
const AI_MOVE_MIN_MS = 550;
const AI_MOVE_JITTER_MS = 550;
const SAVE_KEY_PREFIX = 'dominos:save:';

function h(tag, props = {}, children = []) {
  const node = document.createElement(tag);
  Object.entries(props).forEach(([k, v]) => {
    if (v === undefined || v === null || v === false) return;
    if (k === 'className') node.className = v;
    else if (k === 'style') node.style.cssText = v;
    else if (k.startsWith('on')) node.addEventListener(k.slice(2).toLowerCase(), v);
    else node.setAttribute(k, v);
  });
  (Array.isArray(children) ? children : [children]).forEach((c) => {
    if (c === undefined || c === null || c === false) return;
    node.append(typeof c === 'string' || typeof c === 'number' ? document.createTextNode(String(c)) : c);
  });
  return node;
}

/* ---------------- pips (points) d'un domino, style dé classique ---------------- */

const PIP_POS = {
  0: [],
  1: [[50, 50]],
  2: [[26, 26], [74, 74]],
  3: [[26, 26], [50, 50], [74, 74]],
  4: [[26, 26], [26, 74], [74, 26], [74, 74]],
  5: [[26, 26], [26, 74], [74, 26], [74, 74], [50, 50]],
  6: [[26, 22], [26, 50], [26, 78], [74, 22], [74, 50], [74, 78]],
};

function pipFace(value) {
  if (value > 6) return h('span', { className: 'dmn-num' }, String(value));
  const pts = PIP_POS[value] ?? [];
  return h('div', { className: 'dmn-face' }, pts.map((p) => h('span', {
    className: 'dmn-pip', style: `left:${p[0]}%;top:${p[1]}%`,
  })));
}

/* ---------------- petit synthétiseur pour les retours sonores ---------------- */

class Beeper {
  constructor() { this.ctx = null; this.muted = false; }
  ensure() {
    if (this.ctx) return this.ctx;
    const Ctor = window.AudioContext || window.webkitAudioContext;
    if (!Ctor) return null;
    this.ctx = new Ctor();
    return this.ctx;
  }
  play(freq, durMs, type = 'sine', gain = 0.05) {
    if (this.muted) return;
    try {
      const ctx = this.ensure();
      if (!ctx) return;
      if (ctx.state === 'suspended') ctx.resume();
      const osc = ctx.createOscillator();
      const g = ctx.createGain();
      osc.type = type;
      osc.frequency.value = freq;
      g.gain.value = gain;
      osc.connect(g).connect(ctx.destination);
      const t0 = ctx.currentTime;
      g.gain.setValueAtTime(gain, t0);
      g.gain.exponentialRampToValueAtTime(0.0001, t0 + durMs / 1000);
      osc.start(t0);
      osc.stop(t0 + durMs / 1000 + 0.02);
    } catch { /* pas grave si le navigateur refuse (autoplay policy, etc.) */ }
  }
  tilePlaced() { this.play(320, 90, 'square', 0.04); }
  draw() { this.play(200, 140, 'triangle', 0.05); }
  invalid() { this.play(110, 160, 'sawtooth', 0.05); }
  turnMine() { this.play(520, 120, 'sine', 0.04); }
  roundWon() { this.play(660, 90, 'sine', 0.05); setTimeout(() => this.play(880, 160, 'sine', 0.05), 90); }
  roundLost() { this.play(180, 260, 'sine', 0.05); }
  matchWon() { [523, 659, 784, 1047].forEach((f, i) => setTimeout(() => this.play(f, 180, 'sine', 0.05), i * 110)); }
}

/* ====================================================================== */
/* Styles (scopés .dmn)                                                   */
/* ====================================================================== */

const CSS = `
.dmn{--dmn-surface:var(--surface,#171a24);--dmn-border:var(--border,#2a2f3d);--dmn-ink:var(--text,#e8eaf0);
--dmn-deep:#0e1017;--dmn-accent:var(--accent,#6c5ce7);--dmn-gold:#ffd54a;--dmn-tile:#f4f1ea;--dmn-tile-ink:#20232b;
display:flex;gap:12px;align-items:stretch;font-family:inherit;color:var(--dmn-ink);min-height:600px;position:relative}
.dmn *{box-sizing:border-box}
.dmn__main{flex:1;min-width:0;display:flex;flex-direction:column;background:var(--dmn-surface);border:1px solid var(--dmn-border);border-radius:14px;overflow:hidden;position:relative}
.dmn__side{width:250px;flex:none;display:flex;flex-direction:column;background:var(--dmn-surface);border:1px solid var(--dmn-border);border-radius:14px;overflow:hidden}
.dmn__head{display:flex;align-items:center;gap:10px;padding:10px 14px;border-bottom:1px solid var(--dmn-border);flex:none;flex-wrap:wrap}
.dmn__scores{display:flex;gap:6px;flex-wrap:wrap}
.dmn__sc{display:inline-flex;align-items:center;gap:5px;padding:3px 9px;border-radius:20px;background:var(--dmn-deep);border:1px solid var(--dmn-border);font-size:12px;font-weight:700;font-variant-numeric:tabular-nums}
.dmn__sc--me{border-color:var(--dmn-accent);color:#c9c2ff}
.dmn__sc--ai{opacity:.75}
.dmn__grow{flex:1}
.dmn__turn{font-size:13px;font-weight:700;padding:5px 12px;border-radius:20px;background:var(--dmn-deep);border:1px solid var(--dmn-border);white-space:nowrap}
.dmn__turn.dmn--me{border-color:#33c26b;color:#7ee787}
.dmn__mute{background:transparent;border:1px solid var(--dmn-border);color:inherit;border-radius:8px;padding:4px 8px;cursor:pointer;font-size:13px}

.dmn__stage{flex:1;display:flex;flex-direction:column;min-height:0}
.dmn__board{flex:1;overflow:auto;display:flex;align-items:center;padding:20px;position:relative}
.dmn__chain{display:flex;align-items:center;gap:2px;margin:auto;flex-wrap:wrap;justify-content:center;max-width:100%}
.dmn__chain--serpentin{flex-direction:column;gap:4px;align-items:center;width:100%}
.dmn__row{display:flex;align-items:center;gap:2px;justify-content:center;max-width:100%}
.dmn__row--rev{flex-direction:row-reverse}
/* Dans une rangée qui se lit de droite à gauche, on retourne aussi les moitiés
   de chaque domino pour que les valeurs se raccordent visuellement. */
.dmn__row--rev .dmn-tile--h{flex-direction:row-reverse}
.dmn__row--rev .dmn-tile--h .dmn-tile__half:first-child{border-right:none;border-left:2px solid rgba(0,0,0,.25)}
.dmn__endzone{width:38px;height:60px;border-radius:8px;flex:none;display:flex;align-items:center;justify-content:center;font-size:18px;opacity:0;pointer-events:none;transition:opacity .12s,background .12s;border:2px dashed transparent}
.dmn__endzone--active{opacity:1;pointer-events:auto;cursor:pointer;border-color:var(--dmn-accent);background:rgba(108,92,231,.15);animation:dmnpulse 1s ease-in-out infinite}
@keyframes dmnpulse{0%,100%{background:rgba(108,92,231,.10)}50%{background:rgba(108,92,231,.28)}}

.dmn-tile{background:var(--dmn-tile);color:var(--dmn-tile-ink);border-radius:6px;box-shadow:0 2px 5px rgba(0,0,0,.35);display:flex;flex:none;position:relative;border:1px solid rgba(0,0,0,.15)}
.dmn-tile__half{width:30px;height:30px;position:relative}
.dmn-face{position:absolute;inset:0}
.dmn-pip{position:absolute;width:5px;height:5px;border-radius:50%;background:var(--dmn-tile-ink);transform:translate(-50%,-50%)}
.dmn-num{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:800}
.dmn-tile--h{flex-direction:row}
.dmn-tile--h .dmn-tile__half:first-child{border-right:2px solid rgba(0,0,0,.25)}
.dmn-tile--v{flex-direction:column;width:30px}
.dmn-tile--v .dmn-tile__half:first-child{border-bottom:2px solid rgba(0,0,0,.25)}
.dmn-tile--double{background:#fff}
.dmn-tile--new{animation:dmndrop .32s ease-out}
@keyframes dmndrop{0%{transform:scale(.4) rotate(-8deg);opacity:0}100%{transform:scale(1) rotate(0);opacity:1}}
@media(prefers-reduced-motion:reduce){.dmn-tile--new{animation:none}}

.dmn__handwrap{flex:none;border-top:1px solid var(--dmn-border);padding:10px 14px;display:flex;flex-direction:column;gap:8px}
.dmn__handrow{display:flex;gap:8px;overflow-x:auto;padding:4px 2px 8px}
.dmn-hand-tile{cursor:pointer;transition:transform .12s,box-shadow .12s;transform-origin:bottom center}
.dmn-hand-tile .dmn-tile{width:44px}
.dmn-hand-tile .dmn-tile__half{width:44px;height:44px}
.dmn-hand-tile:hover{transform:translateY(-4px)}
.dmn-hand-tile--playable{box-shadow:0 0 0 2px var(--dmn-gold)}
.dmn-hand-tile--selected{transform:translateY(-10px);box-shadow:0 0 0 2px var(--dmn-accent),0 6px 14px rgba(0,0,0,.4)}
.dmn-hand-tile--unplayable{opacity:.45;cursor:default}
.dmn-hand-tile--unplayable:hover{transform:none}

.dmn__actions{display:flex;align-items:center;gap:10px;flex-wrap:wrap}
.dmn-btn{padding:9px 18px;font-size:14px;font-weight:800;border:none;border-radius:10px;background:var(--dmn-accent);color:#fff;cursor:pointer}
.dmn-btn:hover{filter:brightness(1.1)}
.dmn-btn:disabled{opacity:.35;cursor:not-allowed;filter:none}
.dmn-btn--ghost{background:transparent;border:1px solid var(--dmn-border);color:inherit;font-weight:600;padding:7px 16px;font-size:13px}
.dmn__boneyard{display:flex;align-items:center;gap:6px;font-size:12px;opacity:.75;white-space:nowrap}

.dmn-banner{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;background:rgba(8,10,16,.92);backdrop-filter:blur(3px);z-index:6;text-align:center;padding:20px}
.dmn-banner h3{margin:0;font-size:24px;font-weight:900}
.dmn-banner--win h3{color:#7ee787}
.dmn-banner--lose h3{color:#ff6b6b}
.dmn-banner--blocked h3{color:var(--dmn-gold)}
.dmn-banner p{margin:0;font-size:13px;opacity:.75;max-width:360px}
.dmn-banner__scores{display:flex;gap:8px;flex-wrap:wrap;justify-content:center;margin-top:6px}

.dmn-lobby{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;background:var(--dmn-deep);z-index:6;padding:clamp(10px,3vw,28px);overflow:auto}
.dmn-lobby__card{background:var(--dmn-surface);border:1px solid var(--dmn-border);border-radius:14px;padding:clamp(16px,3vw,28px);width:100%;max-width:960px;display:grid;gap:14px 20px;grid-template-columns:repeat(auto-fit,minmax(210px,1fr));align-content:start}
.dmn-lobby__card h2,.dmn-lobby__full{grid-column:1/-1}
.dmn-lobby__card h2{margin:0;font-size:19px}
.dmn-field{display:grid;gap:6px;font-size:13px}
.dmn-field label{font-weight:700;opacity:.85}
.dmn-field select,.dmn-field input{width:100%;background:var(--dmn-deep);border:1px solid var(--dmn-border);color:inherit;border-radius:8px;padding:8px 10px;font-size:13px}
.dmn-seats{display:grid;grid-template-columns:repeat(auto-fill,minmax(190px,1fr));gap:6px}
.dmn-seat{display:flex;align-items:center;gap:8px;padding:6px 10px;border-radius:8px;background:var(--dmn-deep);border:1px solid var(--dmn-border);font-size:13px}
.dmn-seat__rm{margin-left:auto;background:transparent;border:none;color:#ff6b6b;cursor:pointer;font-size:14px}

.dmn-overlay{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:12px;background:rgba(8,10,16,.9);backdrop-filter:blur(3px);z-index:7;text-align:center;padding:20px}
.dmn-spin{width:34px;height:34px;border:3px solid var(--dmn-border);border-top-color:var(--dmn-accent);border-radius:50%;animation:dmnspin .9s linear infinite}
@keyframes dmnspin{to{transform:rotate(360deg)}}
.dmn-count{font-variant-numeric:tabular-nums;font-weight:800;color:#ffb454}

.dmn-toast{position:absolute;left:50%;top:14px;transform:translateX(-50%);background:var(--dmn-deep);border:1px solid var(--dmn-border);color:#ff9b9b;padding:7px 14px;border-radius:20px;font-size:12px;font-weight:700;z-index:8;opacity:0;transition:opacity .2s}
.dmn-toast--show{opacity:1}

.dmn-chat__head{padding:10px 14px;border-bottom:1px solid var(--dmn-border);font-weight:700;font-size:14px;flex:none}
.dmn-chat__log{flex:1;overflow:auto;padding:10px 12px;display:flex;flex-direction:column;gap:6px}
.dmn-msg{font-size:13px;line-height:1.35;word-break:break-word}
.dmn-msg b{color:var(--dmn-accent)}
.dmn-msg--sys{opacity:.6;font-style:italic;font-size:12px}
.dmn-chat__form{display:flex;gap:6px;padding:10px;border-top:1px solid var(--dmn-border);flex:none}
.dmn-chat__form input{flex:1;min-width:0;padding:8px 10px;border-radius:8px;border:1px solid var(--dmn-border);background:var(--dmn-deep);color:inherit}
.dmn-chat__form input:focus{outline:none;border-color:var(--dmn-accent)}
.dmn-chat__form button{padding:8px 12px;border:none;border-radius:8px;background:var(--dmn-accent);color:#fff;font-weight:700;cursor:pointer}
@media(max-width:760px){.dmn{flex-direction:column;min-height:0}.dmn__side{width:auto;height:190px}}
`;

/* ====================================================================== */
/* Interface                                                              */
/* ====================================================================== */

export class DominoUI {
  constructor(container, context) {
    this.container = container;
    this.ctx = context;
    this.me = context.me;
    this.players = context.players || [];
    this.engine = null;          // instance côté Host uniquement
    this.view = null;            // dernière vue connue (perso) — Host comme invité
    this.lobby = null;           // config de lobby reçue (invité) ou construite (Host)
    this.chat = [];
    this.unsub = null;
    this.lastSeen = {};          // playerId réel → timestamp dernier heartbeat
    this.lostPlayers = new Set();
    this.selectedTileId = null;
    this.renderedTiles = new Set(); // clés déjà animées (évite de rejouer l'anim d'entrée)
    this.beeper = new Beeper();
    this.toastTimer = null;
    this.timers = {};
  }

  get hostId() { return this.ctx.hostId; }
  get isHost() { return this.me.id === this.ctx.hostId; }
  get roomId() { return this.ctx.roomId; }

  pseudoOf(id) {
    if (this.lobby?.aiSeats?.[id]) return this.lobby.aiSeats[id].pseudo;
    const p = this.players.find((x) => x.id === id);
    return p ? p.pseudo : id;
  }
  isAI(id) { return Boolean(this.lobby?.aiSeats?.[id]); }

  broadcastToReal(data) {
    for (const p of this.players) if (p.id !== this.me.id) this.ctx.sendMessage(data, p.id);
  }
  toHost(data) { this.ctx.sendMessage(data, this.hostId); }

  /* ---------------- cycle de vie ---------------- */

  mount() {
    this.styleEl = h('style', {}, CSS);
    this.root = h('div', { className: 'dmn' });
    this.buildShell();
    this.container.append(this.styleEl, this.root);

    this.unsub = this.ctx.onMessage(({ from, data }) => this.onMessage(from, data));

    if (this.isHost) {
      this.lobby = this.defaultLobby();
      const restored = this.tryRestore();
      if (!restored) this.renderLobby();
    } else {
      this.toHost({ k: 'hello' });
      this.renderLobby(); // écran d'attente tant que rien n'est reçu
    }

    this.timers.hb = setInterval(() => this.broadcastToReal({ k: 'h' }), HB_MS);
    this.timers.watch = setInterval(() => this.checkPeers(), 1000);
  }

  unmount() {
    if (this.unsub) this.unsub();
    Object.values(this.timers).forEach((t) => clearInterval(t));
    if (this.timers.ai) clearTimeout(this.timers.ai);
    if (this.styleEl) this.styleEl.remove();
    if (this.root) this.root.remove();
  }

  defaultLobby() {
    return {
      mode: 'classique', targetScore: 100, maxPips: 6,
      seats: this.players.map((p) => p.id), // ordre de jeu = ordre d'arrivée
      aiSeats: {}, // id → { pseudo, difficulty }
      started: false,
    };
  }

  /* ---------------- réseau ---------------- */

  onMessage(from, data) {
    if (!data || from === this.me.id) return;
    if (this.players.some((p) => p.id === from)) {
      this.lastSeen[from] = Date.now();
      if (this.lostPlayers.has(from)) { this.lostPlayers.delete(from); this.render(); }
    }

    switch (data.k) {
      case 'h': break;
      case 'hello':
        if (this.isHost) {
          this.ctx.sendMessage({ k: 'lobby', lobby: this.lobby }, from);
          if (this.engine) this.ctx.sendMessage({ k: 'view', view: this.engine.viewFor(from) }, from);
          this.ctx.sendMessage({ k: 'c:sync', chat: this.chat }, from);
        }
        break;
      case 'lobby':
        if (!this.isHost) { this.lobby = data.lobby; this.renderLobby(); }
        break;
      case 'view':
        if (!this.isHost) { this.view = data.view; this.renderGame(); }
        break;
      case 'm':
        if (this.isHost) this.applyAction(from, data.action);
        break;
      case 'c': this.appendChat(data.msg); break;
      case 'c:sync':
        if (!this.isHost && Array.isArray(data.chat) && !this.chat.length) {
          this.chat = data.chat.slice(-CHAT_MAX);
          this.renderChat();
        }
        break;
      default: break;
    }
  }

  /* ---------------- lobby (Host) ---------------- */

  addAI(difficulty) {
    if (!this.isHost || this.lobby.started) return;
    const total = this.lobby.seats.length + Object.keys(this.lobby.aiSeats).length;
    if (total >= 4) return;
    const n = Object.keys(this.lobby.aiSeats).length + 1;
    const id = `ai:${Date.now()}:${n}`;
    const label = difficulty === 'facile' ? 'Facile' : (difficulty === 'difficile' ? 'Difficile' : 'Moyen');
    this.lobby.aiSeats[id] = { pseudo: `🤖 IA ${label} #${n}`, difficulty };
    this.lobby.seats.push(id);
    this.pushLobby();
  }

  removeSeat(id) {
    if (!this.isHost || this.lobby.started || !id.startsWith('ai:')) return;
    delete this.lobby.aiSeats[id];
    this.lobby.seats = this.lobby.seats.filter((s) => s !== id);
    this.pushLobby();
  }

  setLobbyField(field, value) {
    if (!this.isHost || this.lobby.started) return;
    this.lobby[field] = value;
    this.pushLobby();
  }

  pushLobby() {
    this.broadcastToReal({ k: 'lobby', lobby: this.lobby });
    this.renderLobby();
  }

  startMatch() {
    if (!this.isHost || this.lobby.started) return;
    if (this.lobby.seats.length < 2) { this.toast('Il faut au moins 2 joueurs (humains + IA).'); return; }
    this.lobby.started = true;
    this.engine = new DominoEngine(this.lobby.seats, {
      maxPips: this.lobby.maxPips, mode: this.lobby.mode, targetScore: Number(this.lobby.targetScore) || 100,
    });
    this.pushLobby();
    this.pushViews();
  }

  /* ---------------- diffusion de l'état de jeu ---------------- */

  pushViews() {
    if (!this.isHost || !this.engine) return;
    for (const p of this.players) {
      const v = this.engine.viewFor(p.id);
      if (p.id === this.me.id) this.view = v;
      else this.ctx.sendMessage({ k: 'view', view: v }, p.id);
    }
    this.saveLocal();
    this.renderGame();
    this.maybeRunAI();
  }

  applyAction(playerId, action) {
    if (!this.engine || !action) return { ok: false };
    let res;
    if (action.action === 'play') res = this.engine.play(playerId, action.tileId, action.end);
    else if (action.action === 'draw') res = this.engine.draw(playerId);
    else if (action.action === 'pass') res = this.engine.pass(playerId);
    else return { ok: false };

    if (!res.ok) {
      if (playerId === this.me.id) this.toast(res.error);
      else this.ctx.sendMessage({ k: 'view', view: this.engine.viewFor(playerId) }, playerId); // resynchronise l'invité
      return res;
    }

    if (action.action === 'play') this.beeper.tilePlaced();
    else if (action.action === 'draw') this.beeper.draw();

    if (this.engine.roundPhase !== 'playing') {
      this.announceRoundEnd();
      if (this.engine.matchPhase === 'matchEnd') this.beeper.matchWon();
    }
    this.pushViews();
    return res;
  }

  announceRoundEnd() {
    const e = this.engine;
    if (e.roundPhase === 'won') {
      const pts = e.lastRoundPoints[e.roundWinner] ?? 0;
      this.sysChat(`${this.pseudoOf(e.roundWinner)} remporte la manche ${e.roundNo} (+${pts} pts).`);
    } else if (e.roundWinner) {
      const pts = e.lastRoundPoints[e.roundWinner] ?? 0;
      this.sysChat(`Partie bloquée — ${this.pseudoOf(e.roundWinner)} a la main la plus légère (+${pts} pts).`);
    } else {
      this.sysChat('Partie bloquée — égalité, personne ne marque cette manche.');
    }
    if (e.matchPhase === 'matchEnd') {
      this.sysChat(e.matchWinner ? `🏆 ${this.pseudoOf(e.matchWinner)} remporte la partie !` : 'Partie terminée.');
    }
  }

  /* ---------------- IA ---------------- */

  maybeRunAI() {
    if (!this.isHost || !this.engine) return;
    if (this.timers.ai) { clearTimeout(this.timers.ai); this.timers.ai = null; }
    if (this.engine.matchPhase !== 'playing' || this.engine.roundPhase !== 'playing') return;
    const pid = this.engine.turn;
    if (!this.isAI(pid)) return;
    const delay = AI_MOVE_MIN_MS + Math.random() * AI_MOVE_JITTER_MS;
    this.timers.ai = setTimeout(() => {
      if (!this.engine || this.engine.turn !== pid || this.engine.matchPhase !== 'playing') return;
      const seat = this.lobby.aiSeats[pid];
      const action = aiChooseAction(this.engine, pid, seat?.difficulty ?? 'moyen');
      this.applyAction(pid, action);
    }, delay);
  }

  /* ---------------- actions du joueur local ---------------- */

  requestPlay(tileId, end) {
    const action = { action: 'play', tileId, end };
    if (this.isHost) this.applyAction(this.me.id, action);
    else this.toHost({ k: 'm', action });
    this.selectedTileId = null;
  }

  requestDraw() {
    const action = { action: 'draw' };
    if (this.isHost) this.applyAction(this.me.id, action);
    else this.toHost({ k: 'm', action });
  }

  requestPass() {
    const action = { action: 'pass' };
    if (this.isHost) this.applyAction(this.me.id, action);
    else this.toHost({ k: 'm', action });
  }

  onTileClick(tile) {
    const v = this.view;
    if (!v || v.turn !== this.me.id || v.roundPhase !== 'playing') return;
    const matches = (v.validMoves || []).filter((m) => m.tileId === tile.id);
    if (!matches.length) { this.beeper.invalid(); return; }
    if (matches.length === 1) { this.requestPlay(tile.id, matches[0].end); return; }
    // Deux extrémités possibles (typiquement quand gauche=droite en tout début de manche) :
    // on laisse le joueur choisir via les zones de dépôt mises en évidence.
    this.selectedTileId = this.selectedTileId === tile.id ? null : tile.id;
    this.renderGame();
  }

  /**
   * Dispose les dominos en serpentin : on remplit une rangée vers la droite,
   * puis la suivante vers la gauche, etc. Le nombre de dominos par rangée est
   * calculé d'après la largeur réellement disponible, donc la chaîne reste
   * toujours dans le cadre au lieu de filer en longueur.
   */
  chainSerpentin(nodes, tiles, leftZone, rightZone) {
    const largeurDispo = Math.max(200, (this.boardEl?.clientWidth || 0) - 90); // marge pour les zones
    // Un domino couché ≈ 62 px de large, un double debout ≈ 32 px.
    const largeurDe = (t) => (t && t.a === t.b ? 32 : 62);
    const rangees = [];
    let courante = [];
    let largeur = 0;
    for (let i = 0; i < nodes.length; i += 1) {
      const w = largeurDe(tiles[i]);
      if (courante.length && largeur + w > largeurDispo) {
        rangees.push(courante); courante = []; largeur = 0;
      }
      courante.push(nodes[i]);
      largeur += w;
    }
    if (courante.length) rangees.push(courante);
    if (!rangees.length) rangees.push([]);

    const lignes = rangees.map((cellules, r) => {
      const versLaGauche = r % 2 === 1;             // une rangée sur deux repart en sens inverse
      const contenu = [...cellules];
      // Zone gauche au tout début, zone droite à la toute fin de la chaîne.
      if (r === 0) contenu.unshift(leftZone);
      if (r === rangees.length - 1) contenu.push(rightZone);
      return h('div', {
        className: `dmn__row${versLaGauche ? ' dmn__row--rev' : ''}`,
      }, contenu);
    });
    return h('div', { className: 'dmn__chain dmn__chain--serpentin' }, lignes);
  }

  onEndZoneClick(end) {
    if (this.selectedTileId == null) return;
    this.requestPlay(this.selectedTileId, end);
  }

  nextRound() {
    if (!this.isHost || !this.engine) return;
    const r = this.engine.nextRound();
    if (!r.ok) return;
    this.renderedTiles.clear();
    this.sysChat(`Manche ${this.engine.roundNo} — ${this.pseudoOf(this.engine.turn)} commence.`);
    this.pushViews();
  }

  newMatch() {
    if (!this.isHost) return;
    this.lobby = this.defaultLobby();
    this.engine = null;
    this.renderedTiles.clear();
    this.clearLocal();
    this.pushLobby();
    this.renderLobby();
  }

  quit() {
    if (!this.isHost) return;
    const e = this.engine;
    const scores = e ? { ...e.scores } : {};
    const ranking = Object.entries(scores).sort((a, b) => b[1] - a[1]);
    const summary = ranking.length
      ? `${this.pseudoOf(ranking[0][0])} termine en tête ${ranking[0][1]} pts.`
      : 'Partie de Dominos terminée.';
    this.clearLocal();
    this.ctx.onEnd({ summary, scores });
  }

  /* ---------------- sauvegarde locale (reprise si l'onglet du Host recharge) ---------------- */

  saveKey() { return `${SAVE_KEY_PREFIX}${this.roomId}`; }

  saveLocal() {
    if (!this.isHost || !this.engine) return;
    try {
      localStorage.setItem(this.saveKey(), JSON.stringify({ lobby: this.lobby, engine: this.engine.toJSON(), savedAt: Date.now() }));
    } catch { /* stockage indisponible : tant pis, ce n'est qu'un filet de sécurité */ }
  }

  clearLocal() {
    try { localStorage.removeItem(this.saveKey()); } catch { /* ignore */ }
  }

  tryRestore() {
    try {
      const raw = localStorage.getItem(this.saveKey());
      if (!raw) return false;
      const data = JSON.parse(raw);
      if (!data?.engine || Date.now() - (data.savedAt ?? 0) > 6 * 3600_000) { this.clearLocal(); return false; }
      this.lobby = data.lobby;
      this.engine = DominoEngine.fromJSON(data.engine);
      this.sysChat('Partie précédente restaurée automatiquement.');
      this.pushViews();
      return true;
    } catch { return false; }
  }

  /* ---------------- déconnexion / forfait ---------------- */

  checkPeers() {
    if (!this.isHost || !this.engine || this.engine.matchPhase !== 'playing') return;
    const now = Date.now();
    for (const p of this.players) {
      if (p.id === this.me.id) continue;
      if (this.engine.forfeited.has(p.id)) continue;
      const seen = this.lastSeen[p.id] ?? now;
      const silent = now - seen;
      if (silent > FORFEIT_MS) {
        this.engine.forfeit(p.id);
        this.sysChat(`${this.pseudoOf(p.id)} a été déconnecté trop longtemps : forfait.`);
        this.pushViews();
      } else {
        const lost = silent > LOST_MS;
        if (lost !== this.lostPlayers.has(p.id)) {
          if (lost) this.lostPlayers.add(p.id); else this.lostPlayers.delete(p.id);
          this.render();
        }
      }
    }
  }

  /* ---------------- chat ---------------- */

  appendChat(msg) {
    if (!msg || !msg.text) return;
    this.chat.push(msg);
    if (this.chat.length > CHAT_MAX) this.chat.shift();
    this.renderChat();
  }
  sendChat() {
    const text = this.chatInput.value.trim();
    if (!text) return;
    this.chatInput.value = '';
    const msg = { pseudo: this.me.pseudo, text: text.slice(0, 240), ts: Date.now() };
    this.appendChat(msg);
    this.broadcastToReal({ k: 'c', msg });
  }
  sysChat(text) {
    const msg = { sys: true, text, ts: Date.now() };
    this.appendChat(msg);
    this.broadcastToReal({ k: 'c', msg });
  }

  toast(text) {
    if (!text) return;
    this.toastEl.textContent = text;
    this.toastEl.classList.add('dmn-toast--show');
    clearTimeout(this.toastTimer);
    this.toastTimer = setTimeout(() => this.toastEl.classList.remove('dmn-toast--show'), 2200);
  }

  /* ---------------- construction du DOM ---------------- */

  buildShell() {
    this.scoresEl = h('div', { className: 'dmn__scores' });
    this.turnEl = h('span', { className: 'dmn__turn' }, '…');
    this.muteBtn = h('button', {
      className: 'dmn__mute', onClick: () => { this.beeper.muted = !this.beeper.muted; this.muteBtn.textContent = this.beeper.muted ? '🔇' : '🔊'; },
    }, '🔊');
    const head = h('div', { className: 'dmn__head' }, [this.scoresEl, h('span', { className: 'dmn__grow' }), this.turnEl, this.muteBtn]);

    this.boardEl = h('div', { className: 'dmn__board' });
    this.stage = h('div', { className: 'dmn__stage' }, [this.boardEl]);
    this.handRow = h('div', { className: 'dmn__handrow' });
    this.boneyardEl = h('span', {});
    this.drawBtn = h('button', { className: 'dmn-btn dmn-btn--ghost', onClick: () => this.requestDraw() }, '🀫 Piocher');
    this.passBtn = h('button', { className: 'dmn-btn dmn-btn--ghost', onClick: () => this.requestPass() }, 'Passer');
    const actions = h('div', { className: 'dmn__actions' }, [this.drawBtn, this.passBtn, h('span', { className: 'dmn__grow' }), h('div', { className: 'dmn__boneyard' }, [this.boneyardEl])]);
    const handwrap = h('div', { className: 'dmn__handwrap' }, [this.handRow, actions]);

    this.bannerEl = h('div', {});
    this.lobbyEl = h('div', {});
    this.overlayEl = h('div', {});
    this.toastEl = h('div', { className: 'dmn-toast' });

    const main = h('div', { className: 'dmn__main' }, [head, this.stage, handwrap, this.bannerEl, this.lobbyEl, this.overlayEl, this.toastEl]);

    this.chatLog = h('div', { className: 'dmn-chat__log' });
    this.chatInput = h('input', { placeholder: 'Message…', maxlength: '240', onKeydown: (e) => { if (e.key === 'Enter') this.sendChat(); } });
    const side = h('div', { className: 'dmn__side' }, [
      h('div', { className: 'dmn-chat__head' }, '💬 Chat'),
      this.chatLog,
      h('div', { className: 'dmn-chat__form' }, [this.chatInput, h('button', { onClick: () => this.sendChat() }, 'Envoyer')]),
    ]);

    this.root.append(main, side);
  }

  /* ---------------- rendu : lobby ---------------- */

  renderLobby() {
    const lb = this.lobby;
    if (!lb || lb.started) { this.lobbyEl.replaceChildren(); if (lb?.started) this.renderGame(); return; }

    const seatRows = lb.seats.map((id) => h('div', { className: 'dmn-seat' }, [
      this.isAI(id) ? '🤖' : '🧑', ' ', this.pseudoOf(id),
      id.startsWith('ai:') && this.isHost ? h('button', { className: 'dmn-seat__rm', onClick: () => this.removeSeat(id) }, '✕') : null,
    ]));

    if (!this.isHost) {
      this.lobbyEl.replaceChildren(h('div', { className: 'dmn-lobby' }, [
        h('div', { className: 'dmn-lobby__card' }, [
          h('h2', {}, '🀄 Dominos'),
          h('p', { style: 'margin:0;opacity:.7;font-size:13px' }, 'En attente que l\'hôte configure et lance la partie…'),
          h('div', { className: 'dmn-seats' }, seatRows),
        ]),
      ]));
      return;
    }

    const total = lb.seats.length;
    const modeSelect = h('select', {
      onChange: (e) => this.setLobbyField('mode', e.target.value),
    }, ['classique', 'cible', 'rapide'].map((m) => h('option', { value: m, selected: lb.mode === m || undefined }, ({
      classique: 'Classique (objectif 100 pts)', cible: 'Score cible personnalisé', rapide: 'Partie rapide (1 manche)',
    })[m])));

    const targetInput = h('input', {
      type: 'number', min: '10', step: '5', value: String(lb.targetScore),
      style: lb.mode === 'cible' ? '' : 'display:none',
      onChange: (e) => this.setLobbyField('targetScore', Number(e.target.value) || 100),
    });

    const variantSelect = h('select', {
      onChange: (e) => this.setLobbyField('maxPips', Number(e.target.value)),
    }, [6, 9, 12].map((v) => h('option', { value: String(v), selected: lb.maxPips === v || undefined }, `Double-${v} (${(v + 1) * (v + 2) / 2} pièces)`)));

    this.lobbyEl.replaceChildren(h('div', { className: 'dmn-lobby' }, [
      h('div', { className: 'dmn-lobby__card' }, [
        h('h2', {}, '🀄 Configurer la partie'),
        h('div', { className: 'dmn-field' }, [h('label', {}, 'Mode'), modeSelect]),
        lb.mode === 'cible' ? h('div', { className: 'dmn-field' }, [h('label', {}, 'Score cible'), targetInput]) : null,
        h('div', { className: 'dmn-field' }, [h('label', {}, 'Variante'), variantSelect]),
        h('div', { className: 'dmn-field dmn-lobby__full' }, [
          h('label', {}, `Joueurs (${total}/4)`),
          h('div', { className: 'dmn-seats' }, seatRows),
          total < 4 ? h('div', { className: 'dmn__actions' }, [
            h('button', { className: 'dmn-btn dmn-btn--ghost', onClick: () => this.addAI('facile') }, '+ IA facile'),
            h('button', { className: 'dmn-btn dmn-btn--ghost', onClick: () => this.addAI('moyen') }, '+ IA moyenne'),
            h('button', { className: 'dmn-btn dmn-btn--ghost', onClick: () => this.addAI('difficile') }, '+ IA difficile'),
          ]) : null,
        ]),
        h('button', { className: 'dmn-btn dmn-lobby__full', disabled: total < 2, onClick: () => this.startMatch() }, '▶️ Démarrer la partie'),
      ]),
    ]));
  }

  /* ---------------- rendu : jeu ---------------- */

  render() { this.renderLobby(); this.renderGame(); this.renderChat(); this.renderOverlay(); }

  renderGame() {
    const v = this.view;
    if (!v) { this.bannerEl.replaceChildren(); return; }

    // Scores.
    this.scoresEl.replaceChildren(...(this.lobby?.seats ?? Object.keys(v.scores)).map((id) => h('span', {
      className: `dmn__sc${id === this.me.id ? ' dmn__sc--me' : ''}${this.isAI(id) ? ' dmn__sc--ai' : ''}`,
    }, `${this.pseudoOf(id)} ${v.scores[id] ?? 0}`)));

    // Chaîne posée + zones de dépôt.
    const chainNodes = v.chain.map((t, i) => {
      const isDouble = t.a === t.b;
      const cls = `dmn-tile ${isDouble ? 'dmn-tile--v dmn-tile--double' : 'dmn-tile--h'}`;
      const key = `${v.roundNo}:${t.id}`;
      const fresh = v.lastMove?.tileId === t.id && !this.renderedTiles.has(key);
      if (fresh) this.renderedTiles.add(key);
      // Affichage dans le sens de lecture gauche→droite : `left` en premier.
      const firstVal = isDouble ? t.a : t.left;
      const secondVal = isDouble ? t.b : t.right;
      return h('div', { className: `${cls}${fresh ? ' dmn-tile--new' : ''}`, key: String(i) }, [
        h('div', { className: 'dmn-tile__half' }, pipFace(firstVal)),
        h('div', { className: 'dmn-tile__half' }, pipFace(secondVal)),
      ]);
    });

    const myTurn = v.roundPhase === 'playing' && v.turn === this.me.id;
    const leftZone = h('div', {
      className: `dmn__endzone${myTurn && this.selectedTileId != null && (v.validMoves || []).some((m) => m.tileId === this.selectedTileId && m.end === 'left') ? ' dmn__endzone--active' : ''}`,
      onClick: () => this.onEndZoneClick('left'),
    }, v.chain.length ? '◀' : '');
    const rightZone = h('div', {
      className: `dmn__endzone${myTurn && this.selectedTileId != null && (v.validMoves || []).some((m) => m.tileId === this.selectedTileId && m.end === 'right') ? ' dmn__endzone--active' : ''}`,
      onClick: () => this.onEndZoneClick('right'),
    }, v.chain.length ? '▶' : '');

    // Rendu SERPENTIN : au lieu d'une seule ligne qui s'étire (et déborde), la
    // chaîne se replie en rangées alternées — de gauche à droite, puis de droite
    // à gauche — comme sur une vraie table. Les extrémités de jeu restent les
    // mêmes (gauche/droite) : c'est un repli d'affichage, pas une règle.
    this.boardEl.replaceChildren(this.chainSerpentin(chainNodes, chainNodes.map((_, i) => v.chain[i]), leftZone, rightZone));

    // Main du joueur.
    const playableIds = new Set((v.validMoves || []).map((m) => m.tileId));
    this.handRow.replaceChildren(...v.hand.map((t) => {
      const isDouble = t.a === t.b;
      const playable = myTurn && playableIds.has(t.id);
      const selected = this.selectedTileId === t.id;
      const cls = ['dmn-hand-tile', playable ? 'dmn-hand-tile--playable' : (myTurn ? 'dmn-hand-tile--unplayable' : ''), selected ? 'dmn-hand-tile--selected' : ''].filter(Boolean).join(' ');
      return h('div', { className: cls, onClick: () => this.onTileClick(t) }, [
        h('div', { className: `dmn-tile ${isDouble ? 'dmn-tile--v dmn-tile--double' : 'dmn-tile--h'}` }, [
          h('div', { className: 'dmn-tile__half' }, pipFace(t.a)),
          h('div', { className: 'dmn-tile__half' }, pipFace(t.b)),
        ]),
      ]);
    }));

    // Boutons contextuels.
    this.drawBtn.disabled = !(myTurn && v.canDraw);
    this.passBtn.disabled = !(myTurn && v.canPass);
    this.boneyardEl.textContent = `🀫 Pioche : ${v.boneyardCount}`;

    // Indicateur de tour.
    if (v.roundPhase === 'playing') {
      this.turnEl.textContent = myTurn ? '🎯 À vous de jouer' : `⏳ Tour de ${this.pseudoOf(v.turn)}`;
      this.turnEl.classList.toggle('dmn--me', myTurn);
      if (myTurn && this._lastTurnAnnounced !== `${v.roundNo}:${v.turn}`) { this.beeper.turnMine(); }
    } else {
      this.turnEl.textContent = `Manche ${v.roundNo}`;
      this.turnEl.classList.remove('dmn--me');
    }
    this._lastTurnAnnounced = `${v.roundNo}:${v.turn}`;

    this.renderBanner(v);
  }

  renderBanner(v) {
    if (v.roundPhase === 'playing') { this.bannerEl.replaceChildren(); return; }

    const matchOver = v.matchPhase === 'matchEnd';
    let cls = 'dmn-banner';
    let title;
    let sub;
    if (v.roundPhase === 'blocked') {
      cls += ' dmn-banner--blocked';
      title = 'Partie bloquée';
      sub = v.roundWinner ? `${this.pseudoOf(v.roundWinner)} avait la main la plus légère.` : 'Égalité — personne ne marque.';
    } else {
      const iWon = v.roundWinner === this.me.id;
      cls += iWon ? ' dmn-banner--win' : ' dmn-banner--lose';
      title = matchOver ? (v.matchWinner === this.me.id ? '🏆 Victoire finale !' : 'Partie terminée') : (iWon ? 'Manche gagnée !' : `${this.pseudoOf(v.roundWinner)} gagne la manche`);
      sub = `Manche n°${v.roundNo}${v.lastRoundPoints[v.roundWinner] ? ` — +${v.lastRoundPoints[v.roundWinner]} pts` : ''}.`;
    }

    const scoresRow = h('div', { className: 'dmn-banner__scores' }, (this.lobby?.seats ?? []).map((id) => h('span', {
      className: `dmn__sc${id === this.me.id ? ' dmn__sc--me' : ''}`,
    }, `${this.pseudoOf(id)} ${v.scores[id] ?? 0}`)));

    const actions = h('div', { className: 'dmn__actions', style: 'justify-content:center' });
    if (this.isHost) {
      if (matchOver) {
        actions.append(
          h('button', { className: 'dmn-btn', onClick: () => this.newMatch() }, '🔄 Nouvelle partie'),
          h('button', { className: 'dmn-btn dmn-btn--ghost', onClick: () => this.quit() }, 'Retour au salon'),
        );
      } else {
        actions.append(h('button', { className: 'dmn-btn', onClick: () => this.nextRound() }, '▶️ Manche suivante'));
      }
    } else {
      actions.append(h('span', { style: 'font-size:13px;opacity:.6' }, 'En attente de l\'hôte…'));
    }

    this.bannerEl.replaceChildren(h('div', { className: cls }, [h('h3', {}, title), h('p', {}, sub), scoresRow, actions]));
  }

  renderOverlay() {
    const anyLost = this.lostPlayers.size > 0 && this.engine?.matchPhase === 'playing';
    if (!anyLost) { this.overlayEl.replaceChildren(); return; }
    const names = [...this.lostPlayers].map((id) => this.pseudoOf(id)).join(', ');
    this.overlayEl.replaceChildren(h('div', { className: 'dmn-overlay' }, [
      h('div', { className: 'dmn-spin' }),
      h('h3', {}, `En attente de ${names}…`),
      h('p', { style: 'margin:0;font-size:13px;opacity:.7' }, 'Forfait automatique en cas d\'absence prolongée.'),
    ]));
  }

  renderChat() {
    const atBottom = this.chatLog.scrollHeight - this.chatLog.scrollTop - this.chatLog.clientHeight < 40;
    this.chatLog.replaceChildren(...this.chat.map((m) => (m.sys
      ? h('div', { className: 'dmn-msg dmn-msg--sys' }, m.text)
      : h('div', { className: 'dmn-msg' }, [h('b', {}, `${m.pseudo} `), h('span', {}, m.text)]))));
    if (atBottom) this.chatLog.scrollTop = this.chatLog.scrollHeight;
  }
}

/* ====================================================================== */
/* Contrat de module Arcade                                               */
/* ====================================================================== */

let instance = null;

export default {
  async mount(container, context) {
    instance = new DominoUI(container, context);
    instance.mount();
  },
  async unmount() {
    if (instance) instance.unmount();
    instance = null;
  },
};
