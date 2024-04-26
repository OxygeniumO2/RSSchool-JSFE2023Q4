import { WINNERS_PATH, baseUrl } from '../../utils/base-url';
import { getWinners } from '../../utils/fetch-resp';
import { LocalStoragePages, getPage } from '../../utils/get-page-from-ls';

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
  const currPage = getPage(LocalStoragePages.winnersPage);

  const allWinners: Winner[] = await getWinners(
    baseUrl,
    WINNERS_PATH,
    order,
    sort,
  );

  const allWinnersLength = allWinners.length;

  const totalPages =
    allWinnersLength > 0 ? Math.ceil(allWinnersLength / defaultLimit) : 1;

  let nextPage = currPage;

  if (btn.textContent === NEXT_PAGE) {
    nextPage = (currPage % totalPages) + 1;
  } else {
    nextPage = currPage === 1 ? totalPages : currPage - 1;
  }

  await buildWinnersPage(nextPage, order, sort);
}

export default changeWinnersPage;
