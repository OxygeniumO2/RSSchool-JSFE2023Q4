import './game-screen.css';
import { createElem } from '../../utils/createElem';
import { container } from '../../app-container/container';
import gameData from '../../interfaces/game-data-interface';
// import { words } from '../../interfaces/game-data-interface';

function generateGame(round: gameData): void {
  const gamefield = generateGamefieldRows(round);
  const gamefieldItemsContainer = generateGamefieldWords(round);

  const currRow = gamefield.children[0] as HTMLElement;

  container.append(gamefield, gamefieldItemsContainer);

  gamefieldItemsContainer.addEventListener('click', (event) => {
    const currWord = event.target as HTMLElement;
    if (currWord) {
      if (currWord.parentElement === gamefieldItemsContainer) {
        moveWordToRow(currWord, currRow);
      }
    }
  });

  currRow.addEventListener('click', (event) => {
    const currRow = event.target as HTMLElement;
    if (currRow) {
      if (currRow.classList.contains('gamefield__row__item')) {
        const words = Array.from(gamefieldItemsContainer.children) as HTMLElement[];
        moveWordFromRow(currRow, words);
      }
    }
  });
}

function generateGamefieldRows(round: gameData): HTMLDivElement {
  const gamefield = createElem({ tag: 'div', classesCss: ['gamefield'] });

  const TOTAL_WORDS_LENGTH: number = round.words.length;

  for (let i = 0; i < TOTAL_WORDS_LENGTH; i += 1) {
    const gamefieldRow = createElem({ tag: 'div', classesCss: ['gamefield__row'] });
    const currRowWords = round.words[i].textExample.split(' ');
    for (let j = 0; j < currRowWords.length; j += 1) {
      const gamefieldRowItem = createElem({ tag: 'div', classesCss: ['gamefield__row__item'] });
      gamefieldRow.append(gamefieldRowItem);
    }
    gamefield.append(gamefieldRow);
  }
  return gamefield as HTMLDivElement;
}

function generateGamefieldWords(round: gameData): HTMLDivElement {
  const gamefieldItemsContainer = createElem({ tag: 'div', classesCss: ['gamefield__words-container'] });
  const gamefieldItems = round.words[0].textExample.split(' ');
  const shuffleFieldItems = shuffleArray(gamefieldItems);
  shuffleFieldItems.forEach((item) => {
    const gamefieldItem = createElem({ tag: 'div', classesCss: ['gamefield__words__item'], textContent: item });
    gamefieldItemsContainer.append(gamefieldItem);
  });
  return gamefieldItemsContainer as HTMLDivElement;
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
  const currRowItems: HTMLElement[] = Array.from(currRow.children) as HTMLElement[];
  for (let i = 0; i < currRowItems.length; i += 1) {
    const item = currRowItems[i];
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

function moveWordFromRow(currRow: HTMLElement, words: HTMLElement[]) {
  if (currRow.textContent) {
    for (let i = 0; i < words.length; i += 1) {
      if (!words[i].textContent) {
        words[i].textContent = currRow.textContent;
        words[i].classList.remove('_zeroWidth');
        break;
      }
    }
    currRow.classList.remove('_autoWidth');
    currRow.textContent = '';
    console.log(currRow.offsetWidth);
    currRow.style.width = '30px';
  }
}

export default generateGame;
