import './game-screen.css';
import { createElem } from '../../utils/createElem';
import { container } from '../../app-container/container';
import gameData from '../../interfaces/game-data-interface';
import { fromInnactiveToActiveBtn } from './game-screen-menus/game-btns-container/game-btns-container';
import { LOCALSTORAGE_KEY_ROUND } from '../../utils/localStorageKeys';
// import { words } from '../../interfaces/game-data-interface';

export const START_GAME_ZERO = 0;
export let currentRowNumber = START_GAME_ZERO;
export const GAMEFIELD = createElem({ tag: 'div', classesCss: ['gamefield'] });
export const GAMEFIELD_WORDS_CONTAINER = createElem({ tag: 'div', classesCss: ['gamefield__words-container'] });

function generateGame(round: gameData): void {
  GAMEFIELD.append(generateGamefieldRow(round, START_GAME_ZERO));
  const gamefieldWords = generateGamefieldWords(round, START_GAME_ZERO);
  GAMEFIELD_WORDS_CONTAINER.append(gamefieldWords);

  localStorage.setItem(LOCALSTORAGE_KEY_ROUND, JSON.stringify(round));

  const currRow = GAMEFIELD.children[START_GAME_ZERO] as HTMLElement;
  console.log(currRow);

  container.append(GAMEFIELD, GAMEFIELD_WORDS_CONTAINER);

  GAMEFIELD_WORDS_CONTAINER.addEventListener('click', (event) => {
    const currWord = event.target as HTMLElement;
    if (currWord) {
      if (currWord.parentElement === GAMEFIELD_WORDS_CONTAINER) {
        const currRow = GAMEFIELD.children[currentRowNumber] as HTMLElement;
        moveWordToRow(currWord, currRow);
        isCurrRowRight(currRow, round);
      }
    }
  });

  currRow.addEventListener('click', (event) => {
    const currRowItem = event.target as HTMLElement;
    if (currRowItem) {
      if (currRowItem.classList.contains('gamefield__row__item')) {
        const words = Array.from(GAMEFIELD_WORDS_CONTAINER.children) as HTMLElement[];
        moveWordFromRow(currRowItem, words);
      }
    }
  });
}

export function generateGamefieldRow(round: gameData, rowNumber: number): HTMLDivElement {
  const gamefieldRow = createElem({ tag: 'div', classesCss: ['gamefield__row'] });
  const currRowWords = round.words[rowNumber].textExample.split(' ');
  for (let i = 0; i < currRowWords.length; i += 1) {
    const gamefieldRowItem = createElem({ tag: 'div', classesCss: ['gamefield__row__item'] });
    gamefieldRow.append(gamefieldRowItem);
  }
  return gamefieldRow as HTMLDivElement;
}

export function generateGamefieldWords(round: gameData, rowNumber: number): DocumentFragment {
  // const gamefieldItemsContainer = createElem({ tag: 'div', classesCss: ['gamefield__words-container'] });
  // const gamefieldItems = round.words[rowNumber].textExample.split(' ');
  // const shuffleFieldItems = shuffleArray(gamefieldItems);
  // shuffleFieldItems.forEach((item) => {
  //   const gamefieldItem = createElem({ tag: 'div', classesCss: ['gamefield__words__item'], textContent: item });
  //   gamefieldItemsContainer.append(gamefieldItem);
  // });
  // return gamefieldItemsContainer as HTMLDivElement;
  const fragment = document.createDocumentFragment();

  const gamefieldItems = round.words[rowNumber].textExample.split(' ');
  const shuffleFieldItems = shuffleArray(gamefieldItems);

  shuffleFieldItems.forEach((item) => {
    const gamefieldItem = createElem({ tag: 'div', classesCss: ['gamefield__words__item'], textContent: item });
    fragment.appendChild(gamefieldItem);
  });

  return fragment;
}

function shuffleArray(arr: string[]) {
  for (let i = arr.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function moveWordToRow(word: HTMLElement, currRow: HTMLElement) {
  const wordText: string = word.textContent ?? '';
  // const allItemsFromRows = Array.from(document.querySelectorAll('.gamefield__row__item')) as HTMLElement[];
  const allItemsFromRow = Array.from(currRow.children) as HTMLElement[];
  for (let i = 0; i < allItemsFromRow.length; i += 1) {
    const item = allItemsFromRow[i];
    if (!item.textContent) {
      word.style.pointerEvents = 'none';
      item.textContent = wordText;
      item.style.width = Math.floor(item.scrollWidth / 2.5) + 'px';
      item.addEventListener('transitionend', function transitionEndHandler() {
        item.removeAttribute('style');
        item.classList.add('_autoWidth');
        item.removeEventListener('transitionend', transitionEndHandler);
      });
      word.classList.add('_zeroWidth');
      word.addEventListener('transitionend', function transitionEndHandler() {
        word.textContent = '';
        word.removeEventListener('transitionend', transitionEndHandler);
        word.removeAttribute('style');
      });
      break;
    }
  }
}

export function moveWordFromRow(currRowItem: HTMLElement, words: HTMLElement[]) {
  if (currRowItem.textContent) {
    for (let i = 0; i < words.length; i += 1) {
      if (!words[i].textContent) {
        words[i].textContent = currRowItem.textContent;
        words[i].classList.remove('_zeroWidth');
        break;
      }
    }
    currRowItem.classList.remove('_autoWidth');
    currRowItem.textContent = '';
    currRowItem.style.width = '30px';
  }
}

function isCurrRowRight(row: HTMLElement, round: gameData) {
  const rowItems: HTMLElement[] = Array.from(row.children) as HTMLElement[];
  const rowItemsContent: string = rowItems.map((item) => item.textContent).join('');
  const correctSentence: string = round.words[currentRowNumber].textExample.split(' ').join('');
  if (rowItemsContent === correctSentence) {
    fromInnactiveToActiveBtn();
  }
}

export function setCurrentRowNumber(value: number) {
  currentRowNumber = value;
}

export default generateGame;
