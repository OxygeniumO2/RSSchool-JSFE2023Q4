import changeBtnsState from '../../utils/change-state-btns';
import { LocalStoragePages, getPage } from '../../utils/get-page-from-ls';
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

  const currPage = getPage(LocalStoragePages.garagePage);

  await buildGaragePage(currPage);
}

export default resetRace;
