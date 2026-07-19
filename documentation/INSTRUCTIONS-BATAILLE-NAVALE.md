# Update — Nouveau jeu : Bataille Navale

Ajoute un module de jeu complet et jouable (2 à 6 joueurs), conforme au contrat
de module Arcade (`mount`/`unmount`, architecture Host autoritaire comme
`puissance4`/`petit-bac`). Remplace le placeholder vide déjà présent dans le
catalogue.

## Fichiers concernés

```
client/games/bataille-navale/index.js       (nouveau contenu — était vide)
client/games/bataille-navale/config.json    (nouveau contenu — était vide)
client/games/bataille-navale/README.md      (nouveau contenu — était vide)
client/games/games.json                     (entrée bataille-navale mise à jour)
```

⚠️ `games.json` est le catalogue **complet** de tous les jeux — le fichier
fourni ici contient l'intégralité du tien avec une seule entrée modifiée
(bataille-navale : `etat: "disponible"`, `joueursMax: 6`, `version: "1.0.0"`,
nouvelle description). Si tu as touché `games.json` de ton côté depuis
l'export de ce projet, fais un `git diff` avant d'écraser pour ne perdre aucun
autre changement — sinon tu peux le remplacer directement.

## Installation

Dézippe à la racine du repo (`C:\Users\Admin\OneDrive\Bureau\arcade\`), en
écrasant les 4 fichiers ci-dessus, puis :
```powershell
git add .
git commit -m "Ajout du jeu Bataille Navale (2-6 joueurs, bonus, événements, reprise Host)"
git push origin master
```

---

## 🎮 Le jeu

Chaque joueur place sa flotte (5 navires : longueurs 4, 3, 2, 2, 1) sur sa
propre grille 8×8. Une fois tout le monde prêt, la bataille se joue **en
manches simultanées** : chaque capitaine encore en vie choisit une cible et
une action (tir ou bonus), tout se résout d'un coup, puis manche suivante.
Dernier capitaine avec un navire encore à flot = victoire.

### Bonus (8, obtenus en coulant un navire / trouvant une épave / enchaînant des tirs réussis)
🎯 Double Tir · 📡 Radar · 🚀 Missile de Croisière · ✚ Frappe en Croix ·
🌊 Torpille · 🛡️ Bouclier · 🔍 Scanner · 🍀 Canon Chanceux

### Événements mondiaux (1 tiré au sort toutes les 4 manches)
🌀 Tempête (les flottes intactes dérivent) · 🌫️ Brouillard (bloque
Radar/Scanner 2 manches) · 📦 Caisse de ravitaillement (bonus gratuit au plus
endommagé)

### Résilience réseau
- **Forfait automatique** après 30 s de silence d'un joueur (avec un statut
  "en attente de reconnexion" affiché dès 6 s).
- **Reprise d'arbitrage** si l'Host se déconnecte en pleine bataille : le
  nouveau Host reconstruit l'état à partir de ce qu'il a déjà reçu, puis
  redemande leur grille à chaque survivant (les grilles sont secrètes, donc
  impossibles à deviner) avant de reprendre la partie normalement.

Détails complets des règles : `client/games/bataille-navale/README.md`.

## 🧪 Ce qui a été testé avant livraison

Le moteur (`NavalEngine`, pur, sans DOM ni réseau — exporté du fichier pour
d'éventuels tests futurs) a été exercé via des scripts Node dédiés :
- Parties complètes simulées de bout en bout (placement → bataille → victoire),
  avec usage aléatoire des 8 bonus, sur une dizaine d'exécutions.
- Un **bug a été trouvé et corrigé pendant ces tests** : l'événement Tempête
  pouvait faire dériver un navire sur une case déjà visée par un tir
  précédent (ou déjà occupée par un autre navire), ce qui pouvait geler la
  partie indéfiniment (case injouable, navire jamais coulable). Le correctif
  empêche désormais un navire de dériver vers une case déjà visée ou déjà
  occupée — la tempête épargne ce joueur ce tour-ci dans ce cas plutôt que de
  produire un état incohérent.
- Le mécanisme de forfait (élimination après silence prolongé) et le chemin
  de resynchronisation après migration de Host ont été testés séparément et
  fonctionnent correctement.

Ce qui n'a **pas** pu être testé automatiquement (nécessite un navigateur/DOM
réel, pas seulement Node) : le rendu visuel de l'UI, les clics sur les
grilles, l'affichage du décompte de reprise. À vérifier manuellement en jeu
avant de considérer la livraison définitive.

## Pistes d'extension non incluses (voir le README du jeu pour le détail)

Le cahier des charges d'origine évoquait aussi : modes de jeu alternatifs
(Équipes, Battle Royale, Chaos, Chasse au Trésor, Brouillard total), fusion/
séparation de navires, navires spéciaux (sous-marin invisible, porte-avions,
navire explosif), déplacement manuel d'un navire par le joueur. Volontairement
laissées de côté pour livrer un cœur de jeu complet et solide plutôt que des
mécaniques à moitié câblées — elles s'intégreraient dans `NavalEngine` sans
toucher au contrat de module.
