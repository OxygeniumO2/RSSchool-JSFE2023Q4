/* eslint-disable no-param-reassign */
/* eslint-disable no-shadow */
/* eslint-disable no-undef */
/* eslint-disable no-use-before-define */
/* eslint-disable import/no-mutable-exports */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import './game-screen.css';
import createElem from '../../utils/createElem';
import {
  CHECK_BTN,
  CONTINUE_BTN,
  fromActiveToInnactiveBtn,
  fromInnactiveToActiveBtn,
} from './game-screen-menus/game-buttons/game-buttons';
import {
  LOCALSTORAGE_KEY_LEVEL_ROUND_NUMBER,
  LOCALSTORAGE_KEY_RANDOM_WORD_GEN,
  LOCALSTORAGE_KEY_ROUND,
} from '../../utils/localStorageKeys';
import { MENU } from './game-screen-menus/menu-container/menu-container';
import { HINT_CONTAINER, createHintContainer, generateHint } from './game-screen-menus/game-hints/game-hint-text';
import { AUDIO_ICO_CONTAINER, createHintAudioIco, playAudio } from './game-screen-menus/game-hints/game-hint-audio';
import { Level, Round } from '../../interfaces/game-data-interface';

let wordNoBefore: string;
let wordNoAfter: string;
const MULTIPLE_LENGTH_HEIGHT_GAMEFIELD: number = 50;
const STATIC_LENGTH: number = 24;
export const START_GAME_ZERO: number = 0;
let currentRowNumber: number = START_GAME_ZERO;
export const GAMEFIELD = createElem({ tagName: 'div', classNames: ['gamefield'] });
export const GAMEFIELD_WORDS_CONTAINER = createElem({ tagName: 'div', classNames: ['gamefield__words-container'] });
export let currRow: HTMLElement;
export let prevHandlerWithRound: EventListener | null = null;
const checkBtn = CHECK_BTN;
const continueBtn = CONTINUE_BTN;
export let currAudio: HTMLAudioElement;
export const AUDIO_PATH_HTTP: string = 'https://raw.githubusercontent.com/rolling-scopes-school/rss-puzzle-data/main/';

function generateGame(level: Level, roundNumber: number): void {
  const round: Round = level.rounds[roundNumber];
  GAMEFIELD.style.minHeight = `${round.words.length * MULTIPLE_LENGTH_HEIGHT_GAMEFIELD + STATIC_LENGTH}px`;
  const handlerWithRound = gameFieldWordsContainerClickHandlerWithRound(round);
  localStorage.setItem(LOCALSTORAGE_KEY_LEVEL_ROUND_NUMBER, roundNumber.toString());

  if (prevHandlerWithRound) {
    GAMEFIELD_WORDS_CONTAINER.removeEventListener('click', prevHandlerWithRound);
  }

  currRow = generateGameFieldRow(round, START_GAME_ZERO);
  GAMEFIELD.append(currRow);

  currAudio = new Audio(`${AUDIO_PATH_HTTP}${round.words[START_GAME_ZERO].audioExample}`);
  const gameFieldWords = generateGameFieldWords(round, START_GAME_ZERO);
  GAMEFIELD_WORDS_CONTAINER.append(gameFieldWords);
  currRow.removeEventListener('click', handleCurrRowClick);

  MENU.insertAdjacentElement('afterend', GAMEFIELD);
  GAMEFIELD.insertAdjacentElement('afterend', GAMEFIELD_WORDS_CONTAINER);

  localStorage.setItem(LOCALSTORAGE_KEY_ROUND, JSON.stringify(round));
  createHintContainer();

  createHintAudioIco();

  AUDIO_ICO_CONTAINER.addEventListener('click', playAudio);

  GAMEFIELD_WORDS_CONTAINER.addEventListener('click', handlerWithRound as EventListener);
  prevHandlerWithRound = handlerWithRound as EventListener;
  currRow.addEventListener('click', handleCurrRowClick);

  generateHint(round);
}

export function generateGameFieldRow(round: Round, rowNumber: number): HTMLDivElement {
  const gameFieldRow = createElem({ tagName: 'div', classNames: ['gamefield__row'] });
  const currRowWords = round.words[rowNumber].textExample.split(' ');

  for (let i = 0; i < currRowWords.length; i += 1) {
    const gameFieldRowItem = createElem({ tagName: 'div', classNames: ['gamefield__row__item'] });
    gameFieldRow.append(gameFieldRowItem);
  }

  return gameFieldRow as HTMLDivElement;
}

export function generateGameFieldWords(round: Round, rowNumber: number): DocumentFragment {
  const fragment = document.createDocumentFragment();

  const gameFieldItems = round.words[rowNumber].textExample.split(' ');

  const elementsArr: HTMLElement[] = [];

  for (let i = 0; i < gameFieldItems.length; i += 1) {
    const gameFieldItem = createElem({
      tagName: 'div',
      classNames: ['gamefield__words__item'],
      textContent: gameFieldItems[i],
    });

    if (i === 0) {
      gameFieldItem.classList.add('_noPseudoAfter');
      if (gameFieldItem.textContent) {
        wordNoAfter = gameFieldItem.textContent;
      }
    }

    if (i === gameFieldItems.length - 1) {
      gameFieldItem.classList.add('_noPseudoBefore');
      if (gameFieldItem.textContent) {
        wordNoBefore = gameFieldItem.textContent;
      }
    }

    elementsArr.push(gameFieldItem);
  }

  let shuffledElements: HTMLElement[] = shuffleArray(elementsArr) as HTMLElement[];
  let strFromWords: string = shuffledElements.map((item) => item.textContent).join('');
  const strFromLS: string = localStorage.getItem(LOCALSTORAGE_KEY_RANDOM_WORD_GEN) as string;

  if (strFromLS === strFromWords) {
    shuffledElements = shuffleArray(elementsArr) as HTMLElement[];
    strFromWords = shuffledElements.map((item) => item.textContent).join('');
  }

  localStorage.setItem(LOCALSTORAGE_KEY_RANDOM_WORD_GEN, strFromWords);

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
      item.style.width = `${Math.floor(item.scrollWidth / 2)}px`;
      item.classList.add('_appearing');
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
        words[i].classList.remove('_zeroWidth', '_noPseudoAfter', '_noPseudoBefore');

        if (words[i].textContent === wordNoAfter) {
          words[i].classList.add('_noPseudoAfter');
        }

        if (words[i].textContent === wordNoBefore) {
          words[i].classList.add('_noPseudoBefore');
        }

        break;
      }
    }

    currRowItem.classList.remove('_autoWidth', 'word_correct', 'word_incorrect', '_appearing');
    currRowItem.textContent = '';
    currRowItem.style.width = `${Math.floor(currRowItem.scrollWidth / 10)}px`;
  }

  const checkFillWithContent: boolean = words.every((item) => item.textContent);

  if (!checkFillWithContent) {
    fromActiveToInnactiveBtn(checkBtn);
    fromActiveToInnactiveBtn(continueBtn);
  }
}

function isCurrRowRight(row: HTMLElement, round: Round) {
  const rowItems: HTMLElement[] = Array.from(row.children) as HTMLElement[];
  const rowItemsContent: string = rowItems.map((item) => item.textContent).join('');
  const correctSentence: string = round.words[currentRowNumber].textExample.replace(/\s/g, '');

  console.log(currentRowNumber);

  console.log(rowItemsContent, '!!!!row items');
  console.log(correctSentence, '!!!!correct sentence');

  if (rowItemsContent === correctSentence) {
    const continueBtn = CONTINUE_BTN;
    fromInnactiveToActiveBtn(continueBtn);
    const hintContainer = HINT_CONTAINER;
    hintContainer.classList.add('_open');
  }
}

export function setCurrentRowNumber(value: number) {
  currentRowNumber = value;
}

export function setCurrRow(row: HTMLElement | null) {
  if (row) currRow = row;
}

export function setCurrAudio(newAudio: HTMLAudioElement) {
  if (newAudio) currAudio = newAudio;
}

export function setPrevHandlerWithRound(handler: EventListener | null) {
  prevHandlerWithRound = handler;
}

const gameFieldWordsContainerClickHandlerWithRound = (round: Round) => (event: MouseEvent) => {
  handleGameFieldWordsContainerClick(event, round);
};

function handleGameFieldWordsContainerClick(event: MouseEvent, round: Round) {
  const currWord = event.target as HTMLElement;
  if (currWord && currWord.parentElement === GAMEFIELD_WORDS_CONTAINER) {
    moveWordToRow(currWord, currRow);
    isCurrRowRight(currRow, round);
  }
}

export function handleCurrRowClick(event: MouseEvent) {
  const currRowItem = event.target as HTMLElement;
  if (currRowItem && currRowItem.classList.contains('gamefield__row__item')) {
    const words = Array.from(GAMEFIELD_WORDS_CONTAINER.children) as HTMLElement[];
    moveWordFromRow(currRowItem, words);
  }
}

export default generateGame;
