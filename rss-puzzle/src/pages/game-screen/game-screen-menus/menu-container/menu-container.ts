import './menu-container.css';
import { createElem } from '../../../../utils/createElem';
import { container } from '../../../../app-container/container';
import generateLogout from '../logout/logout';

export const MENU = createElem({ tag: 'div', classesCss: ['menu__container'] });
function createMenuContainer(): void {
  const logoutBtn = generateLogout();
  MENU.append(logoutBtn);
  container.append(MENU);
}

export default createMenuContainer;
