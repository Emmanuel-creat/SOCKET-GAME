/**
 * Helpers DOM — création d'éléments sans innerHTML sur des données
 * utilisateur (protection XSS par construction).
 */

/**
 * Crée un élément.
 * @param {string} tag
 * @param {object} [attrs] className, dataset, listeners (onClick...), attributs.
 * @param {(Node|string)[]} [children]
 */
export function el(tag, attrs = {}, children = []) {
  const node = document.createElement(tag);
  for (const [key, value] of Object.entries(attrs)) {
    if (value === undefined || value === null) continue;
    if (key === 'className') node.className = value;
    else if (key === 'dataset') Object.assign(node.dataset, value);
    else if (key === 'style') Object.assign(node.style, value);
    else if (key.startsWith('on')) node.addEventListener(key.slice(2).toLowerCase(), value);
    else if (key in node) node[key] = value;
    else node.setAttribute(key, value);
  }
  for (const child of [].concat(children)) {
    node.append(child instanceof Node ? child : document.createTextNode(String(child)));
  }
  return node;
}

/** Vide un conteneur puis y insère les enfants donnés. */
export function replaceChildrenOf(container, ...children) {
  container.replaceChildren(...children);
  return container;
}

/** Formate une heure HH:MM à partir d'un timestamp. */
export function formatTime(timestamp) {
  return new Date(timestamp).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
}
