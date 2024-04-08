/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import './game-btn.css';
import createElem from '../../../../utils/createElem';
import { currRow } from '../../game-screen';
import { RoundDataFromLS, getDataRoundFromLS } from '../../../../utils/getDataRoundLS';

const BTN_CHECK_TEXT = 'Check';

export function checkCorrectWords() {
  const currRoundFromLS: RoundDataFromLS = getDataRoundFromLS();

  const currRowChildren = currRow.children;
  const currRowWordsArr = Array.from(currRowChildren).map((item) => item.textContent);
  const correctRow = currRoundFromLS.currRound?.words[currRoundFromLS.localStorageRoundNumber].textExample.split(' ');
  correctRow?.forEach((item, index) => {
    if (item === currRowWordsArr[index]) {
      currRowChildren[index].classList.add('word_correct');
    } else {
      currRowChildren[index].classList.add('word_incorrect');
    }
  });
}

export function createCheckBtn(): HTMLElement {
  const btn = createElem({
    tagName: 'button',
    classNames: ['btn', 'btn_wrong'],
    textContent: BTN_CHECK_TEXT,
  });
  btn.addEventListener('click', checkCorrectWords);
  return btn;
}
