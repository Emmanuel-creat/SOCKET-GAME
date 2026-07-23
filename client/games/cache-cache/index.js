/**
 * Cache-Cache « Camouflage » — module Arcade.
 * Contrat : export default { async mount(container, context) {}, unmount() {} }
 * context: { roomId, roomName, hostId, players, me, socket, sendMessage, onMessage, onEnd }
 *
 * Principe : chaque joueur est Chasseur exactement une fois (ordre tiré au hasard en début de
 * partie). Une manche = 1 Chasseur + (n-1) Cacheurs sur UNE carte tirée au sort.
 *  - Phase « cache » (2 min) : les Cacheurs se positionnent et se peignent (pipette + pinceau
 *    automatique) sur la carte partagée. Le Chasseur est sur un écran noir d'attente : le
 *    Host ne lui envoie NI la carte NI aucune position tant que cette phase n'est pas finie
 *    (confidentialité assurée au niveau du transport, pas seulement de l'affichage).
 *  - Phase « chasse » : le Chasseur reçoit la scène (carte + position/couleur de chaque
 *    Cacheur) et dispose de 2×(n-1) tirs. Chaque tir pose un impact de peinture ; s'il touche
 *    la zone d'un Cacheur non trouvé, celui-ci est éliminé. Les Cacheurs, spectateurs, voient
 *    la même scène ainsi que le viseur du Chasseur et les impacts en direct.
 *  - Optimisation : plutôt que de transmettre une image composite (lourd, coûteux en réseau),
 *    le Host diffuse uniquement les données légères {carte, position, couleur} ; chaque client
 *    recompose la scène localement à partir de l'image de carte déjà chargée (asset statique
 *    partagé). Même résultat visuel pour beaucoup moins de trafic.
 *  - Architecture Host-autoritaire identique à Tarot / Échecs : le Host fait tourner
 *    `CacheCacheEngine` (pur, sans DOM, exporté et testable) et diffuse des vues ciblées par
 *    joueur via le relais générique `game:message`.
 */

/* ============================================================================================
 * MOTEUR (pur, sans DOM — testable en Node)
 * ========================================================================================== */

export const MAP_COUNT = 10;
export const HIDE_DURATION_MS = 120_000;
export const HUNT_DURATION_MS = 120_000;
export const HIT_RADIUS = 0.045;
export const SCORE_SURVIVE = 2;
export const SCORE_PER_HIT = 1;
const DEFAULT_COLOR = '#f2f2f2';

function clamp01(n) { return Math.max(0, Math.min(1, Number(n) || 0)); }

export class CacheCacheEngine {
  constructor(players, { rng = Math.random } = {}) {
    if (!Array.isArray(players) || players.length < 2 || players.length > 8) {
      throw new Error('Cache-Cache se joue de 2 à 8 joueurs.');
    }
    this.rng = rng;
    this.players = players.map((p) => ({ id: p.id, pseudo: p.pseudo ?? '?' }));
    this.n = this.players.length;
    this.huntOrder = this.shuffle(this.players.map((p) => p.id));
    this.roundIndex = -1;
    this.usedMaps = [];
    this.scores = Object.fromEntries(this.players.map((p) => [p.id, 0]));
    this.log = [];
    this.phase = 'attente';
    this.advanceRound();
  }

  shuffle(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(this.rng() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  pseudoOf(id) { return this.players.find((p) => p.id === id)?.pseudo ?? '?'; }

  say(text) { this.log.push(text); if (this.log.length > 60) this.log.shift(); }

  pickMap() {
    if (this.usedMaps.length >= MAP_COUNT) this.usedMaps = [];
    let id;
    do { id = 1 + Math.floor(this.rng() * MAP_COUNT); } while (this.usedMaps.includes(id));
    this.usedMaps.push(id);
    return id;
  }

  /* ------------------------------ manches ------------------------------ */

  advanceRound() {
    this.roundIndex += 1;
    if (this.roundIndex >= this.n) {
      this.phase = 'fin';
      this.say('🏆 Partie terminée.');
      return;
    }
    this.hunterId = this.huntOrder[this.roundIndex];
    this.hiderIds = this.players.map((p) => p.id).filter((id) => id !== this.hunterId);
    this.mapId = this.pickMap();
    this.hiderStates = Object.fromEntries(this.hiderIds.map((id) => [id, {
      x: 0.5, y: 0.5, color: DEFAULT_COLOR, locked: false, found: false,
    }]));
    this.bullets = 2 * this.hiderIds.length;
    this.shots = [];
    this.phase = 'cache';
    this.say(`🗺️ Manche ${this.roundIndex + 1}/${this.n} — ${this.pseudoOf(this.hunterId)} est le Chasseur.`);
  }

  /* ------------------------------ phase cache ------------------------------ */

  updateHiderState(playerId, patch = {}) {
    if (this.phase !== 'cache') return { ok: false, error: 'Ce n\'est pas la phase de cache.' };
    if (playerId === this.hunterId) return { ok: false, error: 'Le Chasseur ne se cache pas.' };
    const st = this.hiderStates[playerId];
    if (!st) return { ok: false, error: 'Joueur inconnu.' };
    if (st.locked && (patch.x !== undefined || patch.y !== undefined) && patch.locked !== false) {
      return { ok: false, error: 'Position verrouillée : déverrouille pour te déplacer.' };
    }
    if (typeof patch.x === 'number') st.x = clamp01(patch.x);
    if (typeof patch.y === 'number') st.y = clamp01(patch.y);
    if (typeof patch.color === 'string' && /^#[0-9a-fA-F]{6}$/.test(patch.color)) st.color = patch.color;
    if (typeof patch.locked === 'boolean') st.locked = patch.locked;
    return { ok: true, state: { ...st } };
  }

  allHidersLocked() { return this.hiderIds.every((id) => this.hiderStates[id].locked); }

  beginHunt() {
    if (this.phase !== 'cache') return { ok: false, error: 'Phase invalide.' };
    this.phase = 'chasse';
    this.say(`🔦 La chasse commence : ${this.pseudoOf(this.hunterId)} dispose de ${this.bullets} tirs.`);
    return { ok: true };
  }

  /* ------------------------------ phase chasse ------------------------------ */

  shoot(playerId, x, y) {
    if (this.phase !== 'chasse') return { ok: false, error: 'Ce n\'est pas la phase de chasse.' };
    if (playerId !== this.hunterId) return { ok: false, error: 'Seul le Chasseur peut tirer.' };
    if (this.bullets <= 0) return { ok: false, error: 'Plus de munitions.' };
    const sx = clamp01(x); const sy = clamp01(y);
    this.bullets -= 1;
    let hitId = null;
    for (const id of this.hiderIds) {
      const st = this.hiderStates[id];
      if (st.found) continue;
      if (Math.hypot(st.x - sx, st.y - sy) <= HIT_RADIUS) { hitId = id; break; }
    }
    const shot = { x: sx, y: sy, hit: !!hitId, hiderId: hitId, bulletsLeft: this.bullets };
    this.shots.push(shot);
    if (hitId) {
      this.hiderStates[hitId].found = true;
      this.scores[this.hunterId] += SCORE_PER_HIT;
      this.say(`🎯 ${this.pseudoOf(this.hunterId)} repère ${this.pseudoOf(hitId)} !`);
    } else {
      this.say(`💦 Tir manqué (${this.bullets} munition${this.bullets > 1 ? 's' : ''} restante${this.bullets > 1 ? 's' : ''}).`);
    }
    const over = this.bullets <= 0 || this.hiderIds.every((id) => this.hiderStates[id].found);
    if (over) this.endHunt();
    return { ok: true, shot, roundOver: this.phase === 'resultat-manche' };
  }

  endHunt() {
    if (this.phase !== 'chasse') return;
    for (const id of this.hiderIds) {
      if (!this.hiderStates[id].found) this.scores[id] += SCORE_SURVIVE;
    }
    this.phase = 'resultat-manche';
    const found = this.hiderIds.filter((id) => this.hiderStates[id].found).length;
    this.say(`🏁 Fin de manche : ${found}/${this.hiderIds.length} trouvé(s).`);
  }

  /* ------------------------------ vues & scores ------------------------------ */

  scoreboard() {
    return [...this.players]
      .map((p) => ({ id: p.id, pseudo: p.pseudo, score: this.scores[p.id] }))
      .sort((a, b) => b.score - a.score);
  }

  getViewFor(playerId) {
    const isHunter = playerId === this.hunterId;
    const base = {
      phase: this.phase, round: this.roundIndex + 1, totalRounds: this.n,
      hunterId: this.hunterId, hunterPseudo: this.pseudoOf(this.hunterId), isHunter,
      scores: this.scoreboard(), log: this.log.slice(-30),
    };
    if (this.phase === 'cache') {
      if (isHunter) {
        return {
          ...base,
          hidersStatus: this.hiderIds.map((id) => ({ id, pseudo: this.pseudoOf(id), locked: this.hiderStates[id].locked })),
        };
      }
      return {
        ...base,
        mapId: this.mapId,
        hiders: this.hiderIds.map((id) => ({ id, pseudo: this.pseudoOf(id), ...this.hiderStates[id] })),
      };
    }
    if (this.phase === 'chasse' || this.phase === 'resultat-manche') {
      return {
        ...base,
        mapId: this.mapId,
        bullets: this.bullets,
        hiders: this.hiderIds.map((id) => ({ id, pseudo: this.pseudoOf(id), ...this.hiderStates[id] })),
        shots: this.shots,
      };
    }
    return base; // 'fin'
  }
}

/* ============================================================================================
 * INTERFACE (DOM + Canvas + réseau)
 * ========================================================================================== */

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
    if (c === null || c === undefined || c === false) return;
    node.append(typeof c === 'string' || typeof c === 'number' ? document.createTextNode(String(c)) : c);
  });
  return node;
}

function mapUrl(id) { return `/games/cache-cache/assets/maps/${id}.png`; }

function drawImageCover(ctx, img, size) {
  const scale = Math.max(size / img.width, size / img.height);
  const w = img.width * scale; const hgt = img.height * scale;
  ctx.drawImage(img, (size - w) / 2, (size - hgt) / 2, w, hgt);
}

function roundRectPath(ctx, x, y, w, hgt, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + hgt, r);
  ctx.arcTo(x + w, y + hgt, x, y + hgt, r);
  ctx.arcTo(x, y + hgt, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

function drawCharacter(ctx, size, x, y, color, { locked = false, found = false, dim = false } = {}) {
  const cx = x * size; const cy = y * size;
  const r = size * 0.028;
  const bodyW = r * 1.7; const bodyH = r * 2.6;
  ctx.save();
  ctx.globalAlpha = dim ? 0.55 : 1;
  ctx.fillStyle = found ? 'rgba(140,140,150,0.5)' : color;
  ctx.strokeStyle = 'rgba(0,0,0,0.55)';
  ctx.lineWidth = Math.max(1, size * 0.0022);
  roundRectPath(ctx, cx - bodyW / 2, cy - r * 0.3, bodyW, bodyH, bodyW / 2);
  ctx.fill(); ctx.stroke();
  ctx.beginPath(); ctx.arc(cx, cy - r * 1.5, r, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
  if (found) {
    ctx.strokeStyle = '#ff3d5a'; ctx.lineWidth = size * 0.006;
    ctx.beginPath(); ctx.moveTo(cx - r * 1.4, cy - r * 2.6); ctx.lineTo(cx + r * 1.4, cy + r * 0.6); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(cx + r * 1.4, cy - r * 2.6); ctx.lineTo(cx - r * 1.4, cy + r * 0.6); ctx.stroke();
  } else if (locked) {
    ctx.fillStyle = '#ffd166';
    ctx.font = `${Math.round(size * 0.045)}px sans-serif`;
    ctx.textAlign = 'center';
    ctx.fillText('🔒', cx, cy - r * 3.1);
  }
  ctx.restore();
}

function drawSplat(ctx, size, x, y, hit) {
  const cx = x * size; const cy = y * size;
  const r = size * HIT_RADIUS_VISUAL;
  ctx.save();
  ctx.fillStyle = hit ? 'rgba(255,61,90,0.85)' : 'rgba(255,255,255,0.85)';
  ctx.strokeStyle = 'rgba(0,0,0,0.6)';
  ctx.lineWidth = Math.max(1, size * 0.0018);
  ctx.beginPath();
  const bumps = 9;
  for (let i = 0; i <= bumps; i++) {
    const a = (i / bumps) * Math.PI * 2;
    const rr = r * (0.78 + 0.22 * Math.sin(a * 3.1 + x * 37 + y * 19));
    const px = cx + Math.cos(a) * rr; const py = cy + Math.sin(a) * rr;
    if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
  }
  ctx.closePath(); ctx.fill(); ctx.stroke();
  ctx.restore();
}
const HIT_RADIUS_VISUAL = HIT_RADIUS * 1.05;

function drawCrosshair(ctx, size, x, y) {
  const cx = x * size; const cy = y * size; const r = size * 0.028;
  ctx.save();
  ctx.strokeStyle = '#ff3d5a'; ctx.lineWidth = Math.max(1.5, size * 0.003);
  ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(cx - r * 1.6, cy); ctx.lineTo(cx + r * 1.6, cy); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(cx, cy - r * 1.6); ctx.lineTo(cx, cy + r * 1.6); ctx.stroke();
  ctx.restore();
}

function fmtChatTime(ts) { return new Date(ts).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }); }
function fmtCountdown(ms) { const s = Math.max(0, Math.ceil(ms / 1000)); return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`; }

const STAGE_SIZE = 900; // résolution interne du canevas (indépendante de la taille CSS affichée)

/*
 * Marges de placement d'un Cacheur.
 *
 * Un personnage occupe de la place AUTOUR de son point : la tête dépasse
 * au-dessus, le corps en dessous. Sans garde-fou, quelqu'un qui se colle au
 * bord se retrouve à moitié hors du cadre — moche, mais surtout injuste : un
 * personnage tronqué est plus difficile à repérer ET à toucher.
 *
 * Les valeurs sont dérivées des dimensions utilisées par drawCharacter(), pour
 * qu'elles restent justes si le personnage est un jour redessiné.
 * Mettre MARGES_PERSO à false rétablit le placement libre jusqu'au bord.
 */
const MARGES_PERSO = true;
const PERSO_R = 0.028;                       // rayon de la tête (fraction du canevas)
const PERSO_HAUT = PERSO_R * 2.5;            // sommet de la tête au-dessus du point
const PERSO_BAS = PERSO_R * 0.3 + PERSO_R * 2.6; // bas du corps en dessous
const PERSO_COTE = (PERSO_R * 1.7) / 2;      // demi-largeur du corps

/** Garde le personnage entièrement visible dans le cadre. */
function poserPerso(x, y) {
  if (!MARGES_PERSO) return { x, y };
  return {
    x: Math.min(1 - PERSO_COTE, Math.max(PERSO_COTE, x)),
    y: Math.min(1 - PERSO_BAS, Math.max(PERSO_HAUT, y)),
  };
}

class CacheCacheUI {
  constructor(container, context) {
    this.container = container;
    this.ctx = context;
    this.isHost = context.me.id === context.hostId;
    this.engine = null;
    this.view = null;
    this.chatLog = [];
    this.mode = 'deplacer';
    this.myColor = DEFAULT_COLOR;
    this.myLocked = false;
    this.otherHiders = new Map();
    this.hunterCursor = null;
    this.mapImage = null;
    this.mapImageId = null;
    this._mapLoading = null;
    this._lastMoveSentAt = 0;
    this._lastCursorSentAt = 0;
    this.unsubscribe = null;
    this.phaseTimer = null;
    this.tickTimer = null;
    this.phaseDeadline = null;
  }

  /* ============================== CONTRAT DU MODULE ============================== */

  mount() {
    this.styleEl = h('style', {}, CSS);
    this.root = h('div', { className: 'cc' });
    this.container.append(this.styleEl, this.root);
    this.unsubscribe = this.ctx.onMessage(({ from, data }) => this.onMessage(from, data));
    if (this.isHost) {
      try { this.engine = new CacheCacheEngine(this.ctx.players); }
      catch (err) { this.renderMessage(`⚠️ ${err.message}`); return; }
      this.beginCachePhase();
    } else {
      this.renderMessage('⏳ Connexion à la partie…');
    }
  }

  unmount() {
    this.unsubscribe?.();
    clearTimeout(this.phaseTimer);
    clearInterval(this.tickTimer);
    this.styleEl?.remove();
    this.root?.remove();
  }

  renderMessage(text) {
    this.root.replaceChildren(h('div', { className: 'cc__panel', style: 'margin:auto;max-width:420px;text-align:center;' }, text));
  }

  /* ============================== RÉSEAU ============================== */

  onMessage(from, data) {
    if (!data) return;
    if (data.t === 'chat') { this.receiveChat(from, data); return; }
    if (this.isHost) {
      if (data.t === 'action') this.hostHandle(from, data.action);
      return;
    }
    if (from !== this.ctx.hostId) return;
    if (data.t === 'view') this.applyView(data.view);
    else if (data.t === 'hiderPatch') this.applyHiderPatch(data.patch);
    else if (data.t === 'cursor') this.applyCursor(data);
    else if (data.t === 'shot') this.applyShot(data.shot);
    else if (data.t === 'error') this.setStatus(data.message);
    else if (data.t === 'gameEnd') { clearInterval(this.tickTimer); this.ctx.onEnd(data.info); }
  }

  act(action) {
    if (this.isHost) this.hostHandle(this.ctx.me.id, action);
    else this.ctx.sendMessage({ t: 'action', action }, this.ctx.hostId);
  }

  /* -------- Host : orchestration des phases -------- */

  beginCachePhase() {
    this.otherHiders = new Map();
    this.mapImageId = null;
    this.broadcastViews();
    clearTimeout(this.phaseTimer);
    this.phaseDeadline = Date.now() + HIDE_DURATION_MS;
    this.phaseTimer = setTimeout(() => this.forceBeginHunt(), HIDE_DURATION_MS);
    this.startTicker();
  }

  forceBeginHunt() {
    if (!this.engine || this.engine.phase !== 'cache') return;
    this.engine.beginHunt();
    this.broadcastViews();
    clearTimeout(this.phaseTimer);
    this.phaseDeadline = Date.now() + HUNT_DURATION_MS;
    this.phaseTimer = setTimeout(() => this.forceEndHunt(), HUNT_DURATION_MS);
  }

  forceEndHunt() {
    if (!this.engine || this.engine.phase !== 'chasse') return;
    this.engine.endHunt();
    this.broadcastViews();
    this.scheduleNextRound();
  }

  scheduleNextRound() {
    clearTimeout(this.phaseTimer);
    this.phaseDeadline = null;
    this.phaseTimer = setTimeout(() => {
      this.engine.advanceRound();
      if (this.engine.phase === 'fin') {
        this.broadcastViews();
        clearInterval(this.tickTimer);
        this.endTimer = setTimeout(() => this.finalizeGame(), 8000);
      } else this.beginCachePhase();
    }, 4000);
  }

  /** Notifie TOUS les joueurs (pas seulement l'Host) afin que chacun appelle son propre
   * ctx.onEnd() — sinon seul le navigateur de l'Host retournerait au salon. */
  finalizeGame() {
    if (this._finalized) return;
    this._finalized = true;
    clearTimeout(this.phaseTimer); clearInterval(this.tickTimer); clearTimeout(this.endTimer);
    const info = { scores: this.engine.scoreboard() };
    for (const p of this.ctx.players) {
      if (p.id === this.ctx.me.id) continue;
      this.ctx.sendMessage({ t: 'gameEnd', info }, p.id);
    }
    this.ctx.onEnd(info);
  }

  startTicker() {
    clearInterval(this.tickTimer);
    this.tickTimer = setInterval(() => { if (this.view) this.updateCountdownUI(); }, 250);
  }

  broadcastViews() {
    for (const p of this.ctx.players) {
      if (p.id === this.ctx.me.id) continue;
      this.ctx.sendMessage({ t: 'view', view: this.engine.getViewFor(p.id) }, p.id);
    }
    this.applyView(this.engine.getViewFor(this.ctx.me.id));
  }

  broadcastHiderPatch(senderId, state) {
    const patch = { id: senderId, ...state };
    for (const id of this.engine.hiderIds) {
      if (id === senderId) continue;
      if (id === this.ctx.me.id) { this.applyHiderPatch(patch); continue; }
      this.ctx.sendMessage({ t: 'hiderPatch', patch }, id);
    }
  }

  broadcastCursor(x, y) {
    for (const id of this.engine.hiderIds) {
      if (id === this.ctx.me.id) { this.applyCursor({ x, y }); continue; }
      this.ctx.sendMessage({ t: 'cursor', x, y }, id);
    }
  }

  broadcastShot(shot) {
    for (const p of this.ctx.players) {
      if (p.id === this.ctx.me.id) { this.applyShot(shot); continue; }
      this.ctx.sendMessage({ t: 'shot', shot }, p.id);
    }
  }

  hostHandle(playerId, action) {
    if (!action) return;
    if (action.a === 'updateHiderState') {
      const r = this.engine.updateHiderState(playerId, action.patch ?? {});
      if (!r.ok) { this.sendErrorTo(playerId, r.error); return; }
      this.broadcastHiderPatch(playerId, r.state);
      if (this.engine.allHidersLocked()) this.forceBeginHunt();
    } else if (action.a === 'shoot') {
      const r = this.engine.shoot(playerId, action.x, action.y);
      if (!r.ok) { this.sendErrorTo(playerId, r.error); return; }
      this.broadcastShot(r.shot);
      if (r.roundOver) { clearTimeout(this.phaseTimer); this.broadcastViews(); this.scheduleNextRound(); }
    } else if (action.a === 'cursor') {
      this.broadcastCursor(action.x, action.y);
    } else if (action.a === 'endGameNow' && playerId === this.ctx.hostId) {
      this.finalizeGame();
    }
  }

  sendErrorTo(playerId, message) {
    if (playerId === this.ctx.me.id) this.setStatus(message);
    else this.ctx.sendMessage({ t: 'error', message }, playerId);
  }

  /* ============================== CHAT (même schéma que Tarot / Échecs) ============================== */

  ensureChatPanel() {
    if (this.chatPanel) return this.chatPanel;
    this.chatEmptyEl = h('div', { className: 'cc__chat-empty' }, 'Aucun message pour l\'instant.');
    this.chatMessagesEl = h('div', { className: 'cc__chat-messages', tabindex: '0', 'aria-label': 'Messages de la partie' }, [this.chatEmptyEl]);
    this.chatInput = h('input', { type: 'text', placeholder: 'Écrire un message…', maxlength: '300', 'aria-label': 'Votre message' });
    const form = h('form', { className: 'cc__chat-form' }, [this.chatInput, h('button', { className: 'btn btn--primary btn--small', type: 'submit' }, 'Envoyer')]);
    form.addEventListener('submit', (e) => { e.preventDefault(); this.sendChat(); });
    this.chatPanel = h('div', { className: 'cc__panel cc__chat' }, [h('strong', {}, '💬 Chat'), this.chatMessagesEl, form]);
    return this.chatPanel;
  }

  sendChat() {
    const text = this.chatInput.value.trim();
    if (!text) return;
    this.appendChatMessage({ pseudo: this.ctx.me.pseudo, avatar: this.ctx.me.avatar, color: this.ctx.me.color, at: Date.now(), text });
    this.ctx.sendMessage({ t: 'chat', text }, null);
    this.chatInput.value = '';
    this.chatInput.focus();
  }

  receiveChat(from, data) {
    const text = String(data?.text ?? '').slice(0, 500).trim();
    if (!text) return;
    const player = this.ctx.players.find((p) => p.id === from);
    this.appendChatMessage({ pseudo: player?.pseudo ?? '?', avatar: player?.avatar ?? '❔', color: player?.color, at: Date.now(), text });
  }

  appendChatMessage(message) {
    this.ensureChatPanel();
    if (this.chatEmptyEl) { this.chatEmptyEl.remove(); this.chatEmptyEl = null; }
    const list = this.chatMessagesEl;
    const nearBottom = list.scrollHeight - list.scrollTop - list.clientHeight < 60;
    list.append(h('div', { className: 'cc__chat-msg' }, [
      h('span', { className: 'cc__chat-msg__avatar', 'aria-hidden': 'true' }, message.avatar ?? '🙈'),
      h('div', {}, [
        h('div', { className: 'cc__chat-msg__head' }, [
          h('span', { className: 'cc__chat-msg__pseudo', style: message.color ? `color:${message.color};` : '' }, message.pseudo),
          h('span', { className: 'cc__chat-msg__time' }, fmtChatTime(message.at)),
        ]),
        h('p', { className: 'cc__chat-msg__text' }, message.text),
      ]),
    ]));
    if (nearBottom) list.scrollTop = list.scrollHeight;
  }

  setStatus(text) { if (this.statusEl) { this.statusEl.textContent = text ?? ''; } }

  /* ============================== DISPATCH DE VUE ============================== */

  applyView(view) {
    this.view = view;
    if (view.phase === 'cache') {
      if (view.isHunter) this.renderHunterWaiting(view);
      else this.renderHideStage(view);
    } else if (view.phase === 'chasse') {
      this.renderHuntStage(view);
    } else if (view.phase === 'resultat-manche') {
      this.renderRoundResult(view);
    } else if (view.phase === 'fin') {
      this.renderFinal(view);
    }
  }

  applyHiderPatch(patch) {
    if (!patch || patch.id === this.ctx.me.id) return;
    this.otherHiders.set(patch.id, { ...(this.otherHiders.get(patch.id) ?? {}), ...patch });
    this.redrawHideStage();
  }

  applyCursor({ x, y }) {
    this.hunterCursor = { x, y };
    if (this.view?.phase === 'chasse') this.redrawHuntStage();
  }

  applyShot(shot) {
    if (!shot) return;
    this.huntShots = this.huntShots ? [...this.huntShots, shot] : [shot];
    if (this.huntHiders && shot.hit && shot.hiderId && this.huntHiders.has(shot.hiderId)) {
      this.huntHiders.set(shot.hiderId, { ...this.huntHiders.get(shot.hiderId), found: true });
    }
    if (this.view) this.view.bullets = shot.bulletsLeft;
    const bulletsEl = this.root.querySelector?.('.cc__bullets');
    if (bulletsEl && this.view) bulletsEl.textContent = `🔫 ${this.view.bullets} munition${this.view.bullets > 1 ? 's' : ''}`;
    if (this.view?.phase === 'chasse') this.redrawHuntStage();
    this.setStatus(shot.hit ? '🎯 Touché !' : '💦 Raté…');
  }

  /* ============================== STRUCTURE COMMUNE (en-tête, scores, chat, contrôles) ============================== */

  renderShell(mainNode, { subtitle } = {}) {
    const header = h('div', { className: 'cc__header' }, [
      h('div', { className: 'cc__title' }, [
        `🙈 Manche ${this.view.round}/${this.view.totalRounds}`,
        subtitle ? h('span', { className: 'cc__subtitle' }, subtitle) : null,
      ]),
      this.timerEl = h('div', { className: 'cc__timer' }),
    ]);
    const side = h('div', { className: 'cc__side' }, [
      h('div', { className: 'cc__panel' }, [h('strong', {}, '🏆 Scores'), this.buildScoreTable(this.view.scores)]),
      this.ensureChatPanel(),
    ]);
    this.statusEl = h('div', { className: 'cc__status' });
    this.root.replaceChildren(header, h('div', { className: 'cc__layout' }, [mainNode, side]), this.statusEl, this.buildControls());
    this.updateCountdownUI();
  }

  buildScoreTable(scores) {
    return h('table', { className: 'cc__scoretable' }, h('tbody', {}, scores.map((s) => h('tr', {
      className: s.id === this.ctx.me.id ? 'cc__scoretable-row--me' : '',
    }, [
      h('td', {}, s.pseudo === this.ctx.me.pseudo ? `${s.pseudo} (toi)` : s.pseudo),
      h('td', { className: 'cc__scoretable-pts' }, String(s.score)),
    ]))));
  }

  buildControls() {
    if (!this.isHost) return h('div', { className: 'cc__controls' });
    return h('div', { className: 'cc__controls' }, [
      h('button', { className: 'btn btn--ghost btn--small', type: 'button', onClick: () => this.confirmEndNow() }, '🛑 Terminer la partie'),
    ]);
  }

  confirmEndNow() {
    if (typeof confirm === 'function' && !confirm('Terminer la partie maintenant ?')) return;
    this.act({ a: 'endGameNow' });
  }

  updateCountdownUI() {
    if (!this.timerEl) return;
    if (!this.view?.phaseDeadline) { this.timerEl.textContent = ''; return; }
    const remaining = this.view.phaseDeadline - Date.now();
    this.timerEl.textContent = `⏱️ ${fmtCountdown(remaining)}`;
  }

  /* ============================== PHASE CACHE — écran du Chasseur (attente) ============================== */

  renderHunterWaiting(view) {
    const list = h('div', { className: 'cc__waiting-list' }, view.hidersStatus.map((p) => h('div', { className: 'cc__waiting-row' }, [
      h('span', {}, p.pseudo),
      h('span', { className: p.locked ? 'tag tag--ok' : 'tag' }, p.locked ? '🔒 prêt·e' : '✏️ se cache…'),
    ])));
    const main = h('div', { className: 'cc__blackout' }, h('div', { className: 'cc__blackout-inner' }, [
      h('div', { className: 'cc__blackout-eye' }, '🙈'),
      h('p', {}, 'Les autres joueurs se cachent…'),
      h('p', { className: 'cc__hint' }, 'Tu ne verras ni la carte ni leur position avant le début de la chasse.'),
      list,
    ]));
    this.renderShell(main, { subtitle: 'Tu es le Chasseur — patiente 🙈' });
  }

  /* ============================== PHASE CACHE — écran des Cacheurs ============================== */

  renderHideStage(view) {
    const me = view.hiders.find((p) => p.id === this.ctx.me.id);
    this.myLocked = me?.locked ?? false;
    this.myColor = me?.color ?? DEFAULT_COLOR;
    this.myPos = { x: me?.x ?? 0.5, y: me?.y ?? 0.5 };
    this.otherHiders = new Map(view.hiders.filter((p) => p.id !== this.ctx.me.id).map((p) => [p.id, p]));

    this.stageCanvas = h('canvas', { className: 'cc__stage', width: String(STAGE_SIZE), height: String(STAGE_SIZE) });
    this.stageCtx = this.stageCanvas.getContext('2d');
    this.stageCanvas.addEventListener('click', (e) => this.onHideStageClick(e));

    const toolbar = h('div', { className: 'cc__toolbar' }, [
      h('button', {
        type: 'button', className: `cc__toolbtn cc__toolbtn--move${this.mode === 'deplacer' ? ' cc__toolbtn--active' : ''}`,
        onClick: () => this.setToolMode('deplacer'),
      }, '🚶 Déplacer'),
      h('button', {
        type: 'button', className: `cc__toolbtn cc__toolbtn--pipette${this.mode === 'pipette' ? ' cc__toolbtn--active' : ''}`,
        onClick: () => this.setToolMode('pipette'),
      }, '🎨 Pipette'),
      h('span', { className: 'cc__colorswatch', style: `background:${this.myColor};`, title: 'Ta couleur actuelle' }),
      h('button', {
        type: 'button', className: `cc__toolbtn cc__toolbtn--lock${this.myLocked ? ' cc__toolbtn--active' : ''}`,
        onClick: () => this.toggleLock(),
      }, this.myLocked ? '🔒 Verrouillé·e' : '🔓 Verrouiller'),
    ]);

    const main = h('div', { className: 'cc__stagewrap' }, [toolbar, this.stageCanvas]);
    this.renderShell(main, {
      subtitle: this.myLocked ? 'Position verrouillée — tu peux quand même changer de couleur.' : 'Place-toi et peins-toi pour te fondre dans le décor.',
    });
    this.loadMapAndDraw(view.mapId, () => this.redrawHideStage());
  }

  /** Bascule locale (mode outil / verrou) : met à jour uniquement les boutons concernés et
   * redessine le canevas, SANS reconstruire tout l'écran — sinon on re-dériverait l'état
   * (verrouillé, couleur, position) depuis la dernière vue réseau reçue, qui peut être
   * périmée d'un cran juste après une action optimiste locale, et l'écraserait aussitôt. */
  setToolMode(mode) {
    this.mode = mode;
    this.root.querySelector('.cc__toolbtn--move')?.classList.toggle('cc__toolbtn--active', mode === 'deplacer');
    this.root.querySelector('.cc__toolbtn--pipette')?.classList.toggle('cc__toolbtn--active', mode === 'pipette');
  }

  toggleLock() {
    const next = !this.myLocked;
    this.act({ a: 'updateHiderState', patch: { locked: next } });
    this.myLocked = next;
    const btn = this.root.querySelector('.cc__toolbtn--lock');
    if (btn) { btn.textContent = next ? '🔒 Verrouillé·e' : '🔓 Verrouiller'; btn.classList.toggle('cc__toolbtn--active', next); }
    this.setStatus(next ? 'Position verrouillée.' : 'Position déverrouillée.');
  }

  onHideStageClick(e) {
    const { x, y } = this.pointerToNormalized(e, this.stageCanvas);
    if (this.mode === 'pipette') {
      const color = this.sampleColorAt(x, y);
      if (color) {
        this.myColor = color;
        this.act({ a: 'updateHiderState', patch: { color } });
        this.redrawHideStage();
        const swatch = this.root.querySelector('.cc__colorswatch');
        if (swatch) swatch.style.background = color;
      }
      return;
    }
    if (this.myLocked) { this.setStatus('Déverrouille pour te déplacer.'); return; }
    // Bornage au placement seulement : le tir et le viseur du Chasseur, eux,
    // doivent rester libres jusqu'aux bords.
    this.myPos = poserPerso(x, y);
    this.throttledSendMove(x, y);
    this.redrawHideStage();
  }

  throttledSendMove(x, y) {
    const now = Date.now();
    if (now - this._lastMoveSentAt < 120) {
      clearTimeout(this._moveSendTimer);
      this._moveSendTimer = setTimeout(() => this.throttledSendMove(this.myPos.x, this.myPos.y), 130);
      return;
    }
    this._lastMoveSentAt = now;
    this.act({ a: 'updateHiderState', patch: { x, y } });
  }

  /* ============================== PHASE CHASSE (Chasseur + spectateurs) ============================== */

  renderHuntStage(view) {
    this.stageCanvas = h('canvas', { className: 'cc__stage', width: String(STAGE_SIZE), height: String(STAGE_SIZE) });
    this.stageCtx = this.stageCanvas.getContext('2d');
    this.huntHiders = new Map(view.hiders.map((p) => [p.id, p]));
    this.huntShots = [...view.shots];
    if (view.isHunter) {
      this.stageCanvas.addEventListener('click', (e) => this.onHuntStageClick(e));
      this.stageCanvas.addEventListener('mousemove', (e) => this.onHuntStageMove(e));
    }
    const toolbar = h('div', { className: 'cc__toolbar' }, [
      h('span', { className: 'cc__bullets' }, `🔫 ${view.bullets} munition${view.bullets > 1 ? 's' : ''}`),
      h('span', { className: 'cc__hint' }, view.isHunter ? 'Clique sur le décor pour tirer.' : `👀 Tu regardes ${view.hunterPseudo} chercher…`),
    ]);
    const main = h('div', { className: 'cc__stagewrap' }, [toolbar, this.stageCanvas]);
    this.renderShell(main, { subtitle: view.isHunter ? 'Repère les joueurs camouflés et tire !' : `${view.hunterPseudo} est en train de chercher.` });
    this.loadMapAndDraw(view.mapId, () => this.redrawHuntStage());
  }

  onHuntStageClick(e) {
    if (!this.view || (this.view.bullets ?? 0) <= 0) return;
    const { x, y } = this.pointerToNormalized(e, this.stageCanvas);
    this.act({ a: 'shoot', x, y });
  }

  onHuntStageMove(e) {
    const { x, y } = this.pointerToNormalized(e, this.stageCanvas);
    const now = Date.now();
    if (now - this._lastCursorSentAt < 90) return;
    this._lastCursorSentAt = now;
    this.act({ a: 'cursor', x, y });
  }

  /* ============================== RÉSULTAT DE MANCHE / FINAL ============================== */

  renderRoundResult(view) {
    const rows = view.hiders.map((p) => h('div', { className: 'cc__result-row' }, [
      h('span', {}, p.pseudo),
      h('span', { className: p.found ? 'tag tag--bad' : 'tag tag--ok' }, p.found ? '🎯 trouvé·e' : '🙈 pas trouvé·e'),
    ]));
    const found = view.hiders.filter((p) => p.found).length;
    const main = h('div', { className: 'cc__result' }, [
      h('h3', {}, `🏁 Fin de la manche ${view.round}/${view.totalRounds}`),
      h('p', {}, `${view.hunterPseudo} a trouvé ${found}/${view.hiders.length} joueur${view.hiders.length > 1 ? 's' : ''}.`),
      ...rows,
      h('p', { className: 'cc__hint' }, 'Manche suivante dans quelques secondes…'),
    ]);
    this.renderShell(main, { subtitle: 'Résultat de la manche' });
  }

  renderFinal(view) {
    const podium = view.scores.map((s, i) => h('div', { className: 'cc__final-row' }, [
      h('span', { className: 'cc__final-rank' }, i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : `${i + 1}.`),
      h('span', { className: 'cc__final-name' }, s.pseudo),
      h('span', { className: 'cc__final-pts' }, `${s.score} pts`),
    ]));
    const main = h('div', { className: 'cc__result' }, [h('h3', {}, '🏆 Classement final'), ...podium]);
    this.renderShell(main, { subtitle: 'Retour au salon dans quelques secondes…' });
  }

  /* ============================== CANEVAS : CHARGEMENT DE CARTE, DESSIN, ÉCHANTILLONNAGE ============================== */

  loadMapAndDraw(mapId, cb) {
    if (this.mapImageId === mapId && this.mapImage) { cb(); return; }
    const img = new Image();
    img.onload = () => {
      this.mapImage = img; this.mapImageId = mapId;
      this.baseCanvas = document.createElement('canvas');
      this.baseCanvas.width = STAGE_SIZE; this.baseCanvas.height = STAGE_SIZE;
      drawImageCover(this.baseCanvas.getContext('2d'), img, STAGE_SIZE);
      cb();
    };
    img.onerror = () => this.setStatus('Impossible de charger la carte.');
    img.src = mapUrl(mapId);
  }

  sampleColorAt(x, y) {
    if (!this.baseCanvas) return null;
    try {
      const px = Math.min(STAGE_SIZE - 1, Math.max(0, Math.floor(x * STAGE_SIZE)));
      const py = Math.min(STAGE_SIZE - 1, Math.max(0, Math.floor(y * STAGE_SIZE)));
      const d = this.baseCanvas.getContext('2d').getImageData(px, py, 1, 1).data;
      return `#${[d[0], d[1], d[2]].map((v) => v.toString(16).padStart(2, '0')).join('')}`;
    } catch { return null; }
  }

  pointerToNormalized(e, canvas) {
    const rect = canvas.getBoundingClientRect();
    return { x: clamp01((e.clientX - rect.left) / rect.width), y: clamp01((e.clientY - rect.top) / rect.height) };
  }

  redrawHideStage() {
    if (!this.stageCtx || !this.baseCanvas) return;
    const ctx = this.stageCtx;
    ctx.clearRect(0, 0, STAGE_SIZE, STAGE_SIZE);
    ctx.drawImage(this.baseCanvas, 0, 0);
    for (const p of this.otherHiders.values()) drawCharacter(ctx, STAGE_SIZE, p.x, p.y, p.color, { locked: p.locked, dim: true });
    drawCharacter(ctx, STAGE_SIZE, this.myPos.x, this.myPos.y, this.myColor, { locked: this.myLocked });
  }

  redrawHuntStage() {
    if (!this.stageCtx || !this.baseCanvas) return;
    const ctx = this.stageCtx;
    ctx.clearRect(0, 0, STAGE_SIZE, STAGE_SIZE);
    ctx.drawImage(this.baseCanvas, 0, 0);
    for (const p of this.huntHiders.values()) drawCharacter(ctx, STAGE_SIZE, p.x, p.y, p.color, { found: p.found });
    for (const s of this.huntShots) drawSplat(ctx, STAGE_SIZE, s.x, s.y, s.hit);
    if (this.hunterCursor && this.view && !this.view.isHunter) drawCrosshair(ctx, STAGE_SIZE, this.hunterCursor.x, this.hunterCursor.y);
  }
}

const CSS = `
.cc { height:100%; display:flex; flex-direction:column; gap:12px; color:var(--text,#e8ecff); font-family:inherit; }
.cc *{ box-sizing:border-box; }
.cc button{ font-family:inherit; cursor:pointer; }
.cc .btn{ padding:9px 14px; border-radius:var(--radius-m,12px); border:1px solid var(--glass-border,rgba(255,255,255,.14)); background:var(--glass,rgba(255,255,255,.06)); color:var(--text,#e8ecff); font-size:.86rem; font-weight:600; transition:transform .12s ease, background .12s ease; }
.cc .btn:hover{ transform:translateY(-1px); background:rgba(255,255,255,.1); }
.cc .btn--primary{ background:linear-gradient(135deg,var(--accent-2,#29d3c2),var(--accent,#7c5cff)); border-color:transparent; color:#0b0b12; }
.cc .btn--ghost{ background:transparent; }
.cc .btn--small{ padding:6px 10px; font-size:.78rem; }
.cc .tag{ font-size:.72rem; padding:2px 8px; border-radius:999px; background:rgba(255,255,255,.08); color:var(--text-dim,#aab); }
.cc .tag--ok{ background:rgba(41,211,194,.18); color:var(--accent-2,#29d3c2); }
.cc .tag--bad{ background:rgba(255,61,90,.18); color:#ff5c7a; }

.cc__header{ display:flex; align-items:center; justify-content:space-between; }
.cc__title{ font-weight:700; display:flex; align-items:center; gap:10px; }
.cc__subtitle{ font-weight:400; font-size:.8rem; color:var(--text-dim,#aab); }
.cc__timer{ font-variant-numeric:tabular-nums; font-size:1.05rem; font-weight:800; padding:5px 12px; border-radius:var(--radius-s,10px); background:rgba(0,0,0,.35); border:1px solid var(--glass-border,rgba(255,255,255,.1)); }

.cc__layout{ flex:1; min-height:0; display:grid; grid-template-columns:1fr 280px; gap:14px; }
.cc__side{ display:flex; flex-direction:column; gap:12px; min-height:0; overflow:auto; }
.cc__panel{ background:var(--glass,rgba(255,255,255,.05)); border:1px solid var(--glass-border,rgba(255,255,255,.09)); border-radius:var(--radius-m,14px); padding:12px; display:flex; flex-direction:column; gap:8px; }
.cc__panel strong{ font-size:.85rem; }
.cc__status{ min-height:1.3em; text-align:center; font-size:.86rem; font-weight:600; color:var(--accent-2,#29d3c2); }
.cc__controls{ display:flex; justify-content:center; }

.cc__stagewrap{ display:flex; flex-direction:column; gap:10px; align-items:center; min-height:0; }
.cc__toolbar{ display:flex; align-items:center; gap:8px; flex-wrap:wrap; justify-content:center; }
.cc__toolbtn{ padding:7px 12px; border-radius:999px; border:1px solid var(--glass-border,rgba(255,255,255,.14)); background:rgba(255,255,255,.04); color:var(--text,#e8ecff); font-size:.8rem; font-weight:600; }
.cc__toolbtn--active{ background:linear-gradient(135deg,var(--accent-2,#29d3c2),var(--accent,#7c5cff)); color:#0b0b12; border-color:transparent; }
.cc__colorswatch{ width:26px; height:26px; border-radius:50%; border:2px solid rgba(255,255,255,.5); box-shadow:0 0 0 1px rgba(0,0,0,.4); }
.cc__bullets{ font-weight:700; font-size:.85rem; }
.cc__hint{ font-size:.78rem; color:var(--text-dim,#aab); text-align:center; }
/* Le canevas contient une image CARRÉE (900x900). Sa boîte doit donc rester
   carrée, sinon le navigateur étire le contenu : personnages aplatis et
   apparemment décalés vers le haut.
   Piège corrigé : « aspect-ratio:1/1 » avec « max-height:64vh » se
   contredisent — le ratio veut une hauteur égale à la largeur, le max-height
   la rabote (écrasement de 23 % sur un portable 1366x768, 40 % sur une fenêtre
   basse). La limite de hauteur est donc intégrée À LA LARGEUR : le carré est
   alors toujours respecté, quelle que soit la fenêtre. */
.cc__stage{ width:min(640px,100%,64vh); aspect-ratio:1/1; border-radius:14px; box-shadow:0 10px 30px rgba(0,0,0,.4); cursor:crosshair; background:#111; }

.cc__blackout{ flex:1; display:flex; align-items:center; justify-content:center; width:100%; min-height:280px; background:#05050a; border-radius:14px; }
.cc__blackout-inner{ text-align:center; display:flex; flex-direction:column; align-items:center; gap:6px; padding:24px; }
.cc__blackout-eye{ font-size:2.4rem; margin-bottom:6px; }
.cc__waiting-list{ margin-top:10px; display:flex; flex-direction:column; gap:6px; min-width:220px; }
.cc__waiting-row{ display:flex; align-items:center; justify-content:space-between; gap:10px; font-size:.85rem; background:rgba(255,255,255,.05); padding:6px 10px; border-radius:8px; }

.cc__result, .cc__final-row + .cc__final-row{ }
.cc__result{ background:var(--glass,rgba(255,255,255,.05)); border:1px solid var(--glass-border,rgba(255,255,255,.09)); border-radius:var(--radius-m,14px); padding:20px; width:min(480px,100%); margin:auto; text-align:center; }
.cc__result h3{ margin:0 0 8px; }
.cc__result-row{ display:flex; align-items:center; justify-content:space-between; padding:6px 4px; border-bottom:1px solid rgba(255,255,255,.06); font-size:.86rem; }
.cc__final-row{ display:grid; grid-template-columns:34px 1fr auto; align-items:center; gap:8px; padding:7px 4px; font-size:.9rem; border-bottom:1px solid rgba(255,255,255,.06); text-align:left; }
.cc__final-pts{ font-weight:700; color:var(--accent-2,#29d3c2); }

.cc__scoretable{ width:100%; border-collapse:collapse; font-size:.82rem; }
.cc__scoretable td{ padding:4px 2px; }
.cc__scoretable-pts{ text-align:right; font-weight:700; color:var(--accent-2,#29d3c2); }
.cc__scoretable-row--me td{ color:var(--text,#e8ecff); font-weight:700; }

.cc__chat{ display:flex; flex-direction:column; gap:8px; }
.cc__chat-messages{ display:flex; flex-direction:column; gap:8px; max-height:170px; overflow-y:auto; padding-right:2px; }
.cc__chat-empty{ color:var(--text-faint,#616880); font-size:.78rem; font-style:italic; text-align:center; padding:6px 0; }
.cc__chat-msg{ display:flex; gap:8px; }
.cc__chat-msg__avatar{ font-size:1.1rem; line-height:1.5; }
.cc__chat-msg__head{ display:flex; align-items:baseline; gap:6px; flex-wrap:wrap; }
.cc__chat-msg__pseudo{ font-weight:600; font-size:.82rem; }
.cc__chat-msg__time{ font-size:.68rem; color:var(--text-faint,#616880); }
.cc__chat-msg__text{ margin:1px 0 0; font-size:.85rem; color:var(--text-dim,#aab); overflow-wrap:anywhere; }
.cc__chat-form{ display:flex; gap:8px; }
.cc__chat-form input{ flex:1; min-width:0; padding:8px 10px; font:inherit; font-size:.85rem; color:var(--text,#e8ecff); background:rgba(0,0,0,.35); border:1px solid var(--glass-border,rgba(255,255,255,.12)); border-radius:var(--radius-s,10px); }

@media (max-width:1000px){
  .cc__layout{ grid-template-columns:1fr; }
}
`;

let instance = null;
export default {
  async mount(container, context) {
    instance = new CacheCacheUI(container, context);
    instance.mount();
  },
  async unmount() {
    instance?.unmount();
    instance = null;
  },
};
