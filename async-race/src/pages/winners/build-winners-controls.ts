import createElem from '../../utils/create-elem';

function buildWinnersControls(): HTMLElement {
  const winnersElemsContainer = createElem({
    tagName: 'div',
    classNames: ['winners-container'],
  });

  const winnersNumber = createElem({
    tagName: 'div',
    classNames: ['winners__controls__title'],
    textContent: 'Number',
  });
  const winnersCar = createElem({
    tagName: 'div',
    classNames: ['winners__controls__title'],
    textContent: 'Car',
  });
  const winnersName = createElem({
    tagName: 'div',
    classNames: ['winners__controls__title'],
    textContent: 'Name',
  });
  const winnersWins = createElem({
    tagName: 'div',
    classNames: ['winners__controls__title'],
    textContent: 'Wins',
  });
  const winnersBestTime = createElem({
    tagName: 'div',
    classNames: ['winners__controls__title'],
    textContent: 'Best time (sec)',
  });

  winnersElemsContainer.append(
    winnersNumber,
    winnersCar,
    winnersName,
    winnersWins,
    winnersBestTime,
  );

  return winnersElemsContainer;
}

export default buildWinnersControls;
