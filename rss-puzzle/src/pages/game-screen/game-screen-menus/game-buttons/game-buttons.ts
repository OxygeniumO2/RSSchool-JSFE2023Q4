/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import './game-btns-container.css';
import createElem from '../../../../utils/createElem';
import { container } from '../../../../app-container/container';
import createContinueBtn from '../buttons/continue-btn';
import { createCheckBtn } from '../buttons/check-btn';
import { createCompleteBtn } from '../buttons/auto-complete-btn';
import { createHintBtn } from '../game-hints/game-hint-text';
import { createAudioHintBtn } from '../game-hints/game-hint-audio';

export const CONTINUE_BTN = createContinueBtn();
export const CHECK_BTN = createCheckBtn();
export const COMPLETE_BTN = createCompleteBtn();
export const HINT_BTN = createHintBtn();
export const HINT_AUDIO_BTN = createAudioHintBtn();

function createGameBtnsContainer() {
  const gameBtnsContainer = createElem({ tagName: 'div', classNames: ['game__btns-container'] });
  gameBtnsContainer.append(HINT_AUDIO_BTN, HINT_BTN, CHECK_BTN, COMPLETE_BTN, CONTINUE_BTN);
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
