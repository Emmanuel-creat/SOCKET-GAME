# Mise à jour : UNO 🃏

Jeu complet, **2 à 10 joueurs**, mains privées (architecture host-autoritaire comme le Tarot).

## Contenu
- `client/games/uno/engine.js` — moteur pur (règles, testable)
- `client/games/uno/index.js` — interface (table, main, jokers, UNO/Contre-UNO, contestation, chat)
- `client/games/uno/config.json`, `client/games/uno/README.md`
- `client/games/uno/game.entry.json` — **fiche catalogue** (nouveau format)
- `tools/merge-game-entry.mjs` — outil de fusion (re-fourni : si tu l'as déjà, le fichier est identique)

⚠️ **Aucun `games.json` dans ce zip, volontairement** : c'est un fichier partagé entre développeurs, et l'écraser fait régresser le travail des autres (les Échecs en ont fait les frais de justesse). Le catalogue se met à jour avec l'outil.

## Installation
1. Copier les fichiers en respectant l'arborescence.
2. Fusionner la fiche dans le catalogue (sûr quel que soit l'état du repo) :
   ```
   node tools/merge-game-entry.mjs client/games/uno/game.entry.json
   ```
   → « fiche « uno » mise à jour sur place », toutes les autres fiches inchangées. (`--dry-run` pour simuler.)
3. `git add -A && git commit -m "Ajout du jeu UNO" && git push` → Render redéploie.

## Le jeu
Règles officielles : 108 cartes, 7 en main, Passe / Inversion / +2 / Joker / **Joker +4 contestable** (bluff : si le poseur avait la couleur, il pioche à votre place **et vous montre sa main** ; sinon vous piochez 6 et perdez votre tour), « UNO ! » à l'avant-dernière carte avec **fenêtre de 6 s pour le Contre-UNO** (2 cartes), remélange de la défausse, décompte (chiffres = valeur, cartes d'action 20, jokers 50) et manches jusqu'au score cible.

Variantes réglables par le Host avant de distribuer : **cumul des +2/+4**, **carte piochée jouable**, **contestation du +4**, **score cible** (100 / 200 / 500).

Bouton Host « ⏭️ Forcer le tour » si un joueur ne répond plus.

## Tests
120 parties complètes simulées (2-10 joueurs, 310 manches) : paquet exact (108 cartes, 1240 pts) conservé à chaque coup, coups hors-tour et illégaux refusés, **anti-fuite vérifié à chaque tour** (aucune carte adverse dans la vue d'un joueur). Cinq scénarios déterministes : inversion à 2 joueurs, cumul des +2, contestation gagnante, contestation ratée, décompte de fin de manche.
