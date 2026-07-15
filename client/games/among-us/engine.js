/**
 * AMONG US — moteur de jeu (pur : ni DOM ni réseau, horloge injectée, testable).
 *
 * ARCHITECTURE HOST-AUTORITAIRE. Deux secrets à protéger, et ils sont de nature
 * différente :
 *   1. LES RÔLES. Ils ne quittent JAMAIS le Host. Un joueur ne reçoit que son
 *      propre rôle — et, s'il est imposteur, celui de ses complices. Diffuser
 *      l'état complet en le masquant à l'affichage suffirait à ruiner le jeu :
 *      un `console.log` donnerait les imposteurs en deux secondes.
 *   2. LES POSITIONS. Filtrées par la vision de chacun (rayon + ligne de vue),
 *      d'où l'intérêt du sabotage des lumières. Un joueur dans un conduit
 *      n'existe pour personne.
 *
 * Les murs, eux, sont envoyés à tous : la carte n'est pas un secret.
 */

/* ====================== CARTE ====================== */

export const COLS = 48;
export const ROWS = 27;

// Salles (intérieurs). Le reste des sols est du couloir.
export const ROOMS = Object.freeze([
  { id: 'upper-engine', nom: 'Moteur Sup.', x: 3, y: 3, w: 7, h: 5 },
  { id: 'reactor', nom: 'Réacteur', x: 3, y: 12, w: 6, h: 6 },
  { id: 'lower-engine', nom: 'Moteur Inf.', x: 3, y: 20, w: 7, h: 5 },
  { id: 'security', nom: 'Sécurité', x: 14, y: 12, w: 4, h: 3 },
  { id: 'medbay', nom: 'Infirmerie', x: 15, y: 3, w: 6, h: 4 },
  { id: 'electrical', nom: 'Électricité', x: 15, y: 18, w: 7, h: 6 },
  { id: 'cafeteria', nom: 'Cafétéria', x: 25, y: 3, w: 8, h: 6 },
  { id: 'storage', nom: 'Stockage', x: 25, y: 18, w: 7, h: 6 },
  { id: 'communications', nom: 'Communications', x: 28, y: 12, w: 5, h: 3 },
  { id: 'admin', nom: 'Administration', x: 36, y: 13, w: 5, h: 4 },
  { id: 'weapons', nom: 'Armurerie', x: 37, y: 3, w: 6, h: 4 },
  { id: 'o2', nom: 'O2', x: 36, y: 9, w: 3, h: 2 },
  { id: 'navigation', nom: 'Navigation', x: 43, y: 10, w: 3, h: 4 },
  { id: 'shields', nom: 'Boucliers', x: 37, y: 19, w: 6, h: 4 },
]);

// Couloirs (rectangles de sol reliant les salles).
const CORRIDORS = Object.freeze([
  { x: 11, y: 3, w: 2, h: 22 },   // épine dorsale gauche
  { x: 10, y: 5, w: 1, h: 2 },    // accès Moteur Sup.
  { x: 9, y: 14, w: 2, h: 2 },    // accès Réacteur
  { x: 10, y: 21, w: 1, h: 2 },   // accès Moteur Inf.
  { x: 13, y: 8, w: 11, h: 2 },   // couloir haut (Infirmerie → Cafétéria)
  { x: 17, y: 7, w: 2, h: 1 },    // accès Infirmerie
  { x: 13, y: 13, w: 1, h: 2 },   // accès Sécurité
  { x: 13, y: 20, w: 2, h: 2 },   // accès Électricité
  { x: 23, y: 8, w: 2, h: 12 },   // épine dorsale centrale
  { x: 29, y: 9, w: 2, h: 3 },    // Cafétéria → Communications
  { x: 29, y: 15, w: 2, h: 3 },   // Communications → Stockage
  { x: 33, y: 14, w: 3, h: 2 },   // Communications → Administration
  { x: 33, y: 4, w: 4, h: 2 },    // Cafétéria → Armurerie
  { x: 37, y: 7, w: 2, h: 2 },    // Armurerie → O2
  { x: 37, y: 11, w: 2, h: 2 },   // O2 → Administration
  { x: 43, y: 6, w: 2, h: 4 },    // Armurerie → Navigation
  { x: 39, y: 17, w: 2, h: 2 },   // Administration → Boucliers
  { x: 32, y: 20, w: 5, h: 2 },   // Stockage → Boucliers
]);

// Réseau de conduits : un graphe, pas une téléportation libre.
const VENTS = Object.freeze([
  { id: 'v-upper', room: 'upper-engine', links: ['v-reactor'] },
  { id: 'v-reactor', room: 'reactor', links: ['v-upper', 'v-lower'] },
  { id: 'v-lower', room: 'lower-engine', links: ['v-reactor'] },
  { id: 'v-elec', room: 'electrical', links: ['v-security'] },
  { id: 'v-security', room: 'security', links: ['v-elec', 'v-medbay'] },
  { id: 'v-medbay', room: 'medbay', links: ['v-security'] },
  { id: 'v-cafe', room: 'cafeteria', links: ['v-admin'] },
  { id: 'v-admin', room: 'admin', links: ['v-cafe', 'v-weapons'] },
  { id: 'v-weapons', room: 'weapons', links: ['v-admin'] },
  { id: 'v-nav', room: 'navigation', links: ['v-shields'] },
  { id: 'v-shields', room: 'shields', links: ['v-nav', 'v-storage'] },
  { id: 'v-storage', room: 'storage', links: ['v-shields'] },
]);

// Salles couvertes par les caméras de Sécurité.
const CAMERA_ROOMS = Object.freeze(['cafeteria', 'medbay', 'electrical', 'storage']);

/* ====================== TÂCHES ====================== */

// `duree` = temps minimum imposé PAR LE HOST pour valider une étape : un client
// bricolé ne peut pas boucler une tâche plus vite que physiquement possible.
export const TASK_DEFS = Object.freeze([
  { id: 'swipe', nom: 'Passer la carte', mini: 'swipe', long: false, commune: true, etapes: ['admin'], duree: 3000 },
  { id: 'wires', nom: 'Réparer le câblage', mini: 'wires', long: false, commune: true, etapes: ['electrical', 'navigation', 'cafeteria'], duree: 4000 },
  { id: 'shields', nom: 'Amorcer les boucliers', mini: 'shields', long: false, commune: false, etapes: ['shields'], duree: 3000 },
  { id: 'chart', nom: 'Tracer la route', mini: 'chart', long: false, commune: false, etapes: ['navigation'], duree: 3000 },
  { id: 'steering', nom: 'Stabiliser la direction', mini: 'steering', long: false, commune: false, etapes: ['navigation'], duree: 3000 },
  { id: 'o2-clean', nom: 'Nettoyer le filtre O2', mini: 'filter', long: false, commune: false, etapes: ['o2'], duree: 5000 },
  { id: 'calibrate', nom: 'Calibrer le distributeur', mini: 'calibrate', long: false, commune: false, etapes: ['electrical'], duree: 4000 },
  { id: 'manifolds', nom: 'Déverrouiller les collecteurs', mini: 'keypad', long: false, commune: false, etapes: ['reactor'], duree: 4000 },
  { id: 'garbage', nom: 'Vider les déchets', mini: 'lever', long: false, commune: false, etapes: ['cafeteria', 'storage'], duree: 3000 },
  { id: 'weapons', nom: 'Dégommer les astéroïdes', mini: 'asteroids', long: false, commune: false, etapes: ['weapons'], duree: 6000 },
  { id: 'scan', nom: 'Passer le scanner', mini: 'scan', long: true, commune: false, etapes: ['medbay'], duree: 10000 },
  { id: 'sample', nom: 'Analyser l\'échantillon', mini: 'sample', long: true, commune: false, etapes: ['medbay'], duree: 12000 },
  { id: 'reactor-start', nom: 'Démarrer le réacteur', mini: 'simon', long: true, commune: false, etapes: ['reactor'], duree: 8000 },
  { id: 'upload', nom: 'Télécharger puis transmettre', mini: 'transfer', long: true, commune: false, etapes: ['communications', 'admin'], duree: 8000 },
  { id: 'fuel', nom: 'Faire le plein', mini: 'fuel', long: true, commune: false, etapes: ['storage', 'upper-engine', 'storage', 'lower-engine'], duree: 5000 },
  { id: 'align', nom: 'Aligner les moteurs', mini: 'align', long: true, commune: false, etapes: ['upper-engine', 'lower-engine'], duree: 5000 },
]);

/* ====================== RÉGLAGES ====================== */

export const TICK_MS = 50;
export const BODY_R = 0.32;

/**
 * UN SEUL pas de déplacement, partagé par le moteur (Host) et la prédiction locale
 * (invités). Pas de copie côté client : pas de divergence possible.
 */
export function stepCollision(pos, dx, dy, isWall, traverseLesMurs = false) {
  if (traverseLesMurs) {   // les fantômes
    pos.x = Math.round((pos.x + dx) * 100) / 100;
    pos.y = Math.round((pos.y + dy) * 100) / 100;
    return pos;
  }
  const libre = (nx, ny) => [
    [nx - BODY_R, ny - BODY_R], [nx + BODY_R, ny - BODY_R],
    [nx - BODY_R, ny + BODY_R], [nx + BODY_R, ny + BODY_R],
  ].every(([cx, cy]) => !isWall(Math.floor(cx), Math.floor(cy)));
  if (libre(pos.x + dx, pos.y)) pos.x += dx;
  if (libre(pos.x, pos.y + dy)) pos.y += dy;
  pos.x = Math.round(pos.x * 100) / 100;
  pos.y = Math.round(pos.y * 100) / 100;
  return pos;
}
const BASE_SPEED = 4.2;              // cases/seconde (×0,5 à ×3)
const KILL_DIST = { courte: 1.0, normale: 1.6, longue: 2.2 };
const REPORT_RADIUS = 1.6;
const USE_RADIUS = 1.4;              // rayon d'interaction (tâche, panneau, bouton, conduit)
const VENT_COOLDOWN_MS = 800;
const SABOTAGE_COOLDOWN_MS = 25_000;
const CRITICAL_MS = 45_000;          // réacteur / O2
const DOOR_CLOSED_MS = 10_000;
const LIGHTS_FACTOR = 0.35;          // vision des Crewmates lumières sabotées
const EJECT_ANIM_MS = 4000;

export const DEFAULT_OPTIONS = Object.freeze({
  imposteurs: 1,
  vitesse: 1,
  visionCrew: 1,
  visionImposteur: 1.75,
  killCooldown: 25_000,
  killDistance: 'normale',
  reunions: 1,                       // boutons d'urgence par joueur
  tempsDiscussion: 45_000,
  tempsVote: 60_000,
  votesAnonymes: false,
  confirmerEjection: true,
  barreTaches: 'toujours',           // toujours | reunions | jamais
  tachesCourtes: 3,
  tachesLongues: 2,
  tachesCommunes: 1,
});

const BASE_VISION = 4.6;             // rayon de vision de référence (cases)

const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
const dist = (a, b) => Math.hypot(a.x - b.x, a.y - b.y);

/* ====================== MOTEUR ====================== */

export class AmongEngine {
  /** @param {{id,pseudo}[]} players 4 à 15 joueurs. */
  constructor(players, { hostId, rng = Math.random, now = () => Date.now(), options = {} } = {}) {
    if (players.length < 4 || players.length > 15) throw new Error('Among Us se joue de 4 à 15 joueurs.');
    this.rng = rng;
    this.now = now;
    this.hostId = hostId ?? players[0].id;
    this.options = { ...DEFAULT_OPTIONS, ...options };
    this.optionsVersion = 1;   // réglées une fois : inutile de les renvoyer 10 fois par seconde
    this.players = players.map((p, i) => ({
      id: p.id,
      pseudo: p.pseudo,
      couleur: COLORS[i % COLORS.length],
      role: 'crewmate',
      alive: true,
      x: 0, y: 0,
      input: { dx: 0, dy: 0 },
      tasks: [],
      vented: null,          // id du conduit où il est planqué
      lastVent: 0,
      killCooldownEnd: 0,
      meetingsLeft: 0,
      step: null,            // étape de tâche en cours { taskId, debut }
      vote: undefined,
      score: 0,
    }));
    this.n = this.players.length;
    this.phase = 'setup';
    this.bodies = [];
    this.sabotage = null;    // { type, until, fixes:{} }
    this.doorsClosed = [];   // [{ room, until }]
    this.sabotageCooldownEnd = 0;
    this.chat = [];          // réunions (vivants)
    this.deadChat = [];      // fantômes
    this.log = [];
    this.meeting = null;
    this.result = null;
    this.logSeq = 0;
    this.chatSeq = 0;
    this.rosterVersion = 0;   // change quand quelqu'un meurt / est éjecté
    this.mapVersion = 1;      // la carte est fixe : envoyée une seule fois
    this.say('🚀 Le Host règle la partie.');
    this.buildMap();
  }

  // Numérotées : le Host n'envoie ensuite QUE les entrées nouvelles.
  say(text) {
    this.logSeq += 1;
    this.log.push({ seq: this.logSeq, text });
    if (this.log.length > 90) this.log.shift();
  }
  playerOf(id) { return this.players.find((p) => p.id === id) ?? null; }
  get impostors() { return this.players.filter((p) => p.role === 'impostor'); }
  aliveOf(role) { return this.players.filter((p) => p.alive && p.role === role); }
  get aliveImpostors() { return this.aliveOf('impostor'); }
  get aliveCrew() { return this.aliveOf('crewmate'); }

  /* ------------------------ carte ------------------------ */

  buildMap() {
    const g = Array.from({ length: ROWS }, () => Array(COLS).fill(1));
    const carve = (r) => {
      for (let y = r.y; y < r.y + r.h; y += 1) {
        for (let x = r.x; x < r.x + r.w; x += 1) if (y > 0 && x > 0 && y < ROWS && x < COLS) g[y][x] = 0;
      }
    };
    ROOMS.forEach(carve);
    CORRIDORS.forEach(carve);
    this.grid = g;

    // À quelle salle appartient chaque case (les couloirs : null).
    this.roomAt = Array.from({ length: ROWS }, () => Array(COLS).fill(null));
    for (const r of ROOMS) {
      for (let y = r.y; y < r.y + r.h; y += 1) {
        for (let x = r.x; x < r.x + r.w; x += 1) this.roomAt[y][x] = r.id;
      }
    }

    // Portes = les cases de couloir qui touchent une salle. Les fermer isole
    // réellement la salle (elles sont calculées, pas devinées).
    this.doors = {};
    for (const r of ROOMS) this.doors[r.id] = [];
    for (let y = 1; y < ROWS - 1; y += 1) {
      for (let x = 1; x < COLS - 1; x += 1) {
        if (this.grid[y][x] !== 0 || this.roomAt[y][x]) continue;
        const voisines = new Set();
        for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
          const r = this.roomAt[y + dy]?.[x + dx];
          if (r) voisines.add(r);
        }
        for (const r of voisines) this.doors[r].push({ x, y });
      }
    }

    // Points d'intérêt : centre des salles, conduits, consoles.
    this.center = {};
    for (const r of ROOMS) this.center[r.id] = { x: r.x + r.w / 2, y: r.y + r.h / 2 };
    this.vents = VENTS.map((v) => ({ ...v, x: this.center[v.room].x - 0.9, y: this.center[v.room].y + 0.8 }));
    this.stations = {
      emergency: { ...this.center.cafeteria },
      admin: { x: this.center.admin.x, y: this.center.admin.y - 0.8 },
      cameras: { x: this.center.security.x, y: this.center.security.y },
      lights: { x: this.center.electrical.x + 1.2, y: this.center.electrical.y },
      comms: { x: this.center.communications.x, y: this.center.communications.y },
      reactorA: { x: this.center.reactor.x - 1.5, y: this.center.reactor.y },
      reactorB: { x: this.center.reactor.x + 1.5, y: this.center.reactor.y },
      o2A: { x: this.center.o2.x, y: this.center.o2.y },
      o2B: { x: this.center.admin.x + 1.5, y: this.center.admin.y },
    };
  }

  isWall(cx, cy) {
    if (cx < 0 || cy < 0 || cx >= COLS || cy >= ROWS) return true;
    if (this.grid[cy][cx] === 1) return true;
    // Portes fermées par sabotage.
    const t = this.now();
    return this.doorsClosed.some((d) => d.until > t && this.doors[d.room].some((c) => c.x === cx && c.y === cy));
  }

  roomOf(p) { return this.roomAt[Math.floor(p.y)]?.[Math.floor(p.x)] ?? null; }

  hasLOS(a, b) {
    const d = dist(a, b);
    const steps = Math.ceil(d / 0.15);
    for (let i = 1; i < steps; i += 1) {
      const t = i / steps;
      const x = a.x + (b.x - a.x) * t;
      const y = a.y + (b.y - a.y) * t;
      // Une porte fermée ne bloque pas la vue : c'est du verre.
      if (this.grid[Math.floor(y)]?.[Math.floor(x)] !== 0) return false;
    }
    return true;
  }

  /* ------------------------ mise en place ------------------------ */

  configure(pid, options) {
    if (pid !== this.hostId) return { ok: false, error: 'Seul le Host règle la partie.' };
    if (this.phase !== 'setup') return { ok: false, error: 'La partie a commencé.' };
    const o = { ...this.options, ...options };
    o.imposteurs = clamp(Math.round(Number(o.imposteurs) || 1), 1, Math.min(3, Math.floor((this.n - 1) / 2)));
    o.vitesse = clamp(Number(o.vitesse) || 1, 0.5, 3);
    o.visionCrew = clamp(Number(o.visionCrew) || 1, 0.25, 5);
    o.visionImposteur = clamp(Number(o.visionImposteur) || 1, 0.25, 5);
    o.killCooldown = clamp(Math.round(Number(o.killCooldown) || 25000), 10_000, 60_000);
    o.killDistance = KILL_DIST[o.killDistance] ? o.killDistance : 'normale';
    o.reunions = clamp(Math.round(Number(o.reunions) ?? 1), 0, 9);
    o.tempsDiscussion = clamp(Math.round(Number(o.tempsDiscussion) ?? 45000), 0, 120_000);
    o.tempsVote = clamp(Math.round(Number(o.tempsVote) ?? 60000), 15_000, 300_000);
    o.votesAnonymes = !!o.votesAnonymes;
    o.confirmerEjection = !!o.confirmerEjection;
    o.barreTaches = ['toujours', 'reunions', 'jamais'].includes(o.barreTaches) ? o.barreTaches : 'toujours';
    o.tachesCourtes = clamp(Math.round(Number(o.tachesCourtes) ?? 3), 0, 6);
    o.tachesLongues = clamp(Math.round(Number(o.tachesLongues) ?? 2), 0, 4);
    o.tachesCommunes = clamp(Math.round(Number(o.tachesCommunes) ?? 1), 0, 2);
    if (o.tachesCourtes + o.tachesLongues + o.tachesCommunes === 0) o.tachesCourtes = 1;
    this.optionsVersion += 1;
    this.options = o;
    return { ok: true };
  }

  start(pid) {
    if (pid !== this.hostId) return { ok: false, error: 'Seul le Host lance la partie.' };
    if (this.phase !== 'setup') return { ok: false, error: 'La partie a commencé.' };

    // Attribution des rôles — le seul endroit où le hasard décide de tout.
    const ids = this.players.map((p) => p.id);
    for (let i = ids.length - 1; i > 0; i -= 1) {
      const j = Math.floor(this.rng() * (i + 1));
      [ids[i], ids[j]] = [ids[j], ids[i]];
    }
    const impostorIds = new Set(ids.slice(0, this.options.imposteurs));

    const communes = TASK_DEFS.filter((t) => t.commune);
    const chosenCommunes = this.pickSome(communes, this.options.tachesCommunes);

    for (const p of this.players) {
      p.role = impostorIds.has(p.id) ? 'impostor' : 'crewmate';
      p.alive = true;
      p.vented = null;
      p.step = null;
      p.vote = undefined;
      p.meetingsLeft = this.options.reunions;
      p.killCooldownEnd = this.now() + this.options.killCooldown;
      const spawn = this.center.cafeteria;
      const a = this.rng() * Math.PI * 2;
      p.x = spawn.x + Math.cos(a) * 1.6;
      p.y = spawn.y + Math.sin(a) * 1.6;
      p.input = { dx: 0, dy: 0 };
      p.tasks = this.assignTasks(chosenCommunes);
      p.tasksVersion = 1;
    }
    this.rosterVersion += 1;

    this.phase = 'jeu';
    this.bodies = [];
    this.sabotage = null;
    this.doorsClosed = [];
    this.sabotageCooldownEnd = this.now() + 10_000;
    this.say(`🚀 Décollage — ${this.options.imposteurs} imposteur(s) parmi ${this.n}. Bonne chance.`);
    return { ok: true };
  }

  pickSome(pool, k) {
    const arr = [...pool];
    for (let i = arr.length - 1; i > 0; i -= 1) {
      const j = Math.floor(this.rng() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr.slice(0, Math.min(k, arr.length));
  }

  /** Les imposteurs reçoivent les MÊMES tâches : leur liste doit être crédible. */
  assignTasks(communes) {
    const courtes = TASK_DEFS.filter((t) => !t.long && !t.commune);
    const longues = TASK_DEFS.filter((t) => t.long);
    const defs = [
      ...communes,
      ...this.pickSome(courtes, this.options.tachesCourtes),
      ...this.pickSome(longues, this.options.tachesLongues),
    ];
    return defs.map((d) => ({ id: d.id, etape: 0, total: d.etapes.length, fait: false }));
  }

  taskDef(id) { return TASK_DEFS.find((t) => t.id === id); }

  /** Progression : uniquement les tâches des Crewmates (les fantômes comptent). */
  taskProgress() {
    const crew = this.players.filter((p) => p.role === 'crewmate');
    let total = 0; let done = 0;
    for (const p of crew) {
      for (const t of p.tasks) {
        const def = this.taskDef(t.id);
        total += def.etapes.length;
        done += t.fait ? def.etapes.length : t.etape;
      }
    }
    return { done, total, ratio: total ? done / total : 1 };
  }

  /* ------------------------ déplacements ------------------------ */

  setInput(pid, input = {}) {
    const p = this.playerOf(pid);
    if (!p || this.phase !== 'jeu') return { ok: false, error: 'Pas de contrôle actuellement.' };
    if (p.vented) return { ok: false, error: 'Vous êtes dans un conduit.' };
    const dx = clamp(Number(input.dx) || 0, -1, 1);
    const dy = clamp(Number(input.dy) || 0, -1, 1);
    const len = Math.hypot(dx, dy);
    // Horodatage croisé (voir La Traque) : permet à l'invité de savoir de quel
    // instant date la position que le Host lui renvoie.
    if (Number.isFinite(input.ts)) { p.inputTs = Number(input.ts); p.inputAt = this.now(); }
    p.input = { dx: len > 1 ? dx / len : dx, dy: len > 1 ? dy / len : dy };
    return { ok: true };
  }

  /** Vitesse effective — transmise dans la vue pour que l'invité prédise sans deviner. */
  speedOf(p) {
    if (this.phase !== 'jeu' || p.vented) return 0;   // réunion, conduit : on ne bouge pas
    return BASE_SPEED * this.options.vitesse;
  }

  move(p, dt) {
    const speed = this.speedOf(p);
    if (speed === 0) return;
    const dx = p.input.dx * speed * dt;
    const dy = p.input.dy * speed * dt;
    // Les fantômes traversent les murs — mais restent sur la carte.
    stepCollision(p, dx, dy, (x, y) => this.isWall(x, y), !p.alive);
    p.x = Math.round(clamp(p.x, 0.5, COLS - 0.5) * 100) / 100;
    p.y = Math.round(clamp(p.y, 0.5, ROWS - 0.5) * 100) / 100;
  }

  /* ------------------------ actions ------------------------ */

  kill(pid, targetId) {
    const p = this.playerOf(pid);
    const t = this.playerOf(targetId);
    const now = this.now();
    if (this.phase !== 'jeu') return { ok: false, error: 'Impossible maintenant.' };
    if (!p || p.role !== 'impostor' || !p.alive) return { ok: false, error: 'Seul un imposteur vivant peut tuer.' };
    if (p.vented) return { ok: false, error: 'Sortez du conduit d\'abord.' };
    if (!t || !t.alive || t.role === 'impostor') return { ok: false, error: 'Cible invalide.' };
    if (t.vented) return { ok: false, error: 'Cible inatteignable.' };
    if (now < p.killCooldownEnd) return { ok: false, error: 'Kill en recharge.' };
    if (dist(p, t) > KILL_DIST[this.options.killDistance]) return { ok: false, error: 'Trop loin.' };

    t.alive = false;
    t.input = { dx: 0, dy: 0 };
    t.step = null;
    this.rosterVersion += 1;
    this.bodies.push({ id: `b-${t.id}`, playerId: t.id, pseudo: t.pseudo, couleur: t.couleur, x: t.x, y: t.y, at: now });
    // L'imposteur se place sur le corps : c'est le comportement du jeu.
    p.x = t.x; p.y = t.y;
    p.killCooldownEnd = now + this.options.killCooldown;
    this.say('🔪 Quelqu\'un a disparu…'); // aucun nom : le journal est public
    this.checkWin();
    return { ok: true };
  }

  useVent(pid, ventId = null) {
    const p = this.playerOf(pid);
    const now = this.now();
    if (this.phase !== 'jeu' || !p || p.role !== 'impostor' || !p.alive) return { ok: false, error: 'Réservé aux imposteurs.' };
    if (now - p.lastVent < VENT_COOLDOWN_MS) return { ok: false, error: 'Trop rapide.' };

    if (!p.vented) {
      const v = this.vents.find((vv) => dist(p, vv) <= USE_RADIUS);
      if (!v) return { ok: false, error: 'Aucun conduit à portée.' };
      p.vented = v.id;
      p.lastVent = now;
      p.input = { dx: 0, dy: 0 };
      return { ok: true, vent: v.id };
    }
    const cur = this.vents.find((v) => v.id === p.vented);
    if (ventId === null) {                       // sortir
      p.vented = null;
      p.lastVent = now;
      return { ok: true, vent: null };
    }
    if (!cur.links.includes(ventId)) return { ok: false, error: 'Conduit non relié.' };
    const dest = this.vents.find((v) => v.id === ventId);
    p.vented = dest.id;
    p.x = dest.x; p.y = dest.y;
    p.lastVent = now;
    return { ok: true, vent: dest.id };
  }

  /* ------------------------ tâches ------------------------ */

  /** Début d'une étape : le Host vérifie la position ET chronomètre. */
  startTask(pid, taskId) {
    const p = this.playerOf(pid);
    if (!p || this.phase !== 'jeu') return { ok: false, error: 'Impossible maintenant.' };
    const t = p.tasks.find((tt) => tt.id === taskId);
    if (!t || t.fait) return { ok: false, error: 'Tâche inconnue ou terminée.' };
    const def = this.taskDef(taskId);
    const room = def.etapes[t.etape];
    if (this.roomOf(p) !== room) return { ok: false, error: `Il faut être en ${ROOMS.find((r) => r.id === room).nom}.` };
    p.step = { taskId, debut: this.now() };
    return { ok: true, mini: def.mini, duree: def.duree };
  }

  /** Fin d'étape : refusée si le joueur a bougé de salle ou a triché sur le temps. */
  finishTask(pid, taskId) {
    const p = this.playerOf(pid);
    if (!p || this.phase !== 'jeu') return { ok: false, error: 'Impossible maintenant.' };
    if (!p.step || p.step.taskId !== taskId) return { ok: false, error: 'Aucune tâche en cours.' };
    const t = p.tasks.find((tt) => tt.id === taskId);
    const def = this.taskDef(taskId);
    if (!t || t.fait) return { ok: false, error: 'Tâche déjà terminée.' };
    if (this.roomOf(p) !== def.etapes[t.etape]) { p.step = null; return { ok: false, error: 'Vous avez quitté la salle.' }; }
    // Garde-fou anti-triche : impossible de boucler une étape plus vite que sa durée.
    if (this.now() - p.step.debut < def.duree * 0.9) return { ok: false, error: 'Trop rapide pour être honnête.' };
    p.step = null;

    // Les tâches d'un imposteur sont FEINTES : elles avancent dans SA liste
    // (sinon il se trahirait) mais ne comptent jamais dans la barre.
    t.etape += 1;
    if (t.etape >= def.etapes.length) { t.fait = true; t.etape = def.etapes.length; }
    p.tasksVersion = (p.tasksVersion ?? 1) + 1;
    if (p.role === 'crewmate') this.checkWin();
    return { ok: true, fait: t.fait };
  }

  /* ------------------------ sabotages ------------------------ */

  sabotageAction(pid, type, room = null) {
    const p = this.playerOf(pid);
    const now = this.now();
    if (this.phase !== 'jeu') return { ok: false, error: 'Impossible maintenant.' };
    if (!p || p.role !== 'impostor' || !p.alive) return { ok: false, error: 'Réservé aux imposteurs.' };
    if (now < this.sabotageCooldownEnd) return { ok: false, error: 'Sabotage en recharge.' };

    if (type === 'portes') {
      if (!ROOMS.some((r) => r.id === room)) return { ok: false, error: 'Salle inconnue.' };
      this.doorsClosed = this.doorsClosed.filter((d) => d.until > now);
      this.doorsClosed.push({ room, until: now + DOOR_CLOSED_MS });
      this.evacuateDoors(room);
      this.sabotageCooldownEnd = now + SABOTAGE_COOLDOWN_MS;
      this.say(`🚪 Les portes de ${ROOMS.find((r) => r.id === room).nom} se verrouillent !`);
      return { ok: true };
    }
    if (this.sabotage) return { ok: false, error: 'Un sabotage est déjà en cours.' };

    if (type === 'lumieres') {
      this.sabotage = { type, until: null, fixes: {} };
      this.say('💡 Les lumières s\'éteignent !');
    } else if (type === 'communications') {
      this.sabotage = { type, until: null, fixes: {} };
      this.say('📡 Les communications sont coupées !');
    } else if (type === 'reacteur') {
      this.sabotage = { type, until: now + CRITICAL_MS, fixes: { A: 0, B: 0 } };
      this.say('☢️ FUSION DU RÉACTEUR — deux personnes, deux pupitres, vite !');
    } else if (type === 'o2') {
      this.sabotage = { type, until: now + CRITICAL_MS, fixes: { A: false, B: false } };
      this.say('🫁 Fuite d\'oxygène — deux codes à saisir !');
    } else {
      return { ok: false, error: 'Sabotage inconnu.' };
    }
    this.sabotageCooldownEnd = now + SABOTAGE_COOLDOWN_MS;
    return { ok: true };
  }

  /**
   * Une porte qui se verrouille sur quelqu'un le pousse d'un côté ou de l'autre :
   * sans cela, il resterait enfermé DANS la porte pendant dix secondes.
   */
  evacuateDoors(room) {
    const portes = this.doors[room];
    const surUnePorte = (p) => portes.some((c) => c.x === Math.floor(p.x) && c.y === Math.floor(p.y));
    for (const p of this.players) {
      if (!p.alive || p.vented || !surUnePorte(p)) continue;
      let best = null;
      let bestD = Infinity;
      for (let y = 1; y < ROWS - 1; y += 1) {
        for (let x = 1; x < COLS - 1; x += 1) {
          if (this.grid[y][x] !== 0) continue;
          if (portes.some((c) => c.x === x && c.y === y)) continue;
          const d = Math.hypot(x + 0.5 - p.x, y + 0.5 - p.y);
          if (d < bestD) { bestD = d; best = { x: x + 0.5, y: y + 0.5 }; }
        }
      }
      if (best) { p.x = best.x; p.y = best.y; }
    }
  }

  /**
   * Réparation. `pad` : 'A'/'B' pour le réacteur (maintien SIMULTANÉ) et l'O2
   * (deux codes, dans n'importe quel ordre).
   */
  fix(pid, pad = null) {
    const p = this.playerOf(pid);
    const now = this.now();
    if (!p || !p.alive || this.phase !== 'jeu' || !this.sabotage) return { ok: false, error: 'Rien à réparer.' };
    const s = this.sabotage;

    if (s.type === 'lumieres') {
      if (dist(p, this.stations.lights) > USE_RADIUS) return { ok: false, error: 'Panneau hors de portée.' };
      this.sabotage = null;
      this.say('💡 Les lumières se rallument.');
      return { ok: true };
    }
    if (s.type === 'communications') {
      if (dist(p, this.stations.comms) > USE_RADIUS) return { ok: false, error: 'Console hors de portée.' };
      this.sabotage = null;
      this.say('📡 Les communications sont rétablies.');
      return { ok: true };
    }
    if (s.type === 'reacteur') {
      if (pad !== 'A' && pad !== 'B') return { ok: false, error: 'Pupitre invalide.' };
      const st = pad === 'A' ? this.stations.reactorA : this.stations.reactorB;
      if (dist(p, st) > USE_RADIUS) return { ok: false, error: 'Pupitre hors de portée.' };
      s.fixes[pad] = now;
      // Les deux mains doivent être posées en même temps (fenêtre de 1 s).
      if (s.fixes.A && s.fixes.B && Math.abs(s.fixes.A - s.fixes.B) <= 1000) {
        this.sabotage = null;
        this.say('☢️ Réacteur stabilisé.');
        return { ok: true, fixed: true };
      }
      return { ok: true, fixed: false };
    }
    if (s.type === 'o2') {
      if (pad !== 'A' && pad !== 'B') return { ok: false, error: 'Console invalide.' };
      const st = pad === 'A' ? this.stations.o2A : this.stations.o2B;
      if (dist(p, st) > USE_RADIUS) return { ok: false, error: 'Console hors de portée.' };
      s.fixes[pad] = true;
      if (s.fixes.A && s.fixes.B) {
        this.sabotage = null;
        this.say('🫁 Oxygène rétabli.');
        return { ok: true, fixed: true };
      }
      return { ok: true, fixed: false };
    }
    return { ok: false, error: 'Rien à réparer.' };
  }

  get critique() { return this.sabotage && (this.sabotage.type === 'reacteur' || this.sabotage.type === 'o2'); }

  /* ------------------------ réunions & votes ------------------------ */

  report(pid, bodyId) {
    const p = this.playerOf(pid);
    if (this.phase !== 'jeu' || !p || !p.alive) return { ok: false, error: 'Impossible.' };
    const body = this.bodies.find((b) => b.id === bodyId);
    if (!body) return { ok: false, error: 'Aucun corps.' };
    if (dist(p, body) > REPORT_RADIUS) return { ok: false, error: 'Trop loin du corps.' };
    this.openMeeting(p, body);
    return { ok: true };
  }

  emergency(pid) {
    const p = this.playerOf(pid);
    if (this.phase !== 'jeu' || !p || !p.alive) return { ok: false, error: 'Impossible.' };
    if (this.critique) return { ok: false, error: 'Sabotage critique en cours !' };
    if (p.meetingsLeft <= 0) return { ok: false, error: 'Plus de réunion d\'urgence.' };
    if (dist(p, this.stations.emergency) > USE_RADIUS + 0.6) return { ok: false, error: 'Le bouton est en Cafétéria.' };
    p.meetingsLeft -= 1;
    this.openMeeting(p, null);
    return { ok: true };
  }

  openMeeting(by, body) {
    const now = this.now();
    this.phase = 'reunion';
    this.meeting = {
      byId: by.id,
      byName: by.pseudo,
      bodyName: body ? body.pseudo : null,
      etape: 'discussion',
      fin: now + this.options.tempsDiscussion,
      votes: {},
      resultat: null,
    };
    this.bodies = [];
    this.doorsClosed = [];
    // Un sabotage critique ne survit pas à une réunion (sinon il expire pendant le vote).
    if (this.critique) this.sabotage = null;
    for (const p of this.players) {
      p.input = { dx: 0, dy: 0 };
      p.step = null;
      p.vote = undefined;
      if (p.alive) { const a = this.rng() * Math.PI * 2; p.x = this.center.cafeteria.x + Math.cos(a) * 1.8; p.y = this.center.cafeteria.y + Math.sin(a) * 1.8; }
    }
    this.say(body ? `☠️ ${by.pseudo} signale le corps de ${body.pseudo} !` : `🚨 ${by.pseudo} convoque une réunion d'urgence !`);
    if (this.options.tempsDiscussion === 0) this.startVote();
  }

  startVote() {
    this.meeting.etape = 'vote';
    this.meeting.fin = this.now() + this.options.tempsVote;
  }

  castVote(pid, targetId) {
    const p = this.playerOf(pid);
    if (this.phase !== 'reunion' || !this.meeting) return { ok: false, error: 'Aucune réunion.' };
    if (this.meeting.etape !== 'vote') return { ok: false, error: 'La discussion n\'est pas terminée.' };
    if (!p || !p.alive) return { ok: false, error: 'Les fantômes ne votent pas.' };
    if (p.vote !== undefined) return { ok: false, error: 'Vous avez déjà voté.' };
    if (targetId !== 'skip') {
      const t = this.playerOf(targetId);
      if (!t || !t.alive) return { ok: false, error: 'Cible invalide.' };
    }
    p.vote = targetId;
    this.meeting.votes[pid] = targetId;
    if (this.players.filter((q) => q.alive).every((q) => q.vote !== undefined)) this.tally();
    return { ok: true };
  }

  tally() {
    const counts = {};
    for (const p of this.players) {
      if (!p.alive || p.vote === undefined) continue;
      counts[p.vote] = (counts[p.vote] ?? 0) + 1;
    }
    let best = null; let bestN = 0; let egalite = false;
    for (const [k, v] of Object.entries(counts)) {
      if (v > bestN) { best = k; bestN = v; egalite = false; }
      else if (v === bestN) egalite = true;
    }
    const ejecte = (!best || best === 'skip' || egalite) ? null : this.playerOf(best);
    if (ejecte) {
      ejecte.alive = false;
      ejecte.input = { dx: 0, dy: 0 };
      this.rosterVersion += 1;
    }
    this.meeting.resultat = {
      ejecteId: ejecte?.id ?? null,
      ejecteNom: ejecte?.pseudo ?? null,
      // « Confirmation d'éjection » : on dit ou non si c'était un imposteur.
      etaitImposteur: ejecte && this.options.confirmerEjection ? ejecte.role === 'impostor' : null,
      egalite: egalite && best !== null && best !== 'skip',
      skip: !ejecte,
      comptes: this.options.votesAnonymes
        ? Object.entries(counts).map(([k, v]) => ({ cible: k, n: v }))
        : Object.entries(counts).map(([k, v]) => ({
          cible: k, n: v,
          votants: this.players.filter((p) => p.vote === k).map((p) => p.id),
        })),
      restants: this.aliveImpostors.length,
    };
    this.say(ejecte
      ? `🗳️ ${ejecte.pseudo} est éjecté${this.options.confirmerEjection ? (ejecte.role === 'impostor' ? ' — c\'était un imposteur.' : ' — ce n\'était pas un imposteur.') : '.'}`
      : '🗳️ Personne n\'est éjecté.');
    this.meeting.etape = 'ejection';
    this.meeting.fin = this.now() + EJECT_ANIM_MS;
  }

  closeMeeting() {
    this.meeting = null;
    for (const p of this.players) { p.vote = undefined; p.killCooldownEnd = this.now() + this.options.killCooldown; }
    if (this.checkWin()) return;
    this.phase = 'jeu';
    this.sabotageCooldownEnd = this.now() + 5000;
  }

  /* ------------------------ victoire ------------------------ */

  checkWin() {
    if (this.phase === 'fin') return true;
    const imp = this.aliveImpostors.length;
    const crew = this.aliveCrew.length;
    const { ratio } = this.taskProgress();

    if (imp === 0) return this.end('crewmates', 'Tous les imposteurs ont été éjectés.');
    if (ratio >= 1) return this.end('crewmates', 'Toutes les tâches sont terminées.');
    if (imp >= crew) return this.end('impostors', 'Les imposteurs sont aussi nombreux que l\'équipage.');
    return false;
  }

  end(camp, raison) {
    this.phase = 'fin';
    this.meeting = null;
    const gagnants = this.players.filter((p) => (camp === 'impostors' ? p.role === 'impostor' : p.role === 'crewmate'));
    for (const p of gagnants) p.score += 1;
    this.result = {
      camp,
      raison,
      gagnants: gagnants.map((p) => ({ id: p.id, pseudo: p.pseudo })),
      imposteurs: this.impostors.map((p) => ({ id: p.id, pseudo: p.pseudo })),
    };
    this.say(camp === 'impostors' ? `😈 Victoire des imposteurs — ${raison}` : `👨‍🚀 Victoire de l'équipage — ${raison}`);
    return true;
  }

  summary() {
    const r = this.result;
    return {
      summary: r
        ? `${r.camp === 'impostors' ? '😈' : '👨‍🚀'} ${r.camp === 'impostors' ? 'Les imposteurs' : 'L\'équipage'} l'emportent — ${r.raison} (imposteurs : ${r.imposteurs.map((i) => i.pseudo).join(', ')})`
        : '🚀 Partie interrompue.',
      classement: this.players.map((p) => ({ id: p.id, pseudo: p.pseudo, score: p.score })),
      imposteurs: r?.imposteurs ?? [],
    };
  }

  /* ------------------------ boucle ------------------------ */

  tick() {
    const now = this.now();
    if (this.phase === 'jeu') {
      const dt = TICK_MS / 1000;
      for (const p of this.players) if (!p.vented) this.move(p, dt);
      this.doorsClosed = this.doorsClosed.filter((d) => d.until > now);
      // Sabotage critique arrivé à terme : victoire immédiate des imposteurs.
      if (this.critique && this.sabotage.until <= now) {
        this.end('impostors', this.sabotage.type === 'reacteur' ? 'Le réacteur a fondu.' : 'L\'oxygène est épuisé.');
      }
      return;
    }
    if (this.phase === 'reunion' && this.meeting) {
      if (now < this.meeting.fin) return;
      if (this.meeting.etape === 'discussion') this.startVote();
      else if (this.meeting.etape === 'vote') this.tally();
      else this.closeMeeting();
    }
  }

  /* ------------------------ chat ------------------------ */

  addChat(pid, text) {
    const p = this.playerOf(pid);
    const clean = String(text ?? '').trim().slice(0, 220);
    if (!p || !clean) return { ok: false, error: 'Message vide.' };
    this.chatSeq += 1;
    const msg = { seq: this.chatSeq, from: pid, pseudo: p.pseudo, couleur: p.couleur, text: clean, ts: this.now() };
    if (!p.alive) { this.deadChat.push(msg); if (this.deadChat.length > 80) this.deadChat.shift(); return { ok: true }; }
    // Les vivants ne parlent QUE pendant les réunions : c'est la règle du jeu.
    if (this.phase !== 'reunion') return { ok: false, error: 'On ne parle qu\'en réunion.' };
    this.chat.push(msg);
    if (this.chat.length > 120) this.chat.shift();
    return { ok: true };
  }

  handleAction(pid, a = {}) {
    switch (a.a) {
      case 'configure': return this.configure(pid, a.options);
      case 'start': return this.start(pid);
      case 'input': return this.setInput(pid, a);
      case 'kill': return this.kill(pid, a.target);
      case 'vent': return this.useVent(pid, a.vent ?? null);
      case 'task-start': return this.startTask(pid, a.task);
      case 'task-done': return this.finishTask(pid, a.task);
      case 'sabotage': return this.sabotageAction(pid, a.type, a.room ?? null);
      case 'fix': return this.fix(pid, a.pad ?? null);
      case 'report': return this.report(pid, a.body);
      case 'emergency': return this.emergency(pid);
      case 'vote': return this.castVote(pid, a.target);
      case 'chat': return this.addChat(pid, a.text);
      default: return { ok: false, error: 'Action inconnue.' };
    }
  }

  /* ====================== VUES (le nerf de la guerre) ====================== */

  visionOf(p) {
    if (p.role === 'impostor') return BASE_VISION * this.options.visionImposteur;
    const dark = this.sabotage?.type === 'lumieres' ? LIGHTS_FACTOR : 1;
    return BASE_VISION * this.options.visionCrew * dark;
  }

  /**
   * Vue personnalisée. Deux filtres, jamais contournables côté client :
   *  - RÔLES : seul le sien (+ ses complices s'il est imposteur ; tout, s'il est mort).
   *  - POSITIONS : seulement ce que sa vision atteint (rayon + ligne de vue).
   *    Un joueur dans un conduit n'apparaît nulle part.
   */
  /**
   * @param {object|null} sync ce que le destinataire possède DÉJÀ :
   *        { map, rosterVersion, chatSeq, logSeq, tasksVersion }. Sans lui : vue complète.
   *
   * La carte, la liste des salles, les consoles, le roster et l'historique du chat
   * ne changent pas dix fois par seconde. Les renvoyer à chaque image coûtait
   * ~590 Ko/s à dix joueurs — pour des données identiques.
   */
  getViewFor(pid, sync = null) {
    const me = this.playerOf(pid);
    const now = this.now();
    const prog = this.taskProgress();
    const barre = this.options.barreTaches;
    const montrerBarre = barre === 'toujours' || (barre === 'reunions' && this.phase === 'reunion');
    const aDejaLaCarte = sync && sync.map === this.mapVersion;
    const aDejaLesOptions = sync && sync.optionsVersion === this.optionsVersion;
    const aDejaLeRoster = sync && sync.rosterVersion === this.rosterVersion;
    const aDejaLesTaches = sync && me && sync.tasksVersion === me.tasksVersion;
    const depuisChat = sync ? (sync.chatSeq ?? 0) : 0;
    const depuisLog = sync ? (sync.logSeq ?? 0) : 0;

    const base = {
      phase: this.phase,
      optionsVersion: this.optionsVersion,
      options: aDejaLesOptions ? undefined : this.options,
      isHost: pid === this.hostId,
      // --- statique : envoyé une seule fois ---
      mapVersion: this.mapVersion,
      cols: aDejaLaCarte ? undefined : COLS,
      rows: aDejaLaCarte ? undefined : ROWS,
      grid: aDejaLaCarte ? undefined : this.grid.map((r) => r.join('')),
      rooms: aDejaLaCarte ? undefined : ROOMS,
      stations: aDejaLaCarte ? undefined : this.stations,
      // --- versionné : envoyé quand ça change ---
      rosterVersion: this.rosterVersion,
      roster: aDejaLeRoster ? undefined : this.players.map((p) => ({ id: p.id, pseudo: p.pseudo, couleur: p.couleur, alive: p.alive, score: p.score })),
      tasksVersion: me?.tasksVersion ?? 0,
      // --- dynamique ---
      doorsClosed: this.doorsClosed.filter((d) => d.until > now).map((d) => ({ room: d.room, tiles: this.doors[d.room] })),
      progress: montrerBarre ? { ratio: prog.ratio } : null,
      sabotage: this.sabotage
        ? { type: this.sabotage.type, reste: this.sabotage.until ? Math.max(0, this.sabotage.until - now) : null, fixes: this.sabotage.fixes }
        : null,
      t: this.now(),   // instant du calcul : la prédiction locale s'y recale
      chatSeq: this.chatSeq,
      logSeq: this.logSeq,
      log: this.log.filter((l) => l.seq > depuisLog),
      chat: this.chat.filter((m) => m.seq > depuisChat),
      deadChat: me && !me.alive ? this.deadChat.filter((m) => m.seq > depuisChat) : [],
      finalSummary: this.phase === 'fin' ? this.summary() : null,
    };

    if (!me || this.phase === 'setup' || this.phase === 'fin') {
      return { ...base, me: me ? this.selfOf(me, aDejaLesTaches) : null, visibles: [], bodies: [], vents: [] };
    }

    // Réunion : tout le monde se voit (personne ne bouge, c'est l'écran de vote).
    if (this.phase === 'reunion') {
      const m = this.meeting;
      return {
        ...base,
        me: this.selfOf(me, aDejaLesTaches),
        meeting: {
          byName: m.byName,
          bodyName: m.bodyName,
          etape: m.etape,
          reste: Math.max(0, m.fin - now),
          aVote: Object.keys(m.votes).length,
          votants: this.players.filter((p) => p.alive).length,
          // Qui a voté (sans révéler pour qui) — le jeu le montre aussi.
          dejaVote: Object.keys(m.votes),
          monVote: me.vote,
          resultat: m.resultat,
        },
        visibles: this.players.map((p) => ({
          id: p.id, alive: p.alive,   // pseudo/couleur : dans le roster, pas dans chaque vue
          // Le rôle n'est révélé qu'à la fin, ou entre complices.
          role: this.roleVisibleFor(me, p),
        })),
        bodies: [], vents: [],
      };
    }

    // En jeu : filtrage par la vision.
    const vision = this.visionOf(me);
    const ghost = !me.alive;
    const visibles = [];
    for (const p of this.players) {
      if (p.id === me.id) continue;
      if (p.vented && !ghost) continue;                       // planqué : invisible pour tous
      if (!p.alive && !ghost) continue;                       // les fantômes ne sont vus que des fantômes
      const vu = ghost || (dist(me, p) <= vision && this.hasLOS(me, p));
      if (!vu) continue;
      visibles.push({
        id: p.id, alive: p.alive,   // pseudo/couleur : dans le roster, pas dans chaque vue
        x: p.x, y: p.y, vented: !!p.vented,
        role: this.roleVisibleFor(me, p),
      });
    }

    // Caméras et Administration : de l'information, mais il faut y être.
    let cameras = null;
    let admin = null;
    const commsHS = this.sabotage?.type === 'communications';
    if (me.alive && !commsHS && dist(me, this.stations.cameras) <= USE_RADIUS) {
      cameras = CAMERA_ROOMS.map((room) => ({
        room,
        joueurs: this.players.filter((p) => p.alive && !p.vented && this.roomOf(p) === room)
          .map((p) => ({ id: p.id, couleur: p.couleur, x: p.x, y: p.y })),
      }));
    }
    if (me.alive && !commsHS && dist(me, this.stations.admin) <= USE_RADIUS) {
      // La table d'Administration ne donne que des NOMBRES, jamais des identités.
      admin = ROOMS.map((r) => ({
        room: r.id,
        n: this.players.filter((p) => p.alive && !p.vented && this.roomOf(p) === r.id).length,
      })).filter((r) => r.n > 0);
    }

    return {
      ...base,
      me: this.selfOf(me, aDejaLesTaches),
      ghost,
      visibles,
      bodies: this.bodies
        .filter((b) => ghost || (dist(me, b) <= vision && this.hasLOS(me, b)))
        .map((b) => ({ id: b.id, pseudo: b.pseudo, couleur: b.couleur, x: b.x, y: b.y })),
      // Les conduits ne sont affichés qu'aux imposteurs (les autres n'ont pas à savoir où ils sont).
      vents: me.role === 'impostor' ? this.vents.map((v) => ({ id: v.id, x: v.x, y: v.y, links: v.links, room: v.room })) : [],
      vision,
      commsHS: !!commsHS,
      cameras,
      admin,
      canReport: me.alive ? this.bodies.filter((b) => dist(me, b) <= REPORT_RADIUS).map((b) => b.id) : [],
      canEmergency: me.alive && me.meetingsLeft > 0 && !this.critique
        && dist(me, this.stations.emergency) <= USE_RADIUS + 0.6,
    };
  }

  /** Le rôle d'autrui : jamais, sauf complices imposteurs, fantômes, ou fin de partie. */
  roleVisibleFor(me, other) {
    if (me.id === other.id) return other.role;
    if (this.phase === 'fin') return other.role;
    if (!me.alive) return other.role;                                   // les fantômes savent tout
    if (me.role === 'impostor' && other.role === 'impostor') return 'impostor';
    return null;
  }

  selfOf(p, sansTaches = false) {
    const now = this.now();
    // `speed` sert à la prédiction locale de l'invité (0 = immobilisé : réunion, conduit).
    const speed = this.speedOf(p);
    return {
      id: p.id, pseudo: p.pseudo, couleur: p.couleur, role: p.role, alive: p.alive,
      x: p.x, y: p.y, vented: p.vented,
      room: this.roomOf(p),
      meetingsLeft: p.meetingsLeft,
      killReste: p.role === 'impostor' ? Math.max(0, p.killCooldownEnd - now) : null,
      sabotageReste: p.role === 'impostor' ? Math.max(0, this.sabotageCooldownEnd - now) : null,
      step: p.step,
      speed,
      inputTs: p.inputTs ?? null, inputAt: p.inputAt ?? null,
      // La liste ne bouge qu'aux validations : inutile de la renvoyer 10 fois/s.
      tasks: sansTaches ? undefined : p.tasks.map((t) => {
        const def = this.taskDef(t.id);
        return {
          id: t.id, nom: def.nom, mini: def.mini, long: def.long,
          etape: t.etape, total: def.etapes.length, fait: t.fait,
          salle: t.fait ? null : def.etapes[t.etape],
          salleNom: t.fait ? null : ROOMS.find((r) => r.id === def.etapes[t.etape]).nom,
          duree: def.duree,
        };
      }),
      // La cible à portée de kill : calculée par le Host, jamais devinée par le client.
      cible: p.role === 'impostor' && p.alive && !p.vented && now >= p.killCooldownEnd
        ? (this.players.find((q) => q.alive && q.role === 'crewmate' && !q.vented
          && dist(p, q) <= KILL_DIST[this.options.killDistance])?.id ?? null)
        : null,
      ventIci: p.role === 'impostor' && p.alive
        ? (p.vented ?? this.vents.find((v) => dist(p, v) <= USE_RADIUS)?.id ?? null)
        : null,
      ventLinks: p.vented ? this.vents.find((v) => v.id === p.vented).links : [],
    };
  }
}

export const COLORS = Object.freeze([
  '#c51111', '#132ed1', '#117f2d', '#ed54ba', '#ef7d0d', '#f5f557',
  '#3f474e', '#d6e0f0', '#6b2fbb', '#71491e', '#38fedc', '#50ef39',
  '#6b3fa0', '#ffd6ec', '#8b5a2b',
]);
