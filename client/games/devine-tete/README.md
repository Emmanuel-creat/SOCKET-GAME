# Le Dossier — module Arcade

Jeu de reconnaissance **2 à 8 joueurs** : à chaque manche, une image altérée s'affiche (caricature, visage déformé ou photo coupée en deux) et chacun tape le prénom de la personne. 10 manches, 1 point par bonne réponse, tableau final avec le récapitulatif de toutes les manches.

## Adaptation à la plateforme

Module fourni en zip et adapté au contrat Arcade :

- **Transport** : `socket.emit`/`socket.on` bruts remplacés par le relais officiel `context.sendMessage` / `context.onMessage` (état diffusé par le Host, réponses envoyées en ciblé au Host, désabonnement au `unmount`).
- **Profils** : `name` → `pseudo` (format des joueurs de la plateforme).
- **Fin de partie** : `onEnd` n'est plus déclenché automatiquement à la 10ᵉ manche — l'écran de résultats reste affiché, et le Host clique « 🏁 Retour au salon (tous) » pour clôturer (résumé du vainqueur transmis au salon).
- **Assets restructurés et anonymisés** : les 135 photos étaient rangées dans des dossiers au nom des personnes avec des dossiers accentués (`Modifié`, `Coupé`) — l'URL d'une image révélait donc la réponse dans l'inspecteur réseau, et les accents cassent facilement entre git/URL/OS. Tout est renommé en identifiants opaques (`assets/people/sa/modified/003.jpg`) et l'`imageDB` du code a été régénérée depuis le disque (135 fichiers vérifiés un à un).
- **Bouton de secours Host** : « ⏭️ Révéler sans attendre » débloque une manche si un joueur ne répond plus (déconnexion).

## Déroulement

1. Salon de 2 à 8 joueurs → le Host lance **Le Dossier**.
2. Le Host choisit le mode : **Caricature**, **Déformation** ou **50/50** (les compteurs d'images disponibles s'affichent).
3. À chaque manche, l'image s'affiche chez tout le monde ; chacun valide sa réponse (une seule par manche). Dès que tout le monde a répondu, révélation : la bonne réponse, une photo originale de référence et le verdict de chacun, puis enchaînement automatique (3 s).
4. Après 10 manches : classement, récapitulatif complet manche par manche, et retour au salon par le Host.

## Règles implémentées

- 10 manches par partie ; tirage sans répétition d'une même photo tant que la réserve de la personne n'est pas épuisée.
- Réponse normalisée : casse, accents et espaces ignorés (« jérémy » = « Jeremy »).
- Une seule réponse par joueur et par manche ; révélation automatique quand tout le monde a répondu (ou via le bouton Host).
- 1 point par bonne réponse, scores cumulés, classement final.

## Limites connues

- La banque d'images est **codée dans le module** (`imageDB`) : pour ajouter une personne ou des photos, déposer les fichiers dans `assets/people/<slot>/<catégorie>/` et compléter `imageDB` + `SLOTS` en conséquence.
- Les photos sont personnelles (cercle d'amis) : le jeu n'a de sens qu'avec ce groupe.
- Si le Host quitte, le serveur ferme le salon (comportement standard du moteur).

## Tests

Moteur pur exporté et testé en Node : intégrité des 135 images (chaque entrée de l'imageDB existe sur disque), anonymat des URLs (aucun prénom dans les chemins), 30 manches simulées sur les 3 modes (normalisation des réponses, refus de double réponse, révélation au complet, scores, fin de partie), bouton de déblocage.
