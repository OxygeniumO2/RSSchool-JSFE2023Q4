/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import './game-hint-text.css';
import createElem from '../../../../utils/createElem';
import GameData from '../../../../interfaces/game-data-interface';
import { getDataRoundFromLS } from '../../../../utils/getDataRoundLS';
import { GAMEFIELD } from '../../game-screen';
import { HINT_BTN } from '../game-btns-container/game-btns-container';

export const BTN_HINT_TEXT = 'Hint Text - ON';
export const BTN_HINT_TEXT_OFF = 'Hint Text - OFF';
export const HINT_CONTAINER = createElem({ tagName: 'div', classNames: ['hint-container', '_open'] });
const HINT_INNER_DIV = createElem({ tagName: 'div', classNames: ['hint-inner'] });

// eslint-disable-next-line no-unused-vars
function toggleHint(this: HTMLElement) {
  this.classList.toggle('_off');
  if (this.textContent === BTN_HINT_TEXT) {
    this.textContent = BTN_HINT_TEXT_OFF;
    HINT_CONTAINER.classList.remove('_open');
  } else {
    this.textContent = BTN_HINT_TEXT;
    HINT_CONTAINER.classList.add('_open');
  }
}

export function createHintBtn(): HTMLElement {
  const btn = createElem({ tagName: 'button', classNames: ['btn', 'hint-btn'], textContent: BTN_HINT_TEXT });
  btn.addEventListener('click', toggleHint);
  return btn;
}

export function createHintContainer() {
  HINT_CONTAINER.append(HINT_INNER_DIV);
  GAMEFIELD.insertAdjacentElement('afterend', HINT_CONTAINER);
}

export function generateHint(round: GameData) {
  const currDataRound = getDataRoundFromLS();
  const hintText: string = round.words[currDataRound.localStorageRoundNumber].textExampleTranslate;
  HINT_INNER_DIV.textContent = hintText;
}

export function hintInnerOpacityChange() {
  HINT_INNER_DIV.style.opacity = '0';
  setTimeout(() => {
    HINT_INNER_DIV.style.opacity = '1';
    HINT_INNER_DIV.removeAttribute('style');
  }, 300);
}

export function checkIfHintDisabledDontShowHint() {
  if (HINT_BTN.textContent === BTN_HINT_TEXT_OFF) {
    HINT_CONTAINER.classList.remove('_open');
  }
}
