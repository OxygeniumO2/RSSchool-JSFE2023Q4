import './default-css/modern-normalize.css';
import './default-css/default.css';
import { addContainerToBody } from './app-container/app-container';
import buildGaragePage from './pages/garage/garage';
import buildChangePageContainer from './pages/garage/change-page-container';

addContainerToBody();
buildChangePageContainer();
buildGaragePage();
