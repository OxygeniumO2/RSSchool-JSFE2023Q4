import { APP_CONTAINER } from '../../app-container/app-container';
import createElem from '../../utils/create-elem';
import togglePage from './toggle-page';

function buildChangePageContainer(): void {
  const containerPages = createElem({
    tagName: 'div',
    classNames: ['pages__btns__switch-container'],
  });

  const toGaragePageBtn = createElem({
    tagName: 'button',
    classNames: ['btn', 'to__garage-btn'],
    textContent: 'To Garage',
  });

  toGaragePageBtn.addEventListener(
    'click',
    function handleClickToGarage(this: HTMLElement) {
      togglePage.call(this, toGaragePageBtn);
    },
  );

  const toWinnersPageBtn = createElem({
    tagName: 'button',
    classNames: ['btn', 'to__winners-btn'],
    textContent: 'To Winners',
  });

  toWinnersPageBtn.addEventListener(
    'click',
    function handleClickToWinners(this: HTMLElement) {
      togglePage.call(this, toWinnersPageBtn);
    },
  );

  containerPages.append(toGaragePageBtn, toWinnersPageBtn);
  APP_CONTAINER.append(containerPages);
}

export default buildChangePageContainer;
