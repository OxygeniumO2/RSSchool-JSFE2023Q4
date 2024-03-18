import './game-hint-text.css';
// import { container } from '../../../../app-container/container';
import { createElem } from '../../../../utils/createElem';
import GameData from '../../../../interfaces/game-data-interface';
import { getDataRoundFromLS } from '../../../../utils/getDataRoundLS';
import { GAMEFIELD } from '../../game-screen';
import { HINT_BTN } from '../game-btns-container/game-btns-container';

export const BTN_HINT_TEXT = 'Hint Text - ON';
export const BTN_HINT_TEXT_OFF = 'Hint Text - OFF';
export const HINT_CONTAINER = createElem({ tag: 'div', classesCss: ['hint-container', '_open'] });
const HINT_INNER_DIV = createElem({ tag: 'div', classesCss: ['hint-inner'] });

export function createHintBtn(): HTMLElement {
  const btn = createElem({ tag: 'button', classesCss: ['btn', 'hint-btn'], textContent: BTN_HINT_TEXT });
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

export function checkIfHintDisabledDontShowHint() {
  if (HINT_BTN.textContent === BTN_HINT_TEXT_OFF) {
    HINT_CONTAINER.classList.remove('_open');
  }
}
