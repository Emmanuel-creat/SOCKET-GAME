/**
 * Memory — module de jeu pour la plateforme Arcade.
 *
 * Architecture « Host autoritaire » (identique au Tarot) :
 *  - Le client du Host exécute le moteur de règles (MemoryEngine) : sélection
 *    des images, mélange du plateau, tours, appariements, scores. C'est la
 *    seule source de vérité.
 *  - Les autres clients sont de purs afficheurs : ils envoient leurs actions
 *    au Host via context.sendMessage (relais game:message du moteur, qui ne
 *    lit jamais le contenu) et reçoivent l'état complet en retour.
 *    ⚠️ Ce module n'appelle JAMAIS `socket.emit(...)` directement : le
 *    contrat exposé par GameLoader.js / GameView.js est
 *    `context.sendMessage(data, to)` / `context.onMessage(handler)`, qui
 *    s'appuient en interne sur le relais `game:message`. C'est la même
 *    intégration que le module Tarot déjà en production — y toucher casserait
 *    le jeu dans ce moteur.
 *  - Aucune information n'est privée dans ce jeu (toutes les cartes sont
 *    connues une fois retournées) : l'état diffusé est donc identique pour
 *    tout le monde, diffusé en une seule fois (broadcast, `to = null`).
 *  - Le chat est indépendant du moteur de jeu : chaque client diffuse
 *    directement ses messages à toute la salle via context.sendMessage
 *    (le serveur relaie sans passer par le Host).
 *
 * Corrections apportées dans cette révision :
 *  1. Clics sur les cartes : délégation d'événement unique sur la grille
 *     (`onGridClick`) au lieu d'un handler par bouton — le clic est TOUJOURS
 *     capté (aucun `disabled` natif sur les boutons, qui pouvait bloquer
 *     silencieusement le clic côté navigateur). La validité du coup est
 *     vérifiée en JS avant l'envoi, ET par le moteur côté Host (défense en
 *     profondeur). L'action traitée par l'hôte modifie l'état et le diffuse ;
 *     `renderGrid()` applique alors la classe `is-up` / `is-matched`.
 *  2. Mise en page : structure DOM stricte à 2 colonnes en CSS Grid
 *     (`grid-template-columns: 1fr 300px`), colonne de droite à largeur fixe
 *     donc jamais « écrasée » ou masquée. Gauche = grille 4×4 + bouton
 *     Terminer (Host). Droite = Scoreboard → Chrono/Passer → Chat.
 *  3. Dos des cartes : chaque carte non retournée affiche explicitement
 *     `verso.jpg` (image de fond posée directement en `style` inline sur la
 *     face arrière, en plus de la règle CSS, pour éviter toute dépendance
 *     fragile à l'ordre de chargement du <style>).
 */

/* ====================================================================== */
/* Constantes & assets                                                    */
/* ====================================================================== */

const IMAGE_POOL_SIZE = 15; // nombre d'images disponibles dans assets/ (1.jpg à 15.jpg)
const PAIR_COUNT = 15; // 15 paires (30 cartes) — tout le pool d'images
const BOARD_SIZE = PAIR_COUNT * 2; // 30 cartes
const MISMATCH_DELAY_MS = 1500;
const SKIP_TIMER_MS = 10000;
const END_SCREEN_DELAY_MS = 4500;

// Les assets sont servis à côté de ce module (client/games/memory/assets/).
const ASSET_BASE = '/games/memory/assets/';
const frontSrc = (value) => `${ASSET_BASE}${value}.jpg`;
const backSrc = `${ASSET_BASE}verso.jpg`;

/* ====================================================================== */
/* Moteur de règles (pur : aucune dépendance DOM/réseau)                  */
/* ====================================================================== */

export class MemoryEngine {
  /** @param {{id: string, pseudo: string}[]} players @param {{rng?: () => number}} opts */
  constructor(players, { rng = Math.random } = {}) {
    if (players.length < 2) throw new Error('Le Memory nécessite au moins 2 joueurs.');
    this.players = players.map((p) => ({ id: p.id, pseudo: p.pseudo }));
    this.rng = rng;
    this.scores = Object.fromEntries(this.players.map((p) => [p.id, 0]));
    this.board = this.buildBoard();
    this.revealed = []; // indices actuellement retournés, non appariés
    this.matchedCount = 0;
    this.turnIndex = 0;
    this.finished = false;
    this.log = [];
    this.timerEndsAt = null; // timestamp (ms) de fin du chrono en cours, ou null
    this._skipTimeout = null;
  }

  shuffle(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i -= 1) {
      const j = Math.floor(this.rng() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  buildBoard() {
    // Sélectionne aléatoirement PAIR_COUNT images parmi les IMAGE_POOL_SIZE disponibles.
    const pool = Array.from({ length: IMAGE_POOL_SIZE }, (_, i) => i + 1);
    const chosen = this.shuffle(pool).slice(0, PAIR_COUNT);
    const values = this.shuffle(chosen.flatMap((v) => [v, v]));
    return values.map((value) => ({ value, state: 'hidden' })); // hidden | up | matched
  }

  get turnId() { return this.players[this.turnIndex]?.id; }
  say(message) { this.log.push(message); if (this.log.length > 40) this.log.shift(); }
  advanceTurn() { this.turnIndex = (this.turnIndex + 1) % this.players.length; }

  clearSkipTimer() {
    if (this._skipTimeout) clearTimeout(this._skipTimeout);
    this._skipTimeout = null;
    this.timerEndsAt = null;
  }

  /** Point d'entrée unique pour toute action reçue (du Host lui-même ou d'un client). */
  handleAction(playerId, action = {}) {
    if (this.finished) return { ok: false, error: 'La partie est terminée.' };
    if (action.a === 'flip') return this.flip(playerId, action.index);
    if (action.a === 'skip') return this.requestSkip(playerId);
    return { ok: false, error: 'Action inconnue.' };
  }

  flip(playerId, index) {
    if (playerId !== this.turnId) return { ok: false, error: "Ce n'est pas votre tour." };
    if (this.revealed.length >= 2) return { ok: false, error: 'Attendez la résolution du tour.' };
    if (!Number.isInteger(index) || index < 0 || index >= BOARD_SIZE) {
      return { ok: false, error: 'Carte invalide.' };
    }
    const cell = this.board[index];
    if (!cell || cell.state !== 'hidden') return { ok: false, error: 'Carte déjà retournée.' };

    cell.state = 'up';
    this.revealed.push(index);

    if (this.revealed.length === 2) {
      const [i1, i2] = this.revealed;
      const match = this.board[i1].value === this.board[i2].value;
      const pseudo = this.players.find((p) => p.id === playerId)?.pseudo ?? '?';
      if (match) {
        this.board[i1].state = 'matched';
        this.board[i2].state = 'matched';
        this.scores[playerId] = (this.scores[playerId] ?? 0) + 1;
        this.matchedCount += 1;
        this.revealed = [];
        this.clearSkipTimer();
        this.say(`${pseudo} trouve une paire (${this.board[i1].value}) 🎉 — rejoue`);
        if (this.matchedCount === PAIR_COUNT) {
          this.finished = true;
          this.say('Toutes les paires ont été trouvées !');
        }
      } else {
        this.say(`${pseudo} se trompe, le tour passe.`);
        // Le mismatch reste visible MISMATCH_DELAY_MS avant d'être retourné ;
        // c'est resolveMismatch() (planifié par l'appelant hôte) qui le fait.
      }
      return { ok: true, mismatchPending: !match, indices: match ? null : [i1, i2] };
    }
    return { ok: true };
  }

  /** Appelé par l'hôte après le délai de 1.5s en cas de mismatch : retourne les cartes face cachée et passe le tour. */
  resolveMismatch(indices) {
    for (const i of indices) {
      if (this.board[i]?.state === 'up') this.board[i].state = 'hidden';
    }
    this.revealed = [];
    this.advanceTurn();
    this.clearSkipTimer();
  }

  requestSkip() {
    if (this.timerEndsAt) return { ok: false, error: 'Un chrono est déjà en cours.' };
    this.timerEndsAt = Date.now() + SKIP_TIMER_MS;
    this.say('⏱️ Chrono de 10 secondes lancé pour le joueur actif.');
    return { ok: true, startSkipTimer: true };
  }

  /** Appelé par l'hôte quand le chrono de 10s expire sans que le tour ait changé. */
  autoSkipTurn() {
    if (this.finished) return;
    const pseudo = this.players.find((p) => p.id === this.turnId)?.pseudo ?? '?';
    for (const i of this.revealed) {
      if (this.board[i]?.state === 'up') this.board[i].state = 'hidden';
    }
    this.revealed = [];
    this.advanceTurn();
    this.clearSkipTimer();
    this.say(`⏭️ ${pseudo} n'a pas terminé à temps, tour passé.`);
  }

  finalScores() {
    return this.players
      .map((p) => ({ id: p.id, pseudo: p.pseudo, score: this.scores[p.id] ?? 0 }))
      .sort((a, b) => b.score - a.score);
  }

  /** Vue publique — identique pour tout le monde (aucune information cachée). */
  snapshot() {
    return {
      board: this.board.map((c) => ({ value: c.state === 'hidden' ? null : c.value, state: c.state })),
      players: this.players,
      scores: { ...this.scores },
      turnId: this.turnId,
      finished: this.finished,
      matchedCount: this.matchedCount,
      totalPairs: PAIR_COUNT,
      timerEndsAt: this.timerEndsAt,
      log: [...this.log],
    };
  }
}

/* ====================================================================== */
/* Rendu DOM (utilitaire minimal, sans dépendance)                        */
/* ====================================================================== */

function h(tag, props = {}, children = []) {
  const node = document.createElement(tag);
  Object.entries(props).forEach(([k, v]) => {
    if (v === undefined || v === null) return;
    if (k === 'className') node.className = v;
    else if (k === 'style') node.style.cssText = v;
    else if (k.startsWith('on')) node.addEventListener(k.slice(2).toLowerCase(), v);
    else if (k.startsWith('data-')) node.setAttribute(k, v);
    else node.setAttribute(k, v);
  });
  (Array.isArray(children) ? children : [children]).forEach((c) => {
    if (c === null || c === undefined) return;
    node.append(typeof c === 'string' || typeof c === 'number' ? document.createTextNode(String(c)) : c);
  });
  return node;
}

const CSS = `
.memory { display: grid; grid-template-columns: minmax(0, 1fr) 300px; gap: 20px; align-items: start; font-family: inherit; color: var(--text, #eef); }
.memory__col-left { min-width: 0; display: flex; flex-direction: column; gap: 12px; }
.memory__col-right { display: flex; flex-direction: column; gap: 14px; }
.memory__panel { background: var(--panel-bg, rgba(255,255,255,0.05)); border: 1px solid var(--panel-border, rgba(255,255,255,0.1)); border-radius: 12px; padding: 12px 14px; }
.memory__bar { display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 8px; }
.memory__turn { font-weight: 600; color: var(--accent-2, #29d3c2); }
.memory__grid { display: grid; grid-template-columns: repeat(6, 1fr); gap: 8px; max-width: 660px; margin: 0 auto; }
.mcard { position: relative; aspect-ratio: 3 / 4.3; perspective: 800px; border: none; background: none; padding: 0; cursor: pointer; -webkit-tap-highlight-color: transparent; }
.mcard.is-locked { cursor: default; }
.mcard__inner { position: absolute; inset: 0; transform-style: preserve-3d; transition: transform 0.45s ease; border-radius: 8px; box-shadow: 0 2px 6px rgba(0,0,0,0.35); pointer-events: none; }
.mcard.is-up .mcard__inner, .mcard.is-matched .mcard__inner { transform: rotateY(180deg); }
.mcard__face { position: absolute; inset: 0; backface-visibility: hidden; border-radius: 8px; background-size: cover; background-position: center; border: 2px solid rgba(255,255,255,0.08); }
.mcard__face--back { background-image: url('${backSrc}'); }
.mcard__face--front { transform: rotateY(180deg); }
.mcard.is-matched { opacity: 0.55; }
.mcard.is-matched .mcard__face--front { border-color: var(--accent-2, #29d3c2); }
.mcard:not(.is-locked):hover .mcard__inner { transform: translateY(-3px) rotateY(0deg); box-shadow: 0 6px 14px rgba(0,0,0,0.4); }
.mcard.is-up:hover .mcard__inner, .mcard.is-matched:hover .mcard__inner { transform: rotateY(180deg); }
.memory__end-row { display: flex; justify-content: center; }
.memory__players { display: flex; flex-direction: column; gap: 6px; }
.memory__player { display: flex; justify-content: space-between; padding: 4px 8px; border-radius: 8px; }
.memory__player--turn { background: rgba(41, 211, 194, 0.15); font-weight: 600; }
.memory__timer-panel { display: flex; flex-direction: column; gap: 8px; align-items: flex-start; }
.memory__timer-value { font-weight: 700; color: var(--accent, #ffb84d); font-size: 1.1rem; min-height: 1.3em; }
.memory__chat { display: flex; flex-direction: column; gap: 8px; }
.memory__chat-list { max-height: 220px; overflow-y: auto; display: flex; flex-direction: column; gap: 4px; font-size: 0.85rem; }
.memory__chat-msg b { color: var(--accent-2, #29d3c2); }
.memory__chat-form { display: flex; gap: 6px; }
.memory__chat-form input { flex: 1; border-radius: 8px; border: 1px solid rgba(255,255,255,0.15); background: rgba(0,0,0,0.2); color: inherit; padding: 6px 8px; }
.memory__status { min-height: 1.2em; font-size: 0.85rem; color: var(--accent, #ffb84d); }
.memory__final table { width: 100%; border-collapse: collapse; }
.memory__final td, .memory__final th { padding: 4px 8px; text-align: left; }
@media (max-width: 720px) {
  .memory { grid-template-columns: 1fr; }
}
`;

/* ====================================================================== */
/* Interface (Host exécute le moteur, tous affichent la même vue)         */
/* ====================================================================== */

class MemoryUI {
  constructor(container, context) {
    this.container = container;
    this.ctx = context;
    this.isHost = context.me.id === context.hostId;
    this.engine = null;
    this.unsubscribe = null;
    this.chat = [];
    this.tickHandle = null;
    this.endTimer = null;
    this.pendingIndex = null; // carte en attente d'acquittement réseau (évite le double-clic)
  }

  mount() {
    this.styleEl = h('style', {}, CSS);
    this.root = h('div', { className: 'memory' });
    this.container.append(this.styleEl, this.root);

    this.unsubscribe = this.ctx.onMessage(({ from, data }) => {
      if (!data) return;
      if (data.t === 'chat') { this.receiveChat(from, data); return; }
      if (this.isHost && data.t === 'action') { this.hostHandle(from, data.action); return; }
      if (!this.isHost && data.t === 'state' && from === this.ctx.hostId) { this.render(data.state); return; }
    });

    if (this.isHost) {
      try {
        this.engine = new MemoryEngine(this.ctx.players);
      } catch (error) {
        this.renderMessage(`⚠️ ${error.message}`);
        return;
      }
      this.broadcast();
    } else {
      this.renderMessage('⏳ Connexion à la table du Host…');
    }
    this.tickHandle = setInterval(() => this.tick(), 250);
  }

  /* -------- côté Host : moteur + diffusion de l'état -------- */

  hostHandle(playerId, action) {
    const result = this.engine.handleAction(playerId, action);
    if (!result) return;
    if (!result.ok) {
      this.setStatus(result.error);
      return;
    }
    if (result.mismatchPending) {
      this.broadcast();
      clearTimeout(this._mismatchTimer);
      this._mismatchTimer = setTimeout(() => {
        this.engine.resolveMismatch(result.indices);
        this.broadcast();
      }, MISMATCH_DELAY_MS);
      return;
    }
    if (result.startSkipTimer) {
      clearTimeout(this._autoSkipTimer);
      this._autoSkipTimer = setTimeout(() => {
        this.engine.autoSkipTurn();
        this.broadcast();
      }, SKIP_TIMER_MS);
    }
    this.broadcast();
    if (this.engine.finished) {
      clearTimeout(this.endTimer);
      this.endTimer = setTimeout(() => this.finishAndReturn(), END_SCREEN_DELAY_MS);
    }
  }

  act(action) {
    if (this.isHost) {
      this.hostHandle(this.ctx.me.id, action);
    } else {
      this.ctx.sendMessage({ t: 'action', action }, this.ctx.hostId);
    }
  }

  broadcast() {
    const state = this.engine.snapshot();
    this.ctx.sendMessage({ t: 'state', state }, null); // diffusion à tous les autres membres
    this.render(state);
  }

  finishAndReturn() {
    if (!this.isHost) return;
    const classement = this.engine.finalScores();
    const top = classement[0];
    this.ctx.onEnd({
      summary: top ? `🧠 Memory — ${top.pseudo} gagne avec ${top.score} paire${top.score > 1 ? 's' : ''} !` : '🧠 Memory — partie terminée.',
      classement,
    });
  }

  /* -------- chat (indépendant du moteur, décentralisé) -------- */

  sendChat(text) {
    const clean = text.trim().slice(0, 240);
    if (!clean) return;
    const msg = { pseudo: this.ctx.me.pseudo ?? 'Moi', text: clean, at: Date.now() };
    this.chat.push({ ...msg, from: this.ctx.me.id, mine: true });
    this.ctx.sendMessage({ t: 'chat', pseudo: msg.pseudo, text: msg.text }, null);
    this.renderChatList();
  }

  receiveChat(from, data) {
    this.chat.push({ from, pseudo: data.pseudo ?? '?', text: String(data.text ?? '').slice(0, 240), mine: false });
    if (this.chat.length > 200) this.chat.shift();
    this.renderChatList();
  }

  /* -------- rendu -------- */

  setStatus(message) {
    if (!this.statusEl) return;
    this.statusEl.textContent = message ?? '';
    clearTimeout(this.statusTimer);
    this.statusTimer = setTimeout(() => { if (this.statusEl) this.statusEl.textContent = ''; }, 3000);
  }

  renderMessage(text) {
    this.root.replaceChildren(h('div', { className: 'memory__panel', style: 'margin:auto;' }, text));
  }

  tick() {
    if (!this.timerValueEl) return;
    if (!this.view?.timerEndsAt) { this.timerValueEl.textContent = ''; return; }
    const remaining = Math.max(0, Math.ceil((this.view.timerEndsAt - Date.now()) / 1000));
    this.timerValueEl.textContent = remaining > 0 ? `⏱️ ${remaining}s avant passage automatique` : '⏱️ …';
  }

  render(view) {
    this.view = view;
    this.pendingIndex = null; // un nouvel état vient d'arriver : plus besoin de verrou local
    const myTurn = view.turnId === this.ctx.me.id;

    /* ---------------- Colonne gauche : grille + Terminer la partie ---------------- */

    const bar = h('div', { className: 'memory__panel memory__bar' }, [
      h('strong', {}, `🧠 Memory — ${view.matchedCount}/${view.totalPairs} paires`),
      h('span', { className: 'memory__turn' },
        view.finished ? 'Partie terminée'
          : myTurn ? '⭐ À vous de jouer'
            : `Au tour de ${view.players.find((p) => p.id === view.turnId)?.pseudo ?? ''}`),
    ]);

    const grid = h('div', { className: 'memory__grid', onClick: (e) => this.onGridClick(e) },
      view.board.map((cell, index) => this.cardEl(cell, index)));

    this.statusEl = h('div', { className: 'memory__status' });

    const colLeft = h('div', { className: 'memory__col-left' }, [
      bar,
      h('div', { className: 'memory__panel' }, [grid]),
      this.statusEl,
    ]);

    if (view.finished) colLeft.append(this.renderFinal(view));

    if (this.isHost) {
      colLeft.append(h('div', { className: 'memory__end-row' }, [
        h('button', { className: 'btn btn--ghost', type: 'button', onClick: () => this.confirmEnd() }, '🛑 Terminer la partie'),
      ]));
    }

    /* ---------------- Colonne droite : Scoreboard → Chrono/Passer → Chat ---------------- */

    const scoreboard = h('div', { className: 'memory__panel' }, [
      h('strong', {}, 'Scores'),
      h('div', { className: 'memory__players' }, view.players.map((p) => h('div', {
        className: `memory__player${p.id === view.turnId && !view.finished ? ' memory__player--turn' : ''}`,
      }, [
        h('span', {}, p.pseudo),
        h('span', {}, `🃏 ${view.scores[p.id] ?? 0}`),
      ]))),
    ]);

    this.timerValueEl = h('div', { className: 'memory__timer-value' }, view.timerEndsAt ? '⏱️ …' : '');
    const timerPanel = h('div', { className: 'memory__panel memory__timer-panel' }, [
      h('strong', {}, '⏱️ Chrono / Passer le tour'),
      h('button', {
        className: 'btn btn--ghost btn--small',
        type: 'button',
        onClick: () => this.act({ a: 'skip' }),
        disabled: view.finished || !!view.timerEndsAt ? true : undefined,
      }, 'Lancer le chrono 10s'),
      this.timerValueEl,
    ]);

    const colRight = h('div', { className: 'memory__col-right' }, [
      scoreboard,
      timerPanel,
      this.renderChat(),
    ]);

    this.root.replaceChildren(colLeft, colRight);
    this.renderChatList();
  }

  /** Handler délégué unique sur le conteneur de la grille : capte tout clic sur une carte,
   *  même après un remplacement complet du DOM (re-rendu), sans dépendre d'un handler par bouton. */
  onGridClick(event) {
    const cardEl = event.target.closest('.mcard');
    if (!cardEl || !this.root.contains(cardEl)) return;
    const index = Number(cardEl.dataset.index);
    if (!Number.isInteger(index)) return;
    this.processFlip(index);
  }

  /** Valide le coup côté client (retour immédiat si évident), puis délègue à act(). */
  processFlip(index) {
    const view = this.view;
    if (!view) return;
    if (view.finished) return;
    if (view.turnId !== this.ctx.me.id) { this.setStatus("Ce n'est pas votre tour."); return; }
    if (this.pendingIndex !== null) return; // acquittement réseau en attente
    const cell = view.board[index];
    if (!cell || cell.state !== 'hidden') return;

    this.pendingIndex = index;
    this.act({ a: 'flip', index });
  }

  cardEl(cell, index) {
    const state = cell.state; // hidden | up | matched
    const locked = state !== 'hidden' || this.pendingIndex === index;
    return h('button', {
      className: `mcard is-${state}${locked ? ' is-locked' : ''}`,
      type: 'button',
      'data-index': String(index),
    }, [
      h('div', { className: 'mcard__inner' }, [
        h('div', { className: 'mcard__face mcard__face--back', style: `background-image:url('${backSrc}')` }),
        h('div', {
          className: 'mcard__face mcard__face--front',
          style: state !== 'hidden' ? `background-image:url('${frontSrc(cell.value)}')` : '',
        }),
      ]),
    ]);
  }

  renderFinal(view) {
    const ranking = [...view.players]
      .map((p) => ({ pseudo: p.pseudo, score: view.scores[p.id] ?? 0 }))
      .sort((a, b) => b.score - a.score);
    return h('div', { className: 'memory__panel memory__final' }, [
      h('strong', {}, '🏆 Classement final'),
      h('table', {}, ranking.map((p, i) => h('tr', {}, [
        h('td', {}, `${i + 1}.`), h('td', {}, p.pseudo), h('td', {}, String(p.score)),
      ]))),
      h('div', { style: 'color:var(--text-dim,#aab);margin-top:6px;' }, 'Retour au salon dans quelques secondes…'),
    ]);
  }

  renderChat() {
    this.chatListEl = h('div', { className: 'memory__chat-list' });
    const input = h('input', { placeholder: 'Message…', maxlength: '240' });
    const send = () => { this.sendChat(input.value); input.value = ''; };
    input.addEventListener('keydown', (e) => { if (e.key === 'Enter') send(); });
    return h('div', { className: 'memory__panel memory__chat' }, [
      h('strong', {}, '💬 Chat'),
      this.chatListEl,
      h('div', { className: 'memory__chat-form' }, [
        input,
        h('button', { className: 'btn btn--primary btn--small', type: 'button', onClick: send }, 'Envoyer'),
      ]),
    ]);
  }

  renderChatList() {
    if (!this.chatListEl) return;
    this.chatListEl.replaceChildren(...this.chat.map((m) => h('div', { className: 'memory__chat-msg' }, [
      h('b', {}, `${m.pseudo} : `), m.text,
    ])));
    this.chatListEl.scrollTop = this.chatListEl.scrollHeight;
  }

  confirmEnd() {
    clearTimeout(this._mismatchTimer);
    clearTimeout(this._autoSkipTimer);
    clearTimeout(this.endTimer);
    const classement = this.engine.finalScores();
    const top = classement[0];
    this.ctx.onEnd({
      summary: top ? `🧠 Memory — ${top.pseudo} gagne avec ${top.score} paire${top.score > 1 ? 's' : ''} !` : '🧠 Memory — partie terminée.',
      classement,
    });
  }

  unmount() {
    this.unsubscribe?.();
    clearInterval(this.tickHandle);
    clearTimeout(this.statusTimer);
    clearTimeout(this.endTimer);
    clearTimeout(this._mismatchTimer);
    clearTimeout(this._autoSkipTimer);
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
    instance = new MemoryUI(container, context);
    instance.mount();
  },
  async unmount() {
    instance?.unmount();
    instance = null;
  },
};
