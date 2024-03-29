import './garage.css';
import { APP_CONTAINER } from '../../app-container/app-container';
import createElem from '../../utils/create-elem';
// import baseUrl, { GARAGE_PATH } from '../../utils/base-url';
// import buildCars from './build-cars';
// import GarageCars from './garage-interfaces';
import addCar from './add-car';
// import buildGaragePage from './build-garage-page';

export function buildGarageControls(): void {
  const garage = createElem({ tag: 'div', classesCss: ['garage'] });
  const addCarsContainer = createElem({
    tag: 'form',
    classesCss: ['add__update__cars-container'],
  });
  const inputCarAddName = createElem({
    tag: 'input',
    type: 'text',
    required: true,
  }) as HTMLInputElement;
  const inputColorAddCar = createElem({
    tag: 'input',
    type: 'color',
  }) as HTMLInputElement;
  const createCarBtn = createElem({
    tag: 'button',
    type: 'submit',
    textContent: 'Create Car',
  });
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

  garage.append(addCarsContainer, updateCarsContainer, raceControlContainer);

  addCarsContainer.addEventListener('submit', async (event) => {
    event.preventDefault();
    await addCar(inputCarAddName.value, inputColorAddCar.value);
  });
  APP_CONTAINER.append(garage);
}

export default buildGarageControls;
