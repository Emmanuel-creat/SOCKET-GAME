# Optimisation réseau — le vrai coupable, et ce qui le corrige

## D'abord : le serveur n'était pas saturé

Tu as supposé que le serveur reçoit trop de mises à jour et n'arrive plus à les
traiter. J'ai mesuré, sur le vrai serveur, à **10 joueurs** :

| Trafic | Messages/s | CPU serveur | Budget Render Free |
|---|---|---|---|
| Code actuel (4 Hz) | 51 | **1,0 %** d'un cœur | 10 % |
| 10 diffusions/s | 103 | **2,3 %** | 10 % |
| L'ancien code d'avant « Render Free » | 324 | **5,3 %** | 10 % |

Le serveur tournait à **un dixième de son budget**. Il n'a jamais saturé — même
l'ancien code, quatre fois plus bavard, tenait. Le serveur ne peut donc pas être la
cause des téléportations. C'est une bonne nouvelle : ça veut dire que le problème est
ailleurs, et qu'il se corrige sans tout réécrire.

Le serveur ne « traite » d'ailleurs pas les mises à jour : il les **relaie** (il route
un message du Host vers un invité sans le lire). Relayer, c'est quasi gratuit. Le vrai
travail — filtrer ce que chaque joueur voit — se fait chez le **Host**, un navigateur,
pas sur Render.

## La vraie cause : le lissage des AUTRES joueurs

Ta position, elle, était déjà réglée (prédiction locale). Le problème, c'était
l'affichage des **autres** joueurs.

L'ancien code interpolait « de l'ancienne position vers la nouvelle » sur une durée
fixe, déclenchée **à l'arrivée de chaque paquet**. Ça suppose que les paquets arrivent
à intervalle régulier. Sur une vraie connexion, ils arrivent en avance, en retard,
groupés — jamais à l'heure. Résultat : le personnage des autres accélère, se fige,
puis **saute** pour rattraper. C'est ça que tu voyais comme une téléportation.

## La correction : un tampon horodaté (`interpolator.js`)

Nouveau module partagé `client/games/shared/interpolator.js`. Il fait ce que font les
jeux en réseau sérieux : il empile les vues reçues avec **leur** horodatage (celui du
Host), et affiche le monde tel qu'il était il y a un court instant — assez pour avoir
toujours deux vues qui encadrent l'instant dessiné. On ne « saute plus vers » la
dernière position : on lit une position à un instant donné, entre deux points connus.

Mesuré (un autre joueur qui court et fait demi-tour, ping 70 ms, gigue 30 ms) :

| | avant | après |
|---|---|---|
| Saccade (ce qui se voit comme un saut) | 7,4 cases/s | **4,1** — 2× moins brutale |
| Retard d'affichage des autres | 325 ms | **235 ms** |
| Erreur de position | 0,04 case | **0,03 case** |
| Images figées | 0 | 0 |

Plus fluide, **moins** en retard, et plus fidèle — les trois à la fois.

Trois garde-fous dans le module : un vrai saut (conduit, téléport) n'est jamais lissé
en glissé à travers un mur ; l'extrapolation (quand un paquet manque) est plafonnée à
120 ms et ne fait jamais entrer un joueur dans un mur ; un décrochage franc (onglet en
arrière-plan) se recale d'un coup au lieu de ramer.

## Vues allégées (delta) — le vrai gaspillage était là

Chaque vue d'Among Us répétait, **10 fois par seconde**, des données qui ne changent
jamais : le pseudo et la couleur de chaque joueur (déjà connus via le roster) et le
bloc d'options. J'ai versionné ces données : le Host ne les envoie plus que lorsqu'elles
changent, et le client les rattache par identifiant.

- Vue Among Us en régime établi : **1,88 Ko → 1,17 Ko** (−38 %).
- La Traque : gain marginal (sa vue, c'est surtout du dynamique : cônes, bruits, tirs),
  mais le même mécanisme est en place.
- Le rendu n'a pas été touché : le client reconstruit la vue exactement comme avant.
  Vérifié sur 1 800 vues — pseudo, couleur, skin, options : identiques au bit près.

## Cadence relevée — puisque c'est gratuit

Le code ralentissait les diffusions dès 6 joueurs pour ménager un serveur qui n'en avait
pas besoin. Comme les vues sont maintenant plus légères et l'affichage plus tolérant aux
irrégularités, je passe à **10 Hz jusqu'à 10 joueurs** (au lieu de 6,7 Hz à 6 joueurs).

Config finale mesurée sur le vrai serveur : **10 joueurs, 10 Hz → 2,6 % de CPU**, soit
7,4 points de marge sous le plafond Render Free. Le Host, lui, téléverse moins de
1 Mbit/s (une connexion domestique en a 5 à 10).

## Ce qui a été touché

- **`client/games/shared/interpolator.js`** — nouveau module (interpolation + extrapolation).
- **`client/games/la-traque/index.js`** et **`among-us/index.js`** — interpolateur branché
  à la place de l'ancien lissage ; réhydratation pseudo/couleur/skin/options ; cadence 10 Hz.
- **`client/games/la-traque/engine.js`** et **`among-us/engine.js`** — vues delta
  (options versionnées, pseudo/couleur/skin retirés des joueurs visibles, présents dans
  le roster).

Le serveur (`server/server.js`) **n'a pas été modifié** : il n'y avait rien à y corriger.

## Non-régression

- **Anti-fuite** : 5 844 075 vues La Traque + 980 076 vues Among Us contrôlées une par
  une — aucune position ni aucun rôle ne fuit hors du champ de vision. L'allègement des
  vues n'a rien ouvert.
- **Réhydratation** : 1 800 vues reconstruites côté client, strictement identiques à
  l'ancienne vue complète.
- **Interpolation** : plus fluide, moins en retard, plus fidèle (chiffres ci-dessus).
- **Charge** : 2,6 % de CPU à 10 joueurs / 10 Hz.

## Tests

```bash
node test-interpolation.mjs    # fluidité des autres joueurs, avant/après
node test-rehydratation.mjs    # le client reconstruit exactement l'ancienne vue
node test-charge.mjs <pid> 10 2 1330   # CPU serveur à 10 joueurs / 10 Hz
node test-la-traque.mjs        # anti-fuite (long)
node test-among-us.mjs         # anti-fuite (long)
```

## Après ça : le WebRTC

Tu voulais réduire le serveur à de la signalisation, avec les invités connectés
directement au Host. C'est la suite logique — mais elle n'a rien à voir avec les
téléportations, qui sont réglées ici. On l'attaque quand tu veux.
