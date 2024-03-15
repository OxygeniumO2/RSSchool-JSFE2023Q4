import './logout.css';
import { createElem } from '../../../../utils/createElem';
import { container } from '../../../../app-container/container';
import createLoginScreen from '../../../login-screen/login-screen';
import { GAMEFIELD, GAMEFIELD_WORDS_CONTAINER } from '../../game-screen';

const LOGOUT_BTN_TEXT: string = 'Logout';

function generateLogout(): HTMLElement {
  const logoutBtn = createElem({ tag: 'button', classesCss: ['btn'], textContent: LOGOUT_BTN_TEXT });
  logoutBtn.addEventListener('click', logout);
  return logoutBtn;
}

function logout() {
  localStorage.clear();
  GAMEFIELD.innerHTML = '';
  GAMEFIELD_WORDS_CONTAINER.innerHTML = '';
  container.innerHTML = '';
  document.body.style.opacity = '0';
  setTimeout(() => {
    createLoginScreen();
    document.body.style.opacity = '1';
  }, 400);
}

export default generateLogout;
