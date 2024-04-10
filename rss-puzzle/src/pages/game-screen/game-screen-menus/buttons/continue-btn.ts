/* eslint-disable max-len */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import './game-btn.css';

import createElem from '../../../../utils/createElem';
import { LOCALSTORAGE_KEY_ROUND_NUMBER, LOCALSTORAGE_KEY_LEVEL_ROUND_NUMBER } from '../../../../utils/localStorageKeys';
import generateGame, {
  START_GAME_ZERO,
  GAMEFIELD,
  generateGameFieldRow,
  generateGameFieldWords,
  GAMEFIELD_WORDS_CONTAINER,
  setCurrentRowNumber,
  handleCurrRowClick,
  setCurrRow,
  currRow,
  AUDIO_PATH_HTTP,
  setCurrAudio,
} from '../../game-screen';
import level from '../../../../data/words-levels/wordCollectionLevel';
import { CHECK_BTN, fromActiveToInnactiveBtn } from '../game-buttons/game-buttons';
import { checkCorrectWords } from './check-btn';
import { RoundDataFromLS, getDataRoundFromLS } from '../../../../utils/getDataRoundLS';
import { checkIfHintDisabledDontShowHint, generateHint, hintInnerOpacityChange } from '../game-hints/game-hint-text';
import { Round } from '../../../../interfaces/game-data-interface';

function changeRowOrRound() {
  const checkBtn = CHECK_BTN;

  const currRoundFromLS: RoundDataFromLS = getDataRoundFromLS();

  let currRowNumber = currRoundFromLS.localStorageRoundNumber
    ? +currRoundFromLS.localStorageRoundNumber
    : START_GAME_ZERO;

  if (currRoundFromLS.currRound) {
    if (currRoundFromLS.localStorageRoundNumber < currRoundFromLS.currRound.words.length - 1) {
      checkCorrectWords();
      const currRowItems = Array.from(currRow.children) as HTMLElement[];
      currRowItems.forEach((item) => item.classList.add('word_correct'));
      currRowNumber += 1;
      setCurrentRowNumber(currRowNumber);
      const completedRows = Array.from(GAMEFIELD.children) as HTMLElement[];
      completedRows.forEach((item) => {
        item.classList.add('completed-row');
      });
      const newRow = generateGameFieldRow(currRoundFromLS.currRound, currRowNumber);
      newRow.addEventListener('click', handleCurrRowClick);
      GAMEFIELD.append(newRow);
      GAMEFIELD_WORDS_CONTAINER.innerHTML = '';
      GAMEFIELD_WORDS_CONTAINER.append(generateGameFieldWords(currRoundFromLS.currRound, currRowNumber));
      localStorage.setItem(LOCALSTORAGE_KEY_ROUND_NUMBER, currRowNumber.toString());
      fromActiveToInnactiveBtn(checkBtn);
      setCurrRow(newRow);
      hintInnerOpacityChange();
      setTimeout(() => {
        generateHint(currRoundFromLS.currRound as Round);
      }, 300);
      checkIfHintDisabledDontShowHint();
      const newAudio = new Audio(`${AUDIO_PATH_HTTP}${currRoundFromLS.currRound.words[currRowNumber].audioExample}`);
      setCurrAudio(newAudio);
    } else {
      currRowNumber = 0;
      setCurrentRowNumber(currRowNumber);
      localStorage.setItem(LOCALSTORAGE_KEY_ROUND_NUMBER, currRowNumber.toString());
      let levelRoundNumber = +localStorage.getItem(LOCALSTORAGE_KEY_LEVEL_ROUND_NUMBER)!;
      levelRoundNumber += 1;
      GAMEFIELD.innerHTML = '';
      GAMEFIELD_WORDS_CONTAINER.innerHTML = '';
      generateGame(level, levelRoundNumber);
      hintInnerOpacityChange();
      fromActiveToInnactiveBtn(checkBtn);
      checkIfHintDisabledDontShowHint();
    }
  }
}

const BTN_CONTINUE_TEXT = 'Continue';
function createContinueBtn(): HTMLElement {
  const btn = createElem({
    tagName: 'button',
    classNames: ['btn', 'btn_wrong'],
    textContent: BTN_CONTINUE_TEXT,
  });
  btn.addEventListener('click', () => {
    changeRowOrRound();
    if (btn.classList.contains('btn_active')) {
      btn.classList.add('btn_wrong');
      btn.classList.remove('btn_active');
    }
  });
  return btn;
}
export default createContinueBtn;
