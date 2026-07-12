/**
 * Données des thèmes de plateau et des skins de pièces. Les skins partagent tous les mêmes
 * silhouettes (pieces.js) ; seul le traitement de matière (couleur/dégradé) change.
 */

export const BOARD_THEMES = {
  bois: { label: 'Bois classique', light: '#e8c99b', dark: '#a9713f', border: '#5c3a1e', coord: '#4a2f18' },
  marbre: { label: 'Marbre', light: '#f3f1ec', dark: '#a8a5a0', border: '#716e68', coord: '#4a4844' },
  pierre: { label: 'Pierre', light: '#cdc8bf', dark: '#7e796f', border: '#4a473f', coord: '#2e2c27' },
  obsidienne: { label: 'Obsidienne', light: '#3d3d48', dark: '#121216', border: '#000000', coord: '#9a90ff' },
  or: { label: 'Or', light: '#fbe9b8', dark: '#c99a33', border: '#7a5c17', coord: '#5c4310' },
  argent: { label: 'Argent', light: '#eef0f3', dark: '#9aa3ad', border: '#586170', coord: '#333a44' },
  emeraude: { label: 'Émeraude', light: '#dff2e6', dark: '#2f8f5b', border: '#194028', coord: '#123420' },
  noir_blanc: { label: 'Noir & Blanc', light: '#ffffff', dark: '#1a1a1a', border: '#000000', coord: '#000000' },
  moderne: { label: 'Style moderne', light: '#eef1f8', dark: '#5c6f9e', border: '#293552', coord: '#1c2438' },
  medieval: { label: 'Style médiéval', light: '#d8c69a', dark: '#6b3f2a', border: '#2c1b10', coord: '#2c1b10' },
};

export const BOARD_THEME_ORDER = ['bois', 'marbre', 'pierre', 'obsidienne', 'or', 'argent', 'emeraude', 'noir_blanc', 'moderne', 'medieval'];

/**
 * Chaque skin fournit fill/stroke pour les pièces blanches et noires. `fill` peut référencer
 * un dégradé défini dans PIECE_SKIN_DEFS (injecté une fois dans le <defs> du plateau).
 */
export const PIECE_SKINS = {
  classique: { label: 'Classique', white: { fill: '#f6f4ee', stroke: '#232323' }, black: { fill: '#2a2a2a', stroke: '#000000' } },
  staunton: { label: 'Staunton', white: { fill: '#fffaf0', stroke: '#4a3520' }, black: { fill: '#3a2a1a', stroke: '#140d06' } },
  bois: { label: 'Bois', white: { fill: 'url(#skin-bois-clair)', stroke: '#5c3a1e' }, black: { fill: 'url(#skin-bois-fonce)', stroke: '#20130a' } },
  cristal: { label: 'Cristal', white: { fill: 'url(#skin-cristal-clair)', stroke: '#7fb8d6' }, black: { fill: 'url(#skin-cristal-fonce)', stroke: '#2c4a5c' } },
  dore: { label: 'Doré', white: { fill: 'url(#skin-or-clair)', stroke: '#8a6100' }, black: { fill: 'url(#skin-or-sombre)', stroke: '#2e2000' } },
  obsidienne: { label: 'Obsidienne', white: { fill: 'url(#skin-obsidienne-clair)', stroke: '#666666' }, black: { fill: '#0a0a0d', stroke: '#000000' } },
  minimaliste: { label: 'Minimaliste', white: { fill: '#ffffff', stroke: '#111827', strokeWidth: 3.2 }, black: { fill: '#111827', stroke: '#111827', strokeWidth: 3.2 } },
  fantasy: { label: 'Fantasy', white: { fill: 'url(#skin-fantasy-clair)', stroke: '#5b21b6' }, black: { fill: 'url(#skin-fantasy-fonce)', stroke: '#1e0a4d' } },
};

export const PIECE_SKIN_ORDER = ['classique', 'staunton', 'bois', 'cristal', 'dore', 'obsidienne', 'minimaliste', 'fantasy'];

/** Dégradés SVG utilisés par certains skins (injectés une seule fois dans <defs>). */
export const PIECE_SKIN_DEFS = `
  <linearGradient id="skin-bois-clair" x1="0" y1="0" x2="1" y2="1">
    <stop offset="0" stop-color="#f0d5a8"/><stop offset="1" stop-color="#c9985a"/>
  </linearGradient>
  <linearGradient id="skin-bois-fonce" x1="0" y1="0" x2="1" y2="1">
    <stop offset="0" stop-color="#7a4a26"/><stop offset="1" stop-color="#3c2412"/>
  </linearGradient>
  <linearGradient id="skin-cristal-clair" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="#ffffff" stop-opacity="0.95"/><stop offset="1" stop-color="#bfe3f5" stop-opacity="0.55"/>
  </linearGradient>
  <linearGradient id="skin-cristal-fonce" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="#6fa6c9" stop-opacity="0.9"/><stop offset="1" stop-color="#274257" stop-opacity="0.65"/>
  </linearGradient>
  <linearGradient id="skin-or-clair" x1="0" y1="0" x2="1" y2="1">
    <stop offset="0" stop-color="#fff3c4"/><stop offset="0.5" stop-color="#e8b93f"/><stop offset="1" stop-color="#b8860b"/>
  </linearGradient>
  <linearGradient id="skin-or-sombre" x1="0" y1="0" x2="1" y2="1">
    <stop offset="0" stop-color="#8a6100"/><stop offset="1" stop-color="#3a2900"/>
  </linearGradient>
  <linearGradient id="skin-obsidienne-clair" x1="0" y1="0" x2="1" y2="1">
    <stop offset="0" stop-color="#e6e6ee"/><stop offset="1" stop-color="#9b9bab"/>
  </linearGradient>
  <linearGradient id="skin-fantasy-clair" x1="0" y1="0" x2="1" y2="1">
    <stop offset="0" stop-color="#e9d5ff"/><stop offset="1" stop-color="#a78bfa"/>
  </linearGradient>
  <linearGradient id="skin-fantasy-fonce" x1="0" y1="0" x2="1" y2="1">
    <stop offset="0" stop-color="#4c1d95"/><stop offset="1" stop-color="#1e0a4d"/>
  </linearGradient>
`;
