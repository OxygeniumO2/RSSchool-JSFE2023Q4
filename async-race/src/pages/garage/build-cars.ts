import createElem from '../../utils/create-elem';
import GarageCars from './garage-interfaces';

function buildCars(
  cars: GarageCars[],
  carsContainer: HTMLElement,
  garageNumberOfCars: HTMLElement,
  garageTotalLength: number,
): void {
  cars.forEach((car) => {
    console.log('sas', car);
    const carContainer = createElem({ tag: 'div' });
    const carNameAndBtnsContainer = createElem({ tag: 'div' });
    const removeCarBtn = createElem({
      tag: 'button',
      classesCss: ['btn_small'],
      textContent: 'Remove Car',
    });
    const selectCarBtn = createElem({
      tag: 'button',
      classesCss: ['btn_small'],
      textContent: 'Select Car',
    });
    const carName = createElem({ tag: 'span', textContent: `${car.name}` });
    carNameAndBtnsContainer.append(removeCarBtn, selectCarBtn, carName);

    const carControlContainerWithImg = createElem({
      tag: 'div',
      classesCss: ['car__control__container'],
    });
    const carControlContainer = createElem({ tag: 'div' });
    const carStartBtn = createElem({
      tag: 'button',
      classesCss: ['btn_small'],
      textContent: 'DRV',
    });
    const carStopBtn = createElem({
      tag: 'button',
      classesCss: ['btn_small'],
      textContent: 'RST',
    });
    carControlContainer.append(carStartBtn, carStopBtn);

    const carImg = createElem({ tag: 'div', classesCss: ['car'] });

    carControlContainerWithImg.append(carControlContainer, carImg);

    carContainer.append(carNameAndBtnsContainer, carControlContainerWithImg);

    carsContainer.append(carContainer);
  });
  const internalGarageNumberOfCars = garageNumberOfCars;
  internalGarageNumberOfCars.textContent = ` (${garageTotalLength})`;
}

export default buildCars;
