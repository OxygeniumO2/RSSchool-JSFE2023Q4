import baseUrl, { GARAGE_PATH } from '../../utils/base-url';

// eslint-disable-next-line import/no-cycle
import buildGaragePage from './build-garage-page';

async function removeCar(carId: number): Promise<void> {
  await fetch(`${baseUrl}${GARAGE_PATH}/${carId}`, {
    method: 'DELETE',
  });
  await buildGaragePage();
}

export default removeCar;
