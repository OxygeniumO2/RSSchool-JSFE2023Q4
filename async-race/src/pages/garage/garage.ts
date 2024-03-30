import './garage.css';
import { APP_CONTAINER } from '../../app-container/app-container';
import createElem from '../../utils/create-elem';
import addCar from './add-car';
import generateCars from './generate-cars';

export function buildGarageControls(): void {
  const garage = createElem({ tagName: 'div', classNames: ['garage'] });
  const addCarsContainer = createElem({
    tagName: 'form',
    classNames: ['add__update__cars-container'],
  });
  const inputCarAddName = createElem({
    tagName: 'input',
    attributes: [
      ['type', 'text'],
      ['required', true],
    ],
  }) as HTMLInputElement;
  const inputColorAddCar = createElem({
    tagName: 'input',
    attributes: [['type', 'color']],
  }) as HTMLInputElement;
  const createCarBtn = createElem({
    tagName: 'button',
    attributes: [['type', 'submit']],
    textContent: 'Create Car',
  });
  addCarsContainer.append(inputCarAddName, inputColorAddCar, createCarBtn);

  const updateCarsContainer = createElem({
    tagName: 'form',
    classNames: ['add__update__cars-container'],
  });
  const inputCarUpdateName = createElem({
    tagName: 'input',
    attributes: [
      ['type', 'text'],
      ['required', true],
    ],
  });
  const inputColorUpdateCar = createElem({
    tagName: 'input',
    attributes: [['type', 'color']],
  });
  const updateCarBtn = createElem({
    tagName: 'button',
    textContent: 'Update Car',
  });

  updateCarsContainer.append(
    inputCarUpdateName,
    inputColorUpdateCar,
    updateCarBtn,
  );

  const raceControlContainer = createElem({
    tagName: 'div',
    classNames: ['add__update__cars-container'],
  });
  const raceBtn = createElem({
    tagName: 'button',
    classNames: ['btn'],
    textContent: 'Race',
  });
  const resetRaceBtn = createElem({
    tagName: 'button',
    classNames: ['btn'],
    textContent: 'Reset Race',
  });
  const generateCarsBtn = createElem({
    tagName: 'button',
    classNames: ['btn'],
    textContent: 'Generate Cars',
  });

  generateCarsBtn.addEventListener('click', generateCars);

  raceControlContainer.append(raceBtn, resetRaceBtn, generateCarsBtn);

  garage.append(addCarsContainer, updateCarsContainer, raceControlContainer);

  addCarsContainer.addEventListener('submit', async (event) => {
    event.preventDefault();
    await addCar(inputCarAddName.value, inputColorAddCar.value);
  });
  APP_CONTAINER.append(garage);
}

export default buildGarageControls;
