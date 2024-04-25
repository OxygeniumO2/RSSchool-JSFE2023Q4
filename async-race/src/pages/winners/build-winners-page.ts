import './winners.css';
import { APP_CONTAINER } from '../../app-container/app-container';
import createElem from '../../utils/create-elem';
import {
  Order,
  allWinnersPromise,
  winnersByPageAndLimitPromise,
} from '../../utils/fetch-resp';
import { WINNERS_PATH, baseUrl } from '../../utils/base-url';
import Winner from './winners-interfaces';
import buildWinners from './build-winners';
import removeElementsByClass from '../../utils/remove-elem-by-class';
// eslint-disable-next-line import/no-cycle
import buildWinnersControls from './build-winners-controls';
// eslint-disable-next-line import/no-cycle
import buildChangePages from './build-winners-change-pages';

const PAGE_NUMBER_DEFAULT: number = 1;
const LIMIT_WINNERS_BY_PAGE: number = 10;

async function buildWinnersPage(
  pageNumber: number = PAGE_NUMBER_DEFAULT,
  order: string = Order.Asc,
  sort: string = 'id',
): Promise<void> {
  const winners = createElem({
    tagName: 'div',
    classNames: ['winners'],
  });

  document.addEventListener('DOMContentLoaded', () => {
    winners.classList.add('_hidden');
  });

  localStorage.setItem('winnersPageOxy', pageNumber.toString());
  localStorage.setItem('winnersOrderBy', order);
  localStorage.setItem('winnersSortedBy', sort);

  const allWinners = await allWinnersPromise(baseUrl, WINNERS_PATH);

  const myWinners: Winner[] = await winnersByPageAndLimitPromise(
    baseUrl,
    WINNERS_PATH,
    pageNumber,
    LIMIT_WINNERS_BY_PAGE,
    order,
    sort,
  );

  const allWinnersLength = allWinners.length;

  // const winnersCarsOnOnePage: Winner[] = await winnersByPageAndLimitPromise(
  //   baseUrl,
  //   WINNERS_PATH,
  //   pageNumber,
  //   LIMIT_WINNERS_BY_PAGE,
  // );

  const winnersTitle = createElem({
    tagName: 'span',
    classNames: ['winners__title'],
    textContent: 'Winners ',
  });

  const winnersCountElem = createElem({
    tagName: 'span',
    textContent: `(${allWinnersLength})`,
  });

  const winnersPageText = createElem({
    tagName: 'div',
    classNames: ['winners__page'],
    textContent: `Page #${pageNumber}`,
  });

  const allWinnersContainer = createElem({ tagName: 'div' });

  await buildWinners(
    myWinners,
    allWinnersContainer,
    winnersCountElem,
    allWinnersLength,
  );

  const winnersControlsContainer = buildWinnersControls();

  const changePagesContainer = buildChangePages();

  winners.append(
    winnersTitle,
    winnersCountElem,
    winnersPageText,
    changePagesContainer,
    winnersControlsContainer,
    allWinnersContainer,
  );

  removeElementsByClass(APP_CONTAINER, 'winners');

  APP_CONTAINER.append(winners);
}

export default buildWinnersPage;
