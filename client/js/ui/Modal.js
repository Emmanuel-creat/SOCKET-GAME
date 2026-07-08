/**
 * Modal — fenêtre modale générique et accessible.
 * - Fermeture : Échap, clic sur l'arrière-plan, ou programmatique.
 * - Le focus est piégé dans la modale et rendu à l'ouverture.
 */
import { el } from './dom.js';

export class Modal {
  /**
   * @param {object} options
   * @param {string} options.title Titre affiché.
   * @param {Node|Node[]} options.content Corps de la modale.
   * @param {Node[]} [options.actions] Boutons d'action (pied de modale).
   * @param {boolean} [options.dismissible=true] Fermable par Échap / clic extérieur.
   */
  constructor({ title, content, actions = [], dismissible = true }) {
    this.root = document.getElementById('modal-root');
    this.dismissible = dismissible;

    this.dialog = el('div', { className: 'modal', role: 'dialog', 'aria-modal': 'true', 'aria-label': title }, [
      el('h2', { className: 'modal__title' }, [title]),
      ...[].concat(content),
      actions.length ? el('div', { className: 'modal__actions' }, actions) : '',
    ]);

    this.overlay = el('div', {
      className: 'modal-overlay',
      onClick: (e) => { if (this.dismissible && e.target === this.overlay) this.close(); },
    }, [this.dialog]);

    this.onKeydown = (e) => {
      if (e.key === 'Escape' && this.dismissible) this.close();
      if (e.key === 'Tab') this.trapFocus(e);
    };
  }

  open() {
    // Une seule modale à la fois : on remplace l'existante.
    this.root.replaceChildren(this.overlay);
    document.addEventListener('keydown', this.onKeydown);
    this.focusables()[0]?.focus();
    return this;
  }

  close() {
    document.removeEventListener('keydown', this.onKeydown);
    this.overlay.remove();
  }

  focusables() {
    return [...this.dialog.querySelectorAll('button, input, select, [tabindex]:not([tabindex="-1"])')]
      .filter((n) => !n.disabled);
  }

  /** Garde le focus clavier à l'intérieur de la modale. */
  trapFocus(e) {
    const nodes = this.focusables();
    if (nodes.length === 0) return;
    const first = nodes[0];
    const last = nodes[nodes.length - 1];
    if (e.shiftKey && document.activeElement === first) { last.focus(); e.preventDefault(); }
    else if (!e.shiftKey && document.activeElement === last) { first.focus(); e.preventDefault(); }
  }
}
