/**
 * Constantes partagées entre le client et le serveur.
 * Source de vérité unique : ne jamais dupliquer ces valeurs ailleurs.
 */

/** Statuts possibles d'un joueur. */
export const USER_STATUS = Object.freeze({
  ONLINE: 'connecte',
  AWAY: 'absent',
  IN_ROOM: 'dans-un-salon',
  IN_GAME: 'en-jeu',
});

/** Statuts possibles d'un salon. */
export const ROOM_STATUS = Object.freeze({
  OPEN: 'ouvert',
  IN_GAME: 'en-jeu',
  CLOSED: 'ferme',
});

/** États possibles d'un jeu dans le catalogue. */
export const GAME_STATE = Object.freeze({
  AVAILABLE: 'disponible',
  IN_DEVELOPMENT: 'en-developpement',
  MAINTENANCE: 'maintenance',
});

/** Libellés d'affichage (français) pour l'interface. */
export const LABELS = Object.freeze({
  userStatus: {
    [USER_STATUS.ONLINE]: 'Connecté',
    [USER_STATUS.AWAY]: 'Absent',
    [USER_STATUS.IN_ROOM]: 'Dans un salon',
    [USER_STATUS.IN_GAME]: 'En jeu',
  },
  roomStatus: {
    [ROOM_STATUS.OPEN]: 'Ouvert',
    [ROOM_STATUS.IN_GAME]: 'En jeu',
    [ROOM_STATUS.CLOSED]: 'Fermé',
  },
  gameState: {
    [GAME_STATE.AVAILABLE]: 'Disponible',
    [GAME_STATE.IN_DEVELOPMENT]: 'En développement',
    [GAME_STATE.MAINTENANCE]: 'Maintenance',
  },
});

/** Limites globales de la plateforme. */
export const LIMITS = Object.freeze({
  PSEUDO_MIN: 2,
  PSEUDO_MAX: 20,
  ROOM_NAME_MIN: 3,
  ROOM_NAME_MAX: 30,
  ROOM_CODE_LENGTH: 6,
  ROOM_PLAYERS_MIN: 2,
  ROOM_PLAYERS_MAX: 16,
  CHAT_MESSAGE_MAX: 300,
  CHAT_HISTORY_MAX: 100,
});

/** Alphabet utilisé pour générer les codes de salon (sans caractères ambigus). */
export const ROOM_CODE_ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
