import APP_CONTAINER from '../app-container/app-container';
// eslint-disable-next-line import/no-cycle
import { renderPage } from '../app-container/init-app';
// eslint-disable-next-line import/no-cycle
import createAboutPage from '../pages/about-page/about-page';
// eslint-disable-next-line import/no-cycle
import createLoginPage from '../pages/login-page/login-page';
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

function mainPageRouteHandler() {
  console.log('Main Page');
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
    window.history.pushState({}, 'Login', path);
  }

  const routeHandler = ROUTES[path];
  let websocket: WebSocket;

  if (routeHandler) {
    websocket = createWebSocket();
    routeHandler(websocket);
  } else {
    console.log('404 - Страница не найдена');
  }
}

export { router, aboutPageRouteHandler, loginPageRouteHandler };
