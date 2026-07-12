/** Export/import PGN — cas standards (parties linéaires, sans variantes imbriquées ni NAG). */
import { ChessEngine } from './engine.js';

export function toPGN(engine, headers = {}) {
  const today = new Date().toISOString().slice(0, 10).replace(/-/g, '.');
  const tags = {
    Event: 'Partie amicale', Site: 'Arcade', Date: today, Round: '-',
    White: 'Blancs', Black: 'Noirs', Result: '*', ...headers,
  };
  const tagLines = Object.entries(tags).map(([k, v]) => `[${k} "${v}"]`).join('\n');
  let movetext = '';
  engine.moveHistory.forEach((m, i) => {
    if (i % 2 === 0) movetext += `${Math.floor(i / 2) + 1}. `;
    movetext += `${m.san} `;
  });
  movetext += tags.Result;
  return `${tagLines}\n\n${wrapText(movetext.trim(), 78)}\n`;
}

function wrapText(text, width) {
  const words = text.split(' ');
  const lines = [];
  let line = '';
  for (const w of words) {
    if ((`${line} ${w}`).trim().length > width) { lines.push(line.trim()); line = ''; }
    line += ` ${w}`;
  }
  if (line.trim()) lines.push(line.trim());
  return lines.join('\n');
}

/** Reconstruit une partie (ChessEngine) à partir d'un texte PGN. Renvoie {ok, engine, error?}. */
export function fromPGN(pgnText) {
  const noComments = pgnText.replace(/\{[^}]*\}/g, ' ').replace(/;[^\n]*/g, ' ');
  const noVariations = noComments.replace(/\([^()]*\)/g, ' ');
  const noTags = noVariations.replace(/^\s*\[[^\]]*\]\s*$/gm, ' ');
  const tokens = noTags
    .replace(/\d+\.(\.\.)?/g, ' ')
    .replace(/(1-0|0-1|1\/2-1\/2|\*)/g, ' ')
    .split(/\s+/)
    .map((t) => t.trim())
    .filter(Boolean);

  const engine = new ChessEngine();
  for (const raw of tokens) {
    const token = raw.replace(/[!?]+$/, '');
    const legal = engine.legalMoves(engine.turn);
    const match = legal.find((m) => engine._sanFor(m, legal) === token);
    if (!match) return { ok: false, error: `Coup illisible ou illégal dans le PGN : « ${token} ».`, engine };
    engine.makeMove({ from: match.from, to: match.to, promotion: match.promotion });
  }
  return { ok: true, engine };
}
