import './about-page.css';
import createElem from '../../utils/create-elem';

function createAboutPage() {
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
    textContent: 'Author - OxygeniumO2',
    attributes: [['href', 'https://github.com/OxygeniumO2']],
  });

  const returnToPrevPageBtn = createElem({
    tagName: 'button',
    classNames: ['about__page__btn'],
    textContent: 'Back',
  });

  aboutPageContainer.append(
    aboutPageTitle,
    aboutPageDesc,
    aboutPageAuthorLink,
    returnToPrevPageBtn,
  );

  console.log(aboutPageContainer);

  return aboutPageContainer;
}

export default createAboutPage;
