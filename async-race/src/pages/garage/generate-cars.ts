import { carManufacturer, carModel } from '../../utils/carNames';
import addCar from './add-car';

const NUMBER_OF_GENERATED_CARS = 100;

function generateRandomColor(): string {
  const red = Math.floor(Math.random() * 256);
  const green = Math.floor(Math.random() * 256);
  const blue = Math.floor(Math.random() * 256);

  const hexRed = red.toString(16).padStart(2, '0');
  const hexGreen = green.toString(16).padStart(2, '0');
  const hexBlue = blue.toString(16).padStart(2, '0');
  const hexColor = `#${hexRed}${hexGreen}${hexBlue}`;

  return hexColor;
}

function generateRandomCarName(): string {
  const randomManufacturerIndex = Math.floor(
    Math.random() * carManufacturer.length,
  );
  const randomModelIndex = Math.floor(Math.random() * carModel.length);

  const manufacturer = carManufacturer[randomManufacturerIndex];
  const model = carModel[randomModelIndex];

  return `${manufacturer} ${model}`;
}

function generateCars() {
  for (let i = 0; i < NUMBER_OF_GENERATED_CARS; i += 1) {
    const randomCarName = generateRandomCarName();
    const randomCarColor = generateRandomColor();
    addCar(randomCarName, randomCarColor);
  }
}

export default generateCars;
