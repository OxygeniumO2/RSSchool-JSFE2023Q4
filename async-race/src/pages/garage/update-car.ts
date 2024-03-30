import baseUrl, { GARAGE_PATH } from '../../utils/base-url';
import getCurrPage from '../../utils/getPageFromLs';
import buildGaragePage from './build-garage-page';
import { setUpdateToNewState } from './select-car';

async function updateCar(
  carName: string,
  carColor: string,
  carId: number,
): Promise<void> {
  const updatedCar = {
    name: carName,
    color: carColor,
  };

  await fetch(`${baseUrl}${GARAGE_PATH}/${carId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedCar),
  });

  setUpdateToNewState(false);

  const currPage = getCurrPage();

  await buildGaragePage(currPage);
}

export default updateCar;
