import { GARAGE_PATH, baseUrl } from '../../utils/base-url';
import createElem from '../../utils/create-elem';
import { getGarageCars } from '../../utils/fetch-resp';
import removeElementsByClass from '../../utils/remove-elem-by-class';
// eslint-disable-next-line import/no-cycle
import buildCars from './build-cars';
import { GarageCar } from './garage-interfaces';

const PAGE_NUMBER_DEFAULT: number = 1;
const LIMIT_CARS_BY_PAGE = 7;

async function buildGaragePage(
  pageNumber: number = PAGE_NUMBER_DEFAULT,
  limit: number = LIMIT_CARS_BY_PAGE,
): Promise<void> {
  const garageTotalPageAndCarsContainer = createElem({
    tagName: 'div',
    classNames: ['garage__page__cars-container'],
  });
  const garageTitle = createElem({ tagName: 'span', textContent: 'Garage' });

  localStorage.setItem('garagePageOxy', pageNumber.toString());

  const garageTotal: GarageCar[] = await getGarageCars(baseUrl, GARAGE_PATH);
  const garageTotalLength: number = garageTotal.length;

  const garageCarsOnOnePage: GarageCar[] = await getGarageCars(
    baseUrl,
    GARAGE_PATH,
    pageNumber,
    limit,
  );

  const garageNumberOfCarsElem: HTMLElement = createElem({
    tagName: 'span',
    textContent: ` (${garageTotalLength})`,
  });

  const garagePageText = createElem({
    tagName: 'div',
    classNames: ['garage__page'],
    textContent: `Page #${pageNumber}`,
  });

  const allCarsContainer: HTMLElement = createElem({ tagName: 'div' });
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

  removeElementsByClass(garage, 'garage__page__cars-container');

  garage.append(garageTotalPageAndCarsContainer);
}

export default buildGaragePage;
