/**
 * Devil Level — moteur pur (aucun DOM, aucun réseau ; horloge injectée).
 *
 * Course de plateforme : 2 à 16 joueurs partent ensemble sur UNE SEULE route
 * semée de pièges, et le premier à la sortie gagne la manche.
 *
 * Trois principes tenus du cahier des charges :
 *
 *  1. « Le jeu doit être difficile, mais la mort doit être compréhensible. »
 *     Chaque mort enregistre SA CAUSE, transmise au joueur. On ne meurt jamais
 *     sans savoir pourquoi.
 *  2. « Le sabotage ne doit jamais rendre la victoire impossible. » Les pièges
 *     déclenchés par un joueur ont une durée bornée et se réarment ; aucun ne
 *     peut fermer définitivement la route.
 *  3. La mémorisation doit payer : le tracé d'un niveau est DÉTERMINISTE pour
 *     une graine donnée. Rejouer le même niveau, c'est retrouver les mêmes
 *     pièges au même endroit — mais les VARIANTES (phases des scies, laser)
 *     changent de manche en manche pour empêcher le pilotage automatique.
 */

/* ============================== réglages ============================== */

export const TICK_MS = 33;                 // ~30 Hz de simulation

// Monde : unités de jeu. Le sol de référence est à y = 0, l'axe y monte.
export const TUILE = 40;
export const JOUEUR_L = 26;
export const JOUEUR_H = 38;

// Déplacement — volontairement nerveux et précis.
const VITESSE = 260;                       // unités/seconde
const ACCEL = 2600;
const FREIN_SOL = 2400;
const FREIN_AIR = 900;
export const SAUT = 560;
const GRAVITE = 1700;
const GRAVITE_CHUTE = 2300;                // on retombe plus vite qu'on ne monte
const COYOTE_MS = 110;                     // saut toléré juste après avoir quitté le sol
const TAMPON_SAUT_MS = 120;                // saut mémorisé juste avant d'atterrir

export const DASH_VITESSE = 620;
export const DASH_MS = 180;
export const DASH_RECHARGE_MS = 1400;

// Manche.
export const RESPAWN_MS = 900;             // « animation courte » avant de réapparaître
export const DECOMPTE_MS = 3000;
export const FIN_MANCHE_MS = 5000;
// Durée maximale d'une course (100 s). Sans ce filet, une manche où personne
// n'atteint la sortie — joueur bloqué, parti, ou en difficulté — ne se
// terminerait jamais. Au-delà, les retardataires sont classés selon leur
// progression : attendre trois minutes est déjà trop long pour ceux qui ont
// fini.
export const COURSE_MAX_MS = 100000;
// Délai laissé aux autres une fois le premier arrivé.
export const DELAI_APRES_PREMIER_MS = 20000;
export const MANCHES_DEFAUT = 3;

// Bonus.
export const BONUS = Object.freeze({
  dash:        { nom: 'Dash',        icone: '💨', duree: 6000 },
  doubleSaut:  { nom: 'Double saut', icone: '🦅', duree: 9000 },
  bouclier:    { nom: 'Bouclier',    icone: '🛡️', duree: 0 },
  ghost:       { nom: 'Ghost',       icone: '👻', duree: 3500 },
  vitesse:     { nom: 'Speed Boost', icone: '⚡', duree: 4000 },
  gel:         { nom: 'Gel',         icone: '❄️', duree: 0 },
  tornade:     { nom: 'Tornade',     icone: '🌪️', duree: 0 },
  bombe:       { nom: 'Bombe',       icone: '💣', duree: 0 },
});
export const BONUS_IDS = Object.freeze(Object.keys(BONUS));

const GEL_MS = 1600;
const TORNADE_RAYON = 190;
const TORNADE_FORCE = 430;
const BOMBE_DELAI_MS = 1500;
const BOMBE_RAYON = 130;
const VITESSE_BOOST = 1.55;

// Thèmes de niveau.
/*
 * Palettes à DEUX TONS d'une même teinte, dans l'esprit des plateformers
 * minimalistes : `air` est la zone jouable (le ton clair), `solide` le
 * terrain (le ton sombre). Aucun dégradé, aucune texture — la lisibilité vient
 * du contraste entre ces deux aplats et du noir réservé au danger.
 * La palette de référence est celle de Hell (#feb854 / #996b07).
 */
export const THEMES = Object.freeze({
  hell:            { nom: 'Hell',           air: '#feb854', solide: '#996b07' },
  'devil-factory': { nom: 'Devil Factory',  air: '#ff9d6b', solide: '#8c3d1e' },
  'frozen-hell':   { nom: 'Frozen Hell',    air: '#a8e0f5', solide: '#2c6480' },
  'haunted-castle':{ nom: 'Haunted Castle', air: '#c9b3e8', solide: '#4a3070' },
  'sky-hell':      { nom: 'Sky Hell',       air: '#bcd9f2', solide: '#3a5f85' },
  'toy-factory':   { nom: 'Toy Factory',    air: '#ffb3d1', solide: '#a83a68' },
});
export const THEMES_IDS = Object.freeze(Object.keys(THEMES));

/* ============================== utilitaires ============================== */

function borne(v, min, max) { return Math.max(min, Math.min(max, v)); }

/** Générateur déterministe : même graine → même niveau, toujours. */
export function graineur(graine) {
  let a = graine >>> 0;
  return function () {
    a = (a + 0x6D2B79F5) >>> 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function chevauche(ax, ay, aw, ah, bx, by, bw, bh) {
  return ax < bx + bw && ax + aw > bx && ay < by + bh && ay + ah > by;
}

/* ============================== génération du niveau ============================== */

/**
 * Construit la route. Elle avance TOUJOURS vers la droite : un seul chemin,
 * comme demandé. La difficulté monte par paliers — les premières sections
 * enseignent, les dernières combinent.
 */
export function genererNiveau(theme, graine, { longueur = 14 } = {}) {
  const rng = graineur(graine);
  const sols = [];        // { x, y, l } plateformes fixes
  const pieges = [];
  const bonus = [];
  const checkpoints = [];
  const mobiles = [];

  let x = 0;
  const yBase = 0;

  // Zone de départ : plate et sans danger, on comprend les commandes.
  sols.push({ x: -160, y: yBase, l: 560 });
  x = 400;

  const typesParPalier = [
    ['pics'],
    ['pics', 'plateforme-fuyante'],
    ['scie', 'faux-sol', 'plateforme-fuyante'],
    ['laser', 'scie', 'ecraseur', 'faux-sol'],
    ['lave', 'laser', 'ecraseur', 'plaque', 'scie'],
    ['plaque', 'lave', 'laser', 'ecraseur', 'scie', 'plateforme-fuyante'],
  ];

  for (let i = 0; i < longueur; i += 1) {
    const avancement = i / longueur;
    const palier = Math.min(typesParPalier.length - 1, Math.floor(avancement * typesParPalier.length));
    const choix = typesParPalier[palier];
    const type = choix[Math.floor(rng() * choix.length)];
    const largeur = 200 + Math.floor(rng() * 160);

    // Un checkpoint tous les cinq segments : une erreur ne coûte jamais la manche.
    // Un checkpoint tous les trois segments. Avec un niveau plus court, un
    // jalon tous les cinq segments n'en laissait que deux sur tout le parcours.
    if (i > 0 && i % 3 === 0) {
      // Le checkpoint est posé SUR la surface du sol (épaisseur 18), jamais
      // dedans : réapparaître sous la surface provoquait une re-collision
      // immédiate et une boucle de mort dont on ne sortait plus.
      checkpoints.push({ id: `cp${i}`, x: x - 30, y: yBase + 18, index: checkpoints.length + 1 });
    }

    if (type === 'lave') {
      // Fosse de lave franchissable par plateformes : on doit avancer vite.
      const largeurFosse = 120 + Math.floor(rng() * 90);
      // La lave affleure le niveau du sol : posée sous lui (y négatif), elle
      // était invisible ET inatteignable — on mourait de chute avant de la
      // toucher, ce qui rendait la mort incompréhensible. Elle occupe donc
      // désormais [yBase - 10, yBase + 26], bien en vue au fond de la fosse.
      pieges.push({ id: `p${i}`, type: 'lave', x, y: yBase - 10, l: largeurFosse, h: 36 });
      const nbPlates = 3 + Math.floor(rng() * 2);
      for (let k = 0; k < nbPlates; k += 1) {
        mobiles.push({
          id: `m${i}-${k}`, x: x + 20 + k * (largeurFosse / nbPlates), y: yBase + 10,
          l: 92, h: 14, amplitude: 34 + rng() * 30, periode: 2400 + rng() * 1400,
          phase: rng() * Math.PI * 2, axe: rng() < 0.5 ? 'y' : 'x',
        });
      }
      x += largeurFosse;
      sols.push({ x, y: yBase, l: 130 });
      x += 130;
    } else if (type === 'plateforme-fuyante') {
      // Plateformes qui disparaissent : il faut avancer sans hésiter.
      const nb = 3 + Math.floor(rng() * 2);
      for (let k = 0; k < nb; k += 1) {
        pieges.push({
          id: `p${i}-${k}`, type: 'fuyante', x: x + k * 92, y: yBase, l: 80, h: 16,
          delai: 700 + Math.floor(rng() * 260), reapparition: 2200,
        });
      }
      x += nb * 92 + 40;
      sols.push({ x, y: yBase, l: 140 });
      x += 140;
    } else if (type === 'faux-sol') {
      // Ressemble à du sol, cède à l'atterrissage. Piège de mémorisation.
      sols.push({ x, y: yBase, l: 70 });
      pieges.push({ id: `p${i}`, type: 'faux-sol', x: x + 70, y: yBase, l: 90, h: 16, delai: 380, reapparition: 2600 });
      sols.push({ x: x + 160, y: yBase, l: largeur });
      x += 160 + largeur;
    } else {
      // Segments avec sol continu : le piège est au-dessus ou dedans.
      sols.push({ x, y: yBase, l: largeur });
      if (type === 'pics') {
        const px = x + 60 + rng() * (largeur - 140);
        pieges.push({ id: `p${i}`, type: 'pics', x: px, y: yBase, l: 56, h: 30, cycle: 1500 + rng() * 900, phase: rng() * 1000, sorti: false });
      } else if (type === 'scie') {
        const vertical = rng() < 0.4;
        pieges.push({
          id: `p${i}`, type: 'scie', x: x + largeur * 0.4, y: yBase + (vertical ? 20 : 26),
          l: 44, h: 44, amplitude: vertical ? 92 : 104, periode: 1900 + rng() * 900,
          phase: rng() * Math.PI * 2, axe: vertical ? 'y' : 'x',
        });
      } else if (type === 'laser') {
        pieges.push({
          id: `p${i}`, type: 'laser', x: x + largeur * 0.5, y: yBase, l: 14, h: 200,
          cycle: 2600 + rng() * 900, duree: 480, phase: rng() * 2000,
        });
      } else if (type === 'ecraseur') {
        pieges.push({
          id: `p${i}`, type: 'ecraseur', x: x + largeur * 0.45, y: yBase + 190,
          l: 78, h: 52, cycle: 3000 + rng() * 1100, phase: rng() * 1500, chute: 190,
        });
      } else if (type === 'plaque') {
        // Sabotage : le premier qui passe arme un bloc pour ceux de derrière.
        pieges.push({ id: `p${i}`, type: 'plaque', x: x + 40, y: yBase, l: 60, h: 10, armee: 0, delai: 1400 });
        pieges.push({ id: `p${i}-bloc`, type: 'bloc-arme', x: x + 150, y: yBase + 200, l: 80, h: 56, lieA: `p${i}`, actif: false, chute: 200 });
      }
      x += largeur;
    }

    /*
     * Densité croissante. Les paliers font varier le TYPE de piège, mais pas
     * leur nombre : mesuré sur dix niveaux, sept ne montaient pas en
     * difficulté — le début était parfois plus chargé que la fin. On ajoute
     * donc un piège supplémentaire dans la seconde moitié du parcours, ce qui
     * garantit la progression exigée par le cahier des charges.
     */
    if (avancement > 0.5 && type !== 'lave' && type !== 'plateforme-fuyante') {
      const surplus = avancement > 0.78 ? 2 : 1;
      for (let k = 0; k < surplus; k += 1) {
        const px = x - largeur + 70 + rng() * Math.max(40, largeur - 150);
        if (rng() < 0.5) {
          pieges.push({
            id: `s${i}-${k}`, type: 'pics', x: px, y: yBase, l: 48, h: 28,
            cycle: 1500 + rng() * 800, phase: rng() * 1000,
          });
        } else {
          pieges.push({
            id: `s${i}-${k}`, type: 'scie', x: px, y: yBase + 24,
            l: 40, h: 40, amplitude: 80 + rng() * 30, periode: 1900 + rng() * 800,
            phase: rng() * Math.PI * 2, axe: rng() < 0.5 ? 'x' : 'y',
          });
        }
      }
    }

    // Un bonus environ un segment sur deux, posé sur la route.
    if (rng() < 0.55) {
      bonus.push({
        id: `b${i}`, type: BONUS_IDS[Math.floor(rng() * BONUS_IDS.length)],
        x: x - 90 - rng() * 60, y: yBase + 34 + rng() * 46, pris: false, reapparition: 0,
      });
    }

    // Petit palier de respiration entre deux sections.
    sols.push({ x, y: yBase, l: 90 });
    x += 90;
  }

  /*
   * Garde-fou d'espacement : compter les segments ne suffit pas, car leurs
   * longueurs varient. Un tronçon trop long sans point de reprise transforme
   * une erreur en acharnement — exactement ce que les checkpoints doivent
   * éviter. On en intercale donc partout où l'écart dépasse ~900 unités.
   */
  const ESPACEMENT_MAX = 900;
  const jalons = [0, ...checkpoints.map((c) => c.x), x].sort((a, b) => a - b);
  for (let k = 1; k < jalons.length; k += 1) {
    const ecart = jalons[k] - jalons[k - 1];
    if (ecart <= ESPACEMENT_MAX) continue;
    const combien = Math.floor(ecart / ESPACEMENT_MAX);
    for (let m = 1; m <= combien; m += 1) {
      const cx = jalons[k - 1] + (ecart * m) / (combien + 1);
      // On ne pose un jalon que s'il y a du sol dessous pour l'atteindre.
      const surSol = sols.some((sl) => cx >= sl.x && cx <= sl.x + sl.l);
      if (surSol) checkpoints.push({ id: `cpx${k}-${m}`, x: Math.round(cx), y: yBase + 18, index: 0 });
    }
  }
  checkpoints.sort((a, b) => a.x - b.x);
  checkpoints.forEach((c, i) => { c.index = i + 1; });

  // Ligne d'arrivée.
  sols.push({ x, y: yBase, l: 320 });
  const sortie = { x: x + 150, y: yBase, l: 40, h: 90 };

  return {
    theme, graine, sols, pieges, bonus, checkpoints, mobiles, sortie,
    longueurTotale: x + 320,
  };
}

/* ============================== moteur ============================== */

export class DevilLevelEngine {
  /**
   * @param {{id:string,pseudo:string}[]} joueurs 2 à 16.
   * @param {{rng?:Function, now?:Function, manches?:number, theme?:string}} options
   */
  constructor(joueurs, options = {}) {
    if (!Array.isArray(joueurs) || joueurs.length < 2 || joueurs.length > 16) {
      throw new Error('Devil Level se joue de 2 à 16 joueurs.');
    }
    this.rng = options.rng || Math.random;
    this.horloge = options.now || (() => Date.now());
    this.manchesTotal = borne(Number(options.manches) || MANCHES_DEFAUT, 1, 9);
    this.themeChoisi = options.theme && THEMES[options.theme] ? options.theme : null;

    this.joueurs = joueurs.map((j) => ({
      id: j.id, pseudo: j.pseudo ?? '?',
      points: 0, manchesGagnees: 0, morts: 0, meilleurRang: null,
    }));
    this.manche = 0;
    this.phase = 'attente';     // attente | decompte | course | fin-manche | fin
    this.journal = [];
    this.effets = [];
    this.bombes = [];
    this.uid = 0;
    this.vainqueur = null;
  }

  now() { return this.horloge(); }
  dire(t) { this.journal.push(t); if (this.journal.length > 30) this.journal.shift(); }
  pseudoDe(id) { return this.joueurs.find((j) => j.id === id)?.pseudo ?? '?'; }

  /* ------------------------- manches ------------------------- */

  demarrer() {
    if (this.phase !== 'attente') return { ok: false, error: 'Déjà lancé.' };
    this.demarrerManche();
    return { ok: true };
  }

  demarrerManche() {
    this.manche += 1;
    const theme = this.themeChoisi ?? THEMES_IDS[Math.floor(this.rng() * THEMES_IDS.length)];
    // Graine dérivée de la manche : le tracé est reproductible et annonçable.
    this.graine = (this.manche * 7919 + Math.floor(this.rng() * 100000)) >>> 0;
    this.niveau = genererNiveau(theme, this.graine);
    this.debutManche = this.now();
    this.finDecompte = this.debutManche + DECOMPTE_MS;
    this.arrivees = [];
    this.effets = [];
    this.bombes = [];
    this.evenement = null;
    this.prochainEvenement = this.debutManche + DECOMPTE_MS + 18000;

    this.etats = {};
    this.joueurs.forEach((j, i) => {
      this.etats[j.id] = {
        x: 40 + (i % 4) * 34, y: 24 + Math.floor(i / 4) * 6,
        vx: 0, vy: 0,
        auSol: false, dernierSol: 0, tamponSaut: 0,
        regard: 1, sautsRestants: 1,
        dash: { finit: 0, pret: 0 },
        bonus: null, bonusFinit: 0,
        bouclier: false, ghost: 0, vitesse: 0, doubleSaut: 0,
        gelJusqua: 0,
        mort: false, respawnA: 0, causeMort: null, invulnerableJusqua: 0,
        checkpoint: { x: 40, y: 20 },
        arrive: false, rang: null, temps: null,
        entree: { gauche: false, droite: false, saut: false, dash: false, pouvoir: false },
      };
    });
    this.phase = 'decompte';
    this.dire(`🔥 Manche ${this.manche}/${this.manchesTotal} — ${THEMES[theme].nom}`);
  }

  /* ------------------------- entrées ------------------------- */

  etatDe(id) { return this.etats?.[id] ?? null; }

  entrer(id, patch = {}) {
    const e = this.etatDe(id);
    if (!e || this.phase !== 'course' || e.mort || e.arrive) return { ok: false };
    const t = this.now();
    if (t < e.gelJusqua) return { ok: false, error: 'Gelé !' };
    if (typeof patch.gauche === 'boolean') e.entree.gauche = patch.gauche;
    if (typeof patch.droite === 'boolean') e.entree.droite = patch.droite;
    // Le saut est mémorisé un court instant : appuyer juste avant d'atterrir
    // doit fonctionner, sinon les enchaînements paraissent injustes.
    if (patch.saut === true) e.tamponSaut = t + TAMPON_SAUT_MS;
    if (typeof patch.saut === 'boolean') e.entree.saut = patch.saut;
    if (patch.dash === true) this.dasher(id);
    if (patch.pouvoir === true) this.utiliserBonus(id);
    return { ok: true };
  }

  dasher(id) {
    const e = this.etatDe(id);
    if (!e || e.mort || e.arrive || this.phase !== 'course') return { ok: false };
    const t = this.now();
    if (t < e.dash.pret) return { ok: false, error: 'Dash en recharge.' };
    e.dash.finit = t + DASH_MS;
    e.dash.pret = t + DASH_MS + DASH_RECHARGE_MS;
    e.vx = e.regard * DASH_VITESSE;
    this.effets.push({ id: ++this.uid, type: 'dash', x: e.x, y: e.y, at: t });
    return { ok: true };
  }

  /** Bonus offensifs : gel, tornade, bombe. Les autres agissent au ramassage. */
  utiliserBonus(id) {
    const e = this.etatDe(id);
    if (!e || !e.bonus || e.mort || this.phase !== 'course') return { ok: false };
    const t = this.now();
    const type = e.bonus;
    if (type === 'gel') {
      // Ne gèle qu'un adversaire PROCHE : impossible de bloquer le peloton.
      const cible = this.joueurs
        .map((j) => ({ j, s: this.etats[j.id] }))
        .filter(({ j, s }) => j.id !== id && !s.mort && !s.arrive && Math.abs(s.x - e.x) < 320)
        .sort((a, b) => Math.abs(a.s.x - e.x) - Math.abs(b.s.x - e.x))[0];
      if (!cible) return { ok: false, error: 'Personne à portée.' };
      cible.s.gelJusqua = t + GEL_MS;
      cible.s.entree = { gauche: false, droite: false, saut: false, dash: false, pouvoir: false };
      this.effets.push({ id: ++this.uid, type: 'gel', x: cible.s.x, y: cible.s.y, at: t });
      this.dire(`❄️ ${this.pseudoDe(id)} gèle ${this.pseudoDe(cible.j.id)} !`);
    } else if (type === 'tornade') {
      let touches = 0;
      for (const j of this.joueurs) {
        if (j.id === id) continue;
        const s = this.etats[j.id];
        if (s.mort || s.arrive) continue;
        const d = Math.hypot(s.x - e.x, s.y - e.y);
        if (d > TORNADE_RAYON) continue;
        const sens = s.x >= e.x ? 1 : -1;
        s.vx += sens * TORNADE_FORCE;
        s.vy += 240;
        touches += 1;
      }
      this.effets.push({ id: ++this.uid, type: 'tornade', x: e.x, y: e.y, at: t });
      if (touches) this.dire(`🌪️ ${this.pseudoDe(id)} repousse ${touches} joueur(s) !`);
    } else if (type === 'bombe') {
      this.bombes.push({
        id: ++this.uid, x: e.x + e.regard * 60, y: e.y + 20, vx: e.regard * 200, vy: 180,
        explosionA: t + BOMBE_DELAI_MS, par: id,
      });
      this.dire(`💣 ${this.pseudoDe(id)} lance une bombe.`);
    } else {
      return { ok: false, error: 'Ce bonus agit tout seul.' };
    }
    e.bonus = null;
    return { ok: true };
  }

  /* ------------------------- simulation ------------------------- */

  tick() {
    const t = this.now();
    if (this.phase === 'decompte') {
      if (t >= this.finDecompte) { this.phase = 'course'; this.dire('🏁 Partez !'); }
      return;
    }
    if (this.phase === 'fin-manche') {
      if (t >= this.finManche) this.suiteManche();
      return;
    }
    if (this.phase !== 'course') return;

    const dt = TICK_MS / 1000;
    this.majEvenement(t);
    for (const j of this.joueurs) this.majJoueur(j.id, dt, t);
    this.majBombes(t);
    this.effets = this.effets.filter((f) => t - f.at < 800);

    // La manche s'arrête quand tout le monde est arrivé…
    if (this.joueurs.every((j) => this.etats[j.id].arrive)) { this.finirManche(); return; }

    // …ou quand le temps est écoulé. Deux limites, intégrées ici plutôt que
    // dans une méthode séparée : une garde que l'appelant peut oublier de
    // déclencher n'en est pas une.
    const tropLong = t - this.finDecompte > COURSE_MAX_MS;
    const apresPremier = this.premierA && (t - this.premierA > DELAI_APRES_PREMIER_MS);
    if (tropLong || apresPremier) {
      // Les retardataires sont classés selon leur avancée sur la route : le
      // classement reste juste même sans franchir la ligne.
      const restants = this.joueurs
        .filter((j) => !this.etats[j.id].arrive)
        .sort((a, b) => this.etats[b.id].x - this.etats[a.id].x);
      for (const j of restants) {
        const e = this.etats[j.id];
        e.arrive = true;
        e.rang = this.arrivees.length + 1;
        this.arrivees.push({ id: j.id, rang: e.rang, temps: null });
      }
      this.dire(tropLong ? '⏱️ Temps écoulé — classement sur la progression.' : '⏱️ Fin de manche.');
      this.finirManche();
    }
  }

  /** Événements de niveau, annoncés AVANT de s'activer (règle du cahier). */
  majEvenement(t) {
    if (this.evenement && t >= this.evenement.finit) {
      this.dire(`✅ ${this.evenement.nom} terminé.`);
      this.evenement = null;
      this.prochainEvenement = t + 20000;
      return;
    }
    if (this.evenement || t < this.prochainEvenement) return;
    if (this.evenement === null && !this.annonce) {
      // Annonce 2,5 s avant : le joueur doit pouvoir s'y préparer.
      this.annonce = { type: ['darkness', 'earthquake', 'chaos', 'speed', 'reverse'][Math.floor(this.rng() * 5)], a: t + 2500 };
      const noms = { darkness: '🌑 Darkness', earthquake: '🌎 Earthquake', chaos: '💀 Chaos', speed: '⏩ Speed Mode', reverse: '🔄 Reverse' };
      this.dire(`⚠️ ${noms[this.annonce.type]} dans 3 secondes…`);
      return;
    }
    if (this.annonce && t >= this.annonce.a) {
      const noms = { darkness: 'Darkness', earthquake: 'Earthquake', chaos: 'Chaos', speed: 'Speed Mode', reverse: 'Reverse' };
      this.evenement = { type: this.annonce.type, nom: noms[this.annonce.type], finit: t + 12000 };
      this.annonce = null;
      this.dire(`🔥 ${this.evenement.nom} !`);
    }
  }

  facteurTemps() {
    if (this.evenement?.type === 'speed') return 1.75;
    if (this.evenement?.type === 'reverse') return -1;
    return 1;
  }

  majJoueur(id, dt, t) {
    const e = this.etats[id];
    if (e.arrive) return;

    if (e.mort) {
      if (t >= e.respawnA) {
        e.mort = false;
        e.x = e.checkpoint.x;
        // On réapparaît légèrement AU-DESSUS du point de reprise : atterrir
        // proprement vaut mieux que naître à l'intérieur d'une surface.
        e.y = e.checkpoint.y + 6;
        e.vx = 0; e.vy = 0;
        e.bouclier = false; e.ghost = 0;
        // Brève immunité : si un piège balaie justement le checkpoint au
        // moment du retour, on ne repart pas dans une boucle de mort.
        e.invulnerableJusqua = t + 800;
      }
      return;
    }
    const gele = t < e.gelJusqua;

    // Horizontal.
    const dash = t < e.dash.finit;
    const vmax = VITESSE * (t < e.vitesse ? VITESSE_BOOST : 1);
    let dir = 0;
    if (!gele) {
      if (e.entree.gauche) dir -= 1;
      if (e.entree.droite) dir += 1;
    }
    if (dir !== 0) e.regard = dir;
    if (dash) {
      e.vx = e.regard * DASH_VITESSE;
    } else if (dir !== 0) {
      e.vx += dir * ACCEL * dt;
      e.vx = borne(e.vx, -vmax, vmax);
    } else {
      const frein = (e.auSol ? FREIN_SOL : FREIN_AIR) * dt;
      e.vx = Math.abs(e.vx) <= frein ? 0 : e.vx - Math.sign(e.vx) * frein;
    }

    // Saut, avec « coyote time » et tampon d'entrée : deux petites tolérances
    // sans lesquelles les sauts ratés paraissent injustes alors qu'ils étaient
    // bien appuyés.
    const auSolRecent = t - e.dernierSol < COYOTE_MS;
    if (!gele && t < e.tamponSaut) {
      if (e.auSol || auSolRecent) {
        e.vy = SAUT; e.auSol = false; e.tamponSaut = 0; e.dernierSol = 0;
      } else if (t < e.doubleSaut && e.sautsRestants > 0) {
        e.vy = SAUT * 0.92; e.sautsRestants -= 1; e.tamponSaut = 0;
        this.effets.push({ id: ++this.uid, type: 'double-saut', x: e.x, y: e.y, at: t });
      }
    }

    // Gravité : plus forte à la descente, ce qui rend le saut plus contrôlable.
    if (!dash) e.vy -= (e.vy > 0 ? GRAVITE : GRAVITE_CHUTE) * dt;
    e.vy = Math.max(e.vy, -900);

    const vitesseMonde = this.facteurTemps();
    e.x += e.vx * dt * (vitesseMonde < 0 ? 1 : vitesseMonde === 1.75 ? 1 : 1);
    e.y += e.vy * dt;

    this.collisionsSol(e, t);
    if (e.auSol) { e.dernierSol = t; e.sautsRestants = 1; }

    if (e.x < -200) e.x = -200;
    if (e.y < -600) this.tuer(id, 'chute', t);

    this.collisionsPieges(id, e, t);
    this.ramasserBonus(id, e, t);
    this.majCheckpoint(e);

    // Arrivée.
    const s = this.niveau.sortie;
    if (!e.arrive && chevauche(e.x, e.y, JOUEUR_L, JOUEUR_H, s.x, s.y, s.l, s.h)) {
      e.arrive = true;
      e.temps = t - this.finDecompte;
      e.rang = this.arrivees.length + 1;
      this.arrivees.push({ id, rang: e.rang, temps: e.temps });
      this.dire(`🏆 ${this.pseudoDe(id)} termine ${e.rang}${e.rang === 1 ? 'er' : 'e'} !`);
      if (e.rang === 1) this.premierA = t;
    }
  }

  /** Plateformes fixes, mobiles, et fuyantes encore présentes. */
  collisionsSol(e, t) {
    e.auSol = false;
    const surfaces = [
      ...this.niveau.sols.map((s) => ({ x: s.x, y: s.y, l: s.l, h: 18 })),
      ...this.niveau.mobiles.map((m) => this.poseMobile(m, t)),
      ...this.niveau.pieges
        .filter((p) => (p.type === 'fuyante' || p.type === 'faux-sol') && !this.estTombee(p, t))
        .map((p) => ({ x: p.x, y: p.y, l: p.l, h: p.h })),
    ];
    for (const s of surfaces) {
      // On n'atterrit que par le dessus : les plateformes se traversent par en
      // dessous, ce qui évite de rester bloqué sous une plateforme mobile.
      if (e.vy > 0) continue;
      if (!chevauche(e.x, e.y, JOUEUR_L, JOUEUR_H, s.x, s.y - 4, s.l, s.h + 8)) continue;
      const pieds = e.y;
      const dessus = s.y + s.h;
      if (pieds >= dessus - 22) {
        e.y = dessus;
        e.vy = 0;
        e.auSol = true;
        // Marcher sur une fuyante ou un faux sol amorce sa chute.
        const p = this.niveau.pieges.find((q) => q.x === s.x && q.y === s.y && (q.type === 'fuyante' || q.type === 'faux-sol'));
        if (p && !p.toucheeA) p.toucheeA = t;
      }
    }
  }

  poseMobile(m, t) {
    const dephasage = Math.sin((t / m.periode) * Math.PI * 2 * this.facteurTemps() + m.phase) * m.amplitude;
    return {
      x: m.x + (m.axe === 'x' ? dephasage : 0),
      y: m.y + (m.axe === 'y' ? dephasage : 0),
      l: m.l, h: m.h,
    };
  }

  estTombee(p, t) {
    if (!p.toucheeA) return false;
    const age = t - p.toucheeA;
    if (age < p.delai) return false;
    if (age > p.delai + p.reapparition) { p.toucheeA = null; return false; }
    return true;
  }

  /** Position et activité d'un piège à un instant donné. */
  posePiege(p, t) {
    const vt = this.facteurTemps();
    if (p.type === 'scie') {
      const d = Math.sin((t / p.periode) * Math.PI * 2 * vt + p.phase) * p.amplitude;
      return { x: p.x + (p.axe === 'x' ? d : 0), y: p.y + (p.axe === 'y' ? d : 0), l: p.l, h: p.h, actif: true };
    }
    if (p.type === 'pics') {
      const chaos = this.evenement?.type === 'chaos';
      const phase = ((t + p.phase) % p.cycle) / p.cycle;
      const sorti = chaos || phase > 0.65;   // sortis 35 % du temps, pas 55 %
      return { x: p.x, y: p.y, l: p.l, h: sorti ? p.h : 6, actif: sorti };
    }
    if (p.type === 'laser') {
      const phase = ((t + p.phase) % p.cycle);
      const actif = this.evenement?.type === 'chaos' || phase < p.duree;
      return { x: p.x, y: p.y, l: p.l, h: p.h, actif, imminent: phase >= p.cycle - 500 };
    }
    if (p.type === 'ecraseur') {
      const phase = ((t + p.phase) % p.cycle) / p.cycle;
      // Descente brutale sur le premier tiers, remontée lente ensuite.
      const desc = phase < 0.3 ? phase / 0.3 : Math.max(0, 1 - (phase - 0.3) / 0.7);
      return { x: p.x, y: p.y - desc * p.chute, l: p.l, h: p.h, actif: true, desc };
    }
    if (p.type === 'bloc-arme') {
      if (!p.actif) return { x: p.x, y: p.y, l: p.l, h: p.h, actif: false };
      const age = t - p.actif;
      const desc = borne(age / 500, 0, 1);
      const fini = age > 2600;
      if (fini) { p.actif = false; const plaque = this.niveau.pieges.find((q) => q.id === p.lieA); if (plaque) plaque.armee = 0; }
      return { x: p.x, y: p.y - desc * p.chute, l: p.l, h: p.h, actif: !fini };
    }
    if (p.type === 'lave') return { x: p.x, y: p.y, l: p.l, h: p.h, actif: true };
    return { x: p.x, y: p.y, l: p.l, h: p.h, actif: false };
  }

  collisionsPieges(id, e, t) {
    if (t < e.ghost) return;                    // Ghost : on traverse les obstacles
    if (t < (e.invulnerableJusqua ?? 0)) return; // immunité de retour en jeu
    for (const p of this.niveau.pieges) {
      if (p.type === 'fuyante' || p.type === 'faux-sol') continue;

      if (p.type === 'plaque') {
        // Sabotage : armé par le passage, retombe sur ceux de derrière.
        if (!p.armee && chevauche(e.x, e.y, JOUEUR_L, JOUEUR_H, p.x, p.y, p.l, p.h + 20)) {
          p.armee = t;
          const bloc = this.niveau.pieges.find((q) => q.id === `${p.id}-bloc`);
          if (bloc) bloc.actif = t + p.delai;
          this.dire(`⚙️ ${this.pseudoDe(id)} déclenche un mécanisme…`);
        }
        continue;
      }
      if (p.type === 'bloc-arme') {
        if (p.actif && t < p.actif) continue;   // délai avant chute
      }

      const pose = this.posePiege(p, t);
      if (!pose.actif) continue;
      if (!chevauche(e.x, e.y, JOUEUR_L, JOUEUR_H, pose.x, pose.y, pose.l, pose.h)) continue;

      if (p.type === 'lave') { this.tuer(id, 'lave', t); return; }
      if (p.type === 'scie') { this.tuer(id, 'scie', t); return; }
      if (p.type === 'pics') { this.tuer(id, 'pics', t); return; }
      if (p.type === 'laser') { this.tuer(id, 'laser', t); return; }
      if (p.type === 'ecraseur' || p.type === 'bloc-arme') { this.tuer(id, p.type === 'ecraseur' ? 'ecraseur' : 'bloc', t); return; }
    }
  }

  ramasserBonus(id, e, t) {
    for (const b of this.niveau.bonus) {
      if (b.pris && t < b.reapparition) continue;
      if (b.pris && t >= b.reapparition) b.pris = false;
      if (!chevauche(e.x, e.y, JOUEUR_L, JOUEUR_H, b.x - 14, b.y - 14, 28, 28)) continue;
      b.pris = true;
      b.reapparition = t + 9000;
      this.appliquerBonus(id, e, b.type, t);
      this.effets.push({ id: ++this.uid, type: 'bonus', x: b.x, y: b.y, at: t });
    }
  }

  appliquerBonus(id, e, type, t) {
    const d = BONUS[type].duree;
    if (type === 'dash') { e.dash.pret = 0; e.vitesse = t + d; }
    else if (type === 'doubleSaut') { e.doubleSaut = t + d; e.sautsRestants = 1; }
    else if (type === 'bouclier') e.bouclier = true;
    else if (type === 'ghost') e.ghost = t + d;
    else if (type === 'vitesse') e.vitesse = t + d;
    else e.bonus = type;          // gel, tornade, bombe : à déclencher soi-même
    this.dire(`${BONUS[type].icone} ${this.pseudoDe(id)} ramasse ${BONUS[type].nom}.`);
  }

  majCheckpoint(e) {
    for (const c of this.niveau.checkpoints) {
      if (e.x >= c.x && c.x > e.checkpoint.x) e.checkpoint = { x: c.x, y: c.y + 10 };
    }
  }

  majBombes(t) {
    const dt = TICK_MS / 1000;
    for (const b of this.bombes) {
      b.vy -= GRAVITE * dt;
      b.x += b.vx * dt;
      b.y += b.vy * dt;
      if (b.y < 0) { b.y = 0; b.vy = 0; b.vx *= 0.7; }
      if (t < b.explosionA) continue;
      this.effets.push({ id: ++this.uid, type: 'explosion', x: b.x, y: b.y, at: t });
      for (const j of this.joueurs) {
        const s = this.etats[j.id];
        if (s.mort || s.arrive) continue;
        if (Math.hypot(s.x - b.x, s.y - b.y) > BOMBE_RAYON) continue;
        // Une bombe repousse fort, elle ne tue pas : le sabotage gêne, il
        // n'élimine pas — sinon la victoire deviendrait impossible à rattraper.
        const sens = s.x >= b.x ? 1 : -1;
        s.vx += sens * 380;
        s.vy += 320;
      }
      b.explosee = true;
    }
    this.bombes = this.bombes.filter((b) => !b.explosee);
  }

  /** Mort, TOUJOURS avec sa cause : le joueur doit comprendre pourquoi. */
  tuer(id, cause, t) {
    const e = this.etats[id];
    if (e.mort || e.arrive) return;
    if (e.bouclier) {
      // Le bouclier consomme le piège et laisse continuer la course.
      e.bouclier = false;
      e.vy = 260;
      e.vx = -140;
      this.effets.push({ id: ++this.uid, type: 'bouclier', x: e.x, y: e.y, at: t });
      this.dire(`🛡️ ${this.pseudoDe(id)} encaisse avec son bouclier.`);
      return;
    }
    e.mort = true;
    e.causeMort = cause;
    e.respawnA = t + RESPAWN_MS;
    e.vx = 0; e.vy = 0;
    const j = this.joueurs.find((x) => x.id === id);
    if (j) j.morts += 1;
    this.effets.push({ id: ++this.uid, type: 'mort', x: e.x, y: e.y, at: t });
  }

  finirManche() {
    if (this.phase !== 'course') return;
    // Points : dégressifs selon l'ordre d'arrivée.
    for (const a of this.arrivees) {
      const j = this.joueurs.find((x) => x.id === a.id);
      if (!j) continue;
      j.points += Math.max(1, this.joueurs.length - (a.rang - 1));
      if (a.rang === 1) j.manchesGagnees += 1;
      if (j.meilleurRang === null || a.rang < j.meilleurRang) j.meilleurRang = a.rang;
    }
    this.phase = 'fin-manche';
    this.finManche = this.now() + FIN_MANCHE_MS;
    const premier = this.arrivees[0];
    this.dire(premier ? `🥇 ${this.pseudoDe(premier.id)} remporte la manche !` : '💀 Personne n\'a terminé.');
  }

  suiteManche() {
    if (this.manche >= this.manchesTotal) {
      this.phase = 'fin';
      const meilleur = this.classement()[0];
      this.vainqueur = meilleur ? { id: meilleur.id, pseudo: meilleur.pseudo, points: meilleur.points } : null;
      this.dire(this.vainqueur ? `👑 ${this.vainqueur.pseudo} remporte Devil Level !` : 'Partie terminée.');
    } else this.demarrerManche();
  }

  /* ------------------------- vues ------------------------- */

  classement() {
    return [...this.joueurs]
      .map((j) => ({ id: j.id, pseudo: j.pseudo, points: j.points, manches: j.manchesGagnees, morts: j.morts }))
      .sort((a, b) => (b.points - a.points) || (b.manches - a.manches) || (a.morts - b.morts));
  }

  /**
   * Vue transmise aux clients. Tout est public — c'est une course, on voit
   * ses adversaires. On n'envoie que ce qui bouge : le TRACÉ du niveau est
   * envoyé une seule fois (`niveauVersion`), pas à chaque battement.
   */
  vuePour(id) {
    const t = this.now();
    const base = {
      phase: this.phase,
      manche: this.manche,
      manchesTotal: this.manchesTotal,
      t,
      decompte: this.phase === 'decompte' ? Math.max(0, this.finDecompte - t) : 0,
      classement: this.classement(),
      journal: this.journal.slice(-8),
      vainqueur: this.vainqueur,
      evenement: this.evenement ? { type: this.evenement.type, nom: this.evenement.nom } : null,
      annonce: this.annonce ? { type: this.annonce.type, dans: Math.max(0, this.annonce.a - t) } : null,
      niveauGraine: this.graine ?? null,
      theme: this.niveau?.theme ?? null,
    };
    if (this.phase === 'attente' || !this.niveau) return base;

    base.joueurs = this.joueurs.map((j) => {
      const e = this.etats[j.id];
      return {
        id: j.id, pseudo: j.pseudo,
        x: Math.round(e.x), y: Math.round(e.y),
        regard: e.regard, auSol: e.auSol,
        mort: e.mort, arrive: e.arrive, rang: e.rang,
        dash: t < e.dash.finit,
        bouclier: e.bouclier,
        ghost: t < e.ghost,
        gele: t < e.gelJusqua,
        bonus: e.bonus,
      };
    });
    base.pieges = this.niveau.pieges.map((p) => ({ id: p.id, type: p.type, ...this.posePiege(p, t), tombee: this.estTombee(p, t) }));
    base.mobiles = this.niveau.mobiles.map((m) => ({ id: m.id, ...this.poseMobile(m, t) }));
    base.bonusAuSol = this.niveau.bonus.filter((b) => !b.pris).map((b) => ({ id: b.id, type: b.type, x: b.x, y: b.y }));
    base.bombes = this.bombes.map((b) => ({ id: b.id, x: Math.round(b.x), y: Math.round(b.y), dans: Math.max(0, b.explosionA - t) }));
    base.effets = this.effets;

    const moi = this.etats[id];
    if (moi) {
      base.moi = {
        id,
        mort: moi.mort, causeMort: moi.causeMort,
        respawnDans: moi.mort ? Math.max(0, moi.respawnA - t) : 0,
        dashPret: t >= moi.dash.pret,
        dashRatio: t >= moi.dash.pret ? 1 : 1 - (moi.dash.pret - t) / (DASH_MS + DASH_RECHARGE_MS),
        bonus: moi.bonus,
        bouclier: moi.bouclier,
        doubleSaut: t < moi.doubleSaut,
        ghost: t < moi.ghost,
        vitesse: t < moi.vitesse,
        gele: t < moi.gelJusqua,
        x: Math.round(moi.x), y: Math.round(moi.y),
        arrive: moi.arrive, rang: moi.rang,
        progression: borne(moi.x / this.niveau.longueurTotale, 0, 1),
      };
    }
    return base;
  }

  /** Tracé du niveau : envoyé une seule fois par manche. */
  traceNiveau() {
    if (!this.niveau) return null;
    const n = this.niveau;
    return {
      graine: n.graine, theme: n.theme, longueurTotale: n.longueurTotale,
      sols: n.sols, checkpoints: n.checkpoints, sortie: n.sortie,
      pieges: n.pieges.map((p) => ({ id: p.id, type: p.type, x: p.x, y: p.y, l: p.l, h: p.h })),
    };
  }

  resume() {
    const c = this.classement();
    return {
      summary: this.vainqueur
        ? `👑 ${this.vainqueur.pseudo} remporte Devil Level (${this.vainqueur.points} pts) !`
        : 'Partie terminée.',
      scores: Object.fromEntries(c.map((j) => [j.pseudo, j.points])),
      winnerId: this.vainqueur?.id ?? null,
    };
  }
}
