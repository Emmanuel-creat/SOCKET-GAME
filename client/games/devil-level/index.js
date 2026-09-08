/**
 * Devil Level — interface (canevas + réseau).
 *
 * Host-autoritaire : le Host fait tourner le moteur et diffuse l'état ; les
 * invités envoient leurs intentions. Le TRACÉ du niveau n'est transmis
 * qu'une fois par manche — le réutiliser évite d'envoyer des centaines de
 * plateformes trente fois par seconde.
 *
 * Contrôles (AZERTY) : Q et D pour se déplacer, Z pour sauter, Maj pour le
 * dash, E pour utiliser un bonus offensif. Les flèches et Espace restent
 * acceptés comme secours. Les lettres sont lues via `e.key` (la lettre
 * réellement produite) et non `e.code`, sans quoi un clavier AZERTY
 * jouerait avec les mauvaises touches.
 */

import {
  DevilLevelEngine, TICK_MS, JOUEUR_L, JOUEUR_H,
  BONUS, THEMES, MANCHES_DEFAUT,
} from './engine.js';
import { LEGENDE, verifierCarte, chargerCatalogue, CARTE_SECOURS, carteParNom } from './cartes.js';

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

/**
 * Format d'un chronomètre en millisecondes → « mm:ss.cs ».
 * Deux décimales suffisent pour un run de plateforme — au-delà, l'affichage
 * scintille sans que l'œil suive.
 */
function formaterChrono(ms) {
  const total = Math.max(0, Math.floor(ms));
  const min = Math.floor(total / 60000);
  const sec = Math.floor((total % 60000) / 1000);
  const cs = Math.floor((total % 1000) / 10);
  const pad = (n, w) => String(n).padStart(w, '0');
  return `${min}:${pad(sec, 2)}.${pad(cs, 2)}`;
}

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
    // Interrupteurs de manche : présents dans le menu, ils s'appliquent à
    // TOUTES les manches à venir. Par défaut, on garde la formule complète.
    this.bonusActifs = true;
    this.evenementsActifs = true;
    this.catalogue = [];        // rempli depuis assets/cartes.txt
    this.cartesChoisies = [];
    this.carteCustom = null;
    this.alerteCatalogue = null;
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
    if (this.estHost) this.chargerEtAfficher();
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
          h('label', {}, '🎁 Bonus sur la carte'),
          h('div', { className: 'dl__seg' }, [
            h('button', {
              type: 'button',
              className: `dl__segbtn${this.bonusActifs ? ' dl__segbtn--actif' : ''}`,
              onClick: () => { this.bonusActifs = true; refaire(); },
            }, 'Oui'),
            h('button', {
              type: 'button',
              className: `dl__segbtn${!this.bonusActifs ? ' dl__segbtn--actif' : ''}`,
              onClick: () => { this.bonusActifs = false; refaire(); },
            }, 'Non'),
          ]),
        ]),
        h('div', { className: 'dl__reglage' }, [
          h('label', {}, '⚠️ Événements (Darkness, Chaos…)'),
          h('div', { className: 'dl__seg' }, [
            h('button', {
              type: 'button',
              className: `dl__segbtn${this.evenementsActifs ? ' dl__segbtn--actif' : ''}`,
              onClick: () => { this.evenementsActifs = true; refaire(); },
            }, 'Oui'),
            h('button', {
              type: 'button',
              className: `dl__segbtn${!this.evenementsActifs ? ' dl__segbtn--actif' : ''}`,
              onClick: () => { this.evenementsActifs = false; refaire(); },
            }, 'Non'),
          ]),
        ]),
        h('div', { className: 'dl__reglage' }, [
          h('label', {}, 'Cartes jouées'),
          h('div', { className: 'dl__seg dl__seg--themes' }, this.catalogue.map((c) => h('button', {
            type: 'button',
            className: `dl__segbtn${this.cartesChoisies.includes(c.nom) ? ' dl__segbtn--actif' : ''}`,
            title: c.auteur ? `${c.nom} — ${c.auteur}` : c.nom,
            onClick: () => {
              // On peut en cocher plusieurs : elles s'enchaînent manche après
              // manche. Décocher la dernière n'est pas permis — il faut bien
              // une carte à jouer.
              const i = this.cartesChoisies.indexOf(c.nom);
              if (i >= 0) { if (this.cartesChoisies.length > 1) this.cartesChoisies.splice(i, 1); }
              else this.cartesChoisies.push(c.nom);
              refaire();
            },
          }, c.auteur ? `${c.nom} · ${c.auteur}` : c.nom))),
          this.alerteCatalogue ? h('div', { className: 'dl__retour dl__retour--ko' }, `⚠️ ${this.alerteCatalogue}`) : null,
          h('p', { className: 'dl__aide-note' },
            'Les cartes viennent de assets/cartes.txt — ajoute-les-y, elles apparaîtront ici.'),
        ]),
        h('details', { className: 'dl__perso' }, [
          h('summary', {}, '✏️ Écrire ma propre carte'),
          h('p', { className: 'dl__aide-note' },
            'Une ligne = une rangée de tuiles, la première ligne est le haut du niveau. '
            + '« P » le départ et « D » la sortie sont obligatoires.'),
          h('div', { className: 'dl__legende' }, this.legendeLisible()),
          this.zoneCarte = h('textarea', {
            className: 'dl__textarea', rows: '10', spellcheck: 'false',
            placeholder: '        D\n P   ====\n#########',
          }),
          h('div', { className: 'dl__perso-actions' }, [
            h('button', { type: 'button', className: 'dl__segbtn', onClick: () => this.verifierSaisie() }, '✓ Vérifier'),
            h('button', { type: 'button', className: 'dl__segbtn', onClick: () => this.utiliserSaisie() }, '▶️ Jouer ma carte'),
          ]),
          this.retourCarte = h('div', { className: 'dl__retour' }),
        ]),
        h('div', { className: 'dl__aide' }, [
          h('div', {}, [h('b', {}, 'Q D'), ' se déplacer  (ou ← →)']),
          h('div', {}, [h('b', {}, 'Z'), ' sauter  (ou Espace)']),
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

  /**
   * Charge le catalogue depuis la ressource, puis affiche les réglages.
   *
   * Si le fichier est absent ou illisible, on ne bloque PAS : une carte de
   * secours embarquée prend le relais et le problème est affiché. Mieux vaut
   * un niveau jouable et un message clair qu'un écran mort.
   */
  async chargerEtAfficher() {
    this.message('⏳ Chargement des cartes…');
    try {
      const { cartes, erreurs } = await chargerCatalogue();
      this.catalogue = cartes;
      if (erreurs.length) this.alerteCatalogue = erreurs.join(' ');
      if (!cartes.length) {
        this.catalogue = [CARTE_SECOURS];
        this.alerteCatalogue = 'Aucune carte valide dans le catalogue — carte de secours utilisée.';
      }
    } catch (err) {
      this.catalogue = [CARTE_SECOURS];
      this.alerteCatalogue = `${err.message} Carte de secours utilisée.`;
    }
    this.cartesChoisies = [this.catalogue[0].nom];
    this.ecranReglages();
  }

  /** Légende affichée dans l'éditeur, groupée par famille. */
  legendeLisible() {
    const familles = [
      ['Terrain', ['#', '=', 'Z', 'r', 'b', 'i', 'c', 's', 'o', 'w', 'B', 'M', 'V', 'l']],
      ['Dangers', ['^', '*', '!', 'T', '~', 'x']],
      ['Sabotage', ['O', '|']],
      ['Parcours', ['P', 'K', 'D', 't', 'g']],
      ['Bonus', ['C', '1', '2', '3', '4', '5', '6', '7', '8']],
    ];
    return familles.map(([titre, chars]) => h('div', { className: 'dl__legende-fam' }, [
      h('b', {}, titre),
      ...chars.map((c) => h('span', { className: 'dl__legende-item' }, `${c} ${LEGENDE[c]?.nom ?? ''}`)),
    ]));
  }

  /** Lit la zone de saisie et la transforme en carte. */
  carteSaisie() {
    const texte = this.zoneCarte?.value ?? '';
    const grille = texte.replace(/\r/g, '').split('\n');
    // On retire les lignes vides du DÉBUT et de la FIN seulement : celles du
    // milieu font partie du niveau (ce sont des rangées d'air).
    while (grille.length && grille[0].trim() === '') grille.shift();
    while (grille.length && grille[grille.length - 1].trim() === '') grille.pop();
    return { nom: 'Ma carte', theme: 'hell', grille };
  }

  verifierSaisie() {
    const carte = this.carteSaisie();
    if (!carte.grille.length) { this.direRetour('La zone est vide.', false); return null; }
    const r = verifierCarte(carte);
    if (!r.ok) { this.direRetour(r.erreur, false); return null; }
    const n = r.niveau;
    const av = r.avertissements.length ? ` — ${r.avertissements.join(' ')}` : '';
    this.direRetour(`Carte valide : ${n.largeur}×${n.hauteur}, ${n.checkpoints.length} checkpoint(s), ${n.bonus.length} bonus.${av}`, true);
    return carte;
  }

  utiliserSaisie() {
    const carte = this.verifierSaisie();
    if (!carte) return;
    this.carteCustom = carte;
    this.lancer();
  }

  direRetour(texte, bon) {
    if (!this.retourCarte) return;
    this.retourCarte.textContent = (bon ? '✅ ' : '⚠️ ') + texte;
    this.retourCarte.className = `dl__retour${bon ? ' dl__retour--ok' : ' dl__retour--ko'}`;
  }

  lancer() {
    try {
      // On pioche par NOM dans le catalogue : c'est la clé qu'écrit l'auteur
      // de la carte, et donc celle qui doit servir partout.
      const cartes = this.carteCustom
        ? [this.carteCustom]
        : this.cartesChoisies.map((nom) => carteParNom(this.catalogue, nom)).filter(Boolean);
      if (!cartes.length) { this.message('⚠️ Aucune carte sélectionnée.'); return; }
      // Mode solo dès qu'il n'y a qu'un joueur : le moteur retire alors le
      // filet des 100 s, sans quoi la course serait coupée d'office.
      const solo = (this.ctx.players?.length ?? 1) <= 1;
      this.moteur = new DevilLevelEngine(this.ctx.players, {
        manches: this.manches, cartes, solo,
        bonusActifs: this.bonusActifs,
        evenementsActifs: this.evenementsActifs,
      });
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
    // Mapping AZERTY : Q gauche, D droite, Z saut, A dash, Maj bonus.
    // Les flèches et Espace restent acceptés en secours pour ne fâcher personne.
    // `e.key` (et non `e.code`) : sur AZERTY, la touche marquée Z renvoie le
    // code « KeyW » — écouter les codes ferait jouer avec les mauvaises touches.
    const estSaut = (k, kl) => (k === ' ' || k === 'Spacebar' || kl === 'z');
    this.surTouche = (e) => {
      const k = e.key;
      const kl = k.length === 1 ? k.toLowerCase() : k;
      if (estSaut(k, kl)) {
        e.preventDefault();
        if (!e.repeat) this.agir({ t: 'entree', patch: { saut: true } });
        return;
      }
      if (k === 'Shift') { e.preventDefault(); if (!e.repeat) this.agir({ t: 'dash' }); return; }
      if (kl === 'e') { e.preventDefault(); if (!e.repeat) this.agir({ t: 'pouvoir' }); return; }
      if (k === 'ArrowLeft' || k === 'ArrowRight') e.preventDefault();
      this.touches.add(kl);
      this.majDirection();
    };
    // Sur relâchement, la seule touche à annoncer explicitement est le saut :
    // le moteur lit `entree.saut` en continu (pour l'ascension d'échelle) et
    // reste bloqué en montée sans un signal de fin.
    this.surRelache = (e) => {
      const k = e.key;
      const kl = k.length === 1 ? k.toLowerCase() : k;
      if (estSaut(k, kl)) { this.agir({ t: 'entree', patch: { saut: false } }); return; }
      this.touches.delete(kl);
      this.majDirection();
    };
    window.addEventListener('keydown', this.surTouche);
    window.addEventListener('keyup', this.surRelache);
  }

  /** N'envoie que si la direction a CHANGÉ : le coût serveur suit le nombre de messages. */
  majDirection() {
    const k = this.touches;
    // « a » a changé de rôle (dash), il ne mappe donc PLUS vers gauche : le
    // laisser dans la liste dashferait un pas de côté involontaire à chaque dash.
    const gauche = k.has('ArrowLeft') || k.has('q');
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
    // replaceChildren() convertit toute valeur non-Node en texte : un `null`
    // apparaîtrait littéralement comme « null » dans la barre. On filtre donc
    // avant d'assigner les enfants.
    // Chrono : le temps final quand on est arrivé (figé), sinon le temps qui
    // coule pendant la course. Aucun affichage avant le « GO ! ».
    const msChrono = moi?.arrive ? (moi.temps ?? 0) : (v.chrono ?? 0);
    const chronoVisible = moi?.arrive || v.phase === 'course';
    this.bandeau.replaceChildren(...[
      h('strong', {}, `Manche ${v.manche}/${v.manchesTotal}`),
      v.theme ? h('span', { className: 'dl__theme' }, THEMES[v.theme]?.nom ?? '') : null,
      chronoVisible ? h('span', { className: `dl__chrono${moi?.arrive ? ' dl__chrono--fini' : ''}` },
        `⏱️ ${formaterChrono(msChrono)}`) : null,
      h('span', { className: `dl__dash${dashPret ? ' dl__dash--pret' : ''}` },
        dashPret ? '💨 Dash prêt (Maj)' : `💨 ${Math.round((moi?.dashRatio ?? 0) * 100)} %`),
      moi?.bonus ? h('span', { className: 'dl__bonus' }, `${BONUS[moi.bonus].icone} ${BONUS[moi.bonus].nom} — touche E`) : null,
      moi?.bouclier ? h('span', { className: 'dl__etat' }, '🛡️ Bouclier') : null,
      moi?.doubleSaut ? h('span', { className: 'dl__etat' }, '🦅 Double saut') : null,
      moi?.ghost ? h('span', { className: 'dl__etat' }, '👻 Ghost') : null,
      moi?.vitesse ? h('span', { className: 'dl__etat' }, '⚡ Vitesse') : null,
      h('span', { className: 'dl__cls' }, v.classement.slice(0, 4).map((j) => `${j.pseudo} ${j.points}`).join('  ·  ')),
    ].filter(Boolean));

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
  /*
  /* ============================== décor ============================== */

  /**
   * Fond en parallaxe : ciel dégradé, nuages, deux rangs de collines.
   *
   * Il est peint À CHAQUE IMAGE mais ne coûte presque rien — quelques formes
   * pleines — alors qu'il doit défiler à des vitesses différentes du terrain.
   * Le mettre en cache imposerait de le redessiner à chaque déplacement de
   * caméra, ce qui reviendrait au même en plus compliqué.
   */
  dessinerFond(g, th, cx) {
    const ciel = g.createLinearGradient(0, 0, 0, CAM_H);
    ciel.addColorStop(0, th.cielHaut);
    ciel.addColorStop(1, th.cielBas);
    g.fillStyle = ciel;
    g.fillRect(0, 0, CAM_L, CAM_H);

    // Nuages : très lents (parallaxe lointaine), posés à des hauteurs fixes.
    g.fillStyle = 'rgba(255,255,255,.92)';
    for (let i = 0; i < 7; i += 1) {
      const base = i * 460;
      const x = ((base - cx * 0.12) % (CAM_L + 900) + CAM_L + 900) % (CAM_L + 900) - 220;
      const y = 40 + ((i * 67) % 130);
      this.nuage(g, x, y, 0.7 + ((i * 13) % 7) / 12);
    }

    // Collines : deux rangs, celui du fond plus lent et plus pâle.
    this.collines(g, th.collineLoin, cx * 0.25, CAM_H * 0.62, 190, 330, 0.85);
    this.collines(g, th.collinePres, cx * 0.45, CAM_H * 0.70, 240, 250, 1);
  }

  nuage(g, x, y, e) {
    g.save();
    g.translate(x, y); g.scale(e, e);
    g.beginPath();
    g.arc(0, 0, 26, 0, Math.PI * 2);
    g.arc(30, -10, 34, 0, Math.PI * 2);
    g.arc(66, 2, 24, 0, Math.PI * 2);
    g.rect(0, 0, 66, 26);
    g.fill();
    g.restore();
  }

  collines(g, couleur, decalage, base, hauteur, espacement, alpha) {
    g.save();
    g.globalAlpha = alpha;
    g.fillStyle = couleur;
    const debut = -((decalage % espacement) + espacement) % espacement;
    for (let x = debut - espacement; x < CAM_L + espacement; x += espacement) {
      g.beginPath();
      g.moveTo(x, base + hauteur);
      g.lineTo(x + espacement / 2, base);
      g.lineTo(x + espacement, base + hauteur);
      g.closePath();
      g.fill();
    }
    g.fillRect(0, base + hauteur - 2, CAM_L, CAM_H - base - hauteur + 4);
    g.restore();
  }

  /**
   * Terrain, pré-rendu une fois par carte à partir de la matrice.
   *
   * Chaque bloc plein reçoit une couronne d'herbe SEULEMENT si rien ne le
   * surmonte : c'est ce détail qui distingue une masse de terre d'un empilement
   * de cubes, et c'est ce que fait la référence.
   */
  calqueDecor() {
    if (this._decor) return this._decor;
    const tr = this.trace;
    const th = THEMES[tr.theme] ?? THEMES.prairie;
    const T = tr.tuile;
    const c = document.createElement('canvas');
    c.width = Math.min(tr.largeur * T + 200, 20000);
    c.height = tr.hauteur * T;
    const g = c.getContext('2d');
    const versEcran = (lx, ly) => [lx * T, ly * T];
    const plein = (lx, ly) => {
      const d = LEGENDE[(tr.grille[ly] ?? '')[lx] ?? ' '];
      return !!(d && d.solide && !d.mortel);
    };

    for (let ly = 0; ly < tr.hauteur; ly += 1) {
      const ligne = tr.grille[ly] ?? '';
      for (let lx = 0; lx < tr.largeur; lx += 1) {
        const ch = ligne[lx] ?? ' ';
        const def = LEGENDE[ch];
        if (!def) continue;
        const [px, py] = versEcran(lx, ly);

        // Les tuiles animées ou porteuses d'état sont peintes à chaque image.
        if (def.mobile || def.cyclique || def.ecraseur || def.temporise || def.blocArme
          || def.fuyante || def.fauxSol || def.cassable || def.invisible || def.plaque
          || def.bonus || def.depart || def.sortie || def.checkpoint) continue;

        if (def.mortel) { this.tuileDanger(g, ch, px, py, T, def.demi ? T / 2 : T, th); continue; }
        if (def.echelle) { this.echelle(g, px, py, T, th); continue; }
        if (def.teleporteur || def.gravite) { this.mecanisme(g, px, py, T, th, !!def.gravite); continue; }
        if (def.plateforme) { this.plateforme(g, px, py + T / 2, T, T / 2, th); continue; }

        this.blocTerre(g, px, py, T, th, !plein(lx, ly - 1), ch);
      }
    }

    for (const cp of tr.checkpoints) {
      const px = (cp.x / T) * T; const py = c.height - cp.y - T;
      this.drapeau(g, px, py, T, th);
    }
    const so = tr.sortie;
    this.tuyau(g, so.x, c.height - so.y - T, T, th);

    this._decor = c;
    return c;
  }

  /** Bloc de terre : couronne d'herbe si rien ne le surmonte, joints sinon. */
  blocTerre(g, px, py, T, th, couronne, ch) {
    const def = LEGENDE[ch];
    g.fillStyle = th.terre;
    g.fillRect(px, py, T, T);
    // Joints en briques, décalés d'une rangée sur deux.
    g.fillStyle = th.terreJoint;
    const dec = ((py / T) % 2) * (T / 2);
    g.fillRect(px, py + T / 2 - 1, T, 2);
    g.fillRect(px + dec, py, 2, T / 2);
    g.fillRect(px + ((dec + T / 2) % T), py + T / 2, 2, T / 2);

    if (couronne) {
      g.fillStyle = th.herbe;
      g.fillRect(px, py, T, T * 0.3);
      // Frange irrégulière : le bord d'herbe ne doit pas être une ligne droite.
      g.beginPath();
      for (let i = 0; i <= 4; i += 1) {
        const x = px + (i * T) / 4;
        g.lineTo(x, py + T * 0.3 + (i % 2 ? 5 : 0));
      }
      g.lineTo(px + T, py + T * 0.3);
      g.lineTo(px, py + T * 0.3);
      g.closePath();
      g.fill();
      g.fillStyle = th.herbeOmbre;
      g.fillRect(px, py + T * 0.3 + 4, T, 3);
    }
    // Les blocs spéciaux gardent leur marque, par-dessus la texture.
    if (def?.glace) { g.fillStyle = 'rgba(255,255,255,.55)'; g.fillRect(px + 5, py + 5, T - 10, 4); }
    if (def?.collant) { g.fillStyle = th.socle; for (let k = 6; k < T - 4; k += 9) g.fillRect(px + k, py + 6, 4, 4); }
    if (def?.mou) { g.fillStyle = 'rgba(255,255,255,.4)'; g.fillRect(px + 5, py + 6, T - 10, 3); g.fillRect(px + 5, py + 13, T - 10, 3); }
    if (def?.rebond) {
      g.fillStyle = th.accent;
      g.beginPath(); g.moveTo(px + 7, py + T * 0.62); g.lineTo(px + T / 2, py + T * 0.2); g.lineTo(px + T - 7, py + T * 0.62); g.closePath(); g.fill();
    }
  }

  /** Plateforme : planche claire avec un liseré, posée dans le vide. */
  plateforme(g, px, py, T, h, th) {
    g.fillStyle = th.terre;
    g.fillRect(px, py, T, h);
    g.fillStyle = th.herbe;
    g.fillRect(px, py, T, 6);
    g.fillStyle = th.herbeOmbre;
    g.fillRect(px, py + h - 3, T, 3);
  }

  echelle(g, px, py, T, th) {
    g.fillStyle = th.socle;
    g.fillRect(px + T * 0.2, py, 4, T);
    g.fillRect(px + T * 0.72, py, 4, T);
    for (let k = 5; k < T; k += 12) g.fillRect(px + T * 0.2, py + k, T * 0.56, 3);
  }

  mecanisme(g, px, py, T, th, gravite) {
    g.save();
    g.strokeStyle = th.accent; g.lineWidth = 3;
    g.beginPath(); g.arc(px + T / 2, py + T / 2, T * 0.33, 0, Math.PI * 2); g.stroke();
    g.fillStyle = 'rgba(255,255,255,.35)';
    g.beginPath(); g.arc(px + T / 2, py + T / 2, T * 0.26, 0, Math.PI * 2); g.fill();
    if (gravite) {
      g.beginPath(); g.moveTo(px + T / 2, py + T * 0.28); g.lineTo(px + T / 2, py + T * 0.72); g.stroke();
      g.beginPath(); g.moveTo(px + T * 0.36, py + T * 0.56); g.lineTo(px + T / 2, py + T * 0.72); g.lineTo(px + T * 0.64, py + T * 0.56); g.stroke();
    }
    g.restore();
  }

  /** Checkpoint : un drapeau sur mât, lisible de loin. */
  drapeau(g, px, py, T, th) {
    g.fillStyle = th.socle;
    g.fillRect(px + T / 2 - 2, py - T * 1.4, 4, T * 1.4);
    g.fillStyle = th.accent;
    g.beginPath();
    g.moveTo(px + T / 2 + 2, py - T * 1.4);
    g.lineTo(px + T / 2 + T * 0.7, py - T * 1.15);
    g.lineTo(px + T / 2 + 2, py - T * 0.9);
    g.closePath(); g.fill();
  }

  /** Sortie : un tuyau, comme sur la référence. */
  tuyau(g, px, py, T, th) {
    const l = T * 1.3; const hh = T * 1.8;
    const x = px - (l - T) / 2; const y = py + T - hh;
    // Corps
    const corps = g.createLinearGradient(x, 0, x + l, 0);
    corps.addColorStop(0, th.herbeOmbre);
    corps.addColorStop(0.35, th.herbe);
    corps.addColorStop(1, th.herbeOmbre);
    g.fillStyle = corps;
    g.fillRect(x + l * 0.09, y + T * 0.42, l * 0.82, hh - T * 0.42);
    // Collerette
    g.fillStyle = corps;
    g.fillRect(x, y, l, T * 0.42);
    g.fillStyle = 'rgba(255,255,255,.45)';
    g.fillRect(x + l * 0.14, y + 4, l * 0.14, T * 0.34);
    g.strokeStyle = th.socle; g.lineWidth = 2;
    g.strokeRect(x, y, l, T * 0.42);
    g.strokeRect(x + l * 0.09, y + T * 0.42, l * 0.82, hh - T * 0.42);
  }

  tuileDanger(g, ch, px, py, T, hh, th) {
    const NOIR = '#2b2118';
    if (ch === '^') {
      // Pics métalliques, avec un reflet : on les repère sans les confondre
      // avec du décor.
      const n = 3; const pas = T / n;
      for (let i = 0; i < n; i += 1) {
        const x0 = px + i * pas;
        g.fillStyle = '#b9c4d0';
        g.beginPath(); g.moveTo(x0, py + hh); g.lineTo(x0 + pas / 2, py); g.lineTo(x0 + pas, py + hh); g.closePath(); g.fill();
        g.fillStyle = '#e8eef5';
        g.beginPath(); g.moveTo(x0 + pas * 0.18, py + hh); g.lineTo(x0 + pas / 2, py); g.lineTo(x0 + pas * 0.5, py + hh); g.closePath(); g.fill();
        g.strokeStyle = NOIR; g.lineWidth = 1.5;
        g.beginPath(); g.moveTo(x0, py + hh); g.lineTo(x0 + pas / 2, py); g.lineTo(x0 + pas, py + hh); g.stroke();
      }
    } else if (ch === '~') {
      const onde = Math.sin(Date.now() / 260 + px * 0.02) * 3;
      const lave = g.createLinearGradient(0, py, 0, py + hh);
      lave.addColorStop(0, '#ffd166');
      lave.addColorStop(0.4, '#ff6a2e');
      lave.addColorStop(1, '#a32410');
      g.fillStyle = lave;
      g.fillRect(px, py + 6, T, hh - 6);
      g.beginPath();
      g.moveTo(px, py + 8);
      g.quadraticCurveTo(px + T / 2, py + onde, px + T, py + 8);
      g.lineTo(px + T, py + 14); g.lineTo(px, py + 14);
      g.closePath(); g.fill();
    } else {
      g.fillStyle = NOIR;
      g.fillRect(px + 4, py + 4, T - 8, hh - 8);
    }
  }

  /* ============================== rendu ============================== */

  dessiner() {
    const v = this.vue;
    const g = this.canvasCtx;
    if (!v || !g || !this.trace || !v.joueurs) return;
    const th = THEMES[v.theme] ?? THEMES.prairie;
    const T = this.trace.tuile;
    const decorH = this.trace.hauteur * T;
    const solY = (y) => decorH - y - T;

    const moi = v.joueurs.find((j) => j.id === this.ctx.me.id);
    const cibleX = Math.max(0, (moi?.x ?? 0) - CAM_L * 0.35);
    const cibleY = Math.max(0, Math.min(Math.max(0, decorH - CAM_H), solY(moi?.y ?? 0) - CAM_H * 0.55));
    this.camX += (cibleX - this.camX) * 0.18;
    this.camY = this.camY === undefined ? cibleY : this.camY + (cibleY - this.camY) * 0.14;
    const cx = Math.round(this.camX); const cy = Math.round(this.camY);

    this.dessinerFond(g, th, cx);

    const nuit = v.evenement?.type === 'darkness';
    const secousse = v.evenement?.type === 'earthquake' ? (Math.random() - 0.5) * 7 : 0;

    g.save();
    g.translate(-cx + secousse, -cy + secousse * 0.5);
    g.drawImage(this.calqueDecor(), 0, 0);

    for (const tu of v.tuiles ?? []) this.dessinerTuile(g, tu, solY, th, T);
    for (const b of v.bonusAuSol ?? []) this.dessinerBonus(g, b, solY, T, v.t);
    for (const b of v.bombes ?? []) {
      g.fillStyle = '#2b2118';
      g.beginPath(); g.arc(b.x, solY(b.y) + T / 2, b.dans < 400 ? 13 : 9, 0, Math.PI * 2); g.fill();
    }
    v.joueurs.forEach((j, i) => this.dessinerJoueur(g, j, i, solY, T, v.t));
    for (const f of v.effets ?? []) this.dessinerEffet(g, f, solY, v.t, T);
    g.restore();

    if (nuit) {
      const hx = (moi?.x ?? 0) - cx; const hy = solY(moi?.y ?? 0) - cy;
      const halo = g.createRadialGradient(hx, hy, 70, hx, hy, 330);
      halo.addColorStop(0, 'rgba(0,0,0,0)');
      halo.addColorStop(1, 'rgba(4,8,24,.9)');
      g.fillStyle = halo;
      g.fillRect(0, 0, CAM_L, CAM_H);
    }

    this.dessinerIncrustations(g, v, th);
  }

  dessinerTuile(g, tu, solY, th, T) {
    const def = LEGENDE[tu.ch];
    if (!def) return;
    const px = tu.x; const py = solY(tu.y);
    const hh = def.demi ? T / 2 : T;
    const yy = def.demi ? py + T / 2 : py;

    if (def.cyclique) {
      if (tu.actif) {
        const ray = g.createLinearGradient(px, 0, px + T, 0);
        ray.addColorStop(0, 'rgba(255,90,90,0)');
        ray.addColorStop(0.5, '#ff3d3d');
        ray.addColorStop(1, 'rgba(255,90,90,0)');
        g.fillStyle = ray;
        g.fillRect(px, py, T, T);
      } else if (tu.imminent) {
        g.fillStyle = 'rgba(255,80,80,.55)';
        for (let k = 0; k < T; k += 12) g.fillRect(px + T / 2 - 2, py + k, 4, 6);
      }
      return;
    }
    if (def.blocArme) {
      if (!tu.actif && !tu.armee) return;
      this.blocTerre(g, px, py, T, th, false, '#');
      g.fillStyle = 'rgba(0,0,0,.25)';
      g.fillRect(px, py, T, T);
      return;
    }
    if (def.ecraseur) {
      g.fillStyle = '#6b7180';
      g.fillRect(px, py, T, T);
      g.fillStyle = '#454a57';
      const n = 3; const pas = T / n;
      for (let i = 0; i < n; i += 1) {
        g.beginPath();
        g.moveTo(px + i * pas, py + T); g.lineTo(px + i * pas + pas / 2, py + T + 10); g.lineTo(px + (i + 1) * pas, py + T);
        g.closePath(); g.fill();
      }
      return;
    }
    if (def.mortel) {
      if (tu.ch === '*') {
        g.save();
        g.translate(px + T / 2, py + T / 2);
        g.rotate((Date.now() / 110) % (Math.PI * 2));
        g.fillStyle = '#c9d2dd';
        const r = T * 0.46;
        g.beginPath();
        for (let i = 0; i < 14; i += 1) {
          const a = (i / 14) * Math.PI * 2;
          const rr = i % 2 === 0 ? r : r * 0.7;
          g[i === 0 ? 'moveTo' : 'lineTo'](Math.cos(a) * rr, Math.sin(a) * rr);
        }
        g.closePath(); g.fill();
        g.strokeStyle = '#2b2118'; g.lineWidth = 1.5; g.stroke();
        g.fillStyle = '#8b95a3';
        g.beginPath(); g.arc(0, 0, r * 0.24, 0, Math.PI * 2); g.fill();
        g.restore();
      } else this.tuileDanger(g, tu.ch, px, yy, T, hh, th);
      return;
    }
    if (def.invisible && !tu.revelee) return;
    if (def.cassable && tu.cassee) return;
    if (def.temporise && !tu.actif) {
      g.strokeStyle = 'rgba(255,255,255,.5)'; g.lineWidth = 2;
      g.setLineDash([6, 5]);
      g.strokeRect(px + 2, yy + 2, T - 4, hh - 4);
      g.setLineDash([]);
      return;
    }
    if ((def.fuyante || def.fauxSol) && tu.tombee) return;

    if (def.plateforme) this.plateforme(g, px, yy, T, hh, th);
    else this.blocTerre(g, px, yy, T, th, true, tu.ch);

    if (def.fuyante || def.fauxSol) {
      // Fissure : la plateforme instable doit se distinguer d'un sol franc.
      g.strokeStyle = 'rgba(0,0,0,.35)'; g.lineWidth = 2;
      g.beginPath(); g.moveTo(px + T * 0.3, yy + 4); g.lineTo(px + T * 0.45, yy + hh - 4); g.stroke();
    }
    if (def.plaque) { g.fillStyle = th.accent; g.fillRect(px + 2, yy, T - 4, 6); }
  }

  /** Bonus : pastille lumineuse qui flotte doucement. */
  dessinerBonus(g, b, solY, T, t) {
    const flot = Math.sin(t / 420 + b.x * 0.03) * 5;
    const x = b.x; const y = solY(b.y) + T / 2 + flot;
    g.save();
    g.shadowColor = 'rgba(255,220,120,.9)'; g.shadowBlur = 14;
    g.fillStyle = '#fff6d8';
    g.beginPath(); g.arc(x, y, 15, 0, Math.PI * 2); g.fill();
    g.shadowBlur = 0;
    g.strokeStyle = '#e0a83c'; g.lineWidth = 2.5;
    g.beginPath(); g.arc(x, y, 15, 0, Math.PI * 2); g.stroke();
    g.font = '17px sans-serif'; g.textAlign = 'center'; g.textBaseline = 'middle';
    g.fillText(BONUS[b.type]?.icone ?? '?', x, y + 1);
    g.restore();
  }

  /**
   * Le joueur : son EMOJI dans un anneau à sa couleur, avec son pseudo.
   *
   * L'anneau n'est pas décoratif — à seize joueurs, deux personnes peuvent
   * très bien avoir choisi le même emoji, et c'est la couleur qui les
   * départage. Le nom, lui, tranche définitivement.
   *
   * Une légère flottaison anime le jeton quand il touche le sol ; en l'air, on
   * la coupe pour ne pas brouiller la lecture de la trajectoire de saut.
   */
  dessinerJoueur(g, j, i, solY, T, t) {
    const couleur = COULEURS[i % COULEURS.length];
    const moi = j.id === this.ctx.me.id;
    const R = 17;
    const cxj = j.x + JOUEUR_L / 2;
    const flot = j.auSol ? Math.sin(t / 300 + i * 1.4) * 3.5 : 0;
    const cyj = solY(j.y) + T - JOUEUR_H / 2 - 3 + flot;

    g.save();
    g.globalAlpha = j.mort ? 0.25 : (j.ghost ? 0.5 : 1);

    // Ombre au sol : sans elle, on juge mal la hauteur en plein saut.
    const ombreY = solY(j.y) + T + 2;
    g.fillStyle = 'rgba(0,0,0,.22)';
    g.beginPath();
    g.ellipse(cxj, ombreY, R * 0.75, R * 0.24, 0, 0, Math.PI * 2);
    g.fill();

    // Traînée de dash.
    if (j.dash) {
      g.globalAlpha *= 0.3;
      for (let k = 1; k <= 3; k += 1) {
        g.fillStyle = couleur;
        g.beginPath(); g.arc(cxj - j.regard * k * 13, cyj, R * (1 - k * 0.14), 0, Math.PI * 2); g.fill();
      }
      g.globalAlpha = j.mort ? 0.25 : 1;
    }

    // Jeton : disque clair, anneau à la couleur du joueur.
    g.beginPath(); g.arc(cxj, cyj, R, 0, Math.PI * 2);
    g.fillStyle = 'rgba(255,255,255,.94)';
    g.fill();
    g.lineWidth = moi ? 5 : 4;
    g.strokeStyle = couleur;
    g.stroke();
    if (moi) {
      // Le joueur courant porte un second liseré : on se retrouve d'un coup
      // d'œil, même au milieu de quinze autres.
      g.lineWidth = 2;
      g.strokeStyle = 'rgba(255,255,255,.95)';
      g.beginPath(); g.arc(cxj, cyj, R + 4, 0, Math.PI * 2); g.stroke();
    }

    // L'emoji du joueur.
    //
    // ⚠️ On repose une couleur de remplissage SOMBRE avant de peindre. Un emoji
    // couleur l'ignore (il porte ses propres teintes), mais si la police
    // retombe sur du texte — avatar en lettre, système sans police emoji — le
    // glyphe hériterait du blanc du disque et deviendrait invisible.
    g.fillStyle = '#22262f';
    g.font = `${Math.round(R * 1.35)}px "Apple Color Emoji","Segoe UI Emoji","Noto Color Emoji",system-ui,sans-serif`;
    g.textAlign = 'center'; g.textBaseline = 'middle';
    g.fillText(this.avatarDe(j.id), cxj, cyj + 1);

    if (j.bouclier) {
      g.strokeStyle = 'rgba(120,200,255,.95)'; g.lineWidth = 2.5;
      g.beginPath(); g.arc(cxj, cyj, R + 9, 0, Math.PI * 2); g.stroke();
    }
    if (j.gele) {
      g.fillStyle = 'rgba(160,225,255,.45)';
      g.beginPath(); g.arc(cxj, cyj, R + 6, 0, Math.PI * 2); g.fill();
    }
    g.globalAlpha = 1;

    // Le pseudo, sur une étiquette lisible quel que soit le fond.
    const nom = j.pseudo.slice(0, 12);
    g.font = 'bold 12px system-ui, sans-serif';
    const l = g.measureText(nom).width + 12;
    const ey = cyj - R - 20;
    g.fillStyle = 'rgba(20,24,34,.72)';
    this.rond(g, cxj - l / 2, ey, l, 17, 8);
    g.fillStyle = couleur;
    this.rond(g, cxj - l / 2, ey + 14, l, 3, 1.5);
    g.fillStyle = '#fff';
    g.textBaseline = 'middle';
    g.fillText(nom, cxj, ey + 8);
    g.restore();
  }

  /** Rectangle à coins arrondis, rempli. */
  rond(g, x, y, l, h, r) {
    g.beginPath();
    g.moveTo(x + r, y);
    g.arcTo(x + l, y, x + l, y + h, r);
    g.arcTo(x + l, y + h, x, y + h, r);
    g.arcTo(x, y + h, x, y, r);
    g.arcTo(x, y, x + l, y, r);
    g.closePath();
    g.fill();
  }

  /** Emoji du joueur, pris dans la liste du salon. */
  avatarDe(id) {
    if (!this._avatars) {
      this._avatars = new Map((this.ctx.players ?? []).map((p) => [p.id, p.avatar || '🙂']));
    }
    return this._avatars.get(id) ?? '🙂';
  }

  dessinerEffet(g, f, solY, t, T) {
    const age = (t - f.at) / 800;
    if (age > 1) return;
    const couleurs = {
      mort: '#ff5c5c', bonus: '#ffd166', explosion: '#ff9f43', tornade: '#8fd0ff',
      gel: '#7fd8ff', rebond: '#66d17a', dash: '#ffffff', 'double-saut': '#66d17a',
      teleport: '#c56cf0', gravite: '#8fd0ff', casse: '#c9a06a',
    };
    g.save();
    g.globalAlpha = (1 - age) * 0.85;
    g.strokeStyle = couleurs[f.type] ?? '#fff';
    g.lineWidth = 4 * (1 - age);
    g.beginPath(); g.arc(f.x, solY(f.y) + T / 2, 10 + age * 58, 0, Math.PI * 2); g.stroke();
    g.restore();
  }

  dessinerIncrustations(g, v, th) {
    g.textAlign = 'center';
    if (v.erreur) {
      g.fillStyle = 'rgba(12,16,26,.9)'; g.fillRect(0, 0, CAM_L, CAM_H);
      g.fillStyle = '#fff'; g.font = 'bold 22px system-ui, sans-serif';
      g.fillText('Carte invalide', CAM_L / 2, CAM_H / 2 - 14);
      g.font = '16px system-ui, sans-serif';
      g.fillText(v.erreur, CAM_L / 2, CAM_H / 2 + 18);
      return;
    }
    if (v.phase === 'decompte') {
      const s = Math.ceil(v.decompte / 1000);
      g.fillStyle = 'rgba(12,16,26,.42)'; g.fillRect(0, 0, CAM_L, CAM_H);
      g.fillStyle = '#fff';
      g.font = 'bold 22px system-ui, sans-serif';
      if (v.carte) g.fillText(v.carte, CAM_L / 2, CAM_H / 2 - 74);
      g.font = 'bold 96px system-ui, sans-serif';
      g.strokeStyle = 'rgba(0,0,0,.4)'; g.lineWidth = 6;
      const txt = s > 0 ? String(s) : 'GO !';
      g.strokeText(txt, CAM_L / 2, CAM_H / 2 + 32);
      g.fillText(txt, CAM_L / 2, CAM_H / 2 + 32);
      return;
    }
    if (v.annonce || v.evenement) {
      const texte = v.annonce
        ? `${v.annonce.type.toUpperCase()} — ${Math.ceil(v.annonce.dans / 1000)}`
        : v.evenement.nom.toUpperCase();
      g.font = 'bold 24px system-ui, sans-serif';
      const l = g.measureText(texte).width + 26;
      g.fillStyle = 'rgba(20,24,34,.72)';
      this.rond(g, CAM_L / 2 - l / 2, 24, l, 34, 17);
      g.fillStyle = v.annonce ? '#ffd166' : '#ff8a5c';
      g.textBaseline = 'middle';
      g.fillText(texte, CAM_L / 2, 41);
      g.textBaseline = 'alphabetic';
    }
    const moi = v.moi;
    if (moi?.mort) {
      g.fillStyle = 'rgba(12,16,26,.8)'; g.fillRect(0, CAM_H / 2 - 66, CAM_L, 132);
      g.fillStyle = '#ff8a8a'; g.font = 'bold 29px system-ui, sans-serif';
      g.fillText(CAUSES[moi.causeMort] ?? '💀 Éliminé', CAM_L / 2, CAM_H / 2 - 8);
      g.fillStyle = '#fff'; g.font = '16px system-ui, sans-serif';
      g.fillText(`Retour au checkpoint dans ${(moi.respawnDans / 1000).toFixed(1)} s`, CAM_L / 2, CAM_H / 2 + 28);
    } else if (moi?.arrive) {
      g.fillStyle = 'rgba(12,16,26,.85)'; g.fillRect(0, CAM_H / 2 - 78, CAM_L, 156);
      g.fillStyle = '#ffd166'; g.font = 'bold 34px system-ui, sans-serif';
      g.fillText(`🏁 ${moi.rang}${moi.rang === 1 ? 'er' : 'e'}`, CAM_L / 2, CAM_H / 2 - 18);
      if (moi.temps != null) {
        g.fillStyle = '#fff'; g.font = 'bold 44px ui-monospace, "SF Mono", Consolas, monospace';
        g.fillText(`⏱️  ${formaterChrono(moi.temps)}`, CAM_L / 2, CAM_H / 2 + 34);
      }
    }
    if (v.phase === 'fin-manche' || v.phase === 'fin') {
      const finPartie = v.phase === 'fin';
      g.fillStyle = 'rgba(12,16,26,.92)'; g.fillRect(0, 0, CAM_L, CAM_H);

      // Titre.
      g.fillStyle = '#fff'; g.font = 'bold 28px system-ui, sans-serif';
      g.fillText(finPartie
        ? (v.vainqueur ? `${v.vainqueur.pseudo} remporte Devil Level` : 'Partie terminée')
        : `Fin de la manche ${v.manche}${v.manchesTotal ? ' / ' + v.manchesTotal : ''}`,
        CAM_L / 2, 74);

      // Grand chrono central.
      //  — fin de manche : le temps de la MANCHE qui vient de se jouer.
      //  — fin de partie : le TOTAL cumulé sur toutes les manches.
      // Sans temps (élimination sur la dernière manche, timeout), on garde le
      // libellé mais on affiche « — » pour ne pas faire croire à un zéro.
      const ms = finPartie
        ? (moi?.tempsTotal ?? 0)
        : (moi?.temps ?? null);
      const nManches = finPartie
        ? (moi?.manchesTerminees ?? 0)
        : 1;
      g.fillStyle = '#aab'; g.font = '13px system-ui, sans-serif';
      g.fillText(finPartie
        ? `⏱️ TEMPS TOTAL (${nManches} manche${nManches > 1 ? 's' : ''} terminée${nManches > 1 ? 's' : ''})`
        : '⏱️ TEMPS DE LA MANCHE',
        CAM_L / 2, 116);
      g.font = 'bold 84px ui-monospace, "SF Mono", Consolas, monospace';
      g.fillStyle = finPartie ? '#ffd166' : '#fff';
      g.strokeStyle = 'rgba(0,0,0,.5)'; g.lineWidth = 6;
      const texteChrono = ms != null ? formaterChrono(ms) : '—';
      g.strokeText(texteChrono, CAM_L / 2, 200);
      g.fillText(texteChrono, CAM_L / 2, 200);

      // Classement compact, sous le chrono.
      g.font = '15px system-ui, sans-serif';
      v.classement.slice(0, 8).forEach((j, i) => {
        g.fillStyle = i === 0 ? '#ffd166' : '#e8ecff';
        const tCol = finPartie ? j.tempsTotal : j.meilleurTemps;
        const chrono = tCol != null && tCol > 0 ? ` · ⏱️ ${formaterChrono(tCol)}` : '';
        g.fillText(`${i + 1}. ${this.avatarDe(j.id)} ${j.pseudo} — ${j.points} pts${chrono}`, CAM_L / 2, 260 + i * 26);
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
.dl__aide-note{font-size:.74rem;color:var(--text-dim,#aab);margin:4px 0}
.dl__perso{width:100%;text-align:left;border:1px solid var(--glass-border,rgba(255,255,255,.14));border-radius:10px;padding:10px}
.dl__perso summary{cursor:pointer;font-size:.84rem;font-weight:700}
.dl__legende{display:flex;flex-direction:column;gap:5px;margin:8px 0;font-size:.7rem;color:var(--text-dim,#aab)}
.dl__legende-fam{display:flex;flex-wrap:wrap;gap:6px;align-items:baseline}
.dl__legende-item{background:rgba(255,255,255,.06);padding:1px 6px;border-radius:5px;white-space:nowrap}
.dl__textarea{width:100%;font-family:ui-monospace,monospace;font-size:12px;line-height:1.25;white-space:pre;overflow-x:auto;background:rgba(0,0,0,.35);color:#e8ecff;border:1px solid var(--glass-border,rgba(255,255,255,.16));border-radius:8px;padding:8px;tab-size:1}
.dl__perso-actions{display:flex;gap:8px;margin-top:8px}
.dl__retour{margin-top:8px;font-size:.78rem;min-height:1.2em}
.dl__retour--ok{color:#66d17a}
.dl__retour--ko{color:#ff8a8a}
.dl__btn{padding:11px 26px;border-radius:999px;border:none;font-weight:800;font-size:1rem;cursor:pointer}
.dl__btn--jouer{background:#feb854;color:#151005}
.dl__bandeau{display:flex;align-items:center;gap:12px;flex-wrap:wrap;font-size:.8rem;padding:7px 12px;border-radius:12px;background:rgba(0,0,0,.32);border:1px solid var(--glass-border,rgba(255,255,255,.1))}
.dl__theme{color:var(--text-dim,#aab)}
.dl__chrono{padding:2px 9px;border-radius:999px;background:rgba(255,255,255,.08);font-weight:700;font-variant-numeric:tabular-nums;font-family:ui-monospace,"SF Mono",Consolas,monospace;letter-spacing:.02em}
.dl__chrono--fini{background:rgba(255,209,102,.22);color:#ffd166}
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
  get _ui() { return instance; },
  async mount(container, context) {
    instance = new DevilLevelUI(container, context);
    instance.mount();
  },
  async unmount() {
    instance?.unmount();
    instance = null;
  },
};
