/**
 * Router — navigation entre vues sans rechargement.
 * Chaque vue est une <section data-view-name> déjà présente dans le DOM ;
 * le Router affiche l'une, masque les autres et notifie la vue activée.
 */
import { bus } from './EventBus.js';

export class Router {
  /** @param {string} defaultView Vue affichée au démarrage. */
  constructor(defaultView = 'play') {
    this.sections = new Map(
      [...document.querySelectorAll('[data-view-name]')].map((el) => [el.dataset.viewName, el]),
    );
    this.navButtons = [...document.querySelectorAll('.nav-btn[data-view]')];
    this.current = null;

    this.navButtons.forEach((btn) =>
      btn.addEventListener('click', () => this.navigate(btn.dataset.view)),
    );
    bus.on('app:navigate', (view) => this.navigate(view));

    this.navigate(defaultView);
  }

  /** Affiche la vue demandée, masque les autres, met à jour la sidebar. */
  navigate(view) {
    if (!this.sections.has(view) || this.current === view) return;
    this.current = view;

    for (const [name, section] of this.sections) {
      section.hidden = name !== view;
    }
    this.navButtons.forEach((btn) =>
      btn.classList.toggle('is-active', btn.dataset.view === view),
    );
    // La vue concernée peut se (re)construire à l'activation.
    bus.emit(`view:activated:${view}`);
  }
}
