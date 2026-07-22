/**
 * stockage.js — où le classement écrit son fichier de données.
 *
 * POURQUOI DEUX ADAPTATEURS. Sur le plan gratuit de Render, le système de
 * fichiers est ÉPHÉMÈRE : tout fichier écrit localement disparaît au prochain
 * redéploiement, et aussi au réveil après une mise en veille (le service
 * s'endort au bout de ~15 min sans trafic). Les disques persistants sont
 * réservés aux offres payantes. Pour garder un vrai fichier de données sans
 * changer d'offre, on l'écrit ailleurs : dans un GitHub Gist.
 *
 * CHOIX AUTOMATIQUE : si GIST_ID et GITHUB_TOKEN sont fournis → Gist ;
 * sinon → fichier local (parfait en développement, ou sur une offre avec
 * disque persistant).
 *
 * Les deux adaptateurs exposent la même interface :
 *   async lire()          → texte du fichier, ou null s'il n'existe pas
 *   async ecrire(texte)   → écrit le fichier
 *   get nom()             → libellé lisible pour les journaux
 */

import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { dirname } from 'node:path';

const GIST_API = 'https://api.github.com/gists';
const NOM_FICHIER_GIST = 'classement.json';
const TIMEOUT_MS = 10_000;

/* ------------------------------------------------------------------ */
/* Adaptateur 1 : fichier local                                        */
/* ------------------------------------------------------------------ */

export class StockageFichier {
  constructor(chemin) { this.chemin = chemin; }

  get nom() { return `fichier local (${this.chemin})`; }

  async lire() {
    try {
      return await readFile(this.chemin, 'utf8');
    } catch (err) {
      if (err.code === 'ENOENT') return null;   // première exécution
      throw err;
    }
  }

  async ecrire(texte) {
    await mkdir(dirname(this.chemin), { recursive: true });
    await writeFile(this.chemin, texte, 'utf8');
  }
}

/* ------------------------------------------------------------------ */
/* Adaptateur 2 : GitHub Gist (fichier distant, gratuit et durable)    */
/* ------------------------------------------------------------------ */

export class StockageGist {
  /**
   * @param {string} gistId identifiant du Gist (dans son URL)
   * @param {string} token  jeton GitHub avec la portée « gist »
   * @param {string} fichier nom du fichier à l'intérieur du Gist
   */
  constructor(gistId, token, fichier = NOM_FICHIER_GIST) {
    this.gistId = gistId;
    this.token = token;
    this.fichier = fichier;
  }

  get nom() { return `GitHub Gist ${this.gistId} (${this.fichier})`; }

  entetes() {
    return {
      Authorization: `Bearer ${this.token}`,
      Accept: 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
      'User-Agent': 'arcade-classement',
    };
  }

  async lire() {
    const rep = await fetch(`${GIST_API}/${this.gistId}`, {
      headers: this.entetes(),
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });
    if (rep.status === 404) return null;              // Gist absent : on repart de zéro
    if (!rep.ok) throw new Error(`Gist lecture ${rep.status} ${await rep.text()}`);
    const data = await rep.json();
    const f = data.files?.[this.fichier];
    if (!f) return null;
    // Au-delà de 1 Mo, GitHub tronque le contenu et fournit une URL brute.
    if (f.truncated && f.raw_url) {
      const brut = await fetch(f.raw_url, { signal: AbortSignal.timeout(TIMEOUT_MS) });
      if (!brut.ok) throw new Error(`Gist brut ${brut.status}`);
      return brut.text();
    }
    return f.content ?? null;
  }

  async ecrire(texte) {
    const rep = await fetch(`${GIST_API}/${this.gistId}`, {
      method: 'PATCH',
      headers: { ...this.entetes(), 'Content-Type': 'application/json' },
      body: JSON.stringify({ files: { [this.fichier]: { content: texte } } }),
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });
    if (!rep.ok) throw new Error(`Gist écriture ${rep.status} ${await rep.text()}`);
  }
}

/* ------------------------------------------------------------------ */
/* Fabrique : choisit l'adaptateur selon l'environnement               */
/* ------------------------------------------------------------------ */

export function creerStockage(env = process.env) {
  const gistId = env.GIST_ID;
  const token = env.GITHUB_TOKEN;
  if (gistId && token) {
    return new StockageGist(gistId, token, env.GIST_FICHIER || NOM_FICHIER_GIST);
  }
  return new StockageFichier(env.CLASSEMENT_FILE || './data/classement.json');
}
