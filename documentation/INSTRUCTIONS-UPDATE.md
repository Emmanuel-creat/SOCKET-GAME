# Update — 3 correctifs

Aucun `games.json` dans ce zip : le catalogue n'est pas touché.

## Installation
Copie l'arborescence à la racine du repo, puis :
```
git add -A && git commit -m "Fuite de rôles loup-garou, optimisation réseau, espace programmeur" && git push
```

---

## 1. 🐺 Loup-Garou — les morts voyaient les rôles des vivants
`client/games/loup-garou/engine.js`

Le moteur révélait tous les rôles à quiconque était mort. Corrigé : **un rôle n'est révélé que si le joueur concerné est mort** (pour tout le monde), ou en fin de partie. Mourir ne donne plus aucun privilège.

**Il y avait une seconde fuite, par un autre chemin** : le chat des loups était ouvert aux morts — ce qui revenait à leur nommer la meute. Fermé aussi. Un loup mort, lui, garde l'accès (il connaissait déjà sa meute).

Si tu voulais au contraire que les morts soient des spectateurs omniscients, passe `MORTS_VOIENT_TOUT` à `true` en tête du fichier : c'est le seul interrupteur.

## 2. ⚡ Optimisation réseau — La Traque (et Among Us)
`client/games/la-traque/{engine,index}.js` · `client/games/among-us/{engine,index}.js`

Les invités ramaient parce que le Host leur renvoyait **des données identiques dix fois par seconde** : le labyrinthe, la liste des joueurs, et **tout l'historique du chat à chaque image**.

Mesuré, à 8 joueurs :

| | avant | après |
|---|---|---|
| La Traque — réseau | **582 Ko/s** | **93 Ko/s** |
| La Traque — CPU du Host | 1,17 ms/diffusion | 0,52 ms |
| Among Us — réseau | **587 Ko/s** | **153 Ko/s** |
| Among Us — CPU du Host | 1,08 ms/diffusion | 0,53 ms |

Soit **73 Ko/s → 12 Ko/s reçus par invité** sur La Traque.

Ce qui a changé :
- **Diffusion différentielle** : la carte part une fois par manche, le roster quand il change, le chat et le journal **message par message** (numéros de séquence). Le client réassemble.
- **Ligne de vue en parcours de cases (DDA)** au lieu d'un échantillonnage fin : ~16 tests au lieu de ~115 par appel, et c'est appelé des milliers de fois par seconde.
- **Décor pré-dessiné hors écran** : le labyrinthe (651 rectangles) et la carte du Skeld (1 296) étaient repeints à chaque image, 60 fois par seconde, pour un décor fixe. Ils sont maintenant peints une fois puis recopiés.
- **Panneaux latéraux figés** : roster, journal et chat n'étaient reconstruits en DOM que pour réafficher la même chose. Ils ne bougent plus que quand leur contenu change.
- Cône de lampe : 36 rayons au lieu de 54, pas plus grossier. Densité de pixels plafonnée à 1,5 (le DPR 3 des mobiles triplait le coût du rendu).

J'ai traité **Among Us en même temps** : il souffrait exactement du même défaut et serait devenu injouable pour les mêmes raisons.

## 3. 🛠️ Espace programmeur (Paramètres → accès restreint)
`server/admin/AdminService.js` *(nouveau)* · `client/js/ui/devPanel.js` *(nouveau)* · `server/server.js` · `server/sockets/registerSocketHandlers.js` · `shared/events.js` · `client/js/core/SocketClient.js` · `client/js/ui/modals.js`

Entrée dans **Paramètres**, code **200307**.

Le tableau de bord, rafraîchi toutes les 2 s :
- **Clients connectés** : pseudo, **adresse IP**, statut, salon, **ping**, transport (websocket/polling), navigateur + OS, ancienneté, nombre de messages, id de socket.
- **Serveur** : mémoire (RSS, heap), charge CPU, **retard de la boucle d'événements** (le vrai signal de saturation d'un Node), uptime, version, plateforme, cœurs, PID.
- **Capacité** : clients, pics (clients, mémoire, ping), mémoire système libre.
- **Salons** : code, nom, jeu, joueurs, état.
- **Courbes** sur 3 minutes : clients, ping moyen, mémoire, retard de boucle.
- **Depuis le démarrage** : connexions, parties lancées, messages relayés.

### Deux points de sécurité, à lire
1. **Le code est vérifié par le serveur, jamais par le client.** Un contrôle côté navigateur se contourne avec la console en dix secondes.
2. **Un code à six chiffres, c'est un million de combinaisons** : sans protection, on le trouve par force brute en quelques minutes sur une socket ouverte. J'ai donc mis une **limitation : 5 essais par adresse IP, puis blocage 15 minutes**. Change-le en production via la variable d'environnement `ADMIN_CODE` (sur Render : Environment → Add Environment Variable). Le code reste dans le code source sinon, et le repo est public.

Note aussi que **les adresses IP sont des données personnelles** : cette page ne doit pas être partagée.

## Tests
- Loup-Garou : les 300 parties passent + un test de non-régression sur la fuite (un mort ne voit ni les rôles des vivants ni le chat des loups ; les rôles des morts restent publics ; un loup mort garde sa meute ; tout est révélé en fin de partie).
- La Traque : 5 833 085 vues anti-fuite revérifiées après optimisation — aucune régression.
- Among Us : 636 972 vues anti-fuite revérifiées.
- Espace programmeur (`test-admin.mjs`, bout en bout sur un vrai serveur) : mauvais code refusé, **aucune statistique diffusée sans authentification**, bon code accepté, clients listés avec IP, latence mesurée, second client détecté, **force brute bloquée après 5 essais** — et le bon code reste refusé pendant le blocage.
- Le reste de la plateforme (relais, création de salon, 9 autres jeux) : inchangé, tests au vert.
