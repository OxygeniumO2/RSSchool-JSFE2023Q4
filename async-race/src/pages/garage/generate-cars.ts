import { CarData } from '../../utils/create-car';
import createRandomCar from '../../utils/create-random-car';
import { LocalStoragePages, getPage } from '../../utils/get-page-from-ls';
import addCar from './add-car';
import buildGaragePage from './build-garage-page';

const NUMBER_OF_GENERATED_CARS = 100;

async function generateCars() {
  for (let i = 0; i < NUMBER_OF_GENERATED_CARS; i += 1) {
    const newRandomCar: CarData = createRandomCar();
    addCar(newRandomCar);
  }
  const currPage = getPage(LocalStoragePages.garagePage);
  await buildGaragePage(currPage);
}

export default generateCars;
