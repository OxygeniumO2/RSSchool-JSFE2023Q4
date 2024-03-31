import GarageCar from '../pages/garage/garage-interfaces';
import Winner from '../pages/winners/winners-interfaces';

async function garageAllCarsPromise(
  url: string,
  path: string,
): Promise<GarageCar[]> {
  const garageResponse = await fetch(`${url}${path}`);
  const garageTotal: GarageCar[] = await garageResponse.json();
  return garageTotal;
}

async function garageRespByPageAndLimitPromise(
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

async function allWinnersPromise(url: string, path: string): Promise<Winner[]> {
  const winnerResponse = await fetch(`${url}${path}`);
  const winnerTotal: Winner[] = await winnerResponse.json();
  return winnerTotal;
}

export {
  garageAllCarsPromise,
  garageRespByPageAndLimitPromise,
  allWinnersPromise,
};
