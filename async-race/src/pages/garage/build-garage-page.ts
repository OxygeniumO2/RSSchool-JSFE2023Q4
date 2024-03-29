import baseUrl, { GARAGE_PATH } from '../../utils/base-url';
import createElem from '../../utils/create-elem';
import buildCars from './build-cars';
import GarageCars from './garage-interfaces';

const PAGE_NUMBER: number = 1;
const LIMIT_CARS_BY_PAGE = 7;

async function buildGaragePage(): Promise<void> {
  const garageTotalPageAndCarsContainer = createElem({
    tag: 'div',
    classesCss: ['garage__page__cars-container'],
  });
  const garageTitle = createElem({ tag: 'span', textContent: 'Garage' });
  const garageResponse: Response = await fetch(`${baseUrl}${GARAGE_PATH}`);
  const garageResponseByPageAndLimit: Response = await fetch(
    `${baseUrl}${GARAGE_PATH}?_page=${PAGE_NUMBER}&_limit=${LIMIT_CARS_BY_PAGE}`,
  );

  const garageTotal = await garageResponse.json();
  const garageTotalLength: number = garageTotal.length;
  const garageCarsOnOnePage: GarageCars[] =
    await garageResponseByPageAndLimit.json();

  const garageNumberOfCarsElem: HTMLElement = createElem({
    tag: 'span',
    textContent: ` (${garageTotalLength})`,
  });

  const garagePageText = createElem({
    tag: 'div',
    textContent: `Page #${PAGE_NUMBER}`,
  });

  const allCarsContainer: HTMLElement = createElem({ tag: 'div' });
  buildCars(
    garageCarsOnOnePage,
    allCarsContainer,
    garageNumberOfCarsElem,
    garageTotalLength,
  );

  garageTotalPageAndCarsContainer.append(
    garageTitle,
    garageNumberOfCarsElem,
    garagePageText,
    allCarsContainer,
  );

  const garage = document.querySelector('.garage') as HTMLElement;

  const garageChildren = Array.from(garage.children);
  garageChildren.forEach((children, index) => {
    if (children.classList.contains('garage__page__cars-container')) {
      const garageToDelete = garage.children[index];
      garage.removeChild(garageToDelete);
    }
  });
  garage.append(garageTotalPageAndCarsContainer);
}

export default buildGaragePage;
