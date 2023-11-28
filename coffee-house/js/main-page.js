'use strict';

import { smoothScrolling, burgerMenu } from "./default.js";

const headerWrapper = document.querySelector('.header__wrapper');
const burgerMenuContainer = document.querySelector('.burger-menu__container');

headerWrapper.addEventListener('click', smoothScrolling);
burgerMenuContainer.addEventListener('click', burgerMenu);

// SLIDER START

window.addEventListener('resize', () => {
  slideWidth = slides[0].offsetWidth;;
  if (window.innerWidth > 1024) {
    sliderCount = 0;
  }
  rollSlider();
});

const sliderLine = document.querySelector('.favorite__slides');
const sliderArrowLeft = document.querySelector('.favorite__slider__arrow_left');
const sliderArrowRight = document.querySelector('.favorite__slider__arrow_right');
const slides = document.querySelectorAll('.favorite__slide');

let sliderCount = 0;
let slideWidth = slides[0].offsetWidth;
let start;
let change;

sliderLine.addEventListener('dragstart', (event) => {
  start = event.clientX;
});

sliderLine.addEventListener('dragover', (event) => {
  event.preventDefault();
  let touch = event.clientX;
  change = start - touch;
});

sliderLine.addEventListener('dragend', slideSwipe);



setTimeout(function increaseCounter() {
    sliderCount += 1;
    if (sliderCount >= slides.length) {
      sliderCount = 0;
    }
    rollSlider();
    setTimeout(increaseCounter, 3000);
  }, 3000);

function slideSwipe() {
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
};

sliderLine.addEventListener('touchstart', (event) => {
  start = event.touches[0].clientX;
});

sliderLine.addEventListener('touchmove', (event) => {
  event.preventDefault();
  let touch = event.touches[0];
  change = start - touch.clientX;
});


sliderLine.addEventListener('touchend', slideSwipe);

function rollSlider() {
  sliderLine.style.transform = `translateX(${(-sliderCount * slideWidth)}px)`;
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

sliderArrowLeft.addEventListener('click', prevSlide);
sliderArrowRight.addEventListener('click', nextSlide);

// SLIDER END