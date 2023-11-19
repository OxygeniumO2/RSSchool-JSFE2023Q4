'use strict';

const headerMenuListUl = document.querySelector('.header__nav__list');

function smoothScrolling(item) {
  const link = item.target;
  if (link.classList.contains('header__menu__link')) {
    const gotoBlock = document.querySelector(link.dataset.goto);
    const gotoBlockValue = gotoBlock.getBoundingClientRect().top + scrollY;
    window.scrollTo({
      top: gotoBlockValue,
      behavior: "smooth",
    });
    e.preventDefault();
  }
};

headerMenuListUl.addEventListener('click', smoothScrolling);