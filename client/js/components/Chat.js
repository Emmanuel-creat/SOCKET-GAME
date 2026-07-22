/**
 * Chat — messagerie intégrée au salon.
 * Affiche l'historique, les nouveaux messages (avec heure et pseudo),
 * et gère l'auto-scroll intelligent (ne saute pas si l'utilisateur remonte).
 */
import { el, formatTime } from '../ui/dom.js';
import { bus } from '../core/EventBus.js';

export class Chat {
  /** @param {{socket: object}} deps */
  constructor({ socket }) {
    this.socket = socket;
    this.messagesEl = el('div', { className: 'chat__messages', tabIndex: 0, 'aria-label': 'Messages du salon' });

    this.input = el('input', {
      type: 'text', placeholder: 'Écrire un message…',
      'aria-label': 'Votre message', maxLength: 300,
    });

    this.element = el('div', { className: 'card chat' }, [
      el('h3', { style: { marginBottom: '10px', fontSize: '1rem' } }, ['💬 Chat du salon']),
      this.messagesEl,
      el('form', {
        className: 'chat__form',
        onSubmit: (e) => { e.preventDefault(); this.send(); },
      }, [
        this.input,
        el('button', { className: 'btn btn--primary btn--small', type: 'submit' }, ['Envoyer']),
      ]),
    ]);

    this.unsubscribe = bus.on('chat:newMessage', (message) => this.append(message));
  }

  /** Charge un historique complet (à l'entrée dans le salon). */
  setHistory(messages = []) {
    this.messagesEl.replaceChildren();
    messages.forEach((m) => this.append(m, { instant: true }));
  }

  /**
   * Après un re-render de la vue parente, l'élément est détaché puis rattaché
   * au DOM, ce qui remet scrollTop à 0 (le chat « remonte en haut »). On mémorise
   * ici si l'on était collé en bas, pour le restaurer une fois rebranché.
   */
  captureScroll() {
    this._wasAtBottom =
      this.messagesEl.scrollHeight - this.messagesEl.scrollTop - this.messagesEl.clientHeight < 60;
  }

  restoreScroll() {
    if (this._wasAtBottom !== false) this.messagesEl.scrollTop = this.messagesEl.scrollHeight;
  }

  append(message, { instant = false } = {}) {
    const nearBottom = this.messagesEl.scrollHeight - this.messagesEl.scrollTop - this.messagesEl.clientHeight < 60;

    this.messagesEl.append(
      el('div', { className: 'chat-msg' }, [
        el('span', { className: 'chat-msg__avatar', 'aria-hidden': 'true' }, [message.avatar]),
        el('div', {}, [
          el('div', { className: 'chat-msg__head' }, [
            el('span', { className: 'chat-msg__pseudo', style: { color: message.color } }, [message.pseudo]),
            el('span', { className: 'chat-msg__time' }, [formatTime(message.at)]),
          ]),
          el('p', { className: 'chat-msg__text' }, [message.text]),
        ]),
      ]),
    );

    // Auto-scroll uniquement si l'utilisateur est déjà en bas (ou au chargement).
    if (nearBottom || instant) this.messagesEl.scrollTop = this.messagesEl.scrollHeight;
  }

  send() {
    const text = this.input.value.trim();
    if (!text) return;
    this.socket.sendChatMessage(text);
    this.input.value = '';
    this.input.focus();
  }

  destroy() {
    this.unsubscribe();
  }
}
