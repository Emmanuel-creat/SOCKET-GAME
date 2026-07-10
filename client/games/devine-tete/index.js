/* ==========================================================================
   LE DOSSIER — Jeu de reconnaissance (multijoueur, host-authoritative)
   Arcade Engine module
   Contract: export default { async mount(container, context), async unmount() }
   ========================================================================== */

/* --------------------------------------------------------------------------
   IMAGE DATABASE (mock — same shape as the standalone prototype)
   -------------------------------------------------------------------------- */
export const imageDB = {
  "Jeremy": {
    "caricature": ["001.png", "002.png", "003.png", "004.png", "005.png", "006.png"],
    "cut": ["001.jpg", "002.jpg", "003.jpg", "004.jpg"],
    "modified": ["001.jpg", "002.jpg", "003.jpg", "004.jpg", "005.jpg", "006.jpg", "007.jpg", "008.jpg"],
    "original": ["001.jpeg", "002.png"]
  },
  "Manu": {
    "caricature": ["001.png", "002.png", "003.png", "004.png", "005.png", "006.png"],
    "cut": ["001.jpg", "002.jpg", "003.jpg", "004.jpg", "005.jpg", "006.jpg", "007.jpg", "008.jpg"],
    "modified": ["001.jpg", "002.jpg", "003.jpg", "004.jpg", "005.jpg", "006.jpg", "007.jpg", "008.jpg", "009.jpg", "010.jpg", "011.jpg", "012.jpg", "013.jpg", "014.jpg"],
    "original": ["001.jpeg", "002.png", "003.png", "004.png", "005.jpeg"]
  },
  "Nathan": {
    "caricature": ["001.png", "002.png", "003.png", "004.png", "005.png", "006.png", "007.png", "008.png", "009.png"],
    "cut": ["001.jpg", "002.jpg", "003.jpg", "004.jpg"],
    "modified": ["001.jpg", "002.jpg", "003.jpg", "004.jpg", "005.jpg", "006.jpg", "007.jpg", "008.jpg", "009.jpg", "010.jpg"],
    "original": ["001.png", "002.png", "003.jpeg"]
  },
  "Quentin": {
    "caricature": ["001.png", "002.png", "003.png", "004.png", "005.png", "006.png"],
    "cut": ["001.png", "002.png", "003.png", "004.png", "005.jpg", "006.jpg", "007.jpg", "008.jpg"],
    "modified": ["001.jpg", "002.jpg", "003.jpg", "004.jpg", "005.jpg", "006.jpg", "007.jpg", "008.jpg", "009.jpg", "010.jpg", "011.jpg", "012.jpg"],
    "original": ["001.png", "002.jpeg", "003.png", "004.png"]
  },
  "Yoan": {
    "caricature": ["001.png", "002.png", "003.png", "004.png", "005.png", "006.png", "007.png", "008.png", "009.png"],
    "cut": ["001.jpg", "002.jpg", "003.jpg", "004.jpg"],
    "modified": ["001.jpg", "002.jpg", "003.jpg", "004.jpg", "005.jpg", "006.jpg", "007.jpg", "008.jpg", "009.jpg", "010.jpg"],
    "original": ["001.jpeg", "002.png", "003.png"]
  }
};

// Dossiers anonymisés : l'URL d'une image ne doit jamais révéler la réponse.
const SLOTS = {"Jeremy": "sa", "Manu": "sb", "Nathan": "sc", "Quentin": "sd", "Yoan": "se"};

const ASSETS_BASE = "/games/devine-tete/assets/people";

export function getImagePath(personName, category, filename) {
  return `${ASSETS_BASE}/${SLOTS[personName]}/${category}/${filename}`;
}

const MODE_CONFIG = {
  caricature: { category: "caricature", label: "Caricature", desc: "Un portrait caricaturé est affiché. Devinez l'identité de la personne représentée." },
  modified:   { category: "modified",   label: "Déformation", desc: "Le visage a été modifié / déformé. Reconnaissez la personne malgré l'altération." },
  cut:        { category: "cut",        label: "50 / 50",     desc: "Seule une moitié du visage est visible. Identifiez la personne à partir de l'indice partiel." }
};

const TOTAL_ROUNDS = 10;

function normalize(str) {
  return String(str || "")
    .toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = str == null ? "" : String(str);
  return div.innerHTML;
}

function getRandomOriginal(person) {
  const originals = (imageDB[person] && imageDB[person].original) || [];
  if (originals.length === 0) return null;
  const file = originals[Math.floor(Math.random() * originals.length)];
  return getImagePath(person, "original", file);
}

function poolForMode(mode) {
  const category = MODE_CONFIG[mode].category;
  let pool = [];
  Object.keys(imageDB).forEach(person => {
    const images = imageDB[person][category] || [];
    images.forEach(image => pool.push({ person, image }));
  });
  return pool;
}

/* --------------------------------------------------------------------------
   GAME ENGINE — pure logic, no DOM. Only instantiated/run by the host.
   -------------------------------------------------------------------------- */
export class GameEngine {
  constructor(players) {
    this.players = players.slice(); // [{id, name}]
    this.mode = null;
    this.rounds = [];          // [{person, image, imagePath}]
    this.currentRound = 0;
    this.scores = {};          // playerId -> score
    this.roundAnswers = {};    // playerId -> {value, correct}
    this.history = [];         // per-round recap for the results screen
    this.phase = "lobby";      // lobby | playing | reveal | finished
    this.players.forEach(p => { this.scores[p.id] = 0; });
  }

  // Same "no exact photo repeats until every image has been used once" rule
  // as the original single-player build, just isolated as a pure function.
  buildRounds(mode) {
    const pool = poolForMode(mode);
    if (pool.length === 0) return [];

    const usedPerPerson = {};
    const rounds = [];

    while (rounds.length < TOTAL_ROUNDS) {
      let available = pool.filter(p => {
        const used = usedPerPerson[p.person];
        return !used || !used.has(p.image);
      });

      if (available.length === 0) {
        Object.keys(usedPerPerson).forEach(k => usedPerPerson[k].clear());
        available = pool;
      }

      const pick = available[Math.floor(Math.random() * available.length)];
      if (!usedPerPerson[pick.person]) usedPerPerson[pick.person] = new Set();
      usedPerPerson[pick.person].add(pick.image);

      rounds.push({
        person: pick.person,
        image: pick.image,
        imagePath: getImagePath(pick.person, mode === "caricature" ? "caricature" : MODE_CONFIG[mode].category, pick.image)
      });
    }
    return rounds;
  }

  start(mode) {
    this.mode = mode;
    this.rounds = this.buildRounds(mode);
    this.currentRound = 0;
    this.history = [];
    this.roundAnswers = {};
    this.phase = this.rounds.length ? "playing" : "lobby";
    return this.rounds.length > 0;
  }

  activePlayerCount() {
    return this.players.length;
  }

  submitGuess(playerId, value) {
    if (this.phase !== "playing") return false;
    if (!this.players.some(p => p.id === playerId)) return false;
    if (this.roundAnswers[playerId]) return false; // one guess per round

    const round = this.rounds[this.currentRound];
    const correct = normalize(value) === normalize(round.person);
    this.roundAnswers[playerId] = { value: value || "(vide)", correct };
    if (correct) this.scores[playerId] = (this.scores[playerId] || 0) + 1;

    if (Object.keys(this.roundAnswers).length >= this.activePlayerCount()) {
      this._reveal();
    }
    return true;
  }

  // Host can also force-reveal (e.g. a player disconnects and the round
  // would otherwise never complete).
  forceReveal() {
    if (this.phase === "playing") this._reveal();
  }

  _reveal() {
    const round = this.rounds[this.currentRound];
    this.history.push({
      person: round.person,
      imagePath: round.imagePath,
      refImage: this.mode === "caricature" ? round.imagePath : getRandomOriginal(round.person),
      answers: { ...this.roundAnswers }
    });
    this.phase = "reveal";
  }

  advance() {
    if (this.phase !== "reveal") return;
    this.currentRound++;
    this.roundAnswers = {};
    this.phase = this.currentRound < this.rounds.length ? "playing" : "finished";
  }

  removePlayer(playerId) {
    this.players = this.players.filter(p => p.id !== playerId);
    delete this.roundAnswers[playerId];
    if (this.phase === "playing" && this.players.length > 0 &&
        Object.keys(this.roundAnswers).length >= this.activePlayerCount()) {
      this._reveal();
    }
  }

  // Serializable snapshot sent to every client over the socket.
  getState() {
    const round = this.rounds[this.currentRound];
    return {
      phase: this.phase,
      mode: this.mode,
      currentRound: this.currentRound,
      totalRounds: this.rounds.length || TOTAL_ROUNDS,
      imagePath: (this.phase === "playing" || this.phase === "reveal") && round ? round.imagePath : null,
      answeredIds: Object.keys(this.roundAnswers),
      totalPlayers: this.activePlayerCount(),
      scores: { ...this.scores },
      reveal: this.phase === "reveal" ? this.history[this.history.length - 1] : null,
      finalHistory: this.phase === "finished" ? this.history : null
    };
  }
}

/* --------------------------------------------------------------------------
   STYLES (scoped, injected once per mount, removed on unmount)
   -------------------------------------------------------------------------- */
const STYLE_ID = "dossier-game-styles";
const STYLES = `
#dossier-root{
  --bg:#12161d; --panel:#1b212b; --panel-border:#2c3542;
  --paper:#ece4cf; --paper-dark:#ddd2b3; --ink:#26221a; --ink-soft:#57503f;
  --gold:#c9a227; --gold-dim:#8f7420; --red:#9c3b3b; --green:#4f7a5c;
  --font-display:'Special Elite','Courier New',monospace;
  --font-mono:'IBM Plex Mono',monospace;
  --font-body:'Inter',system-ui,sans-serif;
  background:radial-gradient(ellipse at top left,#1a2029 0%,var(--bg) 55%), var(--bg);
  color:var(--paper); font-family:var(--font-body);
  padding:40px 20px 80px; width:100%; box-sizing:border-box;
}
#dossier-root *{box-sizing:border-box;}
#dossier-root .app{width:100%; max-width:960px; margin:0 auto;}
#dossier-root .masthead{display:flex; align-items:baseline; justify-content:space-between; border-bottom:2px solid var(--gold-dim); padding-bottom:14px; margin-bottom:34px;}
#dossier-root .masthead h1{font-family:var(--font-display); font-size:28px; letter-spacing:1px; margin:0; color:var(--paper);}
#dossier-root .masthead h1 span{color:var(--gold);}
#dossier-root .masthead .tag{font-family:var(--font-mono); font-size:11px; color:var(--ink-soft); letter-spacing:2px; text-transform:uppercase;}
#dossier-root .screen{display:none;}
#dossier-root .screen.active{display:block;}
#dossier-root .modes{display:grid; grid-template-columns:repeat(auto-fit,minmax(260px,1fr)); gap:22px;}
#dossier-root .mode-card{background:var(--panel); border:1px solid var(--panel-border); border-radius:2px; padding:26px 24px 22px; position:relative; overflow:hidden;}
#dossier-root .mode-card::before{content:attr(data-index); position:absolute; top:-6px; right:10px; font-family:var(--font-display); font-size:70px; color:rgba(201,162,39,0.07); line-height:1;}
#dossier-root .mode-card h2{font-family:var(--font-display); font-size:19px; margin:0 0 6px; color:var(--gold); letter-spacing:0.5px;}
#dossier-root .mode-card p{font-size:13.5px; color:#b8bfc9; line-height:1.5; margin:0 0 20px;}
#dossier-root .mode-card .count{font-family:var(--font-mono); font-size:11px; color:var(--ink-soft); background:rgba(201,162,39,0.08); border:1px solid rgba(201,162,39,0.25); display:inline-block; padding:3px 8px; border-radius:2px; margin-bottom:16px;}
#dossier-root button{font-family:var(--font-mono); cursor:pointer; border:none; outline:none;}
#dossier-root .btn-play{display:block; width:100%; background:var(--gold); color:#1a1508; font-weight:600; font-size:13px; letter-spacing:1.5px; text-transform:uppercase; padding:12px 0; border-radius:2px; transition:transform .12s ease, background .15s ease;}
#dossier-root .btn-play:hover{background:#dab637; transform:translateY(-1px);}
#dossier-root .btn-play:active{transform:translateY(0);}
#dossier-root .btn-play:disabled{background:#4a4633; color:#8a8368; cursor:not-allowed; transform:none;}
#dossier-root .btn-secondary{background:transparent; border:1px solid var(--panel-border); color:var(--paper); padding:10px 18px; font-size:12px; letter-spacing:1px; border-radius:2px; text-transform:uppercase;}
#dossier-root .btn-secondary:hover{border-color:var(--gold-dim); color:var(--gold);}
#dossier-root .btn-secondary:disabled{opacity:.5; cursor:not-allowed;}
#dossier-root .case-bar{display:flex; justify-content:space-between; align-items:center; font-family:var(--font-mono); font-size:12px; color:var(--ink-soft); letter-spacing:1px; margin-bottom:18px; text-transform:uppercase;}
#dossier-root .case-bar .mode-label{color:var(--gold);}
#dossier-root .progress-track{height:3px; background:var(--panel-border); border-radius:2px; overflow:hidden; margin-bottom:30px;}
#dossier-root .progress-fill{height:100%; background:var(--gold); width:0%; transition:width .35s ease;}
#dossier-root .file-wrap{display:flex; justify-content:center; margin-bottom:22px;}
#dossier-root .photo-card{background:var(--paper); padding:16px 16px 46px; box-shadow:0 12px 30px rgba(0,0,0,0.45); transform:rotate(-1deg); position:relative; border-radius:1px;}
#dossier-root .photo-card::after{content:'PIÈCE À CONVICTION'; position:absolute; bottom:14px; left:0; right:0; text-align:center; font-family:var(--font-mono); font-size:9.5px; letter-spacing:2px; color:var(--ink-soft);}
#dossier-root .photo-card .tape{position:absolute; top:-10px; left:50%; transform:translateX(-50%) rotate(-2deg); width:90px; height:26px; background:rgba(230,224,200,0.55); border:1px solid rgba(0,0,0,0.05);}
#dossier-root .photo-card img{display:block; width:320px; max-width:60vw; height:320px; object-fit:cover; filter:grayscale(15%) contrast(1.02); background:#0006;}
#dossier-root .guess-form{max-width:420px; margin:0 auto 8px; display:flex; gap:10px;}
#dossier-root .guess-form input{flex:1; background:var(--panel); border:1px solid var(--panel-border); color:var(--paper); font-family:var(--font-body); font-size:15px; padding:12px 14px; border-radius:2px;}
#dossier-root .guess-form input:focus{border-color:var(--gold);}
#dossier-root .guess-form input:disabled{opacity:.5;}
#dossier-root .guess-form button{background:var(--gold); color:#1a1508; font-weight:600; font-size:12px; letter-spacing:1px; text-transform:uppercase; padding:0 20px; border-radius:2px;}
#dossier-root .guess-form button:hover{background:#dab637;}
#dossier-root .hint-row{text-align:center; font-family:var(--font-mono); font-size:11px; color:var(--ink-soft); margin-top:10px;}
#dossier-root .reveal-row{text-align:center; font-family:var(--font-mono); font-size:13px; color:var(--gold); margin-top:14px;}
#dossier-root .players-answers{max-width:420px; margin:14px auto 0; display:flex; flex-direction:column; gap:6px;}
#dossier-root .player-answer-row{display:flex; justify-content:space-between; font-size:12.5px; background:var(--panel); border:1px solid var(--panel-border); padding:6px 10px; border-radius:2px;}
#dossier-root .waiting-list{max-width:420px; margin:0 auto; display:flex; flex-direction:column; gap:8px;}
#dossier-root .waiting-list .player-row{background:var(--panel); border:1px solid var(--panel-border); padding:10px 14px; border-radius:2px; font-size:13.5px; display:flex; justify-content:space-between;}
#dossier-root .waiting-hint{text-align:center; font-family:var(--font-mono); font-size:12px; color:var(--ink-soft); margin-top:22px; letter-spacing:1px; text-transform:uppercase;}
#dossier-root .score-banner{font-family:var(--font-display); font-size:22px; color:var(--gold); text-align:center; margin-bottom:26px; letter-spacing:0.5px;}
#dossier-root .leaderboard{max-width:420px; margin:0 auto 30px; display:flex; flex-direction:column; gap:8px;}
#dossier-root .leaderboard-row{display:flex; justify-content:space-between; align-items:center; background:var(--panel); border:1px solid var(--panel-border); padding:10px 14px; border-radius:2px; font-size:14px;}
#dossier-root .leaderboard-row.me{border-color:var(--gold);}
#dossier-root .leaderboard-row .rank{font-family:var(--font-mono); color:var(--gold); margin-right:10px;}
#dossier-root table.results{width:100%; border-collapse:collapse; background:var(--panel); border:1px solid var(--panel-border);}
#dossier-root table.results th{font-family:var(--font-mono); font-size:10.5px; letter-spacing:1.5px; text-transform:uppercase; color:var(--ink-soft); text-align:left; padding:10px 14px; border-bottom:1px solid var(--panel-border);}
#dossier-root table.results td{padding:10px 14px; border-bottom:1px solid var(--panel-border); font-size:13.5px; vertical-align:middle;}
#dossier-root table.results tr:last-child td{border-bottom:none;}
#dossier-root table.results img{width:52px; height:52px; object-fit:cover; border:1px solid var(--panel-border); border-radius:2px; display:block;}
#dossier-root .verdict{font-family:var(--font-mono); font-size:10.5px; letter-spacing:1px; text-transform:uppercase; padding:3px 8px; border-radius:2px; display:inline-block;}
#dossier-root .verdict.correct{color:var(--green); border:1px solid var(--green); background:rgba(79,122,92,0.12);}
#dossier-root .verdict.wrong{color:var(--red); border:1px solid var(--red); background:rgba(156,59,59,0.12);}
#dossier-root .results-actions{display:flex; justify-content:center; gap:14px; margin-top:30px;}
@media (max-width:600px){
  #dossier-root .photo-card img{width:70vw; height:70vw;}
  #dossier-root .guess-form{flex-direction:column;}
  #dossier-root table.results{font-size:12px;}
  #dossier-root table.results th:nth-child(1), #dossier-root table.results td:nth-child(1){display:none;}
}
`;

function injectStyles() {
  if (document.getElementById(STYLE_ID)) return;
  const el = document.createElement("style");
  el.id = STYLE_ID;
  el.textContent = STYLES;
  document.head.appendChild(el);
}

function removeStyles() {
  const el = document.getElementById(STYLE_ID);
  if (el) el.remove();
}

/* --------------------------------------------------------------------------
   MARKUP
   -------------------------------------------------------------------------- */
function markup() {
  const modeCards = Object.keys(MODE_CONFIG).map((mode, i) => {
    const cfg = MODE_CONFIG[mode];
    return `
      <div class="mode-card" data-index="0${i + 1}">
        <h2>${escapeHtml(cfg.label)}</h2>
        <p>${escapeHtml(cfg.desc)}</p>
        <div class="count" id="count-${cfg.category}">— images disponibles</div>
        <button class="btn-play" data-mode="${mode}">Jouer</button>
      </div>`;
  }).join("");

  return `
  <div id="dossier-root">
    <div class="app">
      <div class="masthead">
        <h1>Le <span>Dossier</span></h1>
        <div class="tag">Jeu de reconnaissance — ${TOTAL_ROUNDS} manches</div>
      </div>

      <section id="screen-home" class="screen">
        <div class="modes">${modeCards}</div>
      </section>

      <section id="screen-waiting" class="screen">
        <div class="waiting-list" id="waiting-list"></div>
        <div class="waiting-hint" id="waiting-hint">En attente de l'hôte…</div>
      </section>

      <section id="screen-game" class="screen">
        <div class="case-bar">
          <span>Mode : <span class="mode-label" id="game-mode-label"></span></span>
          <span id="round-label">Manche 1 / ${TOTAL_ROUNDS}</span>
        </div>
        <div class="progress-track"><div class="progress-fill" id="progress-fill"></div></div>
        <div class="file-wrap">
          <div class="photo-card">
            <div class="tape"></div>
            <img id="round-image" src="" alt="Photo indice">
          </div>
        </div>
        <form class="guess-form" id="guess-form" autocomplete="off">
          <input type="text" id="guess-input" placeholder="Nom de la personne…" autofocus required>
          <button type="submit">Valider</button>
        </form>
        <div class="hint-row" id="hint-row">Appuyez sur Entrée ou cliquez sur Valider pour valider votre réponse</div>
        <div class="reveal-row" id="reveal-row" style="display:none;"></div>
        <div class="players-answers" id="players-answers"></div>
      </section>

      <section id="screen-results" class="screen">
        <div class="score-banner">Partie terminée</div>
        <div class="leaderboard" id="leaderboard"></div>
        <table class="results">
          <thead>
            <tr><th>#</th><th>Indice</th><th>Réponse attendue</th><th>Réponses des joueurs</th></tr>
          </thead>
          <tbody id="results-body"></tbody>
        </table>
        <div class="results-actions">
          <button class="btn-secondary" id="home-btn">Retour à l'accueil</button>
        </div>
      </section>
    </div>
  </div>`;
}

/* --------------------------------------------------------------------------
   MODULE
   -------------------------------------------------------------------------- */
let cleanup = null;

export default {
  async mount(container, context) {
    const { hostId, players, me, sendMessage, onMessage, onEnd } = context;
    const isHost = me && me.id === hostId;

    injectStyles();
    container.innerHTML = markup();

    const el = {
      root: container.querySelector("#dossier-root"),
      screens: container.querySelectorAll(".screen"),
      home: container.querySelector("#screen-home"),
      waiting: container.querySelector("#screen-waiting"),
      waitingList: container.querySelector("#waiting-list"),
      game: container.querySelector("#screen-game"),
      results: container.querySelector("#screen-results"),
      modeLabel: container.querySelector("#game-mode-label"),
      roundLabel: container.querySelector("#round-label"),
      progressFill: container.querySelector("#progress-fill"),
      roundImage: container.querySelector("#round-image"),
      guessForm: container.querySelector("#guess-form"),
      guessInput: container.querySelector("#guess-input"),
      guessBtn: container.querySelector("#guess-form button"),
      hintRow: container.querySelector("#hint-row"),
      revealRow: container.querySelector("#reveal-row"),
      playersAnswers: container.querySelector("#players-answers"),
      leaderboard: container.querySelector("#leaderboard"),
      resultsBody: container.querySelector("#results-body"),
      homeBtn: container.querySelector("#home-btn")
    };

    function showScreen(id) {
      el.screens.forEach(s => s.classList.remove("active"));
      const target = container.querySelector("#" + id);
      if (target) target.classList.add("active");
    }

    function playerName(id) {
      if (me && me.id === id) return (me.pseudo || "Vous") + " (vous)";
      const p = players.find(p => p.id === id);
      return p ? p.pseudo : "Joueur";
    }

    let engine = null;         // only defined on the host
    let hasAnsweredThisRound = false;
    let revealTimer = null;

    /* ---------------- Host-only: run the engine, broadcast state ---------------- */
    function broadcastAndRender() {
      const state = engine.getState();
      renderFromState(state);
      sendMessage({ type: "STATE", state });
    }

    function scheduleAdvance() {
      clearTimeout(revealTimer);
      revealTimer = setTimeout(() => {
        engine.advance();
        broadcastAndRender();
      }, 3200);
    }

    function refreshHomeCounts() {
      Object.keys(MODE_CONFIG).forEach(mode => {
        const cfg = MODE_CONFIG[mode];
        const total = poolForMode(mode).length;
        const countEl = container.querySelector(`#count-${cfg.category}`);
        if (countEl) countEl.textContent = `${total} image${total !== 1 ? "s" : ""} disponible${total !== 1 ? "s" : ""}`;
        const btn = container.querySelector(`.btn-play[data-mode="${mode}"]`);
        if (btn) btn.disabled = total === 0;
      });
    }

    function onModePicked(e) {
      const mode = e.currentTarget.dataset.mode;
      const started = engine.start(mode);
      if (!started) {
        alert("Aucune image disponible pour ce mode dans imageDB.");
        return;
      }
      broadcastAndRender();
    }

    /* ---------------- Networking ---------------- */
    function handleSocketMessage({ from, data }) {
      if (!data) return;
      if (isHost) {
        if (data.action === "GUESS" && engine) {
          const applied = engine.submitGuess(from, data.value);
          if (applied) {
            broadcastAndRender();
            if (engine.phase === "reveal") scheduleAdvance();
          }
        }
      } else if (data.type === "STATE") {
        renderFromState(data.state);
      }
    }
    const offMessage = onMessage(handleSocketMessage);

    /* ---------------- Rendering (runs on every client, including host) ---------------- */
    function renderFromState(state) {
      if (state.mode) el.modeLabel.textContent = MODE_CONFIG[state.mode].label;

      if (state.phase === "lobby") {
        showScreen(isHost ? "screen-home" : "screen-waiting");
        if (!isHost) renderWaitingList();
        return;
      }

      if (state.phase === "playing") {
        hasAnsweredThisRound = state.answeredIds.includes(me.id);
        showScreen("screen-game");
        el.roundImage.src = state.imagePath || "";
        el.roundImage.alt = "Indice manche " + (state.currentRound + 1);
        el.roundLabel.textContent = `Manche ${state.currentRound + 1} / ${state.totalRounds}`;
        el.progressFill.style.width = `${(state.currentRound / state.totalRounds) * 100}%`;
        el.revealRow.style.display = "none";
        el.hintRow.style.display = "";
        el.guessInput.disabled = hasAnsweredThisRound;
        el.guessBtn.disabled = hasAnsweredThisRound;
        if (!hasAnsweredThisRound) el.guessInput.value = "";
        el.hintRow.textContent = hasAnsweredThisRound
          ? "Réponse envoyée — en attente des autres joueurs…"
          : "Appuyez sur Entrée ou cliquez sur Valider pour valider votre réponse";
        renderAnsweredProgress(state);
        return;
      }

      if (state.phase === "reveal") {
        showScreen("screen-game");
        el.roundLabel.textContent = `Manche ${state.currentRound + 1} / ${state.totalRounds}`;
        el.progressFill.style.width = `${((state.currentRound + 1) / state.totalRounds) * 100}%`;
        el.guessInput.disabled = true;
        el.guessBtn.disabled = true;
        el.hintRow.style.display = "none";
        el.revealRow.style.display = "";
        const reveal = state.reveal;
        el.revealRow.textContent = reveal ? `Réponse : ${reveal.person}` : "";
        renderRevealAnswers(reveal);
        return;
      }

      if (state.phase === "finished") {
        showScreen("screen-results");
        renderResults(state);
      }
    }

    function renderAnsweredProgress(state) {
      el.playersAnswers.innerHTML = `<div class="player-answer-row"><span>Réponses reçues</span><span>${state.answeredIds.length} / ${state.totalPlayers}</span></div>`;
    }

    function renderRevealAnswers(reveal) {
      el.playersAnswers.innerHTML = "";
      if (!reveal) return;
      Object.entries(reveal.answers).forEach(([playerId, answer]) => {
        const row = document.createElement("div");
        row.className = "player-answer-row";
        row.innerHTML = `<span>${escapeHtml(playerName(playerId))} — ${escapeHtml(answer.value)}</span>
          <span class="verdict ${answer.correct ? "correct" : "wrong"}">${answer.correct ? "Correct" : "Incorrect"}</span>`;
        el.playersAnswers.appendChild(row);
      });
    }

    function renderWaitingList() {
      el.waitingList.innerHTML = players.map(p => `
        <div class="player-row"><span>${escapeHtml(p.pseudo)}${p.id === me.id ? " (vous)" : ""}</span>${p.id === hostId ? "<span>Hôte</span>" : ""}</div>
      `).join("");
    }

    function renderResults(state) {
      const ranked = players.slice().sort((a, b) => (state.scores[b.id] || 0) - (state.scores[a.id] || 0));
      el.leaderboard.innerHTML = ranked.map((p, i) => `
        <div class="leaderboard-row ${p.id === me.id ? "me" : ""}">
          <span><span class="rank">#${i + 1}</span>${escapeHtml(p.pseudo)}${p.id === me.id ? " (vous)" : ""}</span>
          <span>${state.scores[p.id] || 0} / ${state.totalRounds}</span>
        </div>`).join("");

      const history = state.finalHistory || [];
      el.resultsBody.innerHTML = history.map((round, i) => {
        const answersHtml = Object.entries(round.answers).map(([playerId, answer]) => `
          <div class="player-answer-row">
            <span>${escapeHtml(playerName(playerId))} — ${escapeHtml(answer.value)}</span>
            <span class="verdict ${answer.correct ? "correct" : "wrong"}">${answer.correct ? "Correct" : "Incorrect"}</span>
          </div>`).join("");
        return `
          <tr>
            <td>${i + 1}</td>
            <td>${round.refImage ? `<img src="${round.refImage}" alt="${escapeHtml(round.person)}">` : "—"}</td>
            <td>${escapeHtml(round.person)}</td>
            <td>${answersHtml}</td>
          </tr>`;
      }).join("");
    }

    /* ---------------- Wiring ---------------- */
    if (isHost) {
      engine = new GameEngine(players);
      container.querySelectorAll(".btn-play").forEach(btn => btn.addEventListener("click", onModePicked));
      refreshHomeCounts();
      renderFromState(engine.getState());
    } else {
      showScreen("screen-waiting");
      renderWaitingList();
    }

    function onGuessSubmit(e) {
      e.preventDefault();
      if (hasAnsweredThisRound) return;
      const value = el.guessInput.value.trim();
      hasAnsweredThisRound = true;
      el.guessInput.disabled = true;
      el.guessBtn.disabled = true;

      if (isHost) {
        engine.submitGuess(me.id, value);
        broadcastAndRender();
        if (engine.phase === "reveal") scheduleAdvance();
      } else {
        sendMessage({ action: "GUESS", value }, hostId);
      }
    }
    el.guessForm.addEventListener("submit", onGuessSubmit);

    function onHomeClick() {
      if (!isHost || !engine) return;
      // Clôture : le serveur ramène tout le salon (contrat onEnd de la plateforme).
      const state = engine.getState();
      const ranked = players.slice().sort((a, b) => (state.scores[b.id] || 0) - (state.scores[a.id] || 0));
      const top = ranked[0];
      onEnd({
        summary: top ? `🖼️ Le Dossier — ${top.pseudo} gagne avec ${state.scores[top.id] || 0}/${state.totalRounds} !` : 'Le Dossier — partie terminée.',
        scores: state.scores,
      });
    }
    el.homeBtn.addEventListener("click", onHomeClick);
    if (!isHost) {
      el.homeBtn.style.display = "none";
    } else {
      el.homeBtn.textContent = "🏁 Retour au salon (tous)";
    }

    // Host : bouton de secours pour révéler la manche si un joueur ne répond plus.
    let forceBtn = null;
    if (isHost) {
      forceBtn = document.createElement("button");
      forceBtn.type = "button";
      forceBtn.textContent = "⏭️ Révéler sans attendre";
      forceBtn.style.cssText = "margin-top:10px;padding:8px 14px;border-radius:9px;border:1px solid rgba(255,255,255,.2);background:transparent;color:inherit;cursor:pointer;font-size:13px;";
      forceBtn.addEventListener("click", () => {
        if (engine && engine.phase === "playing") {
          engine.forceReveal();
          broadcastAndRender();
          scheduleAdvance();
        }
      });
      el.guessForm.insertAdjacentElement("afterend", forceBtn);
    }

    /* ---------------- Cleanup ---------------- */
    cleanup = function () {
      clearTimeout(revealTimer);
      offMessage();
      container.querySelectorAll(".btn-play").forEach(btn => btn.removeEventListener("click", onModePicked));
      el.guessForm.removeEventListener("submit", onGuessSubmit);
      el.homeBtn.removeEventListener("click", onHomeClick);
      if (forceBtn) forceBtn.remove();
      container.innerHTML = "";
      removeStyles();
      engine = null;
    };
  },

  async unmount() {
    if (cleanup) {
      cleanup();
      cleanup = null;
    }
  }
};
