import { createElem } from '../../../../utils/createElem';
import { RoundDataFromLS, getDataRoundFromLS } from '../../../../utils/getDataRoundLS';
import { GAMEFIELD_WORDS_CONTAINER, currRow } from '../../game-screen';
import { CHECK_BTN, CONTINUE_BTN, fromInnactiveToActiveBtn } from '../game-btns-container/game-btns-container';
import { HINT_CONTAINER } from '../game-hints/game-hint-text';

const BTN_COMPLETE_TEXT = 'Auto-Complete';

export function createCompleteBtn(): HTMLElement {
  const btn = createElem({
    tag: 'button',
    classesCss: ['btn', 'btn_active'],
    textContent: BTN_COMPLETE_TEXT,
  });
  btn.addEventListener('click', completeCurrRow);
  return btn;
}

function completeCurrRow() {
  const currRoundFromLS: RoundDataFromLS = getDataRoundFromLS();
  const currRowItems = Array.from(currRow.children) as HTMLElement[];
  if (currRoundFromLS.currRound) {
    const correctRowArr: string[] =
      currRoundFromLS.currRound?.words[currRoundFromLS.localStorageRoundNumber].textExample.split(' ');
    currRowItems.map((item, index) => {
      return new Promise<void>((resolve) => {
        setTimeout(() => {
          item.textContent = correctRowArr[index];
          item.classList.remove('word_correct');
          item.classList.remove('word_incorrect');
          item.classList.add('_autoWidth');
          item.classList.add('_appearing');
          resolve();
        }, index * 40);
      });
    });
    const gamefieldWordsItems = Array.from(GAMEFIELD_WORDS_CONTAINER.children) as HTMLElement[];
    gamefieldWordsItems.forEach((item) => {
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
