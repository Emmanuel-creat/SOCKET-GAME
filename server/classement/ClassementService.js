/**
 * ClassementService.js — classement général des joueurs, tous jeux confondus.
 *
 * IDENTITÉ D'UN JOUEUR : le couple (adresse IP publique, cid navigateur).
 *  - l'IP empêche de repartir de zéro en changeant simplement de pseudo ;
 *  - le cid (identifiant stable stocké par le navigateur, déjà utilisé pour la
 *    reconnexion) distingue plusieurs personnes derrière la même box.
 * Le PSEUDO affiché est le dernier utilisé par cette identité : on change de
 * nom quand on veut, le palmarès suit.
 *
 * COMPTAGE : une victoire par joueur du camp gagnant (jeux en équipe comme
 * Loup-Garou ou La Traque), une victoire pour le premier au score (jeux
 * individuels). C'est le module de jeu qui désigne les gagnants dans le
 * résultat de fin de partie.
 *
 * PERSISTANCE : un simple fichier JSON, écrit de façon différée (au plus une
 * écriture toutes les 2 s) pour ne pas solliciter le disque à chaque partie.
 *
 * ⚠️ LIMITE ASSUMÉE : le résultat de fin de partie est produit par le Host de
 * la partie (architecture host-autoritaire). Le classement est donc aussi
 * fiable que le Host — l'IP empêche le blanchiment par changement de pseudo,
 * elle n'empêche pas un Host malveillant de déclarer un faux résultat.
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { dirname } from 'node:path';

const SAVE_DEBOUNCE_MS = 2000;
const MAX_ENTREES = 5000;          // garde-fou mémoire
const PSEUDO_MAX = 32;

/** Normalise une adresse IP (IPv6 mappée, proxy Render, valeur absente). */
export function normaliserIp(brut) {
  let ip = String(brut ?? '').trim();
  if (!ip) return 'inconnue';
  // Derrière un proxy (Render, Cloudflare…), x-forwarded-for peut contenir une
  // liste : « client, proxy1, proxy2 » — le client est le premier.
  if (ip.includes(',')) ip = ip.split(',')[0].trim();
  // IPv4 encapsulée en IPv6 : ::ffff:203.0.113.7
  if (ip.startsWith('::ffff:')) ip = ip.slice(7);
  return ip || 'inconnue';
}

/** Extrait l'IP d'un socket Socket.IO, en tenant compte du proxy. */
export function ipDeSocket(socket) {
  const head = socket?.handshake?.headers ?? {};
  return normaliserIp(head['x-forwarded-for'] || socket?.handshake?.address);
}

/** Clé d'identité : IP + cid. Sans cid, l'IP seule sert de repli. */
export function cleIdentite(ip, cid) {
  const i = normaliserIp(ip);
  const c = typeof cid === 'string' && cid ? cid.slice(0, 64) : '-';
  return `${i}|${c}`;
}

export class ClassementService {
  /** @param {string} fichier chemin du JSON de persistance */
  constructor(fichier) {
    this.fichier = fichier;
    /** @type {Map<string, {pseudo:string, victoires:number, parties:number, parJeu:Object, maj:number}>} */
    this.entrees = new Map();
    this._timer = null;
    this.charger();
  }

  charger() {
    try {
      if (!existsSync(this.fichier)) return;
      const brut = JSON.parse(readFileSync(this.fichier, 'utf8'));
      for (const [cle, val] of Object.entries(brut.entrees ?? {})) {
        this.entrees.set(cle, {
          pseudo: String(val.pseudo ?? '?').slice(0, PSEUDO_MAX),
          victoires: Number(val.victoires) || 0,
          parties: Number(val.parties) || 0,
          parJeu: val.parJeu && typeof val.parJeu === 'object' ? val.parJeu : {},
          maj: Number(val.maj) || 0,
        });
      }
    } catch {
      // Fichier illisible ou corrompu : on repart d'un classement vide plutôt
      // que d'empêcher le serveur de démarrer.
      this.entrees = new Map();
    }
  }

  /** Écriture différée : au plus une par SAVE_DEBOUNCE_MS. */
  planifierSauvegarde() {
    if (this._timer) return;
    this._timer = setTimeout(() => {
      this._timer = null;
      this.sauvegarder();
    }, SAVE_DEBOUNCE_MS);
    if (this._timer.unref) this._timer.unref();
  }

  sauvegarder() {
    try {
      mkdirSync(dirname(this.fichier), { recursive: true });
      const entrees = {};
      for (const [cle, val] of this.entrees) entrees[cle] = val;
      writeFileSync(this.fichier, JSON.stringify({ version: 1, entrees }), 'utf8');
    } catch {
      // Disque indisponible (Render Free au redémarrage) : le classement reste
      // en mémoire, on ne casse pas la partie en cours pour autant.
    }
  }

  /** Purge les entrées les plus anciennes si l'on dépasse le garde-fou. */
  elaguer() {
    if (this.entrees.size <= MAX_ENTREES) return;
    const tri = [...this.entrees.entries()].sort((a, b) => a[1].maj - b[1].maj);
    const aSupprimer = this.entrees.size - MAX_ENTREES;
    for (let i = 0; i < aSupprimer; i += 1) this.entrees.delete(tri[i][0]);
  }

  entree(cle) {
    let e = this.entrees.get(cle);
    if (!e) {
      e = { pseudo: '?', victoires: 0, parties: 0, parJeu: {}, maj: 0 };
      this.entrees.set(cle, e);
    }
    return e;
  }

  /**
   * Enregistre la fin d'une partie.
   * @param {{cle:string, pseudo:string, gagnant:boolean}[]} participants
   * @param {string} jeuId identifiant du jeu (pour le détail par jeu)
   */
  enregistrerPartie(participants, jeuId = 'inconnu') {
    for (const p of participants) {
      if (!p?.cle) continue;
      const e = this.entree(p.cle);
      // Le pseudo affiché est TOUJOURS le dernier utilisé par cette identité.
      if (p.pseudo) e.pseudo = String(p.pseudo).slice(0, PSEUDO_MAX);
      e.parties += 1;
      if (p.gagnant) {
        e.victoires += 1;
        e.parJeu[jeuId] = (e.parJeu[jeuId] || 0) + 1;
      }
      e.maj = Date.now();
    }
    this.elaguer();
    this.planifierSauvegarde();
  }

  /** Classement trié : victoires décroissantes, puis ratio, puis parties. */
  top(limite = 50) {
    return [...this.entrees.values()]
      .filter((e) => e.parties > 0)
      .sort((a, b) => (b.victoires - a.victoires)
        || ((b.victoires / b.parties) - (a.victoires / a.parties))
        || (b.parties - a.parties))
      .slice(0, Math.max(1, Math.min(200, limite)))
      .map((e, i) => ({
        rang: i + 1,
        pseudo: e.pseudo,
        victoires: e.victoires,
        parties: e.parties,
        ratio: e.parties ? Math.round((e.victoires / e.parties) * 100) : 0,
        parJeu: e.parJeu,
      }));
  }

  /** Statistiques d'une identité précise (pour afficher « votre rang »). */
  pour(cle) {
    const e = this.entrees.get(cle);
    if (!e || !e.parties) return null;
    const tous = this.top(200);
    const trouve = tous.find((t) => t.pseudo === e.pseudo && t.victoires === e.victoires);
    return {
      pseudo: e.pseudo,
      victoires: e.victoires,
      parties: e.parties,
      ratio: e.parties ? Math.round((e.victoires / e.parties) * 100) : 0,
      rang: trouve ? trouve.rang : null,
      parJeu: e.parJeu,
    };
  }
}
