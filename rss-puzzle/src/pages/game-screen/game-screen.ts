import './game-screen.css';
import { createElem } from '../../utils/createElem';
import GameData, { Level } from '../../interfaces/game-data-interface';
import {
  CHECK_BTN,
  CONTINUE_BTN,
  fromActiveToInnactiveBtn,
  fromInnactiveToActiveBtn,
} from './game-screen-menus/game-btns-container/game-btns-container';
import {
  LOCALSTORAGE_KEY_LEVEL_ROUND_NUMBER,
  LOCALSTORAGE_KEY_RANDOM_WORD_GEN,
  LOCALSTORAGE_KEY_ROUND,
} from '../../utils/localStorageKeys';
import { MENU } from './game-screen-menus/menu-container/menu-container';
import { createHintContainer, generateHint } from './game-screen-menus/game-hint/game-hint';

const MULTIPLE_LENGTH_HEIGHT_GAMEFIELD: number = 10;
const STATIC_LENGTH: number = 45;
export const START_GAME_ZERO: number = 0;
let currentRowNumber: number = START_GAME_ZERO;
export const GAMEFIELD = createElem({ tag: 'div', classesCss: ['gamefield'] });
export const GAMEFIELD_WORDS_CONTAINER = createElem({ tag: 'div', classesCss: ['gamefield__words-container'] });
export let currRow: HTMLElement;
export let prevHandlerWithRound: EventListener | null = null;
const checkBtn = CHECK_BTN;
const continueBtn = CONTINUE_BTN;

function generateGame(level: Level, roundNumber: number): void {
  const round: GameData = level.rounds[roundNumber];
  GAMEFIELD.style.minHeight = `${level.rounds.length * MULTIPLE_LENGTH_HEIGHT_GAMEFIELD + STATIC_LENGTH}px`;
  const handlerWithRound = gamefieldWordsContainerClickHandlerWithRound(round);
  localStorage.setItem(LOCALSTORAGE_KEY_LEVEL_ROUND_NUMBER, roundNumber.toString());

  if (prevHandlerWithRound) {
    GAMEFIELD_WORDS_CONTAINER.removeEventListener('click', prevHandlerWithRound);
  }
  currRow = generateGamefieldRow(round, START_GAME_ZERO);
  GAMEFIELD.append(currRow);

  const gamefieldWords = generateGamefieldWords(round, START_GAME_ZERO);
  GAMEFIELD_WORDS_CONTAINER.append(gamefieldWords);
  currRow.removeEventListener('click', handleCurrRowClick);

  MENU.insertAdjacentElement('afterend', GAMEFIELD);
  GAMEFIELD.insertAdjacentElement('afterend', GAMEFIELD_WORDS_CONTAINER);

  localStorage.setItem(LOCALSTORAGE_KEY_ROUND, JSON.stringify(round));
  createHintContainer();

  GAMEFIELD_WORDS_CONTAINER.addEventListener('click', handlerWithRound as EventListener);
  prevHandlerWithRound = handlerWithRound as EventListener;
  currRow.addEventListener('click', handleCurrRowClick);

  generateHint(round);
}

export function generateGamefieldRow(round: GameData, rowNumber: number): HTMLDivElement {
  const gamefieldRow = createElem({ tag: 'div', classesCss: ['gamefield__row'] });
  const currRowWords = round.words[rowNumber].textExample.split(' ');
  for (let i = 0; i < currRowWords.length; i += 1) {
    const gamefieldRowItem = createElem({ tag: 'div', classesCss: ['gamefield__row__item'] });
    gamefieldRow.append(gamefieldRowItem);
    setTimeout(() => {
      gamefieldRowItem.classList.add('_appearing'); // Добавляем класс для запуска анимации
    }, i * 100);
  }
  return gamefieldRow as HTMLDivElement;
}

export function generateGamefieldWords(round: GameData, rowNumber: number): DocumentFragment {
  const fragment = document.createDocumentFragment();

  const gamefieldItems = round.words[rowNumber].textExample.split(' ');

  const elementsArr: HTMLElement[] = [];

  for (let i = 0; i < gamefieldItems.length; i += 1) {
    const gamefieldItem = createElem({
      tag: 'div',
      classesCss: ['gamefield__words__item'],
      textContent: gamefieldItems[i],
    });
    if (i === 0) {
      gamefieldItem.classList.add('_noPseudoAfter');
    }
    if (i === gamefieldItems.length - 1) {
      gamefieldItem.classList.add('_noPseudoBefore');
    }
    elementsArr.push(gamefieldItem);
  }

  const shuffledElements: HTMLElement[] = shuffleArray(elementsArr) as HTMLElement[];
  const strFromWords = shuffledElements.map((item) => item.textContent).join('');
  const strFromLS = localStorage.getItem(LOCALSTORAGE_KEY_RANDOM_WORD_GEN);

  if (strFromLS === strFromWords) {
    const shuffledElements: HTMLElement[] = shuffleArray(elementsArr) as HTMLElement[];
    const strFromWords = shuffledElements.map((item) => item.textContent).join('');
    localStorage.setItem(LOCALSTORAGE_KEY_RANDOM_WORD_GEN, strFromWords);
  } else {
    localStorage.setItem(LOCALSTORAGE_KEY_RANDOM_WORD_GEN, strFromWords);
  }

  shuffledElements.forEach((item) => fragment.append(item));

  return fragment;
}

function shuffleArray(arr: string[] | HTMLElement[]) {
  for (let i = arr.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function moveWordToRow(word: HTMLElement, currRow: HTMLElement) {
  const wordText: string = word.textContent ?? '';
  const allItemsFromRow = Array.from(currRow.children) as HTMLElement[];
  for (let i = 0; i < allItemsFromRow.length; i += 1) {
    const item = allItemsFromRow[i];
    if (!item.textContent) {
      word.style.pointerEvents = 'none';
      item.textContent = wordText;
      item.style.width = Math.floor(item.scrollWidth / 2) + 'px';
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
  const checkFillWithContent: boolean = allItemsFromRow.every((item) => item.textContent);

  if (checkFillWithContent) {
    fromInnactiveToActiveBtn(checkBtn);
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
    currRowItem.style.width = Math.floor(currRowItem.scrollWidth / 10) + 'px';
    currRowItem.classList.remove('word_correct');
    currRowItem.classList.remove('word_incorrect');
  }
  const checkFillWithContent: boolean = words.every((item) => item.textContent);
  if (!checkFillWithContent) {
    fromActiveToInnactiveBtn(checkBtn);
    fromActiveToInnactiveBtn(continueBtn);
  }
}

function isCurrRowRight(row: HTMLElement, round: GameData) {
  const rowItems: HTMLElement[] = Array.from(row.children) as HTMLElement[];
  const rowItemsContent: string = rowItems.map((item) => item.textContent).join('');
  const correctSentence: string = round.words[currentRowNumber].textExample.split(' ').join('');
  if (rowItemsContent === correctSentence) {
    const continueBtn = CONTINUE_BTN;
    fromInnactiveToActiveBtn(continueBtn);
  }
}

export function setCurrentRowNumber(value: number) {
  currentRowNumber = value;
}

export function setCurrRow(row: HTMLElement | null) {
  if (row) currRow = row;
}

export function setPrevHandlerWithRound(handler: EventListener | null) {
  prevHandlerWithRound = handler;
}

const gamefieldWordsContainerClickHandlerWithRound = (round: GameData) => {
  return (event: MouseEvent) => {
    handleGamefieldWordsContainerClick(event, round);
  };
};

function handleGamefieldWordsContainerClick(event: MouseEvent, round: GameData) {
  const currWord = event.target as HTMLElement;
  if (currWord) {
    if (currWord.parentElement === GAMEFIELD_WORDS_CONTAINER) {
      moveWordToRow(currWord, currRow);
      isCurrRowRight(currRow, round);
    }
  }
}

export function handleCurrRowClick(event: MouseEvent) {
  const currRowItem = event.target as HTMLElement;
  if (currRowItem) {
    if (currRowItem.classList.contains('gamefield__row__item')) {
      const words = Array.from(GAMEFIELD_WORDS_CONTAINER.children) as HTMLElement[];
      moveWordFromRow(currRowItem, words);
    }
  }
}

export default generateGame;
