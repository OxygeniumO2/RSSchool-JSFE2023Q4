import createElem from '../../utils/create-elem';
// eslint-disable-next-line import/no-cycle
import { AllowedSortValue, sortWinnersByValue } from './sort-by-value';

const SORT_BY_WINS: AllowedSortValue = 'wins';
const SORT_BY_TIME: AllowedSortValue = 'time';

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
    classNames: ['winners__controls__title', 'sort__item-container'],
    textContent: 'Wins',
  });
  const winnersBestTime = createElem({
    tagName: 'div',
    classNames: ['winners__controls__title', 'sort__item-container'],
    textContent: 'Best time (sec)',
  });

  winnersWins.addEventListener('click', () => {
    sortWinnersByValue(SORT_BY_WINS);
  });
  winnersBestTime.addEventListener('click', () => {
    sortWinnersByValue(SORT_BY_TIME);
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
