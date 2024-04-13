import './login-page.css';
import createElem from '../../utils/create-elem';

function createLoginPage(): HTMLElement {
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
  });

  const loginPassword = createElem({
    tagName: 'input',
    attributes: [
      ['placeholder', 'Password'],
      ['type', 'password'],
      ['required', 'true'],
    ],
  });

  const loginBtn = createElem({
    tagName: 'button',
    textContent: 'Login',
    attributes: [['type', 'submit']],
  });

  loginForm.append(loginUsername, loginPassword, loginBtn);

  loginContainer.append(loginForm);

  return loginContainer;
}

export default createLoginPage;
