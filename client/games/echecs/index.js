/**
 * Échecs — module Arcade. Suit le même contrat que les autres jeux :
 *   export default { async mount(container, context) {}, unmount() {} }
 * context: { roomId, roomName, hostId, players, me, socket, sendMessage, onMessage, onEnd }
 *
 * Architecture :
 *  - 1 joueur dans le salon  -> modes solo, 100% locaux (IA ou "canapé" à deux sur le même écran).
 *  - 2 joueurs dans le salon -> partie en ligne, Host autoritaire (même schéma que le Tarot) :
 *      le Host fait tourner le ChessEngine canonique et diffuse l'état (FEN + horloges) ;
 *      l'invité envoie des tentatives de coup ciblées vers le Host, qui valide et rediffuse.
 *  - L'IA tourne dans un Web Worker (ai-worker.js) pour ne jamais bloquer l'interface ;
 *    repli automatique en calcul local si les Web Workers modules ne sont pas disponibles.
 */
import { ChessEngine, squareName, fileOf, rankOf, sq, PIECE_VALUES } from './engine.js';
import { DIFFICULTIES } from './ai.js';
import { BOARD_THEMES, BOARD_THEME_ORDER, PIECE_SKINS, PIECE_SKIN_ORDER, PIECE_SKIN_DEFS } from './themes.js';
import { PIECE_PATHS, PIECE_LABELS } from './pieces.js';
import { toPGN, fromPGN } from './pgn.js';
import { SoundKit } from './sound.js';

/* -------- petite fabrique DOM locale (module autonome, sans import du cœur) -------- */
function h(tag, props = {}, children = []) {
  const node = document.createElement(tag);
  Object.entries(props).forEach(([k, v]) => {
    if (v === undefined || v === null || v === false) return;
    if (k === 'className') node.className = v;
    else if (k === 'style') node.style.cssText = v;
    else if (k.startsWith('on')) node.addEventListener(k.slice(2).toLowerCase(), v);
    else node.setAttribute(k, v === true ? '' : v);
  });
  (Array.isArray(children) ? children : [children]).forEach((c) => {
    if (c === null || c === undefined || c === false) return;
    node.append(typeof c === 'string' || typeof c === 'number' ? document.createTextNode(String(c)) : c);
  });
  return node;
}
function svgEl(tag, attrs = {}) {
  const node = document.createElementNS('http://www.w3.org/2000/svg', tag);
  Object.entries(attrs).forEach(([k, v]) => { if (v !== undefined && v !== null) node.setAttribute(k, v); });
  return node;
}
function fmtClock(ms) {
  if (ms === Infinity) return '∞';
  const clamped = Math.max(0, Math.ceil(ms / 1000));
  const m = Math.floor(clamped / 60);
  const s = clamped % 60;
  if (m >= 60) return `${Math.floor(m / 60)}:${String(m % 60).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  if (clamped < 20) return `${m}:${String(s).padStart(2, '0')}.${Math.floor((ms % 1000) / 100)}`;
  return `${m}:${String(s).padStart(2, '0')}`;
}
function fmtChatTime(ts) { return new Date(ts).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }); }
function safeAlert(msg) { if (typeof alert === 'function') alert(msg); else console.warn(msg); }

const TIME_PRESETS = [
  { key: '1', label: '1 min', baseMs: 60_000, incMs: 0 },
  { key: '3', label: '3 min', baseMs: 3 * 60_000, incMs: 0 },
  { key: '3+2', label: '3 min +2', baseMs: 3 * 60_000, incMs: 2000 },
  { key: '5', label: '5 min', baseMs: 5 * 60_000, incMs: 0 },
  { key: '10', label: '10 min', baseMs: 10 * 60_000, incMs: 0 },
  { key: '15+10', label: '15 min +10', baseMs: 15 * 60_000, incMs: 10_000 },
  { key: '30', label: '30 min', baseMs: 30 * 60_000, incMs: 0 },
  { key: '60', label: '60 min', baseMs: 60 * 60_000, incMs: 0 },
  { key: 'illimite', label: 'Illimité', baseMs: Infinity, incMs: 0 },
];

const PROMO_ORDER = ['Q', 'R', 'B', 'N'];

/* ============================================================================================ */

class ChessUI {
  constructor(container, context) {
    this.container = container;
    this.ctx = context;
    this.isHost = context.me.id === context.hostId;
    this.online = context.players.length >= 2;
    this.opponent = this.online ? context.players.find((p) => p.id !== context.me.id) : null;

    this.engine = null;
    this.myColor = 'w';
    this.mode = null; // 'ia' | 'local' | 'ligne'
    this.settings = {
      board: 'bois', skin: 'classique', soundPack: 'classique', soundOn: true, volume: 0.5,
      showLegalMoves: true, showCoords: true, autoFlip: true, aiLevel: 'moyen',
    };
    this.timeControl = TIME_PRESETS[3]; // 5 min par défaut
    this.pieceInstances = new Map(); // id -> { id, type, color, square|null }
    this.capturedByWhite = []; // pièces noires capturées par les blancs (ordre chronologique)
    this.capturedByBlack = [];
    this.selected = null;
    this.legalFromSelected = [];
    this.viewFullmoveIndex = null; // !== null => on regarde un coup passé (mode analyse)
    this.sound = new SoundKit();
    this.clockState = { whiteMs: Infinity, blackMs: Infinity, turn: 'w', turnStartedAt: Date.now(), running: false };
    this.drawOfferFrom = null;
    this.gameOverInfo = null;
    this.aiWorker = null;
    this.aiThinking = false;
    this.boardOrientation = 'w';
    this.unsubscribe = null;
    this._clockTimer = null;
  }

  /* ============================== MONTAGE / CONTRAT DU MODULE ============================== */

  mount() {
    this.styleEl = h('style', {}, CSS);
    this.root = h('div', { className: 'chess' });
    this.container.append(this.styleEl, this.root);

    if (this.online) {
      this.unsubscribe = this.ctx.onMessage(({ from, data }) => this._onNetworkMessage(from, data));
      if (this.isHost) this._renderSetupScreen();
      else this._renderWaitingScreen();
    } else {
      this._renderSetupScreen();
    }
  }

  unmount() {
    this.unsubscribe?.();
    clearInterval(this._clockTimer);
    this.aiWorker?.terminate();
    this.styleEl?.remove();
    this.root?.remove();
  }

  /* ============================== ÉCRAN DE CONFIGURATION ============================== */

  _renderSetupScreen() {
    const soloModes = !this.online;
    let mode = soloModes ? 'ia' : 'ligne';
    let aiLevel = this.settings.aiLevel;
    let timeKey = this.timeControl.key;
    let colorChoice = 'blanc';

    const rebuild = () => {
      panel.replaceChildren(
        h('h2', { className: 'chess__setup-title' }, '♟️ Nouvelle partie d\'échecs'),
        soloModes ? h('div', { className: 'chess__setup-row' }, [
          h('label', {}, 'Mode'),
          h('div', { className: 'chess__seg' }, [
            segBtn('ia', 'Contre l\'IA', mode, (v) => { mode = v; rebuild(); }),
            segBtn('local', 'Deux joueurs (même écran)', mode, (v) => { mode = v; rebuild(); }),
          ]),
        ]) : h('p', { className: 'chess__setup-hint' }, `Partie en ligne contre ${this.opponent?.pseudo ?? 'ton adversaire'}.`),
        mode === 'ia' ? h('div', { className: 'chess__setup-row' }, [
          h('label', {}, 'Niveau de l\'IA'),
          h('div', { className: 'chess__seg' }, Object.values(DIFFICULTIES).map((d) => segBtn(d.key, d.label, aiLevel, (v) => { aiLevel = v; rebuild(); }))),
        ]) : null,
        (mode === 'ia' && soloModes) ? h('div', { className: 'chess__setup-row' }, [
          h('label', {}, 'Tu joues'),
          h('div', { className: 'chess__seg' }, [
            segBtn('blanc', '⚪ Blancs', colorChoice, (v) => { colorChoice = v; rebuild(); }),
            segBtn('noir', '⚫ Noirs', colorChoice, (v) => { colorChoice = v; rebuild(); }),
            segBtn('hasard', '🎲 Au hasard', colorChoice, (v) => { colorChoice = v; rebuild(); }),
          ]),
        ]) : null,
        h('div', { className: 'chess__setup-row' }, [
          h('label', {}, 'Cadence'),
          h('div', { className: 'chess__seg chess__seg--wrap' }, TIME_PRESETS.map((p) => segBtn(p.key, p.label, timeKey, (v) => { timeKey = v; rebuild(); }))),
        ]),
        h('div', { className: 'chess__setup-row' }, [
          h('label', {}, 'Apparence'),
          this._quickAppearancePicker(() => rebuild()),
        ]),
        h('button', {
          className: 'btn btn--primary chess__setup-start',
          onClick: () => {
            this.mode = mode;
            this.settings.aiLevel = aiLevel;
            this.timeControl = TIME_PRESETS.find((p) => p.key === timeKey) ?? TIME_PRESETS[3];
            let white;
            if (!soloModes) white = this.ctx.me.id; // l'hôte choisit une couleur par défaut ; l'invité verra l'état diffusé
            else if (mode === 'local') white = 'local-blanc';
            else white = colorChoice === 'noir' ? 'ia' : colorChoice === 'hasard' ? (Math.random() < 0.5 ? this.ctx.me.id : 'ia') : this.ctx.me.id;
            if (this.online) this.ctx.sendMessage({ t: 'setup', whiteId: white, timeKey: this.timeControl.key, board: this.settings.board }, this.opponent.id);
            this._startGame({ mode, white });
          },
        }, '▶️ Commencer'),
      );
    };

    function segBtn(value, label, current, onPick) {
      return h('button', {
        type: 'button', className: `chess__segbtn${value === current ? ' chess__segbtn--active' : ''}`, onClick: () => onPick(value),
      }, label);
    }

    const panel = h('div', { className: 'chess__setup' });
    this.root.replaceChildren(h('div', { className: 'chess__setup-wrap' }, panel));
    rebuild();
  }

  _renderWaitingScreen() {
    this.root.replaceChildren(h('div', { className: 'chess__setup-wrap' }, h('div', { className: 'chess__setup' }, [
      h('h2', { className: 'chess__setup-title' }, '♟️ Échecs'),
      h('p', { className: 'chess__setup-hint' }, `En attente que ${this.ctx.players.find((p) => p.id === this.ctx.hostId)?.pseudo ?? 'l\'hôte'} configure la partie…`),
      h('div', { className: 'chess__spinner' }),
    ])));
  }

  _quickAppearancePicker(onChange) {
    const wrap = h('div', { className: 'chess__appearance-quick' });
    const boardSelect = h('select', { className: 'chess__select', onChange: (e) => { this.settings.board = e.target.value; onChange(); } },
      BOARD_THEME_ORDER.map((k) => h('option', { value: k, selected: k === this.settings.board ? '' : undefined }, BOARD_THEMES[k].label)));
    const skinSelect = h('select', { className: 'chess__select', onChange: (e) => { this.settings.skin = e.target.value; onChange(); } },
      PIECE_SKIN_ORDER.map((k) => h('option', { value: k, selected: k === this.settings.skin ? '' : undefined }, PIECE_SKINS[k].label)));
    wrap.append(boardSelect, skinSelect);
    return wrap;
  }

  /* ============================== DÉMARRAGE DE PARTIE ============================== */

  _startGame({ mode, white }) {
    this.engine = new ChessEngine();
    this._initPieceInstances();
    this.capturedByWhite = [];
    this.capturedByBlack = [];
    this.selected = null;
    this.viewFullmoveIndex = null;
    this.gameOverInfo = null;
    this.drawOfferFrom = null;

    if (this.online) {
      this.mode = 'ligne';
      this.whiteId = white; // id du joueur qui a les blancs
      this.myColor = this.ctx.me.id === white ? 'w' : 'b';
    } else if (mode === 'local') {
      this.mode = 'local';
      this.whiteAssignment = 'local-blanc';
      this.myColor = 'w';
    } else {
      this.mode = 'ia';
      this.aiColor = white === 'ia' ? 'w' : (white === this.ctx.me.id ? 'b' : (Math.random() < 0.5 ? 'w' : 'b'));
      this.myColor = this.aiColor === 'w' ? 'b' : 'w';
      this._ensureAiWorker();
    }

    this.boardOrientation = this.settings.autoFlip ? this.myColor : 'w';
    this.clockState = {
      whiteMs: this.timeControl.baseMs, blackMs: this.timeControl.baseMs,
      turn: 'w', turnStartedAt: Date.now(), running: this.timeControl.baseMs !== Infinity,
    };
    this._startClockTimer();

    this._renderShell();
    this._syncBoard({ animate: false });
    this._pushHistoryUI();
    this._updateClocksUI();
    this._maybeTriggerAiMove();

    if (this.online && this.isHost) this._broadcastState();
  }

  _initPieceInstances() {
    this.pieceInstances.clear();
    for (let i = 0; i < 64; i++) {
      const p = this.engine.board[i];
      if (!p) continue;
      const id = `${p}@${squareName(i)}`;
      this.pieceInstances.set(id, { id, type: p[1], color: p[0], square: i, captured: false });
    }
  }

  _ensureAiWorker() {
    if (this.aiWorker) return;
    try {
      const url = new URL('./ai-worker.js', import.meta.url);
      this.aiWorker = new Worker(url, { type: 'module' });
      this.aiWorker.onmessage = (e) => this._onAiMove(e.data);
      this.aiWorker.onerror = () => { this.aiWorker = null; this._aiFallbackActive = true; };
    } catch {
      this.aiWorker = null;
      this._aiFallbackActive = true;
    }
  }

  /* ============================== RÉSEAU (partie en ligne, hôte autoritaire) ============================== */

  _onNetworkMessage(from, data) {
    if (!data) return;
    if (data.t === 'chat') { this._receiveChat(from, data); return; }
    if (this.isHost) {
      if (data.t === 'move-attempt') this._hostHandleMoveAttempt(from, data);
      else if (data.t === 'resign') this._hostHandleResign(from);
      else if (data.t === 'draw-offer') this._hostHandleDrawOffer(from);
      else if (data.t === 'draw-accept') this._hostHandleDrawAccept(from);
      else if (data.t === 'rematch-request') this._hostHandleRematch(from);
      return;
    }
    if (from !== this.ctx.hostId) return;
    if (data.t === 'state') this._applyRemoteState(data);
    else if (data.t === 'setup') this._applyRemoteSetup(data);
    else if (data.t === 'game-over') this._applyGameOver(data.info, { fromNetwork: true });
    else if (data.t === 'draw-offer') { this.drawOfferFrom = 'opponent'; this._pushControlsUI(); }
    else if (data.t === 'draw-decline') { this.drawOfferFrom = null; this._pushControlsUI(); this._setStatusFlash('L\'adversaire a décliné la nulle.'); }
  }

  _broadcastState(extra = {}) {
    if (!this.online || !this.isHost) return;
    this.ctx.sendMessage({
      t: 'state', fen: this.engine.toFEN(), whiteId: this.whiteId,
      clock: this.clockState, moveHistory: this.engine.moveHistory,
      lastMove: this.engine.moveHistory.at(-1) ?? null, ...extra,
    }, this.opponent.id);
  }

  _applyRemoteSetup(data) {
    this.timeControl = TIME_PRESETS.find((p) => p.key === data.timeKey) ?? TIME_PRESETS[3];
    this.settings.board = data.board ?? this.settings.board;
    this._startGame({ mode: 'ligne', white: data.whiteId });
  }

  _applyRemoteState(data) {
    if (!this.engine) {
      // Filet de sécurité : l'état est arrivé avant (ou sans) message "setup" explicite — on s'auto-initialise.
      this.timeControl = this.timeControl ?? TIME_PRESETS[3];
      this._startGame({ mode: 'ligne', white: data.whiteId });
    }
    this.whiteId = data.whiteId;
    this.myColor = this.ctx.me.id === this.whiteId ? 'w' : 'b';
    const prevFen = this.engine.toFEN();
    if (data.fen !== prevFen) {
      this.engine.setFEN(data.fen);
      this._reconcilePieceInstancesFromMove(data.lastMove);
    }
    this.engine.moveHistory = data.moveHistory ?? this.engine.moveHistory;
    this.clockState = data.clock;
    this._syncBoard({ animate: true });
    this._pushHistoryUI();
    this._pushCapturedUI();
    this._updateClocksUI();
    this._pushControlsUI();
  }

  _hostHandleMoveAttempt(from, data) {
    if (this.gameOverInfo) return;
    const mover = this.ctx.me.id === this.whiteId ? 'w' : 'b';
    const attemptColor = from === this.whiteId ? 'w' : 'b';
    if (attemptColor !== this.engine.turn) { this.ctx.sendMessage({ t: 'error', message: 'Ce n\'est pas ton tour.' }, from); return; }
    this._applyMoveLocal({ from: data.from, to: data.to, promotion: data.promotion }, { by: attemptColor });
  }

  _hostHandleResign(from) {
    const color = from === this.whiteId ? 'w' : 'b';
    this._finishGame({ result: color === 'w' ? 'b' : 'w', reason: 'abandon' });
  }

  _hostHandleDrawOffer(from) {
    this.drawOfferFrom = 'opponent';
    this._pushControlsUI();
  }

  _hostHandleDrawAccept() {
    this._finishGame({ result: 'nulle', reason: 'accord-mutuel' });
  }

  _hostHandleRematch(from) {
    this._startGame({ mode: 'ligne', white: this.whiteId === this.ctx.me.id ? this.opponent.id : this.ctx.me.id });
    this.ctx.sendMessage({ t: 'setup', whiteId: this.whiteId, timeKey: this.timeControl.key, board: this.settings.board }, this.opponent.id);
  }

  /* ============================== CHAT (identique en principe au chat du Tarot) ============================== */

  ensureChatPanel() {
    if (this.chatPanel) return this.chatPanel;
    this.chatEmptyEl = h('div', { className: 'chess__chat-empty' }, 'Aucun message pour l\'instant.');
    this.chatMessagesEl = h('div', { className: 'chess__chat-messages', tabindex: '0', 'aria-label': 'Messages de la partie' }, [this.chatEmptyEl]);
    this.chatInput = h('input', { type: 'text', placeholder: 'Écrire un message…', maxlength: '300', 'aria-label': 'Votre message' });
    const form = h('form', { className: 'chess__chat-form' }, [
      this.chatInput,
      h('button', { className: 'btn btn--primary btn--small', type: 'submit' }, 'Envoyer'),
    ]);
    form.addEventListener('submit', (e) => { e.preventDefault(); this._sendChat(); });
    this.chatPanel = h('div', { className: 'chess__panel chess__chat' }, [h('strong', {}, '💬 Chat'), this.chatMessagesEl, form]);
    return this.chatPanel;
  }

  _sendChat() {
    const text = this.chatInput.value.trim();
    if (!text) return;
    this._appendChatMessage({ pseudo: this.ctx.me.pseudo, avatar: this.ctx.me.avatar, color: this.ctx.me.color, at: Date.now(), text });
    if (this.online) this.ctx.sendMessage({ t: 'chat', text }, null);
    this.chatInput.value = '';
    this.chatInput.focus();
  }

  _receiveChat(from, data) {
    const text = String(data?.text ?? '').slice(0, 500).trim();
    if (!text) return;
    const player = this.ctx.players.find((p) => p.id === from);
    this._appendChatMessage({ pseudo: player?.pseudo ?? '?', avatar: player?.avatar ?? '❔', color: player?.color, at: Date.now(), text });
    this.sound.chatMessage();
  }

  _appendChatMessage(message) {
    this.ensureChatPanel();
    if (this.chatEmptyEl) { this.chatEmptyEl.remove(); this.chatEmptyEl = null; }
    const list = this.chatMessagesEl;
    const nearBottom = list.scrollHeight - list.scrollTop - list.clientHeight < 60;
    list.append(h('div', { className: 'chess__chat-msg' }, [
      h('span', { className: 'chess__chat-msg__avatar', 'aria-hidden': 'true' }, message.avatar ?? '♟️'),
      h('div', {}, [
        h('div', { className: 'chess__chat-msg__head' }, [
          h('span', { className: 'chess__chat-msg__pseudo', style: message.color ? `color:${message.color};` : '' }, message.pseudo),
          h('span', { className: 'chess__chat-msg__time' }, fmtChatTime(message.at)),
        ]),
        h('p', { className: 'chess__chat-msg__text' }, message.text),
      ]),
    ]));
    if (nearBottom) list.scrollTop = list.scrollHeight;
  }

  /* ============================== STRUCTURE GÉNÉRALE DE L'ÉCRAN DE JEU ============================== */

  _renderShell() {
    this.boardWrapEl = h('div', { className: 'chess__board-wrap' });
    this.squaresLayerEl = h('div', { className: 'chess__squares' });
    this.piecesLayerEl = h('div', { className: 'chess__pieces' });
    this.coordsFilesEl = h('div', { className: 'chess__coords chess__coords--files' });
    this.coordsRanksEl = h('div', { className: 'chess__coords chess__coords--ranks' });
    this.boardWrapEl.append(this.squaresLayerEl, this.piecesLayerEl, this.coordsFilesEl, this.coordsRanksEl);
    this.pieceEls = new Map();
    this._buildSquares();

    this.myClockEl = this._buildClockEl();
    this.oppClockEl = this._buildClockEl();
    this.myCapturedEl = h('div', { className: 'chess__captured-row' });
    this.oppCapturedEl = h('div', { className: 'chess__captured-row' });
    this.myLabelEl = h('div', { className: 'chess__player-label' });
    this.oppLabelEl = h('div', { className: 'chess__player-label' });
    this.historyListEl = h('div', { className: 'chess__history-list', tabindex: '0', 'aria-label': 'Historique des coups' });
    this.statusEl = h('div', { className: 'chess__status' });
    this.controlsEl = h('div', { className: 'chess__controls' });
    this.settingsPanelEl = this._buildSettingsPanel();

    const oppSide = h('div', { className: 'chess__side chess__side--opponent' }, [this.oppLabelEl, this.oppClockEl, this.oppCapturedEl]);
    const meSide = h('div', { className: 'chess__side chess__side--me' }, [this.myLabelEl, this.myClockEl, this.myCapturedEl]);
    const center = h('div', { className: 'chess__center' }, [oppSide, this.boardWrapEl, meSide, this.statusEl]);
    const rightPanels = h('div', { className: 'chess__right' }, [
      h('div', { className: 'chess__panel' }, [
        h('div', { className: 'chess__history-head' }, [
          h('strong', {}, 'Historique'),
          h('div', { className: 'chess__history-actions' }, [
            h('button', { className: 'btn btn--ghost btn--small', type: 'button', title: 'Exporter en PGN', onClick: () => this._exportPGN() }, '⬇️ PGN'),
            h('button', { className: 'btn btn--ghost btn--small', type: 'button', title: 'Exporter en FEN', onClick: () => this._exportFEN() }, '⬇️ FEN'),
          ]),
        ]),
        this.historyListEl,
      ]),
      this.ensureChatPanel(),
      this.settingsPanelEl,
    ]);

    this.root.replaceChildren(h('div', { className: 'chess__layout' }, [center, rightPanels]), this.controlsEl);
    if (!this.settings.showCoords) this.boardWrapEl.classList.add('chess__board-wrap--nocoords');
    this._pushControlsUI();
  }

  _buildClockEl() {
    return h('div', { className: 'chess__clock' }, h('span', { className: 'chess__clock-time' }, '—'));
  }

  /* ============================== PLATEAU : CASES, ORIENTATION, PIÈCES ============================== */

  _buildSquares() {
    this.squareEls = new Map();
    this.squaresLayerEl.replaceChildren();
    for (let index = 0; index < 64; index++) {
      const isLight = (fileOf(index) + rankOf(index)) % 2 === 1;
      const el = h('button', {
        type: 'button', className: `chess__square ${isLight ? 'chess__square--light' : 'chess__square--dark'}`,
        'data-square': index, 'aria-label': squareName(index), onClick: () => this._onSquareClick(index),
      });
      this.squareEls.set(index, el);
      this.squaresLayerEl.append(el);
    }
    this._layoutSquares();
  }

  _visualPos(index) {
    const file = fileOf(index); const rank = rankOf(index);
    const col = this.boardOrientation === 'w' ? file : 7 - file;
    const row = this.boardOrientation === 'w' ? 7 - rank : rank;
    return { col, row };
  }

  _layoutSquares() {
    for (const [index, el] of this.squareEls) {
      const { col, row } = this._visualPos(index);
      el.style.gridColumn = String(col + 1);
      el.style.gridRow = String(row + 1);
    }
    this._layoutCoords();
  }

  _layoutCoords() {
    const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
    const filesOrdered = this.boardOrientation === 'w' ? files : [...files].reverse();
    this.coordsFilesEl.replaceChildren(...filesOrdered.map((f) => h('span', {}, f)));
    const ranks = ['1', '2', '3', '4', '5', '6', '7', '8'];
    const ranksOrdered = this.boardOrientation === 'w' ? [...ranks].reverse() : ranks;
    this.coordsRanksEl.replaceChildren(...ranksOrdered.map((r) => h('span', {}, r)));
  }

  _applyBoardTheme() {
    const theme = BOARD_THEMES[this.settings.board] ?? BOARD_THEMES.bois;
    this.boardWrapEl.style.setProperty('--chess-light', theme.light);
    this.boardWrapEl.style.setProperty('--chess-dark', theme.dark);
    this.boardWrapEl.style.setProperty('--chess-border', theme.border);
    this.boardWrapEl.style.setProperty('--chess-coord', theme.coord);
  }

  _buildPieceEl(inst) {
    const skin = PIECE_SKINS[this.settings.skin] ?? PIECE_SKINS.classique;
    const treat = inst.color === 'w' ? skin.white : skin.black;
    const svg = svgEl('svg', { viewBox: '0 0 100 100', class: 'chess__piece-svg' });
    const defs = svgEl('defs', {}); defs.innerHTML = PIECE_SKIN_DEFS;
    const g = svgEl('g', { fill: treat.fill, stroke: treat.stroke, 'stroke-width': treat.strokeWidth ?? 2.4, 'stroke-linejoin': 'round' });
    g.innerHTML = PIECE_PATHS[inst.type];
    svg.append(defs, g);
    return h('div', { className: 'chess__piece', 'data-piece-id': inst.id ?? '', 'aria-hidden': 'true' }, svg);
  }

  _applyPieceSkin() {
    const skin = PIECE_SKINS[this.settings.skin] ?? PIECE_SKINS.classique;
    for (const inst of this.pieceInstances.values()) {
      const el = this.pieceEls.get(inst.id);
      if (!el) continue;
      const treat = inst.color === 'w' ? skin.white : skin.black;
      const g = el.querySelector('g');
      if (g) { g.setAttribute('fill', treat.fill); g.setAttribute('stroke', treat.stroke); g.setAttribute('stroke-width', treat.strokeWidth ?? 2.4); }
    }
  }

  _layoutPieces(animate) {
    const seen = new Set();
    for (const inst of this.pieceInstances.values()) {
      if (inst.captured || inst.square === null) { this.pieceEls.get(inst.id)?.remove(); this.pieceEls.delete(inst.id); continue; }
      seen.add(inst.id);
      let el = this.pieceEls.get(inst.id);
      if (!el) {
        el = this._buildPieceEl(inst);
        this.pieceEls.set(inst.id, el);
        if (!animate) el.classList.add('chess__piece--noanim');
        this.piecesLayerEl.append(el);
      } else {
        this._applyOnePieceSkinIfNeeded(el, inst);
      }
      const { col, row } = this._visualPos(inst.square);
      el.style.left = `${col * 12.5}%`;
      el.style.top = `${row * 12.5}%`;
      if (!animate) {
        // eslint-disable-next-line no-loop-func
        requestAnimationFrame(() => el.classList.remove('chess__piece--noanim'));
      }
    }
    for (const [id, el] of this.pieceEls) if (!seen.has(id)) { el.remove(); this.pieceEls.delete(id); }
  }

  _applyOnePieceSkinIfNeeded(el, inst) {
    if (el.dataset.type === inst.type) return;
    el.dataset.type = inst.type;
    const g = el.querySelector('g');
    if (g) g.innerHTML = PIECE_PATHS[inst.type];
  }

  _paintHighlights() {
    for (const el of this.squareEls.values()) {
      el.classList.remove('chess__square--selected', 'chess__square--legal', 'chess__square--capture', 'chess__square--last', 'chess__square--check');
      el.querySelector('.chess__dot')?.remove();
    }
    const lastMove = this.engine.moveHistory.at(-1);
    if (lastMove) {
      this.squareEls.get(lastMove.from)?.classList.add('chess__square--last');
      this.squareEls.get(lastMove.to)?.classList.add('chess__square--last');
    }
    if (this.selected !== null) {
      this.squareEls.get(this.selected)?.classList.add('chess__square--selected');
      if (this.settings.showLegalMoves) {
        for (const m of this.legalFromSelected) {
          const el = this.squareEls.get(m.to);
          if (!el) continue;
          if (m.captured) el.classList.add('chess__square--capture');
          else { el.classList.add('chess__square--legal'); el.append(h('span', { className: 'chess__dot', 'aria-hidden': 'true' })); }
        }
      }
    }
    if (!this.engine.status().over && this.engine.inCheck()) {
      const kingSq = this.engine.kingSquare(this.engine.turn);
      this.squareEls.get(kingSq)?.classList.add('chess__square--check');
    }
  }

  _syncBoard({ animate }) {
    this._applyBoardTheme();
    this._layoutSquares();
    this._layoutPieces(animate);
    this._paintHighlights();
  }

  /* ============================== INTERACTION : SÉLECTION ET COUPS ============================== */

  _isMyTurnAndControllable() {
    if (this.mode === 'local') return true;
    if (this.mode === 'ia') return this.engine.turn !== this.aiColor && !this.aiThinking;
    if (this.mode === 'ligne') return this.engine.turn === this.myColor;
    return false;
  }

  _onSquareClick(index) {
    if (this.viewFullmoveIndex !== null || this.gameOverInfo || !this.engine) return;
    if (!this._isMyTurnAndControllable()) return;

    if (this.selected === null) {
      const piece = this.engine.board[index];
      if (!piece || piece[0] !== this.engine.turn) return;
      this.selected = index;
      this.legalFromSelected = this.engine.legalMovesFrom(index);
      this._paintHighlights();
      return;
    }
    if (index === this.selected) { this.selected = null; this.legalFromSelected = []; this._paintHighlights(); return; }

    const target = this.legalFromSelected.find((m) => m.to === index);
    if (!target) {
      const piece = this.engine.board[index];
      if (piece && piece[0] === this.engine.turn) {
        this.selected = index;
        this.legalFromSelected = this.engine.legalMovesFrom(index);
      } else { this.selected = null; this.legalFromSelected = []; }
      this._paintHighlights();
      return;
    }
    const needsPromotion = this.legalFromSelected.some((m) => m.to === index && m.promotion);
    this.selected = null; this.legalFromSelected = [];
    this._paintHighlights();
    if (needsPromotion) this._openPromotionPicker(target.from, target.to);
    else this._commitMove({ from: target.from, to: target.to, promotion: null });
  }

  _openPromotionPicker(from, to) {
    const color = this.engine.turn;
    const skin = PIECE_SKINS[this.settings.skin] ?? PIECE_SKINS.classique;
    const overlay = h('div', { className: 'chess__modal-overlay' });
    const choices = h('div', { className: 'chess__promo-choices' }, PROMO_ORDER.map((type) => {
      const btn = h('button', { type: 'button', className: 'chess__promo-btn', onClick: () => { overlay.remove(); this._commitMove({ from, to, promotion: type }); } });
      const svg = svgEl('svg', { viewBox: '0 0 100 100' });
      const treat = color === 'w' ? skin.white : skin.black;
      const defs = svgEl('defs', {}); defs.innerHTML = PIECE_SKIN_DEFS;
      const g = svgEl('g', { fill: treat.fill, stroke: treat.stroke, 'stroke-width': treat.strokeWidth ?? 2.4 });
      g.innerHTML = PIECE_PATHS[type];
      svg.append(defs, g);
      btn.append(svg, h('span', {}, PIECE_LABELS[type]));
      return btn;
    }));
    overlay.append(h('div', { className: 'chess__modal chess__promo-modal' }, [h('h3', {}, 'Promotion — choisis une pièce'), choices]));
    this.root.append(overlay);
  }

  _commitMove(move) {
    if (this.mode === 'ligne' && !this.isHost) {
      this.ctx.sendMessage({ t: 'move-attempt', from: move.from, to: move.to, promotion: move.promotion }, this.ctx.hostId);
      return;
    }
    this._applyMoveLocal(move);
  }

  _applyMoveLocal(move) {
    const result = this.engine.makeMove(move);
    if (!result.ok) return false;
    this._reconcilePieceInstancesFromMove(result.move);
    this._afterMoveEffects(result);
    if (this.online && this.isHost) this._broadcastState();
    this._maybeTriggerAiMove();
    return true;
  }

  _reconcilePieceInstancesFromMove(move) {
    if (!move) { this._initPieceInstances(); return; }
    const capturedSquare = move.flags?.enPassant ? move.flags.epCaptureSquare : (move.captured ? move.to : null);
    if (capturedSquare !== null && move.captured) {
      const capInst = [...this.pieceInstances.values()].find((p) => p.square === capturedSquare && !p.captured);
      if (capInst) {
        capInst.captured = true; capInst.square = null;
        if (capInst.color === 'w') this.capturedByBlack.push({ type: capInst.type, color: 'w' });
        else this.capturedByWhite.push({ type: capInst.type, color: 'b' });
      }
    }
    const moverInst = [...this.pieceInstances.values()].find((p) => p.square === move.from && !p.captured);
    if (moverInst) {
      moverInst.square = move.to;
      if (move.promotion) moverInst.type = move.promotion;
    }
    if (move.flags?.castle) {
      const rank = rankOf(move.from);
      const rookFrom = move.flags.castle === 'K' ? sq(7, rank) : sq(0, rank);
      const rookTo = move.flags.castle === 'K' ? sq(5, rank) : sq(3, rank);
      const rookInst = [...this.pieceInstances.values()].find((p) => p.square === rookFrom && !p.captured);
      if (rookInst) rookInst.square = rookTo;
    }
  }

  _afterMoveEffects(result) {
    const move = result.move;
    if (move.flags?.castle) this.sound.castle();
    else if (move.promotion) this.sound.promote();
    else if (move.captured) this.sound.capture();
    else this.sound.move();

    this._switchClockTurn();
    this.viewFullmoveIndex = null;
    this._syncBoard({ animate: true });
    this._pushHistoryUI();
    this._pushCapturedUI();
    this._updateClocksUI();

    const status = this.engine.status();
    if (status.over) this._finishGame(status);
    else if (status.inCheck) { this.sound.check(); this._setStatusFlash(`Échec à ${this.engine.turn === 'w' ? 'blancs' : 'noirs'} !`); }
    else this._setStatusFlash('');
  }

  /* ============================== HORLOGE ============================== */

  _startClockTimer() {
    clearInterval(this._clockTimer);
    this._clockTimer = setInterval(() => this._tickClock(), 200);
  }

  _switchClockTurn() {
    const now = Date.now();
    if (this.timeControl.baseMs !== Infinity) {
      const elapsed = now - this.clockState.turnStartedAt;
      const key = this.clockState.turn === 'w' ? 'whiteMs' : 'blackMs';
      this.clockState[key] = Math.max(0, this.clockState[key] - elapsed) + this.timeControl.incMs;
    }
    this.clockState.turn = this.engine.turn;
    this.clockState.turnStartedAt = now;
  }

  _tickClock() {
    if (!this.engine || this.gameOverInfo || this.timeControl.baseMs === Infinity) { this._updateClocksUI(); return; }
    this._updateClocksUI();
    const authoritative = this.mode !== 'ligne' || this.isHost;
    if (!authoritative) return;
    const elapsed = Date.now() - this.clockState.turnStartedAt;
    const key = this.clockState.turn === 'w' ? 'whiteMs' : 'blackMs';
    if (this.clockState[key] - elapsed <= 0) {
      this._finishGame({ over: true, result: this.clockState.turn === 'w' ? 'b' : 'w', reason: 'temps-ecoule' });
    }
  }

  _updateClocksUI() {
    if (!this.engine || !this.myClockEl) return;
    const now = Date.now();
    let whiteMs = this.clockState.whiteMs; let blackMs = this.clockState.blackMs;
    if (this.timeControl.baseMs !== Infinity && !this.gameOverInfo) {
      const elapsed = now - this.clockState.turnStartedAt;
      if (this.clockState.turn === 'w') whiteMs -= elapsed; else blackMs -= elapsed;
    }
    const topColor = this.boardOrientation === 'w' ? 'b' : 'w';
    const bottomColor = this.boardOrientation === 'w' ? 'w' : 'b';
    const msFor = (c) => (c === 'w' ? whiteMs : blackMs);
    this.oppClockEl.querySelector('.chess__clock-time').textContent = fmtClock(msFor(topColor));
    this.myClockEl.querySelector('.chess__clock-time').textContent = fmtClock(msFor(bottomColor));
    this.oppClockEl.classList.toggle('chess__clock--active', !this.gameOverInfo && this.clockState.turn === topColor);
    this.myClockEl.classList.toggle('chess__clock--active', !this.gameOverInfo && this.clockState.turn === bottomColor);
    this.oppClockEl.classList.toggle('chess__clock--low', msFor(topColor) < 20_000 && msFor(topColor) > 0);
    this.myClockEl.classList.toggle('chess__clock--low', msFor(bottomColor) < 20_000 && msFor(bottomColor) > 0);
    this.oppLabelEl.textContent = this._labelFor(topColor);
    this.myLabelEl.textContent = this._labelFor(bottomColor);
  }

  _labelFor(color) {
    if (this.mode === 'ia') return color === this.aiColor ? `🤖 IA (${DIFFICULTIES[this.settings.aiLevel].label})` : `${color === 'w' ? '⚪' : '⚫'} ${this.ctx.me.pseudo}`;
    if (this.mode === 'local') return color === 'w' ? '⚪ Blancs' : '⚫ Noirs';
    const whitePlayer = this.ctx.players.find((p) => p.id === this.whiteId);
    const blackPlayer = this.ctx.players.find((p) => p.id !== this.whiteId);
    return color === 'w' ? `⚪ ${whitePlayer?.pseudo ?? '?'}` : `⚫ ${blackPlayer?.pseudo ?? '?'}`;
  }

  /* ============================== PIÈCES CAPTURÉES ============================== */

  _pushCapturedUI() {
    if (!this.myCapturedEl) return;
    const topColor = this.boardOrientation === 'w' ? 'b' : 'w';
    const bottomColor = this.boardOrientation === 'w' ? 'w' : 'b';
    const listFor = (c) => (c === 'w' ? this.capturedByWhite : this.capturedByBlack);
    const materialFor = (c) => listFor(c).reduce((sum, p) => sum + PIECE_VALUES[p.type], 0) / 100;
    const diffTop = materialFor(topColor) - materialFor(bottomColor);
    const diffBottom = materialFor(bottomColor) - materialFor(topColor);
    this.oppCapturedEl.replaceChildren(
      ...this._capturedIcons(listFor(topColor)),
      diffTop > 0 ? h('span', { className: 'chess__material-diff' }, `+${diffTop}`) : null,
    );
    this.myCapturedEl.replaceChildren(
      ...this._capturedIcons(listFor(bottomColor)),
      diffBottom > 0 ? h('span', { className: 'chess__material-diff' }, `+${diffBottom}`) : null,
    );
  }

  _capturedIcons(list) {
    const skin = PIECE_SKINS[this.settings.skin] ?? PIECE_SKINS.classique;
    return list.map((p) => {
      const svg = svgEl('svg', { viewBox: '0 0 100 100', class: 'chess__captured-icon' });
      const treat = p.color === 'w' ? skin.white : skin.black;
      const g = svgEl('g', { fill: treat.fill, stroke: treat.stroke, 'stroke-width': 3 });
      g.innerHTML = PIECE_PATHS[p.type];
      svg.append(g);
      return svg;
    });
  }

  /* ============================== HISTORIQUE / MODE ANALYSE ============================== */

  _pushHistoryUI() {
    if (!this.historyListEl) return;
    const rows = [];
    const hist = this.engine.moveHistory;
    for (let i = 0; i < hist.length; i += 2) {
      rows.push(h('div', { className: 'chess__history-row' }, [
        h('span', { className: 'chess__history-num' }, `${i / 2 + 1}.`),
        this._historyMoveBtn(hist[i], i),
        hist[i + 1] ? this._historyMoveBtn(hist[i + 1], i + 1) : h('span', {}),
      ]));
    }
    this.historyListEl.replaceChildren(...rows);
    this.historyListEl.scrollTop = this.historyListEl.scrollHeight;
  }

  _historyMoveBtn(entry, index) {
    const isCurrent = this.viewFullmoveIndex === index || (this.viewFullmoveIndex === null && index === this.engine.moveHistory.length - 1);
    return h('button', { type: 'button', className: `chess__history-move${isCurrent ? ' chess__history-move--current' : ''}`, onClick: () => this._viewHistoryIndex(index) }, entry.san);
  }

  _viewHistoryIndex(index) {
    this.viewFullmoveIndex = index === this.engine.moveHistory.length - 1 ? null : index;
    this._renderAnalysisPreview();
  }

  _renderAnalysisPreview() {
    if (this.viewFullmoveIndex === null) {
      this.pieceEls = new Map();
      this.piecesLayerEl.replaceChildren();
      this._syncBoard({ animate: false });
      this._pushHistoryUI();
      this._setAnalysisBanner(false);
      return;
    }
    const preview = new ChessEngine();
    for (let i = 0; i <= this.viewFullmoveIndex; i++) {
      const m = this.engine.moveHistory[i];
      preview.makeMove({ from: m.from, to: m.to, promotion: m.promotion });
    }
    this._applyBoardTheme();
    this._layoutSquares();
    this.piecesLayerEl.replaceChildren();
    for (let i = 0; i < 64; i++) {
      const p = preview.board[i];
      if (!p) continue;
      const el = this._buildPieceEl({ type: p[1], color: p[0] });
      el.classList.add('chess__piece--noanim');
      const { col, row } = this._visualPos(i);
      el.style.left = `${col * 12.5}%`; el.style.top = `${row * 12.5}%`;
      this.piecesLayerEl.append(el);
    }
    this.selected = null; this.legalFromSelected = [];
    for (const sqEl of this.squareEls.values()) sqEl.classList.remove('chess__square--selected', 'chess__square--legal', 'chess__square--capture', 'chess__square--check', 'chess__square--last');
    const last = preview.moveHistory.at(-1);
    if (last) { this.squareEls.get(last.from)?.classList.add('chess__square--last'); this.squareEls.get(last.to)?.classList.add('chess__square--last'); }
    this._pushHistoryUI();
    this._setAnalysisBanner(true);
  }

  _setAnalysisBanner(show) {
    this.boardWrapEl.classList.toggle('chess__board-wrap--analysis', show);
    if (show && !this.analysisBannerEl) {
      this.analysisBannerEl = h('div', { className: 'chess__analysis-banner' }, [
        '🔍 Mode analyse — coup passé',
        h('button', { type: 'button', className: 'btn btn--ghost btn--small', onClick: () => this._viewHistoryIndex(this.engine.moveHistory.length - 1) }, 'Revenir à la position actuelle'),
      ]);
      this.boardWrapEl.append(this.analysisBannerEl);
    } else if (!show && this.analysisBannerEl) {
      this.analysisBannerEl.remove();
      this.analysisBannerEl = null;
    }
  }

  _setStatusFlash(text) { if (this.statusEl) this.statusEl.textContent = text; }

  /* ============================== IA ============================== */

  _maybeTriggerAiMove() {
    if (this.mode !== 'ia' || this.gameOverInfo || !this.engine) return;
    if (this.engine.turn !== this.aiColor) return;
    this.aiThinking = true;
    this._setStatusFlash('🤖 L\'IA réfléchit…');
    const fen = this.engine.toFEN();
    this._aiRequestId = (this._aiRequestId ?? 0) + 1;
    const requestId = this._aiRequestId;
    if (this.aiWorker) {
      this.aiWorker.postMessage({ requestId, fen, difficulty: this.settings.aiLevel });
    } else {
      setTimeout(async () => {
        const { chooseAiMove } = await import('./ai.js');
        const move = chooseAiMove(new ChessEngine(fen), this.settings.aiLevel);
        this._onAiMove({ requestId, move, fen });
      }, 30);
    }
  }

  _onAiMove(data) {
    if (data.requestId !== this._aiRequestId) return; // réponse obsolète, ignorée
    this.aiThinking = false;
    if (!this.engine || data.fen !== this.engine.toFEN() || !data.move) { this._setStatusFlash(''); return; }
    this._applyMoveLocal({ from: data.move.from, to: data.move.to, promotion: data.move.promotion });
  }

  /* ============================== FIN DE PARTIE ============================== */

  _finishGame(info) {
    if (this.gameOverInfo) return;
    this.gameOverInfo = info;
    this.clockState.running = false;
    if (this.online && this.isHost) this.ctx.sendMessage({ t: 'game-over', info }, this.opponent.id);
    this._applyGameOver(info);
  }

  _applyGameOver(info) {
    this.gameOverInfo = info;
    this._syncBoard({ animate: true });
    this._pushControlsUI();
    const iAmWinner = this.mode === 'ligne' ? info.result === this.myColor : this.mode === 'ia' ? (info.result !== this.aiColor && info.result !== 'nulle') : null;
    if (info.result === 'nulle') this.sound.drawTone();
    else if (this.mode === 'local' || iAmWinner) this.sound.winFanfare();
    else this.sound.loseTone();
    this._setStatusFlash(this._gameOverLabel(info));
  }

  _gameOverLabel(info) {
    const REASONS = {
      'echec-et-mat': 'échec et mat', pat: 'pat', 'regle-50-coups': 'règle des 50 coups',
      repetition: 'répétition de position', 'materiel-insuffisant': 'matériel insuffisant',
      abandon: 'abandon', 'accord-mutuel': 'accord mutuel', 'temps-ecoule': 'temps écoulé',
    };
    const reasonTxt = REASONS[info.reason] ?? info.reason;
    if (info.result === 'nulle') return `🤝 Partie nulle (${reasonTxt}).`;
    const winnerLabel = this.mode === 'local' ? (info.result === 'w' ? 'Les blancs' : 'Les noirs')
      : this.mode === 'ia' ? (info.result === this.aiColor ? 'L\'IA' : 'Toi')
        : (info.result === this.myColor ? 'Toi' : (this.opponent?.pseudo ?? 'Ton adversaire'));
    const verb = this.mode === 'local' ? 'gagnent' : 'gagne';
    return `🏆 ${winnerLabel} ${verb} (${reasonTxt}).`;
  }

  /* ============================== CONTRÔLES (abandon, nulle, revanche...) ============================== */

  _pushControlsUI() {
    if (!this.controlsEl) return;
    const buttons = [];
    if (!this.gameOverInfo) {
      buttons.push(h('button', { className: 'btn btn--ghost', type: 'button', onClick: () => this._confirmResign() }, '🏳️ Abandonner'));
      if (this.mode !== 'ia') {
        if (this.drawOfferFrom === 'opponent') {
          buttons.push(h('button', { className: 'btn btn--primary', type: 'button', onClick: () => this._acceptDraw() }, '🤝 Accepter la nulle'));
          buttons.push(h('button', { className: 'btn btn--ghost', type: 'button', onClick: () => this._declineDraw() }, 'Refuser'));
        } else if (this.drawOfferFrom !== 'me') {
          buttons.push(h('button', { className: 'btn btn--ghost', type: 'button', onClick: () => this._offerDraw() }, '🤝 Proposer nulle'));
        }
      }
    } else {
      buttons.push(h('button', { className: 'btn btn--primary', type: 'button', onClick: () => this._rematch() }, '🔁 Rejouer'));
      buttons.push(h('button', { className: 'btn btn--ghost', type: 'button', onClick: () => this._renderSetupScreen() }, '⚙️ Nouvelle partie'));
    }
    buttons.push(h('button', { className: 'btn btn--ghost', type: 'button', onClick: () => this._toggleFullscreen() }, '⛶ Plein écran'));
    this.controlsEl.replaceChildren(...buttons);
  }

  _confirmResign() {
    if (typeof confirm === 'function' && !confirm('Abandonner la partie ?')) return;
    if (this.mode === 'ia') this._finishGame({ over: true, result: this.aiColor, reason: 'abandon' });
    else if (this.mode === 'local') this._finishGame({ over: true, result: this.engine.turn === 'w' ? 'b' : 'w', reason: 'abandon' });
    else if (this.isHost) this._finishGame({ over: true, result: this.myColor === 'w' ? 'b' : 'w', reason: 'abandon' });
    else this.ctx.sendMessage({ t: 'resign' }, this.ctx.hostId);
  }

  _offerDraw() {
    if (this.mode === 'ia') return;
    this.drawOfferFrom = 'me';
    this.ctx.sendMessage({ t: 'draw-offer' }, this.isHost ? this.opponent.id : this.ctx.hostId);
    this._pushControlsUI();
    this._setStatusFlash('Proposition de nulle envoyée.');
  }

  _acceptDraw() {
    if (this.isHost) this._finishGame({ over: true, result: 'nulle', reason: 'accord-mutuel' });
    else this.ctx.sendMessage({ t: 'draw-accept' }, this.ctx.hostId);
  }

  _declineDraw() {
    this.drawOfferFrom = null;
    this._pushControlsUI();
    if (!this.isHost) this.ctx.sendMessage({ t: 'draw-decline' }, this.ctx.hostId);
  }

  _rematch() {
    if (this.mode === 'ligne' && !this.isHost) { this.ctx.sendMessage({ t: 'rematch-request' }, this.ctx.hostId); this._setStatusFlash('Demande de revanche envoyée…'); return; }
    if (this.mode === 'ia') this._startGame({ mode: 'ia', white: this.aiColor === 'w' ? this.ctx.me.id : 'ia' });
    else if (this.mode === 'local') this._startGame({ mode: 'local', white: 'local-blanc' });
    else {
      this._startGame({ mode: 'ligne', white: this.myColor === 'w' ? this.opponent.id : this.ctx.me.id });
      this.ctx.sendMessage({ t: 'setup', whiteId: this.whiteId, timeKey: this.timeControl.key, board: this.settings.board }, this.opponent.id);
    }
  }

  _toggleFullscreen() {
    if (!document.fullscreenElement) this.container.requestFullscreen?.().catch(() => {});
    else document.exitFullscreen?.();
  }

  /* ============================== PARAMÈTRES ============================== */

  _buildSettingsPanel() {
    const panel = h('div', { className: 'chess__panel chess__settings' });
    const rebuild = () => {
      panel.replaceChildren(
        h('strong', {}, '⚙️ Paramètres'),
        this._settingsSelectRow('Plateau', BOARD_THEME_ORDER, BOARD_THEMES, this.settings.board, (v) => { this.settings.board = v; this._syncBoard({ animate: false }); }),
        this._settingsSelectRow('Pièces', PIECE_SKIN_ORDER, PIECE_SKINS, this.settings.skin, (v) => { this.settings.skin = v; this._applyPieceSkin(); this._pushCapturedUI(); }),
        this._settingsToggleRow('Coups possibles', this.settings.showLegalMoves, (v) => { this.settings.showLegalMoves = v; this._paintHighlights(); }),
        this._settingsToggleRow('Coordonnées', this.settings.showCoords, (v) => { this.settings.showCoords = v; this.boardWrapEl.classList.toggle('chess__board-wrap--nocoords', !v); }),
        this._settingsToggleRow('Rotation auto.', this.settings.autoFlip, (v) => { this.settings.autoFlip = v; }),
        h('div', { className: 'chess__setting-row' }, [
          h('label', {}, '🔊 Son'),
          h('button', { type: 'button', className: 'chess__soundtoggle', onClick: () => { this.settings.soundOn = !this.settings.soundOn; this.sound.enabled = this.settings.soundOn; rebuild(); } }, this.settings.soundOn ? '🔊' : '🔇'),
          h('input', { type: 'range', min: '0', max: '100', value: String(Math.round(this.settings.volume * 100)), oninput: (e) => { this.settings.volume = Number(e.target.value) / 100; this.sound.volume = this.settings.volume; } }),
        ]),
        this._settingsSelectRow('Pack sonore', ['classique', 'doux'], { classique: { label: 'Classique' }, doux: { label: 'Doux' } }, this.settings.soundPack, (v) => { this.settings.soundPack = v; this.sound.pack = v; }),
        h('div', { className: 'chess__setting-row' }, [h('button', { type: 'button', className: 'btn btn--ghost btn--small', onClick: () => this._flipBoard() }, '🔃 Retourner le plateau')]),
        h('div', { className: 'chess__setting-row' }, [h('button', { type: 'button', className: 'btn btn--ghost btn--small', onClick: () => this._importPrompt() }, '⬆️ Importer PGN / FEN')]),
      );
    };
    rebuild();
    return panel;
  }

  _settingsSelectRow(label, order, map, current, onChange) {
    return h('div', { className: 'chess__setting-row' }, [
      h('label', {}, label),
      h('select', { className: 'chess__select', onChange: (e) => onChange(e.target.value) }, order.map((k) => h('option', { value: k, selected: k === current ? '' : undefined }, map[k].label))),
    ]);
  }

  _settingsToggleRow(label, current, onChange) {
    return h('div', { className: 'chess__setting-row' }, [
      h('label', {}, label),
      h('input', { type: 'checkbox', checked: current ? '' : undefined, onChange: (e) => onChange(e.target.checked) }),
    ]);
  }

  _flipBoard() {
    this.boardOrientation = this.boardOrientation === 'w' ? 'b' : 'w';
    this._syncBoard({ animate: false });
    this._updateClocksUI();
    this._pushCapturedUI();
  }

  /* ============================== PGN / FEN ============================== */

  _exportPGN() {
    if (!this.engine) return;
    const pgn = toPGN(this.engine, {
      White: this.mode === 'ligne' ? (this.ctx.players.find((p) => p.id === this.whiteId)?.pseudo ?? 'Blancs') : (this.mode === 'ia' && this.aiColor === 'w' ? 'IA' : this.ctx.me.pseudo),
      Black: this.mode === 'ligne' ? (this.ctx.players.find((p) => p.id !== this.whiteId)?.pseudo ?? 'Noirs') : (this.mode === 'ia' && this.aiColor === 'b' ? 'IA' : this.ctx.me.pseudo),
      Result: this.gameOverInfo ? (this.gameOverInfo.result === 'nulle' ? '1/2-1/2' : this.gameOverInfo.result === 'w' ? '1-0' : '0-1') : '*',
    });
    this._downloadText(pgn, 'partie.pgn');
  }

  _exportFEN() {
    if (!this.engine) return;
    navigator.clipboard?.writeText(this.engine.toFEN()).catch(() => {});
    this._downloadText(this.engine.toFEN(), 'position.fen');
  }

  _downloadText(text, filename) {
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = h('a', { href: url, download: filename });
    document.body.append(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 2000);
  }

  _importPrompt() {
    const text = typeof prompt === 'function' ? prompt('Colle un PGN ou une position FEN à charger :') : null;
    if (!text) return;
    const trimmed = text.trim();
    const looksLikeFen = /^[rnbqkpRNBQKP1-8]+\/[rnbqkpRNBQKP1-8/]+\s+[wb]\s/.test(trimmed);
    if (looksLikeFen) {
      try { this.engine = new ChessEngine(trimmed); this._initPieceInstances(); this.capturedByWhite = []; this.capturedByBlack = []; this._finishImportRender(); }
      catch { safeAlert('FEN invalide.'); }
      return;
    }
    const parsed = fromPGN(trimmed);
    if (!parsed.ok) { safeAlert(parsed.error); return; }
    this.engine = new ChessEngine();
    this._initPieceInstances();
    this.capturedByWhite = []; this.capturedByBlack = [];
    for (const m of parsed.engine.moveHistory) {
      const r = this.engine.makeMove({ from: m.from, to: m.to, promotion: m.promotion });
      if (r.ok) this._reconcilePieceInstancesFromMove(r.move);
    }
    this._finishImportRender();
  }

  _finishImportRender() {
    this.gameOverInfo = null;
    this.viewFullmoveIndex = null;
    this.pieceEls = new Map();
    this.piecesLayerEl.replaceChildren();
    this._syncBoard({ animate: false });
    this._pushHistoryUI();
    this._pushCapturedUI();
    this._pushControlsUI();
    const status = this.engine.status();
    if (status.over) this._applyGameOver(status);
  }

  /* ============================== PLACEHOLDER (complété plus bas dans le fichier) ============================== */
}

const CSS = `
.chess { --chess-light:#e8c99b; --chess-dark:#a9713f; --chess-border:#5c3a1e; --chess-coord:#4a2f18; height:100%; display:flex; flex-direction:column; gap:12px; color:var(--text,#e8ecff); font-family:inherit; }
.chess *{ box-sizing:border-box; }
.chess button{ font-family:inherit; cursor:pointer; }
.chess .btn{ padding:9px 14px; border-radius:var(--radius-m,12px); border:1px solid var(--glass-border,rgba(255,255,255,.14)); background:var(--glass,rgba(255,255,255,.06)); color:var(--text,#e8ecff); font-size:.86rem; font-weight:600; transition:transform .12s ease, background .12s ease; }
.chess .btn:hover{ transform:translateY(-1px); background:rgba(255,255,255,.1); }
.chess .btn--primary{ background:linear-gradient(135deg,var(--accent-2,#29d3c2),var(--accent,#7c5cff)); border-color:transparent; color:#0b0b12; }
.chess .btn--ghost{ background:transparent; }
.chess .btn--small{ padding:6px 10px; font-size:.78rem; }

/* ---------- écran de configuration ---------- */
.chess__setup-wrap{ flex:1; display:flex; align-items:center; justify-content:center; padding:16px; }
.chess__setup{ width:min(560px,100%); background:var(--glass,rgba(255,255,255,.05)); border:1px solid var(--glass-border,rgba(255,255,255,.1)); border-radius:var(--radius-l,18px); padding:24px; display:flex; flex-direction:column; gap:16px; }
.chess__setup-title{ margin:0; font-size:1.3rem; }
.chess__setup-hint{ margin:0; color:var(--text-dim,#aab); font-size:.9rem; }
.chess__setup-row{ display:flex; flex-direction:column; gap:8px; }
.chess__setup-row label{ font-size:.78rem; text-transform:uppercase; letter-spacing:.05em; color:var(--text-faint,#616880); font-weight:700; }
.chess__seg{ display:flex; gap:6px; flex-wrap:wrap; }
.chess__seg--wrap{ flex-wrap:wrap; }
.chess__segbtn{ padding:8px 12px; border-radius:999px; border:1px solid var(--glass-border,rgba(255,255,255,.14)); background:rgba(255,255,255,.04); color:var(--text,#e8ecff); font-size:.82rem; font-weight:600; }
.chess__segbtn--active{ background:linear-gradient(135deg,var(--accent-2,#29d3c2),var(--accent,#7c5cff)); color:#0b0b12; border-color:transparent; }
.chess__setup-start{ align-self:flex-end; margin-top:6px; }
.chess__appearance-quick{ display:flex; gap:8px; flex-wrap:wrap; }
.chess__spinner{ width:26px; height:26px; border-radius:50%; border:3px solid var(--glass-border,rgba(255,255,255,.15)); border-top-color:var(--accent-2,#29d3c2); animation:chess-spin 0.9s linear infinite; margin:6px auto 0; }
@keyframes chess-spin{ to{ transform:rotate(360deg); } }

/* ---------- mise en page générale ---------- */
.chess__layout{ flex:1; min-height:0; display:grid; grid-template-columns:1fr 300px; gap:14px; }
.chess__center{ min-height:0; display:flex; flex-direction:column; align-items:center; gap:8px; }
.chess__right{ display:flex; flex-direction:column; gap:12px; min-height:0; overflow:auto; }
.chess__panel{ background:var(--glass,rgba(255,255,255,.05)); border:1px solid var(--glass-border,rgba(255,255,255,.09)); border-radius:var(--radius-m,14px); padding:12px; display:flex; flex-direction:column; gap:8px; }
.chess__panel strong{ font-size:.85rem; letter-spacing:.02em; }
.chess__controls{ display:flex; gap:8px; flex-wrap:wrap; justify-content:center; padding-top:2px; }
.chess__status{ min-height:1.4em; font-size:.9rem; font-weight:600; color:var(--accent-2,#29d3c2); text-align:center; }

/* ---------- côtés (horloge + capturées) ---------- */
.chess__side{ width:min(560px,92vw); display:flex; align-items:center; justify-content:space-between; gap:10px; }
.chess__player-label{ font-size:.82rem; font-weight:700; color:var(--text-dim,#aab); flex:0 0 auto; min-width:0; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; max-width:40%; }
.chess__clock{ font-variant-numeric:tabular-nums; font-size:1.15rem; font-weight:800; padding:6px 14px; border-radius:var(--radius-s,10px); background:rgba(0,0,0,.35); border:1px solid var(--glass-border,rgba(255,255,255,.1)); color:var(--text-dim,#aab); }
.chess__clock--active{ color:#0b0b12; background:linear-gradient(135deg,var(--accent-2,#29d3c2),var(--accent,#7c5cff)); border-color:transparent; }
.chess__clock--low{ color:#ff5c7a; }
.chess__clock--active.chess__clock--low{ background:#ff5c7a; color:#fff; }
.chess__captured-row{ flex:1; display:flex; align-items:center; gap:2px; min-width:0; flex-wrap:wrap; }
.chess__captured-icon{ width:18px; height:18px; flex:0 0 auto; }
.chess__material-diff{ font-size:.78rem; font-weight:700; color:var(--accent-2,#29d3c2); margin-left:4px; }

/* ---------- plateau ---------- */
.chess__board-wrap{ position:relative; width:min(560px,92vw); aspect-ratio:1/1; border-radius:10px; padding:22px 10px 10px 22px; background:var(--chess-border); box-shadow:0 10px 30px rgba(0,0,0,.35); }
.chess__board-wrap--nocoords{ padding:10px; }
.chess__board-wrap--analysis{ outline:3px solid var(--accent,#7c5cff); outline-offset:3px; }
.chess__squares{ position:relative; display:grid; grid-template-columns:repeat(8,1fr); grid-template-rows:repeat(8,1fr); width:100%; height:100%; border-radius:2px; overflow:hidden; }
.chess__square{ position:relative; border:none; padding:0; margin:0; }
.chess__square--light{ background:var(--chess-light); }
.chess__square--dark{ background:var(--chess-dark); }
.chess__square--selected{ box-shadow:inset 0 0 0 4px rgba(124,92,255,.75); }
.chess__square--last{ box-shadow:inset 0 0 0 9999px rgba(255,214,102,.28); }
.chess__square--check{ box-shadow:inset 0 0 0 9999px rgba(255,60,60,.45); }
.chess__square--capture{ box-shadow:inset 0 0 0 4px rgba(255,92,122,.85); }
.chess__dot{ position:absolute; left:50%; top:50%; width:28%; height:28%; transform:translate(-50%,-50%); border-radius:50%; background:rgba(20,20,30,.35); pointer-events:none; }
.chess__pieces{ position:absolute; inset:22px 10px 10px 22px; pointer-events:none; }
.chess__board-wrap--nocoords .chess__pieces{ inset:10px; }
.chess__piece{ position:absolute; width:12.5%; height:12.5%; transition:left .22s cubic-bezier(.3,.7,.3,1), top .22s cubic-bezier(.3,.7,.3,1); pointer-events:none; filter:drop-shadow(0 2px 3px rgba(0,0,0,.4)); }
.chess__piece--noanim{ transition:none; }
.chess__piece-svg{ width:100%; height:100%; overflow:visible; }
.piece-eye{ fill:rgba(0,0,0,.35); }
.piece-slit, .piece-cross{ stroke:currentColor; }
.chess__coords{ position:absolute; display:flex; font-size:.62rem; font-weight:700; color:var(--chess-coord); pointer-events:none; }
.chess__coords--files{ left:22px; right:10px; bottom:2px; justify-content:space-around; }
.chess__coords--ranks{ top:22px; bottom:10px; left:4px; flex-direction:column; justify-content:space-around; }
.chess__board-wrap--nocoords .chess__coords{ display:none; }
.chess__analysis-banner{ position:absolute; left:0; right:0; bottom:-40px; display:flex; align-items:center; justify-content:center; gap:10px; font-size:.8rem; color:var(--text-dim,#aab); }

/* ---------- promotion ---------- */
.chess__modal-overlay{ position:absolute; inset:0; background:rgba(6,6,12,.65); display:flex; align-items:center; justify-content:center; z-index:5; border-radius:inherit; }
.chess__modal{ background:#15151f; border:1px solid var(--glass-border,rgba(255,255,255,.14)); border-radius:var(--radius-m,14px); padding:16px; text-align:center; }
.chess__modal h3{ margin:0 0 10px; font-size:.95rem; }
.chess__promo-choices{ display:flex; gap:10px; }
.chess__promo-btn{ display:flex; flex-direction:column; align-items:center; gap:4px; width:64px; padding:8px; border-radius:10px; border:1px solid var(--glass-border,rgba(255,255,255,.12)); background:rgba(255,255,255,.04); color:var(--text,#e8ecff); font-size:.7rem; }
.chess__promo-btn:hover{ background:rgba(255,255,255,.12); }
.chess__promo-btn svg{ width:44px; height:44px; }

/* ---------- historique ---------- */
.chess__history-head{ display:flex; align-items:center; justify-content:space-between; }
.chess__history-actions{ display:flex; gap:4px; }
.chess__history-list{ max-height:220px; overflow:auto; display:flex; flex-direction:column; gap:2px; font-size:.82rem; }
.chess__history-row{ display:grid; grid-template-columns:28px 1fr 1fr; gap:4px; align-items:center; }
.chess__history-num{ color:var(--text-faint,#616880); font-size:.75rem; }
.chess__history-move{ text-align:left; background:none; border:none; color:var(--text-dim,#aab); padding:3px 6px; border-radius:6px; font-size:.82rem; }
.chess__history-move:hover{ background:rgba(255,255,255,.08); }
.chess__history-move--current{ background:var(--accent-2,#29d3c2); color:#0b0b12; font-weight:700; }

/* ---------- chat (même schéma que le Tarot) ---------- */
.chess__chat{ display:flex; flex-direction:column; gap:8px; }
.chess__chat-messages{ display:flex; flex-direction:column; gap:8px; max-height:180px; overflow-y:auto; padding-right:2px; }
.chess__chat-empty{ color:var(--text-faint,#616880); font-size:.78rem; font-style:italic; text-align:center; padding:6px 0; }
.chess__chat-msg{ display:flex; gap:8px; animation:chess-msg-in .15s ease; }
.chess__chat-msg__avatar{ font-size:1.1rem; line-height:1.5; }
.chess__chat-msg__head{ display:flex; align-items:baseline; gap:6px; flex-wrap:wrap; }
.chess__chat-msg__pseudo{ font-weight:600; font-size:.82rem; }
.chess__chat-msg__time{ font-size:.68rem; color:var(--text-faint,#616880); }
.chess__chat-msg__text{ margin:1px 0 0; font-size:.85rem; color:var(--text-dim,#aab); overflow-wrap:anywhere; }
.chess__chat-form{ display:flex; gap:8px; }
.chess__chat-form input{ flex:1; min-width:0; padding:8px 10px; font:inherit; font-size:.85rem; color:var(--text,#e8ecff); background:rgba(0,0,0,.35); border:1px solid var(--glass-border,rgba(255,255,255,.12)); border-radius:var(--radius-s,10px); }
@keyframes chess-msg-in{ from{ opacity:0; transform:translateY(4px);} }

/* ---------- paramètres ---------- */
.chess__setting-row{ display:flex; align-items:center; justify-content:space-between; gap:10px; font-size:.82rem; }
.chess__setting-row label{ color:var(--text-dim,#aab); }
.chess__select{ background:rgba(0,0,0,.35); color:var(--text,#e8ecff); border:1px solid var(--glass-border,rgba(255,255,255,.12)); border-radius:var(--radius-s,8px); padding:5px 8px; font-size:.8rem; }
.chess__soundtoggle{ background:none; border:none; font-size:1rem; }
.chess__setting-row input[type=range]{ width:90px; }

@media (max-width:1000px){
  .chess__layout{ grid-template-columns:1fr; }
  .chess__right{ order:2; }
  .chess__center{ order:1; }
}
`;

let instance = null;
export default {
  async mount(container, context) {
    instance = new ChessUI(container, context);
    instance.mount();
  },
  unmount() {
    instance?.unmount();
    instance = null;
  },
};
