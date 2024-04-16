// eslint-disable-next-line import/no-cycle
import { aboutPageRouteHandler } from '../../router/router';
import createElem from '../../utils/create-elem';

function createAboutBtn(websocket: WebSocket): HTMLElement {
  const aboutPageBtn = createElem({ tagName: 'button', textContent: 'About' });

  aboutPageBtn.addEventListener('click', () => {
    aboutPageRouteHandler(websocket);
  });

  return aboutPageBtn;
}

export default createAboutBtn;
