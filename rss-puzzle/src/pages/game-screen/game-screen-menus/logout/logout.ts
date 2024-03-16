import './logout.css';
import { createElem } from '../../../../utils/createElem';
import createLoginScreen from '../../../login-screen/login-screen';
import {
  GAMEFIELD_WORDS_CONTAINER,
  currRow,
  handleCurrRowClick,
  prevHandlerWithRound,
  GAMEFIELD,
} from '../../game-screen';
import { container } from '../../../../app-container/container';
import { MENU } from '../menu-container/menu-container';

const LOGOUT_BTN_TEXT: string = 'Logout';

function generateLogout(): HTMLElement {
  const logoutBtn = createElem({ tag: 'button', classesCss: ['btn'], textContent: LOGOUT_BTN_TEXT });
  logoutBtn.addEventListener('click', logout);
  return logoutBtn;
}

function logout() {
  localStorage.clear();
  GAMEFIELD.innerHTML = '';
  MENU.innerHTML = '';
  GAMEFIELD_WORDS_CONTAINER.innerHTML = '';
  document.body.style.opacity = '0';
  currRow.removeEventListener('click', handleCurrRowClick);
  GAMEFIELD_WORDS_CONTAINER.removeEventListener('click', prevHandlerWithRound as EventListener);
  setTimeout(() => {
    container.innerHTML = '';
    createLoginScreen();
    document.body.style.opacity = '1';
  }, 400);
}

export default generateLogout;
