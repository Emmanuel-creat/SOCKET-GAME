/**
 * Quiz — module de jeu pour la plateforme Arcade.
 *
 * Architecture « Host autoritaire » (identique au Tarot) :
 *  - Le client du Host exécute le moteur (QuizEngine) : choix des questions,
 *    minuteur, réception des réponses, calcul des scores.
 *  - Les autres clients envoient leur réponse au Host via context.sendMessage
 *    (relais game:message du moteur, qui ne lit jamais le contenu).
 *  - Contrairement au Tarot, il n'y a pas d'information cachée par joueur :
 *    tout le monde reçoit exactement la même vue (sauf pendant la phase
 *    « question », où l'index de la bonne réponse n'est jamais envoyé).
 *
 * Règles implémentées :
 *  - L'Host configure la partie avant de lancer : nombre de questions,
 *    catégories, difficulté, durée par question.
 *  - Chaque question propose 4 réponses ; un temps limité est accordé.
 *  - Points : 0 si faux ou pas de réponse, sinon entre 300 et 1000 points
 *    selon la rapidité (plus vite = plus de points).
 *  - Révélation automatique dès que tout le monde a répondu, ou à la fin
 *    du temps imparti. Avance automatique vers la question suivante après
 *    quelques secondes (l'Host peut aussi passer manuellement).
 *  - Classement final affiché en fin de partie.
 *
 * Banque de questions : voir questions.js (fichier de données pur, à
 * modifier librement pour ajouter/retirer/corriger des questions).
 */

import { QUESTIONS } from './questions.js';

/* ====================================================================== */
/* Utilitaires                                                            */
/* ====================================================================== */

/** Mélange de Fisher-Yates (non destructif). */
function shuffled(arr, rng = Math.random) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i -= 1) {
    const j = Math.floor(rng() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const DIFF_LABEL = { 1: 'Facile', 2: 'Moyen', 3: 'Difficile' };
const DUREES_DISPONIBLES = [10, 15, 20, 30];
const NB_QUESTIONS_DISPONIBLES = [5, 10, 15, 20, 30];

/** Points gagnés pour une bonne réponse selon la rapidité (300 → 1000). */
function scoreFor(timeUsedMs, dureeMs) {
  const frac = Math.max(0, Math.min(1, 1 - timeUsedMs / dureeMs));
  return Math.round((300 + 700 * frac) / 10) * 10;
}

/* ====================================================================== */
/* Moteur de règles (pur : aucune dépendance DOM/réseau)                  */
/* ====================================================================== */

export class QuizEngine {
  /**
   * @param {{id: string, pseudo: string, avatar?: string, color?: string}[]} players
   * @param {object} config { questions: object[], dureeMs: number }
   */
  constructor(players, config) {
    if (!config?.questions?.length) {
      throw new Error('Aucune question ne correspond aux filtres choisis.');
    }
    this.players = players.map((p) => ({ id: p.id, pseudo: p.pseudo, avatar: p.avatar, color: p.color }));
    this.questions = config.questions;
    this.dureeMs = config.dureeMs;
    this.scores = Object.fromEntries(this.players.map((p) => [p.id, 0]));
    this.index = -1;
    this.phase = 'question';
    this.answers = new Map(); // playerId -> { optionIndex, atMs }
    this.startedAt = 0;
    this.finAt = 0;
    this.log = [];
  }

  get total() { return this.questions.length; }
  get current() { return this.questions[this.index]; }

  /** Démarre la première question. */
  start() {
    this.index = -1;
    return this.nextQuestion();
  }

  /** Passe à la question suivante, ou termine la partie si c'était la dernière. */
  nextQuestion() {
    this.index += 1;
    if (this.index >= this.total) {
      this.phase = 'fin-partie';
      return { ok: true, done: true };
    }
    this.phase = 'question';
    this.answers = new Map();
    this.startedAt = Date.now();
    this.finAt = this.startedAt + this.dureeMs;
    return { ok: true, done: false };
  }

  /**
   * Enregistre la réponse d'un joueur (une seule prise en compte par question).
   * @returns {{ok: boolean, allAnswered?: boolean, error?: string}}
   */
  submitAnswer(playerId, optionIndex) {
    if (this.phase !== 'question') return { ok: false, error: 'Cette question est déjà terminée.' };
    if (!this.players.some((p) => p.id === playerId)) return { ok: false, error: 'Joueur inconnu.' };
    if (this.answers.has(playerId)) return { ok: false, error: 'Réponse déjà enregistrée.' };
    if (!Number.isInteger(optionIndex) || optionIndex < 0 || optionIndex > 3) {
      return { ok: false, error: 'Réponse invalide.' };
    }
    this.answers.set(playerId, { optionIndex, atMs: Date.now() });
    return { ok: true, allAnswered: this.answers.size >= this.players.length };
  }

  /** Calcule les points de la question en cours et passe en phase « révélation ». */
  reveal() {
    if (this.phase !== 'question') return;
    const q = this.current;
    const breakdown = [];
    for (const p of this.players) {
      const a = this.answers.get(p.id);
      const correct = a ? a.optionIndex === q.reponse : false;
      const points = correct ? scoreFor(a.atMs - this.startedAt, this.dureeMs) : 0;
      this.scores[p.id] += points;
      breakdown.push({
        id: p.id,
        pseudo: p.pseudo,
        optionIndex: a ? a.optionIndex : null,
        correct,
        points,
        total: this.scores[p.id],
      });
    }
    breakdown.sort((a, b) => b.total - a.total);
    this.lastBreakdown = breakdown;
    this.phase = 'revelation';

    const bons = breakdown.filter((b) => b.correct).length;
    this.log.push(`Question ${this.index + 1}/${this.total} : ${bons}/${this.players.length} bonne(s) réponse(s).`);
  }

  /** Vue publique unique (identique pour tous les clients, aucune info secrète divulguée). */
  getPublicView() {
    const base = {
      phase: this.phase,
      index: this.index,
      total: this.total,
      players: this.players.map((p) => ({ ...p, score: this.scores[p.id] })),
      answeredCount: this.answers.size,
      totalPlayers: this.players.length,
      log: this.log.slice(-6),
    };
    if (this.phase === 'question') {
      const q = this.current;
      return {
        ...base,
        categorie: q.categorie,
        difficulte: q.difficulte,
        question: q.question,
        options: q.options,
        finAt: this.finAt,
        dureeMs: this.dureeMs,
      };
    }
    if (this.phase === 'revelation') {
      const q = this.current;
      return {
        ...base,
        categorie: q.categorie,
        difficulte: q.difficulte,
        question: q.question,
        options: q.options,
        correctIndex: q.reponse,
        breakdown: this.lastBreakdown,
      };
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
/* Sélection des questions à partir de la banque + de la configuration    */
/* ====================================================================== */

export function allCategories() {
  return [...new Set(QUESTIONS.map((q) => q.categorie))].sort((a, b) => a.localeCompare(b, 'fr'));
}

export function pickQuestions({ categories, difficultes, nombre }) {
  const catSet = new Set(categories);
  const diffSet = new Set(difficultes);
  const pool = QUESTIONS.filter((q) => catSet.has(q.categorie) && diffSet.has(q.difficulte));
  const pick = shuffled(pool).slice(0, nombre);
  return pick;
}

/* ====================================================================== */
/* Interface (rendu pur à partir de la vue reçue)                         */
/* ====================================================================== */

const CSS = `
.quiz { display: grid; grid-template-columns: 1fr 260px; gap: 14px; height: 100%; min-height: 0; color: var(--text, #e8ecff); font-size: 0.95rem; width: 100%; }
.quiz__main { display: flex; flex-direction: column; gap: 12px; min-width: 0; min-height: 0; }
.quiz__panel { background: var(--glass, rgba(255,255,255,0.05)); border: 1px solid var(--glass-border, rgba(255,255,255,0.09)); border-radius: var(--radius-m, 14px); padding: 14px 16px; }
.quiz__bar { display: flex; align-items: center; gap: 12px; flex-wrap: wrap; }
.quiz__bar .tag { font-size: 0.72rem; padding: 3px 8px; border-radius: 99px; background: rgba(124,92,255,0.25); }
.quiz__progress { margin-left: auto; color: var(--text-dim, #aab); font-size: 0.85rem; }
.quiz__timerwrap { height: 8px; border-radius: 99px; background: rgba(255,255,255,0.08); overflow: hidden; }
.quiz__timerbar { height: 100%; background: linear-gradient(90deg, var(--accent-2,#29d3c2), var(--accent,#7c5cff)); transition: width 0.25s linear; }
.quiz__question { flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 18px; min-height: 220px; text-align: center; }
.quiz__question h2 { margin: 0; font-size: 1.35rem; line-height: 1.4; max-width: 640px; }
.quiz__options { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; width: 100%; max-width: 640px; }
@media (max-width: 620px) { .quiz__options { grid-template-columns: 1fr; } }
.quiz__opt { padding: 14px 16px; border-radius: var(--radius-m, 14px); border: 1px solid var(--glass-border, rgba(255,255,255,0.12)); background: rgba(255,255,255,0.05); color: var(--text, #e8ecff); font-size: 1rem; font-weight: 600; cursor: pointer; text-align: left; transition: transform .1s ease, background .15s ease, border-color .15s ease; font-family: inherit; }
.quiz__opt:hover:not(:disabled) { transform: translateY(-2px); border-color: var(--accent-2, #29d3c2); }
.quiz__opt:disabled { cursor: not-allowed; opacity: 0.75; }
.quiz__opt--picked { border-color: var(--accent-2, #29d3c2); box-shadow: 0 0 0 2px rgba(41,211,194,0.4); }
.quiz__opt--correct { background: rgba(56, 199, 118, 0.25); border-color: #38c776; }
.quiz__opt--wrong { background: rgba(255, 92, 92, 0.2); border-color: #ff5c5c; }
.quiz__waiting { color: var(--text-dim, #aab); font-size: 0.85rem; }
.quiz__side { display: flex; flex-direction: column; gap: 12px; min-height: 0; overflow: auto; }
.quiz__player { display: flex; align-items: center; gap: 8px; padding: 6px 4px; border-bottom: 1px solid rgba(255,255,255,0.06); }
.quiz__player .pts { margin-left: auto; font-variant-numeric: tabular-nums; font-weight: 700; }
.quiz__player .status { font-size: 0.9rem; }
.quiz__log { font-size: 0.8rem; color: var(--text-dim, #aab); max-height: 160px; overflow: auto; display: flex; flex-direction: column; gap: 4px; }
.quiz__breakdown { display: flex; flex-direction: column; gap: 6px; width: 100%; max-width: 640px; font-size: 0.85rem; }
.quiz__breakdown-row { display: flex; align-items: center; gap: 8px; padding: 6px 10px; border-radius: 10px; background: rgba(255,255,255,0.04); }
.quiz__breakdown-row .pts { margin-left: auto; font-variant-numeric: tabular-nums; }
.quiz__breakdown-row.correct { border-left: 3px solid #38c776; }
.quiz__breakdown-row.wrong { border-left: 3px solid #ff5c5c; }
.quiz table { width: 100%; border-collapse: collapse; font-size: 0.9rem; }
.quiz td, .quiz th { padding: 6px 10px; text-align: left; border-bottom: 1px solid rgba(255,255,255,0.07); }
.quiz__config { display: flex; flex-direction: column; gap: 16px; max-width: 560px; margin: 0 auto; }
.quiz__config label.title { font-weight: 700; display: block; margin-bottom: 8px; }
.quiz__chipgrid { display: flex; flex-wrap: wrap; gap: 8px; }
.quiz__chip { padding: 6px 14px; border-radius: 99px; border: 1px solid var(--glass-border, rgba(255,255,255,0.14)); background: rgba(255,255,255,0.04); color: var(--text, #e8ecff); cursor: pointer; font-size: 0.85rem; font-family: inherit; }
.quiz__chip--active { background: rgba(124,92,255,0.35); border-color: var(--accent, #7c5cff); }
.quiz__hint { color: var(--text-dim, #aab); font-size: 0.78rem; }
.quiz__final-row { display: flex; align-items: center; gap: 10px; padding: 8px 10px; }
.quiz__final-row .rank { font-weight: 700; width: 28px; }
.quiz__final-row .pts { margin-left: auto; font-weight: 700; font-variant-numeric: tabular-nums; }
@media (max-width: 1000px) { .quiz { grid-template-columns: 1fr; } }
`;

/** Petite fabrique DOM locale (le module est autonome, sans import du cœur). */
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

class QuizUI {
  constructor(container, context) {
    this.container = container;
    this.ctx = context;
    this.isHost = context.me.id === context.hostId;
    this.engine = null;
    this.unsubscribe = null;
    this.myAnswerForIndex = null;
    this.myAnswerOptionIndex = null;
    this.config = {
      nombre: 10,
      duree: 20,
      categories: new Set(allCategories()),
      difficultes: new Set([1, 2, 3]),
    };
    this.timerRAF = null;
    this.revealTimer = null;
    this.autoAdvanceAt = 0;
  }

  mount() {
    this.styleEl = h('style', {}, CSS);
    this.root = h('div', { className: 'quiz' });
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

  /* -------- côté Host : configuration puis moteur + diffusion -------- */

  hostHandle(playerId, data) {
    if (data?.t === 'answer') {
      const result = this.engine.submitAnswer(playerId, data.optionIndex);
      if (!result.ok) {
        this.ctx.sendMessage({ t: 'error', message: result.error }, playerId);
        return;
      }
      if (result.allAnswered) this.hostReveal();
      else this.broadcast();
    }
  }

  act(optionIndex) {
    const view = this.view;
    if (!view || view.phase !== 'question') return;
    if (this.myAnswerForIndex === view.index) return; // déjà répondu à cette question
    this.myAnswerForIndex = view.index;
    this.myAnswerOptionIndex = optionIndex;
    if (this.isHost) {
      const result = this.engine.submitAnswer(this.ctx.me.id, optionIndex);
      if (!result.ok) { this.myAnswerForIndex = null; return; }
      if (result.allAnswered) this.hostReveal();
      else this.broadcast();
    } else {
      this.ctx.sendMessage({ t: 'answer', optionIndex }, this.ctx.hostId);
      this.render(view); // retour visuel immédiat : le choix est verrouillé côté client
    }
  }

  startGame() {
    const nombre = this.config.nombre;
    const questions = pickQuestions({
      categories: [...this.config.categories],
      difficultes: [...this.config.difficultes],
      nombre,
    });
    if (!questions.length) {
      this.flashError('Aucune question ne correspond à cette configuration.');
      return;
    }
    try {
      this.engine = new QuizEngine(this.ctx.players, { questions, dureeMs: this.config.duree * 1000 });
    } catch (error) {
      this.renderMessage(`⚠️ ${error.message}`);
      return;
    }
    this.unsubscribe = this.ctx.onMessage(({ from, data }) => this.hostHandle(from, data));
    this.engine.start();
    this.broadcast();
    this.scheduleAutoReveal();
  }

  scheduleAutoReveal() {
    clearTimeout(this.revealTimer);
    if (this.engine.phase !== 'question') return;
    const delay = Math.max(0, this.engine.finAt - Date.now()) + 250;
    this.revealTimer = setTimeout(() => this.hostReveal(), delay);
  }

  hostReveal() {
    clearTimeout(this.revealTimer);
    if (this.engine.phase !== 'question') return;
    this.engine.reveal();
    this.broadcast();
    this.revealTimer = setTimeout(() => this.hostNext(), 6000);
  }

  hostNext() {
    clearTimeout(this.revealTimer);
    const r = this.engine.nextQuestion();
    this.broadcast();
    if (!r.done) this.scheduleAutoReveal();
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
    const result = { summary: classement[0] ? `🏆 ${classement[0].pseudo} remporte le quiz !` : null, classement };
    this.ctx.onEnd(result);
  }

  /* -------- rendu -------- */

  flashError(message) {
    this.errorEl && (this.errorEl.textContent = message ?? '');
    clearTimeout(this.errorTimer);
    this.errorTimer = setTimeout(() => { if (this.errorEl) this.errorEl.textContent = ''; }, 3000);
  }

  renderMessage(text) {
    this.root.replaceChildren(h('div', { className: 'quiz__panel', style: 'margin:auto; max-width:480px; text-align:center;' }, text));
  }

  renderConfig() {
    const cats = allCategories();
    const toggleCat = (c) => { this.config.categories.has(c) ? this.config.categories.delete(c) : this.config.categories.add(c); this.renderConfig(); };
    const toggleDiff = (d) => { this.config.difficultes.has(d) ? this.config.difficultes.delete(d) : this.config.difficultes.add(d); this.renderConfig(); };
    const setAllCats = (on) => { this.config.categories = on ? new Set(cats) : new Set(); this.renderConfig(); };

    const poolSize = pickQuestions({
      categories: [...this.config.categories],
      difficultes: [...this.config.difficultes],
      nombre: 999999,
    }).length;

    const panel = h('div', { className: 'quiz__panel quiz__config' }, [
      h('h2', { style: 'margin:0;text-align:center;' }, '🧠 Configurer le Quiz'),

      h('div', {}, [
        h('label', { className: 'title' }, 'Nombre de questions'),
        h('div', { className: 'quiz__chipgrid' }, NB_QUESTIONS_DISPONIBLES.map((n) => h('button', {
          type: 'button',
          className: `quiz__chip${this.config.nombre === n ? ' quiz__chip--active' : ''}`,
          onClick: () => { this.config.nombre = n; this.renderConfig(); },
        }, String(n)))),
      ]),

      h('div', {}, [
        h('label', { className: 'title' }, 'Durée par question'),
        h('div', { className: 'quiz__chipgrid' }, DUREES_DISPONIBLES.map((d) => h('button', {
          type: 'button',
          className: `quiz__chip${this.config.duree === d ? ' quiz__chip--active' : ''}`,
          onClick: () => { this.config.duree = d; this.renderConfig(); },
        }, `${d}s`))),
      ]),

      h('div', {}, [
        h('label', { className: 'title' }, 'Difficulté'),
        h('div', { className: 'quiz__chipgrid' }, [1, 2, 3].map((d) => h('button', {
          type: 'button',
          className: `quiz__chip${this.config.difficultes.has(d) ? ' quiz__chip--active' : ''}`,
          onClick: () => toggleDiff(d),
        }, DIFF_LABEL[d]))),
      ]),

      h('div', {}, [
        h('label', { className: 'title' }, `Catégories (${this.config.categories.size}/${cats.length})`),
        h('div', { className: 'quiz__chipgrid' }, [
          h('button', { type: 'button', className: 'quiz__chip', onClick: () => setAllCats(true) }, 'Tout cocher'),
          h('button', { type: 'button', className: 'quiz__chip', onClick: () => setAllCats(false) }, 'Tout décocher'),
          ...cats.map((c) => h('button', {
            type: 'button',
            className: `quiz__chip${this.config.categories.has(c) ? ' quiz__chip--active' : ''}`,
            onClick: () => toggleCat(c),
          }, c)),
        ]),
      ]),

      h('div', { className: 'quiz__hint' }, `${poolSize} question(s) disponible(s) avec ces filtres.`),
      this.errorEl = h('div', { style: 'color: var(--warning, #ffb454); font-size: 0.85rem; text-align:center;' }, ''),

      h('div', { style: 'display:flex; justify-content:center;' }, [
        h('button', {
          className: 'btn btn--primary',
          disabled: poolSize === 0,
          onClick: () => this.startGame(),
        }, '▶️ Lancer le quiz'),
      ]),
    ]);

    this.root.replaceChildren(panel);
  }

  render(view) {
    this.view = view;

    const bar = h('div', { className: 'quiz__panel quiz__bar' }, [
      h('strong', {}, '🧠 Quiz'),
      view.phase !== 'fin-partie'
        ? h('span', { className: 'tag' }, `${DIFF_LABEL[view.difficulte] ?? ''} · ${view.categorie ?? ''}`)
        : null,
      h('span', { className: 'quiz__progress' },
        view.phase === 'fin-partie' ? 'Partie terminée' : `Question ${view.index + 1} / ${view.total}`),
    ]);

    const main = h('div', { className: 'quiz__panel quiz__question' });
    if (view.phase === 'question') main.append(...this.renderQuestion(view));
    else if (view.phase === 'revelation') main.append(...this.renderRevelation(view));
    else if (view.phase === 'fin-partie') main.append(...this.renderFinPartie(view));

    const side = h('div', { className: 'quiz__side' }, [
      h('div', { className: 'quiz__panel' }, [
        h('strong', {}, 'Joueurs'),
        ...view.players
          .slice()
          .sort((a, b) => b.score - a.score)
          .map((p) => h('div', { className: 'quiz__player' }, [
            h('span', {}, `${p.avatar ?? '🎮'} ${p.pseudo}`),
            h('span', { className: 'pts' }, String(p.score)),
          ])),
      ]),
      h('div', { className: 'quiz__panel' }, [
        h('strong', {}, 'Déroulé'),
        h('div', { className: 'quiz__log' }, [...view.log].reverse().map((l) => h('div', {}, l))),
      ]),
      ...(this.isHost && view.phase !== 'fin-partie'
        ? [h('button', { className: 'btn btn--ghost btn--small', onClick: () => this.confirmEnd() }, '🛑 Terminer la partie')]
        : []),
    ]);

    this.root.replaceChildren(h('div', { className: 'quiz__main' }, [bar, main]), side);

    if (view.phase === 'question') this.startTimerAnimation(view);
  }

  renderQuestion(view) {
    const answered = this.myAnswerForIndex === view.index;
    const localPick = answered ? this.myAnswerOptionIndex : undefined;
    const nodes = [
      h('div', { className: 'quiz__timerwrap' }, [this.timerBar = h('div', { className: 'quiz__timerbar', style: 'width:100%;' })]),
      h('h2', {}, view.question),
      h('div', { className: 'quiz__options' }, view.options.map((opt, i) => h('button', {
        type: 'button',
        className: `quiz__opt${localPick === i ? ' quiz__opt--picked' : ''}`,
        disabled: answered,
        onClick: () => this.act(i),
      }, opt))),
      h('div', { className: 'quiz__waiting' },
        answered ? '✅ Réponse envoyée — en attente des autres joueurs…' : 'Choisissez une réponse avant la fin du temps imparti.'),
      h('div', { className: 'quiz__waiting' }, `${view.answeredCount}/${view.totalPlayers} ont répondu`),
    ];
    return nodes;
  }

  renderRevelation(view) {
    const nodes = [
      h('h2', {}, view.question),
      h('div', { className: 'quiz__options' }, view.options.map((opt, i) => {
        let cls = 'quiz__opt';
        if (i === view.correctIndex) cls += ' quiz__opt--correct';
        const mine = view.breakdown.find((b) => b.id === this.ctx.me.id);
        if (mine && mine.optionIndex === i && i !== view.correctIndex) cls += ' quiz__opt--wrong';
        return h('button', { type: 'button', className: cls, disabled: true }, opt);
      })),
      h('div', { className: 'quiz__breakdown' }, view.breakdown.map((b) => h('div', {
        className: `quiz__breakdown-row ${b.correct ? 'correct' : 'wrong'}`,
      }, [
        h('span', {}, b.correct ? '✅' : '❌'),
        h('span', {}, b.pseudo),
        h('span', { className: 'pts' }, b.correct ? `+${b.points}` : (b.optionIndex === null ? 'Pas de réponse' : '0')),
      ]))),
      h('div', { className: 'quiz__hint' }, 'Question suivante dans quelques secondes…'),
    ];
    return nodes;
  }

  renderFinPartie(view) {
    return [
      h('div', { style: 'font-size:2.2rem;' }, '🏆'),
      h('h2', {}, 'Classement final'),
      h('table', {}, view.classement.map((p, i) => h('tr', { className: 'quiz__final-row' }, [
        h('td', { className: 'rank' }, `${i + 1}.`),
        h('td', {}, `${p.avatar ?? '🎮'} ${p.pseudo}`),
        h('td', { className: 'pts' }, String(p.score)),
      ]))),
      this.isHost
        ? h('button', { className: 'btn btn--primary', onClick: () => this.confirmEnd() }, 'Retour au salon')
        : h('div', { className: 'quiz__hint' }, 'En attente de l\'hôte pour revenir au salon…'),
    ];
  }

  startTimerAnimation(view) {
    cancelAnimationFrame(this.timerRAF);
    const tick = () => {
      if (!this.timerBar || this.view !== view) return;
      const remaining = Math.max(0, view.finAt - Date.now());
      const pct = Math.max(0, Math.min(100, (remaining / view.dureeMs) * 100));
      this.timerBar.style.width = `${pct}%`;
      if (remaining > 0 && this.view === view) this.timerRAF = requestAnimationFrame(tick);
    };
    tick();
  }

  unmount() {
    this.unsubscribe?.();
    clearTimeout(this.revealTimer);
    clearTimeout(this.errorTimer);
    cancelAnimationFrame(this.timerRAF);
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
    instance = new QuizUI(container, context);
    instance.mount();
  },
  async unmount() {
    instance?.unmount();
    instance = null;
  },
};
