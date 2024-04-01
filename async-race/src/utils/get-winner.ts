async function getWinnerResp(url: string, path: string, carId: number) {
  const currCarByIdResponse = await fetch(`${url}${path}/${carId}`);
  return currCarByIdResponse;
}

export default getWinnerResp;
