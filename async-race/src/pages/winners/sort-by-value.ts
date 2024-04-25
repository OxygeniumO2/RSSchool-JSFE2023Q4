import { Order } from '../../utils/fetch-resp';
import getCurrWinnerPage from '../../utils/get-winner-page-from-ls';
// eslint-disable-next-line import/no-cycle
import buildWinnersPage from './build-winners-page';

type AllowedSortValue = 'wins' | 'time' | 'id';

function sortWinnersByValue(value: AllowedSortValue) {
  const sortByValue = value;

  localStorage.setItem('winnersSortedBy', sortByValue);

  const prevOrder = localStorage.getItem('winnersOrderBy') as string;

  const newOrder = prevOrder === Order.Asc ? Order.Desc : Order.Asc;

  const currWinnerPage = getCurrWinnerPage();

  buildWinnersPage(currWinnerPage, newOrder, sortByValue);
}

export { AllowedSortValue, sortWinnersByValue };
