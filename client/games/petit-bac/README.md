# Petit Bac — module Arcade

Petit Bac (« Baccalauréat ») **2 à 16 joueurs** : 10 catégories tirées au sort,
**5 manches**, saisie de 3 min 30, **notation auto-gérée par vote**, cumuls masqués
jusqu'au classement final. Indicateur **couronne 👑** du Host et bouton de secours
**⏭️ Skip**, résilients au changement de Host.

## Architecture « Host autoritaire » (avec reprise)

- Le client du **Host** exécute le moteur pur (`PetitBacEngine`) et diffuse à chaque
  joueur une vue personnalisée (`getViewFor`). Les clients envoient leurs actions au
  Host via `context.sendMessage`.
- **hostId est relu en direct** depuis `context` : si la plateforme change
  `context.hostId` (déconnexion du Host), un watchdog le détecte et transfère la
  couronne + le contrôle du Skip **en temps réel** chez tous.
- Le Host diffuse en continu un **snapshot d'état à l'héritier** (premier joueur non-
  Host), ciblé et **jamais affiché**, pour permettre au joueur promu de **reprendre
  le moteur** sans exposer les cumuls (`snapshot()` / `PetitBacEngine.fromSnapshot`).

## Déroulement

1. Le Host lance la partie. 10 catégories tirées **une fois** parmi 100.
2. Chaque manche : décompte **3-2-1**, lettre en grand **en vert fluo** puis fixée
   dans le coin (badge vert), minuteur **3 min 30**.
3. Fin de manche au **0:00** ou par **STOP** (actif si les 10 champs sont remplis).
4. **Vote auto-géré, une catégorie à la fois** : le mot de tous les joueurs s'affiche ;
   chacun note **son propre mot** ❌ 0 / ➖ 1 / ✅ 2. Le symbole apparaît **en temps
   réel** chez tous. Dès que **tous** ont voté → catégorie suivante ; après la 10ᵉ →
   clôture et enchaînement de la manche suivante.
5. Après la **5ᵉ manche**, le **leaderboard** révèle les cumuls et le classement
   (ex æquo gérés). Le Host clique **Retour au salon** (`context.onEnd`).

## Couronne 👑 & Skip ⏭️

- **Couronne** : affichée à côté du pseudo du joueur dont l'id vaut `context.hostId`,
  visible par **tous**, dans la phase de vote et le leaderboard. Se déplace
  automatiquement sur le nouveau Host en cas de promotion.
- **Skip** (Host uniquement, phase de vote) : si un joueur inactif/déconnecté bloque
  l'enchaînement, le Host attribue **0 pt** aux non-votants de la catégorie courante
  et **force le passage** (catégorie suivante, ou clôture si c'était la dernière). À
  la promotion d'un nouveau Host, ce dernier récupère l'affichage **et** le contrôle
  du Skip immédiatement.

## Confidentialité

Cumuls **strictement masqués** pendant manches et votes (seuls les symboles
❌/➖/✅ de la catégorie courante sont publics). Le snapshot de reprise n'est envoyé
qu'à l'héritier et n'est jamais rendu à l'écran. Classement révélé uniquement à la fin.

## Limites connues

- La reprise Host suppose que la plateforme promeut **l'héritier** (premier joueur non-
  Host) qui détient le snapshot. Si un autre joueur est promu, la reprise affiche un
  message d'échec propre plutôt que de corrompre l'état.
- Un joueur inactif bloque l'enchaînement automatique — c'est le rôle du **Skip**.

## Tests

Moteur pur exporté, testé en Node : vote auto-géré et enchaînement, `skipCategory`
(0 aux absents + avance/clôture), `snapshot`/`fromSnapshot` fidèle et indépendant,
non-exposition des cumuls, rangs et égalités. Tests DOM (jsdom) : couronne unique
visible par tous, Skip Host-only, **départ du Host → transfert de couronne + reprise
du moteur + Skip fonctionnel chez le nouveau Host**, confidentialité maintenue.

## Boosts 🚀 (conservés de la v1.1.0)

- **Jokers** (un usage chacun par partie, pendant la saisie) : ✨ **Double** (points de la manche ×2, appliqué aux cumuls votés, marqué dans la progression), ❄️ **Gel** (bloque la saisie d'un adversaire 15 s, overlay + refus moteur), ⏳ **Sablier** (+25 s au chrono pour tous, minuteur du Host replanifié). L'état des jokers est **inclus dans le snapshot** : une reprise de Host les conserve.
- **Skins** : 5 thèmes (Néon, Océan, Sunset, Forêt, Rétro), mémorisés localement par joueur.
- **Chat animé** : réactions emoji (🔥 👏 😂 😱 🐌), messages système (jokers joués, « X a crié STOP ! »).
- **Progression en direct** : jauge de champs remplis par joueur (👑 Host, ✨ double, ❄️ gelé), diffusée par le Host toutes les 2 s — seuls les compteurs circulent, jamais les réponses.
- **Ambiance** : bips 3-2-1, note de révélation de la lettre, alerte des 3 dernières secondes, fanfare + confettis au classement. WebAudio sans fichier, désactivable (🔊/🔇 mémorisé).
