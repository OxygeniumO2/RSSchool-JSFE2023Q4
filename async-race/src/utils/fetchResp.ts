import GarageCar from '../pages/garage/garage-interfaces';

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

export { garageAllCarsPromise, garageRespByPageAndLimitPromise };
