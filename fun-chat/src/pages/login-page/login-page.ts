import './login-page.css';
import createElem from '../../utils/create-elem';
import { UserAuthClient } from '../../web-socket/web-socket-interfaces';

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
    ],
  }) as HTMLInputElement;

  const loginPassword = createElem({
    tagName: 'input',
    attributes: [
      ['placeholder', 'Password'],
      ['type', 'password'],
      ['required', 'true'],
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
    const userLogin = loginUsername.value;
    const userPassword = loginPassword.value;

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

  loginContainer.append(loginForm);

  return loginContainer;
}

export default createLoginPage;
