# Mise à jour : jeu de Tarot 🎴

## Contenu

**Nouveaux fichiers** (le jeu) :
- `client/games/tarot/index.js` — moteur de règles + interface (remplace le placeholder vide)
- `client/games/tarot/config.json` — métadonnées
- `client/games/tarot/README.md` — règles implémentées, architecture, limites

**Fichiers modifiés** (relais générique `game:message` ajouté au moteur — il ne connaît toujours aucun jeu, il route seulement des données entre joueurs d'un salon en partie) :
- `shared/events.js` — nouvel événement `GAME_MESSAGE`
- `server/sockets/registerSocketHandlers.js` — relais serveur (ciblé ou diffusé, refusé hors partie)
- `client/js/core/SocketClient.js` — envoi/réception côté client
- `client/js/views/GameView.js` — `sendMessage` / `onMessage` transmis aux modules de jeu
- `client/js/games/GameLoader.js` — documentation du contrat de module mise à jour
- `client/games/games.json` — tarot passé à `disponible` (3 à 4 joueurs, v1.0.0)

## Installation

1. Copier tous les fichiers de ce zip dans le repo **en respectant l'arborescence** (écraser les existants).
2. `git add -A && git commit -m "Ajout du jeu de tarot + relais game:message" && git push`
3. Render redéploie automatiquement — aucune dépendance nouvelle, aucun changement de configuration.

## Jouer

Salon de 3 ou 4 joueurs → le Host sélectionne **Tarot** → Lancer. Le Host enchaîne les donnes et termine la partie quand il veut (classement final puis retour au salon).

## Tests effectués

- 360 donnes complètes simulées (3 et 4 joueurs, tous les contrats, poignées, petit au bout, Excuse) : 182 demi-points toujours répartis, scores à somme nulle, aucun coup illégal accepté.
- Test bout-en-bout du relais avec 3 clients réels : refus hors salon/hors partie, message ciblé, diffusion, cible invalide refusée, fermeture du relais en fin de partie.
