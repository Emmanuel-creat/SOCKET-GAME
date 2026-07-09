/**
 * Codenames — module de jeu pour la plateforme Arcade.
 *
 * Deux équipes (Rouges / Bleus) s'affrontent autour d'une grille de 25 mots.
 * Dans chaque équipe : un maître-espion (qui voit la couleur de chaque mot)
 * et des agents. Le maître-espion donne des indices « un mot + un nombre » ;
 * ses agents désignent les mots de leur équipe. Découvrir tous ses mots fait
 * gagner ; toucher l'assassin fait perdre immédiatement.
 *
 * Architecture « Host autoritaire » (identique au tarot) :
 *  - Le client du Host exécute le moteur (CodenamesEngine, pur, testable en Node).
 *  - La grille de couleurs n'est envoyée qu'aux maîtres-espions : chaque joueur
 *    reçoit une vue personnalisée via le relais game:message (envois ciblés).
 *  - Les autres clients rendent la vue reçue et envoient leurs actions au Host.
 *
 * Règles implémentées :
 *  - Grille 5×5 : 9 mots pour l'équipe qui commence, 8 pour l'autre,
 *    7 neutres, 1 assassin. L'équipe qui commence alterne à chaque manche.
 *  - Mise en place : chacun choisit son équipe et son rôle (1 seul
 *    maître-espion par équipe, au moins 1 agent par équipe).
 *  - Indice : un seul mot (sans espace ni chiffre), différent de tout mot
 *    non révélé de la grille, + un nombre de 0 à 9 (0 = essais illimités).
 *  - Essais : nombre + 1 au maximum ; l'équipe doit désigner au moins un mot
 *    avant de pouvoir passer. Mot adverse ou neutre : fin du tour.
 *  - Assassin : défaite immédiate de l'équipe qui le désigne.
 *  - Victoire aussi quand l'adversaire révèle par erreur votre dernier mot.
 *  - Manches successives (le Host relance), score de manches cumulé.
 */

/* ====================================================================== */
/* Mots (noms communs français, un seul mot chacun)                        */
/* ====================================================================== */

export const WORDS = Object.freeze([
  'aigle', 'aiguille', 'ambre', 'ampoule', 'ancre', 'ange', 'anneau', 'antenne',
  'araignée', 'arbre', 'arc', 'argent', 'armure', 'as', 'atlas', 'aube',
  'avocat', 'bague', 'baguette', 'balai', 'balance', 'baleine', 'ballon', 'banane',
  'banc', 'bandeau', 'banque', 'barbe', 'baril', 'barrage', 'bataille', 'bateau',
  'bâton', 'batterie', 'berceau', 'bijou', 'bille', 'blé', 'bloc', 'bombe',
  'botte', 'bouche', 'bouclier', 'bougie', 'boussole', 'bouteille', 'bouton', 'boxe',
  'branche', 'bras', 'brique', 'brosse', 'brouillard', 'bulle', 'bureau', 'cabane',
  'cadre', 'café', 'cage', 'caisse', 'calendrier', 'canard', 'canne', 'canon',
  'cape', 'capitaine', 'carte', 'casque', 'cercle', 'cerf', 'chaîne', 'chaise',
  'chambre', 'chameau', 'champ', 'champion', 'chapeau', 'charbon', 'chasse', 'chat',
  'château', 'chaussure', 'chef', 'cheval', 'chevalier', 'cheveu', 'chien', 'chiffre',
  'chocolat', 'cirque', 'ciseaux', 'clé', 'cloche', 'clou', 'clown', 'cochon',
  'code', 'coffre', 'colle', 'colonne', 'comète', 'compas', 'coq', 'coquille',
  'corde', 'corne', 'costume', 'coton', 'couronne', 'course', 'couteau', 'crabe',
  'cravate', 'crayon', 'crochet', 'croix', 'cuisine', 'cuivre', 'dague', 'dame',
  'danse', 'dauphin', 'dent', 'désert', 'diamant', 'dinosaure', 'docteur', 'doigt',
  'dossier', 'douche', 'dragon', 'drapeau', 'échelle', 'éclair', 'école', 'écran',
  'écurie', 'église', 'éléphant', 'empereur', 'encre', 'enveloppe', 'épée', 'éponge',
  'équipe', 'escalier', 'étoile', 'facteur', 'falaise', 'fantôme', 'farine', 'fenêtre',
  'fer', 'ferme', 'feu', 'feuille', 'ficelle', 'figure', 'fil', 'flèche',
  'fleur', 'flûte', 'forêt', 'fontaine', 'fourche', 'fourmi', 'fraise', 'fromage',
  'front', 'fumée', 'fusée', 'galaxie', 'gant', 'gâteau', 'géant', 'gel',
  'girafe', 'glace', 'gorge', 'goutte', 'graine', 'grenouille', 'griffe', 'grotte',
  'guêpe', 'guerre', 'guitare', 'hache', 'hameçon', 'hélice', 'herbe', 'hibou',
  'hiver', 'horloge', 'hôtel', 'huile', 'île', 'jambe', 'jardin', 'jouet',
  'journal', 'juge', 'jungle', 'jupe', 'kiwi', 'lac', 'laine', 'lame',
  'lampe', 'lance', 'langue', 'lapin', 'lettre', 'lion', 'lit', 'livre',
  'losange', 'loup', 'lune', 'lunettes', 'machine', 'magicien', 'main', 'maire',
  'maison', 'manche', 'marché', 'marin', 'marteau', 'masque', 'médaille', 'mémoire',
  'menthe', 'mer', 'météore', 'miel', 'miroir', 'montagne', 'montre', 'moteur',
  'moulin', 'mousse', 'moustache', 'mouton', 'mur', 'musée', 'navire', 'neige',
  'nid', 'nœud', 'nuage', 'nuit', 'ombre', 'ongle', 'opéra', 'or',
  'orage', 'orange', 'oreille', 'ours', 'palais', 'panda', 'panier', 'papier',
  'parachute', 'parfum', 'passage', 'patte', 'peigne', 'peinture', 'pelle', 'pendule',
  'perle', 'phare', 'piano', 'pied', 'pierre', 'pilote', 'pin', 'pinceau',
  'pirate', 'piscine', 'piste', 'plage', 'planche', 'planète', 'plume', 'poche',
  'poêle', 'poison', 'pomme', 'pont', 'port', 'porte', 'poste', 'poudre',
  'poule', 'poupée', 'prince', 'prison', 'puits', 'quai', 'racine', 'radio',
  'raisin', 'rame', 'rat', 'rayon', 'reine', 'renard', 'requin', 'ressort',
  'rivière', 'robot', 'roche', 'roi', 'roue', 'ruban', 'ruche', 'sable',
  'sac', 'salon', 'sapin', 'satellite', 'saut', 'savon', 'scie', 'seau',
  'sel', 'selle', 'serpent', 'singe', 'sirène', 'soldat', 'soleil', 'sorcière',
  'source', 'souris', 'sphère', 'squelette', 'statue', 'sucre', 'tableau', 'tache',
  'taille', 'tambour', 'tapis', 'taupe', 'taureau', 'télescope', 'témoin', 'tente',
  'terre', 'théâtre', 'tigre', 'tissu', 'toile', 'toit', 'tortue', 'tour',
  'train', 'trésor', 'triangle', 'trombone', 'trompette', 'trône', 'tunnel', 'usine',
  'vague', 'vaisseau', 'valise', 'vallée', 'vampire', 'vent', 'ver', 'verre',
  'veste', 'viande', 'vigne', 'village', 'violon', 'vis', 'voile', 'voiture',
  'volcan', 'voleur', 'zèbre', 'zone',
]);

const TEAMS = Object.freeze({ R: { nom: 'Rouges', adjectif: 'rouge' }, B: { nom: 'Bleus', adjectif: 'bleu' } });
const other = (t) => (t === 'R' ? 'B' : 'R');

/** Normalisation pour comparer indice et mots de la grille. */
export function normalize(word) {
  return String(word ?? '')
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

/* ====================================================================== */
/* Moteur de règles (pur : aucune dépendance DOM/réseau)                  */
/* ====================================================================== */

export class CodenamesEngine {
  /** @param {{id: string, pseudo: string}[]} players @param {{hostId: string, rng?: Function}} options */
  constructor(players, { hostId, rng = Math.random } = {}) {
    if (players.length < 4) throw new Error('Codenames se joue à 4 joueurs minimum (2 par équipe).');
    this.players = players.map((p) => ({ id: p.id, pseudo: p.pseudo }));
    this.hostId = hostId;
    this.rng = rng;
    this.phase = 'setup';
    /** @type {Map<string, {team: 'R'|'B', role: 'spy'|'agent'}|null>} */
    this.assign = new Map(this.players.map((p) => [p.id, null]));
    this.manche = 0;
    this.wins = { R: 0, B: 0 };
    this.startingTeam = rng() < 0.5 ? 'R' : 'B';
    this.cards = [];
    this.turnTeam = null;
    this.clue = null;
    this.guessesLeft = 0;
    this.guessedThisTurn = 0;
    this.winner = null;
    this.winReason = null;
    this.log = [];
    this.say('🕵️ Choisissez votre équipe et votre rôle.');
  }

  say(message) {
    this.log.push(message);
    if (this.log.length > 60) this.log.shift();
  }

  pseudoOf(id) { return this.players.find((p) => p.id === id)?.pseudo ?? '?'; }
  roleOf(id) { return this.assign.get(id) ?? null; }
  spyOf(team) { return this.players.find((p) => this.assign.get(p.id)?.team === team && this.assign.get(p.id)?.role === 'spy') ?? null; }
  teamMembers(team) { return this.players.filter((p) => this.assign.get(p.id)?.team === team); }

  shuffle(arr) {
    const d = [...arr];
    for (let i = d.length - 1; i > 0; i -= 1) {
      const j = Math.floor(this.rng() * (i + 1));
      [d[i], d[j]] = [d[j], d[i]];
    }
    return d;
  }

  /* ------------------------------ mise en place ----------------------- */

  join(playerId, team, role) {
    if (this.phase !== 'setup') return { ok: false, error: 'Les équipes sont verrouillées pendant la manche.' };
    if (!['R', 'B'].includes(team) || !['spy', 'agent'].includes(role)) return { ok: false, error: 'Choix invalide.' };
    if (role === 'spy') {
      const spy = this.spyOf(team);
      if (spy && spy.id !== playerId) return { ok: false, error: `Les ${TEAMS[team].nom} ont déjà un maître-espion (${spy.pseudo}).` };
    }
    this.assign.set(playerId, { team, role });
    this.say(`${this.pseudoOf(playerId)} rejoint les ${TEAMS[team].nom} comme ${role === 'spy' ? 'maître-espion' : 'agent'}.`);
    return { ok: true };
  }

  /** Composition valide : tous assignés, 1 espion + ≥1 agent par équipe. */
  setupCheck() {
    const unassigned = this.players.filter((p) => !this.assign.get(p.id));
    if (unassigned.length) return { valid: false, reason: `En attente de : ${unassigned.map((p) => p.pseudo).join(', ')}.` };
    for (const t of ['R', 'B']) {
      if (!this.spyOf(t)) return { valid: false, reason: `Les ${TEAMS[t].nom} n'ont pas de maître-espion.` };
      const agents = this.teamMembers(t).filter((p) => this.assign.get(p.id).role === 'agent');
      if (agents.length < 1) return { valid: false, reason: `Les ${TEAMS[t].nom} n'ont aucun agent.` };
    }
    return { valid: true, reason: null };
  }

  startRound(playerId) {
    if (playerId !== this.hostId) return { ok: false, error: 'Seul le Host peut lancer la manche.' };
    if (!['setup', 'fin-manche'].includes(this.phase)) return { ok: false, error: 'Une manche est déjà en cours.' };
    const check = this.setupCheck();
    if (!check.valid) return { ok: false, error: check.reason };

    this.manche += 1;
    if (this.manche > 1) this.startingTeam = other(this.startingTeam);
    const start = this.startingTeam;

    const words = this.shuffle([...WORDS]).slice(0, 25);
    const colors = this.shuffle([
      ...Array(9).fill(start),
      ...Array(8).fill(other(start)),
      ...Array(7).fill('N'),
      'X',
    ]);
    this.cards = words.map((word, i) => ({ word, color: colors[i], revealed: false, by: null }));
    this.turnTeam = start;
    this.clue = null;
    this.guessesLeft = 0;
    this.guessedThisTurn = 0;
    this.winner = null;
    this.winReason = null;
    this.phase = 'jeu';
    this.say(`🗺️ Manche ${this.manche} — les ${TEAMS[start].nom} commencent (9 mots contre 8).`);
    this.say(`🗣️ ${this.spyOf(start).pseudo} doit donner un indice.`);
    return { ok: true };
  }

  /* ------------------------------ indices ----------------------------- */

  giveClue(playerId, word, count) {
    if (this.phase !== 'jeu') return { ok: false, error: 'Aucune manche en cours.' };
    const a = this.roleOf(playerId);
    if (!a || a.team !== this.turnTeam || a.role !== 'spy') return { ok: false, error: 'Seul le maître-espion de l\'équipe active donne l\'indice.' };
    if (this.clue) return { ok: false, error: 'Un indice est déjà en jeu : laissez vos agents deviner.' };

    const clean = String(word ?? '').trim();
    if (!clean || /[\s\d]/.test(clean)) return { ok: false, error: 'L\'indice doit être un seul mot, sans espace ni chiffre.' };
    const norm = normalize(clean);
    const collision = this.cards.find((c) => !c.revealed && normalize(c.word) === norm);
    if (collision) return { ok: false, error: `« ${collision.word} » est encore sur la grille : indice interdit.` };
    count = Number(count);
    if (!Number.isInteger(count) || count < 0 || count > 9) return { ok: false, error: 'Le nombre doit être entre 0 et 9.' };

    this.clue = { word: clean, count };
    this.guessesLeft = count === 0 ? Infinity : count + 1;
    this.guessedThisTurn = 0;
    this.say(`💡 Indice des ${TEAMS[this.turnTeam].nom} : « ${clean} » ${count === 0 ? '(∞)' : count}.`);
    return { ok: true };
  }

  /* ------------------------------ désignations ------------------------ */

  requireActiveAgent(playerId) {
    if (this.phase !== 'jeu') return 'Aucune manche en cours.';
    const a = this.roleOf(playerId);
    if (!a || a.team !== this.turnTeam || a.role !== 'agent') return 'Seuls les agents de l\'équipe active peuvent désigner un mot.';
    if (!this.clue) return 'Attendez l\'indice de votre maître-espion.';
    return null;
  }

  guess(playerId, index) {
    const err = this.requireActiveAgent(playerId);
    if (err) return { ok: false, error: err };
    const card = this.cards[index];
    if (!card) return { ok: false, error: 'Case inconnue.' };
    if (card.revealed) return { ok: false, error: 'Ce mot est déjà révélé.' };

    card.revealed = true;
    card.by = playerId;
    this.guessedThisTurn += 1;
    const team = this.turnTeam;

    if (card.color === 'X') {
      this.say(`💀 ${this.pseudoOf(playerId)} désigne « ${card.word} »… l'ASSASSIN !`);
      return this.endRound(other(team), 'assassin');
    }
    if (card.color === team) {
      this.say(`✅ « ${card.word} » était bien aux ${TEAMS[team].nom} (${this.pseudoOf(playerId)}).`);
      if (this.remaining(team) === 0) return this.endRound(team, 'mots');
      this.guessesLeft -= 1;
      if (this.guessesLeft <= 0) {
        this.say('🔚 Plus d\'essais : fin du tour.');
        this.endTurn();
      }
      return { ok: true };
    }
    if (card.color === 'N') {
      this.say(`⬜ « ${card.word} » était neutre : fin du tour des ${TEAMS[team].nom}.`);
      this.endTurn();
      return { ok: true };
    }
    // Mot adverse : cadeau, et il peut conclure leur grille.
    this.say(`❌ « ${card.word} » appartenait aux ${TEAMS[card.color].nom} !`);
    if (this.remaining(card.color) === 0) return this.endRound(card.color, 'mots');
    this.endTurn();
    return { ok: true };
  }

  pass(playerId) {
    const err = this.requireActiveAgent(playerId);
    if (err) return { ok: false, error: err };
    if (this.guessedThisTurn < 1) return { ok: false, error: 'Vous devez désigner au moins un mot avant de passer.' };
    this.say(`⏭️ Les ${TEAMS[this.turnTeam].nom} passent.`);
    this.endTurn();
    return { ok: true };
  }

  endTurn() {
    this.turnTeam = other(this.turnTeam);
    this.clue = null;
    this.guessesLeft = 0;
    this.guessedThisTurn = 0;
    this.say(`🗣️ Au tour des ${TEAMS[this.turnTeam].nom} — ${this.spyOf(this.turnTeam).pseudo} donne un indice.`);
  }

  remaining(team) {
    return this.cards.filter((c) => c.color === team && !c.revealed).length;
  }

  endRound(winner, reason) {
    this.winner = winner;
    this.winReason = reason;
    this.wins[winner] += 1;
    this.phase = 'fin-manche';
    this.say(reason === 'assassin'
      ? `🏆 Les ${TEAMS[winner].nom} gagnent la manche : l'adversaire a réveillé l'assassin !`
      : `🏆 Les ${TEAMS[winner].nom} gagnent la manche : tous leurs mots sont découverts !`);
    return { ok: true };
  }

  endMatch() {
    this.phase = 'fin-partie';
    const { R, B } = this.wins;
    const summary = R === B
      ? `🕵️ Codenames terminé — égalité ${R} manche(s) partout.`
      : `🕵️ Codenames terminé — victoire des ${TEAMS[R > B ? 'R' : 'B'].nom} (${Math.max(R, B)} manche(s) à ${Math.min(R, B)}).`;
    return { summary, wins: this.wins, manches: this.manche };
  }

  /* ------------------------------ actions & vues ---------------------- */

  handleAction(playerId, action = {}) {
    switch (action.a) {
      case 'join': return this.join(playerId, action.team, action.role);
      case 'start': return this.startRound(playerId);
      case 'clue': return this.giveClue(playerId, action.word, action.count);
      case 'guess': return this.guess(playerId, action.index);
      case 'pass': return this.pass(playerId);
      default: return { ok: false, error: 'Action inconnue.' };
    }
  }

  /** Vue personnalisée : les couleurs ne sont visibles que des maîtres-espions. */
  getViewFor(playerId) {
    const me = this.roleOf(playerId);
    const revealAll = ['fin-manche', 'fin-partie'].includes(this.phase);
    const seesColors = revealAll || me?.role === 'spy';
    return {
      phase: this.phase,
      manche: this.manche,
      me,
      players: this.players.map((p) => {
        const a = this.assign.get(p.id);
        return { id: p.id, pseudo: p.pseudo, team: a?.team ?? null, role: a?.role ?? null };
      }),
      setup: this.phase === 'setup' || this.phase === 'fin-manche' ? this.setupCheck() : null,
      startingTeam: this.startingTeam,
      cards: this.cards.map((c) => ({
        word: c.word,
        revealed: c.revealed,
        color: c.revealed || seesColors ? c.color : null,
      })),
      turnTeam: this.phase === 'jeu' ? this.turnTeam : null,
      clue: this.clue,
      guessesLeft: this.guessesLeft === Infinity ? '∞' : this.guessesLeft,
      guessedThisTurn: this.guessedThisTurn,
      remaining: this.cards.length ? { R: this.remaining('R'), B: this.remaining('B') } : null,
      winner: this.winner,
      winReason: this.winReason,
      wins: this.wins,
      log: this.log.slice(-30),
    };
  }
}

/* ====================================================================== */
/* Interface (rendu pur à partir de la vue reçue)                         */
/* ====================================================================== */

const CSS = `
.cdn { display: grid; grid-template-columns: 1fr 280px; gap: 14px; height: 100%; min-height: 0; color: var(--text, #e8ecff); font-size: 0.95rem; width: 100%; }
.cdn__main { display: flex; flex-direction: column; gap: 12px; min-width: 0; min-height: 0; }
.cdn__panel { background: var(--glass, rgba(255,255,255,0.05)); border: 1px solid var(--glass-border, rgba(255,255,255,0.09)); border-radius: var(--radius-m, 14px); padding: 12px 14px; }
.cdn__bar { display: flex; align-items: center; gap: 12px; flex-wrap: wrap; }
.cdn__turn { margin-left: auto; font-weight: 600; }
.cdn--r { color: #ff6b6b; } .cdn--b { color: #58a6ff; }
.cdn__grid { display: grid; grid-template-columns: repeat(5, 1fr); gap: 8px; }
.cdn__card { position: relative; border-radius: 10px; border: 1px solid rgba(255,255,255,0.14); background: linear-gradient(160deg, #1c2134, #12141f); color: var(--text, #e8ecff); padding: 0 4px; min-height: 62px; display: flex; align-items: center; justify-content: center; text-align: center; font-weight: 600; font-size: 0.88rem; text-transform: uppercase; letter-spacing: 0.02em; font-family: inherit; transition: transform .1s ease, box-shadow .1s ease; overflow-wrap: anywhere; }
.cdn__card--btn { cursor: pointer; }
.cdn__card--btn:hover { transform: translateY(-3px); box-shadow: 0 8px 18px rgba(0,0,0,0.4); }
.cdn__card--R { background: linear-gradient(160deg, #7e2430, #4a151d); border-color: #ff6b6b88; }
.cdn__card--B { background: linear-gradient(160deg, #1e3a6d, #12233f); border-color: #58a6ff88; }
.cdn__card--N { background: linear-gradient(160deg, #55503f, #322f26); border-color: #cfc49b55; }
.cdn__card--X { background: linear-gradient(160deg, #0a0a0d, #000); border-color: #fff3; color: #ffb454; }
.cdn__card--revealed { opacity: 0.92; }
.cdn__card--revealed::after { content: '✔'; position: absolute; top: 4px; right: 7px; font-size: 0.7rem; opacity: 0.8; }
.cdn__key { position: absolute; inset: 0; border-radius: 10px; pointer-events: none; border: 2px solid transparent; }
.cdn__key--R { border-color: #ff6b6b; } .cdn__key--B { border-color: #58a6ff; }
.cdn__key--N { border-color: #cfc49b66; } .cdn__key--X { border-color: #ffb454; box-shadow: inset 0 0 14px #ffb45444; }
.cdn__teams { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
.cdn__team { border-radius: var(--radius-m, 14px); padding: 12px; border: 1px solid; }
.cdn__team--R { border-color: #ff6b6b55; background: #ff6b6b0d; }
.cdn__team--B { border-color: #58a6ff55; background: #58a6ff0d; }
.cdn__member { display: flex; gap: 8px; align-items: center; padding: 3px 0; }
.cdn__actions { display: flex; gap: 10px; flex-wrap: wrap; justify-content: center; align-items: center; }
.cdn__clueform { display: flex; gap: 8px; justify-content: center; align-items: center; flex-wrap: wrap; }
.cdn__clueform input[type=text] { background: rgba(0,0,0,0.3); border: 1px solid var(--glass-border, rgba(255,255,255,0.12)); color: inherit; border-radius: 8px; padding: 8px 10px; width: 180px; }
.cdn__clueform select { background: rgba(0,0,0,0.3); border: 1px solid var(--glass-border, rgba(255,255,255,0.12)); color: inherit; border-radius: 8px; padding: 8px; }
.cdn__clue { font-size: 1.05rem; font-weight: 700; }
.cdn__side { display: flex; flex-direction: column; gap: 12px; min-height: 0; overflow: auto; }
.cdn__log { font-size: 0.8rem; color: var(--text-dim, #aab); max-height: 220px; overflow: auto; display: flex; flex-direction: column; gap: 4px; }
.cdn__status { min-height: 1.2em; color: var(--warning, #ffb454); font-size: 0.85rem; text-align: center; }
.tag { font-size: 0.68rem; padding: 2px 6px; border-radius: 99px; background: rgba(124,92,255,0.25); }
@media (max-width: 1000px) { .cdn { grid-template-columns: 1fr; } .cdn__card { min-height: 52px; font-size: 0.74rem; } }
`;

/** Petite fabrique DOM locale (module autonome, aucun import du cœur). */
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
    node.append(typeof c === 'string' ? document.createTextNode(c) : c);
  });
  return node;
}

const teamClass = (t) => (t === 'R' ? 'cdn--r' : 'cdn--b');
const TEAM_NAMES = { R: 'Rouges', B: 'Bleus' };

class CodenamesUI {
  constructor(container, context) {
    this.container = container;
    this.ctx = context;
    this.isHost = context.me.id === context.hostId;
    this.engine = null;
    this.unsubscribe = null;
  }

  mount() {
    this.styleEl = h('style', {}, CSS);
    this.root = h('div', { className: 'cdn' });
    this.container.append(this.styleEl, this.root);

    if (this.isHost) {
      try {
        this.engine = new CodenamesEngine(this.ctx.players, { hostId: this.ctx.hostId });
      } catch (error) {
        this.root.replaceChildren(h('div', { className: 'cdn__panel', style: 'margin:auto;' }, `⚠️ ${error.message}`));
        return;
      }
      this.unsubscribe = this.ctx.onMessage(({ from, data }) => {
        if (data?.t === 'action') this.hostHandle(from, data.action);
      });
      this.broadcast();
    } else {
      this.unsubscribe = this.ctx.onMessage(({ from, data }) => {
        if (from !== this.ctx.hostId) return;
        if (data?.t === 'view') this.render(data.view);
        else if (data?.t === 'error') this.setStatus(data.message);
      });
      this.root.replaceChildren(h('div', { className: 'cdn__panel', style: 'margin:auto;' }, '⏳ Connexion à la table du Host…'));
    }
  }

  hostHandle(playerId, action) {
    const result = this.engine.handleAction(playerId, action);
    if (!result.ok) { this.ctx.sendMessage({ t: 'error', message: result.error }, playerId); return; }
    this.broadcast();
  }

  act(action) {
    if (this.isHost) {
      const result = this.engine.handleAction(this.ctx.me.id, action);
      if (!result.ok) this.setStatus(result.error);
      else this.broadcast();
    } else {
      this.ctx.sendMessage({ t: 'action', action }, this.ctx.hostId);
    }
  }

  broadcast() {
    for (const p of this.engine.players) {
      if (p.id === this.ctx.me.id) continue;
      this.ctx.sendMessage({ t: 'view', view: this.engine.getViewFor(p.id) }, p.id);
    }
    this.render(this.engine.getViewFor(this.ctx.me.id));
  }

  setStatus(message) {
    if (!this.statusEl) return;
    this.statusEl.textContent = message ?? '';
    clearTimeout(this.statusTimer);
    this.statusTimer = setTimeout(() => { if (this.statusEl) this.statusEl.textContent = ''; }, 3500);
  }

  /* -------- rendu -------- */

  render(view) {
    this.view = view;
    const meId = this.ctx.me.id;
    const iAmActiveAgent = view.phase === 'jeu' && view.me?.role === 'agent' && view.me?.team === view.turnTeam && !!view.clue;
    const iAmActiveSpy = view.phase === 'jeu' && view.me?.role === 'spy' && view.me?.team === view.turnTeam && !view.clue;

    const bar = h('div', { className: 'cdn__panel cdn__bar' }, [
      h('strong', {}, `🕵️ Codenames — manche ${view.manche || '—'}`),
      view.remaining
        ? h('span', {}, [
          h('span', { className: 'cdn--r' }, `Rouges : ${view.remaining.R}`), ' · ',
          h('span', { className: 'cdn--b' }, `Bleus : ${view.remaining.B}`),
          ` · Manches ${view.wins.R}–${view.wins.B}`,
        ])
        : h('span', {}, `Manches ${view.wins.R}–${view.wins.B}`),
      h('span', { className: `cdn__turn ${view.turnTeam ? teamClass(view.turnTeam) : ''}` },
        view.phase === 'setup' ? 'Constitution des équipes'
          : view.phase === 'jeu' ? `Au tour des ${TEAM_NAMES[view.turnTeam]}`
            : view.phase === 'fin-manche' ? 'Fin de manche' : 'Partie terminée'),
    ]);

    const center = h('div', { className: 'cdn__panel', style: 'flex:1;display:flex;flex-direction:column;gap:12px;justify-content:center;' });
    if (view.phase === 'setup') center.append(...this.renderSetup(view));
    else center.append(...this.renderBoard(view, iAmActiveAgent, iAmActiveSpy));

    this.statusEl = h('div', { className: 'cdn__status' });

    const side = h('div', { className: 'cdn__side' }, [
      h('div', { className: 'cdn__panel' }, [h('strong', {}, 'Équipes'), this.renderTeamsSummary(view)]),
      h('div', { className: 'cdn__panel' }, [
        h('strong', {}, 'Historique'),
        h('div', { className: 'cdn__log' }, [...view.log].reverse().map((l) => h('div', {}, l))),
      ]),
      ...(this.isHost && !['fin-manche', 'fin-partie', 'setup'].includes(view.phase)
        ? [h('button', { className: 'btn btn--ghost btn--small', onClick: () => this.confirmEnd() }, '🛑 Terminer la partie')]
        : []),
    ]);

    this.root.replaceChildren(h('div', { className: 'cdn__main' }, [bar, center, this.statusEl]), side);
    void meId;
  }

  renderSetup(view) {
    const my = view.me;
    const teamCol = (t) => {
      const members = view.players.filter((p) => p.team === t);
      const spyTaken = members.some((p) => p.role === 'spy');
      return h('div', { className: `cdn__team cdn__team--${t}` }, [
        h('strong', { className: teamClass(t) }, TEAM_NAMES[t]),
        ...members.map((p) => h('div', { className: 'cdn__member' }, [
          h('span', {}, p.pseudo),
          p.role === 'spy' ? h('span', { className: 'tag' }, '🎩 Maître-espion') : h('span', { className: 'tag' }, 'Agent'),
        ])),
        h('div', { className: 'cdn__actions', style: 'margin-top:8px;' }, [
          h('button', { className: 'btn btn--ghost btn--small', onClick: () => this.act({ a: 'join', team: t, role: 'agent' }) }, 'Agent'),
          ...(!spyTaken || (my?.team === t && my?.role === 'spy')
            ? [h('button', { className: 'btn btn--primary btn--small', onClick: () => this.act({ a: 'join', team: t, role: 'spy' }) }, '🎩 Maître-espion')]
            : []),
        ]),
      ]);
    };
    const nodes = [
      h('div', { style: 'text-align:center;color:var(--text-dim,#aab);' },
        'Deux équipes, un maître-espion chacune : il voit les couleurs et fait deviner ses mots avec un indice « mot + nombre ». Évitez l\'assassin !'),
      h('div', { className: 'cdn__teams' }, [teamCol('R'), teamCol('B')]),
    ];
    if (this.isHost) {
      nodes.push(h('div', { className: 'cdn__actions' }, [
        h('button', {
          className: 'btn btn--primary',
          onClick: () => this.act({ a: 'start' }),
        }, '▶️ Lancer la manche'),
        ...(view.setup && !view.setup.valid ? [h('span', { style: 'color:var(--text-dim,#aab);font-size:0.85rem;' }, view.setup.reason)] : []),
      ]));
    } else {
      nodes.push(h('div', { style: 'text-align:center;color:var(--text-dim,#aab);font-size:0.85rem;' }, 'Le Host lancera la manche quand les équipes seront prêtes.'));
    }
    return nodes;
  }

  renderBoard(view, iAmActiveAgent, iAmActiveSpy) {
    const nodes = [];

    // Bandeau indice / fin de manche.
    if (view.phase === 'jeu') {
      if (view.clue) {
        nodes.push(h('div', { style: 'text-align:center;' }, [
          h('span', { className: `cdn__clue ${teamClass(view.turnTeam)}` }, `💡 « ${view.clue.word} » ${view.clue.count === 0 ? '∞' : view.clue.count}`),
          h('span', { style: 'color:var(--text-dim,#aab);' }, ` — essais restants : ${view.guessesLeft}`),
        ]));
      } else if (iAmActiveSpy) {
        const input = h('input', { type: 'text', placeholder: 'Indice (un seul mot)', maxlength: '30' });
        const select = h('select', {}, Array.from({ length: 10 }, (_, i) => {
          const o = h('option', { value: String(i) }, i === 0 ? '0 (∞)' : String(i));
          return o;
        }));
        select.value = '1';
        nodes.push(h('div', { className: 'cdn__clueform' }, [
          input, select,
          h('button', { className: 'btn btn--primary', onClick: () => this.act({ a: 'clue', word: input.value, count: Number(select.value) }) }, 'Donner l\'indice'),
        ]));
      } else {
        const spy = view.players.find((p) => p.team === view.turnTeam && p.role === 'spy');
        nodes.push(h('div', { style: `text-align:center;` }, [
          h('span', { className: teamClass(view.turnTeam) }, `${spy?.pseudo ?? '?'} réfléchit à un indice…`),
        ]));
      }
    }
    if (['fin-manche', 'fin-partie'].includes(view.phase) && view.winner) {
      nodes.push(h('div', { style: 'text-align:center;font-size:1.1rem;font-weight:700;' }, [
        h('span', { className: teamClass(view.winner) },
          `🏆 Les ${TEAM_NAMES[view.winner]} remportent la manche ${view.winReason === 'assassin' ? '(assassin adverse !)' : '(grille complétée)'}`),
      ]));
    }

    // Grille.
    nodes.push(h('div', { className: 'cdn__grid' }, view.cards.map((c, i) => {
      const cls = ['cdn__card'];
      if (c.revealed) cls.push(`cdn__card--${c.color}`, 'cdn__card--revealed');
      const clickable = iAmActiveAgent && !c.revealed;
      if (clickable) cls.push('cdn__card--btn');
      const children = [c.word];
      // Clé du maître-espion : liseré coloré sur les cases non révélées.
      if (!c.revealed && c.color) children.push(h('span', { className: `cdn__key cdn__key--${c.color}` }));
      return h(clickable ? 'button' : 'div', {
        className: cls.join(' '),
        ...(clickable ? { type: 'button', onClick: () => this.act({ a: 'guess', index: i }) } : {}),
      }, children);
    })));

    // Actions bas de grille.
    const actions = [];
    if (iAmActiveAgent) {
      actions.push(h('button', {
        className: 'btn btn--ghost',
        onClick: () => this.act({ a: 'pass' }),
      }, `⏭️ Passer${view.guessedThisTurn < 1 ? ' (désignez d\'abord un mot)' : ''}`));
    }
    if (this.isHost && view.phase === 'fin-manche') {
      actions.push(
        h('button', { className: 'btn btn--primary', onClick: () => this.act({ a: 'start' }) }, '▶️ Nouvelle manche'),
        h('button', { className: 'btn btn--ghost', onClick: () => this.confirmEnd() }, '🏁 Terminer la partie'),
      );
    }
    if (view.phase === 'fin-partie') {
      nodes.push(h('div', { style: 'text-align:center;color:var(--text-dim,#aab);' }, 'Retour au salon dans quelques secondes…'));
    }
    if (actions.length) nodes.push(h('div', { className: 'cdn__actions' }, actions));

    return nodes;
  }

  renderTeamsSummary(view) {
    const box = h('div', {});
    for (const t of ['R', 'B']) {
      box.append(h('div', { style: 'margin-top:6px;' }, [
        h('strong', { className: teamClass(t) }, TEAM_NAMES[t]),
        ...view.players.filter((p) => p.team === t).map((p) => h('div', { className: 'cdn__member' }, [
          h('span', {}, p.pseudo),
          h('span', { className: 'tag' }, p.role === 'spy' ? '🎩' : 'Agent'),
        ])),
      ]));
    }
    const none = view.players.filter((p) => !p.team);
    if (none.length) {
      box.append(h('div', { style: 'margin-top:6px;color:var(--text-dim,#aab);' }, `Sans équipe : ${none.map((p) => p.pseudo).join(', ')}`));
    }
    return box;
  }

  confirmEnd() {
    const result = this.engine.endMatch();
    this.broadcast();
    this.endTimer = setTimeout(() => this.ctx.onEnd(result), 4500);
  }

  unmount() {
    this.unsubscribe?.();
    clearTimeout(this.statusTimer);
    clearTimeout(this.endTimer);
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
    instance = new CodenamesUI(container, context);
    instance.mount();
  },
  async unmount() {
    instance?.unmount();
    instance = null;
  },
};
