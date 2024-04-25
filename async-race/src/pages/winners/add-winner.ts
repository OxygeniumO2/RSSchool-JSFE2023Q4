import { WINNERS_PATH, baseUrl } from '../../utils/base-url';
import getWinnerResp from '../../utils/get-winner';
import HttpStatusCodes from '../../utils/http-resp-enum';
import Winner from './winners-interfaces';

interface WinnerUpdate {
  wins: number;
  time: number;
}

async function addOrUpdateWinnerToTable(car: Winner) {
  const checkWinner = await getWinnerResp(baseUrl, WINNERS_PATH, car.id);

  if (checkWinner.status === HttpStatusCodes.NOT_FOUND) {
    await fetch(`${baseUrl}${WINNERS_PATH}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(car),
    });
  }

  if (checkWinner.status === HttpStatusCodes.OK) {
    const winnerResp = await getWinnerResp(baseUrl, WINNERS_PATH, car.id);
    const winnerData: Winner = await winnerResp.json();

    const updatedWins = winnerData.wins + 1;
    const updatedTime = winnerData.time < car.time ? winnerData.time : car.time;

    const updatedWinnerData: WinnerUpdate = {
      wins: updatedWins,
      time: updatedTime,
    };

    await fetch(`${baseUrl}${WINNERS_PATH}/${car.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedWinnerData),
    });
  }
}

export default addOrUpdateWinnerToTable;
