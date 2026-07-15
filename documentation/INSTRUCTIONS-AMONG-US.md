# Nouveau jeu : Among Us 🛸

Version complète, **4 à 15 joueurs**. Remplace la fiche `among-us` en-developpement.

## Contenu
- `client/games/among-us/engine.js` — moteur pur (carte, rôles, tâches, sabotages, conduits, réunions, votes, victoire)
- `client/games/among-us/index.js` — interface `<canvas>` (vision, mini-jeux, panneau de sabotage, écran de réunion et de vote, chat)
- `client/games/among-us/config.json`, `README.md`, `game.entry.json`
- `tools/merge-game-entry.mjs` — outil de fusion (identique à celui déjà livré)

**Aucun `games.json`** : le catalogue se met à jour avec l'outil.

## Installation
```
node tools/merge-game-entry.mjs client/games/among-us/game.entry.json
git add -A && git commit -m "Ajout du jeu Among Us" && git push
```

## Ce qui est dedans
**Carte** : The Skeld adaptée — 14 salles en boucle, 12 conduits formant un vrai graphe, caméras en Sécurité, table d'Administration (des nombres par salle, jamais des noms).

**Rôles** : Crewmate (tâches, signalement, vote), Impostor (kill, sabotage, conduits, fausses tâches, vision supérieure), Fantôme (traverse les murs, **continue ses tâches**, chat séparé, ne vote pas).

**16 tâches** courtes / longues / communes, certaines en plusieurs étapes dans plusieurs salles, avec 5 types de mini-jeux (câblage, code, séquence, astéroïdes, consoles). Les tâches de l'imposteur avancent dans sa liste — mais **ne remplissent jamais la barre**.

**5 sabotages** : lumières (divise la vision de l'équipage, pas celle des imposteurs), communications (masque tâches / caméras / admin), réacteur (45 s, deux pupitres à tenir **en même temps**), oxygène (45 s, deux codes qui forcent la séparation), portes (verrouille une salle 10 s).

**Réunions** : bouton d'urgence ou corps signalé ; discussion puis vote ; égalité = personne n'est éjecté ; votes anonymes et confirmation d'éjection en option. Le chat des vivants n'est ouvert qu'en réunion ; les fantômes ont leur propre canal.

**Tous les paramètres du tableau** sont réglables par le Host : imposteurs 1-3, vitesse 0,5×-3×, vision équipage et imposteur 0,25×-5×, cooldown kill 10-60 s, distance courte/normale/longue, réunions 0-9, discussion 0-120 s, vote 15-300 s, votes anonymes, confirmation d'éjection, barre des tâches (toujours/réunions/jamais), nombre de tâches.

Contrôles : ZQSD/WASD/flèches · F = utiliser · R = signaler · Espace = tuer. Mobile : joystick + boutons.

## Anti-triche
Deux secrets, deux filtres côté Host. **Les rôles** ne quittent jamais son navigateur (sauf entre complices imposteurs, et pour les fantômes). **Les positions** sont filtrées par la vision de chacun — d'où l'intérêt réel du sabotage des lumières — et un imposteur dans un conduit n'existe dans la vue de personne. Ouvrir la console ne donne rien.

Deux garde-fous supplémentaires sur les tâches : il faut être dans la bonne salle, et chaque étape impose une durée minimale vérifiée par le Host.

## Tests
30 parties complètes en temps virtuel (4-15 joueurs, réglages aléatoires) : carte entièrement connexe, aucun joueur dans un mur, victoires justifiées. **636 972 vues contrôlées une par une** avec recalcul indépendant : aucun rôle ne fuit, aucune position hors vision. 12 scénarios déterministes (kill, tâches, conduits, lumières, réacteur, égalité, éjection, parité, chat, portes…).

Note honnête : la simulation valide les règles, pas l'équilibrage — des agents aléatoires ne savent ni mentir ni déduire. Les réglages sont là pour ça.
