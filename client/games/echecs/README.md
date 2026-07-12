# Échecs — module Arcade

Module autonome (aucun import du cœur de la plateforme) implémentant le jeu d'échecs complet :
règles officielles, IA locale à plusieurs niveaux, partie en ligne à 2, mode « canapé » (deux
joueurs sur le même écran), horloge, historique en notation algébrique, PGN/FEN, chat de partie.

## Architecture

- **Solo (vs IA) et « canapé »** : aucune donnée réseau. Le `ChessEngine` tourne intégralement
  dans le navigateur du joueur ; l'IA calcule dans un Web Worker dédié (`ai-worker.js`) pour ne
  jamais geler l'interface (repli en calcul local différé si les Web Workers modules sont
  indisponibles).
- **En ligne à 2** : même schéma « Host autoritaire » que le Tarot. Le Host fait tourner le
  moteur canonique et diffuse `{fen, historique, horloges}` via `game:message` ; l'invité envoie
  des tentatives de coup ciblées vers le Host, qui valide avant de rediffuser. Le salon doit
  contenir 1 joueur (modes solo) ou 2 joueurs (en ligne) — `config.json` déclare
  `joueurs: {min:1, max:2}`.
- **Chat de table** : même principe que celui ajouté au Tarot (diffusion directe via
  `game:message`, fil propre à la partie en cours, non persisté côté serveur).

## Moteur (`engine.js`)

Pur, sans DOM, testable en Node. Plateau 64 cases, génération de coups pseudo-légaux puis
filtrage par simulation (aucun coup ne peut laisser son propre roi en échec). Couvre : roque
petit/grand (avec toutes les conditions : cases libres, non traversée d'échec, perte des droits
si le roi/la tour bouge *ou si la tour est capturée*), prise en passant (fenêtre d'un demi-coup),
promotion avec choix de la pièce, échec/mat/pat, règle des 50 coups, répétition de position (x3),
matériel insuffisant (roi seul, roi+mineure, fous de même couleur de case), FEN et notation SAN
(avec désambiguïsation colonne/rangée/case) en import/export.

Validé par **perft** (comptage exhaustif de coups, référence standard en programmation
d'échecs) sur la position de départ et sur des positions de test connues pour leurs pièges
(roque + prise en passant + promotion simultanés) : les comptes obtenus correspondent exactement
aux valeurs de référence jusqu'à profondeur 3-4, ce qui donne une forte garantie de correction
sur l'ensemble des règles plutôt qu'un simple test au cas par cas.

## IA (`ai.js` + `ai-worker.js`)

Négamax + élagage alpha-bêta, extension de quiescence sur les captures, tri des coups (captures
d'abord), approfondissement itératif borné en temps. 5 niveaux (Débutant → Expert) obtenus en
combinant profondeur/temps de recherche et un taux de coup aléatoire décroissant. Testée par
auto-parties complètes IA vs IA jusqu'à leur terme (mat, nulle ou plafond de coups) sans jamais
produire de coup illégal.

**Honnêteté sur le niveau** : c'est une IA légère et honnête (quelques centaines à quelques
milliers de nœuds par coup selon le niveau), pas un moteur professionnel type Stockfish. Le
niveau « Expert » reste un adversaire raisonnable pour un joueur occasionnel, pas pour un joueur
expérimenté.

## Apparence

10 thèmes de plateau (palettes de couleurs) et 8 skins de pièces (silhouettes vectorielles
partagées, seul le traitement de matière change : bois, cristal, or, obsidienne...). Choix
appliqués instantanément, sans recharger la partie.

## Limites connues

- **IA** : force raisonnable mais non professionnelle (voir ci-dessus) ; pas de table
  d'ouvertures ni de tablebases de finales.
- **PGN import** : couvre le cas standard (partie linéaire, commentaires/variantes ignorés
  proprement). Pas de support des parties avec variantes imbriquées complexes ou de NAG.
- **Mode spectateur** : non implémenté. La plateforme actuelle ne prévoit pas de créneau
  "observateur" au-delà de `joueursMax` dans un salon ; l'ajouter proprement toucherait la
  gestion des salons côté serveur, hors périmètre d'un module de jeu autonome.
- **Reconnexion en cours de partie en ligne** : le fil de coups se resynchronise dès le prochain
  coup, mais un rafraîchissement pendant une longue déconnexion peut faire perdre le détail des
  captures intermédiaires à l'affichage (l'échiquier et l'historique, eux, restent corrects).
- **Horloge Bronstein** : seul le mode Fischer (incrément ajouté après le coup) est proposé dans
  les préréglages ; l'incrément à 0 permet une cadence simple « temps fixe ».
- **Sons** : générés procéduralement (Web Audio, oscillateurs) plutôt que des échantillons
  enregistrés — aucun fichier audio à charger, mais un rendu plus « rétro » que orchestral.

## Tests

`engine.js` et `ai.js` sont testés indépendamment en Node (perft, règles spéciales, légalité
systématique, parties complètes). L'intégration (montage, clics sur l'échiquier, promotion,
mat, partie en ligne host/invité, chat, nulle, revanche) a été validée via une simulation DOM
(jsdom) reproduisant fidèlement le contrat de la plateforme (`mount(container, context)` /
`unmount()`, relais `game:message`).
