import { LOCALSTORAGE_KEY_LASTNAME, LOCALSTORAGE_KEY_NAME } from './localStorageKeys';
import createLoginScreen from '../pages/login-screen/login-screen';

function checkLocalStorageAndGenLogScreen() {
  if (!localStorage.getItem(LOCALSTORAGE_KEY_LASTNAME) && !localStorage.getItem(LOCALSTORAGE_KEY_NAME)) {
    createLoginScreen();
  }
}

export default checkLocalStorageAndGenLogScreen;
