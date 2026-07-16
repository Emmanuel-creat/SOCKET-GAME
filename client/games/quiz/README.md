# Quiz — module Arcade

Quiz à choix multiples pour **2 à 16 joueurs**, avec une banque de **2394 questions**
réparties dans 15 catégories (Histoire, Géographie, Capitales, Drapeaux, Sciences,
Cinéma, Musique, Littérature, Sport, Informatique, Nature & Animaux, Mythologie,
Jeux vidéo & Séries, Culture générale, Mathématiques).

## Architecture « Host autoritaire »

- Le client du **Host** exécute le moteur de règles (`QuizEngine`, classe pure
  sans DOM ni réseau, exportée pour les tests) : sélection des questions,
  minuteur, réception des réponses, calcul des scores.
- Contrairement au Tarot, il n'y a **aucune information cachée par joueur** :
  tout le monde reçoit exactement la même vue (`getPublicView()`), sauf pendant
  la phase « question » où l'index de la bonne réponse n'est jamais envoyé.
- Les autres clients sont de purs afficheurs : ils rendent la dernière vue
  reçue et envoient leur réponse (`{ t: 'answer', optionIndex }`) au Host.
- Transport : relais générique `game:message` du moteur (diffusion pour les
  vues, envoi ciblé vers le Host pour les réponses).

## Règles implémentées

- L'Host configure la partie avant de lancer : **nombre de questions** (5 à
  30), **catégories** (cases à cocher, toutes par défaut), **difficulté**
  (Facile / Moyen / Difficile), **durée par question** (10 à 30 s).
- Chaque question propose 4 réponses ; une seule réponse est prise en compte
  par joueur et par question.
- Points : **0** si faux ou pas de réponse, sinon entre **300 et 1000** selon
  la rapidité de la réponse (plus vite = plus de points).
- Révélation automatique dès que tout le monde a répondu, ou à la fin du
  temps imparti. Avance automatique vers la question suivante après quelques
  secondes de révélation (affichage de la bonne réponse + détail par joueur).
- Classement final affiché en fin de partie ; l'Host peut aussi arrêter la
  partie à tout moment via « Terminer la partie ».

## La banque de questions (`questions.js`)

C'est un fichier de **données pures** (aucune logique) : vous pouvez l'ouvrir
et le modifier comme un fichier texte. Chaque question est un objet du type :

```js
{
  id: "q0001",              // informatif uniquement, le moteur ne s'en sert pas
  categorie: "Histoire",
  difficulte: 1,             // 1 = facile, 2 = moyen, 3 = difficile
  question: "En quelle année a eu lieu la prise de la Bastille ?",
  options: ["1789", "1769", "1799", "1804"],
  reponse: 0,                 // index (0 à 3) de la bonne réponse
},
```

**Pour ajouter une question** : copiez un bloc, changez le texte/les options/
l'index de la bonne réponse, collez-le n'importe où dans le tableau. Aucun
redémarrage nécessaire, juste recharger la page. Une nouvelle valeur de
`categorie` crée automatiquement une nouvelle catégorie dans les filtres du
salon. Le fichier contient un en-tête détaillé avec toutes les règles à
respecter (4 options distinctes, `reponse` entre 0 et 3, etc.).

### D'où viennent les 2394 questions ?

- **~720 questions rédigées à la main**, réparties sur 12 catégories de
  culture générale (60 par catégorie environ).
- **~1674 questions générées par calcul** (Capitales, Drapeaux, Continents,
  Monnaies, Éléments chimiques, chiffres romains, arithmétique, conversions
  d'unités, dates/siècles) : leur bonne réponse est **calculée par un script**
  plutôt que tapée à la main, donc garantie exacte. C'est ce qui a permis
  d'atteindre un tel volume sans sacrifier la fiabilité.

## Déroulement côté joueurs

Salon de 2 à 16 joueurs → le Host sélectionne **Quiz** → configure la partie
→ Lancer. Chaque question : choix d'une réponse → révélation → question
suivante (automatique). Classement final puis retour au salon.

## Limites connues

- **Le bonus de rapidité dépend de l'horloge du Host** (moment de réception
  du message, pas de celle du joueur) : un joueur avec une latence réseau
  plus élevée peut être très légèrement désavantagé sur le calcul des points,
  comme dans la plupart des quiz en ligne « Host autoritaire ».
- **Déconnexion en cours de question** : la partie continue sans le joueur
  déconnecté (il est compté comme n'ayant pas répondu, 0 point). Si le Host
  lui-même quitte, le serveur ferme le salon (comportement standard du
  moteur).
- La banque de questions étant chargée par le client du Host, un joueur
  techniquement curieux pourrait consulter `questions.js` pour voir les
  réponses à l'avance : il n'y a pas de protection anti-triche côté serveur
  (comme pour la plupart des quiz auto-hébergés).
- Aucune question n'a été volontairement liée à une actualité récente ou à un
  record daté (ex. dernier vainqueur d'une compétition), afin que la banque
  reste correcte dans la durée.

## Tests

Le moteur étant pur et exporté (`import { QuizEngine, allCategories,
pickQuestions } from './index.js'`), il est testable en Node sans navigateur.
Vérifications effectuées : sélection/filtrage par catégorie et difficulté,
rejet d'une double réponse ou d'un index invalide, calcul des points
(0 si faux, 300 à 1000 si correct selon la rapidité), déroulé complet
question → révélation → question suivante → fin de partie avec classement
trié. La banque de 2394 questions a par ailleurs été validée automatiquement
à la génération (4 options distinctes, index de réponse valide, difficulté
1-3, aucune question ni catégorie vide, aucun doublon de texte).
