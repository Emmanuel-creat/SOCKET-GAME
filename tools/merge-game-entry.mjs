#!/usr/bin/env node
/**
 * Fusionne UNE fiche de jeu dans client/games/games.json sans jamais écraser
 * le travail des autres développeurs.
 *
 * Le catalogue est un fichier partagé : livrer un games.json complet dans un zip
 * fait systématiquement régresser les jeux livrés entre-temps par quelqu'un
 * d'autre. Ce script ne touche qu'à la fiche concernée.
 *
 * Usage :
 *   node tools/merge-game-entry.mjs client/games/<jeu>/game.entry.json
 *   node tools/merge-game-entry.mjs client/games/<jeu>/game.entry.json --dry-run
 *
 * Comportement :
 *  - la fiche existe déjà (par id)  → elle est mise à jour sur place (position conservée) ;
 *  - elle n'existe pas              → elle remplace le premier placeholder libre,
 *                                     sinon elle est ajoutée à la fin ;
 *  - toutes les autres fiches sont laissées strictement intactes.
 */
import { readFileSync, writeFileSync } from 'node:fs';

const CATALOG = 'client/games/games.json';
const args = process.argv.slice(2);
const dryRun = args.includes('--dry-run');
const entryPath = args.find((a) => !a.startsWith('--'));

if (!entryPath) {
  console.error('Usage : node tools/merge-game-entry.mjs <chemin/game.entry.json> [--dry-run]');
  process.exit(1);
}

const entry = JSON.parse(readFileSync(entryPath, 'utf8'));
const REQUIRED = ['id', 'nom', 'description', 'icone', 'joueursMin', 'joueursMax', 'etat', 'version', 'module', 'chemin'];
const missing = REQUIRED.filter((k) => entry[k] === undefined);
if (missing.length) {
  console.error(`❌ Fiche invalide, champs manquants : ${missing.join(', ')}`);
  process.exit(1);
}

const catalog = JSON.parse(readFileSync(CATALOG, 'utf8'));
const games = catalog.games;
const before = JSON.stringify(games);

const i = games.findIndex((g) => g.id === entry.id);
let action;
if (i !== -1) {
  games[i] = { ...games[i], ...entry };
  action = `fiche « ${entry.id} » mise à jour sur place (position ${i + 1})`;
} else {
  const p = games.findIndex((g) => /^placeholder/.test(g.id));
  if (p !== -1) {
    const old = games[p].id;
    games[p] = entry;
    action = `fiche « ${entry.id} » installée à la place de ${old}`;
  } else {
    games.push(entry);
    action = `fiche « ${entry.id} » ajoutée en fin de catalogue`;
  }
}

// Garde-fou : aucune AUTRE fiche ne doit avoir bougé.
const others = (list) => list.filter((g) => g.id !== entry.id && !/^placeholder/.test(g.id));
const untouched = JSON.stringify(others(JSON.parse(before))) === JSON.stringify(others(games));
if (!untouched) {
  console.error('❌ Abandon : la fusion aurait modifié d\'autres fiches.');
  process.exit(1);
}

const dispo = games.filter((g) => g.etat === 'disponible').map((g) => `${g.id} v${g.version}`);
if (dryRun) {
  console.log(`🔎 (simulation) ${action}`);
} else {
  writeFileSync(CATALOG, `${JSON.stringify(catalog, null, 2)}\n`);
  console.log(`✅ ${action}`);
}
console.log(`   Jeux disponibles après fusion (${dispo.length}) : ${dispo.join(', ')}`);
console.log('   Toutes les autres fiches sont inchangées.');
