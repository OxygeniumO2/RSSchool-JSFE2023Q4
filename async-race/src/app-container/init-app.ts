import { buildGarageControls } from '../pages/garage/build-garage-controls';
import buildGaragePage from '../pages/garage/build-garage-page';
import buildChangePageContainer from '../pages/garage/change-page-container';
import { appendModalWinnerToApp } from '../pages/winner-modal/winner-modal';
import buildWinnersPage from '../pages/winners/build-winners-page';
import { addContainerToBody } from './app-container';

function init() {
  addContainerToBody();
  buildChangePageContainer();
  buildGarageControls();
  buildGaragePage();
  buildWinnersPage();
  appendModalWinnerToApp();
}

export default init;
