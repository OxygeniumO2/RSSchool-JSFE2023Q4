/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import checkLSAndGenLogOrStartScreen from '../utils/checkLSAndGenLogOrStartScreen';
import { appendRoot } from './container';

function init() {
  appendRoot();
  checkLSAndGenLogOrStartScreen();
}

export default init;
