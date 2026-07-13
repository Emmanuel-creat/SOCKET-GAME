# Update — Prédiction locale (La Traque + Among Us)

## Le problème

Un invité appuie sur une touche. Son personnage ne bouge qu'au retour de la vue du
Host : aller réseau + attente de la prochaine diffusion. **280 ms** mesurés sur une
connexion moyenne, jusqu'à 400 ms sur une mauvaise.

Ce n'est pas un bug — la position est juste, l'anti-triche fonctionne. Mais ça se
ressent exactement comme un lag, et c'est ce qui fait dire « ça rame » alors que
tout est correct.

## Ce que fait cet update

L'invité applique **son propre déplacement immédiatement**, avec le même code que le
moteur, puis se recale sur la vérité du Host dès qu'elle arrive.

| Connexion | Le personnage part au bout de… | | Recalage médian |
|---|---|---|---|
| | **avant** | **après** | |
| Bonne (30 ms) | 200 ms | **25 ms** | 0,01 case |
| Moyenne (80 ms) | 280 ms | **25 ms** | 0,04 case (~1 px) |
| Mauvaise (150 ms) | 400 ms | **10 ms** | 0,24 case |

Pire recul contre la commande (l'« effet élastique ») : **0,11 case**, soit 2-3 px
absorbés en 200 ms — sous le seuil de perception.

## Ce que ça ne change pas

- **L'anti-triche est intacte.** Le Host reste seul autoritaire. Le client ne
  *décide* de rien : il *devine* ce qu'on va lui dire. Un invité qui truquerait sa
  prédiction ne tricherait que contre lui-même — sa position réelle reste celle que
  le Host calcule, et c'est la seule que les autres voient.
  Non-régression : **5 844 075** vues La Traque + **980 076** vues Among Us
  recontrôlées une par une, aucune fuite.
- **Le serveur ne voit aucune différence.** Zéro message ajouté. La prédiction ajoute
  78 octets par vue (quatre nombres) ; le CPU du serveur suit le *nombre* de messages,
  pas leur taille. Coût pour Render : **nul**.

## Fichiers

| Fichier | |
|---|---|
| `client/games/shared/predictor.js` | **nouveau** — le prédicteur, partagé par les deux jeux |
| `client/games/la-traque/engine.js` | physique extraite en fonction partagée, `speedOf()`, horodatage des entrées |
| `client/games/la-traque/index.js` | prédiction branchée, rendu sur la position prédite |
| `client/games/among-us/engine.js` | idem |
| `client/games/among-us/index.js` | idem |

Rien d'autre à toucher : ni le serveur, ni `games.json`, ni les autres jeux.
Décompresser à la racine du dépôt, commit, push.

## Comment ça marche (les trois idées qui comptent)

**1. Le client ne recopie pas la physique — il l'importe.**
`stepCollision()` est extraite du moteur et exportée. Le Host et l'invité exécutent
*la même fonction*. Une copie côté client aurait divergé au premier changement de
règle ; ici, il n'y a pas de copie.

**2. On rejoue, on ne corrige pas.**
Quand une vue arrive, on ne se contente pas de rattraper un écart : on **repart de la
position vraie du Host** et on rejoue par-dessus toutes ses commandes depuis. La base
est donc toujours celle du Host — ses murs, ses blocages, ses captures. Corriger un
écart aurait laissé la trajectoire dériver à chaque coin de mur (le Host, qui reçoit
les commandes en retard, glisse le long du mur pendant que l'invité a déjà tourné).

**3. L'ancre exacte — et le décalage des horloges s'annule.**
Le point délicat : à quel instant de MA timeline correspond la position que le Host
m'envoie ? Il me renvoie `inputTs` (l'estampille de ma dernière commande, sur MON
horloge) et `inputAt` (quand il l'a reçue, sur la SIENNE). La vue est calculée à son
instant `t`. Il a donc intégré ma commande pendant `t − inputAt`, et moi je l'applique
depuis `inputTs`. Sa position reflète donc ma timeline à :

```
inputTs + (t − inputAt)
```

Chaque horloge apparaît une fois, en soustraction : **leur décalage disparaît de
l'équation**. Aucune estimation, aucune hypothèse de symétrie du réseau, et la gigue
est traitée commande par commande. Testé avec des horloges décalées de 37 secondes,
et une horloge locale qui saute de 5 s en pleine partie : écart résiduel 0,008 case.

**Un détail qui n'en est pas un** : la prédiction avance par pas de **50 ms**, comme
le moteur. Prédire à 40 images/s ce que le Host calcule par pas de 50 ms, c'est
intégrer autrement que lui — et deux trajectoires parties du même point finissent
ailleurs, surtout en rasant un mur. L'écran interpole le pas en cours, sans jamais le
réinjecter dans la simulation.

## La contrepartie, assumée

L'invité s'affiche **en avance** sur ce que les autres voient de lui (eux voient la
vérité du Host). C'est le prix de la réactivité, et c'est le fonctionnement normal de
tous les jeux en ligne. L'avance médiane est de 0,2 case à 80 ms. Conséquence
concrète : sur une mauvaise connexion, un joueur peut se croire échappé d'un cheveu
et être capturé quand même. Le Host a raison — c'est lui qui compte les points.

## Tests

```bash
node test-prediction.mjs        # réactivité, fidélité, effet élastique, horloge qui saute
node test-prediction-cout.mjs   # coût réseau et serveur
node test-la-traque.mjs         # non-régression + anti-fuite (5,8 M vues)
node test-among-us.mjs          # non-régression + anti-fuite (980 k vues)
```

## Piste si la bande passante devenait un sujet

Le Host pourrait pré-calculer l'ancre lui-même (`t + inputTs − inputAt`) et n'envoyer
qu'un seul nombre au lieu de quatre : 78 octets par vue tomberaient à ~20. Inutile
aujourd'hui (le CPU serveur ne bouge pas), mais c'est la simplification naturelle si
le trafic devient contraint.
