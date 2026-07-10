/**
 * Fenêtres applicatives — chaque fonction construit et ouvre une modale.
 * Dépendances injectées : { socket } (SocketClient) pour agir sur le serveur.
 */
import { Modal } from './Modal.js';
import { el } from './dom.js';
import { store } from '../core/Store.js';
import { bus } from '../core/EventBus.js';
import { LIMITS, USER_STATUS, LABELS } from '/shared/constants.js';
import { isValidPseudo, isValidRoomName, isValidRoomCode } from '/shared/validation.js';

const AVATARS = ['🎮', '🕹️', '👾', '🤖', '🐺', '🦊', '🐸', '🐙', '🦄', '🐲', '👻', '🎲', '🚀', '⚡', '🔥', '🌙'];

/** Sélecteur d'avatars (grille d'emojis). */
function avatarPicker(initial) {
  let selected = initial ?? AVATARS[0];
  const grid = el('div', { style: { display: 'flex', flexWrap: 'wrap', gap: '6px' } });
  const render = () => {
    grid.replaceChildren(...AVATARS.map((a) =>
      el('button', {
        type: 'button',
        className: `btn btn--small ${a === selected ? 'btn--primary' : 'btn--ghost'}`,
        onClick: () => { selected = a; render(); },
        'aria-pressed': String(a === selected),
      }, [a]),
    ));
  };
  render();
  return { element: grid, get value() { return selected; } };
}

/**
 * Profil — création (premier lancement) ou édition.
 * @param {{socket: object, firstRun?: boolean}} deps
 */
export function openProfileModal({ socket, firstRun = false }) {
  const me = store.get('me');
  const pseudoInput = el('input', {
    type: 'text', id: 'profile-pseudo', maxLength: LIMITS.PSEUDO_MAX,
    value: me?.pseudo ?? '', placeholder: 'Votre pseudo',
  });
  const colorInput = el('input', { type: 'color', id: 'profile-color', value: me?.color ?? '#7c5cff' });
  const avatars = avatarPicker(me?.avatar);

  const submit = () => {
    const pseudo = pseudoInput.value;
    if (!isValidPseudo(pseudo)) {
      bus.emit('notify', { type: 'warning', message: `Le pseudo doit faire ${LIMITS.PSEUDO_MIN} à ${LIMITS.PSEUDO_MAX} caractères.` });
      return;
    }
    const profile = { pseudo, avatar: avatars.value, color: colorInput.value };
    firstRun ? socket.register(profile) : socket.updateProfile(profile);
    modal.close();
  };

  const modal = new Modal({
    title: firstRun ? 'Bienvenue dans l\'Arcade' : 'Mon profil',
    dismissible: !firstRun,
    content: [
      el('div', { className: 'field' }, [el('label', { htmlFor: 'profile-pseudo' }, ['Pseudo']), pseudoInput]),
      el('div', { className: 'field' }, [el('label', {}, ['Avatar']), avatars.element]),
      el('div', { className: 'field' }, [el('label', { htmlFor: 'profile-color' }, ['Couleur']), colorInput]),
    ],
    actions: [
      el('button', { className: 'btn btn--primary', onClick: submit }, [firstRun ? 'Entrer dans l\'arcade' : 'Enregistrer']),
    ],
  }).open();

  pseudoInput.addEventListener('keydown', (e) => { if (e.key === 'Enter') submit(); });
}

/** Paramètres — statut du joueur (extensible : futurs réglages ici). */
export function openSettingsModal({ socket }) {
  const me = store.get('me');
  const statusSelect = el('select', { id: 'settings-status' },
    [USER_STATUS.ONLINE, USER_STATUS.AWAY].map((s) =>
      el('option', { value: s, selected: me?.status === s }, [LABELS.userStatus[s]]),
    ),
  );

  const modal = new Modal({
    title: 'Paramètres',
    content: [
      el('div', { className: 'field' }, [el('label', { htmlFor: 'settings-status' }, ['Mon statut']), statusSelect]),
      el('p', { style: { color: 'var(--text-dim)', fontSize: '0.85rem' } },
        ['Les statuts « Dans un salon » et « En jeu » sont gérés automatiquement par la plateforme.']),
    ],
    actions: [
      el('button', { className: 'btn btn--ghost', onClick: () => modal.close() }, ['Annuler']),
      el('button', {
        className: 'btn btn--primary',
        onClick: () => { socket.setStatus(statusSelect.value); modal.close(); },
      }, ['Enregistrer']),
    ],
  }).open();
}

/** Création de salon. */
export function openCreateRoomModal({ socket, game = null }) {
  const nameInput = el('input', {
    type: 'text', id: 'room-name', maxLength: LIMITS.ROOM_NAME_MAX,
    placeholder: game ? `Ex. : ${game.nom} entre amis` : 'Ex. : La taverne de Manu',
  });
  const maxInput = el('input', {
    type: 'number', id: 'room-max',
    value: game ? Math.min(game.joueursMax, LIMITS.ROOM_PLAYERS_MAX) : 8,
    min: LIMITS.ROOM_PLAYERS_MIN, max: LIMITS.ROOM_PLAYERS_MAX,
  });

  const submit = () => {
    if (!isValidRoomName(nameInput.value)) {
      bus.emit('notify', { type: 'warning', message: `Le nom du salon doit faire ${LIMITS.ROOM_NAME_MIN} à ${LIMITS.ROOM_NAME_MAX} caractères.` });
      return;
    }
    socket.createRoom({
      name: nameInput.value,
      maxPlayers: Number(maxInput.value),
      ...(game ? { gameId: game.id } : {}),
    });
    modal.close();
  };

  const modal = new Modal({
    title: game ? `Créer un salon — ${game.icone} ${game.nom}` : 'Créer un salon',
    content: [
      ...(game ? [el('div', { className: 'field' }, [
        el('span', { className: 'badge badge--disponible' },
          [`${game.icone} ${game.nom} · ${game.joueursMin}–${game.joueursMax} joueurs — sera sélectionné automatiquement`]),
      ])] : []),
      el('div', { className: 'field' }, [el('label', { htmlFor: 'room-name' }, ['Nom du salon']), nameInput]),
      el('div', { className: 'field' }, [el('label', { htmlFor: 'room-max' }, ['Nombre maximum de joueurs']), maxInput]),
    ],
    actions: [
      el('button', { className: 'btn btn--ghost', onClick: () => modal.close() }, ['Annuler']),
      el('button', { className: 'btn btn--primary', onClick: submit }, ['Créer le salon']),
    ],
  }).open();

  nameInput.addEventListener('keydown', (e) => { if (e.key === 'Enter') submit(); });
}

/** Rejoindre un salon par code. */
export function openJoinRoomModal({ socket, prefillCode = '' }) {
  const codeInput = el('input', {
    type: 'text', id: 'room-code', maxLength: LIMITS.ROOM_CODE_LENGTH,
    value: prefillCode, placeholder: 'Ex. : K7XM2P',
    style: { textTransform: 'uppercase', letterSpacing: '0.3em', fontFamily: 'monospace' },
  });

  const submit = () => {
    const code = codeInput.value.toUpperCase();
    if (!isValidRoomCode(code)) {
      bus.emit('notify', { type: 'warning', message: `Le code doit contenir ${LIMITS.ROOM_CODE_LENGTH} caractères.` });
      return;
    }
    socket.joinRoom(code);
    modal.close();
  };

  const modal = new Modal({
    title: 'Rejoindre un salon',
    content: [
      el('div', { className: 'field' }, [el('label', { htmlFor: 'room-code' }, ['Code d\'invitation']), codeInput]),
    ],
    actions: [
      el('button', { className: 'btn btn--ghost', onClick: () => modal.close() }, ['Annuler']),
      el('button', { className: 'btn btn--primary', onClick: submit }, ['Rejoindre']),
    ],
  }).open();

  codeInput.addEventListener('keydown', (e) => { if (e.key === 'Enter') submit(); });
}

/** Invitation — affiche le code du salon et le copie en un clic. */
export function openInviteModal() {
  const room = store.get('room');
  if (!room) return;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(room.code);
      bus.emit('notify', { type: 'success', message: 'Code copié dans le presse-papiers.' });
    } catch {
      bus.emit('notify', { type: 'warning', message: 'Copie impossible : sélectionnez le code manuellement.' });
    }
  };

  const modal = new Modal({
    title: 'Inviter un joueur',
    content: [
      el('p', { style: { color: 'var(--text-dim)' } },
        ['Partagez ce code : vos amis pourront rejoindre le salon via « Salons → Rejoindre avec un code ».']),
      el('div', { style: { textAlign: 'center', margin: '12px 0' } }, [
        el('button', { className: 'code-pill', onClick: copy, title: 'Copier le code' }, [room.code, ' 📋']),
      ]),
    ],
    actions: [el('button', { className: 'btn btn--primary', onClick: () => modal.close() }, ['Fermer'])],
  }).open();
}

/** Confirmation de sortie (quitter la plateforme). */
export function openQuitModal({ socket }) {
  const modal = new Modal({
    title: 'Quitter l\'arcade ?',
    content: [el('p', { style: { color: 'var(--text-dim)' } },
      ['Vous serez déconnecté et retiré de votre salon éventuel.'])],
    actions: [
      el('button', { className: 'btn btn--ghost', onClick: () => modal.close() }, ['Rester']),
      el('button', {
        className: 'btn btn--danger',
        onClick: () => {
          socket.leaveRoom();
          window.location.href = 'about:blank';
        },
      }, ['Quitter']),
    ],
  }).open();
}

/** Confirmation générique (utilisée pour expulser, fermer un salon...). */
export function openConfirmModal({ title, message, confirmLabel = 'Confirmer', onConfirm }) {
  const modal = new Modal({
    title,
    content: [el('p', { style: { color: 'var(--text-dim)' } }, [message])],
    actions: [
      el('button', { className: 'btn btn--ghost', onClick: () => modal.close() }, ['Annuler']),
      el('button', { className: 'btn btn--danger', onClick: () => { onConfirm(); modal.close(); } }, [confirmLabel]),
    ],
  }).open();
}
