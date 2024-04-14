import './about-page.css';
import createElem from '../../utils/create-elem';
// eslint-disable-next-line import/no-cycle
import { loginPageRouteHandler } from '../../router/router';

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
    loginPageRouteHandler(websocket);
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
