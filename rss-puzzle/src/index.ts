/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import './default_css/modern-normalize.css';
import './default_css/default.css';
import { addContainerToBody } from './app-container/container';
import checkLSAndGenLogOrStartScreen from './utils/checkLSAndGenLogOrStartScreen';

addContainerToBody();
checkLSAndGenLogOrStartScreen();
