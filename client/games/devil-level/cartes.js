/**
 * Devil Level — cartes en matrice de symboles.
 *
 * Une carte est un simple tableau de chaînes : un caractère = une tuile de 40
 * unités. On écrit le niveau à la main, le moteur le lit et l'applique.
 *
 * La légende reprend les symboles du prototype Python de Manu (`#`, `=`, `^`,
 * `K`, `O`, `|`, `Z`, `B`, `M`, `V`, `D`, `P`, `b`, `i`, `c`, `x`, `t`, `g`,
 * `s`, `l`, `o`, `w`, `r`…) et y ajoute ce que Devil Level apporte en propre :
 * scies, lasers, écraseurs, lave et bonus numérotés.
 *
 * ⚠️ Conventions d'écriture, à connaître avant de composer une carte :
 *
 *   - la PREMIÈRE ligne du tableau est le HAUT du niveau, la dernière le bas ;
 *   - les lignes n'ont pas besoin d'être de même longueur : elles sont
 *     complétées par du vide à droite ;
 *   - l'espace et le point valent « vide » — le point aide à compter ;
 *   - `P` (départ) et `D` (sortie) sont OBLIGATOIRES, sinon la carte est
 *     refusée avec un message clair plutôt que de casser en pleine partie.
 */

export const TUILE = 40;

/*
 * Table des symboles. Chaque entrée décrit ce que la tuile EST, et le moteur
 * s'appuie sur ces drapeaux — aucune liste de `if` à rallonge ailleurs dans le
 * code. Ajouter un bloc, c'est ajouter une ligne ici.
 *
 *   solide      : bloque dans toutes les directions
 *   plateforme  : ne bloque que par le dessus (on la traverse en sautant)
 *   mortel      : tue au contact, avec la cause indiquée
 *   demi        : n'occupe que la moitié basse de la tuile
 */
export const LEGENDE = Object.freeze({
  // ----- terrain -----
  '#': { nom: 'bloc', solide: true },
  '=': { nom: 'plateforme', plateforme: true, demi: true },
  'Z': { nom: 'plateforme fuyante', plateforme: true, demi: true, fuyante: true },
  'r': { nom: 'faux sol', solide: true, fauxSol: true },
  'b': { nom: 'bloc cassable', solide: true, cassable: true },
  'i': { nom: 'bloc invisible', solide: true, invisible: true },
  'c': { nom: 'glace', solide: true, glace: true },
  's': { nom: 'bloc collant', solide: true, collant: true },
  'o': { nom: 'bloc mou', solide: true, mou: true },
  'w': { nom: 'bloc temporisé', solide: true, temporise: true },
  'B': { nom: 'trampoline', solide: true, rebond: true },
  'M': { nom: 'plateforme mobile', plateforme: true, demi: true, mobile: 'x' },
  'V': { nom: 'plateforme mobile', plateforme: true, demi: true, mobile: 'y' },
  'l': { nom: 'échelle', echelle: true },

  // ----- dangers (toujours rendus en noir) -----
  '^': { nom: 'pics', mortel: 'pics', demi: true },
  '*': { nom: 'scie', mortel: 'scie', mobile: 'x', amplitude: 2 },
  '!': { nom: 'laser', mortel: 'laser', cyclique: true },
  'T': { nom: 'écraseur', mortel: 'ecraseur', ecraseur: true },
  '~': { nom: 'lave', mortel: 'lave' },
  'x': { nom: 'bloc explosif', solide: true, explosif: true },

  // ----- sabotage -----
  'O': { nom: 'plaque', plaque: true, demi: true },
  '|': { nom: 'bloc armé', blocArme: true },

  // ----- progression -----
  'P': { nom: 'départ', depart: true },
  'K': { nom: 'checkpoint', checkpoint: true },
  'D': { nom: 'sortie', sortie: true },
  't': { nom: 'téléporteur', teleporteur: true },
  'g': { nom: 'inversion de gravité', gravite: true },

  // ----- bonus -----
  'C': { nom: 'bonus', bonus: 'aleatoire' },
  '1': { nom: 'dash', bonus: 'dash' },
  '2': { nom: 'double saut', bonus: 'doubleSaut' },
  '3': { nom: 'bouclier', bonus: 'bouclier' },
  '4': { nom: 'ghost', bonus: 'ghost' },
  '5': { nom: 'vitesse', bonus: 'vitesse' },
  '6': { nom: 'gel', bonus: 'gel' },
  '7': { nom: 'tornade', bonus: 'tornade' },
  '8': { nom: 'bombe', bonus: 'bombe' },
  // Alias hérités du prototype Python, pour que les cartes déjà écrites
  // continuent de fonctionner sans réécriture.
  'W': { nom: 'double saut', bonus: 'doubleSaut' },
  'S': { nom: 'ghost', bonus: 'ghost' },
  'H': { nom: 'bouclier', bonus: 'bouclier' },
  'Q': { nom: 'bombe', bonus: 'bombe' },
});

/** Symboles considérés comme vides. */
const VIDES = new Set([' ', '.', '']);

/**
 * Lit une matrice de symboles et en produit un niveau exploitable.
 *
 * Renvoie `{ ok: false, erreur }` plutôt que de lever : une carte mal écrite
 * doit donner un message compréhensible à celui qui l'écrit, pas une pile
 * d'appels.
 */
export function lireCarte(carte) {
  const grille = Array.isArray(carte?.grille) ? carte.grille : null;
  if (!grille || grille.length === 0) return { ok: false, erreur: 'Carte vide.' };

  const hauteur = grille.length;
  const largeur = Math.max(...grille.map((l) => l.length));

  const tuiles = [];        // { x, y, ch, def } en coordonnées de grille
  const inconnus = new Set();
  let depart = null;
  let sortie = null;
  const checkpoints = [];
  const bonus = [];
  const teleporteurs = [];

  for (let ly = 0; ly < hauteur; ly += 1) {
    const ligne = grille[ly] ?? '';
    for (let lx = 0; lx < largeur; lx += 1) {
      const ch = ligne[lx] ?? ' ';
      if (VIDES.has(ch)) continue;
      const def = LEGENDE[ch];
      if (!def) { inconnus.add(ch); continue; }

      if (def.depart) { depart = { lx, ly }; continue; }
      if (def.sortie) { sortie = { lx, ly }; continue; }
      if (def.checkpoint) { checkpoints.push({ id: `k${lx}-${ly}`, lx, ly }); continue; }
      if (def.bonus) { bonus.push({ id: `c${lx}-${ly}`, lx, ly, type: def.bonus }); continue; }
      if (def.teleporteur) teleporteurs.push({ id: `t${lx}-${ly}`, lx, ly });

      tuiles.push({ x: lx, y: ly, ch, def });
    }
  }

  if (inconnus.size) {
    return { ok: false, erreur: `Symbole${inconnus.size > 1 ? 's' : ''} inconnu${inconnus.size > 1 ? 's' : ''} : ${[...inconnus].map((c) => `« ${c} »`).join(', ')}` };
  }
  if (!depart) return { ok: false, erreur: 'Il manque le départ « P ».' };
  if (!sortie) return { ok: false, erreur: 'Il manque la sortie « D ».' };

  /*
   * Les téléporteurs se relient DEUX PAR DEUX, dans l'ordre de lecture — même
   * principe que le prototype Python. Un téléporteur seul ne mène nulle part :
   * on le signale plutôt que de le laisser silencieusement inerte.
   */
  if (teleporteurs.length % 2 !== 0) {
    return { ok: false, erreur: 'Les téléporteurs « t » vont par paires : il y en a un de trop.' };
  }
  const paires = new Map();
  for (let i = 0; i < teleporteurs.length; i += 2) {
    const a = teleporteurs[i]; const b = teleporteurs[i + 1];
    paires.set(`${a.lx},${a.ly}`, { lx: b.lx, ly: b.ly });
    paires.set(`${b.lx},${b.ly}`, { lx: a.lx, ly: a.ly });
  }

  return {
    ok: true,
    niveau: {
      nom: carte.nom ?? 'Sans titre',
      theme: carte.theme ?? 'prairie',
      grille, largeur, hauteur, tuiles,
      depart, sortie, checkpoints, bonus,
      teleporteurs: paires,
      longueurTotale: largeur * TUILE,
    },
  };
}

/** Contrôle rapide d'une carte, pour l'éditeur : message court et lisible. */
export function verifierCarte(carte) {
  const r = lireCarte(carte);
  if (!r.ok) return r;
  const n = r.niveau;
  const avertissements = [];
  if (n.checkpoints.length === 0) avertissements.push('Aucun checkpoint « K » : une seule erreur renverra au départ.');
  if (n.bonus.length === 0) avertissements.push('Aucun bonus sur la carte.');
  if (n.largeur < 20) avertissements.push('Carte très courte (moins de 20 colonnes).');
  return { ok: true, niveau: n, avertissements };
}

/* ============================== catalogue ==============================

 * Les cartes ne vivent plus dans le code : elles sont écrites dans
 * `assets/cartes.txt`, une ressource que l'on édite sans rien recompiler.
 * Le moteur y pioche PAR NOM.
 *
 * Format, volontairement minimal pour rester agréable à écrire à la main :
 *
 *     [Nathan's room]         ← démarre une carte ; le nom est la clé
 *     @theme glacier          ← métadonnée facultative
 *     (la matrice, jusqu'à la carte suivante)
 *
 * Une ligne commençant par « ; » est un commentaire. Ni « # » ni « = » ne
 * peuvent servir de marqueur : ce sont des BLOCS dans la légende, et une
 * rangée de terrain serait prise pour un titre.
 */

// ⚠️ Le marqueur de carte doit être un caractère ABSENT de la légende, sinon
// une rangée de terrain le déclencherait. Premier essai avec « ## » : les
// lignes de murs commencent justement par « ## » et étaient prises pour des
// titres de carte — six niveaux sur sept en morceaux. « [ » n'appartient à
// aucun bloc, la confusion est donc impossible.
export const MARQUEUR_CARTE = '[';
export const MARQUEUR_META = '@';
export const MARQUEUR_COMMENTAIRE = ';';

/**
 * Lit le catalogue et renvoie toutes les cartes qu'il contient.
 *
 * Une carte fautive n'interrompt PAS la lecture : elle est écartée et
 * signalée. Une coquille dans un niveau ne doit pas rendre tous les autres
 * injouables.
 */
export function analyserCatalogue(texte) {
  const lignes = String(texte ?? '').replace(/\r/g, '').split('\n');
  const brutes = [];
  let courante = null;

  for (const ligne of lignes) {
    const nu = ligne.trimStart();

    if (nu.startsWith(MARQUEUR_CARTE)) {
      if (courante) brutes.push(courante);
      const nom = nu.replace(/^\[/, '').replace(/\]\s*$/, '').trim();
      courante = { nom, theme: 'prairie', auteur: null, grille: [] };
      continue;
    }
    if (!courante) continue;                      // en-tête du fichier
    if (nu.startsWith(MARQUEUR_COMMENTAIRE)) continue;

    if (nu.startsWith(MARQUEUR_META)) {
      const [cle, ...reste] = nu.slice(1).split(/\s+/);
      const valeur = reste.join(' ').trim();
      if (cle === 'theme') courante.theme = valeur || 'prairie';
      else if (cle === 'auteur') courante.auteur = valeur || null;
      continue;
    }
    // Tout le reste appartient à la matrice — y compris les lignes vides, qui
    // sont des rangées d'air.
    courante.grille.push(ligne);
  }
  if (courante) brutes.push(courante);

  const cartes = [];
  const erreurs = [];
  const vus = new Set();

  for (const b of brutes) {
    // On ne retire les lignes vides qu'aux EXTRÉMITÉS : celles du milieu font
    // partie du niveau.
    const grille = [...b.grille];
    while (grille.length && grille[0].trim() === '') grille.shift();
    while (grille.length && grille[grille.length - 1].trim() === '') grille.pop();

    if (!b.nom) { erreurs.push('Une carte sans nom a été ignorée.'); continue; }
    if (vus.has(b.nom.toLowerCase())) {
      erreurs.push(`« ${b.nom} » : ce nom est utilisé deux fois, la seconde est ignorée.`);
      continue;
    }
    if (!grille.length) { erreurs.push(`« ${b.nom} » : matrice vide.`); continue; }

    const carte = { id: identifiant(b.nom), nom: b.nom, theme: b.theme, auteur: b.auteur, grille };
    const v = lireCarte(carte);
    if (!v.ok) { erreurs.push(`« ${b.nom} » : ${v.erreur}`); continue; }

    vus.add(b.nom.toLowerCase());
    cartes.push(carte);
  }
  return { cartes, erreurs };
}

/** Identifiant technique dérivé du nom (« Nathan's room » → « nathan-s-room »). */
export function identifiant(nom) {
  return String(nom)
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    // Les apostrophes sont RETIRÉES, pas transformées en séparateur : sinon
    // « Nathan's room » et « nathans room » donneraient deux clés différentes
    // et la recherche tolérante ne trouverait rien.
    .replace(/['\u2019]/g, '')
    .toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'carte';
}

/**
 * Retrouve une carte par son NOM, tel qu'écrit dans le fichier.
 * La comparaison ignore la casse, les accents et la ponctuation : chercher
 * « nathans room » trouve « Nathan's room ».
 */
export function carteParNom(cartes, nom) {
  if (!Array.isArray(cartes) || !nom) return null;
  const cle = identifiant(nom);
  return cartes.find((c) => c.nom === nom)
    ?? cartes.find((c) => identifiant(c.nom) === cle)
    ?? null;
}

/**
 * Charge le catalogue depuis la ressource. Utilisé par l'interface ; le moteur
 * reste pur et reçoit les cartes déjà lues.
 */
export async function chargerCatalogue(chemin = '/games/devil-level/assets/cartes.txt') {
  const reponse = await fetch(chemin, { cache: 'no-store' });
  if (!reponse.ok) throw new Error(`Catalogue introuvable (${reponse.status}).`);
  return analyserCatalogue(await reponse.text());
}

/**
 * Carte de secours, embarquée dans le code.
 *
 * Elle sert UNIQUEMENT si le catalogue ne peut pas être chargé — fichier
 * absent, réseau coupé. Mieux vaut un niveau jouable et un message clair
 * qu'un écran mort.
 */
export const CARTE_SECOURS = {
  id: 'secours', nom: 'Carte de secours', theme: 'prairie', auteur: null,
  grille: [
    '                                                    ',
    '            3                       C               ',
    '       ===        ====        ===          ====     ',
    '   P        K                        K            D ',
    '######   ######   #####   ######   ######   #########',
    '######^^^######^^^#####^^^######^^^######^^^#########',
  ],
};
