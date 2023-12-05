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
const screenBlockElem = document.querySelector('.shadow');

const additivesButtonsInput = document.querySelectorAll('.menu__slider__label input');
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

    screenBlockElem.classList.add('_active');

    const sizeButtons = modal.querySelector('.menu__slider__modal__buttons-wrapper-size');
    const additivesButtons = modal.querySelector('.menu__slider__modal__buttons-wrapper-additives');


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
        const additiveName = modal.querySelectorAll('.menu__slider__modal__label-right-additives');
        sizeMetric[0].textContent = currentItem.sizes.s.size;
        sizeMetric[1].textContent = currentItem.sizes.m.size;
        sizeMetric[2].textContent = currentItem.sizes.l.size;
        additiveName.forEach((item, index) => {
          item.textContent = currentItem.additives[index].name;
        })
      }
    })

    function sizeButton(event) {
      if (event.target.closest('.menu__slider__modal__label')) {
        const allButtons = sizeButtons.querySelectorAll('.menu__slider__modal__label');
        allButtons.forEach((btn) => {
          btn.classList.remove('_active');
          const btnLeftText = btn.querySelector('.menu__slider__modal__label-left');
          btnLeftText.classList.remove('_active');
        });

        const btn = event.target.closest('.menu__slider__modal__label');
        btn.classList.add('_active');
        const btnLeftText = btn.querySelector('.menu__slider__modal__label-left');
        btnLeftText.classList.add('_active');

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
      event.stopImmediatePropagation()
      if (event.target.closest('.menu__slider__modal__label')) {
        const btn = event.target.closest('.menu__slider__modal__label');
        btn.classList.toggle('_active-with-events');
        const btnLeftText = btn.querySelector('.menu__slider__modal__label-left');
        btnLeftText.classList.toggle('_active');
        const sizeButton = sizeButtons.querySelector('.menu__slider__modal__label._active');
        const sizeSymb = sizeButton.querySelector('.menu__slider__modal__label-left').textContent.toLowerCase();
        const cardPrice = card.querySelector('.menu__slider__card__price').textContent;
        let totalPrice = +cardPrice.slice(1) + +currentItem.sizes[sizeSymb]['add-price'];
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

    modalCloseBtn.addEventListener('click', closeModalByButton);
    screenBlockElem.addEventListener('click', closeModalByOutside);


    function closeModalByOutside() {
      screenBlockElem.classList.remove('_active');
      card.classList.remove('_active');
      modal.classList.remove('_active');
      const bodyWidthBefore = body.clientWidth;
      body.classList.remove('_active');
      if (bodyWidthBefore > body.clientWidth) {
        body.style.paddingRight = 0;
      }
      const btnLeftText = document.querySelectorAll('.menu__slider__modal__label-left-size');
      const btnALeftdditives = document.querySelectorAll('.menu__slider__modal__label-left-additives');
      btnALeftdditives.forEach(item => {
        item.classList.remove('_active');
      })
      btnLeftText.forEach((item, index) => {
        if (index != 0) {
          item.classList.remove('_active');
        }
        else {
          item.classList.add('_active');
        }
      })
      removeGoddamitListener(sizeButton, additivesButton);
      modalCloseBtn.removeEventListener('click', closeModalByButton);
      screenBlockElem.removeEventListener('click', closeModalByOutside)
    };


    function closeModalByButton() {
      screenBlockElem.classList.remove('_active');
      card.classList.remove('_active');
      modal.classList.remove('_active');
      const bodyWidthBefore = body.clientWidth;
      body.classList.remove('_active');
      if (bodyWidthBefore > body.clientWidth) {
        body.style.paddingRight = 0;
      }
      const btnLeftText = document.querySelectorAll('.menu__slider__modal__label-left-size');
      const btnALeftdditives = document.querySelectorAll('.menu__slider__modal__label-left-additives');
      btnALeftdditives.forEach(item => {
        item.classList.remove('_active');
      })
      btnLeftText.forEach((item, index) => {
        if (index != 0) {
          item.classList.remove('_active');
        }
        else {
          item.classList.add('_active');
        }
      })
      removeGoddamitListener(sizeButton, additivesButton);
      modalCloseBtn.removeEventListener('click', closeModalByButton);
      screenBlockElem.removeEventListener('click', closeModalByOutside);
    }

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

const menuSliderButtonWrapper = document.querySelector('.menu__slider__buttons-wrapper');
const loadMoreBtn = document.querySelector('.menu__slider-reroll-button__wrapper');

menuSliderButtonWrapper.addEventListener('click', buildCards);

function buildCards(event) {
  const card = event.target.closest('.menu__slider__label');
  if (card) {
    const cardName = card.querySelector('span').textContent;
    const allButtons = document.querySelectorAll('.menu__slider__label-btn');
    allButtons.forEach(item => {
      item.classList.remove('_active');
    })
    card.classList.add('_active');
    buildCardsByName(cardName);
  }
}

function addInfoToCard(card, index, currentItems) {
  card.classList.remove('_hidden');
  const cardImg = card.querySelector('.menu__slider__card-img');
  cardImg.src = currentItems[index].path;

  const cardTitle = card.querySelector('.menu__slider__card__title');
  cardTitle.textContent = currentItems[index].name;

  const cardDesc = card.querySelector('.menu__slider__card__description');
  cardDesc.textContent = currentItems[index].description;

  const cardPrice = card.querySelector('.menu__slider__card__price');
  cardPrice.textContent = `$${currentItems[index].price}`;
}

function buildCardsByName(cardName) {
  const allCards = document.querySelectorAll('.menu__slider__card');
  const currentItems = menuItems.filter(item => {
    return item.category === cardName.toLowerCase();
  })
  allCards.forEach((card, index) => {
    if (currentItems[index] && currentItems[index].path !== undefined) {
      if (window.innerWidth > 768) {
        addInfoToCard(card, index, currentItems);
      }
      else {
        addInfoToCard(card, index, currentItems);
        if (index >= 4) {
          card.classList.add('_hidden');
          loadMoreBtn.classList.remove('_hidden');
        }
        if (!currentItems[index - 1]) {
          loadMoreBtn.classList.add('_hidden');
        }
      }
    }
    else {
      card.classList.add('_hidden');
    }
  })
}


loadMoreBtn.addEventListener('click', loadMore);

function loadMore(event) {
  const btn = event.target.closest('img');
  if (btn) {
    const allCards = document.querySelectorAll('.menu__slider__card');
    allCards.forEach(item => {
      item.classList.remove('_hidden');
    });
    loadMoreBtn.classList.add('_hidden');
  }
}

const allCards = document.querySelectorAll('.menu__slider__card');

document.addEventListener('DOMContentLoaded', () => {
  if (window.innerWidth <= 768) {
    allCards.forEach((card, index) => {
      if(index >= 4) {
        card.classList.add('_hidden');
      }
    })
  }
});

let isTabletWidth = false;

let resizeTimer;

window.addEventListener('resize', () => {

  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {

    const allButtons = document.querySelectorAll('.menu__slider__label-btn');

    if (window.innerWidth <= 768 && !isTabletWidth) {
      allCards.forEach((item, index) => {
        if (index >= 4) {
        item.classList.add('_hidden');
      }
    })
    loadMoreBtn.classList.remove('_hidden');
    if (allButtons[1].classList.contains('_active')) {
      loadMoreBtn.classList.add('_hidden');
    }
    isTabletWidth = true;
  }
  else if (window.innerWidth > 768) {
    allCards.forEach(item => {
      item.classList.remove('_hidden');
    })
    if (allButtons[1].classList.contains('_active')) {
      allCards.forEach((item, index) => {
        if (index >= 4) {
          item.classList.add('_hidden');
        }
      })
    }
    isTabletWidth = false;
  }
  }, 200)
});