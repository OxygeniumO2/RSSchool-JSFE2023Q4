import { Car } from './create-car';
import generateRandomCarName from './generate-random-car-name';
import generateRandomColor from './generate-random-color';

function createRandomCar(): Car {
  const randomName = generateRandomCarName();
  const randomColor = generateRandomColor();
  const newRandomCar = {
    name: randomName,
    color: randomColor,
  };

  return newRandomCar;
}

export default createRandomCar;
