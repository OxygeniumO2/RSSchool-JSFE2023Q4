/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import './game-screen.css';
import createElem from '../../utils/createElem';
import level from '../../data/words-levels/wordCollectionLevel';
import { Level } from '../../interfaces/game-data-interface';
import { LOCALSTORAGE_KEY_LEVEL_ROUND_NUMBER, LOCALSTORAGE_KEY_ROUND_NUMBER } from '../../utils/localStorageKeys';
import generateGame, { GAMEFIELD, GAMEFIELD_WORDS_CONTAINER } from './game-screen';
import { CHECK_BTN, CONTINUE_BTN, fromActiveToInnactiveBtn } from './game-screen-menus/game-buttons/game-buttons';

const roundZero: string = '0';

export const currLevelInfo = createElem({ tagName: 'div', textContent: 'Current level - 1' });

function createChooseLevelContainer() {
  const chooseLevelFormContainer = createElem({ tagName: 'form', classNames: ['choose__form-container'] });
  const chooseLevelInput = createElem({
    tagName: 'input',
    attributes: [
      ['type', 'text'],
      ['required', true],
      ['placeholder', `Level 1 - ${level.rounds.length}`],
      ['pattern', '[1-9]|[1-9][0-9]|1[0-9]{2}|20[0-9]'],
      ['title', `Number 1 - ${level.rounds.length}`],
    ],
  }) as HTMLInputElement;
  const chooseLevelBtn = createElem({
    tagName: 'button',
    classNames: ['btn', 'btn_small'],
    textContent: 'Choose Level',
  });

  chooseLevelFormContainer.addEventListener('submit', (event) => {
    event.preventDefault();
    const currGamelevel: Level = level;
    const roundNumber = chooseLevelInput.value as unknown as number;
    const roundNumberCorrect = roundNumber - 1;
    localStorage.setItem(LOCALSTORAGE_KEY_LEVEL_ROUND_NUMBER, roundNumberCorrect.toString());
    localStorage.setItem(LOCALSTORAGE_KEY_ROUND_NUMBER, roundZero);
    GAMEFIELD.innerHTML = '';
    GAMEFIELD_WORDS_CONTAINER.innerHTML = '';
    currLevelInfo.textContent = `Current level - ${roundNumber}`;
    chooseLevelInput.value = '';
    generateGame(currGamelevel, roundNumberCorrect);
    fromActiveToInnactiveBtn(CHECK_BTN);
    fromActiveToInnactiveBtn(CONTINUE_BTN);
  });

  chooseLevelFormContainer.append(chooseLevelInput, chooseLevelBtn, currLevelInfo);

  return chooseLevelFormContainer;
}

export default createChooseLevelContainer;
