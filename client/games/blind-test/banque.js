/**
 * Blind Texte — agrégateur des banques de manches.
 *
 * Chaque catégorie vit dans son fichier (facile à enrichir, y compris par des
 * coéquipiers : il suffit d'ajouter des entrées au même format). Ici, tout est
 * converti vers le FORMAT UNIFIÉ que consomme le moteur :
 *
 *   {
 *     categorie : 'chanson' | 'philo' | 'cinema',
 *     textes    : [1 à 3 textes, révélés du plus dur au plus facile],
 *     solutions : [{ label, alias: [] }, …]   // CHACUNE suffit à gagner la manche
 *     info      : petite ligne affichée à la révélation (année, œuvre…)
 *   }
 *
 * Pour ajouter une catégorie entière : créer banque-<nom>.js, l'importer ici,
 * la convertir, et l'ajouter à CATEGORIES.
 */

import { BANQUE_CHANSONS } from './banque-chansons.js';
import { BANQUE_PHILO } from './banque-philo.js';
import { BANQUE_CINEMA } from './banque-cinema.js';

export const CATEGORIES = {
  chanson: { label: '🎵 Chansons', consigne: 'Trouvez le titre OU l\'artiste' },
  philo: { label: '🧠 Philosophie', consigne: 'Trouvez le penseur' },
  cinema: { label: '🎬 Cinéma', consigne: 'Trouvez le film' },
};

function chansons() {
  return BANQUE_CHANSONS.map((c) => ({
    categorie: 'chanson',
    textes: c.indices,
    // Le titre OU l'artiste suffit — deux solutions distinctes, chacune gagnante.
    solutions: [
      { label: c.titre, alias: [] },
      { label: c.artiste, alias: c.alias ?? [] },
    ],
    info: String(c.annee),
  }));
}

function philo() {
  return BANQUE_PHILO.map((p) => ({
    categorie: 'philo',
    textes: p.textes,
    solutions: [{ label: p.auteur, alias: p.alias ?? [] }],
    info: p.info,
  }));
}

function cinema() {
  return BANQUE_CINEMA.map((f) => ({
    categorie: 'cinema',
    textes: f.textes,
    solutions: [{ label: f.film, alias: f.alias ?? [] }],
    info: f.info,
  }));
}

/** Toutes les manches de la banque intégrée, filtrées par catégories actives. */
export function manchesDeLaBanque(categoriesActives) {
  const tout = [...chansons(), ...philo(), ...cinema()];
  if (!categoriesActives || !categoriesActives.size) return tout;
  return tout.filter((m) => categoriesActives.has(m.categorie));
}
