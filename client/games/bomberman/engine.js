/**
 * Bomberman — moteur de règles pour la plateforme Arcade (aucune dépendance
 * DOM/réseau ; l'horloge est injectée dans tick()/placeBomb() → testable en Node).
 *
 * Arène 17×13 : bordure et piliers indestructibles (damier), briques
 * destructibles, 8 points d'apparition dégagés (coins + milieux de bords).
 * Temps réel : le Host appelle tick(now) en boucle ; les joueurs envoient une
 * direction maintenue (ou null) et posent des bombes.
 *
 * Règles : bombes à retardement (2,5 s), explosion en croix stoppée par les
 * murs, briques détruites (30 % de bonus : 💣 bombe max +1, 🔥 portée +1,
 * ⚡ vitesse +1), chaînes de bombes, flammes létales (450 ms). On peut sortir
 * de la bombe que l'on vient de poser, pas y revenir. Dernier survivant
 * remporte la manche ; 3 minutes max (manche nulle sinon) ; première équipe…
 * premier joueur à 3 manches gagne la partie.
 */

export const COLS = 17;
export const ROWS = 13;
export const BOMB_MS = 2500;
export const FLAME_MS = 450;
export const ROUND_MS = 3 * 60 * 1000;
export const WINS_TARGET = 3;
const BRICK_RATE = 0.62;
const POWERUP_RATE = 0.3;
const CAPS = { bombs: 8, range: 10, speedMs: 80 };
const SPEED_STEP = 22;
const BASE = { bombs: 1, range: 1, speedMs: 190 };

export const SPAWNS = [
  [1, 1], [COLS - 2, ROWS - 2], [COLS - 2, 1], [1, ROWS - 2],
  [Math.floor(COLS / 2), 1], [Math.floor(COLS / 2), ROWS - 2],
  [1, Math.floor(ROWS / 2)], [COLS - 2, Math.floor(ROWS / 2)],
];

const DIRS = { u: [0, -1], d: [0, 1], l: [-1, 0], r: [1, 0] };
export const T = Object.freeze({ EMPTY: 0, WALL: 1, BRICK: 2 });

export class BombermanEngine {
  /** @param {{id, pseudo}[]} players 2 à 8 joueurs. */
  constructor(players, { rng = Math.random } = {}) {
    if (players.length < 2 || players.length > 8) {
      throw new Error('Bomberman se joue de 2 à 8 joueurs.');
    }
    this.rng = rng;
    this.players = players.map((p, i) => ({
      id: p.id, pseudo: p.pseudo, slot: i,
      x: 0, y: 0, dir: null, alive: false,
      ...BASE, lastMove: 0, wins: 0,
    }));
    this.phase = 'attente';
    this.round = 0;
    this.roundEndsAt = 0;
    this.roundWinner = null;
    this.matchWinner = null;
    this.grid = [];
    this.bombs = [];
    this.flames = [];
    this.powerups = [];
    this.dirty = true; // signale à l'hôte qu'un nouvel état mérite diffusion
  }

  idx(x, y) { return y * COLS + x; }
  at(x, y) { return this.grid[this.idx(x, y)]; }
  isWallAt(x, y) { return x <= 0 || y <= 0 || x >= COLS - 1 || y >= ROWS - 1 || (x % 2 === 0 && y % 2 === 0); }
  bombAt(x, y) { return this.bombs.find((b) => b.x === x && b.y === y) ?? null; }
  alivePlayers() { return this.players.filter((p) => p.alive); }

  /* ------------------------------ manche ------------------------------ */

  startRound(now = Date.now()) {
    if (!['attente', 'fin-manche'].includes(this.phase)) return { ok: false, error: 'Manche en cours.' };
    this.round += 1;
    this.roundWinner = null;
    this.bombs = [];
    this.flames = [];
    this.powerups = [];

    // Terrain : murs fixes + briques aléatoires, zones d'apparition dégagées.
    this.grid = new Array(COLS * ROWS).fill(T.EMPTY);
    for (let y = 0; y < ROWS; y += 1) {
      for (let x = 0; x < COLS; x += 1) {
        if (this.isWallAt(x, y)) this.grid[this.idx(x, y)] = T.WALL;
        else if (this.rng() < BRICK_RATE) this.grid[this.idx(x, y)] = T.BRICK;
      }
    }
    const clear = (x, y) => { if (!this.isWallAt(x, y)) this.grid[this.idx(x, y)] = T.EMPTY; };
    this.players.forEach((p, i) => {
      const [sx, sy] = SPAWNS[i];
      Object.assign(p, { x: sx, y: sy, dir: null, alive: true, ...BASE, lastMove: 0 });
      clear(sx, sy); clear(sx + 1, sy); clear(sx - 1, sy); clear(sx, sy + 1); clear(sx, sy - 1);
    });
    this.roundEndsAt = now + ROUND_MS;
    this.phase = 'manche';
    this.dirty = true;
    return { ok: true };
  }

  /* ------------------------------ entrées ----------------------------- */

  setInput(pid, dir) {
    const p = this.players.find((x) => x.id === pid);
    if (!p || !p.alive || this.phase !== 'manche') return { ok: false };
    p.dir = DIRS[dir] ? dir : null;
    return { ok: true };
  }

  placeBomb(pid, now = Date.now()) {
    const p = this.players.find((x) => x.id === pid);
    if (!p || !p.alive || this.phase !== 'manche') return { ok: false };
    if (this.bombAt(p.x, p.y)) return { ok: false };
    const mine = this.bombs.filter((b) => b.owner === pid).length;
    if (mine >= p.bombs) return { ok: false };
    this.bombs.push({ x: p.x, y: p.y, owner: pid, at: now, range: p.range });
    this.dirty = true;
    return { ok: true };
  }

  handleAction(pid, action = {}, now = Date.now()) {
    switch (action.a) {
      case 'input': return this.setInput(pid, action.dir ?? null);
      case 'bomb': return this.placeBomb(pid, now);
      default: return { ok: false };
    }
  }

  /* ------------------------------ simulation -------------------------- */

  tick(now = Date.now()) {
    if (this.phase !== 'manche') return;

    // Déplacements (case par case, cadence individuelle).
    for (const p of this.players) {
      if (!p.alive || !p.dir) continue;
      if (now - p.lastMove < p.speedMs) continue;
      const [dx, dy] = DIRS[p.dir];
      const nx = p.x + dx; const ny = p.y + dy;
      if (this.at(nx, ny) !== T.EMPTY) continue;
      const bomb = this.bombAt(nx, ny);
      if (bomb) continue; // une bombe bloque (on peut rester sur la sienne, pas y revenir)
      p.x = nx; p.y = ny; p.lastMove = now;
      this.dirty = true;
      const pu = this.powerups.find((u) => u.x === nx && u.y === ny);
      if (pu) {
        this.powerups = this.powerups.filter((u) => u !== pu);
        if (pu.type === 'bomb') p.bombs = Math.min(CAPS.bombs, p.bombs + 1);
        if (pu.type === 'fire') p.range = Math.min(CAPS.range, p.range + 1);
        if (pu.type === 'speed') p.speedMs = Math.max(CAPS.speedMs, p.speedMs - SPEED_STEP);
      }
    }

    // Explosions (avec chaînes).
    const exploding = this.bombs.filter((b) => now - b.at >= BOMB_MS);
    if (exploding.length) {
      const queue = [...exploding];
      const done = new Set();
      while (queue.length) {
        const bomb = queue.shift();
        if (done.has(bomb)) continue;
        done.add(bomb);
        this.bombs = this.bombs.filter((b) => b !== bomb);
        this.igniteCross(bomb, queue, now);
      }
      this.dirty = true;
    }

    // Flammes : létalité puis extinction.
    if (this.flames.length) {
      for (const p of this.players) {
        if (p.alive && this.flames.some((f) => f.x === p.x && f.y === p.y)) {
          p.alive = false;
          p.dir = null;
          this.dirty = true;
        }
      }
      const before = this.flames.length;
      this.flames = this.flames.filter((f) => f.until > now);
      if (this.flames.length !== before) this.dirty = true;
    }

    // Fin de manche : dernier survivant ou temps écoulé.
    const alive = this.alivePlayers();
    if (alive.length <= 1) {
      this.endRound(alive[0] ?? null);
    } else if (now >= this.roundEndsAt) {
      this.endRound(null);
    }
  }

  igniteCross(bomb, queue, now) {
    const burn = (x, y) => {
      this.flames.push({ x, y, until: now + FLAME_MS });
      const pu = this.powerups.find((u) => u.x === x && u.y === y);
      if (pu) this.powerups = this.powerups.filter((u) => u !== pu);
      const other = this.bombAt(x, y);
      if (other) queue.push(other); // chaîne
    };
    burn(bomb.x, bomb.y);
    for (const [dx, dy] of Object.values(DIRS)) {
      for (let i = 1; i <= bomb.range; i += 1) {
        const x = bomb.x + dx * i; const y = bomb.y + dy * i;
        const cell = this.at(x, y);
        if (cell === T.WALL) break;
        if (cell === T.BRICK) {
          this.grid[this.idx(x, y)] = T.EMPTY;
          burn(x, y);
          if (this.rng() < POWERUP_RATE) {
            const type = ['bomb', 'fire', 'speed'][Math.floor(this.rng() * 3)];
            this.powerups.push({ x, y, type });
          }
          break; // la flamme s'arrête sur la brique
        }
        burn(x, y);
      }
    }
  }

  endRound(winner) {
    this.phase = 'fin-manche';
    this.roundWinner = winner ? { id: winner.id, pseudo: winner.pseudo } : null;
    if (winner) {
      winner.wins += 1;
      if (winner.wins >= WINS_TARGET) {
        this.phase = 'fin';
        this.matchWinner = { id: winner.id, pseudo: winner.pseudo, wins: winner.wins };
      }
    }
    this.dirty = true;
  }

  summary() {
    const classement = [...this.players]
      .map((p) => ({ id: p.id, pseudo: p.pseudo, wins: p.wins }))
      .sort((a, b) => b.wins - a.wins);
    return {
      summary: this.matchWinner
        ? `💣 Bomberman — ${this.matchWinner.pseudo} gagne ${this.matchWinner.wins} manches !`
        : `💣 Bomberman — partie interrompue (${classement[0]?.pseudo ?? '?'} en tête).`,
      classement,
      manches: this.round,
    };
  }

  /** État public compact (aucune information privée : diffusable à tous). */
  getState(now = Date.now()) {
    this.dirty = false;
    return {
      phase: this.phase,
      round: this.round,
      winsTarget: WINS_TARGET,
      timeLeft: this.phase === 'manche' ? Math.max(0, this.roundEndsAt - now) : 0,
      grid: this.grid.join(''),
      players: this.players.map((p) => ({
        id: p.id, pseudo: p.pseudo, slot: p.slot,
        x: p.x, y: p.y, alive: p.alive, wins: p.wins,
        bombs: p.bombs, range: p.range,
        speed: Math.round((BASE.speedMs - p.speedMs) / SPEED_STEP) + 1,
      })),
      bombs: this.bombs.map((b) => ({ x: b.x, y: b.y, fuse: Math.max(0, BOMB_MS - (now - b.at)) })),
      flames: this.flames.map((f) => ({ x: f.x, y: f.y })),
      powerups: this.powerups,
      roundWinner: this.roundWinner,
      matchWinner: this.matchWinner,
    };
  }
}
