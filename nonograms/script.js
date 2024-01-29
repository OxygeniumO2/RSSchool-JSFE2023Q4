'use strict';

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

function buildGame(value) {

  document.body.innerHTML = ``;

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

  for (let i = 0; i < value * value; i += 1) {
    const cell = createElem({ tag: 'div', classesCss: ['gamefield__cell'] });
    gamefield.append(cell);

    if (i < value) {
      const hintLeft = createElem({ tag: 'div', classesCss: ['hints__left__item'] });
      const hintTop = createElem({ tag: 'div', classesCss: ['hints__top__item'] });
      hintsLeft.append(hintLeft);
      hintsTop.append(hintTop);
    }
  }
}

buildGame(5);
