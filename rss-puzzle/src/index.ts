/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import './default_css/modern-normalize.css';
import './default_css/default.css';
import { appendRoot } from './app-container/container';
import checkLSAndGenLogOrStartScreen from './utils/checkLSAndGenLogOrStartScreen';

appendRoot();
checkLSAndGenLogOrStartScreen();
