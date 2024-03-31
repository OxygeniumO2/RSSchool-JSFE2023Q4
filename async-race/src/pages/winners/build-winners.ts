import { GARAGE_PATH, baseUrl } from '../../utils/base-url';
import createElem from '../../utils/create-elem';
import getCar from '../../utils/get-car';
import GarageCar from '../garage/garage-interfaces';
import buildWinnersControls from './build-winners-controls';
import Winner from './winners-interfaces';

async function buildWinners(totalWinners: Winner[]): Promise<HTMLElement> {
  const winnersElemsContainer = buildWinnersControls();

  if (totalWinners) {
    totalWinners.forEach(async (item, index) => {
      const carNumber = createElem({
        tagName: 'div',
        textContent: `${index + 1}`,
      });

      const currCarWinner: GarageCar = await getCar(
        baseUrl,
        GARAGE_PATH,
        item.id,
      );

      const carColor = createElem({
        tagName: 'div',
        textContent: currCarWinner.color,
      });

      const carName = createElem({
        tagName: 'div',
        textContent: currCarWinner.name,
      });

      const carWins = createElem({
        tagName: 'div',
        textContent: item.wins.toString(),
      });

      const bestTime = createElem({
        tagName: 'div',
        textContent: item.time.toString(),
      });

      winnersElemsContainer.append(
        carNumber,
        carColor,
        carName,
        carWins,
        bestTime,
      );
    });
  }
  return winnersElemsContainer;
}

export default buildWinners;
