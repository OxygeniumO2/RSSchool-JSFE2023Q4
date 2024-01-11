'use strict';

function createElem(tag, classes, optionalText, src, alt) {
  const elem = document.createElement(`${tag}`);

  if (classes && classes.length) {
    const classesArr = classes.split(' ');
    classesArr.forEach(item => {
      elem.classList.add(`${item}`);
    });
  }

  if (optionalText) {
    elem.textContent = `${optionalText}`;
  }

  if (src) {
    elem.src = `${src}`;
  }

  if (alt) {
    elem.alt = `${alt}`;
  }

  return elem;
};

// body + containers create

const body = document.querySelector('body');
const containerHeader = createElem('div', 'container');
const containerMain = createElem('div', 'container');

const shadow = createElem('div', 'shadow');

const header = createElem('header', 'header');

const main = createElem('main');

body.append(shadow, header, main);

// body + containers create end


// header

header.append(containerHeader);

const hangmanTitle = createElem('h1', 'hangman__title', 'Hangman game');
containerHeader.append(hangmanTitle);

// header end

// main , main column container

main.append(containerMain);

const mainColumnsContainer = createElem('div', 'main__columns-container');
const modalWindow = createElem('div', 'modal-window');

containerMain.append(mainColumnsContainer, modalWindow);

const mainLeftColumn = createElem('div', 'main__left-column');
const mainRightColumn = createElem('div', 'main__right-column');

mainColumnsContainer.append(mainLeftColumn, mainRightColumn);

// main, main column container end

// main left column

const mainLeftColumnImgContainer = createElem('div', 'main__left-column-img-container');

mainLeftColumn.append(mainLeftColumnImgContainer);

// main left column end

// main left column img container

const imgGallows = createElem('img', '', '', './img/gallows.svg', 'gallows');
const imgManContainer = createElem('div', 'main__left-column-img-man-container');

mainLeftColumnImgContainer.append(imgGallows, imgManContainer);

// main left column img container end


// img man container

const imgHead = createElem('img', 'main__left-column-img-head', '', './img/head.svg', 'head');
const imgBody = createElem('img', 'main__left-column-img-body', '', './img/body.svg', 'body');
const imgLeftHand = createElem('img', 'main__left-column-img-lefthand', '', './img/left-hand.svg', 'left-hand');
const imgRightHand = createElem('img', 'main__left-column-img-righthand', '', './img/right-hand.svg', 'right-hand');
const imgLeftLeg = createElem('img', 'main__left-column-img-leftleg', '', './img/left-leg.svg', 'left-leg');
const imgRightLeg = createElem('img', 'main__left-column-img-rightleg', '', './img/right-leg.svg', 'right-leg');

imgManContainer.append(imgHead, imgBody, imgLeftHand, imgRightHand, imgLeftLeg, imgRightLeg);

// img man container end

// main right column

const lettersContainer = createElem('div', 'main__right-column__letters-container');

const hintMessage = createElem('div', 'main__right-column__hint');

const incorrectTries = createElem('div', 'main__right-column__incorrect-tries');

const keyBoardContainer = createElem('div', 'main__right-column__keyboard-container');


mainRightColumn.append(lettersContainer, hintMessage, incorrectTries, keyBoardContainer);

// main right column end

// keyboardContainer

const keyboardKeys = ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'z', 'x', 'c', 'v', 'b', 'n', 'm'];

keyboardKeys.forEach((item) => {
  const keyElem = createElem('button', 'key', item);
  keyBoardContainer.append(keyElem);
});

// keyboardContainer end

// modal window

const modalWindowTitle = createElem('h2', 'modal-window__title');
const modalWindowSecretWord = createElem('div', 'modal-window__secretword');
const modalWindowBtn = createElem('button', 'modal-window__btn', 'play again');

modalWindow.append(modalWindowTitle, modalWindowSecretWord, modalWindowBtn);

// modal window end



