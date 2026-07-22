/**
 * ClassementView — vue « Classement » : palmarès général, tous jeux confondus.
 *
 * Les données viennent du serveur (seule autorité) : chaque joueur y est
 * identifié par son adresse IP et l'identifiant de son navigateur, jamais par
 * son pseudo — changer de nom ne remet donc pas le compteur à zéro. Le pseudo
 * montré est simplement le dernier utilisé par cette identité.
 */
import { el, replaceChildrenOf } from '../ui/dom.js';
import { bus } from '../core/EventBus.js';


const NOMS_JEUX = {
  'loup-garou': 'Loup-Garou', 'among-us': 'Among Us', 'la-traque': 'La Traque',
  'last-shot': 'Last Shot', 'gartic-phone': 'Dessine-devine', dominos: 'Dominos',
  tarot: 'Tarot', uno: 'Uno', codenames: 'Codenames', 'petit-bac': 'Petit Bac',
  echecs: 'Échecs', puissance4: 'Puissance 4', memory: 'Memory', quiz: 'Quiz',
  'blind-test': 'Blind Texte', 'cache-cache': 'Cache-cache', 'devine-tete': 'Devine-tête',
  'bataille-navale': 'Bataille navale', bomberman: 'Bomberman',
};

export class ClassementView {
  constructor({ socket }) {
    this.socket = socket;
    this.container = document.getElementById('view-classement');
    this.data = null;

    // Le serveur répond via le bus (SocketClient relaie les événements réseau).
    bus.on('classement:data', (data) => { this.data = data; this.render(); });

    bus.on('view:activated:classement', () => { this.demander(); this.render(); });
  }

  /** Demande un classement à jour à chaque affichage de l'onglet. */
  demander() {
    try { this.socket.demanderClassement(); } catch { /* hors ligne */ }
  }

  ligne(entree, estMoi) {
    const medaille = entree.rang === 1 ? '🥇' : entree.rang === 2 ? '🥈' : entree.rang === 3 ? '🥉' : `${entree.rang}.`;
    const jeux = Object.entries(entree.parJeu || {})
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([id, n]) => `${NOMS_JEUX[id] || id} ×${n}`)
      .join(' · ');
    return el('div', { className: `clsmt__row${estMoi ? ' clsmt__row--me' : ''}` }, [
      el('span', { className: 'clsmt__rank' }, [medaille]),
      el('div', { className: 'clsmt__who' }, [
        el('b', {}, [entree.pseudo]),
        jeux ? el('span', { className: 'clsmt__games' }, [jeux]) : '',
      ]),
      el('span', { className: 'clsmt__wins' }, [`${entree.victoires} 🏆`]),
      el('span', { className: 'clsmt__ratio' }, [`${entree.ratio}% sur ${entree.parties}`]),
    ]);
  }

  render() {
    if (this.container.hidden) return;
    const top = this.data?.top ?? [];
    const moi = this.data?.moi ?? null;

    const corps = top.length === 0
      ? [el('div', { className: 'empty' }, ['Aucune partie enregistrée pour l\u2019instant — lancez-en une !'])]
      : top.map((e) => this.ligne(e, moi && e.pseudo === moi.pseudo && e.victoires === moi.victoires));

    const encartMoi = moi
      ? el('div', { className: 'card clsmt__me' }, [
        el('div', { className: 'clsmt__me-title' }, ['Votre palmarès']),
        el('div', {}, [
          `${moi.pseudo} — ${moi.victoires} victoire${moi.victoires > 1 ? 's' : ''} `,
          `sur ${moi.parties} partie${moi.parties > 1 ? 's' : ''} (${moi.ratio} %)`,
          moi.rang ? ` — ${moi.rang}\u1d49 place` : '',
        ]),
      ])
      : '';

    replaceChildrenOf(
      this.container,
      el('h1', { className: 'view__title' }, ['Classement général']),
      el('p', { className: 'view__subtitle' }, ['Victoires cumulées sur tous les jeux.']),
      encartMoi,
      el('div', { className: 'card clsmt' }, corps),
      el('p', { className: 'clsmt__note' }, [
        'Votre palmarès est rattaché à votre connexion et à ce navigateur : ',
        'vous pouvez changer de pseudo sans perdre vos victoires.',
      ]),
    );
  }
}
