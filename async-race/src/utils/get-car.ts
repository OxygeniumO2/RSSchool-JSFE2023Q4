import GarageCar from '../pages/garage/garage-interfaces';

async function getCar(
  url: string,
  path: string,
  carId: number,
): Promise<GarageCar> {
  const currCarByIdResponse = await fetch(`${url}${path}/${carId}`);
  const currCarById = await currCarByIdResponse.json();
  return currCarById;
}

export default getCar;
