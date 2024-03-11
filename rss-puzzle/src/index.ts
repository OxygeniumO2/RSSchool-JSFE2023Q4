import './default_css/modern-normalize.css';
import './default_css/default.css';
import { addContainerToBody } from './app-container/container';
import checkLocalStorageAndGenLogScreen from './utils/checkLSandGenLogScreen';
import generateStartScreen from './pages/start-screen/start-screen';

addContainerToBody();
checkLocalStorageAndGenLogScreen();
generateStartScreen();
