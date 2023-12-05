'use strict';

import { smoothScrolling, burgerMenu } from "./default.js";

const headerWrapper = document.querySelector('.header__wrapper');
const burgerMenuContainer = document.querySelector('.burger-menu__container');

headerWrapper.addEventListener('click', smoothScrolling);
burgerMenuContainer.addEventListener('click', burgerMenu);

let resizeTimer;

window.addEventListener('resize', () => {

  clearTimeout(resizeTimer);

  resizeTimer = setTimeout(() => {
    slideWidth = slides[0].offsetWidth;
  if (window.innerWidth > 1024) {
    sliderCount = 0;
  }
  rollSlider();
  }, 100)

});

const sliderLine = document.querySelector('.favorite__slides');
const sliderArrowLeft = document.querySelector('.favorite__slider__arrow_left');
const sliderArrowRight = document.querySelector('.favorite__slider__arrow_right');
const slides = document.querySelectorAll('.favorite__slide');
const sliderLines = document.querySelectorAll('.favorite__slider__line');

let sliderCount = 0;
let slideWidth = slides[0].offsetWidth;
let start;
let change;
let slideInterval;
let dragging = false;

sliderLine.addEventListener('touchstart', (event) => {
  dragging = true;
  start = event.touches[0].clientX;
  clearInterval(slideInterval);
});

sliderLine.addEventListener('touchmove', (event) => {
  event.preventDefault();
  let touch = event.touches[0];
  change = start - touch.clientX;
});

sliderLine.addEventListener('touchend', () => {
  dragging = false;
  startSlideInterval();
  if (change > 0) {
    sliderCount += 1;
    if (sliderCount >= slides.length) {
      sliderCount = 0;
    }
    rollSlider();
  }
  else {
    sliderCount -= 1;
    if (sliderCount < 0) {
      sliderCount = slides.length - 1;
    }
    rollSlider();
  }
});

sliderLine.addEventListener('touchcancel', () => {
  startSlideInterval();
});

function startSlideInterval() {
  if (sliderCount === 0) {
    const sss = document.querySelectorAll('.favorite__slider__line');
    sss[0].classList.add('_active');
  }

  slideInterval = setInterval(() => {
    nextSlide();
  }, 5000);
}

startSlideInterval();

function rollSlider() {
  clearInterval(slideInterval);
  sliderLine.style.transform = `translateX(${(-sliderCount * slideWidth)}px)`;
   sliderLines.forEach((item, index) => {
     if (index === sliderCount) {
      item.classList.add('_active');
     }
    else {
     item.classList.remove('_active');
     }
   })
   startSlideInterval();
};

function nextSlide() {
  sliderCount += 1;
  if (sliderCount >= slides.length) {
    sliderCount = 0;
  }
  rollSlider();
};

function prevSlide() {
  sliderCount -= 1;
  if (sliderCount < 0) {
    sliderCount = slides.length - 1;
  }
  rollSlider();
};

sliderArrowLeft.addEventListener('click', () => {
  clearInterval(slideInterval);

  prevSlide();

});

sliderArrowRight.addEventListener('click', () => {
  clearInterval(slideInterval);

  nextSlide();

});


