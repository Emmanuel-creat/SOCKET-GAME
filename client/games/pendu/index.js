/**
 * Le Pendu — module de jeu pour la plateforme Arcade.
 *
 * Architecture « Host autoritaire » (identique au Quiz et au Tarot) :
 *  - Le client du Host exécute le moteur (HangmanEngine) : tirage du mot ou
 *    de la phrase, suivi des lettres tentées, calcul des scores.
 *  - Les autres clients envoient leurs propositions au Host via
 *    context.sendMessage (relais game:message du moteur).
 *  - Comme pour le Quiz, il n'y a pas d'information cachée par joueur : tout
 *    le monde reçoit la même vue, à l'exception du mot/de la phrase encore
 *    masqué (seules les lettres déjà trouvées sont envoyées en clair).
 *
 * Règles implémentées :
 *  - L'Host configure la partie avant de lancer : mode (mot ou phrase),
 *    nombre d'erreurs autorisées (6, 8, 10 ou 12 — au-delà des 6 erreurs
 *    « classiques »), nombre de manches, catégories (en mode mot).
 *  - Tous les joueurs peuvent proposer une lettre à tout moment (clic sur le
 *    clavier affiché ou touche du clavier physique) ou tenter de deviner le
 *    mot/la phrase en entier via le champ de texte.
 *  - Une lettre correcte rapporte 10 points par occurrence révélée ; deviner
 *    le mot/la phrase en entier rapporte un bonus de 50 points et termine la
 *    manche immédiatement. Une lettre ou une proposition fausse consomme une
 *    erreur du pendu (partagée par tous les joueurs).
 *  - La manche se termine dès que le mot est entièrement révélé (gagné) ou
 *    que le nombre d'erreurs autorisées est atteint (perdu) ; la solution est
 *    alors affichée avant d'enchaîner automatiquement sur la manche suivante.
 *  - Classement final affiché en fin de partie.
 *
 * Banque de mots et de phrases : voir mots.js (fichier de données pur, à
 * modifier librement pour ajouter/retirer/corriger des mots et phrases).
 */

import { MOTS, PHRASES } from './mots.js';

/* ====================================================================== */
/* Utilitaires                                                            */
/* ====================================================================== */

function shuffled(arr, rng = Math.random) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i -= 1) {
    const j = Math.floor(rng() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function normalize(s) {
  return s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toUpperCase();
}

function isGuessableChar(ch) {
  return /[A-Z]/.test(ch);
}

const MAX_ERREURS_DISPONIBLES = [6, 8, 10, 12];
const NB_MANCHES_DISPONIBLES = [3, 5, 7, 10];
const POINTS_PAR_LETTRE = 10;
const BONUS_MOT_COMPLET = 50;
const DELAI_MANCHE_SUIVANTE_MS = 5000;

/* ====================================================================== */
/* Sélection du contenu à partir de la banque + de la configuration       */
/* ====================================================================== */

export function allCategoriesMots() {
  return [...new Set(MOTS.map((m) => m.categorie))].sort((a, b) => a.localeCompare(b, 'fr'));
}

export function allCategoriesPhrases() {
  return [...new Set(PHRASES.map((m) => m.categorie))].sort((a, b) => a.localeCompare(b, 'fr'));
}

export function pickItems({ mode, categories, nombre }) {
  const bank = mode === 'phrase' ? PHRASES : MOTS;
  const catSet = new Set(categories);
  const pool = bank.filter((item) => catSet.has(item.categorie));
  return shuffled(pool).slice(0, nombre);
}

/* ====================================================================== */
/* Moteur de règles (pur : aucune dépendance DOM/réseau)                  */
/* ====================================================================== */

export class HangmanEngine {
  /**
   * @param {{id:string,pseudo:string,avatar?:string,color?:string}[]} players
   * @param {object} config { mode: 'mot'|'phrase', items: {texte,categorie}[], maxErreurs: number }
   */
  constructor(players, config) {
    if (!config?.items?.length) {
      throw new Error('Aucun mot ou phrase ne correspond aux filtres choisis.');
    }
    this.players = players.map((p) => ({ id: p.id, pseudo: p.pseudo, avatar: p.avatar, color: p.color }));
    this.mode = config.mode;
    this.items = config.items;
    this.maxErreurs = config.maxErreurs;
    this.scores = Object.fromEntries(this.players.map((p) => [p.id, 0]));
    this.manche = -1;
    this.phase = 'manche';
    this.log = [];
  }

  get total() { return this.items.length; }
  get current() { return this.items[this.manche]; }

  start() {
    this.manche = -1;
    return this.nextManche();
  }

  nextManche() {
    this.manche += 1;
    if (this.manche >= this.total) {
      this.phase = 'fin-partie';
      return { ok: true, done: true };
    }
    this.phase = 'manche';
    this.guessedLetters = new Set();
    this.wrongLetters = new Set();
    this.wrongFullGuesses = 0;
    this.erreurs = 0;
    this.roundOver = false;
    this.lastResult = null;
    return { ok: true, done: false };
  }

  _normalizedText() {
    return normalize(this.current.texte);
  }

  _isFullyRevealed() {
    return [...this._normalizedText()].every((c) => !isGuessableChar(c) || this.guessedLetters.has(c));
  }

  _pseudoOf(playerId) {
    return this.players.find((p) => p.id === playerId)?.pseudo ?? '???';
  }

  _endRound(gagne, winnerId, viaMotComplet = false) {
    this.roundOver = true;
    this.phase = 'revelation';
    this.lastResult = { gagne, winnerId, winnerPseudo: winnerId ? this._pseudoOf(winnerId) : null, viaMotComplet };
  }

  /** Propose une lettre (une seule prise en compte par lettre et par manche). */
  guessLetter(playerId, rawLetter) {
    if (this.phase !== 'manche' || this.roundOver) return { ok: false, error: 'Cette manche est déjà terminée.' };
    if (!this.players.some((p) => p.id === playerId)) return { ok: false, error: 'Joueur inconnu.' };
    const letter = normalize(String(rawLetter || '')).slice(0, 1);
    if (!isGuessableChar(letter)) return { ok: false, error: 'Lettre invalide.' };
    if (this.guessedLetters.has(letter) || this.wrongLetters.has(letter)) {
      return { ok: false, error: 'Cette lettre a déjà été proposée.' };
    }
    const occurrences = [...this._normalizedText()].filter((c) => c === letter).length;
    if (occurrences > 0) {
      this.guessedLetters.add(letter);
      const points = occurrences * POINTS_PAR_LETTRE;
      this.scores[playerId] += points;
      this.log.push(`${this._pseudoOf(playerId)} trouve la lettre ${letter} (+${points})`);
      if (this._isFullyRevealed()) this._endRound(true, playerId);
      return { ok: true, correct: true, occurrences, roundOver: this.roundOver };
    }
    this.wrongLetters.add(letter);
    this.erreurs += 1;
    this.log.push(`${this._pseudoOf(playerId)} propose ${letter} : perdu (${this.erreurs}/${this.maxErreurs})`);
    if (this.erreurs >= this.maxErreurs) this._endRound(false, null);
    return { ok: true, correct: false, roundOver: this.roundOver };
  }

  /** Tente de deviner le mot ou la phrase en entier. */
  guessFull(playerId, rawTexte) {
    if (this.phase !== 'manche' || this.roundOver) return { ok: false, error: 'Cette manche est déjà terminée.' };
    if (!this.players.some((p) => p.id === playerId)) return { ok: false, error: 'Joueur inconnu.' };
    const attempt = normalize(String(rawTexte || '')).replace(/[^A-Z]/g, '');
    if (!attempt) return { ok: false, error: 'Réponse vide.' };
    const target = this._normalizedText().replace(/[^A-Z]/g, '');
    if (attempt === target) {
      [...this._normalizedText()].forEach((c) => { if (isGuessableChar(c)) this.guessedLetters.add(c); });
      this.scores[playerId] += BONUS_MOT_COMPLET;
      this.log.push(`${this._pseudoOf(playerId)} trouve la solution complète (+${BONUS_MOT_COMPLET}) !`);
      this._endRound(true, playerId, true);
      return { ok: true, correct: true, roundOver: true };
    }
    this.wrongFullGuesses += 1;
    this.erreurs += 1;
    this.log.push(`${this._pseudoOf(playerId)} tente une solution complète : perdu (${this.erreurs}/${this.maxErreurs})`);
    if (this.erreurs >= this.maxErreurs) this._endRound(false, null);
    return { ok: true, correct: false, roundOver: this.roundOver };
  }

  /** Chaîne masquée : lettres non trouvées -> "_", espaces/apostrophes/tirets affichés tels quels. */
  getMasked() {
    const original = this.current.texte;
    const normed = normalize(original);
    return [...original].map((ch, i) => {
      const n = normed[i];
      if (!isGuessableChar(n)) return ch;
      return this.guessedLetters.has(n) ? ch : '_';
    }).join('');
  }

  getPublicView() {
    const base = {
      phase: this.phase,
      manche: this.manche,
      total: this.total,
      mode: this.mode,
      categorie: this.current?.categorie,
      maxErreurs: this.maxErreurs,
      erreurs: this.erreurs,
      lettresCorrectes: [...this.guessedLetters].sort(),
      lettresRatees: [...this.wrongLetters].sort(),
      masked: this.getMasked(),
      players: this.players.map((p) => ({ ...p, score: this.scores[p.id] })),
      log: this.log.slice(-8),
    };
    if (this.phase === 'revelation') {
      return { ...base, reponse: this.current.texte, ...this.lastResult };
    }
    if (this.phase === 'fin-partie') {
      const classement = [...this.players]
        .map((p) => ({ id: p.id, pseudo: p.pseudo, avatar: p.avatar, color: p.color, score: this.scores[p.id] }))
        .sort((a, b) => b.score - a.score);
      return { ...base, classement };
    }
    return base;
  }
}

/* ====================================================================== */
/* Interface (rendu pur à partir de la vue reçue)                         */
/* ====================================================================== */

const CSS = `
.pendu { display: grid; grid-template-columns: 1fr 260px; gap: 14px; height: 100%; min-height: 0; color: var(--text, #e8ecff); font-size: 0.95rem; width: 100%; }
.pendu__main { display: flex; flex-direction: column; gap: 12px; min-width: 0; min-height: 0; }
.pendu__panel { background: var(--glass, rgba(255,255,255,0.05)); border: 1px solid var(--glass-border, rgba(255,255,255,0.09)); border-radius: var(--radius-m, 14px); padding: 14px 16px; }
.pendu__bar { display: flex; align-items: center; gap: 12px; flex-wrap: wrap; }
.pendu__bar .tag { font-size: 0.72rem; padding: 3px 8px; border-radius: 99px; background: rgba(124,92,255,0.25); }
.pendu__progress { margin-left: auto; color: var(--text-dim, #aab); font-size: 0.85rem; }
.pendu__stage { display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 14px; min-height: 200px; }
.pendu__gallows { width: 200px; height: 180px; }
.pendu__mot { font-family: 'Courier New', monospace; font-size: 1.7rem; letter-spacing: 6px; word-spacing: 20px; text-align: center; word-break: break-word; }
.pendu__erreurs { color: var(--text-dim, #aab); font-size: 0.85rem; }
.pendu__keyboard { display: grid; grid-template-columns: repeat(9, 1fr); gap: 6px; width: 100%; max-width: 480px; margin: 0 auto; }
@media (max-width: 560px) { .pendu__keyboard { grid-template-columns: repeat(7, 1fr); } }
.pendu__key { padding: 8px 0; border-radius: 8px; border: 1px solid var(--glass-border, rgba(255,255,255,0.12)); background: rgba(255,255,255,0.05); color: var(--text, #e8ecff); font-weight: 700; font-size: 0.95rem; cursor: pointer; font-family: inherit; }
.pendu__key:hover:not(:disabled) { border-color: var(--accent-2, #29d3c2); transform: translateY(-1px); }
.pendu__key:disabled { cursor: not-allowed; opacity: 0.5; }
.pendu__key--correct { background: rgba(56, 199, 118, 0.3); border-color: #38c776; }
.pendu__key--wrong { background: rgba(255, 92, 92, 0.25); border-color: #ff5c5c; }
.pendu__guessfull { display: flex; gap: 8px; width: 100%; max-width: 480px; margin: 4px auto 0; }
.pendu__guessfull input { flex: 1; padding: 8px 12px; border-radius: 10px; border: 1px solid var(--glass-border, rgba(255,255,255,0.14)); background: rgba(255,255,255,0.06); color: var(--text, #e8ecff); font-family: inherit; font-size: 0.9rem; }
.pendu__side { display: flex; flex-direction: column; gap: 12px; min-height: 0; overflow: auto; }
.pendu__player { display: flex; align-items: center; gap: 8px; padding: 6px 4px; border-bottom: 1px solid rgba(255,255,255,0.06); }
.pendu__player .pts { margin-left: auto; font-variant-numeric: tabular-nums; font-weight: 700; }
.pendu__log { font-size: 0.8rem; color: var(--text-dim, #aab); max-height: 160px; overflow: auto; display: flex; flex-direction: column; gap: 4px; }
.pendu__config { display: flex; flex-direction: column; gap: 16px; max-width: 560px; margin: 0 auto; }
.pendu__config label.title { font-weight: 700; display: block; margin-bottom: 8px; }
.pendu__chipgrid { display: flex; flex-wrap: wrap; gap: 8px; }
.pendu__chip { padding: 6px 14px; border-radius: 99px; border: 1px solid var(--glass-border, rgba(255,255,255,0.14)); background: rgba(255,255,255,0.04); color: var(--text, #e8ecff); cursor: pointer; font-size: 0.85rem; font-family: inherit; }
.pendu__chip--active { background: rgba(124,92,255,0.35); border-color: var(--accent, #7c5cff); }
.pendu__hint { color: var(--text-dim, #aab); font-size: 0.78rem; }
.pendu__final-row { display: flex; align-items: center; gap: 10px; padding: 8px 10px; }
.pendu__final-row .rank { font-weight: 700; width: 28px; }
.pendu__final-row .pts { margin-left: auto; font-weight: 700; font-variant-numeric: tabular-nums; }
.pendu__result { font-size: 1.1rem; font-weight: 700; text-align: center; }
.pendu__reponse { font-family: 'Courier New', monospace; font-size: 1.3rem; text-align: center; letter-spacing: 3px; }
@media (max-width: 1000px) { .pendu { grid-template-columns: 1fr; } }
`;

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

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
    node.append(typeof c === 'string' ? document.createTextNode(c) : c);
  });
  return node;
}

const NS = 'http://www.w3.org/2000/svg';
function svgEl(tag, attrs = {}) {
  const node = document.createElementNS(NS, tag);
  Object.entries(attrs).forEach(([k, v]) => node.setAttribute(k, v));
  return node;
}

/** Dessine la potence (fixe) + le pendu (progressif, jusqu'à 10 parties). */
function buildGallowsSvg(erreurs, maxErreurs) {
  const svg = svgEl('svg', { viewBox: '0 0 200 180', class: 'pendu__gallows' });
  const stroke = { stroke: 'var(--text, #e8ecff)', 'stroke-width': '4', 'stroke-linecap': 'round', fill: 'none' };

  // Potence : toujours entièrement visible.
  svg.append(svgEl('line', { x1: 20, y1: 170, x2: 100, y2: 170, ...stroke }));
  svg.append(svgEl('line', { x1: 45, y1: 170, x2: 45, y2: 15, ...stroke }));
  svg.append(svgEl('line', { x1: 45, y1: 15, x2: 130, y2: 15, ...stroke }));
  svg.append(svgEl('line', { x1: 130, y1: 15, x2: 130, y2: 35, ...stroke }));

  const totalParts = 10;
  const shown = Math.min(totalParts, Math.round((erreurs / Math.max(1, maxErreurs)) * totalParts));
  const parts = [
    () => svgEl('circle', { cx: 130, cy: 50, r: 15, ...stroke }), // 1: tête
    () => svgEl('line', { x1: 130, y1: 65, x2: 130, y2: 110, ...stroke }), // 2: torse
    () => svgEl('line', { x1: 130, y1: 75, x2: 110, y2: 95, ...stroke }), // 3: bras gauche
    () => svgEl('line', { x1: 130, y1: 75, x2: 150, y2: 95, ...stroke }), // 4: bras droit
    () => svgEl('line', { x1: 130, y1: 110, x2: 113, y2: 145, ...stroke }), // 5: jambe gauche
    () => svgEl('line', { x1: 130, y1: 110, x2: 147, y2: 145, ...stroke }), // 6: jambe droite
    () => svgEl('line', { x1: 124, y1: 46, x2: 130, y2: 52, ...stroke, 'stroke-width': '3' }), // 7: oeil gauche
    () => svgEl('line', { x1: 130, y1: 46, x2: 136, y2: 52, ...stroke, 'stroke-width': '3' }), // 8: oeil droit (croix)
    () => svgEl('path', { d: 'M 123 60 Q 130 55 137 60', ...stroke, 'stroke-width': '3' }), // 9: bouche triste
    () => svgEl('path', { d: 'M 118 33 Q 130 20 142 33 Z', fill: 'var(--text, #e8ecff)', stroke: 'none' }), // 10: chapeau
  ];
  for (let i = 0; i < shown; i += 1) svg.append(parts[i]());
  return svg;
}

class HangmanUI {
  constructor(container, context) {
    this.container = container;
    this.ctx = context;
    this.isHost = context.me.id === context.hostId;
    this.engine = null;
    this.unsubscribe = null;
    this.revealTimer = null;
    this.config = {
      mode: 'mot',
      maxErreurs: 8,
      nombreManches: 5,
      categoriesMots: new Set(allCategoriesMots()),
      categoriesPhrases: new Set(allCategoriesPhrases()),
    };
    this._keydownHandler = null;
  }

  mount() {
    this.styleEl = h('style', {}, CSS);
    this.root = h('div', { className: 'pendu' });
    this.container.append(this.styleEl, this.root);

    if (this.isHost) {
      this.renderConfig();
    } else {
      this.unsubscribe = this.ctx.onMessage(({ from, data }) => {
        if (from !== this.ctx.hostId) return;
        if (data?.t === 'view') this.render(data.view);
        else if (data?.t === 'error') this.flashError(data.message);
      });
      this.renderMessage('⏳ En attente que l\'hôte configure la partie…');
    }
  }

  /* -------- côté Host -------- */

  hostHandle(playerId, data) {
    if (!this.engine) return;
    if (data?.t === 'lettre') {
      const result = this.engine.guessLetter(playerId, data.lettre);
      if (!result.ok) { this.ctx.sendMessage({ t: 'error', message: result.error }, playerId); return; }
      this.broadcast();
      if (result.roundOver) this.scheduleAutoNext();
    } else if (data?.t === 'complet') {
      const result = this.engine.guessFull(playerId, data.texte);
      if (!result.ok) { this.ctx.sendMessage({ t: 'error', message: result.error }, playerId); return; }
      this.broadcast();
      if (result.roundOver) this.scheduleAutoNext();
    }
  }

  actLetter(letter) {
    const view = this.view;
    if (!view || view.phase !== 'manche') return;
    if (this.isHost) {
      const result = this.engine.guessLetter(this.ctx.me.id, letter);
      if (!result.ok) return;
      this.broadcast();
      if (result.roundOver) this.scheduleAutoNext();
    } else {
      this.ctx.sendMessage({ t: 'lettre', lettre: letter }, this.ctx.hostId);
    }
  }

  actFull(texte) {
    const view = this.view;
    if (!view || view.phase !== 'manche' || !texte) return;
    if (this.isHost) {
      const result = this.engine.guessFull(this.ctx.me.id, texte);
      if (!result.ok) return;
      this.broadcast();
      if (result.roundOver) this.scheduleAutoNext();
    } else {
      this.ctx.sendMessage({ t: 'complet', texte }, this.ctx.hostId);
    }
  }

  startGame() {
    const categories = this.config.mode === 'phrase' ? [...this.config.categoriesPhrases] : [...this.config.categoriesMots];
    const items = pickItems({ mode: this.config.mode, categories, nombre: this.config.nombreManches });
    if (!items.length) { this.flashError('Aucun mot ou phrase ne correspond à cette configuration.'); return; }
    try {
      this.engine = new HangmanEngine(this.ctx.players, { mode: this.config.mode, items, maxErreurs: this.config.maxErreurs });
    } catch (error) {
      this.renderMessage(`⚠️ ${error.message}`);
      return;
    }
    this.unsubscribe = this.ctx.onMessage(({ from, data }) => this.hostHandle(from, data));
    this.engine.start();
    this.broadcast();
  }

  scheduleAutoNext() {
    clearTimeout(this.revealTimer);
    this.revealTimer = setTimeout(() => this.hostNext(), DELAI_MANCHE_SUIVANTE_MS);
  }

  hostNext() {
    clearTimeout(this.revealTimer);
    const r = this.engine.nextManche();
    this.broadcast();
    return r;
  }

  broadcast() {
    const view = this.engine.getPublicView();
    this.ctx.sendMessage({ t: 'view', view });
    this.render(view);
  }

  confirmEnd() {
    clearTimeout(this.revealTimer);
    const classement = this.engine
      ? [...this.engine.players].map((p) => ({ pseudo: p.pseudo, score: this.engine.scores[p.id] })).sort((a, b) => b.score - a.score)
      : [];
    const result = { summary: classement[0] ? `🏆 ${classement[0].pseudo} remporte la partie !` : null, classement };
    this.ctx.onEnd(result);
  }

  /* -------- rendu -------- */

  flashError(message) {
    if (this.errorEl) {
      this.errorEl.textContent = message ?? '';
      clearTimeout(this.errorTimer);
      this.errorTimer = setTimeout(() => { if (this.errorEl) this.errorEl.textContent = ''; }, 3000);
    }
  }

  renderMessage(text) {
    this.root.replaceChildren(h('div', { className: 'pendu__panel', style: 'margin:auto; max-width:480px; text-align:center;' }, text));
  }

  renderConfig() {
    const setMode = (mode) => { this.config.mode = mode; this.renderConfig(); };
    const toggleCatMot = (c) => { this.config.categoriesMots.has(c) ? this.config.categoriesMots.delete(c) : this.config.categoriesMots.add(c); this.renderConfig(); };
    const setAllCatMots = (on) => { this.config.categoriesMots = on ? new Set(allCategoriesMots()) : new Set(); this.renderConfig(); };

    const categories = this.config.mode === 'phrase' ? [...this.config.categoriesPhrases] : [...this.config.categoriesMots];
    const poolSize = pickItems({ mode: this.config.mode, categories, nombre: 999999 }).length;

    const panel = h('div', { className: 'pendu__panel pendu__config' }, [
      h('h2', { style: 'margin:0;text-align:center;' }, '🔤 Configurer le Pendu'),

      h('div', {}, [
        h('label', { className: 'title' }, 'Mode de jeu'),
        h('div', { className: 'pendu__chipgrid' }, [
          h('button', { type: 'button', className: `pendu__chip${this.config.mode === 'mot' ? ' pendu__chip--active' : ''}`, onClick: () => setMode('mot') }, 'Mot'),
          h('button', { type: 'button', className: `pendu__chip${this.config.mode === 'phrase' ? ' pendu__chip--active' : ''}`, onClick: () => setMode('phrase') }, 'Phrase'),
        ]),
      ]),

      h('div', {}, [
        h('label', { className: 'title' }, "Nombre d'erreurs autorisées"),
        h('div', { className: 'pendu__chipgrid' }, MAX_ERREURS_DISPONIBLES.map((n) => h('button', {
          type: 'button',
          className: `pendu__chip${this.config.maxErreurs === n ? ' pendu__chip--active' : ''}`,
          onClick: () => { this.config.maxErreurs = n; this.renderConfig(); },
        }, String(n)))),
        h('div', { className: 'pendu__hint' }, 'Le pendu classique se joue en 6 erreurs — les options 8, 10 et 12 laissent plus de marge, utile pour le mode Phrase.'),
      ]),

      h('div', {}, [
        h('label', { className: 'title' }, 'Nombre de manches'),
        h('div', { className: 'pendu__chipgrid' }, NB_MANCHES_DISPONIBLES.map((n) => h('button', {
          type: 'button',
          className: `pendu__chip${this.config.nombreManches === n ? ' pendu__chip--active' : ''}`,
          onClick: () => { this.config.nombreManches = n; this.renderConfig(); },
        }, String(n)))),
      ]),

      this.config.mode === 'mot' ? h('div', {}, [
        h('label', { className: 'title' }, `Catégories de mots (${this.config.categoriesMots.size}/${allCategoriesMots().length})`),
        h('div', { className: 'pendu__chipgrid' }, [
          h('button', { type: 'button', className: 'pendu__chip', onClick: () => setAllCatMots(true) }, 'Tout cocher'),
          h('button', { type: 'button', className: 'pendu__chip', onClick: () => setAllCatMots(false) }, 'Tout décocher'),
          ...allCategoriesMots().map((c) => h('button', {
            type: 'button',
            className: `pendu__chip${this.config.categoriesMots.has(c) ? ' pendu__chip--active' : ''}`,
            onClick: () => toggleCatMot(c),
          }, c)),
        ]),
      ]) : h('div', { className: 'pendu__hint' }, 'Mode Phrase : proverbes, expressions et titres mélangés.'),

      h('div', { className: 'pendu__hint' }, `${poolSize} entrée(s) disponible(s) avec ces filtres.`),
      this.errorEl = h('div', { style: 'color: var(--warning, #ffb454); font-size: 0.85rem; text-align:center;' }, ''),

      h('div', { style: 'display:flex; justify-content:center;' }, [
        h('button', {
          className: 'btn btn--primary',
          disabled: poolSize === 0,
          onClick: () => this.startGame(),
        }, '▶️ Lancer la partie'),
      ]),
    ]);

    this.root.replaceChildren(panel);
  }

  render(view) {
    this.view = view;

    const bar = h('div', { className: 'pendu__panel pendu__bar' }, [
      h('strong', {}, '🔤 Le Pendu'),
      view.phase !== 'fin-partie' ? h('span', { className: 'tag' }, `${view.mode === 'phrase' ? 'Phrase' : 'Mot'}${view.categorie ? ' · ' + view.categorie : ''}`) : null,
      h('span', { className: 'pendu__progress' },
        view.phase === 'fin-partie' ? 'Partie terminée' : `Manche ${view.manche + 1} / ${view.total}`),
    ]);

    const main = h('div', { className: 'pendu__panel pendu__stage' });
    if (view.phase === 'manche') main.append(...this.renderManche(view));
    else if (view.phase === 'revelation') main.append(...this.renderRevelation(view));
    else if (view.phase === 'fin-partie') main.append(...this.renderFinPartie(view));

    const side = h('div', { className: 'pendu__side' }, [
      h('div', { className: 'pendu__panel' }, [
        h('strong', {}, 'Joueurs'),
        ...view.players.slice().sort((a, b) => b.score - a.score).map((p) => h('div', { className: 'pendu__player' }, [
          h('span', {}, `${p.avatar ?? '🎮'} ${p.pseudo}`),
          h('span', { className: 'pts' }, String(p.score)),
        ])),
      ]),
      h('div', { className: 'pendu__panel' }, [
        h('strong', {}, 'Déroulé'),
        h('div', { className: 'pendu__log' }, [...view.log].reverse().map((l) => h('div', {}, l))),
      ]),
      ...(this.isHost && view.phase !== 'fin-partie'
        ? [h('button', { className: 'btn btn--ghost btn--small', onClick: () => this.confirmEnd() }, '🛑 Terminer la partie')]
        : []),
    ]);

    this.root.replaceChildren(h('div', { className: 'pendu__main' }, [bar, main]), side);
    this.setupKeyboardListener(view);
  }

  renderManche(view) {
    const guessed = new Set(view.lettresCorrectes);
    const wrong = new Set(view.lettresRatees);
    let inputEl;
    const submitFull = () => { const v = inputEl.value.trim(); if (v) { this.actFull(v); inputEl.value = ''; } };

    return [
      buildGallowsSvg(view.erreurs, view.maxErreurs),
      h('div', { className: 'pendu__mot' }, view.masked),
      h('div', { className: 'pendu__erreurs' }, `Erreurs : ${view.erreurs} / ${view.maxErreurs}`),
      h('div', { className: 'pendu__keyboard' }, ALPHABET.map((letter) => {
        let cls = 'pendu__key';
        if (guessed.has(letter)) cls += ' pendu__key--correct';
        else if (wrong.has(letter)) cls += ' pendu__key--wrong';
        const disabled = guessed.has(letter) || wrong.has(letter);
        return h('button', { type: 'button', className: cls, disabled, onClick: () => this.actLetter(letter) }, letter);
      })),
      h('div', { className: 'pendu__guessfull' }, [
        inputEl = h('input', { type: 'text', placeholder: view.mode === 'phrase' ? 'Deviner la phrase entière…' : 'Deviner le mot entier…', onKeydown: (e) => { if (e.key === 'Enter') submitFull(); } }),
        h('button', { className: 'btn btn--primary btn--small', onClick: submitFull }, 'Valider'),
      ]),
    ];
  }

  renderRevelation(view) {
    return [
      h('div', { className: 'pendu__result' }, view.gagne
        ? (view.viaMotComplet ? `🎉 ${view.winnerPseudo} a trouvé la solution complète !` : `🎉 ${view.winnerPseudo} a fait tomber le dernier mot !`)
        : '💀 Personne n\'a trouvé à temps…'),
      buildGallowsSvg(view.erreurs, view.maxErreurs),
      h('div', { className: 'pendu__reponse' }, view.reponse),
      h('div', { className: 'pendu__hint' }, 'Manche suivante dans quelques secondes…'),
    ];
  }

  renderFinPartie(view) {
    return [
      h('div', { style: 'font-size:2.2rem;' }, '🏆'),
      h('h2', {}, 'Classement final'),
      h('table', {}, view.classement.map((p, i) => h('tr', { className: 'pendu__final-row' }, [
        h('td', { className: 'rank' }, `${i + 1}.`),
        h('td', {}, `${p.avatar ?? '🎮'} ${p.pseudo}`),
        h('td', { className: 'pts' }, String(p.score)),
      ]))),
      this.isHost
        ? h('button', { className: 'btn btn--primary', onClick: () => this.confirmEnd() }, 'Retour au salon')
        : h('div', { className: 'pendu__hint' }, 'En attente de l\'hôte pour revenir au salon…'),
    ];
  }

  /** Permet de proposer une lettre au clavier physique pendant une manche. */
  setupKeyboardListener(view) {
    if (this._keydownHandler) { window.removeEventListener('keydown', this._keydownHandler); this._keydownHandler = null; }
    if (view.phase !== 'manche') return;
    this._keydownHandler = (e) => {
      if (e.target && ['INPUT', 'TEXTAREA'].includes(e.target.tagName)) return;
      const letter = normalize(e.key).slice(0, 1);
      if (/[A-Z]/.test(letter) && e.key.length === 1) this.actLetter(letter);
    };
    window.addEventListener('keydown', this._keydownHandler);
  }

  unmount() {
    this.unsubscribe?.();
    clearTimeout(this.revealTimer);
    clearTimeout(this.errorTimer);
    if (this._keydownHandler) window.removeEventListener('keydown', this._keydownHandler);
    this.styleEl?.remove();
    this.root?.remove();
  }
}

/* ====================================================================== */
/* Contrat de module Arcade                                               */
/* ====================================================================== */

let instance = null;

export default {
  async mount(container, context) {
    instance = new HangmanUI(container, context);
    instance.mount();
  },
  async unmount() {
    instance?.unmount();
    instance = null;
  },
};
