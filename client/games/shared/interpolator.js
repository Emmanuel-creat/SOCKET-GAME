/**
 * INTERPOLATION DES AUTRES JOUEURS
 *
 * Ma position, je la prédis (predictor.js). Celle des AUTRES, je ne peux que la
 * recevoir — et je la reçois par à-coups : une vue toutes les 100 à 250 ms, avec
 * de la gigue par-dessus. Entre deux vues, il faut bien dessiner quelque chose.
 *
 * L'ancien lissage mélangeait deux horloges : il interpolait « de l'ancienne vue vers
 * la nouvelle » sur une durée FIXE, déclenchée à l'arrivée du paquet. Tant que les
 * paquets arrivent pile à l'heure, ça passe. Dès qu'ils arrivent en avance ou en
 * retard — c'est-à-dire toujours, sur une vraie connexion —, le personnage accélère,
 * se fige, puis saute pour rattraper. C'est ça, le « téléporté ».
 *
 * Ici on fait ce que font les vrais jeux en réseau : on empile les vues avec LEUR
 * horodatage, et on dessine le monde tel qu'il était il y a un court instant —
 * juste assez pour avoir toujours deux vues qui encadrent l'instant demandé. On
 * n'interpole plus « vers » quelque chose : on lit une position à un instant donné.
 *
 * Le prix : on voit les autres avec ~un intervalle et demi de retard. C'est le prix
 * de la fluidité, et tous les jeux le paient. On le garde aussi bas que possible.
 */

export const RETARD_MIN = 90;      // ms — jamais moins : il faut deux vues pour encadrer
export const RETARD_MAX = 420;     // ms — jamais plus : on ne joue pas contre le passé
export const RETARD_FACTEUR = 1.6; // × l'intervalle réel entre deux vues (marge de gigue)
export const EXTRAPOLE_MAX = 120;  // ms — au-delà, on préfère figer que d'inventer
export const TELEPORT = 2.0;       // cases — au-delà, c'est un vrai saut : on ne glisse pas
export const TAMPON_MS = 2000;     // on ne garde pas l'histoire ancienne
export const DECROCHAGE = 700;     // ms — au-delà, on se recale sec plutôt que de ramer

/** Interpole entre deux relevés. */
const entre = (a, b, u) => a + (b - a) * u;

export class Interpolator {
  constructor() {
    this.buf = [];          // [{ t, ents: Map<id, ent> }] — horodatées par le HOST
    this.tRender = null;    // l'instant qu'on dessine, dans l'horloge du Host
    this.intervalle = 200;  // intervalle réel entre deux vues, mesuré
  }

  reset() {
    this.buf.length = 0;
    this.tRender = null;
  }

  /**
   * Une vue arrive. `t` est l'horloge du HOST (déjà présente dans la vue), `ents` la
   * liste des entités visibles. On ne compare JAMAIS t à notre horloge locale : on
   * mesure seulement des durées, ce qui rend le décalage des horloges sans effet.
   */
  pousser(t, ents = []) {
    if (!Number.isFinite(t)) return;
    const dernier = this.buf[this.buf.length - 1];

    // Vue en retard ou dupliquée : elle n'apporte rien, et l'insérer casserait l'ordre.
    if (dernier && t <= dernier.t) return;

    if (dernier) {
      // Moyenne glissante de l'intervalle réel : la cadence du Host varie avec le
      // nombre de joueurs et la phase. On s'y adapte au lieu de la supposer.
      const dt = Math.min(t - dernier.t, 1000);
      this.intervalle = this.intervalle * 0.8 + dt * 0.2;
    }

    const map = new Map();
    for (const e of ents) if (e?.id != null) map.set(e.id, e);
    this.buf.push({ t, ents: map });

    while (this.buf.length > 3 && t - this.buf[0].t > TAMPON_MS) this.buf.shift();
  }

  /** Le retard de lecture qu'on s'impose, adapté à la cadence réelle. */
  retard() {
    return Math.max(RETARD_MIN, Math.min(RETARD_MAX, this.intervalle * RETARD_FACTEUR));
  }

  /**
   * Avance l'horloge de lecture de `dtMs` (temps local écoulé depuis l'image
   * précédente). On ne la fait pas SAUTER vers sa cible : on la dilate de ±10 %,
   * pour que le rattrapage soit invisible. Un saut d'horloge, ça se voit ; une
   * seconde qui dure 1,1 seconde, non.
   */
  avancer(dtMs) {
    const dernier = this.buf[this.buf.length - 1];
    if (!dernier) return;

    // La cible n'est PAS bornée par le début du tampon. On a essayé : au démarrage,
    // la cible reste collée à la première vue pendant que l'horloge de lecture, elle,
    // avance avec le temps réel. Elle prend de l'avance sur les vues reçues, on part
    // en extrapolation, puis on récolte une secousse énorme quand le tampon rattrape.
    // Mieux vaut lire un instant antérieur au tampon : `ou()` rend alors la plus
    // ancienne position connue. C'est figé, oui — le temps de recevoir une deuxième
    // vue, au lancement de la manche, quand personne ne bouge encore. Avec une seule
    // vue en main, AUCUN algorithme ne peut deviner un mouvement.
    const cible = dernier.t - this.retard();

    if (this.tRender == null) { this.tRender = cible; return; }

    const ecart = cible - this.tRender;

    // Décrochage franc (onglet en arrière-plan, coupure réseau) : inutile de ramer
    // pendant dix secondes pour rattraper — on se recale d'un coup.
    if (Math.abs(ecart) > DECROCHAGE) { this.tRender = cible; return; }

    const facteur = 1 + Math.max(-0.1, Math.min(0.1, ecart / 1000));
    this.tRender += Math.max(0, dtMs) * facteur;
  }

  /**
   * Où dessiner cette entité, maintenant ?
   * `ent` est l'entité telle qu'elle apparaît dans la vue COURANTE (elle porte
   * l'id et sert de repli). `isWall` est optionnel : il empêche l'extrapolation
   * de faire entrer un joueur dans un mur.
   */
  ou(ent, isWall = null) {
    const repli = { x: ent.x, y: ent.y };
    if (this.tRender == null || this.buf.length === 0) return repli;

    // Les deux vues qui encadrent l'instant demandé.
    let i = -1;
    for (let k = this.buf.length - 1; k >= 0; k -= 1) {
      if (this.buf[k].t <= this.tRender) { i = k; break; }
    }

    // L'instant demandé précède tout ce qu'on a : on prend la plus ancienne.
    if (i < 0) return this.buf[0].ents.get(ent.id) ?? repli;

    const a = this.buf[i];
    const b = this.buf[i + 1] ?? null;
    const ea = a.ents.get(ent.id);
    const eb = b?.ents.get(ent.id);

    // Elle vient d'apparaître (sortie d'un conduit, entrée dans le cône de lampe) :
    // on la pose là où elle est. La faire GLISSER depuis sa dernière position connue
    // la ferait traverser la carte en diagonale.
    if (!ea) return eb ?? repli;

    // Tampon à sec : la vue suivante n'est pas encore arrivée. On prolonge le
    // mouvement, brièvement, plutôt que de figer net puis sauter.
    if (!eb) return this.extrapoler(i, ea, isWall);

    // Un vrai saut (conduit, téléport) ne s'interpole pas : on ne traverse pas les murs.
    if (Math.hypot(eb.x - ea.x, eb.y - ea.y) > TELEPORT) return { x: eb.x, y: eb.y };

    const span = b.t - a.t;
    const u = span > 0 ? Math.min(1, Math.max(0, (this.tRender - a.t) / span)) : 1;
    return { x: entre(ea.x, eb.x, u), y: entre(ea.y, eb.y, u) };
  }

  /** Prolonge le dernier mouvement connu, plafonné, et jamais dans un mur. */
  extrapoler(i, ea, isWall) {
    const a = this.buf[i];
    const p = this.buf[i - 1];
    const ep = p?.ents.get(ea.id);
    const dtDispo = this.tRender - a.t;

    if (!ep || dtDispo <= 0) return { x: ea.x, y: ea.y };

    const span = a.t - p.t;
    if (span <= 0) return { x: ea.x, y: ea.y };

    // Un saut dans l'historique n'est pas une vitesse : on ne l'extrapole pas.
    if (Math.hypot(ea.x - ep.x, ea.y - ep.y) > TELEPORT) return { x: ea.x, y: ea.y };

    const dt = Math.min(dtDispo, EXTRAPOLE_MAX);
    const vx = (ea.x - ep.x) / span;
    const vy = (ea.y - ep.y) / span;
    const x = ea.x + vx * dt;
    const y = ea.y + vy * dt;

    // Deviner, oui. Faire entrer quelqu'un dans un mur, non.
    if (isWall && isWall(Math.floor(x), Math.floor(y))) return { x: ea.x, y: ea.y };
    return { x, y };
  }
}
