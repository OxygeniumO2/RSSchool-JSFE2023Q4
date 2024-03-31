// import { CarTravelData } from './garage-interfaces';

async function changeEngineStatePromise(
  url: string,
  path: string,
  carId: number,
  status: string,
): Promise<Response> {
  const engineResp = await fetch(
    `${url}${path}/?id=${carId}&status=${status}`,
    {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status }),
    },
  );

  return engineResp;
}

export default changeEngineStatePromise;
