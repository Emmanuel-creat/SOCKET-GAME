/**
 * LA TRAQUE — moteur de jeu (pur : ni DOM ni réseau, testable en Node).
 *
 * Labyrinthe vu de dessus, obscurité totale. Un Chercheur muni d'une lampe
 * torche ne voit que son cône lumineux ; les autres se cachent dans le noir.
 * Des détecteurs déclenchent des flashs qui révèlent brièvement qui passe.
 *
 * ARCHITECTURE HOST-AUTORITAIRE — critique pour ce jeu : le moteur tourne chez
 * le Host, qui envoie à CHAQUE joueur une vue filtrée par ce qu'il peut
 * réellement voir. Les positions ne sont jamais diffusées : sans ce filtrage,
 * il suffirait d'ouvrir la console pour lire les coordonnées des cachés.
 *
 * Horloge injectée (`now`) pour être simulable en temps virtuel.
 */

/* ====================== RÉGLAGES ====================== */

// Labyrinthe (dimensions impaires obligatoires pour la génération).
export const COLS = 31;
export const ROWS = 21;
const BRAID_RATE = 0.32;          // proportion d'impasses ouvertes (boucles → moins de pièges)

// Temps.
export const TICK_MS = 50;        // 20 Hz chez le Host
const HIDE_MS_DEFAULT = 20_000;   // temps de cachette (Chercheur figé et aveugle)
const ROUND_MS_DEFAULT = 240_000; // chrono de la traque

// Déplacements (en cases/seconde).
const SPEED_SEEKER = 3.5;
const SPEED_HIDER = 3.3;
const SNEAK_FACTOR = 0.5;         // marche furtive : silencieuse mais lente
const SPRINT_FACTOR = 1.5;
const SPEED_BONUS_FACTOR = 1.35;
const BODY_R = 0.3;               // rayon de collision
const STAMINA_MAX = 100;
const STAMINA_DRAIN = 28;         // par seconde de sprint
const STAMINA_REGEN = 15;

// Vision.
const CONE_HALF_DEG = 32;         // demi-angle du cône de la lampe
const CONE_RANGE = 7.5;           // portée de la lampe (cases)
const TORCH_BONUS_RANGE = 11.5;   // avec la batterie
const TORCH_BONUS_HALF_DEG = 46;
const TOUCH_RADIUS = 1.3;         // le Chercheur perçoit ce qui le frôle
const HIDER_FEEL_RADIUS = 1.2;    // dans le noir, on sent un joueur tout proche
const LIGHT_VISIBLE_RANGE = 16;   // distance à laquelle on aperçoit la lampe du Chercheur
const BONUS_VISIBLE_RANGE = 6;    // les objets luisent faiblement
const TRACER_VISIBLE_RANGE = 9;

// Détecteurs.
const DETECTOR_TRIGGER_R = 0.55;
const DETECTOR_COOLDOWN_MS = 6000;
const FLASH_MS = 900;             // durée du flash
const FLASH_RADIUS = 3.6;         // rayon révélé par le flash

// Bruit (« cacher son déplacement »).
const NOISE_WALK_R = 4.5;
const NOISE_SPRINT_R = 8;
const NOISE_WALK_INTERVAL = 600;
const NOISE_SPRINT_INTERVAL = 350;
const NOISE_TTL = 900;

// Tirs.
const SHOT_SPEED = 26;            // cases/seconde
const SHOT_R = 0.14;
const SHOT_COOLDOWN_MS = 450;
const CATCH_RADIUS = 0.55;        // « les trouver » : capture au contact
const BULLETS_PER_PLAYER = 2;     // munitions = 2 × nombre de joueurs

// Bonus (boîtes mystère : l'effet dépend du rôle de celui qui la ramasse).
const BONUS_MAX = 6;
const BONUS_SPAWN_MS = 12_000;
const EFFECT_MS = { vitesse: 12_000, silence: 15_000, torche: 12_000, radar: 6000, sonar: 2500 };
const SONAR_RANGE = 9;

export const SKINS = Object.freeze([
  { id: 'ombre', nom: 'Ombre', couleur: '#8b8ff0', emoji: '🥷' },
  { id: 'renard', nom: 'Renard', couleur: '#ff9f45', emoji: '🦊' },
  { id: 'spectre', nom: 'Spectre', couleur: '#5fe0c8', emoji: '👻' },
  { id: 'corbeau', nom: 'Corbeau', couleur: '#c86bff', emoji: '🐦‍⬛' },
  { id: 'taupe', nom: 'Taupe', couleur: '#b98a5a', emoji: '🦡' },
  { id: 'panthere', nom: 'Panthère', couleur: '#ff5f8a', emoji: '🐈‍⬛' },
]);

export const DEFAULT_OPTIONS = Object.freeze({
  mode: 'rotation',        // 'rotation' (chacun chercheur une fois) | 'unique' (une manche)
  hideMs: HIDE_MS_DEFAULT,
  roundMs: ROUND_MS_DEFAULT,
  ballesParJoueur: BULLETS_PER_PLAYER,
  detecteurs: true,
  bonus: true,
});

export const HIDE_CHOICES = Object.freeze([10_000, 20_000, 30_000]);
export const ROUND_CHOICES = Object.freeze([180_000, 240_000, 360_000]);

/* ====================== OUTILS ====================== */

const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
const dist = (ax, ay, bx, by) => Math.hypot(ax - bx, ay - by);
const angDiff = (a, b) => Math.abs(((a - b + Math.PI) % (Math.PI * 2) + Math.PI * 2) % (Math.PI * 2) - Math.PI);

/* ====================== MOTEUR ====================== */

export class TraqueEngine {
  /** @param {{id,pseudo}[]} players 2 à 10 joueurs. */
  constructor(players, { hostId, rng = Math.random, now = () => Date.now(), options = {} } = {}) {
    if (players.length < 2 || players.length > 10) throw new Error('La Traque se joue de 2 à 10 joueurs.');
    this.rng = rng;
    this.now = now;
    this.hostId = hostId ?? players[0].id;
    this.options = { ...DEFAULT_OPTIONS, ...options };
    this.players = players.map((p, i) => ({
      id: p.id,
      pseudo: p.pseudo,
      skin: SKINS[i % SKINS.length].id,
      role: 'cache',
      alive: true,
      x: 1.5, y: 1.5, angle: 0,
      input: { dx: 0, dy: 0, aim: null, sneak: false, sprint: false },
      stamina: STAMINA_MAX,
      bullets: 0,
      effects: {},
      score: 0,
      elims: 0,
      survies: 0,
      lastNoise: 0,
      lastShot: 0,
      moving: false,
    }));
    this.n = this.players.length;
    this.phase = 'setup';
    this.round = 0;
    this.totalRounds = 1;
    this.chat = [];      // vivants + tous hors partie
    this.deadChat = [];  // éliminés uniquement (pas de fuite vers les vivants)
    this.log = [];
    this.flashes = [];
    this.noises = [];
    this.shots = [];
    this.bonuses = [];
    this.roundEnd = null;
    this.uid = 0;
    this.logSeq = 0;
    this.chatSeq = 0;
    this.rosterVersion = 0;   // incrémenté quand la liste des joueurs change vraiment
    this.say('🔦 Le Host règle la partie.');
  }

  // Chaque entrée porte un numéro : le Host n'envoie ensuite QUE les nouvelles.
  say(text) {
    this.logSeq += 1;
    this.log.push({ seq: this.logSeq, text });
    if (this.log.length > 80) this.log.shift();
  }
  playerOf(id) { return this.players.find((p) => p.id === id) ?? null; }
  get seeker() { return this.players.find((p) => p.role === 'chercheur') ?? null; }
  get hiders() { return this.players.filter((p) => p.role === 'cache'); }
  aliveHiders() { return this.hiders.filter((p) => p.alive); }

  /* ------------------------ labyrinthe ------------------------ */

  isWall(cx, cy) {
    if (cx < 0 || cy < 0 || cx >= COLS || cy >= ROWS) return true;
    return this.grid[cy][cx] === 1;
  }

  buildMaze() {
    // 1 = mur. Génération par backtracking sur les cases impaires.
    this.mapVersion = (this.mapVersion ?? 0) + 1;
    const g = Array.from({ length: ROWS }, () => Array(COLS).fill(1));
    const stack = [[1, 1]];
    g[1][1] = 0;
    while (stack.length) {
      const [x, y] = stack[stack.length - 1];
      const dirs = [[2, 0], [-2, 0], [0, 2], [0, -2]].filter(([dx, dy]) => {
        const nx = x + dx; const ny = y + dy;
        return nx > 0 && ny > 0 && nx < COLS - 1 && ny < ROWS - 1 && g[ny][nx] === 1;
      });
      if (!dirs.length) { stack.pop(); continue; }
      const [dx, dy] = dirs[Math.floor(this.rng() * dirs.length)];
      g[y + dy / 2][x + dx / 2] = 0;
      g[y + dy][x + dx] = 0;
      stack.push([x + dx, y + dy]);
    }
    // Tressage : on ouvre une partie des impasses pour créer des boucles
    // (un labyrinthe parfait est un piège mortel pour les cachés).
    for (let y = 1; y < ROWS - 1; y += 2) {
      for (let x = 1; x < COLS - 1; x += 2) {
        const open = [[1, 0], [-1, 0], [0, 1], [0, -1]].filter(([dx, dy]) => g[y + dy][x + dx] === 0);
        if (open.length === 1 && this.rng() < BRAID_RATE) {
          const walls = [[1, 0], [-1, 0], [0, 1], [0, -1]].filter(([dx, dy]) => {
            const nx = x + dx * 2; const ny = y + dy * 2;
            return nx > 0 && ny > 0 && nx < COLS - 1 && ny < ROWS - 1 && g[y + dy][x + dx] === 1;
          });
          if (walls.length) {
            const [dx, dy] = walls[Math.floor(this.rng() * walls.length)];
            g[y + dy][x + dx] = 0;
          }
        }
      }
    }
    this.grid = g;
    this.floors = [];
    for (let y = 0; y < ROWS; y += 1) {
      for (let x = 0; x < COLS; x += 1) if (g[y][x] === 0) this.floors.push({ x, y });
    }
  }

  randomFloor(minDistFrom = [], minDist = 0) {
    for (let i = 0; i < 400; i += 1) {
      const c = this.floors[Math.floor(this.rng() * this.floors.length)];
      const p = { x: c.x + 0.5, y: c.y + 0.5 };
      if (minDistFrom.every((o) => dist(p.x, p.y, o.x, o.y) >= minDist)) return p;
    }
    const c = this.floors[Math.floor(this.rng() * this.floors.length)];
    return { x: c.x + 0.5, y: c.y + 0.5 };
  }

  /**
   * Ligne de vue : aucun mur entre les deux points.
   *
   * Parcours de cases (DDA) : on saute de mur en mur au lieu d'échantillonner le
   * segment tous les 0,14. Sur une portée de 16 cases, ~16 tests au lieu de ~115 —
   * et cette fonction est appelée des milliers de fois par seconde chez le Host.
   */
  hasLOS(ax, ay, bx, by) {
    let x = Math.floor(ax);
    let y = Math.floor(ay);
    const ex = Math.floor(bx);
    const ey = Math.floor(by);
    if (x === ex && y === ey) return true;

    const dx = bx - ax;
    const dy = by - ay;
    const stepX = dx > 0 ? 1 : -1;
    const stepY = dy > 0 ? 1 : -1;
    const dtX = dx !== 0 ? Math.abs(1 / dx) : Infinity;
    const dtY = dy !== 0 ? Math.abs(1 / dy) : Infinity;
    let tX = dx !== 0 ? (dx > 0 ? x + 1 - ax : ax - x) * dtX : Infinity;
    let tY = dy !== 0 ? (dy > 0 ? y + 1 - ay : ay - y) * dtY : Infinity;

    // On avance jusqu'au bout du SEGMENT (t > 1), pas jusqu'à la case d'arrivée :
    // un rayon qui passe pile par un coin peut sauter cette case, et l'on tournerait
    // alors dans le vide avant de conclure « mur » à tort. Depuis que les positions
    // sont arrondies au centième, les coins alignés sont devenus fréquents.
    while (true) {
      if (tX < tY) {
        if (tX > 1) return true;
        tX += dtX; x += stepX;
      } else {
        if (tY > 1) return true;
        tY += dtY; y += stepY;
      }
      if (x === ex && y === ey) return true;
      if (this.isWall(x, y)) return false;
    }
  }

  /* ------------------------ mise en place ------------------------ */

  configure(pid, options) {
    if (pid !== this.hostId) return { ok: false, error: 'Seul le Host règle la partie.' };
    if (this.phase !== 'setup') return { ok: false, error: 'La partie a commencé.' };
    const o = { ...this.options, ...options };
    o.mode = o.mode === 'unique' ? 'unique' : 'rotation';
    o.hideMs = HIDE_CHOICES.includes(Number(o.hideMs)) ? Number(o.hideMs) : DEFAULT_OPTIONS.hideMs;
    o.roundMs = ROUND_CHOICES.includes(Number(o.roundMs)) ? Number(o.roundMs) : DEFAULT_OPTIONS.roundMs;
    o.ballesParJoueur = clamp(Math.round(Number(o.ballesParJoueur) || BULLETS_PER_PLAYER), 1, 5);
    o.detecteurs = !!o.detecteurs;
    o.bonus = !!o.bonus;
    this.options = o;
    return { ok: true };
  }

  setSkin(pid, skinId) {
    const p = this.playerOf(pid);
    if (!p) return { ok: false, error: 'Joueur inconnu.' };
    if (!SKINS.some((s) => s.id === skinId)) return { ok: false, error: 'Skin inconnu.' };
    p.skin = skinId;
    return { ok: true };
  }

  start(pid) {
    if (pid !== this.hostId) return { ok: false, error: 'Seul le Host lance la partie.' };
    if (this.phase !== 'setup') return { ok: false, error: 'La partie a commencé.' };
    this.seekerOrder = this.shuffleIds();
    this.totalRounds = this.options.mode === 'rotation' ? this.n : 1;
    this.startRound();
    return { ok: true };
  }

  shuffleIds() {
    const ids = this.players.map((p) => p.id);
    for (let i = ids.length - 1; i > 0; i -= 1) {
      const j = Math.floor(this.rng() * (i + 1));
      [ids[i], ids[j]] = [ids[j], ids[i]];
    }
    return ids;
  }

  startRound() {
    this.round += 1;
    this.buildMaze();
    this.flashes = []; this.noises = []; this.shots = []; this.bonuses = [];
    this.roundEnd = null;

    const seekerId = this.seekerOrder[(this.round - 1) % this.n];
    const bullets = this.options.ballesParJoueur * this.n;
    const spawns = [];
    for (const p of this.players) {
      p.role = p.id === seekerId ? 'chercheur' : 'cache';
      p.alive = true;
      p.stamina = STAMINA_MAX;
      p.effects = {};
      p.input = { dx: 0, dy: 0, aim: null, sneak: false, sprint: false };
      p.bullets = p.role === 'chercheur' ? bullets : 0;
      p.lastShot = -1e9; p.lastNoise = -1e9; p.moving = false;
      const pos = this.randomFloor(spawns, p.role === 'chercheur' ? 0 : 6);
      spawns.push(pos);
      p.x = pos.x; p.y = pos.y; p.angle = 0;
    }

    // Détecteurs disséminés, jamais collés les uns aux autres.
    this.detectors = [];
    if (this.options.detecteurs) {
      const count = Math.max(4, Math.round(this.aliveHiders().length * 1.6));
      for (let i = 0; i < count; i += 1) {
        const pos = this.randomFloor(this.detectors, 5);
        this.detectors.push({ id: `d${i}`, x: pos.x, y: pos.y, lastFlash: -1e9 });
      }
    }
    if (this.options.bonus) for (let i = 0; i < 3; i += 1) this.spawnBonus();
    this.nextBonusAt = this.now() + BONUS_SPAWN_MS;

    this.rosterVersion += 1;   // rôles et scores repartis : le roster a changé
    this.phase = 'cachette';
    this.phaseEnd = this.now() + this.options.hideMs;
    this.say(`🔦 Manche ${this.round}/${this.totalRounds} — ${this.seeker.pseudo} est le Chercheur (${bullets} balles). Les autres se cachent !`);
  }

  spawnBonus() {
    if (this.bonuses.length >= BONUS_MAX) return;
    const away = [...this.bonuses, ...this.players.map((p) => ({ x: p.x, y: p.y }))];
    const pos = this.randomFloor(away, 3);
    this.bonuses.push({ id: `b${this.uid += 1}`, x: pos.x, y: pos.y });
  }

  /* ------------------------ entrées joueurs ------------------------ */

  setInput(pid, input = {}) {
    const p = this.playerOf(pid);
    if (!p || !p.alive || (this.phase !== 'cachette' && this.phase !== 'traque')) {
      return { ok: false, error: 'Aucun contrôle pour le moment.' };
    }
    // Le Chercheur est figé et aveugle pendant le temps de cachette.
    if (this.phase === 'cachette' && p.role === 'chercheur') return { ok: false, error: 'Vous comptez… (temps de cachette)' };
    const dx = clamp(Number(input.dx) || 0, -1, 1);
    const dy = clamp(Number(input.dy) || 0, -1, 1);
    const len = Math.hypot(dx, dy);
    p.input = {
      dx: len > 1 ? dx / len : dx,
      dy: len > 1 ? dy / len : dy,
      aim: Number.isFinite(input.aim) ? Number(input.aim) : null,
      sneak: !!input.sneak,
      sprint: !!input.sprint,
    };
    return { ok: true };
  }

  shoot(pid) {
    const p = this.playerOf(pid);
    if (!p || p.role !== 'chercheur' || !p.alive) return { ok: false, error: 'Seul le Chercheur tire.' };
    if (this.phase !== 'traque') return { ok: false, error: 'Pas encore.' };
    if (p.bullets <= 0) return { ok: false, error: 'Plus de munitions — il faut les attraper au contact.' };
    const t = this.now();
    if (t - p.lastShot < SHOT_COOLDOWN_MS) return { ok: false, error: 'Rechargement…' };
    p.lastShot = t;
    p.bullets -= 1;
    this.shots.push({
      id: `s${this.uid += 1}`,
      x: p.x, y: p.y,
      vx: Math.cos(p.angle) * SHOT_SPEED,
      vy: Math.sin(p.angle) * SHOT_SPEED,
      by: p.id,
      ttl: 1400,
    });
    this.say(`💥 ${p.pseudo} tire (${p.bullets} balle${p.bullets > 1 ? 's' : ''} restante${p.bullets > 1 ? 's' : ''}).`);
    return { ok: true };
  }

  /* ------------------------ boucle ------------------------ */

  tick() {
    const t = this.now();
    if (this.phase === 'cachette') {
      this.movePlayers(TICK_MS / 1000, true);
      this.updateBonuses(t);
      if (t >= this.phaseEnd) {
        this.phase = 'traque';
        this.phaseEnd = t + this.options.roundMs;
        this.say(`🚨 La traque commence ! ${this.seeker.pseudo} allume sa lampe.`);
      }
      return;
    }
    if (this.phase !== 'traque') return;

    const dt = TICK_MS / 1000;
    this.movePlayers(dt, false);
    this.updateShots(dt);
    this.updateDetectors(t);
    this.updateBonuses(t);
    this.catchByContact();

    this.flashes = this.flashes.filter((f) => f.until > t);
    this.noises = this.noises.filter((nz) => nz.until > t);

    // Conditions de victoire.
    if (this.aliveHiders().length === 0) return this.endRound('chercheur');
    if (t >= this.phaseEnd) return this.endRound('caches');
    return undefined;
  }

  movePlayers(dt, hidePhase) {
    const t = this.now();
    for (const p of this.players) {
      if (!p.alive) continue;
      if (hidePhase && p.role === 'chercheur') continue;

      // Effets expirés.
      for (const [k, until] of Object.entries(p.effects)) if (until <= t) delete p.effects[k];

      const inp = p.input;
      const moving = Math.hypot(inp.dx, inp.dy) > 0.05;
      p.moving = moving;

      const canSprint = inp.sprint && !inp.sneak && p.stamina > 1;
      let speed = (p.role === 'chercheur' ? SPEED_SEEKER : SPEED_HIDER);
      if (inp.sneak) speed *= SNEAK_FACTOR;
      else if (canSprint) speed *= SPRINT_FACTOR;
      if (p.effects.vitesse) speed *= SPEED_BONUS_FACTOR;

      if (canSprint && moving) p.stamina = Math.max(0, p.stamina - STAMINA_DRAIN * dt);
      else p.stamina = Math.min(STAMINA_MAX, p.stamina + STAMINA_REGEN * dt);

      if (moving) {
        this.moveWithCollision(p, inp.dx * speed * dt, inp.dy * speed * dt);
        // La lampe pointe là où l'on regarde : la visée l'emporte sur la marche.
        p.angle = Number.isFinite(inp.aim) ? inp.aim : Math.atan2(inp.dy, inp.dx);
        this.emitNoise(p, canSprint, t);
      } else if (Number.isFinite(inp.aim)) {
        p.angle = inp.aim;
      }
    }
  }

  /** Collision cercle/grille, axe par axe (on glisse le long des murs). */
  moveWithCollision(p, dx, dy) {
    const tryAxis = (nx, ny) => {
      const cells = [
        [Math.floor(nx - BODY_R), Math.floor(ny - BODY_R)],
        [Math.floor(nx + BODY_R), Math.floor(ny - BODY_R)],
        [Math.floor(nx - BODY_R), Math.floor(ny + BODY_R)],
        [Math.floor(nx + BODY_R), Math.floor(ny + BODY_R)],
      ];
      return cells.every(([cx, cy]) => !this.isWall(cx, cy));
    };
    if (tryAxis(p.x + dx, p.y)) p.x += dx;
    if (tryAxis(p.x, p.y + dy)) p.y += dy;
    // Au centième de case : « 12.345678901234 » dans chaque vue, dix fois par
    // seconde et par joueur, c'est du poids réseau pour une précision invisible.
    p.x = Math.round(p.x * 100) / 100;
    p.y = Math.round(p.y * 100) / 100;
  }

  /** Bruit de pas : c'est ce que le Chercheur « entend ». Furtif = silencieux. */
  emitNoise(p, sprinting, t) {
    if (p.role === 'chercheur') return;      // le Chercheur, lui, se signale par sa lampe
    if (p.input.sneak || p.effects.silence) return;
    const interval = sprinting ? NOISE_SPRINT_INTERVAL : NOISE_WALK_INTERVAL;
    if (t - p.lastNoise < interval) return;
    p.lastNoise = t;
    this.noises.push({
      id: `n${this.uid += 1}`,
      // Position floutée à la case : on entend une direction, pas des coordonnées.
      x: Math.floor(p.x) + 0.5,
      y: Math.floor(p.y) + 0.5,
      r: sprinting ? NOISE_SPRINT_R : NOISE_WALK_R,
      until: t + NOISE_TTL,
    });
  }

  updateShots(dt) {
    const SUB = 4; // sous-pas : une balle traverse plus d'une case par tick
    const alive = [];
    for (const s of this.shots) {
      let dead = false;
      for (let i = 0; i < SUB && !dead; i += 1) {
        s.x += (s.vx * dt) / SUB;
        s.y += (s.vy * dt) / SUB;
        if (this.isWall(Math.floor(s.x), Math.floor(s.y))) { dead = true; break; }
        for (const p of this.players) {
          if (!p.alive || p.role === 'chercheur') continue;
          if (dist(s.x, s.y, p.x, p.y) <= BODY_R + SHOT_R) {
            this.eliminate(p, 'balle', s.by);
            dead = true;
            break;
          }
        }
      }
      s.ttl -= TICK_MS;
      if (!dead && s.ttl > 0) alive.push(s);
    }
    this.shots = alive;
  }

  catchByContact() {
    const s = this.seeker;
    if (!s || !s.alive) return;
    for (const p of this.aliveHiders()) {
      if (dist(s.x, s.y, p.x, p.y) <= CATCH_RADIUS) this.eliminate(p, 'capture', s.id);
    }
  }

  eliminate(p, cause, byId) {
    p.alive = false;
    this.rosterVersion += 1;
    p.input = { dx: 0, dy: 0, aim: null, sneak: false, sprint: false };
    const seeker = this.playerOf(byId);
    if (seeker) seeker.elims += 1;
    this.say(cause === 'balle'
      ? `🎯 ${p.pseudo} est touché par ${seeker?.pseudo ?? 'le Chercheur'} !`
      : `✋ ${p.pseudo} est attrapé par ${seeker?.pseudo ?? 'le Chercheur'} !`);
  }

  updateDetectors(t) {
    if (!this.options.detecteurs) return;
    for (const d of this.detectors) {
      if (t - d.lastFlash < DETECTOR_COOLDOWN_MS) continue;
      const tripped = this.players.some((p) => p.alive && dist(p.x, p.y, d.x, d.y) <= DETECTOR_TRIGGER_R);
      if (!tripped) continue;
      d.lastFlash = t;
      this.flashes.push({ id: `f${this.uid += 1}`, x: d.x, y: d.y, until: t + FLASH_MS });
      this.say('⚡ Un détecteur se déclenche !');
    }
  }

  /** Leurre : un flash factice, loin de celui qui l'a ramassé. */
  decoyFlash(from) {
    const t = this.now();
    const far = (this.detectors ?? []).filter((d) => dist(d.x, d.y, from.x, from.y) > 8);
    const pool = far.length ? far : this.floors.map((c) => ({ x: c.x + 0.5, y: c.y + 0.5 }));
    const d = pool[Math.floor(this.rng() * pool.length)];
    this.flashes.push({ id: `f${this.uid += 1}`, x: d.x, y: d.y, until: t + FLASH_MS, leurre: true });
    this.say('📣 Un flash retentit au loin…');
  }

  updateBonuses(t) {
    if (!this.options.bonus) return;
    if (t >= this.nextBonusAt) { this.spawnBonus(); this.nextBonusAt = t + BONUS_SPAWN_MS; }
    for (const p of this.players) {
      if (!p.alive) continue;
      const i = this.bonuses.findIndex((b) => dist(b.x, b.y, p.x, p.y) <= 0.5);
      if (i === -1) continue;
      const [b] = this.bonuses.splice(i, 1);
      this.applyBonus(p, b, t);
    }
  }

  /** Boîte mystère : l'effet dépend du rôle de celui qui la ramasse. */
  applyBonus(p, b, t) {
    const pool = p.role === 'chercheur'
      ? ['balles', 'torche', 'vitesse', 'sonar']
      : ['vitesse', 'silence', 'radar', 'leurre'];
    const kind = pool[Math.floor(this.rng() * pool.length)];
    p.lastBonus = { kind, at: t };
    switch (kind) {
      case 'balles':
        p.bullets += 2;
        this.say(`🔫 ${p.pseudo} récupère 2 balles.`);
        break;
      case 'leurre':
        this.decoyFlash(p);
        break;
      default:
        p.effects[kind] = t + (EFFECT_MS[kind] ?? 8000);
        break;
    }
    return kind;
  }

  /* ------------------------ fin de manche ------------------------ */

  endRound(vainqueur) {
    const seeker = this.seeker;
    const survivants = this.aliveHiders();
    if (vainqueur === 'chercheur') {
      seeker.score += 3 + seeker.elims;
      this.say(`🏆 ${seeker.pseudo} a éliminé tout le monde — le Chercheur gagne !`);
    } else {
      seeker.score += seeker.elims;
      for (const p of survivants) { p.score += 2; p.survies += 1; }
      this.say(`⏰ Temps écoulé — ${survivants.length} caché(s) survivant(s) l'emportent !`);
    }
    this.rosterVersion += 1;   // scores mis à jour
    this.roundEnd = {
      vainqueur,
      seekerId: seeker.id,
      seekerName: seeker.pseudo,
      elims: seeker.elims,
      survivants: survivants.map((p) => ({ id: p.id, pseudo: p.pseudo })),
      scores: this.scores(),
    };
    for (const p of this.players) p.elims = 0;
    this.phase = this.round >= this.totalRounds ? 'fin' : 'fin-manche';
    return { roundOver: true };
  }

  nextRound(pid) {
    if (pid !== this.hostId) return { ok: false, error: 'Seul le Host relance.' };
    if (this.phase !== 'fin-manche') return { ok: false, error: 'Pas de manche à relancer.' };
    this.startRound();
    return { ok: true };
  }

  scores() {
    return [...this.players]
      .map((p) => ({ id: p.id, pseudo: p.pseudo, score: p.score, survies: p.survies }))
      .sort((a, b) => b.score - a.score);
  }

  summary() {
    const classement = this.scores();
    const top = classement[0]?.score ?? 0;
    const gagnants = classement.filter((p) => p.score === top).map((p) => p.pseudo);
    return {
      summary: gagnants.length > 1
        ? `🔦 La Traque — égalité entre ${gagnants.join(', ')} (${top} pts).`
        : `🔦 La Traque — ${gagnants[0]} l'emporte avec ${top} points.`,
      classement,
      manches: this.round,
    };
  }

  /* ------------------------ chat ------------------------ */

  addChat(pid, text) {
    const p = this.playerOf(pid);
    const clean = String(text ?? '').trim().slice(0, 200);
    if (!p || !clean) return { ok: false, error: 'Message vide.' };
    this.chatSeq += 1;
    const msg = { seq: this.chatSeq, from: pid, pseudo: p.pseudo, text: clean, ts: this.now() };
    // Les éliminés parlent entre eux : sinon ils balanceraient les cachettes.
    const enJeu = this.phase === 'cachette' || this.phase === 'traque';
    if (enJeu && !p.alive) this.deadChat.push(msg);
    else this.chat.push(msg);
    if (this.chat.length > 120) this.chat.shift();
    if (this.deadChat.length > 80) this.deadChat.shift();
    return { ok: true };
  }

  handleAction(pid, action = {}) {
    switch (action.a) {
      case 'configure': return this.configure(pid, action.options);
      case 'skin': return this.setSkin(pid, action.skin);
      case 'start': return this.start(pid);
      case 'input': return this.setInput(pid, action);
      case 'shoot': return this.shoot(pid);
      case 'next-round': return this.nextRound(pid);
      case 'chat': return this.addChat(pid, action.text);
      default: return { ok: false, error: 'Action inconnue.' };
    }
  }

  /* ====================== VUES (anti-triche) ====================== */

  /** Le Chercheur voit-il ce point ? (cône + portée + ligne de vue, ou contact) */
  seenByTorch(seeker, x, y) {
    const d = dist(seeker.x, seeker.y, x, y);
    if (d <= TOUCH_RADIUS) return this.hasLOS(seeker.x, seeker.y, x, y);
    const range = seeker.effects.torche ? TORCH_BONUS_RANGE : CONE_RANGE;
    if (d > range) return false;
    const half = ((seeker.effects.torche ? TORCH_BONUS_HALF_DEG : CONE_HALF_DEG) * Math.PI) / 180;
    if (angDiff(Math.atan2(y - seeker.y, x - seeker.x), seeker.angle) > half) return false;
    return this.hasLOS(seeker.x, seeker.y, x, y);
  }

  /** Un flash révèle tout le monde dans son rayon — c'est le cœur du jeu. */
  inFlash(x, y) {
    return this.flashes.some((f) => dist(f.x, f.y, x, y) <= FLASH_RADIUS);
  }

  /**
   * Vue personnalisée. RIEN de ce que le joueur ne peut pas voir n'y figure :
   * les positions des autres n'y sont ajoutées que si une règle de visibilité
   * l'autorise (cône, contact, flash, sonar, radar). Un joueur qui lit le
   * réseau n'apprend donc rien de plus que ce que son écran affiche déjà.
   */
  /**
   * @param {object|null} sync état de ce que le destinataire possède DÉJÀ :
   *        { grid, rosterVersion, chatSeq, logSeq }. Sans lui, la vue est complète.
   *
   * Le labyrinthe, la liste des joueurs et l'historique du chat ne changent pas
   * dix fois par seconde : les renvoyer à chaque image, c'était 580 Ko/s pour
   * rien. On n'envoie désormais que ce que le destinataire n'a pas encore.
   */
  getViewFor(pid, sync = null) {
    const me = this.playerOf(pid);
    const t = this.now();
    const aDejaLaCarte = sync && sync.grid === this.mapVersion;
    const aDejaLeRoster = sync && sync.rosterVersion === this.rosterVersion;
    const depuisChat = sync ? (sync.chatSeq ?? 0) : 0;
    const depuisLog = sync ? (sync.logSeq ?? 0) : 0;

    const base = {
      phase: this.phase,
      round: this.round,
      totalRounds: this.totalRounds,
      options: this.options,
      isHost: pid === this.hostId,
      // Statique : la carte n'est transmise qu'une fois par manche.
      mapVersion: this.mapVersion,
      cols: aDejaLaCarte ? undefined : COLS,
      rows: aDejaLaCarte ? undefined : ROWS,
      grid: aDejaLaCarte || !this.grid ? undefined : this.grid.map((r) => r.join('')),
      timeLeft: (this.phase === 'cachette' || this.phase === 'traque') ? Math.max(0, this.phaseEnd - t) : 0,
      rosterVersion: this.rosterVersion,
      roster: aDejaLeRoster ? undefined : this.players.map((p) => ({
        id: p.id, pseudo: p.pseudo, skin: p.skin, role: p.role, alive: p.alive, score: p.score,
      })),
      me: me ? {
        id: me.id, pseudo: me.pseudo, skin: me.skin, role: me.role, alive: me.alive,
        x: me.x, y: me.y, angle: me.angle, stamina: me.stamina, bullets: me.bullets,
        effects: { ...me.effects }, lastBonus: me.lastBonus ?? null,
      } : null,
      seekerName: this.seeker?.pseudo ?? null,
      // Différentiel : uniquement les messages que le destinataire n'a pas encore.
      chatSeq: this.chatSeq,
      logSeq: this.logSeq,
      chat: this.chat.filter((m) => m.seq > depuisChat),
      deadChat: (me && !me.alive) ? this.deadChat.filter((m) => m.seq > depuisChat) : [],
      log: this.log.filter((l) => l.seq > depuisLog),
      roundEnd: this.roundEnd,
      finalSummary: this.phase === 'fin' ? this.summary() : null,
      cone: { half: CONE_HALF_DEG, range: CONE_RANGE, halfBonus: TORCH_BONUS_HALF_DEG, rangeBonus: TORCH_BONUS_RANGE },
    };
    if (!me || this.phase === 'setup' || this.phase === 'fin' || this.phase === 'fin-manche') {
      return { ...base, visibles: [], flashes: [], noises: [], shots: [], bonuses: [], detectors: [] };
    }

    // Un joueur éliminé devient spectateur : il voit tout, mais son chat est
    // isolé (deadChat) — impossible de renseigner les vivants.
    if (!me.alive) {
      return {
        ...base,
        ghost: true,
        visibles: this.players.filter((p) => p.alive).map((p) => this.publicOf(p, 'ghost')),
        flashes: this.flashes.map((f) => ({ x: f.x, y: f.y })),
        noises: [],
        shots: this.shots.map((s) => ({ x: s.x, y: s.y })),
        bonuses: this.bonuses.map((b) => ({ x: b.x, y: b.y })),
        detectors: (this.detectors ?? []).map((d) => ({ x: d.x, y: d.y, actif: t - d.lastFlash > DETECTOR_COOLDOWN_MS })),
      };
    }

    const seeker = this.seeker;
    const visibles = [];
    const seen = new Set();
    const push = (p, how) => { if (!seen.has(p.id)) { seen.add(p.id); visibles.push(this.publicOf(p, how)); } };

    for (const p of this.players) {
      if (!p.alive || p.id === pid) continue;

      // 1. Les flashs révèlent à TOUT LE MONDE ceux qui se trouvent dedans.
      if (this.inFlash(p.x, p.y)) { push(p, 'flash'); continue; }

      if (me.role === 'chercheur') {
        // 2. Le cône de la lampe (+ le contact).
        if (this.seenByTorch(me, p.x, p.y)) { push(p, 'lampe'); continue; }
        // 3. Sonar : révèle brièvement les alentours, murs compris.
        if (me.effects.sonar && dist(me.x, me.y, p.x, p.y) <= SONAR_RANGE) { push(p, 'sonar'); continue; }
      } else {
        if (p.role === 'chercheur') {
          // 4. On voit la lampe du Chercheur de loin (c'est la seule lumière du niveau).
          if (me.effects.radar) { push(p, 'radar'); continue; }
          const d = dist(me.x, me.y, p.x, p.y);
          if (d <= LIGHT_VISIBLE_RANGE && this.hasLOS(me.x, me.y, p.x, p.y)) { push(p, 'lampe-visible'); continue; }
          // 5. Éclairé par sa propre lampe si l'on est dans le cône : il nous voit, on le voit.
          if (this.seenByTorch(p, me.x, me.y)) { push(p, 'lampe-visible'); continue; }
        } else if (dist(me.x, me.y, p.x, p.y) <= HIDER_FEEL_RADIUS && this.hasLOS(me.x, me.y, p.x, p.y)) {
          // 6. Dans le noir, on devine un autre caché à bout portant.
          push(p, 'proximite');
        }
      }
    }

    // Bruits : réservés au Chercheur (position floutée à la case).
    const noises = me.role === 'chercheur'
      ? this.noises.filter((nz) => dist(me.x, me.y, nz.x, nz.y) <= nz.r).map((nz) => ({ x: nz.x, y: nz.y, until: nz.until }))
      : [];

    return {
      ...base,
      ghost: false,
      visibles,
      flashes: this.flashes.map((f) => ({ x: f.x, y: f.y })),
      noises,
      shots: this.shots
        .filter((s) => dist(me.x, me.y, s.x, s.y) <= TRACER_VISIBLE_RANGE && this.hasLOS(me.x, me.y, s.x, s.y))
        .map((s) => ({ x: s.x, y: s.y })),
      bonuses: this.bonuses
        .filter((b) => (me.role === 'chercheur' && this.seenByTorch(me, b.x, b.y))
          || (dist(me.x, me.y, b.x, b.y) <= BONUS_VISIBLE_RANGE && this.hasLOS(me.x, me.y, b.x, b.y))
          || this.inFlash(b.x, b.y))
        .map((b) => ({ x: b.x, y: b.y })),
      detectors: (this.detectors ?? [])
        .filter((d) => dist(me.x, me.y, d.x, d.y) <= BONUS_VISIBLE_RANGE || this.inFlash(d.x, d.y))
        .map((d) => ({ x: d.x, y: d.y, actif: t - d.lastFlash > DETECTOR_COOLDOWN_MS })),
      seekerVisible: seeker ? seen.has(seeker.id) : false,
    };
  }

  /** Ce qu'on transmet d'un joueur VU : jamais plus que sa position apparente. */
  publicOf(p, how) {
    return {
      id: p.id, pseudo: p.pseudo, skin: p.skin, role: p.role,
      x: p.x, y: p.y, angle: p.angle, how,
      torche: p.role === 'chercheur' ? !!p.effects.torche : false,
    };
  }
}
