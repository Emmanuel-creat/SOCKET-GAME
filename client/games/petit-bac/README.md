# Petit Bac — module Arcade

Petit Bac (« Baccalauréat ») **2 à 16 joueurs** : 10 catégories tirées au sort, 10 manches, saisie de 3 min 30, notation manuelle par le Host, scores cumulés et classement final avec gestion des égalités — le tout boosté par des jokers, des thèmes, un chat animé et une ambiance sonore.

## Architecture « Host autoritaire »

- Le client du **Host** exécute le moteur de règles (`PetitBacEngine`, classe pure sans DOM ni réseau, exportée pour les tests).
- Les réponses privées **ne quittent le joueur que vers le Host** : chaque client reçoit une vue personnalisée (`getViewFor(playerId)`) — état public + ses champs. Aucune réponse adverse n'est diffusée avant la révélation (seul le **nombre** de champs remplis est public).
- Les autres clients sont de purs afficheurs : ils rendent la dernière vue reçue et envoient leurs actions au Host (`hello`, `update`, `stop`, `chat`, `bonus`).
- Transport : relais générique `game:message` du moteur (le serveur route sans lire le contenu).

## Boosts 🚀

- **Jokers** (chacun utilisable **une fois par partie**, pendant la saisie) :
  - ✨ **Double** — vos points de la manche en cours comptent ×2 (annoncé à tous, marqué ✨×2 à la révélation) ;
  - ❄️ **Gel** — gèle la saisie d'un adversaire pendant 15 s (overlay + compte à rebours chez la victime, le moteur refuse ses réponses pendant le gel) ;
  - ⏳ **Sablier** — ajoute 25 s au chrono de la manche, pour tout le monde.
- **Skins** : 5 thèmes (Néon, Océan, Sunset, Forêt, Rétro) sélectionnables en un clic, mémorisés localement par joueur.
- **Chat in-game** relayé par le Host, avec **réactions emoji** (🔥 👏 😂 😱 🐌) et messages système animant la partie (jokers joués, « X a crié STOP ! »).
- **Progression en direct** : au-dessus du chat, une jauge par joueur indique combien de champs il a remplis (avec ❄️/✨ le cas échéant) — la pression monte.
- **Ambiance** : bips du décompte 3-2-1, note de révélation de la lettre, alerte des 3 dernières secondes, fanfare et **confettis** au classement final. Sons WebAudio (aucun fichier), désactivables via 🔊/🔇, préférence mémorisée.

## Déroulement

1. Le Host lance la partie (2 à 16 joueurs). 10 catégories sont tirées **une fois** pour toute la partie parmi un pool de 100.
2. Chaque manche : décompte **3-2-1**, la lettre s'affiche en grand puis se fixe dans le coin, et le minuteur de **3 min 30** démarre.
3. La manche s'arrête quand le minuteur atteint **0:00** ou quand un joueur clique **STOP** (actif seulement si ses 10 champs sont remplis).
4. Révélation : toutes les réponses s'affichent. Le **Host saisit les points** (0 à 9) pour chaque réponse ; les cumuls se mettent à jour en direct pour tous (jokers ✨ inclus).
5. Le Host clique **Manche suivante** ou, à la 10ᵉ manche, **Classement final** : le tableau des rangs (avec ex æquo) s'affiche pour tous, puis **Retour au salon** ramène tout le monde via `context.onEnd`.

## Règles implémentées

- **10 catégories** tirées au sort (fixes toute la partie) parmi un pool de **100**.
- **10 manches**, lettres distinctes (K, Q, W, X, Y, Z exclus).
- Saisie **3 min 30** synchronisée par horodatage (`playEndsAt`), robuste au lag — et étirable au ⏳ Sablier.
- Fin de manche par minuteur **ou** STOP conditionné aux 10 champs remplis.
- Notation **manuelle Host** bornée 0–9, cumul à travers les manches (×2 sur les manches doublées).
- Classement final avec **gestion des égalités** (rang de compétition 1, 2, 2, 4 ; ex æquo signalés), résumé du/des vainqueur(s).

## Limites connues

- **Déconnexion en cours de manche** : la partie continue avec les réponses reçues jusque-là ; le Host garde la main (STOP / notation / manche suivante).
- Si le **Host** quitte, le serveur ferme le salon (comportement standard du moteur).
- La notation est **humaine** (Host) : pas de validation automatique des mots ni de détection de doublons — c'est le Host qui arbitre (0 à 9 par réponse).
- Les thèmes et le réglage du son sont **locaux à chaque joueur** (localStorage du navigateur).

## Tests

Le moteur pur est exporté (`import { PetitBacEngine } from './index.js'`) et testé en Node sans navigateur : tirage des catégories/lettres, cumul des scores, bornage 0–9, rangs et égalités, refus hors 2–16 joueurs, non-fuite des réponses avant révélation, et jokers (usage unique, gel bloquant la saisie, sablier +25 s, double ×2 appliqué aux cumuls).
