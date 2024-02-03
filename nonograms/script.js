'use strict';

import { nonogramsData } from './data.js';

function createElem({tag, classesCss}) {
  const elem = document.createElement(tag);

  if (classesCss) {
    classesCss.forEach((item) => {
      elem.classList.add(item);
    });
  }
  return elem;
}

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

function buildGame(value, title) {

  const currNonogram = nonogramsData.find((item) => item.title === title);
  localStorage.setItem('currNonogram', JSON.stringify(currNonogram.nonogramArr));

  gamefield.innerHTML = ``;

  if (value === 5 || value === 10 && !gamefield.classList.contains('gamefield_small')) {
    hintsTop.classList.add('hints__top_small');
    emptyBlock.classList.add('empty__block_small');
    nonogramsContainer.classList.add('nonograms__container_small');
    nonogramsLeftColumn.classList.add('nonograms__leftcolumn_small');
    gamefield.classList.add('gamefield_small');
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

buildGame(15, 'sponge-bob');

function playGame(event) {
  const currCell = event.target;
  const currCellData = currCell.getAttribute('cell-number-data');

  if (event.button === 0) {
    currCell.classList.remove('_cross');
    currCell.classList.toggle('_active');
    emptyNonogram[currCellData] = 1;
    if (!currCell.classList.contains('_active')) {
      emptyNonogram[currCellData] = 0;
    }
    if (emptyNonogram.toString() === JSON.parse(localStorage.getItem('currNonogram')).flat().toString()) {
      alert('sas');
    }
  }
  if (event.button === 2) {
    currCell.classList.remove('_active');
    currCell.classList.toggle('_cross');
    emptyNonogram[currCellData] = 0;
  }
}

gamefield.addEventListener('mousedown', playGame);
gamefield.addEventListener('contextmenu', (event) => {
  event.preventDefault();
});