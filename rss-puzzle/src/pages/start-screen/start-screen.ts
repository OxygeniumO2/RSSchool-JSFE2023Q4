import './start-screen.css';
import { container } from '../../app-container/container';
import { createElem } from '../../utils/createElem';
import {
  LOCALSTORAGE_KEY_LASTNAME,
  LOCALSTORAGE_KEY_NAME,
  LOCALSTORAGE_KEY_ROUND_NUMBER,
} from '../../utils/localStorageKeys';
import generateGame from '../game-screen/game-screen';
import level1 from '../../data/words-levels/wordCollectionLevel1';
import { Level } from '../../interfaces/game-data-interface';
import createMenuContainer from '../game-screen/game-screen-menus/menu-container/menu-container';
import createGameBtnsContainer from '../game-screen/game-screen-menus/game-btns-container/game-btns-container';

const START_SCREEN_TITLE: string = 'RSS PUZZLE';
const START_SCREEN_DESC: string = 'You can learn English by clicking on words';
const START_SCREEN_BTN_TEXT: string = 'START';
const START_ROUND_NUMBER_DEFAULT_STRING: string = '0';

function generateStartScreen() {
  const startScreen = createElem({ tag: 'div', classesCss: ['start__screen'] });
  const startScreenTitle = createElem({
    tag: 'h1',
    classesCss: ['start__screen__title'],
    textContent: START_SCREEN_TITLE,
  });
  const startScreenDesc = createElem({ tag: 'p', classesCss: ['start__screen__desc'], textContent: START_SCREEN_DESC });

  const userNameFromLS = localStorage.getItem(LOCALSTORAGE_KEY_NAME);
  const userLastNameFromLS = localStorage.getItem(LOCALSTORAGE_KEY_LASTNAME);

  const userDataGreeting = `Welcome, ${userNameFromLS} ${userLastNameFromLS}`;

  const welcomeUserElem = createElem({
    tag: 'p',
    classesCss: ['start__screen__userinfo'],
    textContent: userDataGreeting,
  });

  const startButton = createElem({
    tag: 'button',
    classesCss: ['btn', 'start__screen__btn'],
    textContent: START_SCREEN_BTN_TEXT,
  });

  startScreen.append(startScreenTitle, startScreenDesc, welcomeUserElem, startButton);

  startButton.addEventListener('click', () => {
    startScreen.classList.add('_hidden');
    const currGamelevel: Level = level1;
    localStorage.setItem(LOCALSTORAGE_KEY_ROUND_NUMBER, START_ROUND_NUMBER_DEFAULT_STRING);
    createMenuContainer();
    generateGame(currGamelevel, 0);
    createGameBtnsContainer();
  });
  container.append(startScreen);
}

export default generateStartScreen;
