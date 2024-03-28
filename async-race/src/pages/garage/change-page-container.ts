import { APP_CONTAINER } from '../../app-container/app-container';
import createElem from '../../utils/create-elem';

function buildChangePageContainer() {
  const containerPages = createElem({
    tag: 'div',
    classesCss: ['pages__btns__switch-container'],
  });
  const toGaragePageBtn = createElem({
    tag: 'button',
    classesCss: ['btn'],
    textContent: 'To Garage',
  });
  const toWinnersPageBtn = createElem({
    tag: 'button',
    classesCss: ['btn'],
    textContent: 'To Winners',
  });
  containerPages.append(toGaragePageBtn, toWinnersPageBtn);
  APP_CONTAINER.append(containerPages);
}

export default buildChangePageContainer;
