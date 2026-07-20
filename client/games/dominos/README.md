# Dominos

Jeu de dominos complet pour la plateforme Arcade — double-six par défaut,
2 à 4 joueurs, humains et/ou IA.

## Architecture

Comme tous les jeux de cette plateforme : **Host autoritaire**. Le
navigateur du Host exécute `DominoEngine` (moteur pur, aucune dépendance
DOM/réseau) et envoie à **chaque joueur individuellement** sa propre vue
via `game:message` — jamais de diffusion, puisque la main de chaque joueur
est une information privée. Les invités envoient leurs coups au Host, qui
les valide via le moteur avant de rediffuser le nouvel état.

## Fichiers

- `index.js` — tout le module : moteur (`DominoEngine`), IA
  (`aiChooseAction`), interface (`DominoUI`), styles, et le contrat
  `{ mount, unmount }` attendu par la plateforme.
- `test-engine.mjs` — suite de tests Node (aucune dépendance, aucun
  navigateur nécessaire) : `node test-engine.mjs`. Couvre la distribution,
  la validation des coups, les doubles, la pioche, le blocage et son
  système de score, les manches successives, le score cible, les forfaits,
  la confidentialité des mains, la sauvegarde/reprise, et des parties
  complètes simulées (2 à 4 joueurs, 3 niveaux d'IA, 100+ parties
  aléatoires) pour vérifier qu'aucune partie ne boucle ni ne se bloque
  anormalement.
- `config.json` — documentation des règles exactes appliquées (utile pour
  trancher les cas ambigus des règles de dominos, qui varient selon les
  maisons).

## Lancer les tests

```
cd client/games/dominos
node test-engine.mjs
```

## Ce qui est simplifié (honnêteté sur le périmètre)

- **IA** : heuristique (pondération des coups), pas de recherche en
  profondeur type minimax. Le niveau « difficile » voit l'état complet du
  jeu (mains adverses, pioche) pour évaluer ses coups — ce n'est pas une IA
  à information imparfaite qui déduit les mains adverses par déduction
  logique. Crédible pour jouer, pas conçue pour être imbattable.
- **Sauvegarde** : filet de sécurité local au navigateur du Host
  (`localStorage`), pas une persistance côté serveur. Si le Host change
  d'appareil ou si le serveur redémarre, la partie en cours est perdue —
  comme pour tous les autres jeux de cette plateforme (aucun jeu existant
  ne persiste son état côté serveur).
- **Variantes** : double-six / double-neuf / double-douze sont
  implémentées nativement (le moteur généralise déjà à n'importe quel
  `maxPips`). Des règles de maison plus exotiques (dominos mexicains,
  chicken foot, etc.) ne sont pas incluses.
