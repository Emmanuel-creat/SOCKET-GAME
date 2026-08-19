/**
 * Devil Level — interface (canevas + réseau).
 *
 * Host-autoritaire : le Host fait tourner le moteur et diffuse l'état ; les
 * invités envoient leurs intentions. Le TRACÉ du niveau n'est transmis
 * qu'une fois par manche — le réutiliser évite d'envoyer des centaines de
 * plateformes trente fois par seconde.
 *
 * Contrôles : ← → pour se déplacer, Espace pour sauter, Maj pour le dash,
 * E pour utiliser un bonus offensif. Les lettres sont lues via `e.key` (la
 * lettre réellement produite) et non `e.code`, sans quoi un clavier AZERTY
 * jouerait avec les mauvaises touches.
 */

import {
  DevilLevelEngine, genererNiveau, TICK_MS, JOUEUR_L, JOUEUR_H,
  BONUS, THEMES, MANCHES_DEFAUT,
} from './engine.js';

const DIFFUSION_MS = 50;      // 20 envois/s : le coût serveur suit le NOMBRE de messages
const FPS_MS = 22;
const CAM_L = 900;            // largeur visible du monde
const CAM_H = 500;

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

const COULEURS = ['#ff5c5c', '#4fc3f7', '#66d17a', '#ffd166', '#c56cf0', '#ff9f43', '#2fe0d0', '#ff6fa5',
  '#8bd450', '#7d8bff', '#e0c341', '#ff8a5c', '#5ce1e6', '#d76cf0', '#9fd356', '#ffb4a2'];

/** Libellés des causes de mort : le joueur doit comprendre ce qui l'a tué. */
const CAUSES = {
  pics: '⚠️ Empalé sur des pics',
  scie: '⚙️ Découpé par une scie',
  laser: '🔺 Traversé par un laser',
  ecraseur: '🧱 Écrasé par un bloc',
  bloc: '🧱 Écrasé par un piège déclenché',
  lave: '🌋 Tombé dans la lave',
  chute: '🕳️ Tombé dans le vide',
};

export class DevilLevelUI {
  constructor(container, context) {
    this.conteneur = container;
    this.ctx = context;
    this.estHost = context.me.id === context.hostId;
    this.moteur = null;
    this.vue = null;
    this.trace = null;
    this.traceGraine = null;
    this.touches = new Set();
    this.manches = MANCHES_DEFAUT;
    this.theme = null;
    this.derniereEntree = '';
    this.timers = {};
    this.camX = 0;
  }

  /* ============================== cycle de vie ============================== */

  mount() {
    this.styleEl = h('style', {}, CSS);
    this.racine = h('div', { className: 'dl' });
    this.conteneur.append(this.styleEl, this.racine);
    this.desabonner = this.ctx.onMessage(({ from, data }) => this.surMessage(from, data));
    if (this.estHost) this.ecranReglages();
    else { this.message('⏳ En attente de l\u2019hôte…'); this.versHost({ t: 'hello' }); }
    this.brancherEntrees();
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
    this.racine.replaceChildren(h('div', { className: 'dl__panneau dl__centre' }, texte));
  }

  /* ============================== réglages (Host) ============================== */

  ecranReglages() {
    const refaire = () => {
      panneau.replaceChildren(
        h('h2', { className: 'dl__titre' }, '😈 Devil Level'),
        h('p', { className: 'dl__soustitre' }, 'Une seule route, des pièges partout. Premier à la sortie.'),
        h('div', { className: 'dl__reglage' }, [
          h('label', {}, 'Nombre de manches'),
          h('div', { className: 'dl__seg' }, [1, 3, 5, 7].map((m) => h('button', {
            type: 'button', className: `dl__segbtn${m === this.manches ? ' dl__segbtn--actif' : ''}`,
            onClick: () => { this.manches = m; refaire(); },
          }, String(m)))),
        ]),
        h('div', { className: 'dl__reglage' }, [
          h('label', {}, 'Thème'),
          h('div', { className: 'dl__seg dl__seg--themes' }, [
            h('button', {
              type: 'button', className: `dl__segbtn${this.theme === null ? ' dl__segbtn--actif' : ''}`,
              onClick: () => { this.theme = null; refaire(); },
            }, '🎲 Au hasard'),
            ...Object.entries(THEMES).map(([id, t]) => h('button', {
              type: 'button', className: `dl__segbtn${this.theme === id ? ' dl__segbtn--actif' : ''}`,
              onClick: () => { this.theme = id; refaire(); },
            }, t.nom)),
          ]),
        ]),
        h('div', { className: 'dl__aide' }, [
          h('div', {}, [h('b', {}, '← →'), ' se déplacer']),
          h('div', {}, [h('b', {}, 'Espace'), ' sauter']),
          h('div', {}, [h('b', {}, 'Maj'), ' dash']),
          h('div', {}, [h('b', {}, 'E'), ' utiliser un bonus (gel, tornade, bombe)']),
        ]),
        h('button', { className: 'dl__btn dl__btn--jouer', type: 'button', onClick: () => this.lancer() }, '▶️ Lancer la course'),
      );
    };
    const panneau = h('div', { className: 'dl__panneau dl__reglages' });
    refaire();
    this.racine.replaceChildren(h('div', { className: 'dl__centre' }, panneau));
  }

  lancer() {
    try {
      this.moteur = new DevilLevelEngine(this.ctx.players, { manches: this.manches, theme: this.theme });
    } catch (err) { this.message(`⚠️ ${err.message}`); return; }
    this.moteur.demarrer();
    this.timers.boucle = setInterval(() => this.boucleHost(), TICK_MS);
    this.timers.diffusion = setInterval(() => this.diffuser(), DIFFUSION_MS);
    this.diffuserTrace();
    this.diffuser();
  }

  boucleHost() {
    if (!this.moteur) return;
    const avant = this.moteur.manche;
    this.moteur.tick();
    // Nouvelle manche : le tracé change, il faut le renvoyer.
    if (this.moteur.manche !== avant) this.diffuserTrace();
    if (this.moteur.phase === 'fin' && !this.finAnnoncee) {
      this.finAnnoncee = true;
      this.diffuser();
      this.timers.fin = setTimeout(() => this.terminer(), 8000);
    }
  }

  diffuserTrace() {
    const trace = this.moteur?.traceNiveau();
    if (!trace) return;
    this.appliquerTrace(trace);
    for (const j of this.ctx.players) {
      if (j.id !== this.ctx.me.id) this.ctx.sendMessage({ t: 'trace', trace }, j.id);
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
      if (data.t === 'hello') {
        const tr = this.moteur?.traceNiveau();
        if (tr) this.ctx.sendMessage({ t: 'trace', trace: tr }, de);
        const v = this.moteur?.vuePour(de);
        if (v) this.ctx.sendMessage({ t: 'vue', vue: v }, de);
        return;
      }
      if (data.t === 'entree') { this.moteur?.entrer(de, data.patch ?? {}); return; }
      if (data.t === 'dash') { this.moteur?.dasher(de); return; }
      if (data.t === 'pouvoir') { this.moteur?.utiliserBonus(de); return; }
      return;
    }
    if (de !== this.ctx.hostId) return;
    if (data.t === 'trace') this.appliquerTrace(data.trace);
    else if (data.t === 'vue') this.appliquer(data.vue);
    else if (data.t === 'fin') this.ctx.onEnd(data.info);
  }

  agir(msg) {
    if (this.estHost) {
      if (msg.t === 'entree') this.moteur?.entrer(this.ctx.me.id, msg.patch);
      else if (msg.t === 'dash') this.moteur?.dasher(this.ctx.me.id);
      else if (msg.t === 'pouvoir') this.moteur?.utiliserBonus(this.ctx.me.id);
    } else this.versHost(msg);
  }

  versHost(msg) { this.ctx.sendMessage(msg, this.ctx.hostId); }

  /* ============================== entrées ============================== */

  brancherEntrees() {
    // `e.key` pour les lettres : sur AZERTY, la touche marquée Z renvoie le
    // code « KeyW ». Écouter les codes ferait jouer avec les mauvaises touches.
    this.surTouche = (e) => {
      const k = e.key;
      if (k === ' ' || k === 'Spacebar') { e.preventDefault(); if (!e.repeat) this.agir({ t: 'entree', patch: { saut: true } }); return; }
      if (k === 'Shift') { e.preventDefault(); if (!e.repeat) this.agir({ t: 'dash' }); return; }
      if (k.toLowerCase && k.toLowerCase() === 'e') { if (!e.repeat) this.agir({ t: 'pouvoir' }); return; }
      if (k === 'ArrowLeft' || k === 'ArrowRight') e.preventDefault();
      this.touches.add(k.length === 1 ? k.toLowerCase() : k);
      this.majDirection();
    };
    this.surRelache = (e) => {
      const k = e.key;
      this.touches.delete(k.length === 1 ? k.toLowerCase() : k);
      this.majDirection();
    };
    window.addEventListener('keydown', this.surTouche);
    window.addEventListener('keyup', this.surRelache);
  }

  /** N'envoie que si la direction a CHANGÉ : le coût serveur suit le nombre de messages. */
  majDirection() {
    const k = this.touches;
    const gauche = k.has('ArrowLeft') || k.has('q') || k.has('a');
    const droite = k.has('ArrowRight') || k.has('d');
    const signature = `${gauche}|${droite}`;
    if (signature === this.derniereEntree) return;
    this.derniereEntree = signature;
    this.agir({ t: 'entree', patch: { gauche, droite } });
  }

  /* ============================== rendu ============================== */

  appliquerTrace(trace) {
    if (!trace) return;
    this.trace = trace;
    this.traceGraine = trace.graine;
    this._decor = null;   // le décor pré-rendu dépend du tracé
  }

  appliquer(vue) {
    const changementPhase = this.vue?.phase !== vue.phase;
    this.vue = vue;
    if (vue.phase === 'attente') return;
    if (!this.canvas || changementPhase) this.construireEcran();
    this.majBandeau();
    if (!this.raf) this.boucleRendu();
  }

  construireEcran() {
    this.canvas = h('canvas', { className: 'dl__scene', width: String(CAM_L), height: String(CAM_H) });
    this.canvasCtx = this.canvas.getContext('2d');
    this.bandeau = h('div', { className: 'dl__bandeau' });
    this.journalEl = h('div', { className: 'dl__journal' });
    this.barreEl = h('div', { className: 'dl__barre' });
    this.racine.replaceChildren(
      this.bandeau,
      h('div', { className: 'dl__sceneWrap' }, [this.canvas]),
      this.barreEl,
      this.journalEl,
    );
  }

  majBandeau() {
    const v = this.vue;
    const moi = v.moi;
    const dashPret = moi?.dashPret;
    this.bandeau.replaceChildren(
      h('strong', {}, `Manche ${v.manche}/${v.manchesTotal}`),
      v.theme ? h('span', { className: 'dl__theme' }, THEMES[v.theme]?.nom ?? '') : null,
      h('span', { className: `dl__dash${dashPret ? ' dl__dash--pret' : ''}` },
        dashPret ? '💨 Dash prêt (Maj)' : `💨 ${Math.round((moi?.dashRatio ?? 0) * 100)} %`),
      moi?.bonus ? h('span', { className: 'dl__bonus' }, `${BONUS[moi.bonus].icone} ${BONUS[moi.bonus].nom} — touche E`) : null,
      moi?.bouclier ? h('span', { className: 'dl__etat' }, '🛡️ Bouclier') : null,
      moi?.doubleSaut ? h('span', { className: 'dl__etat' }, '🦅 Double saut') : null,
      moi?.ghost ? h('span', { className: 'dl__etat' }, '👻 Ghost') : null,
      moi?.vitesse ? h('span', { className: 'dl__etat' }, '⚡ Vitesse') : null,
      h('span', { className: 'dl__cls' }, v.classement.slice(0, 4).map((j) => `${j.pseudo} ${j.points}`).join('  ·  ')),
    );

    // Barre de progression : où en est chacun sur la route.
    if (this.trace) {
      this.barreEl.replaceChildren(...(v.joueurs ?? []).map((j, i) => h('span', {
        className: 'dl__pion',
        style: `left:${Math.min(99, (j.x / this.trace.longueurTotale) * 100)}%;background:${COULEURS[i % COULEURS.length]};${j.id === this.ctx.me.id ? 'outline:2px solid #fff;' : ''}`,
        title: j.pseudo,
      })));
    }
    this.journalEl.replaceChildren(...(v.journal ?? []).slice(-3).map((l) => h('div', {}, l)));
  }

  boucleRendu() {
    const dessiner = () => {
      this.raf = requestAnimationFrame(dessiner);
      const t = performance.now();
      if (t - (this._dernier ?? 0) < FPS_MS) return;
      this._dernier = t;
      this.dessiner();
    };
    this.raf = requestAnimationFrame(dessiner);
  }

  /*
   * Décor fixe, pré-rendu une seule fois par tracé.
   *
   * Style plat à deux tons, dans l'esprit des plateformers minimalistes : le
   * ton CLAIR est l'air (la zone jouable), le ton SOMBRE est le solide. Aucun
   * dégradé, aucune texture, aucune bordure décorative — le contraste entre
   * deux aplats suffit à lire le niveau d'un coup d'œil.
   *
   * Le sol est dessiné comme une MASSE pleine descendant jusqu'en bas de
   * l'écran, pas comme une bande : c'est ce qui donne la silhouette découpée
   * de la référence, où les trous se lisent comme des puits.
   */
  calqueDecor() {
    if (this._decor) return this._decor;
    const tr = this.trace;
    const th = THEMES[tr.theme] ?? THEMES.hell;
    const c = document.createElement('canvas');
    c.width = Math.min(tr.longueurTotale + 600, 20000);
    c.height = CAM_H;
    const g = c.getContext('2d');
    const solY = (y) => CAM_H - 120 - y;

    // Tout est solide au départ ; on creusera l'air par-dessus.
    g.fillStyle = th.solide;
    g.fillRect(0, 0, c.width, CAM_H);

    // La zone jouable : une longue tranchée claire au-dessus du niveau du sol.
    g.fillStyle = th.air;
    g.fillRect(0, 0, c.width, solY(0));

    // Les plateformes : des masses sombres qui descendent jusqu'en bas.
    for (const sl of tr.sols) {
      g.fillStyle = th.solide;
      g.fillRect(sl.x, solY(sl.y), sl.l, CAM_H);
    }

    // Les checkpoints : un simple trait vertical sombre, discret mais net.
    for (const cp of tr.checkpoints) {
      g.fillStyle = th.solide;
      g.fillRect(cp.x - 2, solY(cp.y) - 62, 4, 62);
      g.fillRect(cp.x - 2, solY(cp.y) - 62, 24, 16);
    }

    // La sortie : une porte grise à sommet arrondi, comme sur la référence.
    const s = tr.sortie;
    const px = s.x; const py = solY(s.y) - s.h; const pl = s.l + 14; const ph = s.h;
    g.fillStyle = '#7a7a7a';
    this.porte(g, px - 4, py - 4, pl + 8, ph + 4);
    g.fillStyle = '#c8c8c8';
    this.porte(g, px, py, pl, ph);

    this._decor = c;
    return c;
  }

  /** Rectangle à sommet arrondi : la forme de porte de la référence. */
  porte(g, x, y, l, h) {
    const r = l / 2;
    g.beginPath();
    g.moveTo(x, y + h);
    g.lineTo(x, y + r);
    g.arcTo(x, y, x + r, y, r);
    g.arcTo(x + l, y, x + l, y + r, r);
    g.lineTo(x + l, y + h);
    g.closePath();
    g.fill();
  }

  dessiner() {
    const v = this.vue;
    const g = this.canvasCtx;
    if (!v || !g || !this.trace || !v.joueurs) return;
    const th = THEMES[v.theme] ?? THEMES.hell;
    const solY = (y) => CAM_H - 120 - y;

    const moi = v.joueurs.find((j) => j.id === this.ctx.me.id);
    const cible = Math.max(0, (moi?.x ?? 0) - CAM_L * 0.35);
    this.camX += (cible - this.camX) * 0.18;
    const cam = Math.round(this.camX);

    g.fillStyle = th.air;
    g.fillRect(0, 0, CAM_L, CAM_H);

    const nuit = v.evenement?.type === 'darkness';
    const secousse = v.evenement?.type === 'earthquake' ? (Math.random() - 0.5) * 7 : 0;

    g.save();
    g.translate(-cam + secousse, secousse * 0.5);
    g.drawImage(this.calqueDecor(), 0, 0);

    for (const p of v.pieges ?? []) this.dessinerPiege(g, p, solY, th);
    // Plateformes mobiles : mêmes masses sombres que le sol, en plus fines.
    for (const m of v.mobiles ?? []) {
      g.fillStyle = th.solide;
      g.fillRect(m.x, solY(m.y), m.l, m.h + 4);
    }
    for (const b of v.bonusAuSol ?? []) this.dessinerBonus(g, b, solY);
    for (const b of v.bombes ?? []) {
      g.fillStyle = '#111';
      g.beginPath(); g.arc(b.x, solY(b.y), b.dans < 400 ? 13 : 9, 0, Math.PI * 2); g.fill();
      if (b.dans < 400) { g.fillStyle = th.air; g.beginPath(); g.arc(b.x, solY(b.y), 4, 0, Math.PI * 2); g.fill(); }
    }
    v.joueurs.forEach((j, i) => this.dessinerJoueur(g, j, i, solY));
    for (const f of v.effets ?? []) this.dessinerEffet(g, f, solY, v.t);
    g.restore();

    if (nuit) {
      const hx = (moi?.x ?? 0) - cam; const hy = solY(moi?.y ?? 0);
      const halo = g.createRadialGradient(hx, hy, 60, hx, hy, 320);
      halo.addColorStop(0, 'rgba(0,0,0,0)');
      halo.addColorStop(1, 'rgba(0,0,0,.88)');
      g.fillStyle = halo;
      g.fillRect(0, 0, CAM_L, CAM_H);
    }

    this.dessinerIncrustations(g, v, th);
  }

  /*
   * Les pièges sont TOUJOURS en noir. C'est la seule convention du rendu :
   * noir = danger. Les joueurs, eux, gardent une couleur — il en faut bien une
   * pour les distinguer à seize. Un joueur ne peut donc jamais être confondu
   * avec un piège, ce qui compte quand la règle du jeu est « comprendre
   * pourquoi on est mort ».
   */
  dessinerPiege(g, p, solY, th) {
    const NOIR = '#151005';
    const y = solY(p.y);
    if (!p.actif && p.type !== 'fuyante' && p.type !== 'faux-sol' && p.type !== 'plaque') return;

    if (p.type === 'pics') {
      g.fillStyle = NOIR;
      const n = Math.max(2, Math.round(p.l / 16));
      const pas = p.l / n;
      for (let i = 0; i < n; i += 1) {
        const px = p.x + i * pas;
        g.beginPath(); g.moveTo(px, y); g.lineTo(px + pas / 2, y - p.h); g.lineTo(px + pas, y); g.closePath(); g.fill();
      }
    } else if (p.type === 'scie') {
      // Disque noir à dents, qui tourne : reconnaissable sans aucune couleur.
      g.save();
      g.translate(p.x + p.l / 2, y - p.h / 2);
      g.rotate((Date.now() / 110) % (Math.PI * 2));
      g.fillStyle = NOIR;
      const r = p.l / 2;
      g.beginPath();
      for (let i = 0; i < 14; i += 1) {
        const a = (i / 14) * Math.PI * 2;
        const rr = i % 2 === 0 ? r : r * 0.7;
        g[i === 0 ? 'moveTo' : 'lineTo'](Math.cos(a) * rr, Math.sin(a) * rr);
      }
      g.closePath(); g.fill();
      g.fillStyle = th.air;
      g.beginPath(); g.arc(0, 0, r * 0.22, 0, Math.PI * 2); g.fill();
      g.restore();
    } else if (p.type === 'laser') {
      if (p.imminent) {
        // Avertissement : trait fin pointillé, on a le temps de s'arrêter.
        g.fillStyle = NOIR;
        for (let k = 0; k < p.h; k += 16) g.fillRect(p.x + p.l / 2 - 1, y - p.h + k, 2, 8);
      } else {
        g.fillStyle = NOIR;
        g.fillRect(p.x, y - p.h, p.l, p.h);
      }
    } else if (p.type === 'ecraseur' || p.type === 'bloc-arme') {
      g.fillStyle = NOIR;
      g.fillRect(p.x, y - p.h, p.l, p.h);
      // Dents sous le bloc : on lit tout de suite que ça écrase.
      const n = Math.max(2, Math.round(p.l / 18));
      const pas = p.l / n;
      for (let i = 0; i < n; i += 1) {
        const px = p.x + i * pas;
        g.beginPath(); g.moveTo(px, y); g.lineTo(px + pas / 2, y + 11); g.lineTo(px + pas, y); g.closePath(); g.fill();
      }
    } else if (p.type === 'lave') {
      // Masse noire au fond de la fosse, surface dentelée : on la repère de
      // loin sans sortir de la palette à deux tons.
      const haut = solY(p.y + p.h);
      g.fillStyle = NOIR;
      g.fillRect(p.x, haut + 8, p.l, p.h);
      const n = Math.max(3, Math.round(p.l / 20));
      const pas = p.l / n;
      const onde = Math.sin(Date.now() / 260) * 3;
      for (let i = 0; i < n; i += 1) {
        const px = p.x + i * pas;
        g.beginPath();
        g.moveTo(px, haut + 9);
        g.lineTo(px + pas / 2, haut + onde);
        g.lineTo(px + pas, haut + 9);
        g.closePath(); g.fill();
      }
    } else if (p.type === 'fuyante' || p.type === 'faux-sol') {
      if (p.tombee) return;
      // Plateforme instable : masse sombre creusée d'une fente, pour la
      // distinguer d'un sol franc au premier regard.
      g.fillStyle = th.solide;
      g.fillRect(p.x, solY(p.y), p.l, p.h + 6);
      g.fillStyle = th.air;
      g.fillRect(p.x + p.l * 0.32, solY(p.y) + 4, p.l * 0.36, 3);
    } else if (p.type === 'plaque') {
      g.fillStyle = NOIR;
      g.fillRect(p.x, solY(p.y) - 5, p.l, 5);
    }
  }

  /** Bonus : pastille claire cerclée de noir, avec son emoji au centre. */
  dessinerBonus(g, b, solY) {
    const x = b.x; const y = solY(b.y);
    g.fillStyle = '#151005';
    g.beginPath(); g.arc(x, y, 15, 0, Math.PI * 2); g.fill();
    g.fillStyle = '#f4f0e6';
    g.beginPath(); g.arc(x, y, 12, 0, Math.PI * 2); g.fill();
    g.font = '15px sans-serif'; g.textAlign = 'center'; g.textBaseline = 'middle';
    g.fillText(BONUS[b.type]?.icone ?? '?', x, y + 1);
  }

  /**
   * Silhouette du joueur : corps compact et deux jambes, comme sur la
   * référence. Le personnage reste minuscule par rapport à l'écran — c'est ce
   * rapport d'échelle qui donne le sentiment d'un niveau vaste.
   */
  dessinerJoueur(g, j, i, solY) {
    const x = j.x; const y = solY(j.y);
    const couleur = COULEURS[i % COULEURS.length];
    const moi = j.id === this.ctx.me.id;
    const L = JOUEUR_L * 0.55;          // silhouette élancée, comme la référence
    const H = JOUEUR_H;
    const gx = x + (JOUEUR_L - L) / 2;

    g.save();
    g.globalAlpha = j.mort ? 0.2 : (j.ghost ? 0.45 : 1);

    // Corps : un bloc à épaules arrondies, occupant le haut de la silhouette.
    g.fillStyle = moi ? '#111005' : couleur;
    const jambesH = H * 0.34;          // les jambes doivent SE VOIR
    const corpsBas = y - jambesH;
    g.beginPath();
    g.moveTo(gx, corpsBas);
    g.lineTo(gx, y - H + L * 0.5);
    g.arcTo(gx, y - H, gx + L / 2, y - H, L * 0.5);
    g.arcTo(gx + L, y - H, gx + L, y - H + L * 0.5, L * 0.5);
    g.lineTo(gx + L, corpsBas);
    g.closePath();
    g.fill();
    // Deux jambes séparées par une fente bien nette : c'est ce qui donne la
    // silhouette humaine reconnaissable de la référence, même en tout petit.
    const jl = L * 0.36;
    g.fillRect(gx, corpsBas, jl, jambesH);
    g.fillRect(gx + L - jl, corpsBas, jl, jambesH);

    // Le joueur courant porte un liseré clair : on se retrouve d'un coup d'œil.
    if (moi) {
      g.strokeStyle = '#fff'; g.lineWidth = 2;
      g.strokeRect(gx - 3, y - H - 2, L + 6, H + 4);
    }
    if (j.dash) {
      g.fillStyle = moi ? '#111005' : couleur;
      g.globalAlpha *= 0.35;
      for (let k = 1; k <= 3; k += 1) g.fillRect(gx - j.regard * k * 11, y - corpsH, L, corpsH);
      g.globalAlpha = j.mort ? 0.2 : 1;
    }
    if (j.bouclier) {
      g.strokeStyle = '#151005'; g.lineWidth = 2.5;
      g.beginPath(); g.arc(gx + L / 2, y - H / 2, H * 0.78, 0, Math.PI * 2); g.stroke();
    }
    if (j.gele) {
      g.strokeStyle = '#f4f0e6'; g.lineWidth = 3;
      g.strokeRect(gx - 4, y - H - 4, L + 8, H + 8);
    }
    g.globalAlpha = 1;

    g.fillStyle = '#151005';
    g.font = '11px system-ui, sans-serif'; g.textAlign = 'center';
    g.fillText(j.pseudo.slice(0, 12), gx + L / 2, y - H - 10);
    g.restore();
  }

  dessinerEffet(g, f, solY, t) {
    const age = (t - f.at) / 800;
    if (age > 1) return;
    g.save();
    g.globalAlpha = (1 - age) * 0.8;
    g.strokeStyle = '#151005';
    g.lineWidth = 3 * (1 - age);
    g.beginPath(); g.arc(f.x, solY(f.y), 10 + age * 55, 0, Math.PI * 2); g.stroke();
    g.restore();
  }

  /** Messages par-dessus la scène, dans la même économie de moyens. */
  dessinerIncrustations(g, v, th) {
    g.textAlign = 'center';
    const NOIR = '#151005';
    if (v.phase === 'decompte') {
      const s = Math.ceil(v.decompte / 1000);
      g.fillStyle = 'rgba(21,16,5,.35)'; g.fillRect(0, 0, CAM_L, CAM_H);
      g.fillStyle = NOIR; g.font = 'bold 96px system-ui, sans-serif';
      g.fillText(s > 0 ? String(s) : 'GO', CAM_L / 2, CAM_H / 2 + 32);
      return;
    }
    if (v.annonce) {
      g.fillStyle = NOIR; g.font = 'bold 24px system-ui, sans-serif';
      g.fillText(`${v.annonce.type.toUpperCase()} — ${Math.ceil(v.annonce.dans / 1000)}`, CAM_L / 2, 50);
    } else if (v.evenement) {
      g.fillStyle = NOIR; g.font = 'bold 24px system-ui, sans-serif';
      g.fillText(v.evenement.nom.toUpperCase(), CAM_L / 2, 50);
    }
    const moi = v.moi;
    if (moi?.mort) {
      g.fillStyle = 'rgba(21,16,5,.82)'; g.fillRect(0, CAM_H / 2 - 66, CAM_L, 132);
      g.fillStyle = th.air; g.font = 'bold 29px system-ui, sans-serif';
      g.fillText(CAUSES[moi.causeMort] ?? '💀 Éliminé', CAM_L / 2, CAM_H / 2 - 8);
      g.font = '16px system-ui, sans-serif';
      g.fillText(`Retour au checkpoint dans ${(moi.respawnDans / 1000).toFixed(1)} s`, CAM_L / 2, CAM_H / 2 + 28);
    } else if (moi?.arrive) {
      g.fillStyle = 'rgba(21,16,5,.82)'; g.fillRect(0, CAM_H / 2 - 56, CAM_L, 112);
      g.fillStyle = th.air; g.font = 'bold 34px system-ui, sans-serif';
      g.fillText(`${moi.rang}${moi.rang === 1 ? 'er' : 'e'}`, CAM_L / 2, CAM_H / 2 + 12);
    }
    if (v.phase === 'fin-manche' || v.phase === 'fin') {
      g.fillStyle = 'rgba(21,16,5,.9)'; g.fillRect(0, 0, CAM_L, CAM_H);
      g.fillStyle = th.air; g.font = 'bold 28px system-ui, sans-serif';
      g.fillText(v.phase === 'fin'
        ? (v.vainqueur ? `${v.vainqueur.pseudo} remporte Devil Level` : 'Partie terminée')
        : `Fin de la manche ${v.manche}`, CAM_L / 2, 118);
      g.font = '18px system-ui, sans-serif';
      v.classement.slice(0, 8).forEach((j, i) => {
        g.fillStyle = i === 0 ? '#fff' : th.air;
        g.fillText(`${i + 1}. ${j.pseudo} — ${j.points} pts`, CAM_L / 2, 176 + i * 31);
      });
    }
  }
}

const CSS = `
.dl{height:100%;display:flex;flex-direction:column;gap:8px;color:var(--text,#e8ecff);font-family:inherit}
.dl *{box-sizing:border-box}
.dl__centre{flex:1;display:flex;align-items:center;justify-content:center;min-height:0}
.dl__panneau{background:var(--glass,rgba(255,255,255,.05));border:1px solid var(--glass-border,rgba(255,255,255,.12));border-radius:16px;padding:22px;display:flex;flex-direction:column;gap:14px}
.dl__reglages{width:min(560px,100%);text-align:center;align-items:center;max-height:100%;overflow-y:auto}
.dl__titre{margin:0;font-size:1.5rem}
.dl__soustitre{margin:0;font-size:.86rem;color:var(--text-dim,#aab)}
.dl__reglage{display:flex;flex-direction:column;gap:8px;align-items:center;width:100%}
.dl__reglage label{font-size:.72rem;text-transform:uppercase;letter-spacing:.06em;color:var(--text-dim,#aab)}
.dl__seg{display:flex;gap:6px;flex-wrap:wrap;justify-content:center}
.dl__segbtn{padding:8px 14px;border-radius:999px;border:1px solid var(--glass-border,rgba(255,255,255,.16));background:rgba(255,255,255,.05);color:inherit;font-weight:700;font-size:.82rem;cursor:pointer}
.dl__segbtn--actif{background:#feb854;color:#151005;border-color:#996b07}
.dl__aide{display:flex;flex-direction:column;gap:3px;font-size:.84rem}
.dl__btn{padding:11px 26px;border-radius:999px;border:none;font-weight:800;font-size:1rem;cursor:pointer}
.dl__btn--jouer{background:#feb854;color:#151005}
.dl__bandeau{display:flex;align-items:center;gap:12px;flex-wrap:wrap;font-size:.8rem;padding:7px 12px;border-radius:12px;background:rgba(0,0,0,.32);border:1px solid var(--glass-border,rgba(255,255,255,.1))}
.dl__theme{color:var(--text-dim,#aab)}
.dl__dash{padding:2px 9px;border-radius:999px;background:rgba(255,255,255,.08);font-weight:700}
.dl__dash--pret{background:rgba(255,209,102,.22);color:#ffd166}
.dl__bonus{padding:2px 9px;border-radius:999px;background:rgba(102,209,122,.2);color:#66d17a;font-weight:700}
.dl__etat{padding:2px 8px;border-radius:999px;background:rgba(255,255,255,.08);font-size:.74rem}
.dl__cls{margin-left:auto;color:var(--text-dim,#aab);font-size:.76rem}
.dl__sceneWrap{flex:1;min-height:0;display:flex;align-items:center;justify-content:center}
/* La scène a un ratio fixe : la limite de hauteur vit DANS la largeur, jamais
   en max-height — sinon le navigateur étirerait le dessin. */
.dl__scene{width:min(100%,158vh);aspect-ratio:9/5;border-radius:4px;background:#feb854;image-rendering:pixelated}
.dl__barre{position:relative;height:12px;border-radius:999px;background:rgba(255,255,255,.07);border:1px solid var(--glass-border,rgba(255,255,255,.1))}
.dl__pion{position:absolute;top:1px;width:8px;height:8px;border-radius:50%;transition:left .15s linear}
.dl__journal{font-size:.76rem;color:var(--text-dim,#aab);text-align:center;min-height:3em}
@media (max-width:760px){ .dl__scene{width:min(100%,120vh)} .dl__bandeau{font-size:.72rem} }
`;

let instance = null;
export default {
  get _moteur() { return instance?.moteur ?? null; },
  async mount(container, context) {
    instance = new DevilLevelUI(container, context);
    instance.mount();
  },
  async unmount() {
    instance?.unmount();
    instance = null;
  },
};
