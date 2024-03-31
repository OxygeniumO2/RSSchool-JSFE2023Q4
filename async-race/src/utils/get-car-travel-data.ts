import { CarTravelData } from '../pages/garage/garage-interfaces';

async function getCarTravelData(
  engineResp: Promise<Response>,
): Promise<number> {
  const response = await engineResp;
  const engineData: CarTravelData = await response.json();
  const totalTime = Math.ceil(engineData.distance / engineData.velocity);

  return totalTime;
}

export default getCarTravelData;
