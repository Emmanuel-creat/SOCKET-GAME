/**
 * Last Shot — moteur de règles pour la plateforme Arcade (aucune dépendance
 * DOM/réseau ; l'horloge est injectée dans tick() → testable en Node).
 *
 * Concept : plateforme flottante circulaire. Chaque manche a deux phases :
 *   1. « preparation » (10 s) : déplacement libre, orientation de l'arme,
 *      verrouillage de la position. Ramassage de bonus au sol.
 *   2. « resolution » : tout le monde tire, une fois chacun, dans un ordre
 *      (aléatoire en mode séquentiel, ou « simultané » — voir plus bas).
 *      Toute la simulation (trajectoires, collisions, éliminations) est
 *      calculée UNE SEULE FOIS ici, d'un coup ; le résultat (shotLog) est
 *      ensuite simplement rejoué/animé côté client, chez tout le monde à
 *      l'identique.
 * Entre les manches, l'arène rétrécit jusqu'à ce qu'il ne reste qu'un
 * joueur (ou personne, en mode simultané : plusieurs tirs peuvent se
 * croiser et s'éliminer mutuellement).
 *
 * Repère logique : cercle centré sur (0,0), rayon initial ARENA_BASE_RADIUS.
 */

export const ARENA_BASE_RADIUS = 440;
export const ARENA_MIN_RADIUS = 90;
export const ARENA_SHRINK_FACTOR = 0.78;
export const PREP_MS = 10000;
export const PER_SHOT_MS = 650;
export const RESOLUTION_BUFFER_MS = 500;
export const ROUND_END_PAUSE_MS = 3200;
export const MATCH_END_PAUSE_MS = 5000;
export const PLAYER_HIT_RADIUS = 22;
export const MOVE_SPEED = 230; // unités logiques / seconde
export const PICKUP_COLLECT_RADIUS = 32;
export const BULLET_STEP = 6;
export const DOUBLE_SPREAD = 0.16; // radians entre les deux tirs de « Double tir »
export const EXPLOSION_RADIUS = 95;
export const PIERCE_MAX = 3; // cibles supplémentaires transpercées par « Perforant »
export const JUMP_MS = 420;

export const BONUS_TYPES = ['double', 'laser', 'ricochet', 'shield', 'teleport', 'freeze', 'explosion', 'pierce'];
export const BONUS_ICONS = {
  double: '⚔️', laser: '🔺', ricochet: '↩️', shield: '🛡️',
  teleport: '🌀', freeze: '❄️', explosion: '💥', pierce: '🎯',
};
export const BONUS_LABELS = {
  double: 'Double tir', laser: 'Laser', ricochet: 'Ricochet', shield: 'Bouclier',
  teleport: 'Téléporteur', freeze: 'Gel', explosion: 'Explosion', pierce: 'Perforant',
};
export const BONUS_DESCRIPTIONS = {
  double: 'Tire deux balles en éventail — deux chances de toucher.',
  laser: 'Rayon qui ignore les boucliers adverses.',
  ricochet: 'La balle rebondit sur le bord de l\'arène.',
  shield: 'Bloque le prochain tir reçu (à usage unique).',
  teleport: 'Échange votre position avec celle d\'un adversaire au tir.',
  freeze: 'Sur un bouclier bloqué, gèle la cible : elle rate son prochain tir.',
  explosion: 'À l\'impact, souffle qui élimine aussi les joueurs tout proches.',
  pierce: 'Traverse une cible pour continuer vers celles derrière.',
};

function dist(ax, ay, bx, by) { return Math.hypot(ax - bx, ay - by); }

function pickRandom(arr, rng) { return arr[Math.floor(rng() * arr.length)]; }

/** Mélange Fisher-Yates avec horloge/rng injectée (déterministe si rng fournie). */
function shuffle(arr, rng) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i -= 1) {
    const j = Math.floor(rng() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/**
 * Simule une balle : marche pas à pas depuis `start` dans la direction
 * `angle`, à l'intérieur du cercle de rayon `radius`, et enregistre les
 * joueurs de `targets` touchés (au premier contact pour une balle normale,
 * plusieurs si `opts.pierce` ou `opts.laser`). Pure fonction géométrique :
 * n'applique aucun effet de jeu (bouclier, explosion…), juste la trajectoire
 * et la liste brute des contacts, dans l'ordre où ils surviennent.
 */
export function simulateBullet(start, angle, radius, targets, opts = {}) {
  let pos = { x: start.x, y: start.y };
  let dir = angle;
  let bounced = false;
  const path = [{ x: pos.x, y: pos.y }];
  const hits = [];
  const hitIds = new Set();
  let piercesLeft = opts.pierce ? PIERCE_MAX : 0;
  const maxSteps = Math.ceil((radius * 6) / BULLET_STEP);

  for (let step = 0; step < maxSteps; step += 1) {
    const nx = pos.x + Math.cos(dir) * BULLET_STEP;
    const ny = pos.y + Math.sin(dir) * BULLET_STEP;
    const distCenter = Math.hypot(nx, ny);

    if (distCenter >= radius) {
      if (opts.ricochet && !bounced) {
        const nxN = nx / distCenter;
        const nyN = ny / distCenter;
        const dot = Math.cos(dir) * nxN + Math.sin(dir) * nyN;
        const rx = Math.cos(dir) - 2 * dot * nxN;
        const ry = Math.sin(dir) - 2 * dot * nyN;
        dir = Math.atan2(ry, rx);
        bounced = true;
        pos = { x: nxN * (radius - 2), y: nyN * (radius - 2) };
        path.push({ x: pos.x, y: pos.y });
        continue; // eslint-disable-line no-continue
      }
      path.push({ x: nx, y: ny });
      break;
    }

    pos = { x: nx, y: ny };
    path.push({ x: pos.x, y: pos.y });

    for (const t of targets) {
      if (hitIds.has(t.id) || !t.alive) continue; // eslint-disable-line no-continue
      if (dist(t.x, t.y, pos.x, pos.y) <= PLAYER_HIT_RADIUS) {
        hitIds.add(t.id);
        hits.push({ targetId: t.id, point: { x: pos.x, y: pos.y } });
        if (!opts.laser && piercesLeft <= 0) {
          return { path, hits, bounced };
        }
        piercesLeft -= 1;
      }
    }
  }
  return { path, hits, bounced };
}

export class LastShotEngine {
  /**
   * @param {{id:string,pseudo:string}[]} players 2 à 12 joueurs.
   * @param {{rng?:()=>number, simultaneous?:boolean}} options
   *   simultaneous : variante « Tir simultané » — tout le monde tire en même
   *   temps sur la base des positions figées en début de manche (plusieurs
   *   éliminations croisées possibles, y compris zéro survivant).
   */
  constructor(players, options = {}) {
    if (players.length < 2 || players.length > 12) {
      throw new Error('Last Shot se joue de 2 à 12 joueurs.');
    }
    this.rng = options.rng || Math.random;
    this.simultaneous = !!options.simultaneous;
    // Best-of : nombre de manches gagnantes pour remporter le MATCH (1 = une
    // seule manche, comportement d'origine). Le premier à l'atteindre gagne.
    this.winsTarget = Math.max(1, Number(options.winsTarget) || 1);

    this.players = players.map((p, i) => {
      const a = (i / players.length) * Math.PI * 2;
      return {
        id: p.id,
        pseudo: p.pseudo,
        slot: i,
        alive: true,
        x: Math.cos(a) * ARENA_BASE_RADIUS * 0.6,
        y: Math.sin(a) * ARENA_BASE_RADIUS * 0.6,
        angle: a + Math.PI, // vise vers le centre par défaut
        locked: false,
        jumping: false,
        jumpUntil: 0,
        input: { dx: 0, dy: 0 },
        bonus: null,
        shielded: false,
        skipNextShot: false,
        kills: 0,
        wins: 0,          // manches de best-of gagnées
        rank: null,
      };
    });

    this.phase = 'attente'; // attente | preparation | resolution | fin-manche | fin
    this.round = 0;
    this.arenaRadius = ARENA_BASE_RADIUS;
    this.prevArenaRadius = ARENA_BASE_RADIUS;
    this.prepEndsAt = 0;
    this.resolutionEndsAt = 0;
    this.roundEndPauseEndsAt = 0;
    this.pickups = [];
    this.shotLog = [];
    this.roundSummary = null;
    this.matchWinner = null;      // gagnant de la MANCHE en cours (dernier survivant)
    this.bestOfWinner = null;     // gagnant du MATCH complet (a atteint winsTarget)
    this.matchGame = 0;           // numéro de la manche de best-of
    this.dirty = true;
  }

  alivePlayers() { return this.players.filter((p) => p.alive); }

  byId(id) { return this.players.find((p) => p.id === id); }

  /* -------------------- cycle de vie -------------------- */

  /** Démarre la partie (appelé une fois par le Host après choix du mode). */
  startMatch(now) {
    this.matchGame = 0;
    this.startBestOfGame(now);
  }

  /**
   * Démarre une nouvelle MANCHE de best-of : tout le monde ressuscite, l'arène
   * repart à sa taille pleine, on garde les scores de wins accumulés.
   */
  startBestOfGame(now) {
    this.matchGame += 1;
    this.round = 0;
    this.arenaRadius = ARENA_BASE_RADIUS;
    this.prevArenaRadius = ARENA_BASE_RADIUS;
    for (let i = 0; i < this.players.length; i += 1) {
      const p = this.players[i];
      const a = (i / this.players.length) * Math.PI * 2;
      p.alive = true;
      p.rank = null;
      p.kills = 0;
      p.shielded = false;
      p.skipNextShot = false;
      p.bonus = null;
      p.jumping = false;
      p.locked = false;
      p.x = Math.cos(a) * ARENA_BASE_RADIUS * 0.6;
      p.y = Math.sin(a) * ARENA_BASE_RADIUS * 0.6;
      p.angle = a + Math.PI;
      p.input = { dx: 0, dy: 0 };
    }
    this.matchWinner = null;
    this.startRound(now);
  }

  startRound(now) {
    this.round += 1;
    this.prevArenaRadius = this.arenaRadius;
    if (this.round > 1) {
      this.arenaRadius = Math.max(ARENA_MIN_RADIUS, Math.round(this.arenaRadius * ARENA_SHRINK_FACTOR));
    }
    for (const p of this.players) {
      if (!p.alive) continue; // eslint-disable-line no-continue
      p.locked = false;
      p.jumping = false;
      p.bonus = null;
      p.input = { dx: 0, dy: 0 };
      // Le rétrécissement pousse les joueurs restés trop excentrés vers l'intérieur.
      const d = Math.hypot(p.x, p.y);
      if (d > this.arenaRadius - PLAYER_HIT_RADIUS) {
        const k = (this.arenaRadius - PLAYER_HIT_RADIUS) / (d || 1);
        p.x *= k;
        p.y *= k;
      }
    }
    this.spawnPickups();
    this.shotLog = [];
    this.roundSummary = null;
    this.phase = 'preparation';
    this.prepEndsAt = now + PREP_MS;
    this.dirty = true;
  }

  spawnPickups() {
    const aliveCount = this.alivePlayers().length;
    const count = Math.min(5, Math.max(2, Math.ceil(aliveCount / 2)));
    this.pickups = [];
    for (let i = 0; i < count; i += 1) {
      const a = this.rng() * Math.PI * 2;
      const r = this.rng() * (this.arenaRadius - 40);
      this.pickups.push({
        id: `pu${this.round}-${i}`,
        type: BONUS_TYPES[Math.floor(this.rng() * BONUS_TYPES.length)],
        x: Math.cos(a) * r,
        y: Math.sin(a) * r,
      });
    }
  }

  /* -------------------- entrées joueur -------------------- */

  setInput(id, { dx = 0, dy = 0 } = {}) {
    const p = this.byId(id);
    if (!p || !p.alive || p.locked || this.phase !== 'preparation') return;
    const len = Math.hypot(dx, dy) || 1;
    p.input = { dx: dx / len, dy: dy / len };
  }

  setAim(id, angle) {
    const p = this.byId(id);
    if (!p || !p.alive || p.locked || this.phase !== 'preparation') return;
    p.angle = angle;
  }

  jump(id, now) {
    const p = this.byId(id);
    if (!p || !p.alive || p.locked || this.phase !== 'preparation') return;
    p.jumping = true;
    p.jumpUntil = now + JUMP_MS;
    this.dirty = true;
  }

  lockPlayer(id) {
    const p = this.byId(id);
    if (!p || !p.alive || p.locked || this.phase !== 'preparation') return;
    p.locked = true;
    p.input = { dx: 0, dy: 0 };
    this.dirty = true;
  }

  /* -------------------- boucle -------------------- */

  tick(now) {
    if (this.phase === 'preparation') {
      this.tickPreparation(now);
    } else if (this.phase === 'resolution') {
      if (now >= this.resolutionEndsAt) this.finishResolution(now);
    } else if (this.phase === 'fin-manche') {
      if (now >= this.roundEndPauseEndsAt) this.startRound(now);
    } else if (this.phase === 'fin-partie') {
      if (now >= this.roundEndPauseEndsAt) this.startBestOfGame(now);
    }
    // 'fin' et 'attente' : rien à faire, le module hôte gère la suite (ctx.onEnd).
  }

  tickPreparation(now) {
    const dt = 0.07; // pas fixe (intervalle d'appel de la boucle hôte)
    let moved = false;
    for (const p of this.players) {
      if (!p.alive || p.locked) continue; // eslint-disable-line no-continue
      if (p.jumping && now >= p.jumpUntil) { p.jumping = false; moved = true; }
      if (p.input.dx || p.input.dy) {
        const nx = p.x + p.input.dx * MOVE_SPEED * dt;
        const ny = p.y + p.input.dy * MOVE_SPEED * dt;
        const d = Math.hypot(nx, ny);
        const maxD = this.arenaRadius - PLAYER_HIT_RADIUS * 0.6;
        if (d <= maxD) { p.x = nx; p.y = ny; } else {
          const k = maxD / (d || 1);
          p.x = nx * k;
          p.y = ny * k;
        }
        moved = true;
      }
      if (!p.bonus) {
        const pu = this.pickups.find((u) => dist(u.x, u.y, p.x, p.y) <= PICKUP_COLLECT_RADIUS);
        if (pu) {
          p.bonus = pu.type;
          this.pickups = this.pickups.filter((u) => u.id !== pu.id);
          moved = true;
        }
      }
    }
    if (moved) this.dirty = true;

    const alive = this.alivePlayers();
    const allLocked = alive.every((p) => p.locked);
    if (now >= this.prepEndsAt || allLocked) {
      for (const p of alive) if (!p.locked) p.locked = true; // verrouillage forcé
      this.resolveRound(now);
    }
  }

  /* -------------------- résolution -------------------- */

  resolveRound(now) {
    const alive = this.alivePlayers();
    const order = shuffle(alive.map((p) => p.id), this.rng);
    // Cliché figé des positions/vivants en tout début de manche : utilisé
    // comme cible en mode simultané (tout le monde vise le même instant T0).
    const frozenTargets = alive.map((p) => ({ id: p.id, x: p.x, y: p.y, alive: true }));
    const shotLog = [];

    for (const shooterId of order) {
      const shooter = this.byId(shooterId);
      const wasAliveAtStart = frozenTargets.some((f) => f.id === shooterId);
      if (!wasAliveAtStart) continue; // eslint-disable-line no-continue

      if (!this.simultaneous && !shooter.alive) {
        shotLog.push({ shooterId, skipped: 'dead' });
        continue; // eslint-disable-line no-continue
      }
      if (shooter.skipNextShot) {
        shooter.skipNextShot = false;
        shotLog.push({ shooterId, skipped: 'frozen' });
        continue; // eslint-disable-line no-continue
      }

      let teleportSwap = null;
      if (shooter.bonus === 'teleport') {
        const others = this.alivePlayers().filter((p) => p.id !== shooterId);
        if (others.length) {
          const target = pickRandom(others, this.rng);
          const tmp = { x: shooter.x, y: shooter.y };
          shooter.x = target.x; shooter.y = target.y;
          target.x = tmp.x; target.y = tmp.y;
          teleportSwap = target.id;
        }
        shooter.bonus = null;
      }

      const bulletOpts = {
        pierce: shooter.bonus === 'pierce',
        laser: shooter.bonus === 'laser',
        ricochet: shooter.bonus === 'ricochet',
      };
      const isDouble = shooter.bonus === 'double';
      const angles = isDouble
        ? [shooter.angle - DOUBLE_SPREAD / 2, shooter.angle + DOUBLE_SPREAD / 2]
        : [shooter.angle];

      const bulletsResult = [];
      for (const ang of angles) {
        const targets = this.simultaneous
          ? frozenTargets.filter((t) => t.id !== shooterId).map((t) => ({ ...t, alive: this.byId(t.id).alive || true }))
          : this.players.filter((p) => p.id !== shooterId && p.alive);
        // En mode simultané on ignore l'état "déjà mort pendant cette
        // résolution" pour la détection de contact : chacun tire sur les
        // positions figées en T0, indépendamment de ce qui arrive ailleurs.
        const raw = simulateBullet({ x: shooter.x, y: shooter.y }, ang, this.arenaRadius, targets, bulletOpts);
        const appliedHits = [];
        for (const h of raw.hits) {
          const target = this.byId(h.targetId);
          if (!this.simultaneous && !target.alive) continue; // eslint-disable-line no-continue
          if (!bulletOpts.laser && target.shielded) {
            target.shielded = false;
            appliedHits.push({ targetId: target.id, result: 'blocked', point: h.point });
            if (shooter.bonus === 'freeze') {
              target.skipNextShot = true;
              appliedHits[appliedHits.length - 1].frozen = true;
            }
            break;
          } else {
            target.alive = false;
            shooter.kills += 1;
            appliedHits.push({ targetId: target.id, result: 'kill', point: h.point });
            if (shooter.bonus === 'explosion') {
              for (const other of this.alivePlayers()) {
                if (other.id === shooterId || other.id === target.id) continue; // eslint-disable-line no-continue
                if (dist(other.x, other.y, h.point.x, h.point.y) <= EXPLOSION_RADIUS) {
                  other.alive = false;
                  shooter.kills += 1;
                  appliedHits.push({ targetId: other.id, result: 'kill', point: h.point, splash: true });
                }
              }
            }
          }
        }
        bulletsResult.push({ angle: ang, path: raw.path, bounced: raw.bounced, hits: appliedHits });
      }
      if (shooter.bonus) shooter.bonus = null;
      shotLog.push({ shooterId, teleportSwap, bullets: bulletsResult });
    }

    this.shotLog = shotLog;
    this.phase = 'resolution';
    this.resolutionEndsAt = now + shotLog.length * PER_SHOT_MS + RESOLUTION_BUFFER_MS;
    this.dirty = true;
  }

  finishResolution(now) {
    const alive = this.alivePlayers();
    const eliminated = this.players.filter((p) => !p.alive && p.rank === null);
    // Attribution des rangs aux joueurs éliminés cette manche (ordre arbitraire entre eux : ex-aequo).
    let nextRank = this.players.filter((p) => p.rank !== null).length
      ? Math.min(...this.players.filter((p) => p.rank !== null).map((p) => p.rank)) - 1
      : this.players.length;
    for (const p of eliminated) { p.rank = nextRank; }
    nextRank -= 1;

    this.roundSummary = {
      eliminated: eliminated.map((p) => ({ id: p.id, pseudo: p.pseudo })),
      survivors: alive.map((p) => ({ id: p.id, pseudo: p.pseudo })),
      newRadius: this.arenaRadius,
    };

    if (alive.length <= 1) {
      // Fin d'une MANCHE de best-of : le dernier survivant (s'il y en a un) marque
      // une victoire. Si personne n'a encore atteint la cible, on enchaîne une
      // nouvelle manche (arène pleine, tout le monde ressuscité).
      if (alive.length === 1) {
        alive[0].rank = 1;
        alive[0].wins += 1;
        this.matchWinner = { id: alive[0].id, pseudo: alive[0].pseudo };
        if (alive[0].wins >= this.winsTarget) {
          this.bestOfWinner = { id: alive[0].id, pseudo: alive[0].pseudo, wins: alive[0].wins };
        }
      } else {
        this.matchWinner = null; // égalité totale (mode simultané) : aucun survivant, pas de point
      }
      if (this.bestOfWinner) {
        this.phase = 'fin';
        this.roundEndPauseEndsAt = now + MATCH_END_PAUSE_MS;
      } else {
        // Manche suivante du best-of après une courte pause de célébration.
        this.phase = 'fin-partie';
        this.roundEndPauseEndsAt = now + MATCH_END_PAUSE_MS;
      }
    } else {
      this.phase = 'fin-manche';
      this.roundEndPauseEndsAt = now + ROUND_END_PAUSE_MS;
    }
    this.dirty = true;
  }

  /* -------------------- état public / résumé -------------------- */

  getState(now) {
    return {
      phase: this.phase,
      round: this.round,
      simultaneous: this.simultaneous,
      winsTarget: this.winsTarget,
      matchGame: this.matchGame,
      bestOfWinner: this.bestOfWinner,
      arenaRadius: this.arenaRadius,
      prevArenaRadius: this.prevArenaRadius,
      prepMsLeft: this.phase === 'preparation' ? Math.max(0, this.prepEndsAt - now) : 0,
      players: this.players.map((p) => ({
        id: p.id, pseudo: p.pseudo, slot: p.slot, alive: p.alive,
        x: p.x, y: p.y, angle: p.angle, locked: p.locked, jumping: p.jumping,
        bonus: p.bonus, shielded: p.shielded, kills: p.kills, wins: p.wins, rank: p.rank,
      })),
      pickups: this.pickups,
      shotLog: this.shotLog,
      roundSummary: this.roundSummary,
      matchWinner: this.matchWinner,
    };
  }

  /**
   * Vue PERSONNELLE d'un joueur. Anti-triche : pendant la phase de préparation,
   * un joueur ne voit PAS où sont ses adversaires (ils placent leur position en
   * secret) ; les positions ne sont révélées qu'à la phase de résolution — le
   * « reveal » du tir. Sa propre position, elle, est toujours visible.
   * Les positions masquées sont ABSENTES de la vue (pas juste cachées à
   * l'affichage) : le client ne peut pas les retrouver.
   */
  getViewFor(playerId, now) {
    const base = this.getState(now);
    // On ne masque QUE pendant la préparation (le placement secret).
    if (this.phase !== 'preparation') return base;
    base.players = base.players.map((p) => {
      if (p.id === playerId || !p.alive) return p;         // soi-même et les éliminés : visibles
      // Adversaire vivant en préparation : on retire toute trace de position.
      const { x, y, angle, jumping, locked, ...reste } = p;
      return { ...reste, hidden: true, locked };            // on garde « verrouillé ? » (info non spatiale)
    });
    return base;
  }

  summary() {
    // Classement du MATCH : par manches gagnées (best-of), puis par éliminations.
    const ranked = [...this.players].sort((a, b) => (b.wins - a.wins) || (b.kills - a.kills));
    const scores = {};
    for (const p of ranked) scores[p.pseudo] = p.wins;
    const gagnant = this.bestOfWinner || (ranked[0]?.wins > 0 ? ranked[0] : null);
    const label = gagnant
      ? `🏆 ${gagnant.pseudo} remporte Last Shot ! (${gagnant.wins}/${this.winsTarget})`
      : '💥 Aucun vainqueur — la plateforme est vide.';
    return { summary: label, scores, winnerId: gagnant?.id ?? null };
  }
}
