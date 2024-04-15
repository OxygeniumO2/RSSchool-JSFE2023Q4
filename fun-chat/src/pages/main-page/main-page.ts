import './main-page.css';
import createElem from '../../utils/create-elem';
import createFooter from './footer/footer';
import createHeader from './header/header';
import createMain from './main/main';

function createMainPage(): HTMLElement {
  const mainPageContainer = createElem({
    tagName: 'div',
    classNames: ['main__page-container'],
  });

  const header = createHeader();

  const main = createMain();

  const footer = createFooter();

  mainPageContainer.append(header, main, footer);

  return mainPageContainer;
}

export default createMainPage;
