import { GARAGE_PATH, WINNERS_PATH, baseUrl } from '../../utils/base-url';
import setUpdateToNewState from '../../utils/set-update-to-new-state';
import buildWinnersPage from '../winners/build-winners-page';

async function removeCar(carId: number): Promise<void> {
  await fetch(`${baseUrl}${GARAGE_PATH}/${carId}`, {
    method: 'DELETE',
  });

  setUpdateToNewState(false);

  const response = await fetch(`${baseUrl}${WINNERS_PATH}/${carId}`, {
    method: 'DELETE',
  });

  if (response.ok) {
    await buildWinnersPage();
  }
}

export default removeCar;
