/**
 * AdminService — supervision de la plateforme.
 *
 * Collecte tout ce que la page programmeur affiche : clients connectés (adresse
 * IP, agent, salon, latence), santé du serveur (mémoire, charge, retard de la
 * boucle d'événements), salons, et un historique glissant pour les courbes.
 *
 * Accès protégé par un code, VÉRIFIÉ ICI (jamais côté client) et protégé contre
 * la force brute : un code à six chiffres, c'est un million de combinaisons —
 * sans limitation, on le trouve en quelques minutes par socket.
 */
import os from 'node:os';

const CODE = String(process.env.ADMIN_CODE || '200307');
const MAX_ESSAIS = 5;                 // par adresse IP
const FENETRE_ESSAIS_MS = 15 * 60_000;
const HISTORIQUE = 90;                // ~3 minutes d'échantillons
const ECHANTILLON_MS = 2000;
const PING_MS = 5000;

/** Adresse réelle du client : derrière le proxy de Render, c'est cet en-tête. */
export function ipDe(socket) {
  const fwd = socket.handshake.headers['x-forwarded-for'];
  if (typeof fwd === 'string' && fwd.length) return fwd.split(',')[0].trim();
  const addr = socket.handshake.address ?? '';
  return addr.replace(/^::ffff:/, '') || 'inconnue';
}

/** Agent utilisateur résumé : « Chrome 126 · Windows », pas la chaîne brute illisible. */
function agentDe(socket) {
  const ua = socket.handshake.headers['user-agent'] ?? '';
  const nav = /Edg\/(\d+)/.exec(ua) ? `Edge ${/Edg\/(\d+)/.exec(ua)[1]}`
    : /OPR\/(\d+)/.exec(ua) ? `Opera ${/OPR\/(\d+)/.exec(ua)[1]}`
      : /Firefox\/(\d+)/.exec(ua) ? `Firefox ${/Firefox\/(\d+)/.exec(ua)[1]}`
        : /Chrome\/(\d+)/.exec(ua) ? `Chrome ${/Chrome\/(\d+)/.exec(ua)[1]}`
          : /Version\/(\d+).*Safari/.exec(ua) ? `Safari ${/Version\/(\d+).*Safari/.exec(ua)[1]}`
            : 'inconnu';
  const os_ = /Android/.test(ua) ? 'Android'
    : /iPhone|iPad/.test(ua) ? 'iOS'
      : /Windows/.test(ua) ? 'Windows'
        : /Mac OS X/.test(ua) ? 'macOS'
          : /Linux/.test(ua) ? 'Linux'
            : '?';
  const mobile = /Mobi|Android|iPhone/.test(ua);
  return { nav, os: os_, mobile, brut: ua.slice(0, 180) };
}

export class AdminService {
  constructor({ io, users, rooms, gameRegistry }) {
    this.io = io;
    this.users = users;
    this.rooms = rooms;
    this.gameRegistry = gameRegistry;

    this.demarre = Date.now();
    this.clients = new Map();     // socketId -> { ip, agent, depuis, rtt, pings, messages }
    this.essais = new Map();      // ip -> { n, jusqu_a }
    this.admins = new Set();      // sockets authentifiés
    this.historique = [];         // [{ t, clients, rss, rttMoy, lag, salons }]
    this.pics = { clients: 0, rss: 0, rtt: 0 };
    this.totaux = { connexions: 0, refusAdmin: 0, parties: 0, messages: 0 };

    this.lagRef = process.hrtime.bigint();
    this.lag = 0;
    this.mesurerLag();
    this.timerEchantillon = setInterval(() => this.echantillonner(), ECHANTILLON_MS);
    this.timerPing = setInterval(() => this.pinger(), PING_MS);
  }

  /** Retard de la boucle d'événements : le vrai signal de saturation d'un Node. */
  mesurerLag() {
    const attendu = 500;
    setInterval(() => {
      const t = process.hrtime.bigint();
      const ecoule = Number(t - this.lagRef) / 1e6;
      this.lag = Math.max(0, ecoule - attendu);
      this.lagRef = t;
    }, attendu).unref?.();
  }

  /* ------------------------- cycle de vie des sockets ------------------------- */

  onConnect(socket) {
    this.totaux.connexions += 1;
    this.clients.set(socket.id, {
      ip: ipDe(socket),
      agent: agentDe(socket),
      depuis: Date.now(),
      rtt: null,
      transport: socket.conn?.transport?.name ?? '?',
      messages: 0,
    });
  }

  onDisconnect(socket) {
    this.clients.delete(socket.id);
    this.admins.delete(socket.id);
  }

  onMessage(socketId) {
    const c = this.clients.get(socketId);
    if (c) c.messages += 1;
    this.totaux.messages += 1;
  }

  onGameStart() { this.totaux.parties += 1; }

  /* ------------------------- latence ------------------------- */

  pinger() {
    const t = Date.now();
    for (const [id, socket] of this.io.sockets.sockets) {
      if (!this.clients.has(id)) continue;
      socket.emit('sys:ping', { t });
    }
  }

  onPong(socket, { t } = {}) {
    const c = this.clients.get(socket.id);
    if (!c || typeof t !== 'number') return;
    const rtt = Date.now() - t;
    if (rtt >= 0 && rtt < 60_000) {
      c.rtt = rtt;
      c.transport = socket.conn?.transport?.name ?? c.transport;
      if (rtt > this.pics.rtt) this.pics.rtt = rtt;
    }
  }

  /* ------------------------- authentification ------------------------- */

  /**
   * Vérification du code, côté serveur, avec limitation par IP.
   * @returns {{ok: boolean, error?: string, reste?: number}}
   */
  auth(socket, code) {
    const ip = ipDe(socket);
    const now = Date.now();
    const e = this.essais.get(ip);
    if (e && e.jusqu_a > now && e.n >= MAX_ESSAIS) {
      return { ok: false, error: `Trop de tentatives. Réessayez dans ${Math.ceil((e.jusqu_a - now) / 60_000)} min.` };
    }
    if (String(code ?? '') !== CODE) {
      const n = (e && e.jusqu_a > now ? e.n : 0) + 1;
      this.essais.set(ip, { n, jusqu_a: now + FENETRE_ESSAIS_MS });
      this.totaux.refusAdmin += 1;
      return { ok: false, error: 'Code incorrect.', reste: Math.max(0, MAX_ESSAIS - n) };
    }
    this.essais.delete(ip);
    this.admins.add(socket.id);
    return { ok: true };
  }

  estAdmin(socketId) { return this.admins.has(socketId); }
  quitter(socketId) { this.admins.delete(socketId); }

  /* ------------------------- métriques ------------------------- */

  rttMoyen() {
    const v = [...this.clients.values()].map((c) => c.rtt).filter((r) => typeof r === 'number');
    if (!v.length) return null;
    return Math.round(v.reduce((s, x) => s + x, 0) / v.length);
  }

  echantillonner() {
    const mem = process.memoryUsage();
    const rss = Math.round(mem.rss / 1048576);
    const clients = this.clients.size;
    if (clients > this.pics.clients) this.pics.clients = clients;
    if (rss > this.pics.rss) this.pics.rss = rss;
    this.historique.push({
      t: Date.now(),
      clients,
      rss,
      rttMoy: this.rttMoyen(),
      lag: Math.round(this.lag),
      salons: this.rooms.listSummaries().length,
    });
    if (this.historique.length > HISTORIQUE) this.historique.shift();
  }

  /** Instantané complet — c'est ce que la page programmeur affiche. */
  stats() {
    const mem = process.memoryUsage();
    const salons = this.rooms.listSummaries();
    const now = Date.now();

    const clients = [...this.clients.entries()].map(([id, c]) => {
      const u = this.users.get(id);
      return {
        socketId: id,
        ip: c.ip,
        pseudo: u?.pseudo ?? null,
        avatar: u?.avatar ?? null,
        couleur: u?.color ?? null,
        statut: u?.status ?? 'non enregistré',
        salon: u?.roomId ? (this.rooms.get(u.roomId)?.name ?? u.roomId) : null,
        navigateur: c.agent.nav,
        os: c.agent.os,
        mobile: c.agent.mobile,
        userAgent: c.agent.brut,
        transport: c.transport,
        rtt: c.rtt,
        depuis: c.depuis,
        anciennete: now - c.depuis,
        messages: c.messages,
        admin: this.admins.has(id),
      };
    }).sort((a, b) => a.depuis - b.depuis);

    const cpus = os.cpus();
    return {
      serveur: {
        uptime: Math.round((now - this.demarre) / 1000),
        uptimeProcess: Math.round(process.uptime()),
        node: process.version,
        plateforme: `${os.type()} ${os.release()} (${os.arch()})`,
        coeurs: cpus.length,
        modele: cpus[0]?.model ?? '?',
        charge: os.loadavg().map((x) => Math.round(x * 100) / 100),
        memoire: {
          rss: Math.round(mem.rss / 1048576),
          heapUsed: Math.round(mem.heapUsed / 1048576),
          heapTotal: Math.round(mem.heapTotal / 1048576),
          systemeTotal: Math.round(os.totalmem() / 1048576),
          systemeLibre: Math.round(os.freemem() / 1048576),
        },
        lag: Math.round(this.lag),
        pid: process.pid,
      },
      capacite: {
        clients: this.clients.size,
        // Estimation honnête : ce que le RSS et le retard de boucle laissent supposer.
        chargeCPU: Math.min(100, Math.round((this.lag / 200) * 100)),
        chargeMem: Math.round((mem.rss / 1048576) / (os.totalmem() / 1048576) * 100),
        pics: { ...this.pics },
      },
      reseau: {
        rttMoyen: this.rttMoyen(),
        rttMax: Math.max(0, ...clients.map((c) => c.rtt ?? 0)),
        transports: clients.reduce((acc, c) => { acc[c.transport] = (acc[c.transport] ?? 0) + 1; return acc; }, {}),
      },
      totaux: { ...this.totaux, jeux: this.gameRegistry.all().length },
      clients,
      salons: salons.map((s) => ({ ...s })),
      historique: this.historique,
    };
  }

  /** Diffusion aux seuls sockets authentifiés. */
  diffuser() {
    if (!this.admins.size) return;
    const payload = this.stats();
    for (const id of this.admins) {
      this.io.sockets.sockets.get(id)?.emit('admin:stats', payload);
    }
  }

  stop() {
    clearInterval(this.timerEchantillon);
    clearInterval(this.timerPing);
  }
}
