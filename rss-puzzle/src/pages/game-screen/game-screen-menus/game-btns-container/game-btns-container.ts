import './game-btns-container.css';
import { createElem } from '../../../../utils/createElem';
import { container } from '../../../../app-container/container';
import createContinueBtn from '../game-btns/continue-btn';

const continueBtn = createContinueBtn();

function createGameBtnsContainer() {
  const gameBtnsContainer = createElem({ tag: 'div', classesCss: ['game__btns-container'] });
  gameBtnsContainer.append(continueBtn);
  container.append(gameBtnsContainer);
}

export function fromInnactiveToActiveBtn(): void {
  continueBtn.classList.remove('continue__btn_default');
  continueBtn.classList.add('continue__btn_active');
}

export default createGameBtnsContainer;
