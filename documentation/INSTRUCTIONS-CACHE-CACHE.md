# Mise à jour : Cache-Cache 🙈 (zip audité, corrigé et REBASÉ)

Version rebasée sur le `games.json` réel que tu m'as transmis. **Les Échecs (v1.0.0, livrés par un autre développeur) sont préservés** — la version précédente de ce zip les aurait fait régresser en « en-developpement ».

## Deux corrections bloquantes sur le zip d'origine
1. **Chemins d'assets relatifs** : les 20 images étaient référencées en relatif, ce qui les fait pointer vers la racine du site depuis la SPA → **404 sur toutes les cartes et toutes les formes**, jeu inutilisable. Corrigé en base absolue `/games/cache-cache/assets`.
2. **`games.json` destructeur** : celui du zip était périmé (aurait régressé codenames, petit-bac, loup-garou, bomberman, memory + supprimé Le Dossier). Voir ci-dessous.

## ⚠️ À plusieurs développeurs : ne livrez plus jamais un `games.json` complet
Le catalogue est un fichier **partagé** : tout zip qui l'écrase efface le travail poussé entre-temps par quelqu'un d'autre. D'où l'outil livré ici.

### Option A (recommandée) — fusion sûre, quel que soit l'état du repo
```
node tools/merge-game-entry.mjs client/games/cache-cache/game.entry.json
```
Le script ne touche QUE la fiche du jeu (mise à jour sur place, ou remplacement d'un placeholder libre), laisse toutes les autres strictement intactes, et refuse la fusion si ce n'est pas le cas. `--dry-run` pour simuler. À réutiliser pour **tous les futurs jeux** : chaque module embarque désormais sa fiche dans `game.entry.json`.

### Option B — le `games.json` fourni
Il est déjà rebasé sur ton fichier actuel (9 jeux disponibles, Échecs inclus). Valable **si personne n'a poussé depuis** ton envoi ; dans le doute, préfère l'option A.

## Contenu
- `client/games/cache-cache/index.js` (corrigé), `config.json`, `README.md`, **`game.entry.json`** (fiche catalogue)
- `client/games/cache-cache/assets/maps/1..10.png` + `assets/formes/1..10.png` (~42 Mo)
- `tools/merge-game-entry.mjs` — l'outil de fusion (nouveau, générique)
- `client/games/games.json` — rebasé (option B)

## Installation
Copier en respectant l'arborescence, appliquer l'option A ou B, puis :
`git add -A && git commit -m "Ajout du jeu Cache-Cache (audité)" && git push`

## Tests
60 parties simulées (2-8 joueurs, 290 manches) : chaque joueur chasse exactement une fois, actions illégales refusées (mauvaise phase, mauvais rôle, bornes), pénalité de 3 s/clic, indices de proximité, temps écoulés, conservation des points (une cible = un point), classement complet. **Anti-triche revérifié à chaque cible** : la vue du Chasseur ne contient ni la position ni la forme. Fusion du catalogue testée : résultat identique au rebase manuel, aucune autre fiche modifiée.
