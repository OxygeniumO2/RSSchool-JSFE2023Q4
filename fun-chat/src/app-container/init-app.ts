// eslint-disable-next-line import/no-cycle
import { router } from '../router/router';
import removeAllChildren from '../utils/remove-all-children';

function init(container: HTMLElement): void {
  document.body.append(container);
  window.addEventListener('popstate', router);
  router();
}

function renderPage(container: HTMLElement, ...elems: HTMLElement[]): void {
  removeAllChildren(container);
  container.append(...elems);
}

export { init, renderPage };
