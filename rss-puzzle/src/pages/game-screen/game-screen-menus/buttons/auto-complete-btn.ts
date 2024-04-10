/* eslint-disable comma-dangle */
/* eslint-disable no-param-reassign */
/* eslint-disable indent */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable operator-linebreak */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import createElem from '../../../../utils/createElem';
import { RoundDataFromLS, getDataRoundFromLS } from '../../../../utils/getDataRoundLS';
import { GAMEFIELD_WORDS_CONTAINER, currRow } from '../../game-screen';
import { CHECK_BTN, CONTINUE_BTN, fromInnactiveToActiveBtn } from '../game-buttons/game-buttons';
import { HINT_CONTAINER } from '../game-hints/game-hint-text';

const BTN_COMPLETE_TEXT = 'Auto-Complete';

function completeCurrRow() {
  const currRoundFromLS: RoundDataFromLS = getDataRoundFromLS();
  const currRowItems = Array.from(currRow.children) as HTMLElement[];
  if (currRoundFromLS.currRound) {
    const correctRowArr: string[] =
      currRoundFromLS.currRound?.words[currRoundFromLS.localStorageRoundNumber].textExample.split(' ');
    currRowItems.map(
      (item, index) =>
        new Promise<void>((resolve) => {
          setTimeout(() => {
            item.textContent = correctRowArr[index];
            item.classList.remove('word_correct', 'word_incorrect');
            item.classList.add('_autoWidth', '_appearing');
            resolve();
          }, index * 40);
        })
    );
    const gameFieldWordsItems = Array.from(GAMEFIELD_WORDS_CONTAINER.children) as HTMLElement[];
    gameFieldWordsItems.forEach((item) => {
      item.classList.add('_zeroWidth');
      item.textContent = '';
    });
    const continueBtn = CONTINUE_BTN;
    const checkBtn = CHECK_BTN;
    fromInnactiveToActiveBtn(continueBtn);
    fromInnactiveToActiveBtn(checkBtn);
    HINT_CONTAINER.classList.add('_open');
  }
}

// eslint-disable-next-line import/prefer-default-export
export function createCompleteBtn(): HTMLElement {
  const btn = createElem({
    tagName: 'button',
    classNames: ['btn', 'btn_active'],
    textContent: BTN_COMPLETE_TEXT,
  });
  btn.addEventListener('click', completeCurrRow);
  return btn;
}
