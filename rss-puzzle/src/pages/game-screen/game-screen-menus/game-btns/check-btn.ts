import './game-btn.css';
import GameData from '../../../../interfaces/game-data-interface';
import { createElem } from '../../../../utils/createElem';
import { LOCALSTORAGE_KEY_ROUND, LOCALSTORAGE_KEY_ROUND_NUMBER } from '../../../../utils/localStorageKeys';
import { currRow } from '../../game-screen';

const BTN_CHECK_TEXT = 'Check';

export function createCheckBtn(): HTMLElement {
  const btn = createElem({
    tag: 'button',
    classesCss: ['btn', 'btn_wrong'],
    textContent: BTN_CHECK_TEXT,
  });
  btn.addEventListener('click', checkCorrectWords);
  return btn;
}

export function checkCorrectWords() {
  const localStorageRound = localStorage.getItem(LOCALSTORAGE_KEY_ROUND);
  const localStorageRoundNumber = +localStorage.getItem(LOCALSTORAGE_KEY_ROUND_NUMBER)!;
  const currRound: GameData | null = localStorageRound ? JSON.parse(localStorageRound) : null;

  const currRowChildren = currRow.children;
  const currRowWordsArr = Array.from(currRowChildren).map((item) => item.textContent);
  const correctRow = currRound?.words[localStorageRoundNumber].textExample.split(' ');
  correctRow?.forEach((item, index) => {
    if (item === currRowWordsArr[index]) {
      currRowChildren[index].classList.add('word_correct');
    } else {
      currRowChildren[index].classList.add('word_incorrect');
    }
  });
  console.log(currRound, localStorageRoundNumber, currRowWordsArr, correctRow);
}
