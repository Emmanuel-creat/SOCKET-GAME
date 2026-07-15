# Nouveau jeu : La Traque 🔦

Labyrinthe dans le noir, 2 à 10 joueurs. Installé dans un **placeholder libre** (`placeholder02`) par l'outil de fusion.

## Contenu
- `client/games/la-traque/engine.js` — moteur pur (labyrinthe, obscurité, cône, détecteurs, bruit, tirs, bonus, manches)
- `client/games/la-traque/index.js` — interface `<canvas>` (obscurité, cône par lancer de rayons, HUD, clavier + tactile, chat)
- `client/games/la-traque/config.json`, `README.md`, `game.entry.json`
- `tools/merge-game-entry.mjs` — outil de fusion (identique à celui déjà livré)

**Aucun `games.json`** : le catalogue se met à jour avec l'outil, pour ne pas écraser le travail des autres développeurs.

## Installation
```
node tools/merge-game-entry.mjs client/games/la-traque/game.entry.json
git add -A && git commit -m "Ajout du jeu La Traque" && git push
```
→ « fiche « la-traque » installée à la place de placeholder02 », toutes les autres fiches inchangées.

## Le jeu
**Temps de cachette** (10/20/30 s) : le Chercheur est figé et aveugle, les autres se planquent. Puis la lampe s'allume et le **chrono** tourne (3/4/6 min).

Le Chercheur ne voit que son **cône de lampe** (64°, 7,5 cases, arrêté par les murs) et **entend** les pas — floutés à la case, jamais une position exacte. Il a **2 × le nombre de joueurs** de balles (réglable) ; une balle s'arrête sur les murs. À sec, il reste la **capture au contact**.

Les cachés voient sa **torche de loin** (c'est la seule lumière du niveau) et doivent rester immobiles : marcher fait du bruit, sprinter en fait beaucoup, la **marche furtive** est silencieuse mais lente. Les **détecteurs** disséminés déclenchent un **flash** qui révèle à *tout le monde* qui passe à proximité.

**Boîtes mystère ❓** : l'effet dépend du rôle. Chercheur → +2 balles, batterie (cône élargi), vitesse, sonar (voit à travers les murs, 9 cases). Cachés → vitesse, silence, radar (position du Chercheur), leurre (flash factice au loin pour détourner la traque).

**Modes** : rotation (chacun Chercheur une fois, classement cumulé) ou manche unique. **6 skins**, mémorisés dans le navigateur. **Chat en direct**, avec un canal séparé pour les éliminés (sinon ils balancent les cachettes).

Contrôles : ZQSD/WASD/flèches · Maj = furtif · Ctrl/E = sprint · souris = lampe · Espace/clic = tir. Mobile : joystick + boutons.

## Anti-triche
Point central : le Host envoie à chaque joueur une vue **filtrée par ce qu'il peut voir**. Les positions ne sont jamais diffusées — si le Chercheur ne vous voit pas, votre position n'existe pas dans son navigateur. Ouvrir la console ne sert à rien. (Les murs, eux, sont envoyés à tous : le labyrinthe n'est pas un secret, sans repères le jeu serait injouable.)

## Tests
40 parties simulées en temps virtuel (159 manches, 2-10 joueurs) : labyrinthe toujours connexe, aucun joueur dans un mur, Chercheur réellement figé pendant la cachette, rotation complète, conditions de victoire. **5,8 millions de vues contrôlées une par une** : le test recalcule indépendamment du moteur qui devrait être visible et vérifie qu'aucune position ne fuit. Neuf scénarios déterministes (cône, murs opaques, flash + cooldown, bruit flouté, furtivité, balle arrêtée par un mur, capture au contact, chrono, bonus par rôle, chat des morts isolé).

Note honnête : la simulation valide les **règles**, pas l'équilibrage — des agents aléatoires ne savent pas traquer. Les durées, la portée du cône et le nombre de balles se règlent dans les options si vos parties penchent trop d'un côté.
