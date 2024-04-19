import './about-page.css';
import createElem from '../../utils/create-elem';
// eslint-disable-next-line import/no-cycle
import {
  loginPageRouteHandler,
  mainPageRouteHandler,
} from '../../router/router';
import SessionStorageKeys from '../../utils/session-storage-keys';
import sendRespToGetOnlineUsers from '../main-page/main/user-section/send-resp-get-online-users';
import sendRespToGetOfflineUsers from '../main-page/main/user-section/send-resp-get-offline-users';

function createAboutPage(websocket: WebSocket): HTMLElement {
  const aboutPageContainer = createElem({
    tagName: 'div',
    classNames: ['about__page'],
  });

  const aboutPageTitle = createElem({ tagName: 'h3', textContent: 'Fun chat' });

  const aboutPageDesc = createElem({
    tagName: 'p',
    textContent: 'App where you can communicate with other people',
  });

  const aboutPageAuthorLink = createElem({
    tagName: 'a',
    textContent: 'Author - Alexander',
    attributes: [['href', 'https://github.com/OxygeniumO2']],
  });

  const returnToPrevPageBtn = createElem({
    tagName: 'button',
    classNames: ['about__page__btn'],
    textContent: 'Back',
  });

  returnToPrevPageBtn.addEventListener('click', () => {
    const userFromSS = sessionStorage.getItem(SessionStorageKeys.login);

    if (userFromSS) {
      sendRespToGetOnlineUsers(websocket);
      sendRespToGetOfflineUsers(websocket);
      mainPageRouteHandler(websocket);
    } else {
      loginPageRouteHandler(websocket);
    }
  });

  aboutPageContainer.append(
    aboutPageTitle,
    aboutPageDesc,
    aboutPageAuthorLink,
    returnToPrevPageBtn,
  );

  return aboutPageContainer;
}

export default createAboutPage;
