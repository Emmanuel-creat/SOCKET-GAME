/**
 * ReconnexionGrace — la déconnexion n'est plus une exclusion.
 *
 * LE PROBLÈME QU'IL RÉSOUT, mesuré sur le pipeline des commandes : chaque connexion
 * recevait une identité neuve (`randomUUID` à chaque register), et un salon en partie
 * n'acceptait plus personne. Un simple rafraîchissement de page — le geste le plus
 * banal du monde — donnait donc : nouvel identifiant, exclusion du salon, re-join
 * refusé (« n'accepte plus de joueurs »), et un moteur de jeu chez le Host qui ne
 * connaît que les joueurs du lancement. Résultat : 100 % des commandes du revenant
 * jetées, en silence. C'était ça, « mes déplacements n'arrivent jamais au serveur ».
 *
 * LE PRINCIPE : le client porte une identité STABLE (`cid`, générée une fois et
 * gardée en localStorage). Quand un joueur en partie se déconnecte, on ne le retire
 * pas : on le met « en grâce » pendant GRACE_MS. S'il revient avec le même cid, il
 * récupère SON utilisateur — même `user.id`, même place dans le salon — et la partie
 * lui est renvoyée. L'engine du Host le reconnaît puisque c'est le même identifiant :
 * ses commandes repartent comme si de rien n'était.
 *
 * S'il ne revient pas à temps : retrait réel. Et si c'était le HOST — l'autorité de
 * la partie, dont l'état vivait dans son navigateur — la partie est terminée
 * PROPREMENT pour tout le monde, avec une annonce. Fini les parties zombies où les
 * invités commandent dans le vide.
 */

export const GRACE_MS = Number(process.env.GRACE_MS || 45_000);

export class ReconnexionGrace {
  constructor() {
    /** @type {Map<string, {user: object, roomId: string, etaitHost: boolean, timer: any}>} clé = cid */
    this.parCid = new Map();
    /** @type {Map<string, string>} userId -> cid (pour savoir si un destinataire est simplement absent) */
    this.parUserId = new Map();
  }

  /**
   * Place un joueur en grâce au lieu de le retirer.
   * @param {object} user  L'utilisateur (détaché de sa socket morte).
   * @param {object} room  Son salon, en partie.
   * @param {(user: object, etaitHost: boolean) => void} surExpiration  Retrait réel si personne ne revient.
   */
  differer(user, room, surExpiration) {
    if (!user?.cid) return false;                    // pas d'identité stable : comportement d'avant
    this.annuler(user.cid);                          // une seule grâce par identité
    const etaitHost = room.hostId === user.id;
    const timer = setTimeout(() => {
      this.parCid.delete(user.cid);
      this.parUserId.delete(user.id);
      surExpiration(user, etaitHost);
    }, GRACE_MS);
    this.parCid.set(user.cid, { user, roomId: room.id, etaitHost, timer });
    this.parUserId.set(user.id, user.cid);
    return true;
  }

  /** Le joueur revient : rend son utilisateur et annule l'expiration. */
  reprendre(cid) {
    const e = this.parCid.get(cid);
    if (!e) return null;
    clearTimeout(e.timer);
    this.parCid.delete(cid);
    this.parUserId.delete(e.user.id);
    return e;
  }

  /** Ce destinataire est-il simplement absent (en grâce) ? Un message vers lui n'est
   *  pas une erreur : il se perd normalement, il recevra un état complet au retour. */
  enGrace(userId) { return this.parUserId.has(userId); }

  aUneReprise(cid) { return this.parCid.has(cid); }

  annuler(cid) {
    const e = this.parCid.get(cid);
    if (!e) return;
    clearTimeout(e.timer);
    this.parCid.delete(cid);
    this.parUserId.delete(e.user.id);
  }
}
