import { ENGINE_PATH, GARAGE_PATH, baseUrl } from '../../utils/base-url';
import changeStateBtns from '../../utils/change-state-btns';
import setStateMainPagesBtns from '../../utils/change-state-main-pages-btns';
import { createCarWinner } from '../../utils/create-car-winner';
import { garageCarsByPageAndLimitPromise } from '../../utils/fetch-resp';
import getCarTravelData from '../../utils/get-car-travel-data';
import getCurrPage from '../../utils/get-page-from-ls';
import removeActiveStateFromCars from '../../utils/remove-active-state-from-cars';
import { MODAL_WINNER } from '../winner-modal/winner-modal';
import addOrUpdateWinnerToTable from '../winners/add-winner';
import buildWinnersPage from '../winners/build-winners-page';
import Winner from '../winners/winners-interfaces';
import changeEngineStatePromise from './engine-state';

async function startRace() {
  const currPage = getCurrPage();

  const currCarsOnPage = await garageCarsByPageAndLimitPromise(
    baseUrl,
    GARAGE_PATH,
    currPage,
    7,
  );

  changeStateBtns(false);

  removeActiveStateFromCars();

  let finishedCarsCount = 0;

  const racePromises = currCarsOnPage.map(async (car) => {
    const carId = car.id;
    const changedEngine = changeEngineStatePromise(
      baseUrl,
      ENGINE_PATH,
      carId,
      'started',
    );
    const totalTime = await getCarTravelData(changedEngine);
    return { totalTime, carId };
  });

  Promise.allSettled(racePromises).then(async (results) => {
    const allCars = document.querySelectorAll('.car');
    let isWinner = true;

    await Promise.all(
      results.map(async (result, index) => {
        if (result.status === 'fulfilled') {
          const { totalTime } = result.value;
          const currCar = allCars[index] as HTMLElement;
          currCar.style.animationDuration = `${totalTime}ms`;
          currCar.classList.add('car-moving');
          const carDriveResp = await changeEngineStatePromise(
            baseUrl,
            ENGINE_PATH,
            result.value.carId,
            'drive',
          );

          if (!carDriveResp.ok) {
            currCar.style.animationPlayState = 'paused';
            finishedCarsCount -= 1;
          }
          if (carDriveResp.status === 200 && isWinner) {
            isWinner = false;
            MODAL_WINNER.classList.add('_active');

            const totalTimeInSec = totalTime / 1000;
            const totalTimeInSecToFixed = Number(totalTimeInSec.toFixed(2));
            MODAL_WINNER.textContent = `${currCar.dataset.carName} went first in ${totalTimeInSecToFixed} sec`;
            const wins = 1;

            const carWinner: Winner = createCarWinner(
              result.value.carId,
              wins,
              totalTimeInSecToFixed,
            );
            await addOrUpdateWinnerToTable(carWinner);
            await buildWinnersPage();

            const winnersContainer = document.querySelector('.winners');
            winnersContainer?.classList.add('_hidden');

            setStateMainPagesBtns(true);
          }
          finishedCarsCount += 1;
        }
      }),
    );

    if (finishedCarsCount === 0) {
      MODAL_WINNER.classList.add('_active');
      MODAL_WINNER.textContent = `No one gets to the finish`;
      setStateMainPagesBtns(true);
    }

    const resetRaceBtn = document.querySelector(
      '.reset__race-btn',
    ) as HTMLButtonElement;
    resetRaceBtn.disabled = false;
  });
}

export default startRace;
