/**
 * Blind Texte — module de jeu pour la plateforme Arcade.
 *
 * Un texte s'affiche (indice de chanson, citation de philosophe, scène de film) et
 * se précise au fil du temps : premier à taper la bonne réponse, plus de points.
 *
 * Architecture « Host autoritaire » (identique au Quiz) :
 *  - Le Host exécute le moteur (BlindTexteEngine) : tirage des manches, minuteur,
 *    validation des réponses, scores. LA BANQUE NE QUITTE JAMAIS SON NAVIGATEUR :
 *    les vues diffusées ne contiennent que les textes déjà révélés — jamais les
 *    réponses avant la phase de révélation (anti-triche par construction).
 *  - Les invités envoient leurs propositions via context.sendMessage ; le relais
 *    serveur ne lit rien.
 *
 * Leçons de la plateforme appliquées ici :
 *  - Le formulaire de réponse est construit UNE FOIS et n'est JAMAIS détruit par
 *    les re-rendus (sinon : focus perdu et lettres avalées, cf. bug du chat).
 *  - L'invité envoie { t:'hello' } dès qu'il est abonné : s'il monte en retard,
 *    le Host lui renvoie l'état complet (cf. correctif connexion des invités).
 *
 * Droit d'auteur : la banque intégrée ne contient AUCUN extrait de paroles ni de
 * répliques — indices originaux, citations du domaine public uniquement. Le mode
 * « Mes manches » affiche le contenu fourni par l'hôte, sous sa responsabilité.
 */

import { manchesDeLaBanque, CATEGORIES } from './banque.js';

/* ====================================================================== */
/* Réglages                                                               */
/* ====================================================================== */

const DUREES_DISPONIBLES = [20, 30, 45, 60];        // secondes par manche
const NB_MANCHES_DISPONIBLES = [5, 10, 15, 20];
const REVEAL_MS = 6_000;                            // durée de l'écran de révélation
const POINTS_BASE_MIN = 300;                        // réponse au dernier instant
const POINTS_BASE_MAX = 1000;                       // réponse immédiate
const MALUS_INDICE = [1, 0.75, 0.5];                // multiplicateur selon indices révélés
const BONUS_RANG = [150, 75, 0];                    // 1er, 2e, ensuite
const ESSAI_MIN_MS = 1_000;                         // anti-spam : 1 essai/seconde
const ESSAIS_MAX = 20;                              // par joueur et par manche
const TICK_UI_MS = 500;                             // cadence de la boucle Host

/* ====================================================================== */
/* Normalisation et correspondance des réponses                           */
/* ====================================================================== */

const ARTICLES = new Set(['le', 'la', 'les', 'l', 'un', 'une', 'des', 'du', 'de', 'the', 'a', 'an']);

/** Minuscules, sans accents ni ponctuation, articles de tête retirés. */
export function normaliser(txt) {
  const brut = String(txt ?? '')
    .toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')   // é → e, ç → c…
    .replace(/[^a-z0-9]+/g, ' ')                        // ponctuation → espaces
    .trim();
  const mots = brut.split(' ').filter(Boolean);
  while (mots.length > 1 && ARTICLES.has(mots[0])) mots.shift();
  return mots.join(' ');
}

/** Distance de Levenshtein (réponses courtes : coût négligeable). */
function levenshtein(a, b) {
  if (a === b) return 0;
  const m = a.length; const n = b.length;
  if (!m) return n; if (!n) return m;
  let prev = Array.from({ length: n + 1 }, (_, j) => j);
  for (let i = 1; i <= m; i += 1) {
    const cur = [i];
    for (let j = 1; j <= n; j += 1) {
      cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
    }
    prev = cur;
  }
  return prev[n];
}

/** La saisie correspond-elle à cette cible (déjà normalisée) ? */
function correspondCible(saisieN, cibleN) {
  if (!saisieN || !cibleN) return false;
  if (saisieN === cibleN) return true;
  // Tolérance aux fautes de frappe, proportionnée à la longueur de la cible.
  const tol = cibleN.length <= 5 ? 1 : cibleN.length <= 12 ? 2 : 3;
  if (Math.abs(saisieN.length - cibleN.length) <= tol && levenshtein(saisieN, cibleN) <= tol) return true;
  // Inclusion : « vie en rose » vaut « la vie en rose » — jamais sur un mot trop court.
  if (saisieN.length >= 5 && cibleN.includes(saisieN) && saisieN.length >= cibleN.length * 0.6) return true;
  return false;
}

/** Une solution = un label + des alias : chacun peut matcher. */
export function correspond(saisie, solution) {
  const s = normaliser(saisie);
  if (correspondCible(s, normaliser(solution.label))) return true;
  return (solution.alias ?? []).some((a) => correspondCible(s, normaliser(a)));
}

/* ====================================================================== */
/* Parseur « Mes manches » (contenu fourni par l'hôte)                     */
/* ====================================================================== */

/**
 * Une manche par ligne : `Réponse 1 / Réponse 2 | texte 1 | texte 2 | texte 3`
 * — réponses acceptées séparées par « / » (au moins une) ;
 * — 1 à 3 textes, révélés dans l'ordre (du plus dur au plus facile) ;
 * — lignes vides et lignes commençant par « # » ignorées.
 * Retourne { manches, erreurs } sans jamais jeter.
 */
export function parserMesManches(texte) {
  const manches = [];
  const erreurs = [];
  String(texte ?? '').split('\n').forEach((ligne, i) => {
    const l = ligne.trim();
    if (!l || l.startsWith('#')) return;
    const parts = l.split('|').map((p) => p.trim());
    if (parts.length < 2) { erreurs.push(`ligne ${i + 1} : il faut au moins « Réponse | texte »`); return; }
    const reponses = parts[0].split('/').map((r) => r.trim()).filter(Boolean);
    const textes = parts.slice(1).filter(Boolean).slice(0, 3);
    if (!reponses.length) { erreurs.push(`ligne ${i + 1} : aucune réponse`); return; }
    if (!textes.length) { erreurs.push(`ligne ${i + 1} : aucun texte`); return; }
    manches.push({
      categorie: 'perso',
      textes,
      solutions: reponses.map((r) => ({ label: r, alias: [] })),
      info: '',
    });
  });
  return { manches, erreurs };
}

/* ====================================================================== */
/* Moteur (pur : aucune dépendance DOM/réseau — testable en Node)          */
/* ====================================================================== */

function melange(arr, rng = Math.random) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i -= 1) {
    const j = Math.floor(rng() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export class BlindTexteEngine {
  /**
   * @param {{id:string,pseudo:string}[]} players
   * @param {{manches: object[], dureeMs: number, revealMs?: number}} options
   */
  constructor(players, { manches, dureeMs, revealMs = REVEAL_MS }) {
    if (!Array.isArray(manches) || !manches.length) throw new Error('Aucune manche à jouer.');
    this.players = players.map((p) => ({ id: p.id, pseudo: p.pseudo, score: 0 }));
    this.manches = manches;
    this.dureeMs = dureeMs;
    this.revealMs = revealMs;
    this.idx = -1;
    this.phase = 'attente';
    this.phaseEnd = 0;
    this.trouves = 0;
    this.parJoueur = new Map();     // pid -> { trouve, rang, gain, essais, dernierEssai }
  }

  start(now = Date.now()) { this.suivante(now); }

  get manche() { return this.manches[this.idx] ?? null; }

  suivante(now) {
    this.idx += 1;
    if (this.idx >= this.manches.length) {
      this.phase = 'fin';
      this.phaseEnd = 0;
      return;
    }
    this.phase = 'manche';
    this.phaseEnd = now + this.dureeMs;
    this.trouves = 0;
    this.parJoueur = new Map(this.players.map((p) => [p.id, { trouve: false, rang: 0, gain: 0, essais: 0, dernierEssai: 0 }]));
  }

  /** Combien de textes sont révélés à cet instant ? (répartis sur la durée) */
  nbTextesReveles(now) {
    const m = this.manche;
    if (!m) return 0;
    const total = m.textes.length;
    if (total <= 1 || this.phase !== 'manche') return Math.min(1, total);
    const ecoule = Math.max(0, now - (this.phaseEnd - this.dureeMs));
    const palier = this.dureeMs / total;
    return Math.min(total, 1 + Math.floor(ecoule / palier));
  }

  /** L'UI Host appelle ceci régulièrement : avance les phases aux échéances. */
  avancerSiEcheance(now = Date.now()) {
    if (this.phase === 'manche' && now >= this.phaseEnd) { this.reveler(now); return true; }
    if (this.phase === 'reveal' && now >= this.phaseEnd) { this.suivante(now); return true; }
    // La révélation progressive des textes est aussi un changement à diffuser.
    if (this.phase === 'manche') {
      const n = this.nbTextesReveles(now);
      if (n !== this._dernierN) { this._dernierN = n; return true; }
    }
    return false;
  }

  reveler(now) {
    this.phase = 'reveal';
    this.phaseEnd = now + this.revealMs;
  }

  /**
   * Une proposition d'un joueur. Retourne un résultat PRIVÉ (jamais diffusé) :
   * { ok, correct?, gain?, rang?, essaisRestants?, error? }.
   */
  submitGuess(pid, texte, now = Date.now()) {
    if (this.phase !== 'manche') return { ok: false, error: 'Pas de manche en cours.' };
    const j = this.parJoueur.get(pid);
    const joueur = this.players.find((p) => p.id === pid);
    if (!j || !joueur) return { ok: false, error: 'Joueur inconnu.' };
    if (j.trouve) return { ok: false, error: 'Déjà trouvé !' };
    if (now - j.dernierEssai < ESSAI_MIN_MS) return { ok: false, error: 'Doucement… (1 essai par seconde)' };
    if (j.essais >= ESSAIS_MAX) return { ok: false, error: 'Plus d\'essais pour cette manche.' };
    j.dernierEssai = now;
    j.essais += 1;

    const bon = this.manche.solutions.some((sol) => correspond(texte, sol));
    if (!bon) return { ok: true, correct: false, essaisRestants: ESSAIS_MAX - j.essais };

    // Bonne réponse : points selon la rapidité, les indices déjà révélés, le rang.
    const restant = Math.max(0, this.phaseEnd - now);
    const frac = Math.min(1, restant / this.dureeMs);
    const base = POINTS_BASE_MIN + (POINTS_BASE_MAX - POINTS_BASE_MIN) * frac;
    const malus = MALUS_INDICE[Math.min(this.nbTextesReveles(now) - 1, MALUS_INDICE.length - 1)];
    this.trouves += 1;
    const rang = this.trouves;
    const bonus = BONUS_RANG[Math.min(rang - 1, BONUS_RANG.length - 1)];
    const gain = Math.round((base * malus + bonus) / 10) * 10;

    j.trouve = true; j.rang = rang; j.gain = gain;
    joueur.score += gain;

    if (this.trouves >= this.players.length) this.reveler(now);   // tous ont trouvé
    return { ok: true, correct: true, gain, rang };
  }

  /**
   * La vue diffusée à tout le monde. RÈGLE ABSOLUE : tant que la phase est
   * « manche », AUCUNE solution (ni label ni alias) n'y figure — la banque et
   * les réponses restent chez le Host.
   */
  getView(now = Date.now()) {
    const m = this.manche;
    const joueurs = this.players
      .map((p) => {
        const j = this.parJoueur.get(p.id);
        return { id: p.id, pseudo: p.pseudo, score: p.score, trouve: !!j?.trouve, rang: j?.rang ?? 0, gain: j?.gain ?? 0 };
      })
      .sort((a, b) => b.score - a.score);

    const vue = {
      phase: this.phase,
      manche: this.idx + 1,
      nbManches: this.manches.length,
      joueurs,
    };
    if (this.phase === 'manche') {
      vue.categorie = m.categorie;
      vue.textes = m.textes.slice(0, this.nbTextesReveles(now));
      vue.nbTextes = m.textes.length;
      vue.tempsRestantMs = Math.max(0, this.phaseEnd - now);
      vue.dureeMs = this.dureeMs;
    } else if (this.phase === 'reveal') {
      vue.categorie = m.categorie;
      vue.textes = m.textes;
      vue.reveal = { solutions: m.solutions.map((s) => s.label), info: m.info ?? '' };
      vue.tempsRestantMs = Math.max(0, this.phaseEnd - now);
    }
    return vue;
  }
}

/* ====================================================================== */
/* Interface                                                              */
/* ====================================================================== */

const CSS = `
.btx { max-width: 860px; margin: 0 auto; padding: 18px; display: flex; flex-direction: column; gap: 14px; height: 100%; box-sizing: border-box; overflow-y: auto; }
.btx__head { display: flex; align-items: center; justify-content: space-between; gap: 10px; flex-wrap: wrap; }
.btx__titre { font-weight: 800; font-size: 1.15rem; }
.btx__meta { opacity: .85; font-size: .9rem; }
.btx__timer { font-variant-numeric: tabular-nums; font-weight: 800; font-size: 1.3rem; padding: 4px 14px; border-radius: 999px; background: rgba(255,255,255,.08); border: 1px solid rgba(255,255,255,.14); }
.btx__timer--urgent { background: rgba(214,69,80,.25); border-color: rgba(214,69,80,.6); }
.btx__carte { background: rgba(255,255,255,.05); border: 1px solid rgba(255,255,255,.12); border-radius: 16px; padding: 18px 20px; backdrop-filter: blur(8px); }
.btx__textes { display: flex; flex-direction: column; gap: 12px; min-height: 120px; }
.btx__texte { font-size: 1.08rem; line-height: 1.55; padding-left: 12px; border-left: 3px solid var(--accent, #7c5cff); }
.btx__texte--nouveau { animation: btxIn .5s ease; }
@keyframes btxIn { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: none; } }
.btx__attente { opacity: .6; font-style: italic; }
.btx__form { display: flex; gap: 8px; }
.btx__input { flex: 1 1 auto; min-width: 0; font: inherit; font-size: 1.05rem; padding: 12px 14px; border-radius: 12px; background: rgba(0,0,0,.35); border: 1px solid rgba(255,255,255,.16); color: inherit; }
.btx__input:focus { outline: none; border-color: var(--accent, #7c5cff); }
.btx__input:disabled { opacity: .5; }
.btx__btn { font: inherit; font-weight: 700; padding: 12px 20px; border-radius: 12px; border: none; cursor: pointer; background: var(--accent, #7c5cff); color: #fff; }
.btx__btn:disabled { opacity: .5; cursor: default; }
.btx__feedback { min-height: 22px; font-size: .92rem; }
.btx__feedback--ok { color: #6de08f; font-weight: 700; }
.btx__feedback--ko { color: #ff9c9c; }
.btx__scores { display: flex; flex-direction: column; gap: 6px; }
.btx__score { display: flex; align-items: center; gap: 8px; padding: 7px 12px; border-radius: 10px; background: rgba(255,255,255,.04); }
.btx__score--trouve { background: rgba(109,224,143,.12); border: 1px solid rgba(109,224,143,.35); }
.btx__score b { flex: 1 1 auto; font-weight: 700; }
.btx__pts { font-variant-numeric: tabular-nums; font-weight: 800; }
.btx__rang { font-size: .8rem; opacity: .85; }
.btx__reveal { text-align: center; display: flex; flex-direction: column; gap: 8px; }
.btx__reveal h3 { margin: 0; font-size: 1.4rem; }
.btx__info { opacity: .8; }
.btx__podium { text-align: center; display: flex; flex-direction: column; gap: 10px; align-items: center; }
.btx__podium h2 { margin: 0; }
.btx__cfg { display: flex; flex-direction: column; gap: 14px; }
.btx__cfg h3 { margin: 0; }
.btx__row { display: flex; gap: 8px; flex-wrap: wrap; align-items: center; }
.btx__chip { font: inherit; padding: 8px 14px; border-radius: 999px; cursor: pointer; border: 1px solid rgba(255,255,255,.16); background: rgba(255,255,255,.06); color: inherit; }
.btx__chip--actif { background: var(--accent, #7c5cff); border-color: transparent; color: #fff; font-weight: 700; }
.btx__cfg textarea { font: inherit; font-size: .88rem; min-height: 110px; border-radius: 12px; background: rgba(0,0,0,.35); border: 1px solid rgba(255,255,255,.16); color: inherit; padding: 10px 12px; resize: vertical; }
.btx__aide { font-size: .82rem; opacity: .7; line-height: 1.4; }
.btx__err { color: #ff9c9c; font-size: .88rem; min-height: 20px; }
.btx__feed { font-size: .9rem; opacity: .9; min-height: 20px; }
@media (max-width: 640px) { .btx { padding: 12px; } .btx__texte { font-size: 1rem; } }
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
    if (c == null) return;
    node.append(typeof c === 'string' ? document.createTextNode(c) : c);
  });
  return node;
}

class BlindTexteUI {
  constructor(container, context) {
    this.container = container;
    this.ctx = context;
    this.me = context.me;
    this.isHost = context.hostId === context.me.id;
    this.hostId = context.hostId;
    this.engine = null;
    this.unsub = null;
    this.timers = { boucle: null, timerUI: null };
    this.vue = null;
    this.vueRecueA = 0;
    this.nbTextesAffiches = 0;
    this.derniereManche = 0;
    this.config = {
      categories: new Set(Object.keys(CATEGORIES)),
      nbManches: 10,
      duree: 30,
      source: 'banque',          // 'banque' | 'perso' | 'melange'
      perso: '',
    };
  }

  /* ------------------------------ montage ------------------------------ */

  mount() {
    this.styleEl = h('style', {}, CSS);
    this.root = h('div', { className: 'btx' });
    this.container.append(this.styleEl, this.root);

    if (this.isHost) {
      this.renderConfig();
    } else {
      this.unsub = this.ctx.onMessage(({ from, data }) => {
        if (from !== this.hostId) return;
        if (data?.t === 'view') this.recevoirVue(data.view);
        else if (data?.t === 'resultat') this.feedbackPrive(data);
        else if (data?.t === 'resync') this.ctx.sendMessage({ t: 'hello' }, this.hostId);
      });
      this.construireEcranJeu();
      this.zoneTextes.replaceChildren(h('div', { className: 'btx__attente' }, '⏳ En attente que l\'hôte lance la partie…'));
      // Leçon « connexion des invités » : on annonce qu'on est prêt — si l'hôte a
      // déjà diffusé avant notre montage, il nous renverra l'état complet.
      this.ctx.sendMessage({ t: 'hello' }, this.hostId);
    }
  }

  unmount() {
    clearInterval(this.timers.boucle);
    clearInterval(this.timers.timerUI);
    this.unsub?.();
    this.root?.remove();
    this.styleEl?.remove();
  }

  /* --------------------------- écran de config -------------------------- */

  renderConfig() {
    const chip = (label, actif, onClick) =>
      h('button', { className: 'btx__chip' + (actif ? ' btx__chip--actif' : ''), type: 'button', onClick }, label);

    const rerender = () => this.renderConfig();
    const c = this.config;

    const categories = h('div', { className: 'btx__row' },
      Object.entries(CATEGORIES).map(([id, cat]) =>
        chip(cat.label, c.categories.has(id), () => {
          if (c.categories.has(id)) { if (c.categories.size > 1) c.categories.delete(id); }
          else c.categories.add(id);
          rerender();
        })));

    const manches = h('div', { className: 'btx__row' },
      NB_MANCHES_DISPONIBLES.map((n) => chip(`${n} manches`, c.nbManches === n, () => { c.nbManches = n; rerender(); })));

    const durees = h('div', { className: 'btx__row' },
      DUREES_DISPONIBLES.map((d) => chip(`${d} s`, c.duree === d, () => { c.duree = d; rerender(); })));

    const sources = h('div', { className: 'btx__row' }, [
      chip('Banque intégrée', c.source === 'banque', () => { c.source = 'banque'; rerender(); }),
      chip('Mes manches', c.source === 'perso', () => { c.source = 'perso'; rerender(); }),
      chip('Les deux', c.source === 'melange', () => { c.source = 'melange'; rerender(); }),
    ]);

    const zonePerso = c.source === 'banque' ? null : h('div', { className: 'btx__cfg' }, [
      h('textarea', {
        placeholder: 'Une manche par ligne :\nRéponse 1 / Réponse 2 | premier texte affiché | texte plus facile | texte encore plus facile',
        onInput: (e) => { c.perso = e.target.value; },
      }, c.perso),
      h('div', { className: 'btx__aide' },
        'Format : « Réponses | texte 1 | texte 2 | texte 3 ». Réponses acceptées séparées par « / » ; 1 à 3 textes, révélés dans l\'ordre. ' +
        'Le contenu saisi ici est affiché tel quel aux joueurs : assurez-vous d\'avoir le droit de l\'utiliser.'),
    ]);

    this.errEl = h('div', { className: 'btx__err' });

    this.root.replaceChildren(h('div', { className: 'btx__carte btx__cfg' }, [
      h('h3', {}, '🎵 Blind Texte — configuration'),
      h('div', { className: 'btx__meta' }, 'Catégories'), categories,
      h('div', { className: 'btx__meta' }, 'Nombre de manches'), manches,
      h('div', { className: 'btx__meta' }, 'Durée par manche'), durees,
      h('div', { className: 'btx__meta' }, 'Source des manches'), sources,
      zonePerso,
      this.errEl,
      h('div', { className: 'btx__row' }, [
        h('button', { className: 'btx__btn', type: 'button', onClick: () => this.lancer() }, '🚀 Lancer la partie'),
      ]),
    ]));
  }

  lancer() {
    const c = this.config;
    let manches = [];
    if (c.source !== 'perso') manches.push(...manchesDeLaBanque(c.categories));
    if (c.source !== 'banque') {
      const { manches: perso, erreurs } = parserMesManches(c.perso);
      if (erreurs.length) { this.errEl.textContent = `⚠️ ${erreurs[0]}`; return; }
      if (c.source === 'perso' && !perso.length) { this.errEl.textContent = '⚠️ Ajoutez au moins une manche (« Réponse | texte »).'; return; }
      manches.push(...perso);
    }
    manches = melange(manches).slice(0, c.nbManches);
    if (!manches.length) { this.errEl.textContent = '⚠️ Aucune manche disponible avec cette configuration.'; return; }

    try {
      this.engine = new BlindTexteEngine(this.ctx.players, { manches, dureeMs: c.duree * 1000 });
    } catch (e) { this.errEl.textContent = `⚠️ ${e.message}`; return; }

    this.unsub = this.ctx.onMessage(({ from, data }) => this.hostRecoit(from, data));
    this.construireEcranJeu();
    this.engine.start();
    this.timers.boucle = setInterval(() => {
      if (this.engine.avancerSiEcheance(Date.now())) this.broadcast();
    }, TICK_UI_MS);
    this.broadcast();
  }

  /* ------------------------------ côté Host ----------------------------- */

  hostRecoit(from, data) {
    if (data?.t === 'hello') { this.broadcast(); return; }
    if (data?.t !== 'guess') return;
    const res = this.engine.submitGuess(from, data.texte, Date.now());
    // Le verdict est PRIVÉ : lui seul sait s'il a raté, et combien d'essais il lui reste.
    this.ctx.sendMessage({ t: 'resultat', ...res }, from);
    if (res.correct) this.broadcast();     // score et rang changent pour tout le monde
  }

  broadcast() {
    const view = this.engine.getView(Date.now());
    this.ctx.sendMessage({ t: 'view', view });
    this.recevoirVue(view);                 // le Host se rend lui-même
  }

  proposer(texte) {
    if (this.isHost) {
      const res = this.engine.submitGuess(this.me.id, texte, Date.now());
      this.feedbackPrive(res);
      if (res.correct) this.broadcast();
    } else {
      this.ctx.sendMessage({ t: 'guess', texte }, this.hostId);
    }
  }

  /* --------------------------- écran de jeu ----------------------------- */

  /**
   * Le squelette est construit UNE FOIS. Les re-rendus ne touchent que des zones
   * dédiées — jamais le formulaire : le champ de réponse garde focus et saisie
   * quoi qu'il arrive (leçon du bug de chat de la plateforme).
   */
  construireEcranJeu() {
    this.titreEl = h('div', { className: 'btx__titre' }, '🎵 Blind Texte');
    this.metaEl = h('div', { className: 'btx__meta' }, '');
    this.timerEl = h('div', { className: 'btx__timer' }, '—');
    this.zoneTextes = h('div', { className: 'btx__textes' });
    this.feedbackEl = h('div', { className: 'btx__feedback' });
    this.scoresEl = h('div', { className: 'btx__scores' });

    this.input = h('input', {
      className: 'btx__input', type: 'text', maxlength: '80', autocomplete: 'off',
      placeholder: 'Votre réponse…',
      onKeydown: (e) => { e.stopPropagation(); if (e.key === 'Enter') this.envoyerSaisie(); },
      onKeyup: (e) => e.stopPropagation(),
    });
    this.btnEnvoyer = h('button', { className: 'btx__btn', type: 'button', onClick: () => this.envoyerSaisie() }, 'Deviner');
    const form = h('div', { className: 'btx__form' }, [this.input, this.btnEnvoyer]);

    this.root.replaceChildren(
      h('div', { className: 'btx__head' }, [this.titreEl, this.metaEl, this.timerEl]),
      h('div', { className: 'btx__carte' }, [this.zoneTextes]),
      form,
      this.feedbackEl,
      h('div', { className: 'btx__carte' }, [this.scoresEl]),
    );

    clearInterval(this.timers.timerUI);
    this.timers.timerUI = setInterval(() => this.majTimer(), 250);
  }

  envoyerSaisie() {
    const texte = this.input.value.trim();
    if (!texte) return;
    if (this.vue?.phase !== 'manche') return;
    this.input.value = '';
    this.input.focus();
    this.proposer(texte);
  }

  feedbackPrive(res) {
    if (!this.feedbackEl) return;
    if (res.correct) {
      this.feedbackEl.className = 'btx__feedback btx__feedback--ok';
      this.feedbackEl.textContent = `✅ Trouvé ! +${res.gain} points (rang ${res.rang})`;
      this.input.disabled = true; this.btnEnvoyer.disabled = true;
    } else if (res.ok) {
      this.feedbackEl.className = 'btx__feedback btx__feedback--ko';
      this.feedbackEl.textContent = `❌ Raté… (${res.essaisRestants} essai${res.essaisRestants > 1 ? 's' : ''} restant${res.essaisRestants > 1 ? 's' : ''})`;
    } else if (res.error) {
      this.feedbackEl.className = 'btx__feedback btx__feedback--ko';
      this.feedbackEl.textContent = `⚠️ ${res.error}`;
    }
  }

  recevoirVue(view) {
    const nouvelleManche = view.manche !== this.derniereManche || (view.phase === 'manche' && this.vue?.phase !== 'manche' && this.vue?.phase !== undefined && this.derniereManche === view.manche);
    const changementManche = view.manche !== this.derniereManche;
    this.vue = view;
    this.vueRecueA = Date.now();

    if (view.phase === 'manche') {
      const cat = CATEGORIES[view.categorie];
      this.metaEl.textContent = `Manche ${view.manche}/${view.nbManches} · ${cat ? `${cat.label} — ${cat.consigne}` : 'Manche personnalisée — trouvez la réponse'}`;
      if (changementManche) {
        this.derniereManche = view.manche;
        this.zoneTextes.replaceChildren();
        this.nbTextesAffiches = 0;
        this.feedbackEl.textContent = '';
        this.input.disabled = false; this.btnEnvoyer.disabled = false;
        this.input.focus();
      }
      // On AJOUTE les textes nouvellement révélés — sans reconstruire la zone
      // (et donc sans jamais toucher au formulaire).
      for (let i = this.nbTextesAffiches; i < view.textes.length; i += 1) {
        this.zoneTextes.append(h('div', { className: 'btx__texte btx__texte--nouveau' }, view.textes[i]));
      }
      this.nbTextesAffiches = view.textes.length;
    } else if (view.phase === 'reveal') {
      this.metaEl.textContent = `Manche ${view.manche}/${view.nbManches} · Révélation`;
      const gagnants = view.joueurs.filter((j) => j.trouve).sort((a, b) => a.rang - b.rang);
      this.zoneTextes.replaceChildren(h('div', { className: 'btx__reveal' }, [
        h('h3', {}, view.reveal.solutions.join('  ·  ')),
        view.reveal.info ? h('div', { className: 'btx__info' }, view.reveal.info) : null,
        h('div', {}, gagnants.length
          ? gagnants.map((g) => `${g.rang === 1 ? '🥇' : g.rang === 2 ? '🥈' : '✅'} ${g.pseudo} +${g.gain}`).join('   ')
          : 'Personne n\'a trouvé…'),
      ]));
      this.nbTextesAffiches = 0;
      this.input.disabled = true; this.btnEnvoyer.disabled = true;
    } else if (view.phase === 'fin') {
      this.metaEl.textContent = 'Partie terminée';
      this.timerEl.textContent = '🏁';
      this.timerEl.className = 'btx__timer';
      const podium = view.joueurs;
      this.zoneTextes.replaceChildren(h('div', { className: 'btx__podium' }, [
        h('h2', {}, '🏆 Classement final'),
        ...podium.map((j, i) => h('div', {}, `${['🥇', '🥈', '🥉'][i] ?? `${i + 1}.`} ${j.pseudo} — ${j.score} pts`)),
        this.isHost
          ? h('button', { className: 'btx__btn', type: 'button', onClick: () => this.ctx.onEnd({ classement: podium.map((j) => ({ pseudo: j.pseudo, score: j.score })) }) }, 'Terminer et revenir au salon')
          : h('div', { className: 'btx__attente' }, 'L\'hôte va clore la partie…'),
      ]));
      this.input.disabled = true; this.btnEnvoyer.disabled = true;
      clearInterval(this.timers.timerUI);
    }

    this.majScores(view);
    this.majTimer();
  }

  majScores(view) {
    this.scoresEl.replaceChildren(...view.joueurs.map((j) =>
      h('div', { className: 'btx__score' + (j.trouve ? ' btx__score--trouve' : '') }, [
        h('b', {}, j.pseudo + (j.id === this.me.id ? ' (moi)' : '')),
        j.trouve ? h('span', { className: 'btx__rang' }, `${j.rang === 1 ? '🥇' : j.rang === 2 ? '🥈' : '✅'} +${j.gain}`) : null,
        h('span', { className: 'btx__pts' }, String(j.score)),
      ])));
  }

  /** Timer local, interpolé depuis la dernière vue reçue (diffusion lente suffit). */
  majTimer() {
    const v = this.vue;
    if (!v || (v.phase !== 'manche' && v.phase !== 'reveal')) return;
    const restant = Math.max(0, (v.tempsRestantMs ?? 0) - (Date.now() - this.vueRecueA));
    const s = Math.ceil(restant / 1000);
    this.timerEl.textContent = v.phase === 'reveal' ? `➡ ${s}` : `${s} s`;
    this.timerEl.className = 'btx__timer' + (v.phase === 'manche' && s <= 5 ? ' btx__timer--urgent' : '');
  }
}

/* ====================================================================== */
/* Contrat de module                                                       */
/* ====================================================================== */

let instance = null;

export default {
  async mount(container, context) {
    instance = new BlindTexteUI(container, context);
    instance.mount();
  },
  async unmount() {
    instance?.unmount();
    instance = null;
  },
};
