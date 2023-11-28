'use strict';

import { smoothScrolling, burgerMenu } from "./default.js";

const burgerNavigationWrapper = document.querySelector('.burger__navigation__wrapper');
const burgerMenuContainer = document.querySelector('.burger-menu__container');

burgerNavigationWrapper.addEventListener('click', smoothScrolling);
burgerMenuContainer.addEventListener('click', burgerMenu);