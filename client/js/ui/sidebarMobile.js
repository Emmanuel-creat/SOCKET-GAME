/**
 * sidebarMobile.js — menu latéral escamotable sur petits écrans.
 *
 * Sur mobile (≤ 820 px, voir base.css), la sidebar est un panneau coulissant
 * hors écran. Ce module câble les interactions :
 *  - le bouton ☰ ouvre le menu ;
 *  - le voile, la touche Échap, ou un clic sur un item de navigation le ferment ;
 *  - l'état est porté par la classe .app--menu-ouvert (le CSS fait le reste),
 *    et reflété dans aria-expanded pour les lecteurs d'écran.
 *
 * Sur grand écran, le bouton et le voile sont masqués par le CSS : ce module
 * ne change rien au comportement existant.
 */

export function initSidebarMobile() {
  const app = document.getElementById('app');
  const bouton = document.getElementById('sidebar-toggle');
  const voile = document.getElementById('sidebar-voile');
  const sidebar = document.getElementById('sidebar');
  if (!app || !bouton || !voile || !sidebar) return;

  const ouvrir = () => {
    app.classList.add('app--menu-ouvert');
    voile.hidden = false;
    bouton.setAttribute('aria-expanded', 'true');
  };

  const fermer = () => {
    app.classList.remove('app--menu-ouvert');
    voile.hidden = true;
    bouton.setAttribute('aria-expanded', 'false');
  };

  bouton.addEventListener('click', ouvrir);
  voile.addEventListener('click', fermer);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && app.classList.contains('app--menu-ouvert')) fermer();
  });

  // Naviguer ferme le menu : on veut voir la vue qu'on vient de choisir,
  // pas la chercher derrière le panneau.
  sidebar.addEventListener('click', (e) => {
    if (e.target.closest('.nav-btn')) fermer();
  });
}
