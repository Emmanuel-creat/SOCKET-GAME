import { DominoEngine, buildSet, aiChooseAction, AI_LEVELS } from './index.js';

let n = 0;
let fails = 0;
function assert(cond, msg) {
  n += 1;
  if (!cond) { fails += 1; console.error(`❌ ${msg}`); } else { console.log(`✅ ${msg}`); }
}
function assertThrowsNever(fn, msg) {
  try { fn(); assert(true, msg); } catch (e) { assert(false, `${msg} — a levé: ${e.message}`); }
}

/* ---------------- buildSet ---------------- */
{
  const set6 = buildSet(6);
  assert(set6.length === 28, 'double-six = 28 pièces');
  const set9 = buildSet(9);
  assert(set9.length === 55, 'double-neuf = 55 pièces');
  const ids = new Set(set6.map((t) => t.id));
  assert(ids.size === 28, 'ids uniques');
  assert(set6.every((t) => t.a <= t.b), 'a <= b pour chaque pièce (identité canonique)');
  const doubles = set6.filter((t) => t.a === t.b);
  assert(doubles.length === 7, '7 doubles dans un double-six (0-0 à 6-6)');
}

/* ---------------- distribution ---------------- */
{
  const e = new DominoEngine(['p1', 'p2'], { mode: 'rapide' });
  assert(e.hands.p1.length === 7 && e.hands.p2.length === 7, '7 dominos par joueur (2 joueurs)');
  assert(e.boneyard.length === 28 - 14, 'reste 14 dominos en pioche (2 joueurs)');
  const allIds = new Set([...e.hands.p1, ...e.hands.p2, ...e.boneyard].map((t) => t.id));
  assert(allIds.size === 28, 'aucun domino dupliqué ni manquant après distribution');
}
{
  const e = new DominoEngine(['p1', 'p2', 'p3', 'p4'], { mode: 'rapide' });
  assert(Object.values(e.hands).every((h) => h.length === 7), '7 dominos par joueur (4 joueurs)');
  assert(e.boneyard.length === 0, 'pioche vide avec 4 joueurs à 7 dominos (28 = 4×7)');
}

/* ---------------- démarrage : plus haut double ---------------- */
{
  // Force une distribution connue en piégeant Math.random pour un test déterministe.
  const orig = Math.random;
  Math.random = () => 0; // shuffle Fisher-Yates avec random=0 → ordre inversé, déterministe
  const e = new DominoEngine(['p1', 'p2'], { mode: 'rapide' });
  Math.random = orig;
  let bestVal = -1;
  let bestOwner = null;
  for (const id of ['p1', 'p2']) {
    for (const t of e.hands[id]) if (t.a === t.b && t.a > bestVal) { bestVal = t.a; bestOwner = id; }
  }
  assert(e.turn === bestOwner, 'le joueur ayant le plus haut double commence');
}

/* ---------------- validation des coups ---------------- */
{
  const e = new DominoEngine(['p1', 'p2'], { mode: 'rapide' });
  e.hands.p1 = [{ id: 100, a: 3, b: 3 }, { id: 101, a: 3, b: 5 }, { id: 102, a: 1, b: 2 }];
  e.hands.p2 = [{ id: 200, a: 5, b: 6 }, { id: 201, a: 0, b: 0 }];
  e.turn = 'p1';

  const badTurn = e.play('p2', 200, 'left');
  assert(badTurn.ok === false, 'refuse un coup hors tour');

  const notInHand = e.play('p1', 999, 'any');
  assert(notInHand.ok === false, 'refuse un domino absent de la main');

  const r1 = e.play('p1', 100, 'any'); // premier domino, 3-3
  assert(r1.ok && e.leftEnd === 3 && e.rightEnd === 3, 'premier domino pose librement, extrémités = 3/3');
  assert(e.turn === 'p2', 'le tour passe au joueur suivant après un coup valide');

  const mismatch = e.play('p2', 201, 'left'); // 0-0 ne correspond pas à 3
  assert(mismatch.ok === false, 'refuse un domino qui ne correspond à aucune extrémité');

  const r2 = e.play('p2', 200, 'left'); // 5-6 : le 5 ne touche pas 3... doit échouer
  assert(r2.ok === false, 'refuse un domino dont AUCUNE valeur ne correspond à l\'extrémité visée');

  e.hands.p2.push({ id: 202, a: 3, b: 6 });
  const r3 = e.play('p2', 202, 'left');
  assert(r3.ok && e.leftEnd === 6, 'accepte un domino correspondant, nouvelle extrémité = valeur libre');
  assert(e.chain[0].id === 202 && e.chain[1].id === 100, 'le domino posé à gauche est bien en tête de chaîne');
}

/* ---------------- doubles : orientation cohérente ---------------- */
{
  const e = new DominoEngine(['p1', 'p2'], { mode: 'rapide' });
  e.hands.p1 = [{ id: 1, a: 4, b: 4 }, { id: 9, a: 0, b: 0 }]; // 2e pièce pour ne pas vider la main tout de suite
  e.hands.p2 = [{ id: 2, a: 4, b: 2 }];
  e.turn = 'p1';
  e.play('p1', 1, 'any');
  const r = e.play('p2', 2, 'right');
  assert(r.ok && e.rightEnd === 2, 'un domino accroché à un double libère la bonne extrémité');
}

/* ---------------- pioche & passe ---------------- */
{
  const e = new DominoEngine(['p1', 'p2'], { mode: 'rapide' });
  e.hands.p1 = [{ id: 1, a: 6, b: 6 }, { id: 9, a: 0, b: 3 }]; // 2e pièce, ne matche pas 6 → n'interfère pas
  e.hands.p2 = [{ id: 2, a: 1, b: 2 }]; // ne correspond à rien après le 6-6
  e.boneyard = [{ id: 900, a: 6, b: 0 }, { id: 901, a: 0, b: 1 }];
  e.turn = 'p1';
  e.play('p1', 1, 'any'); // chaîne = 6-6, tour à p2

  const cantPlay = e.canPlay('p2');
  assert(cantPlay === false, 'p2 ne peut pas jouer 1-2 sur une extrémité 6');

  const badPass = e.pass('p2');
  assert(badPass.ok === false, 'refuse de passer tant que la pioche n\'est pas vide');

  const d1 = e.draw('p2');
  assert(d1.ok && d1.tile.id === 901, 'pioche la dernière carte du tas (LIFO du tableau de test)');
  assert(e.hands.p2.length === 2, 'la main grandit après une pioche');

  const d2 = e.draw('p2');
  assert(d2.ok && d2.tile.id === 900 && d2.canPlayNow === true, 'la seconde pioche donne un domino jouable (6-0)');

  const badDraw = e.draw('p2');
  assert(badDraw.ok === false, 'refuse de piocher si un coup est déjà jouable');
}

/* ---------------- blocage total (partie bloquée) ---------------- */
{
  const e = new DominoEngine(['p1', 'p2'], { mode: 'rapide' });
  e.hands.p1 = [{ id: 1, a: 6, b: 6 }, { id: 3, a: 1, b: 1 }]; // 1-1 invendable après 6-6
  e.hands.p2 = [{ id: 2, a: 2, b: 2 }]; // idem
  e.boneyard = [];
  e.turn = 'p1';
  e.play('p1', 1, 'any'); // chaîne 6-6, tour p2, boneyard vide, p2 ne peut pas jouer 2-2
  const passP2 = e.pass('p2');
  assert(passP2.ok && !passP2.blocked, 'p2 passe (1er passage), pas encore bloqué');
  const passP1 = e.pass('p1'); // p1 a 1-1, ne matche pas 6-6 non plus
  assert(passP1.ok && passP1.blocked === true, 'deux passages consécutifs (= tous les actifs) bloquent la manche');
  assert(e.roundPhase === 'blocked', 'phase de manche = bloquée');
  // p1 a 1-1 (valeur 2), p2 a 2-2 (valeur 4) → p1 gagne la manche (plus petit total)
  assert(e.roundWinner === 'p1', 'en cas de blocage, le plus petit total en main gagne la manche');
  assert(e.scores.p1 === 4, 'le gagnant du blocage marque la somme des mains adverses');
}

/* ---------------- blocage avec égalité : personne ne marque ---------------- */
{
  const e = new DominoEngine(['p1', 'p2'], { mode: 'rapide' });
  e.hands.p1 = [{ id: 1, a: 6, b: 6 }, { id: 3, a: 1, b: 2 }]; // valeur 3
  e.hands.p2 = [{ id: 2, a: 1, b: 2 }]; // valeur 3 aussi (égalité)
  e.boneyard = [];
  e.turn = 'p1';
  e.play('p1', 1, 'any');
  e.pass('p2');
  e.pass('p1');
  assert(e.roundWinner === null, 'égalité au blocage : aucun gagnant de manche');
  assert(e.scores.p1 === 0 && e.scores.p2 === 0, 'égalité au blocage : aucun score attribué');
}

/* ---------------- victoire par domino (main vidée) ---------------- */
{
  const e = new DominoEngine(['p1', 'p2'], { mode: 'rapide' });
  e.hands.p1 = [{ id: 1, a: 3, b: 3 }];
  e.hands.p2 = [{ id: 2, a: 5, b: 5 }, { id: 3, a: 1, b: 1 }]; // valeur 12 restante
  e.turn = 'p1';
  const r = e.play('p1', 1, 'any');
  assert(r.ok && r.roundOver === true, 'vider sa main termine la manche immédiatement');
  assert(e.roundPhase === 'won' && e.roundWinner === 'p1', 'le joueur qui vide sa main gagne la manche');
  assert(e.scores.p1 === 12, 'le gagnant marque la somme des points adverses restants');
  assert(e.matchPhase === 'matchEnd', 'mode rapide = le match se termine après une seule manche');
  assert(e.matchWinner === 'p1', 'le gagnant de la manche gagne le match en mode rapide');
}

/* ---------------- score cible & manches successives ---------------- */
{
  const e = new DominoEngine(['p1', 'p2'], { mode: 'cible', targetScore: 15 });
  e.hands.p1 = [{ id: 1, a: 3, b: 3 }];
  e.hands.p2 = [{ id: 2, a: 5, b: 5 }]; // valeur 10, sous le seuil de 15 sur une seule manche
  e.turn = 'p1';
  e.play('p1', 1, 'any');
  assert(e.matchPhase === 'roundEnd', 'score cible non atteint après une manche → manche suivante possible');
  assert(e.scores.p1 === 10, 'score correctement cumulé');

  const badNext = new DominoEngine(['p1', 'p2'], { mode: 'cible', targetScore: 999 });
  const cantAdvance = badNext.nextRound();
  assert(cantAdvance.ok === false, 'refuse de passer à la manche suivante si la manche en cours n\'est pas finie');

  const nr = e.nextRound();
  assert(nr.ok === true, 'nextRound() fonctionne une fois la manche terminée');
  assert(e.roundNo === 2, 'compteur de manche incrémenté');
  assert(e.turn === 'p1', 'le gagnant de la manche précédente commence la suivante');
  assert(e.chain.length === 0 && e.hands.p1.length === 7, 'nouvelle distribution complète à la manche suivante');
}

/* ---------------- forfait (déconnexion) ---------------- */
{
  const e = new DominoEngine(['p1', 'p2', 'p3'], { mode: 'rapide' });
  e.turn = 'p2';
  const before = e.activePlayers().length;
  const f = e.forfeit('p2');
  assert(f.ok === true, 'forfait accepté');
  assert(e.activePlayers().length === before - 1, 'le joueur forfait est retiré des joueurs actifs');
  assert(e.turn !== 'p2', 'le tour ne reste pas bloqué sur le joueur forfait');
  assert(!e.activePlayers().includes('p2'), 'le forfait n\'est plus dans la rotation');
}
{
  // Dernier adversaire restant après forfaits successifs → fin de match immédiate.
  const e = new DominoEngine(['p1', 'p2'], { mode: 'cible', targetScore: 100 });
  e.forfeit('p2');
  assert(e.matchPhase === 'matchEnd', 'un seul joueur actif restant → fin de match');
  assert(e.matchWinner === 'p1', 'le survivant remporte le match par forfait');
}

/* ---------------- vues (fuite d'information) ---------------- */
{
  const e = new DominoEngine(['p1', 'p2'], { mode: 'rapide' });
  const view1 = e.viewFor('p1');
  assert(Array.isArray(view1.hand) && view1.hand.length === 7, 'viewFor renvoie SA PROPRE main complète');
  assert(view1.handCounts.p2 === 7, 'la main adverse n\'apparaît que sous forme de compte');
  assert(JSON.stringify(view1).includes('"a":') === true, 'sanity: la vue contient bien des tuiles (main personnelle)');
  const pub = e.snapshotPublic();
  assert(pub.hand === undefined && pub.handCounts, 'snapshotPublic ne contient AUCUNE main, seulement des comptes');
}

/* ---------------- IA : ne produit jamais un coup illégal ---------------- */
{
  for (const level of AI_LEVELS) {
    for (let trial = 0; trial < 40; trial += 1) {
      const e = new DominoEngine(['p1', 'p2', 'p3'], { mode: 'rapide' });
      let guard = 0;
      while (e.matchPhase === 'playing' && guard < 500) {
        guard += 1;
        const pid = e.turn;
        const action = aiChooseAction(e, pid, level);
        if (action.action === 'play') {
          const res = e.play(pid, action.tileId, action.end);
          if (!res.ok) { assert(false, `IA (${level}) a proposé un coup illégal: ${res.error}`); guard = 999; break; }
        } else if (action.action === 'draw') {
          const res = e.draw(pid);
          if (!res.ok) { assert(false, `IA (${level}) a demandé une pioche invalide: ${res.error}`); guard = 999; break; }
        } else {
          const res = e.pass(pid);
          if (!res.ok) { assert(false, `IA (${level}) a demandé une passe invalide: ${res.error}`); guard = 999; break; }
        }
        if (e.matchPhase === 'roundEnd') e.nextRound();
      }
      assert(guard < 500, `IA (${level}) termine une partie complète sans boucle infinie (essai ${trial})`);
    }
  }
  console.log('✅ IA : simulations complètes (3 niveaux × 40 parties × 3 joueurs) sans coup illégal ni blocage logiciel');
}

/* ---------------- partie complète aléatoire, cohérence globale ---------------- */
{
  for (let trial = 0; trial < 100; trial += 1) {
    const nPlayers = 2 + (trial % 3); // 2,3,4,2,3,4...
    const ids = Array.from({ length: nPlayers }, (_, i) => `p${i + 1}`);
    const e = new DominoEngine(ids, { mode: 'cible', targetScore: 60 });
    let guard = 0;
    while (e.matchPhase !== 'matchEnd' && guard < 2000) {
      guard += 1;
      const pid = e.turn;
      const a = aiChooseAction(e, pid, AI_LEVELS[trial % 3]);
      if (a.action === 'play') e.play(pid, a.tileId, a.end);
      else if (a.action === 'draw') e.draw(pid);
      else e.pass(pid);
      if (e.matchPhase === 'roundEnd') e.nextRound();
    }
    assertThrowsNever(() => {
      if (guard >= 2000) throw new Error('partie qui ne se termine jamais');
      if (e.matchPhase !== 'matchEnd') throw new Error('match non terminé après boucle');
      const totalScore = Object.values(e.scores).reduce((s, v) => s + v, 0);
      if (totalScore < 0) throw new Error('score négatif impossible');
    }, `partie complète cohérente (${nPlayers} joueurs, essai ${trial})`);
  }
}

/* ---------------- sauvegarde / reprise ---------------- */
{
  const e = new DominoEngine(['p1', 'p2', 'p3'], { mode: 'cible', targetScore: 80 });
  // Joue quelques coups pour avoir un état non trivial.
  for (let i = 0; i < 5 && e.matchPhase === 'playing'; i += 1) {
    const pid = e.turn;
    const a = aiChooseAction(e, pid, 'moyen');
    if (a.action === 'play') e.play(pid, a.tileId, a.end);
    else if (a.action === 'draw') e.draw(pid);
    else e.pass(pid);
  }
  const json = JSON.parse(JSON.stringify(e.toJSON())); // simule un aller-retour localStorage
  const restored = DominoEngine.fromJSON(json);
  assert(restored.turn === e.turn, 'reprise : le tour est préservé');
  assert(JSON.stringify(restored.hands) === JSON.stringify(e.hands), 'reprise : les mains sont préservées à l\'identique');
  assert(JSON.stringify(restored.chain) === JSON.stringify(e.chain), 'reprise : la chaîne posée est préservée');
  assert(restored.scores.p1 === e.scores.p1, 'reprise : les scores sont préservés');
  assert(restored.forfeited instanceof Set, 'reprise : forfeited redevient bien un Set (pas juste un tableau JSON)');
  // La partie restaurée doit rester jouable normalement.
  const pid = restored.turn;
  const a = aiChooseAction(restored, pid, 'moyen');
  assertThrowsNever(() => {
    const res = a.action === 'play' ? restored.play(pid, a.tileId, a.end)
      : a.action === 'draw' ? restored.draw(pid) : restored.pass(pid);
    if (!res.ok) throw new Error(res.error);
  }, 'reprise : la partie restaurée reste jouable normalement');
}

console.log(`\n${n - fails}/${n} assertions réussies.`);
if (fails > 0) { console.error(`\n❌ ${fails} ÉCHEC(S)`); process.exit(1); }
console.log('\n✅ TOUTES LES ASSERTIONS SONT PASSÉES.');
