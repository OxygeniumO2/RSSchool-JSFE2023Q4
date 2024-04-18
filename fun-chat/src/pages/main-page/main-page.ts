import './main-page.css';
import createElem from '../../utils/create-elem';
import createFooter from './footer/footer';
// eslint-disable-next-line import/no-cycle
import createHeader from './header/header';
import createMain from './main/main';

async function createMainPage(websocket: WebSocket): Promise<HTMLElement> {
  const mainPageContainer = createElem({
    tagName: 'div',
    classNames: ['main__page-container'],
  });

  const header = createHeader(websocket);

  const main = await createMain(websocket);

  const footer = createFooter();

  mainPageContainer.append(header, main, footer);

  return mainPageContainer;
}

export default createMainPage;
