/**
 * EventBus — bus d'événements interne au client.
 * Découple les modules : les vues s'abonnent, les services publient.
 */
export class EventBus {
  constructor() {
    /** @type {Map<string, Set<Function>>} */
    this.listeners = new Map();
  }

  /**
   * S'abonne à un événement.
   * @returns {() => void} fonction de désabonnement.
   */
  on(event, handler) {
    if (!this.listeners.has(event)) this.listeners.set(event, new Set());
    this.listeners.get(event).add(handler);
    return () => this.off(event, handler);
  }

  off(event, handler) {
    this.listeners.get(event)?.delete(handler);
  }

  emit(event, payload) {
    for (const handler of this.listeners.get(event) ?? []) {
      handler(payload);
    }
  }
}

/** Instance unique partagée par toute l'application. */
export const bus = new EventBus();
