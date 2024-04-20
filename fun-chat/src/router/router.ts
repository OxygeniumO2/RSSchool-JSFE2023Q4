import APP_CONTAINER from '../app-container/app-container';
// eslint-disable-next-line import/no-cycle
import { renderPage } from '../app-container/init-app';
// eslint-disable-next-line import/no-cycle
import createAboutPage from '../pages/about-page/about-page';
// eslint-disable-next-line import/no-cycle
import createLoginPage from '../pages/login-page/login-page';
// eslint-disable-next-line import/no-cycle
import createMainPage from '../pages/main-page/main-page';
import SessionStorageKeys from '../utils/session-storage-keys';
// eslint-disable-next-line import/no-cycle
import createWebSocket from '../web-socket/web-socket';

type Routes = {
  '/': string;
  '/login': (websocket: WebSocket) => void;
  '/main': (websocket: WebSocket) => void;
  '/about': (websocket: WebSocket) => void;
};

function loginPageRouteHandler(websocket: WebSocket) {
  const loginContainer = createLoginPage(websocket);
  window.history.pushState({}, 'Login', '/login');
  renderPage(APP_CONTAINER, loginContainer);
}

async function mainPageRouteHandler(websocket: WebSocket) {
  const mainContainer = createMainPage(websocket);
  window.history.pushState({}, 'Main', '/main');
  renderPage(APP_CONTAINER, mainContainer);
}

function aboutPageRouteHandler(websocket: WebSocket) {
  const aboutContainer = createAboutPage(websocket);
  window.history.pushState({}, 'About', '/about');
  renderPage(APP_CONTAINER, aboutContainer);
}

const ROUTES: Routes = {
  '/': '/',
  '/login': loginPageRouteHandler,
  '/main': mainPageRouteHandler,
  '/about': aboutPageRouteHandler,
};

function router() {
  let path = window.location.pathname as keyof Routes;

  if (path === '/') {
    path = '/login';
  }

  let websocket: WebSocket;

  const userFromSS = sessionStorage.getItem(SessionStorageKeys.login);

  path = userFromSS ? '/main' : '/login';

  if (window.location.pathname === '/about') {
    path = '/about';
  }

  const routeHandler = ROUTES[path];

  if (routeHandler) {
    websocket = createWebSocket();
    routeHandler(websocket);
  }
}

export {
  router,
  aboutPageRouteHandler,
  loginPageRouteHandler,
  mainPageRouteHandler,
};
