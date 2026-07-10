# MEDGAME — Plateforme de jeux multijoueur

Plateforme d'arcade multijoueur en temps réel : profils, salons, chat, invitation par code, sélection et lancement de jeux. **La plateforme ne contient aucun jeu** — c'est un moteur : les jeux sont des modules indépendants, chargés dynamiquement.

## Démarrage

```bash
npm install
npm start        # ou : npm run dev (rechargement auto)
```

Puis ouvrir **http://localhost:3000** (variable d'environnement `PORT` pour changer le port).

## Stack

- **Client** : HTML5, CSS3, JavaScript ES6 Modules — aucun framework
- **Serveur** : Node.js (≥ 18), Express, Socket.IO
- **Partagé** : constantes, événements et validation communs (`/shared`)

## Architecture

```text
arcade/
├── client/
│   ├── index.html            # SPA : sections de vues + conteneurs système
│   ├── css/                  # variables (tokens), base, composants, vues
│   ├── js/
│   │   ├── main.js           # Composition root client
│   │   ├── core/             # EventBus, Store, SocketClient, Router
│   │   ├── ui/               # dom helpers, Notifications, Modal, modales applicatives
│   │   ├── components/       # GameCard, PlayerRow, Chat
│   │   ├── views/            # Play, Rooms, Players, Room, Game
│   │   └── games/            # GameLoader (import dynamique des modules)
│   ├── assets/
│   └── games/                # 1 dossier par jeu + games.json (catalogue)
├── server/
│   ├── server.js             # Composition root serveur (Express + Socket.IO)
│   ├── sockets/              # registerSocketHandlers (couche transport)
│   ├── lobby/                # LobbyManager (broadcasts globaux)
│   ├── rooms/                # Room (entité) + RoomManager
│   ├── users/                # UserManager
│   └── games/                # GameRegistry (lecture de games.json)
├── shared/                   # constants.js, events.js, validation.js
├── package.json
└── README.md
```

### Principes

- **Le moteur ne connaît aucun jeu.** Sa seule source de vérité est `client/games/games.json`.
- **Couches découplées** : entités (Room) → managers (RoomManager, UserManager) → transport (sockets) → diffusion (LobbyManager). Côté client : Store + EventBus, les vues ne touchent jamais Socket.IO directement.
- **Validation partagée** (`shared/validation.js`) : retour immédiat côté client, autorité côté serveur.
- **Sécurité DOM** : tout le rendu passe par `el()` (pas d'`innerHTML` sur des données utilisateur).

## Fonctionnalités

| Domaine | Détails |
|---|---|
| Profil | pseudo, avatar, couleur, statut (connecté / absent / dans un salon / en jeu), id unique |
| Salons | création, code de partage 6 caractères, capacité, statut, Host automatique |
| Host | choisir le jeu, expulser, modifier la capacité, lancer la partie, fermer le salon |
| Chat | messages horodatés, pseudo coloré, auto-scroll intelligent, historique borné |
| Notifications | connexions, arrivées/départs, erreurs, succès (toasts) |
| Fenêtres | profil, paramètres, créer/rejoindre un salon, inviter, confirmations |
| Parties | lancement par le Host, chargement dynamique du module, retour automatique au salon |
| Accessibilité | navigation clavier, focus visible, `prefers-reduced-motion`, responsive |

## Ajouter un jeu (sans toucher au moteur)

1. **Créer le dossier** `client/games/mon-jeu/` avec `index.js`, `config.json`, `README.md`, `assets/`.
2. **Implémenter le contrat de module** dans `index.js` :

```js
export default {
  /**
   * @param {HTMLElement} container  Zone d'affichage dédiée au jeu.
   * @param {object} context { roomId, roomName, hostId, players, me, socket, onEnd }
   */
  async mount(container, context) {
    // ... logique et rendu du jeu ...
    // Fin de partie : context.onEnd({ summary: 'Victoire de X', scores: {...} })
  },
  async unmount() {
    // Nettoyage complet (timers, listeners, DOM).
  },
};
```

3. **Déclarer le jeu** dans `client/games/games.json` (ou passer son `etat` à `"disponible"` s'il y figure déjà).

C'est tout : le moteur charge le module via `GameLoader` (`import()` dynamique), transmet le salon et les joueurs, puis ramène tout le monde au salon quand `onEnd` est appelé. La plateforme ne contient jamais la logique interne d'un jeu.

## 📡 Protocole temps réel

Tous les événements sont centralisés dans `shared/events.js` (convention `domaine:action`). Résumé du cycle de vie d'une partie :

```text
Host                    Serveur                     Membres du salon
─ game:start ─────────▶ vérifie état + effectif
                        room.status = en-jeu
                        ◀──────── game:started ────▶ chargement du module
─ game:end(result) ───▶ room.status = ouvert
                        ◀──────── game:ended ──────▶ retour automatique au salon
```

## Jeux prévus

20 jeux référencés (Loup-Garou, UNO, Skyjo, Belote, Codenames, Tarot, Among Us, Puissance 4, Morpion, Blind Test, Petit Bac, Quiz, Pendu, Dessin & Devine, Bataille Navale, Bomberman, Memory, Dominos, Échecs, Cache-Cache) + 5 emplacements réservés (`placeholder01` à `placeholder05`, masqués du catalogue via `"visible": false`). Tous en état **« En développement »** : leurs dossiers existent, leurs fichiers sont volontairement vides.
