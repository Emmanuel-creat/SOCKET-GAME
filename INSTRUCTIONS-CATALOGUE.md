# Mise à jour : catalogue `games.json`

Catalogue à jour : ton `games.json` réel, avec les trois fusions de cette session appliquées (cache-cache, uno, la-traque).

## Contenu
- `client/games/games.json` — **11 jeux disponibles** : loup-garou 1.0.1, cache-cache 1.0.0, uno 1.0.0, codenames 1.0.0, tarot 1.0.0, petit-bac 1.2.0, bomberman 1.0.0, memory 1.0.0, echecs 1.0.0 (ton co-dev, préservé), devine-tete 1.0.0, la-traque 1.0.0 (à la place de `placeholder02`).
- `tools/merge-game-entry.mjs` — l'outil de fusion (au cas où).

Inchangés : les 11 fiches en-developpement (skyjo, belote, among-us, puissance4, morpion, blind-test, quiz, pendu, dessin-devine, bataille-navale, dominos) et les placeholders 03 à 05.

## Installation
Copier en respectant l'arborescence, puis :
```
git add -A && git commit -m "Catalogue : cache-cache, uno, la-traque" && git push
```

## ⚠️ Une seule précaution
Ce fichier est bâti sur l'état du repo que tu m'as transmis. **Si quelqu'un a poussé depuis, il écrasera son travail.** Dans ce cas, ne copie pas ce `games.json` : pars de celui du repo et rejoue les trois fusions (dix secondes, aucun risque) :
```
node tools/merge-game-entry.mjs client/games/cache-cache/game.entry.json
node tools/merge-game-entry.mjs client/games/uno/game.entry.json
node tools/merge-game-entry.mjs client/games/la-traque/game.entry.json
```
