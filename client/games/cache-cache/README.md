# Cache-Cache « Camouflage » — module Arcade

**Changement de mécanique en v2.0.0** : ce module remplace entièrement la précédente chasse à
l'aveugle (clic + indice de proximité) par une chasse **visuelle de camouflage**, décrite
ci-dessous. L'architecture plateforme (Host autoritaire, `game:message`, chat) est conservée ;
seule la logique de jeu change.

## Principe

Chaque joueur est Chasseur exactement une fois (ordre tiré au sort en début de partie). Une
manche = 1 Chasseur + (n-1) Cacheurs, sur **une carte partagée** tirée au sort.

1. **Phase de cache (2 min)** — Les Cacheurs apparaissent en petits personnages blancs sur la
   carte. Ils peuvent :
   - se déplacer (clic sur le décor, tant que non verrouillé) ;
   - se **peindre** avec la pipette : un clic échantillonne la couleur exacte du décor à cet
     endroit et l'applique instantanément à leur personnage ;
   - **verrouiller/déverrouiller** leur position (la peinture reste modifiable même verrouillé).

   Le Chasseur est sur un écran noir d'attente. **Aucune carte ni position ne lui est transmise
   pendant cette phase** — la confidentialité est assurée au niveau du transport (le Host cible
   individuellement chaque Cacheur), pas seulement de l'affichage : même une personne malveillante
   lisant le trafic réseau du Chasseur ne verrait rien.

   Dès que tous les Cacheurs ont verrouillé leur position, la phase de chasse démarre
   immédiatement (sinon, bascule automatique à 2 minutes).

2. **Phase de chasse** — Le Chasseur reçoit la scène (carte + position/couleur de chaque
   Cacheur) et dispose de **2×(n-1) tirs**. Un clic pose un impact de peinture ; s'il touche la
   zone d'un Cacheur non encore trouvé, celui-ci est éliminé pour la manche. Les Cacheurs,
   spectateurs, voient la même scène ainsi que le viseur du Chasseur et les impacts en direct.
   La manche se termine dès que les munitions sont épuisées ou que tout le monde est trouvé
   (filet de sécurité : 2 minutes maximum).

3. **Score** : un Cacheur non trouvé rapporte 2 points ; le Chasseur gagne 1 point par Cacheur
   repéré. Résultat de manche affiché quelques secondes, puis manche suivante (nouveau Chasseur,
   nouvelle carte) jusqu'à ce que chacun ait chassé une fois, puis classement final.

## Choix d'implémentation notables

- **Pas d'image composite envoyée sur le réseau.** Plutôt que de transmettre une image
  aplatie (lourde, coûteuse), le Host diffuse uniquement des données légères — carte choisie +
  `{x, y, couleur}` de chaque Cacheur — et **chaque client recompose la scène localement** à
  partir de l'asset de carte déjà disponible. Le rendu final est identique pour l'utilisateur,
  avec beaucoup moins de trafic réseau : c'est cette approche qui remplit le mieux l'objectif
  d'optimisation demandé, plutôt qu'un envoi d'image brute.
- **Échantillonnage de couleur fiable.** La pipette lit la couleur sur un canevas hors-écran
  contenant uniquement la carte (jamais les personnages), donc cliquer près de soi ou d'un autre
  joueur ne fausse jamais l'échantillon.
- **Mises à jour légères en direct.** Déplacements/couleurs pendant la cache et
  curseur/impacts pendant la chasse voyagent en petits messages ciblés (pas de re-diffusion de
  vue complète à chaque frappe), pour rester fluide même à 8 joueurs.
- **Formes (assets `assets/formes/`) non réutilisées.** L'ancienne mécanique proposait 10 formes
  au choix ; la nouvelle utilise un seul personnage (silhouette dessinée en Canvas), personnalisé
  uniquement par la couleur — conforme à la description demandée. Les fichiers restent présents
  dans le dépôt (inoffensifs, non chargés) au cas où ils resserviraient plus tard.
- **10 cartes (`assets/maps/`) réutilisées telles quelles**, une par manche, tirées sans
  répétition immédiate.

## Limites connues

- **Reconnexion en cours de manche** : un client qui rejoint en retard une phase de cache ou de
  chasse déjà commencée reçoit l'état courant via le prochain message, mais ne rattrape pas
  l'historique des tout premiers instants (pas critique : la scène finale reste correcte).
- **Anti-triche cosmétique côté Chasseur pendant la chasse** : une fois la phase de chasse
  commencée, la position/couleur de chaque Cacheur transite normalement vers le client du
  Chasseur pour permettre l'affichage (c'est le principe même du jeu). Comme pour les autres
  jeux de la plateforme, on fait confiance au client pour l'affichage ; seule la résolution des
  tirs (touché/raté) est arbitrée par le Host.
- **Palette de couleurs** : la pipette échantillonne la carte affichée ; elle ne propose pas de
  nuancier manuel indépendant.

## Tests

Le moteur (`CacheCacheEngine`) est pur (sans DOM) et testé indépendamment en Node : bornes de
joueurs, confidentialité des vues par phase/rôle, verrouillage, détection de tir, rotation
complète du rôle de Chasseur, conservation des points, 300 parties aléatoires simulées de bout
en bout. L'intégration (montage multi-clients, interactions canevas, échantillonnage de couleur
réel, tir/touché, spectateurs en direct, rotation de manche, fin de partie notifiée à tous les
joueurs) a été validée via une simulation DOM (jsdom + rendu Canvas réel + vraies images de
cartes servies localement), qui a d'ailleurs permis de repérer et corriger deux bugs avant
livraison (un re-rendu qui annulait le verrouillage local, et la notification de fin de partie
qui n'atteignait pas les invités).
