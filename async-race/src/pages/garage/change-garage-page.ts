import { GARAGE_PATH, baseUrl } from '../../utils/base-url';
import { garageAllCarsPromise } from '../../utils/fetch-resp';
import getCurrPage from '../../utils/get-page-from-ls';
import buildGaragePage from './build-garage-page';
import { GarageCar } from './garage-interfaces';

const NEXT_PAGE: string = 'Next Page';

async function changeGaragePage(
  btn: HTMLElement,
  defaultLimit: number,
): Promise<void> {
  const currPage = getCurrPage();

  const allCars: GarageCar[] = await garageAllCarsPromise(baseUrl, GARAGE_PATH);

  const allCarsLength = allCars.length;

  const totalPages = Math.ceil(allCarsLength / defaultLimit);

  let nextPage = currPage;

  if (btn.textContent === NEXT_PAGE) {
    nextPage = (currPage % totalPages) + 1;
  } else {
    nextPage = currPage === 1 ? totalPages : currPage - 1;
  }

  await buildGaragePage(nextPage);
}

export default changeGaragePage;
