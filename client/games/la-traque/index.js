/**
 * LA TRAQUE — interface du module Arcade (les règles sont dans ./engine.js).
 *
 * Host autoritaire temps réel : le Host fait tourner la boucle (20 Hz) et
 * envoie à chaque joueur une vue FILTRÉE par ce qu'il peut voir. Les autres
 * clients n'envoient que leurs entrées (direction, visée, tir).
 *
 * Le rendu est en <canvas> : obscurité totale, cône de lampe calculé par
 * lancer de rayons, flashs, bruits. Les murs sont dessinés en très sombre —
 * le labyrinthe n'est pas un secret, les POSITIONS le sont.
 */
import { TraqueEngine, SKINS, SKIN_BY_ID, COLS, ROWS, TICK_MS, HIDE_CHOICES, ROUND_CHOICES, MAZE_SIZES, SIZE_CHOICES, MANCHE_CHOICES, stepCollision } from './engine.js';
import { Predictor } from '../shared/predictor.js';
import { Interpolator } from '../shared/interpolator.js';

/**
 * Budget serveur. Sur Render Free (0,1 CPU), le coût du serveur suit le NOMBRE de
 * messages relayés, pas leur taille : 125 msg/s ≈ 3 % d'un cœur ici, bien plus sur
 * un vCPU partagé. On envoie donc moins souvent, et jamais pour rien.
 */
const INPUT_MIN_MS = 60;     // délai minimal entre deux envois d'entrée
const INPUT_KEEPALIVE_MS = 1000; // rappel pendant qu'on bouge (filet de sécurité)
const RENDER_MIN_MS = 25;    // ~40 images/s : au-delà, on brûle la batterie des invités

/** Ticks entre deux diffusions : plus il y a de monde, moins on parle. */
function cadence(nb, phase) {
  // Le pas = nombre de ticks (50 ms) entre deux diffusions. pas=2 → 10 Hz.
  // Avant, on ralentissait dès 6 joueurs pour ménager le serveur. Mesures faites :
  // le serveur tient 10 Hz à 10 joueurs à 2,3 % de son cœur, et le Host téléverse
  // moins de 1 Mbit/s (vues allégées). Le facteur limitant, c'était le lissage, pas
  // la charge : on garde donc 10 Hz jusqu'à 10 joueurs, ce que l'interpolateur exploite.
  if (phase !== 'traque' && phase !== 'cachette') return 10; // rien ne bouge : 2 Hz suffisent
  if (nb <= 10) return 2;  // 10 Hz
  if (nb <= 14) return 3;  // 6,7 Hz
  return 4;                // 5 Hz — au-delà de 14, on lève le pied
}
const SKIN_KEY = 'arcade.la-traque.skin';

const CSS = `
.trq { display: grid; grid-template-columns: 1fr 290px; gap: 12px; height: 100%; min-height: 0; color: var(--text, #e8ecff); width: 100%; }
.trq__main { display: flex; flex-direction: column; gap: 10px; min-width: 0; min-height: 0; }
.trq__panel { background: var(--glass, rgba(255,255,255,.05)); border: 1px solid var(--glass-border, rgba(255,255,255,.09)); border-radius: var(--radius-m, 14px); padding: 10px 12px; }
.trq__hud { display: flex; align-items: center; gap: 12px; flex-wrap: wrap; font-size: .86rem; }
.trq__hud .big { font-weight: 800; font-size: 1.05rem; }
.trq__hud .danger { color: #ff6b6b; }
.trq__stage { flex: 1; min-height: 0; position: relative; display: flex; }
.trq__canvas { width: 100%; height: 100%; display: block; border-radius: 12px; background: #05060a; touch-action: none; cursor: crosshair; }
.trq__over { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; text-align: center; pointer-events: none; }
.trq__over div { background: rgba(4,6,12,.78); border: 1px solid var(--glass-border, rgba(255,255,255,.12)); border-radius: 14px; padding: 14px 22px; font-size: 1.05rem; }
.trq__bar { height: 6px; border-radius: 99px; background: rgba(255,255,255,.12); width: 110px; overflow: hidden; }
.trq__bar i { display: block; height: 100%; background: #5fe0c8; }
.trq__fx { display: flex; gap: 5px; }
.trq__fx span { font-size: .75rem; padding: 2px 7px; border-radius: 99px; background: rgba(95,224,200,.18); border: 1px solid rgba(95,224,200,.4); }
.trq__pad { position: absolute; inset: auto 0 0 0; display: none; justify-content: space-between; padding: 12px; pointer-events: none; }
.trq__stick { width: 118px; height: 118px; border-radius: 50%; background: rgba(255,255,255,.06); border: 1px solid rgba(255,255,255,.16); position: relative; pointer-events: auto; }
.trq__stick i { position: absolute; width: 46px; height: 46px; border-radius: 50%; background: rgba(255,255,255,.28); left: 36px; top: 36px; }
.trq__btns { display: flex; flex-direction: column; gap: 8px; justify-content: flex-end; pointer-events: auto; }
.trq__btns button { width: 70px; height: 70px; border-radius: 50%; border: 1px solid rgba(255,255,255,.2); background: rgba(255,255,255,.08); color: inherit; font-size: 1.4rem; }
.trq__btns button.is-ready { border-color: #ffd76b; box-shadow: 0 0 14px rgba(255,215,107,.5); }
.trq__btns button.is-on { border-color: #5fe0c8; box-shadow: 0 0 16px rgba(95,224,200,.7); background: rgba(95,224,200,.22); }
.trq__btns button:disabled { opacity: .4; }
.trq__pw { font-size: .78rem; padding: 2px 9px; border-radius: 99px; background: rgba(150,150,170,.15); border: 1px solid rgba(150,150,170,.35); }
.trq__pw--ready { background: rgba(255,215,107,.18); border-color: rgba(255,215,107,.55); color: #ffe6a0; }
.trq__pw--on { background: rgba(95,224,200,.2); border-color: rgba(95,224,200,.6); color: #bff6ec; }
.trq__setup { display: grid; gap: 8px; max-width: 520px; margin: 0 auto; }
.trq__setup label, .trq__row { display: flex; gap: 8px; align-items: center; background: rgba(0,0,0,.22); border: 1px solid var(--glass-border, rgba(255,255,255,.1)); border-radius: 10px; padding: 8px 10px; font-size: .85rem; }
.trq__setup select { margin-left: auto; background: rgba(0,0,0,.35); color: inherit; border: 1px solid rgba(255,255,255,.15); border-radius: 8px; padding: 5px; }
.trq__skins { display: flex; gap: 6px; flex-wrap: wrap; justify-content: center; }
.trq__skins button { border: 2px solid transparent; background: rgba(255,255,255,.06); border-radius: 12px; padding: 8px 10px; color: inherit; cursor: pointer; font-size: .78rem; display: flex; flex-direction: column; align-items: center; gap: 2px; }
.trq__skins button.on { border-color: #fff; }
.trq__skins .em { font-size: 1.5rem; }
.trq__power { max-width: 520px; margin: 0 auto; background: rgba(255,255,255,.05); border: 1px solid rgba(255,255,255,.12); border-radius: 12px; padding: 10px 14px; font-size: .84rem; }
.trq__power-title { display: flex; align-items: center; gap: 4px; flex-wrap: wrap; }
.trq__power-title .em { font-size: 1.2rem; }
.trq__power-meta { font-size: .74rem; color: var(--text-dim,#aab); }
.trq__power-desc { margin-top: 4px; color: var(--text,#dfe3f0); }
.trq__power-all { margin-top: 8px; }
.trq__power-all summary { cursor: pointer; font-size: .78rem; color: var(--text-dim,#aab); }
.trq__power-grid { display: grid; gap: 4px; margin-top: 6px; }
.trq__power-item { font-size: .78rem; line-height: 1.4; }
.trq__keys { display: flex; gap: 14px; flex-wrap: wrap; justify-content: center; font-size: .76rem; color: var(--text-dim,#aab); }
.trq__keys kbd { display: inline-block; background: rgba(255,255,255,.1); border: 1px solid rgba(255,255,255,.2); border-radius: 5px; padding: 1px 6px; margin-right: 3px; font-family: inherit; font-size: .74rem; }
.trq__side { display: flex; flex-direction: column; gap: 10px; min-height: 0; }
.trq__roster { display: flex; flex-direction: column; gap: 4px; font-size: .82rem; }
.trq__roster div.out { opacity: .42; text-decoration: line-through; }
.trq__log { font-size: .78rem; color: var(--text-dim, #aab); max-height: 108px; overflow: auto; display: flex; flex-direction: column; gap: 2px; }
.trq-chat { display: flex; flex-direction: column; flex: 1; min-height: 120px; }
.trq-chat__log { flex: 1; overflow: auto; font-size: .82rem; display: flex; flex-direction: column; gap: 2px; }
.trq-chat__log .dead { color: #ff9f9f; }
.trq-chat__form { display: flex; gap: 6px; margin-top: 6px; }
.trq-chat__form input { flex: 1; min-width: 0; background: rgba(0,0,0,.3); border: 1px solid var(--glass-border, rgba(255,255,255,.12)); color: inherit; border-radius: 8px; padding: 6px 9px; }
.trq__status { min-height: 1.1em; text-align: center; color: var(--warning, #ffb454); font-size: .82rem; }
@media (max-width: 1050px) { .trq { grid-template-columns: 1fr; } .trq__pad { display: flex; } }
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

const skinOf = (id) => SKINS.find((s) => s.id === id) ?? SKINS[0];
const mmss = (ms) => {
  const s = Math.max(0, Math.ceil(ms / 1000));
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
};
const FX_LABEL = { vitesse: '💨 Vitesse', silence: '🤫 Silence', torche: '🔦 Batterie', radar: '👁️ Radar', sonar: '📡 Sonar' };

class TraqueUI {
  constructor(container, context) {
    this.container = container;
    this.ctx = context;
    this.me = context.me;
    this.engine = null;
    this.view = null;
    this.prev = null;       // vue précédente (pour le lissage)
    this.viewAt = 0;
    this.keys = new Set();
    this.aim = null;
    this.stick = { active: false, dx: 0, dy: 0, id: null };
    this.lastSent = 0;
    this.tickCount = 0;
    this.raf = null;
    this.loop = null;
    this.unsub = null;
    this.skin = null;
    this.state = { chat: [], deadChat: [], log: [] };  // ce que ce client possède déjà
    this.syncMap = new Map();                          // Host : ce que chaque joueur possède
    this.mazeLayer = null;                             // labyrinthe pré-dessiné (il ne bouge pas)
    this.sideSig = null;                               // signature des panneaux latéraux
    // Prédiction locale : l'invité avance tout de suite, sans attendre le Host.
    // Même fonction de déplacement que le moteur — importée, pas recopiée.
    this.pred = new Predictor(stepCollision);
    this.interp = new Interpolator();   // lisse la position des AUTRES joueurs
  }

  get isHost() { return this.ctx.me.id === this.ctx.hostId; }
  get hostId() { return this.ctx.hostId; }

  /* ------------------------- montage ------------------------- */

  mount() {
    this.styleEl = h('style', {}, CSS);
    this.root = h('div', { className: 'trq' });
    this.container.append(this.styleEl, this.root);

    try { this.skin = localStorage.getItem(SKIN_KEY) || null; } catch { this.skin = null; }

    if (this.isHost) {
      try {
        this.engine = new TraqueEngine(this.ctx.players, { hostId: this.ctx.hostId });
      } catch (error) {
        this.root.replaceChildren(h('div', { className: 'trq__panel', style: 'margin:auto' }, `⚠️ ${error.message}`));
        return;
      }
      this.unsub = this.ctx.onMessage(({ from, data }) => {
        // Un invité vient de finir de monter son module et annonce qu'il est prêt.
        // On oublie ce qu'on croyait lui avoir envoyé : sa prochaine vue sera COMPLÈTE
        // (carte + roster). Sans ça, un invité qui s'abonne après notre première vue
        // ne reçoit que du différentiel — des positions sans carte, joueurs « dans le vide ».
        if (data?.t === 'hello') { this.syncMap.delete(from); this.broadcast(); return; }
        if (data?.t !== 'action') return;

        // Journal du pipeline : les entrées portent un numéro de séquence. Sur une
        // liaison WebSocket (TCP), un trou ou un désordre est ANORMAL — s'il
        // apparaît ici, il vient de l'application, pas du réseau, et ce log le dira.
        if (data.action.a === 'input' && Number.isFinite(data.action.seq)) {
          this.seqParJoueur ??= new Map();
          const attendu = (this.seqParJoueur.get(from) ?? 0) + 1;
          if (data.action.seq !== attendu && this.seqParJoueur.has(from)) {
            console.warn(`[pipeline] séquence d'entrées inattendue de ${from.slice(0, 8)} : reçu ${data.action.seq}, attendu ${attendu}`);
          }
          this.seqParJoueur.set(from, data.action.seq);
        }

        const res = this.engine.handleAction(from, data.action);
        if (!res?.ok && res?.error) {
          if (data.action.a !== 'input') {
            this.ctx.sendMessage({ t: 'error', message: res.error }, from);
          } else {
            // Une ENTRÉE rejetée n'est plus un silence : on la compte, on la loggue
            // (throttlé), et on répond UN « resync » — l'expéditeur renverra son
            // hello et repartira sur un état complet. C'était l'angle mort exact du
            // bug « mes commandes n'arrivent jamais » : tout mourait ici, sans bruit.
            this.rejets ??= new Map();
            const r = this.rejets.get(from) ?? { n: 0, dernier: 0 };
            r.n += 1;
            const now = Date.now();
            if (now - r.dernier > 2000) {
              console.warn(`[pipeline] entrée rejetée ×${r.n} de ${from.slice(0, 8)} : ${res.error} → resync demandé`);
              this.ctx.sendMessage({ t: 'resync' }, from);
              r.dernier = now; r.n = 0;
            }
            this.rejets.set(from, r);
          }
        }
      });
      this.loop = setInterval(() => this.hostTick(), TICK_MS);
    } else {
      this.unsub = this.ctx.onMessage(({ from, data }) => {
        if (from !== this.hostId) return;
        if (data?.t === 'view') this.receive(data.view);
        else if (data?.t === 'error') this.status(data.message);
        // Le Host ne nous reconnaît pas (rejet d'entrées) : on se ré-annonce.
        // Il répond au hello par un état complet — on repart proprement.
        else if (data?.t === 'resync') this.ctx.sendMessage({ t: 'hello' }, this.hostId);
      });
      // On est abonné : on annonce au Host qu'on est prêt à recevoir. Il nous renverra
      // un état complet, même s'il diffusait déjà avant qu'on ait fini de monter.
      this.ctx.sendMessage({ t: 'hello' }, this.hostId);
    }

    if (this.skin) this.act({ a: 'skin', skin: this.skin });
    this.bindInputs();
    this.build();
    if (this.isHost) this.broadcast();
    this.raf = requestAnimationFrame(() => this.frame());
  }

  hostTick() {
    this.engine.tick();
    this.tickCount += 1;
    // Avant : 10 Hz en traque, mais 20 Hz partout ailleurs — y compris pendant
    // toute la phase de cachette et l'écran de manche, où presque rien ne change.
    const pas = cadence(this.engine.players.length, this.engine.phase);
    if (this.tickCount % pas === 0) this.broadcast();
    if (this.engine.phase === 'fin' && !this.endTimer) {
      const result = this.engine.summary();
      this.endTimer = setTimeout(() => this.ctx.onEnd(result), 7000);
    }
  }

  /**
   * Diffusion différentielle : chaque joueur ne reçoit que ce qu'il n'a pas déjà.
   * Le labyrinthe part une fois par manche, le roster quand il change, le chat et
   * le journal message par message. Avant : ~580 Ko/s pour huit joueurs.
   */
  broadcast() {
    const e = this.engine;
    const etat = () => ({
      grid: e.mapVersion, rosterVersion: e.rosterVersion, optionsVersion: e.optionsVersion, chatSeq: e.chatSeq, logSeq: e.logSeq,
    });
    for (const p of e.players) {
      if (p.id === this.me.id) continue;
      let sync = this.syncMap.get(p.id) ?? null;
      // Un joueur qui vient d'être éliminé doit recevoir l'historique du canal
      // des morts : on lui renvoie le chat une fois, puis on repasse en différentiel.
      if (sync && !p.alive && !sync.deadReset) sync = { ...sync, chatSeq: 0, deadReset: true };
      this.ctx.sendMessage({ t: 'view', view: e.getViewFor(p.id, sync) }, p.id);
      this.syncMap.set(p.id, { ...etat(), deadReset: sync?.deadReset || !p.alive });
    }
    const moi = this.syncMap.get(this.me.id) ?? null;
    this.receive(e.getViewFor(this.me.id, moi));
    this.syncMap.set(this.me.id, { ...etat(), deadReset: moi?.deadReset || !e.playerOf(this.me.id).alive });
  }

  /** Le client réassemble la vue complète à partir de ce qu'il gardait. */
  receive(view) {
    const s = this.state;
    if (view.grid) {
      s.grid = view.grid; s.cols = view.cols; s.rows = view.rows; s.mapVersion = view.mapVersion;
      this.mazeLayer = null;   // nouveau labyrinthe : on le re-dessinera une fois
    }
    if (view.roster) s.roster = view.roster;
    // Les options ne sont envoyées qu'au premier tour (elles ne changent pas en jeu).
    // On les garde : le Host ne les répète plus dans les vues suivantes.
    if (view.options) s.options = view.options;
    if (view.chat?.length) s.chat = [...s.chat, ...view.chat].slice(-60);
    if (view.deadChat?.length) s.deadChat = [...s.deadChat, ...view.deadChat].slice(-60);
    if (view.log?.length) s.log = [...s.log, ...view.log].slice(-25);

    // Le Host n'envoie plus pseudo/skin dans chaque joueur visible — ils sont dans le
    // roster, qui ne change qu'à l'arrivée/départ d'un joueur. On les rattache ici, par
    // id, pour que le rendu retrouve ses champs habituels sans qu'on ait à le toucher.
    const parId = new Map((s.roster ?? []).map((p) => [p.id, p]));
    const habiller = (ent) => {
      const info = parId.get(ent.id);
      return info ? { ...ent, pseudo: info.pseudo, skin: info.skin } : ent;
    };

    const complete = {
      ...view,
      grid: s.grid, cols: s.cols, rows: s.rows, mapVersion: s.mapVersion,
      options: view.options ?? s.options,
      roster: s.roster ?? [], chat: s.chat, deadChat: s.deadChat, log: s.log,
      visibles: (view.visibles ?? []).map(habiller),
    };
    this.prev = this.view;
    this.view = complete;
    this.viewAt = performance.now();

    // Les autres joueurs entrent dans le tampon d'interpolation, horodatés par le Host
    // (complete.t). C'est de LÀ que leur position à l'écran est lue, image par image —
    // plus de « saut vers la dernière vue ».
    if (!this.isHost && Number.isFinite(complete.t)) this.interp.pousser(complete.t, complete.visibles ?? []);

    // --- prédiction locale : on se recale sur la vérité du Host ---
    const moi = complete.me;
    if (moi && !this.isHost) {
      const active = complete.phase === 'traque' || complete.phase === 'cachette';
      if (!active || !moi.alive) this.pred.reset(moi.x, moi.y);
      else {
        const traverse = complete.me?.power?.actif && complete.me?.skin === 'spectre';
        const mur = (x, y) => { const c = complete.grid?.[y]?.[x]; return c === '1' || (c === '2' && !traverse); };
        this.pred.reconcilier(complete.t, moi, mur);
      }
    }

    if (complete.phase !== this.lastPhase) {
      this.lastPhase = complete.phase;
      if (complete.me) this.pred.reset(complete.me.x, complete.me.y);
      this.interp.reset();   // nouvelle phase : on ne lisse pas par-dessus l'ancienne carte
      this.build();
    }
    this.syncHud();
  }

  /**
   * Ma position À L'ÉCRAN. Le Host, lui, EST la vérité : il s'affiche tel quel.
   * L'invité affiche sa prédiction — sinon il verrait son propre personnage
   * réagir avec un aller-retour réseau de retard.
   */
  moiAffiche() {
    const me = this.view?.me;
    if (!me) return null;
    if (this.isHost || !this.pred.pos) return me;
    const p = this.pred.vue ?? this.pred.pos;
    return { ...me, x: p.x, y: p.y, angle: this.aim ?? me.angle };
  }

  act(action) {
    if (this.isHost) {
      const res = this.engine.handleAction(this.me.id, action);
      if (!res?.ok && res?.error && action.a !== 'input') this.status(res.error);
      if (action.a !== 'input') this.broadcast();
    } else {
      this.ctx.sendMessage({ t: 'action', action }, this.hostId);
    }
  }

  status(message) {
    if (!this.statusEl) return;
    this.statusEl.textContent = message ?? '';
    clearTimeout(this.statusTimer);
    this.statusTimer = setTimeout(() => { if (this.statusEl) this.statusEl.textContent = ''; }, 3500);
  }

  /* ------------------------- entrées ------------------------- */

  bindInputs() {
    this.onKeyDown = (e) => {
      const k = e.code;
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Space'].includes(k)) e.preventDefault();
      if (k === 'Space') { this.act({ a: 'shoot' }); return; }
      // Pouvoir de skin : touche A (ou &, même emplacement AZERTY/QWERTY).
      if (k === 'KeyA') { if (!e.repeat) this.act({ a: 'power' }); return; }
      this.keys.add(k);
      this.sendInput();
    };
    this.onKeyUp = (e) => { this.keys.delete(e.code); this.sendInput(); };
    window.addEventListener('keydown', this.onKeyDown);
    window.addEventListener('keyup', this.onKeyUp);
  }

  axis() {
    if (this.stick.active) return { dx: this.stick.dx, dy: this.stick.dy };
    const k = this.keys;
    // Déplacement : ZQSD (AZERTY) ou flèches. La touche A est RÉSERVÉE au
    // pouvoir de skin — elle n'est donc plus un alias de « gauche » (ce que
    // faisait le mapping QWERTY WASD, source de conflit avec le pouvoir).
    const dx = (k.has('ArrowRight') || k.has('KeyD') ? 1 : 0) - (k.has('ArrowLeft') || k.has('KeyQ') ? 1 : 0);
    const dy = (k.has('ArrowDown') || k.has('KeyS') ? 1 : 0) - (k.has('ArrowUp') || k.has('KeyZ') ? 1 : 0);
    return { dx, dy };
  }

  /**
   * Une entrée n'est envoyée QUE si elle a changé.
   *
   * Avant : un envoi toutes les 60 ms dès que la souris bougeait d'un pixel —
   * ~16 messages/s et par invité, soit le poste le plus lourd du serveur, alors
   * que le Host conserve de toute façon la dernière entrée reçue.
   */
  sendInput(force = false) {
    const now = performance.now();
    const { dx, dy } = this.axis();
    const sneak = this.keys.has('ShiftLeft') || this.keys.has('ShiftRight') || this.sneakBtn;
    const sprint = this.keys.has('ControlLeft') || this.keys.has('KeyE') || this.sprintBtn;

    // Signature grossière : un frémissement de souris ne mérite pas un message.
    const sig = `${Math.round(dx * 8)}|${Math.round(dy * 8)}|${Math.round(this.aim * 24)}|${sneak ? 1 : 0}|${sprint ? 1 : 0}`;
    const bouge = dx !== 0 || dy !== 0;
    const rappel = bouge && now - this.lastSent > INPUT_KEEPALIVE_MS;

    if (!force && !rappel && sig === this.lastSig) return;          // rien de neuf : on se tait

    // Trop tôt : on ne l'envoie pas MAINTENANT. On ne l'oublie pas pour autant —
    // lastSig n'est pas touché, donc la commande reste « neuve », et la boucle
    // d'images repassera dans 25 ms pour la faire partir dès la fenêtre écoulée.
    if (!force && now - this.lastSent < INPUT_MIN_MS) return;       // jamais plus de ~16/s

    this.lastSig = sig;
    this.lastSent = now;
    this.act({ a: 'input', dx, dy, aim: Math.round(this.aim * 100) / 100, sneak, sprint, ts: Date.now(), seq: (this.inputSeq = (this.inputSeq ?? 0) + 1) });
  }

  /* ------------------------- construction du DOM ------------------------- */

  build() {
    const v = this.view;
    this.statusEl = h('div', { className: 'trq__status' });

    if (!v || v.phase === 'setup') { this.root.replaceChildren(this.buildSetup(), this.buildSide()); return; }
    if (v.phase === 'fin' || v.phase === 'fin-manche') { this.root.replaceChildren(this.buildEnd(), this.buildSide()); return; }

    this.canvas = h('canvas', { className: 'trq__canvas' });
    this.overlay = h('div', { className: 'trq__over' });
    this.bindCanvas();

    this.hudEl = h('div', { className: 'trq__panel trq__hud' });
    const stage = h('div', { className: 'trq__stage' }, [this.canvas, this.overlay, this.buildPad()]);
    this.root.replaceChildren(
      h('div', { className: 'trq__main' }, [this.hudEl, stage, this.statusEl]),
      this.buildSide(),
    );
    this.syncHud();
  }

  buildSetup() {
    const v = this.view;
    const body = [h('h3', { style: 'margin:0;text-align:center' }, '🔦 La Traque')];
    body.push(h('div', { style: 'text-align:center;font-size:.86rem;color:var(--text-dim,#aab);max-width:520px;margin:0 auto' },
      'Labyrinthe plongé dans le noir. Le Chercheur ne voit que le cône de sa lampe et dispose de munitions comptées. Les autres se cachent : rester immobile, c\'est rester invisible — mais les détecteurs trahissent ceux qui bougent.'));

    // Skins : choix local, mémorisé, transmis à la table.
    const current = this.skin ?? (v?.me?.skin ?? SKINS[0].id);
    body.push(h('div', { className: 'trq__skins' }, SKINS.map((s) => h('button', {
      className: s.id === current ? 'on' : '',
      onClick: () => {
        this.skin = s.id;
        try { localStorage.setItem(SKIN_KEY, s.id); } catch { /* stockage indisponible */ }
        this.act({ a: 'skin', skin: s.id });
        this.build();
      },
    }, [h('span', { className: 'em' }, s.emoji), h('span', { style: `color:${s.couleur}` }, s.nom)]))));

    // Description du pouvoir du skin choisi + rappel de tous les pouvoirs.
    const skinSel = SKIN_BY_ID[current];
    if (skinSel?.pouvoir) {
      const pw = skinSel.pouvoir;
      const dureeTxt = pw.dureeMs ? `${Math.round(pw.dureeMs / 1000)} s` : 'instantané';
      body.push(h('div', { className: 'trq__power' }, [
        h('div', { className: 'trq__power-title' }, [
          h('span', { className: 'em' }, skinSel.emoji),
          h('b', { style: `color:${skinSel.couleur}` }, ` ${pw.nom} `),
          h('span', { className: 'trq__power-meta' }, `⏱️ ${dureeTxt} · recharge ${Math.round(pw.chargeMs / 1000)} s · touche A`),
        ]),
        h('div', { className: 'trq__power-desc' }, pw.desc),
        h('details', { className: 'trq__power-all' }, [
          h('summary', {}, 'Voir tous les pouvoirs'),
          h('div', { className: 'trq__power-grid' }, SKINS.map((sk) => h('div', { className: 'trq__power-item' }, [
            h('span', {}, `${sk.emoji} `),
            h('b', { style: `color:${sk.couleur}` }, sk.pouvoir.nom),
            h('span', { className: 'trq__power-meta' }, ` — ${sk.pouvoir.desc}`),
          ]))),
        ]),
      ]));
    }

    // Rappel des commandes clavier (AZERTY par défaut).
    body.push(h('div', { className: 'trq__keys' }, [
      h('span', {}, [h('kbd', {}, 'Z'), h('kbd', {}, 'Q'), h('kbd', {}, 'S'), h('kbd', {}, 'D'), ' se déplacer']),
      h('span', {}, [h('kbd', {}, '←↑↓→'), ' au choix']),
      h('span', {}, [h('kbd', {}, 'A'), ' pouvoir']),
      h('span', {}, [h('kbd', {}, 'Espace'), ' tirer']),
      h('span', {}, [h('kbd', {}, 'Maj'), ' marcher furtivement']),
    ]));

    if (this.isHost && v) {
      const box = h('div', { className: 'trq__setup' });
      const sel = (label, key, choices, fmt) => {
        const s = h('select', {}, choices.map((c) => h('option', { value: String(c) }, fmt(c))));
        s.value = String(v.options[key]);
        s.addEventListener('change', () => this.act({ a: 'configure', options: { [key]: key === 'mode' ? s.value : Number(s.value) } }));
        return h('div', { className: 'trq__row' }, [h('b', {}, label), s]);
      };
      const check = (key, label, hint) => {
        const cb = h('input', { type: 'checkbox' });
        cb.checked = !!v.options[key];
        cb.addEventListener('change', () => this.act({ a: 'configure', options: { [key]: cb.checked } }));
        return h('label', {}, [cb, h('span', {}, [h('b', {}, label), h('div', { style: 'font-size:.78rem;color:var(--text-dim,#aab)' }, hint)])]);
      };
      const modeSel = h('select', {}, [
        h('option', { value: 'rotation' }, 'Rotation (chacun chercheur)'),
        h('option', { value: 'unique' }, 'Manche unique'),
      ]);
      modeSel.value = v.options.mode;
      modeSel.addEventListener('change', () => this.act({ a: 'configure', options: { mode: modeSel.value } }));

      // Taille du labyrinthe (valeur texte, comme le mode).
      const tailleSel = h('select', {}, SIZE_CHOICES.map((id) => {
        const t = MAZE_SIZES[id];
        return h('option', { value: id }, `${t.nom} (${t.cols}×${t.rows})`);
      }));
      tailleSel.value = v.options.taille ?? 'moyen';
      tailleSel.addEventListener('change', () => this.act({ a: 'configure', options: { taille: tailleSel.value } }));

      box.append(
        h('div', { className: 'trq__row' }, [h('b', {}, 'Déroulement'), modeSel]),
        h('div', { className: 'trq__row' }, [h('b', {}, 'Taille du labyrinthe'), tailleSel]),
        sel('Nombre de manches', 'nbManches', MANCHE_CHOICES, (c) => (c === 0 ? 'Auto (selon le mode)' : `${c} manche${c > 1 ? 's' : ''}`)),
        sel('Temps de cachette', 'hideMs', HIDE_CHOICES, (c) => `${c / 1000} s`),
        sel('Durée de la traque', 'roundMs', ROUND_CHOICES, (c) => `${c / 60000} min`),
        sel('Balles par joueur', 'ballesParJoueur', [1, 2, 3], (c) => `×${c} (soit ${c * v.roster.length} balles)`),
        check('detecteurs', 'Détecteurs', 'Des capteurs déclenchent un flash révélant qui passe à proximité.'),
        check('bonus', 'Boîtes mystère', 'Bonus ramassables : l\'effet dépend de votre rôle.'),
      );
      body.push(box, h('div', { style: 'text-align:center' }, [
        h('button', { className: 'btn btn--primary', onClick: () => this.act({ a: 'start' }) }, '🔦 Lancer la traque'),
      ]));
    } else {
      body.push(h('div', { style: 'text-align:center;color:var(--text-dim,#aab);font-size:.85rem' }, 'Choisissez votre tenue — le Host règle la partie…'));
    }
    return h('div', { className: 'trq__main' }, [h('div', { className: 'trq__panel', style: 'margin:auto;display:grid;gap:12px' }, body), this.statusEl]);
  }

  buildEnd() {
    const v = this.view;
    const body = [];
    if (v.phase === 'fin') {
      const f = v.finalSummary;
      body.push(h('h3', { style: 'margin:0' }, f.summary));
      body.push(h('div', { style: 'color:var(--text-dim,#aab)' }, f.classement.map((p) => `${p.pseudo} : ${p.score}`).join(' · ')));
      body.push(h('div', { style: 'color:var(--text-dim,#aab)' }, 'Retour au salon dans quelques secondes…'));
    } else {
      const r = v.roundEnd;
      body.push(h('h3', { style: 'margin:0' }, r.vainqueur === 'chercheur'
        ? `🏆 ${r.seekerName} a fait le ménage : le Chercheur gagne.`
        : `⏰ Temps écoulé — ${r.survivants.length} survivant(s) l'emportent !`));
      body.push(h('div', { style: 'color:var(--text-dim,#aab)' }, `${r.elims} élimination(s) · Survivants : ${r.survivants.map((s) => s.pseudo).join(', ') || 'aucun'}`));
      body.push(h('div', { style: 'color:var(--text-dim,#aab)' }, `Scores : ${r.scores.map((s) => `${s.pseudo} ${s.score}`).join(' · ')}`));
      body.push(this.isHost
        ? h('button', { className: 'btn btn--primary', onClick: () => this.act({ a: 'next-round' }) }, '▶️ Manche suivante')
        : h('div', { style: 'color:var(--text-dim,#aab)' }, 'Le Host va lancer la manche suivante…'));
    }
    return h('div', { className: 'trq__main' }, [
      h('div', { className: 'trq__panel', style: 'margin:auto;display:grid;gap:10px;text-align:center' }, body),
      this.statusEl,
    ]);
  }

  buildPad() {
    const stick = h('div', { className: 'trq__stick' });
    const knob = h('i');
    stick.append(knob);
    const setKnob = (dx, dy) => { knob.style.left = `${36 + dx * 30}px`; knob.style.top = `${36 + dy * 30}px`; };
    const move = (e) => {
      const r = stick.getBoundingClientRect();
      const dx = (e.clientX - (r.left + r.width / 2)) / (r.width / 2);
      const dy = (e.clientY - (r.top + r.height / 2)) / (r.height / 2);
      const len = Math.hypot(dx, dy) || 1;
      const nx = len > 1 ? dx / len : dx;
      const ny = len > 1 ? dy / len : dy;
      this.stick = { active: true, dx: nx, dy: ny, id: e.pointerId };
      setKnob(nx, ny);
      this.sendInput();
    };
    stick.addEventListener('pointerdown', (e) => { stick.setPointerCapture(e.pointerId); move(e); });
    stick.addEventListener('pointermove', (e) => { if (this.stick.active && e.pointerId === this.stick.id) move(e); });
    const release = () => { this.stick = { active: false, dx: 0, dy: 0, id: null }; setKnob(0, 0); this.sendInput(true); };
    stick.addEventListener('pointerup', release);
    stick.addEventListener('pointercancel', release);

    const sneak = h('button', { title: 'Furtif' }, '🤫');
    sneak.addEventListener('pointerdown', () => { this.sneakBtn = true; this.sendInput(true); });
    sneak.addEventListener('pointerup', () => { this.sneakBtn = false; this.sendInput(true); });
    const sprint = h('button', { title: 'Sprint' }, '💨');
    sprint.addEventListener('pointerdown', () => { this.sprintBtn = true; this.sendInput(true); });
    sprint.addEventListener('pointerup', () => { this.sprintBtn = false; this.sendInput(true); });
    const fire = h('button', { title: 'Tirer', onClick: () => this.act({ a: 'shoot' }) }, '🔫');
    this.powerBtn = h('button', { title: 'Pouvoir', onClick: () => this.act({ a: 'power' }) }, '✨');

    return h('div', { className: 'trq__pad' }, [stick, h('div', { className: 'trq__btns' }, [sneak, sprint, this.powerBtn, fire])]);
  }

  bindCanvas() {
    // Viser à la souris (le cône suit le curseur) ; taper l'écran vise aussi.
    const aimAt = (e) => {
      const v = this.view;
      if (!v?.me) return;
      const r = this.canvas.getBoundingClientRect();
      const { tile, ox, oy } = this.geom(r);
      const wx = (e.clientX - r.left - ox) / tile;
      const wy = (e.clientY - r.top - oy) / tile;
      const moi = this.moiAffiche() ?? v.me;
      this.aim = Math.atan2(wy - moi.y, wx - moi.x);
      this.sendInput();
    };
    this.canvas.addEventListener('pointermove', aimAt);
    this.canvas.addEventListener('pointerdown', (e) => { aimAt(e); if (this.view?.me?.role === 'chercheur') this.act({ a: 'shoot' }); });
  }

  buildSide() {
    const v = this.view;
    this.rosterEl = h('div', { className: 'trq__roster' });
    this.logEl = h('div', { className: 'trq__log' });

    this.chatLog = h('div', { className: 'trq-chat__log' });
    const input = h('input', { placeholder: 'Message…', maxlength: '200' });
    const send = () => {
      const text = input.value.trim();
      if (!text) return;
      input.value = '';
      this.act({ a: 'chat', text });
    };
    input.addEventListener('keydown', (e) => { e.stopPropagation(); if (e.key === 'Enter') send(); });
    input.addEventListener('keyup', (e) => e.stopPropagation());

    const side = h('div', { className: 'trq__side' }, [
      h('div', { className: 'trq__panel' }, [h('strong', {}, '👥 Joueurs'), this.rosterEl]),
      h('div', { className: 'trq__panel' }, [h('strong', {}, '📜 Journal'), this.logEl]),
      h('div', { className: 'trq__panel trq-chat' }, [
        h('strong', {}, v?.ghost ? '💬 Chat des éliminés' : '💬 Chat'),
        this.chatLog,
        h('div', { className: 'trq-chat__form' }, [input, h('button', { className: 'btn btn--small btn--primary', onClick: send }, '➤')]),
      ]),
    ]);
    this.syncSide();
    return side;
  }

  /* ------------------------- HUD & panneaux ------------------------- */

  syncHud() {
    const v = this.view;
    if (!v || !this.hudEl || !v.me) return;
    const me = v.me;
    const seeker = me.role === 'chercheur';
    const restants = v.roster.filter((p) => p.role === 'cache' && p.alive).length;
    const bits = [
      h('span', { className: 'big' }, seeker ? '🔦 Vous êtes le CHERCHEUR' : '🫥 Vous êtes CACHÉ'),
      h('span', { className: v.timeLeft < 30000 && v.phase === 'traque' ? 'big danger' : 'big' }, `⏱️ ${mmss(v.timeLeft)}`),
      h('span', {}, v.phase === 'cachette' ? '🙈 Cachette en cours' : `🫥 ${restants} caché(s) en vie`),
    ];
    if (seeker) bits.push(h('span', {}, `🔫 ${me.bullets} balle${me.bullets > 1 ? 's' : ''}`));
    if (!me.alive) bits.push(h('span', { className: 'danger' }, '💀 Éliminé — mode spectateur'));
    bits.push(h('span', {}, ['💪 ', h('span', { className: 'trq__bar' }, h('i', { style: `width:${Math.round(me.stamina)}%` }))]));
    const fx = Object.keys(me.effects ?? {});
    if (fx.length) bits.push(h('span', { className: 'trq__fx' }, fx.map((k) => h('span', {}, FX_LABEL[k] ?? k))));
    // Pouvoir de skin : nom + état (actif / recharge / prêt), touche A.
    const pw = me.power;
    if (pw) {
      const etat = pw.actif ? `⚡ ${Math.ceil(pw.resteMs / 1000)}s`
        : pw.pret ? '✨ prêt (A)'
          : `⏳ ${Math.ceil(pw.chargeMs / 1000)}s`;
      bits.push(h('span', { className: pw.actif ? 'trq__pw trq__pw--on' : pw.pret ? 'trq__pw trq__pw--ready' : 'trq__pw' },
        `${pw.nom} — ${etat}`));
      if (this.powerBtn) {
        this.powerBtn.disabled = !pw.pret && !pw.actif;
        this.powerBtn.classList.toggle('is-ready', pw.pret && !pw.actif);
        this.powerBtn.classList.toggle('is-on', pw.actif);
      }
    }
    this.hudEl.replaceChildren(...bits);

    if (this.overlay) {
      const msg = v.phase === 'cachette'
        ? (seeker ? '🙈 Vous comptez… (lampe éteinte)' : `🏃 Cachez-vous ! ${mmss(v.timeLeft)}`)
        : null;
      this.overlay.replaceChildren(...(msg ? [h('div', {}, msg)] : []));
    }
    this.syncSide();
  }

  syncSide() {
    const v = this.view;
    if (!v || !this.rosterEl) return;
    // Reconstruire roster + journal + chat dix fois par seconde alors que rien n'a
    // bougé, c'était l'essentiel du travail inutile chez les invités.
    const sig = `${v.rosterVersion}|${v.log.at(-1)?.seq ?? 0}|${v.chat.at(-1)?.seq ?? 0}|${v.deadChat.at(-1)?.seq ?? 0}|${v.ghost ? 1 : 0}`;
    if (sig === this.sideSig) return;
    this.sideSig = sig;

    this.rosterEl.replaceChildren(...v.roster.map((p) => {
      const s = skinOf(p.skin);
      return h('div', { className: p.alive ? '' : 'out' }, [
        h('span', {}, `${s.emoji} `),
        h('b', { style: `color:${s.couleur}` }, p.pseudo),
        h('span', { style: 'color:var(--text-dim,#aab)' }, `${p.role === 'chercheur' ? ' 🔦' : ''} — ${p.score} pts`),
      ]);
    }));
    this.logEl.replaceChildren(...[...(v.log ?? [])].reverse().map((l) => h('div', {}, l.text)));

    const msgs = v.ghost ? [...(v.chat ?? []), ...(v.deadChat ?? []).map((m) => ({ ...m, dead: true }))] : (v.chat ?? []);
    msgs.sort((a, b) => a.ts - b.ts);
    this.chatLog.replaceChildren(...msgs.map((m) => h('div', { className: m.dead ? 'dead' : '' }, [
      h('b', {}, `${m.dead ? '💀 ' : ''}${m.pseudo} `), m.text,
    ])));
    this.chatLog.scrollTop = this.chatLog.scrollHeight;
  }

  /* ------------------------- rendu ------------------------- */

  /** Dimensions du labyrinthe courant (issues de la vue ; repli sur le défaut). */
  dims() {
    return { cols: this.state?.cols ?? COLS, rows: this.state?.rows ?? ROWS };
  }

  geom(rect) {
    const { cols, rows } = this.dims();
    const tile = Math.min(rect.width / cols, rect.height / rows);
    return { tile, ox: (rect.width - tile * cols) / 2, oy: (rect.height - tile * rows) / 2 };
  }

  /** Le labyrinthe, peint une seule fois hors écran (re-fait si la taille change). */
  mazeImage(v, tile) {
    const cols = v.cols ?? COLS; const rows = v.rows ?? ROWS;
    const cle = `${v.mapVersion}|${Math.round(tile * 4)}`;
    if (this.mazeLayer && this.mazeKey === cle) return this.mazeLayer;
    const c = document.createElement('canvas');
    c.width = Math.ceil(cols * tile);
    c.height = Math.ceil(rows * tile);
    const g = c.getContext('2d');
    for (let y = 0; y < rows; y += 1) {
      for (let x = 0; x < cols; x += 1) {
        const cell = v.grid[y][x];
        if (cell === '1') {
          g.fillStyle = 'rgba(120,140,200,.10)';
          g.fillRect(x * tile, y * tile, tile + 0.5, tile + 0.5);
        } else if (cell === '2') {
          // Mur fantôme : plus fin (centré dans la case) et d'un bleu lumineux,
          // pour signaler qu'il est franchissable par le Spectre.
          g.fillStyle = 'rgba(95,224,200,.30)';
          const m = tile * 0.28;   // marge : le mur ne remplit pas toute la case
          g.fillRect(x * tile + m, y * tile + m, tile - 2 * m + 0.5, tile - 2 * m + 0.5);
        }
      }
    }
    this.mazeLayer = c;
    this.mazeKey = cle;
    return c;
  }

  frame() {
    this.raf = requestAnimationFrame(() => this.frame());
    // Plafond d'images : au-delà de ~40/s on chauffe le téléphone des invités
    // pour des images que personne ne distingue.
    const t = performance.now();
    if (t - (this.lastFrame ?? 0) < RENDER_MIN_MS) return;
    const dtMs = t - (this.lastFrame ?? t);
    this.lastFrame = t;

    // Les entrées repartent d'ICI, pas seulement des événements clavier.
    // sendInput() se tait tout seul quand rien n'a changé. Mais quand le limiteur
    // refuse une commande (deux touches à moins de 60 ms — un demi-tour, une
    // diagonale), c'est CET appel qui la renvoie. Sans lui, la commande était
    // perdue pour de bon : aucun événement ne suivait, et le Host restait sur
    // l'ancienne trajectoire pendant que le joueur, lui, se voyait courir ailleurs.
    // C'est aussi ce qui fait enfin fonctionner le rappel d'1 Hz.
    this.sendInput();

    // On fait avancer l'horloge d'interpolation des autres joueurs (invités seulement).
    if (!this.isHost) this.interp.avancer(dtMs);

    // Prédiction locale (invités seulement — le Host est déjà la vérité).
    const vv = this.view;
    if (!this.isHost && vv?.me && this.pred.pos && (vv.phase === 'traque' || vv.phase === 'cachette')) {
      const inp = this.axis();
      // Le Spectre, pouvoir actif, franchit les murs fantômes ('2') ; sinon ils bloquent.
      const traverse = vv.me.power?.actif && vv.me.skin === 'spectre';
      const mur = (x, y) => { const c = vv.grid[y]?.[x]; return c === '1' || (c === '2' && !traverse); };
      this.pred.avancer(dtMs, inp, vv.me.speed ?? 0, mur);
    }
    const v = this.view;
    if (!this.canvas || !v || !v.grid || !v.me) return;

    const rect = this.canvas.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5); // plafond : le DPR 3 des mobiles triple le coût pour rien
    if (this.canvas.width !== Math.round(rect.width * dpr)) {
      this.canvas.width = Math.round(rect.width * dpr);
      this.canvas.height = Math.round(rect.height * dpr);
    }
    const g = this.canvas.getContext('2d');
    g.setTransform(dpr, 0, 0, dpr, 0, 0);
    const { tile, ox, oy } = this.geom(rect);
    const X = (wx) => ox + wx * tile;
    const Y = (wy) => oy + wy * tile;

    g.clearRect(0, 0, rect.width, rect.height);
    g.fillStyle = '#05060a';
    g.fillRect(0, 0, rect.width, rect.height);

    // Murs : dessinés très sombres. Le labyrinthe n'est pas un secret — les
    // positions le sont — et sans repères on ne peut pas jouer.
    // Il ne bouge jamais : on le peint UNE fois hors écran, puis on le recopie.
    // (651 rectangles à chaque image, soixante fois par seconde, pour un décor fixe.)
    g.drawImage(this.mazeImage(v, tile), ox, oy);

    // Position lissée des autres joueurs : lue dans le tampon horodaté. Le Host, lui,
    // affiche les entités telles quelles (il EST la vérité, il n'interpole personne).
    const mur = (x, y) => { const c = v.grid?.[y]?.[x]; return c === '1' || c === '2'; };
    const smooth = (ent) => (this.isHost ? { x: ent.x, y: ent.y } : this.interp.ou(ent, mur));

    // Halo du joueur (sa propre bulle de perception).
    // Ma position PRÉDITE : sinon je me verrais réagir avec un aller-retour de retard.
    const me = this.moiAffiche();
    if (me.alive) {
      const r = (me.role === 'chercheur' ? 1.3 : 1.6) * tile;
      const grd = g.createRadialGradient(X(me.x), Y(me.y), 0, X(me.x), Y(me.y), r);
      grd.addColorStop(0, 'rgba(180,200,255,.16)');
      grd.addColorStop(1, 'rgba(180,200,255,0)');
      g.fillStyle = grd;
      g.beginPath(); g.arc(X(me.x), Y(me.y), r, 0, Math.PI * 2); g.fill();
    }

    // Cônes de lampe : le mien si je cherche, celui du Chercheur si je le vois.
    const cones = [];
    if (me.role === 'chercheur' && me.alive) cones.push({ x: me.x, y: me.y, angle: me.angle, boost: !!me.effects?.torche });
    for (const e of v.visibles ?? []) {
      if (e.role === 'chercheur') { const s = smooth(e); cones.push({ x: s.x, y: s.y, angle: e.angle, boost: e.torche }); }
    }
    for (const c of cones) this.drawCone(g, v, c, X, Y, tile);

    // Flashs des détecteurs : ils éclairent tout le monde dans leur rayon.
    for (const f of v.flashes ?? []) {
      const grd = g.createRadialGradient(X(f.x), Y(f.y), 0, X(f.x), Y(f.y), 3.6 * tile);
      grd.addColorStop(0, 'rgba(255,255,255,.55)');
      grd.addColorStop(.6, 'rgba(200,225,255,.22)');
      grd.addColorStop(1, 'rgba(200,225,255,0)');
      g.fillStyle = grd;
      g.beginPath(); g.arc(X(f.x), Y(f.y), 3.6 * tile, 0, Math.PI * 2); g.fill();
    }

    // Détecteurs connus.
    for (const d of v.detectors ?? []) {
      g.fillStyle = d.actif ? 'rgba(255,90,90,.85)' : 'rgba(120,120,140,.5)';
      g.fillRect(X(d.x) - tile * .16, Y(d.y) - tile * .16, tile * .32, tile * .32);
    }

    // Boîtes mystère.
    for (const b of v.bonuses ?? []) {
      g.font = `${Math.round(tile * .8)}px serif`;
      g.textAlign = 'center'; g.textBaseline = 'middle';
      g.fillText('❓', X(b.x), Y(b.y));
    }

    // Bruits entendus (Chercheur) : une case, pas une position exacte.
    for (const nz of v.noises ?? []) {
      g.strokeStyle = 'rgba(255,200,120,.5)';
      g.lineWidth = 2;
      g.beginPath(); g.arc(X(nz.x), Y(nz.y), tile * .55, 0, Math.PI * 2); g.stroke();
      g.font = `${Math.round(tile * .5)}px serif`;
      g.textAlign = 'center'; g.textBaseline = 'middle';
      g.fillText('👣', X(nz.x), Y(nz.y));
    }

    // Balles.
    g.fillStyle = '#ffe08a';
    for (const s of v.shots ?? []) { g.beginPath(); g.arc(X(s.x), Y(s.y), Math.max(2, tile * .12), 0, Math.PI * 2); g.fill(); }

    // Joueurs visibles + moi.
    for (const e of v.visibles ?? []) { const s = smooth(e); this.drawPlayer(g, e, s.x, s.y, X, Y, tile, false); }
    if (me.alive) this.drawPlayer(g, { ...me, how: 'moi' }, me.x, me.y, X, Y, tile, true);

    if (!me.alive) {
      g.fillStyle = 'rgba(255,255,255,.35)';
      g.font = `${Math.round(tile * .9)}px sans-serif`;
      g.textAlign = 'center';
      g.fillText('💀', X(me.x), Y(me.y));
    }
  }

  /** Cône de lampe par lancer de rayons : la lumière s'arrête aux murs. */
  drawCone(g, v, c, X, Y, tile) {
    const range = c.boost ? v.cone.rangeBonus : v.cone.range;
    const half = ((c.boost ? v.cone.halfBonus : v.cone.half) * Math.PI) / 180;
    // 36 rayons suffisent visuellement ; 54 rayons × un pas de 0,12 case, c'était
    // ~3 400 sondages par cône et par image — pour un contour qu'on ne distingue pas.
    const RAYS = 36;
    const pts = [];
    for (let i = 0; i <= RAYS; i += 1) {
      const a = c.angle - half + (2 * half * i) / RAYS;
      let d = 0;
      const step = 0.2;
      while (d < range) {
        const nx = c.x + Math.cos(a) * (d + step);
        const ny = c.y + Math.sin(a) * (d + step);
        if (v.grid[Math.floor(ny)]?.[Math.floor(nx)] !== '0') break;
        d += step;
      }
      pts.push([c.x + Math.cos(a) * d, c.y + Math.sin(a) * d]);
    }
    const grd = g.createRadialGradient(X(c.x), Y(c.y), 0, X(c.x), Y(c.y), range * tile);
    grd.addColorStop(0, 'rgba(255,240,190,.55)');
    grd.addColorStop(.55, 'rgba(255,235,180,.22)');
    grd.addColorStop(1, 'rgba(255,230,170,0)');
    g.fillStyle = grd;
    g.beginPath();
    g.moveTo(X(c.x), Y(c.y));
    for (const [px, py] of pts) g.lineTo(X(px), Y(py));
    g.closePath();
    g.fill();
  }

  drawPlayer(g, e, x, y, X, Y, tile, isMe) {
    const s = skinOf(e.skin);
    // Révélé par un flash ou un sonar : silhouette éclatante et fugace.
    const glow = e.how === 'flash' || e.how === 'sonar' || e.how === 'radar';
    g.beginPath();
    g.arc(X(x), Y(y), tile * .34, 0, Math.PI * 2);
    g.fillStyle = glow ? 'rgba(255,255,255,.9)' : s.couleur;
    g.globalAlpha = isMe ? 1 : .92;
    g.fill();
    g.globalAlpha = 1;
    if (isMe) { g.strokeStyle = '#fff'; g.lineWidth = 2; g.stroke(); }
    g.font = `${Math.round(tile * .55)}px serif`;
    g.textAlign = 'center'; g.textBaseline = 'middle';
    g.fillText(s.emoji, X(x), Y(y));
    if (e.role === 'chercheur') {
      g.strokeStyle = 'rgba(255,240,190,.9)';
      g.lineWidth = 2;
      g.beginPath();
      g.moveTo(X(x), Y(y));
      g.lineTo(X(x + Math.cos(e.angle) * .8), Y(y + Math.sin(e.angle) * .8));
      g.stroke();
    }
    if (!isMe) {
      g.fillStyle = 'rgba(255,255,255,.75)';
      g.font = `${Math.round(tile * .34)}px sans-serif`;
      g.fillText(e.pseudo, X(x), Y(y) - tile * .55);
    }
  }

  unmount() {
    this.unsub?.();
    clearInterval(this.loop);
    cancelAnimationFrame(this.raf);
    clearTimeout(this.endTimer);
    clearTimeout(this.statusTimer);
    window.removeEventListener('keydown', this.onKeyDown);
    window.removeEventListener('keyup', this.onKeyUp);
    this.styleEl?.remove();
    this.root?.remove();
    this.engine = null;
    this.statusEl = null;
  }
}

let instance = null;

export default {
  async mount(container, context) {
    instance = new TraqueUI(container, context);
    instance.mount();
  },
  async unmount() {
    instance?.unmount();
    instance = null;
  },
};
