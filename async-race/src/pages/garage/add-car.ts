import { GARAGE_PATH, baseUrl } from '../../utils/base-url';
import { Car } from '../../utils/create-car';

async function addCar(car: Car): Promise<void> {
  await fetch(`${baseUrl}${GARAGE_PATH}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(car),
  });
}

export default addCar;
