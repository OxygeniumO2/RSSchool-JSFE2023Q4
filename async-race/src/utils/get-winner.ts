async function getWinnerResp(url: string, path: string, carId: number) {
  return fetch(`${url}${path}/${carId}`);
}

export default getWinnerResp;
