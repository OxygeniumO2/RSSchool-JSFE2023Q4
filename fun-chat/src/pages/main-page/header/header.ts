import './header.css';
import createElem from '../../../utils/create-elem';

function createHeader(): HTMLElement {
  const header = createElem({ tagName: 'header' });

  const currUserNameElem = createElem({
    tagName: 'div',
    textContent: 'User: ',
  });
  const appNameElem = createElem({ tagName: 'div', textContent: 'Fun Chat' });
  const infoBtn = createElem({ tagName: 'button', textContent: 'Info' });
  const logoutBtn = createElem({ tagName: 'button', textContent: 'Logout' });

  header.append(currUserNameElem, appNameElem, infoBtn, logoutBtn);

  return header;
}

export default createHeader;
