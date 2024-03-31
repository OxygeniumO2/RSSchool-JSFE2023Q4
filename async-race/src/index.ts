import './default-css/modern-normalize.css';
import './default-css/default.css';
import { addContainerToBody } from './app-container/app-container';
import buildChangePageContainer from './pages/garage/change-page-container';
import { buildGarageControls } from './pages/garage/build-garage-controls';
import buildGaragePage from './pages/garage/build-garage-page';
import buildWinnersPage from './pages/winners/build-winners-page';

addContainerToBody();
buildChangePageContainer();
buildGarageControls();
buildGaragePage();
buildWinnersPage();
