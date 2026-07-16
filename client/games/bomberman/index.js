/**
 * Bomberman — interface du module Arcade (moteur dans ./engine.js).
 *
 * Host autoritaire temps réel : le Host fait tourner la boucle (tick 60 ms) et
 * diffuse un état public compact (~15 fois/s quand ça bouge). Les clients
 * rendent l'état reçu et envoient leurs entrées (direction maintenue, bombe)
 * en ciblé au Host. Clavier : flèches / ZQSD / WASD + Espace. Tactile : pavé
 * directionnel + bouton 💣.
 */
import { BombermanEngine, COLS, ROWS, T } from './engine.js';

const TICK_MS = 60;
const NEXT_ROUND_MS = 2600;
const PLAYER_SKINS = ['🙂', '😎', '🤠', '👻', '🤖', '👽', '🐸', '🦊'];
const PLAYER_COLORS = ['#ff5c5c', '#4c8dff', '#2fbf71', '#ffd54a', '#c56cf0', '#ff9f43', '#00d2d3', '#f368e0'];
const PU_ICONS = { bomb: '💣', fire: '🔥', speed: '⚡' };

const CSS = `
.bm { display: flex; flex-direction: column; gap: 10px; height: 100%; color: var(--text, #e8ecff); align-items: center; width: 100%; }
.bm__panel { background: var(--glass, rgba(255,255,255,0.05)); border: 1px solid var(--glass-border, rgba(255,255,255,0.09)); border-radius: var(--radius-m, 14px); padding: 10px 14px; }
.bm__hud { display: flex; gap: 14px; align-items: center; flex-wrap: wrap; justify-content: center; font-size: .9rem; width: min(96%, 780px); }
.bm__hud .tl { margin-left: auto; font-variant-numeric: tabular-nums; font-weight: 700; }
.bm__score { display: inline-flex; align-items: center; gap: 5px; }
.bm__score .dot { width: 10px; height: 10px; border-radius: 50%; display: inline-block; }
.bm__score.bm--dead { opacity: .4; text-decoration: line-through; }
.bm__arena { position: relative; width: min(96vw, 780px); aspect-ratio: ${COLS} / ${ROWS}; background: #0e1420; border-radius: 12px; overflow: hidden; border: 1px solid rgba(255,255,255,.1); touch-action: none; }
.bm__cell, .bm__ent { position: absolute; width: ${100 / COLS}%; height: ${100 / ROWS}%; display: flex; align-items: center; justify-content: center; }
.bm__cell--wall { background: #2a3245; box-shadow: inset 0 -3px 0 rgba(0,0,0,.35); }
.bm__cell--brick { background: #7a5230; box-shadow: inset 0 -3px 0 rgba(0,0,0,.35), inset 0 2px 0 rgba(255,255,255,.12); border-radius: 3px; }
.bm__ent { font-size: min(3.4vw, 26px); transition: transform .09s linear; will-change: transform; }
.bm__ent--player { z-index: 4; filter: drop-shadow(0 2px 3px rgba(0,0,0,.6)); }
.bm__ent--player .tag { position: absolute; top: -46%; font-size: .55em; background: rgba(0,0,0,.55); padding: 0 5px; border-radius: 6px; white-space: nowrap; }
.bm__ent--bomb { z-index: 3; animation: bmpulse .5s infinite alternate; }
.bm__ent--flame { z-index: 2; }
.bm__ent--pu { z-index: 1; animation: bmfloat 1s infinite alternate; }
@keyframes bmpulse { to { transform: var(--tf) scale(1.18); } }
@keyframes bmfloat { to { transform: var(--tf) translateY(-8%); } }
.bm__overlay { position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 10px; background: rgba(8,10,18,.78); backdrop-filter: blur(2px); z-index: 8; text-align: center; }
.bm__overlay h3 { margin: 0; font-size: 1.3rem; }
.bm__pad { display: none; gap: 20px; align-items: center; justify-content: space-between; width: min(96vw, 780px); }
.bm__dpad { display: grid; grid-template-columns: repeat(3, 54px); grid-template-rows: repeat(3, 54px); gap: 4px; }
.bm__dpad button, .bm__bomb { border-radius: 12px; border: 1px solid var(--glass-border, rgba(255,255,255,.15)); background: rgba(255,255,255,.07); color: inherit; font-size: 20px; }
.bm__bomb { width: 82px; height: 82px; border-radius: 50%; font-size: 32px; }
.bm__help { font-size: .8rem; color: var(--text-dim, #aab); text-align: center; }
@media (pointer: coarse) { .bm__pad { display: flex; } .bm__help { display: none; } }
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
  KeyW: 'u', KeyS: 'd', KeyA: 'l', KeyD: 'r', // QWERTY (WASD) et AZERTY (ZQSD) via code physique
  KeyZ: 'u', KeyQ: 'l',
};

class BombermanUI {
  constructor(container, context) {
    this.container = container;
    this.ctx = context;
    this.me = context.me;
    this.engine = null;
    this.unsubscribe = null;
    this.state = null;
    this.heldKeys = [];
    this.playerNodes = new Map();
    this.lastGrid = '';
    this.timers = { loop: null, next: null, end: null };
  }

  get hostId() { return this.ctx.hostId; }
  get isHost() { return this.ctx.me.id === this.ctx.hostId; }

  mount() {
    this.styleEl = h('style', {}, CSS);
    this.root = h('div', { className: 'bm' });
    this.container.append(this.styleEl, this.root);
    this.buildShell();

    this.onKeyDown = (e) => this.keyDown(e);
    this.onKeyUp = (e) => this.keyUp(e);
    window.addEventListener('keydown', this.onKeyDown);
    window.addEventListener('keyup', this.onKeyUp);

    if (this.isHost) {
      try {
        this.engine = new BombermanEngine(this.ctx.players);
      } catch (error) {
        this.arena.replaceChildren(h('div', { className: 'bm__overlay' }, `⚠️ ${error.message}`));
        return;
      }
      this.unsubscribe = this.ctx.onMessage(({ from, data }) => {
        if (data?.t === 'action') this.engine.handleAction(from, data.action);
        // Un invité vient de finir de monter et annonce qu'il est prêt. Bomberman ne
        // diffuse que quand l'arène change ; sans ça, un invité qui rate la première
        // diffusion reste bloqué à vie sur « Connexion à l'arène ». On lui renvoie
        // l'état courant, tout de suite et rien qu'à lui.
        else if (data?.t === 'hello') this.ctx.sendMessage({ t: 'state', state: this.engine.getState() }, from);
      });
      this.engine.startRound();
      this.timers.loop = setInterval(() => this.hostLoop(), TICK_MS);
    } else {
      this.unsubscribe = this.ctx.onMessage(({ from, data }) => {
        if (from !== this.hostId) return;
        if (data?.t === 'state') this.render(data.state);
      });
      this.arena.append(h('div', { className: 'bm__overlay' }, '⏳ Connexion à l\'arène…'));
      // Abonné : on annonce au Host qu'on est prêt. Il nous renvoie l'état de l'arène,
      // même s'il a déjà fait sa première (et parfois unique) diffusion.
      this.ctx.sendMessage({ t: 'hello' }, this.hostId);
    }
  }

  buildShell() {
    this.hud = h('div', { className: 'bm__panel bm__hud' });
    this.arena = h('div', { className: 'bm__arena' });
    this.terrain = h('div', {});
    this.entities = h('div', {});
    this.overlay = null;
    this.arena.append(this.terrain, this.entities);

    // Pavé tactile.
    const dirBtn = (dir, label, col, row) => {
      const b = h('button', { style: `grid-column:${col};grid-row:${row};` }, label);
      const press = (e) => { e.preventDefault(); this.sendInput(dir); };
      const release = (e) => { e.preventDefault(); this.sendInput(null); };
      b.addEventListener('pointerdown', press);
      b.addEventListener('pointerup', release);
      b.addEventListener('pointerleave', release);
      return b;
    };
    const pad = h('div', { className: 'bm__pad' }, [
      h('div', { className: 'bm__dpad' }, [
        dirBtn('u', '▲', 2, 1), dirBtn('l', '◀', 1, 2), dirBtn('r', '▶', 3, 2), dirBtn('d', '▼', 2, 3),
      ]),
      h('button', { className: 'bm__bomb', onClick: () => this.sendBomb() }, '💣'),
    ]);

    this.root.append(
      this.hud,
      this.arena,
      pad,
      h('div', { className: 'bm__help' }, '⬅️➡️⬆️⬇️ ou ZQSD/WASD pour bouger · Espace pour poser une bombe'),
    );
  }

  /* -------- boucle Host -------- */

  hostLoop() {
    const now = Date.now();
    const before = this.engine.phase;
    this.engine.tick(now);
    const after = this.engine.phase;

    if (this.engine.dirty || before !== after) {
      const state = this.engine.getState(now);
      this.ctx.sendMessage({ t: 'state', state }); // diffusion (aucune info privée)
      this.render(state);
    }
    if (before === 'manche' && after === 'fin-manche') {
      clearTimeout(this.timers.next);
      this.timers.next = setTimeout(() => {
        if (this.engine && this.engine.phase === 'fin-manche') {
          this.engine.startRound();
        }
      }, NEXT_ROUND_MS);
    }
    if (after === 'fin' && before !== 'fin') {
      clearTimeout(this.timers.next);
      const result = this.engine.summary();
      this.timers.end = setTimeout(() => this.ctx.onEnd(result), 5000);
    }
  }

  /* -------- entrées -------- */

  keyDown(e) {
    if (e.repeat) return;
    if (e.code === 'Space' || e.code === 'KeyE') { e.preventDefault(); this.sendBomb(); return; }
    const dir = KEYMAP[e.code];
    if (!dir) return;
    e.preventDefault();
    this.heldKeys = [dir, ...this.heldKeys.filter((d) => d !== dir)];
    this.sendInput(dir);
  }

  keyUp(e) {
    const dir = KEYMAP[e.code];
    if (!dir) return;
    this.heldKeys = this.heldKeys.filter((d) => d !== dir);
    this.sendInput(this.heldKeys[0] ?? null);
  }

  sendInput(dir) {
    if (this.isHost) this.engine?.setInput(this.me.id, dir);
    else this.ctx.sendMessage({ t: 'action', action: { a: 'input', dir } }, this.hostId);
  }

  sendBomb() {
    if (this.isHost) this.engine?.placeBomb(this.me.id);
    else this.ctx.sendMessage({ t: 'action', action: { a: 'bomb' } }, this.hostId);
  }

  /* -------- rendu -------- */

  pos(x, y) { return `translate(${x * 100}%, ${y * 100}%)`; }

  render(state) {
    this.state = state;
    this.renderHud(state);

    // Terrain : reconstruit seulement quand la grille change.
    if (state.grid !== this.lastGrid) {
      this.lastGrid = state.grid;
      const cells = [];
      for (let y = 0; y < ROWS; y += 1) {
        for (let x = 0; x < COLS; x += 1) {
          const c = Number(state.grid[y * COLS + x]);
          if (c === T.EMPTY) continue;
          cells.push(h('div', {
            className: `bm__cell bm__cell--${c === T.WALL ? 'wall' : 'brick'}`,
            style: `transform:${this.pos(x, y)};`,
          }));
        }
      }
      this.terrain.replaceChildren(...cells);
    }

    // Entités éphémères : bombes, flammes, bonus (reconstruites, pas de transition).
    const eph = [];
    for (const u of state.powerups) {
      eph.push(h('div', { className: 'bm__ent bm__ent--pu', style: `--tf:${this.pos(u.x, u.y)};transform:${this.pos(u.x, u.y)};` }, PU_ICONS[u.type]));
    }
    for (const f of state.flames) {
      eph.push(h('div', { className: 'bm__ent bm__ent--flame', style: `transform:${this.pos(f.x, f.y)};` }, '💥'));
    }
    for (const b of state.bombs) {
      eph.push(h('div', { className: 'bm__ent bm__ent--bomb', style: `--tf:${this.pos(b.x, b.y)};transform:${this.pos(b.x, b.y)};` }, '💣'));
    }

    // Joueurs : nœuds réutilisés (transition CSS de déplacement fluide).
    const seen = new Set();
    for (const p of state.players) {
      seen.add(p.id);
      let node = this.playerNodes.get(p.id);
      if (!node) {
        node = h('div', { className: 'bm__ent bm__ent--player' }, [
          h('span', { className: 'tag', style: `color:${PLAYER_COLORS[p.slot]}` }, p.pseudo),
          h('span', { className: 'face' }, PLAYER_SKINS[p.slot]),
        ]);
        this.playerNodes.set(p.id, node);
      }
      node.style.transform = this.pos(p.x, p.y);
      node.style.opacity = p.alive ? '1' : '0';
      if (!node.isConnected) this.entities.append(node);
    }
    for (const [id, node] of this.playerNodes) {
      if (!seen.has(id)) { node.remove(); this.playerNodes.delete(id); }
    }
    this.entities.querySelectorAll(':scope > :not(.bm__ent--player)').forEach((n) => n.remove());
    this.entities.prepend(...eph);

    this.renderOverlay(state);
  }

  renderHud(state) {
    const target = state.winsTarget;
    this.hud.replaceChildren(
      h('strong', {}, `💣 Manche ${state.round}`),
      ...state.players.map((p) => h('span', { className: `bm__score${p.alive || state.phase !== 'manche' ? '' : ' bm--dead'}` }, [
        h('span', { className: 'dot', style: `background:${PLAYER_COLORS[p.slot]}` }),
        `${p.pseudo} ${'★'.repeat(p.wins)}${'☆'.repeat(Math.max(0, target - p.wins))}`,
        ...(p.id === this.me.id ? [h('span', { style: 'opacity:.75;font-size:.8em;' }, ` 💣${p.bombs} 🔥${p.range} ⚡${p.speed}`)] : []),
      ])),
      h('span', { className: 'tl' }, state.phase === 'manche'
        ? `${Math.floor(state.timeLeft / 60000)}:${String(Math.ceil((state.timeLeft % 60000) / 1000) % 60).padStart(2, '0')}`
        : '—'),
    );
  }

  renderOverlay(state) {
    this.overlay?.remove();
    this.overlay = null;
    if (state.phase === 'fin-manche') {
      this.overlay = h('div', { className: 'bm__overlay' }, [
        h('h3', {}, state.roundWinner ? `🏆 ${state.roundWinner.pseudo} remporte la manche !` : '💨 Manche nulle…'),
        h('div', {}, 'La manche suivante démarre dans un instant.'),
      ]);
    } else if (state.phase === 'fin') {
      this.overlay = h('div', { className: 'bm__overlay' }, [
        h('h3', {}, `👑 ${state.matchWinner.pseudo} gagne la partie !`),
        h('div', {}, [...state.players].sort((a, b) => b.wins - a.wins).map((p) => `${p.pseudo} : ${p.wins}`).join(' · ')),
        h('div', { style: 'color:var(--text-dim,#aab);' }, 'Retour au salon dans quelques secondes…'),
      ]);
    }
    if (this.overlay) this.arena.append(this.overlay);
  }

  unmount() {
    this.unsubscribe?.();
    clearInterval(this.timers.loop);
    clearTimeout(this.timers.next);
    clearTimeout(this.timers.end);
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
    instance = new BombermanUI(container, context);
    instance.mount();
  },
  async unmount() {
    instance?.unmount();
    instance = null;
  },
};
