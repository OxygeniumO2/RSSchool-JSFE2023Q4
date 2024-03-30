import { APP_CONTAINER } from '../../app-container/app-container';
import createElem from '../../utils/create-elem';

function buildChangePageContainer(): void {
  const containerPages = createElem({
    tagName: 'div',
    classNames: ['pages__btns__switch-container'],
  });
  const toGaragePageBtn = createElem({
    tagName: 'button',
    classNames: ['btn'],
    textContent: 'To Garage',
  });
  const toWinnersPageBtn = createElem({
    tagName: 'button',
    classNames: ['btn'],
    textContent: 'To Winners',
  });
  containerPages.append(toGaragePageBtn, toWinnersPageBtn);
  APP_CONTAINER.append(containerPages);
}

export default buildChangePageContainer;
