/* eslint-disable import/no-cycle */
import './login-page.css';
import createElem from '../../utils/create-elem';
import { UserAuthClient } from '../../web-socket/web-socket-interfaces';
// eslint-disable-next-line import/no-cycle
import { mainPageRouteHandler } from '../../router/router';
import SessionStorageKeys from '../../utils/session-storage-keys';
import createAboutBtn from '../about-page/about-btn';
import createErrorAuthModal from '../../modal-user-already-logged/modal';
import APP_CONTAINER from '../../app-container/app-container';
import removeAllChildren from '../../utils/remove-all-children';
import WebSocketMessageTypes from '../../utils/websocket-msg-types';

function createLoginPage(websocket: WebSocket): HTMLElement {
  const loginContainer = createElem({
    tagName: 'div',
    classNames: ['login-container'],
  });

  const loginForm = createElem({
    tagName: 'form',
    classNames: ['login__form'],
  });

  const loginUsername = createElem({
    tagName: 'input',
    attributes: [
      ['placeholder', 'Login'],
      ['type', 'text'],
      ['required', true],
      ['autocomplete', 'username'],
      ['minlength', '3'],
    ],
  }) as HTMLInputElement;

  const loginPassword = createElem({
    tagName: 'input',
    attributes: [
      ['placeholder', 'Password'],
      ['type', 'password'],
      ['required', 'true'],
      ['autocomplete', 'current-password'],
      ['minlength', '4'],
      ['pattern', '.*[A-Z].*'],
      ['title', 'Minimum one letter in uppercase, English alphabet'],
    ],
  }) as HTMLInputElement;

  const loginBtn = createElem({
    tagName: 'button',
    textContent: 'Login',
    attributes: [['type', 'submit']],
  });

  loginForm.append(loginUsername, loginPassword, loginBtn);

  loginForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const randomId = crypto.randomUUID();
    const userLogin = loginUsername.value.trim();
    const userPassword = loginPassword.value;

    sessionStorage.setItem(SessionStorageKeys.login, userLogin);
    sessionStorage.setItem(SessionStorageKeys.password, userPassword);

    const userData: UserAuthClient = {
      id: randomId,
      type: WebSocketMessageTypes.userLogin,
      payload: {
        user: {
          login: userLogin,
          password: userPassword,
        },
      },
    };

    mainPageRouteHandler(websocket);

    websocket.send(JSON.stringify(userData));
  });

  websocket.addEventListener('message', (e) => {
    const message = JSON.parse(e.data);

    if (message.type === WebSocketMessageTypes.error) {
      removeAllChildren(APP_CONTAINER);
      const modal = createErrorAuthModal(websocket, message.payload.error);
      APP_CONTAINER.append(modal);
      sessionStorage.clear();
    }
  });

  const aboutPageBtn = createAboutBtn(websocket);

  loginContainer.append(loginForm, aboutPageBtn);

  return loginContainer;
}

export default createLoginPage;
