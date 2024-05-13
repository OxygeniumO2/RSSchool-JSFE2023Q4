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

enum Routes {
  ROOT = '/',
  LOGIN = '/login',
  MAIN = '/main',
  ABOUT = '/about',
}

function loginPageRouteHandler(websocket: WebSocket) {
  const loginContainer = createLoginPage(websocket);
  window.history.pushState({}, 'Login', Routes.LOGIN);
  renderPage(APP_CONTAINER, loginContainer);
}

async function mainPageRouteHandler(websocket: WebSocket) {
  const mainContainer = createMainPage(websocket);
  window.history.pushState({}, 'Main', Routes.MAIN);
  renderPage(APP_CONTAINER, mainContainer);
}

function aboutPageRouteHandler(websocket: WebSocket) {
  const aboutContainer = createAboutPage(websocket);
  window.history.pushState({}, 'About', Routes.ABOUT);
  renderPage(APP_CONTAINER, aboutContainer);
}

const routesHandlersMap: Partial<
  Record<Routes, (websocket: WebSocket) => void>
> = {
  [Routes.LOGIN]: loginPageRouteHandler,
  [Routes.MAIN]: mainPageRouteHandler,
  [Routes.ABOUT]: aboutPageRouteHandler,
};

function router() {
  let path = window.location.pathname as Routes;

  if (path === Routes.ROOT) {
    path = Routes.LOGIN;
  }

  const userFromSS = sessionStorage.getItem(SessionStorageKeys.login);

  path = userFromSS ? Routes.MAIN : Routes.LOGIN;

  if (window.location.pathname === Routes.ABOUT) {
    path = Routes.ABOUT;
  }

  const routeHandler = routesHandlersMap[path];

  routeHandler && routeHandler(createWebSocket());
}

export {
  router,
  aboutPageRouteHandler,
  loginPageRouteHandler,
  mainPageRouteHandler,
  Routes,
};
