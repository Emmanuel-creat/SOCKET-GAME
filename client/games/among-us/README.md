# Among Us — module Arcade

**4 à 15 joueurs** (optimal 8-10). L'équipage termine ses tâches ; les imposteurs tuent, sabotent et mentent. Tout se joue en réunion.

## Architecture — pourquoi elle est plus critique ici qu'ailleurs

Le Host fait tourner le moteur à 20 Hz et envoie à chaque joueur une vue filtrée (10 Hz, lissée à l'écran). **Deux secrets** sont protégés, et ils sont de nature différente :

1. **Les rôles.** Ils ne quittent jamais le Host. Un joueur ne reçoit que le sien — et, s'il est imposteur, celui de ses complices. Diffuser l'état complet en le masquant à l'affichage suffirait à ruiner le jeu : un `console.log` donnerait les imposteurs en deux secondes.
2. **Les positions.** Filtrées par la vision de chacun (rayon + ligne de vue) — c'est ce qui donne tout son sens au sabotage des lumières. **Un imposteur planqué dans un conduit n'existe dans la vue de personne.**

La carte, elle, est envoyée à tous : elle n'est pas un secret.

## La carte

Adaptation de The Skeld : 14 salles (Cafétéria, Armurerie, O2, Navigation, Boucliers, Communications, Stockage, Administration, Électricité, Sécurité, Réacteur, Moteur Sup., Moteur Inf., Infirmerie) reliées en boucle. Les **portes** sont calculées automatiquement (les cases de couloir qui touchent une salle) : les verrouiller isole réellement la pièce.

**12 conduits** en 4 grappes reliées entre elles : c'est un **graphe**, pas une téléportation libre. **Caméras** en Sécurité (4 salles surveillées), **table d'Administration** qui ne donne que des **nombres par salle**, jamais des noms — à vous de croiser avec les alibis.

## Les rôles

- **Crewmate** : tâches, signalement, vote, caméras, administration. Ne peut ni tuer ni emprunter les conduits.
- **Impostor** : kill (cooldown + distance réglables), sabotage, conduits, **fausses tâches**, vision supérieure.
- **Fantôme** : traverse les murs, **continue ses tâches** (elles comptent pour l'équipage), chat séparé, ne vote pas.

## Les tâches

**16 tâches** en trois catégories (courtes, longues, communes), certaines en plusieurs étapes dans plusieurs salles (câblage en 3 points, plein en 4 étapes, téléchargement puis transmission…). Cinq types de mini-jeux : câblage, clavier à code, séquence à reproduire, astéroïdes, consoles à maintien.

**Deux garde-fous côté Host** : il faut être **dans la bonne salle**, et chaque étape impose une **durée minimale** — un client bricolé ne peut pas boucler une tâche plus vite que physiquement possible.

**Les tâches d'un imposteur sont feintes** : elles avancent dans *sa* liste (sinon il se trahirait en n'ayant rien à faire) mais **ne remplissent jamais la barre**. Les tâches **communes** sont attribuées à tout le monde : si quelqu'un prétend avoir une commune absente de la partie, il ment.

## Les sabotages

| Sabotage | Effet |
|---|---|
| 💡 **Lumières** | Divise la vision de l'équipage (celle des imposteurs reste intacte). Réparation au panneau d'Électricité. |
| 📡 **Communications** | Masque la liste des tâches, les caméras et l'administration. |
| ☢️ **Réacteur** | 45 s. **Deux pupitres à tenir en même temps** (fenêtre d'une seconde). Échec = victoire immédiate des imposteurs. |
| 🫁 **Oxygène** | 45 s. Deux codes : un en O2, un en Administration — cela force l'équipage à se séparer. |
| 🚪 **Portes** | Verrouille une salle pendant 10 s. Quelqu'un pris dans l'embrasure est poussé d'un côté (sinon il resterait enfermé *dans* la porte). |

Un seul sabotage majeur à la fois, avec recharge de 25 s. Une réunion annule un sabotage critique (sinon il expirerait pendant le vote), et le bouton d'urgence est bloqué tant qu'un critique est en cours.

## Réunions et votes

Déclenchement par **bouton d'urgence** (Cafétéria, quota par joueur) ou **découverte d'un corps**. Le jeu s'arrête complètement : personne ne bouge, personne ne tue. Discussion, puis vote. **Égalité = personne n'est éjecté.** Options : votes anonymes (on voit *qui* a voté, jamais *pour qui*) et confirmation d'éjection (annonce ou non si l'éjecté était un imposteur).

Le **chat** n'est ouvert aux vivants que pendant les réunions — comme dans le jeu. Les fantômes ont leur propre canal, invisible des vivants : sans cela, le premier mort donnerait le nom de son tueur en une seconde.

## Victoire

- **Équipage** : toutes les tâches terminées, ou tous les imposteurs éjectés.
- **Imposteurs** : parité avec l'équipage, ou sabotage critique arrivé à son terme.

## Paramètres du Host

Imposteurs (1-3) · vitesse (0,5×-3×) · vision équipage (0,25×-5×) · vision imposteur (0,25×-5×) · cooldown kill (10-60 s) · distance de kill (courte/normale/longue) · réunions d'urgence (0-9) · temps de discussion (0-120 s) · temps de vote (15-300 s) · votes anonymes · confirmation d'éjection · barre des tâches (toujours / réunions / jamais) · nombre de tâches courtes, longues et communes.

## Contrôles

**ZQSD / WASD / flèches** · **F** = utiliser (tâche, réparation, bouton, conduit) · **R** = signaler · **Espace** = tuer. Sur mobile : joystick + boutons contextuels.

## Limites connues

- Si le Host quitte, la plateforme promeut un nouveau Host mais ce module ne reprend pas l'état : il faut relancer depuis le salon. (C'est d'autant plus gênant ici que le Host connaît tous les rôles — mais les stocker ailleurs reviendrait à les diffuser.)
- Un joueur déconnecté reste figé sur la carte et compte toujours dans les votes.
- Les mini-jeux se jouent côté client : le Host vérifie la salle et la durée minimale, pas le détail des clics. La vraie protection est ailleurs — une tâche n'est pas une information secrète, contrairement aux rôles et aux positions.
- Pas de Polus ni d'Airship, pas de rôles étendus (Engineer, Scientist…) : une seule carte, les rôles de base.

## Tests

Moteur pur, horloge injectée, simulé en temps virtuel : **30 parties complètes** (4 à 15 joueurs, réglages tirés au sort) — 97 kills, 248 étapes de tâches, 107 sabotages, 643 passages en conduit, 227 tours de vote, 105 éjections. Carte vérifiée entièrement connexe (aucune salle inatteignable, chaque salle a ses portes), aucun joueur dans un mur, conditions de victoire justifiées à chaque fin.

**636 972 vues contrôlées une par une** : à chaque tick et pour chaque joueur, le test recalcule *indépendamment du moteur* ce qui devrait être visible et vérifie qu'aucun **rôle** ne fuit (sauf complices imposteurs et fantômes) et qu'aucune **position** n'apparaît hors de la vision — conduits inclus.

Douze scénarios déterministes couvrent le reste : portée et cooldown du kill, corps laissé sur place, tâches (bonne salle + durée imposée), tâches d'imposteur qui ne remplissent pas la barre, conduits (réservés, graphe respecté, invisibles, kill impossible depuis l'intérieur), lumières (vision de l'équipage divisée, celle de l'imposteur intacte), réacteur (deux mains simultanées, sinon fusion = victoire), égalité au vote, éjection du dernier imposteur, parité, chat, portes verrouillées.

Note honnête : la simulation valide les **règles**, pas l'**équilibrage** — des agents aléatoires ne savent ni mentir ni déduire, d'où les 23 victoires d'imposteurs sur 30. C'est à cela que servent les réglages.
