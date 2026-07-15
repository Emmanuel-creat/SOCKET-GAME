# Correctif — les invités ramenés à leur position de base

## Ce qui se passait

Une commande d'invité pouvait être **perdue définitivement**. Pas retardée : perdue.

`sendInput()` n'était appelé que sur un événement (touche enfoncée, touche relâchée,
souris, joystick). Or il contient deux garde-fous :

```js
if (!force && !rappel && sig === this.lastSig) return;    // rien de neuf : on se tait
if (!force && now - this.lastSent < INPUT_MIN_MS) return; // jamais plus de ~16/s
```

Le second est un piège. Si la commande **a changé** mais qu'on est à moins de 60 ms du
dernier envoi, on sort sans l'envoyer — et **aucun événement ne suivra pour la
renvoyer**. Le Host reste sur la commande précédente, pour toujours.

Un demi-tour, ça fait exactement ça : on relâche D, on appuie Q vingt millisecondes
plus tard. Deux événements, moins de 60 ms d'écart. **Le second est jeté.**

## Pourquoi ça donnait ce symptôme précis

Le Host croit que l'invité est à l'arrêt. L'invité, lui, se voit courir — il lit son
propre clavier. L'écart grandit à 3,3 cases/s. Passé 1,6 case — soit une demi-seconde —
la réconciliation considère que la prédiction a déraillé et **ramène sec l'invité à la
position que le Host lui connaît**. C'est-à-dire là où le Host l'a laissé : sa position
de base. Puis ça recommence. Toutes les secondes environ.

**Ce bug vient de mon update « Render Free »** (« n'envoyer une entrée que si elle a
changé »). Il était déjà là avant la prédiction : une touche qui « ne répond pas » de
temps en temps. La prédiction ne l'a pas créé — elle l'a rendu spectaculaire.

Among Us était **pire** : aucun mouvement de souris ne vient y rappeler `sendInput()`.
Le rappel d'1 Hz, censé servir de filet de sécurité, ne pouvait donc **littéralement
jamais se déclencher** tant que le joueur se contentait de tenir une touche.

## Le correctif

Les entrées passent désormais par la **boucle d'images**, qui tourne déjà à 40 Hz :

```js
this.sendInput();   // dans frame(), à chaque image
```

`sendInput()` se tait tout seul quand rien n'a changé. Mais si le limiteur a refusé une
commande, `lastSig` n'a pas été touché : la commande reste « neuve », et la boucle la
fait partir dès la fenêtre de 60 ms écoulée. **Plus rien ne se perd**, au pire 60 ms de
retard. Et le rappel d'1 Hz fonctionne enfin.

Deux fichiers, une ligne chacun (plus les commentaires qui expliquent le piège) :
`client/games/la-traque/index.js` et `client/games/among-us/index.js`. Les moteurs ne
sont pas touchés.

## Vérifié

Bout en bout — vrai serveur, vrai moteur chez le Host, invité qui enchaîne les
demi-tours, 80 ms de latence :

| | avant | après |
|---|---|---|
| Le Host sait ce que l'invité tient | **non** (il croit `(0,0)`) | **oui** |
| Écart prédiction / vérité | 0,99 case | **0,03 case** |
| « Ramené sec à sa place » | **2 fois** (sauts de 1,6 case) | **0** |

## Ce que ça coûte à Render

`sendInput()` est appelé 40 fois par seconde, mais il n'**envoie** que sur changement,
au plus 16 fois/s — le plafond est intact. Le seul vrai ajout, c'est le rappel d'1 Hz
qui se met enfin à fonctionner : **+0,8 msg/s par invité qui bouge**, soit **+4 msg/s**
à six joueurs. Le salon passe de ~51 à ~55 msg/s. C'était le budget prévu dès le départ.

## Test

```bash
node test-correctif.mjs        # avant / après, contre le vrai serveur
node test-cout-correctif.mjs   # le surcoût réseau
```
