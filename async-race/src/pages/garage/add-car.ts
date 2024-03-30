import baseUrl, { GARAGE_PATH } from '../../utils/base-url';
import getCurrPage from '../../utils/getPageFromLs';
import buildGaragePage from './build-garage-page';

async function addCar(nameValue: string, colorValue: string): Promise<void> {
  const newCar = {
    name: nameValue,
    color: colorValue,
  };

  await fetch(`${baseUrl}${GARAGE_PATH}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newCar),
  });

  const currPage = getCurrPage();

  await buildGaragePage(currPage);
}

export default addCar;
