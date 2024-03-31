import { carManufacturer, carModel } from './car-names';

function generateRandomCarName(): string {
  const randomManufacturerIndex = Math.floor(
    Math.random() * carManufacturer.length,
  );
  const randomModelIndex = Math.floor(Math.random() * carModel.length);

  const manufacturer = carManufacturer[randomManufacturerIndex];
  const model = carModel[randomModelIndex];

  return `${manufacturer} ${model}`;
}

export default generateRandomCarName;
