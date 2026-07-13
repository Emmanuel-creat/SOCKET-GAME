/**
 * Loup-Garou de Thiercelieux — module de jeu pour la plateforme Arcade.
 *
 * Le moteur joue le rôle du MENEUR : il séquence les nuits (appel des rôles
 * dans l'ordre), résout les morts, orchestre les débats et les votes. Personne
 * n'est donc « sacrifié » comme meneur : tout le monde joue.
 *
 * Architecture « Host autoritaire » (comme les autres jeux de la plateforme) :
 *  - Le client du Host exécute LoupGarouEngine (pur, testable en Node).
 *  - Les rôles secrets ne quittent jamais le Host : chaque joueur reçoit une
 *    vue personnalisée (son rôle, ses infos privées, les canaux de chat
 *    auxquels il a droit) via des envois ciblés du relais game:message.
 *
 * Rôles implémentés : Villageois, Loup-Garou, Voyante, Sorcière (2 potions),
 * Chasseur, Cupidon (amoureux, camp des amoureux si camps opposés),
 * Petite Fille (espionne le chat des loups, avec risque), Salvateur
 * (protection, jamais 2 nuits de suite la même cible), Corbeau (+2 voix),
 * et la fonction de Capitaine (élection au jour 1, voix double, succession).
 *
 * Chats écrits : 🏛️ Village (jour, vivants), 🐺 Loups (nuit, loups — lisible
 * par la Petite Fille sous pseudos masqués), 💘 Amoureux (privé),
 * 👻 Morts (spectateurs, voient tous les rôles).
 */

/* ====================================================================== */
/* Rôles                                                                  */
/* ====================================================================== */

export const ROLES = Object.freeze({
  villageois: { nom: 'Villageois', icone: '🧑‍🌾', camp: 'village', desc: 'Aucun pouvoir : observez, débattez, votez juste.' },
  loup: { nom: 'Loup-Garou', icone: '🐺', camp: 'loups', desc: 'Chaque nuit, dévorez un joueur avec les autres loups. Restez discret le jour.' },
  voyante: { nom: 'Voyante', icone: '🔮', camp: 'village', desc: 'Chaque nuit, découvrez le rôle exact d\'un joueur.' },
  sorciere: { nom: 'Sorcière', icone: '🧪', camp: 'village', desc: 'Une potion de vie (sauver la victime des loups) et une potion de mort (éliminer un joueur). Une seule fois chacune.' },
  chasseur: { nom: 'Chasseur', icone: '🏹', camp: 'village', desc: 'À votre mort, vous entraînez immédiatement un joueur de votre choix.' },
  cupidon: { nom: 'Cupidon', icone: '💘', camp: 'village', desc: 'La première nuit, désignez deux amoureux : si l\'un meurt, l\'autre meurt de chagrin.' },
  petiteFille: { nom: 'Petite Fille', icone: '👧', camp: 'village', desc: 'Pendant la nuit des loups, espionnez leur conversation (pseudos masqués)… à vos risques et périls.' },
  salvateur: { nom: 'Salvateur', icone: '🛡️', camp: 'village', desc: 'Chaque nuit, protégez un joueur des loups (jamais le même deux nuits de suite).' },
  corbeau: { nom: 'Corbeau', icone: '🐦‍⬛', camp: 'village', desc: 'Chaque nuit, désignez un joueur : il aura 2 voix contre lui au prochain vote.' },
});

/** Composition par défaut selon le nombre de joueurs (modifiable par le Host). */
export function defaultSetup(n) {
  const s = { loups: n >= 12 ? 3 : 2, voyante: true, sorciere: true, chasseur: n >= 7, cupidon: n >= 8, petiteFille: n >= 9, salvateur: n >= 10, corbeau: n >= 11 };
  if (n <= 6) s.loups = 1;
  return s;
}

const RISQUE_PETITE_FILLE = 0.25; // par nuit espionnée : les loups apprennent son identité

/* ====================================================================== */
/* Moteur (pur : aucune dépendance DOM/réseau)                            */
/* ====================================================================== */

/**
 * Les morts sont des SPECTATEURS MUETS, pas des omniscients : ils ne découvrent
 * que les rôles des joueurs déjà morts, comme tout le monde. Passer ce drapeau à
 * true rétablit l'ancien comportement (les morts voient tout).
 */
const MORTS_VOIENT_TOUT = false;

export class LoupGarouEngine {
  /** @param {{id, pseudo}[]} players @param {{hostId, rng?}} options */
  constructor(players, { hostId, rng = Math.random } = {}) {
    if (players.length < 5 || players.length > 16) {
      throw new Error('Le Loup-Garou se joue de 5 à 16 joueurs.');
    }
    this.players = players.map((p) => ({ id: p.id, pseudo: p.pseudo }));
    this.n = players.length;
    this.hostId = hostId;
    this.rng = rng;
    this.phase = 'setup';
    this.setup = defaultSetup(this.n);
    this.roles = {}; // pid -> roleId
    this.alive = {}; // pid -> bool
    this.lovers = []; // [pid, pid]
    this.captainId = null;
    this.nuit = 0;
    this.jour = 0;
    this.nightStep = null;   // rôle appelé actuellement
    this.nightQueue = [];
    this.night = {};         // décisions de la nuit en cours
    this.lastProtected = null;
    this.potions = { vie: true, mort: true };
    this.corbeauTarget = null;
    this.spyRevealed = false;
    this.voyanteSeen = [];   // [{nuit, pseudo, role}]
    this.wolvesVotes = {};
    this.votes = {};         // vote du jour / élection
    this.voteKind = null;    // 'capitaine' | 'village'
    this.pendingHunter = null;
    this.pendingCaptain = null;
    this.deadThisNight = [];
    this.winner = null;
    this.chats = { village: [], loups: [], amoureux: [], morts: [] };
    this.log = [];           // événements publics (le « meneur » parle)
    this.say('🎭 Le Host compose le village, puis la partie commence.');
  }

  /* ------------------------------ utilitaires ------------------------ */

  say(text) { this.log.push(text); if (this.log.length > 200) this.log.shift(); }
  pseudoOf(id) { return this.players.find((p) => p.id === id)?.pseudo ?? '?'; }
  roleOf(id) { return ROLES[this.roles[id]]; }
  isAlive(id) { return !!this.alive[id]; }
  alivePlayers() { return this.players.filter((p) => this.alive[p.id]); }
  aliveWolves() { return this.alivePlayers().filter((p) => this.roles[p.id] === 'loup'); }
  aliveWith(roleId) { return this.alivePlayers().find((p) => this.roles[p.id] === roleId) ?? null; }
  campOf(id) {
    // Amoureux de camps opposés : ils forment leur propre camp.
    if (this.lovers.includes(id) && this.loversCrossCamp()) return 'amoureux';
    return this.roles[id] === 'loup' ? 'loups' : 'village';
  }
  loversCrossCamp() {
    if (this.lovers.length !== 2) return false;
    const [a, b] = this.lovers;
    return (this.roles[a] === 'loup') !== (this.roles[b] === 'loup');
  }

  shuffle(arr) {
    const d = [...arr];
    for (let i = d.length - 1; i > 0; i -= 1) {
      const j = Math.floor(this.rng() * (i + 1));
      [d[i], d[j]] = [d[j], d[i]];
    }
    return d;
  }

  addChat(channel, from, text) {
    const clean = String(text ?? '').trim().slice(0, 300);
    if (!clean) return { ok: false, error: 'Message vide.' };
    if (!this.canRead(from, channel) || !this.canWrite(from, channel)) {
      return { ok: false, error: 'Vous n\'avez pas accès à ce canal.' };
    }
    this.chats[channel].push({ from, pseudo: this.pseudoOf(from), text: clean, ts: Date.now() });
    if (this.chats[channel].length > 200) this.chats[channel].shift();
    return { ok: true };
  }

  canRead(pid, channel) {
    if (!this.chats[channel]) return false;
    const dead = this.phase !== 'setup' && !this.isAlive(pid);
    switch (channel) {
      case 'village': return true; // lisible par tous (les morts regardent)
      case 'morts': return dead || this.phase === 'fin';
      case 'amoureux': return this.lovers.includes(pid);
      // Ouvrir ce canal aux morts reviendrait à leur nommer les loups : c'est la
      // même fuite que les rôles, par un autre chemin. Un loup mort, lui, connaît
      // déjà sa meute — il garde donc son accès.
      case 'loups': return this.roles[pid] === 'loup'
        || (this.roles[pid] === 'petiteFille' && this.isAlive(pid))
        || (dead && MORTS_VOIENT_TOUT);
      default: return false;
    }
  }

  canWrite(pid, channel) {
    const dead = this.phase !== 'setup' && !this.isAlive(pid);
    switch (channel) {
      case 'village': return !dead && this.phase !== 'setup';
      case 'morts': return dead;
      case 'amoureux': return this.lovers.includes(pid) && !dead;
      case 'loups': return this.roles[pid] === 'loup' && !dead;
      default: return false;
    }
  }

  /* ------------------------------ mise en place ----------------------- */

  configure(pid, setup) {
    if (pid !== this.hostId) return { ok: false, error: 'Seul le Host compose le village.' };
    if (this.phase !== 'setup') return { ok: false, error: 'La partie a commencé.' };
    const s = { ...this.setup, ...setup };
    s.loups = Math.max(1, Math.min(Math.floor(this.n / 3), Number(s.loups) || 1));
    this.setup = s;
    return { ok: true };
  }

  /** Nombre de cartes spéciales cochées + loups ne doit pas dépasser n. */
  setupCheck() {
    const specials = ['voyante', 'sorciere', 'chasseur', 'cupidon', 'petiteFille', 'salvateur', 'corbeau']
      .filter((r) => this.setup[r]).length;
    const total = this.setup.loups + specials;
    if (total > this.n) return { valid: false, reason: `${total} rôles pour ${this.n} joueurs : retirez des cartes.` };
    return { valid: true, reason: null };
  }

  start(pid) {
    if (pid !== this.hostId) return { ok: false, error: 'Seul le Host lance la partie.' };
    if (this.phase !== 'setup') return { ok: false, error: 'La partie a commencé.' };
    const check = this.setupCheck();
    if (!check.valid) return { ok: false, error: check.reason };

    // Distribution des cartes.
    const deck = [];
    for (let i = 0; i < this.setup.loups; i += 1) deck.push('loup');
    for (const r of ['voyante', 'sorciere', 'chasseur', 'cupidon', 'petiteFille', 'salvateur', 'corbeau']) {
      if (this.setup[r]) deck.push(r);
    }
    while (deck.length < this.n) deck.push('villageois');
    const shuffled = this.shuffle(deck);
    this.players.forEach((p, i) => { this.roles[p.id] = shuffled[i]; this.alive[p.id] = true; });

    this.say(`🌙 Le village s'endort… (${this.setup.loups} loup${this.setup.loups > 1 ? 's' : ''} rôde${this.setup.loups > 1 ? 'nt' : ''})`);
    this.beginNight();
    return { ok: true };
  }

  /* ------------------------------ nuit -------------------------------- */

  beginNight() {
    this.nuit += 1;
    this.phase = 'nuit';
    this.night = { protectedId: null, wolfVictim: null, witchSave: false, witchKill: null };
    this.wolvesVotes = {};
    this.corbeauTarget = null;
    this.deadThisNight = [];
    this.nightQueue = [];
    if (this.nuit === 1 && this.setup.cupidon && this.aliveWith('cupidon')) this.nightQueue.push('cupidon');
    if (this.aliveWith('salvateur')) this.nightQueue.push('salvateur');
    if (this.aliveWith('voyante')) this.nightQueue.push('voyante');
    this.nightQueue.push('loups');
    if (this.aliveWith('sorciere') && (this.potions.vie || this.potions.mort)) this.nightQueue.push('sorciere');
    if (this.aliveWith('corbeau')) this.nightQueue.push('corbeau');
    this.say(`🌙 Nuit ${this.nuit} — le village ferme les yeux.`);
    this.nextNightStep();
  }

  nextNightStep() {
    this.nightStep = this.nightQueue.shift() ?? null;
    if (!this.nightStep) { this.resolveNight(); return; }
    const labels = {
      cupidon: '💘 Cupidon décoche ses flèches…',
      salvateur: '🛡️ Le Salvateur veille…',
      voyante: '🔮 La Voyante scrute une âme…',
      loups: '🐺 Les Loups-Garous se concertent…',
      sorciere: '🧪 La Sorcière hésite au-dessus de ses potions…',
      corbeau: '🐦‍⬛ Le Corbeau prend son envol…',
    };
    this.say(labels[this.nightStep]);
  }

  nightAction(pid, action) {
    if (this.phase !== 'nuit') return { ok: false, error: 'Ce n\'est pas la nuit.' };
    if (!this.isAlive(pid)) return { ok: false, error: 'Les morts ne se relèvent pas.' };
    const step = this.nightStep;
    const role = this.roles[pid];
    const target = action.target ?? null;
    const targetOk = (id, { allowSelf = false, mustBeAlive = true } = {}) => {
      if (!id) return false;
      if (!allowSelf && id === pid) return false;
      if (mustBeAlive && !this.isAlive(id)) return false;
      return this.players.some((p) => p.id === id);
    };

    if (step === 'cupidon' && role === 'cupidon') {
      const [a, b] = action.targets ?? [];
      if (!a || !b || a === b || !this.isAlive(a) || !this.isAlive(b)) return { ok: false, error: 'Choisissez deux joueurs différents et vivants.' };
      this.lovers = [a, b];
      this.say('💘 Deux villageois sont tombés amoureux cette nuit…');
      this.nextNightStep();
      return { ok: true };
    }

    if (step === 'salvateur' && role === 'salvateur') {
      if (!targetOk(target, { allowSelf: true })) return { ok: false, error: 'Cible invalide.' };
      if (target === this.lastProtected) return { ok: false, error: 'Impossible de protéger la même personne deux nuits de suite.' };
      this.night.protectedId = target;
      this.lastProtected = target;
      this.nextNightStep();
      return { ok: true };
    }

    if (step === 'voyante' && role === 'voyante') {
      if (!targetOk(target)) return { ok: false, error: 'Cible invalide.' };
      const seen = { nuit: this.nuit, pseudo: this.pseudoOf(target), role: this.roles[target] };
      this.voyanteSeen.push(seen);
      this.nextNightStep();
      return { ok: true, seen };
    }

    if (step === 'loups' && role === 'loup') {
      if (!targetOk(target) || this.roles[target] === 'loup') return { ok: false, error: 'Choisissez une proie hors de la meute.' };
      this.wolvesVotes[pid] = target;
      const wolves = this.aliveWolves();
      if (Object.keys(this.wolvesVotes).length >= wolves.length) {
        // Victime = cible la plus votée (égalité tranchée au sort).
        const counts = {};
        Object.values(this.wolvesVotes).forEach((t) => { counts[t] = (counts[t] || 0) + 1; });
        const max = Math.max(...Object.values(counts));
        const top = Object.keys(counts).filter((t) => counts[t] === max);
        this.night.wolfVictim = top[Math.floor(this.rng() * top.length)];
        this.nextNightStep();
      }
      return { ok: true };
    }

    if (step === 'petiteFille-spy') { /* jamais un step : l'espionnage est passif */ }

    if (step === 'sorciere' && role === 'sorciere') {
      const save = !!action.save;
      const kill = action.kill ?? null;
      if (save && (!this.potions.vie || !this.night.wolfVictim)) return { ok: false, error: 'Potion de vie indisponible ou inutile.' };
      if (kill !== null && (!this.potions.mort || !targetOk(kill, { allowSelf: false }))) return { ok: false, error: 'Potion de mort indisponible ou cible invalide.' };
      if (save) { this.night.witchSave = true; this.potions.vie = false; }
      if (kill) { this.night.witchKill = kill; this.potions.mort = false; }
      this.nextNightStep();
      return { ok: true };
    }

    if (step === 'corbeau' && role === 'corbeau') {
      if (target !== null && !targetOk(target, { allowSelf: false })) return { ok: false, error: 'Cible invalide.' };
      this.corbeauTarget = target;
      if (target) this.say('🐦‍⬛ Le Corbeau s\'est posé sur un toit…');
      this.nextNightStep();
      return { ok: true };
    }

    return { ok: false, error: 'Ce n\'est pas à vous d\'agir.' };
  }

  /** Passe l'étape de nuit en cours (Host, si un joueur ne répond plus). */
  skipNightStep(pid) {
    if (pid !== this.hostId || this.phase !== 'nuit') return { ok: false, error: 'Impossible.' };
    if (this.nightStep === 'loups' && !this.night.wolfVictim) {
      // Loups silencieux : victime aléatoire parmi les votes reçus, sinon pas de victime.
      const cast = Object.values(this.wolvesVotes);
      this.night.wolfVictim = cast.length ? cast[Math.floor(this.rng() * cast.length)] : null;
    }
    this.say('⏭️ Le meneur presse la nuit…');
    this.nextNightStep();
    return { ok: true };
  }

  /** La Petite Fille espionne : accès au chat des loups + risque d'être vue. */
  spy(pid) {
    if (this.phase !== 'nuit' || this.roles[pid] !== 'petiteFille' || !this.isAlive(pid)) {
      return { ok: false, error: 'Impossible.' };
    }
    if (!this.night.spying) {
      this.night.spying = true;
      if (!this.spyRevealed && this.rng() < RISQUE_PETITE_FILLE) {
        this.spyRevealed = true;
        this.chats.loups.push({ from: 'sys', pseudo: '🌙', text: `Un frisson… ${this.pseudoOf(pid)} vous épie derrière ses volets !`, ts: Date.now(), sys: true });
      }
    }
    return { ok: true };
  }

  resolveNight() {
    const deaths = new Set();
    const victim = this.night.wolfVictim;
    if (victim && victim !== this.night.protectedId && !this.night.witchSave) deaths.add(victim);
    if (this.night.witchKill) deaths.add(this.night.witchKill);

    this.deadThisNight = [...deaths];
    this.phase = 'jour-annonce';
    this.jour += 1;
    this.resumeAfter = 'jour';
    if (this.deadThisNight.length === 0) {
      this.say(`☀️ Jour ${this.jour} — miracle : personne n'est mort cette nuit !`);
    } else {
      this.say(`☀️ Jour ${this.jour} — le village se réveille…`);
    }
    this.applyDeaths(this.deadThisNight, 'nuit');
  }

  /* ------------------------------ morts et cascades ------------------- */

  applyDeaths(ids, cause) {
    const queue = [...ids];
    while (queue.length) {
      const id = queue.shift();
      if (!this.isAlive(id)) continue;
      this.alive[id] = false;
      const role = this.roleOf(id);
      this.say(`💀 ${this.pseudoOf(id)} est mort${cause === 'vote' ? ' sur l\'échafaud' : ''} — c'était ${role.icone} ${role.nom}.`);
      // Amoureux : mort de chagrin.
      if (this.lovers.includes(id)) {
        const other = this.lovers.find((l) => l !== id);
        if (other && this.isAlive(other)) {
          this.say(`💔 ${this.pseudoOf(other)} meurt de chagrin…`);
          queue.push(other);
        }
      }
      // Chasseur : tir à venir (interrompt le flux).
      if (this.roles[id] === 'chasseur') this.pendingHunter = id;
      // Capitaine : désigne son successeur.
      if (this.captainId === id) this.pendingCaptain = id;
    }
    this.afterDeaths();
  }

  afterDeaths() {
    if (this.checkWin()) return;
    if (this.pendingHunter) { this.phase = 'chasseur'; this.say('🏹 Dans son dernier souffle, le Chasseur arme son fusil…'); return; }
    if (this.pendingCaptain) { this.phase = 'succession'; this.say('🎖️ Le Capitaine désigne son successeur…'); return; }
    this.continueFlow();
  }

  continueFlow() {
    if (this.phase === 'fin') return;
    if (this.resumeAfter === 'nuit') {
      this.resumeAfter = null;
      this.beginNight();
      return;
    }
    if (this.jour === 1 && !this.captainId) {
      this.phase = 'vote';
      this.voteKind = 'capitaine';
      this.votes = {};
      this.say('🗳️ Élisez votre Capitaine (sa voix comptera double).');
      return;
    }
    if (['jour-annonce', 'chasseur', 'succession'].includes(this.phase)) {
      // Un tir de chasseur pendant le vote reprend au débat pour simplifier.
      this.phase = 'debat';
      this.say('💬 Débattez, accusez, défendez-vous… Le Host lancera le vote.');
    }
  }

  hunterShoot(pid, target) {
    if (this.phase !== 'chasseur' || pid !== this.pendingHunter) return { ok: false, error: 'Impossible.' };
    if (!target || !this.isAlive(target)) return { ok: false, error: 'Cible invalide.' };
    this.pendingHunter = null;
    this.say(`🏹 ${this.pseudoOf(pid)} emporte ${this.pseudoOf(target)} dans la tombe !`);
    this.applyDeaths([target], 'chasseur');
    return { ok: true };
  }

  chooseSuccessor(pid, target) {
    if (this.phase !== 'succession' || pid !== this.pendingCaptain) return { ok: false, error: 'Impossible.' };
    if (!target || !this.isAlive(target)) return { ok: false, error: 'Cible invalide.' };
    this.pendingCaptain = null;
    this.captainId = target;
    this.say(`🎖️ ${this.pseudoOf(target)} devient Capitaine du village.`);
    this.afterDeaths();
    return { ok: true };
  }

  /* ------------------------------ jour : débat et vote ----------------- */

  openVote(pid) {
    if (pid !== this.hostId) return { ok: false, error: 'Seul le Host lance le vote.' };
    if (this.phase !== 'debat') return { ok: false, error: 'Pas de débat en cours.' };
    this.phase = 'vote';
    this.voteKind = 'village';
    this.votes = {};
    this.say(this.corbeauTarget
      ? `🗳️ Le vote est ouvert — le Corbeau a marqué ${this.pseudoOf(this.corbeauTarget)} (+2 voix contre lui).`
      : '🗳️ Le vote est ouvert.');
    return { ok: true };
  }

  castVote(pid, target) {
    if (this.phase !== 'vote') return { ok: false, error: 'Aucun vote en cours.' };
    if (!this.isAlive(pid)) return { ok: false, error: 'Les morts ne votent pas.' };
    if (target !== null && (!this.isAlive(target) || (this.voteKind === 'village' && target === pid))) {
      return { ok: false, error: 'Cible invalide.' };
    }
    this.votes[pid] = target; // null = abstention
    if (Object.keys(this.votes).length >= this.alivePlayers().length) this.closeVote();
    return { ok: true };
  }

  closeVote() {
    const counts = {};
    Object.entries(this.votes).forEach(([voter, t]) => {
      if (!t) return;
      const weight = voter === this.captainId ? 2 : 1;
      counts[t] = (counts[t] || 0) + weight;
    });
    if (this.voteKind === 'village' && this.corbeauTarget && this.isAlive(this.corbeauTarget)) {
      counts[this.corbeauTarget] = (counts[this.corbeauTarget] || 0) + 2;
    }
    const entries = Object.entries(counts);
    this.votes = {};

    if (this.voteKind === 'capitaine') {
      if (!entries.length) {
        this.captainId = this.alivePlayers()[Math.floor(this.rng() * this.alivePlayers().length)].id;
        this.say(`🎖️ Personne ne se décide : le sort désigne ${this.pseudoOf(this.captainId)} Capitaine.`);
      } else {
        const max = Math.max(...entries.map(([, c]) => c));
        const top = entries.filter(([, c]) => c === max).map(([t]) => t);
        this.captainId = top[Math.floor(this.rng() * top.length)];
        this.say(`🎖️ ${this.pseudoOf(this.captainId)} est élu Capitaine (${max} voix).`);
      }
      this.voteKind = null;
      this.phase = 'debat';
      this.say('💬 Débattez, accusez, défendez-vous… Le Host lancera le vote.');
      return;
    }

    // Vote du village.
    this.voteKind = null;
    if (!entries.length) {
      this.say('🕊️ Personne n\'est condamné aujourd\'hui.');
      this.beginNight();
      return;
    }
    const max = Math.max(...entries.map(([, c]) => c));
    const top = entries.filter(([, c]) => c === max).map(([t]) => t);
    if (top.length > 1) {
      this.say('⚖️ Égalité parfaite : le village épargne tout le monde aujourd\'hui.');
      this.beginNight();
      return;
    }
    const condemned = top[0];
    this.phase = 'jour-annonce';
    this.resumeAfter = 'nuit';
    this.applyDeaths([condemned], 'vote');
    if (this.phase === 'jour-annonce') { this.resumeAfter = null; this.beginNight(); }
  }

  /* ------------------------------ victoire ---------------------------- */

  checkWin() {
    const alive = this.alivePlayers();
    const wolves = alive.filter((p) => this.roles[p.id] === 'loup').length;
    // Amoureux de camps opposés, derniers survivants.
    if (this.loversCrossCamp() && alive.length === 2 && alive.every((p) => this.lovers.includes(p.id))) {
      return this.endGame('amoureux', '💘 Les Amoureux triomphent, seuls contre tous !');
    }
    if (wolves === 0) return this.endGame('village', '🌻 Le Village a exterminé tous les Loups-Garous !');
    if (wolves >= alive.length - wolves) return this.endGame('loups', '🐺 Les Loups-Garous dévorent le village !');
    return false;
  }

  endGame(winner, message) {
    this.winner = winner;
    this.phase = 'fin';
    this.say(`🏆 ${message}`);
    return true;
  }

  summary() {
    const campWin = this.winner;
    const winners = this.players.filter((p) => {
      if (campWin === 'amoureux') return this.lovers.includes(p.id);
      return this.campOf(p.id) === campWin && !(campWin !== 'amoureux' && this.lovers.includes(p.id) && this.loversCrossCamp());
    });
    return {
      summary: `🐺 Loup-Garou — victoire ${campWin === 'village' ? 'du Village' : campWin === 'loups' ? 'des Loups' : 'des Amoureux'} (${winners.map((w) => w.pseudo).join(', ')}).`,
      winner: campWin,
      roles: Object.fromEntries(this.players.map((p) => [p.pseudo, this.roleOf(p.id).nom])),
      nuits: this.nuit,
    };
  }

  /* ------------------------------ actions & vues ----------------------- */

  handleAction(pid, action = {}) {
    switch (action.a) {
      case 'configure': return this.configure(pid, action.setup);
      case 'start': return this.start(pid);
      case 'night': return this.nightAction(pid, action);
      case 'spy': return this.spy(pid);
      case 'skip-night': return this.skipNightStep(pid);
      case 'open-vote': return this.openVote(pid);
      case 'vote': return this.castVote(pid, action.target ?? null);
      case 'shoot': return this.hunterShoot(pid, action.target);
      case 'successor': return this.chooseSuccessor(pid, action.target);
      case 'chat': return this.addChat(action.channel, pid, action.text);
      default: return { ok: false, error: 'Action inconnue.' };
    }
  }

  /** Vue personnalisée : rôle privé, meute pour les loups, chats autorisés. */
  getViewFor(pid) {
    const myRole = this.roles[pid] ?? null;
    const dead = this.phase !== 'setup' && !this.isAlive(pid) && myRole;
    const finished = this.phase === 'fin';
    const iAmActive = this.phase === 'nuit' && this.isAlive(pid) && (
      (this.nightStep === 'loups' && myRole === 'loup' && !this.wolvesVotes[pid])
      || (this.nightStep === this.roles[pid] && this.nightStep !== 'loups')
    );
    const channels = ['village', 'loups', 'amoureux', 'morts'].filter((c) => this.canRead(pid, c));
    const maskWolves = myRole === 'petiteFille' && !finished; // pseudos masqués pour l'espionne
    return {
      phase: this.phase,
      nuit: this.nuit,
      jour: this.jour,
      nightStep: this.phase === 'nuit' ? this.nightStep : null,
      me: myRole ? {
        role: myRole, ...ROLES[myRole],
        alive: this.isAlive(pid),
        lover: this.lovers.includes(pid) ? this.pseudoOf(this.lovers.find((l) => l !== pid)) : null,
        potions: myRole === 'sorciere' ? this.potions : undefined,
        seen: myRole === 'voyante' ? this.voyanteSeen.map((s) => ({ ...s, roleNom: `${ROLES[s.role].icone} ${ROLES[s.role].nom}` })) : undefined,
        packmates: myRole === 'loup' ? this.players.filter((p) => this.roles[p.id] === 'loup' && p.id !== pid).map((p) => p.pseudo) : undefined,
        wolfVictim: myRole === 'sorciere' && this.phase === 'nuit' && this.nightStep === 'sorciere' && this.night.wolfVictim
          ? this.pseudoOf(this.night.wolfVictim) : undefined,
        wolfVictimId: myRole === 'sorciere' && this.phase === 'nuit' && this.nightStep === 'sorciere' ? this.night.wolfVictim : undefined,
        lastProtected: myRole === 'salvateur' ? this.lastProtected : undefined,
        spyRevealed: myRole === 'petiteFille' ? this.spyRevealed : undefined,
      } : null,
      iAmActive,
      iAmPendingHunter: this.phase === 'chasseur' && this.pendingHunter === pid,
      iAmPendingCaptain: this.phase === 'succession' && this.pendingCaptain === pid,
      iVoted: this.phase === 'vote' ? pid in this.votes : false,
      voteKind: this.phase === 'vote' ? this.voteKind : null,
      votesCast: this.phase === 'vote' ? Object.keys(this.votes).length : 0,
      votesNeeded: this.phase === 'vote' ? this.alivePlayers().length : 0,
      wolvesWaiting: this.phase === 'nuit' && this.nightStep === 'loups'
        ? this.aliveWolves().filter((w) => !this.wolvesVotes[w.id]).length : 0,
      setup: this.setup,
      setupCheck: this.phase === 'setup' ? this.setupCheck() : null,
      captainId: this.captainId,
      corbeauMark: this.phase === 'vote' && this.voteKind === 'village' && this.corbeauTarget ? this.pseudoOf(this.corbeauTarget) : null,
      players: this.players.map((p) => ({
        id: p.id,
        pseudo: p.pseudo,
        alive: this.phase === 'setup' ? true : this.isAlive(p.id),
        captain: this.captainId === p.id,
        // Un rôle n'est révélé que si le joueur est MORT (pour tout le monde),
        // ou en fin de partie. Être mort soi-même ne donne aucun privilège.
        role: (this.phase !== 'setup' && !this.isAlive(p.id)) || finished || (dead && MORTS_VOIENT_TOUT)
          ? `${this.roleOf(p.id).icone} ${this.roleOf(p.id).nom}` : null,
      })),
      chats: Object.fromEntries(channels.map((c) => [c,
        this.chats[c].slice(-60).map((m) => (c === 'loups' && maskWolves && !m.sys
          ? { ...m, pseudo: '🐺 Loup', from: 'masked' } : m)),
      ])),
      canWrite: Object.fromEntries(channels.map((c) => [c, this.canWrite(pid, c)])),
      winner: this.winner,
      finalSummary: finished ? this.summary() : null,
      log: this.log.slice(-40),
    };
  }
}
