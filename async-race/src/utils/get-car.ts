import { GarageCar } from '../pages/garage/garage-interfaces';

async function getCar(
  url: string,
  path: string,
  carId: number,
): Promise<GarageCar> {
  const currCarByIdResponse = await fetch(`${url}${path}/${carId}`);
  return currCarByIdResponse.json();
}

export default getCar;
