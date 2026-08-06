/**
 * themeNuit.js — thème « visualisation de données », activé par la lune.
 *
 * Deux morceaux :
 *  1. le bouton lune (en haut à droite, aligné sur les titres de vue) qui
 *     bascule la classe `theme-nuit` et mémorise le choix ;
 *  2. le fond animé : un relief en nuage de points, plus des relevés chiffrés
 *     dans les marges — c'est lui qui donne l'identité du thème, le CSS seul
 *     ne pouvait pas le faire.
 *
 * Le canevas est posé hors de la grille de mise en page, en fond, et ne capte
 * aucun clic.
 */

import { bus } from '../core/EventBus.js';

const CLE = 'arcade:theme-nuit';

/* ------------------------------------------------------------------ */
/* Le bouton lune                                                      */
/* ------------------------------------------------------------------ */

/** Lune en noir et blanc : disque clair, croissant creusé, quelques cratères. */
function svgLune(actif) {
  const ns = 'http://www.w3.org/2000/svg';
  const svg = document.createElementNS(ns, 'svg');
  svg.setAttribute('viewBox', '0 0 32 32');
  svg.setAttribute('aria-hidden', 'true');

  const disque = document.createElementNS(ns, 'circle');
  disque.setAttribute('cx', '16'); disque.setAttribute('cy', '16'); disque.setAttribute('r', '12');
  disque.setAttribute('fill', actif ? '#ffffff' : '#d8d8d8');
  svg.append(disque);

  // Le croissant : un second disque de la couleur du fond, décalé.
  const ombre = document.createElementNS(ns, 'circle');
  ombre.setAttribute('cx', '22.5'); ombre.setAttribute('cy', '12.5'); ombre.setAttribute('r', '10.5');
  ombre.setAttribute('fill', actif ? '#000000' : '#12141f');
  svg.append(ombre);

  // Cratères, du côté éclairé seulement.
  for (const [cx, cy, r] of [[11, 19, 2.1], [13.5, 12.5, 1.4], [9, 13.5, 1]]) {
    const c = document.createElementNS(ns, 'circle');
    c.setAttribute('cx', String(cx)); c.setAttribute('cy', String(cy)); c.setAttribute('r', String(r));
    c.setAttribute('fill', actif ? '#c9c9c9' : '#a8a8a8');
    svg.append(c);
  }
  return svg;
}

/* ------------------------------------------------------------------ */
/* Le fond : relief en nuage de points                                 */
/* ------------------------------------------------------------------ */

/**
 * Fond du thème : du noir, et des sources de lumière blanche qui dérivent
 * lentement derrière l'interface.
 *
 * Aucune forme, aucun point : uniquement des halos très diffus et deux ou trois
 * filets lumineux. L'effet visé est « tamisé » — on doit sentir la lumière sans
 * jamais la regarder, et l'interface doit rester parfaitement lisible par
 * dessus. Tout est donc joué en opacités très basses.
 */
class FondNuit {
  constructor() {
    this.canvas = document.createElement('canvas');
    this.canvas.className = 'nuit-fond';
    this.canvas.setAttribute('aria-hidden', 'true');
    this.ctx = this.canvas.getContext('2d');
    this.t = 0;
    this.raf = null;
    this.surRedim = () => this.dimensionner();

    /*
     * Les sources lumineuses. Chacune décrit une ellipse lente autour d'un
     * point d'ancrage : des trajectoires de périodes différentes (et non
     * multiples entre elles) évitent que le fond se répète visiblement.
     */
    this.lumieres = [
      { x: 0.26, y: 0.30, rayon: 0.52, force: 0.30, vitesse: 0.021, phase: 0.0, amplitude: 0.055 },
      { x: 0.74, y: 0.24, rayon: 0.44, force: 0.22, vitesse: 0.014, phase: 2.1, amplitude: 0.045 },
      { x: 0.58, y: 0.78, rayon: 0.60, force: 0.24, vitesse: 0.009, phase: 4.2, amplitude: 0.070 },
      { x: 0.12, y: 0.82, rayon: 0.36, force: 0.16, vitesse: 0.017, phase: 1.3, amplitude: 0.040 },
    ];
  }

  dimensionner() {
    // Le fond n'a aucun détail fin : une résolution réduite suffit largement et
    // divise le coût du dégradé, qui est l'opération la plus lourde ici.
    const dpr = Math.min(window.devicePixelRatio || 1, 1.25);
    this.l = Math.floor(window.innerWidth * dpr);
    this.h = Math.floor(window.innerHeight * dpr);
    this.canvas.width = this.l;
    this.canvas.height = this.h;
    this.canvas.style.width = '100%';
    this.canvas.style.height = '100%';
  }

  monter() {
    document.body.prepend(this.canvas);
    this.dimensionner();
    window.addEventListener('resize', this.surRedim);
    const boucle = () => {
      this.raf = requestAnimationFrame(boucle);
      // 12 images/s : la lumière dérive très lentement, personne ne verra la
      // différence avec 60, et le processeur respire.
      const maintenant = performance.now();
      if (maintenant - (this._dernier ?? 0) < 84) return;
      this._dernier = maintenant;
      this.t += 0.05;
      this.dessiner();
    };
    boucle();
  }

  demonter() {
    if (this.raf) cancelAnimationFrame(this.raf);
    this.raf = null;
    window.removeEventListener('resize', this.surRedim);
    this.canvas.remove();
  }

  dessiner() {
    const g = this.ctx;
    const { l, h } = this;
    g.clearRect(0, 0, l, h);

    // Le canevas est transparent : le noir vient du CSS. On ajoute donc
    // seulement de la lumière, en mode « écran » pour que les halos se
    // superposent sans jamais s'assombrir mutuellement.
    g.globalCompositeOperation = 'lighter';

    const diagonale = Math.hypot(l, h);
    for (const s of this.lumieres) {
      // Dérive elliptique, très lente.
      const cx = (s.x + Math.cos(this.t * s.vitesse + s.phase) * s.amplitude) * l;
      const cy = (s.y + Math.sin(this.t * s.vitesse * 0.8 + s.phase) * s.amplitude * 0.7) * h;
      // La force respire aussi : sans ça, le fond paraît figé même s'il bouge.
      const respiration = 0.82 + 0.18 * Math.sin(this.t * s.vitesse * 2.3 + s.phase);
      const rayon = s.rayon * diagonale * 0.5;
      const force = s.force * respiration;

      const halo = g.createRadialGradient(cx, cy, 0, cx, cy, rayon);
      // Trois paliers : un cœur à peine perceptible, une longue retombée, puis
      // le noir. C'est la longueur de la retombée qui donne l'aspect tamisé.
      halo.addColorStop(0, `rgba(255,255,255,${(force * 0.5).toFixed(4)})`);
      halo.addColorStop(0.3, `rgba(255,255,255,${(force * 0.2).toFixed(4)})`);
      halo.addColorStop(0.65, `rgba(255,255,255,${(force * 0.05).toFixed(4)})`);
      halo.addColorStop(1, 'rgba(255,255,255,0)');
      g.fillStyle = halo;
      g.fillRect(0, 0, l, h);
    }

    this.filets(g, l, h);
    g.globalCompositeOperation = 'source-over';

    // Vignette : les bords retournent au noir profond, la lumière reste au
    // centre de l'écran.
    const vign = g.createRadialGradient(l / 2, h / 2, Math.min(l, h) * 0.35, l / 2, h / 2, diagonale * 0.62);
    vign.addColorStop(0, 'rgba(0,0,0,0)');
    vign.addColorStop(1, 'rgba(0,0,0,0.6)');
    g.fillStyle = vign;
    g.fillRect(0, 0, l, h);
  }

  /**
   * Deux filets de lumière obliques, très pâles, qui traversent l'écran et se
   * décalent lentement : ils donnent la touche futuriste sans meubler l'image.
   */
  filets(g, l, h) {
    const diagonale = Math.hypot(l, h);
    for (let i = 0; i < 2; i += 1) {
      const avance = ((this.t * (0.004 + i * 0.0016) + i * 0.5) % 1.4) - 0.2;
      const x = avance * l;
      const largeur = diagonale * (0.10 + i * 0.05);

      g.save();
      g.translate(x, 0);
      g.rotate(-0.28);                       // légère obliquité
      const bande = g.createLinearGradient(-largeur / 2, 0, largeur / 2, 0);
      bande.addColorStop(0, 'rgba(255,255,255,0)');
      bande.addColorStop(0.5, `rgba(255,255,255,${(0.055 - i * 0.018).toFixed(4)})`);
      bande.addColorStop(1, 'rgba(255,255,255,0)');
      g.fillStyle = bande;
      g.fillRect(-largeur / 2, -h, largeur, h * 3);
      g.restore();
    }
  }
}


/* ------------------------------------------------------------------ */
/* Onde au clic                                                        */
/* ------------------------------------------------------------------ */

/**
 * Pose une onde lumineuse à l'endroit exact du clic. Le CSS seul ne peut pas
 * le faire : il ignore où se trouve le curseur. Un seul écouteur sur le
 * document suffit — inutile d'en attacher un à chaque bouton, d'autant que
 * l'interface en recrée en permanence.
 */
function initOnde() {
  document.addEventListener('pointerdown', (e) => {
    if (!document.documentElement.classList.contains('theme-nuit')) return;
    const cible = e.target?.closest?.('button, .btn, .nav-btn, .game-card');
    if (!cible || cible.classList.contains('lune-btn')) return;

    const boite = cible.getBoundingClientRect();
    // L'onde doit couvrir tout l'élément, même si l'on clique dans un coin :
    // son diamètre est donc calculé depuis le point de clic le plus éloigné.
    const dx = Math.max(e.clientX - boite.left, boite.right - e.clientX);
    const dy = Math.max(e.clientY - boite.top, boite.bottom - e.clientY);
    const taille = Math.hypot(dx, dy) * 2;

    const onde = document.createElement('span');
    onde.className = 'onde';
    onde.style.width = `${taille}px`;
    onde.style.height = `${taille}px`;
    onde.style.left = `${e.clientX - boite.left}px`;
    onde.style.top = `${e.clientY - boite.top}px`;

    // L'élément doit pouvoir contenir l'onde en position absolue.
    const position = getComputedStyle(cible).position;
    if (position === 'static') cible.style.position = 'relative';

    cible.append(onde);
    // On nettoie à la fin de l'animation plutôt qu'après un délai fixe : si le
    // navigateur ralentit, l'onde ne disparaît pas avant d'avoir été vue.
    onde.addEventListener('animationend', () => onde.remove(), { once: true });
  }, { passive: true });
}

/* ------------------------------------------------------------------ */

let fond = null;

function lire() { try { return localStorage.getItem(CLE) === '1'; } catch { return false; } }
function ecrire(actif) { try { localStorage.setItem(CLE, actif ? '1' : '0'); } catch { /* stockage indisponible */ } }

function appliquer(actif, bouton) {
  document.documentElement.classList.toggle('theme-nuit', actif);
  if (bouton) {
    bouton.replaceChildren(svgLune(actif));
    bouton.setAttribute('aria-pressed', actif ? 'true' : 'false');
    bouton.setAttribute('title', actif ? 'Revenir au thème couleur' : 'Thème nuit');
    bouton.setAttribute('aria-label', actif ? 'Revenir au thème couleur' : 'Activer le thème nuit');
  }
  if (actif) {
    if (!fond) { fond = new FondNuit(); fond.monter(); }
  } else if (fond) {
    fond.demonter();
    fond = null;
  }
}

/*
 * Vues où la lune a sa place : les écrans de menu. On l'exclut du Salon et
 * d'une partie en cours — là, le coin haut-droit est occupé par les boutons de
 * la vue (quitter, réglages…) et la lune venait se superposer à eux.
 */
const VUES_AVEC_LUNE = new Set(['play', 'rooms', 'players', 'classement', 'lounge']);

export function initThemeNuit() {
  initOnde();
  const zone = document.getElementById('views');
  if (!zone) return;

  const bouton = document.createElement('button');
  bouton.className = 'lune-btn';
  bouton.type = 'button';
  bouton.addEventListener('click', () => {
    const actif = !lire();
    ecrire(actif);
    appliquer(actif, bouton);
  });
  zone.append(bouton);

  // Affichage conditionnel : on suit la navigation plutôt que de tester une
  // seule fois au démarrage, puisque l'utilisateur change de vue en permanence.
  /*
   * Double sécurité. `hidden` seul ne suffit pas : une règle `display`
   * explicite l'emporte sur la feuille par défaut du navigateur (c'est ce qui
   * laissait la lune visible par-dessus « Quitter le salon »). On pose donc
   * l'attribut ET on retire réellement le bouton du document — ainsi le
   * masquage tient même si la feuille de style n'est pas chargée.
   */
  const majVisibilite = (vue) => {
    const visible = VUES_AVEC_LUNE.has(vue);
    bouton.hidden = !visible;
    if (visible) { if (!bouton.parentNode) zone.append(bouton); }
    else bouton.remove();
  };
  bus.on('view:changed', majVisibilite);
  // État de départ : on lit la vue réellement affichée.
  const vues = document.querySelectorAll?.('[data-view-name]') ?? [];
  const vueActive = [...vues].find((v) => !v.hidden)?.dataset?.viewName;
  majVisibilite(vueActive ?? 'play');

  appliquer(lire(), bouton);
}
