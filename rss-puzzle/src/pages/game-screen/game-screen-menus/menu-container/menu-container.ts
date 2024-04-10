/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import './menu-container.css';
import createElem from '../../../../utils/createElem';
import { container } from '../../../../app-container/container';
import getLogoutButton from '../logout/logout';
import createChooseLevelContainer from '../../choose-level';

export const MENU = createElem({ tagName: 'div', classNames: ['menu__container'] });
function createMenuContainer(): void {
  const logoutBtn = getLogoutButton();
  const chooseLevelContainer = createChooseLevelContainer();
  MENU.append(chooseLevelContainer, logoutBtn);
  container.append(MENU);
}

export default createMenuContainer;
