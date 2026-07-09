# Tarot — module Arcade

Tarot français à **3 ou 4 joueurs**, complet : enchères, chien/écart, jeu de la carte avec toutes les obligations, primes et comptes officiels, donnes successives avec scores cumulés.

## Architecture « Host autoritaire »

- Le client du **Host** exécute le moteur de règles (`TarotEngine`, classe pure sans DOM ni réseau, exportée pour les tests).
- Les mains privées **ne quittent jamais le Host** : chaque joueur reçoit une vue personnalisée (`getViewFor(playerId)`) contenant sa main + l'état public.
- Les autres clients sont de purs afficheurs : ils rendent la dernière vue reçue et envoient leurs actions (`{ a: 'bid' | 'ecart' | 'play' }`) au Host.
- Transport : relais générique `game:message` du moteur (le serveur route sans lire le contenu ; envoi ciblé par joueur pour les vues, envoi ciblé vers le Host pour les actions).

## Règles implémentées

- 78 cartes ; distribution 24 + chien de 6 (3 j.) ou 18 + chien de 6 (4 j.) ; **redonne automatique** si petit sec ou si tout le monde passe.
- Enchères en un tour de parole : Passe, Petite (×1), Garde (×2), Garde sans le chien (×4), Garde contre le chien (×6).
- Petite/Garde : chien révélé à tous, écart de 6 cartes (ni roi ni bout ; atouts uniquement en dernier recours, annoncés à la défense). Garde sans/contre : chien non révélé, compté pour l'attaque/la défense.
- Jeu de la carte : fournir à la couleur, couper si défaussé, **obligation de monter à l'atout** (surcouper, sinon « pisser ») ; Excuse jouable à tout moment, conservée par son camp contre une basse carte (0,5 pt), **perdue au dernier pli sauf chelem**.
- Comptes : seuils 56/51/41/36 selon les bouts, règlement `(25 + écart ± petit au bout) × multiplicateur + poignées + chelem`, petit au bout ±10 (multiplié), poignées 20/30/40 (10/13/15 atouts à 4 j., 13/15/18 à 3 j., Excuse comptée, déclaration avec la première carte, prime au camp vainqueur), chelem non annoncé ±200. Répartition à somme nulle (le preneur gagne/paie contre chaque défenseur).

## Déroulement côté joueurs

Le Host lance la partie depuis le salon (3 ou 4 joueurs requis). Chaque donne : enchères → écart éventuel → 18/24 plis → tableau des scores. Le Host enchaîne avec **« Donne suivante »** ou clôt avec **« Terminer la partie »** (classement final puis retour automatique au salon pour tous).

## Chat de table

Un panneau de discussion est intégré à la vue de jeu, juste sous le panneau « Historique ». Chaque message est diffusé à toute la table via le même relais générique `game:message` que les actions/vues (aucun lien avec le chat de salon, aucun changement côté moteur/serveur). Le fil est propre à la partie en cours : vide à chaque nouvelle partie, non conservé côté serveur.

## Limites connues

- Le tarot à **5 joueurs** (appel du roi) n'est pas implémenté — `games.json` limite le salon à 3–4 joueurs.
- Les enchères se font en **un seul tour de parole** (pas de surenchère après avoir parlé), conformément à la règle officielle FFT.
- **Déconnexion en cours de donne** : la partie ne peut pas se poursuivre sans le joueur ; le Host dispose d'un bouton « Terminer la partie » pour ramener tout le monde au salon. Si le Host lui-même quitte, le serveur ferme le salon (comportement standard du moteur).
- Le chelem *annoncé* (avant l'entame) n'est pas proposé ; le chelem **réalisé** est primé (±200) automatiquement.

## Tests

Le moteur étant pur et exporté (`import { TarotEngine } from './index.js'`), il est testable en Node sans navigateur : simulation de donnes complètes avec coups aléatoires légaux, invariants vérifiés (182 demi-points distribués, somme des scores nulle, légalité des coups).
