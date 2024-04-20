import './footer.css';
import createElem from '../../../utils/create-elem';

function createFooter(): HTMLElement {
  const footer = createElem({ tagName: 'footer' });

  const rsLink = createElem({
    tagName: 'a',
    classNames: ['rs__logo'],
    attributes: [
      ['href', 'https://rs.school/courses/javascript-mentoring-program'],
    ],
  });

  const rsLogo = createElem({
    tagName: 'img',
    attributes: [
      ['src', './img/rs-logo.png'],
      ['alt', 'rs-logo'],
    ],
  });

  rsLink.append(rsLogo);

  const authorName = createElem({
    tagName: 'a',
    classNames: ['author__link'],
    textContent: 'Alexander',
    attributes: [['href', 'https://github.com/OxygeniumO2']],
  });

  const yearAppCreated = createElem({ tagName: 'div', textContent: '2024' });

  footer.append(rsLink, authorName, yearAppCreated);

  return footer;
}

export default createFooter;
