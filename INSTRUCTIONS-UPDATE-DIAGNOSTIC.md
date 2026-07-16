# Mise à jour — Diagnostic réseau dans la page programmeur

## Pourquoi

Tu soupçonnes que la prédiction du joueur invité fonctionne, mais que ses
commandes n'arrivent pas jusqu'au Host. Cette mise à jour ajoute un outil de
diagnostic dans la page programmeur (Espace programmeur → tableau des
clients connectés → bouton **🩺 Diagnostiquer** sur la ligne d'un client)
qui teste, contre CE client précis, dans l'ordre :

1. **Répondant** — le client répond-il encore à un ping ?
2. **RTT / gigue** — 24 pings au même pas que le moteur (50 ms) : latence
   moyenne, min, max, gigue.
3. **Débit soutenu** — rafale de 150 messages sans délai : perd-on des
   messages sous charge ?
4. **Intégrité charge utile** — trois tailles (commande ~80 o, vue ~1 Ko,
   labyrinthe ~20 Ko) : la donnée arrive-t-elle intacte, sans troncature ni
   altération ?
5. **Cohérence salon (vu par le serveur)** — fait, pas hypothèse : ce
   client est-il bien listé dans `room.players` du salon auquel il pense
   appartenir ? C'est exactement la vérification qui garde le relais ciblé
   (`room.has(target.id)`), donc si elle est fausse, on sait immédiatement
   pourquoi le test suivant va échouer — plus besoin de deviner.
6. **Relais en partie (`game:message`)** — si le client ciblé est
   actuellement en partie, on lui demande de s'envoyer à lui-même 60
   paquets réels via `sendGameMessage` — la même fonction que toute
   commande de jeu, sans copie ni raccourci — et on vérifie combien
   reviennent. Ce test emprunte EXACTEMENT le chemin qu'une commande de
   La Traque emprunte, avec les mêmes conditions d'échec.

Si les tests 1 à 4 sont au vert et que le test 5 échoue, le problème n'est
pas le réseau : il est dans le relais ciblé lui-même pour ce client
précis, à ce moment précis (identifiant devenu obsolète, salon qui n'est
plus IN_GAME côté serveur, etc.) — exactement le genre de panne silencieuse
qu'aucun joueur ne peut voir depuis son écran, puisque les erreurs sur les
actions `input` ne sont volontairement pas remontées (pour ne pas spammer
un joueur qui bouge simplement pendant un temps mort).

## Important — ce que ça NE fait PAS

Ça ne change rien à l'autorité du serveur. Le Host reste seul décideur des
positions ; ce diagnostic ne fait qu'observer et mesurer le transport, il
ne modifie aucune logique de jeu. Voir la discussion en amont : donner à la
prédiction du client le pouvoir de corriger le serveur casserait
l'anti-triche de La Traque (positions jamais diffusées en clair) — ce
n'était donc pas la direction retenue.

## Fichiers modifiés (à remplacer intégralement)

- `shared/events.js` — ajout des événements `DIAG_*`
- `server/sockets/registerSocketHandlers.js` — nouvelle route `DIAG_RUN`
  (réservée aux admins authentifiés), signature de
  `registerSocketHandlers()` étendue avec `diagnostics = null`
- `server/server.js` — instanciation de `DiagnosticService` et branchement
  dans `registerSocketHandlers(...)`
- `client/js/core/SocketClient.js` — réponse automatique aux tests (tout
  client répond, admin ou non, puisque c'est LUI qu'on peut tester depuis
  le tableau), méthode `runDiagnostic()`
- `client/js/ui/devPanel.js` — bouton par ligne + panneau de résultats

## Fichier nouveau

- `server/admin/DiagnosticService.js` — toute la logique de la batterie de
  tests

## Installation

1. Sauvegarde ou commit ton état actuel (`git add -A && git commit -m
   "avant mise à jour diagnostic"` si tu utilises git).
2. Copie chaque fichier de ce dossier `update/` à l'emplacement identique
   dans ton projet (les 5 fichiers modifiés remplacent entièrement les
   tiens ; `server/admin/DiagnosticService.js` est nouveau).
3. Redémarre le serveur (`npm start` ou équivalent).
4. Ouvre Paramètres → Espace programmeur → saisis ton code → repère le
   client à tester dans le tableau → **🩺 Diagnostiquer**.
5. Pour reproduire ton problème précisément : lance une vraie partie de La
   Traque avec un invité, et diagnostique l'invité PENDANT la partie (le
   test 5 n'apparaît que si le client ciblé est en partie au moment du
   diagnostic — sinon il indique juste « non applicable »).

## Vérifications faites avant livraison

Je n'ai pas pu lancer ton serveur complet dans mon environnement (pas
d'accès réseau pour installer `express`/`socket.io`), donc je n'ai pas pu
faire un test de bout en bout avec un vrai navigateur. En revanche, j'ai :

- vérifié la syntaxe de chaque fichier (`node --check`) ;
- vérifié que tous les imports (`shared/events.js`, `shared/constants.js`)
  se résolvent correctement ;
- rejoué la logique complète de `DiagnosticService` avec de faux sockets
  simulant : une connexion saine, une connexion saine en partie, une charge
  altérée en transit, un client injoignable, et — surtout — **exactement
  ton bug rapporté** (transport qui répond normalement mais relais
  `game:message` ciblé muet) : le diagnostic isole correctement le problème
  dans ce dernier cas, sans faux positif sur les autres tests ;
- corrigé au passage deux bugs trouvés pendant ces vérifications : un plantage
  du panneau si aucun diagnostic n'avait encore été lancé, et un diagnostic
  qui attendait inutilement le délai maximum de chaque test même quand tout
  répondait instantanément (~10 s → ~1,5 s sur une connexion saine).

Teste quand même en conditions réelles avant de considérer que c'est
définitivement bon — un vrai navigateur, un vrai Host, un vrai invité.
