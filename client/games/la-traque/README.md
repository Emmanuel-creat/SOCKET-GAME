# La Traque — module Arcade

Labyrinthe vu de dessus, **obscurité totale**, 2 à 10 joueurs. Un **Chercheur** muni d'une lampe torche ne voit que son cône lumineux et dispose de munitions comptées. Les autres se cachent dans le noir : rester immobile, c'est rester invisible.

## Architecture host-autoritaire — et pourquoi elle est vitale ici

Le Host fait tourner le moteur à **20 Hz** et envoie à chaque joueur une vue **filtrée par ce qu'il peut réellement voir** (10 Hz, lissée à l'écran). Les positions ne sont **jamais** diffusées.

C'est le point critique de ce jeu : dans un jeu de cachette, envoyer l'état complet à tout le monde et se contenter de le masquer à l'affichage revient à distribuer les cachettes à quiconque ouvre la console. Ici, si le Chercheur ne vous voit pas, votre position **n'existe pas** dans son navigateur.

Les murs, eux, sont envoyés à tous et dessinés en très sombre : le labyrinthe n'est pas un secret (sans repères, le jeu serait injouable) — les **positions** le sont.

## Déroulement d'une manche

1. **Temps de cachette** (10 / 20 / 30 s, réglable) : le Chercheur est **figé et aveugle**, lampe éteinte. Les autres courent se planquer. Les détecteurs sont inactifs.
2. **La traque** (3 / 4 / 6 min) : la lampe s'allume, le chrono tourne.
3. **Victoire** : le Chercheur gagne s'il élimine **tous** les cachés. Si le chrono s'épuise, les **survivants** l'emportent.

## Voir et être vu

| Ce que voit… | …le Chercheur | …un caché |
|---|---|---|
| Cône de lampe | 64°, 7,5 cases, **arrêté par les murs** | — |
| Contact | perçoit ce qui le frôle (1,3 case) | devine un autre caché à bout portant (1,2 case) |
| La lampe | — | **voit la torche de loin** (16 cases, si ligne de vue) : c'est la seule lumière du niveau |
| Bruits de pas | entend les cachés qui marchent (4,5 cases ; 8 en sprint), **flouté à la case** | n'entend rien |
| Flashs | révèlent **tout le monde** dans un rayon de 3,6 cases | idem |

**Détecteurs** : disséminés dans le labyrinthe, ils déclenchent un flash de 0,9 s dès qu'un joueur passe dessus (cooldown de 6 s). C'est le cœur de la tension : ils trahissent celui qui bouge, et le Chercheur doit surveiller chaque éclair.

**Bruit** : marcher fait du bruit, sprinter en fait beaucoup. La **marche furtive** (Maj) est silencieuse mais lente. Le Chercheur ne reçoit qu'une case, jamais une position exacte : il entend une direction, pas des coordonnées.

## Munitions et éliminations

Le Chercheur démarre avec **2 × le nombre de joueurs** de balles (réglable ×1 à ×3). Une balle part en ligne droite, **s'arrête sur les murs** et élimine le premier caché touché. Rechargement de 0,45 s. À court de munitions, il reste la **capture au contact** — il faut alors les débusquer à la main.

## Boîtes mystère ❓

Ramassables dans le labyrinthe, elles ne luisent que de près (6 cases). **L'effet dépend du rôle** :

- **Chercheur** : +2 balles · 🔦 batterie (cône élargi à 92°, portée 11,5 cases) · 💨 vitesse · 📡 sonar (révèle les cachés à 9 cases, **murs compris**).
- **Cachés** : 💨 vitesse · 🤫 silence (plus aucun bruit, 15 s) · 👁️ radar (position du Chercheur, 6 s) · 📣 leurre (déclenche un **flash factice au loin** pour détourner la traque).

## Modes, skins, chat

- **Rotation** (par défaut) : chaque joueur est Chercheur une fois, classement cumulé. Points : +2 par élimination et +3 pour un carton plein ; +2 par survie.
- **Manche unique** : une seule partie.
- **6 tenues** au choix (🥷 🦊 👻 🐦‍⬛ 🦡 🐈‍⬛), mémorisées dans le navigateur.
- **Chat en direct**, avec un canal **séparé pour les éliminés** : sans cela, un joueur abattu balancerait les cachettes des autres en deux secondes. Les éliminés passent spectateurs (ils voient tout) et ne parlent qu'entre eux.

## Contrôles

Déplacement **ZQSD / WASD / flèches** · **Maj** = furtif · **Ctrl** ou **E** = sprint (consomme l'endurance) · **souris** = orientation de la lampe · **Espace** ou **clic** = tir. Sur mobile : joystick + boutons 🤫 💨 🔫.

## Limites connues

- Si le Host quitte, la plateforme promeut un nouveau Host mais ce module ne reprend pas l'état : il faut relancer depuis le salon.
- Un joueur déconnecté reste figé sur la carte (cible facile) ; aucun mécanisme de remplacement n'est prévu.
- Le trafic est de ~10 vues/seconde et par joueur. À 10 joueurs sur une instance Render gratuite, un peu de latence est possible ; les positions distantes sont lissées à l'affichage pour l'absorber.

## Tests

`engine.js` est pur (horloge injectée) et simulé en temps virtuel : **40 parties, 159 manches, 2 à 10 joueurs**. Vérifiés à chaque tick — labyrinthe toujours connexe (aucune zone inatteignable), aucun joueur dans un mur, munitions et endurance bornées, Chercheur réellement figé et aveugle pendant la cachette, rotation complète des Chercheurs, conditions de victoire.

Surtout : **5,8 millions de vues contrôlées une par une**. Pour chaque joueur et à chaque tick, le test recalcule *indépendamment du moteur* qui devrait être visible (cône, contact, flash, sonar, radar, lampe visible, proximité) et vérifie qu'aucune position n'apparaît dans une vue sans l'une de ces raisons. Neuf scénarios déterministes couvrent le reste : cône (le dos reste invisible), murs opaques, flash de détecteur et son cooldown, bruit flouté à la case, furtivité silencieuse, balle arrêtée par un mur, capture au contact sans munition, chrono, bonus par rôle, isolement du chat des éliminés.
