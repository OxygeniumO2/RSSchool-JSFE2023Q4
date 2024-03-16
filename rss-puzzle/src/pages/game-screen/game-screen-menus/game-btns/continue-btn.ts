import './continue-btn.css';
import { createElem } from '../../../../utils/createElem';
import {
  LOCALSTORAGE_KEY_ROUND,
  LOCALSTORAGE_KEY_ROUND_NUMBER,
  LOCALSTORAGE_KEY_LEVEL_ROUND_NUMBER,
} from '../../../../utils/localStorageKeys';
import generateGame, {
  START_GAME_ZERO,
  GAMEFIELD,
  generateGamefieldRow,
  generateGamefieldWords,
  GAMEFIELD_WORDS_CONTAINER,
  setCurrentRowNumber,
  handleCurrRowClick,
} from '../../game-screen';
import GameData from '../../../../interfaces/game-data-interface';
import level1 from '../../../../data/words-levels/wordCollectionLevel1';

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
  const localStorageRoundNumber = +localStorage.getItem(LOCALSTORAGE_KEY_ROUND_NUMBER)!;
  const localStorageRound = localStorage.getItem(LOCALSTORAGE_KEY_ROUND);
  const currRound: GameData | null = localStorageRound ? JSON.parse(localStorageRound) : null;
  let currRowNumber = localStorageRoundNumber ? +localStorageRoundNumber : START_GAME_ZERO;
  if (currRound) {
    if (localStorageRoundNumber < currRound.words.length - 1) {
      currRowNumber += 1;
      setCurrentRowNumber(currRowNumber);
      const completedRows = Array.from(GAMEFIELD.children) as HTMLElement[];
      completedRows.forEach((item) => {
        item.classList.add('completed-row');
      });
      const newRow = generateGamefieldRow(currRound, currRowNumber);
      newRow.addEventListener('click', handleCurrRowClick);
      GAMEFIELD.append(newRow);
      GAMEFIELD_WORDS_CONTAINER.innerHTML = '';
      GAMEFIELD_WORDS_CONTAINER.append(generateGamefieldWords(currRound, currRowNumber));
      localStorage.setItem(LOCALSTORAGE_KEY_ROUND_NUMBER, currRowNumber.toString());
    } else {
      currRowNumber = 0;
      setCurrentRowNumber(currRowNumber);
      localStorage.setItem(LOCALSTORAGE_KEY_ROUND_NUMBER, currRowNumber.toString());
      let levelRoundNumber = +localStorage.getItem(LOCALSTORAGE_KEY_LEVEL_ROUND_NUMBER)!;
      levelRoundNumber += 1;
      GAMEFIELD.innerHTML = '';
      GAMEFIELD_WORDS_CONTAINER.innerHTML = '';
      generateGame(level1, levelRoundNumber);
    }
  }
}

export default createContinueBtn;
