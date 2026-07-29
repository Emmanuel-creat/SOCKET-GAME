/**
 * Spring Clash — moteur pur (aucun accès au DOM, testable en Node).
 *
 * Un cube, un ressort, rien d'autre. Pas de saut, pas d'arme : toute la
 * profondeur vient du TIMING de la détente et de la lecture de l'adversaire.
 *
 * Déroulé d'une impulsion :
 *   Espace → compression 0,1 s (on est ralenti, on s'engage) → détente : on est
 *   projeté dans la direction visée, on repousse très fort ce qu'on touche, puis
 *   2 s de recharge avant de pouvoir recommencer.
 *
 * Le contre est la figure reine : déclencher SON ressort juste avant l'impact
 * renvoie l'agresseur bien plus loin qu'il ne nous pousse — c'est pour ça que
 * `BONUS_CONTRE` existe et que la fenêtre de contre est généreuse (0,25 s).
 *
 * Autorité : le Host fait tourner ce moteur et diffuse l'état. Aucune donnée
 * cachée ici (tout le monde voit tout le monde), donc pas d'enjeu anti-fuite —
 * contrairement à La Traque ou Among Us.
 */

/* ------------------------------ réglages ------------------------------ */

export const TICK_MS = 33;                 // ~30 Hz de simulation
export const ARENE_RAYON = 15;             // rayon de départ, en unités de jeu
export const CUBE_RAYON = 0.55;

// Déplacement.
// Déplacement volontairement posé : on avance lentement, et c'est le ressort
// qui donne toute la vitesse. Réduit de 25 % (5,2 → 3,9) pour accentuer ce
// contraste — la marche sert à se placer, le ressort à agir.
const VITESSE_MARCHE = 3.9;                // unités/seconde
// Décélération quand on ne pousse plus. Doublée (6,5 → 13) pour diviser la
// glisse par deux : on freine deux fois plus vite, donc on dérape deux fois
// moins loin. On agit ici plutôt que sur chaque sol, ce qui préserve leurs
// différences relatives (la glace reste la plus traître, le sable le plus
// freinant) tout en rendant l'ensemble bien plus maniable.
const FROTTEMENT = 13;
const VITESSE_MAX = 26;

// Ressort.
export const COMPRESSION_MS = 100;         // temps de compression avant la détente
export const RECHARGE_MS = 2000;
const IMPULSION = 17.5;                    // vitesse ajoutée à la détente
const COMPRESSION_LENTEUR = 0.35;          // on bouge mal pendant qu'on comprime
export const FENETRE_CONTRE_MS = 250;      // délai pour contrer une charge adverse
const BONUS_CONTRE = 1.85;                 // ce que rapporte un contre réussi
const POUSSEE_RESSORT = 15;                // force transmise à la cible
const POUSSEE_SIMPLE = 4.5;                // simple contact, sans ressort
const REBOND_MUTUEL = 1.35;                // deux ressorts qui se percutent

// Sols. `impulsion` multiplie la détente, `friction` la glisse, `rebond` le
// gain après un choc. La lave élimine.
export const SOLS = Object.freeze({
  herbe:      { nom: 'Herbe',      emoji: '🟩', impulsion: 1,    friction: 1,    rebond: 1,    mortel: false },
  // Friction relevée de 0,12 à 0,2 : le doublement du frottement général n'avait
  // presque aucune prise sur une valeur aussi basse (−27 % seulement, contre
  // −50 % ailleurs). Avec 0,2, la glace glisse bien deux fois moins qu'avant —
  // et reste de loin le sol le plus traître, ce qui est son rôle.
  glace:      { nom: 'Glace',      emoji: '🟦', impulsion: 1,    friction: 0.2,  rebond: 1,    mortel: false },
  sable:      { nom: 'Sable',      emoji: '🟨', impulsion: 0.62, friction: 1.8,  rebond: 1,    mortel: false },
  caoutchouc: { nom: 'Caoutchouc', emoji: '🟪', impulsion: 1,    friction: 1,    rebond: 1.55, mortel: false },
  metal:      { nom: 'Métal',      emoji: '⬛', impulsion: 1.3,  friction: 0.75, rebond: 1,    mortel: false },
  lave:       { nom: 'Lave',       emoji: '🟥', impulsion: 1,    friction: 1,    rebond: 1,    mortel: true },
});
export const SOLS_IDS = Object.freeze(Object.keys(SOLS));

// Événements : toutes les 30 s, l'arène se resserre pour forcer la rencontre.
export const EVENEMENT_MS = 30_000;
const RETRECISSEMENT = 0.9;                // −10 % à chaque fois
const RAYON_MINI = 4.5;
export const LAVE_MS = 1200;               // temps toléré dans la lave

// Manches.
export const MANCHES_DEFAUT = 3;
const PAUSE_FIN_MANCHE_MS = 4000;

export const TUILE = 2.5;                  // côté d'une case de sol

function borne(v, min, max) { return Math.max(min, Math.min(max, v)); }
function dist(ax, ay, bx, by) { return Math.hypot(ax - bx, ay - by); }

/* ------------------------------ moteur ------------------------------ */

export class SpringClashEngine {
  /**
   * @param {{id:string,pseudo:string}[]} joueurs 2 à 8.
   * @param {{rng?:Function, now?:Function, manches?:number}} options
   */
  constructor(joueurs, options = {}) {
    if (!Array.isArray(joueurs) || joueurs.length < 2 || joueurs.length > 8) {
      throw new Error('Spring Clash se joue de 2 à 8 joueurs.');
    }
    this.rng = options.rng || Math.random;
    this.horloge = options.now || (() => Date.now());
    this.manchesTotal = borne(Number(options.manches) || MANCHES_DEFAUT, 1, 9);

    this.joueurs = joueurs.map((j) => ({
      id: j.id,
      pseudo: j.pseudo ?? '?',
      manchesGagnees: 0,
      ejections: 0,
    }));
    this.manche = 0;
    this.phase = 'attente';     // attente | manche | fin-manche | fin
    this.journal = [];
    this.effets = [];           // chocs à afficher (éphémères)
    this.uid = 0;
    this.vainqueur = null;
  }

  dire(texte) { this.journal.push(texte); if (this.journal.length > 40) this.journal.shift(); }
  pseudoDe(id) { return this.joueurs.find((j) => j.id === id)?.pseudo ?? '?'; }
  now() { return this.horloge(); }

  /* --------------------------- mise en place --------------------------- */

  demarrer() {
    if (this.phase !== 'attente') return { ok: false, error: 'Partie déjà lancée.' };
    this.demarrerManche();
    return { ok: true };
  }

  demarrerManche() {
    this.manche += 1;
    this.rayon = ARENE_RAYON;
    this.debutManche = this.now();
    this.prochainEvenement = this.debutManche + EVENEMENT_MS;
    this.compteurEvenements = 0;
    this.effets = [];
    this.construireSols();

    // Départ en cercle, à égale distance : personne n'est avantagé.
    const n = this.joueurs.length;
    this.etats = {};
    this.joueurs.forEach((j, i) => {
      const a = (i / n) * Math.PI * 2;
      this.etats[j.id] = {
        x: Math.cos(a) * this.rayon * 0.62,
        y: Math.sin(a) * this.rayon * 0.62,
        vx: 0, vy: 0,
        angle: a + Math.PI,        // face au centre
        vivant: true,
        entree: { dx: 0, dy: 0 },
        // Ressort
        compressionFin: 0,         // > now : en train de comprimer
        detenteA: -1e9,            // instant de la dernière détente
        prochainRessort: 0,        // fin de recharge
        // Divers
        laveDepuis: null,
        rang: null,
      };
    });
    this.phase = 'manche';
    this.dire(`🥊 Manche ${this.manche}/${this.manchesTotal} — que le meilleur ressort gagne !`);
  }

  /** Damier de sols : de l'herbe en majorité, quelques zones à effet. */
  construireSols() {
    const cases = Math.ceil((ARENE_RAYON * 2) / TUILE) + 2;
    this.grilleTaille = cases;
    this.sols = [];
    for (let ly = 0; ly < cases; ly += 1) {
      const ligne = [];
      for (let lx = 0; lx < cases; lx += 1) {
        const t = this.rng();
        let sol = 'herbe';
        if (t > 0.93) sol = 'lave';
        else if (t > 0.85) sol = 'glace';
        else if (t > 0.78) sol = 'sable';
        else if (t > 0.71) sol = 'caoutchouc';
        else if (t > 0.64) sol = 'metal';
        ligne.push(sol);
      }
      this.sols.push(ligne);
    }
    // Le centre reste neutre : on ne meurt pas au spawn par malchance.
    const c = Math.floor(cases / 2);
    for (let dy = -1; dy <= 1; dy += 1) {
      for (let dx = -1; dx <= 1; dx += 1) this.sols[c + dy][c + dx] = 'herbe';
    }
  }

  /** Sol sous une position du monde. */
  solA(x, y) {
    const c = Math.floor(this.grilleTaille / 2);
    const lx = borne(c + Math.round(x / TUILE), 0, this.grilleTaille - 1);
    const ly = borne(c + Math.round(y / TUILE), 0, this.grilleTaille - 1);
    return this.sols[ly][lx];
  }

  /* --------------------------- actions --------------------------- */

  etatDe(id) { return this.etats?.[id] ?? null; }

  /** Direction de déplacement + orientation. Le ressort part là où l'on regarde. */
  entrer(id, { dx = 0, dy = 0, angle = null } = {}) {
    const e = this.etatDe(id);
    if (!e || !e.vivant || this.phase !== 'manche') return { ok: false };
    const n = Math.hypot(dx, dy);
    e.entree = n > 1 ? { dx: dx / n, dy: dy / n } : { dx, dy };
    if (Number.isFinite(angle)) e.angle = angle;
    else if (n > 0.05) e.angle = Math.atan2(dy, dx);   // on regarde où l'on va
    return { ok: true };
  }

  /** Espace : lance la compression, la détente suit toute seule. */
  ressort(id) {
    const e = this.etatDe(id);
    if (!e || !e.vivant || this.phase !== 'manche') return { ok: false, error: 'Pas maintenant.' };
    const t = this.now();
    if (t < e.prochainRessort) return { ok: false, error: 'Ressort en recharge…' };
    if (t < e.compressionFin) return { ok: false, error: 'Déjà en compression.' };
    e.compressionFin = t + COMPRESSION_MS;
    e.prochainRessort = t + COMPRESSION_MS + RECHARGE_MS;
    return { ok: true };
  }

  /** État du ressort, pour la jauge et le halo « prêt ». */
  statutRessort(e, t = this.now()) {
    if (t < e.compressionFin) return { etat: 'compression', ratio: 1 - (e.compressionFin - t) / COMPRESSION_MS };
    if (t < e.prochainRessort) {
      const total = RECHARGE_MS;
      return { etat: 'recharge', ratio: 1 - (e.prochainRessort - t) / total };
    }
    return { etat: 'pret', ratio: 1 };
  }

  /** Vrai pendant la fenêtre où l'impulsion est encore « chaude ». */
  enImpulsion(e, t = this.now()) { return t - e.detenteA < FENETRE_CONTRE_MS; }

  /* --------------------------- simulation --------------------------- */

  tick() {
    if (this.phase !== 'manche') return;
    const t = this.now();
    const dt = TICK_MS / 1000;

    this.detentes(t);
    this.deplacer(dt, t);
    this.collisions(t);
    this.sortiesEtLave(t, dt);
    this.evenements(t);
    this.effets = this.effets.filter((f) => t - f.at < 700);

    const vivants = this.joueurs.filter((j) => this.etats[j.id].vivant);
    if (vivants.length <= 1) this.finirManche(vivants[0]?.id ?? null);
  }

  /** Fin de compression → détente : c'est ici que le cube part. */
  detentes(t) {
    for (const j of this.joueurs) {
      const e = this.etats[j.id];
      if (!e.vivant || !e.compressionFin || t < e.compressionFin) continue;
      e.compressionFin = 0;
      e.detenteA = t;
      const sol = SOLS[this.solA(e.x, e.y)];
      const force = IMPULSION * sol.impulsion;
      e.vx += Math.cos(e.angle) * force;
      e.vy += Math.sin(e.angle) * force;
      this.effets.push({ id: ++this.uid, type: 'detente', x: e.x, y: e.y, at: t });
    }
  }

  deplacer(dt, t) {
    for (const j of this.joueurs) {
      const e = this.etats[j.id];
      if (!e.vivant) continue;
      const sol = SOLS[this.solA(e.x, e.y)];

      // Pendant la compression on se déplace mal : s'engager a un coût.
      const enCompression = t < e.compressionFin;
      const marche = VITESSE_MARCHE * (enCompression ? COMPRESSION_LENTEUR : 1);
      e.vx += e.entree.dx * marche * dt * 8;
      e.vy += e.entree.dy * marche * dt * 8;

      // Frottement, très faible sur la glace : d'où la glissade incontrôlable.
      const f = FROTTEMENT * sol.friction * dt;
      const v = Math.hypot(e.vx, e.vy);
      if (v > 0) {
        const reste = Math.max(0, 1 - f / Math.max(v, 0.001) * (v > marche ? 0.6 : 1));
        e.vx *= reste; e.vy *= reste;
      }
      const v2 = Math.hypot(e.vx, e.vy);
      if (v2 > VITESSE_MAX) { e.vx = e.vx / v2 * VITESSE_MAX; e.vy = e.vy / v2 * VITESSE_MAX; }

      e.x += e.vx * dt;
      e.y += e.vy * dt;
    }
  }

  /**
   * Chocs entre cubes. Trois cas, du plus spectaculaire au plus banal :
   *  - les DEUX viennent de détendre → rebond mutuel, les deux repartent ;
   *  - UN seul est en impulsion → il propulse l'autre… sauf si l'autre contre ;
   *  - simple contact → petite poussée, pour éviter que les cubes se traversent.
   */
  collisions(t) {
    const ids = this.joueurs.map((j) => j.id).filter((id) => this.etats[id].vivant);
    for (let i = 0; i < ids.length; i += 1) {
      for (let k = i + 1; k < ids.length; k += 1) {
        const a = this.etats[ids[i]]; const b = this.etats[ids[k]];
        const d = dist(a.x, a.y, b.x, b.y);
        const mini = CUBE_RAYON * 2;
        if (d >= mini || d === 0) continue;

        // Axe du choc, de a vers b.
        const nx = (b.x - a.x) / d; const ny = (b.y - a.y) / d;
        // On les décolle, sinon ils restent collés et se repoussent en boucle.
        const chevauche = (mini - d) / 2;
        a.x -= nx * chevauche; a.y -= ny * chevauche;
        b.x += nx * chevauche; b.y += ny * chevauche;

        const aImpulse = this.enImpulsion(a, t);
        const bImpulse = this.enImpulsion(b, t);
        const solA = SOLS[this.solA(a.x, a.y)];
        const solB = SOLS[this.solA(b.x, b.y)];

        if (aImpulse && bImpulse) {
          // Les deux ressorts se percutent : BOOOOOM.
          const p = POUSSEE_RESSORT * REBOND_MUTUEL;
          a.vx -= nx * p * solA.rebond; a.vy -= ny * p * solA.rebond;
          b.vx += nx * p * solB.rebond; b.vy += ny * p * solB.rebond;
          this.effets.push({ id: ++this.uid, type: 'choc-double', x: (a.x + b.x) / 2, y: (a.y + b.y) / 2, at: t });
          this.dire(`💥 ${this.pseudoDe(ids[i])} et ${this.pseudoDe(ids[k])} se percutent de plein fouet !`);
        } else if (aImpulse || bImpulse) {
          // L'un charge, l'autre encaisse — à moins de contrer.
          const chargeur = aImpulse ? a : b;
          const cible = aImpulse ? b : a;
          const idChargeur = aImpulse ? ids[i] : ids[k];
          const idCible = aImpulse ? ids[k] : ids[i];
          const solCible = aImpulse ? solB : solA;
          const sens = aImpulse ? 1 : -1;

          // Le CONTRE : la cible a comprimé et va détendre dans l'instant.
          const contre = cible.compressionFin > 0 && (cible.compressionFin - t) < FENETRE_CONTRE_MS;
          const force = POUSSEE_RESSORT * (contre ? BONUS_CONTRE : 1) * solCible.rebond;

          if (contre) {
            // Le chargeur repart d'où il vient, bien plus fort.
            chargeur.vx -= nx * sens * force; chargeur.vy -= ny * sens * force;
            this.effets.push({ id: ++this.uid, type: 'contre', x: cible.x, y: cible.y, at: t });
            this.dire(`🛡️ ${this.pseudoDe(idCible)} contre ${this.pseudoDe(idChargeur)} — magnifique !`);
          } else {
            cible.vx += nx * sens * force; cible.vy += ny * sens * force;
            this.effets.push({ id: ++this.uid, type: 'choc', x: cible.x, y: cible.y, at: t });
            cible.dernierPousseur = idChargeur;   // pour attribuer l'éjection
            cible.pousseA = t;
          }
        } else {
          // Contact sans ressort : on se bouscule, sans plus.
          a.vx -= nx * POUSSEE_SIMPLE * 0.5; a.vy -= ny * POUSSEE_SIMPLE * 0.5;
          b.vx += nx * POUSSEE_SIMPLE * 0.5; b.vy += ny * POUSSEE_SIMPLE * 0.5;
        }
      }
    }
  }

  /** Chute hors de l'arène, ou séjour prolongé dans la lave. */
  sortiesEtLave(t, dt) {
    for (const j of this.joueurs) {
      const e = this.etats[j.id];
      if (!e.vivant) continue;

      if (Math.hypot(e.x, e.y) > this.rayon + CUBE_RAYON) {
        this.eliminer(j.id, e.dernierPousseur && t - (e.pousseA ?? 0) < 3000 ? e.dernierPousseur : null, 'chute');
        continue;
      }
      if (SOLS[this.solA(e.x, e.y)].mortel) {
        e.laveDepuis ??= t;
        if (t - e.laveDepuis >= LAVE_MS) this.eliminer(j.id, null, 'lave');
      } else {
        e.laveDepuis = null;
      }
    }
  }

  eliminer(id, parId, cause) {
    const e = this.etats[id];
    if (!e.vivant) return;
    e.vivant = false;
    e.rang = this.joueurs.filter((j) => !this.etats[j.id].vivant).length;
    this.effets.push({ id: ++this.uid, type: 'ejection', x: e.x, y: e.y, at: this.now() });
    if (parId) {
      const auteur = this.joueurs.find((j) => j.id === parId);
      if (auteur) auteur.ejections += 1;
      this.dire(`🚀 ${this.pseudoDe(parId)} éjecte ${this.pseudoDe(id)} !`);
    } else {
      this.dire(cause === 'lave' ? `🔥 ${this.pseudoDe(id)} a fondu dans la lave.` : `🕳️ ${this.pseudoDe(id)} est tombé tout seul.`);
    }
  }

  /** Toutes les 30 s : l'arène rétrécit et le terrain change. */
  evenements(t) {
    if (t < this.prochainEvenement) return;
    this.prochainEvenement = t + EVENEMENT_MS;
    this.compteurEvenements += 1;
    this.rayon = Math.max(RAYON_MINI, this.rayon * RETRECISSEMENT);

    // Une variation de terrain à chaque fois, pour que rien ne soit acquis.
    const variantes = ['glace', 'lave', 'trous'];
    const choix = variantes[Math.floor(this.rng() * variantes.length)];
    const c = Math.floor(this.grilleTaille / 2);
    for (let n = 0; n < 6; n += 1) {
      const lx = borne(c + Math.floor((this.rng() - 0.5) * this.grilleTaille), 0, this.grilleTaille - 1);
      const ly = borne(c + Math.floor((this.rng() - 0.5) * this.grilleTaille), 0, this.grilleTaille - 1);
      if (choix === 'glace') this.sols[ly][lx] = 'glace';
      else if (choix === 'lave') this.sols[ly][lx] = 'lave';
      else this.sols[ly][lx] = this.rng() < 0.5 ? 'sable' : 'metal';
    }
    this.solsVersion = (this.solsVersion ?? 0) + 1;
    const libelle = choix === 'glace' ? '🧊 des plaques de glace apparaissent'
      : choix === 'lave' ? '🌋 la lave gagne du terrain'
        : '🏜️ le terrain se transforme';
    this.dire(`⚠️ L'arène rétrécit — ${libelle} !`);
    this.effets.push({ id: ++this.uid, type: 'evenement', at: t });
  }

  finirManche(idVainqueur) {
    if (this.phase !== 'manche') return;
    if (idVainqueur) {
      const j = this.joueurs.find((x) => x.id === idVainqueur);
      if (j) j.manchesGagnees += 1;
      this.etats[idVainqueur].rang = 0;
      this.dire(`🏆 ${this.pseudoDe(idVainqueur)} remporte la manche ${this.manche} !`);
    } else {
      this.dire('💀 Personne ne survit à cette manche.');
    }
    this.finManche = this.now() + PAUSE_FIN_MANCHE_MS;
    // Le match s'arrête si quelqu'un a gagné assez de manches.
    const meilleur = [...this.joueurs].sort((a, b) => b.manchesGagnees - a.manchesGagnees)[0];
    if (this.manche >= this.manchesTotal || meilleur.manchesGagnees > this.manchesTotal / 2) {
      this.phase = 'fin';
      this.vainqueur = { id: meilleur.id, pseudo: meilleur.pseudo, manches: meilleur.manchesGagnees };
      this.dire(`🎉 ${meilleur.pseudo} remporte Spring Clash !`);
    } else {
      this.phase = 'fin-manche';
    }
  }

  /** Enchaîne la manche suivante quand la pause est écoulée. */
  tickPause() {
    if (this.phase !== 'fin-manche') return;
    if (this.now() >= this.finManche) this.demarrerManche();
  }

  /* --------------------------- vues --------------------------- */

  classement() {
    return [...this.joueurs]
      .map((j) => ({ id: j.id, pseudo: j.pseudo, manches: j.manchesGagnees, ejections: j.ejections }))
      .sort((a, b) => (b.manches - a.manches) || (b.ejections - a.ejections));
  }

  /**
   * Vue envoyée aux clients. Tout est public dans ce jeu : on voit tous les
   * cubes, c'est le principe. Seule la fiche « moi » ajoute l'état du ressort.
   */
  vuePour(id) {
    const t = this.now();
    const base = {
      phase: this.phase,
      manche: this.manche,
      manchesTotal: this.manchesTotal,
      rayon: this.rayon ?? ARENE_RAYON,
      t,
      classement: this.classement(),
      journal: this.journal.slice(-12),
      vainqueur: this.vainqueur,
      prochainEvenementDans: this.prochainEvenement ? Math.max(0, this.prochainEvenement - t) : 0,
    };
    if (this.phase === 'attente') return base;

    base.solsVersion = this.solsVersion ?? 0;
    base.sols = this.sols;
    base.grilleTaille = this.grilleTaille;
    base.effets = this.effets;
    base.cubes = this.joueurs.map((j) => {
      const e = this.etats[j.id];
      const st = this.statutRessort(e, t);
      return {
        id: j.id, pseudo: j.pseudo, vivant: e.vivant,
        x: Math.round(e.x * 100) / 100, y: Math.round(e.y * 100) / 100,
        vx: Math.round(e.vx * 100) / 100, vy: Math.round(e.vy * 100) / 100,
        angle: Math.round(e.angle * 1000) / 1000,
        ressort: st.etat, ressortRatio: Math.round(st.ratio * 100) / 100,
        impulsion: this.enImpulsion(e, t),
      };
    });
    const moi = this.etats[id];
    if (moi) base.moi = { id, ...this.statutRessort(moi, t), vivant: moi.vivant };
    return base;
  }

  resume() {
    const c = this.classement();
    return {
      summary: this.vainqueur
        ? `🎉 ${this.vainqueur.pseudo} remporte Spring Clash (${this.vainqueur.manches} manches) !`
        : 'Partie terminée.',
      scores: Object.fromEntries(c.map((j) => [j.pseudo, j.manches])),
      winnerId: this.vainqueur?.id ?? null,
    };
  }
}
