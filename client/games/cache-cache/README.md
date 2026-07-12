# Cache-Cache — module Arcade

Cache-cache asynchrone à **2 à 8 joueurs** : chaque joueur est Chasseur exactement une fois et doit retrouver tous les autres, chacun caché sur la carte de son choix.

## Architecture « Host autoritaire »

- Le client du **Host** exécute le moteur de règles (`CacheCacheEngine`, classe pure sans DOM ni réseau, exportée pour les tests). Il ne possède aucun `setTimeout` interne : il expose des méthodes de transition (`startRound`, `beginHide`, `beginHunt`, `nextHuntTarget`, `resolveTimeout`, `forceAdvanceFromPickMap`, `forceAdvanceFromHide`…) que la couche Host orchestre avec des minuteries, exactement comme les modules Tarot et Memory.
- **Confidentialité stricte** : les choix de carte, de forme et de position **ne quittent jamais le Host** sous leur forme brute. Chaque joueur reçoit une vue personnalisée (`getViewFor(playerId)`) :
  - Pendant le choix de carte / la cache : seul le cacheur concerné reçoit `mySelection` (sa propre carte/forme/position). Les autres cacheurs et le Chasseur ne voient que des statuts génériques (`choisit sa carte…`, `se cache…`, `prêt·e`).
  - Pendant la chasse : le Chasseur reçoit uniquement l'identifiant de la carte de fond de la cible en cours (jamais la forme ni sa position — la résolution du clic est calculée côté Host). Le joueur actuellement recherché voit sa propre carte + sa forme (normal, ce sont ses données) ainsi que les clics du Chasseur en direct. Les autres cacheurs en attente ne voient qu'un statut public (qui est recherché, dernier indice de couleur, nombre de clics).
- Les autres clients sont de purs afficheurs : ils rendent la dernière vue reçue et envoient leurs actions (`{ a: 'pickMap' | 'place' | 'lock' | 'huntClick' }`) au Host.
- Transport : relais générique `game:message` du moteur — envoi ciblé par joueur pour les vues de jeu (jamais de diffusion publique de données sensibles), diffusion à tout le salon pour le chat (comme dans le module Memory).

## Assets

Fournis par la plateforme dans `client/games/cache-cache/assets/`, copiés tels quels (mêmes noms, mêmes dossiers) :
- `assets/maps/1.png` à `10.png` — 10 cartes de fond, utilisées comme `background-image` d'une zone de jeu carrée (`aspect-ratio: 1/1`, `object-fit: cover` implicite via `background-size: cover`).
- `assets/formes/1.png` à `10.png` — 10 formes à cacher, affichées en superposition (taille et rotation ajustables par le cacheur).

⚠️ Les fichiers fournis sont volumineux (jusqu'à ~4 Mo par carte, ~42 Mo au total) et n'ont pas été recompressés afin de préserver exactement les assets fournis. Pour une mise en production, il est recommandé de les optimiser (redimensionnement, compression WebP) — cela n'a **pas** été fait ici pour respecter la consigne « ne pas renommer/altérer sauf nécessité ».

## Déroulement d'une manche

1. **Choix de carte (30 s)** — chaque cacheur sélectionne une carte parmi les 10 (peut changer d'avis jusqu'à la fin de la phase). Passage anticipé à l'étape suivante si tout le monde a choisi ; sinon attribution aléatoire aux retardataires à l'expiration du délai.
2. **Cache (30 s)** — chaque cacheur choisit une forme, la place en cliquant/touchant la carte (ou via les flèches du clavier + Entrée), ajuste taille et rotation, puis verrouille. Une fois verrouillée, la cachette ne peut plus bouger. Passage anticipé si tout le monde a verrouillé ; sinon verrouillage automatique (forme et position aléatoires) à l'expiration du délai.
3. **Chasse (30 s par carte, ordre aléatoire)** — le Chasseur clique sur la carte de la cible en cours. Chaque clic coûte 3 secondes sur le temps restant. Un clic dans le rayon de la forme = trouvé (+1 point Chasseur, carte suivante). Un clic manqué renvoie un indice de proximité normalisé (couleur + libellé, du bleu clair « très loin » au rouge « brûlant »), affiché publiquement à côté des informations du Chasseur le temps de cette chasse. Si le temps s'écoule sans succès, le cacheur marque 1 point et on passe à la carte suivante. Une brève transition (« Trouvé ! » / « Temps écoulé ! ») s'affiche entre deux cibles.

La partie s'enchaîne automatiquement : dès qu'un Chasseur a fouillé tout le monde, la manche suivante démarre avec le prochain joueur (ordre tiré au sort en début de partie) jusqu'à ce que tous aient chassé une fois. Classement final par points cumulés, égalité partagée.

## Interface

- Zone de jeu principale carrée et centrée légèrement à gauche, utilisable à la souris, au tactile et au clavier (flèches pour déplacer le curseur, Entrée/Espace pour valider).
- En-tête : titre, manche x/total, phase et minuteur, nom du Chasseur, nom du joueur actuellement recherché (en chasse), nombre de clics, légende du dégradé de proximité, et pastille de couleur du dernier clic.
- Colonne latérale : tableau des scores en direct, statut/rôle du joueur, chat de partie, et pour le Host un bouton « 🛑 Terminer la partie » (même comportement que dans Tarot : classement affiché puis retour automatique au salon après quelques secondes).
- Pendant le choix de carte / la cache, le Chasseur ne voit qu'un écran d'instructions (minuteur, statuts génériques des cacheurs, rappel de la pénalité de clic et du dégradé de proximité) — jamais les cartes ni les formes des autres.

## Limites connues

- **Déconnexion en cours de manche** : comme pour Tarot, la partie ne peut pas se poursuivre sans le joueur concerné ; le Host dispose du bouton « Terminer la partie » pour ramener tout le monde au salon. Si le Host lui-même quitte, le serveur ferme le salon (comportement standard du moteur).
- La zone de jeu est affichée en carré (`cover`) quelle que soit la proportion réelle de l'image source : les cartes non carrées sont donc légèrement rognées sur les bords, pas déformées.
- Le rayon de succès du clic dépend de l'échelle choisie par le cacheur (formes plus grandes = plus faciles à trouver), volontairement, pour donner un intérêt stratégique au réglage de taille.

## Tests

Le moteur étant pur et exporté (`import { CacheCacheEngine } from './index.js'`), il est testable en Node sans navigateur : 210 parties complètes simulées (2 à 8 joueurs, choix aléatoires légaux à chaque étape, timeouts simulés), invariants vérifiés (chaque joueur chasse exactement une fois, nombre de manches = nombre de joueurs, total de points distribués = manches × (n-1), classement final toujours complet), et rejet vérifié des actions illégales (mauvaise phase, mauvais joueur, carte/forme hors bornes, effectifs hors 2–8 joueurs).

## Audit d'installation (plateforme)

Le zip d'origine a été audité et corrigé avant intégration :

- **`games.json` obsolète remplacé (bloquant)** : celui du zip datait d'avant les mises à jour Codenames / Petit Bac / Le Dossier / Loup-Garou / Bomberman / Memory. L'écraser aurait fait régresser **5 jeux** en « en-developpement » v0.0.0 (donc injouables) et **supprimé la fiche du Dossier** au profit de l'ancien `placeholder01`. Le `games.json` livré ici repart de l'état courant du repo, avec la seule fiche `cache-cache` mise à jour (disponible, v1.0.0, 2-8 joueurs).
- **Chemins d'assets corrigés (bloquant)** : le module référençait ses images en relatif. Dans une url() CSS ou un `src` d'image, un chemin relatif se résout par rapport à l'URL de la **page** (la SPA, servie à la racine) et non à celle du module : toutes les cartes et toutes les formes auraient renvoyé un 404, rendant le jeu inutilisable. Passage à une base absolue `/games/cache-cache/assets`, comme les modules Memory et Le Dossier.

Le reste du module était conforme : contrat du relais respecté (vues ciblées, chat diffusé, `onEnd` avec résumé), moteur pur exporté et testable, et **confidentialité correcte** — la vue du Chasseur ne contient ni la position, ni la forme de la cachette, seulement la carte et l'indice de proximité.
