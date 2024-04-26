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

async function getWinners(
  url: string,
  path: string,
  order: string = Order.Asc,
  sort: string = '',
  pageNumber?: number,
  limit?: number,
): Promise<Winner[]> {
  const pageNumberQuery = pageNumber ? `?_page=${pageNumber}` : '';
  const limitQuery = limit ? `&_limit=${limit}` : '';
  const sortQuery = sort ? `&_sort=${sort}` : '';
  const firstSeparator = pageNumberQuery ? '&' : '?';
  const orderQuery = order ? `${firstSeparator}_order=${order}` : '';

  const requestUrl = `${url}${path}${pageNumberQuery}${limitQuery}${orderQuery}${sortQuery}`;
  const winnersResp = await fetch(requestUrl);
  const winners = await winnersResp.json();

  return winners;
}

export { getGarageCars, getWinners, Order };
