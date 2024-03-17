import './game-hint.css';
// import { container } from '../../../../app-container/container';
import { createElem } from '../../../../utils/createElem';
import GameData from '../../../../interfaces/game-data-interface';
import { getDataRoundFromLS } from '../../../../utils/getDataRoundLS';
import { GAMEFIELD } from '../../game-screen';

const BTN_HINT_TEXT = 'Hint-ON';
const HINT_CONTAINER = createElem({ tag: 'div', classesCss: ['hint-container', '_open'] });
const HINT_INNER_DIV = createElem({ tag: 'div', classesCss: ['hint-inner'] });

export function createHintBtn(): HTMLElement {
  const btn = createElem({ tag: 'button', classesCss: ['btn', 'hint-btn_on'], textContent: BTN_HINT_TEXT });
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
