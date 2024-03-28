import './garage.css';
import { APP_CONTAINER } from '../../app-container/app-container';
import createElem from '../../utils/create-elem';
import baseUrl from '../../utils/base-url';
import buildCars from './build-cars';
import GarageCars from './garage-interfaces';

const GARAGE_PATH = '/garage';
// let PAGE_NUMBER = 2;
// const LIMIT_CARS_BY_PAGE = 7;

async function buildGaragePage() {
  const garage = createElem({ tag: 'div', classesCss: ['garage'] });
  const addCarsContainer = createElem({
    tag: 'form',
    classesCss: ['add__update__cars-container'],
  });
  const inputCarAddName = createElem({
    tag: 'input',
    type: 'text',
    required: true,
  });
  const inputColorAddCar = createElem({ tag: 'input', type: 'color' });
  const createCarBtn = createElem({ tag: 'button', textContent: 'Create Car' });
  addCarsContainer.append(inputCarAddName, inputColorAddCar, createCarBtn);

  const updateCarsContainer = createElem({
    tag: 'form',
    classesCss: ['add__update__cars-container'],
  });
  const inputCarUpdateName = createElem({
    tag: 'input',
    type: 'text',
    required: true,
  });
  const inputColorUpdateCar = createElem({ tag: 'input', type: 'color' });
  const updateCarBtn = createElem({ tag: 'button', textContent: 'Update Car' });

  updateCarsContainer.append(
    inputCarUpdateName,
    inputColorUpdateCar,
    updateCarBtn,
  );

  const raceControlContainer = createElem({
    tag: 'div',
    classesCss: ['add__update__cars-container'],
  });
  const raceBtn = createElem({
    tag: 'button',
    classesCss: ['btn'],
    textContent: 'Race',
  });
  const resetRaceBtn = createElem({
    tag: 'button',
    classesCss: ['btn'],
    textContent: 'Reset Race',
  });
  const generateCarsBtn = createElem({
    tag: 'button',
    classesCss: ['btn'],
    textContent: 'Generate Cars',
  });
  raceControlContainer.append(raceBtn, resetRaceBtn, generateCarsBtn);

  const garageTitle = createElem({ tag: 'span', textContent: 'Garage' });
  const garageResponse: Response = await fetch(`${baseUrl}${GARAGE_PATH}`);
  // const garageResponseByPageAndLimit: Response = await fetch(
  //   `${baseUrl}/garage?_page=${page}&_limit=${limit}`,
  // );
  const garageCars: GarageCars[] = await garageResponse.json();

  console.log('sas', garageCars);

  const garageNumberOfCarsElem = createElem({
    tag: 'span',
    textContent: ` (${garageCars.length})`,
  });

  const garagePageText = createElem({ tag: 'div', textContent: 'Page # 1' });

  const allCarsContainer: HTMLElement = createElem({ tag: 'div' });
  buildCars(garageCars, allCarsContainer);

  garage.append(
    addCarsContainer,
    updateCarsContainer,
    raceControlContainer,
    garageTitle,
    garageNumberOfCarsElem,
    garagePageText,
  );

  APP_CONTAINER.append(garage);
}

export default buildGaragePage;
