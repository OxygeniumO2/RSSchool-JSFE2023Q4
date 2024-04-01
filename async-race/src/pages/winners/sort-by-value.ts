import getCurrWinnerPage from '../../utils/get-winner-page-from-ls';
// eslint-disable-next-line import/no-cycle
import buildWinnersPage from './build-winners-page';

type AllowedSortValue = 'wins' | 'time' | 'id';

function sortWinnersByValue(value: AllowedSortValue) {
  const sortByValue = value;

  localStorage.setItem('winnersSortedBy', sortByValue);

  let newOrder;
  const prevOrder = localStorage.getItem('winnersOrderBy') as string;

  if (prevOrder === 'ASC') {
    newOrder = 'DESC';
  } else {
    newOrder = 'ASC';
  }

  const currWinnerPage = getCurrWinnerPage();

  buildWinnersPage(currWinnerPage, newOrder, sortByValue);
}

export { AllowedSortValue, sortWinnersByValue };
