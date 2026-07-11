# Bomberman — module Arcade

Bomberman **2 à 8 joueurs** en temps réel : arène 17×13, briques destructibles, bonus, chaînes de bombes, manches enchaînées automatiquement — premier à **3 manches gagnées**.

## Architecture « Host autoritaire » temps réel

- Le client du **Host** exécute `BombermanEngine` (`engine.js`, pur, horloge injectée → testable en Node) dans une boucle à **60 ms**. Il diffuse un état public compact quand quelque chose a changé (~15 fois/s en action).
- Bomberman n'a **aucune information privée** : l'état est diffusé à tout le salon en un seul envoi (pas de vues personnalisées).
- Les clients rendent l'état reçu et envoient leurs entrées **ciblées** au Host : direction maintenue (`input`) et pose de bombe (`bomb`). Le déplacement est **case par case** côté moteur (robuste à la latence du relais), lissé par transition CSS côté rendu.

## Règles

- Arène 17×13 : bordure et piliers indestructibles en damier, ~62 % de briques, **8 points d'apparition dégagés** (coins + milieux de bords), un par joueur.
- **Bombes** : mèche 2,5 s, limite simultanée par joueur (bonus), explosion **en croix** stoppée par les murs ; une brique touchée est détruite (et arrête la flamme) ; une bombe touchée **explose en chaîne**. On peut sortir de la bombe qu'on vient de poser, pas y revenir.
- **Bonus** (30 % par brique détruite) : 💣 bombe max +1 (plafond 8), 🔥 portée +1 (plafond 10), ⚡ vitesse +1. Les flammes détruisent les bonus exposés.
- **Flammes** létales pendant 450 ms. Mort = spectateur jusqu'à la fin de la manche.
- **Manche** : dernier survivant gagne ; 3 minutes maximum, sinon manche nulle ; la suivante démarre automatiquement (terrain régénéré, stats remises à zéro). **Partie** : premier à 3 manches, puis retour au salon automatique.

## Contrôles

- **Clavier** : flèches, **ZQSD** ou **WASD** (mappage par touche physique : compatible AZERTY/QWERTY) ; **Espace** ou **E** pour la bombe.
- **Mobile** : pavé directionnel tactile (appui maintenu) + gros bouton 💣.

## Limites connues

- La latence du relais (client → serveur → Host → serveur → clients) rend le jeu **réactif mais pas compétitif au pixel** : le pas de grille absorbe l'essentiel, prévoyez ~100-200 ms de délai perçu selon les connexions.
- **Déconnexion** : un joueur déconnecté reste immobile et finit en général soufflé ; s'il ne reste que lui, la manche se joue au timeout. Si le **Host** part, la plateforme promeut un nouveau Host mais ce module ne fait pas de reprise d'état (contrairement au Petit Bac) : la partie est perdue — le nouveau Host peut relancer depuis le salon.
- Pas de blocs poussables, malus, ni téléporteurs — extensions possibles.

## Tests

`engine.js` testé en Node avec **horloge virtuelle** : 25 parties complètes (2 à 8 joueurs, entrées aléatoires) jusqu'à la victoire — 119 manches, invariants vérifiés à **chaque tick** (positions légales, jamais dans un mur, pas de résurrection, bombes sur cases vides), scénario déterministe de létalité (bombe adjacente), double pose refusée, timeout = manche nulle, victoire exactement à 3 manches, chaînes et bonus exercés.
