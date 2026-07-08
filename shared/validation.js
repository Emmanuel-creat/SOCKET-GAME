/**
 * Fonctions de validation partagées client/serveur.
 * Le serveur reste l'autorité : le client les utilise seulement
 * pour un retour immédiat à l'utilisateur.
 */
import { LIMITS, USER_STATUS } from './constants.js';

/** Nettoie une chaîne utilisateur (trim + espaces multiples). */
export function sanitizeText(value) {
  return String(value ?? '').replace(/\s+/g, ' ').trim();
}

/** @returns {boolean} vrai si le pseudo est acceptable. */
export function isValidPseudo(pseudo) {
  const p = sanitizeText(pseudo);
  return p.length >= LIMITS.PSEUDO_MIN && p.length <= LIMITS.PSEUDO_MAX;
}

/** @returns {boolean} vrai si le nom de salon est acceptable. */
export function isValidRoomName(name) {
  const n = sanitizeText(name);
  return n.length >= LIMITS.ROOM_NAME_MIN && n.length <= LIMITS.ROOM_NAME_MAX;
}

/** @returns {boolean} vrai si le code de salon a le bon format. */
export function isValidRoomCode(code) {
  return new RegExp(`^[A-Z0-9]{${LIMITS.ROOM_CODE_LENGTH}}$`).test(String(code ?? '').toUpperCase());
}

/** @returns {boolean} vrai si la capacité demandée est dans les bornes. */
export function isValidMaxPlayers(n) {
  return Number.isInteger(n) && n >= LIMITS.ROOM_PLAYERS_MIN && n <= LIMITS.ROOM_PLAYERS_MAX;
}

/** @returns {boolean} vrai si le statut joueur existe. */
export function isValidUserStatus(status) {
  return Object.values(USER_STATUS).includes(status);
}

/** @returns {boolean} vrai si le message de chat est publiable. */
export function isValidChatMessage(text) {
  const t = sanitizeText(text);
  return t.length > 0 && t.length <= LIMITS.CHAT_MESSAGE_MAX;
}
