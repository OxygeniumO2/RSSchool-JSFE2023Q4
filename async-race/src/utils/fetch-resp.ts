import { GarageCar } from '../pages/garage/garage-interfaces';
import Winner from '../pages/winners/winners-interfaces';

enum Order {
  Asc = 'ASC',
  Desc = 'DESC',
}

async function getGarageCars(
  url: string,
  path: string,
  pageNumber?: number,
  limit?: number,
): Promise<GarageCar[]> {
  const pageNumberQuery = pageNumber ? `?_page=${pageNumber}` : '';
  const limitQuery = limit ? `&_limit=${limit}` : '';
  const requestUrl = `${url}${path}${pageNumberQuery}${limitQuery}`;

  const garageCars = await fetch(requestUrl);
  return garageCars.json();
}

async function winnersByPageAndLimitPromise(
  url: string,
  path: string,
  pageNumber: number,
  limit: number,
  order: string = Order.Asc,
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
  order: string = Order.Asc,
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
  getGarageCars,
  allWinnersPromise,
  winnersByPageAndLimitPromise,
  Order,
};
