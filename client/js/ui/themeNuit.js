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

/** Partie fractionnaire, toujours dans [0,1[ (contrairement à `% 1`). */
function frac(n) { return n - Math.floor(n); }

class FondNuit {
  constructor() {
    this.canvas = document.createElement('canvas');
    this.canvas.className = 'nuit-fond';
    this.canvas.setAttribute('aria-hidden', 'true');
    this.ctx = this.canvas.getContext('2d');
    this.t = 0;
    this.raf = null;
    this.surRedim = () => this.dimensionner();
  }

  dimensionner() {
    // On plafonne la résolution : sur un grand écran, dessiner des dizaines de
    // milliers de points en pleine densité ne servirait à rien de visible et
    // coûterait cher.
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    this.l = Math.floor(window.innerWidth * dpr);
    this.h = Math.floor(window.innerHeight * dpr);
    this.canvas.width = this.l;
    this.canvas.height = this.h;
    this.canvas.style.width = '100%';
    this.canvas.style.height = '100%';
    this._releves = null;   // les relevés dépendent de la taille
  }

  monter() {
    document.body.prepend(this.canvas);
    this.dimensionner();
    window.addEventListener('resize', this.surRedim);
    const boucle = () => {
      this.raf = requestAnimationFrame(boucle);
      // ~20 images/s : le relief ondule lentement, inutile d'aller plus vite.
      const maintenant = performance.now();
      if (maintenant - (this._dernier ?? 0) < 50) return;
      this._dernier = maintenant;
      this.t += 0.006;
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

  /**
   * Relief façon terrain : une somme de bosses qui ondulent lentement. Le
   * résultat est rendu en POINTS (jamais en surface pleine) — c'est ce
   * pointillé qui donne l'aspect « donnée brute » plutôt que « dessin ».
   */
  hauteur(u, v) {
    const bosse = (cx, cy, largeur, amp) => {
      const d = ((u - cx) ** 2 + (v - cy) ** 2) / (largeur * largeur);
      return amp * Math.exp(-d);
    };
    let hh = bosse(0.5, 0.5, 0.24, 1) * (0.85 + 0.15 * Math.sin(this.t * 1.3));
    hh += bosse(0.3, 0.62, 0.15, 0.5) * (0.8 + 0.2 * Math.sin(this.t * 0.9 + 1));
    hh += bosse(0.72, 0.58, 0.13, 0.42) * (0.8 + 0.2 * Math.sin(this.t * 1.1 + 2));
    // Rides fines : ce qui fait « relief accidenté » plutôt que « colline ».
    hh += 0.06 * Math.sin(u * 34 + this.t * 2) * Math.cos(v * 27 - this.t * 1.4) * hh;
    hh += 0.04 * Math.sin(u * 61 - this.t) * hh;
    return Math.max(0, hh);
  }

  dessiner() {
    const g = this.ctx;
    const { l, h } = this;
    g.clearRect(0, 0, l, h);

    // Le relief occupe la moitié haute de l'écran.
    const base = h * 0.62;
    const ampl = h * 0.42;
    const colonnes = Math.min(190, Math.floor(l / 7));
    const lignes = 54;

    for (let j = lignes - 1; j >= 0; j -= 1) {
      const v = j / (lignes - 1);
      // Perspective : les lignes du fond sont resserrées et plus pâles.
      const recul = 0.35 + v * 0.65;
      const y0 = base - (1 - v) * h * 0.3;
      for (let i = 0; i < colonnes; i += 1) {
        const u = i / (colonnes - 1);
        const hh = this.hauteur(u, v);
        if (hh < 0.012) continue;
        const x = (u - 0.5) * l * (0.55 + recul * 0.55) + l / 2;
        const y = y0 - hh * ampl * recul;
        // Densité : les crêtes reçoivent plus de points, comme sur un relevé
        // où la mesure s'accumule là où le signal est fort.
        const points = 1 + Math.floor(hh * 3.5);
        for (let k = 0; k < points; k += 1) {
          // Dispersion pseudo-aléatoire stable. `frac()` borne bien dans [0,1[ :
          // un simple `% 1` peut rendre un résultat NÉGATIF et projeter les
          // points hors de leur case, ce qui écrase le dégradé de densité.
          const dx = frac(Math.sin(i * 12.9898 + j * 78.233 + k * 3.7) * 43758.5453) * 5;
          const dy = frac(Math.sin(i * 39.346 + j * 11.135 + k * 7.1) * 24634.6345) * 4;
          // La luminosité suit la hauteur ET l'éloignement : c'est ce qui donne
          // les crêtes éclatantes sur des pentes qui s'estompent.
          const lum = Math.min(0.95, 0.1 + hh * 0.95) * recul;
          g.fillStyle = `rgba(255,255,255,${lum.toFixed(3)})`;
          g.fillRect(x + dx, y + dy, 1.3, 1.3);
        }
      }
    }

    this.releves(g, l, h);
  }

  /**
   * Relevés chiffrés dans les marges. Ils sont tirés une fois puis figés : des
   * nombres qui changeraient sans cesse seraient illisibles et fatigants.
   */
  releves(g, l, h) {
    if (!this._releves) {
      const nb = (n) => String(Math.floor(Math.random() * n)).padStart(String(n).length - 1, '0');
      this._releves = {
        gauche: Array.from({ length: 14 }, () => `${nb(1000000)}.${nb(100)}`),
        droite: Array.from({ length: 11 }, () => `${nb(10000)}  ${nb(100000)}`),
        titre: `${nb(1000000)}.${nb(1000)}`,
      };
    }
    g.font = `${Math.round(h * 0.0115)}px ui-monospace, monospace`;
    g.fillStyle = 'rgba(255,255,255,0.16)';
    g.textAlign = 'left';
    this._releves.gauche.forEach((s, i) => g.fillText(s, l * 0.012, h * 0.08 + i * h * 0.032));
    g.textAlign = 'right';
    this._releves.droite.forEach((s, i) => g.fillText(s, l * 0.988, h * 0.1 + i * h * 0.034));

    // Un grand nombre en haut, comme une valeur suivie.
    g.textAlign = 'left';
    g.font = `${Math.round(h * 0.02)}px ui-monospace, monospace`;
    g.fillStyle = 'rgba(255,255,255,0.22)';
    g.fillText(this._releves.titre, l * 0.012, h * 0.045);

    // Filets de repère horizontaux.
    g.strokeStyle = 'rgba(255,255,255,0.05)';
    g.lineWidth = 1;
    for (let i = 1; i < 5; i += 1) {
      const y = h * (0.68 + i * 0.07);
      g.beginPath(); g.moveTo(l * 0.02, y); g.lineTo(l * 0.98, y); g.stroke();
    }
  }
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

export function initThemeNuit() {
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

  appliquer(lire(), bouton);
}
