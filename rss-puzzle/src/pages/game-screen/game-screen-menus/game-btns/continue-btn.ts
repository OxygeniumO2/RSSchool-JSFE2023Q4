import './continue-btn.css';
import { createElem } from '../../../../utils/createElem';
import { LOCALSTORAGE_KEY_ROUND, LOCALSTORAGE_KEY_ROUND_NUMBER } from '../../../../utils/localStorageKeys';
import {
  START_GAME_ZERO,
  GAMEFIELD,
  generateGamefieldRow,
  generateGamefieldWords,
  GAMEFIELD_WORDS_CONTAINER,
  moveWordFromRow,
  setCurrentRowNumber,
} from '../../game-screen';
import gameData from '../../../../interfaces/game-data-interface';
// import gameData from '../../../../interfaces/game-data-interface';

const BTN_CONTINUE_TEXT = 'Continue';
function createContinueBtn(): HTMLElement {
  const btn = createElem({
    tag: 'button',
    classesCss: ['btn', 'continue__btn_default'],
    textContent: BTN_CONTINUE_TEXT,
  });
  btn.addEventListener('click', () => {
    changeRowOrRound();
    if (btn.classList.contains('continue__btn_active')) {
      btn.classList.add('continue__btn_default');
      btn.classList.remove('continue__btn_active');
    }
  });
  return btn;
}

function changeRowOrRound() {
  const localStorageRoundNumber = localStorage.getItem(LOCALSTORAGE_KEY_ROUND_NUMBER);
  let currRowNumber = localStorageRoundNumber ? +localStorageRoundNumber : START_GAME_ZERO;
  currRowNumber += 1;
  setCurrentRowNumber(currRowNumber);
  const localStorageRound = localStorage.getItem(LOCALSTORAGE_KEY_ROUND);
  const currRound: gameData | null = localStorageRound ? JSON.parse(localStorageRound) : null;
  if (currRound) {
    const completedRows = Array.from(GAMEFIELD.children) as HTMLElement[];
    completedRows.forEach((item) => {
      item.classList.add('completed-row');
    });
    const newRow = generateGamefieldRow(currRound, currRowNumber);
    newRow.addEventListener('click', (event) => {
      const currRow = event.target as HTMLElement;
      if (currRow) {
        if (currRow.classList.contains('gamefield__row__item')) {
          const words = Array.from(GAMEFIELD_WORDS_CONTAINER.children) as HTMLElement[];
          moveWordFromRow(currRow, words);
        }
      }
    });
    // GAMEFIELD.append(generateGamefieldRow(currRound, currRowNumber));
    GAMEFIELD.append(newRow);
    GAMEFIELD_WORDS_CONTAINER.innerHTML = '';
    GAMEFIELD_WORDS_CONTAINER.append(generateGamefieldWords(currRound, currRowNumber));
  }
  localStorage.setItem(LOCALSTORAGE_KEY_ROUND_NUMBER, currRowNumber.toString());
}

export default createContinueBtn;
