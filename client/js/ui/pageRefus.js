/**
 * pageRefus.js — page plein écran affichée quand le serveur refuse un pseudo
 * réservé (code PSEUDO_RESERVE).
 *
 * Contenu : un verset en très grand, le message de refus (neutre — celui du
 * serveur), et un bouton « Bonne cause » vers la page de don de la Croix-Rouge
 * (lien nettoyé de ses paramètres de suivi publicitaire). Un lien discret
 * permet de recharger pour choisir un autre pseudo.
 *
 * Leçon des correctifs précédents : l'overlay est ajouté à <body>, JAMAIS dans
 * la grille .app — et tout son style vit dans son propre <style>, injecté avec
 * lui et retiré avec lui.
 */

const LIEN_DON = 'https://donner.croix-rouge.fr/faire-un-don/~mon-don';

const STYLE = `
.refus-page{position:fixed;inset:0;z-index:1000;display:grid;place-items:center;
  background:radial-gradient(1200px 700px at 50% 20%, #101024 0%, #07070f 60%, #050509 100%);
  color:#eef0ff;font-family:inherit;padding:24px;text-align:center;overflow-y:auto}
.refus-inner{max-width:860px;display:flex;flex-direction:column;align-items:center;
  gap:clamp(18px,3.5vmin,34px);animation:refus-in .5s cubic-bezier(.22,1,.36,1)}
@keyframes refus-in{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:none}}
.refus-ref{font-size:clamp(15px,2vmin,19px);letter-spacing:.35em;text-transform:uppercase;
  color:#9aa0c8;margin:0}
.refus-verset{font-size:clamp(26px,5.2vmin,52px);line-height:1.25;font-weight:800;margin:0;
  background:linear-gradient(115deg,#f3e7c3 0%,#e8c96a 35%,#fff6dc 55%,#d4af4f 80%);
  -webkit-background-clip:text;background-clip:text;color:transparent}
.refus-message{font-size:clamp(15px,2.2vmin,19px);color:#c9cde8;max-width:560px;margin:0;line-height:1.6}
.refus-btn{display:inline-block;padding:16px 42px;border-radius:14px;border:1px solid #d4af4f;
  font-size:clamp(16px,2.4vmin,20px);font-weight:700;color:#f6f1df;text-decoration:none;cursor:pointer;
  background:linear-gradient(180deg,#14532d 0%,#0b3d22 55%,#082d19 100%);
  box-shadow:0 0 0 1px rgba(212,175,79,.35), inset 0 1px 0 rgba(255,246,220,.35),
    inset 0 -8px 18px rgba(0,0,0,.35), 0 10px 30px rgba(8,45,25,.55);
  position:relative;overflow:hidden;transition:transform .15s ease, box-shadow .15s ease}
.refus-btn::after{content:'';position:absolute;inset:0;
  background:linear-gradient(105deg,transparent 38%,rgba(255,246,220,.28) 50%,transparent 62%);
  transform:translateX(-120%);transition:transform .6s ease}
.refus-btn:hover{transform:translateY(-2px);box-shadow:0 0 0 1px rgba(212,175,79,.6),
  inset 0 1px 0 rgba(255,246,220,.45), 0 14px 36px rgba(8,45,25,.65)}
.refus-btn:hover::after{transform:translateX(120%)}
.refus-retry{font-size:13px;color:#8b90b5;background:none;border:none;cursor:pointer;
  text-decoration:underline;padding:4px}
.refus-retry:hover{color:#c9cde8}
`;

function h(tag, props = {}, children = []) {
  const el = document.createElement(tag);
  Object.assign(el, props);
  (Array.isArray(children) ? children : [children]).forEach((c) => {
    if (c != null) el.append(typeof c === 'string' ? document.createTextNode(c) : c);
  });
  return el;
}

let montee = false;

export function afficherPageRefus(message) {
  if (montee) return;
  montee = true;

  const style = h('style', {}, STYLE);
  const page = h('div', { className: 'refus-page' }, [
    h('div', { className: 'refus-inner' }, [
      h('p', { className: 'refus-ref' }, 'Proverbes 3:13'),
      h('h1', { className: 'refus-verset' },
        '« Heureux l\u2019homme qui a trouv\u00e9 la sagesse, et l\u2019homme qui poss\u00e8de l\u2019intelligence ! »'),
      h('p', { className: 'refus-message' },
        message || 'Votre pseudo n\u2019est pas Autorisé. Choisissez-en un autre.'),
      h('a', {
        className: 'refus-btn',
        href: LIEN_DON,
        target: '_blank',
        rel: 'noopener noreferrer',
      }, 'Bonne cause'),
      h('button', {
        className: 'refus-retry',
        onclick: () => window.location.reload(),
      }, 'Le racisme, l\'homophobie, la misogynie et l\'aigreur ne sont pas acceptés chez nous. Désolé.'),
    ]),
  ]);

  document.body.append(style, page);
}

/** Branche la page sur le bus d'événements de l'application. */
export function initPageRefus(bus) {
  bus.on('sys:error', ({ code, message }) => {
    if (code === 'PSEUDO_RESERVE') afficherPageRefus(message);
  });
}
