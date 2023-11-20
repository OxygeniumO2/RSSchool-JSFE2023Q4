'use strict';

import { smoothScrolling } from "./default.js";

const headerMenuListUl = document.querySelector('.header__nav__list');
headerMenuListUl.addEventListener('click', smoothScrolling);