/**
 * easterEggs.js — trois secrets cachés dans l'interface.
 *
 *  1. Mode DVD      — après 30 s sans rien toucher sur le menu, le logo DUMB
 *                     se met à rebondir sur l'écran. La moindre interaction
 *                     l'arrête. Jamais pendant une partie.
 *  2. Konami        — ↑ ↑ ↓ ↓ ← → ← → bascule le thème caché « bio-médical »
 *                     et renomme l'arcade en DUMBGAME.
 *  3. Mode patate   — taper « patate » remplace les avatars par des pommes de
 *                     terre.
 *
 * Les deux bascules sont mémorisées dans le navigateur : elles survivent au
 * rechargement, et refaire le code les désactive.
 *
 * Ce module est autonome : il ne dépend d'aucun autre, et tout ce qu'il ajoute
 * à la page vit HORS de la grille de mise en page (leçon du menu mobile : un
 * enfant inattendu d'une grille en devient une cellule).
 */

const INACTIVITE_MS = 30_000;      // avant que le logo ne parte en vadrouille
const VITESSE_DVD = 0.12;          // en fraction de la largeur par seconde
const CLE_THEME = 'arcade:theme-bio';
const CLE_PATATE = 'arcade:mode-patate';
const NOM_SECRET = 'DUMBGAME';
const PATATE = '🥔';
const CLE_CURSEUR = 'arcade:curseur';
const CLICS_REQUIS = 10;        // clics sur le titre pour changer de curseur
const DELAI_CLICS_MS = 3000;    // au-delà, le compteur repart de zéro

/*
 * Curseurs maison. Chaque skin est un dessin vectoriel encodé directement dans
 * la feuille de style (aucun fichier à charger, donc aucun scintillement au
 * changement). `pointe` indique le pixel qui sert de point de clic : sans lui,
 * on viserait avec le coin de l'image au lieu de la pointe de l'objet.
 */
const CURSEURS = [
  { id: 'defaut', nom: 'Curseur normal', svg: null, pointe: [0, 0] },
  {
    id: 'epee', nom: '🗡️ Épée', pointe: [2, 2],
    svg: `<path d="M3 3 L7 3 L27 23 L23 27 Z" fill="#dfe6f5" stroke="#1a1f2e" stroke-width="2" stroke-linejoin="round"/>
          <path d="M18 26 L26 18 L31 23 L23 31 Z" fill="#c98a3a" stroke="#1a1f2e" stroke-width="2" stroke-linejoin="round"/>
          <circle cx="27" cy="27" r="2.5" fill="#f2c14e" stroke="#1a1f2e" stroke-width="1.5"/>`,
  },
  {
    id: 'banane', nom: '🍌 Banane', pointe: [4, 3],
    svg: `<path d="M5 4 C6 16 14 26 28 27 C18 30 6 22 4 8 Z" fill="#ffd93b" stroke="#6b5410" stroke-width="2" stroke-linejoin="round"/>
          <path d="M5 4 L4 8" stroke="#6b5410" stroke-width="3" stroke-linecap="round"/>
          <circle cx="28" cy="27" r="1.8" fill="#6b5410"/>`,
  },
  {
    id: 'baguette', nom: '🪄 Baguette magique', pointe: [3, 3],
    svg: `<path d="M4 4 L26 26" stroke="#3a2f5a" stroke-width="5" stroke-linecap="round"/>
          <path d="M4 4 L26 26" stroke="#6b5ba8" stroke-width="2.5" stroke-linecap="round"/>
          <path d="M4 4 l3.2 0.9 -0.9 3.2 -3.2 -0.9 z" fill="#ffe27a" stroke="#a8842c" stroke-width="1.2"/>
          <circle cx="13" cy="6" r="1.8" fill="#ffe27a"/><circle cx="7" cy="14" r="1.4" fill="#a9e7ff"/>
          <circle cx="19" cy="11" r="1.2" fill="#ffb3e6"/>`,
  },
  {
    id: 'patte', nom: '🐾 Patte de chat', pointe: [14, 14],
    svg: `<ellipse cx="15" cy="19" rx="8" ry="7" fill="#ffb3d1" stroke="#5c2a44" stroke-width="2"/>
          <circle cx="7" cy="11" r="3.2" fill="#ffb3d1" stroke="#5c2a44" stroke-width="1.8"/>
          <circle cx="13" cy="7" r="3.2" fill="#ffb3d1" stroke="#5c2a44" stroke-width="1.8"/>
          <circle cx="20" cy="8" r="3.2" fill="#ffb3d1" stroke="#5c2a44" stroke-width="1.8"/>
          <circle cx="25" cy="13" r="3" fill="#ffb3d1" stroke="#5c2a44" stroke-width="1.8"/>`,
  },
  {
    id: 'fusee', nom: '🚀 Fusée', pointe: [16, 2],
    svg: `<path d="M16 2 C21 8 23 15 22 22 L10 22 C9 15 11 8 16 2 Z" fill="#e9eefb" stroke="#26304a" stroke-width="2" stroke-linejoin="round"/>
          <circle cx="16" cy="12" r="3.2" fill="#4fc3f7" stroke="#26304a" stroke-width="1.6"/>
          <path d="M10 20 L5 27 L10 25 Z" fill="#ff6b6b" stroke="#26304a" stroke-width="1.6" stroke-linejoin="round"/>
          <path d="M22 20 L27 27 L22 25 Z" fill="#ff6b6b" stroke="#26304a" stroke-width="1.6" stroke-linejoin="round"/>
          <path d="M13 23 L16 31 L19 23 Z" fill="#ffb454" stroke="#26304a" stroke-width="1.4" stroke-linejoin="round"/>`,
  },
  {
    id: 'crayon', nom: '✏️ Crayon', pointe: [3, 28],
    svg: `<path d="M3 29 L6 21 L24 3 L29 8 L11 26 Z" fill="#ffd166" stroke="#4a3a12" stroke-width="2" stroke-linejoin="round"/>
          <path d="M24 3 L29 8 L26 11 L21 6 Z" fill="#ff8fa3" stroke="#4a3a12" stroke-width="1.8" stroke-linejoin="round"/>
          <path d="M3 29 L6 21 L11 26 Z" fill="#3a3a44" stroke="#4a3a12" stroke-width="1.6" stroke-linejoin="round"/>`,
  },
];

/** Encode un skin en image utilisable par la propriété CSS `cursor`. */
function urlCurseur(skin) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">${skin.svg}</svg>`;
  return `url("data:image/svg+xml,${encodeURIComponent(svg)}") ${skin.pointe[0]} ${skin.pointe[1]}, auto`;
}

/** Sélecteurs de tous les endroits où s'affiche l'avatar d'un joueur. */
const SEL_AVATARS = '.player-row__avatar, .chat-msg__avatar, .lounge-roster__avatar, #sidebar-user-avatar';

const lire = (cle) => { try { return localStorage.getItem(cle) === '1'; } catch { return false; } };
const ecrire = (cle, actif) => { try { localStorage.setItem(cle, actif ? '1' : '0'); } catch { /* stockage indisponible */ } };

/* ------------------------------------------------------------------ */
/* 1. Mode DVD                                                         */
/* ------------------------------------------------------------------ */

function initModeDVD() {
  let minuteur = null;
  let logo = null;
  let raf = null;

  /** Une partie en cours ne doit jamais être recouverte par le logo. */
  const enPartie = () => {
    const vue = document.getElementById('view-game');
    return !!vue && vue.hidden === false;
  };

  function lancer() {
    if (logo || enPartie()) return;
    logo = document.createElement('img');
    logo.src = '/assets/dumb-pastille.png';
    logo.alt = '';
    logo.className = 'dvd-logo';
    document.body.append(logo);   // hors de la grille .app, volontairement

    // Position et direction de départ, un peu aléatoires pour ne pas toujours
    // rejouer la même trajectoire.
    const taille = 128;
    let x = Math.random() * (window.innerWidth - taille);
    let y = Math.random() * (window.innerHeight - taille);
    let dx = (Math.random() < 0.5 ? -1 : 1);
    let dy = (Math.random() < 0.5 ? -1 : 1);
    let teinte = Math.floor(Math.random() * 360);
    let dernier = performance.now();

    const pas = (maintenant) => {
      const dt = Math.min(0.05, (maintenant - dernier) / 1000); // borne les gros écarts (onglet en arrière-plan)
      dernier = maintenant;
      const v = window.innerWidth * VITESSE_DVD * dt;
      x += dx * v; y += dy * v;

      const maxX = window.innerWidth - taille;
      const maxY = window.innerHeight - taille;
      let rebond = false;
      if (x <= 0) { x = 0; dx = 1; rebond = true; }
      else if (x >= maxX) { x = maxX; dx = -1; rebond = true; }
      if (y <= 0) { y = 0; dy = 1; rebond = true; }
      else if (y >= maxY) { y = maxY; dy = -1; rebond = true; }
      // Comme sur les vrais lecteurs DVD : le logo change de couleur à chaque rebond.
      if (rebond) { teinte = (teinte + 47 + Math.floor(Math.random() * 90)) % 360; }

      logo.style.transform = `translate(${Math.round(x)}px, ${Math.round(y)}px)`;
      logo.style.filter = `hue-rotate(${teinte}deg) saturate(1.4)`;
      raf = requestAnimationFrame(pas);
    };
    raf = requestAnimationFrame(pas);
  }

  function arreter() {
    if (raf) { cancelAnimationFrame(raf); raf = null; }
    logo?.remove();
    logo = null;
  }

  function reveiller() {
    if (logo) arreter();
    clearTimeout(minuteur);
    minuteur = setTimeout(lancer, INACTIVITE_MS);
  }

  ['mousemove', 'mousedown', 'keydown', 'wheel', 'touchstart', 'scroll'].forEach((ev) => {
    window.addEventListener(ev, reveiller, { passive: true });
  });
  // Onglet caché : inutile de faire tourner une animation que personne ne voit.
  document.addEventListener('visibilitychange', () => (document.hidden ? arreter() : reveiller()));
  reveiller();
}

/* ------------------------------------------------------------------ */
/* 2. Konami — thème bio-médical                                       */
/* ------------------------------------------------------------------ */

function appliquerTheme(actif) {
  document.documentElement.classList.toggle('theme-bio', actif);
  const titre = document.querySelector('.sidebar__logo-text');
  if (titre) {
    if (!titre.dataset.nomOrigine) titre.dataset.nomOrigine = titre.textContent;
    titre.textContent = actif ? NOM_SECRET : titre.dataset.nomOrigine;
  }
  document.title = actif ? `${NOM_SECRET} — by Emmanuel Bailly` : 'Arcade';
}

function annoncer(texte) {
  const bulle = document.createElement('div');
  bulle.className = 'egg-bulle';
  bulle.textContent = texte;
  document.body.append(bulle);
  setTimeout(() => bulle.remove(), 2600);
}

function initKonami() {
  const CODE = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight'];
  let avance = 0;
  appliquerTheme(lire(CLE_THEME));

  window.addEventListener('keydown', (e) => {
    // On compare la touche attendue ; toute autre flèche remet le compteur à
    // zéro, mais une touche hors séquence (frappe de texte) est ignorée pour
    // ne pas casser le code au moindre caractère tapé.
    if (e.key === CODE[avance]) {
      avance += 1;
      if (avance === CODE.length) {
        avance = 0;
        const actif = !lire(CLE_THEME);
        ecrire(CLE_THEME, actif);
        appliquerTheme(actif);
        annoncer(actif ? `🧬 Thème bio-médical débloqué — bienvenue sur ${NOM_SECRET}` : '↩️ Thème d\u2019origine rétabli');
      }
      return;
    }
    if (e.key.startsWith('Arrow')) avance = e.key === CODE[0] ? 1 : 0;
  });
}

/* ------------------------------------------------------------------ */
/* 3. Mode patate                                                      */
/* ------------------------------------------------------------------ */

function initModePatate() {
  let observateur = null;

  const patater = (racine = document) => {
    racine.querySelectorAll?.(SEL_AVATARS).forEach((el) => {
      if (el.textContent === PATATE) return;
      if (!el.dataset.avatarOrigine) el.dataset.avatarOrigine = el.textContent;
      el.textContent = PATATE;
    });
  };

  const depatater = () => {
    document.querySelectorAll(SEL_AVATARS).forEach((el) => {
      if (el.dataset.avatarOrigine) { el.textContent = el.dataset.avatarOrigine; delete el.dataset.avatarOrigine; }
    });
  };

  function appliquer(actif) {
    document.documentElement.classList.toggle('mode-patate', actif);
    if (actif) {
      patater();
      // Les listes se redessinent en permanence (arrivées, messages) : on
      // repasse sur ce qui vient d'apparaître plutôt que de tout re-scanner.
      observateur = new MutationObserver((mutations) => {
        for (const m of mutations) {
          m.addedNodes.forEach((n) => { if (n.nodeType === 1) patater(n); });
        }
        patater();
      });
      observateur.observe(document.body, { childList: true, subtree: true });
    } else {
      observateur?.disconnect();
      observateur = null;
      depatater();
    }
  }

  appliquer(lire(CLE_PATATE));

  const MOT = 'patate';
  let tampon = '';
  window.addEventListener('keydown', (e) => {
    if (e.key.length !== 1) return;                 // on ignore Maj, flèches, etc.
    tampon = (tampon + e.key.toLowerCase()).slice(-MOT.length);
    if (tampon !== MOT) return;
    tampon = '';
    const actif = !lire(CLE_PATATE);
    ecrire(CLE_PATATE, actif);
    appliquer(actif);
    annoncer(actif ? `${PATATE} Mode patate activé` : '🙂 Avatars rendus à leurs propriétaires');
  });
}

/* ------------------------------------------------------------------ */

/* ------------------------------------------------------------------ */
/* 4. Curseurs — 10 clics sur le titre                                 */
/* ------------------------------------------------------------------ */

function initCurseurs() {
  const lireIndex = () => {
    try { return Math.max(0, Math.min(CURSEURS.length - 1, Number(localStorage.getItem(CLE_CURSEUR)) || 0)); }
    catch { return 0; }
  };
  const appliquer = (i) => {
    const skin = CURSEURS[i];
    // On pose le curseur sur la racine : il vaut pour toute la page, y compris
    // les zones qui définissent le leur (boutons, canevas) grâce au CSS joint.
    document.documentElement.style.cursor = skin.svg ? urlCurseur(skin) : '';
    document.documentElement.classList.toggle('curseur-perso', !!skin.svg);
  };

  let index = lireIndex();
  appliquer(index);

  const titre = document.querySelector('.sidebar__logo-text');
  if (!titre) return;
  let clics = 0;
  let dernier = 0;

  titre.addEventListener('click', () => {
    const t = Date.now();
    // Compteur volontairement patient mais pas infini : dix clics posés, pas
    // dix clics étalés sur la soirée.
    clics = (t - dernier > DELAI_CLICS_MS) ? 1 : clics + 1;
    dernier = t;
    if (clics < CLICS_REQUIS) return;
    clics = 0;
    index = (index + 1) % CURSEURS.length;
    try { localStorage.setItem(CLE_CURSEUR, String(index)); } catch { /* stockage indisponible */ }
    appliquer(index);
    annoncer(`🖱️ ${CURSEURS[index].nom}`);
  });
}

export function initEasterEggs() {
  initModeDVD();
  initKonami();
  initModePatate();
  initCurseurs();
}
