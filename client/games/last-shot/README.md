# Last Shot — module Arcade

Last Shot (alias possibles : *Crossfire Arena*, *Freeze & Fire*, *One Direction*) se joue de **2 à 12 joueurs** sur une plateforme flottante circulaire qui rétrécit à chaque manche. Deux phases par manche :

1. **Préparation (10 s)** : déplacement libre, saut, orientation de l'arme, ramassage de bonus au sol, verrouillage de la position.
2. **Résolution** : tout le monde tire, une fois chacun. Un joueur touché est éliminé immédiatement ; s'il n'a pas encore tiré, son tour est annulé.

Après chaque manche la plateforme rétrécit (~22 %, minimum un petit carré/cercle), jusqu'au dernier survivant.

## Architecture « Host autoritaire, calcul à la manche »

- Le client du **Host** exécute `LastShotEngine` (`engine.js`, pur, horloge injectée → testable en Node) dans une boucle légère à **70 ms**, mais seulement pour lisser les **déplacements** pendant la préparation.
- La **résolution des tirs n'est calculée qu'une seule fois par manche** : `engine.resolveRound()` détermine d'un coup l'ordre des tirs, les trajectoires, les collisions et les éliminations, puis produit un `shotLog` déterministe. Le Host diffuse cet état une fois ; **chaque client (Host compris) rejoue localement la même animation** à partir des mêmes données. Le serveur ne synchronise donc que :
  - les positions finales verrouillées,
  - l'orientation des armes,
  - l'ordre des tirs,
  - les résultats des collisions (le `shotLog`).
- Aucune information privée : l'état (positions, visées, bonus tenus) est diffusé à tout le salon, comme sur la plateforme réelle où tout le monde se voit.
- Les clients envoient leurs entrées **ciblées** au Host (`move`, `aim`, `jump`, `lock`) ; le Host applique et rediffuse.

## Règles détaillées

- **Arène** : cercle de rayon 440 au départ, réduit d'un facteur ~0,78 après chaque manche (minimum 90). Les joueurs trop excentrés sont repoussés vers l'intérieur à l'ouverture de la manche suivante — *simplification assumée* : le rétrécissement est un cercle uniforme plutôt que des pans de plateforme qui s'effondrent de façon irrégulière (piste d'amélioration listée plus bas).
- **Préparation** : vitesse de déplacement 230 u/s, visée continue via le pointeur (souris ou glissé tactile), saut purement visuel (aucun effet sur les collisions), verrouillage volontaire ou forcé à la fin du chrono.
- **Bonus** (un seul actif à la fois, ramassé au sol, consommé au moment du tir) :

  | Bonus | Icône | Effet |
  |---|---|---|
  | Double tir | ⚔️ | Deux projectiles, léger écart angulaire |
  | Laser | 🔺 | Traverse tous les joueurs alignés, ignore les boucliers |
  | Ricochet | ↩️ | Rebondit une fois sur le bord de l'arène |
  | Bouclier | 🛡️ | Bloque le prochain tir reçu (sauf Laser) |
  | Téléporteur | 🌀 | Échange sa position avec un adversaire vivant juste avant de tirer |
  | Gel | ❄️ | Si la cible touchée est protégée par un Bouclier, elle rate en plus son prochain tour |
  | Explosion | 💥 | Élimine aussi les joueurs proches du point d'impact |
  | Perforant | 🎯 | Traverse jusqu'à 3 joueurs supplémentaires |

- **Variante « Tir simultané »** : sélectionnable par l'Hôte avant le lancement. Tous les tirs sont évalués sur les positions figées en tout début de manche (au lieu d'un ordre séquentiel qui tient compte des morts en cours de résolution) : plusieurs joueurs peuvent s'éliminer mutuellement, et il est possible qu'il ne reste **aucun survivant** (partie nulle).
- **Victoire** : dernier joueur en vie ; en mode Tir simultané, une manche peut se terminer sans aucun survivant.

## Contrôles

- **Clavier** : flèches, **ZQSD** ou **WASD** pour se déplacer ; pointeur de souris sur l'arène pour viser ; **Espace** pour sauter ; **Entrée** pour verrouiller.
- **Mobile** : pavé directionnel tactile + bouton 🤸 (saut) + bouton 🔒 (verrouiller) ; viser en glissant le doigt sur l'arène.

## Limites connues / pistes d'amélioration

- Le rétrécissement de l'arène est un cercle uniforme (pas d'effondrement irrégulier de zones spécifiques) — fidèle à l'esprit du concept, simplifié pour rester lisible et robuste au relais.
- Les bonus ne se recombinent pas entre eux (un seul actif à la fois) ; combiner par exemple Double tir + Perforant serait une extension naturelle.
- Comme pour les autres modules : si le **Host** quitte, la plateforme promeut un nouveau Host mais ce module ne reprend pas l'état de la manche en cours — la partie repart du salon.
- Déconnexion : un joueur déconnecté reste immobile à sa dernière position connue et finira généralement éliminé.

## Tests

`engine.js` validé en Node avec **horloge virtuelle et RNG déterministe** (`mulberry32`) : 40 parties complètes (2 à 10 joueurs, moitié en mode Séquentiel, moitié en mode Tir simultané, entrées aléatoires), 373 manches jouées, invariants vérifiés à chaque tick (jamais hors de l'arène, rayon jamais sous le minimum, jamais plus d'un survivant en fin de partie, vainqueur cohérent avec le dernier survivant), plus deux scénarios dirigés (rayon initial, bouclier qui bloque et se consomme). 3 des 40 parties simultanées se sont terminées sans survivant, comme attendu par la variante.
