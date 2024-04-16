import './header.css';
import createElem from '../../../utils/create-elem';
// eslint-disable-next-line import/no-cycle
import createAboutBtn from '../../about-page/about-btn';
import SessionStorageKeys from '../../../utils/session-storage-keys';
import { UserLogoutClient } from '../../../web-socket/web-socket-interfaces';
import { loginPageRouteHandler } from '../../../router/router';
import createWebSocket from '../../../web-socket/web-socket';

function createHeader(websocket: WebSocket): HTMLElement {
  const header = createElem({ tagName: 'header' });

  const userName = sessionStorage.getItem(SessionStorageKeys.login);

  const currUserNameElem = createElem({
    tagName: 'div',
    textContent: `User: ${userName}`,
  });

  const appNameElem = createElem({ tagName: 'div', textContent: 'Fun Chat' });
  const logoutBtn = createElem({ tagName: 'button', textContent: 'Logout' });

  logoutBtn.addEventListener('click', () => {
    const currUserName = sessionStorage.getItem(
      SessionStorageKeys.login,
    ) as string;

    const currUserPassword = sessionStorage.getItem(
      SessionStorageKeys.password,
    ) as string;

    const logoutUserData: UserLogoutClient = {
      id: 'logout',
      type: 'USER_LOGOUT',
      payload: {
        user: {
          login: currUserName,
          password: currUserPassword,
        },
      },
    };

    websocket.send(JSON.stringify(logoutUserData));

    sessionStorage.clear();
    websocket.close();

    const newWebSocket = createWebSocket();
    loginPageRouteHandler(newWebSocket);
  });

  const aboutPageBtn = createAboutBtn(websocket);

  header.append(currUserNameElem, appNameElem, aboutPageBtn, logoutBtn);

  return header;
}

export default createHeader;
