# UNO — module Arcade

UNO **2 à 10 joueurs**, règles officielles complètes + les variantes maison réglables par le Host. Chat de table intégré.

## Architecture « Host autoritaire »

- Le client du **Host** exécute `UnoEngine` (`engine.js`, pur, sans DOM ni réseau, exporté pour les tests) ; `index.js` porte l'interface.
- **Les mains ne quittent jamais le Host** : chaque joueur reçoit une vue personnalisée contenant *sa* main et, des autres, uniquement leur **nombre de cartes**. Un joueur qui inspecte le réseau ne voit aucune carte adverse.
- Seule exception, prévue par la règle : quand un bluff au Joker +4 est démasqué, la main du bluffeur est montrée **au seul contestataire**.

## Règles implémentées

- **Paquet de 108 cartes** : par couleur (rouge, jaune, vert, bleu) un 0, deux 1-9, deux Passe, deux Inversion, deux +2 — plus 4 Jokers et 4 Jokers +4.
- **7 cartes** distribuées ; la première carte est retournée et son effet s'applique (Passe, Inversion, +2, Joker → couleur tirée au sort). Le +4 ne peut jamais être la carte de départ.
- On joue une carte de la **même couleur**, du **même symbole**, ou un **Joker**. Les cartes injouables sont grisées : le moteur refuse tout coup illégal.
- **Passe**, **Inversion** (= Passe à 2 joueurs), **+2**, **Joker** (choix de la couleur).
- **Joker +4 avec contestation** (règle officielle) : il se joue en bluff. Le joueur visé peut **contester** — si le poseur avait une carte de la couleur en cours, il pioche à sa place et **doit montrer sa main** ; sinon le contestataire pioche 6 et perd son tour.
- **« UNO ! »** : crié automatiquement quand vous posez votre avant-dernière carte. Si vous jouez sans annoncer (bluff), une **fenêtre de 6 secondes** s'ouvre : n'importe qui peut cliquer « CONTRE-UNO ! » → 2 cartes de pénalité. Un bouton « UNO ! » permet de se rattraper à temps.
- **Pioche épuisée** : la défausse est remélangée (la carte du dessus reste en jeu).
- **Décompte** : le premier à vider sa main marque la valeur des cartes des autres (chiffres = valeur faciale, Passe/Inversion/+2 = 20, Jokers = 50). Les manches s'enchaînent jusqu'au **score cible**.

## Variantes réglables par le Host

| Option | Effet |
|---|---|
| **Cumul des pénalités** | Un +2 se contre par un +2, un +4 par un +4 : les cartes s'additionnent sur le suivant qui ne peut pas contrer. |
| **Jouer la carte piochée** | Si la carte piochée est jouable, on peut la poser dans la foulée (sinon le tour passe). |
| **Contestation du Joker +4** | Active le bluff et la contestation. Désactivée, le +4 est toujours légal. |
| **Score cible** | 100, 200 ou 500 points. |

## Limites connues

- **Déconnexion** : le Host dispose d'un bouton « ⏭️ Forcer le tour (joueur absent) » qui fait piocher et passer le joueur bloqué. Si le Host quitte, la plateforme promeut un nouveau Host mais ce module ne reprend pas l'état (contrairement au Petit Bac) : il faut relancer depuis le salon.
- Pas de « jump-in » (poser une carte identique hors de son tour) ni de règle du 0/7 : ces variantes changent la structure des tours et ne sont pas implémentées.
- Le cumul et la contestation peuvent se combiner : empiler un +4 revient alors à renoncer à contester, et la contestation porte sur le dernier +4 posé (pénalité accumulée comprise).

## Tests

`engine.js` est testé en Node : **120 parties complètes** (2 à 10 joueurs, 310 manches enchaînées, options tirées au sort) — composition exacte du paquet (108 cartes, 1240 points), conservation des 108 cartes à chaque coup, refus des coups hors-tour et illégaux, et **contrôle anti-fuite à chaque tour** (aucune carte adverse dans la vue d'un joueur ; la main du bluffeur n'est révélée qu'au contestataire). Cinq scénarios déterministes vérifient l'inversion à 2 joueurs, le cumul des +2 (contres puis encaissement), la contestation gagnante (le bluffeur pioche, le contestataire garde son tour), la contestation ratée (6 cartes, tour perdu) et le décompte de fin de manche.
