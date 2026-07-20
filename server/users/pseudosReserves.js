/**
 * pseudosReserves.js — liste de pseudos non attribuables, appliquée côté SERVEUR.
 *
 * Usage : réserver des noms (impersonation, comptes d'équipe, personnes à ne pas
 * laisser s'identifier sous un nom donné). La vérification tolère les variantes
 * d'écriture : accents, majuscules, séparateurs, lettres répétées et
 * substitutions chiffres/lettres (y0an, Yoaan, s.a.y.o…).
 *
 * Configuration : variable d'environnement PSEUDOS_RESERVES, noms séparés par
 * des virgules. Exemple sur Render : PSEUDOS_RESERVES=exemple1,exemple2
 * Sans la variable, aucun pseudo n'est réservé.
 *
 * Le refus est volontairement NEUTRE (« pseudo non disponible ») : le serveur
 * n'a pas à commenter qui tente de s'inscrire, seulement à refuser proprement.
 */

const SUBSTITUTIONS = { 0: 'o', 1: 'i', 3: 'e', 4: 'a', 5: 's', 7: 't', '@': 'a', $: 's' };

/** Réduit un pseudo à une forme canonique comparable. */
export function canonique(pseudo) {
  let s = String(pseudo ?? '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')   // accents
    .toLowerCase();
  s = s.replace(/[0134557@$]/g, (c) => SUBSTITUTIONS[c] ?? c); // l33t courant
  s = s.replace(/[^a-z]/g, '');        // séparateurs, chiffres restants, emojis
  s = s.replace(/(.)\1+/g, '$1');      // lettres répétées : yoaan -> yoan
  return s;
}

const RESERVES = new Set(
  (process.env.PSEUDOS_RESERVES ?? '')
    .split(',')
    .map((p) => canonique(p))
    .filter((p) => p.length >= 3),
);

/** true si le pseudo (sous n'importe quelle variante) est réservé. */
export function pseudoReserve(pseudo) {
  if (!RESERVES.size) return false;
  return RESERVES.has(canonique(pseudo));
}
