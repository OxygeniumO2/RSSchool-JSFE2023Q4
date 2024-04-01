import { ENGINE_PATH, baseUrl } from '../../utils/base-url';
import carSvg from '../../utils/car-svg-content';
import changeStateBtns from '../../utils/change-state-btns';
import changeStateBtnWhileDriving from '../../utils/change-state-btns-while-driving';
import setStateMainPagesBtns from '../../utils/change-state-main-pages-btns';
import changeStateRaceStopBtns from '../../utils/change-state-race-stop-btns';
import createElem from '../../utils/create-elem';
import getCarTravelData from '../../utils/get-car-travel-data';
import getCurrPage from '../../utils/get-page-from-ls';
import setUpdateToNewState from '../../utils/set-update-to-new-state';
// eslint-disable-next-line import/no-cycle
import buildGaragePage from './build-garage-page';
import changeEngineStatePromise from './engine-state';
import { GarageCar } from './garage-interfaces';
import removeCar from './remove-car';
import selectCar from './select-car';

function buildCars(
  cars: GarageCar[],
  carsContainer: HTMLElement,
  garageNumberOfCars: HTMLElement,
  garageTotalLength: number,
): void {
  const finishedCars: number[] = [];

  function isAllCarsFinished(): boolean {
    return finishedCars.length === 0;
  }

  function addFinishedCar(carId: number) {
    finishedCars.push(carId);
  }

  function removeFinishedCar(carId: number) {
    const index = finishedCars.indexOf(carId);
    if (index !== -1) {
      finishedCars.splice(index, 1);
    }
  }

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
      classNames: ['btn', 'btn_very_small'],
      textContent: 'Remove Car',
    });

    removeCarBtn.addEventListener('click', async () => {
      await removeCar(carId);

      const currPage = getCurrPage();

      await buildGaragePage(currPage);
    });

    const selectCarBtn = createElem({
      tagName: 'button',
      classNames: ['btn', 'btn_very_small'],
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
      classNames: ['btn', 'btn_very_small', 'drive__car'],
      textContent: 'D',
    }) as HTMLButtonElement;

    const carStopBtn = createElem({
      tagName: 'button',
      classNames: ['btn', 'btn_very_small', 'stop__car'],
      textContent: 'S',
      attributes: [['disabled', true]],
    }) as HTMLButtonElement;

    carControlContainer.append(carStartBtn, carStopBtn);

    const carImg = createElem({ tagName: 'div', classNames: ['car'] });

    carImg.dataset.carName = car.name;

    carImg.innerHTML = carSvg;
    carImg.children[0].setAttribute('fill', car.color);

    carControlContainerWithImg.append(carControlContainer, carImg);

    carContainer.append(carNameAndBtnsContainer, carControlContainerWithImg);

    carStartBtn.addEventListener('click', async () => {
      changeStateBtnWhileDriving(false);
      setStateMainPagesBtns(true);

      carStartBtn.disabled = true;

      addFinishedCar(car.id);

      const changedEngine = changeEngineStatePromise(
        baseUrl,
        ENGINE_PATH,
        carId,
        'started',
      );
      const totalTime = await getCarTravelData(changedEngine);

      carStopBtn.disabled = false;

      carImg.style.animationDuration = `${totalTime}ms`;
      carImg.classList.add('car-moving');
      const carDriveResp = await changeEngineStatePromise(
        baseUrl,
        ENGINE_PATH,
        carId,
        'drive',
      );
      if (!carDriveResp.ok) {
        carImg.style.animationPlayState = 'paused';
        await changeEngineStatePromise(baseUrl, ENGINE_PATH, carId, 'stopped');
      }
    });

    carStopBtn.addEventListener('click', async () => {
      carStopBtn.disabled = true;
      carImg.removeAttribute('style');
      carImg.classList.remove('car-moving');

      await changeEngineStatePromise(baseUrl, ENGINE_PATH, carId, 'stopped');
      removeFinishedCar(car.id);

      if (isAllCarsFinished()) {
        changeStateBtns(true);
        changeStateRaceStopBtns(false);
      }

      carStartBtn.disabled = false;
    });

    carsContainer.append(carContainer);
  });

  setUpdateToNewState(false);

  const internalGarageNumberOfCars = garageNumberOfCars;
  internalGarageNumberOfCars.textContent = ` (${garageTotalLength})`;
}

export default buildCars;
