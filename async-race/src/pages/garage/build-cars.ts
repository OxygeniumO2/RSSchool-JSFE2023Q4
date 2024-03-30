import createElem from '../../utils/create-elem';
import getCurrPage from '../../utils/getPageFromLs';
// eslint-disable-next-line import/no-cycle
import buildGaragePage from './build-garage-page';
import carSvg from './car-svg-content';
import GarageCar from './garage-interfaces';
// eslint-disable-next-line import/no-cycle
import removeCar from './remove-car';
import selectCar from './select-car';

function buildCars(
  cars: GarageCar[],
  carsContainer: HTMLElement,
  garageNumberOfCars: HTMLElement,
  garageTotalLength: number,
): void {
  cars.forEach((car, index) => {
    const carId = car.id;

    const carContainer = createElem({
      tagName: 'div',
      classNames: ['car-container'],
    });

    const carNameAndBtnsContainer = createElem({
      tagName: 'div',
      classNames: ['control__name__car-container'],
    });

    const removeCarBtn = createElem({
      tagName: 'button',
      classNames: ['btn_small'],
      textContent: 'Remove Car',
    });

    removeCarBtn.addEventListener('click', async () => {
      await removeCar(carId);

      const currPage = getCurrPage();

      await buildGaragePage(currPage);
    });

    const selectCarBtn = createElem({
      tagName: 'button',
      classNames: ['btn_small'],
      textContent: 'Select Car',
    });

    selectCarBtn.addEventListener('click', () => {
      selectCar(index);
      localStorage.setItem('carIdOxy', car.id.toString());
    });

    const carName = createElem({ tagName: 'span', textContent: `${car.name}` });

    carNameAndBtnsContainer.append(removeCarBtn, selectCarBtn, carName);

    const carControlContainerWithImg = createElem({
      tagName: 'div',
      classNames: ['car__control__container'],
    });

    const carControlContainer = createElem({
      tagName: 'div',
      classNames: ['engine__container'],
    });

    const carStartBtn = createElem({
      tagName: 'button',
      classNames: ['btn_small', 'drive__car'],
      textContent: 'D',
    });

    const carStopBtn = createElem({
      tagName: 'button',
      classNames: ['btn_small', 'stop__car'],
      textContent: 'S',
    });

    carControlContainer.append(carStartBtn, carStopBtn);

    const carImg = createElem({ tagName: 'div', classNames: ['car'] });

    carImg.innerHTML = carSvg;
    carImg.children[0].setAttribute('fill', car.color);

    carControlContainerWithImg.append(carControlContainer, carImg);

    carContainer.append(carNameAndBtnsContainer, carControlContainerWithImg);

    carsContainer.append(carContainer);
  });

  const internalGarageNumberOfCars = garageNumberOfCars;
  internalGarageNumberOfCars.textContent = ` (${garageTotalLength})`;
}

export default buildCars;
