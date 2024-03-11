import './default_css/modern-normalize.css';
import './default_css/default.css';
import { addContainerToBody } from './app-container/container';
import checkLSAndGenLogOrStartScreen from './utils/checkLSandGenLogScreen';

addContainerToBody();
checkLSAndGenLogOrStartScreen();
