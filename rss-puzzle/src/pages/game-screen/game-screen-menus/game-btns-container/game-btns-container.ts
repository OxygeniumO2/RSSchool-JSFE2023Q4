import './game-btns-container.css';
import { createElem } from '../../../../utils/createElem';
import { container } from '../../../../app-container/container';
import createContinueBtn from '../game-btns/continue-btn';
import { createCheckBtn } from '../game-btns/check-btn';
import { createCompleteBtn } from '../game-btns/auto-complete-btn';

export const CONTINUE_BTN = createContinueBtn();
export const CHECK_BTN = createCheckBtn();
export const COMPLETE_BTN = createCompleteBtn();

function createGameBtnsContainer() {
  const gameBtnsContainer = createElem({ tag: 'div', classesCss: ['game__btns-container'] });
  gameBtnsContainer.append(CHECK_BTN, COMPLETE_BTN, CONTINUE_BTN);
  container.append(gameBtnsContainer);
}

export function fromInnactiveToActiveBtn(btn: HTMLElement): void {
  btn.classList.remove('btn_wrong');
  btn.classList.add('btn_active');
}

export function fromActiveToInnactiveBtn(btn: HTMLElement): void {
  btn.classList.remove('btn_active');
  btn.classList.add('btn_wrong');
}

export default createGameBtnsContainer;
