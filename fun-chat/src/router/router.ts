import APP_CONTAINER from '../app-container/app-container';
// eslint-disable-next-line import/no-cycle
import { renderPage } from '../app-container/init-app';
// import createTryToReconnectModal from '../modal-lost-connect/modal';
import createLoginPage from '../pages/login-page/login-page';
import createWebSocket from '../web-socket/web-socket';

type Routes = {
  '/': string;
  '/login': () => void;
  '/main': () => void;
  '/about': () => void;
};

function loginPageRouteHandler() {
  const loginContainer = createLoginPage();
  renderPage(APP_CONTAINER, loginContainer);
}

function mainPageRouteHandler() {
  console.log('Main Page');
}

function aboutPageRouteHandler() {
  console.log('About Page');
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
    window.location.assign(path);
  }

  const routeHandler = ROUTES[path];

  if (routeHandler) {
    routeHandler();
    createWebSocket();
  } else {
    console.log('404 - Страница не найдена');
  }
}

export default router;
