/* eslint-disable object-curly-newline */
/* eslint-disable no-undef */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import './logout.css';
import createElem from '../../../../utils/createElem';
import createLoginScreen from '../../../login-screen/login-screen';
import {
  GAMEFIELD_WORDS_CONTAINER,
  currRow,
  handleCurrRowClick,
  prevHandlerWithRound,
  GAMEFIELD,
  setCurrRow,
  setPrevHandlerWithRound,
} from '../../game-screen';
import { container } from '../../../../app-container/container';
import { MENU } from '../menu-container/menu-container';
import { BTN_HINT_TEXT, HINT_CONTAINER } from '../game-hints/game-hint-text';
import { CHECK_BTN, CONTINUE_BTN, HINT_AUDIO_BTN, HINT_BTN } from '../game-buttons/game-buttons';
import { AUDIO_ICO, AUDIO_ICO_CONTAINER, HINT_AUDIO_TEXT } from '../game-hints/game-hint-audio';

const LOGOUT_BTN_TEXT: string = 'Logout';

function logout() {
  localStorage.clear();
  GAMEFIELD.innerHTML = '';
  MENU.innerHTML = '';
  GAMEFIELD_WORDS_CONTAINER.innerHTML = '';
  document.body.style.opacity = '0';
  currRow.removeEventListener('click', handleCurrRowClick);
  GAMEFIELD_WORDS_CONTAINER.removeEventListener('click', prevHandlerWithRound as EventListener);
  setCurrRow(null);
  setPrevHandlerWithRound(null);
  HINT_CONTAINER.classList.add('_open');
  HINT_BTN.textContent = BTN_HINT_TEXT;
  HINT_BTN.classList.remove('_off');
  CHECK_BTN.classList.remove('btn_active');
  CHECK_BTN.classList.add('btn_wrong');
  CONTINUE_BTN.classList.add('btn_wrong');
  CONTINUE_BTN.classList.remove('btn_active');
  AUDIO_ICO_CONTAINER.classList.add('_open');
  HINT_AUDIO_BTN.textContent = HINT_AUDIO_TEXT;
  HINT_AUDIO_BTN.classList.remove('_off');
  AUDIO_ICO.classList.remove('_hidden');
  setTimeout(() => {
    container.innerHTML = '';
    createLoginScreen();
    document.body.style.opacity = '1';
  }, 400);
}

function generateLogout(): HTMLElement {
  const logoutBtn = createElem({ tagName: 'button', classNames: ['btn', 'logout-btn'], textContent: LOGOUT_BTN_TEXT });
  logoutBtn.addEventListener('click', logout);
  return logoutBtn;
}

export default generateLogout;
