'use strict';

import { nonogramsData } from './data.js';

function createElem({tag, classesCss, content}) {
  const elem = document.createElement(tag);

  if (classesCss) {
    classesCss.forEach((item) => {
      elem.classList.add(item);
    });
  }
  if (content) {
    elem.innerText = content;
  }
  return elem;
}

const shadow = createElem({ tag: 'div', classesCss: ['shadow']});
document.body.append(shadow);

const gamefield = createElem({ tag: 'div', classesCss: ['gamefield'] });

const main = createElem({ tag: 'main' });
document.body.append(main);

const container = createElem({ tag: 'div', classesCss: ['container'] });
main.append(container);

const nonogramsContainer = createElem({ tag: 'div', classesCss: ['nonograms__container'] });
const nonogramsLeftColumn = createElem({ tag: 'div', classesCss: ['nonograms__leftcolumn'] });
const nonogramsRightColumn = createElem({ tag: 'div', classesCss: ['nonograms__rightcolumn'] });

container.append(nonogramsContainer);

nonogramsContainer.append(nonogramsLeftColumn, nonogramsRightColumn);

const emptyBlock = createElem({ tag: 'div', classesCss: ['empty__block'] });
const hintsLeft = createElem({ tag: 'div', classesCss: ['hints__left'] });

nonogramsLeftColumn.append(emptyBlock, hintsLeft);

const hintsTop = createElem({ tag: 'div', classesCss: ['hints__top'] });


nonogramsRightColumn.append(hintsTop, gamefield);

let emptyNonogram;
let isTimerRunning = false;
let durationTimer = 0;
let intervalTimerId;

const btnsContainer = createElem({ tag: 'div', classesCss: ['buttons__container']});
const gamesFieldsContainer = createElem({ tag: 'div', classesCss: ['games__fields__container']});
const gamesContainer = createElem({ tag: 'div', classesCss: ['games__container']});

container.append(gamesContainer, gamesFieldsContainer, btnsContainer);

console.log(nonogramsData.length)

function fillGames(value) {
  gamesContainer.innerHTML = ``;
  let nonograms;
  if (value === 5) {
    nonograms = nonogramsData.filter((item) => item.id >= 100 && item.id < 200);
    gamesFields5x5.classList.add('_active');
    gamesFields10x10.classList.remove('_active');
    gamesFields15x15.classList.remove('_active');
  }

  if (value === 10) {
    nonograms = nonogramsData.filter((item) => item.id >= 200 && item.id < 300);
    gamesFields5x5.classList.remove('_active');
    gamesFields10x10.classList.add('_active');
    gamesFields15x15.classList.remove('_active');
  }

  if (value === 15) {
    nonograms = nonogramsData.filter((item) => item.id >= 300 && item.id < 400);
    gamesFields5x5.classList.remove('_active');
    gamesFields10x10.classList.remove('_active');
    gamesFields15x15.classList.add('_active');
  }

  nonograms.forEach((item) => {
    const currGame = createElem({ tag: 'button', classesCss: ['btn', 'btn_white'], content: item.title.toUpperCase() })
    gamesContainer.append(currGame);
    currGame.addEventListener('click', () => {
      buildGame(value, item.title);
    });
  });

}

const gamesFields5x5 = createElem({ tag: 'button', classesCss: ['btn', 'btn_white', 'games__field'], content: '5x5' });
const gamesFields10x10 = createElem({ tag: 'button', classesCss: ['btn', 'btn_white', 'games__field'], content: '10x10' });
const gamesFields15x15 = createElem({ tag: 'button', classesCss: ['btn', 'btn_white', 'games__field'], content: '15x15' });

gamesFieldsContainer.append(gamesFields5x5, gamesFields10x10, gamesFields15x15);

gamesFields5x5.addEventListener('click', () => {
  fillGames(5);
});

gamesFields10x10.addEventListener('click', () => {
  fillGames(10);
});

gamesFields15x15.addEventListener('click', () => {
  fillGames(15);
});

const resetGameBtn = createElem({ tag: 'button', classesCss: ['btn', 'btn_white'], content: 'reset' });


const timerContainer = createElem({ tag: 'div', classesCss: ['timer__container'], content: '00:00'});

btnsContainer.append(resetGameBtn, timerContainer);

const modalWin = createElem({ tag: 'div', classesCss: ['modalWin', 'modalWin_white']});
const modalWinTitle = createElem({ tag: 'div', classesCss: ['modalWin__title']});
const modalWinCloseBtn = createElem({ tag: 'button', classesCss: [ 'btn', 'btn_white', 'modalWin__closeBtn'], content: 'close'} );

modalWin.append(modalWinTitle, modalWinCloseBtn);

container.append(modalWin);

resetGameBtn.addEventListener('click', () => {
  const currNonogramId = localStorage.getItem('currNonogramOxyId');
  const currNonogram = nonogramsData.find((item) => item.id.toString() === currNonogramId);
  const currNonogramSize = currNonogram.nonogramArr.length;
  const currNonogramTitle = currNonogram.title;
  buildGame(currNonogramSize, currNonogramTitle);
});

function startTimer() {

  if (!isTimerRunning) {
    intervalTimerId = setInterval(() => {

    durationTimer += 1;

    let minutes = Math.floor(durationTimer / 60);
    let seconds = durationTimer % 60;

    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;

    timerContainer.innerText = minutes + ':' + seconds;

    }, 1000);
    isTimerRunning = true;
  }
}

function stopTimer() {
  clearInterval(intervalTimerId);
  isTimerRunning = false;
}

function buildGame(value, title) {

  const currNonogram = nonogramsData.find((item) => item.title === title);
  localStorage.setItem('currNonogramOxy', JSON.stringify(currNonogram.nonogramArr));
  localStorage.setItem('currNonogramOxyId', currNonogram.id);

  stopTimer();

  timerContainer.innerText = `00:00`;
  durationTimer = 0;

  gamefield.innerHTML = ``;
  hintsLeft.innerHTML = ``;
  hintsTop.innerHTML = ``;

  if (value === 5 || value === 10) {
    hintsTop.classList.add('hints__top_small');
    emptyBlock.classList.add('empty__block_small');
    nonogramsContainer.classList.add('nonograms__container_small');
    nonogramsLeftColumn.classList.add('nonograms__leftcolumn_small');
    gamefield.classList.add('gamefield_small');
  } else {
    hintsTop.classList.remove('hints__top_small');
    emptyBlock.classList.remove('empty__block_small');
    nonogramsContainer.classList.remove('nonograms__container_small');
    nonogramsLeftColumn.classList.remove('nonograms__leftcolumn_small');
    gamefield.classList.remove('gamefield_small');
  }

  if (value === 10) {
    gamefield.classList.add('gamefield__10x10_small')
  } else {
    gamefield.classList.remove('gamefield__10x10_small');
  }


  for (let i = 0; i < value * value; i += 1) {
    const cell = createElem({ tag: 'div', classesCss: ['gamefield__cell'] });
    cell.setAttribute('cell-number-data', i);

    if ( value === 5 && i >= 20 && i < 25) {
      cell.classList.add('gamefield__cell_border-bottom');
    }

    if (( value === 10 && i >= 40 && i < 50) || ( value === 10 && i >= 90 && i < 100 )) {
      cell.classList.add('gamefield__cell_border-bottom');
    }

    if ( (value === 15 && i >= 60 && i < 75) || ( value === 15 && i >= 135 && i < 150) || ( value === 15 && i >= 210 && i < 225)) {
      cell.classList.add('gamefield__cell_border-bottom');
    }

    if (value === 5 || value === 10) {
      cell.classList.add('gamefield__cell_small');
    }

    gamefield.append(cell);
    if (i < value) {
      const hintLeft = createElem({ tag: 'div', classesCss: ['hints__left__item'] });
      const hintTop = createElem({ tag: 'div', classesCss: ['hints__top__item'] });
      hintLeft.innerText = calculateLeftHints(currNonogram, i);
      hintTop.innerText = calculateTopHints(currNonogram, i);

      if (value === 5 || value === 10) {
        hintLeft.classList.add('hints__left__item_small');
        hintTop.classList.add('hints__top__item_small')
      }

      hintsLeft.append(hintLeft);
      hintsTop.append(hintTop);
    }

  }
  emptyNonogram = new Array(currNonogram.nonogramArr.length * currNonogram.nonogramArr.length).fill(0);

  gamefield.removeEventListener('mousedown', playGame);
  gamefield.removeEventListener('contextmenu', playGame);

  gamefield.addEventListener('mousedown', playGame);
  gamefield.addEventListener('contextmenu', playGame);
}

function calculateLeftHints(nonogram, i) {

  let temp = 0;

  const res = nonogram.nonogramArr[i].reduce((acc, item, index) => {
    if (item === 1) {
      temp += 1;
    }
    if (item === 0) {
      acc.push(temp);
      temp = 0;
    }
    if (index === nonogram.nonogramArr[i].length - 1) {
      acc.push(temp);
      temp = 0;
    }
    return acc;
  }, []);
  const leftHint = res.filter((item) => item).join(' ');
  if (!leftHint) return 0;
  return leftHint;
}

function calculateTopHints(nonogram, i) {

  let temp = 0;

  const res = nonogram.nonogramArr.reduce((acc, item, index) => {
    if (item[i] === 1) {
      temp += 1;
    }
    if (item[i] === 0) {
       acc.push(temp);
       temp = 0;
    }
    if (index === nonogram.nonogramArr[i].length - 1) {
      acc.push(temp);
      temp = 0;
    }
    return acc;
  }, []);
  const topHint = res.filter((item) => item).join(' ');
  if (!topHint) return 0;
  return topHint;
}

buildGame(5, 'tower');

function playGame(event) {
  const currCell = event.target;
  const currCellData = currCell.getAttribute('cell-number-data');

  startTimer();

  if (event.button === 0) {
    currCell.classList.remove('_cross');
    currCell.classList.toggle('_active');
    emptyNonogram[currCellData] = 1;
    if (!currCell.classList.contains('_active')) {
      emptyNonogram[currCellData] = 0;
    }
    if (emptyNonogram.toString() === JSON.parse(localStorage.getItem('currNonogramOxy')).flat().toString()) {
      winGame();
      stopTimer();
    }
  }
  if (event.type === 'contextmenu') {
    event.preventDefault();
    currCell.classList.remove('_active');
    currCell.classList.toggle('_cross');
    emptyNonogram[currCellData] = 0;
  }
}


modalWinCloseBtn.tabIndex = -1;
modalWinCloseBtn.addEventListener('click', closeGame);


function closeGame() {
  modalWin.classList.remove('_active');
  shadow.classList.remove('_active');
  gamefield.removeEventListener('mousedown', playGame);
  gamefield.removeEventListener('contextmenu', playGame);
  modalWinCloseBtn.blur();
}

function winGame() {
  modalWin.classList.add('_active');
  modalWinTitle.innerText = `Great! You have solved the nonogram in ${durationTimer} seconds!`;
  shadow.classList.add('_active');
}