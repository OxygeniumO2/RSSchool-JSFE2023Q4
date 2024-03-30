import baseUrl, { GARAGE_PATH } from '../../utils/base-url';
import getCurrPage from '../../utils/getPageFromLs';

// eslint-disable-next-line import/no-cycle
import buildGaragePage from './build-garage-page';
import { setUpdateToNewState } from './select-car';

async function removeCar(carId: number): Promise<void> {
  await fetch(`${baseUrl}${GARAGE_PATH}/${carId}`, {
    method: 'DELETE',
  });

  const currPage = getCurrPage();

  await buildGaragePage(currPage);

  setUpdateToNewState(false);
}

export default removeCar;
