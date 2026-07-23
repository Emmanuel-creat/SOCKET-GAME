# Le Pendu — module Arcade

Le pendu classique pour **2 à 8 joueurs**, avec deux modes de jeu (**Mot** ou
**Phrase**) et un nombre d'erreurs autorisées réglable par l'Host — de 6
(le pendu « classique ») jusqu'à 12, pour laisser plus de marge, notamment
en mode Phrase où les textes sont plus longs.

## Architecture « Host autoritaire »

- Le client du **Host** exécute le moteur de règles (`HangmanEngine`, classe
  pure sans DOM ni réseau, exportée pour les tests) : tirage du mot ou de la
  phrase, suivi des lettres tentées, calcul des scores.
- Comme pour le Quiz, il n'y a pas d'information cachée par joueur : tout le
  monde reçoit la même vue, à l'exception des lettres non encore trouvées
  (jamais envoyées en clair — seul un masque `_` est transmis).
- Les autres clients sont de purs afficheurs : ils rendent la dernière vue
  reçue et envoient leurs propositions au Host (`{ t: 'lettre', lettre }` ou
  `{ t: 'complet', texte }`).
- Transport : relais générique `game:message` du moteur (diffusion pour les
  vues, envoi ciblé vers le Host pour les propositions).

## Règles implémentées

- L'Host configure la partie avant de lancer : **mode** (Mot ou Phrase),
  **nombre d'erreurs autorisées** (6, 8, 10 ou 12), **nombre de manches**
  (3, 5, 7 ou 10), et en mode Mot, les **catégories** à inclure.
- N'importe quel joueur peut à tout moment proposer une lettre (clic sur le
  clavier affiché ou touche du clavier physique) ou tenter de deviner le
  mot/la phrase en entier via le champ de texte.
- Une lettre correcte rapporte **10 points par occurrence révélée** (une
  lettre qui apparaît 3 fois rapporte 30 points). Deviner la solution
  complète rapporte un **bonus de 50 points** et termine la manche
  immédiatement. Une lettre fausse ou une solution complète incorrecte
  consomme une erreur du pendu — **partagée par tous les joueurs**.
- La manche se termine dès que tout est révélé (gagné) ou que le nombre
  d'erreurs autorisées est atteint (perdu) ; la solution s'affiche alors
  quelques secondes avant d'enchaîner automatiquement sur la manche
  suivante.
- Classement final affiché en fin de partie ; l'Host peut aussi arrêter la
  partie à tout moment via « Terminer la partie ».

## La banque de mots et de phrases (`mots.js`)

Fichier de **données pures** (aucune logique), modifiable comme un fichier
texte. Deux tableaux :

```js
export const MOTS = [
  { texte: "GIRAFE", categorie: "Animaux" },   // un seul mot, en MAJUSCULES, sans espace
  // ...
];

export const PHRASES = [
  { texte: "L'UNION FAIT LA FORCE", categorie: "Proverbe" },  // espaces/apostrophes affichés automatiquement
  // ...
];
```

**Pour ajouter un mot ou une phrase** : copiez une ligne, changez le texte
et la catégorie, collez n'importe où dans le tableau correspondant. Une
nouvelle valeur de `categorie` crée automatiquement une nouvelle catégorie
dans les filtres du salon (mode Mot uniquement — le mode Phrase mélange
toutes ses catégories).

### Contenu actuel

- **226 mots** répartis en 10 catégories (Animaux, Métiers, Nourriture,
  Objets, Nature, Sports, Transports, Musique, Vêtements, Émotions).
- **116 phrases** réparties en 3 catégories (Proverbe, Expression, Titre de
  film/dessin animé).

## Déroulement côté joueurs

Salon de 2 à 8 joueurs → le Host sélectionne **Le Pendu** → configure la
partie (mode, erreurs autorisées, manches, catégories) → Lancer. Chaque
manche : tout le monde peut cliquer une lettre ou taper la solution
complète → révélation automatique → manche suivante. Classement final puis
retour au salon.

## Limites connues

- **Pas de tour par tour** : tous les joueurs peuvent proposer une lettre en
  même temps ; en cas de propositions quasi simultanées, le Host les traite
  dans l'ordre de réception (la latence réseau de chacun peut donc influer
  sur qui « prend » une lettre en premier), comme pour la plupart des jeux
  « Host autoritaire » de cette plateforme.
- **Accents ignorés pour la saisie** : proposer la lettre `E` révèle aussi
  bien un `E` qu'un `É` ou `È` dans le mot — un choix volontaire pour rester
  jouable sans clavier français complet, comme la plupart des versions
  numériques du pendu.
- La banque de mots étant chargée par le client du Host, un joueur
  techniquement curieux pourrait consulter `mots.js` pour voir les réponses
  à l'avance : il n'y a pas de protection anti-triche côté serveur (comme
  pour le Quiz).
- Aucun tour n'est imposé et aucun chronomètre ne limite une manche : la
  partie attend les propositions des joueurs aussi longtemps que
  nécessaire, fidèle à l'esprit du pendu classique.

## Tests

Le moteur étant pur et exporté (`import { HangmanEngine, allCategoriesMots,
allCategoriesPhrases, pickItems } from './index.js'`), il est testable en
Node sans navigateur. Vérifications effectuées : sélection par mode et
catégories, lettres correctes/fausses/déjà proposées/invalides, révélation
complète et calcul des points, victoire par lettres et par solution
complète, défaite après le nombre d'erreurs autorisées, déroulé complet
d'une partie simulée jusqu'au classement final, en mode Mot comme en mode
Phrase.
