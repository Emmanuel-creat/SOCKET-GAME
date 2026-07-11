# Memory — module Arcade

Jeu de paires classique à **2 à 6 joueurs** : 15 paires (30 cartes), tours alternés, chrono optionnel et chat intégré.

## Architecture « Host autoritaire »

- Le client du **Host** exécute le moteur de règles (`MemoryEngine`, classe pure sans DOM ni réseau, exportée pour les tests) : mélange du plateau, tours, appariements, scores.
- Contrairement au Tarot, **aucune information n'est privée** ici (toutes les cartes retournées sont publiques) : l'état diffusé (`state`) est donc strictement identique pour tout le monde, envoyé en une seule diffusion (`context.sendMessage(data, null)`).
- Les autres clients sont de purs afficheurs : ils rendent le dernier état reçu et envoient leurs actions (`{ a: 'flip', index }` / `{ a: 'skip' }`) au Host (`context.sendMessage(data, hostId)`).
- **Chat** : indépendant du moteur de jeu. Chaque client diffuse directement son message à toute la salle (`context.sendMessage({ t: 'chat', ... }, null)`) — le serveur relaie sans jamais passer par le Host, donc le chat continue de fonctionner même si le Host est occupé à résoudre un tour.
- Transport : relais générique `game:message` du moteur (le serveur route sans lire le contenu).

## Règles implémentées

- Plateau de 30 cartes (15 paires), mélangé aléatoirement à chaque partie (Fisher-Yates).
- Le joueur actif retourne 2 cartes : **paire trouvée** → les cartes restent visibles, +1 point, il rejoue ; **paire ratée** → les 2 cartes restent visibles 1,5 s puis se retournent, le tour passe au joueur suivant.
- Fin de partie automatique quand les 15 paires sont trouvées (écran de classement puis retour au salon après quelques secondes).
- **Bouton « Terminer la partie »** (visible uniquement du Host, `me.id === hostId`) : termine immédiatement la partie et appelle `context.onEnd({ result })` avec le classement courant.
- **Bouton « Chrono 10s »** (visible de tous) : lance un compte à rebours visuel de 10 secondes. Si le joueur actif ne termine pas son tour (aucun appariement/erreur résolu) avant la fin du chrono, son tour est automatiquement passé par le Host. Un seul chrono actif à la fois.
- Scoreboard en temps réel (paires trouvées par joueur, tour en cours mis en évidence).

## Déroulement côté joueurs

Le Host lance la partie depuis le salon (2 à 6 joueurs). Chaque joueur retourne 2 cartes à son tour ; la grille, le score et le chat sont mis à jour en direct pour tout le monde. La partie se termine seule quand toutes les paires sont trouvées, ou à tout moment sur décision du Host.

## Limites connues

- Pas de limite de temps par défaut sur un tour : le chrono de 10 s est une option manuelle (bouton), pas un minuteur automatique après chaque flip.
- **Déconnexion en cours de partie** : la partie ne peut pas se poursuivre sans le joueur ; le Host dispose du bouton « Terminer la partie » pour ramener tout le monde au salon. Si le Host lui-même quitte, le serveur ferme le salon (comportement standard du moteur).
- Les 15 illustrations de cartes doivent rester dans `assets/1.jpg` à `assets/15.jpg` (dos commun : `assets/verso.jpg`) ; changer leur nombre nécessite d'ajuster `PAIR_COUNT` dans `index.js`.

## Tests

Le moteur étant pur et exporté (`import { MemoryEngine } from './index.js'`), il est testable en Node sans navigateur : tours alternés, refus de coup hors-tour, résolution de mismatch après délai, chrono à instance unique, fin de partie à 15 paires trouvées.

## Audit d'installation (plateforme)

Le zip d'origine a été audité et corrigé avant intégration :
- **`games.json` obsolète remplacé** : celui du zip datait d'avant les mises à jour Tarot/Codenames/Petit Bac/Le Dossier/Loup-Garou/Bomberman — l'installer tel quel aurait fait régresser 4 jeux en « en-developpement » et supprimé la fiche du Dossier. Le `games.json` livré ici repart de l'état courant du repo.
- **Incohérence doc/code corrigée** : la documentation annonçait 15 paires (30 cartes) mais le code en tirait 8 — aligné sur 15 paires (grille 6×5, tout le pool d'images).
- **Contrat `onEnd` corrigé** : le résultat était double-enveloppé (`{result: …}`) et sans `summary` — la fin de partie affiche désormais la notification de victoire au retour au salon.
- **Arborescence re-packagée** à la racine (`client/…`), comme les autres updates.
