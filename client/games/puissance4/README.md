# Puissance 4 — module Arcade

Duel **2 joueurs** : grille 6 × 7, jetons Rouge 🔴 / Jaune 🟡, victoire à 4 alignés,
score de match persistant à travers les revanches, chat latéral et gestion des
déconnexions.

## Architecture « Host autoritaire »

- Le client du **Host** exécute le moteur pur (`Connect4Engine` — sans DOM ni
  réseau, exporté pour les tests) et **diffuse l'état** au salon.
- L'adversaire n'envoie que son **intention de coup** (`{ k: 'm', col }`) ; le Host
  valide (bon tour, colonne non pleine, partie en cours) et rediffuse l'état.
  Aucun coup illégal n'est accepté, même en cas de client trafiqué.
- **Transport** : la plateforme n'expose pas `context.broadcast`. La diffusion au
  salon se fait via `context.sendMessage(data)` **sans cible** (`to = null`), et
  l'envoi ciblé via `context.sendMessage(data, playerId)`. Le module contient un
  adaptateur qui utilisera `context.broadcast` s'il venait à exister.

### Canaux logiques (indépendants)

| Canal | Rôle | Réinitialisé à la revanche ? |
|---|---|---|
| `g` | état de jeu (grille, tour, scores) | oui (grille), non (scores) |
| `c` | chat (+ `c:sync` à l'arrivée) | **non — historique persistant** |
| `h` | heartbeat (détection de déconnexion) | — |

## Règles

- **Rouge = Host / premier connecté**, **Jaune = second connecté**.
- Rouge entame la manche 1 ; à chaque **revanche, le camp qui entame alterne**.
- **Victoire** : 4 jetons alignés (horizontal, vertical, deux diagonales) → les 4
  jetons pulsent en doré, « VICTORY! 🎉 » chez le gagnant, « DEFEAT… 😢 » chez le
  perdant, **+1** au gagnant.
- **Match nul** : grille pleine sans alignement → « DRAW! » et **+1 pour chacun**.
- **Score de match persistant** (« 🔴 X — Y 🟡 ») conservé d'une revanche à l'autre.

## Interface

- **7 flèches ⬇️ au-dessus des colonnes**, cliquables **uniquement par le joueur dont
  c'est le tour**, et **grisées** quand la colonne atteint 6 jetons.
- **Chute par gravité** : le jeton tombe depuis le haut jusqu'à la première case libre
  (`@keyframes c4fall`, distance proportionnelle à la hauteur traversée, léger rebond).
  Respecte `prefers-reduced-motion`.
- Chat latéral, responsive (passe sous la grille en dessous de 760 px).

## Déconnexion

Détection par **heartbeat** (la plateforme ne pousse pas la liste des joueurs aux
modules). Après **6 s** de silence de l'adversaire : écran
« Waiting for opponent to reconnect… » avec compte à rebours et flèches verrouillées.
Après **30 s** : **victoire par forfait** (+1). Si l'adversaire revient avant la fin du
décompte, la partie reprend exactement où elle en était.

## Installation

```bash
cp -r puissance4 <repo>/client/games/
node tools/merge-game-entry.mjs client/games/puissance4/game.entry.json
git add -A && git commit -m "Ajout du jeu Puissance 4 (v1.0.0)" && git push
```

Le catalogue (`games.json`) est **fusionné par l'outil officiel**, jamais écrasé : les
fiches des autres jeux restent strictement intactes.

## Tests

Moteur pur exporté (`import { Connect4Engine } from './index.js'`), testable en Node :
victoires horizontale / verticale / deux diagonales, refus des coups illégaux (hors
tour, colonne pleine, colonne invalide, partie finie), match nul (+1 chacun),
alternance de l'entame, persistance des scores, forfait. Tests DOM (jsdom, 2 clients) :
alternance des tours, verrouillage des flèches, colonne pleine grisée, surbrillance
dorée des 4 jetons, VICTORY/DEFEAT, revanche (grille vidée, entame inversée, scores et
**chat conservés**), écran d'attente puis forfait à la déconnexion.
