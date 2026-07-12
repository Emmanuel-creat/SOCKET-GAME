/**
 * UNO — interface du module Arcade (les règles sont dans ./engine.js).
 *
 * Host autoritaire : le Host exécute le moteur et envoie à chaque joueur une
 * vue personnalisée (sa main + le nombre de cartes des autres). Les mains ne
 * sont jamais diffusées. Les autres clients envoient leurs actions au Host.
 */
import { UnoEngine, COLORS, COLOR_NAMES, SCORE_TARGETS } from './engine.js';

const UNO_WINDOW_MS = 6000; // fenêtre pour crier « Contre-UNO ! »

const CSS = `
.uno { display: grid; grid-template-columns: 1fr 300px; gap: 14px; height: 100%; min-height: 0; color: var(--text, #e8ecff); width: 100%; }
.uno__main { display: flex; flex-direction: column; gap: 12px; min-width: 0; min-height: 0; }
.uno__panel { background: var(--glass, rgba(255,255,255,.05)); border: 1px solid var(--glass-border, rgba(255,255,255,.09)); border-radius: var(--radius-m, 14px); padding: 12px 14px; }
.uno__head { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; }
.uno__head .sp { margin-left: auto; font-weight: 700; }
.uno__seats { display: flex; gap: 8px; flex-wrap: wrap; }
.uno__seat { display: flex; align-items: center; gap: 6px; padding: 6px 10px; border-radius: 10px; border: 1px solid var(--glass-border, rgba(255,255,255,.1)); background: rgba(0,0,0,.22); font-size: .84rem; }
.uno__seat--turn { border-color: var(--accent-2, #29d3c2); box-shadow: 0 0 0 1px var(--accent-2, #29d3c2) inset; }
.uno__seat .cnt { font-weight: 800; }
.uno__seat .uno-tag { font-size: .7rem; padding: 1px 6px; border-radius: 99px; background: #ffb454; color: #241a06; font-weight: 800; }
.uno__catch { border: none; border-radius: 99px; padding: 3px 8px; background: #ff4d4d; color: #fff; font-weight: 800; cursor: pointer; font-size: .72rem; animation: unoflash .6s infinite alternate; }
@keyframes unoflash { to { transform: scale(1.09); } }
.uno__table { flex: 1; display: flex; align-items: center; justify-content: center; gap: 26px; min-height: 190px; }
.uno__pile { display: flex; flex-direction: column; align-items: center; gap: 6px; font-size: .78rem; color: var(--text-dim, #aab); }
.uno-card { width: 74px; height: 108px; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-weight: 900; font-size: 1.05rem; color: #fff; text-shadow: 0 2px 3px rgba(0,0,0,.45); border: 3px solid #fff; box-shadow: 0 6px 14px rgba(0,0,0,.45); text-align: center; padding: 4px; line-height: 1.1; }
.uno-card--r { background: #e8433f; } .uno-card--j { background: #e3b924; } .uno-card--v { background: #3aa757; } .uno-card--b { background: #3b7dd8; }
.uno-card--w { background: linear-gradient(135deg,#e8433f 0 25%,#e3b924 25% 50%,#3aa757 50% 75%,#3b7dd8 75%); }
.uno-card--back { background: repeating-linear-gradient(45deg,#22283a,#22283a 6px,#2c344b 6px,#2c344b 12px); }
.uno__color { width: 22px; height: 22px; border-radius: 50%; display: inline-block; border: 2px solid #fff; vertical-align: middle; }
.uno__hand { display: flex; gap: 6px; flex-wrap: wrap; justify-content: center; max-height: 240px; overflow: auto; padding: 6px 2px; }
.uno__hand .uno-card { width: 64px; height: 94px; font-size: .92rem; cursor: pointer; transition: transform .12s; border-width: 2px; }
.uno__hand .uno-card:hover:not(.uno-card--off) { transform: translateY(-8px); }
.uno-card--off { opacity: .36; cursor: not-allowed; filter: grayscale(.5); }
.uno-card--sel { outline: 3px solid #fff; transform: translateY(-8px); }
.uno__actions { display: flex; gap: 8px; flex-wrap: wrap; justify-content: center; align-items: center; }
.uno__uno { border: none; border-radius: 12px; padding: 10px 20px; background: #ffb454; color: #241a06; font-weight: 900; font-size: 1rem; cursor: pointer; }
.uno__pick { display: flex; gap: 8px; justify-content: center; }
.uno__pick button { width: 46px; height: 46px; border-radius: 12px; border: 2px solid #fff; cursor: pointer; }
.uno__hint { font-size: .84rem; color: var(--text-dim, #aab); text-align: center; }
.uno__status { min-height: 1.2em; text-align: center; color: var(--warning, #ffb454); font-size: .85rem; }
.uno__side { display: flex; flex-direction: column; gap: 12px; min-height: 0; }
.uno__log { font-size: .8rem; color: var(--text-dim, #aab); max-height: 150px; overflow: auto; display: flex; flex-direction: column; gap: 3px; }
.uno-chat { display: flex; flex-direction: column; flex: 1; min-height: 150px; }
.uno-chat__log { flex: 1; overflow: auto; font-size: .84rem; display: flex; flex-direction: column; gap: 3px; }
.uno-chat__form { display: flex; gap: 6px; margin-top: 8px; }
.uno-chat__form input { flex: 1; min-width: 0; background: rgba(0,0,0,.3); border: 1px solid var(--glass-border, rgba(255,255,255,.12)); color: inherit; border-radius: 8px; padding: 7px 10px; }
.uno__setup { display: flex; flex-direction: column; gap: 8px; max-width: 460px; margin: 0 auto; text-align: left; }
.uno__setup label { display: flex; gap: 8px; align-items: center; background: rgba(0,0,0,.2); border: 1px solid var(--glass-border, rgba(255,255,255,.1)); border-radius: 10px; padding: 8px 10px; font-size: .86rem; cursor: pointer; }
.uno__reveal { display: flex; gap: 4px; flex-wrap: wrap; justify-content: center; margin-top: 6px; }
.uno__reveal .uno-card { width: 38px; height: 56px; font-size: .6rem; border-width: 2px; }
@media (max-width: 1050px) { .uno { grid-template-columns: 1fr; } }
`;

function h(tag, props = {}, children = []) {
  const node = document.createElement(tag);
  Object.entries(props).forEach(([k, v]) => {
    if (v === undefined || v === null || v === false) return;
    if (k === 'className') node.className = v;
    else if (k === 'style') node.style.cssText = v;
    else if (k.startsWith('on')) node.addEventListener(k.slice(2).toLowerCase(), v);
    else node.setAttribute(k, v);
  });
  (Array.isArray(children) ? children : [children]).forEach((c) => {
    if (c === null || c === undefined || c === false) return;
    node.append(typeof c === 'string' ? document.createTextNode(c) : c);
  });
  return node;
}

const FACE = { skip: '🚫', reverse: '🔄', draw2: '+2', wild: '🌈', wild4: '+4' };
const HEX = { r: '#e8433f', j: '#e3b924', v: '#3aa757', b: '#3b7dd8', w: '#666' };
const face = (card) => FACE[card.v] ?? card.v;

class UnoUI {
  constructor(container, context) {
    this.container = container;
    this.ctx = context;
    this.me = context.me;
    this.engine = null;
    this.unsubscribe = null;
    this.view = null;
    this.selected = null; // joker en attente d'un choix de couleur
    this.timers = { uno: null, status: null, end: null };
  }

  get hostId() { return this.ctx.hostId; }
  get isHost() { return this.ctx.me.id === this.ctx.hostId; }

  mount() {
    this.styleEl = h('style', {}, CSS);
    this.root = h('div', { className: 'uno' });
    this.container.append(this.styleEl, this.root);

    if (this.isHost) {
      try {
        this.engine = new UnoEngine(this.ctx.players, { hostId: this.ctx.hostId });
      } catch (error) {
        this.root.replaceChildren(h('div', { className: 'uno__panel', style: 'margin:auto;' }, `⚠️ ${error.message}`));
        return;
      }
      this.unsubscribe = this.ctx.onMessage(({ from, data }) => {
        if (data?.t === 'action') this.hostHandle(from, data.action);
      });
      this.broadcast();
    } else {
      this.unsubscribe = this.ctx.onMessage(({ from, data }) => {
        if (from !== this.hostId) return;
        if (data?.t === 'view') this.render(data.view);
        else if (data?.t === 'error') this.status(data.message);
      });
      this.root.replaceChildren(h('div', { className: 'uno__panel', style: 'margin:auto;' }, '⏳ Distribution en cours…'));
    }
  }

  /* -------- côté Host -------- */

  hostHandle(pid, action) {
    const res = this.engine.handleAction(pid, action);
    if (!res.ok) { this.ctx.sendMessage({ t: 'error', message: res.error }, pid); return; }
    this.afterEngine();
  }

  act(action) {
    if (this.isHost) {
      const res = this.engine.handleAction(this.me.id, action);
      if (!res.ok) { this.status(res.error); return; }
      this.afterEngine();
    } else {
      this.ctx.sendMessage({ t: 'action', action }, this.hostId);
    }
  }

  /** Après chaque action : la fenêtre « Contre-UNO » se referme d'elle-même. */
  afterEngine() {
    this.broadcast();
    clearTimeout(this.timers.uno);
    if (this.engine.unoWindow) {
      const { pid } = this.engine.unoWindow;
      this.timers.uno = setTimeout(() => {
        if (this.engine?.unoWindow?.pid === pid) {
          this.engine.closeUnoWindow();
          this.broadcast();
        }
      }, UNO_WINDOW_MS);
    }
    if (this.engine.phase === 'fin' && !this.timers.end) {
      const result = this.engine.summary();
      this.timers.end = setTimeout(() => this.ctx.onEnd(result), 6000);
    }
  }

  broadcast() {
    for (const p of this.engine.players) {
      if (p.id === this.me.id) continue;
      this.ctx.sendMessage({ t: 'view', view: this.engine.getViewFor(p.id) }, p.id);
    }
    this.render(this.engine.getViewFor(this.me.id));
  }

  status(message) {
    if (!this.statusEl) return;
    this.statusEl.textContent = message ?? '';
    clearTimeout(this.timers.status);
    this.timers.status = setTimeout(() => { if (this.statusEl) this.statusEl.textContent = ''; }, 4500);
  }

  /* -------- jouer une carte -------- */

  clickCard(card) {
    if (!this.view.playable.includes(card.id)) return;
    if (card.c === 'w') { this.selected = card.id; this.render(this.view); return; } // choix de couleur
    this.play(card.id, null);
  }

  play(cardId, color) {
    // Jouer proprement, c'est annoncer : on crie UNO d'office s'il ne restera
    // qu'une carte. Le bouton « UNO ! » sert aux rattrapages.
    const uno = this.view.hand.length === 2;
    this.selected = null;
    this.act({ a: 'play', cardId, color, uno });
  }

  /* -------- rendu -------- */

  render(view) {
    const keep = this.statusEl?.textContent || '';
    this.view = view;
    if (this.selected && !view.playable.includes(this.selected)) this.selected = null;

    this.statusEl = h('div', { className: 'uno__status' }, keep);
    const blocks = [this.renderHead(view), ...this.renderStage(view), this.statusEl];
    this.root.replaceChildren(
      h('div', { className: 'uno__main', style: 'overflow:auto;' }, blocks),
      this.renderSide(view),
    );
  }

  renderHead(view) {
    return h('div', { className: 'uno__panel uno__head' }, [
      h('strong', {}, '🃏 UNO'),
      view.phase !== 'setup' ? h('span', {}, `Manche ${view.round} · objectif ${view.options.scoreCible} pts`) : null,
      view.phase === 'jeu' ? h('span', {}, view.direction === 1 ? '↻ sens horaire' : '↺ sens antihoraire') : null,
      view.pendingDraw > 0
        ? h('span', { className: 'sp', style: 'color:#ff8a5c' }, `💥 +${view.pendingDraw} en attente`)
        : h('span', { className: 'sp' }, ''),
    ]);
  }

  renderStage(view) {
    if (view.phase === 'setup') return [this.renderSetup(view)];
    if (view.phase === 'fin') return [this.renderEnd(view)];
    if (view.phase === 'fin-manche') return [this.renderRoundEnd(view)];

    const parts = [this.renderSeats(view), this.renderTable(view)];
    if (view.challenge) parts.push(this.renderChallenge(view));
    if (view.reveal) parts.push(this.renderReveal(view));
    if (this.selected) parts.push(this.renderColorPicker());
    parts.push(this.renderHand(view));
    return parts;
  }

  renderSetup(view) {
    const body = [h('h3', { style: 'margin:0;text-align:center;' }, '⚙️ Règles de la partie')];
    if (this.isHost) {
      const box = h('div', { className: 'uno__setup' });
      const opt = (key, label, hint) => {
        const cb = h('input', { type: 'checkbox' });
        cb.checked = !!view.options[key];
        cb.addEventListener('change', () => this.act({ a: 'configure', options: { [key]: cb.checked } }));
        return h('label', {}, [cb, h('span', {}, [
          h('b', {}, label),
          h('div', { className: 'uno__hint', style: 'text-align:left' }, hint),
        ])]);
      };
      const sel = h('select', {
        style: 'background:rgba(0,0,0,.3);color:inherit;border-radius:8px;padding:6px;border:1px solid rgba(255,255,255,.15);',
      }, SCORE_TARGETS.map((t) => h('option', { value: String(t) }, `${t} points`)));
      sel.value = String(view.options.scoreCible);
      sel.addEventListener('change', () => this.act({ a: 'configure', options: { scoreCible: Number(sel.value) } }));
      box.append(
        opt('cumul', 'Cumul des pénalités', 'Un +2 se contre par un +2, un +4 par un +4 : les cartes s\'additionnent sur le suivant.'),
        opt('piochePuisJoue', 'Jouer la carte piochée', 'Si la carte piochée est jouable, on peut la poser dans la foulée.'),
        opt('defi4', 'Contestation du Joker +4', 'Le +4 se joue en bluff : le joueur suivant peut contester.'),
        h('label', {}, [h('b', {}, 'Score cible : '), sel]),
      );
      body.push(box, h('div', { className: 'uno__actions' }, [
        h('button', { className: 'btn btn--primary', onClick: () => this.act({ a: 'start' }) }, '🃏 Distribuer et commencer'),
      ]));
    } else {
      body.push(h('div', { className: 'uno__hint' }, 'Le Host règle les variantes (cumul des +2/+4, carte piochée jouable, contestation du Joker +4, score cible)…'));
    }
    return h('div', { className: 'uno__panel uno__table', style: 'flex-direction:column;gap:14px;' }, body);
  }

  renderEnd(view) {
    const f = view.finalSummary;
    return h('div', { className: 'uno__panel uno__table', style: 'flex-direction:column;gap:10px;' }, [
      h('h3', { style: 'margin:0' }, f.summary),
      h('div', { className: 'uno__hint' }, f.classement.map((p) => `${p.pseudo} : ${p.score}`).join(' · ')),
      h('div', { className: 'uno__hint' }, 'Retour au salon dans quelques secondes…'),
    ]);
  }

  renderRoundEnd(view) {
    const r = view.roundEnd;
    return h('div', { className: 'uno__panel uno__table', style: 'flex-direction:column;gap:10px;' }, [
      h('h3', { style: 'margin:0' }, `🏁 ${r.winnerName} termine la manche (+${r.gain} pts)`),
      h('div', { className: 'uno__hint' }, r.details.map((d) => `${d.pseudo} : ${d.cartes} carte(s) = ${d.points} pts`).join(' · ')),
      h('div', { className: 'uno__hint' }, `Scores : ${r.scores.map((s) => `${s.pseudo} ${s.score}`).join(' · ')} — objectif ${view.options.scoreCible}`),
      this.isHost
        ? h('button', { className: 'btn btn--primary', onClick: () => this.act({ a: 'next-round' }) }, '▶️ Manche suivante')
        : h('div', { className: 'uno__hint' }, 'Le Host va lancer la manche suivante…'),
    ]);
  }

  renderSeats(view) {
    return h('div', { className: 'uno__panel uno__seats' }, view.players.map((p) => h('div', {
      className: `uno__seat${p.isTurn ? ' uno__seat--turn' : ''}`,
    }, [
      h('span', {}, `${p.pseudo}${p.id === this.me.id ? ' (vous)' : ''}`),
      h('span', { className: 'cnt' }, `🂠 ${p.cartes}`),
      h('span', { style: 'opacity:.7;font-size:.78em' }, `${p.score} pts`),
      p.uno ? h('span', { className: 'uno-tag' }, 'UNO') : null,
      p.vulnerable && p.id !== this.me.id
        ? h('button', { className: 'uno__catch', onClick: () => this.act({ a: 'catch', target: p.id }) }, 'CONTRE-UNO !')
        : null,
    ])));
  }

  renderTable(view) {
    const top = view.top;
    return h('div', { className: 'uno__panel uno__table' }, [
      h('div', { className: 'uno__pile' }, [
        h('div', {
          className: 'uno-card uno-card--back',
          style: view.isMyTurn ? 'cursor:pointer' : '',
          onClick: () => { if (view.isMyTurn) this.act({ a: 'draw' }); },
        }, '🂠'),
        h('span', {}, `Pioche (${view.deckCount})`),
      ]),
      h('div', { className: 'uno__pile' }, [
        h('div', { className: `uno-card uno-card--${top.c}` }, face(top)),
        h('span', {}, ['Couleur : ', h('span', { className: 'uno__color', style: `background:${HEX[view.color]}` }), ` ${view.colorName}`]),
      ]),
    ]);
  }

  renderChallenge(view) {
    const c = view.challenge;
    return h('div', { className: 'uno__panel', style: 'text-align:center' }, [
      h('div', {}, `⚖️ ${c.byPseudo} vous colle +${c.montant}. Bluffait-il ? (avait-il du ${c.couleur} en main ?)`),
      h('div', { className: 'uno__actions', style: 'margin-top:8px' }, [
        h('button', { className: 'btn btn--primary', onClick: () => this.act({ a: 'challenge', challenge: true }) }, '🔍 Contester'),
        h('button', { className: 'btn btn--ghost', onClick: () => this.act({ a: 'challenge', challenge: false }) }, `🫳 Piocher ${c.montant}`),
      ]),
      h('div', { className: 'uno__hint' }, 'S\'il bluffait : il pioche à votre place et vous voyez sa main. Sinon : 2 cartes de plus et vous perdez votre tour.'),
    ]);
  }

  renderReveal(view) {
    return h('div', { className: 'uno__panel', style: 'text-align:center' }, [
      h('div', {}, `🔍 Bluff démasqué — la main de ${view.reveal.ofPseudo} :`),
      h('div', { className: 'uno__reveal' }, view.reveal.hand.map((c) => h('div', {
        className: `uno-card uno-card--${c.c}`, title: c.label,
      }, face(c)))),
    ]);
  }

  renderColorPicker() {
    return h('div', { className: 'uno__panel', style: 'text-align:center' }, [
      h('div', {}, '🎨 Choisissez la couleur :'),
      h('div', { className: 'uno__pick', style: 'margin-top:8px' }, COLORS.map((c) => h('button', {
        style: `background:${HEX[c]}`, title: COLOR_NAMES[c],
        onClick: () => this.play(this.selected, c),
      }))),
      h('button', {
        className: 'btn btn--ghost btn--small', style: 'margin-top:8px',
        onClick: () => { this.selected = null; this.render(this.view); },
      }, 'Annuler'),
    ]);
  }

  renderHand(view) {
    const hand = [...view.hand].sort((a, b) => (a.c === b.c
      ? String(a.v).localeCompare(String(b.v))
      : a.c.localeCompare(b.c)));
    const cards = hand.map((c) => {
      const ok = view.playable.includes(c.id);
      return h('div', {
        className: `uno-card uno-card--${c.c}${ok ? '' : ' uno-card--off'}${this.selected === c.id ? ' uno-card--sel' : ''}`,
        title: c.label,
        onClick: () => this.clickCard(c),
      }, face(c));
    });

    const actions = [];
    if (view.isMyTurn) {
      if (view.mustDecideDrawn) {
        actions.push(h('div', { className: 'uno__hint' }, 'Carte piochée jouable : posez-la ou passez.'));
        actions.push(h('button', { className: 'btn btn--ghost', onClick: () => this.act({ a: 'pass' }) }, '⏭️ Passer'));
      } else if (!view.challenge) {
        actions.push(h('button', {
          className: 'btn btn--ghost', onClick: () => this.act({ a: 'draw' }),
        }, view.pendingDraw > 0 ? `🫳 Encaisser ${view.pendingDraw}` : '🫳 Piocher'));
        if (view.pendingDraw > 0 && view.playable.length === 0) {
          actions.push(h('div', { className: 'uno__hint' }, `Aucun contre en main : vous devez encaisser les ${view.pendingDraw} cartes.`));
        }
      }
    } else {
      actions.push(h('div', { className: 'uno__hint' }, `Au tour de ${view.players.find((p) => p.isTurn)?.pseudo ?? '—'}…`));
    }
    // Rattrapage : crier UNO tant que personne ne vous a pris en défaut.
    if (view.hand.length === 1 && view.unoWindow?.pid === this.me.id) {
      actions.unshift(h('button', { className: 'uno__uno', onClick: () => this.act({ a: 'uno' }) }, '🗣️ UNO !'));
    }
    if (this.isHost && view.phase === 'jeu') {
      actions.push(h('button', {
        className: 'btn btn--ghost btn--small', onClick: () => this.act({ a: 'force' }),
      }, '⏭️ Forcer le tour (joueur absent)'));
    }

    return h('div', { className: 'uno__panel' }, [
      h('div', { className: 'uno__hand' }, cards),
      h('div', { className: 'uno__actions', style: 'margin-top:10px' }, actions),
    ]);
  }

  renderSide(view) {
    const chatLog = h('div', { className: 'uno-chat__log' }, (view.chat ?? []).map((m) => h('div', {}, [
      h('b', {}, `${m.pseudo} `), m.text,
    ])));
    const input = h('input', { placeholder: 'Message…', maxlength: '240' });
    const send = () => {
      const text = input.value.trim();
      if (!text) return;
      input.value = '';
      this.act({ a: 'chat', text });
    };
    input.addEventListener('keydown', (e) => { if (e.key === 'Enter') send(); });
    queueMicrotask(() => { chatLog.scrollTop = chatLog.scrollHeight; });

    return h('div', { className: 'uno__side' }, [
      h('div', { className: 'uno__panel' }, [
        h('strong', {}, '📜 Déroulé'),
        h('div', { className: 'uno__log' }, [...(view.log ?? [])].reverse().map((l) => h('div', {}, l))),
      ]),
      h('div', { className: 'uno__panel uno-chat' }, [
        h('strong', {}, '💬 Chat'),
        chatLog,
        h('div', { className: 'uno-chat__form' }, [
          input,
          h('button', { className: 'btn btn--small btn--primary', onClick: send }, '➤'),
        ]),
      ]),
    ]);
  }

  unmount() {
    this.unsubscribe?.();
    clearTimeout(this.timers.uno);
    clearTimeout(this.timers.status);
    clearTimeout(this.timers.end);
    this.styleEl?.remove();
    this.root?.remove();
    this.statusEl = null;
    this.engine = null;
  }
}

let instance = null;

export default {
  async mount(container, context) {
    instance = new UnoUI(container, context);
    instance.mount();
  },
  async unmount() {
    instance?.unmount();
    instance = null;
  },
};
