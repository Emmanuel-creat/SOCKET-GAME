# Refonte du pipeline de déplacement — diagnostic prouvé, cause corrigée

## D'abord, la méthode : compter, pas supposer

Tu demandais d'identifier précisément la cause sans la masquer. J'ai instrumenté le
pipeline complet et compté chaque commande à chaque étage :

```
[1 générée] → [2 émise] → [3 relayée serveur] → [4 reçue Host] → [5 appliquée moteur]
```

**Partie nominale : 8 émises → 8 reçues → 8 appliquées. Zéro perte, zéro désordre,
zéro doublon.** Le transport (WebSocket = TCP) est irréprochable — il l'a toujours été.
Idem sous charge : 9 invités simultanés, 72 commandes émises, **72 appliquées**.

Le pipeline ne perdait rien… tant que personne ne rafraîchissait sa page.

## La cause, prouvée par les nombres

**Scénario « l'invité fait F5 en pleine partie »** (le geste le plus banal du monde,
surtout en dev local) — mesuré avant correctif :

- avant le refresh : ses commandes s'appliquent (ça marche) ;
- au retour : **nouvelle identité** (`randomUUID` à chaque connexion), **re-join
  refusé** (« ce salon n'accepte plus de joueurs »), et le moteur du Host ne connaît
  que les joueurs du lancement ;
- résultat : **7 commandes émises, 0 appliquée** — jetées par le serveur
  (`NOT_IN_ROOM`), en silence côté jeu.

C'est ton symptôme, mot pour mot : « mes déplacements n'arrivent jamais au serveur
autoritaire, même en local ». La prédiction locale faisait bouger ton écran, la
réconciliation te ramenait — et l'autorité n'a jamais rien reçu. Le problème n'a
jamais été le réseau, la latence ou les performances : c'étaient **les sessions**.
Même mécanique côté Host : son F5 transférait l'autorité à un client qui n'a pas de
moteur → partie zombie, commandes vers un identifiant mort.

## Les corrections structurelles

### 1. Identité stable (`cid`)
Le navigateur génère une fois un identifiant, gardé en localStorage, envoyé à chaque
`user:register`. Un F5 n'est plus un inconnu.

### 2. Grâce de reconnexion (45 s, réglable par `GRACE_MS`)
Un joueur en **partie en cours** qui perd sa socket n'est plus exclu : il est « en
grâce ». Il garde son utilisateur — même `user.id`, même place au salon. À son retour
(même `cid`), le serveur le rattache, le remet dans le salon et **lui renvoie la
partie** (`game:started`). Son module remonte, envoie son `hello`, reçoit un état
complet — et comme c'est le même identifiant, **le moteur du Host le reconnaît : ses
commandes repartent**, sans rien changer aux jeux.

### 3. Fin propre si le Host ne revient pas
L'autorité vivait dans son navigateur ; sans lui, les invités commanderaient dans le
vide pour toujours. Passée la grâce : la partie est terminée **proprement**, avec une
annonce (« Partie interrompue : X (l'hôte) ne s'est pas reconnecté »). Plus de zombie.
S'il revient à temps : il récupère son rôle, remonte un moteur, et la partie repart
(manche réinitialisée — l'état vivait dans l'onglet fermé, c'est la limite assumée du
modèle Host-autoritaire).

### 4. Zéro chute silencieuse + journalisation du pipeline
- **Serveur** : chaque message jeté est **compté et journalisé** (`[pipeline] RAISON ×n`,
  throttlé), et répond une erreur explicite à l'expéditeur. Un destinataire simplement
  absent (en grâce) est compté sans crier — c'est un cas normal.
- **Host (La Traque, Among Us)** : une entrée rejetée par le moteur n'est plus un
  silence — compteur, log, et **un `resync`** (throttlé) : l'expéditeur se ré-annonce
  (`hello`) et repart sur un état complet. Filet de sécurité générique.
- **Numéros de séquence** : chaque entrée porte un `seq` croissant ; le Host journalise
  tout trou ou désordre. Sur TCP c'est anormal — si ce log parle un jour, le coupable
  sera applicatif et immédiatement localisé.

## Ce que je n'ai PAS fait, et pourquoi

Pas de couche ACK / retransmission / file de renvoi applicative. Socket.IO sur
WebSocket, c'est du TCP : livraison **fiable et ordonnée** garanties par le transport —
mes mesures le confirment (0 perte, 0 désordre, 0 doublon, y compris à 10 joueurs).
Les commandes ne se perdaient pas *en route* : elles étaient *refusées à l'arrivée*
pour cause d'identité périmée. Ajouter un ACK par-dessus TCP n'aurait rien corrigé et
aurait créé la redondance que tu demandes justement d'éliminer. Les `seq` + le journal
donnent la **preuve continue** de cet ordre, sans le coût.

## Vérifié — les cinq scénarios

| Scénario | Avant | Après |
|---|---|---|
| A. Partie nominale | ✅ 8/8 appliquées | ✅ 8/8 |
| B. **Invité F5 en partie** | ❌ **0/7 appliquée** (symptôme) | ✅ **7/7** — il rejoue |
| C. Host F5, ne revient pas | ❌ zombie silencieux | ✅ fin annoncée à tous |
| D. Host F5, revient à temps | ❌ zombie | ✅ même id, partie renvoyée, l'invité rejoue |
| E. Charge : 9 invités, 3 s | ✅ 72/72 | ✅ 72/72, zéro rejet |

Latence : le pipeline est indépendant du délai (TCP) ; la tenue à 70–80 ms de ping a
été validée par les campagnes précédentes (prédiction 25 ms de réaction, recalage
médian 0,04 case). Non-régression : l'espace programmeur repasse ses 14 vérifications.

```bash
GRACE_MS=2500 node server/server.js     # grâce courte pour tester vite
GRACE_MS=2500 node test-pipeline.mjs    # les 5 scénarios, tableaux étage par étage
```

## Fichiers (⚠️ zip CUMULATIF)

- `server/rooms/ReconnexionGrace.js` — **nouveau** : la grâce.
- `server/users/UserManager.js` — `cid` + détacher/rattacher.
- `server/sockets/registerSocketHandlers.js` — reprise au register, grâce au
  disconnect, fin propre, pipeline journalisé. **Contient aussi le correctif « espace
  programmeur »** : remplace celui du zip précédent.
- `client/js/core/SocketClient.js` — `cid` persistant. **Contient aussi le correctif
  « espace programmeur »** : remplace celui du zip précédent.
- `server/server.js` — instancie la grâce (tes services admin/diagnostic intacts).
- `client/games/la-traque/index.js`, `client/games/among-us/index.js` — `seq`,
  journal des rejets, `resync`. Versions cumulatives (tous correctifs précédents inclus).
- `test-pipeline.mjs` — la preuve, rejouable.
