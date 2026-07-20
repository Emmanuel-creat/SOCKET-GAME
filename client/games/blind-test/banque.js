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
import { BANQUE_SERIES } from './banque-series.js';
import { BANQUE_JEUXVIDEO } from './banque-jeuxvideo.js';
import { BANQUE_HISTOIRE } from './banque-histoire.js';
import { BANQUE_SCIENCE } from './banque-science.js';
import { BANQUE_SPORT } from './banque-sport.js';
import { BANQUE_GEO } from './banque-geo.js';
import { BANQUE_LITTERATURE } from './banque-litterature.js';
import { BANQUE_MYTHOLOGIE } from './banque-mythologie.js';

export const CATEGORIES = {
  chanson: { label: '🎵 Chansons', consigne: 'Trouvez le titre OU l\'artiste' },
  philo: { label: '🧠 Philosophie', consigne: 'Trouvez le penseur' },
  cinema: { label: '🎬 Cinéma', consigne: 'Trouvez le film' },
  series: { label: '📺 Séries', consigne: 'Trouvez la série' },
  jeuxvideo: { label: '🎮 Jeux vidéo', consigne: 'Trouvez le jeu' },
  histoire: { label: '📜 Histoire', consigne: 'Trouvez l\'événement ou le personnage' },
  science: { label: '🔬 Science', consigne: 'Trouvez la découverte ou le savant' },
  sport: { label: '🏅 Sport', consigne: 'Trouvez l\'exploit, l\'athlète ou la compétition' },
  geo: { label: '🌍 Géographie', consigne: 'Trouvez le lieu, le pays ou le monument' },
  litterature: { label: '📖 Littérature', consigne: 'Trouvez l\'œuvre ou l\'auteur' },
  mythologie: { label: '⚡ Mythologie', consigne: 'Trouvez la divinité, le héros ou le mythe' },
};

/**
 * Fabrique générique : toutes les banques suivent la même forme
 * { <champ réponse>, alias[], info, textes[] } — une seule fonction suffit.
 */
function convertir(banque, categorie, champ) {
  return banque.map((e) => ({
    categorie,
    textes: e.textes,
    solutions: [{ label: e[champ], alias: e.alias ?? [] }],
    info: e.info ?? '',
  }));
}

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



/** Toutes les manches de la banque intégrée, filtrées par catégories actives. */
export function manchesDeLaBanque(categoriesActives) {
  const tout = [
    ...chansons(),
    ...convertir(BANQUE_PHILO, 'philo', 'auteur'),
    ...convertir(BANQUE_CINEMA, 'cinema', 'film'),
    ...convertir(BANQUE_SERIES, 'series', 'serie'),
    ...convertir(BANQUE_JEUXVIDEO, 'jeuxvideo', 'jeu'),
    ...convertir(BANQUE_HISTOIRE, 'histoire', 'reponse'),
    ...convertir(BANQUE_SCIENCE, 'science', 'reponse'),
    ...convertir(BANQUE_SPORT, 'sport', 'reponse'),
    ...convertir(BANQUE_GEO, 'geo', 'reponse'),
    ...convertir(BANQUE_LITTERATURE, 'litterature', 'reponse'),
    ...convertir(BANQUE_MYTHOLOGIE, 'mythologie', 'reponse'),
  ];
  if (!categoriesActives || !categoriesActives.size) return tout;
  return tout.filter((m) => categoriesActives.has(m.categorie));
}
