/**
 * Gartic Phone (Téléphone visuel) — module de jeu pour la plateforme Arcade.
 *
 * Architecture « Host autoritaire » : le client du Host exécute le moteur pur
 * (GarticEngine), détient toutes les contributions, calcule la rotation des
 * chaînes et distribue à chaque joueur UNIQUEMENT ce qu'il doit traiter (jamais
 * son propre contenu). Les clients renvoient leurs soumissions au Host.
 *
 * Contrat plateforme :
 *   export default { mount(container, context), unmount() }
 *   context = { roomId, roomName, hostId, players, me, socket,
 *               sendMessage(data, to = null),        // to = null → diffusion salon
 *               onMessage(handler) -> unsubscribe,   // handler({ from, data })
 *               onEnd(result) }
 *
 * Résilience : hostId relu en direct ; un watchdog détecte la promotion d'un
 * nouveau Host et lui transmet le contrôle. Le Host diffuse un snapshot d'état à
 * un héritier (ciblé) aux transitions de phase pour permettre la reprise.
 *
 * Canaux logiques (multiplexés sur le bus) :
 *   'g' état/vue de jeu · 's' soumission · 'c' chat (persistant) · 'st' snapshot héritier
 *
 * GarticEngine est exporté (pur, sans DOM ni réseau) pour les tests Node.
 */

/* ====================================================================== */
/* Constantes & helpers                                                   */
/* ====================================================================== */

export const PHASES = ['write', 'draw', 'describe'];
export const PHASE_MS = 180000;          // 3 min par phase
const GRACE_MS = 2500;                    // marge Host après le minuteur
const HOST_WATCH_MS = 500;
const CHAT_MAX = 200;
let _chatSeq = 0;
/** Identifiant unique de message de chat (déduplication à l'affichage). */
function chatId() { _chatSeq += 1; return `${Date.now().toString(36)}-${_chatSeq}`; }
const CANVAS_W = 640;
const CANVAS_H = 448;
const EXPORT_W = 480;                     // résolution d'export (payload allégé)

export const COLORS = [
  { n: 'Rouge', c: '#e53935' }, { n: 'Orange', c: '#fb8c00' }, { n: 'Jaune', c: '#fdd835' },
  { n: 'Vert', c: '#43a047' }, { n: 'Bleu', c: '#1e88e5' }, { n: 'Rose', c: '#ec407a' },
  { n: 'Violet', c: '#8e24aa' }, { n: 'Marron', c: '#8d5524' }, { n: 'Noir', c: '#111111' },
  { n: 'Blanc', c: '#ffffff' },
];
export const BRUSHES = { S: 3, M: 8, L: 16 };

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
    if (c === undefined || c === null || c === false) return;
    node.append(typeof c === 'string' ? document.createTextNode(c) : c);
  });
  return node;
}

/* ====================================================================== */
/* Moteur pur                                                             */
/* ====================================================================== */

export class GarticEngine {
  /**
   * @param {{id:string,pseudo:string}[]} players 3 à 16 joueurs.
   * @param {{nbManches?:number}} options nbManches : nombre de parties à jouer
   *   avant le classement final (1 par défaut).
   */
  constructor(players, options = {}) {
    if (players.length < 3 || players.length > 16) {
      throw new Error('Gartic Phone se joue de 3 à 16 joueurs.');
    }
    this.players = players.map((p) => ({ id: p.id, pseudo: p.pseudo }));
    this.chat = [];
    this.nbManches = Math.max(1, Math.min(10, Number(options.nbManches) || 1));
    // Votes de correspondance consigne ↔ dessin.
    // votes[cle] = { [voterId]: note 0-10 } ; cle = `${game}:${chainIndex}`.
    this.votes = {};
    this.voteAuteurs = {};   // cle de vote -> id du dessinateur (survit aux manches)
    this.game = 0;
    this.reset();
  }

  static fromSnapshot(s) {
    const e = Object.create(GarticEngine.prototype);
    e.players = s.players;
    e.chat = s.chat || [];
    e.phase = s.phase;
    e.chains = s.chains;
    e.locked = new Set(s.locked || []);
    e.phaseEndsAt = s.phaseEndsAt;
    e.albumChain = s.albumChain;
    e.albumStep = s.albumStep;
    e.game = s.game;
    e.nbManches = s.nbManches || 1;
    e.votes = s.votes || {};
    e.voteAuteurs = s.voteAuteurs || {};
    return e;
  }

  snapshot() {
    return {
      players: this.players,
      chat: this.chat,
      phase: this.phase,
      chains: this.chains,
      locked: [...this.locked],
      phaseEndsAt: this.phaseEndsAt,
      albumChain: this.albumChain,
      albumStep: this.albumStep,
      game: this.game,
      nbManches: this.nbManches,
      votes: this.votes,
      voteAuteurs: this.voteAuteurs,
    };
  }

  reset() {
    const N = this.players.length;
    // chains[c].steps[k] = { by, content } ; k: 0=prompt, 1=drawing, 2=description
    this.chains = Array.from({ length: N }, () => ({ steps: [null, null, null] }));
    this.locked = new Set();
    this.albumChain = 0;
    this.albumStep = 0;
    this.game = (this.game || 0) + 1;
    this.startPhase('write');
  }

  get N() { return this.players.length; }
  slotOf(id) { return this.players.findIndex((p) => p.id === id); }
  phaseIndex() { return PHASES.indexOf(this.phase); }

  startPhase(phase) {
    this.phase = phase;
    this.locked = new Set();
    this.phaseEndsAt = Date.now() + PHASE_MS;
  }

  /**
   * Chaîne travaillée par un joueur à la phase courante, et contenu qu'il voit.
   * Rotation circulaire : joueur au slot i travaille la chaîne (i - k) mod N.
   * Garantit qu'on ne reçoit jamais son propre contenu (N ≥ 3).
   */
  assignment(pid, phase = this.phase) {
    const N = this.N;
    const i = this.slotOf(pid);
    if (i < 0) return null;
    const k = PHASES.indexOf(phase);
    const chain = ((i - k) % N + N) % N;
    if (phase === 'write') return { chain, kind: 'write', see: null };
    if (phase === 'draw') {
      const prompt = this.chains[chain].steps[0];
      return { chain, kind: 'draw', see: { kind: 'prompt', text: prompt ? prompt.content : '' } };
    }
    const drawing = this.chains[chain].steps[1];
    return { chain, kind: 'describe', see: { kind: 'draw', data: drawing ? drawing.content : '' } };
  }

  submit(pid, phase, content) {
    if (phase !== this.phase || !PHASES.includes(phase)) return { ok: false };
    const a = this.assignment(pid, phase);
    if (!a) return { ok: false };
    const k = this.phaseIndex();
    if (this.chains[a.chain].steps[k] == null) {
      this.chains[a.chain].steps[k] = { by: pid, content: content == null ? '' : content };
    }
    this.locked.add(pid);
    return { ok: true, allDone: this.allSubmitted() };
  }

  allSubmitted() { return this.players.every((p) => this.locked.has(p.id)); }

  /** Force les soumissions manquantes (déconnexion / timeout) puis avance. */
  fillMissingAndAdvance() {
    const k = this.phaseIndex();
    if (k >= 0) {
      for (const p of this.players) {
        if (!this.locked.has(p.id)) {
          const a = this.assignment(p.id);
          if (a && this.chains[a.chain].steps[k] == null) {
            this.chains[a.chain].steps[k] = { by: p.id, content: '' };
          }
        }
      }
    }
    return this.advance();
  }

  advance() {
    if (this.phase === 'write') { this.startPhase('draw'); return { phase: 'draw' }; }
    if (this.phase === 'draw') { this.startPhase('describe'); return { phase: 'describe' }; }
    if (this.phase === 'describe') {
      this.phase = 'album';
      this.albumChain = 0;
      this.albumStep = 0;
      return { phase: 'album' };
    }
    return { phase: this.phase };
  }

  albumNext() {
    if (this.phase !== 'album') return;
    if (this.albumStep < 2) { this.albumStep += 1; return; }
    if (this.albumChain < this.N - 1) { this.albumChain += 1; this.albumStep = 0; return; }
    // Album terminé : s'il reste des manches à jouer, on relance une partie ;
    // sinon on passe au classement final.
    if (this.game < this.nbManches) { this.reset(); return; }
    this.phase = 'done';
  }

  /* -------------------- votes (consigne ↔ dessin) -------------------- */

  /** Clé de stockage d'un vote : une chaîne par manche. */
  voteKey(chain) { return `${this.game}:${chain}`; }

  /** Qui a dessiné la chaîne c (étape 1) — il ne vote pas pour lui-même. */
  dessinateurDe(chain) { return this.chains[chain]?.steps?.[1]?.by ?? null; }

  /**
   * Enregistre la note (0-10) d'un joueur sur la correspondance entre la
   * consigne et le dessin d'une chaîne. Un joueur ne note ni son propre dessin
   * ni deux fois la même chaîne (le second vote remplace le premier).
   * Les votes ne sont acceptés qu'une fois le dessin révélé (albumStep >= 1).
   */
  castVote(chain, voterId, note) {
    if (this.phase !== 'album') return { ok: false, error: 'Les votes ont lieu pendant l\u2019album.' };
    if (chain !== this.albumChain || this.albumStep < 1) {
      return { ok: false, error: 'Ce dessin n\u2019est pas encore révélé.' };
    }
    const n = Math.round(Number(note));
    if (!Number.isFinite(n) || n < 0 || n > 10) return { ok: false, error: 'Note entre 0 et 10.' };
    if (this.dessinateurDe(chain) === voterId) return { ok: false, error: 'On ne note pas son propre dessin.' };
    const k = this.voteKey(chain);
    if (!this.votes[k]) this.votes[k] = {};
    this.votes[k][voterId] = n;
    // On retient l'auteur du dessin : les chaînes sont remises à zéro à chaque
    // manche, mais le classement final doit rester calculable.
    if (!this.voteAuteurs) this.voteAuteurs = {};
    this.voteAuteurs[k] = this.dessinateurDe(chain);
    return { ok: true };
  }

  /** Moyenne et nombre de votes d'une chaîne de la manche courante. */
  statsVote(chain) {
    const v = this.votes[this.voteKey(chain)] || {};
    const notes = Object.values(v);
    if (!notes.length) return { moyenne: null, nb: 0 };
    return { moyenne: Math.round((notes.reduce((a, b) => a + b, 0) / notes.length) * 10) / 10, nb: notes.length };
  }

  /**
   * Classement final : moyenne des notes reçues par chaque DESSINATEUR, toutes
   * manches confondues. Un joueur qui n'a jamais été noté n'a pas de moyenne.
   */
  classement() {
    const cumul = {};   // id -> { total, nb }
    for (const [cle, parVotant] of Object.entries(this.votes)) {
      const [, chainStr] = cle.split(':');
      const chain = Number(chainStr);
      // Le dessinateur est celui de la manche correspondante ; on ne conserve
      // que la manche courante en mémoire de chaînes, donc on stocke l'auteur
      // au moment du vote (voir noteAuteurs).
      const auteur = this.voteAuteurs?.[cle] ?? this.dessinateurDe(chain);
      if (!auteur) continue;
      const notes = Object.values(parVotant);
      if (!notes.length) continue;
      if (!cumul[auteur]) cumul[auteur] = { total: 0, nb: 0 };
      cumul[auteur].total += notes.reduce((a, b) => a + b, 0);
      cumul[auteur].nb += notes.length;
    }
    return this.players
      .map((p) => {
        const c = cumul[p.id];
        return {
          id: p.id,
          pseudo: p.pseudo,
          moyenne: c ? Math.round((c.total / c.nb) * 10) / 10 : null,
          nbVotes: c ? c.nb : 0,
        };
      })
      .sort((a, b) => (b.moyenne ?? -1) - (a.moyenne ?? -1));
  }

  albumPrev() {
    if (this.phase !== 'album') return;
    if (this.albumStep > 0) { this.albumStep -= 1; return; }
    if (this.albumChain > 0) { this.albumChain -= 1; this.albumStep = 2; }
  }

  pseudoOf(id) { return (this.players.find((p) => p.id === id) || {}).pseudo || '???'; }

  addChat(from, text) {
    const clean = String(text || '').slice(0, 240).trim();
    if (!clean) return;
    this.chat.push({ id: chatId(), from, pseudo: this.pseudoOf(from), text: clean, ts: Date.now() });
    if (this.chat.length > CHAT_MAX) this.chat.shift();
  }

  albumView() {
    const c = this.albumChain;
    const chain = this.chains[c] || { steps: [] };
    const kinds = ['prompt', 'draw', 'desc'];
    const items = [];
    for (let s = 0; s <= this.albumStep; s += 1) {
      const step = chain.steps[s];
      items.push({
        kind: kinds[s],
        content: step ? step.content : '',
        author: step ? this.pseudoOf(step.by) : '',
      });
    }
    return {
      chain: c, step: this.albumStep, total: this.N,
      origin: this.pseudoOf(c < this.players.length ? this.players[c].id : ''),
      items,
    };
  }

  getViewFor(pid) {
    const v = {
      phase: this.phase,
      phaseEndsAt: this.phaseEndsAt,
      players: this.players,
      game: this.game,
      chat: this.chat.slice(-CHAT_MAX),
      submitted: this.locked.size,
      total: this.N,
      you: pid,
    };
    if (PHASES.includes(this.phase)) {
      v.assign = this.assignment(pid);
      v.locked = this.locked.has(pid);
      v.phaseIndex = this.phaseIndex();
    } else if (this.phase === 'album') {
      v.album = this.albumView();
      // Vote : possible seulement une fois le dessin révélé, et pas sur le sien.
      const chain = this.albumChain;
      const dessinateur = this.dessinateurDe(chain);
      const stats = this.statsVote(chain);
      v.vote = {
        chain,
        ouvert: this.albumStep >= 1,
        peutVoter: this.albumStep >= 1 && dessinateur !== pid,
        maNote: (this.votes[this.voteKey(chain)] || {})[pid] ?? null,
        moyenne: stats.moyenne,
        nb: stats.nb,
        dessinateur: dessinateur ? this.pseudoOf(dessinateur) : null,
        estMonDessin: dessinateur === pid,
      };
    } else if (this.phase === 'done') {
      v.classement = this.classement();
    }
    v.nbManches = this.nbManches;
    return v;
  }
}

/* ====================================================================== */
/* Canvas de dessin (historique de traits + export base64)                */
/* ====================================================================== */

class DrawCanvas {
  constructor() {
    this.canvas = h('canvas', { className: 'gp-canvas', width: String(CANVAS_W), height: String(CANVAS_H) });
    this.ctx = this.canvas.getContext ? this.canvas.getContext('2d') : null;
    this.strokes = [];
    this.color = COLORS[8].c;   // noir
    this.size = BRUSHES.M;
    this.erasing = false;
    this.drawing = false;
    this.cur = null;
    this._bind();
    this.redraw();
  }

  _pos(e) {
    const r = this.canvas.getBoundingClientRect();
    const sx = this.canvas.width / (r.width || this.canvas.width);
    const sy = this.canvas.height / (r.height || this.canvas.height);
    const cx = (e.touches ? e.touches[0].clientX : e.clientX) - r.left;
    const cy = (e.touches ? e.touches[0].clientY : e.clientY) - r.top;
    return { x: cx * sx, y: cy * sy };
  }

  _bind() {
    const down = (e) => {
      if (this.locked) return;
      e.preventDefault();
      this.drawing = true;
      const p = this._pos(e);
      this.cur = {
        color: this.erasing ? '#ffffff' : this.color,
        size: this.erasing ? Math.max(this.size * 2, 14) : this.size,
        points: [p],
      };
    };
    const move = (e) => {
      if (!this.drawing || !this.cur) return;
      e.preventDefault();
      this.cur.points.push(this._pos(e));
      this._drawStroke(this.cur, true);
    };
    const up = () => {
      if (!this.drawing) return;
      this.drawing = false;
      if (this.cur && this.cur.points.length) { this.strokes.push(this.cur); this.redraw(); }
      this.cur = null;
    };
    this.canvas.addEventListener('pointerdown', down);
    this.canvas.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
    this._up = up;
    // Fallback tactile
    this.canvas.addEventListener('touchstart', down, { passive: false });
    this.canvas.addEventListener('touchmove', move, { passive: false });
    window.addEventListener('touchend', up);
  }

  _drawStroke(stroke, incremental) {
    if (!this.ctx) return;
    const pts = stroke.points;
    this.ctx.lineJoin = 'round';
    this.ctx.lineCap = 'round';
    this.ctx.strokeStyle = stroke.color;
    this.ctx.lineWidth = stroke.size;
    if (pts.length === 1) {
      this.ctx.beginPath();
      this.ctx.arc(pts[0].x, pts[0].y, stroke.size / 2, 0, Math.PI * 2);
      this.ctx.fillStyle = stroke.color;
      this.ctx.fill();
      return;
    }
    const start = incremental ? pts.length - 2 : 0;
    this.ctx.beginPath();
    this.ctx.moveTo(pts[Math.max(start, 0)].x, pts[Math.max(start, 0)].y);
    for (let i = Math.max(start, 1); i < pts.length; i += 1) {
      const mid = { x: (pts[i - 1].x + pts[i].x) / 2, y: (pts[i - 1].y + pts[i].y) / 2 };
      this.ctx.quadraticCurveTo(pts[i - 1].x, pts[i - 1].y, mid.x, mid.y);
    }
    this.ctx.stroke();
  }

  redraw() {
    if (!this.ctx) return;
    this.ctx.fillStyle = '#ffffff';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    for (const s of this.strokes) this._drawStroke(s, false);
  }

  undo() { if (this.strokes.length) { this.strokes.pop(); this.redraw(); } }
  clear() { this.strokes = []; this.redraw(); }

  /** Export base64 réduit pour un payload réseau léger. */
  export() {
    try {
      const off = document.createElement('canvas');
      const scale = EXPORT_W / CANVAS_W;
      off.width = EXPORT_W;
      off.height = Math.round(CANVAS_H * scale);
      const octx = off.getContext('2d');
      octx.fillStyle = '#ffffff';
      octx.fillRect(0, 0, off.width, off.height);
      octx.drawImage(this.canvas, 0, 0, off.width, off.height);
      return off.toDataURL('image/jpeg', 0.72);
    } catch (e) {
      try { return this.canvas.toDataURL('image/jpeg', 0.72); } catch (e2) { return ''; }
    }
  }

  destroy() {
    window.removeEventListener('pointerup', this._up);
    window.removeEventListener('touchend', this._up);
  }
}

/* ====================================================================== */
/* Styles (scopés .gp)                                                    */
/* ====================================================================== */

const CSS = `
.gp{--gp-accent:var(--accent,#6c5ce7);--gp-surface:var(--surface,#171a24);--gp-border:var(--border,#2a2f3d);--gp-ink:var(--text,#e8eaf0);--gp-deep:#0e1017;
/* Hauteur BORNÉE : sans plafond, l'accumulation des messages étirait la zone de
   chat à l'infini au lieu de la faire défiler. On cadre le composant sur la
   hauteur disponible (avec repli), et les enfants scrollables prennent le relais. */
display:flex;gap:12px;font-family:inherit;color:var(--gp-ink);
height:100%;min-height:520px;max-height:100%}
.gp *{box-sizing:border-box}
.gp__main{flex:1;min-width:0;min-height:0;display:flex;flex-direction:column;background:var(--gp-surface);border:1px solid var(--gp-border);border-radius:14px;overflow:hidden;position:relative}
.gp__side{width:240px;flex:none;min-height:0;display:flex;flex-direction:column;background:var(--gp-surface);border:1px solid var(--gp-border);border-radius:14px;overflow:hidden}
.gp__head{display:flex;align-items:center;gap:10px;padding:9px 14px;border-bottom:1px solid var(--gp-border);flex:none}
.gp__phase{font-weight:800;font-size:14px;letter-spacing:.3px}
.gp__grow{flex:1}
.gp__sub{font-size:12px;opacity:.7;padding:3px 9px;border-radius:20px;background:var(--gp-deep);border:1px solid var(--gp-border)}
.gp__timer{font-variant-numeric:tabular-nums;font-weight:800;font-size:18px;padding:3px 10px;border-radius:8px;background:var(--gp-deep);border:1px solid var(--gp-border)}
.gp__timer.gp--low{color:#ff6b6b;border-color:#ff6b6b;animation:gppulse 1s infinite}
@keyframes gppulse{50%{opacity:.45}}
.gp__stage{flex:1;overflow:auto;padding:14px;display:flex;flex-direction:column;align-items:center;gap:12px}
.gp-instr{font-size:15px;text-align:center;max-width:640px}
.gp-instr b{color:var(--gp-accent)}
.gp-prompt-box{width:100%;max-width:640px;padding:14px 16px;border-radius:12px;background:var(--gp-deep);border:1px solid var(--gp-border);font-size:18px;text-align:center;font-weight:600}
.gp-input{width:100%;max-width:640px;padding:12px 14px;border-radius:10px;border:1px solid var(--gp-border);background:var(--gp-deep);color:inherit;font-size:16px;resize:none;font-family:inherit}
.gp-input:focus{outline:none;border-color:var(--gp-accent)}
.gp-fini{padding:13px 44px;font-size:17px;font-weight:800;letter-spacing:1px;border:none;border-radius:12px;background:#33c26b;color:#06210f;cursor:pointer;box-shadow:0 6px 18px rgba(51,194,107,.35)}
.gp-fini:disabled{background:#3a3f4d;color:#8a8f9c;cursor:not-allowed;box-shadow:none}
.gp-canvas{width:100%;max-width:640px;aspect-ratio:${CANVAS_W}/${CANVAS_H};background:#fff;border-radius:10px;border:1px solid var(--gp-border);touch-action:none;cursor:crosshair;display:block}
.gp-toolbar{width:100%;max-width:640px;display:flex;flex-wrap:wrap;gap:8px;align-items:center;justify-content:center}
.gp-swatches{display:flex;gap:5px;flex-wrap:wrap}
.gp-sw{width:26px;height:26px;border-radius:50%;border:2px solid var(--gp-border);cursor:pointer;padding:0}
.gp-sw.gp--on{border-color:var(--gp-accent);transform:scale(1.12)}
.gp-tool{padding:6px 11px;border:1px solid var(--gp-border);border-radius:8px;background:#151a26;color:inherit;cursor:pointer;font-weight:700;font-size:13px}
.gp-tool.gp--on{border-color:var(--gp-accent);background:rgba(108,92,231,.16)}
.gp-tool:disabled{opacity:.4;cursor:not-allowed}
.gp-drawing-view{width:100%;max-width:520px;border-radius:10px;border:1px solid var(--gp-border);background:#fff;display:block}
.gp-wait{opacity:.7;text-align:center;margin-top:8px;font-size:14px}
.gp-overlay{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;background:rgba(8,10,16,.82);backdrop-filter:blur(2px);text-align:center;padding:20px;z-index:4}
.gp-spin{width:32px;height:32px;border:3px solid var(--gp-border);border-top-color:#33c26b;border-radius:50%;animation:gpspin .9s linear infinite}
@keyframes gpspin{to{transform:rotate(360deg)}}
.gp-album{width:100%;max-width:640px;display:flex;flex-direction:column;gap:10px;align-items:center}
.gp-vote{width:100%;max-width:520px;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.12);border-radius:12px;padding:10px 12px;text-align:center}
.gp-vote__title{font-size:.84rem;font-weight:700;margin-bottom:6px}
.gp-vote__row{display:flex;gap:4px;flex-wrap:wrap;justify-content:center}
.gp-vote__btn{width:34px;height:34px;border-radius:8px;border:1px solid rgba(255,255,255,.18);background:rgba(255,255,255,.06);color:inherit;cursor:pointer;font-size:.84rem;font-weight:600}
.gp-vote__btn:hover{background:rgba(255,255,255,.14)}
.gp-vote__btn.on{border-color:var(--gp-accent);background:rgba(108,92,231,.35)}
.gp-vote__avg{margin-top:6px;font-size:.76rem;color:var(--text-dim,#aab)}
.gp-rank{width:100%;max-width:420px;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.12);border-radius:12px;padding:12px 14px}
.gp-rank__title{font-size:.86rem;font-weight:700;margin-bottom:8px;text-align:center}
.gp-rank__row{display:flex;gap:6px;align-items:baseline;font-size:.82rem;padding:3px 0}
.gp-rank__row.top{color:#ffd76b}
.gp-rank__pos{opacity:.6;min-width:20px}
.gp-rank__score{margin-left:auto;color:var(--text-dim,#aab);font-size:.78rem}
.gp-manches{margin-top:10px;font-size:.78rem;color:var(--text-dim,#aab);display:flex;gap:6px;align-items:center;justify-content:center}
.gp-manches__sel{background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.18);color:inherit;border-radius:8px;padding:3px 8px;font-size:.78rem}
.gp-album__origin{font-size:13px;opacity:.7}
.gp-card{width:100%;padding:12px 16px;border-radius:12px;background:var(--gp-deep);border:1px solid var(--gp-border);animation:gpfade .35s ease}
@keyframes gpfade{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}
.gp-card__by{font-size:12px;opacity:.6;margin-bottom:4px}
.gp-card__by b{color:var(--gp-accent)}
.gp-card__text{font-size:17px;font-weight:600}
.gp-card img{max-width:100%;border-radius:8px;display:block;background:#fff}
.gp-navrow{display:flex;gap:8px;justify-content:center;flex-wrap:wrap;margin-top:6px}
.gp-btn{padding:10px 22px;font-size:15px;font-weight:800;border:none;border-radius:10px;background:var(--gp-accent);color:#fff;cursor:pointer}
.gp-btn:disabled{opacity:.4;cursor:not-allowed}
.gp-btn--ghost{background:transparent;border:1px solid var(--gp-border);color:inherit;font-weight:600}
.gp-chat__head{padding:10px 14px;border-bottom:1px solid var(--gp-border);font-weight:700;font-size:14px;flex:none}
.gp-chat__log{flex:1;min-height:0;overflow-y:auto;overflow-x:hidden;padding:10px 12px;display:flex;flex-direction:column;gap:6px}
.gp-msg{font-size:13px;line-height:1.35;word-break:break-word}
.gp-msg b{color:var(--gp-accent)}
.gp-chat__form{display:flex;gap:6px;padding:10px;border-top:1px solid var(--gp-border);flex:none}
.gp-chat__form input{flex:1;min-width:0;padding:8px 10px;border-radius:8px;border:1px solid var(--gp-border);background:var(--gp-deep);color:inherit}
.gp-chat__form button{padding:8px 12px;border:none;border-radius:8px;background:var(--gp-accent);color:#fff;font-weight:700;cursor:pointer}
@media(max-width:760px){.gp{flex-direction:column;min-height:0}.gp__side{width:auto;height:180px}}
`;

/* ====================================================================== */
/* Interface                                                              */
/* ====================================================================== */

const PHASE_LABEL = {
  write: '✍️ Écris une phrase', draw: '🎨 Dessine', describe: '💬 Décris le dessin',
  album: '📖 Album', done: '🏁 Terminé',
};

export class GarticUI {
  constructor(container, context) {
    this.container = container;
    this.ctx = context;
    this.me = context.me;
    this.players = context.players || [];
    this.engine = null;
    this.view = null;
    this.chat = [];
    this.unsub = null;
    this.phaseKey = '';
    this.locked = false;
    this.autoSubmitted = false;
    this.draw = null;
    this._snap = null;
    this._lastHostId = null;
    this.timers = { tick: null, auto: null, safety: null, watch: null };
  }

  get hostId() { return this.ctx.hostId; }
  get isHost() { return this.me.id === this.ctx.hostId; }
  heirId() { const p = this.players.find((x) => x.id !== this.hostId); return p ? p.id : null; }

  broadcast(data) {
    if (typeof this.ctx.broadcast === 'function') this.ctx.broadcast(data);
    else this.ctx.sendMessage(data, null);
  }
  toHost(data) { this.ctx.sendMessage(data, this.hostId); }

  /* ---------- cycle de vie ---------- */

  mount() {
    this.styleEl = h('style', {}, CSS);
    this.root = h('div', { className: 'gp' });
    this.buildShell();
    this.container.append(this.styleEl, this.root);

    this._lastHostId = this.hostId;
    this.unsub = this.ctx.onMessage(({ from, data }) => this.onMsg(from, data));

    if (this.isHost) {
      let manchesPref = 1;
      try { manchesPref = Number(localStorage.getItem('gp:manches')) || 1; } catch { /* stockage indisponible */ }
      try { this.engine = new GarticEngine(this.players, { nbManches: manchesPref }); }
      catch (e) { this.stage.replaceChildren(h('div', { className: 'gp-wait' }, `⚠️ ${e.message}`)); return; }
      this.hostStartPhaseTimer();
      this.broadcast2();
    } else {
      this.stage.replaceChildren(h('div', { className: 'gp-wait' }, '⏳ Connexion à la partie…'));
      this.toHost({ k: 'hello' });
    }
    this.timers.watch = setInterval(() => this.checkHostChange(), HOST_WATCH_MS);
  }

  unmount() {
    if (this.unsub) this.unsub();
    Object.values(this.timers).forEach((t) => { clearInterval(t); clearTimeout(t); });
    if (this.draw) this.draw.destroy();
    if (this.styleEl) this.styleEl.remove();
    if (this.root) this.root.remove();
  }

  /* ---------- transport ---------- */

  onMsg(from, data) {
    if (!data || from === this.me.id) return;
    if (this.isHost) {
      if (data.k === 'hello') { this.ctx.sendMessage({ k: 'g', view: this.engine.getViewFor(from) }, from);
        this.ctx.sendMessage({ k: 'c', chat: this.engine.chat }, from); return; }
      if (data.k === 's') { this.hostSubmit(from, data.phase, data.content); return; }
      if (data.k === 'chat') { this.engine.addChat(from, data.text); this.pushChatFrom(from, data.text); return; }
      if (data.k === 'vote') {
        // Le Host est l'autorité : il valide la note (bornes, auteur, phase).
        const r = this.engine.castVote(data.chain, from, data.note);
        if (r.ok) { this.broadcast2(); this.applyView(this.engine.getViewFor(this.me.id)); }
        return;
      }
    } else {
      if (data.k === 'st') { this._snap = data.snap; return; }
      if (from !== this.hostId) return;
      if (data.k === 'g') { this.applyView(data.view); return; }
      if (data.k === 'c' && Array.isArray(data.chat) && !this.chat.length) { this.chat = data.chat.slice(-CHAT_MAX); this.renderChat(); return; }
      if (data.k === 'chat') { this.appendChat(data.msg); return; }
    }
  }

  // Diffusion des vues personnalisées + snapshot à l'héritier + application locale.
  broadcast2() {
    for (const p of this.players) {
      if (p.id === this.me.id) continue;
      this.ctx.sendMessage({ k: 'g', view: this.engine.getViewFor(p.id) }, p.id);
    }
    this.applyView(this.engine.getViewFor(this.me.id));
  }

  syncHeir() {
    const heir = this.heirId();
    if (heir && heir !== this.me.id) this.ctx.sendMessage({ k: 'st', snap: this.engine.snapshot() }, heir);
  }

  /* ---------- Host : phases ---------- */

  hostStartPhaseTimer() {
    clearTimeout(this.timers.safety);
    if (!PHASES.includes(this.engine.phase)) return;
    const rem = Math.max(0, this.engine.phaseEndsAt - Date.now());
    this.timers.safety = setTimeout(() => {
      const r = this.engine.fillMissingAndAdvance();
      this.afterAdvance(r);
    }, rem + GRACE_MS);
  }

  hostSubmit(pid, phase, content) {
    const res = this.engine.submit(pid, phase, content);
    if (!res.ok) return;
    if (res.allDone) {
      const r = this.engine.advance();
      this.afterAdvance(r);
    } else {
      this.broadcast2();
    }
  }

  afterAdvance() {
    if (PHASES.includes(this.engine.phase)) this.hostStartPhaseTimer();
    this.syncHeir();
    this.broadcast2();
  }

  hostAlbum(dir) {
    if (dir > 0) this.engine.albumNext(); else this.engine.albumPrev();
    this.syncHeir();
    this.broadcast2();
  }

  hostPlayAgain() {
    this.engine.reset();
    this.hostStartPhaseTimer();
    this.syncHeir();
    this.broadcast2();
  }

  hostQuit() { this.ctx.onEnd({ summary: 'Album terminé — retour au salon.', scores: {} }); }

  /* ---------- reprise Host ---------- */

  checkHostChange() {
    const cur = this.hostId;
    if (cur === this._lastHostId) return;
    this._lastHostId = cur;
    if (this.isHost && !this.engine) this.becomeHost();
    else { this.phaseKey = ''; if (this.view) this.applyView(this.view); }
  }

  becomeHost() {
    if (this.engine || !this._snap) { if (!this._snap) this.status('⚠️ Reprise Host impossible.'); return; }
    this.engine = GarticEngine.fromSnapshot(this._snap);
    if (PHASES.includes(this.engine.phase)) this.hostStartPhaseTimer();
    this.phaseKey = '';
    this.broadcast2();
  }

  /* ---------- soumission joueur ---------- */

  localContent() {
    const ph = this.view && this.view.phase;
    if (ph === 'draw') return this.draw ? this.draw.export() : '';
    if (this.inputEl) return this.inputEl.value.trim();
    return '';
  }

  submitPhase() {
    if (this.locked || !this.view || !PHASES.includes(this.view.phase)) return;
    this.locked = true;
    const phase = this.view.phase;
    const content = this.localContent();
    if (this.draw) this.draw.locked = true;
    if (this.isHost) this.hostSubmit(this.me.id, phase, content);
    else this.toHost({ k: 's', phase, content });
    this.renderLockedOverlay();
    this.updateFini();
  }

  /* ---------- chat (canal indépendant, persistant) ---------- */

  appendChat(msg) {
    if (!msg || !msg.text) return;
    // Déduplication : un message peut revenir à son auteur (diffusion salon qui
    // inclut l'émetteur, ou re-synchro via la vue). On l'identifie par son id
    // et on ignore les exemplaires déjà affichés → plus de doublon à l'écran.
    if (msg.id && this.chat.some((m) => m.id === msg.id)) return;
    this.chat.push(msg);
    if (this.chat.length > CHAT_MAX) this.chat.shift();
    this.renderChat();
  }
  pushChatFrom(from, text) {
    const msg = { id: chatId(), from, pseudo: this.engine.pseudoOf(from), text: String(text).slice(0, 240), ts: Date.now() };
    this.appendChat(msg);
    this.broadcast({ k: 'chat', msg });
  }
  sendChat() {
    const text = this.chatInput.value.trim();
    if (!text) return;
    this.chatInput.value = '';
    this.chatInput.focus();               // on garde le focus sur le champ de saisie
    if (this.isHost) { this.engine.addChat(this.me.id, text); this.pushChatFrom(this.me.id, text); }
    else {
      // L'invité n'affiche PAS en local : il attend le message estampillé par le
      // Host (avec son id), ce qui évite le doublon quand la diffusion lui revient.
      this.toHost({ k: 'chat', text });
    }
  }

  /* ---------- construction DOM ---------- */

  buildShell() {
    this.phaseEl = h('span', { className: 'gp__phase' }, '…');
    this.subEl = h('span', { className: 'gp__sub' }, '');
    this.timerEl = h('span', { className: 'gp__timer' }, '3:00');
    this.head = h('div', { className: 'gp__head' }, [this.phaseEl, h('span', { className: 'gp__grow' }), this.subEl, this.timerEl]);
    this.stage = h('div', { className: 'gp__stage' });
    this.overlayEl = h('div', {});
    const main = h('div', { className: 'gp__main' }, [this.head, this.stage, this.overlayEl]);

    this.chatLog = h('div', { className: 'gp-chat__log' });
    this.chatInput = h('input', { placeholder: 'Message…', maxlength: '240', onKeydown: (e) => { if (e.key === 'Enter') this.sendChat(); } });
    const side = h('div', { className: 'gp__side' }, [
      h('div', { className: 'gp-chat__head' }, '💬 Chat'),
      this.chatLog,
      h('div', { className: 'gp-chat__form' }, [this.chatInput, h('button', { onClick: () => this.sendChat() }, 'Envoyer')]),
    ]);
    this.root.append(main, side);
  }

  /* ---------- rendu ---------- */

  applyView(view) {
    if (!view) return;
    this.view = view;
    // Fusion du chat porté par la vue, SANS écraser bêtement (ce qui re-render
    // à chaque vue et arrache le focus du champ de saisie) : on n'ajoute que les
    // messages réellement nouveaux, identifiés par leur id.
    if (Array.isArray(view.chat) && view.chat.length) {
      const connus = new Set(this.chat.map((m) => m.id));
      const nouveaux = view.chat.filter((m) => !m.id || !connus.has(m.id));
      if (nouveaux.length) {
        this.chat.push(...nouveaux);
        if (this.chat.length > CHAT_MAX) this.chat = this.chat.slice(-CHAT_MAX);
        this.renderChat();
      }
    }

    this.phaseEl.textContent = `${PHASE_LABEL[view.phase] || ''}`;
    if (PHASES.includes(view.phase)) {
      this.subEl.textContent = `${view.submitted}/${view.total} ont fini`;
      this.subEl.style.display = '';
    } else { this.subEl.style.display = 'none'; }

    if (PHASES.includes(view.phase)) this.startTick(); else { clearInterval(this.timers.tick); this.timerEl.style.display = 'none'; }

    const key = `${view.phase}:${view.game}:${view.phase === 'album' ? '' : view.phaseIndex}`;
    if (key !== this.phaseKey) {
      this.phaseKey = key;
      this.locked = !!view.locked;
      this.autoSubmitted = false;
      if (this.draw) { this.draw.destroy(); this.draw = null; }
      this.inputEl = null;
      this.renderPhase(view);
      this.scheduleAuto(view);
    } else {
      // Même phase : rafraîchir compteurs / album / verrou
      if (view.phase === 'album') this.renderAlbum(view);
      if (view.locked && !this.locked) { this.locked = true; this.renderLockedOverlay(); }
      this.updateFini();
    }
  }

  renderPhase(view) {
    this.overlayEl.replaceChildren();
    if (view.phase === 'write') this.renderWrite(view);
    else if (view.phase === 'draw') this.renderDraw(view);
    else if (view.phase === 'describe') this.renderDescribe(view);
    else if (view.phase === 'album') this.renderAlbum(view);
    else if (view.phase === 'done') this.renderDone(view);
    if (this.locked && PHASES.includes(view.phase)) this.renderLockedOverlay();
  }

  makeFini() {
    this.finiBtn = h('button', { className: 'gp-fini', onClick: () => this.submitPhase() }, 'FINI ✓');
    return this.finiBtn;
  }
  updateFini() { if (this.finiBtn) this.finiBtn.disabled = this.locked; }

  renderWrite(view) {
    this.inputEl = h('textarea', { className: 'gp-input', rows: '3', placeholder: 'Ex. « Un chat astronaute qui mange une pizza »', maxlength: '140' });
    this.stage.replaceChildren(
      h('div', { className: 'gp-instr' }, ['Écris une phrase que ', h('b', {}, 'quelqu\'un d\'autre'), ' devra dessiner.']),
      this.inputEl,
      this.makeFini(),
      h('div', { className: 'gp-wait' }, 'Astuce : plus c\'est absurde, plus c\'est drôle.'),
      this.renderReglageManches(view),
    );
    this.inputEl.focus();
  }

  /**
   * Réglage du nombre de manches — visible par le Host au tout début de la
   * partie seulement (après, changer le total fausserait le déroulé).
   */
  renderReglageManches(view) {
    if (!this.isHost || !this.engine) return '';
    if (this.engine.game > 1) return '';
    const sel = h('select', { className: 'gp-manches__sel' },
      [1, 2, 3, 4, 5].map((n) => h('option', { value: String(n) }, `${n} manche${n > 1 ? 's' : ''}`)));
    sel.value = String(this.engine.nbManches || 1);
    sel.addEventListener('change', () => {
      this.engine.nbManches = Math.max(1, Math.min(10, Number(sel.value) || 1));
      try { localStorage.setItem('gp:manches', String(this.engine.nbManches)); } catch { /* stockage indisponible */ }
      this.broadcast2();
    });
    return h('div', { className: 'gp-manches' }, [h('span', {}, 'Nombre de manches : '), sel]);
  }

  renderDraw(view) {
    const prompt = view.assign && view.assign.see ? view.assign.see.text : '';
    this.draw = new DrawCanvas();
    this.draw.locked = this.locked;
    const swatches = h('div', { className: 'gp-swatches' }, COLORS.map((col) => h('button', {
      className: `gp-sw${col.c === this.draw.color ? ' gp--on' : ''}`, style: `background:${col.c}`, title: col.n,
      onClick: (e) => {
        this.draw.color = col.c; this.draw.erasing = false;
        this.stage.querySelectorAll('.gp-sw').forEach((s) => s.classList.remove('gp--on'));
        e.currentTarget.classList.add('gp--on');
        this.eraserBtn.classList.remove('gp--on');
      },
    })));
    const sizeBtns = {};
    const sizeRow = h('div', { style: 'display:flex;gap:5px' }, Object.entries(BRUSHES).map(([k, v]) => {
      const b = h('button', { className: `gp-tool${v === this.draw.size ? ' gp--on' : ''}`, onClick: () => {
        this.draw.size = v; this.draw.erasing = false;
        Object.values(sizeBtns).forEach((x) => x.classList.remove('gp--on'));
        b.classList.add('gp--on'); this.eraserBtn.classList.remove('gp--on');
      } }, k);
      sizeBtns[k] = b; return b;
    }));
    this.eraserBtn = h('button', { className: 'gp-tool', onClick: () => {
      this.draw.erasing = true; this.eraserBtn.classList.add('gp--on');
      this.stage.querySelectorAll('.gp-sw').forEach((s) => s.classList.remove('gp--on'));
    } }, '🧽 Gomme');
    const undoBtn = h('button', { className: 'gp-tool', onClick: () => this.draw.undo() }, '↶ Annuler');
    const clearBtn = h('button', { className: 'gp-tool', onClick: () => this.draw.clear() }, '🗑 Tout effacer');

    this.stage.replaceChildren(
      h('div', { className: 'gp-instr' }, 'Dessine ceci :'),
      h('div', { className: 'gp-prompt-box' }, prompt || '(phrase manquante)'),
      this.draw.canvas,
      h('div', { className: 'gp-toolbar' }, [swatches, sizeRow, this.eraserBtn, undoBtn, clearBtn]),
      this.makeFini(),
    );
  }

  renderDescribe(view) {
    const data = view.assign && view.assign.see ? view.assign.see.data : '';
    const img = h('img', { className: 'gp-drawing-view', alt: 'dessin à décrire' });
    if (data) img.src = data;
    this.inputEl = h('input', { className: 'gp-input', placeholder: 'Qu\'est-ce que c\'est ? Décris en une phrase…', maxlength: '140' });
    this.stage.replaceChildren(
      h('div', { className: 'gp-instr' }, 'Que représente ce dessin ?'),
      img,
      this.inputEl,
      this.makeFini(),
    );
    this.inputEl.focus();
  }

  renderAlbum(view) {
    const a = view.album;
    if (!a) return;
    const cards = a.items.map((it) => {
      const by = h('div', { className: 'gp-card__by' }, [it.kind === 'prompt' ? 'Phrase de départ — ' : it.kind === 'draw' ? 'Dessiné par ' : 'Deviné par ', h('b', {}, it.author || '?')]);
      let body;
      if (it.kind === 'draw') { const im = h('img', {}); if (it.content) im.src = it.content; body = im; }
      else body = h('div', { className: 'gp-card__text' }, it.content || '—');
      return h('div', { className: 'gp-card' }, [by, body]);
    });
    const nav = h('div', { className: 'gp-navrow' });
    if (this.isHost) {
      nav.append(
        h('button', { className: 'gp-btn gp-btn--ghost', disabled: a.chain === 0 && a.step === 0, onClick: () => this.hostAlbum(-1) }, '‹ Précédent'),
        h('button', { className: 'gp-btn', onClick: () => this.hostAlbum(1) }, 'Suivant ›'),
      );
    } else {
      nav.append(h('span', { className: 'gp-wait' }, 'Le Host fait défiler l\'album…'));
    }
    this.stage.replaceChildren(h('div', { className: 'gp-album' }, [
      h('div', { className: 'gp-album__origin' }, `Album ${a.chain + 1} / ${a.total}${view.nbManches > 1 ? ` — manche ${view.game}/${view.nbManches}` : ''}`),
      ...cards,
      this.renderVote(view),
      nav,
    ]));
  }

  /**
   * Panneau de vote : chaque joueur (sauf l'auteur du dessin) note de 0 à 10 la
   * correspondance entre la consigne de départ et le dessin qui en est sorti.
   */
  renderVote(view) {
    const v = view.vote;
    if (!v || !v.ouvert) return '';
    const moyenneTxt = v.nb
      ? `Moyenne : ${v.moyenne}/10 (${v.nb} vote${v.nb > 1 ? 's' : ''})`
      : 'Aucun vote pour l\u2019instant';

    if (!v.peutVoter) {
      return h('div', { className: 'gp-vote' }, [
        h('div', { className: 'gp-vote__title' }, v.estMonDessin ? '🎨 Votre dessin est jugé…' : '🗳️ Vote en cours'),
        h('div', { className: 'gp-vote__avg' }, moyenneTxt),
      ]);
    }

    const boutons = Array.from({ length: 11 }, (_, n) => h('button', {
      className: `gp-vote__btn${v.maNote === n ? ' on' : ''}`,
      onClick: () => this.envoyerVote(v.chain, n),
    }, String(n)));

    return h('div', { className: 'gp-vote' }, [
      h('div', { className: 'gp-vote__title' }, 'Le dessin correspond-il à la consigne ?'),
      h('div', { className: 'gp-vote__row' }, boutons),
      h('div', { className: 'gp-vote__avg' }, [
        v.maNote != null ? h('b', {}, `Votre note : ${v.maNote}/10 · `) : '',
        moyenneTxt,
      ]),
    ]);
  }

  /** Envoie la note au Host (ou l'applique directement si l'on EST le Host). */
  envoyerVote(chain, note) {
    if (this.isHost) {
      this.engine.castVote(chain, this.me.id, note);
      this.broadcast2();
      this.applyView(this.engine.getViewFor(this.me.id));
    } else {
      this.toHost({ k: 'vote', chain, note });
    }
  }

  renderDone(view) {
    const nav = h('div', { className: 'gp-navrow' });
    if (this.isHost) {
      nav.append(
        h('button', { className: 'gp-btn', onClick: () => this.hostPlayAgain() }, '🔄 Rejouer'),
        h('button', { className: 'gp-btn gp-btn--ghost', onClick: () => this.hostQuit() }, 'Retour au salon'),
      );
    } else nav.append(h('span', { className: 'gp-wait' }, 'En attente du Host…'));
    // Classement par moyenne des notes reçues sur ses dessins.
    const cl = view?.classement ?? [];
    const podium = cl.length ? h('div', { className: 'gp-rank' }, [
      h('div', { className: 'gp-rank__title' }, '🏆 Meilleurs dessinateurs (note moyenne)'),
      ...cl.map((p, i) => h('div', { className: `gp-rank__row${i === 0 && p.moyenne != null ? ' top' : ''}` }, [
        h('span', { className: 'gp-rank__pos' }, `${i + 1}.`),
        h('b', {}, p.pseudo),
        h('span', { className: 'gp-rank__score' }, p.moyenne == null ? ' — non noté' : ` ${p.moyenne}/10 (${p.nbVotes} vote${p.nbVotes > 1 ? 's' : ''})`),
      ])),
    ]) : '';
    this.stage.replaceChildren(h('div', { className: 'gp-album' }, [
      podium,
      h('div', { className: 'gp-instr' }, '🎉 Fin de l\'album ! Merci d\'avoir joué.'), nav,
    ]));
  }

  renderLockedOverlay() {
    this.overlayEl.replaceChildren(h('div', { className: 'gp-overlay' }, [
      h('div', { className: 'gp-spin' }),
      h('div', {}, '✓ Envoyé — en attente des autres joueurs…'),
    ]));
  }

  /* ---------- timers ---------- */

  startTick() {
    clearInterval(this.timers.tick);
    this.timerEl.style.display = '';
    const render = () => {
      const rem = Math.max(0, (this.view.phaseEndsAt || 0) - Date.now());
      const s = Math.ceil(rem / 1000);
      this.timerEl.textContent = `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
      this.timerEl.classList.toggle('gp--low', s <= 20);
      if (rem <= 0) clearInterval(this.timers.tick);
    };
    render();
    this.timers.tick = setInterval(render, 250);
  }

  scheduleAuto(view) {
    clearTimeout(this.timers.auto);
    if (!PHASES.includes(view.phase) || this.locked) return;
    const rem = Math.max(0, (view.phaseEndsAt || 0) - Date.now());
    this.timers.auto = setTimeout(() => { if (!this.locked) this.submitPhase(); }, rem);
  }

  renderChat() {
    const atBottom = this.chatLog.scrollHeight - this.chatLog.scrollTop - this.chatLog.clientHeight < 40;
    const avaitFocus = document.activeElement === this.chatInput;
    this.chatLog.replaceChildren(...this.chat.map((m) => h('div', { className: 'gp-msg' }, [h('b', {}, `${m.pseudo} `), h('span', {}, m.text)])));
    // On ne descend au dernier message QUE si l'on y était déjà (sinon on
    // arrache la lecture de qui a remonté), et on ne touche jamais le focus du
    // champ de saisie : rendre le chat ne doit pas interrompre la frappe.
    if (atBottom) this.chatLog.scrollTop = this.chatLog.scrollHeight;
    if (avaitFocus) this.chatInput.focus();
  }

  status(msg) { this.subEl.textContent = msg; this.subEl.style.display = ''; }
}

/* ====================================================================== */
/* Contrat de module Arcade                                               */
/* ====================================================================== */

let instance = null;

export default {
  async mount(container, context) {
    instance = new GarticUI(container, context);
    instance.mount();
  },
  async unmount() {
    if (instance) instance.unmount();
    instance = null;
  },
};
