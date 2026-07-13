/**
 * Page programmeur — tableau de bord de supervision.
 *
 * Ouverte depuis Paramètres, après saisie du code. Le code est vérifié par le
 * SERVEUR (avec limitation par IP) : ce fichier ne contient aucun secret, et
 * masquer le bouton n'a jamais protégé personne.
 *
 * Rafraîchi par l'événement `admin:stats` (toutes les 2 s, uniquement tant que
 * quelqu'un regarde).
 */
import { bus } from '../core/EventBus.js';

const CSS = `
.dev { position: fixed; inset: 0; z-index: 900; background: #070a12; color: #e8ecff; overflow: auto; padding: 18px; font-size: .9rem; }
.dev__top { display: flex; align-items: center; gap: 12px; flex-wrap: wrap; margin-bottom: 14px; }
.dev__top h2 { margin: 0; font-size: 1.15rem; }
.dev__tag { font-size: .72rem; padding: 2px 8px; border-radius: 99px; background: rgba(255,180,84,.16); border: 1px solid rgba(255,180,84,.45); color: #ffb454; }
.dev__close { margin-left: auto; }
.dev__grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(190px, 1fr)); gap: 10px; margin-bottom: 14px; }
.dev__kpi { background: rgba(255,255,255,.05); border: 1px solid rgba(255,255,255,.09); border-radius: 12px; padding: 10px 12px; }
.dev__kpi b { display: block; font-size: 1.5rem; font-weight: 800; line-height: 1.2; }
.dev__kpi span { font-size: .76rem; color: #99a; text-transform: uppercase; letter-spacing: .04em; }
.dev__kpi small { display: block; font-size: .74rem; color: #7f88a3; margin-top: 3px; }
.dev__kpi--warn b { color: #ffb454; }
.dev__kpi--bad b { color: #ff6b6b; }
.dev__panel { background: rgba(255,255,255,.04); border: 1px solid rgba(255,255,255,.09); border-radius: 14px; padding: 12px 14px; margin-bottom: 14px; }
.dev__panel h3 { margin: 0 0 10px; font-size: .95rem; }
.dev table { width: 100%; border-collapse: collapse; font-size: .82rem; }
.dev th { text-align: left; color: #99a; font-weight: 600; padding: 5px 8px; border-bottom: 1px solid rgba(255,255,255,.1); white-space: nowrap; }
.dev td { padding: 6px 8px; border-bottom: 1px solid rgba(255,255,255,.05); white-space: nowrap; }
.dev td.mono { font-family: ui-monospace, monospace; font-size: .78rem; color: #b9c2dd; }
.dev tr:hover td { background: rgba(255,255,255,.03); }
.dev__dot { display: inline-block; width: 9px; height: 9px; border-radius: 50%; margin-right: 6px; }
.dev__charts { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 10px; }
.dev__chart { background: rgba(255,255,255,.04); border: 1px solid rgba(255,255,255,.09); border-radius: 12px; padding: 10px; }
.dev__chart h4 { margin: 0 0 6px; font-size: .8rem; color: #99a; font-weight: 600; }
.dev__chart canvas { width: 100%; height: 70px; display: block; }
.dev__auth { max-width: 380px; margin: 12vh auto; display: grid; gap: 10px; }
.dev__auth input { background: rgba(0,0,0,.35); border: 1px solid rgba(255,255,255,.15); color: inherit; border-radius: 10px; padding: 10px 12px; font-size: 1.1rem; letter-spacing: .35em; text-align: center; }
.dev__err { color: #ff6b6b; font-size: .84rem; min-height: 1.2em; text-align: center; }
`;

function h(tag, props = {}, children = []) {
  const n = document.createElement(tag);
  Object.entries(props).forEach(([k, v]) => {
    if (v === undefined || v === null || v === false) return;
    if (k === 'className') n.className = v;
    else if (k === 'style') n.style.cssText = v;
    else if (k.startsWith('on')) n.addEventListener(k.slice(2).toLowerCase(), v);
    else n.setAttribute(k, v);
  });
  (Array.isArray(children) ? children : [children]).forEach((c) => {
    if (c === null || c === undefined || c === false) return;
    n.append(typeof c === 'string' || typeof c === 'number' ? document.createTextNode(String(c)) : c);
  });
  return n;
}

const duree = (ms) => {
  const s = Math.floor(ms / 1000);
  if (s < 60) return `${s} s`;
  if (s < 3600) return `${Math.floor(s / 60)} min ${s % 60} s`;
  const hh = Math.floor(s / 3600);
  return `${hh} h ${Math.floor((s % 3600) / 60)} min`;
};

/** Mini-courbe : l'historique glissant envoyé par le serveur. */
function sparkline(canvas, valeurs, couleur, suffixe = '') {
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const w = canvas.clientWidth || 260;
  const hgt = 70;
  canvas.width = w * dpr;
  canvas.height = hgt * dpr;
  const g = canvas.getContext('2d');
  g.setTransform(dpr, 0, 0, dpr, 0, 0);
  g.clearRect(0, 0, w, hgt);

  const pts = valeurs.filter((v) => typeof v === 'number');
  if (pts.length < 2) {
    g.fillStyle = '#667';
    g.font = '12px sans-serif';
    g.fillText('collecte en cours…', 8, 38);
    return;
  }
  const max = Math.max(...pts, 1);
  const min = Math.min(...pts, 0);
  const X = (i) => (i / (valeurs.length - 1)) * (w - 4) + 2;
  const Y = (v) => hgt - 6 - ((v - min) / (max - min || 1)) * (hgt - 18);

  g.strokeStyle = 'rgba(255,255,255,.07)';
  g.beginPath(); g.moveTo(0, hgt - 6); g.lineTo(w, hgt - 6); g.stroke();

  g.beginPath();
  valeurs.forEach((v, i) => {
    if (typeof v !== 'number') return;
    const x = X(i); const y = Y(v);
    if (i === 0 || typeof valeurs[i - 1] !== 'number') g.moveTo(x, y); else g.lineTo(x, y);
  });
  g.strokeStyle = couleur;
  g.lineWidth = 2;
  g.stroke();

  g.lineTo(X(valeurs.length - 1), hgt - 6);
  g.lineTo(X(0), hgt - 6);
  g.closePath();
  g.fillStyle = `${couleur}22`;
  g.fill();

  g.fillStyle = '#e8ecff';
  g.font = 'bold 13px sans-serif';
  g.fillText(`${pts[pts.length - 1]}${suffixe}`, 6, 16);
  g.fillStyle = '#778';
  g.font = '11px sans-serif';
  g.fillText(`max ${max}${suffixe}`, w - 60, 16);
}

class DevPanel {
  constructor(socket) {
    this.socket = socket;
    this.stats = null;
    this.root = null;
  }

  open() {
    this.style = h('style', {}, CSS);
    this.root = h('div', { className: 'dev' });
    document.body.append(this.style, this.root);

    this.onEsc = (e) => { if (e.key === 'Escape') this.close(); };
    window.addEventListener('keydown', this.onEsc);

    this.offAuth = bus.on('admin:authed', (res) => this.onAuth(res));
    this.offStats = bus.on('admin:stats', (s) => { this.stats = s; this.render(); });

    this.renderAuth();
  }

  close() {
    this.socket.adminLeave();
    this.offAuth?.();
    this.offStats?.();
    window.removeEventListener('keydown', this.onEsc);
    this.style?.remove();
    this.root?.remove();
    this.root = null;
  }

  /* ---------------- authentification ---------------- */

  renderAuth() {
    const input = h('input', { type: 'password', inputmode: 'numeric', maxlength: '12', placeholder: '••••••', autocomplete: 'off' });
    this.errEl = h('div', { className: 'dev__err' });
    const valider = () => {
      const code = input.value.trim();
      if (!code) return;
      this.errEl.textContent = 'Vérification…';
      this.socket.adminAuth(code);
    };
    input.addEventListener('keydown', (e) => { if (e.key === 'Enter') valider(); });

    this.root.replaceChildren(h('div', { className: 'dev__auth' }, [
      h('h2', { style: 'text-align:center;margin:0' }, 'Espace programmeur'),
      h('p', { style: 'text-align:center;color:#99a;font-size:.85rem;margin:0' },
        'Accès restreint. Réservé au propriétaire du site.'),
      input,
      this.errEl,
      h('div', { style: 'display:flex;gap:8px;justify-content:center' }, [
        h('button', { className: 'btn btn--ghost', onClick: () => this.close() }, 'Annuler'),
        h('button', { className: 'btn btn--primary', onClick: valider }, 'Entrer'),
      ]),
    ]));
    setTimeout(() => input.focus(), 50);
  }

  onAuth(res) {
    if (res.ok) { this.authed = true; return; }
    if (this.errEl) {
      this.errEl.textContent = res.reste !== undefined
        ? `${res.error} (${res.reste} essai${res.reste > 1 ? 's' : ''} restant${res.reste > 1 ? 's' : ''})`
        : res.error;
    }
  }

  /* ---------------- tableau de bord ---------------- */

  render() {
    if (!this.root || !this.stats) return;
    const s = this.stats;
    const hist = s.historique;

    const kpi = (label, valeur, detail = null, niveau = '') => h('div', { className: `dev__kpi ${niveau}` }, [
      h('span', {}, label), h('b', {}, valeur), detail ? h('small', {}, detail) : null,
    ]);

    const rtt = s.reseau.rttMoyen;
    const niveauRtt = rtt === null ? '' : rtt > 300 ? 'dev__kpi--bad' : rtt > 120 ? 'dev__kpi--warn' : '';
    const niveauLag = s.serveur.lag > 120 ? 'dev__kpi--bad' : s.serveur.lag > 40 ? 'dev__kpi--warn' : '';
    const mem = s.serveur.memoire;

    const kpis = h('div', { className: 'dev__grid' }, [
      kpi('Clients connectés', s.capacite.clients, `pic : ${s.capacite.pics.clients}`),
      kpi('Ping moyen', rtt === null ? '—' : `${rtt} ms`, `max ${s.reseau.rttMax} ms`, niveauRtt),
      kpi('Retard boucle', `${s.serveur.lag} ms`, 'saturation Node', niveauLag),
      kpi('Mémoire (RSS)', `${mem.rss} Mo`, `heap ${mem.heapUsed}/${mem.heapTotal} Mo · pic ${s.capacite.pics.rss} Mo`),
      kpi('Salons', s.salons.length, `${s.salons.filter((r) => r.status === 'IN_GAME').length} en jeu`),
      kpi('Charge CPU', `${s.serveur.charge[0]}`, `${s.serveur.coeurs} cœur(s) · 5 min : ${s.serveur.charge[1]}`),
      kpi('Uptime', duree(s.serveur.uptimeProcess * 1000), `Node ${s.serveur.node}`),
      kpi('Depuis le démarrage', s.totaux.connexions, `${s.totaux.parties} parties · ${s.totaux.messages} messages`),
    ]);

    // Clients connectés — c'est le tableau que tu voulais.
    const tClients = h('table', {}, [
      h('thead', {}, h('tr', {}, ['Joueur', 'Adresse IP', 'Statut', 'Salon', 'Ping', 'Transport', 'Navigateur', 'Connecté depuis', 'Msg', 'Socket']
        .map((t) => h('th', {}, t)))),
      h('tbody', {}, s.clients.map((c) => h('tr', {}, [
        h('td', {}, [
          h('span', { className: 'dev__dot', style: `background:${c.couleur ?? '#556'}` }),
          c.pseudo ? `${c.avatar ?? ''} ${c.pseudo}` : h('i', { style: 'color:#778' }, 'non enregistré'),
          c.admin ? h('span', { className: 'dev__tag', style: 'margin-left:6px' }, 'DEV') : null,
        ]),
        h('td', { className: 'mono' }, c.ip),
        h('td', {}, c.statut),
        h('td', {}, c.salon ?? '—'),
        h('td', {
          style: c.rtt === null ? 'color:#778' : c.rtt > 300 ? 'color:#ff6b6b' : c.rtt > 120 ? 'color:#ffb454' : 'color:#50ef39',
        }, c.rtt === null ? '…' : `${c.rtt} ms`),
        h('td', { className: 'mono' }, c.transport),
        h('td', { title: c.userAgent }, `${c.navigateur} · ${c.os}${c.mobile ? ' 📱' : ''}`),
        h('td', {}, duree(c.anciennete)),
        h('td', {}, String(c.messages)),
        h('td', { className: 'mono', style: 'color:#667' }, c.socketId.slice(0, 8)),
      ]))),
    ]);

    const tSalons = s.salons.length ? h('table', {}, [
      h('thead', {}, h('tr', {}, ['Code', 'Nom', 'Jeu', 'Joueurs', 'État'].map((t) => h('th', {}, t)))),
      h('tbody', {}, s.salons.map((r) => h('tr', {}, [
        h('td', { className: 'mono' }, r.code ?? '—'),
        h('td', {}, r.name ?? '—'),
        h('td', {}, r.gameId ?? '—'),
        h('td', {}, `${r.playerCount ?? r.players?.length ?? 0} / ${r.maxPlayers ?? '?'}`),
        h('td', {}, r.status ?? '—'),
      ]))),
    ]) : h('div', { style: 'color:#778' }, 'Aucun salon ouvert.');

    const chart = (titre, valeurs, couleur, suffixe) => {
      const c = h('canvas');
      const box = h('div', { className: 'dev__chart' }, [h('h4', {}, titre), c]);
      requestAnimationFrame(() => sparkline(c, valeurs, couleur, suffixe));
      return box;
    };

    this.root.replaceChildren(
      h('div', { className: 'dev__top' }, [
        h('h2', {}, 'Espace programmeur'),
        h('span', { className: 'dev__tag' }, 'accès restreint'),
        h('span', { style: 'color:#778;font-size:.8rem' },
          `${s.serveur.plateforme} · ${s.serveur.coeurs} cœur(s) · PID ${s.serveur.pid} · ${mem.systemeLibre} Mo libres / ${mem.systemeTotal} Mo`),
        h('button', { className: 'btn btn--ghost dev__close', onClick: () => this.close() }, '✕ Fermer'),
      ]),
      kpis,
      h('div', { className: 'dev__panel' }, [
        h('h3', {}, `Clients connectés (${s.clients.length})`),
        tClients,
      ]),
      h('div', { className: 'dev__panel' }, [h('h3', {}, `Salons (${s.salons.length})`), tSalons]),
      h('div', { className: 'dev__panel' }, [
        h('h3', {}, 'Historique (3 min)'),
        h('div', { className: 'dev__charts' }, [
          chart('Clients connectés', hist.map((p) => p.clients), '#38fedc', ''),
          chart('Ping moyen', hist.map((p) => p.rttMoy), '#ffb454', ' ms'),
          chart('Mémoire RSS', hist.map((p) => p.rss), '#c86bff', ' Mo'),
          chart('Retard de boucle', hist.map((p) => p.lag), '#ff6b6b', ' ms'),
        ]),
      ]),
      h('p', { style: 'color:#667;font-size:.78rem' },
        'Propriétaire : Emmanuel BAILLY    Coprogrammeurs : Nathan GALLINIER et Jérémie PRESUTTO.'),
    );
  }
}

export function openDevPanel({ socket }) {
  new DevPanel(socket).open();
}
