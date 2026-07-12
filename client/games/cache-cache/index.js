/**
 * Cache-Cache — module de jeu pour la plateforme Arcade.
 *
 * Architecture « Host autoritaire » (identique au module Tarot) :
 *  - Le client du Host exécute le moteur de règles (CacheCacheEngine) :
 *    rotation du Chasseur, phases chronométrées, résolution des recherches.
 *    Les choix de carte/forme/position ne quittent JAMAIS le Host tels quels :
 *    chaque joueur reçoit une vue personnalisée (getViewFor) qui ne contient
 *    que ce que ce joueur a le droit de voir.
 *  - Les autres clients envoient leurs actions au Host via context.sendMessage
 *    (relais game:message du moteur, qui ne lit jamais le contenu) et
 *    reçoivent en retour une vue ciblée (jamais de diffusion publique brute).
 *  - Chat en jeu : même relais générique, diffusion à tout le salon (comme
 *    dans le module Memory), indépendant du moteur de règles.
 *
 * Règles implémentées (2 à 8 joueurs) :
 *  - Chaque joueur est Chasseur exactement une fois (ordre tiré au sort en
 *    début de partie) ; une manche = un Chasseur qui recherche tous les
 *    autres joueurs. Partie terminée quand tout le monde a chassé.
 *  - Manche : (1) Choix de carte (30 s, cacheurs uniquement, privé),
 *    (2) Cache (30 s, cacheurs uniquement, choix/personnalisation d'une
 *    forme + position, verrouillage privé), (3) Chasse (30 s par carte,
 *    ordre aléatoire, clic = -3 s de pénalité, indice de proximité en cas
 *    d'échec, +1 point au Chasseur en cas de réussite ou au cacheur si le
 *    temps s'écoule).
 *  - Confidentialité stricte : le Chasseur ne voit que la carte de fond de
 *    la cible en cours (jamais la forme ni sa position) ; les autres
 *    cacheurs en attente ne voient qu'un statut générique.
 *  - Fin de partie : classement par points (égalité partagée), retour au
 *    salon automatique (bouton Host « Terminer la partie », comme Tarot).
 */

/* ====================================================================== */
/* Constantes                                                             */
/* ====================================================================== */

const MAPS_COUNT = 10;
const SHAPES_COUNT = 10;
const PICK_MAP_MS = 30_000;
const HIDE_MS = 30_000;
const HUNT_MS = 30_000;
const CLICK_PENALTY_MS = 3_000;
const TRANSITION_MS = 1_800;
const ROUND_RECAP_MS = 3_200;
const SCALE_MIN = 0.7;
const SCALE_MAX = 1.3;
const HIT_RADIUS_BASE = 0.045; // rayon de succès, en fraction de la carte (avant application de l'échelle)

// Les assets sont servis à côté de ce module. Chemin ABSOLU obligatoire : un
// chemin relatif dans une url() CSS ou un src d'image se résout par rapport à
// l'URL de la PAGE (la SPA, servie à la racine), pas à celle du module → 404.
const ASSETS_BASE = '/games/cache-cache/assets';
const MAP_SRC = (id) => `${ASSETS_BASE}/maps/${id}.png`;
const SHAPE_SRC = (id) => `${ASSETS_BASE}/formes/${id}.png`;

/** Dégradé de proximité (du plus proche au plus loin), triés par distance croissante. */
const PROXIMITY_LEVELS = Object.freeze([
  { upTo: 0.06, color: '#ff2d2d', label: 'Brûlant' },
  { upTo: 0.12, color: '#ff8c1a', label: 'Très proche' },
  { upTo: 0.22, color: '#ffd93d', label: 'Proche' },
  { upTo: 0.35, color: '#4ade80', label: 'Moyen' },
  { upTo: 0.50, color: '#22d3ee', label: 'Plus proche' },
  { upTo: 0.70, color: '#3b82f6', label: 'Loin' },
  { upTo: Infinity, color: '#bfe4ff', label: 'Très loin' },
]);

const STATUS_LABEL = { choosing: 'Choisit sa carte…', hiding: 'Se cache…', ready: 'Prêt·e ✅' };

const clamp01 = (v) => Math.min(1, Math.max(0, v));

/* ====================================================================== */
/* Moteur de règles (pur : aucune dépendance DOM/réseau, pas de setTimeout) */
/* ====================================================================== */

export class CacheCacheEngine {
  /** @param {{id: string, pseudo: string}[]} players 2 à 8 joueurs, ordre fixe. */
  constructor(players, { rng = Math.random } = {}) {
    if (players.length < 2 || players.length > 8) {
      throw new Error('Le Cache-Cache se joue à 2 à 8 joueurs sur cette plateforme.');
    }
    this.players = players.map((p) => ({ id: p.id, pseudo: p.pseudo }));
    this.n = this.players.length;
    this.rng = rng;
    this.totals = Object.fromEntries(this.players.map((p) => [p.id, 0]));
    this.log = [];
    this.finPartie = null;

    this.huntOrder = this.shuffle(this.players.map((p) => p.id));
    this.huntedSet = new Set();
    this.roundNumber = 0;
    this.hunterId = null;
    this.hiders = [];
    this.selections = new Map();
    this.phase = 'pick-map'; // 'pick-map' | 'hide' | 'hunt' | 'round-end' | 'fin-partie'
    this.phaseDeadline = null;
    this.currentTarget = null;
    this.huntQueue = null;
    this.huntIndex = -1;
    this.roundRecap = null;
  }

  /* ------------------------------ utilitaires ------------------------ */

  say(message) {
    this.log.push(message);
    if (this.log.length > 60) this.log.shift();
  }

  pseudoOf(id) { return this.players.find((p) => p.id === id)?.pseudo ?? '?'; }

  shuffle(arr) {
    const d = [...arr];
    for (let i = d.length - 1; i > 0; i -= 1) {
      const j = Math.floor(this.rng() * (i + 1));
      [d[i], d[j]] = [d[j], d[i]];
    }
    return d;
  }

  /* ------------------------------ manches ----------------------------- */

  /** Démarre la manche suivante (le prochain joueur qui n'a pas encore chassé). */
  startRound() {
    if (this.huntedSet.size >= this.n) return { ok: false, error: 'Tous les joueurs ont déjà chassé.' };
    const hunterId = this.huntOrder.find((id) => !this.huntedSet.has(id));
    this.roundNumber += 1;
    this.hunterId = hunterId;
    this.hiders = this.players.map((p) => p.id).filter((id) => id !== hunterId);
    this.selections = new Map(this.hiders.map((id) => [id, {
      mapId: null, shapeId: null, x: null, y: null, scale: null, rotation: null, locked: false, status: 'choosing',
    }]));
    this.phase = 'pick-map';
    this.phaseDeadline = Date.now() + PICK_MAP_MS;
    this.currentTarget = null;
    this.huntQueue = null;
    this.huntIndex = -1;
    this.roundRecap = null;
    this.say(`🙈 Manche ${this.roundNumber}/${this.n} — ${this.pseudoOf(hunterId)} est le Chasseur !`);
    return { ok: true };
  }

  /* ------------------------------ choix de carte ----------------------- */

  pickMap(playerId, mapId) {
    if (this.phase !== 'pick-map') return { ok: false, error: 'Ce n\'est pas le moment de choisir une carte.' };
    if (!this.hiders.includes(playerId)) return { ok: false, error: 'Le Chasseur ne choisit pas de carte.' };
    mapId = Number(mapId);
    if (!Number.isInteger(mapId) || mapId < 1 || mapId > MAPS_COUNT) return { ok: false, error: 'Carte invalide.' };

    this.selections.get(playerId).mapId = mapId;
    if (this.hiders.every((id) => this.selections.get(id).mapId != null)) this.beginHide();
    return { ok: true };
  }

  beginHide() {
    this.phase = 'hide';
    this.phaseDeadline = Date.now() + HIDE_MS;
    for (const id of this.hiders) {
      const sel = this.selections.get(id);
      sel.status = 'hiding';
      if (sel.mapId == null) sel.mapId = 1 + Math.floor(this.rng() * MAPS_COUNT);
    }
    this.say('🎭 Phase de cache : choisissez et placez votre forme, puis verrouillez-la.');
    return { ok: true };
  }

  /** Auto-attribution d'une carte aux cacheurs qui n'ont pas choisi à temps. */
  forceAdvanceFromPickMap() {
    if (this.phase !== 'pick-map') return { ok: false, error: 'Rien à forcer.' };
    for (const id of this.hiders) {
      const sel = this.selections.get(id);
      if (sel.mapId == null) sel.mapId = 1 + Math.floor(this.rng() * MAPS_COUNT);
    }
    this.say('⌛ Temps écoulé pour le choix de carte — attribution automatique aux retardataires.');
    this.beginHide();
    return { ok: true };
  }

  /* ------------------------------ cache -------------------------------- */

  placeShape(playerId, { shapeId, x, y, scale, rotation }) {
    if (this.phase !== 'hide') return { ok: false, error: 'Ce n\'est pas le moment de se cacher.' };
    if (!this.hiders.includes(playerId)) return { ok: false, error: 'Le Chasseur ne se cache pas.' };
    const sel = this.selections.get(playerId);
    if (sel.locked) return { ok: false, error: 'Votre cachette est déjà verrouillée.' };

    shapeId = Number(shapeId);
    if (!Number.isInteger(shapeId) || shapeId < 1 || shapeId > SHAPES_COUNT) return { ok: false, error: 'Forme invalide.' };
    const nx = clamp01(Number(x));
    const ny = clamp01(Number(y));
    if (Number.isNaN(nx) || Number.isNaN(ny)) return { ok: false, error: 'Position invalide.' };
    const nscale = Math.min(SCALE_MAX, Math.max(SCALE_MIN, Number(scale) || 1));
    const nrot = ((Number(rotation) || 0) % 360 + 360) % 360;

    sel.shapeId = shapeId; sel.x = nx; sel.y = ny; sel.scale = nscale; sel.rotation = nrot;
    return { ok: true };
  }

  lockShape(playerId) {
    if (this.phase !== 'hide') return { ok: false, error: 'Ce n\'est pas le moment de verrouiller.' };
    const sel = this.selections.get(playerId);
    if (!sel) return { ok: false, error: 'Le Chasseur ne se cache pas.' };
    if (sel.locked) return { ok: false, error: 'Déjà verrouillé.' };
    if (sel.shapeId == null) return { ok: false, error: 'Choisissez et placez une forme avant de verrouiller.' };

    sel.locked = true;
    sel.status = 'ready';
    this.say(`🔒 ${this.pseudoOf(playerId)} a verrouillé sa cachette.`);
    if (this.hiders.every((id) => this.selections.get(id).locked)) this.beginHunt();
    return { ok: true };
  }

  /** Auto-verrouillage (forme + position aléatoires) pour les retardataires. */
  forceAdvanceFromHide() {
    if (this.phase !== 'hide') return { ok: false, error: 'Rien à forcer.' };
    for (const id of this.hiders) {
      const sel = this.selections.get(id);
      if (sel.locked) continue;
      if (sel.shapeId == null) sel.shapeId = 1 + Math.floor(this.rng() * SHAPES_COUNT);
      if (sel.x == null) { sel.x = 0.3 + this.rng() * 0.4; sel.y = 0.3 + this.rng() * 0.4; }
      if (sel.scale == null) sel.scale = 1;
      if (sel.rotation == null) sel.rotation = 0;
      sel.locked = true;
      sel.status = 'ready';
    }
    this.say('⌛ Temps écoulé pour la cache — verrouillage automatique des retardataires.');
    this.beginHunt();
    return { ok: true };
  }

  /* ------------------------------ chasse -------------------------------- */

  beginHunt() {
    this.phase = 'hunt';
    this.huntQueue = this.shuffle([...this.hiders]);
    this.huntIndex = -1;
    this.say(`🔦 Chasse ! ${this.pseudoOf(this.hunterId)} part en recherche (ordre aléatoire).`);
    return this.nextHuntTarget();
  }

  nextHuntTarget() {
    this.huntIndex += 1;
    if (this.huntIndex >= this.huntQueue.length) {
      this.endHuntRound();
      return { ok: true, roundOver: true };
    }
    const hiderId = this.huntQueue[this.huntIndex];
    const sel = this.selections.get(hiderId);
    this.currentTarget = {
      hiderId, mapId: sel.mapId, shapeId: sel.shapeId, x: sel.x, y: sel.y, scale: sel.scale, rotation: sel.rotation,
      deadline: Date.now() + HUNT_MS, clicks: 0, lastClick: null, resolved: false, resultFlash: null,
    };
    this.say(`🗺️ ${this.pseudoOf(this.hunterId)} explore la carte de ${this.pseudoOf(hiderId)}.`);
    return { ok: true };
  }

  endHuntRound() {
    this.huntedSet.add(this.hunterId);
    this.currentTarget = null;
    this.phase = 'round-end';
    this.roundRecap = {
      hunterId: this.hunterId, hunterName: this.pseudoOf(this.hunterId), roundNumber: this.roundNumber,
      scores: { ...this.totals },
    };
    this.say(`✅ Fin de la manche ${this.roundNumber} — tout le monde a été recherché.`);
  }

  huntClick(playerId, x, y) {
    if (this.phase !== 'hunt') return { ok: false, error: 'Ce n\'est pas le moment de chercher.' };
    if (playerId !== this.hunterId) return { ok: false, error: 'Vous n\'êtes pas le Chasseur.' };
    const target = this.currentTarget;
    if (!target || target.resolved) return { ok: false, error: 'Rien à chercher pour le moment.' };

    const nx = clamp01(Number(x));
    const ny = clamp01(Number(y));
    if (Number.isNaN(nx) || Number.isNaN(ny)) return { ok: false, error: 'Position de clic invalide.' };

    target.clicks += 1;
    target.deadline -= CLICK_PENALTY_MS; // chaque clic coûte 3 secondes

    const dx = nx - target.x; const dy = ny - target.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const hitRadius = HIT_RADIUS_BASE * target.scale;

    if (dist <= hitRadius) {
      target.resolved = true;
      target.resultFlash = { type: 'hit', hiderId: target.hiderId };
      target.lastClick = { x: nx, y: ny, color: '#ff2d2d', label: 'Trouvé !' };
      this.totals[playerId] += 1;
      this.say(`🎯 ${this.pseudoOf(playerId)} trouve ${this.pseudoOf(target.hiderId)} !`);
      return { ok: true, hit: true };
    }

    const level = PROXIMITY_LEVELS.find((l) => dist <= l.upTo);
    target.lastClick = { x: nx, y: ny, color: level.color, label: level.label };
    return { ok: true, hit: false, proximity: { color: level.color, label: level.label } };
  }

  /** Résolution d'une cible dont le temps est écoulé (appelé par la couche Host). */
  resolveTimeout() {
    if (this.phase !== 'hunt') return { ok: false, error: 'Rien à résoudre.' };
    const target = this.currentTarget;
    if (!target || target.resolved) return { ok: false, error: 'Rien à résoudre.' };
    target.resolved = true;
    target.resultFlash = { type: 'timeout', hiderId: target.hiderId };
    this.totals[target.hiderId] += 1;
    this.say(`⏱️ Temps écoulé : ${this.pseudoOf(target.hiderId)} n'a pas été trouvé(e) (+1 point).`);
    return { ok: true };
  }

  /* ------------------------------ fin de partie ------------------------- */

  endMatch() {
    const classement = [...this.players]
      .map((p) => ({ id: p.id, pseudo: p.pseudo, score: this.totals[p.id] }))
      .sort((a, b) => b.score - a.score);
    this.finPartie = { classement };
    this.phase = 'fin-partie';
    const top = classement[0]?.score ?? 0;
    const gagnants = classement.filter((p) => p.score === top).map((p) => p.pseudo);
    this.say(gagnants.length > 1
      ? `🏆 Égalité entre ${gagnants.join(', ')} avec ${top} point(s) !`
      : `🏆 ${gagnants[0]} gagne avec ${top} point(s) !`);
    return {
      summary: gagnants.length > 1
        ? `🙈 Cache-Cache terminé — égalité entre ${gagnants.join(', ')} (${top} pts).`
        : `🙈 Cache-Cache terminé — ${gagnants[0]} gagne avec ${top} pts.`,
      classement,
      manches: this.roundNumber,
    };
  }

  /* ------------------------------ actions & vues ------------------------ */

  handleAction(playerId, action = {}) {
    switch (action.a) {
      case 'pickMap': return this.pickMap(playerId, action.mapId);
      case 'place': return this.placeShape(playerId, action);
      case 'lock': return this.lockShape(playerId);
      case 'huntClick': return this.huntClick(playerId, action.x, action.y);
      default: return { ok: false, error: 'Action inconnue.' };
    }
  }

  /** Vue publique + privée de la chasse en cours, adaptée au rôle du destinataire. */
  buildHuntView(playerId) {
    const t = this.currentTarget;
    if (!t) return null;
    const common = {
      hiderId: t.hiderId, hiderName: this.pseudoOf(t.hiderId),
      deadline: t.deadline, clicks: t.clicks, resolved: t.resolved, resultFlash: t.resultFlash,
      lastClickColor: t.lastClick?.color ?? null, lastClickLabel: t.lastClick?.label ?? null,
      huntIndex: this.huntIndex, huntTotal: this.huntQueue?.length ?? 0,
    };
    if (playerId === this.hunterId) {
      return { ...common, role: 'hunter', mapId: t.mapId, lastClick: t.lastClick };
    }
    if (playerId === t.hiderId) {
      return {
        ...common, role: 'owner', mapId: t.mapId, shapeId: t.shapeId,
        x: t.x, y: t.y, scale: t.scale, rotation: t.rotation, lastClick: t.lastClick,
      };
    }
    return { ...common, role: 'bystander' };
  }

  /** Vue personnalisée : état public + ce que CE joueur a le droit de voir (jamais plus). */
  getViewFor(playerId) {
    const isHunter = playerId === this.hunterId;
    const isHider = this.hiders.includes(playerId);

    const view = {
      phase: this.phase,
      round: this.roundNumber,
      totalRounds: this.n,
      hunterId: this.hunterId,
      hunterName: this.hunterId ? this.pseudoOf(this.hunterId) : null,
      isHunter,
      isHider,
      players: this.players.map((p) => ({
        id: p.id, pseudo: p.pseudo, score: this.totals[p.id],
        isHunter: p.id === this.hunterId, hasHunted: this.huntedSet.has(p.id),
      })),
      phaseDeadline: this.phase === 'pick-map' || this.phase === 'hide' ? this.phaseDeadline
        : this.phase === 'hunt' && this.currentTarget ? this.currentTarget.deadline : null,
      mapsCount: MAPS_COUNT,
      shapesCount: SHAPES_COUNT,
      scaleRange: [SCALE_MIN, SCALE_MAX],
      clickPenaltyMs: CLICK_PENALTY_MS,
      proximityLevels: PROXIMITY_LEVELS.map(({ color, label }) => ({ color, label })),
      finPartie: this.finPartie,
      log: this.log.slice(-25),
    };

    if (this.phase === 'pick-map' || this.phase === 'hide') {
      view.hiderStatuses = this.hiders.map((id) => ({ id, pseudo: this.pseudoOf(id), status: this.selections.get(id).status }));
      if (isHider) view.mySelection = { ...this.selections.get(playerId) };
    }

    if (this.phase === 'hunt') view.hunt = this.buildHuntView(playerId);
    if (this.phase === 'round-end') view.roundRecap = this.roundRecap;

    return view;
  }
}

/* ====================================================================== */
/* Interface (rendu pur à partir de la vue reçue)                         */
/* ====================================================================== */

const CSS = `
.cachecache { display: grid; grid-template-columns: 1fr 300px; gap: 14px; height: 100%; min-height: 0; color: var(--text, #e8ecff); font-size: 0.95rem; width: 100%; }
.cachecache__main { display: flex; flex-direction: column; gap: 12px; min-width: 0; min-height: 0; }
.cachecache__panel { background: var(--glass, rgba(255,255,255,0.05)); border: 1px solid var(--glass-border, rgba(255,255,255,0.09)); border-radius: var(--radius-m, 14px); padding: 12px 14px; }
.cachecache__bar { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; }
.cachecache__bar .sep { opacity: 0.4; }
.cachecache__timer { margin-left: auto; color: var(--accent-2, #29d3c2); font-weight: 700; font-variant-numeric: tabular-nums; }
.cachecache__legend { display: flex; gap: 6px; flex-wrap: wrap; align-items: center; font-size: 0.72rem; color: var(--text-dim, #aab); }
.cachecache__legend .sw { display: inline-block; width: 10px; height: 10px; border-radius: 50%; margin-right: 3px; vertical-align: middle; }
.cachecache__lastclick { display: flex; align-items: center; gap: 6px; font-size: 0.8rem; }
.cachecache__lastclick .sw { width: 16px; height: 16px; border-radius: 50%; border: 1px solid rgba(255,255,255,0.3); }
.ccstage-wrap { flex: 1; display: flex; align-items: center; justify-content: center; min-height: 320px; }
.ccstage { position: relative; width: min(100%, 620px); aspect-ratio: 1 / 1; border-radius: 14px; overflow: hidden; border: 1px solid rgba(255,255,255,0.14); background-size: cover; background-position: center; cursor: crosshair; touch-action: none; outline-offset: 3px; }
.ccstage:focus-visible { outline: 2px solid var(--accent-2, #29d3c2); }
.ccstage--disabled { cursor: default; }
.ccshape { position: absolute; pointer-events: none; filter: drop-shadow(0 6px 14px rgba(0,0,0,0.5)); }
.ccshape img { width: 100%; height: 100%; object-fit: contain; display: block; }
.cccursor { position: absolute; width: 22px; height: 22px; border: 2px solid #fff; border-radius: 50%; transform: translate(-50%, -50%); pointer-events: none; box-shadow: 0 0 0 2px rgba(0,0,0,0.5); }
.ccclick { position: absolute; width: 26px; height: 26px; border-radius: 50%; transform: translate(-50%, -50%); pointer-events: none; border: 2px solid rgba(255,255,255,0.85); }
.ccflash { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; flex-direction: column; gap: 8px; background: rgba(10,12,20,0.72); font-size: 1.3rem; font-weight: 700; text-align: center; padding: 12px; }
.ccgrid { display: grid; grid-template-columns: repeat(auto-fill, minmax(84px, 1fr)); gap: 8px; }
.ccthumb { position: relative; border-radius: 10px; overflow: hidden; border: 2px solid transparent; background-size: cover; background-position: center; aspect-ratio: 1/1; cursor: pointer; padding: 0; }
.ccthumb--selected { border-color: var(--accent-2, #29d3c2); }
.ccthumb--shape { background-color: rgba(255,255,255,0.04); background-size: 70%; background-repeat: no-repeat; background-position: center; }
.cachecache__actions { display: flex; gap: 10px; flex-wrap: wrap; align-items: center; justify-content: center; }
.cachecache__sliders { display: flex; gap: 18px; flex-wrap: wrap; align-items: center; justify-content: center; font-size: 0.82rem; }
.cachecache__sliders label { display: flex; flex-direction: column; gap: 4px; align-items: center; }
.cachecache__waiting { display: flex; flex-direction: column; gap: 10px; align-items: center; justify-content: center; text-align: center; padding: 24px 10px; }
.cachecache__hiderlist { display: flex; flex-direction: column; gap: 4px; width: 100%; max-width: 360px; }
.cachecache__hiderlist div { display: flex; justify-content: space-between; padding: 4px 8px; border-radius: 8px; background: rgba(255,255,255,0.04); font-size: 0.85rem; }
.cachecache__side { display: flex; flex-direction: column; gap: 12px; min-height: 0; overflow: auto; }
.cachecache__player { display: flex; align-items: center; gap: 8px; padding: 6px 4px; border-bottom: 1px solid rgba(255,255,255,0.06); }
.cachecache__player--hunter { color: var(--accent-2, #29d3c2); }
.cachecache__player .tag { font-size: 0.68rem; padding: 2px 6px; border-radius: 99px; background: rgba(124,92,255,0.25); }
.cachecache__player .pts { margin-left: auto; font-variant-numeric: tabular-nums; }
.cachecache__log { font-size: 0.8rem; color: var(--text-dim, #aab); max-height: 160px; overflow: auto; display: flex; flex-direction: column; gap: 4px; }
.cachecache__status { min-height: 1.2em; color: var(--warning, #ffb454); font-size: 0.85rem; text-align: center; }
.cachecache__chat { display: flex; flex-direction: column; gap: 8px; }
.cachecache__chatlist { display: flex; flex-direction: column; gap: 4px; max-height: 200px; overflow-y: auto; font-size: 0.82rem; }
.cachecache__chatmsg { line-height: 1.3; word-break: break-word; }
.cachecache__chatauthor { color: var(--accent-2, #29d3c2); font-weight: 600; }
.cachecache__chatrow { display: flex; gap: 6px; }
.cachecache__chatinput { flex: 1; min-width: 0; padding: 6px 8px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.16); background: rgba(255,255,255,0.04); color: inherit; font-family: inherit; font-size: 0.85rem; }
.cachecache table { width: 100%; border-collapse: collapse; font-size: 0.85rem; }
.cachecache td, .cachecache th { padding: 4px 8px; text-align: left; border-bottom: 1px solid rgba(255,255,255,0.07); }
@media (max-width: 1000px) { .cachecache { grid-template-columns: 1fr; } }
`;

/** Petite fabrique DOM locale (le module est autonome, sans import du cœur). */
function h(tag, props = {}, children = []) {
  const node = document.createElement(tag);
  Object.entries(props).forEach(([k, v]) => {
    if (v === undefined || v === null) return;
    if (k === 'className') node.className = v;
    else if (k === 'style') node.style.cssText = v;
    else if (k.startsWith('on')) node.addEventListener(k.slice(2).toLowerCase(), v);
    else node.setAttribute(k, v);
  });
  (Array.isArray(children) ? children : [children]).forEach((c) => {
    node.append(typeof c === 'string' ? document.createTextNode(c) : c);
  });
  return node;
}

function fmtSecs(msRemaining) {
  const s = Math.max(0, Math.ceil(msRemaining / 1000));
  return `${s}s`;
}

class CacheCacheUI {
  constructor(container, context) {
    this.container = container;
    this.ctx = context;
    this.isHost = context.me.id === context.hostId;
    this.engine = null;
    this.unsubscribe = null;
    this.cursor = { x: 0.5, y: 0.5 };
    this.chatLog = [];
    this.view = null;
    this.lastStageKey = null;
  }

  mount() {
    this.styleEl = h('style', {}, CSS);
    this.root = h('div', { className: 'cachecache' });
    this.container.append(this.styleEl, this.root);

    if (this.isHost) {
      try {
        this.engine = new CacheCacheEngine(this.ctx.players);
      } catch (error) {
        this.renderMessage(`⚠️ ${error.message}`);
        return;
      }
      this.unsubscribe = this.ctx.onMessage(({ from, data }) => this.handleIncoming(from, data));
      this.engine.startRound();
      this.broadcast();
      this.schedulePhaseTimer();
    } else {
      this.unsubscribe = this.ctx.onMessage(({ from, data }) => this.handleIncoming(from, data));
      this.renderMessage('⏳ Connexion à la partie du Host…');
    }

    this.tickInterval = setInterval(() => {
      if (this.view && (this.view.phaseDeadline || this.view.hunt?.deadline)) this.render(this.view);
    }, 1000);
  }

  handleIncoming(from, data) {
    if (!data) return;
    if (data.t === 'chat') { this.addChatMessage(data.message, { fromRemote: true }); return; }
    if (this.isHost) {
      if (data.t === 'action') this.hostHandle(from, data.action);
      return;
    }
    if (from !== this.ctx.hostId) return; // vues/erreurs de jeu : uniquement depuis le Host
    if (data.t === 'view') this.render(data.view);
    else if (data.t === 'error') this.setStatus(data.message);
  }

  /* -------- côté Host : moteur, minuteries et diffusion des vues -------- */

  hostHandle(playerId, action) {
    const result = this.engine.handleAction(playerId, action);
    if (!result.ok) {
      this.ctx.sendMessage({ t: 'error', message: result.error }, playerId);
      return;
    }
    this.broadcast();

    if (action.a === 'huntClick') {
      if (result.hit) { clearTimeout(this.huntTimer); this.scheduleTransition(); }
      else this.scheduleHuntTimer(); // le délai a changé (pénalité), on reprogramme
      return;
    }
    // pickMap / place / lock peuvent déclencher une transition de phase anticipée.
    this.schedulePhaseTimer();
  }

  act(action) {
    if (this.isHost) this.hostHandle(this.ctx.me.id, action);
    else this.ctx.sendMessage({ t: 'action', action }, this.ctx.hostId);
  }

  clearTimers() {
    clearTimeout(this.phaseTimer);
    clearTimeout(this.huntTimer);
    clearTimeout(this.transitionTimer);
    clearTimeout(this.endTimer);
  }

  schedulePhaseTimer() {
    clearTimeout(this.phaseTimer);
    clearTimeout(this.huntTimer);
    if (this.engine.phase === 'pick-map') {
      const delay = Math.max(0, this.engine.phaseDeadline - Date.now());
      this.phaseTimer = setTimeout(() => {
        this.engine.forceAdvanceFromPickMap();
        this.broadcast();
        this.schedulePhaseTimer();
      }, delay);
    } else if (this.engine.phase === 'hide') {
      const delay = Math.max(0, this.engine.phaseDeadline - Date.now());
      this.phaseTimer = setTimeout(() => {
        this.engine.forceAdvanceFromHide();
        this.broadcast();
        this.schedulePhaseTimer();
      }, delay);
    } else if (this.engine.phase === 'hunt') {
      this.scheduleHuntTimer();
    } else if (this.engine.phase === 'round-end') {
      this.phaseTimer = setTimeout(() => {
        if (this.engine.huntedSet.size >= this.engine.n) {
          this.finishMatch();
        } else {
          this.engine.startRound();
          this.broadcast();
          this.schedulePhaseTimer();
        }
      }, ROUND_RECAP_MS);
    }
  }

  scheduleHuntTimer() {
    clearTimeout(this.huntTimer);
    const target = this.engine.currentTarget;
    if (!target || target.resolved) return;
    const delay = Math.max(0, target.deadline - Date.now());
    this.huntTimer = setTimeout(() => {
      this.engine.resolveTimeout();
      this.broadcast();
      this.scheduleTransition();
    }, delay);
  }

  scheduleTransition() {
    clearTimeout(this.transitionTimer);
    this.transitionTimer = setTimeout(() => {
      this.engine.nextHuntTarget();
      this.broadcast();
      this.schedulePhaseTimer();
    }, TRANSITION_MS);
  }

  finishMatch() {
    const result = this.engine.endMatch();
    this.broadcast();
    this.endTimer = setTimeout(() => this.ctx.onEnd(result), 4500);
  }

  confirmEnd() {
    this.clearTimers();
    this.finishMatch();
  }

  broadcast() {
    for (const p of this.engine.players) {
      if (p.id === this.ctx.me.id) continue;
      this.ctx.sendMessage({ t: 'view', view: this.engine.getViewFor(p.id) }, p.id);
    }
    this.render(this.engine.getViewFor(this.ctx.me.id));
  }

  /* -------- chat (indépendant du moteur, diffusion façon Memory) -------- */

  sendChatMessage(text) {
    text = text.trim();
    if (!text) return;
    const message = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      playerId: this.ctx.me.id,
      pseudo: this.ctx.me.pseudo ?? '?',
      text: text.slice(0, 300),
      at: Date.now(),
    };
    this.addChatMessage(message, { fromRemote: false });
    this.ctx.sendMessage({ t: 'chat', message });
  }

  addChatMessage(message, { fromRemote } = {}) {
    if (fromRemote && message.playerId === this.ctx.me.id) return;
    this.chatLog.push(message);
    if (this.chatLog.length > 100) this.chatLog.shift();
    if (this.view) this.render(this.view);
  }

  /* -------- rendu -------- */

  setStatus(message) {
    if (!this.statusEl) return;
    this.statusEl.textContent = message ?? '';
    clearTimeout(this.statusTimer);
    this.statusTimer = setTimeout(() => { if (this.statusEl) this.statusEl.textContent = ''; }, 3500);
  }

  renderMessage(text) {
    this.root.replaceChildren(h('div', { className: 'cachecache__panel', style: 'margin:auto;' }, text));
  }

  resetCursorForStage(key, initial) {
    if (this.lastStageKey !== key) {
      this.lastStageKey = key;
      this.cursor = initial ?? { x: 0.5, y: 0.5 };
    }
  }

  render(view) {
    this.view = view;

    const bar = this.renderBar(view);
    const main = h('div', { className: 'cachecache__panel' });
    this.statusEl = h('div', { className: 'cachecache__status' });

    if (view.phase === 'pick-map') main.append(...this.renderPickMap(view));
    else if (view.phase === 'hide') main.append(...this.renderHide(view));
    else if (view.phase === 'hunt') main.append(...this.renderHunt(view));
    else if (view.phase === 'round-end') main.append(...this.renderRoundEnd(view));
    else if (view.phase === 'fin-partie') main.append(...this.renderFinPartie(view));

    const side = h('div', { className: 'cachecache__side' }, [
      h('div', { className: 'cachecache__panel' }, [
        h('strong', {}, '🏆 Scores'),
        ...view.players.map((p) => h('div', { className: `cachecache__player${p.isHunter ? ' cachecache__player--hunter' : ''}` }, [
          h('span', {}, p.pseudo),
          ...(p.isHunter ? [h('span', { className: 'tag' }, 'Chasseur')] : []),
          ...(p.hasHunted && !p.isHunter ? [h('span', { className: 'tag' }, 'A chassé')] : []),
          h('span', { className: 'pts' }, `${p.score} pt${p.score > 1 ? 's' : ''}`),
        ])),
      ]),
      h('div', { className: 'cachecache__panel' }, [
        h('strong', {}, 'Mon statut'),
        h('div', { style: 'margin-top:6px;font-size:0.85rem;color:var(--text-dim,#aab);' }, this.myStatusText(view)),
      ]),
      this.renderChatPanel(),
      h('div', { className: 'cachecache__panel' }, [
        h('strong', {}, 'Historique'),
        h('div', { className: 'cachecache__log' }, [...view.log].reverse().map((l) => h('div', {}, l))),
      ]),
      ...(this.isHost && view.phase !== 'fin-partie'
        ? [h('button', { className: 'btn btn--ghost btn--small', onClick: () => this.confirmEnd() }, '🛑 Terminer la partie')]
        : []),
    ]);

    this.root.replaceChildren(h('div', { className: 'cachecache__main' }, [bar, main, this.statusEl]), side);
  }

  myStatusText(view) {
    if (view.phase === 'fin-partie') return 'Partie terminée.';
    if (view.isHunter) return '🔦 Vous êtes le Chasseur ce tour-ci.';
    if (view.phase === 'hunt' && view.hunt?.role === 'owner') return '👀 On fouille votre carte en ce moment !';
    if (view.isHider) {
      const sel = view.mySelection;
      if (sel?.locked) return '🔒 Cachette verrouillée, en attente des autres.';
      if (view.phase === 'hide') return '🎭 Choisissez et placez votre forme.';
      if (view.phase === 'pick-map') return '🗺️ Choisissez votre carte.';
    }
    return 'En attente…';
  }

  renderBar(view) {
    const nodes = [
      h('strong', {}, `🙈 Cache-Cache — manche ${view.round || '—'}/${view.totalRounds}`),
      h('span', { className: 'sep' }, '·'),
      h('span', {}, `Chasseur : ${view.hunterName ?? '—'}`),
    ];
    if (view.phase === 'hunt' && view.hunt) {
      nodes.push(
        h('span', { className: 'sep' }, '·'),
        h('span', {}, `Cible : ${view.hunt.hiderName} (${view.hunt.huntIndex + 1}/${view.hunt.huntTotal})`),
        h('span', { className: 'sep' }, '·'),
        h('span', {}, `Clics : ${view.hunt.clicks}`),
      );
    }
    const deadline = view.phaseDeadline;
    if (deadline) {
      nodes.push(h('span', { className: 'cachecache__timer' }, fmtSecs(deadline - Date.now())));
    }
    return h('div', { className: 'cachecache__panel cachecache__bar' }, nodes);
  }

  renderLegend(view) {
    return h('div', { className: 'cachecache__legend' }, [
      h('span', {}, `Chaque clic = -${Math.round((view.clickPenaltyMs ?? 3000) / 1000)}s ·`),
      ...(view.proximityLevels ?? []).slice().reverse().map((l) => h('span', {}, [
        h('span', { className: 'sw', style: `background:${l.color};` }),
        l.label,
      ])),
    ]);
  }

  renderLastClick(view) {
    if (!view.hunt?.lastClickColor) return h('div', {});
    return h('div', { className: 'cachecache__lastclick' }, [
      h('span', { className: 'sw', style: `background:${view.hunt.lastClickColor};` }),
      h('span', {}, view.hunt.lastClickLabel ?? ''),
    ]);
  }

  /* -------- phase 1 : choix de carte -------- */

  renderPickMap(view) {
    if (view.isHunter) return this.renderHunterWaiting(view, '🗺️ Les autres joueurs choisissent leur carte…');
    const sel = view.mySelection;
    const grid = h('div', { className: 'ccgrid' },
      Array.from({ length: view.mapsCount }, (_, i) => i + 1).map((id) => h('button', {
        type: 'button',
        className: `ccthumb${sel?.mapId === id ? ' ccthumb--selected' : ''}`,
        style: `background-image:url('${MAP_SRC(id)}');`,
        'aria-label': `Carte ${id}`,
        'aria-pressed': sel?.mapId === id ? 'true' : 'false',
        onClick: () => this.act({ a: 'pickMap', mapId: id }),
      })));
    return [
      h('div', {}, 'Choisissez la carte sur laquelle vous allez vous cacher.'),
      grid,
    ];
  }

  /* -------- phase 2 : cache -------- */

  renderHide(view) {
    if (view.isHunter) return this.renderHunterWaiting(view, '🎭 Les autres joueurs se cachent…');
    const sel = view.mySelection;
    if (sel.locked) {
      return [
        h('div', { className: 'cachecache__waiting' }, [
          h('div', {}, '🔒 Cachette verrouillée !'),
          h('div', { style: 'color:var(--text-dim,#aab);font-size:0.85rem;' }, 'En attente des autres joueurs…'),
          ...this.renderHiderStatuses(view),
        ]),
      ];
    }

    this.resetCursorForStage(`hide-${sel.mapId}`, sel.x != null ? { x: sel.x, y: sel.y } : { x: 0.5, y: 0.5 });

    const commit = (x, y) => {
      this.act({ a: 'place', shapeId: sel.shapeId ?? 1, x, y, scale: sel.scale ?? 1, rotation: sel.rotation ?? 0 });
    };

    const stage = this.buildStage({
      backgroundSrc: MAP_SRC(sel.mapId),
      disabled: false,
      onPick: (x, y) => { this.cursor = { x, y }; commit(x, y); },
      overlay: sel.shapeId ? [h('div', {
        className: 'ccshape',
        style: `left:${(sel.x ?? 0.5) * 100}%; top:${(sel.y ?? 0.5) * 100}%; width:${18 * (sel.scale ?? 1)}%; transform: translate(-50%,-50%) rotate(${sel.rotation ?? 0}deg);`,
      }, h('img', { src: SHAPE_SRC(sel.shapeId), alt: '' }))] : [],
    });

    const shapeGrid = h('div', { className: 'ccgrid' },
      Array.from({ length: view.shapesCount }, (_, i) => i + 1).map((id) => h('button', {
        type: 'button',
        className: `ccthumb ccthumb--shape${sel.shapeId === id ? ' ccthumb--selected' : ''}`,
        style: `background-image:url('${SHAPE_SRC(id)}');`,
        'aria-label': `Forme ${id}`,
        'aria-pressed': sel.shapeId === id ? 'true' : 'false',
        onClick: () => this.act({ a: 'place', shapeId: id, x: sel.x ?? this.cursor.x, y: sel.y ?? this.cursor.y, scale: sel.scale ?? 1, rotation: sel.rotation ?? 0 }),
      })));

    const scaleInput = h('input', {
      type: 'range', min: String(SCALE_MIN), max: String(SCALE_MAX), step: '0.05', value: String(sel.scale ?? 1),
    });
    scaleInput.addEventListener('change', () => this.act({
      a: 'place', shapeId: sel.shapeId ?? 1, x: sel.x ?? this.cursor.x, y: sel.y ?? this.cursor.y,
      scale: Number(scaleInput.value), rotation: sel.rotation ?? 0,
    }));

    const rotInput = h('input', { type: 'range', min: '0', max: '359', step: '15', value: String(sel.rotation ?? 0) });
    rotInput.addEventListener('change', () => this.act({ a: 'place', shapeId: sel.shapeId ?? 1, x: sel.x ?? this.cursor.x, y: sel.y ?? this.cursor.y, scale: sel.scale ?? 1, rotation: Number(rotInput.value) }));

    return [
      h('div', {}, '1. Choisissez une forme · 2. Cliquez (ou touchez / flèches + Entrée) sur la carte pour la placer · 3. Ajustez, puis verrouillez.'),
      shapeGrid,
      h('div', { className: 'ccstage-wrap' }, stage),
      h('div', { className: 'cachecache__sliders' }, [
        h('label', {}, ['Taille', scaleInput]),
        h('label', {}, ['Rotation', rotInput]),
      ]),
      h('div', { className: 'cachecache__actions' }, [
        h('button', {
          className: 'btn btn--primary',
          disabled: sel.shapeId == null ? 'true' : undefined,
          onClick: () => this.act({ a: 'lock' }),
        }, '🔒 Verrouiller ma cachette'),
      ]),
    ];
  }

  renderHiderStatuses(view) {
    return [h('div', { className: 'cachecache__hiderlist' }, (view.hiderStatuses ?? []).map((s) => h('div', {}, [
      h('span', {}, s.pseudo), h('span', {}, STATUS_LABEL[s.status] ?? s.status),
    ])))];
  }

  renderHunterWaiting(view, title) {
    return [
      h('div', { className: 'cachecache__waiting' }, [
        h('div', { style: 'font-size:1.1rem;' }, title),
        h('div', { style: 'color:var(--text-dim,#aab);font-size:0.85rem;max-width:420px;' },
          `Pendant ce temps : rappel des règles de la chasse — chaque clic vous coûte ${Math.round(view.clickPenaltyMs / 1000)} secondes, `
          + 'et une pastille de couleur vous indique votre proximité avec la cachette (bleu clair = très loin, jusqu\'à rouge = brûlant).'),
        this.renderLegend(view),
        ...this.renderHiderStatuses(view),
      ]),
    ];
  }

  /* -------- phase 3 : chasse -------- */

  renderHunt(view) {
    const hunt = view.hunt;
    if (!hunt) return [h('div', {}, 'Préparation de la chasse…')];

    if (hunt.resolved) {
      const won = hunt.resultFlash?.type === 'hit';
      return [
        h('div', { className: 'ccstage-wrap' }, h('div', { className: 'ccstage ccstage--disabled', style: hunt.mapId ? `background-image:url('${MAP_SRC(hunt.mapId)}');` : '' }, [
          h('div', { className: 'ccflash' }, [
            h('div', {}, won ? `🎯 ${view.hunterName} a trouvé ${hunt.hiderName} !` : `⏱️ Temps écoulé — ${hunt.hiderName} marque un point !`),
            h('div', { style: 'font-size:0.85rem;color:var(--text-dim,#aab);font-weight:400;' }, 'Prochaine cachette dans un instant…'),
          ]),
        ])),
      ];
    }

    if (hunt.role === 'bystander') {
      return [
        h('div', { className: 'cachecache__waiting' }, [
          h('div', { style: 'font-size:1.1rem;' }, `🔦 ${view.hunterName} recherche ${hunt.hiderName}…`),
          this.renderLastClick(view),
          this.renderLegend(view),
        ]),
      ];
    }

    if (hunt.role === 'hunter') {
      this.resetCursorForStage(`hunt-${hunt.hiderId}`, { x: 0.5, y: 0.5 });
      const stage = this.buildStage({
        backgroundSrc: MAP_SRC(hunt.mapId),
        disabled: false,
        onPick: (x, y) => { this.cursor = { x, y }; this.act({ a: 'huntClick', x, y }); },
        overlay: hunt.lastClick ? [h('div', {
          className: 'ccclick',
          style: `left:${hunt.lastClick.x * 100}%; top:${hunt.lastClick.y * 100}%; border-color:${hunt.lastClick.color};`,
        })] : [],
      });
      return [
        h('div', {}, `Cherchez ${hunt.hiderName} ! Cliquez, touchez, ou utilisez les flèches + Entrée sur la carte.`),
        h('div', { className: 'ccstage-wrap' }, stage),
        this.renderLastClick(view),
        this.renderLegend(view),
      ];
    }

    // role === 'owner' : le joueur regarde le Chasseur fouiller SA propre carte.
    const stageOwner = h('div', {
      className: 'ccstage ccstage--disabled',
      style: `background-image:url('${MAP_SRC(hunt.mapId)}');`,
    }, [
      h('div', {
        className: 'ccshape',
        style: `left:${hunt.x * 100}%; top:${hunt.y * 100}%; width:${18 * hunt.scale}%; transform: translate(-50%,-50%) rotate(${hunt.rotation}deg);`,
      }, h('img', { src: SHAPE_SRC(hunt.shapeId), alt: '' })),
      ...(hunt.lastClick ? [h('div', {
        className: 'ccclick',
        style: `left:${hunt.lastClick.x * 100}%; top:${hunt.lastClick.y * 100}%; border-color:${hunt.lastClick.color};`,
      })] : []),
    ]);
    return [
      h('div', {}, `👀 ${view.hunterName} fouille votre carte en ce moment même !`),
      h('div', { className: 'ccstage-wrap' }, stageOwner),
      this.renderLastClick(view),
    ];
  }

  /** Zone interactive (souris/tactile/clavier) commune au placement et à la chasse. */
  buildStage({ backgroundSrc, onPick, overlay = [], disabled = false }) {
    const stage = h('div', {
      className: `ccstage${disabled ? ' ccstage--disabled' : ''}`,
      style: `background-image:url('${backgroundSrc}');`,
      tabindex: disabled ? undefined : '0',
      role: 'application',
      'aria-label': 'Zone de jeu interactive : cliquez, touchez ou utilisez les flèches puis Entrée',
    }, overlay);

    if (!disabled) {
      const cursorEl = h('div', {
        className: 'cccursor',
        style: `left:${this.cursor.x * 100}%; top:${this.cursor.y * 100}%;`,
      });
      stage.append(cursorEl);

      const pick = (x, y) => { onPick(clamp01(x), clamp01(y)); this.render(this.view); };

      stage.addEventListener('click', (e) => {
        const rect = stage.getBoundingClientRect();
        pick((e.clientX - rect.left) / rect.width, (e.clientY - rect.top) / rect.height);
      });
      stage.addEventListener('touchend', (e) => {
        const t = e.changedTouches?.[0];
        if (!t) return;
        e.preventDefault();
        const rect = stage.getBoundingClientRect();
        pick((t.clientX - rect.left) / rect.width, (t.clientY - rect.top) / rect.height);
      }, { passive: false });
      stage.addEventListener('keydown', (e) => {
        const step = e.shiftKey ? 0.08 : 0.03;
        if (e.key === 'ArrowLeft') { this.cursor.x = clamp01(this.cursor.x - step); this.render(this.view); e.preventDefault(); }
        else if (e.key === 'ArrowRight') { this.cursor.x = clamp01(this.cursor.x + step); this.render(this.view); e.preventDefault(); }
        else if (e.key === 'ArrowUp') { this.cursor.y = clamp01(this.cursor.y - step); this.render(this.view); e.preventDefault(); }
        else if (e.key === 'ArrowDown') { this.cursor.y = clamp01(this.cursor.y + step); this.render(this.view); e.preventDefault(); }
        else if (e.key === 'Enter' || e.key === ' ') { pick(this.cursor.x, this.cursor.y); e.preventDefault(); }
      });
    }
    return stage;
  }

  /* -------- transitions & fin -------- */

  renderRoundEnd(view) {
    const r = view.roundRecap;
    return [
      h('div', { className: 'cachecache__waiting' }, [
        h('strong', {}, `✅ Fin de la manche ${r?.roundNumber ?? ''}`),
        h('div', {}, `${r?.hunterName ?? ''} a terminé sa chasse.`),
        h('table', {}, [
          h('tr', {}, [h('th', {}, 'Joueur'), h('th', {}, 'Score')]),
          ...view.players.map((p) => h('tr', {}, [h('td', {}, p.pseudo), h('td', {}, String(p.score))])),
        ]),
        h('div', { style: 'color:var(--text-dim,#aab);font-size:0.85rem;' }, 'Prochaine manche dans un instant…'),
      ]),
    ];
  }

  renderFinPartie(view) {
    const c = view.finPartie?.classement ?? [];
    return [
      h('strong', {}, '🏆 Classement final'),
      h('table', {}, c.map((p, i) => h('tr', {}, [
        h('td', {}, `${i + 1}.`), h('td', {}, p.pseudo), h('td', {}, `${p.score} pt${p.score > 1 ? 's' : ''}`),
      ]))),
      h('div', { style: 'color:var(--text-dim,#aab);' }, 'Retour au salon dans quelques secondes…'),
    ];
  }

  /* -------- chat -------- */

  renderChatPanel() {
    const list = h('div', { className: 'cachecache__chatlist' }, this.chatLog.map((m) => h('div', { className: 'cachecache__chatmsg' }, [
      h('span', { className: 'cachecache__chatauthor' }, `${m.pseudo}: `),
      h('span', {}, m.text),
    ])));
    const input = h('input', { type: 'text', placeholder: 'Écrire un message…', maxlength: '300', className: 'cachecache__chatinput' });
    const sendBtn = h('button', { type: 'button', className: 'btn btn--primary btn--small' }, 'Envoyer');
    const submit = () => {
      if (!input.value.trim()) return;
      this.sendChatMessage(input.value);
      input.value = '';
      input.focus();
    };
    sendBtn.addEventListener('click', submit);
    input.addEventListener('keydown', (e) => { if (e.key === 'Enter') submit(); });
    requestAnimationFrame(() => { list.scrollTop = list.scrollHeight; });
    return h('div', { className: 'cachecache__panel cachecache__chat' }, [
      h('strong', {}, '💬 Chat'),
      list,
      h('div', { className: 'cachecache__chatrow' }, [input, sendBtn]),
    ]);
  }

  unmount() {
    this.unsubscribe?.();
    this.clearTimers();
    clearInterval(this.tickInterval);
    clearTimeout(this.statusTimer);
    this.styleEl?.remove();
    this.root?.remove();
    this.statusEl = null;
  }
}

/* ====================================================================== */
/* Contrat de module Arcade                                               */
/* ====================================================================== */

let instance = null;

export default {
  async mount(container, context) {
    instance = new CacheCacheUI(container, context);
    instance.mount();
  },
  async unmount() {
    instance?.unmount();
    instance = null;
  },
};
