import './winners.css';
import { APP_CONTAINER } from '../../app-container/app-container';
import createElem from '../../utils/create-elem';
import { allWinnersPromise } from '../../utils/fetch-resp';
import { WINNERS_PATH, baseUrl } from '../../utils/base-url';
import Winner from './winners-interfaces';
import buildWinners from './build-winners';
import removeElementsByClass from '../../utils/remove-elem-by-class';
import buildWinnersControls from './build-winners-controls';

const PAGE_NUMBER_DEFAULT: number = 1;
const LIMIT_WINNERS_BY_PAGE: number = 10;

async function buildWinnersPage(
  pageNumber: number = PAGE_NUMBER_DEFAULT,
  limit: number = LIMIT_WINNERS_BY_PAGE,
): Promise<void> {
  const winners = createElem({
    tagName: 'div',
    classNames: ['winners', '_hidden'],
  });

  localStorage.setItem('winnersPageOxy', pageNumber.toString());

  const myWinners: Winner[] = await allWinnersPromise(baseUrl, WINNERS_PATH);

  const myWinnersLength = myWinners.length;

  const winnersTitle = createElem({
    tagName: 'span',
    classNames: ['winners__title'],
    textContent: 'Winners ',
  });
  const winnersCount = createElem({
    tagName: 'span',
    textContent: `(${myWinnersLength})`,
  });

  const winnersPageText = createElem({
    tagName: 'div',
    classNames: ['winners__page'],
    textContent: `Page #${pageNumber}`,
  });

  const winnersControlsContainer = buildWinnersControls();

  const winnersContainer = await buildWinners(myWinners);

  winners.append(
    winnersTitle,
    winnersCount,
    winnersPageText,
    winnersControlsContainer,
    winnersContainer,
  );

  removeElementsByClass(APP_CONTAINER, 'winners');

  APP_CONTAINER.append(winners);

  console.log(limit);
}

export default buildWinnersPage;
