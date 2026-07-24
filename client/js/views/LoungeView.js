/**
 * LoungeView — « Pause Café » : chat en direct global, accessible sans
 * créer ni rejoindre de salon. Rejoint le canal au moment où la vue
 * s'active, le quitte dès qu'on navigue ailleurs (voir Router: `view:changed`).
 */
import { el, replaceChildrenOf } from '../ui/dom.js';
import { store } from '../core/Store.js';
import { bus } from '../core/EventBus.js';
import { Chat } from '../components/Chat.js';

export class LoungeView {
  /** @param {{socket: object}} deps */
  constructor({ socket }) {
    this.socket = socket;
    this.container = document.getElementById('view-lounge');
    this.chat = null;
    this.joined = false;
    this.rosterEl = el('div', { className: 'lounge-roster' });

    bus.on('view:activated:lounge', () => this.enter());
    bus.on('view:changed', (view) => { if (view !== 'lounge') this.leave(); });
    bus.on('lounge:roster', (roster) => this.renderRoster(roster));

    // Au cas où la connexion tombe puis revient pendant qu'on est sur cette vue :
    // le serveur ne se souvient plus de nous, on redemande à rejoindre.
    bus.on('socket:reconnect', () => { if (this.joined) this.socket.joinLounge(); });
  }

  enter() {
    if (this.joined) { this.render(); return; }
    this.joined = true;
    this.socket.joinLounge();
    this.render();
  }

  leave() {
    if (!this.joined) return;
    this.joined = false;
    this.socket.leaveLounge();
  }

  render() {
    if (this.container.hidden) return;

    if (!this.chat) {
      this.chat = new Chat({
        socket: this.socket,
        title: '☕ Discussion',
        ariaLabel: 'Messages de Pause Café',
        newMessageEvent: 'lounge:newMessage',
        sendMethod: 'sendLoungeMessage',
      });
      this.unsubHistory = bus.on('lounge:history', (messages) => this.chat.setHistory(messages));
    }

    replaceChildrenOf(
      this.container,
      el('h1', { className: 'view__title' }, ['☕ Pause Café']),
      el('p', { className: 'view__subtitle' }, ['Discussion libre, ouverte à tout le monde — aucun salon à créer.']),
      el('div', { className: 'lounge-layout' }, [
        el('div', { className: 'card lounge-roster-card' }, [
          el('h3', { style: { marginBottom: '10px', fontSize: '1rem' } }, ['Présents']),
          this.rosterEl,
        ]),
        this.chat.element,
      ]),
    );
  }

  renderRoster(roster = []) {
    const me = store.get('me');
    this.rosterEl.replaceChildren(
      ...(roster.length
        ? roster.map((p) => el('div', { className: 'lounge-roster__item' }, [
            el('span', { className: 'lounge-roster__avatar', 'aria-hidden': 'true' }, [p.avatar]),
            el('span', { style: { color: p.color } }, [p.pseudo, p.id === me?.id ? ' (vous)' : '']),
          ]))
        : [el('p', { style: { opacity: '.6', fontSize: '.85rem' } }, ['Personne pour le moment.'])]),
    );
  }
}
