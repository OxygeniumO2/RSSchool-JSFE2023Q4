'use strict';

import { menuItems } from "./menu-items.js";
import { smoothScrolling, burgerMenu } from "./default.js";

const burgerNavigationWrapper = document.querySelector('.burger__navigation__wrapper');
const burgerMenuContainer = document.querySelector('.burger-menu__container');

burgerNavigationWrapper.addEventListener('click', smoothScrolling);
burgerMenuContainer.addEventListener('click', burgerMenu);

const menuSlider = document.querySelector('.menu__slider__wrapper');
const modal = document.querySelector('.menu__slider__modal');

const modalCloseBtn = document.querySelector('.menu__slider__modal__btn');
modalCloseBtn.addEventListener('click', () => {
  modal.classList.remove('_active');
  const sizeButtons = modal.querySelectorAll('.menu__slider__modal__label');
  sizeButtons.forEach((item, index) => {
    if (index != 0) {
      item.classList.remove('_active')
    }
    else {
      item.classList.add('_active');
    }
  })
})

menuSlider.addEventListener('click', showModal)

function showModal(event) {
  const card = (event.target.closest('.menu__slider__card'));
  modal.classList.add('_active');

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

  const sizeButtons = modal.querySelector('.menu__slider__modal__buttons-wrapper-size');

  sizeButtons.addEventListener('click', (event) => {
    if (event.target.closest('.menu__slider__modal__label')) {
      const allButtons = sizeButtons.querySelectorAll('.menu__slider__modal__label');
      allButtons.forEach((btn) => {
        if (btn.classList.contains('_active')) {
          btn.classList.remove('_active');
        }
      })
      const btn = event.target.closest('.menu__slider__modal__label');
      if (!btn.classList.contains('_active')) {
        btn.classList.add('_active');
      }
      const sizeSymb = btn.querySelector('.menu__slider__modal__label-left').textContent.toLowerCase();

      for (let key in currentItem.sizes) {
        if (key === sizeSymb) {
           const totalPrice = +cardPrice.slice(1) + +currentItem.sizes[key]['add-price'];
           console.log(totalPrice)
           modalPrice.textContent = `$${totalPrice.toFixed(2)}`;
        }
      }
    }
  })

}

