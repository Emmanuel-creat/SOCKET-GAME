/**
 * Loup-Garou — interface du module Arcade (le moteur est dans ./engine.js).
 * Rendu pur à partir de la vue personnalisée reçue du Host, actions envoyées
 * au Host via le relais game:message. Voir engine.js pour les règles.
 */
import { LoupGarouEngine, ROLES } from './engine.js';

const CSS = `
.lg { display: grid; grid-template-columns: 1fr 320px; gap: 14px; height: 100%; min-height: 0; color: var(--text, #e8ecff); font-size: 0.95rem; width: 100%; }
.lg__main { display: flex; flex-direction: column; gap: 12px; min-width: 0; min-height: 0; }
.lg__panel { background: var(--glass, rgba(255,255,255,0.05)); border: 1px solid var(--glass-border, rgba(255,255,255,0.09)); border-radius: var(--radius-m, 14px); padding: 12px 14px; }
.lg__head { display: flex; align-items: center; gap: 12px; flex-wrap: wrap; transition: background .6s ease; }
.lg--nuit .lg__head { background: linear-gradient(140deg, rgba(30,34,80,.65), rgba(10,10,26,.65)); }
.lg--jour .lg__head { background: linear-gradient(140deg, rgba(120,90,30,.35), rgba(60,40,15,.25)); }
.lg__phase { margin-left: auto; font-weight: 700; }
.lg__stage { flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 14px; min-height: 240px; text-align: center; }
.lg__stage h3 { margin: 0; font-size: 1.15rem; }
.lg__hint { color: var(--text-dim, #aab); font-size: .88rem; max-width: 560px; }
.lg__targets { display: flex; gap: 8px; flex-wrap: wrap; justify-content: center; max-width: 640px; }
.lg-t { padding: 8px 14px; border-radius: 10px; border: 1px solid var(--glass-border, rgba(255,255,255,.14)); background: rgba(0,0,0,.25); color: inherit; cursor: pointer; font-weight: 600; }
.lg-t:hover:not(:disabled) { border-color: var(--accent-2, #29d3c2); transform: translateY(-2px); }
.lg-t:disabled { opacity: .4; cursor: not-allowed; }
.lg-t--sel { outline: 2px solid var(--accent-2, #29d3c2); }
.lg__role { display: flex; gap: 12px; align-items: flex-start; }
.lg__role .ic { font-size: 2rem; }
.lg__role .priv { font-size: .82rem; color: var(--text-dim, #aab); margin-top: 4px; }
.lg__side { display: flex; flex-direction: column; gap: 12px; min-height: 0; }
.lg__players { max-height: 220px; overflow: auto; }
.lg__p { display: flex; align-items: center; gap: 8px; padding: 4px 2px; border-bottom: 1px solid rgba(255,255,255,.06); }
.lg__p--dead { opacity: .45; text-decoration: line-through; }
.lg__p .r { margin-left: auto; font-size: .78rem; color: var(--text-dim, #aab); }
.lg-chat { display: flex; flex-direction: column; flex: 1; min-height: 220px; }
.lg-tabs { display: flex; gap: 4px; margin-bottom: 8px; flex-wrap: wrap; }
.lg-tab { padding: 5px 10px; border-radius: 8px; border: 1px solid var(--glass-border, rgba(255,255,255,.12)); background: transparent; color: inherit; cursor: pointer; font-size: .8rem; }
.lg-tab--on { background: var(--accent, #7c5cff); border-color: transparent; }
.lg-chat__log { flex: 1; overflow: auto; display: flex; flex-direction: column; gap: 4px; font-size: .84rem; min-height: 130px; }
.lg-msg--sys { color: var(--warning, #ffb454); font-style: italic; }
.lg-chat__form { display: flex; gap: 6px; margin-top: 8px; }
.lg-chat__form input { flex: 1; background: rgba(0,0,0,.3); border: 1px solid var(--glass-border, rgba(255,255,255,.12)); color: inherit; border-radius: 8px; padding: 7px 10px; }
.lg__log { font-size: .8rem; color: var(--text-dim, #aab); max-height: 130px; overflow: auto; display: flex; flex-direction: column; gap: 3px; }
.lg__status { min-height: 1.2em; color: var(--warning, #ffb454); font-size: .85rem; text-align: center; }
.lg__setup { display: grid; grid-template-columns: repeat(auto-fit, minmax(190px, 1fr)); gap: 8px; text-align: left; max-width: 640px; }
.lg__setup label { display: flex; gap: 8px; align-items: center; background: rgba(0,0,0,.2); border: 1px solid var(--glass-border, rgba(255,255,255,.1)); border-radius: 10px; padding: 8px 10px; cursor: pointer; font-size: .86rem; }
.lg__setup input[type=number] { width: 56px; background: rgba(0,0,0,.3); border: 1px solid var(--glass-border, rgba(255,255,255,.12)); color: inherit; border-radius: 8px; padding: 5px; }
.lg__actions { display: flex; gap: 10px; flex-wrap: wrap; justify-content: center; }
.tagc { font-size: .68rem; padding: 2px 6px; border-radius: 99px; background: rgba(124,92,255,.25); }
@media (max-width: 1050px) { .lg { grid-template-columns: 1fr; } }
`;

function h(tag, props = {}, children = []) {
  const node = document.createElement(tag);
  Object.entries(props).forEach(([k, v]) => {
    if (v === undefined || v === null) return;
    if (k === 'className') node.className = v;
    else if (k === 'style') node.style.cssText = v;
    else if (k.startsWith('on')) node.addEventListener(k.slice(2).toLowerCase(), v);
    else node.setAttribute(k, v);
  });
  (Array.isArray(children) ? children : [children]).forEach((c) => {
    node.append(typeof c === 'string' ? document.createTextNode(c) : c);
  });
  return node;
}

const CHANNEL_LABELS = { village: '🏛️ Village', loups: '🐺 Loups', amoureux: '💘 Amoureux', morts: '👻 Morts' };
const STEP_LABELS = {
  cupidon: '💘 Cupidon décoche ses flèches…',
  salvateur: '🛡️ Le Salvateur choisit qui protéger…',
  voyante: '🔮 La Voyante scrute une âme…',
  loups: '🐺 Les Loups-Garous chassent…',
  sorciere: '🧪 La Sorcière hésite…',
  corbeau: '🐦‍⬛ Le Corbeau prend son envol…',
};

class LoupGarouUI {
  constructor(container, context) {
    this.container = container;
    this.ctx = context;
    this.isHost = context.me.id === context.hostId;
    this.engine = null;
    this.unsubscribe = null;
    this.tab = 'village';
    this.cupidSel = new Set();
    this.witchKillMode = false;
  }

  mount() {
    this.styleEl = h('style', {}, CSS);
    this.root = h('div', { className: 'lg' });
    this.container.append(this.styleEl, this.root);

    if (this.isHost) {
      try {
        this.engine = new LoupGarouEngine(this.ctx.players, { hostId: this.ctx.hostId });
      } catch (error) {
        this.root.replaceChildren(h('div', { className: 'lg__panel', style: 'margin:auto;' }, `⚠️ ${error.message}`));
        return;
      }
      this.unsubscribe = this.ctx.onMessage(({ from, data }) => {
        if (data?.t === 'action') this.hostHandle(from, data.action);
      });
      this.broadcast();
    } else {
      this.unsubscribe = this.ctx.onMessage(({ from, data }) => {
        if (from !== this.ctx.hostId) return;
        if (data?.t === 'view') this.render(data.view);
        else if (data?.t === 'error' || data?.t === 'info') this.setStatus(data.message);
      });
      this.root.replaceChildren(h('div', { className: 'lg__panel', style: 'margin:auto;' }, '⏳ Le village se rassemble…'));
    }
  }

  hostHandle(pid, action) {
    const res = this.engine.handleAction(pid, action);
    if (!res.ok) { this.ctx.sendMessage({ t: 'error', message: res.error }, pid); return; }
    if (res.seen) this.ctx.sendMessage({ t: 'info', message: `🔮 ${res.seen.pseudo} est ${ROLES[res.seen.role].icone} ${ROLES[res.seen.role].nom}.` }, pid);
    this.broadcast();
  }

  act(action) {
    if (this.isHost) {
      const res = this.engine.handleAction(this.ctx.me.id, action);
      if (!res.ok) { this.setStatus(res.error); return; }
      if (res.seen) this.setStatus(`🔮 ${res.seen.pseudo} est ${ROLES[res.seen.role].icone} ${ROLES[res.seen.role].nom}.`);
      this.broadcast();
    } else {
      this.ctx.sendMessage({ t: 'action', action }, this.ctx.hostId);
    }
  }

  broadcast() {
    for (const p of this.engine.players) {
      if (p.id === this.ctx.me.id) continue;
      this.ctx.sendMessage({ t: 'view', view: this.engine.getViewFor(p.id) }, p.id);
    }
    this.render(this.engine.getViewFor(this.ctx.me.id));
  }

  setStatus(message) {
    if (!this.statusEl) return;
    this.statusEl.textContent = message ?? '';
    clearTimeout(this.statusTimer);
    this.statusTimer = setTimeout(() => { if (this.statusEl) this.statusEl.textContent = ''; }, 5000);
  }

  /* --------------------------- rendu --------------------------------- */

  render(view) {
    // Conserver le statut (résultat de voyante) affiché avant re-rendu.
    const keepStatus = this.statusEl?.textContent || '';
    this.view = view;
    if (!view.chats[this.tab]) this.tab = 'village';
    const nuit = view.phase === 'nuit';
    this.root.className = `lg ${nuit ? 'lg--nuit' : 'lg--jour'}`;

    const head = h('div', { className: 'lg__panel lg__head' }, [
      h('strong', {}, '🐺 Loup-Garou'),
      h('span', {}, view.phase === 'setup' ? 'Composition du village'
        : nuit ? `Nuit ${view.nuit}` : view.phase === 'fin' ? 'Partie terminée' : `Jour ${view.jour}`),
      view.corbeauMark ? h('span', { className: 'tagc' }, `🐦‍⬛ ${view.corbeauMark} +2`) : '',
      h('span', { className: 'lg__phase' }, this.phaseLabel(view)),
    ]);

    const stage = h('div', { className: 'lg__panel lg__stage' });
    stage.append(...this.renderStage(view));

    this.statusEl = h('div', { className: 'lg__status' }, keepStatus);
    const roleCard = view.me ? this.renderRoleCard(view) : h('div', {});

    const side = h('div', { className: 'lg__side' }, [
      h('div', { className: 'lg__panel lg__players' }, [
        h('strong', {}, 'Le village'),
        ...view.players.map((p) => h('div', { className: `lg__p${p.alive ? '' : ' lg__p--dead'}` }, [
          h('span', {}, `${p.captain ? '🎖️ ' : ''}${p.pseudo}`),
          h('span', { className: 'r' }, p.role ?? ''),
        ])),
      ]),
      this.renderChat(view),
      h('div', { className: 'lg__panel' }, [
        h('strong', {}, '📜 Le meneur'),
        h('div', { className: 'lg__log' }, [...view.log].reverse().map((l) => h('div', {}, l))),
      ]),
    ]);

    this.root.replaceChildren(h('div', { className: 'lg__main' }, [head, stage, this.statusEl, roleCard]), side);
  }

  phaseLabel(view) {
    switch (view.phase) {
      case 'setup': return '🎭 Préparation';
      case 'nuit': return STEP_LABELS[view.nightStep] ?? '🌙 Le village dort…';
      case 'jour-annonce': return '☀️ Réveil';
      case 'debat': return '💬 Débat au village';
      case 'vote': return view.voteKind === 'capitaine' ? '🎖️ Élection du Capitaine' : '🗳️ Vote du village';
      case 'chasseur': return '🏹 Dernier tir';
      case 'succession': return '🎖️ Succession';
      case 'fin': return '🏆 Fin';
      default: return '';
    }
  }

  targetButtons(view, { allowSelf = false, onPick, filter = null, selected = null } = {}) {
    return h('div', { className: 'lg__targets' }, view.players
      .filter((p) => p.alive && (allowSelf || p.id !== this.ctx.me.id) && (!filter || filter(p)))
      .map((p) => h('button', {
        className: `lg-t${selected?.has?.(p.id) ? ' lg-t--sel' : ''}`,
        onClick: () => onPick(p.id),
      }, p.pseudo)));
  }

  renderStage(view) {
    const me = view.me;
    const S = [];

    if (view.phase === 'setup') {
      if (this.isHost) {
        const s = view.setup;
        const box = h('div', { className: 'lg__setup' });
        const num = h('input', { type: 'number', min: '1', max: String(Math.floor(view.players.length / 3)), value: String(s.loups) });
        num.addEventListener('change', () => this.act({ a: 'configure', setup: { loups: Number(num.value) } }));
        box.append(h('label', {}, ['🐺 Loups-Garous : ', num]));
        for (const r of ['voyante', 'sorciere', 'chasseur', 'cupidon', 'petiteFille', 'salvateur', 'corbeau']) {
          const cb = h('input', { type: 'checkbox' });
          cb.checked = !!s[r];
          cb.addEventListener('change', () => this.act({ a: 'configure', setup: { [r]: cb.checked } }));
          box.append(h('label', {}, [cb, `${ROLES[r].icone} ${ROLES[r].nom}`]));
        }
        S.push(h('h3', {}, 'Composez votre village'),
          h('div', { className: 'lg__hint' }, 'Les cartes non cochées deviennent des Villageois. Le moteur joue le meneur : tout le monde participe.'),
          box,
          h('div', { className: 'lg__actions' }, [
            h('button', { className: 'btn btn--primary', onClick: () => this.act({ a: 'start' }) }, '🌙 Distribuer les rôles et lancer la nuit'),
            ...(view.setupCheck && !view.setupCheck.valid ? [h('span', { className: 'lg__hint' }, view.setupCheck.reason)] : []),
          ]));
      } else {
        S.push(h('h3', {}, '🎭 Le Host compose le village…'),
          h('div', { className: 'lg__hint' }, Object.entries(ROLES).map(([, r]) => `${r.icone} ${r.nom}`).join(' · ')));
      }
      return S;
    }

    if (view.phase === 'fin') {
      const f = view.finalSummary;
      S.push(h('h3', {}, f?.summary ?? 'Partie terminée'),
        h('div', { className: 'lg__hint' }, `Rôles : ${Object.entries(f?.roles ?? {}).map(([p, r]) => `${p} = ${r}`).join(' · ')}`));
      if (this.isHost) {
        S.push(h('div', { className: 'lg__actions' }, [
          h('button', { className: 'btn btn--primary', onClick: () => this.finish() }, '🏁 Retour au salon (tous)'),
        ]));
      }
      return S;
    }

    if (!me?.alive) {
      S.push(h('h3', {}, '👻 Vous êtes mort'),
        h('div', { className: 'lg__hint' }, 'Vous voyez tous les rôles et pouvez discuter dans le canal des Morts. Interdiction formelle de spoiler les vivants par un autre moyen !'));
      return S;
    }

    if (view.phase === 'nuit') {
      const step = view.nightStep;
      if (view.iAmActive) {
        if (step === 'cupidon') {
          S.push(h('h3', {}, '💘 Désignez les deux amoureux'),
            this.targetButtons(view, {
              allowSelf: true,
              selected: this.cupidSel,
              onPick: (id) => {
                if (this.cupidSel.has(id)) this.cupidSel.delete(id);
                else if (this.cupidSel.size < 2) this.cupidSel.add(id);
                this.render(this.view);
              },
            }),
            h('div', { className: 'lg__actions' }, [
              h('button', {
                className: 'btn btn--primary',
                onClick: () => { if (this.cupidSel.size === 2) { this.act({ a: 'night', targets: [...this.cupidSel] }); this.cupidSel.clear(); } },
              }, `Unir ces cœurs (${this.cupidSel.size}/2)`),
            ]));
        } else if (step === 'salvateur') {
          S.push(h('h3', {}, '🛡️ Qui protégez-vous cette nuit ?'),
            me.lastProtected ? h('div', { className: 'lg__hint' }, 'Pas deux nuits de suite la même personne.') : '',
            this.targetButtons(view, { allowSelf: true, onPick: (id) => this.act({ a: 'night', target: id }) }));
        } else if (step === 'voyante') {
          S.push(h('h3', {}, '🔮 Quelle âme voulez-vous sonder ?'),
            this.targetButtons(view, { onPick: (id) => this.act({ a: 'night', target: id }) }));
        } else if (step === 'loups') {
          S.push(h('h3', {}, '🐺 Choisissez votre proie'),
            h('div', { className: 'lg__hint' }, `Concertez-vous dans le canal 🐺 Loups. ${view.wolvesWaiting} loup(s) n'ont pas encore voté.`),
            this.targetButtons(view, { filter: (p) => !(me.packmates ?? []).includes(p.pseudo), onPick: (id) => this.act({ a: 'night', target: id }) }));
        } else if (step === 'sorciere') {
          S.push(h('h3', {}, '🧪 La nuit vous appartient'),
            h('div', { className: 'lg__hint' }, me.wolfVictim
              ? `Les loups ont frappé : ${me.wolfVictim}.` : 'Les loups n\'ont fait aucune victime.'));
          const actions = [];
          if (me.potions?.vie && me.wolfVictimId) {
            actions.push(h('button', { className: 'btn btn--primary', onClick: () => this.act({ a: 'night', save: true, kill: null }) }, `💖 Sauver ${me.wolfVictim}`));
          }
          if (me.potions?.mort && !this.witchKillMode) {
            actions.push(h('button', { className: 'btn btn--ghost', onClick: () => { this.witchKillMode = true; this.render(this.view); } }, '☠️ Utiliser la potion de mort'));
          }
          actions.push(h('button', { className: 'btn btn--ghost', onClick: () => this.act({ a: 'night', save: false, kill: null }) }, '😴 Ne rien faire'));
          S.push(h('div', { className: 'lg__actions' }, actions));
          if (this.witchKillMode && me.potions?.mort) {
            S.push(h('div', { className: 'lg__hint' }, '☠️ Choisissez qui empoisonner :'),
              this.targetButtons(view, { onPick: (id) => { this.witchKillMode = false; this.act({ a: 'night', save: false, kill: id }); } }));
          }
        } else if (step === 'corbeau') {
          S.push(h('h3', {}, '🐦‍⬛ Qui marquer de 2 voix pour demain ?'),
            this.targetButtons(view, { onPick: (id) => this.act({ a: 'night', target: id }) }),
            h('div', { className: 'lg__actions' }, [
              h('button', { className: 'btn btn--ghost', onClick: () => this.act({ a: 'night', target: null }) }, 'Ne marquer personne'),
            ]));
        }
      } else {
        S.push(h('h3', {}, '🌙 Le village dort…'), h('div', { className: 'lg__hint' }, STEP_LABELS[step] ?? ''));
        if (me.role === 'loup' && step === 'loups') S.push(h('div', { className: 'lg__hint' }, '✅ Votre vote est enregistré — attendez la meute.'));
        if (me.role === 'petiteFille' && step === 'loups') {
          S.push(h('div', { className: 'lg__actions' }, [
            h('button', { className: 'btn btn--ghost', onClick: () => { this.act({ a: 'spy' }); this.tab = 'loups'; } }, '👀 Espionner les loups (risqué)'),
          ]));
        }
        if (this.isHost) {
          S.push(h('div', { className: 'lg__actions' }, [
            h('button', { className: 'btn btn--ghost btn--small', onClick: () => this.act({ a: 'skip-night' }) }, '⏭️ Passer cette étape (joueur absent)'),
          ]));
        }
      }
      return S;
    }

    if (view.phase === 'debat') {
      S.push(h('h3', {}, '💬 Débattez au grand jour'),
        h('div', { className: 'lg__hint' }, 'Accusez, défendez, bluffez dans le canal 🏛️ Village.'));
      if (this.isHost) {
        S.push(h('div', { className: 'lg__actions' }, [
          h('button', { className: 'btn btn--primary', onClick: () => this.act({ a: 'open-vote' }) }, '🗳️ Lancer le vote'),
        ]));
      }
      return S;
    }

    if (view.phase === 'vote') {
      const title = view.voteKind === 'capitaine' ? '🎖️ Élisez votre Capitaine' : '🗳️ Qui envoyez-vous à l\'échafaud ?';
      S.push(h('h3', {}, title), h('div', { className: 'lg__hint' }, `${view.votesCast}/${view.votesNeeded} votes exprimés.`));
      if (!view.iVoted) {
        S.push(this.targetButtons(view, { allowSelf: view.voteKind === 'capitaine', onPick: (id) => this.act({ a: 'vote', target: id }) }),
          h('div', { className: 'lg__actions' }, [
            h('button', { className: 'btn btn--ghost', onClick: () => this.act({ a: 'vote', target: null }) }, '🕊️ Abstention'),
          ]));
      } else {
        S.push(h('div', { className: 'lg__hint' }, '✅ Vote enregistré.'));
      }
      return S;
    }

    if (view.phase === 'chasseur') {
      if (view.iAmPendingHunter) {
        S.push(h('h3', {}, '🏹 Votre dernier tir'), this.targetButtons(view, { onPick: (id) => this.act({ a: 'shoot', target: id }) }));
      } else {
        S.push(h('h3', {}, '🏹 Le Chasseur arme son fusil…'));
      }
      return S;
    }

    if (view.phase === 'succession') {
      if (view.iAmPendingCaptain) {
        S.push(h('h3', {}, '🎖️ Désignez votre successeur'), this.targetButtons(view, { onPick: (id) => this.act({ a: 'successor', target: id }) }));
      } else {
        S.push(h('h3', {}, '🎖️ Le Capitaine désigne son successeur…'));
      }
      return S;
    }

    S.push(h('h3', {}, '☀️ Le village se réveille…'));
    return S;
  }

  renderRoleCard(view) {
    const me = view.me;
    const priv = [];
    if (me.lover) priv.push(`💘 Amoureux·se de ${me.lover} — canal privé ouvert.`);
    if (me.packmates?.length) priv.push(`🐺 Votre meute : ${me.packmates.join(', ')}.`);
    if (me.potions) priv.push(`🧪 Potions — vie : ${me.potions.vie ? '✔' : '✖'}, mort : ${me.potions.mort ? '✔' : '✖'}.`);
    if (me.seen?.length) priv.push(`🔮 Visions : ${me.seen.map((s) => `${s.pseudo} = ${s.roleNom} (nuit ${s.nuit})`).join(' · ')}`);
    if (me.spyRevealed) priv.push('⚠️ Les loups connaissent votre identité !');
    return h('div', { className: 'lg__panel lg__role' }, [
      h('span', { className: 'ic' }, me.icone),
      h('div', {}, [
        h('strong', {}, `${me.nom}${me.alive ? '' : ' (mort)'}`),
        h('div', { className: 'lg__hint' }, me.desc),
        ...priv.map((t) => h('div', { className: 'priv' }, t)),
      ]),
    ]);
  }

  renderChat(view) {
    const channels = Object.keys(view.chats);
    const tabs = h('div', { className: 'lg-tabs' }, channels.map((c) => h('button', {
      className: `lg-tab${this.tab === c ? ' lg-tab--on' : ''}`,
      onClick: () => { this.tab = c; this.render(this.view); },
    }, CHANNEL_LABELS[c])));
    const log = h('div', { className: 'lg-chat__log' }, (view.chats[this.tab] ?? []).map((m) => h('div', { className: m.sys ? 'lg-msg--sys' : '' }, m.sys
      ? `${m.pseudo} ${m.text}`
      : [h('b', {}, `${m.pseudo} `), m.text])));
    const input = h('input', { placeholder: view.canWrite[this.tab] ? 'Message…' : 'Lecture seule', maxlength: '300' });
    input.disabled = !view.canWrite[this.tab];
    const send = () => {
      const text = input.value.trim();
      if (!text) return;
      input.value = '';
      this.act({ a: 'chat', channel: this.tab, text });
    };
    input.addEventListener('keydown', (e) => { if (e.key === 'Enter') send(); });
    const form = h('div', { className: 'lg-chat__form' }, [
      input,
      h('button', { className: 'btn btn--small btn--primary', onClick: send }, '➤'),
    ]);
    const box = h('div', { className: 'lg__panel lg-chat' }, [tabs, log, form]);
    queueMicrotask(() => { log.scrollTop = log.scrollHeight; });
    return box;
  }

  finish() {
    const result = this.engine.summary();
    this.endTimer = setTimeout(() => this.ctx.onEnd(result), 300);
  }

  unmount() {
    this.unsubscribe?.();
    clearTimeout(this.statusTimer);
    clearTimeout(this.endTimer);
    this.styleEl?.remove();
    this.root?.remove();
    this.statusEl = null;
  }
}

let instance = null;

export default {
  async mount(container, context) {
    instance = new LoupGarouUI(container, context);
    instance.mount();
  },
  async unmount() {
    instance?.unmount();
    instance = null;
  },
};
