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
      ['title', 'Minimum one letter in uppercase'],
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
      type: 'USER_LOGIN',
      payload: {
        user: {
          login: userLogin,
          password: userPassword,
        },
      },
    };

    websocket.send(JSON.stringify(userData));
  });

  websocket.addEventListener('message', async (e) => {
    const message = JSON.parse(e.data);

    if (message.type === 'ERROR') {
      removeAllChildren(APP_CONTAINER);
      const modal = createErrorAuthModal(websocket);
      APP_CONTAINER.append(modal);
    }

    if (
      message.type === 'USER_LOGIN' ||
      message.type === 'USER_EXTERNAL_LOGIN'
    ) {
      await mainPageRouteHandler(websocket);
    }
  });

  const aboutPageBtn = createAboutBtn(websocket);

  loginContainer.append(loginForm, aboutPageBtn);

  return loginContainer;
}

export default createLoginPage;
