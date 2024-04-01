import { GarageCar } from '../pages/garage/garage-interfaces';
import Winner from '../pages/winners/winners-interfaces';

async function garageAllCarsPromise(
  url: string,
  path: string,
): Promise<GarageCar[]> {
  const garageResponse = await fetch(`${url}${path}`);
  const garageTotal: GarageCar[] = await garageResponse.json();
  return garageTotal;
}

async function garageCarsByPageAndLimitPromise(
  url: string,
  path: string,
  pageNumber: number,
  limit: number,
): Promise<GarageCar[]> {
  const garageResponseByPageAndLimit = await fetch(
    `${url}${path}?_page=${pageNumber}&_limit=${limit}`,
  );
  const garageCarsOnOnePage = await garageResponseByPageAndLimit.json();
  return garageCarsOnOnePage;
}

async function winnersByPageAndLimitPromise(
  url: string,
  path: string,
  pageNumber: number,
  limit: number,
  order: string = 'ASC',
  sort: string = '',
): Promise<Winner[]> {
  let winnersResponseByPageAndLimit;

  if (order) {
    winnersResponseByPageAndLimit = await fetch(
      `${url}${path}?_page=${pageNumber}&_limit=${limit}&_order=${order}`,
    );
  }

  if (sort) {
    winnersResponseByPageAndLimit = await fetch(
      `${url}${path}?_page=${pageNumber}&_limit=${limit}&_sort=${sort}`,
    );
  }

  if (sort && order) {
    winnersResponseByPageAndLimit = await fetch(
      `${url}${path}?_page=${pageNumber}&_limit=${limit}&_order=${order}&_sort=${sort}`,
    );
  }
  const winnersCarsOnOnePage = await winnersResponseByPageAndLimit!.json();
  return winnersCarsOnOnePage;
}

async function allWinnersPromise(
  url: string,
  path: string,
  order: string = 'ASC',
  sort: string = '',
): Promise<Winner[]> {
  let winnerResponse;

  if (sort) {
    winnerResponse = await fetch(`${url}${path}?_order=${order}&_sort=${sort}`);
  } else {
    winnerResponse = await fetch(`${url}${path}?_order=${order}`);
  }

  const winnerTotal: Winner[] = await winnerResponse.json();
  return winnerTotal;
}

export {
  garageAllCarsPromise,
  garageCarsByPageAndLimitPromise,
  allWinnersPromise,
  winnersByPageAndLimitPromise,
};
