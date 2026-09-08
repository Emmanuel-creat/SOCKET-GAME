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

import { TUILE, lireCarte, CARTE_SECOURS } from './cartes.js';

export { TUILE };

/* ============================== réglages ============================== */

export const TICK_MS = 33;                 // ~30 Hz de simulation

// Monde : unités de jeu. Le sol de référence est à y = 0, l'axe y monte.

export const JOUEUR_L = 26;
export const JOUEUR_H = 38;

// Déplacement — volontairement nerveux et précis.
// Sensibilité globale abaissée de 15 % (vitesse et réactivité) sur retour
// utilisateur : le perso avait tendance à échapper au contrôle fin. On tire
// aussi le frein sol au même facteur pour garder les temps d'arrêt cohérents.
const VITESSE = 221;                       // unités/seconde (260 × 0.85)
const ACCEL = 2210;                        // 2600 × 0.85
const FREIN_SOL = 2040;                    // 2400 × 0.85
const FREIN_AIR = 900;
export const SAUT = 560;
const GRAVITE = 1700;
const GRAVITE_CHUTE = 2300;                // on retombe plus vite qu'on ne monte
const COYOTE_MS = 110;                     // saut toléré juste après avoir quitté le sol
const TAMPON_SAUT_MS = 120;                // saut mémorisé juste avant d'atterrir

export const DASH_VITESSE = 620;
export const DASH_MS = 180;
export const DASH_RECHARGE_MS = 10000;

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
  prairie: {
    nom: 'Prairie',
    cielHaut: '#5fb8f7', cielBas: '#d2feff',
    collineLoin: '#8ee89a', collinePres: '#6efe8b',
    herbe: '#adff9c', herbeOmbre: '#7dc934', terre: '#a8f75d', terreJoint: '#7cc836',
    socle: '#45533c', accent: '#3aa02f',
  },
  crepuscule: {
    nom: 'Crépuscule',
    cielHaut: '#ff9a5c', cielBas: '#ffe2b0',
    collineLoin: '#c98a63', collinePres: '#a86544',
    herbe: '#e0a86a', herbeOmbre: '#a86f3c', terre: '#c98f52', terreJoint: '#96602f',
    socle: '#4a3320', accent: '#ff7a3d',
  },
  glacier: {
    nom: 'Glacier',
    cielHaut: '#7cc4ee', cielBas: '#e8f8ff',
    collineLoin: '#bfe6f5', collinePres: '#9ad3ec',
    herbe: '#e6f7ff', herbeOmbre: '#8fc4dd', terre: '#c4e4f2', terreJoint: '#8ab8cf',
    socle: '#33566b', accent: '#4aa8d8',
  },
  volcan: {
    nom: 'Volcan',
    cielHaut: '#7a2d2a', cielBas: '#ffb27a',
    collineLoin: '#8a4436', collinePres: '#6b2f26',
    herbe: '#c9552f', herbeOmbre: '#8a3620', terre: '#a34328', terreJoint: '#732d19',
    socle: '#3a1a12', accent: '#ff6a2e',
  },
  nuit: {
    nom: 'Nuit',
    cielHaut: '#1b2450', cielBas: '#5a6ba8',
    collineLoin: '#3a4676', collinePres: '#2b3358',
    herbe: '#6a7ec2', herbeOmbre: '#414f88', terre: '#4c5a94', terreJoint: '#35406b',
    socle: '#161c38', accent: '#8fa4e8',
  },
  bonbon: {
    nom: 'Bonbon',
    cielHaut: '#ff9ecb', cielBas: '#ffe7f4',
    collineLoin: '#ffc2de', collinePres: '#ffa3cd',
    herbe: '#ffd0e6', herbeOmbre: '#e884b4', terre: '#ffbcd9', terreJoint: '#e07aa8',
    socle: '#7a3358', accent: '#ff6fa5',
  },
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

/* ============================== lecture du niveau ============================== */

/*
 * Le niveau ne se génère plus : il se LIT dans une matrice de symboles écrite à
 * la main (voir cartes.js). L'avantage est net — un niveau composé est bien
 * plus intéressant qu'un tirage aléatoire, et il est reproductible à
 * l'identique, ce qui sert la mémorisation voulue par le cahier des charges.
 *
 * Le repère du monde reste le même que la version précédente : l'axe y MONTE,
 * l'origine est en bas à gauche. Comme une matrice se lit de haut en bas, on
 * retourne la coordonnée verticale à la conversion.
 */

/** Coin bas-gauche, en unités de monde, de la tuile de grille (lx, ly). */
export function tuileVersMonde(lx, ly, hauteurGrille) {
  return { x: lx * TUILE, y: (hauteurGrille - 1 - ly) * TUILE };
}

/** Boîte occupée par une tuile : les `demi` ne remplissent que le bas. */
export function boiteTuile(t, hauteurGrille) {
  const { x, y } = tuileVersMonde(t.x, t.y, hauteurGrille);
  const h = t.def.demi ? TUILE / 2 : TUILE;
  return { x, y, l: TUILE, h };
}

/**
 * Prépare un niveau lu pour la simulation : on y ajoute l'état mutable de
 * chaque tuile (cassée, tombée, armée…) que le moteur fera évoluer.
 */
export function preparerNiveau(brut) {
  const H = brut.hauteur;
  const tuiles = brut.tuiles.map((t, i) => {
    const b = boiteTuile(t, H);
    return {
      id: `t${i}`, ch: t.ch, def: t.def,
      lx: t.x, ly: t.y,
      x: b.x, y: b.y, l: b.l, h: b.h,
      x0: b.x, y0: b.y,          // position d'origine (les mobiles oscillent autour)
      etat: null,                 // instant de déclenchement, selon le type
      cassee: false, revelee: false,
    };
  });
  const conv = (c) => {
    const m = tuileVersMonde(c.lx, c.ly, H);
    return { ...c, x: m.x, y: m.y };
  };
  return {
    ...brut,
    tuiles,
    depart: conv(brut.depart),
    sortie: { ...conv(brut.sortie), l: TUILE, h: TUILE },
    checkpoints: brut.checkpoints.map(conv).sort((a, b) => a.x - b.x),
    bonus: brut.bonus.map((b) => ({ ...conv(b), pris: false, reapparition: 0 })),
    hauteurGrille: H,
  };
}


export class DevilLevelEngine {
  /**
   * @param {{id:string,pseudo:string}[]} joueurs 2 à 16.
   * @param {{rng?:Function, now?:Function, manches?:number, theme?:string}} options
   */
  constructor(joueurs, options = {}) {
    if (!Array.isArray(joueurs) || joueurs.length < 1 || joueurs.length > 16) {
      throw new Error('Devil Level se joue de 1 à 16 joueurs.');
    }
    this.rng = options.rng || Math.random;
    this.horloge = options.now || (() => Date.now());
    this.manchesTotal = borne(Number(options.manches) || MANCHES_DEFAUT, 1, 9);
    // Mode solo : le filet anti-blocage à 100 s n'a pas de sens quand personne
    // n'attend derrière — un joueur qui explore ou apprend une carte doit
    // pouvoir prendre son temps sans se faire couper.
    this.solo = !!options.solo;
    // Interrupteurs à disposition de l'hôte : couper les bonus (les pastilles
    // ne réapparaissent plus et Maj ne fait rien) ou les événements globaux
    // (darkness, earthquake…) pour une course pure et prévisible.
    this.bonusActifs = options.bonusActifs !== false;
    this.evenementsActifs = options.evenementsActifs !== false;
    /*
     * Les cartes jouées. Le Host peut passer ses propres matrices ; à défaut on
     * prend celles fournies. Une carte invalide est refusée DÈS LA CRÉATION,
     * avec un message lisible — plutôt qu'en pleine partie.
     */
    // Les cartes viennent du catalogue, lu par l'interface : le moteur reste
    // pur (ni réseau, ni fichiers). Sans carte fournie, on retombe sur celle de
    // secours plutôt que de refuser de démarrer.
    const demandees = Array.isArray(options.cartes) && options.cartes.length
      ? options.cartes
      : [CARTE_SECOURS];
    for (const c of demandees) {
      const v = lireCarte(c);
      if (!v.ok) throw new Error(`Carte « ${c?.nom ?? '?'} » : ${v.erreur}`);
    }
    this.cartes = demandees;

    this.joueurs = joueurs.map((j) => ({
      id: j.id, pseudo: j.pseudo ?? '?',
      points: 0, manchesGagnees: 0, morts: 0, meilleurRang: null,
      meilleurTemps: null,
      // Somme des temps de finish, manche après manche. Un temps null
      // (élimination, timeout) n'est PAS compté : on garde une somme
      // représentative des courses effectivement terminées.
      tempsTotal: 0,
      manchesTerminees: 0,
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
    // Les cartes s'enchaînent dans l'ordre de la liste : ce que le Host a
    // choisi est ce qui se joue, sans tirage au sort.
    const carte = this.cartes[(this.manche - 1) % this.cartes.length];
    const lu = lireCarte(carte);
    if (!lu.ok) { this.phase = 'erreur'; this.erreur = `${carte.nom ?? 'carte'} : ${lu.erreur}`; return; }
    this.niveau = preparerNiveau(lu.niveau);

    this.debutManche = this.now();
    this.finDecompte = this.debutManche + DECOMPTE_MS;
    this.arrivees = [];
    this.effets = [];
    this.bombes = [];
    this.evenement = null;
    this.annonce = null;
    this.premierA = null;
    this.prochainEvenement = this.debutManche + DECOMPTE_MS + 18000;

    const dep = this.niveau.depart;
    this.etats = {};
    this.joueurs.forEach((j, i) => {
      this.etats[j.id] = {
        x: dep.x + (i % 4) * 8, y: dep.y + 2 + Math.floor(i / 4) * 4,
        vx: 0, vy: 0,
        auSol: false, dernierSol: 0, tamponSaut: 0,
        regard: 1, sautsRestants: 1,
        dash: { finit: 0, pret: 0 },
        bonus: null,
        bouclier: false, ghost: 0, vitesse: 0, doubleSaut: 0,
        gelJusqua: 0, invulnerableJusqua: 0,
        glace: false, collant: false, surEchelle: false,
        graviteInverse: false, graviteInverseFin: 0,
        mort: false, respawnA: 0, causeMort: null,
        checkpoint: { x: dep.x, y: dep.y + 2 }, checkpointId: null,
        arrive: false, rang: null, temps: null,
        entree: { gauche: false, droite: false, saut: false, dash: false, pouvoir: false },
      };
    });
    this.phase = 'decompte';
    this.dire(`🔥 Manche ${this.manche}/${this.manchesTotal} — ${this.niveau.nom}`);
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

  utiliserBonus(id) {
    const e = this.etatDe(id);
    if (!e || !e.bonus || e.mort || this.phase !== 'course') return { ok: false };
    const t = this.now();
    const type = e.bonus;
    if (type === 'gel') {
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
        if (Math.hypot(s.x - e.x, s.y - e.y) > TORNADE_RAYON) continue;
        s.vx += (s.x >= e.x ? 1 : -1) * TORNADE_FORCE;
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
    } else return { ok: false, error: 'Ce bonus agit tout seul.' };
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
    if (this.phase === 'fin-manche') { if (t >= this.finManche) this.suiteManche(); return; }
    if (this.phase !== 'course') return;

    const dt = TICK_MS / 1000;
    this.majEvenement(t);
    this.majTuiles(t);
    for (const j of this.joueurs) this.majJoueur(j.id, dt, t);
    this.majBombes(t);
    this.effets = this.effets.filter((f) => t - f.at < 800);

    if (this.joueurs.every((j) => this.etats[j.id].arrive)) { this.finirManche(); return; }

    // Plafond de manche retiré (solo comme multi) : les runs peuvent durer
    // aussi longtemps qu'il le faut. `apresPremier` gère toujours la fin
    // "un premier est arrivé, on n'attend que les autres" en multi.
    const tropLong = false;
    const apresPremier = this.premierA && (t - this.premierA > DELAI_APRES_PREMIER_MS);
    if (tropLong || apresPremier) {
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

  majEvenement(t) {
    // Interrupteur du menu : aucune annonce, aucun événement, ni cette
    // manche ni les suivantes. On ne bloque pas les événements EN COURS —
    // il n'y en a pas si le drapeau était faux dès le départ.
    if (!this.evenementsActifs) return;
    if (this.evenement && t >= this.evenement.finit) {
      this.dire(`✅ ${this.evenement.nom} terminé.`);
      this.evenement = null;
      this.prochainEvenement = t + 20000;
      return;
    }
    if (this.evenement || t < this.prochainEvenement) return;
    if (!this.annonce) {
      this.annonce = { type: ['darkness', 'earthquake', 'chaos', 'speed', 'reverse'][Math.floor(this.rng() * 5)], a: t + 2500 };
      const noms = { darkness: '🌑 Darkness', earthquake: '🌎 Earthquake', chaos: '💀 Chaos', speed: '⏩ Speed Mode', reverse: '🔄 Reverse' };
      this.dire(`⚠️ ${noms[this.annonce.type]} dans 3 secondes…`);
      return;
    }
    if (t >= this.annonce.a) {
      const noms = { darkness: 'Darkness', earthquake: 'Earthquake', chaos: 'Chaos', speed: 'Speed Mode', reverse: 'Reverse' };
      this.evenement = { type: this.annonce.type, nom: noms[this.annonce.type], finit: t + 12000 };
      this.annonce = null;
      this.dire(`🔥 ${this.evenement.nom} !`);
    }
  }

  facteurTemps() { return this.evenement?.type === 'speed' ? 1.7 : 1; }

  /**
   * Fait vivre les tuiles animées : mobiles, scies, lasers, écraseurs, blocs
   * temporisés, plateformes fuyantes, blocs armés. Tout est calculé À PARTIR DE
   * L'HORLOGE, sans état accumulé — ainsi deux clients qui affichent la même
   * scène au même instant voient exactement la même chose.
   */
  majTuiles(t) {
    const vt = this.facteurTemps();
    for (const tu of this.niveau.tuiles) {
      const d = tu.def;

      if (d.mobile) {
        // Delta CE TICK : sert au drag horizontal des passagers dans atterrir().
        // Sans ça, `atterrir` calculait delta = (tu.x - dernierX_dernier_atterrissage),
        // qui pouvait valoir des dizaines de pixels si le joueur avait quitté puis
        // rejoint la plateforme entretemps — et le personnage se faisait éjecter.
        const oldX = tu.x;
        const amplitude = (d.amplitude ?? 2.2) * TUILE;
        const periode = 2600;
        const dep = Math.sin((t / periode) * Math.PI * 2 * vt + (tu.lx + tu.ly) * 0.7) * amplitude;
        tu.x = tu.x0 + (d.mobile === 'x' ? dep : 0);
        tu.y = tu.y0 + (d.mobile === 'y' ? dep : 0);
        tu.deltaX = tu.x - oldX;
      }

      if (d.cyclique) {
        // Laser : allumé une fraction du cycle, précédé d'un avertissement.
        const cycle = 2600;
        const phase = (t + (tu.lx + tu.ly) * 190) % cycle;
        tu.actif = this.evenement?.type === 'chaos' || phase < 520;
        tu.imminent = !tu.actif && phase > cycle - 520;
      } else if (d.ecraseur) {
        const cycle = 3000;
        const phase = ((t + tu.lx * 260) % cycle) / cycle;
        const desc = phase < 0.3 ? phase / 0.3 : Math.max(0, 1 - (phase - 0.3) / 0.7);
        tu.y = tu.y0 - desc * TUILE * 4;
        tu.actif = true;
      } else if (d.temporise) {
        // Bloc qui apparaît et disparaît : solide seulement la moitié du temps.
        const phase = ((t + tu.lx * 400) % 2400) / 2400;
        tu.actif = phase < 0.55;
      } else if (d.blocArme) {
        // Ne tombe qu'une fois armé par une plaque, puis se réarme.
        if (tu.etat) {
          const age = t - tu.etat;
          if (age > 3200) { tu.etat = null; tu.y = tu.y0; tu.actif = false; }
          else if (age > 900) {
            tu.actif = true;
            tu.y = tu.y0 - Math.min(1, (age - 900) / 450) * TUILE * 4;
          } else tu.actif = false;
        } else { tu.actif = false; tu.y = tu.y0; }
      } else if (d.fuyante || d.fauxSol) {
        // Cède après avoir été foulée, puis revient.
        if (tu.etat) {
          const age = t - tu.etat;
          const delai = d.fauxSol ? 380 : 700;
          tu.tombee = age > delai && age < delai + 2400;
          if (age >= delai + 2400) { tu.etat = null; tu.tombee = false; }
        } else tu.tombee = false;
      } else if (d.cassable) {
        if (tu.cassee && t - tu.cassee > 4000) tu.cassee = false;
      } else tu.actif = true;
    }
  }

  /** Une tuile bloque-t-elle en ce moment ? */
  tuileSolide(tu) {
    const d = tu.def;
    if (d.invisible && !tu.revelee) return false;
    if (d.cassable && tu.cassee) return false;
    if (d.temporise && !tu.actif) return false;
    if ((d.fuyante || d.fauxSol) && tu.tombee) return false;
    if (d.blocArme) return false;      // il traverse, il ne porte pas
    return !!(d.solide || d.plateforme);
  }

  majJoueur(id, dt, t) {
    const e = this.etats[id];
    if (e.arrive) return;

    if (e.mort) {
      if (t >= e.respawnA) {
        e.mort = false;
        e.x = e.checkpoint.x; e.y = e.checkpoint.y + 6;
        e.vx = 0; e.vy = 0;
        e.bouclier = false; e.ghost = 0; e.graviteInverse = false; e.graviteInverseFin = 0;
        e.invulnerableJusqua = t + 800;
      }
      return;
    }
    const gele = t < e.gelJusqua;
    const dash = t < e.dash.finit;
    // La gravité inversée s'auto-annule 10 s après le dernier bloc `g`. On la
    // recalcule à chaque tick pour que le retour à la normale soit indolore
    // (pas de saut brusque à la 10ᵉ seconde, la gravité reprend simplement
    // le dessus au prochain calcul).
    if (e.graviteInverse && t >= e.graviteInverseFin) e.graviteInverse = false;

    // Blocs invisibles : révélation PRÉVENTIVE (avant la physique) dans une
    // boîte élargie autour du joueur. Sans ça, la révélation ne se déclenche
    // qu'au premier chevauchement — la tuile devient solide, et au tick
    // suivant `resoudreAxe` éjecte le joueur (encastré de plusieurs pixels
    // à cause de la vitesse). En révélant un peu à l'avance, la tuile est
    // solide DÈS ce tick et le contact est résolu par le rebond normal.
    this.revelerInvisibles(e, t);

    // Horizontal.
    const vmax = VITESSE * (t < e.vitesse ? VITESSE_BOOST : 1) * (e.collant ? 0.55 : 1);
    let dir = 0;
    if (!gele) {
      if (e.entree.gauche) dir -= 1;
      if (e.entree.droite) dir += 1;
    }
    if (dir !== 0) e.regard = dir;
    if (dash) e.vx = e.regard * DASH_VITESSE;
    else if (dir !== 0) {
      // Sur la glace, on accélère et on freine bien plus mollement.
      e.vx += dir * ACCEL * dt * (e.glace ? 0.28 : 1);
      e.vx = borne(e.vx, -vmax, vmax);
    } else {
      const frein = (e.auSol ? FREIN_SOL : FREIN_AIR) * dt * (e.glace ? 0.12 : 1);
      e.vx = Math.abs(e.vx) <= frein ? 0 : e.vx - Math.sign(e.vx) * frein;
    }

    // Saut, avec les deux tolérances qui rendent les enchaînements justes.
    const sens = e.graviteInverse ? -1 : 1;
    const auSolRecent = t - e.dernierSol < COYOTE_MS;
    if (!gele && t < e.tamponSaut) {
      if (e.surEchelle) { e.vy = SAUT * 0.8 * sens; e.tamponSaut = 0; }
      else if (e.auSol || auSolRecent) { e.vy = SAUT * sens; e.auSol = false; e.tamponSaut = 0; e.dernierSol = 0; }
      else if (t < e.doubleSaut && e.sautsRestants > 0) {
        e.vy = SAUT * 0.92 * sens; e.sautsRestants -= 1; e.tamponSaut = 0;
        this.effets.push({ id: ++this.uid, type: 'double-saut', x: e.x, y: e.y, at: t });
      }
    }

    // Gravité — inversée si le joueur a franchi un bloc `g`.
    if (e.surEchelle) {
      // Sur une échelle : on monte QUAND on maintient saut ; sinon on
      // s'immobilise sur le barreau. Aucune chute libre — le joueur reste
      // exactement où il est tant qu'il ne relance pas le saut.
      e.vy = e.entree.saut ? 190 : 0;
    } else if (!dash) {
      const g = (e.vy * sens > 0 ? GRAVITE : GRAVITE_CHUTE) * sens;
      e.vy -= g * dt;
    }
    e.vy = borne(e.vy, -900, 900);

    // Déplacement puis résolution des collisions, axe par axe : c'est ce qui
    // évite de rester coincé dans un angle entre deux tuiles.
    e.x += e.vx * dt;
    this.resoudreAxe(e, 'x', t);
    // On mémorise la position AVANT le déplacement vertical : le résolveur
    // Y en a besoin pour savoir si le joueur ARRIVE d'au-dessus d'une
    // plateforme (auquel cas il doit atterrir, quelle que soit sa vitesse).
    e.yAvantY = e.y;
    e.y += e.vy * dt;
    this.resoudreAxe(e, 'y', t);

    if (e.auSol) { e.dernierSol = t; e.sautsRestants = 1; }

    this.effetsDeTuiles(id, e, t);
    this.ramasserBonus(id, e, t);
    this.majCheckpoint(e);

    // Sortie du monde.
    if (e.y < -TUILE * 3 || e.y > this.niveau.hauteurGrille * TUILE + TUILE * 6) this.tuer(id, 'chute', t);
    if (e.x < -TUILE) { e.x = -TUILE; e.vx = 0; }

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

  /**
   * Repousse le joueur hors des tuiles solides sur UN axe.
   *
   * Les plateformes (`=`) ne bloquent que par le dessus : on ne les heurte pas
   * en sautant depuis dessous, sinon on resterait collé sous chaque étage.
   */
  resoudreAxe(e, axe, t) {
    if (axe === 'y') e.auSol = false;
    for (const tu of this.niveau.tuiles) {
      if (!this.tuileSolide(tu)) continue;
      if (!chevauche(e.x, e.y, JOUEUR_L, JOUEUR_H, tu.x, tu.y, tu.l, tu.h)) continue;

      const platOnly = tu.def.plateforme && !tu.def.solide;
      if (axe === 'x') {
        if (platOnly) continue;                       // on traverse latéralement
        if (e.vx > 0) e.x = tu.x - JOUEUR_L;
        else if (e.vx < 0) e.x = tu.x + tu.l;
        else e.x = e.x < tu.x ? tu.x - JOUEUR_L : tu.x + tu.l;
        e.vx = 0;
      } else {
        // Résolution Y : on distingue « chute » (déplacement DANS le sens
        // de la gravité) et « saut » (déplacement CONTRE elle). Sous grav
        // inversée, ces deux sens sont symétriques en coordonnées monde,
        // d'où le calcul des deux faces réceptrices possibles.
        const inv = e.graviteInverse;
        const enChute = inv ? e.vy >= 0 : e.vy <= 0;
        const dessus = tu.y + tu.h;
        const sousTuile = tu.y - JOUEUR_H;
        const yAtterrissage = inv ? sousTuile : dessus;
        const yPlafond = inv ? dessus : sousTuile;
        if (enChute) {
          // Grip plateforme : sans ça, à haute vitesse de chute (~30 px/tick
          // après un trampoline) le joueur traverserait les `=` en un tick.
          // La règle : au tick précédent, le joueur ne chevauchait PAS déjà.
          if (platOnly) {
            const yAvant = e.yAvantY ?? e.y;
            const dehors = inv ? yAvant <= yAtterrissage : yAvant >= yAtterrissage;
            if (!dehors) continue;
          }
          e.y = yAtterrissage;
          this.atterrir(e, tu, t);
        } else {
          if (platOnly) continue;
          e.y = yPlafond;
          e.vy = 0;
        }
      }
    }
  }

  /** Contact des pieds avec une tuile : c'est ici que les blocs spéciaux agissent. */
  atterrir(e, tu, t) {
    const d = tu.def;
    e.auSol = true;
    e.glace = !!d.glace;
    e.collant = !!d.collant;

    if (d.rebond) {
      // Trampoline : on repart plus haut qu'un saut normal.
      e.vy = SAUT * 1.55 * (e.graviteInverse ? -1 : 1);
      e.auSol = false;
      this.effets.push({ id: ++this.uid, type: 'rebond', x: e.x, y: e.y, at: t });
      return;
    }
    if (d.mou) { e.vy = 0; e.amorti = t; return; }     // amortit la chute
    e.vy = 0;
    if ((d.fuyante || d.fauxSol) && !tu.etat) tu.etat = t;
    if (d.cassable && !tu.cassee) {
      tu.cassee = t;
      this.effets.push({ id: ++this.uid, type: 'casse', x: tu.x + TUILE / 2, y: tu.y, at: t });
    }
    // Une plateforme mobile entraîne ce qui se tient dessus, avec le déplacement
    // effectif de CE tick (majTuiles écrit `deltaX`) — jamais un cumul depuis le
    // dernier atterrissage, qui téléporterait le joueur au retour sur la plateforme.
    if (d.mobile === 'x') e.x += tu.deltaX ?? 0;
  }

  /**
   * Passe préliminaire : révèle les blocs invisibles à portée AVANT que la
   * physique ne s'applique. Marge de 12 px pour couvrir une vitesse normale
   * (~16 px/tick en saut, ~30 en chute libre après trampoline). Le rare cas
   * où le joueur pénètre malgré tout est rattrapé par `effetsDeTuiles`.
   */
  revelerInvisibles(e, t) {
    const M = 12;
    for (const tu of this.niveau.tuiles) {
      const d = tu.def;
      if (!d.invisible || tu.revelee) continue;
      if (chevauche(e.x, e.y, JOUEUR_L, JOUEUR_H, tu.x - M, tu.y - M, tu.l + 2 * M, tu.h + 2 * M)) {
        tu.revelee = t;
      }
    }
  }

  /**
   * Tuiles NON solides traversées par le joueur : dangers, plaques,
   * téléporteurs, gravité, échelles, blocs invisibles à révéler.
   */
  effetsDeTuiles(id, e, t) {
    const immunise = t < e.ghost || t < (e.invulnerableJusqua ?? 0);
    e.surEchelle = false;
    for (const tu of this.niveau.tuiles) {
      const d = tu.def;
      if (!chevauche(e.x, e.y, JOUEUR_L, JOUEUR_H, tu.x, tu.y, tu.l, tu.h)) continue;

      if (d.invisible && !tu.revelee) { tu.revelee = t; continue; }
      if (d.echelle) { e.surEchelle = true; continue; }

      if (d.plaque && !tu.etat) {
        // Sabotage : arme TOUS les blocs armés de la colonne suivante.
        tu.etat = t;
        for (const bloc of this.niveau.tuiles) {
          if (bloc.def.blocArme && !bloc.etat && Math.abs(bloc.lx - tu.lx) < 6) bloc.etat = t;
        }
        this.dire(`⚙️ ${this.pseudoDe(id)} déclenche un mécanisme…`);
        continue;
      }
      if (d.gravite && !immunise) {
        if (t - (e.derniereGravite ?? 0) > 800) {
          // La gravité s'inverse pour 10 s ; toucher un autre bloc `g`
          // relance le timer sans re-flipper (sinon on repartirait à
          // l'endroit sans le vouloir).
          e.graviteInverse = true;
          e.graviteInverseFin = t + 10000;
          e.derniereGravite = t;
          this.effets.push({ id: ++this.uid, type: 'gravite', x: e.x, y: e.y, at: t });
        }
        continue;
      }
      if (d.teleporteur) {
        const cible = this.niveau.teleporteurs.get(`${tu.lx},${tu.ly}`);
        if (cible && t - (e.dernierTp ?? 0) > 900) {
          const m = tuileVersMonde(cible.lx, cible.ly, this.niveau.hauteurGrille);
          e.x = m.x; e.y = m.y + 4;
          e.dernierTp = t;
          this.effets.push({ id: ++this.uid, type: 'teleport', x: e.x, y: e.y, at: t });
        }
        continue;
      }
      if (d.explosif && !tu.cassee) {
        tu.cassee = t;
        e.vy += 420; e.vx += e.regard * -260;
        this.effets.push({ id: ++this.uid, type: 'explosion', x: tu.x + TUILE / 2, y: tu.y, at: t });
        continue;
      }
      if (d.mortel && !immunise) {
        if (d.cyclique && !tu.actif) continue;         // laser éteint
        if (d.blocArme && !tu.actif) continue;
        this.tuer(id, d.mortel, t);
        return;
      }
    }
  }

  ramasserBonus(id, e, t) {
    if (!this.bonusActifs) return;
    for (const b of this.niveau.bonus) {
      if (b.pris && t < b.reapparition) continue;
      if (b.pris) b.pris = false;
      if (!chevauche(e.x, e.y, JOUEUR_L, JOUEUR_H, b.x + 8, b.y + 8, TUILE - 16, TUILE - 16)) continue;
      b.pris = true;
      b.reapparition = t + 9000;
      const type = b.type === 'aleatoire' ? BONUS_IDS[Math.floor(this.rng() * BONUS_IDS.length)] : b.type;
      this.appliquerBonus(id, e, type, t);
      this.effets.push({ id: ++this.uid, type: 'bonus', x: b.x + TUILE / 2, y: b.y + TUILE / 2, at: t });
    }
  }

  appliquerBonus(id, e, type, t) {
    const d = BONUS[type].duree;
    if (type === 'dash') { e.dash.pret = 0; e.vitesse = t + d; }
    else if (type === 'doubleSaut') { e.doubleSaut = t + d; e.sautsRestants = 1; }
    else if (type === 'bouclier') e.bouclier = true;
    else if (type === 'ghost') e.ghost = t + d;
    else if (type === 'vitesse') e.vitesse = t + d;
    else e.bonus = type;
    this.dire(`${BONUS[type].icone} ${this.pseudoDe(id)} ramasse ${BONUS[type].nom}.`);
  }

  majCheckpoint(e) {
    // Règle : c'est le DERNIER checkpoint traversé qui fait foi, même s'il est
    // situé plus en arrière que le précédent. Utile pour les cartes en boucle
    // ou en labyrinthe où revenir en arrière est une progression valide.
    for (const c of this.niveau.checkpoints) {
      if (!chevauche(e.x, e.y, JOUEUR_L, JOUEUR_H, c.x, c.y, TUILE, TUILE)) continue;
      if (e.checkpointId === c.id) continue;
      e.checkpoint = { x: c.x, y: c.y };
      e.checkpointId = c.id;
      this.effets.push({ id: ++this.uid, type: 'bonus', x: c.x + TUILE / 2, y: c.y, at: this.now() });
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
      // Meilleur temps : le plus bas des chronos de finish sur toutes les
      // manches. Un temps null (fin sur timeout) n'entre pas en compte.
      if (a.temps != null && (j.meilleurTemps == null || a.temps < j.meilleurTemps)) {
        j.meilleurTemps = a.temps;
      }
      if (a.temps != null) {
        j.tempsTotal += a.temps;
        j.manchesTerminees += 1;
      }
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
      .map((j) => ({
        id: j.id, pseudo: j.pseudo, points: j.points,
        manches: j.manchesGagnees, morts: j.morts,
        meilleurTemps: j.meilleurTemps,
        tempsTotal: j.tempsTotal,
        manchesTerminees: j.manchesTerminees,
      }))
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
      // Chrono de manche : temps écoulé depuis le « GO ! », en millisecondes.
      // Utile en solo où l'on veut la vitesse ; nul avant que la course démarre.
      chrono: this.phase === 'course' ? Math.max(0, t - this.finDecompte) : 0,
      classement: this.classement(),
      journal: this.journal.slice(-8),
      vainqueur: this.vainqueur,
      evenement: this.evenement ? { type: this.evenement.type, nom: this.evenement.nom } : null,
      annonce: this.annonce ? { type: this.annonce.type, dans: Math.max(0, this.annonce.a - t) } : null,
      carte: this.niveau?.nom ?? null,
      theme: this.niveau?.theme ?? null,
      erreur: this.erreur ?? null,
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
    // On n'envoie que ce qui BOUGE. Le tracé fixe (la matrice) a déjà été
    // transmis une fois par manche : le renvoyer trente fois par seconde
    // gaspillerait la bande passante pour un décor immobile.
    base.tuiles = this.niveau.tuiles
      .filter((tu) => tu.def.mobile || tu.def.cyclique || tu.def.ecraseur || tu.def.temporise
        || tu.def.blocArme || tu.def.fuyante || tu.def.fauxSol || tu.def.cassable
        || tu.def.invisible || tu.def.plaque)
      .map((tu) => ({
        id: tu.id, ch: tu.ch,
        x: Math.round(tu.x), y: Math.round(tu.y),
        actif: tu.actif !== false, imminent: !!tu.imminent,
        tombee: !!tu.tombee, cassee: !!tu.cassee, revelee: !!tu.revelee,
        armee: !!tu.etat,
      }));
    base.bonusAuSol = this.bonusActifs
      ? this.niveau.bonus.filter((b) => !b.pris)
          .map((b) => ({ id: b.id, type: b.type, x: b.x + TUILE / 2, y: b.y + TUILE / 2 }))
      : [];
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
        // Temps de finish, en ms — chronométré à la sortie, fixé pour toujours.
        temps: moi.arrive ? (moi.temps ?? null) : null,
        // Cumul (déjà valorisé côté joueur en fin de manche) pour l'écran final.
        tempsTotal: this.joueurs.find((j) => j.id === id)?.tempsTotal ?? 0,
        manchesTerminees: this.joueurs.find((j) => j.id === id)?.manchesTerminees ?? 0,
        progression: borne(moi.x / this.niveau.longueurTotale, 0, 1),
      };
    }
    return base;
  }

  /** Tracé du niveau : la matrice elle-même, envoyée une seule fois par manche. */
  traceNiveau() {
    if (!this.niveau) return null;
    const n = this.niveau;
    return {
      nom: n.nom, theme: n.theme, tuile: TUILE,
      grille: n.grille, largeur: n.largeur, hauteur: n.hauteur,
      longueurTotale: n.longueurTotale,
      depart: n.depart, sortie: n.sortie,
      checkpoints: n.checkpoints.map((c) => ({ id: c.id, x: c.x, y: c.y })),
    };
  }

  resume() {
    const c = this.classement();
    return {
      summary: this.vainqueur
        ? `👑 ${this.vainqueur.pseudo} remporte Devil Level (${this.vainqueur.points} pts) !`
        : 'Partie terminée.',
      scores: Object.fromEntries(c.map((j) => [j.pseudo, j.points])),
      classement: c,
      vainqueur: this.vainqueur,
      winnerId: this.vainqueur?.id ?? null,
    };
  }
}
