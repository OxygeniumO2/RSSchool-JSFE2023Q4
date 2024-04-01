import { WINNERS_PATH, baseUrl } from '../../utils/base-url';
import { allWinnersPromise } from '../../utils/fetch-resp';
import getCurrWinnerPage from '../../utils/get-winner-page-from-ls';

// eslint-disable-next-line import/no-cycle
import buildWinnersPage from './build-winners-page';
import Winner from './winners-interfaces';

const NEXT_PAGE: string = 'Next Page';

async function changeWinnersPage(
  btn: HTMLElement,
  defaultLimit: number,
  order: string,
  sort: string,
): Promise<void> {
  const currPage = getCurrWinnerPage();

  const allWinners: Winner[] = await allWinnersPromise(
    baseUrl,
    WINNERS_PATH,
    order,
    sort,
  );

  const allWinnersLength = allWinners.length;

  const totalPages = Math.ceil(allWinnersLength / defaultLimit);

  let nextPage = currPage;

  if (btn.textContent === NEXT_PAGE) {
    nextPage = (currPage % totalPages) + 1;
  } else {
    nextPage = currPage === 1 ? totalPages : currPage - 1;
  }

  await buildWinnersPage(nextPage, order, sort);
}

export default changeWinnersPage;
