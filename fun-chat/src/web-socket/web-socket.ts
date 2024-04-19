import APP_CONTAINER from '../app-container/app-container';
import createReconnectModal from '../modal-lost-connect/modal';
import SessionStorageKeys from '../utils/session-storage-keys';
import { UserAuthClient, UserLogoutClient } from './web-socket-interfaces';

let isReconnectModalOpen = false;

function createWebSocket(): WebSocket {
  const socket = new WebSocket('ws://localhost:4000');

  const appContainerLastChild = APP_CONTAINER.lastChild as HTMLElement;

  socket.addEventListener('open', () => {
    if (isReconnectModalOpen) {
      APP_CONTAINER.removeChild(appContainerLastChild);
    } else {
      const userFromSS = sessionStorage.getItem(SessionStorageKeys.login);
      const userPassFromSS = sessionStorage.getItem(
        SessionStorageKeys.password,
      );

      if (userFromSS && userPassFromSS) {
        const randomId = crypto.randomUUID();
        const userLogin = userFromSS;
        const userPassword = userPassFromSS;

        const userData: UserAuthClient = {
          id: randomId,
          type: 'USER_LOGIN',
          payload: {
            user: {
              login: userLogin,
              password: userPassword,
            },
          },
        };

        socket.send(JSON.stringify(userData));
      }
    }
  });

  socket.addEventListener('close', (event) => {
    if (!event.wasClean) {
      setTimeout(() => {
        createWebSocket();
      }, 1600);
    }
  });

  socket.addEventListener('error', () => {
    if (!isReconnectModalOpen) {
      const modalReconnect = createReconnectModal();
      APP_CONTAINER.append(modalReconnect);
      isReconnectModalOpen = true;
    }
  });

  window.addEventListener('beforeunload', () => {
    const userFromSS = sessionStorage.getItem(SessionStorageKeys.login);
    const userPassFromSS = sessionStorage.getItem(SessionStorageKeys.password);

    if (userFromSS && userPassFromSS) {
      const logoutUserData: UserLogoutClient = {
        id: 'logout',
        type: 'USER_LOGOUT',
        payload: {
          user: {
            login: userFromSS,
            password: userPassFromSS,
          },
        },
      };

      socket.send(JSON.stringify(logoutUserData));
    }
  });

  return socket;
}

export default createWebSocket;
