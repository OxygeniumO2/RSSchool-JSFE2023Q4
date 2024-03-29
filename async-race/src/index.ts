import './default-css/modern-normalize.css';
import './default-css/default.css';
import { addContainerToBody } from './app-container/app-container';
import buildChangePageContainer from './pages/garage/change-page-container';
import { buildGarageControls } from './pages/garage/garage';
import buildGaragePage from './pages/garage/build-garage-page';

addContainerToBody();
buildChangePageContainer();
buildGarageControls();
buildGaragePage();
