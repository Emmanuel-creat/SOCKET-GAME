/**
 * Silhouettes SVG des pièces — un seul jeu de formes géométriques épurées, partagé par tous
 * les skins (voir themes.js) : seul le traitement de matière (fill/stroke/filtre) change.
 * viewBox logique : 0 0 100 100, pièce posée en bas, centrée en x=50.
 */

export const PIECE_PATHS = {
  P: `<ellipse cx="50" cy="30" rx="12" ry="12"/>
      <path d="M38,46 Q30,60 26,78 L74,78 Q70,60 62,46 Z"/>
      <rect x="20" y="78" width="60" height="8" rx="3"/>
      <rect x="14" y="86" width="72" height="8" rx="3"/>`,
  R: `<rect x="24" y="18" width="10" height="16"/>
      <rect x="45" y="18" width="10" height="16"/>
      <rect x="66" y="18" width="10" height="16"/>
      <rect x="22" y="32" width="56" height="10"/>
      <path d="M28,42 L72,42 L66,74 L34,74 Z"/>
      <rect x="20" y="74" width="60" height="8" rx="2"/>
      <rect x="14" y="86" width="72" height="8" rx="3"/>`,
  N: `<path d="M62,86 L62,68 Q62,54 50,47 L34,39 Q25,35 23,25 Q22,18 28,14 Q35,10 41,15 L39,23
         Q43,21 47,23 L59,31 Q71,37 75,50 L80,86 Z"/>
      <circle cx="30" cy="23" r="2.6" class="piece-eye"/>
      <rect x="16" y="86" width="68" height="8" rx="3"/>`,
  B: `<circle cx="50" cy="17" r="5.5"/>
      <path d="M50,25 Q33,33 31,52 Q30,64 40,72 Q29,76 25,84 L75,84 Q71,76 60,72 Q70,64 69,52 Q67,33 50,25 Z"/>
      <path d="M42,49 L58,49 M50,41 L50,57" class="piece-slit" stroke-width="3" stroke-linecap="round"/>
      <rect x="17" y="84" width="66" height="8" rx="3"/>`,
  Q: `<circle cx="24" cy="24" r="5"/><circle cx="50" cy="13" r="5.8"/><circle cx="76" cy="24" r="5"/>
      <circle cx="37" cy="26" r="4.2"/><circle cx="63" cy="26" r="4.2"/>
      <path d="M23,31 L77,31 L70,58 Q77,64 75,72 Q66,79 50,79 Q34,79 25,72 Q23,64 30,58 Z"/>
      <rect x="19" y="79" width="62" height="8" rx="3"/>
      <rect x="13" y="87" width="74" height="7" rx="2"/>`,
  K: `<path d="M50,4 L50,20 M42,12 L58,12" stroke-width="5.5" stroke-linecap="round" class="piece-cross"/>
      <circle cx="50" cy="27" r="5.2"/>
      <path d="M25,36 L75,36 L68,60 Q77,66 75,74 Q65,80 50,80 Q35,80 25,74 Q23,66 32,60 Z"/>
      <rect x="19" y="80" width="62" height="8" rx="3"/>
      <rect x="13" y="88" width="74" height="7" rx="2"/>`,
};

export const PIECE_LABELS = { K: 'Roi', Q: 'Dame', R: 'Tour', B: 'Fou', N: 'Cavalier', P: 'Pion' };

/** Construit le markup interne (sans le <svg> englobant) pour une pièce+skin donnés. */
export function pieceInnerSVG(type) {
  return PIECE_PATHS[type] ?? '';
}
