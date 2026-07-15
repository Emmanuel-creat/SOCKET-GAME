# Mise à jour : 3 corrections (navigation + Loup-Garou)

## Contenu
**1. Création de salon avec jeu présélectionné**
- `server/sockets/registerSocketHandlers.js` — `room:create` accepte un `gameId` optionnel (même validation que `room:setGame`, id invalide ignoré sans faire échouer la création)
- `client/js/views/PlayView.js` — la carte d'un jeu transmet ce jeu à la création
- `client/js/ui/modals.js` — la modale affiche le jeu présélectionné (badge + max joueurs pré-rempli) et l'envoie au serveur

**2. Retour direct dans son salon**
- `client/js/views/RoomsView.js` — si vous appartenez à un salon, l'onglet Salons rouvre directement l'intérieur du salon (état complet restauré depuis le serveur : joueurs, paramètres, chat, statut)
- `client/js/core/Router.js` — l'onglet Salons reste surligné quand la vue salon est affichée

**3. Loup-Garou : pouvoirs après la mort (v1.0.1)**
- `client/games/loup-garou/index.js` — l'interface du tir du Chasseur et de la succession du Capitaine s'affiche désormais AVANT l'écran de mort définitif (le moteur autorisait déjà ces actions : c'était l'écran de mort qui masquait l'interface et bloquait la partie)
- `client/games/loup-garou/config.json` + `client/games/games.json` — version 1.0.1

## Installation
Copier les fichiers en respectant l'arborescence, puis :
`git add -A && git commit -m "Fix: présélection du jeu, retour salon, pouvoirs post-mortem LG" && git push`

## Tests de non-régression effectués
- E2E serveur : création avec gameId (état + liste publique + nouveau membre), gameId invalide ignoré, création classique intacte, room:setGame intact, relais game:message intact.
- Loup-Garou : 300 parties complètes re-simulées sans erreur (le moteur n'a pas changé, seule l'UI est corrigée).
