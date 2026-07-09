# Codenames — module Arcade

Codenames à **4–12 joueurs** en deux équipes : les maîtres-espions font deviner les mots de leur équipe avec des indices « un mot + un nombre » ; toucher l'assassin fait perdre immédiatement.

## Architecture « Host autoritaire »

- Le client du **Host** exécute le moteur (`CodenamesEngine`, classe pure sans DOM ni réseau, exportée pour les tests) ; la banque de mots (`WORDS`, ~370 noms communs français) vit dans le module.
- La **clé des couleurs n'est envoyée qu'aux maîtres-espions** : chaque joueur reçoit une vue personnalisée via le relais `game:message` (envois ciblés) — un agent qui ouvre la console réseau ne voit jamais les couleurs non révélées.
- Les autres clients sont de purs afficheurs et envoient leurs actions au Host : `{ a: 'join' | 'start' | 'clue' | 'guess' | 'pass' }`.

## Règles implémentées

- Grille 5×5 tirée de la banque de mots : 9 mots pour l'équipe qui commence, 8 pour l'autre, 7 neutres, 1 assassin ; l'équipe qui commence alterne à chaque manche.
- Mise en place libre : chacun choisit son équipe et son rôle (exactement 1 maître-espion et au moins 1 agent par équipe, tout le monde assigné) ; le Host lance quand c'est valide.
- Indice : **un seul mot**, sans espace ni chiffre, différent (accents/casse ignorés) de tout mot non révélé de la grille, plus un nombre 0–9 (0 = essais illimités).
- Essais : nombre + 1 au maximum ; l'équipe doit désigner **au moins un mot** avant de pouvoir passer ; mot neutre ou adverse = fin du tour (le mot adverse est offert et peut conclure leur grille).
- Assassin : défaite immédiate de l'équipe qui le désigne.
- Victoire dès que tous les mots d'une équipe sont révélés, y compris par erreur adverse.
- Manches successives (le Host relance, les équipes peuvent être remaniées entre les manches), score de manches cumulé ; « Terminer la partie » renvoie tout le monde au salon avec le bilan.

## Déroulement côté joueurs

Salon de 4+ joueurs → le Host sélectionne **Codenames** → Lancer. Écran de composition des équipes, puis la grille : le maître-espion actif saisit son indice, ses agents cliquent les mots (ou passent), l'historique déroule la manche.

## Limites connues

- Pas de chronomètre de tour (le rythme est laissé aux joueurs).
- **Déconnexion en cours de manche** : la partie ne peut pas continuer sans le joueur ; le Host dispose de « Terminer la partie ». Si le Host quitte, le serveur ferme le salon (comportement standard du moteur).
- Les indices ne sont pas vérifiés sémantiquement (mots dérivés, traductions…) : comme autour d'une vraie table, c'est à l'adversaire de contester.

## Tests

Moteur pur testé en Node : 233 manches simulées (4–8 joueurs, indices et désignations aléatoires) — répartition 9/8/7/1 vérifiée à chaque grille, fins de manche cohérentes (assassin/grille), refus des actions illégales (double espion, indice multi-mots ou présent sur la grille, passe sans désignation, désignation par un espion ou hors tour), absence de fuite de la clé vers les agents.
