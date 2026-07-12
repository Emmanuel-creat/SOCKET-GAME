/**
 * UNO — moteur de règles pour la plateforme Arcade.
 *
 * Pur : aucune dépendance DOM/réseau, exporté pour être testé en Node.
 * Exécuté UNIQUEMENT chez le Host (architecture host-autoritaire) : les mains
 * ne quittent jamais son navigateur, chaque joueur reçoit une vue
 * personnalisée (sa main + le nombre de cartes des autres, jamais leur contenu).
 *
 * Règles officielles implémentées :
 *  - 108 cartes : par couleur (rouge, jaune, vert, bleu) un 0, deux 1-9,
 *    deux Passe, deux Inversion, deux +2 — plus 4 Jokers et 4 Jokers +4.
 *  - 7 cartes distribuées, première carte retournée (effet appliqué), le +4
 *    ne peut jamais être la carte de départ.
 *  - On joue une carte de la même couleur, du même symbole, ou un Joker.
 *  - Passe, Inversion (= Passe à 2 joueurs), +2, Joker (choix de couleur).
 *  - Joker +4 : jouable en bluff ; le joueur suivant peut le CONTESTER. Si le
 *    poseur avait une carte de la couleur en cours, il pioche 4 (et sa main est
 *    montrée au contestataire) ; sinon le contestataire pioche 6 et perd son tour.
 *  - « UNO ! » : à l'avant-dernière carte. Oubli → n'importe qui peut crier
 *    « Contre-UNO » pendant la fenêtre : 2 cartes de pénalité.
 *  - Pioche épuisée : la défausse est remélangée (sauf la carte du dessus).
 *  - Fin de manche : le premier à vider sa main marque la valeur des cartes des
 *    autres (chiffres = valeur, Passe/Inversion/+2 = 20, Jokers = 50).
 *    Premier à atteindre le score cible remporte la partie.
 *
 * Variantes maison (activables par le Host) :
 *  - cumul : un +2 se contre par un +2, un +4 par un +4 (les pénalités s'ajoutent) ;
 *  - piochePuisJoue : la carte piochée peut être jouée dans la foulée ;
 *  - defi4 : le Joker +4 n'est « légal » que sans carte de la couleur en cours
 *    (c'est ce que vérifie la contestation). Désactivé : le +4 est toujours légal.
 */

export const COLORS = Object.freeze(['r', 'j', 'v', 'b']);
export const COLOR_NAMES = Object.freeze({ r: 'Rouge', j: 'Jaune', v: 'Vert', b: 'Bleu' });
export const ACTIONS = Object.freeze(['skip', 'reverse', 'draw2']);
export const SCORE_TARGETS = Object.freeze([100, 200, 500]);

/** Valeur d'une carte au décompte de fin de manche. */
export function cardPoints(card) {
  if (card.c === 'w') return 50;
  if (ACTIONS.includes(card.v)) return 20;
  return Number(card.v);
}

export function cardLabel(card) {
  const sym = { skip: '🚫 Passe', reverse: '🔄 Inversion', draw2: '+2', wild: '🌈 Joker', wild4: '🌈 Joker +4' };
  const name = sym[card.v] ?? card.v;
  return card.c === 'w' ? name : `${name} ${COLOR_NAMES[card.c]}`;
}

export const DEFAULT_OPTIONS = Object.freeze({
  cumul: true,
  piochePuisJoue: true,
  defi4: true,
  scoreCible: 200,
});

export class UnoEngine {
  /** @param {{id,pseudo}[]} players 2 à 10 joueurs. */
  constructor(players, { hostId, rng = Math.random, options = {} } = {}) {
    if (players.length < 2 || players.length > 10) {
      throw new Error('UNO se joue de 2 à 10 joueurs.');
    }
    this.rng = rng;
    this.hostId = hostId ?? players[0].id;
    this.options = { ...DEFAULT_OPTIONS, ...options };
    this.players = players.map((p) => ({ id: p.id, pseudo: p.pseudo, hand: [], score: 0, saidUno: false }));
    this.n = this.players.length;
    this.phase = 'setup';
    this.round = 0;
    this.chat = [];
    this.log = [];
    this.winner = null;
    this.uid = 0;
    this.say('🃏 Le Host règle la partie, puis distribue.');
  }

  /* ------------------------------ utilitaires ------------------------- */

  say(text) { this.log.push(text); if (this.log.length > 120) this.log.shift(); }
  playerOf(id) { return this.players.find((p) => p.id === id) ?? null; }
  pseudoOf(id) { return this.playerOf(id)?.pseudo ?? '?'; }
  get current() { return this.players[this.turn]; }
  topCard() { return this.discard[this.discard.length - 1] ?? null; }

  shuffle(arr) {
    const d = [...arr];
    for (let i = d.length - 1; i > 0; i -= 1) {
      const j = Math.floor(this.rng() * (i + 1));
      [d[i], d[j]] = [d[j], d[i]];
    }
    return d;
  }

  buildDeck() {
    const deck = [];
    const add = (c, v) => deck.push({ id: `c${this.uid += 1}`, c, v });
    for (const c of COLORS) {
      add(c, '0');
      for (let v = 1; v <= 9; v += 1) { add(c, String(v)); add(c, String(v)); }
      for (const a of ACTIONS) { add(c, a); add(c, a); }
    }
    for (let i = 0; i < 4; i += 1) { add('w', 'wild'); add('w', 'wild4'); }
    return this.shuffle(deck); // 108 cartes
  }

  /** Pioche épuisée : on remélange la défausse (la carte du dessus reste en jeu). */
  drawFromDeck() {
    if (this.deck.length === 0) {
      const top = this.discard.pop();
      if (this.discard.length === 0) { this.discard.push(top); return null; } // plus rien à piocher
      this.deck = this.shuffle(this.discard);
      this.discard = [top];
      this.say('♻️ Pioche épuisée : la défausse est remélangée.');
    }
    return this.deck.pop() ?? null;
  }

  give(player, count) {
    const drawn = [];
    for (let i = 0; i < count; i += 1) {
      const card = this.drawFromDeck();
      if (!card) break;
      player.hand.push(card);
      drawn.push(card);
    }
    if (player.hand.length > 1) player.saidUno = false;
    return drawn;
  }

  /* ------------------------------ mise en place ------------------------ */

  configure(pid, options) {
    if (pid !== this.hostId) return { ok: false, error: 'Seul le Host règle la partie.' };
    if (this.phase !== 'setup') return { ok: false, error: 'La partie a commencé.' };
    const o = { ...this.options, ...options };
    o.scoreCible = SCORE_TARGETS.includes(Number(o.scoreCible)) ? Number(o.scoreCible) : DEFAULT_OPTIONS.scoreCible;
    for (const k of ['cumul', 'piochePuisJoue', 'defi4']) o[k] = !!o[k];
    this.options = o;
    return { ok: true };
  }

  start(pid) {
    if (pid !== this.hostId) return { ok: false, error: 'Seul le Host lance la partie.' };
    if (this.phase !== 'setup') return { ok: false, error: 'La partie a commencé.' };
    this.startRound();
    return { ok: true };
  }

  startRound() {
    this.round += 1;
    this.deck = this.buildDeck();
    this.discard = [];
    this.direction = 1;
    this.turn = 0;
    this.pendingDraw = 0;
    this.pendingType = null;
    this.pendingChallenge = null;
    this.drawnDecision = null;
    this.unoWindow = null;
    this.reveal = null;
    this.roundEnd = null;
    for (const p of this.players) { p.hand = []; p.saidUno = false; }
    for (const p of this.players) this.give(p, 7);

    // Première carte : jamais un +4 (remis dans la pioche et remélangé).
    let first = this.deck.pop();
    while (first.v === 'wild4') {
      this.deck.push(first);
      this.deck = this.shuffle(this.deck);
      first = this.deck.pop();
    }
    this.discard.push(first);
    this.color = first.c === 'w' ? COLORS[Math.floor(this.rng() * 4)] : first.c;
    this.phase = 'jeu';
    this.say(`🃏 Manche ${this.round} — première carte : ${cardLabel(first)}.`);

    // Effet de la carte de départ.
    if (first.v === 'wild') {
      this.say(`🎨 Joker de départ : la couleur est tirée au sort — ${COLOR_NAMES[this.color]}.`);
    } else if (first.v === 'skip') {
      this.say(`🚫 ${this.pseudoOf(this.current.id)} passe son tour d'entrée de jeu.`);
      this.advance(1);
    } else if (first.v === 'reverse') {
      this.direction = -1;
      this.turn = (this.n - 1) % this.n;
      this.say('🔄 Inversion dès la première carte : le sens de jeu part à l\'envers.');
    } else if (first.v === 'draw2') {
      const victim = this.current;
      this.give(victim, 2);
      this.say(`💥 ${victim.pseudo} pioche 2 cartes et passe son tour.`);
      this.advance(1);
    }
  }

  advance(step = 1) {
    this.turn = (this.turn + this.direction * step + this.n * 2) % this.n;
    // La fenêtre « Contre-UNO » d'un joueur se referme quand son tour revient.
    if (this.unoWindow && this.unoWindow.pid === this.current.id) this.unoWindow = null;
  }

  /* ------------------------------ jouabilité --------------------------- */

  isPlayable(card) {
    // Sous le coup d'une pénalité cumulable : seule une carte du même type contre.
    if (this.pendingDraw > 0) {
      if (!this.options.cumul) return false;
      if (this.pendingType === 'draw2') return card.v === 'draw2';
      if (this.pendingType === 'wild4') return card.v === 'wild4';
      return false;
    }
    if (card.c === 'w') return true;
    const top = this.topCard();
    return card.c === this.color || card.v === top.v;
  }

  playableIdsFor(pid) {
    const p = this.playerOf(pid);
    if (!p || this.phase !== 'jeu' || this.current.id !== pid) return [];
    if (this.drawnDecision && this.drawnDecision.pid === pid) {
      const card = p.hand.find((c) => c.id === this.drawnDecision.cardId);
      return card && this.isPlayable(card) ? [card.id] : [];
    }
    return p.hand.filter((c) => this.isPlayable(c)).map((c) => c.id);
  }

  /* ------------------------------ actions ------------------------------ */

  playCard(pid, cardId, { color = null, uno = false } = {}) {
    if (this.phase !== 'jeu') return { ok: false, error: 'La partie n\'est pas en cours.' };
    if (this.current.id !== pid) return { ok: false, error: 'Ce n\'est pas votre tour.' };
    const p = this.playerOf(pid);
    const card = p.hand.find((c) => c.id === cardId);
    if (!card) return { ok: false, error: 'Carte absente de votre main.' };
    if (this.drawnDecision && this.drawnDecision.pid === pid && this.drawnDecision.cardId !== cardId) {
      return { ok: false, error: 'Vous ne pouvez jouer que la carte piochée.' };
    }
    if (!this.isPlayable(card)) {
      return {
        ok: false,
        error: this.pendingDraw > 0
          ? `Vous devez piocher ${this.pendingDraw} cartes (ou contrer avec un ${this.pendingType === 'draw2' ? '+2' : 'Joker +4'}).`
          : 'Cette carte ne correspond ni à la couleur ni au symbole.',
      };
    }
    if (card.c === 'w' && !COLORS.includes(color)) return { ok: false, error: 'Choisissez une couleur.' };

    // Empiler une carte sous contestation revient à renoncer à contester.
    if (this.pendingChallenge && this.pendingChallenge.targetId === pid) this.pendingChallenge = null;
    // La main révélée après un bluff n'est plus affichée dès que son lecteur rejoue.
    if (this.reveal && this.reveal.toId === pid) this.reveal = null;

    // Bluff au +4 : on mémorise si le poseur avait la couleur en cours (pour la contestation).
    const hadColor = p.hand.some((c) => c.id !== card.id && c.c === this.color);
    const colorBefore = this.color;

    p.hand = p.hand.filter((c) => c.id !== cardId);
    this.discard.push(card);
    this.color = card.c === 'w' ? color : card.c;
    this.drawnDecision = null;
    // Poser une carte referme la fenêtre Contre-UNO ouverte par quelqu'un d'autre.
    if (this.unoWindow && this.unoWindow.pid !== pid) this.unoWindow = null;

    this.say(`▶️ ${p.pseudo} joue ${cardLabel(card)}${card.c === 'w' ? ` → ${COLOR_NAMES[color]}` : ''}.`);

    // Annonce « UNO ! ».
    if (p.hand.length === 1) {
      if (uno) {
        p.saidUno = true;
        this.say(`🗣️ ${p.pseudo} crie UNO !`);
      } else {
        p.saidUno = false;
        this.unoWindow = { pid, ouvertA: Date.now() };
        // Silence… les autres peuvent le prendre en défaut.
      }
    }

    // Fin de manche ?
    if (p.hand.length === 0) {
      this.unoWindow = null;
      this.endRound(p);
      return { ok: true, roundOver: true };
    }

    // Effets.
    switch (card.v) {
      case 'skip':
        this.say(`🚫 ${this.pseudoOf(this.players[(this.turn + this.direction + this.n) % this.n].id)} passe son tour.`);
        this.advance(2);
        break;
      case 'reverse':
        if (this.n === 2) { this.say('🔄 Inversion : à 2 joueurs, elle fait passer le tour.'); this.advance(2); }
        else { this.direction *= -1; this.say('🔄 Le sens de jeu s\'inverse.'); this.advance(1); }
        break;
      case 'draw2':
        this.pendingDraw += 2;
        this.pendingType = 'draw2';
        this.advance(1);
        if (!this.options.cumul) this.applyPendingTo(this.current);
        break;
      case 'wild4':
        this.pendingDraw += 4;
        this.pendingType = 'wild4';
        this.advance(1);
        if (this.options.defi4) {
          // Le joueur visé peut contester le bluff avant de piocher.
          this.pendingChallenge = { targetId: this.current.id, byId: pid, hadColor, colorBefore };
          this.say(`⚖️ ${this.current.pseudo} peut contester le Joker +4 de ${p.pseudo}.`);
        } else if (!this.options.cumul) {
          this.applyPendingTo(this.current);
        }
        break;
      default:
        this.advance(1);
    }
    return { ok: true };
  }

  /** Application d'une pénalité accumulée au joueur visé (il pioche et passe). */
  applyPendingTo(victim) {
    const n = this.pendingDraw;
    this.give(victim, n);
    this.say(`💥 ${victim.pseudo} pioche ${n} carte${n > 1 ? 's' : ''} et passe son tour.`);
    this.pendingDraw = 0;
    this.pendingType = null;
    this.advance(1);
  }

  drawCard(pid) {
    if (this.phase !== 'jeu') return { ok: false, error: 'La partie n\'est pas en cours.' };
    if (this.current.id !== pid) return { ok: false, error: 'Ce n\'est pas votre tour.' };
    // Piocher alors qu'on pouvait contester = accepter la pénalité du Joker +4.
    if (this.pendingChallenge && this.pendingChallenge.targetId === pid) return this.resolveChallenge(pid, false);
    if (this.drawnDecision && this.drawnDecision.pid === pid) return { ok: false, error: 'Vous avez déjà pioché.' };
    const p = this.playerOf(pid);
    if (this.reveal && this.reveal.toId === pid) this.reveal = null;

    // Pénalité en attente (cumul activé et non contrée) : on encaisse.
    if (this.pendingDraw > 0) {
      this.applyPendingTo(p);
      return { ok: true, penalty: true };
    }

    const [card] = this.give(p, 1);
    if (!card) { this.say('🚫 Plus aucune carte à piocher : le tour passe.'); this.advance(1); return { ok: true }; }
    this.say(`🫳 ${p.pseudo} pioche une carte.`);

    if (this.options.piochePuisJoue && this.isPlayable(card)) {
      // Le joueur peut jouer la carte piochée… ou passer.
      this.drawnDecision = { pid, cardId: card.id };
      return { ok: true, drawn: card, canPlay: true };
    }
    this.advance(1);
    return { ok: true, drawn: card, canPlay: false };
  }

  /** Le joueur renonce à jouer la carte qu'il vient de piocher. */
  passTurn(pid) {
    if (this.phase !== 'jeu') return { ok: false, error: 'La partie n\'est pas en cours.' };
    if (!this.drawnDecision || this.drawnDecision.pid !== pid) {
      return { ok: false, error: 'Vous ne pouvez passer qu\'après avoir pioché.' };
    }
    this.drawnDecision = null;
    this.say(`⏭️ ${this.pseudoOf(pid)} passe son tour.`);
    this.advance(1);
    return { ok: true };
  }

  /** Contestation d'un Joker +4 (règle officielle). */
  resolveChallenge(pid, challenge) {
    const ch = this.pendingChallenge;
    if (!ch || ch.targetId !== pid) return { ok: false, error: 'Rien à contester.' };
    const victim = this.playerOf(pid);
    const bluffer = this.playerOf(ch.byId);
    this.pendingChallenge = null;

    if (!challenge) {
      // Accepté : le joueur pioche la pénalité et passe son tour.
      this.applyPendingTo(victim);
      return { ok: true, challenged: false };
    }

    if (ch.hadColor) {
      // Bluff démasqué : le poseur pioche 4, sa main est montrée au contestataire,
      // et le tour du contestataire se déroule normalement.
      const n = this.pendingDraw;
      this.give(bluffer, n);
      this.pendingDraw = 0;
      this.pendingType = null;
      this.reveal = { toId: pid, ofId: bluffer.id, hand: bluffer.hand.map((c) => ({ ...c })) };
      this.say(`🔍 ${victim.pseudo} conteste… ${bluffer.pseudo} bluffait (il avait du ${COLOR_NAMES[ch.colorBefore]}) et pioche ${n} cartes !`);
      return { ok: true, challenged: true, bluff: true };
    }

    // Contestation ratée : 2 cartes de plus (soit 6) et le tour saute.
    const n = this.pendingDraw + 2;
    this.give(victim, n);
    this.pendingDraw = 0;
    this.pendingType = null;
    this.say(`🙈 ${victim.pseudo} conteste à tort : ${bluffer.pseudo} n'avait pas de ${COLOR_NAMES[ch.colorBefore]} — ${n} cartes et tour perdu !`);
    this.advance(1);
    return { ok: true, challenged: true, bluff: false };
  }

  /** Cri tardif : on peut encore sauver son UNO tant que personne ne l'a vu. */
  sayUno(pid) {
    const p = this.playerOf(pid);
    if (!p || this.phase !== 'jeu') return { ok: false, error: 'Impossible.' };
    if (p.hand.length !== 1) return { ok: false, error: 'On crie UNO avec une seule carte en main.' };
    p.saidUno = true;
    if (this.unoWindow && this.unoWindow.pid === pid) this.unoWindow = null;
    this.say(`🗣️ ${p.pseudo} crie UNO !`);
    return { ok: true };
  }

  /** Contre-UNO : prendre en défaut un joueur qui a oublié de l'annoncer. */
  catchUno(pid, targetId) {
    if (this.phase !== 'jeu') return { ok: false, error: 'Impossible.' };
    if (pid === targetId) return { ok: false, error: 'On ne se dénonce pas soi-même.' };
    if (!this.unoWindow || this.unoWindow.pid !== targetId) {
      return { ok: false, error: 'Ce joueur n\'est pas en défaut.' };
    }
    const target = this.playerOf(targetId);
    this.unoWindow = null;
    this.give(target, 2);
    this.say(`🚨 ${this.pseudoOf(pid)} crie « Contre-UNO ! » — ${target.pseudo} pioche 2 cartes.`);
    return { ok: true };
  }

  /** Referme la fenêtre Contre-UNO (appelée par la couche Host après quelques secondes). */
  closeUnoWindow() {
    if (!this.unoWindow) return { ok: false };
    const p = this.playerOf(this.unoWindow.pid);
    if (p) p.saidUno = true; // trop tard pour le prendre en défaut
    this.unoWindow = null;
    return { ok: true };
  }

  /** Host : un joueur ne répond plus → il pioche et son tour passe. */
  forceTurn(pid) {
    if (pid !== this.hostId || this.phase !== 'jeu') return { ok: false, error: 'Impossible.' };
    const p = this.current;
    if (this.pendingChallenge) { this.resolveChallenge(p.id, false); this.say('⏭️ Le Host force la décision (pas de contestation).'); return { ok: true }; }
    if (this.drawnDecision) return this.passTurn(p.id);
    if (this.pendingDraw > 0) { this.applyPendingTo(p); return { ok: true }; }
    this.give(p, 1);
    this.say(`⏭️ Le Host force le tour de ${p.pseudo} (pioche et passe).`);
    this.advance(1);
    return { ok: true };
  }

  /* ------------------------------ manches et scores -------------------- */

  endRound(winner) {
    const details = this.players
      .filter((p) => p.id !== winner.id)
      .map((p) => ({ id: p.id, pseudo: p.pseudo, cartes: p.hand.length, points: p.hand.reduce((s, c) => s + cardPoints(c), 0) }));
    const gain = details.reduce((s, d) => s + d.points, 0);
    winner.score += gain;
    this.roundEnd = { winnerId: winner.id, winnerName: winner.pseudo, gain, details, scores: this.scores() };
    this.say(`🏁 ${winner.pseudo} termine la manche et marque ${gain} points !`);

    if (winner.score >= this.options.scoreCible) {
      this.phase = 'fin';
      this.winner = { id: winner.id, pseudo: winner.pseudo, score: winner.score };
      this.say(`🏆 ${winner.pseudo} atteint ${winner.score} points et remporte la partie !`);
    } else {
      this.phase = 'fin-manche';
    }
  }

  /** Manche suivante (le Host enchaîne). */
  nextRound(pid) {
    if (pid !== this.hostId) return { ok: false, error: 'Seul le Host relance.' };
    if (this.phase !== 'fin-manche') return { ok: false, error: 'Pas de manche à relancer.' };
    this.startRound();
    return { ok: true };
  }

  scores() {
    return [...this.players]
      .map((p) => ({ id: p.id, pseudo: p.pseudo, score: p.score }))
      .sort((a, b) => b.score - a.score);
  }

  summary() {
    const classement = this.scores();
    return {
      summary: this.winner
        ? `🃏 UNO — ${this.winner.pseudo} gagne avec ${this.winner.score} points !`
        : `🃏 UNO — partie interrompue (${classement[0]?.pseudo ?? '?'} en tête).`,
      classement,
      manches: this.round,
    };
  }

  /* ------------------------------ chat & actions ----------------------- */

  addChat(pid, text) {
    const clean = String(text ?? '').trim().slice(0, 240);
    if (!clean) return { ok: false, error: 'Message vide.' };
    this.chat.push({ from: pid, pseudo: this.pseudoOf(pid), text: clean, ts: Date.now() });
    if (this.chat.length > 120) this.chat.shift();
    return { ok: true };
  }

  handleAction(pid, action = {}) {
    switch (action.a) {
      case 'configure': return this.configure(pid, action.options);
      case 'start': return this.start(pid);
      case 'play': return this.playCard(pid, action.cardId, { color: action.color, uno: action.uno });
      case 'draw': return this.drawCard(pid);
      case 'pass': return this.passTurn(pid);
      case 'challenge': return this.resolveChallenge(pid, !!action.challenge);
      case 'uno': return this.sayUno(pid);
      case 'catch': return this.catchUno(pid, action.target);
      case 'force': return this.forceTurn(pid);
      case 'next-round': return this.nextRound(pid);
      case 'chat': return this.addChat(pid, action.text);
      default: return { ok: false, error: 'Action inconnue.' };
    }
  }

  /* ------------------------------ vues --------------------------------- */

  /**
   * Vue personnalisée : la main du destinataire uniquement. Les autres joueurs
   * ne sont décrits que par leur NOMBRE de cartes — leur contenu ne quitte
   * jamais le Host (sauf la main du bluffeur, montrée au seul contestataire).
   */
  getViewFor(pid) {
    const me = this.playerOf(pid);
    const top = this.phase === 'setup' ? null : this.topCard();
    const view = {
      phase: this.phase,
      round: this.round,
      options: this.options,
      isHost: pid === this.hostId,
      players: this.players.map((p, i) => ({
        id: p.id,
        pseudo: p.pseudo,
        cartes: p.hand.length,
        score: p.score,
        isTurn: this.phase === 'jeu' && this.turn === i,
        uno: p.hand.length === 1 && p.saidUno,
        // Fenêtre Contre-UNO : visible de tous, c'est tout l'intérêt.
        vulnerable: !!this.unoWindow && this.unoWindow.pid === p.id,
      })),
      hand: me ? me.hand.map((c) => ({ ...c, label: cardLabel(c) })) : [],
      playable: this.playableIdsFor(pid),
      top: top ? { ...top, label: cardLabel(top) } : null,
      color: this.color ?? null,
      colorName: this.color ? COLOR_NAMES[this.color] : null,
      direction: this.direction,
      turnId: this.phase === 'jeu' ? this.current.id : null,
      isMyTurn: this.phase === 'jeu' && this.current.id === pid,
      pendingDraw: this.pendingDraw,
      pendingType: this.pendingType,
      mustDecideDrawn: !!(this.drawnDecision && this.drawnDecision.pid === pid),
      deckCount: this.deck ? this.deck.length : 0,
      discardCount: this.discard ? this.discard.length : 0,
      unoWindow: this.unoWindow ? { pid: this.unoWindow.pid, pseudo: this.pseudoOf(this.unoWindow.pid) } : null,
      roundEnd: this.roundEnd,
      finalSummary: this.phase === 'fin' ? this.summary() : null,
      chat: this.chat.slice(-60),
      log: this.log.slice(-30),
    };

    // Contestation : seul le joueur visé voit le bouton.
    if (this.pendingChallenge && this.pendingChallenge.targetId === pid) {
      view.challenge = {
        byId: this.pendingChallenge.byId,
        byPseudo: this.pseudoOf(this.pendingChallenge.byId),
        montant: this.pendingDraw,
        couleur: COLOR_NAMES[this.pendingChallenge.colorBefore],
      };
    }
    // Main révélée après un bluff démasqué : uniquement pour le contestataire.
    if (this.reveal && this.reveal.toId === pid) {
      view.reveal = {
        ofPseudo: this.pseudoOf(this.reveal.ofId),
        hand: this.reveal.hand.map((c) => ({ ...c, label: cardLabel(c) })),
      };
    }
    return view;
  }
}
