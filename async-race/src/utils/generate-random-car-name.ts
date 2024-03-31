import carModelsByManufacturer from './car-names';

function generateRandomCarName(): string {
  const manufacturers = Object.keys(carModelsByManufacturer);

  const randomManufacturer =
    manufacturers[Math.floor(Math.random() * manufacturers.length)];

  const models = carModelsByManufacturer[randomManufacturer];

  const randomModel = models[Math.floor(Math.random() * models.length)];

  return `${randomManufacturer} ${randomModel}`;
}

export default generateRandomCarName;
