import './garage.css';
import { APP_CONTAINER } from '../../app-container/app-container';
import createElem from '../../utils/create-elem';
import addCar from './add-car';
import generateCars from './generate-cars';
import updateCar from './update-car';
import changeGaragePage from './change-garage-page';
import getCurrPage from '../../utils/getPageFromLs';
import buildGaragePage from './build-garage-page';

const DEFAULT_LIMIT: number = 7;

export function buildGarageControls(): void {
  const garage = createElem({ tagName: 'div', classNames: ['garage'] });

  const addCarsContainer = createElem({
    tagName: 'form',
    classNames: ['add__cars-container'],
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
    classNames: ['update__cars-container'],
  });

  const inputCarUpdateName = createElem({
    tagName: 'input',
    attributes: [
      ['type', 'text'],
      ['required', true],
      ['disabled', true],
    ],
  }) as HTMLInputElement;

  const inputColorUpdateCar = createElem({
    tagName: 'input',
    attributes: [['type', 'color']],
  }) as HTMLInputElement;

  const updateCarBtn = createElem({
    tagName: 'button',
    textContent: 'Update Car',
    attributes: [
      ['type', 'text'],
      ['required', true],
      ['disabled', true],
    ],
  });

  updateCarsContainer.append(
    inputCarUpdateName,
    inputColorUpdateCar,
    updateCarBtn,
  );

  const raceControlContainer = createElem({
    tagName: 'div',
    classNames: ['race__cars-container'],
  });

  const raceBtn = createElem({
    tagName: 'button',
    classNames: ['btn', 'btn_color_1'],
    textContent: 'Race',
  });

  const resetRaceBtn = createElem({
    tagName: 'button',
    classNames: ['btn', 'btn_color_1'],
    textContent: 'Reset Race',
  });

  const generateCarsBtn = createElem({
    tagName: 'button',
    classNames: ['btn', 'btn_color_1'],
    textContent: 'Generate Cars',
  });

  generateCarsBtn.addEventListener('click', generateCars);

  raceControlContainer.append(raceBtn, resetRaceBtn, generateCarsBtn);

  const changePageContainer = createElem({
    tagName: 'div',
    classNames: ['change__page-container'],
  });
  const prevPageBtn = createElem({
    tagName: 'button',
    classNames: ['btn', 'btn_color_2'],
    textContent: 'Prev Page',
  });
  const nextPageBtn = createElem({
    tagName: 'button',
    classNames: ['btn', 'btn_color_2'],
    textContent: 'Next Page',
  });

  prevPageBtn.addEventListener(
    'click',
    function handleClickPrevPage(this: HTMLElement) {
      changeGaragePage.call(this, prevPageBtn, DEFAULT_LIMIT);
    },
  );

  nextPageBtn.addEventListener(
    'click',
    function handleClickNextPage(this: HTMLElement) {
      changeGaragePage.call(this, nextPageBtn, DEFAULT_LIMIT);
    },
  );

  changePageContainer.append(prevPageBtn, nextPageBtn);

  garage.append(
    addCarsContainer,
    updateCarsContainer,
    raceControlContainer,
    changePageContainer,
  );

  addCarsContainer.addEventListener('submit', async (event) => {
    event.preventDefault();
    await addCar(inputCarAddName.value, inputColorAddCar.value);
    const currPage = getCurrPage();

    await buildGaragePage(currPage);
  });

  updateCarsContainer.addEventListener('submit', async (event) => {
    event.preventDefault();
    const currCarId = localStorage.getItem('carIdOxy') as string;
    const currCarIdParsed = parseInt(currCarId, 10);

    await updateCar(
      inputCarUpdateName.value,
      inputColorUpdateCar.value,
      currCarIdParsed,
    );

    const currPage = getCurrPage();

    await buildGaragePage(currPage);
  });

  APP_CONTAINER.append(garage);
}

export default buildGarageControls;
