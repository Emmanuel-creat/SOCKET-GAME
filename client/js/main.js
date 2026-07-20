/**
 * main.js — point d'entrée client (composition root).
 * Instancie les services et les vues, câble la sidebar, lance le premier flux :
 * création du profil → menu principal.
 */
import { SocketClient } from './core/SocketClient.js';
import { Router } from './core/Router.js';
import { store } from './core/Store.js';
import { Notifications } from './ui/Notifications.js';
import { openProfileModal, openSettingsModal, openQuitModal } from './ui/modals.js';
import { initSidebarMobile } from './ui/sidebarMobile.js';
import { PlayView } from './views/PlayView.js';
import { RoomsView } from './views/RoomsView.js';
import { PlayersView } from './views/PlayersView.js';
import { RoomView } from './views/RoomView.js';
import { GameView } from './views/GameView.js';
import { LABELS } from '/shared/constants.js';

// --- Menu mobile (escamotable ≤ 820 px ; sans effet sur grand écran) ---
initSidebarMobile();

// --- Services ---
const socket = new SocketClient();
new Notifications();
new Router('play');

// --- Vues ---
new PlayView({ socket });
new RoomsView({ socket });
new PlayersView();
new RoomView({ socket });
new GameView({ socket });

// --- Sidebar : modales ---
const modalOpeners = {
  profile: () => openProfileModal({ socket }),
  settings: () => openSettingsModal({ socket }),
  quit: () => openQuitModal({ socket }),
};
document.querySelectorAll('.nav-btn[data-modal]').forEach((btn) =>
  btn.addEventListener('click', () => modalOpeners[btn.dataset.modal]?.()),
);

// --- Encart utilisateur dans la sidebar ---
store.subscribe('me', (me) => {
  const box = document.getElementById('sidebar-user');
  if (!me) { box.hidden = true; return; }
  box.hidden = false;
  document.getElementById('sidebar-user-avatar').textContent = me.avatar;
  const pseudoEl = document.getElementById('sidebar-user-pseudo');
  pseudoEl.textContent = me.pseudo;
  pseudoEl.style.color = me.color;
  document.getElementById('sidebar-user-status').textContent = LABELS.userStatus[me.status] ?? me.status;
});

// --- Premier lancement : le profil est obligatoire pour entrer ---
openProfileModal({ socket, firstRun: true });
