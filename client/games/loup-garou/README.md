# Loup-Garou — module Arcade

Loup-Garou de Thiercelieux **5 à 16 joueurs**, entièrement à l'écrit : le **moteur joue le rôle du meneur** (personne n'est sacrifié pour animer), séquence les nuits, résout les morts et orchestre débats et votes. Quatre canaux de discussion pour tout faire au clavier.

## Architecture « Host autoritaire »

- Le client du **Host** exécute `LoupGarouEngine` (`engine.js`, pur, sans DOM ni réseau, exporté pour les tests) ; `index.js` porte l'interface.
- **Les rôles secrets ne quittent jamais le Host** : chaque joueur reçoit une vue personnalisée (son rôle, ses infos privées — potions, meute, visions —, les canaux auxquels il a droit) via des envois ciblés du relais `game:message`. Un villageois qui inspecte le réseau ne voit ni les rôles, ni le chat des loups.
- Le résultat de la Voyante lui est envoyé en message privé ciblé.

## Chats écrits 💬

- **🏛️ Village** : lisible par tous, écrit par les vivants — le cœur du débat.
- **🐺 Loups** : la meute se concerte la nuit. La **Petite Fille** peut l'espionner (bouton dédié) : elle lit les messages sous pseudos masqués (« 🐺 Loup »), avec **25 % de risque par nuit** que les loups apprennent son identité (adaptation en ligne du « si un loup la surprend »).
- **💘 Amoureux** : canal privé des deux cœurs liés par Cupidon.
- **👻 Morts** : les spectateurs discutent librement et voient tous les rôles (interdiction morale de spoiler ailleurs !).

## Rôles implémentés

Villageois, Loup-Garou (vote de meute : victime la plus votée, égalité au sort), Voyante (visions cumulées affichées sur sa carte), Sorcière (potion de vie sur la victime des loups, potion de mort, une fois chacune), Chasseur (tir en mourant, quelle que soit la cause), Cupidon (nuit 1, amoureux — mort de chagrin ; camps opposés = camp des Amoureux, victoire s'ils sont les deux derniers), Petite Fille (espionnage risqué), Salvateur (protection, jamais deux nuits de suite la même cible), Corbeau (+2 voix au prochain vote), et le **Capitaine** : élu au jour 1, voix double, désigne son successeur en mourant.

## Déroulement

1. **Composition** : le Host règle le nombre de loups et coche les rôles spéciaux (les cartes restantes sont des Villageois ; composition par défaut adaptée au nombre de joueurs).
2. **Nuit** : le meneur appelle dans l'ordre Cupidon (nuit 1) → Salvateur → Voyante → Loups → Sorcière → Corbeau. Chacun agit depuis son écran ; le Host peut **passer une étape** si un joueur ne répond plus.
3. **Jour** : annonce des morts (rôles révélés à tous), élection du Capitaine au premier jour, **débat libre** au chat, puis le Host lance le **vote** : Capitaine ×2, marque du Corbeau +2, égalité = personne n'est éliminé, abstention possible.
4. Cascades gérées automatiquement : chagrin des amoureux, tir du Chasseur, succession du Capitaine — y compris enchaînées.
5. **Victoires** : Village (plus aucun loup), Loups (majorité atteinte), Amoureux de camps opposés (derniers survivants). Écran final avec tous les rôles, retour au salon par le Host.

## Limites connues

- Rôles d'extension non implémentés : Voleur, Renard, Ancien, Joueur de Flûte, Chevalier à l'Épée Rouillée, Montreur d'Ours, Juge Bègue (le document de règles les décrit ; ajout possible plus tard).
- Le chelem d'ambiance (bruitages) n'existe pas : tout passe par l'écrit.
- **Déconnexion** : le Host peut passer l'étape de nuit bloquée ; un joueur déconnecté reste dans la partie (ses votes manquants bloquent le décompte → le vote se clôt quand tous les *vivants* ont voté, donc le Host peut attendre ou la partie reste en débat). Si le Host quitte, le serveur ferme le salon.
- Pas d'anti-triche vocal : comme autour d'une table, rien n'empêche des joueurs de se parler ailleurs.

## Tests

`engine.js` est testé en Node : **300 parties complètes simulées** (5 à 16 joueurs, décisions aléatoires) sans erreur — bornes 5-16, validation de composition, non-fuite (aucun rôle dans la vue d'un vivant, canal loups absent chez un villageois, meute correcte chez un loup), toutes les étapes de nuit, potions à usage unique, protections consécutives interdites, votes (poids du Capitaine, marque du Corbeau, morts exclus), cascades chasseur/amoureux/succession, conditions de victoire vérifiées à chaque fin, rôles révélés à tous en fin de partie.
