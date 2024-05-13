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

enum PagePath {
  About = '/about',
  Login = '/login',
  Main = '/main',
}

type Routes = {
  '/': string;
  '/login': (websocket: WebSocket) => void;
  '/main': (websocket: WebSocket) => void;
  '/about': (websocket: WebSocket) => void;
};

function loginPageRouteHandler(websocket: WebSocket) {
  const loginContainer = createLoginPage(websocket);
  window.history.pushState({}, 'Login', PagePath.Login);
  renderPage(APP_CONTAINER, loginContainer);
}

async function mainPageRouteHandler(websocket: WebSocket) {
  const mainContainer = createMainPage(websocket);
  window.history.pushState({}, 'Main', PagePath.Main);
  renderPage(APP_CONTAINER, mainContainer);
}

function aboutPageRouteHandler(websocket: WebSocket) {
  const aboutContainer = createAboutPage(websocket);
  window.history.pushState({}, 'About', PagePath.About);
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
    path = PagePath.Login;
  }

  let websocket: WebSocket;

  const userFromSS = sessionStorage.getItem(SessionStorageKeys.login);

  path = userFromSS ? PagePath.Main : PagePath.Login;

  if (window.location.pathname === PagePath.About) {
    path = PagePath.About;
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
  PagePath,
};
