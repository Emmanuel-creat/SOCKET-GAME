/**
 * Puissance 4 — module de jeu pour la plateforme Arcade.
 *
 * Architecture « Host autoritaire » : le client du Host exécute le moteur pur
 * (Connect4Engine) et diffuse l'état au salon. L'adversaire envoie ses coups au
 * Host, qui valide et rediffuse. Aucun coup illégal n'est accepté.
 *
 * Contrat de plateforme :
 *   export default { mount(container, context), unmount() }
 *   context = { roomId, roomName, hostId, players, me, socket,
 *               sendMessage(data, to = null),   // to = null → diffusion au salon
 *               onMessage(handler) -> unsubscribe,  // handler({ from, data })
 *               onEnd(result) }
 *
 * Note transport : la spec parlait de `context.broadcast`. La plateforme n'expose
 * pas cette méthode : la diffusion se fait via sendMessage(data) sans cible.
 * L'adaptateur ci-dessous utilise context.broadcast s'il existe, sinon sendMessage.
 *
 * Canaux logiques (multiplexés sur le bus, mais indépendants) :
 *   'g' → état de jeu (board, tour, scores)   — réinitialisé à chaque revanche
 *   'c' → chat                                — historique persistant, jamais vidé
 *   'h' → heartbeat (détection de déconnexion)
 *
 * Connect4Engine est exporté (pur, sans DOM ni réseau) pour les tests Node.
 */

/* ====================================================================== */
/* Constantes & helpers                                                   */
/* ====================================================================== */

export const ROWS = 6;
export const COLS = 7;
export const EMPTY = 0;
export const RED = 1;     // Joueur 1 — Host / premier connecté
export const YELLOW = 2;  // Joueur 2 — second connecté

const HB_MS = 2000;        // fréquence du heartbeat
const LOST_MS = 6000;      // silence → « en attente de reconnexion »
const FORFEIT_MS = 30000;  // silence prolongé → victoire par forfait
const CHAT_MAX = 200;

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
/* Moteur pur (aucune dépendance DOM/réseau)                              */
/* ====================================================================== */

export class Connect4Engine {
  constructor() {
    this.scores = { 1: 0, 2: 0 };  // persistants à travers les revanches
    this.gameNo = 0;
    this.starter = RED;            // Rouge commence la partie 1
    this.reset(RED);
  }

  /** Nouvelle grille. @param {number} starter Camp qui entame. */
  reset(starter) {
    this.board = Array.from({ length: ROWS }, () => Array(COLS).fill(EMPTY));
    this.turn = starter;
    this.starter = starter;
    this.phase = 'playing';   // playing | won | draw | forfeit
    this.winner = 0;
    this.winLine = [];
    this.lastDrop = null;     // { row, col, player } → pilote l'animation de chute
    this.moves = 0;
    this.gameNo += 1;
  }

  /** Revanche : la grille est vidée et le camp qui entame alterne. */
  rematch() {
    this.reset(this.starter === RED ? YELLOW : RED);
  }

  /** Première ligne libre (la plus basse) d'une colonne, ou -1 si pleine. */
  landingRow(col) {
    if (col < 0 || col >= COLS) return -1;
    for (let r = ROWS - 1; r >= 0; r -= 1) if (this.board[r][col] === EMPTY) return r;
    return -1;
  }

  isColumnFull(col) { return this.landingRow(col) === -1; }

  legalColumns() {
    const out = [];
    for (let c = 0; c < COLS; c += 1) if (!this.isColumnFull(c)) out.push(c);
    return out;
  }

  /**
   * Joue un jeton. Refuse tout coup illégal (mauvais tour, colonne pleine/invalide,
   * partie terminée).
   * @returns {{ok:boolean, error?:string, row?:number, col?:number, player?:number}}
   */
  play(player, col) {
    if (this.phase !== 'playing') return { ok: false, error: 'Partie terminée.' };
    if (player !== this.turn) return { ok: false, error: 'Ce n\'est pas votre tour.' };
    const row = this.landingRow(col);
    if (row === -1) return { ok: false, error: 'Colonne pleine ou invalide.' };

    this.board[row][col] = player;
    this.moves += 1;
    this.lastDrop = { row, col, player };

    const line = this.findWin(row, col, player);
    if (line) {
      this.phase = 'won';
      this.winner = player;
      this.winLine = line;
      this.scores[player] += 1;
    } else if (this.moves === ROWS * COLS) {
      this.phase = 'draw';
      this.winner = 0;
      this.winLine = [];
      this.scores[RED] += 1;      // match nul : +1 pour les deux
      this.scores[YELLOW] += 1;
    } else {
      this.turn = player === RED ? YELLOW : RED;
    }
    return { ok: true, row, col, player };
  }

  /** Victoire par forfait (adversaire déconnecté trop longtemps). */
  forfeit(winner) {
    if (this.phase !== 'playing') return { ok: false };
    this.phase = 'forfeit';
    this.winner = winner;
    this.winLine = [];
    this.scores[winner] += 1;
    return { ok: true };
  }

  /**
   * Cherche 4 jetons alignés passant par (row,col) : horizontal, vertical et les
   * deux diagonales. @returns {Array<[number,number]>|null} les 4+ cases gagnantes.
   */
  findWin(row, col, player) {
    const dirs = [[0, 1], [1, 0], [1, 1], [1, -1]];
    for (const [dr, dc] of dirs) {
      const line = [[row, col]];
      for (const sign of [1, -1]) {
        let r = row + dr * sign;
        let c = col + dc * sign;
        while (r >= 0 && r < ROWS && c >= 0 && c < COLS && this.board[r][c] === player) {
          line.push([r, c]);
          r += dr * sign;
          c += dc * sign;
        }
      }
      if (line.length >= 4) return line;
    }
    return null;
  }

  /** État sérialisable diffusé aux clients (canal 'g'). */
  snapshot() {
    return {
      board: this.board.map((r) => [...r]),
      turn: this.turn,
      phase: this.phase,
      winner: this.winner,
      winLine: this.winLine.map((p) => [...p]),
      lastDrop: this.lastDrop ? { ...this.lastDrop } : null,
      scores: { ...this.scores },
      gameNo: this.gameNo,
      starter: this.starter,
    };
  }
}

/* ====================================================================== */
/* Styles (scopés .c4)                                                    */
/* ====================================================================== */

const CSS = `
.c4{--c4-red:#ff4757;--c4-yellow:#ffd32a;--c4-board:#1e3a8a;--c4-hole:#0b1020;--c4-gold:#ffd54a;
--c4-surface:var(--surface,#171a24);--c4-border:var(--border,#2a2f3d);--c4-ink:var(--text,#e8eaf0);--c4-deep:#0e1017;--c4-accent:var(--accent,#6c5ce7);
display:flex;gap:12px;align-items:stretch;font-family:inherit;color:var(--c4-ink);min-height:560px}
.c4 *{box-sizing:border-box}
.c4__main{flex:1;min-width:0;display:flex;flex-direction:column;background:var(--c4-surface);border:1px solid var(--c4-border);border-radius:14px;overflow:hidden;position:relative}
.c4__side{width:250px;flex:none;display:flex;flex-direction:column;background:var(--c4-surface);border:1px solid var(--c4-border);border-radius:14px;overflow:hidden}
.c4__head{display:flex;align-items:center;gap:10px;padding:10px 14px;border-bottom:1px solid var(--c4-border);flex:none}
.c4__score{display:flex;align-items:center;gap:8px;font-weight:800;font-size:15px}
.c4__sc{display:inline-flex;align-items:center;gap:5px;padding:3px 9px;border-radius:20px;background:var(--c4-deep);border:1px solid var(--c4-border);font-variant-numeric:tabular-nums}
.c4__sc--r{border-color:var(--c4-red)}
.c4__sc--y{border-color:var(--c4-yellow)}
.c4__grow{flex:1}
.c4__turn{font-size:13px;font-weight:700;padding:5px 12px;border-radius:20px;background:var(--c4-deep);border:1px solid var(--c4-border);white-space:nowrap}
.c4__turn.c4--me{border-color:#33c26b;color:#7ee787}
.c4__stage{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:14px;gap:8px}
.c4-arrows{display:grid;grid-template-columns:repeat(7,1fr);gap:6px;width:100%;max-width:480px}
.c4-arrow{aspect-ratio:1/1;max-height:44px;border:1px solid var(--c4-border);border-radius:9px;background:#151a26;color:inherit;font-size:17px;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:transform .1s,border-color .12s,opacity .12s;padding:0}
.c4-arrow:hover:not(:disabled){transform:translateY(2px);border-color:var(--c4-accent)}
.c4-arrow:disabled{opacity:.22;cursor:not-allowed}
.c4-arrow.c4--r:not(:disabled){border-color:var(--c4-red);color:var(--c4-red)}
.c4-arrow.c4--y:not(:disabled){border-color:var(--c4-yellow);color:var(--c4-yellow)}
.c4-board{display:grid;grid-template-columns:repeat(7,1fr);gap:6px;padding:8px;border-radius:12px;background:var(--c4-board);box-shadow:0 10px 30px rgba(0,0,0,.35);width:100%;max-width:480px}
.c4-cell{aspect-ratio:1/1;border-radius:50%;background:var(--c4-hole);position:relative;overflow:visible;box-shadow:inset 0 2px 6px rgba(0,0,0,.6)}
.c4-tok{position:absolute;inset:5%;border-radius:50%;box-shadow:inset 0 -3px 6px rgba(0,0,0,.35),0 1px 3px rgba(0,0,0,.4)}
.c4-tok--r{background:radial-gradient(circle at 35% 30%,#ff7b85,var(--c4-red))}
.c4-tok--y{background:radial-gradient(circle at 35% 30%,#ffe98a,var(--c4-yellow))}
.c4-tok--drop{animation:c4fall .42s cubic-bezier(.5,.05,.75,1)}
@keyframes c4fall{
  0%{transform:translateY(var(--c4-fall,-400px));opacity:.85}
  70%{transform:translateY(0)}
  82%{transform:translateY(-7%)}
  92%{transform:translateY(0)}
  96%{transform:translateY(-2.5%)}
  100%{transform:translateY(0)}
}
.c4-tok--win{animation:c4win 1s ease-in-out infinite;z-index:2}
@keyframes c4win{
  0%,100%{box-shadow:0 0 0 0 rgba(255,213,74,.85),inset 0 -3px 6px rgba(0,0,0,.3);transform:scale(1)}
  50%{box-shadow:0 0 18px 6px rgba(255,213,74,.95),inset 0 -3px 6px rgba(0,0,0,.3);transform:scale(1.08)}
}
.c4-cell--win{background:rgba(255,213,74,.16)}
@media(prefers-reduced-motion:reduce){.c4-tok--drop,.c4-tok--win{animation:none}}
.c4-banner{display:flex;flex-direction:column;align-items:center;gap:10px;padding:14px 20px;border-radius:12px;background:var(--c4-deep);border:1px solid var(--c4-border);text-align:center;width:100%;max-width:480px}
.c4-banner h3{margin:0;font-size:22px;font-weight:900;letter-spacing:.5px}
.c4-banner--win h3{color:#7ee787}
.c4-banner--lose h3{color:#ff6b6b}
.c4-banner--draw h3{color:var(--c4-gold)}
.c4-banner p{margin:0;font-size:13px;opacity:.7}
.c4-btn{padding:10px 24px;font-size:15px;font-weight:800;border:none;border-radius:10px;background:var(--c4-accent);color:#fff;cursor:pointer}
.c4-btn:hover{filter:brightness(1.1)}
.c4-btn--ghost{background:transparent;border:1px solid var(--c4-border);color:inherit;font-weight:600;padding:8px 18px;font-size:13px}
.c4-row{display:flex;gap:8px;flex-wrap:wrap;justify-content:center}
.c4-overlay{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:12px;background:rgba(8,10,16,.9);backdrop-filter:blur(3px);z-index:5;text-align:center;padding:20px}
.c4-overlay h3{margin:0;font-size:19px}
.c4-spin{width:34px;height:34px;border:3px solid var(--c4-border);border-top-color:var(--c4-accent);border-radius:50%;animation:c4spin .9s linear infinite}
@keyframes c4spin{to{transform:rotate(360deg)}}
.c4-count{font-variant-numeric:tabular-nums;font-weight:800;color:#ffb454}
.c4-chat__head{padding:10px 14px;border-bottom:1px solid var(--c4-border);font-weight:700;font-size:14px;flex:none;display:flex;align-items:center;gap:6px}
.c4-chat__log{flex:1;overflow:auto;padding:10px 12px;display:flex;flex-direction:column;gap:6px}
.c4-msg{font-size:13px;line-height:1.35;word-break:break-word}
.c4-msg b{color:var(--c4-accent)}
.c4-msg--r b{color:var(--c4-red)}
.c4-msg--y b{color:var(--c4-yellow)}
.c4-msg--sys{opacity:.6;font-style:italic;font-size:12px}
.c4-chat__form{display:flex;gap:6px;padding:10px;border-top:1px solid var(--c4-border);flex:none}
.c4-chat__form input{flex:1;min-width:0;padding:8px 10px;border-radius:8px;border:1px solid var(--c4-border);background:var(--c4-deep);color:inherit}
.c4-chat__form input:focus{outline:none;border-color:var(--c4-accent)}
.c4-chat__form button{padding:8px 12px;border:none;border-radius:8px;background:var(--c4-accent);color:#fff;font-weight:700;cursor:pointer}
@media(max-width:760px){.c4{flex-direction:column;min-height:0}.c4__side{width:auto;height:190px}}
`;

/* ====================================================================== */
/* Interface                                                              */
/* ====================================================================== */

export class Connect4UI {
  constructor(container, context) {
    this.container = container;
    this.ctx = context;
    this.me = context.me;
    this.players = context.players || [];
    this.engine = null;
    this.state = null;        // dernier snapshot connu (Host comme invité)
    this.chat = [];           // historique persistant (jamais vidé entre les parties)
    this.unsub = null;
    this.lastSeen = Date.now();
    this.peerLost = false;
    this.forfeited = false;
    this.renderedDrop = null; // clé du dernier jeton animé (évite de rejouer l'anim)
    this.timers = { hb: null, watch: null };
  }

  /* ---------- rôles ---------- */

  get hostId() { return this.ctx.hostId; }
  get isHost() { return this.me.id === this.ctx.hostId; }

  /** Joueur 1 (RED) = Host ; Joueur 2 (YELLOW) = l'autre. */
  get redId() { return this.hostId; }
  get yellowId() {
    const p = this.players.find((x) => x.id !== this.hostId);
    return p ? p.id : null;
  }
  get mySeat() { return this.me.id === this.redId ? RED : YELLOW; }
  get peerId() { return this.me.id === this.redId ? this.yellowId : this.redId; }
  seatOf(id) { return id === this.redId ? RED : YELLOW; }
  pseudoOfSeat(seat) {
    const id = seat === RED ? this.redId : this.yellowId;
    const p = this.players.find((x) => x.id === id);
    return p ? p.pseudo : (seat === RED ? 'Rouge' : 'Jaune');
  }

  /* ---------- transport (adaptateur : broadcast si dispo, sinon sendMessage) ---------- */

  broadcast(data) {
    if (typeof this.ctx.broadcast === 'function') this.ctx.broadcast(data);
    else this.ctx.sendMessage(data, null);
  }

  toHost(data) { this.ctx.sendMessage(data, this.hostId); }

  /* ---------- cycle de vie ---------- */

  mount() {
    this.styleEl = h('style', {}, CSS);
    this.root = h('div', { className: 'c4' });
    this.buildShell();
    this.container.append(this.styleEl, this.root);

    this.unsub = this.ctx.onMessage(({ from, data }) => this.onMessage(from, data));

    if (this.isHost) {
      this.engine = new Connect4Engine();
      this.state = this.engine.snapshot();
      this.pushState();
    } else {
      this.toHost({ k: 'hello' });
    }

    this.timers.hb = setInterval(() => this.broadcast({ k: 'h' }), HB_MS);
    this.timers.watch = setInterval(() => this.checkPeer(), 1000);
    this.render();
  }

  unmount() {
    if (this.unsub) this.unsub();
    clearInterval(this.timers.hb);
    clearInterval(this.timers.watch);
    if (this.styleEl) this.styleEl.remove();
    if (this.root) this.root.remove();
  }

  /* ---------- réseau ---------- */

  onMessage(from, data) {
    if (!data || from === this.me.id) return;
    if (from === this.peerId) { this.lastSeen = Date.now(); if (this.peerLost) { this.peerLost = false; this.render(); } }

    switch (data.k) {
      case 'h': break;                                   // heartbeat
      case 'hello':                                      // (Host) l'invité arrive
        if (this.isHost) {
          this.ctx.sendMessage({ k: 'g', state: this.engine.snapshot() }, from);
          this.ctx.sendMessage({ k: 'c:sync', chat: this.chat }, from);
        }
        break;
      case 'g':                                          // (invité) nouvel état
        if (!this.isHost) { this.state = data.state; this.render(); }
        break;
      case 'm':                                          // (Host) coup demandé
        if (this.isHost) this.hostPlay(this.seatOf(from), data.col);
        break;
      case 'c':                                          // chat (canal indépendant)
        this.appendChat(data.msg, false);
        break;
      case 'c:sync':                                     // historique du chat à l'arrivée
        if (!this.isHost && Array.isArray(data.chat) && !this.chat.length) {
          this.chat = data.chat.slice(-CHAT_MAX);
          this.renderChat();
        }
        break;
      default: break;
    }
  }

  pushState() {
    this.state = this.engine.snapshot();
    this.broadcast({ k: 'g', state: this.state });
    this.render();
  }

  /* ---------- actions ---------- */

  /** Coup joué localement : le Host applique, l'invité demande au Host. */
  requestMove(col) {
    const s = this.state;
    if (!s || s.phase !== 'playing' || s.turn !== this.mySeat) return;
    if (this.engineFullColumn(col)) return;
    if (this.isHost) this.hostPlay(RED, col);
    else this.toHost({ k: 'm', col });
  }

  engineFullColumn(col) {
    const s = this.state;
    if (!s) return true;
    return s.board[0][col] !== EMPTY;
  }

  hostPlay(seat, col) {
    const res = this.engine.play(seat, col);
    if (!res.ok) return;
    if (this.engine.phase === 'won') {
      this.sysChat(`${this.pseudoOfSeat(this.engine.winner)} gagne la manche ${this.engine.gameNo} !`);
    } else if (this.engine.phase === 'draw') {
      this.sysChat(`Match nul (manche ${this.engine.gameNo}).`);
    }
    this.pushState();
  }

  /** Revanche (Host) : grille vidée, camp qui entame alterné, scores conservés. */
  rematch() {
    if (!this.isHost) return;
    this.engine.rematch();
    this.renderedDrop = null;
    this.sysChat(`Nouvelle manche — ${this.pseudoOfSeat(this.engine.starter)} commence.`);
    this.pushState();
  }

  /** Fin de match : retour au salon pour tout le monde. */
  quit() {
    if (!this.isHost) return;
    const s = this.engine.snapshot();
    const r = s.scores[RED];
    const y = s.scores[YELLOW];
    const summary = r === y
      ? `Égalité ${r} – ${y} au Puissance 4.`
      : `${this.pseudoOfSeat(r > y ? RED : YELLOW)} remporte le match ${Math.max(r, y)} – ${Math.min(r, y)}.`;
    this.ctx.onEnd({
      summary,
      scores: { [this.redId]: r, ...(this.yellowId ? { [this.yellowId]: y } : {}) },
    });
  }

  /* ---------- déconnexion / forfait ---------- */

  checkPeer() {
    if (!this.peerId || this.forfeited) return;
    const silent = Date.now() - this.lastSeen;
    const s = this.state;
    if (!s || s.phase !== 'playing') return;

    if (silent > FORFEIT_MS) {
      this.forfeited = true;
      if (this.isHost) {
        this.engine.forfeit(this.mySeat);
        this.sysChat('Adversaire absent : victoire par forfait.');
        this.pushState();
      } else {
        // Le Host est injoignable : on tranche localement (l'invité gagne par forfait).
        this.state = { ...s, phase: 'forfeit', winner: this.mySeat, winLine: [],
          scores: { ...s.scores, [this.mySeat]: s.scores[this.mySeat] + 1 } };
        this.render();
      }
      return;
    }
    const lost = silent > LOST_MS;
    if (lost !== this.peerLost) { this.peerLost = lost; this.render(); }
  }

  /* ---------- chat (canal indépendant, persistant entre les manches) ---------- */

  appendChat(msg, mine) {
    if (!msg || !msg.text) return;
    this.chat.push(msg);
    if (this.chat.length > CHAT_MAX) this.chat.shift();
    this.renderChat();
    void mine;
  }

  sendChat() {
    const text = this.chatInput.value.trim();
    if (!text) return;
    this.chatInput.value = '';
    const msg = { from: this.me.id, pseudo: this.me.pseudo, seat: this.mySeat, text: text.slice(0, 240), ts: Date.now() };
    this.appendChat(msg, true);
    this.broadcast({ k: 'c', msg });
  }

  /** Message système local (Host) : diffusé comme un message de chat. */
  sysChat(text) {
    const msg = { sys: true, text, ts: Date.now() };
    this.appendChat(msg, true);
    this.broadcast({ k: 'c', msg });
  }

  /* ---------- construction du DOM ---------- */

  buildShell() {
    this.scoreR = h('span', { className: 'c4__sc c4__sc--r' }, '🔴 0');
    this.scoreY = h('span', { className: 'c4__sc c4__sc--y' }, '0 🟡');
    this.turnEl = h('span', { className: 'c4__turn' }, '…');
    const head = h('div', { className: 'c4__head' }, [
      h('div', { className: 'c4__score' }, [this.scoreR, h('span', { style: 'opacity:.4' }, '—'), this.scoreY]),
      h('span', { className: 'c4__grow' }),
      this.turnEl,
    ]);

    this.arrowsEl = h('div', { className: 'c4-arrows' });
    this.boardEl = h('div', { className: 'c4-board' });
    this.bannerEl = h('div', {});
    this.stage = h('div', { className: 'c4__stage' }, [this.arrowsEl, this.boardEl, this.bannerEl]);
    this.overlayEl = h('div', {});

    this.arrowBtns = [];
    for (let c = 0; c < COLS; c += 1) {
      const btn = h('button', {
        className: 'c4-arrow', 'aria-label': `Colonne ${c + 1}`, onClick: () => this.requestMove(c),
      }, '⬇️');
      this.arrowBtns.push(btn);
      this.arrowsEl.append(btn);
    }
    this.cellEls = [];
    for (let r = 0; r < ROWS; r += 1) {
      const row = [];
      for (let c = 0; c < COLS; c += 1) {
        const cell = h('div', { className: 'c4-cell' });
        row.push(cell);
        this.boardEl.append(cell);
      }
      this.cellEls.push(row);
    }

    const main = h('div', { className: 'c4__main' }, [head, this.stage, this.overlayEl]);

    this.chatLog = h('div', { className: 'c4-chat__log' });
    this.chatInput = h('input', {
      placeholder: 'Message…', maxlength: '240',
      onKeydown: (e) => { if (e.key === 'Enter') this.sendChat(); },
    });
    const side = h('div', { className: 'c4__side' }, [
      h('div', { className: 'c4-chat__head' }, '💬 Chat'),
      this.chatLog,
      h('div', { className: 'c4-chat__form' }, [
        this.chatInput,
        h('button', { onClick: () => this.sendChat() }, 'Envoyer'),
      ]),
    ]);

    this.root.append(main, side);
  }

  /* ---------- rendu ---------- */

  render() {
    const s = this.state;
    if (!s) return;

    this.scoreR.textContent = `🔴 ${s.scores[RED]}`;
    this.scoreY.textContent = `${s.scores[YELLOW]} 🟡`;

    // Grille + jetons (animation de chute uniquement sur le dernier jeton posé).
    const winKeys = new Set(s.winLine.map(([r, c]) => `${r},${c}`));
    const dropKey = s.lastDrop ? `${s.gameNo}:${s.lastDrop.row},${s.lastDrop.col}` : null;
    const isNewDrop = dropKey && dropKey !== this.renderedDrop;

    for (let r = 0; r < ROWS; r += 1) {
      for (let c = 0; c < COLS; c += 1) {
        const cell = this.cellEls[r][c];
        const v = s.board[r][c];
        const win = winKeys.has(`${r},${c}`);
        cell.classList.toggle('c4-cell--win', win);
        const existing = cell.firstChild;
        if (v === EMPTY) { if (existing) cell.replaceChildren(); continue; }

        const cls = `c4-tok c4-tok--${v === RED ? 'r' : 'y'}${win ? ' c4-tok--win' : ''}`;
        const fresh = isNewDrop && s.lastDrop.row === r && s.lastDrop.col === c;
        if (!existing) {
          const tok = h('div', { className: `${cls}${fresh ? ' c4-tok--drop' : ''}` });
          if (fresh) {
            // Distance de chute proportionnelle à la hauteur traversée (gravité).
            const cellH = cell.getBoundingClientRect().height || 56;
            tok.style.setProperty('--c4-fall', `-${(r + 1.6) * (cellH + 6)}px`);
          }
          cell.append(tok);
        } else if (existing.className !== cls) {
          existing.className = cls;   // ex. : passage en surbrillance dorée
        }
      }
    }
    if (isNewDrop) this.renderedDrop = dropKey;

    // Flèches : actives seulement pour le joueur dont c'est le tour, colonne non pleine.
    const myTurn = s.phase === 'playing' && s.turn === this.mySeat && !this.peerLost;
    for (let c = 0; c < COLS; c += 1) {
      const full = s.board[0][c] !== EMPTY;
      const btn = this.arrowBtns[c];
      btn.disabled = !myTurn || full;
      btn.classList.toggle('c4--r', myTurn && this.mySeat === RED);
      btn.classList.toggle('c4--y', myTurn && this.mySeat === YELLOW);
    }

    // Indicateur de tour.
    if (s.phase === 'playing') {
      this.turnEl.textContent = myTurn
        ? '🎯 À vous de jouer'
        : `⏳ Tour de ${this.pseudoOfSeat(s.turn)}`;
      this.turnEl.classList.toggle('c4--me', myTurn);
    } else {
      this.turnEl.textContent = `Manche ${s.gameNo}`;
      this.turnEl.classList.remove('c4--me');
    }

    this.renderBanner(s);
    this.renderOverlay();
  }

  renderBanner(s) {
    if (s.phase === 'playing') { this.bannerEl.replaceChildren(); return; }

    let cls = 'c4-banner';
    let title = '';
    let sub = '';
    if (s.phase === 'draw') {
      cls += ' c4-banner--draw';
      title = 'DRAW!';
      sub = 'Grille pleine — 1 point pour chacun.';
    } else {
      const iWon = s.winner === this.mySeat;
      cls += iWon ? ' c4-banner--win' : ' c4-banner--lose';
      title = iWon ? 'VICTORY! 🎉' : 'DEFEAT... 😢';
      sub = s.phase === 'forfeit'
        ? (iWon ? 'Victoire par forfait (adversaire déconnecté).' : 'Défaite par forfait (déconnexion).')
        : `${this.pseudoOfSeat(s.winner)} aligne 4 jetons.`;
    }

    const actions = h('div', { className: 'c4-row' });
    if (this.isHost) {
      actions.append(
        h('button', { className: 'c4-btn', onClick: () => this.rematch() }, '🔄 Play Again'),
        h('button', { className: 'c4-btn c4-btn--ghost', onClick: () => this.quit() }, 'Retour au salon'),
      );
    } else {
      actions.append(h('span', { style: 'font-size:13px;opacity:.6' }, 'En attente du Host…'));
    }

    this.bannerEl.replaceChildren(h('div', { className: cls }, [
      h('h3', {}, title),
      h('p', {}, sub),
      actions,
    ]));
  }

  renderOverlay() {
    const s = this.state;
    const show = this.peerLost && s && s.phase === 'playing';
    if (!show) { this.overlayEl.replaceChildren(); return; }
    const left = Math.max(0, Math.ceil((FORFEIT_MS - (Date.now() - this.lastSeen)) / 1000));
    if (this.overlayEl.firstChild) {
      const cnt = this.overlayEl.querySelector('.c4-count');
      if (cnt) { cnt.textContent = `${left} s`; return; }
    }
    this.overlayEl.replaceChildren(h('div', { className: 'c4-overlay' }, [
      h('div', { className: 'c4-spin' }),
      h('h3', {}, 'Waiting for opponent to reconnect…'),
      h('p', { style: 'margin:0;font-size:13px;opacity:.7' }, [
        'Victoire par forfait dans ',
        h('span', { className: 'c4-count' }, `${left} s`),
      ]),
    ]));
  }

  renderChat() {
    const atBottom = this.chatLog.scrollHeight - this.chatLog.scrollTop - this.chatLog.clientHeight < 40;
    this.chatLog.replaceChildren(...this.chat.map((m) => {
      if (m.sys) return h('div', { className: 'c4-msg c4-msg--sys' }, m.text);
      const cls = `c4-msg c4-msg--${m.seat === RED ? 'r' : 'y'}`;
      return h('div', { className: cls }, [h('b', {}, `${m.pseudo} `), h('span', {}, m.text)]);
    }));
    if (atBottom) this.chatLog.scrollTop = this.chatLog.scrollHeight;
  }
}

/* ====================================================================== */
/* Contrat de module Arcade                                               */
/* ====================================================================== */

let instance = null;

export default {
  async mount(container, context) {
    instance = new Connect4UI(container, context);
    instance.mount();
  },
  async unmount() {
    if (instance) instance.unmount();
    instance = null;
  },
};
