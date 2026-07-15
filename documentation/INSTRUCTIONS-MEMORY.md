# Mise à jour : jeu de Memory 🧠 (zip audité et corrigé)

Le zip fourni n'était PAS installable tel quel — 3 problèmes corrigés ici :
1. Son `games.json` datait d'avant vos dernières mises à jour : l'écraser aurait fait régresser bomberman, codenames, loup-garou et petit-bac (retour « en-developpement ») et supprimé la fiche du Dossier. Celui de ce zip repart de l'état courant.
2. La doc annonçait 15 paires, le code en jouait 8 → aligné sur 15 paires (30 cartes, grille 6×5).
3. Fin de partie non conforme au contrat de la plateforme (résultat double-enveloppé, pas de résumé) → corrigée, la notification de victoire s'affiche au retour au salon.

## Contenu
- `client/games/memory/index.js` (corrigé), `config.json`, `README.md`
- `client/games/memory/assets/1.jpg` … `15.jpg` + `verso.jpg`
- `client/games/games.json` — memory `disponible` v1.0.0 (2-6 joueurs), toutes les autres fiches préservées

## Installation
Copier en respectant l'arborescence (racine = `client/…`), puis :
`git add -A && git commit -m "Ajout du jeu Memory (audité)" && git push` → Render redéploie.

## Tests
30 parties simulées en Node sur le moteur corrigé : plateau 15 paires, anti-fuite (les valeurs cachées ne circulent jamais), coups hors-tour et doubles flips refusés, rejouer sur paire, résolution de mismatch, fin exacte à 15 paires, somme des scores = 15.
