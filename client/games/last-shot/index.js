/**
 * Last Shot — interface du module Arcade (moteur dans ./engine.js).
 *
 * Host autoritaire « à la manche » : le Host fait tourner une boucle légère
 * (70 ms) pendant la phase de préparation pour lisser les déplacements, mais
 * la phase de résolution (les tirs) est calculée **une seule fois, d'un
 * coup** par `engine.resolveRound()`. Le résultat (`shotLog`) est diffusé
 * tel quel ; chaque client (Host compris) rejoue localement la même
 * animation à partir des mêmes données déterministes — le serveur n'a donc
 * presque rien à faire de plus qu'un relais de messages.
 *
 * Contrôles :
 *  - Déplacement : flèches / ZQSD / WASD (clavier) ou pavé tactile.
 *  - Visée : survol / glissé du pointeur sur l'arène (souris ou tactile).
 *  - Saut : Espace (ou bouton 🤸, purement visuel).
 *  - Verrouiller : Entrée (ou bouton 🔒).
 */
import {
  LastShotEngine, PREP_MS, PER_SHOT_MS, RESOLUTION_BUFFER_MS,
  ARENA_BASE_RADIUS, BONUS_ICONS, BONUS_LABELS,
} from './engine.js';

const TICK_MS = 70;
const CANVAS_SIZE = 640;
const VIEW_SCALE = (CANVAS_SIZE / 2) / (ARENA_BASE_RADIUS * 1.12); // marge visuelle autour de l'arène de base
const SLOT_COLORS = ['#ff5c5c', '#4c8dff', '#2fbf71', '#ffd54a', '#c56cf0', '#ff9f43', '#00d2d3', '#f368e0', '#8bd450', '#ff6fa5', '#7d8bff', '#e0c341'];

const CSS = `
.ls { display: flex; flex-direction: column; gap: 10px; height: 100%; color: var(--text, #e8ecff); align-items: center; width: 100%; }
.ls__panel { background: var(--glass, rgba(255,255,255,0.05)); border: 1px solid var(--glass-border, rgba(255,255,255,0.09)); border-radius: var(--radius-m, 14px); padding: 10px 14px; }
.ls__hud { display: flex; gap: 14px; align-items: center; flex-wrap: wrap; justify-content: center; font-size: .88rem; width: min(96%, 700px); }
.ls__hud .tl { margin-left: auto; font-variant-numeric: tabular-nums; font-weight: 700; }
.ls__score { display: inline-flex; align-items: center; gap: 5px; }
.ls__score .dot { width: 10px; height: 10px; border-radius: 50%; display: inline-block; }
.ls__score.ls--dead { opacity: .38; text-decoration: line-through; }
.ls__mybonus { font-size: .9rem; padding: 2px 9px; border-radius: 999px; background: rgba(255,255,255,.08); border: 1px solid var(--glass-border, rgba(255,255,255,.15)); }
.ls__arenaWrap { position: relative; width: min(96vw, 640px); aspect-ratio: 1 / 1; touch-action: none; }
.ls__arenaWrap canvas { width: 100%; height: 100%; display: block; border-radius: 50%; }
.ls__overlay { position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 12px; background: rgba(8,10,18,.82); backdrop-filter: blur(2px); z-index: 8; text-align: center; border-radius: 50%; padding: 18px; }
.ls__overlay h3 { margin: 0; font-size: 1.25rem; }
.ls__overlay .sub { color: var(--text-dim, #aab); font-size: .85rem; max-width: 320px; }
.ls__modes { display: flex; gap: 10px; flex-wrap: wrap; justify-content: center; }
.ls__modeBtn { border-radius: 12px; border: 1px solid var(--glass-border, rgba(255,255,255,.18)); background: rgba(255,255,255,.06); color: inherit; padding: 10px 14px; font-size: .85rem; cursor: pointer; max-width: 200px; }
.ls__modeBtn.active { border-color: #4c8dff; background: rgba(76,141,255,.18); }
.ls__startBtn { border-radius: 999px; border: none; background: linear-gradient(135deg,#ff5c5c,#ffb14a); color: #1a1002; font-weight: 800; padding: 10px 26px; font-size: 1rem; cursor: pointer; }
.ls__row { display: flex; gap: 18px; align-items: center; justify-content: space-between; width: min(96vw, 640px); }
.ls__pad { display: none; gap: 4px; }
.ls__dpad { display: grid; grid-template-columns: repeat(3, 50px); grid-template-rows: repeat(3, 50px); gap: 4px; }
.ls__dpad button, .ls__jump, .ls__lock { border-radius: 12px; border: 1px solid var(--glass-border, rgba(255,255,255,.15)); background: rgba(255,255,255,.07); color: inherit; font-size: 18px; }
.ls__jump { width: 64px; height: 64px; border-radius: 50%; font-size: 22px; }
.ls__lock { padding: 0 18px; height: 46px; font-weight: 700; background: rgba(76,141,255,.22); border-color: #4c8dff; }
.ls__lock:disabled { opacity: .4; }
.ls__actions { display: flex; gap: 10px; align-items: center; }
.ls__help { font-size: .78rem; color: var(--text-dim, #aab); text-align: center; }
@media (pointer: coarse) { .ls__pad { display: flex; } .ls__help { display: none; } }
`;

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

const KEYMAP = {
  ArrowUp: 'u', ArrowDown: 'd', ArrowLeft: 'l', ArrowRight: 'r',
  KeyW: 'u', KeyS: 'd', KeyA: 'l', KeyD: 'r', KeyZ: 'u', KeyQ: 'l',
};
const DIR_VEC = { u: [0, -1], d: [0, 1], l: [-1, 0], r: [1, 0] };

class LastShotUI {
  constructor(container, context) {
    this.container = container;
    this.ctx = context;
    this.me = context.me;
    this.engine = null;
    this.unsubscribe = null;
    this.state = null;
    this.heldDirs = new Set();
    this.selectedMode = 'sequentiel';
    this.matchStarted = false;
    this.timers = { loop: null, end: null };
    this.anim = { round: -1, phase: null, startedAt: 0, raf: null, revealed: new Set() };
  }

  get hostId() { return this.ctx.hostId; }

  get isHost() { return this.ctx.me.id === this.ctx.hostId; }

  mount() {
    this.styleEl = h('style', {}, CSS);
    this.root = h('div', { className: 'ls' });
    this.container.append(this.styleEl, this.root);
    this.buildShell();

    this.onKeyDown = (e) => this.keyDown(e);
    this.onKeyUp = (e) => this.keyUp(e);
    window.addEventListener('keydown', this.onKeyDown);
    window.addEventListener('keyup', this.onKeyUp);

    if (this.isHost) {
      try {
        this.engine = new LastShotEngine(this.ctx.players);
      } catch (error) {
        this.arenaWrap.append(h('div', { className: 'ls__overlay' }, `⚠️ ${error.message}`));
        return;
      }
      this.unsubscribe = this.ctx.onMessage(({ from, data }) => {
        if (!data || data.t !== 'action') return;
        this.applyAction(from, data.action);
      });
      this.showModeOverlay();
      this.timers.loop = setInterval(() => this.hostLoop(), TICK_MS);
      this.render(this.engine.getState(Date.now()));
    } else {
      this.unsubscribe = this.ctx.onMessage(({ from, data }) => {
        if (from !== this.hostId || !data) return;
        if (data.t === 'state') this.render(data.state);
      });
      this.showOverlay('⏳ En attente de l\'hôte…', 'L\'hôte choisit le mode de tir puis lance la partie.');
    }
  }

  buildShell() {
    this.hud = h('div', { className: 'ls__panel ls__hud' });
    this.arenaWrap = h('div', { className: 'ls__arenaWrap' });
    this.canvas = h('canvas', { width: CANVAS_SIZE, height: CANVAS_SIZE });
    this.cx = this.canvas.getContext('2d');
    this.arenaWrap.append(this.canvas);
    this.overlayEl = null;

    this.canvas.addEventListener('pointermove', (e) => this.onPointerAim(e));
    this.canvas.addEventListener('pointerdown', (e) => this.onPointerAim(e));

    const dirBtn = (dir, label, col, row) => {
      const b = h('button', { style: `grid-column:${col};grid-row:${row};` }, label);
      const press = (e) => { e.preventDefault(); this.heldDirs.add(dir); this.pushMove(); };
      const release = (e) => { e.preventDefault(); this.heldDirs.delete(dir); this.pushMove(); };
      b.addEventListener('pointerdown', press);
      b.addEventListener('pointerup', release);
      b.addEventListener('pointerleave', release);
      return b;
    };
    const pad = h('div', { className: 'ls__pad ls__row' }, [
      h('div', { className: 'ls__dpad' }, [
        dirBtn('u', '▲', 2, 1), dirBtn('l', '◀', 1, 2), dirBtn('r', '▶', 3, 2), dirBtn('d', '▼', 2, 3),
      ]),
      h('div', { className: 'ls__actions' }, [
        h('button', { className: 'ls__jump', onClick: () => this.sendJump() }, '🤸'),
        this.lockBtnMobile = h('button', { className: 'ls__lock', onClick: () => this.sendLock() }, '🔒 Verrouiller'),
      ]),
    ]);

    this.root.append(
      this.hud,
      this.arenaWrap,
      pad,
      h('div', { className: 'ls__row', style: 'justify-content:center;' }, [
        this.lockBtnDesktop = h('button', { className: 'ls__lock', onClick: () => this.sendLock() }, '🔒 Verrouiller (Entrée)'),
      ]),
      h('div', { className: 'ls__help' }, '⬅️➡️⬆️⬇️/ZQSD/WASD pour bouger · pointeur sur l\'arène pour viser · Espace pour sauter · Entrée pour verrouiller'),
    );
  }

  showOverlay(title, sub) {
    this.overlayEl?.remove();
    this.overlayEl = h('div', { className: 'ls__overlay' }, [
      h('h3', {}, title),
      sub ? h('div', { className: 'sub' }, sub) : null,
    ].filter(Boolean));
    this.arenaWrap.append(this.overlayEl);
  }

  showModeOverlay() {
    const modeBtn = (id, label, desc) => h('button', {
      className: `ls__modeBtn${this.selectedMode === id ? ' active' : ''}`,
      onClick: () => { this.selectedMode = id; this.showModeOverlay(); },
    }, [h('div', { style: 'font-weight:700;' }, label), h('div', { style: 'font-size:.75rem;opacity:.8;' }, desc)]);

    this.overlayEl?.remove();
    this.overlayEl = h('div', { className: 'ls__overlay' }, [
      h('h3', {}, '🎯 Last Shot'),
      h('div', { className: 'sub' }, `${this.ctx.players.length} joueurs sur la plateforme. Choisissez le mode de résolution des tirs :`),
      h('div', { className: 'ls__modes' }, [
        modeBtn('sequentiel', '🔀 Séquentiel', 'Chaque joueur tire à son tour, dans un ordre aléatoire.'),
        modeBtn('simultane', '⚡ Tir simultané', 'Tout le monde tire en même temps : éliminations croisées possibles, parfois aucun survivant.'),
      ]),
      h('button', { className: 'ls__startBtn', onClick: () => this.startMatch() }, '▶️ Commencer la partie'),
    ]);
    this.arenaWrap.append(this.overlayEl);
  }

  startMatch() {
    if (!this.engine || this.matchStarted) return;
    this.matchStarted = true;
    this.engine.simultaneous = this.selectedMode === 'simultane';
    this.engine.startMatch(Date.now());
    this.overlayEl?.remove();
    this.overlayEl = null;
  }

  /* -------- boucle Host -------- */

  hostLoop() {
    const now = Date.now();
    const before = this.engine.phase;
    this.engine.tick(now);
    const after = this.engine.phase;

    if (this.engine.dirty || before !== after) {
      const state = this.engine.getState(now);
      this.ctx.sendMessage({ t: 'state', state });
      this.render(state);
      this.engine.dirty = false;
    }
    if (after === 'fin' && before !== 'fin') {
      this.timers.end = setTimeout(() => this.ctx.onEnd(this.engine.summary()), 5200);
    }
  }

  /* -------- entrées -------- */

  keyDown(e) {
    if (e.code === 'Space') { e.preventDefault(); this.sendJump(); return; }
    if (e.code === 'Enter') { e.preventDefault(); this.sendLock(); return; }
    const dir = KEYMAP[e.code];
    if (!dir) return;
    e.preventDefault();
    if (!e.repeat) { this.heldDirs.add(dir); this.pushMove(); }
  }

  keyUp(e) {
    const dir = KEYMAP[e.code];
    if (!dir) return;
    this.heldDirs.delete(dir);
    this.pushMove();
  }

  pushMove() {
    let dx = 0; let dy = 0;
    for (const d of this.heldDirs) { dx += DIR_VEC[d][0]; dy += DIR_VEC[d][1]; }
    this.sendAction({ a: 'move', dx, dy });
  }

  onPointerAim(e) {
    if (!this.state) return;
    const me = this.state.players.find((p) => p.id === this.me.id);
    if (!me || !me.alive || me.locked) return;
    const rect = this.canvas.getBoundingClientRect();
    const px = ((e.clientX - rect.left) / rect.width) * CANVAS_SIZE;
    const py = ((e.clientY - rect.top) / rect.height) * CANVAS_SIZE;
    const cx = CANVAS_SIZE / 2 + me.x * VIEW_SCALE;
    const cy = CANVAS_SIZE / 2 + me.y * VIEW_SCALE;
    const angle = Math.atan2(py - cy, px - cx);
    this.sendAction({ a: 'aim', angle });
  }

  sendJump() { this.sendAction({ a: 'jump' }); }

  sendLock() { this.sendAction({ a: 'lock' }); }

  sendAction(action) {
    if (this.isHost) this.applyAction(this.me.id, action);
    else this.ctx.sendMessage({ t: 'action', action }, this.hostId);
  }

  applyAction(fromId, action) {
    if (!this.engine) return;
    const now = Date.now();
    if (action.a === 'move') this.engine.setInput(fromId, { dx: action.dx, dy: action.dy });
    else if (action.a === 'aim') this.engine.setAim(fromId, action.angle);
    else if (action.a === 'jump') this.engine.jump(fromId, now);
    else if (action.a === 'lock') this.engine.lockPlayer(fromId);
  }

  /* -------- rendu -------- */

  toCanvas(x, y) { return [CANVAS_SIZE / 2 + x * VIEW_SCALE, CANVAS_SIZE / 2 + y * VIEW_SCALE]; }

  render(state) {
    const wasAttente = this.state?.phase === 'attente' || !this.state;
    this.state = state;
    this.renderHud(state);
    this.renderLockButtons(state);

    if (state.phase === 'resolution' && (this.anim.round !== state.round || this.anim.phase !== 'resolution')) {
      this.anim = { round: state.round, phase: 'resolution', startedAt: performance.now(), raf: null, revealed: new Set() };
      this.startAnimLoop();
    } else if (state.phase !== 'resolution') {
      this.anim.phase = state.phase;
      if (this.anim.raf) { cancelAnimationFrame(this.anim.raf); this.anim.raf = null; }
      this.drawFrame(state, null);
    }

    if (state.phase === 'attente' && this.isHost) { /* overlay déjà géré par showModeOverlay */ } else if (state.phase === 'attente' && !wasAttente) {
      this.showOverlay('⏳ En attente de l\'hôte…');
    } else if (state.phase !== 'attente' && state.phase !== 'resolution') {
      this.overlayEl?.remove(); this.overlayEl = null;
      this.renderRoundOverlay(state);
    }
  }

  renderLockButtons(state) {
    const me = state.players.find((p) => p.id === this.me.id);
    const canLock = !!me && me.alive && !me.locked && state.phase === 'preparation';
    this.lockBtnDesktop.disabled = !canLock;
    this.lockBtnMobile.disabled = !canLock;
    this.lockBtnDesktop.textContent = me?.locked ? '🔒 Position verrouillée' : '🔒 Verrouiller (Entrée)';
    this.lockBtnMobile.textContent = me?.locked ? '🔒 Verrouillé' : '🔒 Verrouiller';
  }

  renderHud(state) {
    const alive = state.players.filter((p) => p.alive).length;
    const mode = state.simultaneous ? '⚡ Simultané' : '🔀 Séquentiel';
    let timerLabel = '—';
    if (state.phase === 'preparation') timerLabel = `${Math.ceil(state.prepMsLeft / 1000)}s`;
    else if (state.phase === 'resolution') timerLabel = '🎯 Résolution…';
    this.hud.replaceChildren(
      h('strong', {}, `🎯 Manche ${state.round || 0}`),
      h('span', {}, mode),
      h('span', {}, `${alive} en vie`),
      ...state.players.map((p) => h('span', { className: `ls__score${p.alive ? '' : ' ls--dead'}` }, [
        h('span', { className: 'dot', style: `background:${SLOT_COLORS[p.slot % SLOT_COLORS.length]}` }),
        `${p.pseudo}${p.kills ? ` (${p.kills}💀)` : ''}`,
      ])),
      h('span', { className: 'tl' }, timerLabel),
    );
    const me = state.players.find((p) => p.id === this.me.id);
    if (me?.bonus) {
      this.hud.append(h('span', { className: 'ls__mybonus' }, `${BONUS_ICONS[me.bonus]} ${BONUS_LABELS[me.bonus]}`));
    }
  }

  renderRoundOverlay(state) {
    this.overlayEl?.remove();
    this.overlayEl = null;
    if (state.phase === 'fin-manche' && state.roundSummary) {
      const s = state.roundSummary;
      this.overlayEl = h('div', { className: 'ls__overlay' }, [
        h('h3', {}, s.eliminated.length ? `💀 ${s.eliminated.map((p) => p.pseudo).join(', ')} éliminé(s)` : '😮 Personne éliminé cette manche'),
        h('div', { className: 'sub' }, `${s.survivors.length} survivant(s) — la plateforme rétrécit…`),
      ]);
    } else if (state.phase === 'fin') {
      this.overlayEl = h('div', { className: 'ls__overlay' }, [
        h('h3', {}, state.matchWinner ? `👑 ${state.matchWinner.pseudo} gagne Last Shot !` : '💥 Aucun survivant — égalité totale'),
        h('div', { className: 'sub' }, 'Retour au salon dans quelques secondes…'),
      ]);
    }
    if (this.overlayEl) this.arenaWrap.append(this.overlayEl);
  }

  startAnimLoop() {
    const step = () => {
      if (!this.state || this.state.phase !== 'resolution') { this.anim.raf = null; return; }
      const elapsed = performance.now() - this.anim.startedAt;
      this.drawFrame(this.state, elapsed);
      this.anim.raf = requestAnimationFrame(step);
    };
    this.anim.raf = requestAnimationFrame(step);
  }

  /** Calcule, pour un instant `elapsedMs` de la phase de résolution, quels
   * joueurs doivent déjà apparaître éliminés et quelle balle est en vol. */
  computeAnimSnapshot(state, elapsedMs) {
    const dead = new Set(state.players.filter((p) => !p.alive).map((p) => p.id));
    if (elapsedMs === null) return { dead, activeBullets: [] };
    const shotLog = state.shotLog || [];
    const shownDead = new Set();
    const activeBullets = [];
    const idx = Math.floor(elapsedMs / PER_SHOT_MS);
    const within = elapsedMs - idx * PER_SHOT_MS;
    for (let i = 0; i < shotLog.length; i += 1) {
      const shot = shotLog[i];
      if (i > idx) break;
      if (shot.skipped || !shot.bullets) continue; // eslint-disable-line no-continue
      const localWithin = i === idx ? within : PER_SHOT_MS;
      const progress = Math.max(0, Math.min(1, localWithin / (PER_SHOT_MS * 0.75)));
      for (const b of shot.bullets) {
        if (i === idx && progress < 1) {
          const cut = Math.max(1, Math.floor(progress * b.path.length));
          activeBullets.push(b.path.slice(0, cut));
        }
        if (progress >= 0.85 || i < idx) {
          for (const hit of b.hits) if (hit.result === 'kill') shownDead.add(hit.targetId);
        }
      }
    }
    return { dead: shownDead, activeBullets, hitsFlash: idx < shotLog.length ? shotLog[idx] : null, within };
  }

  drawFrame(state, elapsedMs) {
    const ctx = this.cx;
    ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

    // Fond spatial.
    const grad = ctx.createRadialGradient(CANVAS_SIZE / 2, CANVAS_SIZE / 2, 10, CANVAS_SIZE / 2, CANVAS_SIZE / 2, CANVAS_SIZE / 1.4);
    grad.addColorStop(0, '#141c33'); grad.addColorStop(1, '#05070f');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

    // Plateforme (rayon précédent en fantôme si rétrécissement).
    if (state.prevArenaRadius > state.arenaRadius) {
      ctx.beginPath();
      ctx.arc(CANVAS_SIZE / 2, CANVAS_SIZE / 2, state.prevArenaRadius * VIEW_SCALE, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(255,90,90,.35)';
      ctx.setLineDash([6, 6]);
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.setLineDash([]);
    }
    ctx.beginPath();
    ctx.arc(CANVAS_SIZE / 2, CANVAS_SIZE / 2, state.arenaRadius * VIEW_SCALE, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(70,90,140,.22)';
    ctx.fill();
    ctx.lineWidth = 3;
    ctx.strokeStyle = '#4c8dff';
    ctx.stroke();

    const snap = this.computeAnimSnapshot(state, elapsedMs);
    const { dead } = snap;

    // Bonus au sol.
    for (const pu of state.pickups) {
      const [x, y] = this.toCanvas(pu.x, pu.y);
      ctx.font = '20px sans-serif';
      ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      ctx.fillStyle = 'rgba(255,255,255,.9)';
      ctx.beginPath(); ctx.arc(x, y, 14, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255,255,255,.12)'; ctx.fill();
      ctx.strokeStyle = 'rgba(255,255,255,.4)'; ctx.lineWidth = 1; ctx.stroke();
      ctx.fillStyle = '#fff';
      ctx.fillText(BONUS_ICONS[pu.type], x, y + 1);
    }

    // Balles en vol (phase de résolution uniquement).
    for (const path of snap.activeBullets || []) {
      if (path.length < 2) continue; // eslint-disable-line no-continue
      ctx.beginPath();
      const [sx, sy] = this.toCanvas(path[0].x, path[0].y);
      ctx.moveTo(sx, sy);
      for (const p of path.slice(1)) { const [x, y] = this.toCanvas(p.x, p.y); ctx.lineTo(x, y); }
      ctx.strokeStyle = '#ffd54a';
      ctx.lineWidth = 3;
      ctx.shadowColor = '#ffd54a';
      ctx.shadowBlur = 8;
      ctx.stroke();
      ctx.shadowBlur = 0;
      const [hx, hy] = this.toCanvas(path[path.length - 1].x, path[path.length - 1].y);
      ctx.beginPath(); ctx.arc(hx, hy, 4, 0, Math.PI * 2); ctx.fillStyle = '#fff'; ctx.fill();
    }

    // Joueurs.
    for (const p of state.players) {
      const isDeadVisual = elapsedMs === null ? !p.alive : dead.has(p.id);
      const [x, y] = this.toCanvas(p.x, p.y);
      ctx.globalAlpha = isDeadVisual ? 0.18 : 1;

      if (p.shielded) {
        ctx.beginPath(); ctx.arc(x, y, 17, 0, Math.PI * 2);
        ctx.strokeStyle = '#4cf1ff'; ctx.lineWidth = 2; ctx.stroke();
      }
      // Canon (direction visée).
      if (!isDeadVisual) {
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x + Math.cos(p.angle) * 20, y + Math.sin(p.angle) * 20);
        ctx.strokeStyle = SLOT_COLORS[p.slot % SLOT_COLORS.length];
        ctx.lineWidth = 4;
        ctx.stroke();
      }
      const jumpLift = p.jumping ? -6 : 0;
      ctx.beginPath();
      ctx.arc(x, y + jumpLift, 13, 0, Math.PI * 2);
      ctx.fillStyle = SLOT_COLORS[p.slot % SLOT_COLORS.length];
      ctx.fill();
      ctx.lineWidth = p.locked ? 3 : 1.5;
      ctx.strokeStyle = p.locked ? '#fff' : 'rgba(255,255,255,.6)';
      ctx.stroke();

      ctx.globalAlpha = isDeadVisual ? 0.35 : 1;
      ctx.font = '11px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillStyle = '#fff';
      ctx.fillText(p.pseudo.slice(0, 10), x, y - 22);
      if (p.bonus && !isDeadVisual) ctx.fillText(BONUS_ICONS[p.bonus], x, y + 27);
      ctx.globalAlpha = 1;
    }
  }

  unmount() {
    this.unsubscribe?.();
    clearInterval(this.timers.loop);
    clearTimeout(this.timers.end);
    if (this.anim.raf) cancelAnimationFrame(this.anim.raf);
    window.removeEventListener('keydown', this.onKeyDown);
    window.removeEventListener('keyup', this.onKeyUp);
    this.styleEl?.remove();
    this.root?.remove();
    this.engine = null;
  }
}

let instance = null;

export default {
  async mount(container, context) {
    instance = new LastShotUI(container, context);
    instance.mount();
  },
  async unmount() {
    instance?.unmount();
    instance = null;
  },
};
