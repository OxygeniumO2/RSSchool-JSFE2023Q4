import './modal.css';
// eslint-disable-next-line import/no-cycle
import { loginPageRouteHandler } from '../router/router';
import createElem from '../utils/create-elem';

function createErrorAuthModal(
  websocket: WebSocket,
  messageError: string,
): HTMLElement {
  const modal = createElem({
    tagName: 'div',
    classNames: ['error__auth__modal'],
  });

  const modalContentContainer = createElem({
    tagName: 'div',
    classNames: ['modal__error__content-container'],
  });

  const modalText = createElem({
    tagName: 'div',
    textContent: `${messageError}`,
  });

  const modalBtn = createElem({ tagName: 'button', textContent: 'Back' });

  modalBtn.addEventListener('click', () => {
    loginPageRouteHandler(websocket);
  });

  modalContentContainer.append(modalText, modalBtn);

  modal.append(modalContentContainer);

  return modal;
}

export default createErrorAuthModal;
