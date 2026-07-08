/**
 * Notifications — toasts non bloquants.
 * Écoute l'événement bus `notify` : { type: info|success|warning|error, message }.
 */
import { bus } from '../core/EventBus.js';
import { el } from './dom.js';

const ICONS = { info: 'ℹ️', success: '✅', warning: '⚠️', error: '❌' };
const DURATION_MS = 4000;

export class Notifications {
  constructor(containerId = 'notifications') {
    this.container = document.getElementById(containerId);
    bus.on('notify', ({ type = 'info', message }) => this.show(type, message));
  }

  show(type, message) {
    const toast = el('div', { className: `toast toast--${type}` }, [
      el('span', { 'aria-hidden': 'true' }, [ICONS[type] ?? ICONS.info]),
      el('span', {}, [message]),
    ]);
    this.container.append(toast);

    // Retrait animé après la durée d'affichage.
    setTimeout(() => {
      toast.classList.add('is-leaving');
      toast.addEventListener('transitionend', () => toast.remove(), { once: true });
      // Filet de sécurité si la transition est désactivée (reduced motion).
      setTimeout(() => toast.remove(), 500);
    }, DURATION_MS);
  }
}
