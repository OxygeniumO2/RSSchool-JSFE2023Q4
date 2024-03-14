import './start-screen.css';
import { container } from '../../app-container/container';
import { createElem } from '../../utils/createElem';
import { LOCALSTORAGE_KEY_LASTNAME, LOCALSTORAGE_KEY_NAME } from '../../utils/localStorageKeys';
import generateGame from '../game-screen/game-screen';
import level1 from '../../data/words-levels/wordCollectionLevel1';
import gameData from '../../interfaces/game-data-interface';

const START_SCREEN_TITLE: string = 'RSS PUZZLE';
const START_SCREEN_DESC: string = 'You can learn English by clicking on words';
const START_SCREEN_BTN_TEXT: string = 'START';

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

    const currGamelevel: gameData = level1.rounds[0];
    generateGame(currGamelevel);
  });
  container.append(startScreen);
}

export default generateStartScreen;
