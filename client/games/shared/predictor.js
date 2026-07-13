/**
 * PRÉDICTION LOCALE — pour que l'invité ne subisse plus l'aller-retour réseau.
 *
 * Le problème : un invité appuie sur une touche, et son personnage ne bouge qu'au
 * retour de la vue du Host — aller + traitement + prochaine diffusion, soit 150 à
 * 250 ms. Ce n'est pas un bug, c'est de la latence ; mais ça se ressent exactement
 * comme un lag.
 *
 * La solution : l'invité applique son propre déplacement IMMÉDIATEMENT, avec le
 * MÊME code que le moteur (`stepCollision`, importé du moteur — aucune copie, donc
 * aucune divergence possible), puis se recale sur la vérité du Host dès qu'elle
 * arrive.
 *
 * Le Host reste seul autoritaire : le client ne fait que DEVINER ce qu'on va lui
 * dire. S'il triche dans sa prédiction, il ne triche que pour lui-même — sa
 * position réelle reste celle que le Host calcule, et les autres ne voient que
 * celle-là. L'anti-triche est intacte.
 *
 * La réconciliation, en trois temps :
 *   1. On horodate chaque position prédite (historique glissant d'une seconde).
 *   2. Une vue arrive : elle porte l'instant `t` du Host où elle a été calculée.
 *      On traduit cet instant en temps local (voir `Horloge` ci-dessous), et on
 *      compare la position du Host à ce que NOUS avions prédit AU MÊME INSTANT.
 *   3. L'écart est résorbé en douceur (~150 ms) au lieu d'être appliqué d'un coup :
 *      sans ça, la moindre imprécision produirait un tremblement permanent.
 *
 * Comparer à la position prédite *du même instant* (et non à la position actuelle)
 * est le point clé : sinon on se recalerait en permanence sur une position vieille
 * d'un aller-retour, et le personnage serait tiré en arrière à chaque vue — le
 * fameux « élastique ».
 */

const HISTORIQUE_MS = 1200;
const CORRECTION_MS = 200;      // durée visée pour résorber un écart
const CORRECTION_MAX = 2.2;     // cases/seconde : vitesse MAXIMALE de la correction
const SAUT = 1.6;               // au-delà : ce n'est pas une imprécision, c'est un événement (capture, conduit, éjection)

/**
 * PAS DE SIMULATION — le même que le moteur (50 ms), et ce n'est pas un détail.
 *
 * Prédire à 40 images/s ce que le Host calcule par pas de 50 ms, c'est intégrer le
 * mouvement autrement que lui : deux trajectoires qui partent du même point finissent
 * ailleurs, surtout en rasant un mur (l'un glisse, l'autre bloque). En avançant par
 * pas identiques, la prédiction devient le MÊME calcul, et non une approximation.
 * L'écran, lui, interpole le reste — sans jamais le réinjecter dans la simulation.
 */
const PAS = 50;

/**
 * LE POINT DÉLICAT : à quel instant de MON horloge correspond la position que le
 * Host m'envoie ?
 *
 * Naïvement, on comparerait sa position à celle qu'on occupe maintenant. C'est
 * faux deux fois : les horloges des deux machines n'ont aucune raison d'être à
 * l'heure (l'écart peut atteindre plusieurs secondes), et surtout **le Host
 * applique mes commandes avec un retard réseau**. Comparer au mauvais instant, et
 * la correction se met à combattre le mouvement : c'est l'effet élastique.
 *
 * L'astuce : un horodatage CROISÉ. J'estampille chaque commande avec mon horloge
 * (`ts`) ; le Host note quand il l'a reçue avec la sienne (`inputAt`). Chaque vue
 * me renvoie les deux. L'écart `inputAt - ts` vaut (décalage des horloges + temps
 * de transit). Le transit ne peut qu'ajouter du retard : le PLUS PETIT écart
 * observé est donc celui qui a le moins souffert du réseau.
 *
 * Ce minimum me donne directement la conversion cherchée : une position calculée
 * par le Host à son instant H reflète mes commandes jusqu'à mon instant
 * `H - offsetMontant`. C'est exactement le point de mon historique auquel je dois
 * me comparer — ni maintenant, ni l'instant d'émission de la vue.
 */
class Horloge {
  constructor() {
    this.montant = null;   // décalage des horloges + retard réseau minimal (aller)
    this.secours = null;   // si aucune commande n'a encore été estampillée
  }

  /** @param {number} tHost horloge du Host à l'émission de la vue */
  echantillon(tHost, inputTs, inputAt) {
    if (Number.isFinite(inputTs) && Number.isFinite(inputAt)) {
      const brut = inputAt - inputTs;
      if (this.montant === null || brut < this.montant) this.montant = brut;
      else this.montant += (brut - this.montant) * 0.01;   // dérive douce des horloges
    }
    const bas = tHost - Date.now();   // (décalage − retard retour) : le plus grand est le meilleur
    if (this.secours === null || bas > this.secours) this.secours = bas;
  }

  /** Instant LOCAL dont mes commandes sont reflétées dans une vue calculée à `tHost`. */
  versLocal(tHost) {
    if (this.montant !== null) return tHost - this.montant;
    if (this.secours !== null) return tHost - this.secours;
    return Date.now();
  }
}

/**
 * L'ANCRE EXACTE — et le décalage des horloges s'annule tout seul.
 *
 * Le Host me renvoie deux choses : `inputTs`, l'estampille (MON horloge) de la
 * dernière commande qu'il a reçue de moi, et `inputAt`, l'instant (SON horloge) où
 * il l'a reçue. La vue, elle, est calculée à son instant `tHost`.
 *
 * Il a donc intégré cette commande pendant (tHost − inputAt). Moi, je l'applique
 * depuis inputTs. Sa position reflète donc exactement l'état de MA timeline à :
 *
 *     inputTs + (tHost − inputAt)
 *
 * Les deux horloges apparaissent une fois chacune, en soustraction : leur décalage
 * disparaît de l'équation. Pas d'estimation, pas de filtre, pas d'hypothèse de
 * symétrie du réseau — et la gigue est traitée commande par commande, puisque
 * chacune porte son propre horodatage.
 */
function ancre(tHost, vrai, horloge) {
  if (Number.isFinite(vrai.inputTs) && Number.isFinite(vrai.inputAt)) {
    return vrai.inputTs + (tHost - vrai.inputAt);
  }
  return horloge.versLocal(tHost);   // aucune commande envoyée encore : on retombe sur l'estimation
}

export class Predictor {
  /**
   * @param {(x:number,y:number)=>boolean} isWall les murs, du point de vue du client
   * @param {Function} step la fonction de déplacement DU MOTEUR (pas une copie)
   */
  constructor(step) {
    this.step = step;
    this.horloge = new Horloge();
    this.pos = null;        // position prédite
    this.hist = [];         // [{ t, x, y }] en temps local
    this.err = { x: 0, y: 0 };
    this.restant = 0;       // ms de correction encore à résorber
  }

  /** Repart de zéro (nouvelle manche, réapparition, changement de phase). */
  reset(x, y) {
    this.pos = { x, y };      // position simulée (pas de 50 ms, comme le moteur)
    this.vue = { x, y };      // position affichée (interpolée dans le pas courant)
    this.hist = [];
    this.err = { x: 0, y: 0 };
    this.restant = 0;
    this.acc = 0;             // temps accumulé depuis le dernier pas
    this.tSim = Date.now();   // horloge de la simulation locale
  }

  /**
   * Une vue autoritaire arrive : on REJOUE.
   *
   * On ne se contente pas de corriger un écart — on repart de la position VRAIE du
   * Host, et l'on rejoue par-dessus toutes les commandes que l'on a données depuis.
   *
   * C'est ce qui distingue une prédiction qui tient d'une prédiction qui dérive.
   * Corriger un écart, c'est rattraper une trajectoire qu'on a calculée seul dans
   * son coin : à chaque coin de mur, le Host (qui reçoit mes commandes en retard) a
   * glissé le long du mur pendant que moi j'avais déjà tourné — et l'écart s'installe.
   * En rejouant, la base est TOUJOURS celle du Host : les murs, les captures, les
   * blocages sont les siens. Ne subsiste que l'avance volontaire — celle qui rend
   * le jeu réactif.
   *
   * @param {number} tHost instant du Host où la position a été calculée
   * @param {{x:number,y:number,inputTs:?number,inputAt:?number}} vrai position autoritaire
   * @param {...*} extra passé à la fonction de déplacement du moteur (murs, etc.)
   */
  reconcilier(tHost, vrai, ...extra) {
    this.horloge.echantillon(tHost, vrai.inputTs, vrai.inputAt);
    if (!this.pos) { this.reset(vrai.x, vrai.y); return; }

    // Instant de MON historique que cette position reflète — exactement.
    const depuis = ancre(tHost, vrai, this.horloge);

    // Rejeu : la vérité du Host, puis mes commandes par-dessus.
    const cible = { x: vrai.x, y: vrai.y };
    const dt = PAS / 1000;   // les mêmes pas que le moteur : le rejeu doit être son sosie
    for (const h of this.hist) {
      if (h.t <= depuis) continue;
      if (h.sp > 0 && (h.dx !== 0 || h.dy !== 0)) {
        this.step(cible, h.dx * h.sp * dt, h.dy * h.sp * dt, ...(h.extra?.length ? h.extra : extra));
      }
    }

    const ex = cible.x - this.pos.x;
    const ey = cible.y - this.pos.y;

    // Écart énorme : ce n'est plus une imprécision, c'est un événement décidé par le
    // Host (capture, conduit, éjection, nouvelle manche). On ne discute pas : on obéit.
    if (Math.hypot(ex, ey) > SAUT) { this.reset(cible.x, cible.y); return; }

    // Sinon : l'écart résiduel est minime, on le fond dans le mouvement.
    this.err = { x: ex, y: ey };
    this.restant = CORRECTION_MS;
  }

  /**
   * Un pas de prédiction locale.
   * @param {number} dtMs temps écoulé depuis le dernier appel
   * @param {{dx:number,dy:number}} input l'entrée du joueur, à l'instant présent
   * @param {number} speed la vitesse effective, telle que le Host la calcule
   * @param {...*} extra passé tel quel à la fonction de déplacement du moteur
   */
  avancer(dtMs, input, speed, ...extra) {
    if (!this.pos) return null;

    // Un onglet qui revient au premier plan ne rattrape pas dix secondes d'un coup.
    this.acc = Math.min(this.acc + dtMs, 300);
    if (Math.abs(Date.now() - this.tSim) > 1000) this.tSim = Date.now();   // horloge qui a sauté

    const dt = PAS / 1000;
    while (this.acc >= PAS) {
      this.acc -= PAS;
      this.tSim += PAS;

      if (speed > 0 && (input.dx !== 0 || input.dy !== 0)) {
        this.step(this.pos, input.dx * speed * dt, input.dy * speed * dt, ...extra);
      }

      // Résorption de l'écart — plafonnée en VITESSE.
      //
      // Sans plafond, un écart se rattrape d'un coup et tire le personnage en arrière
      // alors que le joueur avance : c'est l'effet élastique, et c'est exactement ce
      // qui fait dire « ça bug » alors que la position est juste. Plafonnée, la
      // correction est toujours plus lente que la marche : elle se fond dans le
      // mouvement au lieu de le contredire.
      const reste = Math.hypot(this.err.x, this.err.y);
      if (reste > 0.0005) {
        const voulu = Math.min(1, PAS / Math.max(1, this.restant));
        const plafond = (CORRECTION_MAX * dt) / reste;
        const k = Math.min(voulu, plafond, 1);
        this.pos.x += this.err.x * k;
        this.pos.y += this.err.y * k;
        this.err.x -= this.err.x * k;
        this.err.y -= this.err.y * k;
        this.restant = Math.max(0, this.restant - PAS);
      } else {
        this.err = { x: 0, y: 0 };
        this.restant = 0;
      }

      // L'historique retient la COMMANDE : c'est elle qu'on rejouera par-dessus la
      // vérité du Host, avec exactement le même pas de temps.
      this.hist.push({ t: this.tSim, dx: input.dx, dy: input.dy, sp: speed, extra });
    }
    while (this.hist.length > 2 && this.hist[0].t < this.tSim - HISTORIQUE_MS) this.hist.shift();

    // À l'écran : le pas en cours, interpolé — jamais réinjecté dans la simulation.
    const vue = { x: this.pos.x, y: this.pos.y };
    const reste = this.acc / 1000;
    if (reste > 0 && speed > 0 && (input.dx !== 0 || input.dy !== 0)) {
      this.step(vue, input.dx * speed * reste, input.dy * speed * reste, ...extra);
    }
    this.vue = vue;
    return vue;
  }
}
