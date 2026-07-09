/**
 * Tarot français — module de jeu pour la plateforme Arcade.
 *
 * Architecture « Host autoritaire » :
 *  - Le client du Host exécute le moteur de règles (TarotEngine) : distribution,
 *    enchères, écart, plis, comptes. Les mains privées ne quittent jamais le Host,
 *    chaque joueur reçoit une vue personnalisée (sa main + l'état public).
 *  - Les autres clients envoient leurs actions au Host via context.sendMessage
 *    (relais game:message du moteur, qui ne lit jamais le contenu).
 *
 * Règles implémentées (3 ou 4 joueurs) :
 *  - 78 cartes, distribution 24+6 (3 j.) ou 18+6 (4 j.), redonne si petit sec,
 *    redonne si tout le monde passe.
 *  - Enchères : Petite (×1), Garde (×2), Garde sans le chien (×4),
 *    Garde contre le chien (×6), un tour de parole.
 *  - Chien/écart : chien révélé (Petite/Garde), écart de 6 cartes sans roi ni
 *    bout, atouts autorisés seulement en dernier recours et annoncés.
 *  - Jeu de la carte : fournir à la couleur, couper si défaussé, obligation de
 *    monter à l'atout, Excuse jouable à tout moment (échange d'une basse carte),
 *    Excuse au dernier pli perdue sauf chelem.
 *  - Comptes : bouts et seuils (56/51/41/36), petit au bout (±10 × mult.),
 *    poignées (simple/double/triple), chelem non annoncé (±200),
 *    règlement (25 + écart ± petit au bout) × mult. + primes, scores cumulés.
 */

/* ====================================================================== */
/* Cartes                                                                 */
/* ====================================================================== */

const SUITS = Object.freeze({
  P: { nom: 'Pique', sym: '♠', color: 'noir' },
  C: { nom: 'Cœur', sym: '♥', color: 'rouge' },
  K: { nom: 'Carreau', sym: '♦', color: 'rouge' },
  T: { nom: 'Trèfle', sym: '♣', color: 'noir' },
});
const RANK_LABEL = { 11: 'V', 12: 'C', 13: 'D', 14: 'R' };
const RANK_NOM = { 11: 'Valet', 12: 'Cavalier', 13: 'Dame', 14: 'Roi' };

/** Construit les 78 cartes du jeu. */
export function buildDeck() {
  const deck = [];
  for (const s of Object.keys(SUITS)) for (let r = 1; r <= 14; r += 1) deck.push(`${s}${r}`);
  for (let a = 1; a <= 21; a += 1) deck.push(`A${a}`);
  deck.push('EX');
  return deck;
}

/** Décrit une carte : type, valeur en demi-points, libellés. */
export function cardInfo(id) {
  if (id === 'EX') {
    return { id, type: 'excuse', pointsDemi: 9, bout: true, label: '★', nom: 'Excuse' };
  }
  if (id[0] === 'A') {
    const n = Number(id.slice(1));
    const bout = n === 1 || n === 21;
    return { id, type: 'atout', n, pointsDemi: bout ? 9 : 1, bout, label: String(n), nom: `${n} d'atout` };
  }
  const suit = id[0];
  const rank = Number(id.slice(1));
  const pointsDemi = rank === 14 ? 9 : rank === 13 ? 7 : rank === 12 ? 5 : rank === 11 ? 3 : 1;
  return {
    id, type: 'couleur', suit, rank, pointsDemi, bout: false,
    label: RANK_LABEL[rank] ?? String(rank),
    nom: `${RANK_NOM[rank] ?? rank} de ${SUITS[suit].nom.toLowerCase()}`,
  };
}

export const pointsDemiOf = (ids) => ids.reduce((sum, id) => sum + cardInfo(id).pointsDemi, 0);
const boutsIn = (ids) => ids.filter((id) => cardInfo(id).bout).length;

/** Tri d'affichage : atouts décroissants, Excuse, puis couleurs (R → 1). */
export function sortHand(ids) {
  const suitOrder = { P: 0, C: 1, T: 2, K: 3 };
  return [...ids].sort((a, b) => {
    const ia = cardInfo(a); const ib = cardInfo(b);
    const ga = ia.type === 'atout' ? 0 : ia.type === 'excuse' ? 1 : 2;
    const gb = ib.type === 'atout' ? 0 : ib.type === 'excuse' ? 1 : 2;
    if (ga !== gb) return ga - gb;
    if (ia.type === 'atout') return ib.n - ia.n;
    if (ia.type === 'couleur') {
      if (ia.suit !== ib.suit) return suitOrder[ia.suit] - suitOrder[ib.suit];
      return ib.rank - ia.rank;
    }
    return 0;
  });
}

/* ====================================================================== */
/* Contrats et barèmes                                                    */
/* ====================================================================== */

const CONTRACTS = Object.freeze({
  1: { label: 'Petite', mult: 1 },
  2: { label: 'Garde', mult: 2 },
  3: { label: 'Garde sans le chien', mult: 4 },
  4: { label: 'Garde contre le chien', mult: 6 },
});
const TARGET_DEMI = Object.freeze({ 0: 112, 1: 102, 2: 82, 3: 72 }); // 56/51/41/36 pts
const POIGNEES = Object.freeze({
  3: [{ size: 13, bonus: 20, nom: 'Simple poignée' }, { size: 15, bonus: 30, nom: 'Double poignée' }, { size: 18, bonus: 40, nom: 'Triple poignée' }],
  4: [{ size: 10, bonus: 20, nom: 'Simple poignée' }, { size: 13, bonus: 30, nom: 'Double poignée' }, { size: 15, bonus: 40, nom: 'Triple poignée' }],
});

/* ====================================================================== */
/* Moteur de règles (pur : aucune dépendance DOM/réseau)                  */
/* ====================================================================== */

export class TarotEngine {
  /** @param {{id: string, pseudo: string}[]} players 3 ou 4 joueurs, ordre fixe. */
  constructor(players, { rng = Math.random } = {}) {
    if (players.length < 3 || players.length > 4) {
      throw new Error('Le tarot se joue à 3 ou 4 joueurs sur cette plateforme.');
    }
    this.players = players.map((p) => ({ id: p.id, pseudo: p.pseudo }));
    this.n = players.length;
    this.rng = rng;
    this.totals = Object.fromEntries(players.map((p) => [p.id, 0]));
    this.rounds = [];
    this.log = [];
    this.donne = 0;
    this.dealerIndex = Math.floor(rng() * this.n);
    this.phase = 'fin-donne'; // l'hôte lance la première donne
    this.finPartie = null;
  }

  /* ------------------------------ utilitaires ------------------------ */

  say(message) {
    this.log.push(message);
    if (this.log.length > 60) this.log.shift();
  }

  idx(playerId) { return this.players.findIndex((p) => p.id === playerId); }
  next(i) { return (i + 1) % this.n; }
  pseudoOf(id) { return this.players.find((p) => p.id === id)?.pseudo ?? '?'; }
  teamOf(id) { return id === this.contract?.takerId ? 'A' : 'D'; }

  shuffle(deck) {
    const d = [...deck];
    for (let i = d.length - 1; i > 0; i -= 1) {
      const j = Math.floor(this.rng() * (i + 1));
      [d[i], d[j]] = [d[j], d[i]];
    }
    return d;
  }

  /* ------------------------------ donne ------------------------------ */

  startDonne() {
    if (this.phase !== 'fin-donne') return { ok: false, error: 'Une donne est déjà en cours.' };
    this.donne += 1;
    this.dealerIndex = this.donne === 1 ? this.dealerIndex : this.next(this.dealerIndex);

    // Distribution (redonne automatique si un joueur a le petit sec).
    for (let attempt = 0; ; attempt += 1) {
      const deck = this.shuffle(buildDeck());
      const handSize = this.n === 3 ? 24 : 18;
      this.hands = new Map();
      this.players.forEach((p, i) => {
        this.hands.set(p.id, deck.slice(i * handSize, (i + 1) * handSize));
      });
      this.chien = deck.slice(this.n * handSize); // 6 cartes
      const petitSec = this.players.find((p) => {
        const h = this.hands.get(p.id);
        return h.includes('A1') && !h.some((c) => (c[0] === 'A' && c !== 'A1') || c === 'EX');
      });
      if (!petitSec) break;
      this.say(`♻️ ${petitSec.pseudo} avait le petit sec : nouvelle donne.`);
      if (attempt > 50) throw new Error('Distribution impossible.');
    }

    // Enchères.
    this.phase = 'encheres';
    this.contract = null;
    this.bids = [];
    this.bestLevel = 0;
    this.bestBidderId = null;
    this.turnIndex = this.next(this.dealerIndex);
    this.spoken = 0;

    // Jeu de la carte.
    this.trick = [];
    this.trickNumber = 0;
    this.lastTrick = null;
    this.piles = { A: [], D: [] };
    this.tricksWon = { A: 0, D: 0 };
    this.excusePlay = null; // { playerId, trickNumber, winnerTeam, isLast }
    this.poignees = [];
    this.firstCardPlayed = new Set();
    this.ecart = [];
    this.ecartAtoutsShown = [];
    this.roundResult = null;

    this.say(`🃏 Donne n°${this.donne} — ${this.pseudoOf(this.players[this.dealerIndex].id)} distribue.`);
    return { ok: true };
  }

  /* ------------------------------ enchères --------------------------- */

  bid(playerId, level) {
    if (this.phase !== 'encheres') return { ok: false, error: 'Ce n\'est pas le moment des enchères.' };
    const current = this.players[this.turnIndex];
    if (current.id !== playerId) return { ok: false, error: 'Ce n\'est pas à vous de parler.' };
    level = Number(level);
    if (![0, 1, 2, 3, 4].includes(level)) return { ok: false, error: 'Enchère invalide.' };
    if (level !== 0 && level <= this.bestLevel) return { ok: false, error: 'Il faut annoncer plus fort.' };

    this.bids.push({ playerId, level });
    if (level === 0) {
      this.say(`💬 ${this.pseudoOf(playerId)} passe.`);
    } else {
      this.bestLevel = level;
      this.bestBidderId = playerId;
      this.say(`📣 ${this.pseudoOf(playerId)} annonce ${CONTRACTS[level].label}.`);
    }
    this.spoken += 1;

    if (this.spoken < this.n) {
      this.turnIndex = this.next(this.turnIndex);
      return { ok: true };
    }

    // Tout le monde a parlé.
    if (this.bestLevel === 0) {
      this.say('🔁 Tout le monde passe : nouvelle donne.');
      this.phase = 'fin-donne';
      return this.startDonne();
    }
    return this.beginContract();
  }

  beginContract() {
    const level = this.bestLevel;
    this.contract = { takerId: this.bestBidderId, level, ...CONTRACTS[level] };
    const taker = this.pseudoOf(this.contract.takerId);
    this.say(`🎯 ${taker} joue ${this.contract.label} (×${this.contract.mult}).`);

    if (level <= 2) {
      // Petite / Garde : chien révélé à tous, le preneur fait son écart.
      this.hands.get(this.contract.takerId).push(...this.chien);
      this.phase = 'ecart';
      this.say(`👀 Chien : ${this.chien.map((c) => cardInfo(c).nom).join(', ')}. ${taker} fait son écart.`);
    } else {
      // Garde sans / contre : chien non révélé, attribué en fin de donne.
      this.say(level === 3
        ? '🙈 Garde sans le chien : le chien comptera pour l\'attaque.'
        : '🙈 Garde contre le chien : le chien comptera pour la défense.');
      this.startPlay();
    }
    return { ok: true };
  }

  /** Contraintes d'écart du preneur (règles officielles). */
  ecartConstraints(hand) {
    const plain = hand.filter((c) => {
      const i = cardInfo(c);
      return i.type === 'couleur' && i.rank !== 14; // ni roi, ni bout, ni atout
    });
    const allowAtouts = plain.length < 6; // atouts en dernier recours seulement
    return { plain, allowAtouts };
  }

  makeEcart(playerId, cards) {
    if (this.phase !== 'ecart') return { ok: false, error: 'Aucun écart à faire.' };
    if (playerId !== this.contract.takerId) return { ok: false, error: 'Seul le preneur fait l\'écart.' };
    if (!Array.isArray(cards) || new Set(cards).size !== 6 || cards.length !== 6) {
      return { ok: false, error: 'L\'écart doit contenir exactement 6 cartes.' };
    }

    const hand = this.hands.get(playerId);
    const { plain, allowAtouts } = this.ecartConstraints(hand);
    for (const c of cards) {
      if (!hand.includes(c)) return { ok: false, error: 'Carte absente de votre main.' };
      const i = cardInfo(c);
      if (i.bout || (i.type === 'couleur' && i.rank === 14)) {
        return { ok: false, error: 'Impossible d\'écarter un roi ou un bout.' };
      }
      if (i.type === 'atout' && !allowAtouts) {
        return { ok: false, error: 'Atout à l\'écart interdit tant qu\'il reste d\'autres cartes.' };
      }
    }
    // Si des atouts sont autorisés, on n'en écarte pas plus que nécessaire.
    const atoutsChoisis = cards.filter((c) => cardInfo(c).type === 'atout');
    if (atoutsChoisis.length > Math.max(0, 6 - plain.length)) {
      return { ok: false, error: 'Trop d\'atouts à l\'écart : gardez-en le maximum.' };
    }

    this.ecart = [...cards];
    this.hands.set(playerId, hand.filter((c) => !cards.includes(c)));
    this.ecartAtoutsShown = atoutsChoisis;
    this.say(atoutsChoisis.length > 0
      ? `⚠️ Écart réalisé — atout(s) montré(s) : ${atoutsChoisis.map((c) => cardInfo(c).nom).join(', ')}.`
      : '✅ Écart réalisé.');
    this.startPlay();
    return { ok: true };
  }

  /* ------------------------------ jeu de la carte --------------------- */

  startPlay() {
    this.phase = 'jeu';
    this.turnIndex = this.next(this.dealerIndex);
    this.trickNumber = 1;
    this.say(`▶️ ${this.pseudoOf(this.players[this.turnIndex].id)} entame.`);
  }

  /** Couleur/type effectif demandé par le pli (l'Excuse ne demande rien). */
  effectiveLead() {
    const first = this.trick.find((t) => t.card !== 'EX');
    return first ? cardInfo(first.card) : null;
  }

  /** Liste des cartes légales pour le joueur dont c'est le tour. */
  legalCards(playerId) {
    const hand = this.hands.get(playerId) ?? [];
    if (this.phase !== 'jeu' || this.players[this.turnIndex].id !== playerId) return [];
    const lead = this.effectiveLead();
    if (!lead) return [...hand]; // entame (ou derrière l'Excuse seule) : tout est permis

    const atoutsInTrick = this.trick.map((t) => cardInfo(t.card)).filter((i) => i.type === 'atout');
    const maxAtout = atoutsInTrick.length ? Math.max(...atoutsInTrick.map((i) => i.n)) : 0;
    const myAtouts = hand.filter((c) => cardInfo(c).type === 'atout');
    const overtrumps = myAtouts.filter((c) => cardInfo(c).n > maxAtout);
    const excuse = hand.includes('EX') ? ['EX'] : [];
    // Obligation de couper / monter : surcouper si possible, sinon n'importe quel atout.
    const mustAtout = () => [...(overtrumps.length ? overtrumps : myAtouts), ...excuse];

    if (lead.type === 'couleur') {
      const inSuit = hand.filter((c) => cardInfo(c).suit === lead.suit);
      if (inSuit.length) return [...inSuit, ...excuse];
      if (myAtouts.length) return mustAtout();
      return [...hand]; // défausse libre
    }
    // Entame à l'atout.
    if (myAtouts.length) return mustAtout();
    return [...hand];
  }

  /** Poignée déclarable par ce joueur (avant sa première carte de la donne). */
  poigneeFor(playerId) {
    if (this.phase !== 'jeu' || this.firstCardPlayed.has(playerId)) return null;
    const hand = this.hands.get(playerId) ?? [];
    const count = hand.filter((c) => cardInfo(c).type === 'atout' || c === 'EX').length;
    const levels = POIGNEES[this.n];
    let best = null;
    for (const l of levels) if (count >= l.size) best = l;
    return best ? { ...best, count } : null;
  }

  playCard(playerId, card, { poignee = false } = {}) {
    if (this.phase !== 'jeu') return { ok: false, error: 'La donne n\'est pas en phase de jeu.' };
    if (this.players[this.turnIndex].id !== playerId) return { ok: false, error: 'Ce n\'est pas votre tour.' };
    const legal = this.legalCards(playerId);
    if (!legal.includes(card)) return { ok: false, error: 'Cette carte n\'est pas jouable (fournir / couper / monter).' };

    // Déclaration de poignée : uniquement au moment de sa première carte.
    if (poignee) {
      const p = this.poigneeFor(playerId);
      if (!p) return { ok: false, error: 'Pas de poignée déclarable.' };
      const atouts = sortHand(this.hands.get(playerId).filter((c) => cardInfo(c).type === 'atout' || c === 'EX'));
      this.poignees.push({ playerId, team: this.teamOf(playerId), size: p.size, bonus: p.bonus, nom: p.nom });
      this.say(`✋ ${this.pseudoOf(playerId)} déclare une ${p.nom.toLowerCase()} (${p.count} atouts) : ${atouts.map((c) => cardInfo(c).label).join(' ')}.`);
    }
    this.firstCardPlayed.add(playerId);

    const hand = this.hands.get(playerId);
    this.hands.set(playerId, hand.filter((c) => c !== card));
    this.trick.push({ playerId, card });

    if (this.trick.length < this.n) {
      this.turnIndex = this.next(this.turnIndex);
      return { ok: true };
    }
    return this.resolveTrick();
  }

  resolveTrick() {
    const totalTricks = this.n === 3 ? 24 : 18;
    const isLast = this.trickNumber === totalTricks;
    const lead = this.effectiveLead();

    // Vainqueur : plus fort atout, sinon plus forte carte de la couleur demandée.
    const contenders = this.trick.filter((t) => t.card !== 'EX').map((t) => ({ ...t, info: cardInfo(t.card) }));
    const atouts = contenders.filter((c) => c.info.type === 'atout');
    let winner = atouts.length
      ? atouts.reduce((best, c) => (c.info.n > best.info.n ? c : best))
      : contenders.filter((c) => c.info.suit === lead.suit).reduce((best, c) => (c.info.rank > best.info.rank ? c : best));

    // Excuse au dernier pli : perdue, SAUF chelem en cours pour son camp.
    const exPlay = this.trick.find((t) => t.card === 'EX');
    if (exPlay && isLast) {
      const exTeam = this.teamOf(exPlay.playerId);
      if (this.tricksWon[exTeam] === totalTricks - 1) {
        winner = { playerId: exPlay.playerId }; // l'Excuse fait le chelem
        this.say('👑 Chelem : l\'Excuse remporte le dernier pli !');
      }
    }

    const winnerTeam = this.teamOf(winner.playerId);
    this.piles[winnerTeam].push(...this.trick.map((t) => t.card));
    this.tricksWon[winnerTeam] += 1;
    if (exPlay) this.excusePlay = { playerId: exPlay.playerId, trickNumber: this.trickNumber, winnerTeam, isLast };

    this.lastTrick = { cards: [...this.trick], winnerId: winner.playerId };
    this.say(`🏆 Pli ${this.trickNumber}/${totalTricks} pour ${this.pseudoOf(winner.playerId)}.`);
    this.trick = [];
    this.trickNumber += 1;
    this.turnIndex = this.idx(winner.playerId);

    if (isLast) return this.scoreDonne();
    return { ok: true };
  }

  /* ------------------------------ comptes ----------------------------- */

  scoreDonne() {
    const { takerId, level, mult, label } = this.contract;
    const attack = new Set(this.piles.A);
    const defense = new Set(this.piles.D);

    // Attribution du chien / de l'écart.
    if (level <= 2) this.ecart.forEach((c) => attack.add(c));
    else if (level === 3) this.chien.forEach((c) => attack.add(c));
    else this.chien.forEach((c) => defense.add(c));

    // Excuse : reste à son camp (contre une basse carte), sauf au dernier pli hors chelem.
    let compensationDemi = 0; // vu de l'attaque
    if (this.excusePlay) {
      const { playerId, winnerTeam, isLast } = this.excusePlay;
      const exTeam = this.teamOf(playerId);
      const winnerSet = winnerTeam === 'A' ? attack : defense;
      const exSet = exTeam === 'A' ? attack : defense;
      const chelemForExTeam = this.tricksWon[exTeam] === (this.n === 3 ? 24 : 18);
      if (exTeam !== winnerTeam && winnerSet.has('EX') && !(isLast && !chelemForExTeam)) {
        winnerSet.delete('EX');
        exSet.add('EX');
        compensationDemi = exTeam === 'A' ? -1 : +1;
      }
    }

    const attackCards = [...attack];
    const attackDemi = pointsDemiOf(attackCards) + compensationDemi;
    const bouts = boutsIn(attackCards);
    const targetDemi = TARGET_DEMI[bouts];
    const made = attackDemi >= targetDemi;
    const ecartPts = Math.ceil(Math.abs(attackDemi - targetDemi) / 2);

    // Petit au bout : le camp qui remporte le dernier pli avec le 1 d'atout.
    let petitAuBout = 0;
    if (this.lastTrick.cards.some((t) => t.card === 'A1')) {
      petitAuBout = this.teamOf(this.lastTrick.winnerId) === 'A' ? 10 : -10;
      this.say(petitAuBout > 0 ? '🎯 Petit au bout pour l\'attaque !' : '🎯 Petit au bout pour la défense !');
    }

    // Règlement (vu du preneur) : (25 + écart ± petit au bout) × mult + primes.
    const signedBase = (made ? 1 : -1) * (25 + ecartPts);
    const poigneeBonus = this.poignees.reduce((s, p) => s + p.bonus, 0);
    let score = (signedBase + petitAuBout) * mult + (made ? 1 : -1) * poigneeBonus;

    // Chelem non annoncé.
    const totalTricks = this.n === 3 ? 24 : 18;
    if (this.tricksWon.A === totalTricks) { score += 200; this.say('👑 Chelem de l\'attaque : +200 !'); }
    if (this.tricksWon.D === totalTricks) { score -= 200; this.say('👑 Chelem de la défense : +200 pour elle !'); }

    // Répartition : chaque défenseur paie/reçoit `score`.
    const defenders = this.players.filter((p) => p.id !== takerId);
    const perPlayer = {};
    perPlayer[takerId] = score * defenders.length;
    defenders.forEach((d) => { perPlayer[d.id] = -score; });
    Object.entries(perPlayer).forEach(([id, pts]) => { this.totals[id] += pts; });

    const attackPts = attackDemi / 2;
    this.roundResult = {
      donne: this.donne, takerId, taker: this.pseudoOf(takerId), contract: label, mult,
      made, attackPts, target: targetDemi / 2, bouts, ecartPts, petitAuBout,
      poigneeBonus, score, perPlayer,
    };
    this.rounds.push(this.roundResult);
    this.say(made
      ? `✅ Contrat réussi : ${attackPts} pts (il en fallait ${targetDemi / 2}, ${bouts} bout${bouts > 1 ? 's' : ''}) → ${score > 0 ? '+' : ''}${score} par défenseur.`
      : `❌ Contrat chuté : ${attackPts} pts (il en fallait ${targetDemi / 2}, ${bouts} bout${bouts > 1 ? 's' : ''}) → ${score} par défenseur.`);
    this.phase = 'fin-donne';
    return { ok: true };
  }

  endMatch() {
    const classement = [...this.players]
      .map((p) => ({ id: p.id, pseudo: p.pseudo, score: this.totals[p.id] }))
      .sort((a, b) => b.score - a.score);
    this.finPartie = { classement };
    this.phase = 'fin-partie';
    return {
      summary: `🎴 Tarot terminé — ${classement[0].pseudo} gagne avec ${classement[0].score} points.`,
      classement,
      donnes: this.rounds.length,
    };
  }

  /* ------------------------------ actions & vues ---------------------- */

  handleAction(playerId, action = {}) {
    switch (action.a) {
      case 'bid': return this.bid(playerId, action.level);
      case 'ecart': return this.makeEcart(playerId, action.cards);
      case 'play': return this.playCard(playerId, action.card, { poignee: !!action.poignee });
      default: return { ok: false, error: 'Action inconnue.' };
    }
  }

  /** Vue personnalisée : état public + main privée du destinataire. */
  getViewFor(playerId) {
    const turnId = ['encheres', 'jeu'].includes(this.phase) ? this.players[this.turnIndex].id
      : this.phase === 'ecart' ? this.contract.takerId : null;
    return {
      phase: this.phase,
      donne: this.donne,
      n: this.n,
      dealerId: this.players[this.dealerIndex]?.id ?? null,
      turnId,
      players: this.players.map((p) => ({
        id: p.id, pseudo: p.pseudo,
        cards: this.hands?.get(p.id)?.length ?? 0,
        isDealer: this.players[this.dealerIndex]?.id === p.id,
        isTaker: this.contract?.takerId === p.id,
        total: this.totals[p.id],
      })),
      bids: this.bids?.map((b) => ({ pseudo: this.pseudoOf(b.playerId), level: b.level, label: b.level ? CONTRACTS[b.level].label : 'Passe' })) ?? [],
      bestLevel: this.bestLevel ?? 0,
      contract: this.contract ? { taker: this.pseudoOf(this.contract.takerId), takerId: this.contract.takerId, label: this.contract.label, mult: this.contract.mult } : null,
      chien: this.phase === 'ecart' ? this.chien : null,
      ecartAllowAtouts: this.phase === 'ecart' && playerId === this.contract?.takerId
        ? this.ecartConstraints(this.hands.get(playerId)).allowAtouts : false,
      hand: sortHand(this.hands?.get(playerId) ?? []),
      legal: this.phase === 'jeu' && turnId === playerId ? this.legalCards(playerId) : [],
      poignee: this.phase === 'jeu' && turnId === playerId ? this.poigneeFor(playerId) : null,
      trick: this.trick?.map((t) => ({ pseudo: this.pseudoOf(t.playerId), playerId: t.playerId, card: t.card })) ?? [],
      lastTrick: this.lastTrick ? {
        winner: this.pseudoOf(this.lastTrick.winnerId),
        cards: this.lastTrick.cards.map((t) => ({ pseudo: this.pseudoOf(t.playerId), card: t.card })),
      } : null,
      roundResult: this.phase === 'fin-donne' ? this.roundResult : null,
      totals: this.totals,
      finPartie: this.finPartie,
      log: this.log.slice(-25),
    };
  }
}

/* ====================================================================== */
/* Interface (rendu pur à partir de la vue reçue)                         */
/* ====================================================================== */

const CSS = `
.tarot { display: grid; grid-template-columns: 1fr 280px; gap: 14px; height: 100%; min-height: 0; color: var(--text, #e8ecff); font-size: 0.95rem; width: 100%; }
.tarot__main { display: flex; flex-direction: column; gap: 12px; min-width: 0; min-height: 0; }
.tarot__panel { background: var(--glass, rgba(255,255,255,0.05)); border: 1px solid var(--glass-border, rgba(255,255,255,0.09)); border-radius: var(--radius-m, 14px); padding: 12px 14px; }
.tarot__bar { display: flex; align-items: center; gap: 12px; flex-wrap: wrap; }
.tarot__turn { margin-left: auto; color: var(--accent-2, #29d3c2); font-weight: 600; }
.tarot__table { flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 14px; min-height: 220px; }
.tarot__trick { display: flex; gap: 12px; flex-wrap: wrap; justify-content: center; }
.tarot__played { display: flex; flex-direction: column; align-items: center; gap: 6px; }
.tarot__played span { font-size: 0.78rem; color: var(--text-dim, #aab); }
.tarot__hand { display: flex; gap: 6px; flex-wrap: wrap; justify-content: center; padding: 10px 0 4px; }
.tcard { width: 52px; height: 76px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.16); background: linear-gradient(160deg, #1b2033, #12141f); display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 2px; font-weight: 700; user-select: none; transition: transform .12s ease, box-shadow .12s ease, opacity .12s ease; font-family: inherit; }
.tcard--rouge { color: #ff7e7e; } .tcard--noir { color: #dfe6ff; }
.tcard--atout { color: #cdbcff; background: linear-gradient(160deg, #241d40, #151126); border-color: rgba(124,92,255,0.45); }
.tcard--excuse { color: #ffd66b; background: linear-gradient(160deg, #3a2d12, #191307); border-color: rgba(255,214,107,0.4); }
.tcard__suit { font-size: 1.15rem; } .tcard__rank { font-size: 1.02rem; }
.tcard--btn { cursor: pointer; }
.tcard--btn:hover { transform: translateY(-6px); box-shadow: 0 10px 22px rgba(0,0,0,0.45); }
.tcard--illegal { opacity: 0.35; }
.tcard--illegal:hover { transform: none; box-shadow: none; cursor: not-allowed; }
.tcard--selected { outline: 2px solid var(--accent-2, #29d3c2); transform: translateY(-6px); }
.tarot__actions { display: flex; gap: 10px; flex-wrap: wrap; justify-content: center; align-items: center; }
.tarot__side { display: flex; flex-direction: column; gap: 12px; min-height: 0; overflow: auto; }
.tarot__player { display: flex; align-items: center; gap: 8px; padding: 6px 4px; border-bottom: 1px solid rgba(255,255,255,0.06); }
.tarot__player--turn { color: var(--accent-2, #29d3c2); }
.tarot__player .tag { font-size: 0.68rem; padding: 2px 6px; border-radius: 99px; background: rgba(124,92,255,0.25); }
.tarot__player .pts { margin-left: auto; font-variant-numeric: tabular-nums; }
.tarot__log { font-size: 0.8rem; color: var(--text-dim, #aab); max-height: 220px; overflow: auto; display: flex; flex-direction: column; gap: 4px; }
.tarot__chat { display: flex; flex-direction: column; gap: 8px; }
.tarot__chat-messages { display: flex; flex-direction: column; gap: 8px; max-height: 200px; overflow-y: auto; padding-right: 2px; }
.tarot__chat-empty { color: var(--text-faint, #616880); font-size: 0.78rem; font-style: italic; text-align: center; padding: 6px 0; }
.tarot__chat-msg { display: flex; gap: 8px; animation: tarot-msg-in .15s ease; }
.tarot__chat-msg__avatar { font-size: 1.1rem; line-height: 1.5; }
.tarot__chat-msg__head { display: flex; align-items: baseline; gap: 6px; flex-wrap: wrap; }
.tarot__chat-msg__pseudo { font-weight: 600; font-size: 0.82rem; }
.tarot__chat-msg__time { font-size: 0.68rem; color: var(--text-faint, #616880); }
.tarot__chat-msg__text { margin: 1px 0 0; font-size: 0.85rem; color: var(--text-dim, #aab); overflow-wrap: anywhere; }
.tarot__chat-form { display: flex; gap: 8px; }
.tarot__chat-form input { flex: 1; min-width: 0; padding: 8px 10px; font: inherit; font-size: 0.85rem; color: var(--text, #e8ecff); background: rgba(0,0,0,0.35); border: 1px solid var(--glass-border, rgba(255,255,255,0.12)); border-radius: var(--radius-s, 10px); }
@keyframes tarot-msg-in { from { opacity: 0; transform: translateY(4px); } }
.tarot__status { min-height: 1.2em; color: var(--warning, #ffb454); font-size: 0.85rem; text-align: center; }
.tarot table { width: 100%; border-collapse: collapse; font-size: 0.85rem; }
.tarot td, .tarot th { padding: 4px 8px; text-align: left; border-bottom: 1px solid rgba(255,255,255,0.07); }
@media (max-width: 1000px) { .tarot { grid-template-columns: 1fr; } }
`;

/** Petite fabrique DOM locale (le module est autonome, sans import du cœur). */
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

function symbolOf(info) {
  return info.type === 'couleur' ? SUITS[info.suit].sym : info.type === 'atout' ? '✦' : '★';
}

/** Horodatage court pour les messages du chat de table (ex. « 14:32 »). */
function formatChatTime(timestamp) {
  return new Date(timestamp).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
}

function cardEl(id, { onClick = null, legal = true, selected = false } = {}) {
  const info = cardInfo(id);
  const cls = ['tcard', `tcard--${info.type === 'couleur' ? SUITS[info.suit].color : info.type}`];
  if (onClick) cls.push('tcard--btn');
  if (!legal) cls.push('tcard--illegal');
  if (selected) cls.push('tcard--selected');
  const node = h(onClick ? 'button' : 'div', { className: cls.join(' '), title: info.nom, ...(onClick ? { type: 'button', onClick } : {}) }, [
    h('span', { className: 'tcard__rank' }, info.label),
    h('span', { className: 'tcard__suit' }, symbolOf(info)),
  ]);
  return node;
}

class TarotUI {
  constructor(container, context) {
    this.container = container;
    this.ctx = context;
    this.isHost = context.me.id === context.hostId;
    this.engine = null;
    this.unsubscribe = null;
    this.ecartSelection = new Set();
    this.poigneeChecked = false;
  }

  mount() {
    this.styleEl = h('style', {}, CSS);
    this.root = h('div', { className: 'tarot' });
    this.container.append(this.styleEl, this.root);

    if (this.isHost) {
      try {
        this.engine = new TarotEngine(this.ctx.players);
      } catch (error) {
        this.renderMessage(`⚠️ ${error.message}`);
        return;
      }
      this.unsubscribe = this.ctx.onMessage(({ from, data }) => {
        if (data?.t === 'chat') this.receiveChat(from, data);
        else if (data?.t === 'action') this.hostHandle(from, data.action);
      });
      this.engine.startDonne();
      this.broadcast();
    } else {
      this.unsubscribe = this.ctx.onMessage(({ from, data }) => {
        if (data?.t === 'chat') { this.receiveChat(from, data); return; }
        if (from !== this.ctx.hostId) return;
        if (data?.t === 'view') this.render(data.view);
        else if (data?.t === 'error') this.setStatus(data.message);
      });
      this.renderMessage('⏳ Connexion à la table du Host…');
    }
  }

  /* -------- côté Host : moteur + diffusion des vues -------- */

  hostHandle(playerId, action) {
    const result = this.engine.handleAction(playerId, action);
    if (!result.ok) {
      this.ctx.sendMessage({ t: 'error', message: result.error }, playerId);
      return;
    }
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

  /* -------- rendu -------- */

  setStatus(message) {
    if (!this.statusEl) return;
    this.statusEl.textContent = message ?? '';
    clearTimeout(this.statusTimer);
    this.statusTimer = setTimeout(() => { if (this.statusEl) this.statusEl.textContent = ''; }, 3500);
  }

  renderMessage(text) {
    this.root.replaceChildren(h('div', { className: 'tarot__panel', style: 'margin:auto;' }, text));
  }

  /* -------- chat de table (diffusion via game:message, indépendant du Host) -------- */

  /** Construit le panneau une seule fois : conservé (et réinséré) à chaque rendu. */
  ensureChatPanel() {
    if (this.chatPanel) return this.chatPanel;
    this.chatEmptyEl = h('div', { className: 'tarot__chat-empty' }, 'Aucun message pour l\'instant.');
    this.chatMessagesEl = h('div', {
      className: 'tarot__chat-messages', tabindex: '0', 'aria-label': 'Messages de la table',
    }, [this.chatEmptyEl]);
    this.chatInput = h('input', {
      type: 'text', placeholder: 'Écrire à la table…', maxlength: '300', 'aria-label': 'Votre message',
    });
    const form = h('form', { className: 'tarot__chat-form' }, [
      this.chatInput,
      h('button', { className: 'btn btn--primary btn--small', type: 'submit' }, 'Envoyer'),
    ]);
    form.addEventListener('submit', (e) => { e.preventDefault(); this.sendChat(); });
    this.chatPanel = h('div', { className: 'tarot__panel tarot__chat' }, [
      h('strong', {}, '💬 Chat'),
      this.chatMessagesEl,
      form,
    ]);
    return this.chatPanel;
  }

  /** Envoi : écho local immédiat (la diffusion serveur n'inclut pas l'expéditeur) + relais aux autres. */
  sendChat() {
    const text = this.chatInput.value.trim();
    if (!text) return;
    this.appendChatMessage({
      pseudo: this.ctx.me.pseudo, avatar: this.ctx.me.avatar, color: this.ctx.me.color, at: Date.now(), text,
    });
    this.ctx.sendMessage({ t: 'chat', text }, null);
    this.chatInput.value = '';
    this.chatInput.focus();
  }

  /** Réception d'un message diffusé par un autre joueur (host ou non). */
  receiveChat(from, data) {
    const text = String(data?.text ?? '').slice(0, 500).trim();
    if (!text) return;
    const player = this.ctx.players.find((p) => p.id === from);
    this.appendChatMessage({
      pseudo: player?.pseudo ?? '?', avatar: player?.avatar ?? '❔', color: player?.color, at: Date.now(), text,
    });
  }

  appendChatMessage(message) {
    this.ensureChatPanel();
    if (this.chatEmptyEl) { this.chatEmptyEl.remove(); this.chatEmptyEl = null; }
    const list = this.chatMessagesEl;
    const nearBottom = list.scrollHeight - list.scrollTop - list.clientHeight < 60;
    list.append(h('div', { className: 'tarot__chat-msg' }, [
      h('span', { className: 'tarot__chat-msg__avatar', 'aria-hidden': 'true' }, message.avatar ?? '🎴'),
      h('div', {}, [
        h('div', { className: 'tarot__chat-msg__head' }, [
          h('span', { className: 'tarot__chat-msg__pseudo', style: message.color ? `color:${message.color};` : '' }, message.pseudo),
          h('span', { className: 'tarot__chat-msg__time' }, formatChatTime(message.at)),
        ]),
        h('p', { className: 'tarot__chat-msg__text' }, message.text),
      ]),
    ]));
    if (nearBottom) list.scrollTop = list.scrollHeight;
  }

  render(view) {
    this.view = view;
    if (view.phase !== 'ecart') this.ecartSelection.clear();
    this.poigneeChecked = false;
    const myTurn = view.turnId === this.ctx.me.id;

    const bar = h('div', { className: 'tarot__panel tarot__bar' }, [
      h('strong', {}, `🎴 Tarot — donne ${view.donne || '—'}`),
      h('span', {}, view.contract
        ? `${view.contract.taker} joue ${view.contract.label} (×${view.contract.mult})`
        : view.phase === 'encheres' ? 'Enchères en cours' : ''),
      h('span', { className: 'tarot__turn' },
        view.phase === 'fin-partie' ? 'Partie terminée'
          : view.phase === 'fin-donne' ? 'Fin de donne'
            : myTurn ? '⭐ À vous de jouer'
              : view.turnId ? `Au tour de ${view.players.find((p) => p.id === view.turnId)?.pseudo ?? ''}` : ''),
    ]);

    const table = h('div', { className: 'tarot__panel tarot__table' });
    if (view.phase === 'encheres') table.append(...this.renderEncheres(view, myTurn));
    else if (view.phase === 'ecart') table.append(...this.renderEcart(view));
    else if (view.phase === 'jeu') table.append(...this.renderTrick(view));
    else if (view.phase === 'fin-donne') table.append(...this.renderFinDonne(view));
    else if (view.phase === 'fin-partie') table.append(...this.renderFinPartie(view));

    this.statusEl = h('div', { className: 'tarot__status' });
    const hand = h('div', { className: 'tarot__panel' }, [
      h('div', { className: 'tarot__hand' }, view.hand.map((c) => this.renderHandCard(c, view, myTurn))),
      this.renderHandActions(view, myTurn),
    ]);

    const side = h('div', { className: 'tarot__side' }, [
      h('div', { className: 'tarot__panel' }, [
        h('strong', {}, 'Joueurs'),
        ...view.players.map((p) => h('div', { className: `tarot__player${p.id === view.turnId ? ' tarot__player--turn' : ''}` }, [
          h('span', {}, p.pseudo),
          ...(p.isTaker ? [h('span', { className: 'tag' }, 'Preneur')] : []),
          ...(p.isDealer ? [h('span', { className: 'tag' }, 'Donneur')] : []),
          h('span', { className: 'pts' }, `🂠 ${p.cards} · ${p.total >= 0 ? '+' : ''}${p.total}`),
        ])),
      ]),
      h('div', { className: 'tarot__panel' }, [
        h('strong', {}, 'Historique'),
        h('div', { className: 'tarot__log' }, [...view.log].reverse().map((l) => h('div', {}, l))),
      ]),
      this.ensureChatPanel(),
      ...(this.isHost && view.phase !== 'fin-partie' && view.phase !== 'fin-donne'
        ? [h('button', { className: 'btn btn--ghost btn--small', onClick: () => this.confirmEnd() }, '🛑 Terminer la partie')]
        : []),
    ]);

    this.root.replaceChildren(h('div', { className: 'tarot__main' }, [bar, table, this.statusEl, hand]), side);
  }

  renderEncheres(view, myTurn) {
    const nodes = [
      h('div', {}, view.bids.length
        ? view.bids.map((b) => `${b.pseudo} : ${b.label}`).join(' · ')
        : 'Personne n\'a encore parlé.'),
    ];
    if (myTurn) {
      nodes.push(h('div', { className: 'tarot__actions' }, [
        h('button', { className: 'btn btn--ghost', onClick: () => this.act({ a: 'bid', level: 0 }) }, 'Passe'),
        ...[1, 2, 3, 4]
          .filter((l) => l > view.bestLevel)
          .map((l) => h('button', { className: 'btn btn--primary', onClick: () => this.act({ a: 'bid', level: l }) }, CONTRACTS[l].label)),
      ]));
    }
    return nodes;
  }

  renderEcart(view) {
    const iAmTaker = view.contract?.takerId === this.ctx.me.id;
    const nodes = [
      h('strong', {}, 'Le chien'),
      h('div', { className: 'tarot__trick' }, view.chien.map((c) => cardEl(c))),
    ];
    if (iAmTaker) {
      nodes.push(
        h('div', {}, `Sélectionnez 6 cartes à écarter dans votre main (${this.ecartSelection.size}/6) — ni roi, ni bout${view.ecartAllowAtouts ? '' : ', ni atout'}.`),
        h('div', { className: 'tarot__actions' }, [
          h('button', { className: 'btn btn--primary', onClick: () => this.act({ a: 'ecart', cards: [...this.ecartSelection] }) }, 'Valider l\'écart'),
        ]),
      );
    } else {
      nodes.push(h('div', {}, `${view.contract.taker} prépare son écart…`));
    }
    return nodes;
  }

  renderTrick(view) {
    const nodes = [
      h('div', { className: 'tarot__trick' },
        view.trick.length
          ? view.trick.map((t) => h('div', { className: 'tarot__played' }, [cardEl(t.card), h('span', {}, t.pseudo)]))
          : [h('div', { style: 'color: var(--text-dim,#aab);' }, 'Nouveau pli — la table est vide.')]),
    ];
    if (view.lastTrick) {
      nodes.push(h('div', { style: 'font-size:0.8rem;color:var(--text-dim,#aab);' },
        `Dernier pli (${view.lastTrick.winner}) : ${view.lastTrick.cards.map((t) => {
          const i = cardInfo(t.card);
          return i.label + symbolOf(i);
        }).join(' ')}`));
    }
    return nodes;
  }

  renderFinDonne(view) {
    const r = view.roundResult;
    const nodes = [];
    if (r) {
      nodes.push(
        h('strong', {}, r.made ? `✅ ${r.taker} réussit sa ${r.contract}` : `❌ ${r.taker} chute sa ${r.contract}`),
        h('div', {}, `${r.attackPts} points réalisés / ${r.target} demandés (${r.bouts} bout${r.bouts > 1 ? 's' : ''})`
          + `${r.petitAuBout ? ` · petit au bout (${r.petitAuBout > 0 ? 'attaque' : 'défense'})` : ''}`
          + `${r.poigneeBonus ? ` · poignée(s) +${r.poigneeBonus}` : ''}`),
        h('table', {}, [
          h('tr', {}, [h('th', {}, 'Joueur'), h('th', {}, 'Donne'), h('th', {}, 'Total')]),
          ...view.players.map((p) => h('tr', {}, [
            h('td', {}, p.pseudo),
            h('td', {}, `${r.perPlayer[p.id] > 0 ? '+' : ''}${r.perPlayer[p.id]}`),
            h('td', {}, String(p.total)),
          ])),
        ]),
      );
    } else {
      nodes.push(h('div', {}, 'Prêt à jouer ?'));
    }
    if (this.isHost) {
      nodes.push(h('div', { className: 'tarot__actions' }, [
        h('button', { className: 'btn btn--primary', onClick: () => this.hostNextDonne() }, '▶️ Donne suivante'),
        h('button', { className: 'btn btn--ghost', onClick: () => this.confirmEnd() }, '🏁 Terminer la partie'),
      ]));
    } else {
      nodes.push(h('div', { style: 'color:var(--text-dim,#aab);' }, 'En attente du Host pour la suite…'));
    }
    return nodes;
  }

  renderFinPartie(view) {
    const c = view.finPartie?.classement ?? [];
    return [
      h('strong', {}, '🏆 Classement final'),
      h('table', {}, c.map((p, i) => h('tr', {}, [
        h('td', {}, `${i + 1}.`), h('td', {}, p.pseudo), h('td', {}, `${p.score >= 0 ? '+' : ''}${p.score}`),
      ]))),
      h('div', { style: 'color:var(--text-dim,#aab);' }, 'Retour au salon dans quelques secondes…'),
    ];
  }

  renderHandCard(card, view, myTurn) {
    if (view.phase === 'ecart' && view.contract?.takerId === this.ctx.me.id) {
      return cardEl(card, {
        selected: this.ecartSelection.has(card),
        onClick: () => {
          if (this.ecartSelection.has(card)) this.ecartSelection.delete(card);
          else if (this.ecartSelection.size < 6) this.ecartSelection.add(card);
          this.render(this.view);
        },
      });
    }
    if (view.phase === 'jeu' && myTurn) {
      const legal = view.legal.includes(card);
      return cardEl(card, {
        legal,
        onClick: legal
          ? () => this.act({ a: 'play', card, poignee: this.poigneeChecked })
          : () => this.setStatus('Carte injouable : il faut fournir, couper ou monter.'),
      });
    }
    return cardEl(card);
  }

  renderHandActions(view, myTurn) {
    if (view.phase === 'jeu' && myTurn && view.poignee) {
      const box = h('input', { type: 'checkbox' });
      box.addEventListener('change', () => { this.poigneeChecked = box.checked; });
      return h('div', { className: 'tarot__actions' }, [
        h('label', { style: 'display:flex;gap:8px;align-items:center;color:var(--accent-2,#29d3c2);cursor:pointer;' }, [
          box,
          `✋ Déclarer ma ${view.poignee.nom.toLowerCase()} (${view.poignee.count} atouts, +${view.poignee.bonus}) avec cette carte`,
        ]),
      ]);
    }
    return h('div', {});
  }

  hostNextDonne() {
    const r = this.engine.startDonne();
    if (!r.ok) { this.setStatus(r.error); return; }
    this.broadcast();
  }

  confirmEnd() {
    const result = this.engine.endMatch();
    this.broadcast();
    // Laisse quelques secondes aux joueurs pour voir le classement, puis retour salon.
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
    instance = new TarotUI(container, context);
    instance.mount();
  },
  async unmount() {
    instance?.unmount();
    instance = null;
  },
};
