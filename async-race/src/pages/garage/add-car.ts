import { GARAGE_PATH, baseUrl } from '../../utils/base-url';
import { CarData } from '../../utils/create-car';

async function addCar(car: CarData): Promise<void> {
  await fetch(`${baseUrl}${GARAGE_PATH}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(car),
  });
}

export default addCar;
