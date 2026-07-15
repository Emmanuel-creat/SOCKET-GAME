# Update — tenir sur Render Free (0,1 CPU / 512 Mo) à 6 joueurs

## D'abord : j'ai mesuré avant de toucher au code

J'ai monté un banc de charge (`test-charge.mjs`, inclus) qui connecte **6 vrais clients** au serveur et mesure le CPU réellement consommé par le processus.

**Le résultat a changé mon diagnostic.** Le coût du serveur suit le **nombre de messages**, pas leur taille : des vues de 7,3 Ko et de 1,15 Ko coûtent le **même** CPU. Ton serveur ne peine pas à cause du volume — il peine à cause du **nombre d'aller-retours**.

| trafic (6 joueurs) | messages/s | CPU d'un cœur |
|---|---|---|
| repos | 0 | 0,2 % |
| **avant** (vues 10 Hz + entrées 16/s) | **125** | **3,1 %** |
| **avant, phase de cachette / réunion** | **241** | **5,2 %** |
| **après** | **51** | **1,1 %** |

Ces chiffres viennent de ma machine, dont le cœur est plus rapide que le vCPU partagé de Render. Sur ton plan, compte un facteur 2 à 4 : tes 5,2 % de pointe deviennent 10-20 % → **tu dépasses le quota de 0,1 CPU, Render t'étrangle, et les invités saccadent**. C'est cohérent avec ce que tu décris.

## Les trois causes trouvées

### 1. Les entrées des invités : 16 messages/s, en continu
C'était le **poste le plus lourd**, devant les vues. Chaque invité renvoyait sa position de joystick / souris toutes les 60 ms **même immobile** — alors que le Host conserve de toute façon la dernière entrée reçue.

→ **Une entrée n'est envoyée que si elle change** (signature grossière : un frémissement de souris ne mérite pas un message), plus un rappel de sécurité 1 fois/s tant qu'on bouge. Un joueur immobile n'envoie plus rien.

### 2. Un invité coincé en **polling** — et ça, c'était invisible
Socket.IO démarre **en polling** (une requête HTTP par message !) puis *tente* de basculer en WebSocket. Si la bascule échoue (réseau d'entreprise, proxy, 4G capricieuse), l'invité reste en polling pour toute la partie.

Mesuré, à trafic identique : **1,2 % en WebSocket, 4,7 % en polling.** Un seul invité dans ce cas suffisait à plomber ton serveur.

→ Le client **ouvre directement en WebSocket**, et ne retombe en polling que si la connexion échoue vraiment. La page programmeur affiche la colonne **Transport** : tu peux voir qui est dans quel mode.

### 3. Le Host diffusait à 20 Hz hors phase de jeu
Un bug de ma part dans l'update précédent : `phase !== 'traque'` → pendant **toute la phase de cachette** (où les joueurs bougent !) et pendant **chaque réunion d'Among Us** (écran fixe !), le Host diffusait **20 fois par seconde**. Doublé pour rien.

→ **Cadence adaptative** selon le nombre de joueurs :

| joueurs | fréquence des vues |
|---|---|
| ≤ 4 | 10 Hz |
| **5-6** | **6,7 Hz** ← ta configuration |
| 7-8 | 5 Hz |
| 9+ | 4 Hz (3,3 Hz au-delà de 12) |

Hors jeu (réglages, réunion, écran de manche) : **2 Hz**. Les actions (vote, kill, signalement) restent **instantanées** : elles déclenchent une diffusion immédiate, elles ne dépendent pas de la cadence.

Le lissage à l'écran s'aligne automatiquement sur la cadence : **tu ne verras pas la différence**, le mouvement reste fluide.

## Le reste

- **Socket.IO** : compression désactivée (compresser 50 petits messages/s coûte plus de CPU que ça n'économise de bande passante), tampon plafonné à 100 Ko.
- **Positions arrondies au centième de case** : `12.345678901234` dans chaque vue, dix fois par seconde et par joueur, c'est du poids pour une précision invisible. ~35 % d'octets en moins.
- **Fichiers statiques** : en cache navigateur 1 h (ton plan sert aussi les assets).
- **Rendu plafonné à ~40 images/s** chez tout le monde : au-delà, on chauffe le téléphone des invités pour des images que personne ne distingue.
- **Correctif de fond** : ma ligne de vue en parcours de cases (DDA) pouvait **sauter la case d'arrivée** quand le rayon passait exactement par un coin — devenu fréquent avec des positions arrondies. Elle concluait alors « mur » à tort : un joueur en pleine lumière pouvait devenir invisible. Corrigé et vérifié contre un calcul de référence (198 000 lignes de vue comparées).

## Ce que ça donne pour toi, à 6 joueurs

**51 messages/s au lieu de 125. 1,1 % d'un cœur au lieu de 3,1 %** (et au lieu de 5,2 % en pointe). Même avec le facteur 3 du vCPU de Render, tu restes largement sous ton quota de 0,1 CPU.

Côté mémoire, tu n'as jamais eu de problème : le serveur ne fait que relayer, il tient dans quelques dizaines de Mo sur les 512 disponibles.

## Refaire la mesure toi-même
```
node server/server.js &
node test-charge.mjs <PID_du_serveur> 6.7 4 800 websocket
```

## Une chose que je ne peux pas corriger d'ici
Le **Host** fait tourner toute la physique et calcule une vue par joueur. Si le Host est un téléphone modeste, il rame — et **tous** les invités le subissent, quel que soit l'état du serveur. Si le problème persiste après cet update, **fais héberger la partie par la machine la plus solide** du groupe, et regarde la colonne « Ping » de la page programmeur : si les pings sont bons mais que ça saccade quand même, le coupable est le Host, pas Render.

## Tests
- La Traque : **5 844 075 vues** anti-fuite revérifiées. Among Us : **980 076 vues**, avec une vérification désormais **stricte dans les deux sens** (ni fuite, ni joueur qui disparaît alors qu'il devrait être visible).
- Loup-Garou, UNO, Cache-Cache, relais, création de salon, page programmeur : au vert.
