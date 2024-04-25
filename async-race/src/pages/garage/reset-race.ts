import changeBtnsState from '../../utils/change-state-btns';
import getCurrPage from '../../utils/get-page-from-ls';
import { ModalWinner } from '../winner-modal/winner-modal';
import buildGaragePage from './build-garage-page';

async function resetRace() {
  changeBtnsState(true);
  const resetRaceBtn = document.querySelector(
    '.reset__race-btn',
  ) as HTMLButtonElement;
  resetRaceBtn.disabled = true;

  ModalWinner.textContent = '';
  ModalWinner.classList.remove('_active');

  const currPage = getCurrPage();

  await buildGaragePage(currPage);
}

export default resetRace;
