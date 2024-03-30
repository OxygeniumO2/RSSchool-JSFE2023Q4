import createElem from '../../utils/create-elem';
import GarageCar from './garage-interfaces';
// eslint-disable-next-line import/no-cycle
import removeCar from './remove-car';

function buildCars(
  cars: GarageCar[],
  carsContainer: HTMLElement,
  garageNumberOfCars: HTMLElement,
  garageTotalLength: number,
): void {
  cars.forEach((car) => {
    const carId = car.id;
    const carContainer = createElem({ tagName: 'div' });
    const carNameAndBtnsContainer = createElem({ tagName: 'div' });
    const removeCarBtn = createElem({
      tagName: 'button',
      classNames: ['btn_small'],
      textContent: 'Remove Car',
    });

    removeCarBtn.addEventListener('click', () => {
      removeCar(carId);
    });
    const selectCarBtn = createElem({
      tagName: 'button',
      classNames: ['btn_small'],
      textContent: 'Select Car',
    });
    const carName = createElem({ tagName: 'span', textContent: `${car.name}` });
    carNameAndBtnsContainer.append(removeCarBtn, selectCarBtn, carName);

    const carControlContainerWithImg = createElem({
      tagName: 'div',
      classNames: ['car__control__container'],
    });
    const carControlContainer = createElem({ tagName: 'div' });
    const carStartBtn = createElem({
      tagName: 'button',
      classNames: ['btn_small'],
      textContent: 'DRV',
    });
    const carStopBtn = createElem({
      tagName: 'button',
      classNames: ['btn_small'],
      textContent: 'RST',
    });
    carControlContainer.append(carStartBtn, carStopBtn);

    const carImg = createElem({ tagName: 'div', classNames: ['car'] });

    carControlContainerWithImg.append(carControlContainer, carImg);

    carContainer.append(carNameAndBtnsContainer, carControlContainerWithImg);

    carsContainer.append(carContainer);
  });
  const internalGarageNumberOfCars = garageNumberOfCars;
  internalGarageNumberOfCars.textContent = ` (${garageTotalLength})`;
}

export default buildCars;
