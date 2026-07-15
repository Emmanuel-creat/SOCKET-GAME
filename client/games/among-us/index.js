/**
 * AMONG US — interface du module Arcade (les règles sont dans ./engine.js).
 *
 * Host autoritaire temps réel (20 Hz). Chaque joueur reçoit une vue filtrée :
 * son rôle uniquement, et seulement ce que sa vision atteint. Les autres
 * clients n'envoient que des intentions (déplacement, kill, tâche, vote…).
 */
import { AmongEngine, ROOMS, TICK_MS, stepCollision } from './engine.js';
import { Predictor } from '../shared/predictor.js';
import { Interpolator } from '../shared/interpolator.js';

/**
 * Budget serveur. Sur Render Free (0,1 CPU), ce qui coûte au serveur, c'est le
 * NOMBRE de messages relayés — pas leur taille. On parle donc moins, et jamais
 * pour rien.
 */
const INPUT_MIN_MS = 60;
const INPUT_KEEPALIVE_MS = 1000;
const RENDER_MIN_MS = 25;   // ~40 images/s

/** Ticks entre deux diffusions : plus il y a de monde, moins on parle. */
function cadence(nb, phase) {
  // Le pas = nombre de ticks (50 ms) entre deux diffusions. pas=2 → 10 Hz.
  // Mesuré : serveur à 2,3 % de son cœur et Host sous 1 Mbit/s à 10 Hz / 10 joueurs,
  // vues allégées. On tient donc 10 Hz jusqu'à 10 joueurs (l'interpolateur suit),
  // puis on lève progressivement le pied pour les très grosses parties.
  if (phase !== 'jeu') return 10;  // réunion, vote, écran de fin : 2 Hz suffisent
  if (nb <= 10) return 2;  // 10 Hz
  if (nb <= 12) return 3;  // 6,7 Hz
  if (nb <= 14) return 4;  // 5 Hz
  return 5;                // 4 Hz
}

const CSS = `
.au { display: grid; grid-template-columns: 1fr 300px; gap: 12px; height: 100%; min-height: 0; width: 100%; color: var(--text, #e8ecff); }
.au__main { display: flex; flex-direction: column; gap: 10px; min-width: 0; min-height: 0; }
.au__panel { background: var(--glass, rgba(255,255,255,.05)); border: 1px solid var(--glass-border, rgba(255,255,255,.09)); border-radius: var(--radius-m, 14px); padding: 10px 12px; }
.au__hud { display: flex; align-items: center; gap: 12px; flex-wrap: wrap; font-size: .85rem; }
.au__hud .imp { color: #ff6b6b; font-weight: 800; }
.au__hud .crew { color: #7fd6ff; font-weight: 800; }
.au__bar { flex: 1; min-width: 110px; height: 8px; border-radius: 99px; background: rgba(255,255,255,.12); overflow: hidden; }
.au__bar i { display: block; height: 100%; background: linear-gradient(90deg,#50ef39,#38fedc); }
.au__stage { flex: 1; min-height: 0; position: relative; display: flex; }
.au__canvas { width: 100%; height: 100%; display: block; border-radius: 12px; background: #04060c; touch-action: none; }
.au__acts { position: absolute; right: 10px; bottom: 10px; display: flex; flex-direction: column; gap: 8px; align-items: flex-end; }
.au__acts button { border: 1px solid rgba(255,255,255,.18); background: rgba(10,14,26,.85); color: inherit; border-radius: 12px; padding: 9px 14px; font-weight: 700; cursor: pointer; }
.au__acts button:disabled { opacity: .35; cursor: not-allowed; }
.au__kill { background: #c51111 !important; border-color: #ff6b6b !important; }
.au__pad { position: absolute; left: 10px; bottom: 10px; width: 120px; height: 120px; border-radius: 50%; background: rgba(255,255,255,.06); border: 1px solid rgba(255,255,255,.16); touch-action: none; }
.au__pad i { position: absolute; width: 46px; height: 46px; border-radius: 50%; background: rgba(255,255,255,.26); left: 37px; top: 37px; }
.au__modal { position: absolute; inset: 0; background: rgba(3,5,12,.9); border-radius: 12px; display: flex; align-items: center; justify-content: center; padding: 16px; overflow: auto; }
.au__card { background: var(--glass, rgba(255,255,255,.06)); border: 1px solid var(--glass-border, rgba(255,255,255,.14)); border-radius: 16px; padding: 18px; max-width: 640px; width: 100%; display: grid; gap: 12px; }
.au__tasks { display: flex; flex-direction: column; gap: 3px; font-size: .82rem; }
.au__tasks .ok { color: #50ef39; text-decoration: line-through; opacity: .7; }
.au__tasks .fake { color: #ff9f9f; }
.au__roster { display: flex; flex-direction: column; gap: 3px; font-size: .82rem; }
.au__roster .out { opacity: .45; text-decoration: line-through; }
.au__dot { display: inline-block; width: 11px; height: 11px; border-radius: 50%; border: 1px solid rgba(0,0,0,.5); vertical-align: middle; margin-right: 5px; }
.au__log { font-size: .78rem; color: var(--text-dim, #aab); max-height: 110px; overflow: auto; display: flex; flex-direction: column; gap: 2px; }
.au-chat { display: flex; flex-direction: column; flex: 1; min-height: 110px; }
.au-chat__log { flex: 1; overflow: auto; font-size: .82rem; display: flex; flex-direction: column; gap: 2px; }
.au-chat__log .dead { color: #ff9f9f; }
.au-chat__form { display: flex; gap: 6px; margin-top: 6px; }
.au-chat__form input { flex: 1; min-width: 0; background: rgba(0,0,0,.3); border: 1px solid rgba(255,255,255,.12); color: inherit; border-radius: 8px; padding: 6px 9px; }
.au__side { display: flex; flex-direction: column; gap: 10px; min-height: 0; }
.au__vote { display: grid; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); gap: 8px; }
.au__vote button { display: flex; align-items: center; gap: 8px; background: rgba(255,255,255,.06); border: 1px solid rgba(255,255,255,.14); border-radius: 12px; padding: 8px 10px; color: inherit; cursor: pointer; text-align: left; }
.au__vote button.on { border-color: #fff; }
.au__vote button:disabled { opacity: .4; cursor: not-allowed; }
.au__vote .n { margin-left: auto; font-weight: 800; }
.au__setup { display: grid; gap: 6px; max-height: 46vh; overflow: auto; }
.au__row { display: flex; gap: 8px; align-items: center; background: rgba(0,0,0,.22); border: 1px solid rgba(255,255,255,.1); border-radius: 10px; padding: 6px 10px; font-size: .82rem; }
.au__row select, .au__row input[type=number] { margin-left: auto; background: rgba(0,0,0,.35); color: inherit; border: 1px solid rgba(255,255,255,.15); border-radius: 8px; padding: 4px 6px; }
.au__wires { display: flex; justify-content: space-between; gap: 40px; }
.au__wires div { display: flex; flex-direction: column; gap: 14px; }
.au__wires button { width: 54px; height: 26px; border-radius: 6px; border: 2px solid transparent; cursor: pointer; }
.au__wires button.on { border-color: #fff; }
.au__wires button.done { opacity: .35; cursor: default; }
.au__keys { display: grid; grid-template-columns: repeat(3, 1fr); gap: 6px; max-width: 220px; margin: 0 auto; }
.au__keys button { padding: 12px; border-radius: 10px; border: 1px solid rgba(255,255,255,.15); background: rgba(255,255,255,.07); color: inherit; font-size: 1.1rem; cursor: pointer; }
.au__simon { display: grid; grid-template-columns: repeat(2, 90px); gap: 8px; justify-content: center; }
.au__simon button { height: 70px; border-radius: 12px; border: 2px solid rgba(255,255,255,.2); cursor: pointer; }
.au__simon button.lit { filter: brightness(2.2); }
.au__ast { position: relative; height: 200px; background: #060a18; border-radius: 12px; overflow: hidden; }
.au__ast button { position: absolute; width: 34px; height: 34px; border-radius: 50%; border: none; background: #8b8f9c; cursor: crosshair; }
.au__hold { height: 14px; border-radius: 99px; background: rgba(255,255,255,.12); overflow: hidden; }
.au__hold i { display: block; height: 100%; background: #38fedc; width: 0; }
@media (max-width: 1050px) { .au { grid-template-columns: 1fr; } }
`;

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
    if (c === null || c === undefined || c === false) return;
    node.append(typeof c === 'string' ? document.createTextNode(c) : c);
  });
  return node;
}

const secs = (ms) => `${Math.max(0, Math.ceil(ms / 1000))} s`;
const roomName = (id) => ROOMS.find((r) => r.id === id)?.nom ?? id;
const SAB_LABEL = {
  lumieres: '💡 Lumières', communications: '📡 Communications',
  reacteur: '☢️ Réacteur', o2: '🫁 Oxygène', portes: '🚪 Portes',
};

class AmongUI {
  constructor(container, context) {
    this.container = container;
    this.ctx = context;
    this.me = context.me;
    this.engine = null;
    this.view = null;
    this.prev = null;
    this.viewAt = 0;
    this.keys = new Set();
    this.stick = { active: false, dx: 0, dy: 0, id: null };
    this.lastSent = 0;
    this.ticks = 0;
    this.modal = null;   // mini-jeu ou panneau ouvert
    this.state = { chat: [], deadChat: [], log: [] };  // ce que ce client possède déjà
    this.syncMap = new Map();                          // Host : ce que chaque joueur possède
    this.mapLayer = null;                              // carte pré-dessinée (elle ne bouge pas)
    this.sideSig = null;
    // Prédiction locale : l'invité avance tout de suite, sans attendre le Host.
    this.pred = new Predictor(stepCollision);
    this.interp = new Interpolator();   // lisse la position des AUTRES joueurs
  }

  get isHost() { return this.ctx.me.id === this.ctx.hostId; }
  get hostId() { return this.ctx.hostId; }

  mount() {
    this.styleEl = h('style', {}, CSS);
    this.root = h('div', { className: 'au' });
    this.container.append(this.styleEl, this.root);

    if (this.isHost) {
      try {
        this.engine = new AmongEngine(this.ctx.players, { hostId: this.ctx.hostId });
      } catch (error) {
        this.root.replaceChildren(h('div', { className: 'au__panel', style: 'margin:auto' }, `⚠️ ${error.message}`));
        return;
      }
      this.unsub = this.ctx.onMessage(({ from, data }) => {
        if (data?.t !== 'action') return;
        const res = this.engine.handleAction(from, data.action);
        if (!res?.ok && res?.error && data.action.a !== 'input') {
          this.ctx.sendMessage({ t: 'error', message: res.error }, from);
        } else if (res?.ok && data.action.a !== 'input') this.broadcast();
      });
      this.loop = setInterval(() => this.hostTick(), TICK_MS);
    } else {
      this.unsub = this.ctx.onMessage(({ from, data }) => {
        if (from !== this.hostId) return;
        if (data?.t === 'view') this.receive(data.view);
        else if (data?.t === 'error') this.status(data.message);
      });
    }

    this.onKeyDown = (e) => {
      if (e.target?.tagName === 'INPUT') return;
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Space'].includes(e.code)) e.preventDefault();
      if (e.code === 'KeyR') this.report();
      if (e.code === 'KeyF') this.use();
      if (e.code === 'Space') this.killNearby();
      this.keys.add(e.code);
      this.sendInput();
    };
    this.onKeyUp = (e) => { this.keys.delete(e.code); this.sendInput(); };
    window.addEventListener('keydown', this.onKeyDown);
    window.addEventListener('keyup', this.onKeyUp);

    this.build();
    if (this.isHost) this.broadcast();
    this.raf = requestAnimationFrame(() => this.frame());
  }

  hostTick() {
    this.engine.tick();
    this.ticks += 1;
    // Avant : 10 Hz en jeu, mais 20 Hz pendant TOUTE réunion — un écran fixe
    // diffusé vingt fois par seconde à chaque joueur.
    const pas = cadence(this.engine.players.length, this.engine.phase);
    if (this.ticks % pas === 0) this.broadcast();
    if (this.engine.phase === 'fin' && !this.endTimer) {
      const result = this.engine.summary();
      this.endTimer = setTimeout(() => this.ctx.onEnd(result), 8000);
    }
  }

  /** Diffusion différentielle : chacun ne reçoit que ce qu'il n'a pas déjà. */
  broadcast() {
    const e = this.engine;
    for (const p of e.players) {
      const sync0 = this.syncMap.get(p.id) ?? null;
      // Un joueur qui vient de mourir doit recevoir l'historique du chat des morts.
      const sync = (sync0 && !p.alive && !sync0.deadReset) ? { ...sync0, chatSeq: 0, deadReset: true } : sync0;
      const view = e.getViewFor(p.id, sync);
      this.syncMap.set(p.id, {
        map: e.mapVersion,
        rosterVersion: e.rosterVersion,
        tasksVersion: p.tasksVersion,
        optionsVersion: e.optionsVersion,
        chatSeq: e.chatSeq,
        logSeq: e.logSeq,
        deadReset: sync?.deadReset || !p.alive,
      });
      if (p.id === this.me.id) this.receive(view);
      else this.ctx.sendMessage({ t: 'view', view }, p.id);
    }
  }

  /** Le client réassemble la vue complète à partir de ce qu'il gardait. */
  receive(view) {
    const s = this.state;
    if (view.grid) {
      s.grid = view.grid; s.cols = view.cols; s.rows = view.rows;
      s.rooms = view.rooms; s.stations = view.stations; s.mapVersion = view.mapVersion;
      this.mapLayer = null;
    }
    if (view.roster) s.roster = view.roster;
    // Les options ne changent pas pendant la partie : envoyées une fois, gardées ici.
    if (view.options) s.options = view.options;
    if (view.me?.tasks) s.tasks = view.me.tasks;
    if (view.chat?.length) s.chat = [...s.chat, ...view.chat].slice(-60);
    if (view.deadChat?.length) s.deadChat = [...s.deadChat, ...view.deadChat].slice(-60);
    if (view.log?.length) s.log = [...s.log, ...view.log].slice(-20);

    // Le Host n'envoie plus pseudo/couleur dans chaque joueur visible — ils sont dans le
    // roster, qui ne change qu'à l'arrivée/départ d'un joueur. On les rattache ici, par
    // id, pour que le rendu retrouve ses champs habituels sans qu'on ait à le toucher.
    const parId = new Map((s.roster ?? []).map((p) => [p.id, p]));
    const habiller = (ent) => {
      const info = parId.get(ent.id);
      return info ? { ...ent, pseudo: info.pseudo, couleur: info.couleur } : ent;
    };

    const complete = {
      ...view,
      grid: s.grid, cols: s.cols, rows: s.rows, rooms: s.rooms, stations: s.stations, mapVersion: s.mapVersion,
      options: view.options ?? s.options,
      roster: s.roster ?? [], chat: s.chat, deadChat: s.deadChat, log: s.log,
      me: view.me ? { ...view.me, tasks: view.me.tasks ?? s.tasks ?? [] } : null,
      visibles: (view.visibles ?? []).map(habiller),
    };
    this.prev = this.view;
    this.view = complete;
    this.viewAt = performance.now();

    // Les autres joueurs entrent dans le tampon d'interpolation, horodatés par le Host.
    if (!this.isHost && Number.isFinite(complete.t)) this.interp.pousser(complete.t, complete.visibles ?? []);

    // --- prédiction locale : on se recale sur la vérité du Host ---
    const moi = complete.me;
    if (moi && !this.isHost) {
      if (complete.phase !== 'jeu' || moi.vented) this.pred.reset(moi.x, moi.y);
      else {
        const fermees = new Set();
        for (const d of complete.doorsClosed ?? []) for (const c of d.tiles) fermees.add(`${c.x},${c.y}`);
        this.pred.reconcilier(complete.t, moi,
          (x, y) => complete.grid?.[y]?.[x] !== '0' || fermees.has(`${x},${y}`), !moi.alive);
      }
    }

    const key = `${complete.phase}|${complete.meeting?.etape ?? ''}`;
    if (key !== this.lastKey) {
      this.lastKey = key;
      this.interp.reset();   // changement de phase/écran : on repart d'un tampon vide
      if (this.modal?.timer) clearInterval(this.modal.timer);
      this.modal = null;
      this.meetKey = null;
      this.build();
    }
    this.sync();
  }

  /**
   * Ma position À L'ÉCRAN. Le Host EST la vérité et s'affiche tel quel ; l'invité
   * affiche sa prédiction, sinon il se verrait réagir avec un aller-retour de retard.
   */
  moiAffiche() {
    const me = this.view?.me;
    if (!me) return null;
    if (this.isHost || !this.pred.pos) return me;
    const p = this.pred.vue ?? this.pred.pos;
    return { ...me, x: p.x, y: p.y };
  }

  act(a) {
    if (this.isHost) {
      const res = this.engine.handleAction(this.me.id, a);
      if (!res?.ok && res?.error && a.a !== 'input') this.status(res.error);
      if (a.a !== 'input') this.broadcast();
      return res;
    }
    this.ctx.sendMessage({ t: 'action', action: a }, this.hostId);
    return { ok: true };
  }

  status(msg) {
    if (!this.statusEl) return;
    this.statusEl.textContent = msg ?? '';
    clearTimeout(this.statusTimer);
    this.statusTimer = setTimeout(() => { if (this.statusEl) this.statusEl.textContent = ''; }, 3500);
  }

  /* ---------------- entrées ---------------- */

  axis() {
    if (this.stick.active) return { dx: this.stick.dx, dy: this.stick.dy };
    const k = this.keys;
    return {
      dx: (k.has('ArrowRight') || k.has('KeyD') ? 1 : 0) - (k.has('ArrowLeft') || k.has('KeyA') || k.has('KeyQ') ? 1 : 0),
      dy: (k.has('ArrowDown') || k.has('KeyS') ? 1 : 0) - (k.has('ArrowUp') || k.has('KeyW') || k.has('KeyZ') ? 1 : 0),
    };
  }

  /**
   * Une entrée n'est envoyée QUE si elle a changé : le Host garde de toute façon
   * la dernière reçue. Avant, chaque invité expédiait ~16 messages/s en continu.
   */
  sendInput(force = false) {
    const now = performance.now();
    // On ne marche pas en pleine tâche : la console immobilise.
    const { dx, dy } = this.modal ? { dx: 0, dy: 0 } : this.axis();
    const sig = `${Math.round(dx * 8)}|${Math.round(dy * 8)}`;
    const bouge = dx !== 0 || dy !== 0;
    const rappel = bouge && now - this.lastSent > INPUT_KEEPALIVE_MS;

    if (!force && !rappel && sig === this.lastSig) return;          // rien de neuf : on se tait

    // Trop tôt : on ne l'envoie pas MAINTENANT, mais on ne l'oublie pas — lastSig
    // reste inchangé, donc la boucle d'images la renverra dès la fenêtre écoulée.
    if (!force && now - this.lastSent < INPUT_MIN_MS) return;       // jamais plus de ~16/s

    this.lastSig = sig;
    this.lastSent = now;
    this.act({ a: 'input', dx, dy, ts: Date.now() });
  }

  killNearby() {
    const me = this.view?.me;
    if (me?.role === 'impostor' && me.cible) this.act({ a: 'kill', target: me.cible });
  }

  report() {
    const ids = this.view?.canReport ?? [];
    if (ids.length) this.act({ a: 'report', body: ids[0] });
  }

  /** Touche « utiliser » : urgence, réparation, tâche, conduit. */
  use() {
    const v = this.view;
    if (!v?.me || v.phase !== 'jeu') return;
    const me = v.me;
    if (v.canEmergency) { this.act({ a: 'emergency' }); return; }
    if (v.sabotage && this.fixable(v)) { this.openFix(v); return; }
    const t = me.tasks.find((tt) => !tt.fait && tt.salle === me.room);
    if (t && !me.vented) { this.openTask(t); return; }
    if (me.role === 'impostor' && me.ventIci) this.act({ a: 'vent', vent: me.vented ? null : undefined });
  }

  fixable(v) {
    const s = v.sabotage.type;
    const me = v.me;
    if (!me.alive) return false;
    if (s === 'lumieres') return me.room === 'electrical';
    if (s === 'communications') return me.room === 'communications';
    if (s === 'reacteur') return me.room === 'reactor';
    if (s === 'o2') return me.room === 'o2' || me.room === 'admin';
    return false;
  }

  /* ---------------- construction ---------------- */

  build() {
    const v = this.view;
    this.statusEl = h('div', { style: 'min-height:1.1em;text-align:center;color:var(--warning,#ffb454);font-size:.82rem' });

    if (!v || v.phase === 'setup') { this.root.replaceChildren(this.buildSetup(), this.buildSide()); return; }
    if (v.phase === 'fin') { this.root.replaceChildren(this.buildEnd(), this.buildSide()); return; }
    if (v.phase === 'reunion') { this.meetKey = null; this.renderMeeting(); return; }

    this.canvas = h('canvas', { className: 'au__canvas' });
    this.actsEl = h('div', { className: 'au__acts' });
    this.modalEl = h('div');
    this.hudEl = h('div', { className: 'au__panel au__hud' });

    const stage = h('div', { className: 'au__stage' }, [this.canvas, this.buildPad(), this.actsEl, this.modalEl]);
    this.root.replaceChildren(
      h('div', { className: 'au__main' }, [this.hudEl, stage, this.statusEl]),
      this.buildSide(),
    );
    this.sync();
  }

  buildSetup() {
    const v = this.view;
    const body = [h('h3', { style: 'margin:0;text-align:center' }, '🚀 Among Us')];
    body.push(h('div', { style: 'text-align:center;font-size:.85rem;color:var(--text-dim,#aab)' },
      'L\'équipage termine ses tâches ; les imposteurs tuent, sabotent et mentent. Tout se joue en réunion.'));

    if (this.isHost && v) {
      const box = h('div', { className: 'au__setup' });
      const num = (label, key, min, max, step = 1, div = 1) => {
        const i = h('input', { type: 'number', min: String(min), max: String(max), step: String(step), style: 'width:90px' });
        i.value = String(v.options[key] / div);
        i.addEventListener('change', () => this.act({ a: 'configure', options: { [key]: Number(i.value) * div } }));
        return h('div', { className: 'au__row' }, [h('b', {}, label), i]);
      };
      const sel = (label, key, opts) => {
        const s = h('select', {}, opts.map(([val, txt]) => h('option', { value: String(val) }, txt)));
        s.value = String(v.options[key]);
        s.addEventListener('change', () => {
          const raw = s.value;
          const val = raw === 'true' ? true : raw === 'false' ? false : raw;
          this.act({ a: 'configure', options: { [key]: val } });
        });
        return h('div', { className: 'au__row' }, [h('b', {}, label), s]);
      };
      box.append(
        num('Imposteurs', 'imposteurs', 1, 3),
        num('Vitesse (×)', 'vitesse', 0.5, 3, 0.25),
        num('Vision équipage (×)', 'visionCrew', 0.25, 5, 0.25),
        num('Vision imposteur (×)', 'visionImposteur', 0.25, 5, 0.25),
        num('Cooldown kill (s)', 'killCooldown', 10, 60, 5, 1000),
        sel('Distance de kill', 'killDistance', [['courte', 'Courte'], ['normale', 'Normale'], ['longue', 'Longue']]),
        num('Réunions d\'urgence', 'reunions', 0, 9),
        num('Discussion (s)', 'tempsDiscussion', 0, 120, 5, 1000),
        num('Vote (s)', 'tempsVote', 15, 300, 5, 1000),
        sel('Votes anonymes', 'votesAnonymes', [['false', 'Non'], ['true', 'Oui']]),
        sel('Confirmer l\'éjection', 'confirmerEjection', [['true', 'Oui'], ['false', 'Non']]),
        sel('Barre des tâches', 'barreTaches', [['toujours', 'Toujours'], ['reunions', 'Réunions'], ['jamais', 'Jamais']]),
        num('Tâches courtes', 'tachesCourtes', 0, 6),
        num('Tâches longues', 'tachesLongues', 0, 4),
        num('Tâches communes', 'tachesCommunes', 0, 2),
      );
      body.push(box, h('div', { style: 'text-align:center' }, [
        h('button', { className: 'btn btn--primary', onClick: () => this.act({ a: 'start' }) }, '🚀 Lancer la partie'),
      ]));
    } else {
      body.push(h('div', { style: 'text-align:center;color:var(--text-dim,#aab);font-size:.85rem' }, 'Le Host règle la partie…'));
    }
    return h('div', { className: 'au__main' }, [
      h('div', { className: 'au__panel', style: 'margin:auto;display:grid;gap:10px;max-width:560px;width:100%' }, body),
      this.statusEl,
    ]);
  }

  buildEnd() {
    const f = this.view.finalSummary;
    return h('div', { className: 'au__main' }, [
      h('div', { className: 'au__panel', style: 'margin:auto;display:grid;gap:10px;text-align:center' }, [
        h('h3', { style: 'margin:0' }, f.summary),
        h('div', { style: 'color:var(--text-dim,#aab)' }, 'Retour au salon dans quelques secondes…'),
      ]),
      this.statusEl,
    ]);
  }

  buildPad() {
    const pad = h('div', { className: 'au__pad' });
    const knob = h('i');
    pad.append(knob);
    const move = (e) => {
      const r = pad.getBoundingClientRect();
      const dx = (e.clientX - (r.left + r.width / 2)) / (r.width / 2);
      const dy = (e.clientY - (r.top + r.height / 2)) / (r.height / 2);
      const len = Math.hypot(dx, dy) || 1;
      const nx = len > 1 ? dx / len : dx;
      const ny = len > 1 ? dy / len : dy;
      this.stick = { active: true, dx: nx, dy: ny, id: e.pointerId };
      knob.style.left = `${37 + nx * 30}px`;
      knob.style.top = `${37 + ny * 30}px`;
      this.sendInput();
    };
    pad.addEventListener('pointerdown', (e) => { pad.setPointerCapture(e.pointerId); move(e); });
    pad.addEventListener('pointermove', (e) => { if (this.stick.active && e.pointerId === this.stick.id) move(e); });
    const rel = () => {
      this.stick = { active: false, dx: 0, dy: 0, id: null };
      knob.style.left = '37px'; knob.style.top = '37px';
      this.sendInput(true);
    };
    pad.addEventListener('pointerup', rel);
    pad.addEventListener('pointercancel', rel);
    return pad;
  }

  buildSide() {
    const v = this.view;
    this.tasksEl = h('div', { className: 'au__tasks' });
    this.rosterEl = h('div', { className: 'au__roster' });
    this.logEl = h('div', { className: 'au__log' });
    this.chatLog = h('div', { className: 'au-chat__log' });

    const input = h('input', { placeholder: v?.phase === 'reunion' || !v?.me?.alive ? 'Message…' : 'On ne parle qu\'en réunion', maxlength: '220' });
    const send = () => {
      const text = input.value.trim();
      if (!text) return;
      input.value = '';
      this.act({ a: 'chat', text });
    };
    input.addEventListener('keydown', (e) => { e.stopPropagation(); if (e.key === 'Enter') send(); });
    input.addEventListener('keyup', (e) => e.stopPropagation());

    const side = h('div', { className: 'au__side' }, [
      h('div', { className: 'au__panel' }, [h('strong', {}, '📋 Tâches'), this.tasksEl]),
      h('div', { className: 'au__panel' }, [h('strong', {}, '👥 Équipage'), this.rosterEl]),
      h('div', { className: 'au__panel' }, [h('strong', {}, '📜 Journal'), this.logEl]),
      h('div', { className: 'au__panel au-chat' }, [
        h('strong', {}, '💬 Chat'),
        this.chatLog,
        h('div', { className: 'au-chat__form' }, [input, h('button', { className: 'btn btn--small btn--primary', onClick: send }, '➤')]),
      ]),
    ]);
    this.sync();
    return side;
  }

  /* ---------------- synchronisation ---------------- */

  sync() {
    const v = this.view;
    if (!v || !v.me) return;
    const me = v.me;

    if (this.hudEl) {
      const bits = [
        h('span', { className: me.role === 'impostor' ? 'imp' : 'crew' },
          me.role === 'impostor' ? '😈 IMPOSTEUR' : '👨‍🚀 ÉQUIPAGE'),
        !me.alive ? h('span', { style: 'color:#ff9f9f' }, '👻 Fantôme') : null,
      ];
      if (v.progress) {
        bits.push(h('span', {}, '📋'), h('span', { className: 'au__bar' }, h('i', { style: `width:${Math.round(v.progress.ratio * 100)}%` })));
      }
      if (me.role === 'impostor' && me.alive) {
        bits.push(h('span', {}, me.killReste > 0 ? `🔪 ${secs(me.killReste)}` : '🔪 prêt'));
        bits.push(h('span', {}, me.sabotageReste > 0 ? `🧨 ${secs(me.sabotageReste)}` : '🧨 prêt'));
      }
      if (v.sabotage) {
        bits.push(h('span', { style: 'color:#ff6b6b;font-weight:800' },
          `${SAB_LABEL[v.sabotage.type]}${v.sabotage.reste !== null ? ` — ${secs(v.sabotage.reste)}` : ''}`));
      }
      if (v.commsHS) bits.push(h('span', { style: 'color:#ffb454' }, '📡 Communications coupées'));
      this.hudEl.replaceChildren(...bits.filter(Boolean));
    }

    const sideSig = `${v.rosterVersion}|${me.tasksVersion ?? 0}|${v.log.at(-1)?.seq ?? 0}|${v.chat.at(-1)?.seq ?? 0}|${v.deadChat.at(-1)?.seq ?? 0}|${v.commsHS ? 1 : 0}`;
    const majSide = sideSig !== this.sideSig;
    if (majSide) this.sideSig = sideSig;

    if (this.tasksEl && majSide) {
      const items = me.tasks.map((t) => h('div', { className: t.fait ? 'ok' : '' }, [
        `${t.fait ? '✅' : '▫️'} ${t.nom}`,
        !t.fait && !v.commsHS
          ? h('span', { style: 'color:var(--text-dim,#aab)' }, ` — ${t.salleNom}${t.total > 1 ? ` (${t.etape + 1}/${t.total})` : ''}`)
          : null,
      ]));
      if (v.commsHS) items.unshift(h('div', { style: 'color:#ffb454' }, '📡 Liste masquée (communications coupées)'));
      if (me.role === 'impostor') items.unshift(h('div', { className: 'fake' }, '⚠️ Vos tâches sont FEINTES : elles ne remplissent pas la barre.'));
      this.tasksEl.replaceChildren(...items);
    }

    if (this.rosterEl && majSide) {
      this.rosterEl.replaceChildren(...v.roster.map((p) => {
        const vu = v.visibles?.find((q) => q.id === p.id);
        const imp = (p.id === me.id ? me.role : vu?.role) === 'impostor';
        return h('div', { className: p.alive ? '' : 'out' }, [
          h('span', { className: 'au__dot', style: `background:${p.couleur}` }),
          h('b', {}, p.pseudo),
          imp ? h('span', { style: 'color:#ff6b6b' }, ' 😈') : null,
          p.id === me.id ? h('span', { style: 'color:var(--text-dim,#aab)' }, ' (vous)') : null,
        ]);
      }));
    }

    if (this.logEl && majSide) this.logEl.replaceChildren(...[...(v.log ?? [])].reverse().map((l) => h('div', {}, l.text)));

    if (this.chatLog && majSide) {
      const msgs = [...(v.chat ?? []), ...(v.deadChat ?? []).map((m) => ({ ...m, dead: true }))].sort((a, b) => a.ts - b.ts);
      this.chatLog.replaceChildren(...msgs.map((m) => h('div', { className: m.dead ? 'dead' : '' }, [
        h('span', { className: 'au__dot', style: `background:${m.couleur}` }),
        h('b', {}, `${m.dead ? '👻 ' : ''}${m.pseudo} `), m.text,
      ])));
      this.chatLog.scrollTop = this.chatLog.scrollHeight;
    }

    if (this.actsEl) this.syncActions();
    if (this.modalEl) this.syncModal();
  }

  syncActions() {
    const v = this.view;
    const me = v.me;
    if (v.phase !== 'jeu' || !me.alive) { this.actsEl.replaceChildren(); return; }
    const acts = [];

    if (me.role === 'impostor') {
      acts.push(h('button', {
        className: 'au__kill', disabled: !me.cible, onClick: () => this.killNearby(),
      }, me.killReste > 0 ? `🔪 ${secs(me.killReste)}` : '🔪 Tuer'));
      acts.push(h('button', {
        disabled: me.sabotageReste > 0,
        onClick: () => { this.modal = { kind: 'sabotage' }; this.syncModal(); },
      }, '🧨 Saboter'));
      if (me.ventIci) {
        acts.push(h('button', { onClick: () => this.act({ a: 'vent', vent: me.vented ? null : undefined }) },
          me.vented ? '⬆️ Sortir du conduit' : '⬇️ Entrer dans le conduit'));
        if (me.vented) {
          for (const l of me.ventLinks) {
            const dest = (v.vents ?? []).find((x) => x.id === l);
            acts.push(h('button', { onClick: () => this.act({ a: 'vent', vent: l }) }, `➡️ ${roomName(dest?.room ?? l)}`));
          }
        }
      }
    }
    const t = me.tasks.find((tt) => !tt.fait && tt.salle === me.room);
    if (t && !me.vented) acts.push(h('button', { onClick: () => this.openTask(t) }, `🛠️ ${t.nom}`));
    if (v.sabotage && this.fixable(v)) acts.push(h('button', { onClick: () => this.openFix(v) }, '🔧 Réparer'));
    if (v.canReport?.length) acts.push(h('button', { style: 'background:#c51111', onClick: () => this.report() }, '☠️ Signaler'));
    if (v.canEmergency) acts.push(h('button', { onClick: () => this.act({ a: 'emergency' }) }, `🚨 Urgence (${me.meetingsLeft})`));
    if (v.cameras) acts.push(h('button', { onClick: () => { this.modal = { kind: 'cameras' }; this.syncModal(); } }, '📹 Caméras'));
    if (v.admin) acts.push(h('button', { onClick: () => { this.modal = { kind: 'admin' }; this.syncModal(); } }, '🗺️ Administration'));
    this.actsEl.replaceChildren(...acts);
  }

  openTask(t) {
    const res = this.act({ a: 'task-start', task: t.id });
    if (this.isHost && !res.ok) return;
    this.modal = { kind: 'task', task: t, debut: performance.now(), pret: false };
    this.sendInput(true);
    this.syncModal();
  }

  openFix(v) { this.modal = { kind: 'fix' }; this.syncModal(); }

  closeModal() {
    if (this.modal?.timer) clearInterval(this.modal.timer);
    this.modal = null;
    this.sendInput(true);
    this.syncModal();
  }

  syncModal() {
    if (!this.modalEl) return;
    if (!this.modal) { this.modalEl.replaceChildren(); return; }
    if (this.modal.rendu) return;   // un mini-jeu ne se redessine pas à chaque vue
    const m = this.modal;
    let card = null;
    if (m.kind === 'task') card = this.renderTask(m);
    else if (m.kind === 'sabotage') card = this.renderSabotage();
    else if (m.kind === 'fix') card = this.renderFix();
    else if (m.kind === 'cameras') card = this.renderCameras();
    else if (m.kind === 'admin') card = this.renderAdmin();
    if (!card) { this.modalEl.replaceChildren(); return; }
    m.rendu = m.kind === 'task';   // les panneaux d'info se rafraîchissent, pas les mini-jeux
    this.modalEl.replaceChildren(h('div', { className: 'au__modal' }, card));
  }

  /* ---------------- mini-jeux ---------------- */

  renderTask(m) {
    const t = m.task;
    const body = [h('h3', { style: 'margin:0' }, `🛠️ ${t.nom}`)];

    if (t.mini === 'wires') body.push(this.miniWires(m));
    else if (t.mini === 'keypad') body.push(this.miniKeypad(m));
    else if (t.mini === 'simon') body.push(this.miniSimon(m));
    else if (t.mini === 'asteroids') body.push(this.miniAsteroids(m));
    else { m.pret = true; body.push(h('div', { style: 'text-align:center;color:var(--text-dim,#aab);font-size:.86rem' }, 'Opération en cours, restez à la console…')); }

    // Le Host impose une durée minimale : le bouton n'apparaît pas avant.
    const bar = h('div', { className: 'au__hold' }, h('i'));
    const fill = bar.firstChild;
    const valider = h('button', {
      className: 'btn btn--primary', disabled: true,
      onClick: () => {
        const res = this.act({ a: 'task-done', task: t.id });
        if (this.isHost && !res.ok) { this.status(res.error); return; }
        this.closeModal();
      },
    }, '✅ Valider');
    m.timer = setInterval(() => {
      const ecoule = performance.now() - m.debut;
      fill.style.width = `${Math.min(100, Math.round((ecoule / t.duree) * 100))}%`;
      valider.disabled = !(m.pret && ecoule >= t.duree);
    }, 80);

    body.push(bar);
    body.push(h('div', { style: 'display:flex;gap:8px;justify-content:flex-end' }, [
      h('button', { className: 'btn btn--ghost', onClick: () => this.closeModal() }, 'Abandonner'),
      valider,
    ]));
    return h('div', { className: 'au__card' }, body);
  }

  miniWires(m) {
    const cols = ['#e8433f', '#3b7dd8', '#e3b924', '#c86bff'];
    const right = [...cols].sort(() => (Math.random() < 0.5 ? 1 : -1));
    const gauche = h('div');
    const droite = h('div');
    const btns = new Map();
    let sel = null;
    let ok = 0;
    for (const c of cols) {
      const b = h('button', { style: `background:${c}` });
      b.addEventListener('click', () => {
        if (b.classList.contains('done')) return;
        sel = c;
        for (const x of btns.values()) x.classList.remove('on');
        b.classList.add('on');
      });
      btns.set(c, b);
      gauche.append(b);
    }
    for (const c of right) {
      const b = h('button', { style: `background:${c}` });
      b.addEventListener('click', () => {
        if (sel !== c || b.classList.contains('done')) return;
        b.classList.add('done');
        btns.get(c).classList.add('done');
        btns.get(c).classList.remove('on');
        sel = null;
        ok += 1;
        if (ok === cols.length) m.pret = true;
      });
      droite.append(b);
    }
    return h('div', {}, [
      h('div', { style: 'text-align:center;color:var(--text-dim,#aab);font-size:.85rem;margin-bottom:10px' }, 'Reliez chaque fil à sa couleur.'),
      h('div', { className: 'au__wires' }, [gauche, droite]),
    ]);
  }

  miniKeypad(m) {
    const code = String(Math.floor(1000 + Math.random() * 8999));
    const disp = h('div', { style: 'text-align:center;font-size:1.3rem;letter-spacing:.3em;font-weight:800' }, '____');
    let saisi = '';
    const keys = h('div', { className: 'au__keys' });
    for (let i = 1; i <= 9; i += 1) {
      keys.append(h('button', {
        onClick: () => {
          if (saisi.length >= 4) return;
          saisi += String(i);
          disp.textContent = saisi.padEnd(4, '_');
          if (saisi.length === 4) {
            if (saisi === code) m.pret = true;
            else { saisi = ''; disp.textContent = '____'; }
          }
        },
      }, String(i)));
    }
    return h('div', { style: 'display:grid;gap:8px' }, [
      h('div', { style: 'text-align:center;color:var(--text-dim,#aab);font-size:.85rem' }, `Saisissez le code : ${code}`),
      disp, keys,
    ]);
  }

  miniSimon(m) {
    const cols = ['#e8433f', '#3b7dd8', '#3aa757', '#e3b924'];
    const seq = Array.from({ length: 4 }, () => Math.floor(Math.random() * 4));
    let i = 0;
    const grid = h('div', { className: 'au__simon' });
    const btns = cols.map((c, idx) => {
      const b = h('button', { style: `background:${c}` });
      b.addEventListener('click', () => {
        if (idx === seq[i]) { i += 1; if (i === seq.length) m.pret = true; }
        else i = 0;
      });
      grid.append(b);
      return b;
    });
    seq.forEach((idx, k) => {
      const t1 = setTimeout(() => {
        btns[idx].classList.add('lit');
        setTimeout(() => btns[idx].classList.remove('lit'), 320);
      }, 420 * k);
      m.demo = t1;
    });
    return h('div', { style: 'display:grid;gap:8px' }, [
      h('div', { style: 'text-align:center;color:var(--text-dim,#aab);font-size:.85rem' }, 'Reproduisez la séquence.'),
      grid,
    ]);
  }

  miniAsteroids(m) {
    const zone = h('div', { className: 'au__ast' });
    let n = 0;
    const spawn = () => {
      const b = h('button', { style: `left:${8 + Math.random() * 82}%;top:${8 + Math.random() * 72}%` });
      b.addEventListener('click', () => {
        b.remove();
        n += 1;
        if (n >= 8) m.pret = true;
        else spawn();
      });
      zone.append(b);
    };
    for (let i = 0; i < 3; i += 1) spawn();
    return h('div', { style: 'display:grid;gap:8px' }, [
      h('div', { style: 'text-align:center;color:var(--text-dim,#aab);font-size:.85rem' }, 'Détruisez 8 astéroïdes.'),
      zone,
    ]);
  }

  renderSabotage() {
    const btn = (type, room = null) => h('button', {
      className: 'btn btn--ghost',
      onClick: () => { this.act({ a: 'sabotage', type, room }); this.closeModal(); },
    }, room ? roomName(room) : SAB_LABEL[type]);
    return h('div', { className: 'au__card' }, [
      h('h3', { style: 'margin:0' }, '🧨 Sabotage'),
      h('div', { style: 'display:flex;gap:8px;flex-wrap:wrap' }, [
        btn('lumieres'), btn('communications'), btn('reacteur'), btn('o2'),
      ]),
      h('div', { style: 'color:var(--text-dim,#aab);font-size:.84rem' }, '🚪 Verrouiller les portes d\'une salle (10 s) :'),
      h('div', { style: 'display:flex;gap:6px;flex-wrap:wrap' }, ROOMS.map((r) => btn('portes', r.id))),
      h('div', { style: 'text-align:right' }, h('button', { className: 'btn btn--ghost', onClick: () => this.closeModal() }, 'Fermer')),
    ]);
  }

  renderFix() {
    const v = this.view;
    const s = v.sabotage;
    if (!s) return null;
    const body = [h('h3', { style: 'margin:0' }, `🔧 ${SAB_LABEL[s.type]}`)];
    if (s.type === 'lumieres' || s.type === 'communications') {
      body.push(h('div', { style: 'color:var(--text-dim,#aab);font-size:.85rem' }, 'Rétablissez le système.'));
      body.push(h('button', { className: 'btn btn--primary', onClick: () => { this.act({ a: 'fix' }); this.closeModal(); } }, '🔧 Réparer'));
    } else if (s.type === 'reacteur') {
      body.push(h('div', { style: 'color:var(--text-dim,#aab);font-size:.85rem' }, 'Deux pupitres, deux personnes, EN MÊME TEMPS (fenêtre d\'une seconde). Placez-vous près du vôtre.'));
      body.push(h('div', { style: 'display:flex;gap:8px;justify-content:center' }, [
        h('button', { className: 'btn btn--primary', onClick: () => this.act({ a: 'fix', pad: 'A' }) }, '🖐️ Pupitre gauche'),
        h('button', { className: 'btn btn--primary', onClick: () => this.act({ a: 'fix', pad: 'B' }) }, '🖐️ Pupitre droit'),
      ]));
    } else if (s.type === 'o2') {
      body.push(h('div', { style: 'color:var(--text-dim,#aab);font-size:.85rem' }, 'Deux codes : un en O2, un en Administration. Dans n\'importe quel ordre.'));
      body.push(h('div', { style: 'display:flex;gap:8px;justify-content:center' }, [
        h('button', { className: 'btn btn--primary', disabled: v.me.room !== 'o2', onClick: () => this.act({ a: 'fix', pad: 'A' }) }, '⌨️ Code O2'),
        h('button', { className: 'btn btn--primary', disabled: v.me.room !== 'admin', onClick: () => this.act({ a: 'fix', pad: 'B' }) }, '⌨️ Code Administration'),
      ]));
    }
    body.push(h('div', { style: 'text-align:right' }, h('button', { className: 'btn btn--ghost', onClick: () => this.closeModal() }, 'Fermer')));
    return h('div', { className: 'au__card' }, body);
  }

  renderCameras() {
    const v = this.view;
    if (!v.cameras) return null;
    return h('div', { className: 'au__card' }, [
      h('h3', { style: 'margin:0' }, '📹 Caméras de sécurité'),
      ...v.cameras.map((c) => h('div', { className: 'au__row' }, [
        h('b', {}, roomName(c.room)),
        h('span', { style: 'margin-left:auto;display:flex;gap:4px' },
          c.joueurs.length
            ? c.joueurs.map((p) => h('span', { className: 'au__dot', style: `background:${p.couleur}` }))
            : [h('span', { style: 'color:var(--text-dim,#aab)' }, 'vide')]),
      ])),
      h('div', { style: 'text-align:right' }, h('button', { className: 'btn btn--ghost', onClick: () => this.closeModal() }, 'Fermer')),
    ]);
  }

  renderAdmin() {
    const v = this.view;
    if (!v.admin) return null;
    return h('div', { className: 'au__card' }, [
      h('h3', { style: 'margin:0' }, '🗺️ Table d\'administration'),
      h('div', { style: 'color:var(--text-dim,#aab);font-size:.84rem' }, 'Des nombres, pas des noms : à vous de croiser avec les alibis.'),
      ...v.admin.map((r) => h('div', { className: 'au__row' }, [
        h('b', {}, roomName(r.room)),
        h('span', { style: 'margin-left:auto;font-weight:800' }, `${r.n}`),
      ])),
      h('div', { style: 'text-align:right' }, h('button', { className: 'btn btn--ghost', onClick: () => this.closeModal() }, 'Fermer')),
    ]);
  }

  /* ---------------- rendu ---------------- */

  frame() {
    this.raf = requestAnimationFrame(() => this.frame());
    const t = performance.now();
    if (t - (this.lastFrame ?? 0) < RENDER_MIN_MS) return;   // ~40 images/s : la batterie des invités
    const dtMs = t - (this.lastFrame ?? t);
    this.lastFrame = t;

    // Les entrées repartent d'ICI, pas seulement des événements clavier. Ici, aucun
    // mouvement de souris ne vient rappeler sendInput() : sans cet appel, une commande
    // refusée par le limiteur (deux touches à moins de 60 ms) était perdue pour de bon,
    // et le rappel d'1 Hz ne pouvait littéralement jamais se déclencher.
    this.sendInput();

    // Horloge d'interpolation des autres joueurs (invités seulement).
    if (!this.isHost) this.interp.avancer(dtMs);

    const v = this.view;
    if (!v || !v.me) return;

    // Prédiction locale (invités seulement). Les murs incluent les portes verrouillées.
    if (!this.isHost && this.pred.pos && v.phase === 'jeu' && !v.me.vented) {
      const fermees = new Set();
      for (const d of v.doorsClosed ?? []) for (const c of d.tiles) fermees.add(`${c.x},${c.y}`);
      const mur = (x, y) => v.grid[y]?.[x] !== '0' || fermees.has(`${x},${y}`);
      this.pred.avancer(dtMs, this.modal ? { dx: 0, dy: 0 } : this.axis(), v.me.speed ?? 0, mur, !v.me.alive);
    }
    if (v.phase === 'reunion') { this.renderMeeting(); return; }
    if (!this.canvas || v.phase !== 'jeu') return;

    const rect = this.canvas.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5); // plafond : le DPR 3 des mobiles triple le coût
    if (this.canvas.width !== Math.round(rect.width * dpr)) {
      this.canvas.width = Math.round(rect.width * dpr);
      this.canvas.height = Math.round(rect.height * dpr);
    }
    const g = this.canvas.getContext('2d');
    g.setTransform(dpr, 0, 0, dpr, 0, 0);
    const me = this.moiAffiche();

    // Caméra centrée sur le joueur.
    const tile = Math.max(20, Math.min(rect.width / 26, rect.height / 16));
    const X = (wx) => rect.width / 2 + (wx - me.x) * tile;
    const Y = (wy) => rect.height / 2 + (wy - me.y) * tile;

    g.fillStyle = '#04060c';
    g.fillRect(0, 0, rect.width, rect.height);

    // Sols et salles : décor FIXE, peint une seule fois hors écran puis recopié.
    // (1 296 rectangles par image, soixante fois par seconde, pour rien.)
    g.drawImage(this.mapImage(v, tile), X(0), Y(0));

    g.fillStyle = 'rgba(255,90,90,.55)';
    for (const d of v.doorsClosed ?? []) for (const c of d.tiles) g.fillRect(X(c.x), Y(c.y), tile, tile);

    const station = (pos, emoji) => {
      g.font = `${Math.round(tile * .55)}px serif`;
      g.fillText(emoji, X(pos.x), Y(pos.y) + tile * .2);
    };
    station(v.stations.emergency, '🚨');
    station(v.stations.admin, '🗺️');
    station(v.stations.cameras, '📹');
    station(v.stations.lights, '💡');
    station(v.stations.comms, '📡');
    station(v.stations.reactorA, '🖐️');
    station(v.stations.reactorB, '🖐️');

    // Mes tâches (les autres n'ont pas à savoir où je dois aller).
    for (const t of me.tasks) {
      if (t.fait || !t.salle || v.commsHS) continue;
      const r = v.rooms.find((x) => x.id === t.salle);
      g.fillStyle = 'rgba(255,220,90,.9)';
      g.beginPath();
      g.arc(X(r.x + r.w / 2 + 0.9), Y(r.y + r.h / 2 - 0.9), tile * .16, 0, Math.PI * 2);
      g.fill();
    }

    for (const vt of v.vents ?? []) {   // imposteurs uniquement
      g.font = `${Math.round(tile * .55)}px serif`;
      g.fillText('🛗', X(vt.x), Y(vt.y) + tile * .2);
    }

    for (const b of v.bodies ?? []) {
      g.fillStyle = b.couleur;
      g.beginPath(); g.ellipse(X(b.x), Y(b.y), tile * .4, tile * .25, 0, 0, Math.PI * 2); g.fill();
      g.font = `${Math.round(tile * .4)}px serif`;
      g.fillText('☠️', X(b.x), Y(b.y) + tile * .12);
    }

    // Position lissée des autres joueurs : lue dans le tampon horodaté. Le Host affiche
    // les entités telles quelles (il EST la vérité). Un mur ferme borne l'extrapolation.
    const mur = (x, y) => v.grid?.[y]?.[x] !== '0';
    for (const p of v.visibles ?? []) {
      const s2 = this.isHost ? { x: p.x, y: p.y } : this.interp.ou(p, mur);
      this.drawPawn(g, X(s2.x), Y(s2.y), tile, p.couleur, p.pseudo, !p.alive, p.role === 'impostor');
    }
    this.drawPawn(g, X(me.x), Y(me.y), tile, me.couleur, me.pseudo, !me.alive, me.role === 'impostor', true);

    // Brouillard. Le Host n'a de toute façon RIEN envoyé au-delà : ceci n'est
    // que l'habillage de ce qui est déjà absent des données.
    if (me.alive) {
      const R = v.vision * tile;
      g.fillStyle = 'rgba(4,6,12,.96)';
      g.beginPath();
      g.rect(0, 0, rect.width, rect.height);
      g.arc(X(me.x), Y(me.y), R, 0, Math.PI * 2, true);
      g.fill();
      const grd = g.createRadialGradient(X(me.x), Y(me.y), R * .6, X(me.x), Y(me.y), R);
      grd.addColorStop(0, 'rgba(4,6,12,0)');
      grd.addColorStop(1, 'rgba(4,6,12,.96)');
      g.fillStyle = grd;
      g.beginPath();
      g.arc(X(me.x), Y(me.y), R, 0, Math.PI * 2);
      g.fill();
    }
  }

  /** La carte, peinte une seule fois hors écran (re-faite si la taille change). */
  mapImage(v, tile) {
    const cle = `${v.mapVersion}|${Math.round(tile * 4)}`;
    if (this.mapLayer && this.mapKey === cle) return this.mapLayer;
    const c = document.createElement('canvas');
    c.width = Math.ceil(v.cols * tile);
    c.height = Math.ceil(v.rows * tile);
    const g = c.getContext('2d');
    g.fillStyle = 'rgba(90,110,160,.16)';
    for (let y = 0; y < v.rows; y += 1) {
      for (let x = 0; x < v.cols; x += 1) {
        if (v.grid[y][x] === '0') g.fillRect(x * tile, y * tile, tile + 0.5, tile + 0.5);
      }
    }
    g.strokeStyle = 'rgba(160,190,255,.18)';
    g.lineWidth = 1;
    g.textAlign = 'center';
    g.font = `${Math.round(tile * 0.38)}px sans-serif`;
    for (const r of v.rooms) {
      g.strokeRect(r.x * tile, r.y * tile, r.w * tile, r.h * tile);
      g.fillStyle = 'rgba(200,220,255,.35)';
      g.fillText(r.nom, (r.x + r.w / 2) * tile, r.y * tile - 4);
    }
    this.mapLayer = c;
    this.mapKey = cle;
    return c;
  }

  drawPawn(g, x, y, tile, couleur, nom, mort, imposteur, moi = false) {
    g.globalAlpha = mort ? 0.45 : 1;
    g.fillStyle = couleur;
    g.beginPath();
    g.ellipse(x, y, tile * .3, tile * .38, 0, 0, Math.PI * 2);
    g.fill();
    g.strokeStyle = moi ? '#fff' : 'rgba(0,0,0,.5)';
    g.lineWidth = moi ? 2 : 1;
    g.stroke();
    g.fillStyle = 'rgba(180,220,255,.85)';
    g.beginPath();
    g.ellipse(x + tile * .1, y - tile * .1, tile * .14, tile * .1, 0, 0, Math.PI * 2);
    g.fill();
    g.globalAlpha = 1;
    g.fillStyle = imposteur ? '#ff6b6b' : 'rgba(255,255,255,.8)';
    g.font = `${Math.round(tile * .3)}px sans-serif`;
    g.textAlign = 'center';
    g.fillText(`${imposteur ? '😈 ' : ''}${nom}`, x, y - tile * .5);
  }

  renderMeeting() {
    const v = this.view;
    const m = v.meeting;
    if (!m) return;
    const key = `${m.etape}|${Math.ceil(m.reste / 1000)}|${m.aVote}|${m.monVote}|${m.resultat ? 1 : 0}`;
    if (key === this.meetKey) return;
    this.meetKey = key;

    const me = v.me;
    const body = [
      h('h3', { style: 'margin:0;text-align:center' }, m.bodyName
        ? `☠️ ${m.byName} a signalé le corps de ${m.bodyName}`
        : `🚨 ${m.byName} a convoqué une réunion d'urgence`),
    ];

    if (m.etape === 'ejection') {
      const r = m.resultat;
      body.push(h('div', { style: 'text-align:center;font-size:1.05rem' }, r.ejecteNom
        ? `🚀 ${r.ejecteNom} est éjecté…${r.etaitImposteur === null ? '' : r.etaitImposteur ? ' c\'était un imposteur.' : ' ce n\'était PAS un imposteur.'}`
        : (r.egalite ? '⚖️ Égalité — personne n\'est éjecté.' : '🤷 Personne n\'est éjecté.')));
      if (r.ejecteNom && r.etaitImposteur !== null) {
        body.push(h('div', { style: 'text-align:center;color:var(--text-dim,#aab)' }, `${r.restants} imposteur(s) restant(s).`));
      }
    } else {
      body.push(h('div', { style: 'text-align:center;color:var(--text-dim,#aab)' },
        m.etape === 'discussion'
          ? `💬 Discussion — ${secs(m.reste)}`
          : `🗳️ Vote — ${secs(m.reste)} · ${m.aVote}/${m.votants} ont voté`));

      const grid = h('div', { className: 'au__vote' });
      for (const p of v.visibles) {
        grid.append(h('button', {
          className: m.monVote === p.id ? 'on' : '',
          disabled: m.etape !== 'vote' || !p.alive || !me.alive || m.monVote !== undefined,
          onClick: () => this.act({ a: 'vote', target: p.id }),
        }, [
          h('span', { className: 'au__dot', style: `background:${p.couleur}` }),
          h('span', { style: p.alive ? '' : 'text-decoration:line-through;opacity:.5' }, p.pseudo),
          p.role === 'impostor' ? h('span', { style: 'color:#ff6b6b' }, ' 😈') : null,
          m.dejaVote.includes(p.id) ? h('span', { className: 'n' }, '✔️') : null,
        ]));
      }
      body.push(grid);
      body.push(h('button', {
        className: `btn ${m.monVote === 'skip' ? 'btn--primary' : 'btn--ghost'}`,
        disabled: m.etape !== 'vote' || !me.alive || m.monVote !== undefined,
        onClick: () => this.act({ a: 'vote', target: 'skip' }),
      }, '⏭️ Passer le vote'));
      if (!me.alive) body.push(h('div', { style: 'text-align:center;color:#ff9f9f' }, '👻 Les fantômes ne votent pas.'));
      if (v.options.votesAnonymes) body.push(h('div', { style: 'text-align:center;color:var(--text-dim,#aab);font-size:.8rem' }, 'Votes anonymes : on voit qui a voté, jamais pour qui.'));
    }

    this.root.replaceChildren(
      h('div', { className: 'au__main' }, [
        h('div', { className: 'au__panel', style: 'margin:auto;display:grid;gap:12px;max-width:660px;width:100%' }, body),
        this.statusEl,
      ]),
      this.buildSide(),
    );
  }

  unmount() {
    this.unsub?.();
    clearInterval(this.loop);
    clearTimeout(this.endTimer);
    clearTimeout(this.statusTimer);
    if (this.modal?.timer) clearInterval(this.modal.timer);
    cancelAnimationFrame(this.raf);
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
    instance = new AmongUI(container, context);
    instance.mount();
  },
  async unmount() {
    instance?.unmount();
    instance = null;
  },
};
