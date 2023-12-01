'use strict';

import { menuItems } from "./menu-items.js";
import { smoothScrolling, burgerMenu } from "./default.js";

const burgerNavigationWrapper = document.querySelector('.burger__navigation__wrapper');
const burgerMenuContainer = document.querySelector('.burger-menu__container');

burgerNavigationWrapper.addEventListener('click', smoothScrolling);
burgerMenuContainer.addEventListener('click', burgerMenu);

const menuSlider = document.querySelector('.menu__slider__wrapper');
const modal = document.querySelector('.menu__slider__modal');

const body = document.querySelector('.body');

const modalCloseBtn = document.querySelector('.menu__slider__modal__btn');

const additivesButtonsInput = document.querySelectorAll('.menu__slider__modal__label input');
additivesButtonsInput.forEach((input) => {
  input.addEventListener('click', event => {
    event.stopPropagation();
  })
})

menuSlider.addEventListener('click', showModal);


function showModal(event) {
  const card = (event.target.closest('.menu__slider__card'));
  if (card) {

    const cards = document.querySelectorAll('.menu__slider__card');

    const sizeButtons = modal.querySelector('.menu__slider__modal__buttons-wrapper-size');
    const additivesButtons = modal.querySelector('.menu__slider__modal__buttons-wrapper-additives');

    let returned = false;
    cards.forEach(card => {
      if (card.classList.contains('_active')) {
        modal.classList.remove('_active');
        card.classList.remove('_active');
        body.classList.remove('_active');
        returned = true;
      }
    })
    if (returned) return;

    card.classList.add('_active');
    modal.classList.add('_active');
    const bodyWidthBefore = body.clientWidth;
    body.classList.add('_active');
    if (bodyWidthBefore < body.clientWidth) {
      body.style.paddingRight = `${body.clientWidth - bodyWidthBefore}px`;
    }

    const cardTitle = card.querySelector('.menu__slider__card__title').textContent;
    const cardDesc = card.querySelector('.menu__slider__card__description').textContent;
    const cardPrice = card.querySelector('.menu__slider__card__price').textContent;
    const cardImg = card.querySelector('.menu__slider__card-img').src;

    const modalTitle = modal.querySelector('.menu__slider__modal__title');
    const modalDesc = modal.querySelector('.menu__slider__modal__description');
    const modalPrice = modal.querySelector('.menu__slider__modal__card__price');
    const modalImg = modal.querySelector('.menu__slider__modal__img');

    modalTitle.textContent = cardTitle;
    modalDesc.textContent = cardDesc;
    modalPrice.textContent = cardPrice;
    modalImg.src = cardImg;

    let currentItem;

    menuItems.forEach((item) => {
      if (item.name === modalTitle.textContent) {
        currentItem = item;
        const sizeMetric = modal.querySelectorAll('.menu__slider__modal__label-right-price-metric');
        sizeMetric[0].textContent = currentItem.sizes.s.size;
        sizeMetric[1].textContent = currentItem.sizes.m.size;
        sizeMetric[2].textContent = currentItem.sizes.l.size;
      }
    })

    function sizeButton(event) {
      if (event.target.closest('.menu__slider__modal__label')) {
        const allButtons = sizeButtons.querySelectorAll('.menu__slider__modal__label');
        allButtons.forEach((btn) => {
          btn.classList.remove('_active');
        });

        const btn = event.target.closest('.menu__slider__modal__label');
        btn.classList.add('_active');

        const sizeSymb = btn.querySelector('.menu__slider__modal__label-left').textContent.toLowerCase();
        let totalPrice = +cardPrice.slice(1) + +currentItem.sizes[sizeSymb]['add-price'];

        const activeAdditives = modal.querySelectorAll('.menu__slider__modal__label._active-with-events');
        activeAdditives.forEach((additive) => {
          const additiveName = additive.querySelector('.menu__slider__modal__label-right').textContent;
          currentItem.additives.forEach((item) => {
            if (item.name === additiveName) {
              totalPrice += +item['add-price'];
            }
          });
        });

        modalPrice.textContent = `$${totalPrice.toFixed(2)}`;
      }
    }

    function additivesButton(event) {
      if (event.target.closest('.menu__slider__modal__label')) {
        const btn = event.target.closest('.menu__slider__modal__label');
        btn.classList.toggle('_active-with-events');

        const sizeButton = sizeButtons.querySelector('.menu__slider__modal__label._active');
        const sizeSymb = sizeButton.querySelector('.menu__slider__modal__label-left').textContent.toLowerCase();
        const cardPrice = card.querySelector('.menu__slider__card__price').textContent;
        let totalPrice = +cardPrice.slice(1) + +currentItem.sizes[sizeSymb]['add-price'];
        console.log(btn)
        const activeAdditives = modal.querySelectorAll('.menu__slider__modal__label._active-with-events');
        activeAdditives.forEach((additive) => {
          const activeAdditiveName = additive.querySelector('.menu__slider__modal__label-right').textContent;
          currentItem.additives.forEach((item) => {
            if (item.name === activeAdditiveName) {
              totalPrice += +item['add-price'];
            }
          });
        });

        modalPrice.textContent = `$${totalPrice.toFixed(2)}`;
      }
    }

    sizeButtons.addEventListener('click', sizeButton);
    additivesButtons.addEventListener('click', additivesButton);



    modalCloseBtn.addEventListener('click', () => {
      card.classList.remove('_active');
      modal.classList.remove('_active');
      const bodyWidthBefore = body.clientWidth;
      body.classList.remove('_active');
      if (bodyWidthBefore > body.clientWidth) {
        body.style.paddingRight = 0;
      }
      removeGoddamitListener(sizeButton, additivesButton);

    })
    document.addEventListener('click', (event) => {
      if (!event.target.closest('.menu__slider__modal') && (!event.target.closest('.menu__slider__card'))) {
        card.classList.remove('_active');
        modal.classList.remove('_active');
        const bodyWidthBefore = body.clientWidth;
        body.classList.remove('_active');
        if (bodyWidthBefore > body.clientWidth) {
        body.style.paddingRight = 0;
      }
      removeGoddamitListener(sizeButton, additivesButton);
      }
    })

  }
}





function removeGoddamitListener(sizeButton, additivesButton) {
  const sizeButtonsAll = modal.querySelectorAll('.menu__slider__modal__label-size');
  const additivesButtonsAll = modal.querySelectorAll('.menu__slider__modal__label-adittives');
  const sizeButtons = modal.querySelector('.menu__slider__modal__buttons-wrapper-size');
  const additivesButtons = modal.querySelector('.menu__slider__modal__buttons-wrapper-additives');

  sizeButtons.removeEventListener('click', sizeButton);
  additivesButtons.removeEventListener('click', additivesButton);

  sizeButtonsAll.forEach((item, index) => {
    if (index != 0) {
      item.classList.remove('_active')
    }
    else {
      item.classList.add('_active');
    }
  })
  additivesButtonsAll.forEach(item => {
    item.classList.remove('_active-with-events');
  })
}