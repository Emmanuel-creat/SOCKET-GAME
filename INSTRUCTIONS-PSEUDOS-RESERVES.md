# 🚫 Pseudos réservés (vérification côté serveur)

## Ce que fait cette mise à jour

Une liste de pseudos **non attribuables**, vérifiée par le SERVEUR au moment de
l'inscription ET du changement de profil (un filtre client se contourne en une
ligne de console ; ici, non). La comparaison tolère les variantes d'écriture :
majuscules, accents, séparateurs (`e.x.e.m.p.l.e`), lettres répétées
(`Exxemplle`) et substitutions chiffres/lettres (`3x3mpl3`, `y0an`…).

Le refus est **neutre** : « Ce pseudo n'est pas disponible. Choisissez-en un
autre. » — c'est volontaire, et j'y tiens. Un message qui insulte ou vise
nommément une personne t'exposerait (c'est écrit noir sur blanc dans ton code,
versionné sur GitHub public) et contredirait l'esprit du site. Le refus neutre
obtient le même résultat : la personne ne peut pas s'inscrire sous ce nom.

## Configuration (Render → Environment)

Ajouter la variable :

```
PSEUDOS_RESERVES=nom1,nom2
```

Mets-y les noms que tu veux réserver, séparés par des virgules. Sans la
variable, aucun pseudo n'est bloqué. Chaque nom couvre automatiquement toutes
ses variantes d'écriture. (Même endroit que ADMIN_CODE.)

## Limite honnête

Ça réserve des NOMS, ça ne bannit pas des PERSONNES : quelqu'un de déterminé
s'inscrira sous un autre pseudo. Si tu veux vraiment exclure des individus,
la bonne brique est un bannissement par l'admin (par cid/IP depuis l'espace
programmeur) — dis-moi et je te le construis proprement.

## Fichiers (2 + test)

- `server/users/pseudosReserves.js` — **nouveau** : canonisation + liste.
- `server/sockets/registerSocketHandlers.js` — ⚠️ **CUMULATIF** : inclut
  l'espace programmeur, la refonte pipeline ET cette garde. Il REMPLACE le
  fichier du zip refonte-pipeline-deplacement. Ne pas mélanger avec une
  version antérieure (fichier d'infrastructure partagé).
- `test-pseudos-reserves.mjs` — 13 vérifications (lancer le serveur avec
  `PSEUDOS_RESERVES=exemple,autrenom` puis `node test-pseudos-reserves.mjs`).
