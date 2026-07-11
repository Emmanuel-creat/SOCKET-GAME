# Mise à jour : Petit Bac v1.2.0 (fusion complète)

Toutes les options du fichier v1.2.0 fourni + tous les boosts de la v1.1.0, sans régression.

## Nouveautés (du fichier fourni)
- **5 manches** (au lieu de 10)
- **Notation auto-gérée par vote** : chacun note SON mot ❌0/➖1/✅2, une catégorie à la fois, symboles visibles en temps réel, avance automatique quand tous ont voté
- **Cumuls masqués** jusqu'au classement final
- **Couronne 👑** du Host visible par tous, transférée en direct
- **Skip ⏭️** (Host) : 0 pt aux non-votants de la catégorie + passage forcé
- **Reprise de Host** : si le Host quitte, la plateforme promeut le premier joueur ; le module détecte le changement (watchdog) et le nouveau Host reprend le moteur depuis un snapshot relayé en continu à l'héritier (jamais affiché — cumuls non exposés)
- Lettre du décompte en vert fluo + badge vert

## Boosts conservés (v1.1.0)
Jokers ✨❄️⏳ (désormais inclus dans le snapshot de reprise !), 5 thèmes, réactions emoji, messages système, jauges de progression (👑/✨/❄️), sons WebAudio, confettis.

## Fichiers
- `client/games/petit-bac/index.js` + `config.json` + `README.md`
- `client/games/games.json` (v1.2.0, description mise à jour)
- `client/js/views/GameView.js` — **patch cœur nécessaire à la reprise** : le contexte du module suit désormais `hostId` en direct quand le serveur promeut un nouveau Host (générique, profite à tous les futurs jeux résilients)

## Installation
Copier en respectant l'arborescence puis `git add -A && git commit -m "Petit Bac v1.2.0 : vote, reprise Host, boosts" && git push`.

## Tests
- Moteur : 40 parties simulées — vote (verrou, avance, clôture), skip, snapshot/fromSnapshot fidèle et indépendant AVEC jokers, double ×2 sur les cumuls votés, gel bloquant, sablier, égalités, non-fuite des cumuls pendant le jeu.
- Non-régression E2E serveur : présélection du jeu et relais game:message intacts.
