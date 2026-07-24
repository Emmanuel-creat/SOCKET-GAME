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

export function initEasterEggs() {
  initModeDVD();
  initKonami();
  initModePatate();
}
