import { LOCALSTORAGE_KEY_LASTNAME, LOCALSTORAGE_KEY_NAME } from './localStorageKeys';
import createLoginScreen from '../pages/login-screen/login-screen';
import generateStartScreen from '../pages/start-screen/start-screen';

function checkLSAndGenLogOrStartScreen() {
  if (!localStorage.getItem(LOCALSTORAGE_KEY_LASTNAME) && !localStorage.getItem(LOCALSTORAGE_KEY_NAME)) {
    createLoginScreen();
  } else {
    generateStartScreen();
  }
}

export default checkLSAndGenLogOrStartScreen;
