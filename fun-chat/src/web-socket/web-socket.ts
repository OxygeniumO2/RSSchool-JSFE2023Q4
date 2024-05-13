import APP_CONTAINER from '../app-container/app-container';
import createReconnectModal from '../modal-lost-connect/modal';
// eslint-disable-next-line import/no-cycle
import {
  PagePath,
  aboutPageRouteHandler,
  loginPageRouteHandler,
  mainPageRouteHandler,
} from '../router/router';
import SessionStorageKeys from '../utils/session-storage-keys';
import IdRequest from '../utils/websocket-custom-id-request';
import WebSocketMessageTypes from '../utils/websocket-msg-types';
import { UserAuthClient, UserLogoutClient } from './web-socket-interfaces';

let isReconnectModalOpen = false;
let reconnectTimeout: number | undefined;

function createWebSocket(): WebSocket {
  const socket = new WebSocket('ws://localhost:4000');

  const appContainerLastChild = APP_CONTAINER.lastChild as HTMLElement;

  socket.addEventListener('open', () => {
    if (isReconnectModalOpen) {
      APP_CONTAINER.removeChild(appContainerLastChild);
      const userFromSS = sessionStorage.getItem(SessionStorageKeys.login);
      const userPassFromSS = sessionStorage.getItem(
        SessionStorageKeys.password,
      );

      if (userFromSS && userPassFromSS) {
        isReconnectModalOpen = false;

        clearTimeout(reconnectTimeout);

        if (window.location.pathname === PagePath.About) {
          aboutPageRouteHandler(socket);
        } else {
          mainPageRouteHandler(socket);
        }
      } else {
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        window.location.pathname === PagePath.About
          ? aboutPageRouteHandler(socket)
          : loginPageRouteHandler(socket);

        clearTimeout(reconnectTimeout);
      }
    }

    const userFromSS = sessionStorage.getItem(SessionStorageKeys.login);
    const userPassFromSS = sessionStorage.getItem(SessionStorageKeys.password);

    if (userFromSS && userPassFromSS) {
      const randomId = crypto.randomUUID();
      const userLogin = userFromSS;
      const userPassword = userPassFromSS;

      const userData: UserAuthClient = {
        id: randomId,
        type: WebSocketMessageTypes.UserLogin,
        payload: {
          user: {
            login: userLogin,
            password: userPassword,
          },
        },
      };
      clearTimeout(reconnectTimeout);
      socket.send(JSON.stringify(userData));
    }
    clearTimeout(reconnectTimeout);
  });

  socket.addEventListener('close', (event) => {
    if (!event.wasClean) {
      if (!isReconnectModalOpen) {
        const modalReconnect = createReconnectModal();
        APP_CONTAINER.append(modalReconnect);
        isReconnectModalOpen = true;
      }
      reconnectTimeout = window.setTimeout(() => {
        createWebSocket();
      }, 2000);
    }
  });

  window.addEventListener('beforeunload', () => {
    const userFromSS = sessionStorage.getItem(SessionStorageKeys.login);
    const userPassFromSS = sessionStorage.getItem(SessionStorageKeys.password);

    if (userFromSS && userPassFromSS) {
      const logoutUserData: UserLogoutClient = {
        id: IdRequest.Logout,
        type: WebSocketMessageTypes.UserLogout,
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
