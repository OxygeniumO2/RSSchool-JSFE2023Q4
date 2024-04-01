import { GARAGE_PATH, baseUrl } from '../../utils/base-url';
import carSvg from '../../utils/car-svg-content';
import createElem from '../../utils/create-elem';
import getCar from '../../utils/get-car';
import { GarageCar } from '../garage/garage-interfaces';
import Winner from './winners-interfaces';

async function buildWinners(
  totalWinners: Winner[],
  winnersContainer: HTMLElement,
  winnersNumber: HTMLElement,
  winnersTotalLength: number,
): Promise<void> {
  totalWinners.forEach(async (winner, index) => {
    const winnerContainer = createElem({
      tagName: 'div',
      classNames: ['winners__table'],
    });

    const carNumber = createElem({
      tagName: 'div',
      textContent: `${index + 1}`,
    });

    const currCarWinner: GarageCar = await getCar(
      baseUrl,
      GARAGE_PATH,
      winner.id,
    );

    const carImgContainer = createElem({
      tagName: 'div',
      classNames: ['winners__car__img-container'],
    });

    carImgContainer.innerHTML = carSvg;
    carImgContainer.children[0].setAttribute('fill', currCarWinner.color);

    const carName = createElem({
      tagName: 'div',
      textContent: currCarWinner.name,
    });

    const carWins = createElem({
      tagName: 'div',
      textContent: winner.wins.toString(),
    });

    const bestTime = createElem({
      tagName: 'div',
      textContent: winner.time.toString(),
    });

    winnerContainer.append(
      carNumber,
      carImgContainer,
      carName,
      carWins,
      bestTime,
    );

    winnersContainer.append(winnerContainer);
  });

  const internalTotalNumberWinners = winnersNumber;
  internalTotalNumberWinners.textContent = ` (${winnersTotalLength})`;
}

export default buildWinners;
