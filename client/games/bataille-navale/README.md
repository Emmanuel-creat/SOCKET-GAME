# Bataille Navale — module Arcade

Duel **2 à 6 joueurs**, chacun sur sa propre grille 8x8, flotte de 5 navires
(longueurs 4, 3, 2, 2, 1). Bataille en manches simultanees : tout le monde
choisit sa cible et sa case au meme tour, resolution commune. Bonus obtenus en
combat, evenements mondiaux toutes les 4 manches, reprise de partie possible
si l'Host se deconnecte en pleine bataille.

## Architecture "Host autoritaire"

- Le client du **Host** execute le moteur pur (`NavalEngine` -- sans DOM ni
  reseau, exporte pour des tests Node) et arbitre chaque manche.
- Les invites envoient leur **action** (tir ou bonus) au Host, qui la valide
  structurellement (case libre, bonus effectivement possede, cible vivante...)
  avant de la mettre en file. Aucune action illegale n'est acceptee, meme avec
  un client modifie.
- **Transport** : diffusion au salon via `context.sendMessage(data)` sans
  cible ; envoi personnalise (une vue par destinataire, pour ne jamais reveler
  une grille adverse) via `context.sendMessage(data, playerId)`.

### Canaux logiques (multiplexes via la cle `k`, independants)

| Canal | Role |
|---|---|
| `r`  | un invite envoie sa grille au Host quand il est Pret (fin de placement) |
| `a`  | action de manche (tir / bonus) : invite -> Host |
| `g`  | etat de manche, personnalise par destinataire : Host -> chacun |
| `h`  | heartbeat (detection de deconnexion / forfait) |
| `rq` | demande de resynchronisation (envoyee par un nouveau Host promu) |
| `rs` | reponse de resynchronisation : chaque survivant renvoie SA grille |

## Regles

- **Placement** : chaque joueur place librement sa flotte (5 navires : 4, 3,
  2, 2, 1 cases) sur sa propre grille 8x8, dans l'ordre, avec rotation
  Horizontal/Vertical. Un bouton "Placement aleatoire" est disponible.
  Le Host revalide toujours la flotte annoncee (nombre et longueurs exacts)
  avant de l'accepter -- jamais de confiance aveugle dans le client.
- **Bataille** : a chaque manche, tous les joueurs vivants choisissent une
  action (tir simple ou bonus) sur un adversaire de leur choix. Delai de 22 s
  avant tir automatique sur une case libre pour les absents.
- **Bonus** (obtenus en coulant un navire, en trouvant une epave cachee sur
  une case d'eau, ou en enchainant 2 manches de suite avec au moins un tir
  reussi) :
  - 🎯 **Double Tir** -- deux tirs dans la meme manche.
  - 📡 **Radar** -- revele le contenu exact d'une zone 2x2 chez un adversaire.
  - 🚀 **Missile de Croisiere** -- touche toute une ligne (rangee) chez la cible.
  - ✚ **Frappe en Croix** -- 5 cases en croix autour du point vise.
  - 🌊 **Torpille** -- traverse toute une colonne, s'arrete au premier navire touche.
  - 🛡️ **Bouclier** -- protege une case de sa propre flotte pour la manche.
  - 🔍 **Scanner** -- indique juste si une zone 2x2 adverse contient un navire (sans le localiser precisement).
  - 🍀 **Canon Chanceux** -- en cas de tir rate, tente aussitot une case voisine gratuite.
- **Evenements mondiaux** (un tire au sort toutes les 4 manches) :
  - 🌀 **Tempete** -- toutes les flottes encore intactes derivent d'une case
    dans une direction commune. Un navire ne bouge jamais vers une case deja
    visee (hit/miss) ni vers une case occupee par un autre navire -- dans ce
    cas la tempete l'epargne ce tour-ci plutot que de produire un etat
    incoherent.
  - 🌫️ **Brouillard** -- Radar et Scanner inutilisables pendant 2 manches.
  - 📦 **Caisse de ravitaillement** -- le joueur le plus endommage recoit un bonus gratuit.
- **Victoire** : dernier capitaine avec au moins un navire encore a flot.
  En cas d'elimination simultanee de tous les survivants restants (rare), la
  partie se termine sur une egalite.
- **Deconnexion** : heartbeat toutes les 2 s ; silence > 6 s = statut "en
  attente de reconnexion" affiche aux autres ; silence > 30 s = victoire par
  forfait (le joueur est retire de la bataille, ses navires ne sont plus des
  cibles).

## Resilience Host

Comme dans les autres jeux du catalogue (voir `petit-bac`), le contexte lit
`context.hostId` en direct (jamais fige au montage) : si l'Host se
deconnecte en pleine bataille, le prochain joueur promu Host reprend
l'arbitrage. Particularite de ce jeu : les grilles adverses sont **secretes**
(le nouveau Host ne peut pas les deviner), donc la reprise se fait en 2 temps :

1. Le nouveau Host reconstruit un `NavalEngine` a partir du dernier etat
   public connu (tirs deja effectues, statuts vivant/forfait, manche en
   cours) puis diffuse une demande de resynchronisation (`rq`).
2. Chaque survivant renvoie sa propre grille (`rs`). Apres un court delai
   (4 s), le Host finalise la reprise (`resyncFrom`) et la bataille continue
   normalement. Pendant cette fenetre, tous les joueurs voient un ecran
   "Reprise de la partie en cours...".

## Pistes d'extension (non implementees dans cette version)

Le cahier des charges d'origine evoquait plusieurs mecaniques
supplementaires, volontairement laissees de cote ici pour livrer un coeur de
jeu complet et solide plutot que des mecaniques a moitie cablees :

- Modes de jeu alternatifs : Equipes, Battle Royale (grille qui retrecit),
  Chaos (evenement a chaque manche), Chasse au Tresor, Brouillard total
  (resultat de tir non revele immediatement).
- Fusion/separation de navires, navires speciaux (sous-marin invisible,
  porte-avions avec drone, navire explosif).
- Deplacement manuel d'un navire par le joueur (une case toutes les 3 manches).

Ces pistes s'integreraient dans `NavalEngine` (moteur pur, teste separement de
l'UI) sans toucher au contrat de module.
