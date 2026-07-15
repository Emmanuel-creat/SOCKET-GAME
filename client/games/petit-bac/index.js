/**
 * Petit Bac — module de jeu pour la plateforme Arcade.
 *
 * Architecture « Host autoritaire » : le client du Host exécute le moteur pur
 * (PetitBacEngine) et diffuse à chaque joueur une vue personnalisée. Les clients
 * envoient leurs actions au Host via context.sendMessage (relais game:message).
 *
 * Résilience Host : hostId est relu en direct depuis context (context.hostId peut
 * changer si la plateforme promeut un nouveau Host). Un watchdog détecte le
 * changement pour (1) transférer la couronne 👑 en temps réel chez tous et
 * (2) donner au joueur promu l'affichage + le contrôle du bouton « Skip ». Le Host
 * diffuse en continu un snapshot d'état à l'héritier (ciblé, jamais affiché), ce
 * qui permet la reprise autoritaire sans exposer les cumuls.
 *
 * Contrat : export default { mount(container, context), unmount() }.
 * PetitBacEngine et PetitBacUI sont exportés pour les tests.
 */

/* ====================================================================== */
/* Helpers                                                                */
/* ====================================================================== */

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

const debounce = (fn, ms) => {
  let t;
  return (...a) => { clearTimeout(t); t = setTimeout(() => fn(...a), ms); };
};

function shuffle(arr, rng) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i -= 1) {
    const j = Math.floor(rng() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/* ====================================================================== */
/* Pool de catégories (100 items)                                         */
/* ====================================================================== */

export const CATEGORIES = Object.freeze([
  'Prénom féminin', 'Prénom masculin', 'Prénom mixte', 'Prénom composé', 'Pays',
  'Ville', 'Capitale', 'Région / Province', 'Île', 'Animal',
  'Insecte', 'Oiseau', 'Mammifère', 'Poisson', 'Reptile',
  'Métier', "Métier d'art", 'Fruit', 'Légume', 'Couleur',
  'Objet du quotidien', 'Sport', 'Sport collectif', 'Sport individuel', 'Langue',
  'Partie du corps', 'Fleur', 'Arbre', 'Plante', 'Vêtement',
  'Accessoire', 'Unité de mesure', 'Qualité', 'Défaut', 'Acteur',
  'Actrice', 'Chanteur / Chanteuse', 'Groupe de musique', 'Titre de chanson', 'Film',
  'Série TV', 'Personnage fictif', 'Dessin animé', 'Anime', 'Jeu vidéo',
  'Console de jeu', 'Livre / Roman', 'BD / Manga', 'Personnage historique', 'Célébrité vivante',
  'Marque de voiture', 'Marque de vêtement', 'Marque de téléphone', 'Marque de luxe', 'Instrument de musique',
  'Danse', 'Plat', 'Fromage', 'Dessert', 'Pâtisserie',
  'Boisson alcoolisée', 'Cocktail', 'Boisson sans alcool', 'Épice', 'Condiment',
  'Herbe aromatique', 'Fleuve', 'Rivière', 'Mer', 'Océan',
  'Monument', 'Lieu touristique', 'Élément chimique', 'Constellation', 'Planète',
  'Matière / Matériau', 'Textile', 'Race de chien', 'Race de chat', 'Os',
  'Muscle', 'Organe', 'Moyen de transport', 'Sentiment / Émotion', 'Courant artistique',
  'Courant philosophique', "Domaine d'étude", 'Matière scolaire', 'Fête / Célébration', 'Signe astrologique',
  'Divinité / Dieu', 'Jeu de société', 'Jeu de cartes', 'Forme géométrique', 'Terme mathématique',
  'Mot de 4 lettres pile', 'Quelque chose de gratuit', 'Mot se terminant par la lettre', 'Verbe', 'Adjectif',
]);

const ALPHABET = 'ABCDEFGHIJLMNOPRSTUV'.split(''); // K,Q,W,X,Y,Z exclus
export const TOTAL_ROUNDS = 5;
export const NB_CATS = 10;
export const PLAY_MS = 210000;       // 3 min 30
const COUNTDOWN_MS = 4200;           // 3-2-1 + révélation lettre
const GRACE_MS = 700;                // collecte des dernières réponses
const ROUND_GAP_MS = 1400;           // pause après le dernier vote d'une manche
const HOST_WATCH_MS = 400;           // fréquence de détection d'un changement de Host
const VOTE_VALUES = Object.freeze({ 0: '❌', 1: '➖', 2: '✅' });

/* ====================================================================== */
/* Moteur de règles (pur : aucune dépendance DOM/réseau)                  */
/* ====================================================================== */

export class PetitBacEngine {
  /** @param {{id:string,pseudo:string}[]} players 2 à 16 joueurs. */
  constructor(players, { rng = Math.random } = {}) {
    if (players.length < 2 || players.length > 16) {
      throw new Error('Le Petit Bac se joue de 2 à 16 joueurs.');
    }
    this.players = players.map((p) => ({ id: p.id, pseudo: p.pseudo }));
    this.rng = rng;
    this.categories = []; // renouvelées à CHAQUE manche (voir startRound)
    this.letterBag = shuffle(ALPHABET, rng).slice(0, TOTAL_ROUNDS);
    this.round = 0;
    this.catIndex = 0;
    this.rounds = [];
    this.letter = '';
    this.playEndsAt = 0;
    this.phase = 'lobby';
    this.chat = [];
    // Jokers : un usage de chaque par joueur pour toute la partie.
    this.bonuses = Object.fromEntries(this.players.map((p) => [p.id, { double: true, gel: true, sablier: true }]));
    this.frozenUntil = {}; // pid -> timestamp de fin de gel
  }

  /** Reconstruit un moteur depuis un snapshot (reprise Host). */
  static fromSnapshot(s) {
    const e = Object.create(PetitBacEngine.prototype);
    e.rng = Math.random;
    e.players = s.players;
    e.categories = s.categories;
    e.letterBag = s.letterBag;
    e.round = s.round;
    e.catIndex = s.catIndex;
    e.rounds = s.rounds;
    e.letter = s.letter;
    e.playEndsAt = s.playEndsAt;
    e.phase = s.phase;
    e.chat = s.chat || [];
    e.bonuses = s.bonuses || Object.fromEntries(e.players.map((p) => [p.id, { double: true, gel: true, sablier: true }]));
    e.frozenUntil = s.frozenUntil || {};
    return e;
  }

  /** Copie profonde et sérialisable de l'état autoritaire complet. */
  snapshot() {
    return JSON.parse(JSON.stringify({
      players: this.players,
      categories: this.categories,
      letterBag: this.letterBag,
      round: this.round,
      catIndex: this.catIndex,
      rounds: this.rounds,
      letter: this.letter,
      playEndsAt: this.playEndsAt,
      phase: this.phase,
      chat: this.chat,
      bonuses: this.bonuses,
      frozenUntil: this.frozenUntil,
    }));
  }

  pseudoOf(id) { return (this.players.find((p) => p.id === id) || {}).pseudo || '???'; }

  startRound() {
    if (this.round >= TOTAL_ROUNDS) return { ok: false, error: 'Partie terminée.' };
    this.round += 1;
    this.catIndex = 0;
    this.letter = this.letterBag[(this.round - 1) % this.letterBag.length]
      || ALPHABET[Math.floor(this.rng() * ALPHABET.length)];
    // 10 catégories tirées AU HASARD dans le pool, renouvelées à chaque manche.
    this.categories = shuffle(CATEGORIES, this.rng).slice(0, NB_CATS);
    this.rounds.push({ letter: this.letter, categories: this.categories, answers: {}, scores: {}, doubles: [] });
    this.frozenUntil = {};
    this.phase = 'countdown';
    this.playEndsAt = 0;
    return { ok: true };
  }

  beginPlaying() {
    this.phase = 'playing';
    this.playEndsAt = Date.now() + PLAY_MS;
  }

  setAnswers(pid, ans) {
    const r = this.rounds[this.round - 1];
    if (!r || this.phase !== 'playing') return;
    if (Date.now() < (this.frozenUntil[pid] || 0)) return; // joueur gelé ❄️
    r.answers[pid] = { ...(r.answers[pid] || {}), ...ans };
  }

  addSys(text) {
    this.chat.push({ from: 'sys', pseudo: '⚡', text: String(text).slice(0, 240), ts: Date.now(), sys: true });
    if (this.chat.length > 120) this.chat.shift();
  }

  /**
   * Jokers (un usage de chaque par joueur et par partie, en phase de saisie) :
   *  - double  : les points du joueur pour la manche en cours sont doublés ;
   *  - gel     : gèle la saisie d'un adversaire pendant 15 s ;
   *  - sablier : ajoute 25 s au chrono de la manche (pour tout le monde).
   */
  useBonus(pid, kind, target = null) {
    if (this.phase !== 'playing') return { ok: false, error: 'Les jokers s\'utilisent pendant la saisie.' };
    const mine = this.bonuses[pid];
    if (!mine || !mine[kind]) return { ok: false, error: 'Joker déjà utilisé ou inconnu.' };
    const r = this.rounds[this.round - 1];
    const who = this.pseudoOf(pid);

    if (kind === 'double') {
      r.doubles.push(pid);
      this.addSys(`✨ ${who} joue DOUBLE : ses points de la manche seront ×2 !`);
    } else if (kind === 'gel') {
      const victim = this.players.find((p) => p.id === target && p.id !== pid);
      if (!victim) return { ok: false, error: 'Choisissez un adversaire à geler.' };
      if (Date.now() < (this.frozenUntil[victim.id] || 0)) return { ok: false, error: `${victim.pseudo} est déjà gelé·e.` };
      this.frozenUntil[victim.id] = Date.now() + 15000;
      this.addSys(`❄️ ${who} gèle ${victim.pseudo} pendant 15 secondes !`);
    } else if (kind === 'sablier') {
      this.playEndsAt += 25000;
      this.addSys(`⏳ ${who} joue le SABLIER : +25 secondes pour tout le monde !`);
    } else {
      return { ok: false, error: 'Joker inconnu.' };
    }
    mine[kind] = false;
    return { ok: true, kind };
  }

  /** Nombre de champs non vides par joueur pour la manche en cours (public). */
  filledCounts() {
    const r = this.rounds[this.round - 1];
    const out = {};
    for (const p of this.players) {
      const a = (r && r.answers[p.id]) || {};
      out[p.id] = this.categories.filter((c) => String(a[c] || '').trim().length > 0).length;
    }
    return out;
  }

  toVote() {
    const r = this.rounds[this.round - 1];
    if (!r) return;
    for (const p of this.players) {
      r.answers[p.id] = r.answers[p.id] || {};
      r.scores[p.id] = r.scores[p.id] || {};
      for (const c of this.categories) {
        if (r.answers[p.id][c] == null) r.answers[p.id][c] = '';
      }
    }
    this.catIndex = 0;
    this.phase = 'vote';
  }

  hasVoted(pid, cat) {
    const r = this.rounds[this.round - 1];
    return !!(r && r.scores[pid] && r.scores[pid][cat] !== undefined);
  }

  allVotedFor(catIndex) {
    const cat = this.categories[catIndex];
    return this.players.every((p) => this.hasVoted(p.id, cat));
  }

  _advanceAfterCategory() {
    if (this.catIndex < NB_CATS - 1) { this.catIndex += 1; return { ok: true, advanced: true }; }
    return { ok: true, roundComplete: true };
  }

  /** Un joueur note SON propre mot (0/1/2). Verrouillé après le 1er vote. */
  castVote(pid, catIndex, value) {
    if (this.phase !== 'vote') return { ok: false };
    if (catIndex !== this.catIndex) return { ok: false };
    if (![0, 1, 2].includes(value)) return { ok: false };
    const r = this.rounds[this.round - 1];
    const cat = this.categories[catIndex];
    r.scores[pid] = r.scores[pid] || {};
    if (r.scores[pid][cat] !== undefined) return { ok: true };
    r.scores[pid][cat] = value;
    if (this.allVotedFor(this.catIndex)) return this._advanceAfterCategory();
    return { ok: true };
  }

  /** Secours Host : 0 pt aux joueurs n'ayant pas voté, puis passage forcé. */
  skipCategory() {
    if (this.phase !== 'vote') return { ok: false };
    const r = this.rounds[this.round - 1];
    const cat = this.categories[this.catIndex];
    for (const p of this.players) {
      r.scores[p.id] = r.scores[p.id] || {};
      if (r.scores[p.id][cat] === undefined) r.scores[p.id][cat] = 0;
    }
    return this._advanceAfterCategory();
  }

  addChat(from, text) {
    const clean = String(text || '').slice(0, 240).trim();
    if (!clean) return;
    this.chat.push({ from, pseudo: this.pseudoOf(from), text: clean, ts: Date.now() });
    if (this.chat.length > 120) this.chat.shift();
  }

  totals() {
    const t = Object.fromEntries(this.players.map((p) => [p.id, 0]));
    for (const r of this.rounds) {
      for (const p of this.players) {
        const s = r.scores[p.id] || {};
        let sum = 0;
        const cats = r.categories || this.categories;
        for (const c of cats) sum += s[c] || 0;
        if ((r.doubles || []).includes(p.id)) sum *= 2; // joker ✨ Double
        t[p.id] += sum;
      }
    }
    return t;
  }

  ranking() {
    const t = this.totals();
    const arr = this.players
      .map((p) => ({ id: p.id, pseudo: p.pseudo, total: t[p.id] }))
      .sort((a, b) => b.total - a.total || a.pseudo.localeCompare(b.pseudo));
    let rank = 0; let seen = 0; let prev = null;
    for (const row of arr) {
      seen += 1;
      if (prev === null || row.total !== prev) { rank = seen; prev = row.total; }
      row.rank = rank;
    }
    const counts = arr.reduce((m, r) => (m[r.rank] = (m[r.rank] || 0) + 1, m), {});
    for (const row of arr) row.tie = counts[row.rank] > 1;
    return arr;
  }

  endMatch() {
    this.phase = 'leaderboard';
    const ranking = this.ranking();
    const winners = ranking.filter((r) => r.rank === 1);
    const summary = winners.length > 1
      ? `🏆 Égalité en tête : ${winners.map((w) => w.pseudo).join(', ')} !`
      : (winners[0] ? `🏆 ${winners[0].pseudo} remporte le Petit Bac !` : 'Petit Bac terminé.');
    return { summary, scores: this.totals(), ranking };
  }

  getViewFor(pid) {
    const v = {
      phase: this.phase,
      round: this.round,
      totalRounds: TOTAL_ROUNDS,
      categories: this.categories,
      nbCats: NB_CATS,
      letter: this.letter,
      playEndsAt: this.playEndsAt,
      players: this.players,
      chat: this.chat.slice(-120),
      you: pid,
      bonuses: this.bonuses[pid] || { double: false, gel: false, sablier: false },
      frozenUntil: this.frozenUntil,
    };
    if (this.phase === 'playing') v.filled = this.filledCounts();
    const cur = this.rounds[this.round - 1];
    v.doubles = (cur && cur.doubles) || [];
    if (this.phase === 'vote') {
      const r = this.rounds[this.round - 1] || { answers: {}, scores: {} };
      const activeCategory = this.categories[this.catIndex];
      v.catIndex = this.catIndex;
      v.activeCategory = activeCategory;
      v.wordsActive = Object.fromEntries(
        this.players.map((p) => [p.id, (r.answers[p.id] || {})[activeCategory] || '']),
      );
      v.votesActive = Object.fromEntries(
        this.players.map((p) => [p.id, (r.scores[p.id] || {})[activeCategory]]),
      );
    }
    if (this.phase === 'leaderboard') {
      v.ranking = this.ranking();
      v.totals = this.totals();
    }
    return v;
  }
}

/* ====================================================================== */
/* Styles (scopés .pb — conteneur ~600px)                                 */
/* ====================================================================== */

const CSS = `
.pb{--pb-accent:var(--accent,#6c5ce7);--pb-green:#00ff88;--pb-surface:var(--surface,#171a24);--pb-border:var(--border,#2a2f3d);--pb-ink:var(--text,#e8eaf0);--pb-deep:#0e1017;display:flex;gap:12px;height:600px;max-height:100%;font-family:inherit;color:var(--pb-ink)}
.pb *{box-sizing:border-box}
.pb__main{flex:1;position:relative;display:flex;flex-direction:column;background:var(--pb-surface);border:1px solid var(--pb-border);border-radius:14px;overflow:hidden;min-width:0}
.pb__side{width:250px;flex:none;display:flex;flex-direction:column;background:var(--pb-surface);border:1px solid var(--pb-border);border-radius:14px;overflow:hidden}
.pb__head{display:flex;align-items:center;justify-content:space-between;padding:10px 14px;border-bottom:1px solid var(--pb-border);gap:10px;flex:none}
.pb__round{font-weight:700;letter-spacing:.4px;opacity:.85;font-size:14px}
.pb__badge{display:inline-flex;align-items:center;justify-content:center;width:38px;height:38px;border-radius:10px;font-size:21px;font-weight:800;background:var(--pb-green);color:#07130c;box-shadow:0 4px 16px rgba(0,255,136,.45)}
.pb__timer{font-variant-numeric:tabular-nums;font-weight:800;font-size:19px;padding:4px 10px;border-radius:8px;background:var(--pb-deep);border:1px solid var(--pb-border)}
.pb__timer.pb--low{color:#ff6b6b;border-color:#ff6b6b;animation:pbpulse 1s infinite}
@keyframes pbpulse{50%{opacity:.45}}
.pb__stage{flex:1;overflow:auto;padding:14px}
.pb__status{position:absolute;bottom:10px;left:50%;transform:translateX(-50%);background:var(--pb-deep);border:1px solid var(--pb-border);padding:6px 14px;border-radius:20px;font-size:13px;pointer-events:none;opacity:0;transition:opacity .2s;max-width:90%}
.pb__status.pb--on{opacity:1}
.pb-cd{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;background:radial-gradient(circle at 50% 40%,#1b2a20,#0d130f)}
.pb-cd__n{font-weight:900;line-height:1;text-align:center}
.pb-cd__n--num{font-size:140px;color:#fff;animation:pbpop .8s ease}
.pb-cd__n--letter{font-size:170px;color:var(--pb-green);text-shadow:0 0 44px rgba(0,255,136,.7);animation:pbreveal .9s cubic-bezier(.2,1.4,.4,1)}
@keyframes pbpop{0%{transform:scale(2);opacity:0}40%{opacity:1}100%{transform:scale(1)}}
@keyframes pbreveal{0%{transform:scale(.2) rotate(-25deg);opacity:0}60%{transform:scale(1.25)}100%{transform:scale(1) rotate(0)}}
@media(prefers-reduced-motion:reduce){.pb-cd__n--num,.pb-cd__n--letter{animation:none}.pb__timer.pb--low{animation:none}}
.pb-grid{display:grid;gap:10px;grid-template-columns:1fr;max-width:660px;margin:0 auto}
@media(min-width:520px){.pb-grid{grid-template-columns:1fr 1fr}}
.pb-field{display:flex;flex-direction:column;gap:4px;min-width:0}
.pb-field label{font-size:12px;opacity:.7;font-weight:600}
.pb-field input{padding:9px 12px;border-radius:9px;border:1px solid var(--pb-border);background:var(--pb-deep);color:inherit;font-size:15px;width:100%}
.pb-field input:focus{outline:none;border-color:var(--pb-green);box-shadow:0 0 0 3px rgba(0,255,136,.2)}
.pb-field input.pb--ok{border-color:#33c26b}
.pb-field input:disabled{opacity:.6}
.pb-actions{max-width:660px;margin:16px auto 0;display:flex;justify-content:center}
.pb-stop{padding:14px 46px;font-size:18px;font-weight:800;letter-spacing:1px;border:none;border-radius:12px;background:#ff5252;color:#fff;cursor:pointer;box-shadow:0 6px 20px rgba(255,82,82,.4)}
.pb-stop:disabled{background:#3a3f4d;color:#8a8f9c;cursor:not-allowed;box-shadow:none}
.pb-vote{max-width:560px;margin:0 auto}
.pb-vote__cat{text-align:center;margin:2px 0 16px}
.pb-vote__idx{font-size:12px;opacity:.6;font-weight:700;letter-spacing:1.5px}
.pb-vote__name{font-size:26px;font-weight:800;margin-top:3px}
.pb-vrow{display:flex;align-items:center;gap:12px;padding:10px 14px;border-radius:11px;margin-bottom:8px;background:var(--pb-deep);border:1px solid var(--pb-border)}
.pb-vrow--me{border-color:var(--pb-green);box-shadow:0 0 0 1px var(--pb-green) inset}
.pb-vrow__who{width:140px;flex:none;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.pb-crown{margin-left:2px}
.pb-vrow__word{flex:1;font-size:16px;word-break:break-word}
.pb-vrow__word.pb--empty{opacity:.4;font-style:italic}
.pb-vrow__slot{flex:none;display:flex;gap:6px;align-items:center;min-height:36px;justify-content:flex-end}
.pb-vbtn{width:36px;height:36px;border-radius:9px;border:1px solid var(--pb-border);background:#151a26;font-size:17px;cursor:pointer;display:inline-flex;align-items:center;justify-content:center;line-height:1;transition:transform .08s,border-color .12s}
.pb-vbtn:hover{transform:translateY(-1px)}
.pb-vbtn--no:hover{border-color:#ff5252}
.pb-vbtn--dup:hover{border-color:#9aa0ad}
.pb-vbtn--ok:hover{border-color:var(--pb-green)}
.pb-sym{width:36px;height:36px;border-radius:9px;display:inline-flex;align-items:center;justify-content:center;font-size:19px;font-weight:800;border:1px solid var(--pb-border);animation:pbpop2 .25s ease}
@keyframes pbpop2{0%{transform:scale(.5);opacity:0}100%{transform:scale(1);opacity:1}}
.pb-sym--no{color:#ff5252;border-color:#ff5252}
.pb-sym--dup{color:#c8cdd8}
.pb-sym--ok{color:var(--pb-green);border-color:var(--pb-green)}
.pb-sym--wait{opacity:.3;font-size:12px;font-weight:600;border-style:dashed}
.pb-vote__prog{text-align:center;margin-top:14px;font-size:13px;opacity:.7}
.pb-skipwrap{display:flex;justify-content:center;margin-top:12px;min-height:38px}
.pb-skip{padding:9px 22px;font-size:14px;font-weight:700;border:1px solid #ffb454;color:#ffb454;background:rgba(255,180,84,.08);border-radius:10px;cursor:pointer}
.pb-skip:hover{background:rgba(255,180,84,.18)}
.pb-wait{text-align:center;opacity:.7;margin-top:16px}
.pb-lead{max-width:520px;margin:0 auto}
.pb-lead h2{text-align:center;font-size:24px;margin:6px 0 18px}
.pb-lrow{display:flex;align-items:center;gap:12px;padding:12px 16px;border-radius:12px;margin-bottom:8px;background:var(--pb-deep);border:1px solid var(--pb-border)}
.pb-lrow--1{border-color:#ffd54a;box-shadow:0 0 0 1px #ffd54a inset}
.pb-lrow--2{border-color:#c8cdd8}
.pb-lrow--3{border-color:#cd7f32}
.pb-rank{font-size:20px;font-weight:900;width:52px;text-align:center}
.pb-lname{flex:1;font-weight:600}
.pb-lpts{font-weight:800;font-size:18px}
.pb-chat__head{padding:10px 14px;border-bottom:1px solid var(--pb-border);font-weight:700;font-size:14px;flex:none}
.pb-chat__log{flex:1;overflow:auto;padding:10px 12px;display:flex;flex-direction:column;gap:6px}
.pb-msg{font-size:13px;line-height:1.35;word-break:break-word}
.pb-msg b{color:var(--pb-accent)}
.pb-chat__form{display:flex;gap:6px;padding:10px;border-top:1px solid var(--pb-border);flex:none}
.pb-chat__form input{flex:1;min-width:0;padding:8px 10px;border-radius:8px;border:1px solid var(--pb-border);background:var(--pb-deep);color:inherit}
.pb-chat__form button{padding:8px 12px;border:none;border-radius:8px;background:var(--pb-accent);color:#fff;font-weight:700;cursor:pointer}
@media(max-width:720px){.pb{flex-direction:column;height:auto}.pb__main{min-height:420px}.pb__side{width:auto;height:260px}}
.pb--t-ocean{--pb-accent:#00b4d8}.pb--t-ocean .pb-cd{background:radial-gradient(circle at 50% 40%,#0e3a52,#081521)}
.pb--t-sunset{--pb-accent:#ff7849}.pb--t-sunset .pb-cd{background:radial-gradient(circle at 50% 40%,#4a2030,#160a12)}
.pb--t-foret{--pb-accent:#2fbf71}.pb--t-foret .pb-cd{background:radial-gradient(circle at 50% 40%,#14402a,#081410)}
.pb--t-retro{--pb-accent:#33ff66;--pb-ink:#c8ffd4;--pb-deep:#020a04}.pb--t-retro .pb__main,.pb--t-retro .pb__side{background:#03140a;border-color:#1d5c33}.pb--t-retro .pb-cd{background:radial-gradient(circle at 50% 40%,#06280f,#010703)}
.pb__themes{display:flex;gap:6px;align-items:center}
.pb__dot{width:16px;height:16px;border-radius:50%;border:2px solid transparent;cursor:pointer;padding:0}
.pb__dot--on{border-color:#fff;transform:scale(1.15)}
.pb__snd{background:none;border:1px solid var(--pb-border);border-radius:8px;color:inherit;cursor:pointer;padding:2px 7px;font-size:13px}
.pb-jokers{max-width:660px;margin:14px auto 0;display:flex;gap:8px;justify-content:center;flex-wrap:wrap}
.pb-jk{display:inline-flex;align-items:center;gap:6px;padding:8px 14px;border-radius:10px;border:1px solid var(--pb-border);background:var(--pb-deep);color:inherit;font-weight:700;cursor:pointer;font-size:13px}
.pb-jk:hover:not(:disabled){border-color:var(--pb-accent)}
.pb-jk:disabled{opacity:.35;cursor:not-allowed;text-decoration:line-through}
.pb-jk__targets{display:flex;gap:6px;flex-wrap:wrap;justify-content:center;width:100%}
.pb-frozen{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;background:rgba(10,20,40,.82);backdrop-filter:blur(3px);z-index:5;font-size:20px;font-weight:800}
.pb-frozen span{font-size:56px;animation:pbshiver .4s infinite}
@keyframes pbshiver{25%{transform:rotate(-4deg)}75%{transform:rotate(4deg)}}
.pb-prog{padding:8px 12px;border-bottom:1px solid var(--pb-border);display:none;flex-direction:column;gap:5px;flex:none;max-height:170px;overflow:auto}
.pb-prog.pb--on{display:flex}
.pb-prow{display:flex;align-items:center;gap:7px;font-size:12px}
.pb-prow .nm{width:74px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.pb-prow .bar{flex:1;height:7px;border-radius:4px;background:var(--pb-deep);border:1px solid var(--pb-border);overflow:hidden}
.pb-prow .bar i{display:block;height:100%;background:var(--pb-accent);transition:width .4s}
.pb-prow .ct{width:32px;text-align:right;font-variant-numeric:tabular-nums;font-weight:700}
.pb-react{display:flex;gap:4px;padding:0 10px 8px}
.pb-react button{flex:1;background:var(--pb-deep);border:1px solid var(--pb-border);border-radius:8px;cursor:pointer;font-size:15px;padding:4px 0}
.pb-react button:hover{border-color:var(--pb-accent)}
.pb-msg--sys{color:var(--pb-accent);font-weight:600}
.pb-confetti{position:absolute;top:-12px;width:9px;height:14px;z-index:9;animation:pbfall linear forwards;pointer-events:none}
@keyframes pbfall{to{transform:translateY(660px) rotate(720deg);opacity:.1}}
`;

/* ====================================================================== */
/* Interface                                                              */
/* ====================================================================== */

export class PetitBacUI {
  constructor(container, context) {
    this.container = container;
    this.ctx = context;
    this.me = context.me;
    this.players = context.players;
    this.engine = null;
    this.view = null;
    this.unsub = null;
    this.stageKey = '';
    this.localAnswers = [];
    this.inputEls = [];
    this.myPending = undefined;
    this.collecting = false;
    this._snap = null;        // dernier snapshot reçu (héritier) pour reprise Host
    this._lastHostId = null;
    this.timers = { cd: [], tick: null, play: null, collect: null, round: null, status: null, hostWatch: null, progress: null, confetti: null };
    this.pushAnswers = debounce(() => this._pushAnswers(), 400);
    // Boosts : thème et son persistés localement (préférence personnelle).
    this.theme = (typeof localStorage !== 'undefined' && localStorage.getItem('arcade-pb-theme')) || 'neon';
    this.sound = typeof localStorage === 'undefined' ? true : localStorage.getItem('arcade-pb-sound') !== 'off';
    this.audioCtx = null;
    this.gelPicking = false;
  }

  // hostId / isHost relus EN DIRECT : suivent context.hostId même s'il change.
  get hostId() { return this.ctx.hostId; }
  get isHost() { return this.ctx.me.id === this.ctx.hostId; }

  /** Héritier = premier joueur qui n'est pas le Host courant (relais d'état). */
  heirId() {
    const p = this.players.find((x) => x.id !== this.hostId);
    return p ? p.id : null;
  }

  /* ---------- montage ---------- */

  mount() {
    this.styleEl = h('style', {}, CSS);
    this.root = h('div', { className: 'pb' });
    this.buildShell();
    this.container.append(this.styleEl, this.root);

    this._lastHostId = this.hostId;
    this.unsub = this.ctx.onMessage((m) => this.onMsg(m.from, m.data));

    if (this.isHost) {
      try {
        this.engine = new PetitBacEngine(this.players);
      } catch (e) {
        this.stage.replaceChildren(h('div', { className: 'pb-wait' }, `⚠️ ${e.message}`));
        return;
      }
      this.startRoundHost();
    } else {
      this.stage.replaceChildren(h('div', { className: 'pb-wait' }, '⏳ Connexion à la table du Host…'));
      this.ctx.sendMessage({ t: 'action', a: 'hello' }, this.hostId);
    }

    // Watchdog : réagit en temps réel à un changement de context.hostId.
    this.timers.hostWatch = setInterval(() => this.checkHostChange(), HOST_WATCH_MS);
  }

  buildShell() {
    this.timerEl = h('span', { className: 'pb__timer' }, '3:30');
    this.roundEl = h('span', { className: 'pb__round' }, 'Manche —/5');
    this.cornerEl = h('span', { className: 'pb__badge', style: 'display:none' }, '');
    this.sndBtn = h('button', {
      className: 'pb__snd', title: 'Sons',
      onClick: () => this.toggleSound(),
    }, this.sound ? '🔊' : '🔇');
    const THEME_COLORS = { neon: '#6c5ce7', ocean: '#00b4d8', sunset: '#ff7849', foret: '#2fbf71', retro: '#33ff66' };
    this.themeDots = {};
    const themes = h('div', { className: 'pb__themes', title: 'Thème' }, Object.entries(THEME_COLORS).map(([id, color]) => {
      const dot = h('button', { className: 'pb__dot', style: `background:${color}`, onClick: () => this.setTheme(id) });
      this.themeDots[id] = dot;
      return dot;
    }));
    this.head = h('div', { className: 'pb__head' }, [this.roundEl, this.cornerEl, themes, this.sndBtn, this.timerEl]);
    this.stage = h('div', { className: 'pb__stage' });
    this.statusEl = h('div', { className: 'pb__status' }, '');
    const main = h('div', { className: 'pb__main' }, [this.head, this.stage, this.statusEl]);
    this.mainEl = main;

    this.progressEl = h('div', { className: 'pb-prog' });
    this.chatLog = h('div', { className: 'pb-chat__log' });
    this.chatInput = h('input', {
      placeholder: 'Message…', maxlength: '240',
      onKeydown: (e) => { if (e.key === 'Enter') this.sendChat(); },
    });
    const reactions = h('div', { className: 'pb-react' }, ['🔥', '👏', '😂', '😱', '🐌'].map((emo) => h('button', {
      title: 'Réaction', onClick: () => this.sendChatText(emo),
    }, emo)));
    const side = h('div', { className: 'pb__side' }, [
      h('div', { className: 'pb-chat__head' }, '💬 Chat'),
      this.progressEl,
      this.chatLog,
      reactions,
      h('div', { className: 'pb-chat__form' }, [
        this.chatInput,
        h('button', { onClick: () => this.sendChat() }, 'Envoyer'),
      ]),
    ]);
    this.root.append(main, side);
    this.setTheme(this.theme, { silent: true });
  }

  /* ---------- boosts locaux : thème + son ---------- */

  setTheme(id, { silent = false } = {}) {
    this.theme = id;
    this.root.className = `pb${id === 'neon' ? '' : ` pb--t-${id}`}`;
    Object.entries(this.themeDots).forEach(([k, dot]) => dot.classList.toggle('pb__dot--on', k === id));
    try { localStorage.setItem('arcade-pb-theme', id); } catch { /* stockage indisponible */ }
    if (!silent) this.beep(660, 0.05);
  }

  toggleSound() {
    this.sound = !this.sound;
    this.sndBtn.textContent = this.sound ? '🔊' : '🔇';
    try { localStorage.setItem('arcade-pb-sound', this.sound ? 'on' : 'off'); } catch { /* stockage indisponible */ }
    if (this.sound) this.beep(880, 0.06);
  }

  /** Petits sons WebAudio (aucun fichier) : décompte, lettre, alertes, victoire. */
  beep(freq, dur = 0.08, type = 'sine', gain = 0.04) {
    if (!this.sound) return;
    try {
      this.audioCtx = this.audioCtx || new (window.AudioContext || window.webkitAudioContext)();
      const ctx = this.audioCtx;
      if (ctx.state === 'suspended') ctx.resume();
      const osc = ctx.createOscillator();
      const g = ctx.createGain();
      osc.type = type; osc.frequency.value = freq;
      g.gain.setValueAtTime(gain, ctx.currentTime);
      g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + dur);
      osc.connect(g).connect(ctx.destination);
      osc.start(); osc.stop(ctx.currentTime + dur);
    } catch { /* audio indisponible : silencieux */ }
  }

  /* ---------- transport (un seul point d'entrée, dispatch selon le rôle courant) ---------- */

  onMsg(from, data) {
    if (this.isHost) this.onHostMsg(from, data);
    else this.onGuestMsg(from, data);
  }

  onHostMsg(from, data) {
    if (!data) return;
    if (data.a === 'hello') {
      this.ctx.sendMessage({ t: 'view', view: this.engine.getViewFor(from) }, from);
      return;
    }
    if (data.a === 'update') { this.engine.setAnswers(from, data.answers || {}); return; }
    if (data.a === 'stop') {
      if (this.engine.phase === 'playing') {
        this.engine.addSys(`🛑 ${this.engine.pseudoOf(from)} a crié STOP !`);
        this.beginVote();
      }
      return;
    }
    if (data.a === 'bonus') {
      const res = this.engine.useBonus(from, data.kind, data.target);
      if (!res.ok) { this.ctx.sendMessage({ t: 'error', message: res.error }, from); return; }
      if (res.kind === 'sablier') this.rescheduleEnd();
      this.broadcast();
      return;
    }
    if (data.a === 'vote') { this.hostHandleVote(from, data.catIndex, data.value); return; }
    if (data.a === 'chat') { this.engine.addChat(from, data.text); this.broadcast(); }
  }

  onGuestMsg(from, data) {
    if (!data) return;
    if (data.t === 'state') { this._snap = data.snap; return; } // relais d'état (héritier)
    if (from !== this.hostId) return;
    if (data.t === 'view') this.applyView(data.view);
    else if (data.t === 'collect') this._pushAnswers();
    else if (data.t === 'error') this.status(data.message);
  }

  broadcast() {
    for (const p of this.players) {
      if (p.id === this.me.id) continue;
      this.ctx.sendMessage({ t: 'view', view: this.engine.getViewFor(p.id) }, p.id);
    }
    // Relais d'état vers l'héritier (ciblé, jamais affiché → cumuls non exposés).
    const heir = this.heirId();
    if (heir && heir !== this.me.id) {
      this.ctx.sendMessage({ t: 'state', snap: this.engine.snapshot() }, heir);
    }
    this.applyView(this.engine.getViewFor(this.me.id));
  }

  /* ---------- flux Host ---------- */

  startRoundHost() {
    this.collecting = false;
    this.clearCd();
    this.engine.startRound();
    this.broadcast();
    this.timers.cd.push(setTimeout(() => {
      this.engine.beginPlaying();
      this.broadcast();
      this.rescheduleEnd();
      // Diffusion périodique pendant la saisie : progression, gels, jokers.
      clearInterval(this.timers.progress);
      this.timers.progress = setInterval(() => {
        if (this.engine && this.engine.phase === 'playing') this.broadcast();
      }, 2000);
    }, COUNTDOWN_MS));
  }

  rescheduleEnd() {
    clearTimeout(this.timers.play);
    const rem = Math.max(0, this.engine.playEndsAt - Date.now());
    this.timers.play = setTimeout(() => this.beginVote(), rem + 300);
  }

  beginVote() {
    if (this.collecting || !this.engine || this.engine.phase !== 'playing') return;
    this.collecting = true;
    clearTimeout(this.timers.play);
    clearInterval(this.timers.tick);
    clearInterval(this.timers.progress);
    this.engine.setAnswers(this.me.id, this.collectLocal());
    for (const p of this.players) {
      if (p.id !== this.me.id) this.ctx.sendMessage({ t: 'collect' }, p.id);
    }
    this.timers.collect = setTimeout(() => {
      this.engine.toVote();
      this.collecting = false;
      this.broadcast();
    }, GRACE_MS);
  }

  afterVoteResolve(res) {
    if (res && res.roundComplete) {
      this.timers.round = setTimeout(() => {
        if (this.engine.round < TOTAL_ROUNDS) this.startRoundHost();
        else { this.engine.endMatch(); this.broadcast(); }
      }, ROUND_GAP_MS);
    }
  }

  hostHandleVote(pid, catIndex, value) {
    const res = this.engine.castVote(pid, catIndex, value);
    if (!res.ok) return;
    this.broadcast();
    this.afterVoteResolve(res);
  }

  hostSkip() {
    if (!this.engine || this.engine.phase !== 'vote') return;
    const res = this.engine.skipCategory();
    this.broadcast();
    this.afterVoteResolve(res);
  }

  finish() {
    const result = this.engine.endMatch();
    this.ctx.onEnd(result);
  }

  /* ---------- reprise Host (promotion en temps réel) ---------- */

  checkHostChange() {
    const cur = this.hostId;
    if (cur === this._lastHostId) return;
    this._lastHostId = cur;
    if (this.isHost && !this.engine) this.becomeHost();
    else this.refreshHostVisuals();
  }

  becomeHost() {
    if (this.engine) { this.refreshHostVisuals(); return; }
    if (!this._snap) { this.status('⚠️ Reprise Host impossible : état non reçu.'); return; }
    this.engine = PetitBacEngine.fromSnapshot(this._snap);
    const ph = this.engine.phase;
    if (ph === 'playing') {
      this.rescheduleEnd();
      clearInterval(this.timers.progress);
      this.timers.progress = setInterval(() => {
        if (this.engine && this.engine.phase === 'playing') this.broadcast();
      }, 2000);
    } else if (ph === 'countdown') {
      this.engine.beginPlaying();
      this.rescheduleEnd();
    }
    this.status('👑 Vous êtes le nouveau Host.');
    this.broadcast();
  }

  refreshHostVisuals() {
    if (!this.view) return;
    if (this.view.phase === 'vote') this.buildVoteRows(this.view);
    else if (this.view.phase === 'leaderboard') { this.stageKey = ''; this.applyView(this.view); }
  }

  /* ---------- flux joueur ---------- */

  collectLocal() {
    const cats = (this.view && this.view.categories)
      || (this.engine && this.engine.categories) || [];
    const out = {};
    cats.forEach((c, i) => { out[c] = (this.localAnswers[i] || '').trim(); });
    return out;
  }

  _pushAnswers() {
    const ans = this.collectLocal();
    if (this.isHost) this.engine.setAnswers(this.me.id, ans);
    else this.ctx.sendMessage({ t: 'action', a: 'update', answers: ans }, this.hostId);
  }

  triggerStop() {
    this._pushAnswers();
    if (this.isHost) this.beginVote();
    else this.ctx.sendMessage({ t: 'action', a: 'stop' }, this.hostId);
  }

  castMyVote(catIndex, value) {
    if (this.myPending !== undefined) return;
    this.myPending = value;
    this.buildVoteRows(this.view);
    if (this.isHost) this.hostHandleVote(this.me.id, catIndex, value);
    else this.ctx.sendMessage({ t: 'action', a: 'vote', catIndex, value }, this.hostId);
  }

  sendChat() {
    const text = this.chatInput.value.trim();
    if (!text) return;
    this.chatInput.value = '';
    this.sendChatText(text);
  }

  sendChatText(text) {
    if (this.isHost) { this.engine.addChat(this.me.id, text); this.broadcast(); }
    else this.ctx.sendMessage({ t: 'action', a: 'chat', text }, this.hostId);
  }

  useBonus(kind, target = null) {
    this.gelPicking = false;
    if (this.isHost) {
      const res = this.engine.useBonus(this.me.id, kind, target);
      if (!res.ok) { this.status(res.error); this.renderJokers(); return; }
      if (res.kind === 'sablier') this.rescheduleEnd();
      this.broadcast();
    } else {
      this.ctx.sendMessage({ t: 'action', a: 'bonus', kind, target }, this.hostId);
    }
  }

  /* ---------- rendu ---------- */

  crownFor(id) { return id === this.hostId ? ' 👑' : ''; }

  applyView(view) {
    if (!view) return;
    this.view = view;
    this.renderChat();
    this.progressEl.classList.toggle('pb--on', view.phase === 'playing');
    if (view.phase === 'playing') this.renderProgress();
    if (view.phase !== 'playing' && this.frozenOv) { this.frozenOv.remove(); this.frozenOv = null; }
    this.roundEl.textContent = `Manche ${view.round || '—'}/${view.totalRounds || TOTAL_ROUNDS}`;
    const showCorner = view.phase === 'playing' || view.phase === 'vote';
    this.cornerEl.style.display = showCorner ? '' : 'none';
    this.cornerEl.textContent = view.letter || '';
    if (view.phase !== 'playing') {
      clearInterval(this.timers.tick);
      this.timerEl.textContent = '—';
      this.timerEl.classList.remove('pb--low');
    }

    if (view.phase === 'vote') {
      const k = `vote:${view.round}:${view.catIndex}`;
      if (k !== this.stageKey) { this.stageKey = k; this.myPending = undefined; this.renderVote(view); }
      else this.buildVoteRows(view);
      return;
    }
    const k = `${view.phase}:${view.round}`;
    if (view.phase === 'playing' && k === this.stageKey) {
      // Même manche : rafraîchissement léger (jokers/gel), sans toucher aux champs.
      this.renderJokers();
      return;
    }
    if (k === this.stageKey && view.phase !== 'leaderboard') return;
    this.stageKey = k;
    if (view.phase === 'countdown') this.renderCountdown();
    else if (view.phase === 'playing') this.renderPlaying();
    else if (view.phase === 'leaderboard') this.renderLeaderboard();
  }

  renderCountdown() {
    this.clearCd();
    const box = h('div', { className: 'pb-cd' });
    this.stage.replaceChildren(box);
    const show = (txt, cls) => box.replaceChildren(h('div', { className: `pb-cd__n ${cls}` }, txt));
    show('3', 'pb-cd__n--num'); this.beep(440, 0.09);
    this.timers.cd.push(setTimeout(() => { show('2', 'pb-cd__n--num'); this.beep(440, 0.09); }, 1000));
    this.timers.cd.push(setTimeout(() => { show('1', 'pb-cd__n--num'); this.beep(440, 0.09); }, 2000));
    this.timers.cd.push(setTimeout(() => { show(this.view.letter, 'pb-cd__n--letter'); this.beep(880, 0.22, 'triangle', 0.05); }, 3000));
  }

  renderPlaying() {
    const cats = this.view.categories;
    this.localAnswers = cats.map(() => '');
    this.inputEls = [];
    const grid = h('div', { className: 'pb-grid' });
    cats.forEach((cat, i) => {
      const input = h('input', {
        type: 'text', autocomplete: 'off', spellcheck: 'false',
        placeholder: `${this.view.letter}…`,
        oninput: (e) => {
          this.localAnswers[i] = e.target.value;
          e.target.classList.toggle('pb--ok', e.target.value.trim().length > 0);
          this.refreshStop();
          this.pushAnswers();
        },
        onKeydown: (e) => { if (e.key === 'Enter' && this.stopBtn && !this.stopBtn.disabled) this.triggerStop(); },
      });
      this.inputEls.push(input);
      grid.append(h('div', { className: 'pb-field' }, [h('label', {}, cat), input]));
    });
    this.stopBtn = h('button', {
      className: 'pb-stop', disabled: true, onClick: () => this.triggerStop(),
    }, 'STOP');
    this.jokersBar = h('div', { className: 'pb-jokers' });
    if (this.frozenOv) this.frozenOv.remove();
    this.frozenOv = h('div', { className: 'pb-frozen', style: 'display:none' });
    this.mainEl.append(this.frozenOv);
    this.stage.replaceChildren(grid, h('div', { className: 'pb-actions' }, this.stopBtn), this.jokersBar);
    this.renderJokers();
    if (this.inputEls[0]) this.inputEls[0].focus();
    this.startTick();
  }

  /** Barre de jokers (✨ double, ❄️ gel avec choix de la cible, ⏳ sablier). */
  renderJokers() {
    if (!this.jokersBar || !this.view || this.view.phase !== 'playing') return;
    const b = this.view.bonuses || {};
    if (this.gelPicking) {
      const foes = this.view.players.filter((p) => p.id !== this.me.id);
      this.jokersBar.replaceChildren(h('div', { className: 'pb-jk__targets' }, [
        h('span', { style: 'align-self:center;font-size:13px;opacity:.8' }, '❄️ Geler :'),
        ...foes.map((p) => h('button', { className: 'pb-jk', onClick: () => this.useBonus('gel', p.id) }, p.pseudo)),
        h('button', { className: 'pb-jk', onClick: () => { this.gelPicking = false; this.renderJokers(); } }, '✖ Annuler'),
      ]));
      return;
    }
    this.jokersBar.replaceChildren(
      h('button', {
        className: 'pb-jk', disabled: !b.double, title: 'Vos points de cette manche comptent double',
        onClick: () => this.useBonus('double'),
      }, '✨ Double (×2)'),
      h('button', {
        className: 'pb-jk', disabled: !b.gel, title: 'Gèle la saisie d\'un adversaire pendant 15 s',
        onClick: () => { this.gelPicking = true; this.renderJokers(); },
      }, '❄️ Gel (15 s)'),
      h('button', {
        className: 'pb-jk', disabled: !b.sablier, title: 'Ajoute 25 s au chrono pour tout le monde',
        onClick: () => this.useBonus('sablier'),
      }, '⏳ Sablier (+25 s)'),
    );
  }

  /** Panneau de progression (au-dessus du chat) : champs remplis, gels, doubles. */
  renderProgress() {
    const v = this.view;
    if (!v.filled) { this.progressEl.replaceChildren(); return; }
    const total = v.categories.length;
    const now = Date.now();
    this.progressEl.replaceChildren(...v.players.map((p) => {
      const n = (v.filled || {})[p.id] ?? 0;
      const frozen = now < ((v.frozenUntil || {})[p.id] || 0);
      const doubled = (v.doubles || []).includes(p.id);
      const bar = h('span', { className: 'bar' }, h('i', { style: `width:${Math.round((n / total) * 100)}%` }));
      return h('div', { className: 'pb-prow' }, [
        h('span', { className: 'nm' }, `${p.pseudo}${p.id === this.hostId ? ' 👑' : ''}${doubled ? ' ✨' : ''}${frozen ? ' ❄️' : ''}`),
        bar,
        h('span', { className: 'ct' }, `${n}/${total}`),
      ]);
    }));
  }

  refreshStop() {
    if (!this.stopBtn) return;
    const full = this.localAnswers.length === this.view.categories.length
      && this.localAnswers.every((v) => v.trim().length > 0);
    this.stopBtn.disabled = !full;
  }

  startTick() {
    clearInterval(this.timers.tick);
    let lastBeep = -1;
    const render = () => {
      const rem = Math.max(0, (this.view.playEndsAt || 0) - Date.now());
      const s = Math.ceil(rem / 1000);
      this.timerEl.textContent = `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
      this.timerEl.classList.toggle('pb--low', s <= 30);
      if (s <= 3 && s > 0 && s !== lastBeep) { lastBeep = s; this.beep(300, 0.1, 'square', 0.03); }

      // Gel : champs bloqués + overlay avec compte à rebours.
      const frozenRem = ((this.view.frozenUntil || {})[this.me.id] || 0) - Date.now();
      const frozen = frozenRem > 0;
      if (this.frozenOv) {
        this.frozenOv.style.display = frozen ? '' : 'none';
        if (frozen) {
          this.frozenOv.replaceChildren(h('span', {}, '❄️'), `Gelé·e ! Encore ${Math.ceil(frozenRem / 1000)} s…`);
        }
      }
      const over = rem <= 0;
      this.inputEls.forEach((el) => { el.disabled = over || frozen; });
      if (this.stopBtn) {
        const full = this.localAnswers.length === this.view.categories.length
          && this.localAnswers.every((v) => v.trim().length > 0);
        this.stopBtn.disabled = over || frozen || !full;
      }
    };
    render();
    this.timers.tick = setInterval(render, 250);
  }

  /* ---------- phase de vote (auto-gérée, une catégorie à la fois) ---------- */

  renderVote(view) {
    this.voteRowsEl = h('div', {});
    this.voteProgEl = h('div', { className: 'pb-vote__prog' }, '');
    this.skipWrap = h('div', { className: 'pb-skipwrap' });
    const wrap = h('div', { className: 'pb-vote' }, [
      h('div', { className: 'pb-vote__cat' }, [
        h('div', { className: 'pb-vote__idx' }, `CATÉGORIE ${view.catIndex + 1} / ${view.nbCats}`),
        h('div', { className: 'pb-vote__name' }, view.activeCategory),
      ]),
      this.voteRowsEl,
      this.voteProgEl,
      this.skipWrap,
    ]);
    this.stage.replaceChildren(wrap);
    this.buildVoteRows(view);
  }

  symEl(value) {
    const cls = { 0: 'pb-sym--no', 1: 'pb-sym--dup', 2: 'pb-sym--ok' }[value];
    return h('span', { className: `pb-sym ${cls}` }, VOTE_VALUES[value]);
  }

  buildVoteRows(view) {
    if (!this.voteRowsEl) return;
    const rows = view.players.map((p) => {
      const word = (view.wordsActive[p.id] || '').trim();
      const wordEl = h('span', { className: `pb-vrow__word${word ? '' : ' pb--empty'}` }, word || '∅');
      let slot;
      const serverVote = view.votesActive[p.id];
      if (p.id === this.me.id) {
        const myVote = serverVote !== undefined ? serverVote : this.myPending;
        if (myVote !== undefined) {
          slot = h('div', { className: 'pb-vrow__slot' }, this.symEl(myVote));
        } else {
          slot = h('div', { className: 'pb-vrow__slot' }, [
            h('button', { className: 'pb-vbtn pb-vbtn--no', title: '0 point', onClick: () => this.castMyVote(view.catIndex, 0) }, '❌'),
            h('button', { className: 'pb-vbtn pb-vbtn--dup', title: '1 point (doublon)', onClick: () => this.castMyVote(view.catIndex, 1) }, '➖'),
            h('button', { className: 'pb-vbtn pb-vbtn--ok', title: '2 points (unique)', onClick: () => this.castMyVote(view.catIndex, 2) }, '✅'),
          ]);
        }
      } else if (serverVote !== undefined) {
        slot = h('div', { className: 'pb-vrow__slot' }, this.symEl(serverVote));
      } else {
        slot = h('div', { className: 'pb-vrow__slot' }, h('span', { className: 'pb-sym pb-sym--wait' }, '…'));
      }
      return h('div', { className: `pb-vrow${p.id === this.me.id ? ' pb-vrow--me' : ''}` }, [
        h('span', { className: 'pb-vrow__who' }, [p.pseudo, h('span', { className: 'pb-crown' }, this.crownFor(p.id))]),
        wordEl,
        slot,
      ]);
    });
    this.voteRowsEl.replaceChildren(...rows);
    const voted = view.players.filter((p) => view.votesActive[p.id] !== undefined).length;
    this.voteProgEl.textContent = `${voted} / ${view.players.length} ont voté`;
    this.syncSkip();
  }

  syncSkip() {
    if (!this.skipWrap) return;
    if (this.isHost && this.view && this.view.phase === 'vote') {
      if (!this.skipWrap.firstChild) {
        this.skipWrap.append(h('button', { className: 'pb-skip', title: 'Forcer le passage (0 pt aux absents)', onClick: () => this.hostSkip() }, '⏭️ Skip'));
      }
    } else {
      this.skipWrap.replaceChildren();
    }
  }

  renderLeaderboard() {
    const v = this.view;
    const medal = { 1: '🥇', 2: '🥈', 3: '🥉' };
    const rows = v.ranking.map((r) => h('div', {
      className: `pb-lrow${r.rank <= 3 ? ` pb-lrow--${r.rank}` : ''}`,
    }, [
      h('span', { className: 'pb-rank' }, `${medal[r.rank] || r.rank}${r.tie ? ' =' : ''}`),
      h('span', { className: 'pb-lname' }, [r.pseudo, h('span', { className: 'pb-crown' }, this.crownFor(r.id))]),
      h('span', { className: 'pb-lpts' }, `${r.total} pts`),
    ]));
    const wrap = h('div', { className: 'pb-lead' }, [h('h2', {}, '🏆 Classement final'), ...rows]);
    if (this.isHost) {
      wrap.append(h('button', { className: 'pb-stop', style: 'margin:16px auto 0;display:block;background:var(--pb-accent);box-shadow:none;letter-spacing:0', onClick: () => this.finish() }, 'Retour au salon'));
    } else {
      wrap.append(h('div', { className: 'pb-wait' }, "Merci d'avoir joué !"));
    }
    this.stage.replaceChildren(wrap);
    this.confetti();
    [523, 659, 784, 1046].forEach((f, i) => setTimeout(() => this.beep(f, 0.16, 'triangle', 0.05), i * 160));
  }

  /** Pluie de confettis (purement décorative). */
  confetti() {
    const colors = ['#6c5ce7', '#00b4d8', '#ff7849', '#2fbf71', '#ffd54a', '#ff5252'];
    const bits = [];
    for (let i = 0; i < 70; i += 1) {
      const bit = h('span', {
        className: 'pb-confetti',
        style: `left:${(Math.random() * 100).toFixed(1)}%;background:${colors[i % colors.length]};`
          + `animation-duration:${(2.6 + Math.random() * 2.2).toFixed(2)}s;`
          + `animation-delay:${(Math.random() * 0.9).toFixed(2)}s;`
          + `transform:rotate(${Math.floor(Math.random() * 360)}deg);`,
      });
      bits.push(bit);
      this.mainEl.append(bit);
    }
    clearTimeout(this.timers.confetti);
    this.timers.confetti = setTimeout(() => bits.forEach((b) => b.remove()), 6500);
  }

  renderChat() {
    const msgs = (this.view && this.view.chat) || [];
    const atBottom = this.chatLog.scrollHeight - this.chatLog.scrollTop - this.chatLog.clientHeight < 40;
    this.chatLog.replaceChildren(...msgs.map((m) => h('div', { className: `pb-msg${m.sys ? ' pb-msg--sys' : ''}` }, m.sys
      ? [h('span', {}, `${m.pseudo} ${m.text}`)]
      : [h('b', {}, `${m.pseudo} `), h('span', {}, m.text)])));
    if (atBottom) this.chatLog.scrollTop = this.chatLog.scrollHeight;
    // Petit son sur nouvel événement système (joker, STOP…).
    if (msgs.length !== this._chatLen) {
      const last = msgs[msgs.length - 1];
      if (this._chatLen !== undefined && last && last.sys) this.beep(700, 0.09, 'triangle');
      this._chatLen = msgs.length;
    }
  }

  status(msg) {
    this.statusEl.textContent = msg || '';
    this.statusEl.classList.add('pb--on');
    clearTimeout(this.timers.status);
    this.timers.status = setTimeout(() => this.statusEl.classList.remove('pb--on'), 3200);
  }

  /* ---------- nettoyage ---------- */

  clearCd() { this.timers.cd.forEach(clearTimeout); this.timers.cd = []; }

  unmount() {
    if (this.unsub) this.unsub();
    this.clearCd();
    clearInterval(this.timers.tick);
    clearInterval(this.timers.hostWatch);
    clearInterval(this.timers.progress);
    clearTimeout(this.timers.play);
    clearTimeout(this.timers.collect);
    clearTimeout(this.timers.round);
    clearTimeout(this.timers.status);
    clearTimeout(this.timers.confetti);
    if (this.audioCtx) { try { this.audioCtx.close(); } catch { /* déjà fermé */ } }
    if (this.styleEl) this.styleEl.remove();
    if (this.root) this.root.remove();
    this.statusEl = null;
  }
}

/* ====================================================================== */
/* Contrat de module Arcade                                               */
/* ====================================================================== */

let instance = null;

export default {
  async mount(container, context) {
    instance = new PetitBacUI(container, context);
    instance.mount();
  },
  async unmount() {
    if (instance) instance.unmount();
    instance = null;
  },
};
