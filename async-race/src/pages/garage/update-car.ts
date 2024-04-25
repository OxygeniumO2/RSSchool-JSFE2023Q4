import { GARAGE_PATH, baseUrl } from '../../utils/base-url';
import setUpdateToNewState from '../../utils/set-update-to-new-state';

async function updateCarPayload(
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
}

export default updateCarPayload;
