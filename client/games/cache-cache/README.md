# Cache-Cache « Camouflage » — module Arcade

**v2.0.0** a remplacé la précédente chasse à l'aveugle (clic + indice de proximité) par une
chasse **visuelle de camouflage**, décrite ci-dessous. **v2.1.0** ajoute : un temps de cache
réglable par l'hôte (2 à 5 minutes), un temps de chasse fixé à 30 secondes, et une **page de
dessin** dédiée pour peindre un camouflage détaillé directement sur son personnage (même
principe qu'un outil façon Dessin & Devine : pinceau, couleur, taille, effacer — appliqué ici
sur la silhouette du personnage plutôt que sur une page blanche).

## Principe

Chaque joueur est Chasseur exactement une fois (ordre tiré au sort en début de partie). Une
manche = 1 Chasseur + (n-1) Cacheurs, sur **une carte partagée** tirée au sort.

1. **Écran de configuration (Hôte)** — avant la première manche, l'hôte choisit le temps de
   cache (2, 3, 4 ou 5 minutes). Le temps de chasse est fixe (30 secondes) et n'est pas
   configurable.

2. **Phase de cache** — Les Cacheurs apparaissent en petits personnages blancs sur la carte.
   Ils peuvent :
   - se déplacer (clic sur le décor, tant que non verrouillé) ;
   - se peindre en couleur plate avec la **pipette** (un clic échantillonne la couleur exacte
     du décor à cet endroit et l'applique instantanément à leur personnage) ;
   - ouvrir la **page de dessin** (bouton « 🖌️ Dessiner ») pour un camouflage détaillé : une vue
     zoomée du décor autour de leur position sert de fond de référence, et un calque superposé,
     **masqué à la silhouette du personnage** (impossible de dessiner en dehors), permet de
     peindre au pinceau (couleur libre via sélecteur, ou pipette échantillonnant le fond zoomé,
     taille réglable, bouton effacer). Le résultat est exporté en petite image (~110×110,
     quelques Ko) et remplace l'aperçu du personnage sur la carte, pour tout le monde ;
   - **verrouiller/déverrouiller** leur position (la couleur/texture reste modifiable même
     verrouillé).

   Le Chasseur est sur un écran noir d'attente. **Aucune carte, position, couleur ou texture ne
   lui est transmise pendant cette phase** — la confidentialité est assurée au niveau du
   transport (le Host cible individuellement chaque Cacheur pour le canal de rendu), pas
   seulement de l'affichage.

   Dès que tous les Cacheurs ont verrouillé leur position, la phase de chasse démarre
   immédiatement (sinon, bascule automatique à la fin du temps choisi).

3. **Phase de chasse (30 secondes)** — Le Chasseur reçoit la scène (carte + position/couleur ou
   texture peinte de chaque Cacheur) et dispose de **2×(n-1) tirs**. Un clic pose un impact de
   peinture ; s'il touche la zone d'un Cacheur non encore trouvé, celui-ci est éliminé pour la
   manche. Les Cacheurs, spectateurs, voient la même scène ainsi que le viseur du Chasseur et
   les impacts en direct. La manche se termine dès que les munitions sont épuisées, que tout le
   monde est trouvé, ou que les 30 secondes sont écoulées.

4. **Score** : un Cacheur non trouvé rapporte 2 points ; le Chasseur gagne 1 point par Cacheur
   repéré. Résultat de manche affiché quelques secondes, puis manche suivante (nouveau Chasseur,
   nouvelle carte) jusqu'à ce que chacun ait chassé une fois, puis classement final.

## Choix d'implémentation notables

- **Pas d'image composite envoyée sur le réseau.** Plutôt que de transmettre une image
  aplatie (lourde, coûteuse), le Host diffuse uniquement des données légères — carte choisie +
  `{x, y, couleur, texture?}` de chaque Cacheur — et **chaque client recompose la scène
  localement** à partir de l'asset de carte déjà disponible. Le rendu final est identique pour
  l'utilisateur, avec beaucoup moins de trafic réseau.
- **Page de dessin masquée à la silhouette.** Le calque de peinture est pré-rempli avec le
  contour du personnage (corps + tête, un seul chemin combiné), puis chaque coup de pinceau est
  appliqué avec `globalCompositeOperation = 'source-atop'` : impossible techniquement de peindre
  en dehors du personnage, quel que soit l'endroit cliqué. La texture finale est ré-échantillonnée
  en petite résolution avant export, pour rester légère sur le réseau (quelques Ko).
- **Échantillonnage de couleur fiable.** Les deux pipettes (rapide sur la carte, et dans la page
  de dessin) lisent la couleur sur un canevas hors-écran contenant uniquement le décor (jamais
  les personnages), donc cliquer près de soi ou d'un autre joueur ne fausse jamais l'échantillon.
- **Mises à jour légères en direct.** Déplacements/couleurs/textures pendant la cache et
  curseur/impacts pendant la chasse voyagent en petits messages ciblés (pas de re-diffusion de
  vue complète à chaque frappe), pour rester fluide même à 8 joueurs.
- **Formes (assets `assets/formes/`) non réutilisées** : la nouvelle mécanique utilise un seul
  personnage (silhouette dessinée en Canvas), personnalisé par la couleur et/ou le dessin.
- **10 cartes (`assets/maps/`) réutilisées telles quelles**, une par manche, tirées sans
  répétition immédiate.

## Limites connues

- **Reconnexion en cours de manche** : un client qui rejoint en retard une phase de cache ou de
  chasse déjà commencée reçoit l'état courant via le prochain message, mais ne rattrape pas
  l'historique des tout premiers instants (pas critique : la scène finale reste correcte).
- **Anti-triche cosmétique côté Chasseur pendant la chasse** : une fois la phase de chasse
  commencée, la position/couleur/texture de chaque Cacheur transite normalement vers le client
  du Chasseur pour permettre l'affichage (c'est le principe même du jeu). Comme pour les autres
  jeux de la plateforme, on fait confiance au client pour l'affichage ; seule la résolution des
  tirs (touché/raté) est arbitrée par le Host.
- **Page de dessin** : pas d'historique d'annulation coup par coup (seul un « Effacer » complet
  est proposé) ; pas de formes/tampons prédéfinis, uniquement du pinceau rond à main levée.
- **Chargement de carte** : sur une connexion très lente, le bouton « Dessiner » reste grisé
  jusqu'à ce que la carte soit chargée (évite d'ouvrir la page de dessin sans référence visuelle).

## Tests

Le moteur (`CacheCacheEngine`) est pur (sans DOM) et testé indépendamment en Node : bornes de
joueurs, confidentialité des vues par phase/rôle, verrouillage, détection de tir, rotation
complète du rôle de Chasseur, conservation des points, 300 parties aléatoires simulées de bout
en bout. L'intégration (montage multi-clients, écran de configuration, interactions canevas,
échantillonnage de couleur réel, page de dessin avec masquage réel par silhouette, tir/touché,
spectateurs en direct, rotation de manche, fin de partie notifiée à tous les joueurs) a été
validée via une simulation DOM (jsdom + rendu Canvas réel + vraies images de cartes servies
localement), qui a permis de repérer et corriger plusieurs bugs avant livraison : un re-rendu
qui annulait le verrouillage local, la notification de fin de partie qui n'atteignait pas les
invités, et le minuteur affiché qui gardait la durée de la phase précédente un instant après
chaque transition.

