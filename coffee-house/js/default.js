'use sctrict';

const burgerMenuContainer = document.querySelector('.burger-menu__container');
const burgerNavigationWrapper = document.querySelector('.burger__navigation__wrapper');
const body = document.querySelector('.body');

function smoothScrolling(item) {
  const link = item.target;
  if (link.classList.contains('header__menu__link') || (link.classList.contains('header__menu-link__menupage'))) {
    const gotoBlock = document.querySelector(link.dataset.goto);
    const gotoBlockValue = gotoBlock.getBoundingClientRect().top + scrollY;
    window.scrollTo({
      top: gotoBlockValue,
      behavior: "smooth",
    });
    item.preventDefault();
    burgerMenuContainer.classList.remove('_active');
    burgerNavigationWrapper.classList.remove('_active');
    body.classList.remove('_active');
    body.classList.remove('_active-hidden');
  }
};

function burgerMenu() {
  burgerMenuContainer.classList.toggle('_active');
  burgerNavigationWrapper.classList.toggle('_active');
  body.classList.toggle('_active-hidden');
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

export { smoothScrolling, burgerMenu };