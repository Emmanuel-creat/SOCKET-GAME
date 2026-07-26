/**
 * Spring Clash — interface (canevas + réseau).
 *
 * Architecture Host-autoritaire, comme La Traque : le Host fait tourner le
 * moteur et diffuse l'état ; les invités envoient leurs intentions.
 *
 * Contrôles : ZQSD (ou les flèches) pour se déplacer, Espace pour le ressort.
 * On lit `e.key` et non `e.code` — sur un clavier AZERTY, la touche marquée Z
 * remonte le code « KeyW », et écouter les codes ferait jouer avec les
 * mauvaises touches.
 */

import {
  SpringClashEngine, TICK_MS, ARENE_RAYON, CUBE_RAYON, SOLS,
  MANCHES_DEFAUT, TUILE,
} from './engine.js';

const DIFFUSION_MS = 50;     // ~20 envois/s : le CPU du serveur suit le NOMBRE de messages
const FPS_MS = 25;

function h(tag, props = {}, enfants = []) {
  const n = document.createElement(tag);
  Object.entries(props).forEach(([k, v]) => {
    if (v === undefined || v === null || v === false) return;
    if (k === 'className') n.className = v;
    else if (k === 'style') n.style.cssText = v;
    else if (k.startsWith('on')) n.addEventListener(k.slice(2).toLowerCase(), v);
    else n.setAttribute(k, v === true ? '' : v);
  });
  (Array.isArray(enfants) ? enfants : [enfants]).forEach((c) => {
    if (c === null || c === undefined || c === false) return;
    n.append(typeof c === 'string' || typeof c === 'number' ? document.createTextNode(String(c)) : c);
  });
  return n;
}

const COULEURS = ['#4fc3f7', '#ff6b6b', '#66d17a', '#ffd166', '#c56cf0', '#ff9f43', '#2fe0d0', '#ff6fa5'];
/*
 * Palettes de terrain. Chaque sol a un ton de base, deux nuances pour le grain,
 * une teinte claire pour le liseré supérieur et une sombre pour l'ombre portée
 * du bord : c'est ce jeu de quatre tons qui donne le relief des tilesets
 * classiques, bien plus qu'un aplat de couleur.
 */
const PALETTES = {
  herbe:      { base: '#4a8f3c', grain1: '#3d7a31', grain2: '#57a344', clair: '#6dbb52', ombre: '#2c5a24' },
  glace:      { base: '#7fc4e8', grain1: '#6db3da', grain2: '#9ad8f3', clair: '#c6ecfb', ombre: '#4a8bb0' },
  sable:      { base: '#d8b978', grain1: '#c9a765', grain2: '#e5cb8e', clair: '#f2dfae', ombre: '#a8874a' },
  caoutchouc: { base: '#7d52b0', grain1: '#6b4399', grain2: '#9265c7', clair: '#ab84dc', ombre: '#4d2f70' },
  metal:      { base: '#6b7585', grain1: '#5b6472', grain2: '#7d8798', clair: '#98a2b2', ombre: '#414957' },
  lave:       { base: '#c9391f', grain1: '#a82a15', grain2: '#e05a2c', clair: '#ffa23d', ombre: '#7d1c0d' },
};

/** Générateur déterministe : la même case donne toujours le même décor. */
function alea(x, y, sel = 0) {
  let n = (x * 73856093) ^ (y * 19349663) ^ (sel * 83492791);
  n = (n ^ (n >>> 13)) >>> 0;
  n = Math.imul(n, 1274126177) >>> 0;
  return ((n ^ (n >>> 16)) >>> 0) / 4294967296;
}

export class SpringClashUI {
  constructor(container, context) {
    this.conteneur = container;
    this.ctx = context;
    this.estHost = context.me.id === context.hostId;
    this.moteur = null;
    this.vue = null;
    this.touches = new Set();
    this.manches = MANCHES_DEFAUT;
    this.derniereEntree = '';
    this.timers = {};
  }

  /* ============================== cycle de vie ============================== */

  mount() {
    this.styleEl = h('style', {}, CSS);
    this.racine = h('div', { className: 'sc' });
    this.conteneur.append(this.styleEl, this.racine);
    this.desabonner = this.ctx.onMessage(({ from, data }) => this.surMessage(from, data));

    if (this.estHost) this.ecranReglages();
    else {
      this.message('⏳ Connexion à l\u2019arène…');
      this.versHost({ t: 'hello' });   // l'invité peut arriver après la 1re diffusion
    }
    this.brancherClavier();
  }

  unmount() {
    this.desabonner?.();
    Object.values(this.timers).forEach((t) => { clearInterval(t); clearTimeout(t); });
    if (this.raf) cancelAnimationFrame(this.raf);
    window.removeEventListener('keydown', this.surTouche);
    window.removeEventListener('keyup', this.surRelache);
    this.styleEl?.remove();
    this.racine?.remove();
  }

  message(texte) {
    this.racine.replaceChildren(h('div', { className: 'sc__panneau sc__centre' }, texte));
  }

  /* ============================== réglages (Host) ============================== */

  ecranReglages() {
    const refaire = () => {
      panneau.replaceChildren(
        h('h2', { className: 'sc__titre' }, '🟦 Spring Clash'),
        h('p', { className: 'sc__soustitre' }, 'Un cube, un ressort. Pas d\u2019arme, pas de saut : tout est dans le timing.'),
        h('div', { className: 'sc__reglage' }, [
          h('label', {}, 'Manches gagnantes'),
          h('div', { className: 'sc__seg' }, [1, 3, 5, 7].map((m) => h('button', {
            type: 'button', className: `sc__segbtn${m === this.manches ? ' sc__segbtn--actif' : ''}`,
            onClick: () => { this.manches = m; refaire(); },
          }, String(m)))),
        ]),
        h('div', { className: 'sc__aide' }, [
          h('div', {}, [h('b', {}, 'ZQSD'), ' ou les flèches — se déplacer']),
          h('div', {}, [h('b', {}, 'Espace'), ' — comprimer le ressort, puis BOING']),
          h('div', { className: 'sc__aide-note' }, 'Le ressort se recharge en 2 s. Déclenche-le juste avant l\u2019impact pour contrer.'),
        ]),
        h('div', { className: 'sc__sols' }, Object.entries(SOLS).map(([, s]) => h('span', { className: 'sc__sol' }, `${s.emoji} ${s.nom}`))),
        h('button', { className: 'sc__btn sc__btn--jouer', type: 'button', onClick: () => this.lancer() }, '▶️ Commencer'),
      );
    };
    const panneau = h('div', { className: 'sc__panneau sc__reglages' });
    refaire();
    this.racine.replaceChildren(h('div', { className: 'sc__centre' }, panneau));
  }

  lancer() {
    try { this.moteur = new SpringClashEngine(this.ctx.players, { manches: this.manches }); }
    catch (err) { this.message(`⚠️ ${err.message}`); return; }
    this.moteur.demarrer();
    this.timers.boucle = setInterval(() => this.boucleHost(), TICK_MS);
    this.timers.diffusion = setInterval(() => this.diffuser(), DIFFUSION_MS);
    this.diffuser();
  }

  boucleHost() {
    if (!this.moteur) return;
    this.moteur.tick();
    this.moteur.tickPause();
    if (this.moteur.phase === 'fin' && !this.finAnnoncee) {
      this.finAnnoncee = true;
      this.diffuser();
      this.timers.fin = setTimeout(() => this.terminer(), 7000);
    }
  }

  diffuser() {
    if (!this.moteur) return;
    for (const j of this.ctx.players) {
      const vue = this.moteur.vuePour(j.id);
      if (j.id === this.ctx.me.id) this.appliquer(vue);
      else this.ctx.sendMessage({ t: 'vue', vue }, j.id);
    }
  }

  terminer() {
    if (this._fini) return;
    this._fini = true;
    const info = this.moteur.resume();
    for (const j of this.ctx.players) {
      if (j.id !== this.ctx.me.id) this.ctx.sendMessage({ t: 'fin', info }, j.id);
    }
    this.ctx.onEnd(info);
  }

  /* ============================== réseau ============================== */

  surMessage(de, data) {
    if (!data) return;
    if (this.estHost) {
      if (data.t === 'hello') { const v = this.moteur?.vuePour(de); if (v) this.ctx.sendMessage({ t: 'vue', vue: v }, de); return; }
      if (data.t === 'entree') { this.moteur?.entrer(de, data); return; }
      if (data.t === 'ressort') { this.moteur?.ressort(de); return; }
      return;
    }
    if (de !== this.ctx.hostId) return;
    if (data.t === 'vue') this.appliquer(data.vue);
    else if (data.t === 'fin') this.ctx.onEnd(data.info);
  }

  agir(msg) {
    if (this.estHost) {
      if (msg.t === 'entree') this.moteur?.entrer(this.ctx.me.id, msg);
      else if (msg.t === 'ressort') this.moteur?.ressort(this.ctx.me.id);
    } else this.versHost(msg);
  }

  versHost(msg) { this.ctx.sendMessage(msg, this.ctx.hostId); }

  /* ============================== entrées ============================== */

  brancherClavier() {
    // `e.key` = la LETTRE réellement produite. Sur AZERTY, la touche marquée Z
    // renvoie le code « KeyW » : écouter les codes ferait jouer avec W et A.
    const lettre = (e) => (e.key && e.key.length === 1 ? e.key.toLowerCase() : null);

    this.surTouche = (e) => {
      if (e.key === ' ' || e.key === 'Spacebar') {
        e.preventDefault();
        if (!e.repeat) this.agir({ t: 'ressort' });
        return;
      }
      if (e.key.startsWith('Arrow')) e.preventDefault();
      const l = lettre(e);
      this.touches.add(l ?? e.key);
      this.envoyerEntree();
    };
    this.surRelache = (e) => {
      const l = lettre(e);
      this.touches.delete(l ?? e.key);
      this.envoyerEntree();
    };
    window.addEventListener('keydown', this.surTouche);
    window.addEventListener('keyup', this.surRelache);
  }

  axe() {
    const k = this.touches;
    const dx = (k.has('d') || k.has('ArrowRight') ? 1 : 0) - (k.has('q') || k.has('ArrowLeft') ? 1 : 0);
    const dy = (k.has('s') || k.has('ArrowDown') ? 1 : 0) - (k.has('z') || k.has('w') || k.has('ArrowUp') ? 1 : 0);
    return { dx, dy };
  }

  /** N'envoie que si la direction a CHANGÉ : le coût serveur suit le nombre de messages. */
  envoyerEntree() {
    const { dx, dy } = this.axe();
    const signature = `${dx}|${dy}`;
    if (signature === this.derniereEntree) return;
    this.derniereEntree = signature;
    this.agir({ t: 'entree', dx, dy });
  }

  /* ============================== rendu ============================== */

  appliquer(vue) {
    const nouvellePhase = this.vue?.phase !== vue.phase;
    this.vue = vue;
    if (vue.phase === 'attente') return;
    if (!this.canvas || nouvellePhase) this.construireEcran();
    this.majBandeau();
    if (!this.raf) this.boucleRendu();
  }

  construireEcran() {
    this.canvas = h('canvas', { className: 'sc__arene', width: '900', height: '900' });
    this.canvasCtx = this.canvas.getContext('2d');
    this.bandeau = h('div', { className: 'sc__bandeau' });
    this.journalEl = h('div', { className: 'sc__journal' });
    this.racine.replaceChildren(
      this.bandeau,
      h('div', { className: 'sc__scene' }, [this.canvas]),
      this.journalEl,
    );
  }

  majBandeau() {
    const v = this.vue;
    const moi = v.cubes?.find((c) => c.id === this.ctx.me.id);
    const secondes = Math.ceil((v.prochainEvenementDans ?? 0) / 1000);
    this.bandeau.replaceChildren(
      h('strong', {}, `Manche ${v.manche}/${v.manchesTotal}`),
      h('span', { className: 'sc__vivants' }, `${v.cubes.filter((c) => c.vivant).length} en lice`),
      h('span', { className: `sc__ressort sc__ressort--${moi?.ressort ?? 'pret'}` },
        moi?.ressort === 'pret' ? '✨ Ressort prêt (Espace)'
          : moi?.ressort === 'compression' ? '⬇️ Compression…'
            : `⏳ Recharge ${Math.round((moi?.ressortRatio ?? 0) * 100)} %`),
      h('span', { className: `sc__chrono${secondes <= 5 ? ' sc__chrono--urgent' : ''}` }, `⚠️ ${secondes} s`),
      h('span', { className: 'sc__scores' }, v.classement.map((j) => `${j.pseudo} ${j.manches}`).join('  ·  ')),
    );
    this.journalEl.replaceChildren(...(v.journal ?? []).slice(-3).map((l) => h('div', {}, l)));
  }

  boucleRendu() {
    const dessiner = () => {
      this.raf = requestAnimationFrame(dessiner);
      const maintenant = performance.now();
      if (maintenant - (this._dernierRendu ?? 0) < FPS_MS) return;
      this._dernierRendu = maintenant;
      this.dessiner();
    };
    this.raf = requestAnimationFrame(dessiner);
  }


  /* ============================== décor ============================== */

  /**
   * Peint le terrain UNE SEULE FOIS dans un canevas hors écran, et le réutilise
   * ensuite à chaque image. Sans ça, on redessinerait des centaines de motifs
   * et de brins d'herbe 40 fois par seconde pour un décor qui ne bouge pas.
   * Le cache est refait quand le terrain change (événement) ou qu'on
   * redimensionne.
   */
  calqueDecor(v, T, echelle) {
    const cle = `${v.solsVersion ?? 0}|${v.manche}|${Math.round(T)}`;
    if (this._decor && this._decorCle === cle) return this._decor;

    const c = document.createElement('canvas');
    c.width = T; c.height = T;
    const g = c.getContext('2d');
    const centre = Math.floor(v.grilleTaille / 2);
    const pas = TUILE * echelle;
    const versEcran = (x, y) => [T / 2 + x * echelle, T / 2 + y * echelle];
    const solA = (lx, ly) => (v.sols[ly]?.[lx] ?? null);

    // 1. Aplats + grain : deux passes de taches semées, toujours identiques
    //    pour une case donnée, ce qui évite le fourmillement d'une image à
    //    l'autre tout en cassant l'uniformité.
    for (let ly = 0; ly < v.grilleTaille; ly += 1) {
      for (let lx = 0; lx < v.grilleTaille; lx += 1) {
        const sol = solA(lx, ly);
        const p = PALETTES[sol] ?? PALETTES.herbe;
        const [px, py] = versEcran((lx - centre) * TUILE - TUILE / 2, (ly - centre) * TUILE - TUILE / 2);
        g.fillStyle = p.base;
        g.fillRect(px, py, pas + 1, pas + 1);
        this.grain(g, px, py, pas, lx, ly, p, sol);
      }
    }

    // 2. Liserés : un trait clair en haut, une ombre en bas, uniquement là où
    //    la case voisine est d'une AUTRE matière. C'est ce qui donne
    //    l'impression que chaque zone est un volume posé sur le sol.
    for (let ly = 0; ly < v.grilleTaille; ly += 1) {
      for (let lx = 0; lx < v.grilleTaille; lx += 1) {
        const sol = solA(lx, ly);
        const p = PALETTES[sol] ?? PALETTES.herbe;
        const [px, py] = versEcran((lx - centre) * TUILE - TUILE / 2, (ly - centre) * TUILE - TUILE / 2);
        const ep = Math.max(2, pas * 0.09);
        if (solA(lx, ly - 1) !== sol) { g.fillStyle = p.clair; g.fillRect(px, py, pas + 1, ep); }
        if (solA(lx, ly + 1) !== sol) { g.fillStyle = p.ombre; g.fillRect(px, py + pas - ep, pas + 1, ep + 1); }
        if (solA(lx - 1, ly) !== sol) { g.fillStyle = p.clair; g.globalAlpha = 0.55; g.fillRect(px, py, ep, pas + 1); g.globalAlpha = 1; }
        if (solA(lx + 1, ly) !== sol) { g.fillStyle = p.ombre; g.globalAlpha = 0.55; g.fillRect(px + pas - ep, py, ep, pas + 1); g.globalAlpha = 1; }
      }
    }

    // 3. Décor semé : touffes, cailloux, rivets… posés seulement sur les cases
    //    qui s'y prêtent, avec une densité mesurée pour rester lisible.
    for (let ly = 0; ly < v.grilleTaille; ly += 1) {
      for (let lx = 0; lx < v.grilleTaille; lx += 1) {
        const sol = solA(lx, ly);
        const [px, py] = versEcran((lx - centre) * TUILE - TUILE / 2, (ly - centre) * TUILE - TUILE / 2);
        this.props(g, px, py, pas, lx, ly, sol);
      }
    }

    this._decor = c;
    this._decorCle = cle;
    return c;
  }

  /** Grain d'une case : taches de deux nuances, motif propre à la matière. */
  grain(g, px, py, pas, lx, ly, p, sol) {
    const taches = sol === 'metal' ? 4 : 7;
    for (let i = 0; i < taches; i += 1) {
      const rx = alea(lx, ly, i * 3 + 1);
      const ry = alea(lx, ly, i * 3 + 2);
      const rt = alea(lx, ly, i * 3 + 3);
      g.fillStyle = rt > 0.5 ? p.grain1 : p.grain2;
      const taille = pas * (0.07 + rt * 0.12);
      g.fillRect(px + rx * (pas - taille), py + ry * (pas - taille), taille, taille);
    }
    // Chaque matière a en plus sa signature graphique.
    if (sol === 'glace') {
      // Éclats en diagonale, façon givre.
      g.strokeStyle = p.clair; g.globalAlpha = 0.5; g.lineWidth = Math.max(1, pas * 0.03);
      for (let i = 0; i < 2; i += 1) {
        const a = alea(lx, ly, 40 + i) * pas; const b = alea(lx, ly, 50 + i) * pas;
        g.beginPath(); g.moveTo(px + a, py + b); g.lineTo(px + a + pas * 0.22, py + b + pas * 0.16); g.stroke();
      }
      g.globalAlpha = 1;
    } else if (sol === 'metal') {
      // Rivets aux quatre coins : lecture immédiate de la plaque.
      g.fillStyle = p.clair;
      const r = Math.max(1.5, pas * 0.045);
      for (const [dx, dy] of [[0.16, 0.16], [0.84, 0.16], [0.16, 0.84], [0.84, 0.84]]) {
        g.beginPath(); g.arc(px + dx * pas, py + dy * pas, r, 0, Math.PI * 2); g.fill();
      }
      g.strokeStyle = p.ombre; g.lineWidth = Math.max(1, pas * 0.02);
      g.strokeRect(px + pas * 0.08, py + pas * 0.08, pas * 0.84, pas * 0.84);
    } else if (sol === 'caoutchouc') {
      // Damier souple, comme un tapis de gymnase.
      g.fillStyle = p.grain2; g.globalAlpha = 0.45;
      for (let i = 0; i < 4; i += 1) {
        const dx = (i % 2) * 0.5; const dy = Math.floor(i / 2) * 0.5;
        if ((lx + ly + i) % 2 === 0) g.fillRect(px + dx * pas, py + dy * pas, pas * 0.5, pas * 0.5);
      }
      g.globalAlpha = 1;
    } else if (sol === 'sable') {
      // Ondulations de dune.
      g.strokeStyle = p.grain1; g.globalAlpha = 0.6; g.lineWidth = Math.max(1, pas * 0.025);
      for (let i = 0; i < 3; i += 1) {
        const y = py + (0.2 + i * 0.3) * pas + alea(lx, ly, 60 + i) * pas * 0.06;
        g.beginPath(); g.moveTo(px + pas * 0.1, y);
        g.quadraticCurveTo(px + pas * 0.5, y - pas * 0.06, px + pas * 0.9, y);
        g.stroke();
      }
      g.globalAlpha = 1;
    }
  }

  /** Éléments de décor posés sur une case, selon sa matière. */
  props(g, px, py, pas, lx, ly, sol) {
    const d = alea(lx, ly, 7);
    if (sol === 'herbe') {
      if (d > 0.55) {
        // Touffes d'herbe : trois brins courbes.
        const n = 2 + Math.floor(alea(lx, ly, 8) * 3);
        for (let i = 0; i < n; i += 1) {
          const bx = px + (0.15 + alea(lx, ly, 90 + i) * 0.7) * pas;
          const by = py + (0.25 + alea(lx, ly, 100 + i) * 0.6) * pas;
          const hh = pas * (0.1 + alea(lx, ly, 110 + i) * 0.09);
          g.strokeStyle = alea(lx, ly, 120 + i) > 0.5 ? PALETTES.herbe.clair : PALETTES.herbe.grain1;
          g.lineWidth = Math.max(1.2, pas * 0.028);
          g.lineCap = 'round';
          for (const s of [-1, 0, 1]) {
            g.beginPath();
            g.moveTo(bx + s * pas * 0.035, by);
            g.quadraticCurveTo(bx + s * pas * 0.06, by - hh * 0.7, bx + s * pas * 0.09, by - hh);
            g.stroke();
          }
        }
      }
      if (d > 0.9) {
        // Buisson touffu, plus rare.
        const bx = px + pas * 0.5; const by = py + pas * 0.55;
        g.fillStyle = PALETTES.herbe.ombre;
        g.beginPath(); g.ellipse(bx, by + pas * 0.06, pas * 0.2, pas * 0.09, 0, 0, Math.PI * 2); g.fill();
        for (const [ox, oy, r] of [[-0.09, 0, 0.11], [0.09, -0.02, 0.1], [0, -0.09, 0.12]]) {
          g.fillStyle = PALETTES.herbe.grain2;
          g.beginPath(); g.arc(bx + ox * pas, by + oy * pas, r * pas, 0, Math.PI * 2); g.fill();
          g.fillStyle = PALETTES.herbe.clair;
          g.beginPath(); g.arc(bx + ox * pas - r * pas * 0.25, by + oy * pas - r * pas * 0.3, r * pas * 0.45, 0, Math.PI * 2); g.fill();
        }
      }
    } else if (sol === 'sable' && d > 0.82) {
      // Cailloux posés sur le sable, avec leur ombre.
      const bx = px + (0.25 + alea(lx, ly, 9) * 0.5) * pas;
      const by = py + (0.3 + alea(lx, ly, 10) * 0.4) * pas;
      const r = pas * (0.06 + alea(lx, ly, 11) * 0.05);
      g.fillStyle = 'rgba(0,0,0,.18)';
      g.beginPath(); g.ellipse(bx, by + r * 0.7, r * 1.15, r * 0.5, 0, 0, Math.PI * 2); g.fill();
      g.fillStyle = '#9c8f7a';
      g.beginPath(); g.arc(bx, by, r, 0, Math.PI * 2); g.fill();
      g.fillStyle = '#c2b59d';
      g.beginPath(); g.arc(bx - r * 0.3, by - r * 0.3, r * 0.5, 0, Math.PI * 2); g.fill();
    } else if (sol === 'glace' && d > 0.86) {
      // Blocs de glace saillants.
      const bx = px + (0.3 + alea(lx, ly, 12) * 0.4) * pas;
      const by = py + (0.3 + alea(lx, ly, 13) * 0.4) * pas;
      const r = pas * 0.11;
      g.fillStyle = 'rgba(255,255,255,.75)';
      g.beginPath();
      g.moveTo(bx, by - r); g.lineTo(bx + r * 0.8, by); g.lineTo(bx, by + r * 0.8); g.lineTo(bx - r * 0.8, by);
      g.closePath(); g.fill();
      g.strokeStyle = PALETTES.glace.ombre; g.lineWidth = Math.max(1, pas * 0.02); g.stroke();
    } else if (sol === 'lave' && d > 0.6) {
      // Croûtes sombres flottant sur la lave.
      const bx = px + (0.2 + alea(lx, ly, 14) * 0.6) * pas;
      const by = py + (0.2 + alea(lx, ly, 15) * 0.6) * pas;
      g.fillStyle = 'rgba(60,18,8,.75)';
      g.beginPath(); g.ellipse(bx, by, pas * 0.13, pas * 0.08, alea(lx, ly, 16) * 3, 0, Math.PI * 2); g.fill();
    }
  }

  dessiner() {
    const v = this.vue;
    const g = this.canvasCtx;
    if (!v || !g || !v.cubes) return;
    const T = this.canvas.width;
    const echelle = (T / 2) / (ARENE_RAYON * 1.08);
    const versEcran = (x, y) => [T / 2 + x * echelle, T / 2 + y * echelle];

    g.clearRect(0, 0, T, T);
    const [cx, cy] = versEcran(0, 0);
    const rayonEcran = v.rayon * echelle;

    // Ombre portée de la plateforme : elle flotte dans le vide, on doit le voir.
    g.save();
    g.fillStyle = 'rgba(0,0,0,.45)';
    g.beginPath(); g.arc(cx, cy + rayonEcran * 0.05, rayonEcran * 1.04, 0, Math.PI * 2); g.fill();
    g.restore();

    // Le décor, peint une seule fois puis découpé au disque de l'arène.
    g.save();
    g.beginPath(); g.arc(cx, cy, rayonEcran, 0, Math.PI * 2); g.clip();
    g.drawImage(this.calqueDecor(v, T, echelle), 0, 0);

    // La lave respire par-dessus le décor figé : c'est le seul élément animé
    // du terrain, et il doit sauter aux yeux.
    const pulse = 0.5 + 0.5 * Math.sin(performance.now() / 260);
    const centre = Math.floor(v.grilleTaille / 2);
    const pas = TUILE * echelle;
    g.globalAlpha = 0.14 + pulse * 0.24;
    g.fillStyle = '#ffb347';
    for (let ly = 0; ly < v.grilleTaille; ly += 1) {
      for (let lx = 0; lx < v.grilleTaille; lx += 1) {
        if (v.sols[ly][lx] !== 'lave') continue;
        const [px, py] = versEcran((lx - centre) * TUILE - TUILE / 2, (ly - centre) * TUILE - TUILE / 2);
        g.fillRect(px, py, pas + 1, pas + 1);
      }
    }
    g.globalAlpha = 1;

    // Vignette : les bords s'assombrissent, le regard reste au centre.
    const vign = g.createRadialGradient(cx, cy, rayonEcran * 0.55, cx, cy, rayonEcran);
    vign.addColorStop(0, 'rgba(0,0,0,0)');
    vign.addColorStop(1, 'rgba(0,0,0,.38)');
    g.fillStyle = vign;
    g.beginPath(); g.arc(cx, cy, rayonEcran, 0, Math.PI * 2); g.fill();
    g.restore();

    // Rebord de la plateforme : une tranche claire puis un liseré sombre, pour
    // que le disque ait de l'épaisseur au lieu d'être un simple cercle plat.
    g.lineWidth = Math.max(4, rayonEcran * 0.035);
    g.strokeStyle = '#8a6a45';
    g.beginPath(); g.arc(cx, cy, rayonEcran + g.lineWidth * 0.35, 0, Math.PI * 2); g.stroke();
    g.lineWidth = Math.max(2, rayonEcran * 0.014);
    g.strokeStyle = 'rgba(255,240,214,.75)';
    g.beginPath(); g.arc(cx, cy, rayonEcran - 1, 0, Math.PI * 2); g.stroke();

    for (const f of v.effets ?? []) this.dessinerEffet(g, f, versEcran, echelle, v.t);

    v.cubes.forEach((cube, i) => {
      if (!cube.vivant) return;
      this.dessinerCube(g, cube, i, versEcran, echelle);
    });
  }

  dessinerCube(g, cube, i, versEcran, echelle) {
    const [x, y] = versEcran(cube.x, cube.y);
    const taille = CUBE_RAYON * 2 * echelle;
    const couleur = COULEURS[i % COULEURS.length];
    const estMoi = cube.id === this.ctx.me.id;

    // Ombre portée : sur un décor chargé, un cube sans ombre a l'air collé
    // dessus au lieu d'être posé dessus.
    g.save();
    g.fillStyle = 'rgba(0,0,0,.32)';
    g.beginPath();
    g.ellipse(x, y + taille * 0.45, taille * 0.52, taille * 0.22, 0, 0, Math.PI * 2);
    g.fill();
    g.restore();

    // Ressort : comprimé (court et large) puis détendu (long).
    const compresse = cube.ressort === 'compression';
    const hauteurRessort = compresse ? taille * 0.28 : cube.impulsion ? taille * 1.05 : taille * 0.62;

    g.save();
    g.translate(x, y);
    g.rotate(cube.angle + Math.PI / 2);   // le ressort part vers l'arrière du regard

    // Le ressort, en zigzag.
    g.strokeStyle = compresse ? '#ffd166' : '#cfd6e6';
    g.lineWidth = Math.max(2, taille * (compresse ? 0.16 : 0.1));
    g.beginPath();
    const spires = 4;
    for (let s = 0; s <= spires * 2; s += 1) {
      const t = s / (spires * 2);
      const py = taille * 0.45 + t * hauteurRessort;
      const px = (s % 2 === 0 ? -1 : 1) * taille * (compresse ? 0.34 : 0.26);
      if (s === 0) g.moveTo(0, taille * 0.45); else g.lineTo(px, py);
    }
    g.stroke();
    g.restore();

    // Le cube.
    g.save();
    g.translate(x, y);
    g.rotate(cube.angle);
    const d = taille / 2;
    // Dégradé vertical + arête claire en haut : le cube prend du relief.
    const dg = g.createLinearGradient(0, -d, 0, d);
    dg.addColorStop(0, couleur);
    dg.addColorStop(1, this.assombrir(couleur, 0.62));
    g.fillStyle = dg;
    g.strokeStyle = estMoi ? '#fff' : 'rgba(0,0,0,.55)';
    g.lineWidth = estMoi ? 4 : 2.5;
    g.fillRect(-d, -d, taille, taille);
    g.fillStyle = 'rgba(255,255,255,.28)';
    g.fillRect(-d, -d, taille, taille * 0.16);
    g.strokeRect(-d, -d, taille, taille);
    // Un repère de direction : on doit savoir où l'on va tirer.
    g.fillStyle = 'rgba(255,255,255,.85)';
    g.fillRect(d * 0.35, -taille * 0.1, d * 0.55, taille * 0.2);
    g.restore();

    // Jauge de recharge autour du cube, et halo quand c'est prêt.
    const rayonJauge = taille * 0.95;
    if (cube.ressort === 'recharge') {
      g.strokeStyle = 'rgba(255,255,255,.25)';
      g.lineWidth = 4;
      g.beginPath(); g.arc(x, y, rayonJauge, 0, Math.PI * 2); g.stroke();
      g.strokeStyle = '#ffd166';
      g.beginPath();
      g.arc(x, y, rayonJauge, -Math.PI / 2, -Math.PI / 2 + cube.ressortRatio * Math.PI * 2);
      g.stroke();
    } else if (cube.ressort === 'pret') {
      g.strokeStyle = 'rgba(255,226,122,.85)';
      g.lineWidth = 3;
      g.beginPath(); g.arc(x, y, rayonJauge, 0, Math.PI * 2); g.stroke();
    }

    g.fillStyle = estMoi ? '#fff' : 'rgba(255,255,255,.75)';
    g.font = `${Math.round(taille * 0.42)}px system-ui, sans-serif`;
    g.textAlign = 'center';
    g.fillText(cube.pseudo, x, y - taille * 1.05);
  }

  /** Variante plus sombre d'une couleur #rrggbb, pour les dégradés. */
  assombrir(hex, facteur) {
    const n = parseInt(hex.slice(1), 16);
    const r = Math.round(((n >> 16) & 255) * facteur);
    const v = Math.round(((n >> 8) & 255) * facteur);
    const b = Math.round((n & 255) * facteur);
    return `rgb(${r},${v},${b})`;
  }

  dessinerEffet(g, f, versEcran, echelle, t) {
    const age = (t - f.at) / 700;
    if (age > 1 || f.x === undefined) return;
    const [x, y] = versEcran(f.x, f.y);
    g.save();
    g.globalAlpha = 1 - age;
    const rayon = (0.6 + age * 2.6) * echelle;
    const couleurs = { detente: '#cfd6e6', choc: '#ffd166', 'choc-double': '#ff6b6b', contre: '#2fe0d0', ejection: '#ff6b6b' };
    g.strokeStyle = couleurs[f.type] ?? '#fff';
    g.lineWidth = 5 * (1 - age);
    g.beginPath(); g.arc(x, y, rayon, 0, Math.PI * 2); g.stroke();
    g.restore();
  }
}

const CSS = `
.sc{height:100%;display:flex;flex-direction:column;gap:10px;color:var(--text,#e8ecff);font-family:inherit}
.sc *{box-sizing:border-box}
.sc__centre{flex:1;display:flex;align-items:center;justify-content:center}
.sc__panneau{background:var(--glass,rgba(255,255,255,.05));border:1px solid var(--glass-border,rgba(255,255,255,.12));border-radius:16px;padding:22px;display:flex;flex-direction:column;gap:14px}
.sc__reglages{width:min(520px,100%);text-align:center;align-items:center}
.sc__titre{margin:0;font-size:1.5rem}
.sc__soustitre{margin:0;font-size:.86rem;color:var(--text-dim,#aab)}
.sc__reglage{display:flex;flex-direction:column;gap:8px;align-items:center}
.sc__reglage label{font-size:.74rem;text-transform:uppercase;letter-spacing:.06em;color:var(--text-dim,#aab)}
.sc__seg{display:flex;gap:6px}
.sc__segbtn{padding:8px 16px;border-radius:999px;border:1px solid var(--glass-border,rgba(255,255,255,.16));background:rgba(255,255,255,.05);color:inherit;font-weight:700;cursor:pointer}
.sc__segbtn--actif{background:linear-gradient(135deg,#4fc3f7,#66d17a);color:#0b0b12;border-color:transparent}
.sc__aide{display:flex;flex-direction:column;gap:4px;font-size:.85rem}
.sc__aide-note{font-size:.76rem;color:var(--text-dim,#aab);margin-top:4px}
.sc__sols{display:flex;flex-wrap:wrap;gap:8px;justify-content:center;font-size:.74rem;color:var(--text-dim,#aab)}
.sc__btn{padding:11px 26px;border-radius:999px;border:none;font-weight:800;font-size:1rem;cursor:pointer}
.sc__btn--jouer{background:linear-gradient(135deg,#4fc3f7,#66d17a);color:#08121a}
.sc__bandeau{display:flex;align-items:center;gap:14px;flex-wrap:wrap;font-size:.84rem;padding:8px 12px;border-radius:12px;background:rgba(0,0,0,.3);border:1px solid var(--glass-border,rgba(255,255,255,.1))}
.sc__ressort{padding:3px 10px;border-radius:999px;font-weight:700;font-size:.78rem}
.sc__ressort--pret{background:rgba(255,226,122,.2);color:#ffe27a}
.sc__ressort--compression{background:rgba(255,209,102,.28);color:#ffd166}
.sc__ressort--recharge{background:rgba(255,255,255,.08);color:var(--text-dim,#aab)}
.sc__chrono{margin-left:auto;font-variant-numeric:tabular-nums;font-weight:700}
.sc__chrono--urgent{color:#ff6b6b}
.sc__vivants,.sc__scores{color:var(--text-dim,#aab);font-size:.78rem}
/* Le canevas contient une scène CARRÉE : sa boîte doit le rester, sinon le
   navigateur étire le dessin. La limite de hauteur vit donc DANS la largeur —
   jamais un max-height, qui contredirait le ratio. */
.sc__scene{flex:1;min-height:0;display:flex;align-items:center;justify-content:center}
.sc__arene{width:min(100%,72vh);aspect-ratio:1/1;border-radius:50%;background:#0a0d16;box-shadow:0 14px 44px rgba(0,0,0,.5)}
.sc__journal{font-size:.78rem;color:var(--text-dim,#aab);text-align:center;min-height:3.2em}
@media (max-width:760px){ .sc__arene{width:min(100%,54vh)} .sc__bandeau{font-size:.76rem} }
`;

let instance = null;
export default {
  /** Exposé pour les tests et le débogage en console : le moteur du Host. */
  get _instanceMoteur() { return instance?.moteur ?? null; },
  async mount(container, context) {
    instance = new SpringClashUI(container, context);
    instance.mount();
  },
  async unmount() {
    instance?.unmount();
    instance = null;
  },
};
