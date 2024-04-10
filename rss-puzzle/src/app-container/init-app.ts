/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import checkLSAndGenLogOrStartScreen from '../utils/logOrStartScreen';
import { appendRoot } from './container';

function init() {
  appendRoot();
  checkLSAndGenLogOrStartScreen();
}

export default init;
