import './default-css/modern-normalize.css';
import './default-css/default.css';
import { addContainerToBody } from './app-container/app-container';
import buildChangePageContainer from './pages/garage/change-page-container';
import { buildGarageControls } from './pages/garage/build-garage-controls';
import buildGaragePage from './pages/garage/build-garage-page';
import buildWinnersPage from './pages/winners/build-winners-page';
import { appendModalWinnerToApp } from './pages/winner-modal/winner-modal';

addContainerToBody();
buildChangePageContainer();
buildGarageControls();
buildGaragePage();
buildWinnersPage();
appendModalWinnerToApp();
