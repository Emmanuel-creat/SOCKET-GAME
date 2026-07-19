/**
 * Bataille Navale — module de jeu pour la plateforme Arcade.
 *
 * Architecture « Host autoritaire » : le client du Host exécute le moteur pur
 * (NavalEngine) et arbitre chaque manche. Les invités envoient leurs actions
 * (tir, bonus) au Host, qui résout et redistribue un état à chacun.
 *
 * Contrat de plateforme :
 *   export default { async mount(container, context), async unmount() }
 *   context = { roomId, roomName, hostId, players, me, socket,
 *               sendMessage(data, to = null),      // to = null -> diffusion au salon
 *               onMessage(handler) -> unsubscribe,  // handler({ from, data })
 *               onEnd(result) }
 *
 * Canaux logiques (multiplexes via la cle `k`, chacun independant) :
 *   'r'  -> placement : un invite envoie sa grille au Host quand il est Pret
 *   'a'  -> action de manche (tir / bonus) : invite -> Host
 *   'g'  -> etat de manche, personnalise par destinataire : Host -> chacun
 *   'h'  -> heartbeat (detection de deconnexion/forfait)
 *   'rq' -> demande de resynchronisation (nouveau Host apres migration)
 *   'rs' -> reponse de resynchronisation : chaque survivant renvoie SA grille
 *
 * Resilience Host : contrairement a un simple "premier arrive fait autorite
 * pour toujours", ce module lit `context.hostId` en direct (accesseur, jamais
 * fige dans une constante) et sait reprendre l'arbitrage si l'Host deconnecte
 * en pleine bataille. Comme les grilles adverses sont secretes, le nouveau
 * Host ne peut pas les deviner : il les redemande explicitement a chaque
 * survivant (canal 'rq'/'rs') plutot que de tenter une reprise silencieuse
 * avec des informations qu'il ne peut pas legitimement connaitre.
 *
 * NavalEngine est exporte (pur, sans DOM ni reseau) pour d'eventuels tests Node.
 */

/* ====================================================================== */
/* Constantes                                                             */
/* ====================================================================== */

export const GRID = 8;
export const FLEET = [4, 3, 2, 2, 1]; // longueurs des navires, dans l'ordre de placement

export const BONUS = {
  DOUBLE: 'double',
  RADAR: 'radar',
  MISSILE: 'missile',
  CROIX: 'croix',
  TORPILLE: 'torpille',
  BOUCLIER: 'bouclier',
  SCANNER: 'scanner',
  CHANCEUX: 'chanceux',
};

export const BONUS_INFO = {
  [BONUS.DOUBLE]: { nom: 'Double Tir', icone: '🎯', desc: 'Tire deux fois ce tour (deux cases, cibles libres).' },
  [BONUS.RADAR]: { nom: 'Radar', icone: '📡', desc: 'Revele le contenu exact d une zone 2x2 chez un adversaire.' },
  [BONUS.MISSILE]: { nom: 'Missile de Croisiere', icone: '🚀', desc: 'Frappe toute la ligne (rangee) visee chez un adversaire.' },
  [BONUS.CROIX]: { nom: 'Frappe en Croix', icone: '✚', desc: 'Touche 5 cases en croix autour du point vise.' },
  [BONUS.TORPILLE]: { nom: 'Torpille', icone: '🌊', desc: 'Parcourt toute la colonne visee et s arrete au premier navire touche.' },
  [BONUS.BOUCLIER]: { nom: 'Bouclier', icone: '🛡️', desc: 'Protege une case de votre flotte pour ce tour.' },
  [BONUS.SCANNER]: { nom: 'Scanner', icone: '🔍', desc: 'Indique juste si une zone 2x2 adverse contient au moins un navire.' },
  [BONUS.CHANCEUX]: { nom: 'Canon Chanceux', icone: '🍀', desc: 'En cas de tir rate, tente aussitot une case voisine gratuite.' },
};

const BONUS_POOL = Object.keys(BONUS_INFO);

export const EVENTS = {
  TEMPETE: 'tempete',
  BROUILLARD: 'brouillard',
  RAVITAILLEMENT: 'ravitaillement',
};
export const EVENT_INFO = {
  [EVENTS.TEMPETE]: { nom: 'Tempete', icone: '🌀', desc: 'Tous les navires encore intacts derivent d une case.' },
  [EVENTS.BROUILLARD]: { nom: 'Brouillard', icone: '🌫️', desc: 'Radar et Scanner sont inutilisables pendant 2 manches.' },
  [EVENTS.RAVITAILLEMENT]: { nom: 'Caisse de ravitaillement', icone: '📦', desc: 'Le joueur le plus endommage recoit un bonus gratuit.' },
};

const ROUND_EVENT_EVERY = 4; // un evenement mondial toutes les N manches
const TURN_MS = 22000;       // delai pour agir avant tir automatique
const HB_MS = 2000;          // frequence du heartbeat
const LOST_MS = 6000;        // silence -> « en attente de reconnexion »
const FORFEIT_MS = 30000;    // silence prolonge -> forfait
const RESYNC_MS = 4000;      // delai laisse aux survivants pour renvoyer leur grille

/* ====================================================================== */
/* Aides pures                                                            */
/* ====================================================================== */

function idx(r, c) { return r * GRID + c; }
function rc(i) { return [Math.floor(i / GRID), i % GRID]; }
function inBounds(r, c) { return r >= 0 && r < GRID && c >= 0 && c < GRID; }
function randInt(n) { return Math.floor(Math.random() * n); }
function pick(arr) { return arr[randInt(arr.length)]; }

/** Cellules occupees par un navire de longueur `len` pose en (r,c), direction H/V. */
function shipCells(len, r, c, dir) {
  const cells = [];
  for (let k = 0; k < len; k += 1) {
    const rr = dir === 'V' ? r + k : r;
    const cc = dir === 'H' ? c + k : c;
    if (!inBounds(rr, cc)) return null;
    cells.push(idx(rr, cc));
  }
  return cells;
}

/**
 * Reconstruit la liste des navires a partir d'une grille brute (0 = eau,
 * n>0 = identifiant de navire) et verifie qu'elle correspond exactement a
 * la flotte attendue (FLEET) : validation legere cote Host, sans confiance
 * aveugle dans le client qui a place sa flotte.
 */
function deriveShipsFromGrid(grid) {
  const seen = new Set();
  const ships = [];
  for (let i = 0; i < grid.length; i += 1) {
    const shipId = grid[i];
    if (!shipId || seen.has(i)) continue;
    const [r, c] = rc(i);
    const horiz = [i];
    for (let cc = c + 1; cc < GRID && grid[idx(r, cc)] === shipId; cc += 1) horiz.push(idx(r, cc));
    const vert = [i];
    for (let rr = r + 1; rr < GRID && grid[idx(rr, c)] === shipId; rr += 1) vert.push(idx(rr, c));
    const cells = horiz.length >= vert.length ? horiz : vert;
    cells.forEach((cellIdx) => seen.add(cellIdx));
    ships.push({ id: shipId, length: cells.length, cells, hitCount: 0 });
  }
  const gotLengths = ships.map((s) => s.length).sort((a, b) => a - b);
  const wantLengths = [...FLEET].sort((a, b) => a - b);
  const sameFleet = gotLengths.length === wantLengths.length
    && gotLengths.every((v, i2) => v === wantLengths[i2]);
  const totalCells = grid.reduce((n, v) => n + (v ? 1 : 0), 0);
  const valid = sameFleet && totalCells === FLEET.reduce((a, b) => a + b, 0);
  return { ships, valid };
}

/** Place aleatoirement une flotte valide sur une grille vide. Retourne { grid, ships }. */
function randomFleet() {
  const grid = new Array(GRID * GRID).fill(0);
  const ships = [];
  FLEET.forEach((len, i) => {
    let placed = false;
    for (let attempt = 0; attempt < 400 && !placed; attempt += 1) {
      const dir = Math.random() < 0.5 ? 'H' : 'V';
      const r = randInt(GRID);
      const c = randInt(GRID);
      const cells = shipCells(len, r, c, dir);
      if (!cells || cells.some((cellIdx) => grid[cellIdx] !== 0)) continue;
      const shipId = i + 1;
      cells.forEach((cellIdx) => { grid[cellIdx] = shipId; });
      ships.push({ id: shipId, length: len, cells, hitCount: 0 });
      placed = true;
    }
  });
  return { grid, ships };
}

/* ====================================================================== */
/* Moteur pur (aucune dependance DOM/reseau)                              */
/* ====================================================================== */

export class NavalEngine {
  constructor(playersInit) {
    /** @type {Map<string, object>} */
    this.players = new Map();
    playersInit.forEach(({ id, pseudo }) => {
      this.players.set(id, {
        id,
        pseudo,
        grid: new Array(GRID * GRID).fill(0),
        ships: [],
        shots: new Array(GRID * GRID).fill(null), // null | 'hit' | 'miss' | 'blocked'
        bonuses: [],
        treasure: null,
        shield: null,
        hitThisRound: false,
        streakCount: 0,
        ready: false,
        alive: true,
        forfeit: false,
        revealed: false,
      });
    });
    this.phase = 'placement'; // placement | battle | ended
    this.round = 0;
    this.event = null;
    this.fogRoundsLeft = 0;
    this.actions = new Map(); // playerId -> action en attente pour la manche
    this.deadlineAt = 0;
    this.winnerId = null;
    this.log = [];
  }

  list() { return [...this.players.values()]; }
  alivePlayers() { return this.list().filter((p) => p.alive && !p.forfeit); }
  get(id) { return this.players.get(id); }

  /* --- Placement --- */

  /** Place le prochain navire non encore pose pour ce joueur. */
  placeNextShip(playerId, r, c, dir) {
    const p = this.get(playerId);
    if (!p || p.ready) return { ok: false, reason: 'deja pret' };
    const shipIndex = p.ships.length;
    if (shipIndex >= FLEET.length) return { ok: false, reason: 'flotte complete' };
    const len = FLEET[shipIndex];
    const cells = shipCells(len, r, c, dir);
    if (!cells) return { ok: false, reason: 'hors grille' };
    if (cells.some((cellIdx) => p.grid[cellIdx] !== 0)) return { ok: false, reason: 'chevauchement' };
    const shipId = shipIndex + 1;
    cells.forEach((cellIdx) => { p.grid[cellIdx] = shipId; });
    p.ships.push({ id: shipId, length: len, cells, hitCount: 0 });
    return { ok: true, complete: p.ships.length === FLEET.length };
  }

  resetPlacement(playerId) {
    const p = this.get(playerId);
    if (!p || p.ready) return;
    p.grid.fill(0);
    p.ships = [];
  }

  autoPlace(playerId) {
    const p = this.get(playerId);
    if (!p || p.ready) return;
    const { grid, ships } = randomFleet();
    p.grid = grid;
    p.ships = ships;
  }

  setReady(playerId, grid, ships) {
    const p = this.get(playerId);
    if (!p) return false;
    // Le Host revalide toujours la flotte annoncee plutot que de faire confiance au client.
    p.grid = grid;
    const derived = deriveShipsFromGrid(grid);
    if (!derived.valid) return false;
    p.ships = derived.ships;
    p.ready = true;
    return true;
  }

  allReady() { return this.list().every((p) => p.ready); }

  startBattle() {
    this.phase = 'battle';
    this.round = 1;
    this.list().forEach((p) => {
      // Une petite chance de « tresor » cache sur une case d'eau — trouve par un adversaire, offre un bonus.
      const emptyCells = p.grid.map((v, i2) => (v === 0 ? i2 : -1)).filter((i2) => i2 >= 0);
      if (emptyCells.length && Math.random() < 0.6) p.treasure = pick(emptyCells);
    });
    this.deadlineAt = Date.now() + TURN_MS;
    this.log = ['⚓ La bataille commence !'];
  }

  /* --- Manche --- */

  validTargets(shooterId) {
    return this.alivePlayers().filter((p) => p.id !== shooterId).map((p) => p.id);
  }

  /** Valide structurellement une action avant de la mettre en file. */
  submitAction(playerId, action) {
    const p = this.get(playerId);
    if (!p || !p.alive || p.forfeit || this.phase !== 'battle') return false;
    if (!action || typeof action !== 'object') return false;
    if (action.type === 'fire' || action.type === 'chanceux') {
      const target = this.get(action.targetId);
      if (!target || !target.alive || target.id === playerId) return false;
      if (target.shots[action.cell] != null) return false;
      if (action.type === 'chanceux' && !p.bonuses.includes(BONUS.CHANCEUX)) return false;
      this.actions.set(playerId, action);
      return true;
    }
    if (action.type === 'double') {
      if (!p.bonuses.includes(BONUS.DOUBLE)) return false;
      if (!Array.isArray(action.shots) || action.shots.length !== 2) return false;
      const ok = action.shots.every((s) => {
        const target = this.get(s.targetId);
        return target && target.alive && target.id !== playerId && target.shots[s.cell] == null;
      });
      if (!ok) return false;
      this.actions.set(playerId, action);
      return true;
    }
    if (action.type === 'missile' || action.type === 'croix' || action.type === 'torpille') {
      if (!p.bonuses.includes(BONUS[action.type.toUpperCase()])) return false;
      const target = this.get(action.targetId);
      if (!target || !target.alive || target.id === playerId) return false;
      this.actions.set(playerId, action);
      return true;
    }
    if (action.type === 'bouclier') {
      if (!p.bonuses.includes(BONUS.BOUCLIER)) return false;
      if (typeof action.cell !== 'number' || action.cell < 0 || action.cell >= GRID * GRID) return false;
      this.actions.set(playerId, action);
      return true;
    }
    if (action.type === 'radar' || action.type === 'scanner') {
      if (this.fogRoundsLeft > 0) return false;
      const bonusKey = action.type === 'radar' ? BONUS.RADAR : BONUS.SCANNER;
      if (!p.bonuses.includes(bonusKey)) return false;
      const target = this.get(action.targetId);
      if (!target || !target.alive || target.id === playerId) return false;
      this.actions.set(playerId, action);
      return true;
    }
    return false;
  }

  allSubmitted() {
    return this.alivePlayers().every((p) => this.actions.has(p.id));
  }

  /** Remplit automatiquement les manquants (timeout) par un tir au hasard sur une case libre. */
  fillMissingWithAuto() {
    this.alivePlayers().forEach((p) => {
      if (this.actions.has(p.id)) return;
      const targets = this.validTargets(p.id);
      if (!targets.length) return;
      const targetId = pick(targets);
      const target = this.get(targetId);
      const free = target.shots.map((v, i2) => (v == null ? i2 : -1)).filter((i2) => i2 >= 0);
      if (!free.length) return;
      this.actions.set(p.id, { type: 'fire', targetId, cell: pick(free) });
    });
  }

  consumeBonus(player, key) {
    const i2 = player.bonuses.indexOf(key);
    if (i2 >= 0) player.bonuses.splice(i2, 1);
  }

  grantBonus(player) {
    if (!player) return null;
    const key = pick(BONUS_POOL);
    player.bonuses.push(key);
    return key;
  }

  /** Applique un tir unitaire, retourne une ligne de log ou null si aucun effet notable. */
  applyShot(shooter, target, cell, { lucky = false, silent = false } = {}) {
    if (!target || !target.alive) return null;
    if (target.shots[cell] != null) return null; // deja resolu
    if (target.shield === cell) {
      target.shots[cell] = 'blocked';
      target.shield = null;
      return `🛡️ Le tir de ${shooter.pseudo} sur ${target.pseudo} est bloque par un bouclier.`;
    }
    const shipId = target.grid[cell];
    if (shipId) {
      target.shots[cell] = 'hit';
      const ship = target.ships.find((s) => s.id === shipId);
      ship.hitCount += 1;
      shooter.hitThisRound = true;
      let line = `💥 ${shooter.pseudo} touche un navire de ${target.pseudo} !`;
      if (ship.hitCount === ship.length) {
        line = `🔥 ${shooter.pseudo} coule un navire de ${target.pseudo} !`;
        const bonus = this.grantBonus(shooter);
        if (bonus && !silent) line += ` (${shooter.pseudo} recoit : ${BONUS_INFO[bonus].icone} ${BONUS_INFO[bonus].nom})`;
        if (target.ships.every((s) => s.hitCount >= s.length)) {
          target.alive = false;
          target.revealed = true;
          line += ` ${target.pseudo} est elimine !`;
        }
      }
      return line;
    }
    target.shots[cell] = 'miss';
    if (target.treasure === cell) {
      target.treasure = null;
      const bonus = this.grantBonus(shooter);
      return `📦 ${shooter.pseudo} decouvre une epave chez ${target.pseudo} et recoit ${bonus ? BONUS_INFO[bonus].icone : ''} un bonus !`;
    }
    if (lucky) {
      const [r, c] = rc(cell);
      const neighbours = [[r - 1, c], [r + 1, c], [r, c - 1], [r, c + 1]]
        .filter(([rr, cc]) => inBounds(rr, cc))
        .map(([rr, cc]) => idx(rr, cc))
        .filter((i2) => target.shots[i2] == null);
      if (neighbours.length) {
        const extra = this.applyShot(shooter, target, pick(neighbours), { lucky: false });
        return `🍀 Canon Chanceux : tir rate, mais une case voisine est tentee gratuitement.${extra ? ` ${extra}` : ''}`;
      }
    }
    return null;
  }

  /** Resout la manche courante a partir des actions en file. Retourne le journal. */
  resolveRound() {
    const roundLog = [];
    const push = (line) => { if (line) roundLog.push(line); };

    // 1) Boucliers d'abord (ils doivent etre en place avant de traiter les tirs).
    this.actions.forEach((action, playerId) => {
      if (action.type !== 'bouclier') return;
      const p = this.get(playerId);
      p.shield = action.cell;
      this.consumeBonus(p, BONUS.BOUCLIER);
    });

    // 2) Radar / Scanner (info privee, pas de degats) — collectees pour livraison ciblee.
    const reveals = new Map(); // playerId -> [{type, cells / anyShip, targetId}]
    this.actions.forEach((action, playerId) => {
      if (action.type !== 'radar' && action.type !== 'scanner') return;
      const p = this.get(playerId);
      const target = this.get(action.targetId);
      const [r0, c0] = rc(action.cell);
      const zone = [];
      for (let dr = 0; dr < 2; dr += 1) {
        for (let dc = 0; dc < 2; dc += 1) {
          const r = r0 + dr; const c = c0 + dc;
          if (inBounds(r, c)) zone.push(idx(r, c));
        }
      }
      if (action.type === 'radar') {
        this.consumeBonus(p, BONUS.RADAR);
        const cells = zone.map((cellIdx) => ({ cell: cellIdx, ship: target.grid[cellIdx] !== 0 }));
        if (!reveals.has(playerId)) reveals.set(playerId, []);
        reveals.get(playerId).push({ type: 'radar', targetId: target.id, cells });
        push(`📡 ${p.pseudo} utilise un Radar sur ${target.pseudo}.`);
      } else {
        this.consumeBonus(p, BONUS.SCANNER);
        const anyShip = zone.some((cellIdx) => target.grid[cellIdx] !== 0);
        if (!reveals.has(playerId)) reveals.set(playerId, []);
        reveals.get(playerId).push({ type: 'scanner', targetId: target.id, anchor: action.cell, anyShip });
        push(`🔍 ${p.pseudo} scanne une zone chez ${target.pseudo}.`);
      }
    });

    // 3) Construction de la liste unifiee des tirs a resoudre.
    const shots = []; // { shooterId, targetId, cell, lucky }
    this.actions.forEach((action, playerId) => {
      const p = this.get(playerId);
      if (action.type === 'fire') {
        shots.push({ shooterId: playerId, targetId: action.targetId, cell: action.cell, lucky: false });
      } else if (action.type === 'chanceux') {
        this.consumeBonus(p, BONUS.CHANCEUX);
        shots.push({ shooterId: playerId, targetId: action.targetId, cell: action.cell, lucky: true });
      } else if (action.type === 'double') {
        this.consumeBonus(p, BONUS.DOUBLE);
        action.shots.forEach((s) => shots.push({ shooterId: playerId, targetId: s.targetId, cell: s.cell, lucky: false }));
        push(`🎯 ${p.pseudo} utilise Double Tir.`);
      } else if (action.type === 'missile') {
        this.consumeBonus(p, BONUS.MISSILE);
        const [r] = rc(action.targetCell ?? action.cell);
        for (let c = 0; c < GRID; c += 1) shots.push({ shooterId: playerId, targetId: action.targetId, cell: idx(r, c), lucky: false });
        push(`🚀 ${p.pseudo} lance un Missile de Croisiere sur la flotte de ${this.get(action.targetId).pseudo}.`);
      } else if (action.type === 'croix') {
        this.consumeBonus(p, BONUS.CROIX);
        const [r0, c0] = rc(action.cell);
        const cross = [[r0, c0], [r0 - 1, c0], [r0 + 1, c0], [r0, c0 - 1], [r0, c0 + 1]].filter(([r, c]) => inBounds(r, c));
        cross.forEach(([r, c]) => shots.push({ shooterId: playerId, targetId: action.targetId, cell: idx(r, c), lucky: false }));
        push(`✚ ${p.pseudo} declenche une Frappe en Croix chez ${this.get(action.targetId).pseudo}.`);
      } else if (action.type === 'torpille') {
        this.consumeBonus(p, BONUS.TORPILLE);
        const target = this.get(action.targetId);
        const [, c0] = rc(action.cell);
        let stopped = false;
        for (let r = 0; r < GRID && !stopped; r += 1) {
          const cellIdx = idx(r, c0);
          if (target.shots[cellIdx] != null) continue;
          shots.push({ shooterId: playerId, targetId: action.targetId, cell: cellIdx, lucky: false });
          if (target.grid[cellIdx]) stopped = true; // s'arrete au premier navire
        }
        push(`🌊 ${p.pseudo} tire une Torpille sur la colonne de ${target.pseudo}.`);
      }
    });

    // 4) Resolution des tirs.
    shots.forEach(({ shooterId, targetId, cell, lucky }) => {
      const shooter = this.get(shooterId);
      const target = this.get(targetId);
      push(this.applyShot(shooter, target, cell, { lucky }));
    });

    // 5) Series de tirs reussis -> bonus au bout de 2 manches consecutives avec au moins un tir reussi.
    this.list().forEach((p) => {
      if (p.hitThisRound) {
        p.streakCount += 1;
        if (p.streakCount >= 2) {
          const bonus = this.grantBonus(p);
          push(`⭐ ${p.pseudo} enchaine les tirs reussis et recoit ${bonus ? `${BONUS_INFO[bonus].icone} ${BONUS_INFO[bonus].nom}` : 'un bonus'} !`);
          p.streakCount = 0;
        }
      } else {
        p.streakCount = 0;
      }
      p.hitThisRound = false;
      p.shield = null; // le bouclier ne dure qu'une manche
    });

    // 6) Evenement mondial toutes les ROUND_EVENT_EVERY manches.
    if (this.fogRoundsLeft > 0) this.fogRoundsLeft -= 1;
    if (this.round % ROUND_EVENT_EVERY === 0) {
      const chosen = pick(Object.values(EVENTS));
      this.event = chosen;
      if (chosen === EVENTS.TEMPETE) {
        const dr = pick([-1, 0, 1]); const dc = dr === 0 ? pick([-1, 1]) : pick([-1, 0, 1]);
        this.list().forEach((p) => {
          if (!p.alive) return;
          const moved = p.grid.slice();
          let possible = true;
          const claims = new Map(); // newIdx -> shipId, pour detecter les collisions entre navires deplaces
          const staticCells = new Set(); // cases des navires deja coules : ne bougent pas, ne doivent pas etre percutees
          p.ships.forEach((ship) => {
            if (ship.hitCount >= ship.length) ship.cells.forEach((cellIdx) => staticCells.add(cellIdx));
          });
          p.ships.forEach((ship) => {
            if (ship.hitCount >= ship.length) return; // navire coule : ne bouge plus
            ship.cells.forEach((cellIdx) => {
              const [r, c] = rc(cellIdx);
              const nr = r + dr; const nc = c + dc;
              if (!inBounds(nr, nc)) { possible = false; return; }
              const newIdx = idx(nr, nc);
              // Une case deja visee (hit/miss) ne doit jamais etre heritee par un navire qui y
              // derive : ca le rendrait invulnerable (ou faussement deja touche) sur cette case,
              // et pouvait bloquer la partie indefiniment si cette case lui etait indispensable.
              if (p.shots[newIdx] != null) { possible = false; return; }
              if (staticCells.has(newIdx)) { possible = false; return; } // collision avec un navire deja coule, immobile
              if (claims.has(newIdx) && claims.get(newIdx) !== ship.id) { possible = false; return; } // collision entre deux navires en mouvement
              claims.set(newIdx, ship.id);
            });
          });
          if (!possible) return; // la tempete epargne ce joueur ce tour-ci (deplacement impossible sans risque)
          p.ships.forEach((ship) => {
            if (ship.hitCount >= ship.length) return;
            ship.cells.forEach((cellIdx) => { moved[cellIdx] = 0; });
          });
          p.ships.forEach((ship) => {
            if (ship.hitCount >= ship.length) return;
            ship.cells = ship.cells.map((cellIdx) => {
              const [r, c] = rc(cellIdx);
              const newIdx = idx(r + dr, c + dc);
              moved[newIdx] = ship.id;
              return newIdx;
            });
          });
          p.grid = moved;
        });
        push('🌀 Une tempete deplace toutes les flottes encore intactes !');
      } else if (chosen === EVENTS.BROUILLARD) {
        this.fogRoundsLeft = 2;
        push('🌫️ Le brouillard tombe : Radar et Scanner sont bloques pour 2 manches.');
      } else if (chosen === EVENTS.RAVITAILLEMENT) {
        const alive = this.alivePlayers();
        if (alive.length) {
          const mostHurt = alive.reduce((worst, p) => {
            const dmg = p.ships.reduce((n, s) => n + s.hitCount, 0);
            const worstDmg = worst.ships.reduce((n, s) => n + s.hitCount, 0);
            return dmg > worstDmg ? p : worst;
          }, alive[0]);
          const bonus = this.grantBonus(mostHurt);
          push(`📦 Caisse de ravitaillement : ${mostHurt.pseudo} (le plus endommage) recoit ${bonus ? `${BONUS_INFO[bonus].icone} ${BONUS_INFO[bonus].nom}` : 'un bonus'}.`);
        }
      }
    } else {
      this.event = null;
    }

    // 7) Victoire ?
    const alive = this.alivePlayers();
    if (alive.length <= 1) {
      this.phase = 'ended';
      this.winnerId = alive[0]?.id ?? null;
      this.list().forEach((p) => { p.revealed = true; }); // tout le monde devoile sa flotte en fin de partie
      push(alive.length === 1 ? `🏆 ${alive[0].pseudo} remporte la bataille !` : '⚔️ Aucun survivant — egalite.');
    } else {
      this.round += 1;
      this.deadlineAt = Date.now() + TURN_MS;
    }

    this.actions.clear();
    this.log = roundLog;
    return { log: roundLog, reveals };
  }

  markForfeit(playerId) {
    const p = this.get(playerId);
    if (!p || p.forfeit) return;
    p.forfeit = true;
    p.alive = false;
    p.revealed = true;
    this.actions.delete(playerId);
    const alive = this.alivePlayers();
    if (this.phase === 'battle' && alive.length <= 1) {
      this.phase = 'ended';
      this.winnerId = alive[0]?.id ?? null;
      this.list().forEach((pl) => { pl.revealed = true; });
    }
  }

  /** Reconstruit l'etat a partir des grilles renvoyees par les survivants (migration de Host). */
  resyncFrom(payloads) {
    payloads.forEach(({ playerId, grid, ships, bonuses, treasure }) => {
      const p = this.get(playerId);
      if (!p) return;
      p.grid = grid;
      p.ships = ships;
      p.bonuses = bonuses ?? [];
      p.treasure = treasure ?? null;
    });
    this.deadlineAt = Date.now() + TURN_MS;
  }

  /** Vue publique (identique pour tout le monde) + vue privee (specifique au destinataire). */
  buildPublicView() {
    return {
      phase: this.phase,
      round: this.round,
      deadlineAt: this.deadlineAt,
      event: this.event,
      fogRoundsLeft: this.fogRoundsLeft,
      winnerId: this.winnerId,
      log: this.log,
      players: this.list().map((p) => ({
        id: p.id,
        pseudo: p.pseudo,
        alive: p.alive,
        forfeit: p.forfeit,
        ready: p.ready,
        shipsTotal: FLEET.length,
        shipsAlive: p.ships.filter((s) => s.hitCount < s.length).length,
        bonusesCount: p.bonuses.length,
        shots: p.shots,
        grid: p.revealed ? p.grid : null,
      })),
    };
  }

  buildPrivateView(playerId) {
    const p = this.get(playerId);
    if (!p) return null;
    return {
      grid: p.grid,
      ships: p.ships.map((s) => ({ id: s.id, length: s.length, hitCount: s.hitCount })),
      bonuses: p.bonuses,
      shield: p.shield,
      ready: p.ready,
    };
  }
}

/* ====================================================================== */
/* UI (DOM + reseau)                                                      */
/* ====================================================================== */

function h(tag, props = {}, children = []) {
  const node = document.createElement(tag);
  Object.entries(props).forEach(([k, v]) => {
    if (v === undefined || v === null || v === false) return;
    if (k === 'className') node.className = v;
    else if (k === 'style') node.style.cssText = v;
    else if (k.startsWith('on')) node.addEventListener(k.slice(2).toLowerCase(), v);
    else node.setAttribute(k, v === true ? '' : v);
  });
  (Array.isArray(children) ? children : [children]).forEach((c) => {
    if (c === undefined || c === null || c === false) return;
    node.append(typeof c === 'string' ? document.createTextNode(c) : c);
  });
  return node;
}

class NavalUI {
  constructor(container, context) {
    this.container = container;
    this.ctx = context;
    this.me = context.me;
    this.players = context.players;
    this.engine = null;             // non-null uniquement chez le Host
    this.lastPublic = null;         // dernier etat public recu (utile pour tout le monde, y compris le Host)
    this.lastPrivate = null;
    this.myLocalGrid = null;        // grille construite localement pendant le placement
    this.myLocalShips = [];
    this.orientation = 'H';
    this.selectedOpponent = null;
    this.armedBonus = null;
    this.pendingDoubleShot = null;
    this.transientReveal = null;
    this.timers = {};
    this.lastSeenByHost = new Map(); // Host uniquement : dernier heartbeat par joueur
    this.lastSeenOfHost = Date.now();
    this.wasHost = false;
    this.resyncCollected = [];
    this.resyncing = false;
    this.unsubscribe = null;
  }

  get hostId() { return this.ctx.hostId; }
  get isHost() { return this.me.id === this.ctx.hostId; }

  toHost(data) { this.ctx.sendMessage(data, this.hostId); }
  toPlayer(id, data) { this.ctx.sendMessage(data, id); }
  toAll(data) { this.ctx.sendMessage(data); }

  async mount() {
    this.styleEl = h('style', {}, CSS);
    this.root = h('div', { className: 'bn' });
    this.container.append(this.styleEl, this.root);

    this.unsubscribe = this.ctx.onMessage((msg) => this.handleMessage(msg));

    if (this.isHost) {
      this.engine = new NavalEngine(this.players.map((p) => ({ id: p.id, pseudo: p.pseudo })));
      this.wasHost = true;
    }

    this.timers.hb = setInterval(() => this.heartbeatTick(), HB_MS);
    this.toAll({ k: 'h' });

    this.selectedOpponent = this.players.find((p) => p.id !== this.me.id)?.id ?? null;
    this.render();
  }

  unmount() {
    Object.values(this.timers).forEach(clearInterval);
    this.unsubscribe?.();
    this.styleEl?.remove();
    this.root?.remove();
  }

  /* --- Reseau --- */

  handleMessage({ from, data }) {
    if (!data || typeof data !== 'object') return;
    if (data.k === 'h') {
      if (from === this.hostId) this.lastSeenOfHost = Date.now();
      if (this.isHost) this.lastSeenByHost.set(from, Date.now());
      return;
    }
    if (this.isHost) {
      if (data.k === 'r') this.hostOnPlacementReady(from, data);
      else if (data.k === 'a') this.hostOnAction(from, data);
      else if (data.k === 'rs') this.hostOnResyncReply(from, data);
      return;
    }
    if (data.k === 'g') this.guestOnState(data);
    else if (data.k === 'reveal') this.guestOnReveal(data);
    else if (data.k === 'rq') this.guestOnResyncRequest();
  }

  /* --- Host : placement --- */

  hostOnPlacementReady(playerId, { grid, ships }) {
    const ok = this.engine.setReady(playerId, grid, ships);
    if (!ok) {
      this.toPlayer(playerId, { k: 'placementRejected' });
      return;
    }
    if (this.engine.allReady()) this.engine.startBattle();
    this.broadcastState();
  }

  /* --- Host : actions de bataille --- */

  hostOnAction(playerId, { action }) {
    this.engine.submitAction(playerId, action);
    if (this.engine.allSubmitted()) this.hostResolve();
  }

  hostResolve() {
    const { reveals } = this.engine.resolveRound();
    this.broadcastState();
    reveals.forEach((items, playerId) => {
      this.toPlayer(playerId, { k: 'reveal', items });
    });
    if (this.engine.phase === 'ended') {
      setTimeout(() => this.ctx.onEnd?.({ winnerId: this.engine.winnerId }), 4000);
    }
  }

  broadcastState() {
    const pub = this.engine.buildPublicView();
    this.lastPublic = pub;
    this.players.forEach((p) => {
      const priv = this.engine.buildPrivateView(p.id);
      this.toPlayer(p.id, { k: 'g', pub, priv });
      if (p.id === this.me.id) { this.lastPrivate = priv; this.render(); }
    });
  }

  /* --- Invite : reception d'etat --- */

  guestOnState({ pub, priv }) {
    this.lastPublic = pub;
    this.lastPrivate = priv;
    this.resyncing = false;
    this.render();
  }

  guestOnReveal({ items }) {
    this.transientReveal = items;
    this.render();
    clearTimeout(this.timers.revealClear);
    this.timers.revealClear = setTimeout(() => { this.transientReveal = null; this.render(); }, 6000);
  }

  /* --- Migration de Host --- */

  guestOnResyncRequest() {
    if (!this.myLocalGrid && !this.lastPrivate?.grid) return;
    const grid = this.lastPrivate?.grid ?? this.myLocalGrid;
    const ships = this.lastPrivate ? undefined : this.myLocalShips;
    this.toHost({
      k: 'rs',
      grid,
      ships: ships ?? deriveShipsFromGrid(grid).ships,
      bonuses: this.lastPrivate?.bonuses ?? [],
      treasure: null,
    });
  }

  hostOnResyncReply(playerId, { grid, ships, bonuses, treasure }) {
    if (!this.resyncing) return;
    this.resyncCollected.push({ playerId, grid, ships, bonuses, treasure });
  }

  heartbeatTick() {
    this.toAll({ k: 'h' });

    // Detection de la promotion en Host (getter live : jamais fige au montage).
    if (this.isHost && !this.wasHost) {
      this.becomeHost();
    }
    this.wasHost = this.isHost;

    if (!this.isHost) return;

    // Host : surveille le silence de chaque joueur pour forfait.
    const now = Date.now();
    this.players.forEach((p) => {
      if (p.id === this.me.id) return;
      const seen = this.lastSeenByHost.get(p.id) ?? now;
      const silent = now - seen;
      if (silent > FORFEIT_MS && this.engine.get(p.id) && !this.engine.get(p.id).forfeit) {
        this.engine.markForfeit(p.id);
        this.engine.log = [`⛔ ${p.pseudo} est elimine (deconnexion prolongee).`];
        this.broadcastState();
        if (this.engine.phase === 'ended') this.ctx.onEnd?.({ winnerId: this.engine.winnerId });
      }
    });

    if (this.engine?.phase === 'battle' && Date.now() > this.engine.deadlineAt) {
      this.engine.fillMissingWithAuto();
      if (this.engine.allSubmitted()) this.hostResolve();
    }

    this.render();
  }

  /** Reprise d'arbitrage apres la deconnexion de l'ancien Host. */
  becomeHost() {
    if (!this.lastPublic) return; // rien a reprendre (rare : promu avant tout etat recu)
    if (this.lastPublic.phase !== 'battle') return; // placement : chacun garde sa grille localement, rien a faire
    this.resyncing = true;
    this.resyncCollected = [];
    this.engine = new NavalEngine(this.players.map((p) => ({ id: p.id, pseudo: p.pseudo })));
    // Reinjecte l'etat public deja connu (rounds, tirs publics, statuts) avant de completer avec les grilles.
    this.lastPublic.players.forEach((pp) => {
      const p = this.engine.get(pp.id);
      if (!p) return;
      p.alive = pp.alive;
      p.forfeit = pp.forfeit;
      p.ready = true;
      p.shots = pp.shots;
    });
    this.engine.phase = 'battle';
    this.engine.round = this.lastPublic.round;
    this.engine.event = this.lastPublic.event;
    this.engine.fogRoundsLeft = this.lastPublic.fogRoundsLeft;
    // Ma propre grille est deja connue localement.
    if (this.lastPrivate) this.engine.setReady(this.me.id, this.lastPrivate.grid, this.lastPrivate.ships);
    this.resyncCollected.push({
      playerId: this.me.id,
      grid: this.lastPrivate?.grid,
      ships: this.lastPrivate?.ships,
      bonuses: this.lastPrivate?.bonuses ?? [],
      treasure: null,
    });
    this.toAll({ k: 'rq' });
    setTimeout(() => this.finishBecomeHost(), RESYNC_MS);
  }

  finishBecomeHost() {
    this.resyncing = false;
    this.engine.resyncFrom(this.resyncCollected.filter((r) => r.grid));
    this.engine.log = ['🔄 Un nouveau capitaine reprend l arbitrage de la partie.'];
    this.broadcastState();
  }

  /* --- Rendu --- */

  render() {
    this.root.replaceChildren();
    const phase = this.lastPublic?.phase ?? 'placement';
    if (this.resyncing) { this.root.append(this.renderResyncing()); return; }
    if (phase === 'placement') this.root.append(this.renderPlacement());
    else if (phase === 'battle') this.root.append(this.renderBattle());
    else this.root.append(this.renderEnd());
  }

  renderResyncing() {
    return h('div', { className: 'bn-overlay' }, [
      h('div', { className: 'bn-spin' }),
      h('h3', {}, 'Reprise de la partie en cours…'),
      h('p', {}, 'Un nouveau capitaine prend la releve, la bataille reprend dans un instant.'),
    ]);
  }

  /* Placement : grille + liste de flotte + boutons. */

  renderPlacement() {
    if (!this.myLocalGrid) { this.myLocalGrid = new Array(GRID * GRID).fill(0); this.myLocalShips = []; }
    const done = this.myLocalShips.length;
    const ready = this.lastPrivate?.ready ?? false;
    const nextLen = FLEET[done];

    const grid = h('div', { className: 'bn-grid' }, this.myLocalGrid.map((v, i2) => h('div', {
      className: `bn-cell${v ? ' bn-cell--ship' : ''}`,
      onClick: () => this.onPlacementClick(i2),
    })));

    const fleetList = h('div', { className: 'bn-fleet' }, FLEET.map((len, i2) => h('span', {
      className: `bn-fleet__ship${i2 < done ? ' bn-fleet__ship--done' : ''}`,
    }, '⛴'.repeat(len))));

    const others = h('div', { className: 'bn-others' }, this.players.map((p) => h('span', {
      className: `bn-pill${this.isPlayerReady(p.id) ? ' bn-pill--ready' : ''}`,
    }, `${p.pseudo} ${this.isPlayerReady(p.id) ? '✅' : '⏳'}`)));

    const actions = h('div', { className: 'bn-row' }, ready ? [
      h('p', { className: 'bn-hint' }, 'En attente des autres capitaines…'),
    ] : [
      h('button', { className: 'bn-btn bn-btn--ghost', onClick: () => this.rotate() }, `Orientation : ${this.orientation === 'H' ? '➡️ Horizontal' : '⬇️ Vertical'}`),
      h('button', { className: 'bn-btn bn-btn--ghost', onClick: () => this.resetLocalPlacement() }, '↺ Recommencer'),
      h('button', { className: 'bn-btn bn-btn--ghost', onClick: () => this.autoPlaceLocal() }, '🎲 Placement aleatoire'),
      h('button', {
        className: 'bn-btn',
        disabled: done < FLEET.length,
        onClick: () => this.confirmReady(),
      }, '✅ Pret'),
    ]);

    return h('div', { className: 'bn__placement' }, [
      h('h2', {}, `Placez votre flotte (navire ${Math.min(done + 1, FLEET.length)}/${FLEET.length}${!ready ? ` — longueur ${nextLen ?? ''}` : ''})`),
      grid,
      fleetList,
      actions,
      h('div', { className: 'bn-others__head' }, 'Capitaines :'),
      others,
    ]);
  }

  isPlayerReady(id) {
    if (id === this.me.id) return this.lastPrivate?.ready ?? false;
    return this.lastPublic?.players?.find((p) => p.id === id)?.ready ?? false;
  }

  onPlacementClick(cellIdx) {
    if (this.lastPrivate?.ready) return;
    const done = this.myLocalShips.length;
    if (done >= FLEET.length) return;
    const len = FLEET[done];
    const [r, c] = rc(cellIdx);
    const cells = shipCells(len, r, c, this.orientation);
    if (!cells || cells.some((i2) => this.myLocalGrid[i2] !== 0)) { this.flashInvalid(); return; }
    const shipId = done + 1;
    cells.forEach((i2) => { this.myLocalGrid[i2] = shipId; });
    this.myLocalShips.push({ id: shipId, length: len, cells, hitCount: 0 });
    this.render();
  }

  flashInvalid() {
    this.root.classList.add('bn--shake');
    setTimeout(() => this.root.classList.remove('bn--shake'), 220);
  }

  rotate() { this.orientation = this.orientation === 'H' ? 'V' : 'H'; this.render(); }

  resetLocalPlacement() {
    this.myLocalGrid = new Array(GRID * GRID).fill(0);
    this.myLocalShips = [];
    this.render();
  }

  autoPlaceLocal() {
    const { grid, ships } = randomFleet();
    this.myLocalGrid = grid;
    this.myLocalShips = ships;
    this.render();
  }

  confirmReady() {
    this.lastPrivate = { ...(this.lastPrivate ?? {}), ready: true, grid: this.myLocalGrid, ships: this.myLocalShips, bonuses: [] };
    if (this.isHost) this.hostOnPlacementReady(this.me.id, { grid: this.myLocalGrid, ships: this.myLocalShips });
    else this.toHost({ k: 'r', grid: this.myLocalGrid, ships: this.myLocalShips });
    this.render();
  }

  /* Bataille : mon plateau + plateau adverse selectionne + bonus + log. */

  renderBattle() {
    const pub = this.lastPublic;
    const priv = this.lastPrivate;
    const me = pub.players.find((p) => p.id === this.me.id);
    const opponents = pub.players.filter((p) => p.id !== this.me.id);
    if (!this.selectedOpponent || !opponents.some((o) => o.id === this.selectedOpponent && o.alive)) {
      this.selectedOpponent = opponents.find((o) => o.alive)?.id ?? opponents[0]?.id ?? null;
    }
    const target = opponents.find((o) => o.id === this.selectedOpponent);

    const secondsLeft = Math.max(0, Math.ceil((pub.deadlineAt - Date.now()) / 1000));

    const header = h('div', { className: 'bn-head' }, [
      h('div', { className: 'bn-round' }, `Manche ${pub.round}`),
      pub.event ? h('div', { className: 'bn-event' }, `${EVENT_INFO[pub.event].icone} ${EVENT_INFO[pub.event].nom}`) : null,
      h('div', { className: 'bn-timer' }, `⏱ ${secondsLeft}s`),
    ]);

    const scoreboard = h('div', { className: 'bn-scoreboard' }, pub.players.map((p) => h('span', {
      className: `bn-pill${!p.alive ? ' bn-pill--dead' : ''}${p.id === this.me.id ? ' bn-pill--me' : ''}`,
    }, `${p.pseudo} — ${p.shipsAlive}/${p.shipsTotal} 🚢${p.forfeit ? ' (forfait)' : !p.alive ? ' (coule)' : ''}`)));

    const myGrid = h('div', { className: 'bn-grid bn-grid--mine' }, (priv?.grid ?? []).map((v, i2) => {
      const shot = me?.shots?.[i2];
      const shielded = priv?.shield === i2;
      return h('div', {
        className: `bn-cell${v ? ' bn-cell--ship' : ''}${shot === 'hit' ? ' bn-cell--hit' : ''}${shot === 'miss' ? ' bn-cell--miss' : ''}${shot === 'blocked' ? ' bn-cell--blocked' : ''}${shielded ? ' bn-cell--shielded' : ''}`,
        onClick: () => this.onGridClick(true, i2),
      });
    }));

    const revealForTarget = this.transientReveal?.filter((r) => r.targetId === target?.id) ?? [];
    const enemyGrid = target ? h('div', { className: 'bn-grid bn-grid--enemy' }, target.shots.map((shot, i2) => {
      const radarHit = revealForTarget.find((r) => r.type === 'radar')?.cells?.find((c) => c.cell === i2);
      const cls = [
        'bn-cell',
        shot === 'hit' ? 'bn-cell--hit' : '',
        shot === 'miss' ? 'bn-cell--miss' : '',
        shot === 'blocked' ? 'bn-cell--blocked' : '',
        radarHit ? (radarHit.ship ? 'bn-cell--radar-ship' : 'bn-cell--radar-empty') : '',
        shot != null ? 'bn-cell--disabled' : '',
      ].filter(Boolean).join(' ');
      return h('div', { className: cls, onClick: () => (shot == null ? this.onGridClick(false, i2) : null) });
    })) : h('p', {}, 'Aucune cible.');

    const scannerNote = revealForTarget.find((r) => r.type === 'scanner');

    const tabs = h('div', { className: 'bn-tabs' }, opponents.map((o) => h('button', {
      className: `bn-tab${o.id === this.selectedOpponent ? ' bn-tab--active' : ''}${!o.alive ? ' bn-tab--dead' : ''}`,
      onClick: () => { this.selectedOpponent = o.id; this.render(); },
    }, `${o.pseudo}${!o.alive ? ' 💀' : ''}`)));

    const bonusTray = h('div', { className: 'bn-bonuses' }, this.countBonuses(priv?.bonuses ?? []).map(([key, n]) => h('button', {
      className: `bn-bonus${this.armedBonus === key ? ' bn-bonus--armed' : ''}`,
      title: BONUS_INFO[key].desc,
      onClick: () => this.armBonus(key),
    }, `${BONUS_INFO[key].icone} ${BONUS_INFO[key].nom} x${n}`)));

    const log = h('div', { className: 'bn-log' }, (pub.log ?? []).map((line) => h('div', { className: 'bn-log__line' }, line)));

    return h('div', { className: 'bn__battle' }, [
      header,
      scoreboard,
      h('div', { className: 'bn-boards' }, [
        h('div', { className: 'bn-board' }, [h('h3', {}, 'Votre flotte'), myGrid]),
        h('div', { className: 'bn-board' }, [h('h3', {}, 'Cible'), tabs, enemyGrid, scannerNote ? h('p', { className: 'bn-hint' }, `🔍 Zone : ${scannerNote.anyShip ? 'navire detecte' : 'rien detecte'}`) : null]),
      ]),
      this.armedBonus ? h('p', { className: 'bn-hint' }, `Bonus arme : ${BONUS_INFO[this.armedBonus].nom} — ${this.armedBonus === 'bouclier' ? 'cliquez une case de VOTRE flotte' : this.armedBonus === 'double' ? `cliquez ${this.pendingDoubleShot ? '1 derniere' : '2'} case(s) adverse(s)` : 'cliquez une case chez la cible'}. `, [
        h('button', { className: 'bn-btn bn-btn--ghost', onClick: () => this.disarmBonus() }, 'Annuler'),
      ]) : null,
      bonusTray,
      log,
    ]);
  }

  countBonuses(list) {
    const counts = new Map();
    list.forEach((k) => counts.set(k, (counts.get(k) ?? 0) + 1));
    return [...counts.entries()];
  }

  armBonus(key) {
    this.armedBonus = this.armedBonus === key ? null : key;
    this.pendingDoubleShot = null;
    this.render();
  }

  disarmBonus() { this.armedBonus = null; this.pendingDoubleShot = null; this.render(); }

  onGridClick(isMine, cellIdx) {
    if (isMine && this.armedBonus !== 'bouclier') return; // seul le Bouclier cible sa propre grille
    if (!isMine && this.armedBonus === 'bouclier') return;

    if (this.armedBonus === 'bouclier') {
      this.sendAction({ type: 'bouclier', cell: cellIdx });
      this.disarmBonus();
      return;
    }
    const targetId = this.selectedOpponent;
    if (!targetId) return;

    if (this.armedBonus === 'double') {
      if (!this.pendingDoubleShot) { this.pendingDoubleShot = { targetId, cell: cellIdx }; this.render(); return; }
      this.sendAction({ type: 'double', shots: [this.pendingDoubleShot, { targetId, cell: cellIdx }] });
      this.disarmBonus();
      return;
    }
    if (this.armedBonus === 'radar') { this.sendAction({ type: 'radar', targetId, cell: cellIdx }); this.disarmBonus(); return; }
    if (this.armedBonus === 'scanner') { this.sendAction({ type: 'scanner', targetId, cell: cellIdx }); this.disarmBonus(); return; }
    if (this.armedBonus === 'missile') { this.sendAction({ type: 'missile', targetId, targetCell: cellIdx, cell: cellIdx }); this.disarmBonus(); return; }
    if (this.armedBonus === 'croix') { this.sendAction({ type: 'croix', targetId, cell: cellIdx }); this.disarmBonus(); return; }
    if (this.armedBonus === 'torpille') { this.sendAction({ type: 'torpille', targetId, cell: cellIdx }); this.disarmBonus(); return; }
    if (this.armedBonus === 'chanceux') { this.sendAction({ type: 'chanceux', targetId, cell: cellIdx }); this.disarmBonus(); return; }

    this.sendAction({ type: 'fire', targetId, cell: cellIdx });
  }

  sendAction(action) {
    if (this.isHost) this.hostOnAction(this.me.id, { action });
    else this.toHost({ k: 'a', action });
    this.render();
  }

  renderEnd() {
    const pub = this.lastPublic;
    const winner = pub.players.find((p) => p.id === pub.winnerId);
    return h('div', { className: 'bn__end' }, [
      h('h2', {}, winner ? `🏆 ${winner.pseudo} remporte la bataille !` : '⚔️ Egalite — aucun survivant.'),
      h('div', { className: 'bn-boards bn-boards--end' }, pub.players.map((p) => h('div', { className: 'bn-board' }, [
        h('h3', {}, `${p.pseudo}${p.id === pub.winnerId ? ' 👑' : ''}`),
        h('div', { className: 'bn-grid bn-grid--small' }, (p.grid ?? new Array(GRID * GRID).fill(0)).map((v, i2) => {
          const shot = p.shots[i2];
          return h('div', { className: `bn-cell${v ? ' bn-cell--ship' : ''}${shot === 'hit' ? ' bn-cell--hit' : ''}${shot === 'miss' ? ' bn-cell--miss' : ''}` });
        })),
      ]))),
      h('div', { className: 'bn-log' }, (pub.log ?? []).map((line) => h('div', { className: 'bn-log__line' }, line))),
    ]);
  }
}

/* ====================================================================== */
/* Styles                                                                  */
/* ====================================================================== */

const CSS = `
.bn{--bn-surface:var(--surface,#171a24);--bn-border:var(--border,#2a2f3d);--bn-ink:var(--text,#e8eaf0);
--bn-accent:var(--accent,#6c5ce7);--bn-water:#0e3f66;--bn-ship:#3a4a5c;--bn-hit:#ff4757;--bn-miss:#4d5566;
--bn-blocked:#ffd32a;--bn-radar:#00d1b2;
color:var(--bn-ink);font-family:inherit;display:flex;flex-direction:column;gap:14px}
.bn *{box-sizing:border-box}
.bn h2,.bn h3{margin:0}
.bn-grid{display:grid;grid-template-columns:repeat(8,1fr);gap:3px;max-width:360px}
.bn-grid--small{max-width:220px}
.bn-cell{aspect-ratio:1/1;border-radius:4px;background:var(--bn-water);cursor:pointer;transition:transform .08s}
.bn-cell:hover{transform:scale(1.06)}
.bn-cell--ship{background:var(--bn-ship)}
.bn-cell--hit{background:var(--bn-hit)}
.bn-cell--miss{background:var(--bn-miss)}
.bn-cell--blocked{background:var(--bn-blocked)}
.bn-cell--shielded{outline:2px solid var(--bn-blocked)}
.bn-cell--radar-ship{outline:2px solid var(--bn-hit)}
.bn-cell--radar-empty{outline:2px solid var(--bn-radar)}
.bn-cell--disabled{cursor:default;opacity:.9}
.bn--shake .bn-grid{animation:bnshake .2s}
@keyframes bnshake{0%,100%{transform:translateX(0)}25%{transform:translateX(-4px)}75%{transform:translateX(4px)}}
.bn-fleet{display:flex;gap:10px;flex-wrap:wrap}
.bn-fleet__ship{opacity:.35;letter-spacing:2px}
.bn-fleet__ship--done{opacity:1;color:#7ee787}
.bn-row{display:flex;gap:8px;flex-wrap:wrap;align-items:center}
.bn-btn{padding:9px 18px;font-size:14px;font-weight:800;border:none;border-radius:10px;background:var(--bn-accent);color:#fff;cursor:pointer}
.bn-btn:disabled{opacity:.35;cursor:not-allowed}
.bn-btn--ghost{background:transparent;border:1px solid var(--bn-border);color:inherit;font-weight:600}
.bn-others__head{font-size:13px;opacity:.7}
.bn-others{display:flex;gap:6px;flex-wrap:wrap}
.bn-pill{font-size:12px;padding:4px 10px;border-radius:20px;background:var(--bn-surface);border:1px solid var(--bn-border)}
.bn-pill--ready{border-color:#33c26b}
.bn-pill--dead{opacity:.45;text-decoration:line-through}
.bn-pill--me{border-color:var(--bn-accent)}
.bn-hint{font-size:13px;opacity:.75}
.bn-head{display:flex;gap:14px;align-items:center;flex-wrap:wrap}
.bn-round{font-weight:800}
.bn-event{padding:3px 10px;border-radius:20px;background:var(--bn-surface);border:1px solid var(--bn-border);font-size:12px}
.bn-timer{margin-left:auto;font-variant-numeric:tabular-nums;font-weight:800;color:#ffb454}
.bn-scoreboard{display:flex;gap:6px;flex-wrap:wrap}
.bn-boards{display:flex;gap:24px;flex-wrap:wrap}
.bn-boards--end{gap:16px}
.bn-board{display:flex;flex-direction:column;gap:8px}
.bn-tabs{display:flex;gap:6px;flex-wrap:wrap}
.bn-tab{padding:5px 12px;border-radius:20px;border:1px solid var(--bn-border);background:var(--bn-surface);color:inherit;cursor:pointer;font-size:12px}
.bn-tab--active{border-color:var(--bn-accent);color:var(--bn-accent)}
.bn-tab--dead{opacity:.4}
.bn-bonuses{display:flex;gap:8px;flex-wrap:wrap}
.bn-bonus{padding:8px 12px;border-radius:10px;border:1px solid var(--bn-border);background:var(--bn-surface);color:inherit;cursor:pointer;font-size:13px}
.bn-bonus--armed{border-color:var(--bn-accent);background:var(--bn-accent);color:#fff}
.bn-log{max-height:140px;overflow:auto;display:flex;flex-direction:column;gap:4px;font-size:13px;padding:8px 10px;border-radius:10px;background:var(--bn-surface);border:1px solid var(--bn-border)}
.bn-overlay{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:12px;padding:60px 20px;text-align:center}
.bn-spin{width:34px;height:34px;border:3px solid var(--bn-border);border-top-color:var(--bn-accent);border-radius:50%;animation:bnspin .9s linear infinite}
@keyframes bnspin{to{transform:rotate(360deg)}}
@media(prefers-reduced-motion:reduce){.bn-cell,.bn--shake .bn-grid,.bn-spin{animation:none!important;transition:none!important}}
`;

/* ====================================================================== */
/* Contrat de module Arcade                                               */
/* ====================================================================== */

let instance = null;

export default {
  async mount(container, context) {
    instance = new NavalUI(container, context);
    await instance.mount();
  },
  async unmount() {
    if (instance) instance.unmount();
    instance = null;
  },
};
