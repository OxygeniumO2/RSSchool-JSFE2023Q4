'use strict';

import { questions } from "./questions.js";

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

const imgHead = createElem('img', 'main__left-column-img-head hangman-part', '', './img/head.svg', 'head');
const imgBody = createElem('img', 'main__left-column-img-body hangman-part', '', './img/body.svg', 'body');
const imgLeftHand = createElem('img', 'main__left-column-img-lefthand hangman-part', '', './img/left-hand.svg', 'left-hand');
const imgRightHand = createElem('img', 'main__left-column-img-righthand hangman-part', '', './img/right-hand.svg', 'right-hand');
const imgLeftLeg = createElem('img', 'main__left-column-img-leftleg hangman-part', '', './img/left-leg.svg', 'left-leg');
const imgRightLeg = createElem('img', 'main__left-column-img-rightleg hangman-part', '', './img/right-leg.svg', 'right-leg');

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

questions.forEach((question) => {
  console.log(`${question.hint} : ${question.answer.toUpperCase()}`);
});

let incorrectTriesCount = 6;

function generateQuestion() {
  const randomNumber = Math.floor(Math.random() * questions.length);
  sessionStorage.setItem('randomQuestion', randomNumber);
  return questions[randomNumber];
}

function startGame() {
  const question = generateQuestion();
  const questionLength = question.answer.length;
  for (let i = 0; i < questionLength; i += 1) {
    const letter = createElem('div', 'main__right-column__letter');
    lettersContainer.append(letter);
  }
  hintMessage.innerHTML = `<span>Hint:</span> ${question.hint}`;
  incorrectTries.innerHTML = `Incorrect Guesses: ${incorrectTriesCount} <span>/</span> 6`;
}

startGame();

keyBoardContainer.addEventListener('click', virtualKeyboard);

const allHangmanParts = document.querySelectorAll('.hangman-part');
let hangmanPartsCounter = 0;
let winOrLose;

function virtualKeyboard(event) {
  if (event.target.nodeName === 'BUTTON') {
    const btn = event.target;
    const btnText = event.target.textContent;
    const sessionStrNumber = sessionStorage.getItem('randomQuestion');
    const allLetters = document.querySelectorAll('.main__right-column__letter');
    const currQuestion = questions[sessionStrNumber];
    for (let i = 0; i < currQuestion.answer.length; i += 1) {
      if (currQuestion.answer[i] === btnText) {
        allLetters[i].textContent = btnText;
        allLetters[i].classList.add('_active');
        btn.classList.add('_active');
        btn.disabled = true;
      } else {
        btn.disabled = true;
        btn.classList.add('_disabled');
      }
    }
    if (btn.classList.contains('_active') && btn.classList.contains('_disabled')) {
      btn.classList.remove('_disabled');
    }
    if (btn.classList.contains('_disabled')) {
      incorrectTriesCount -= 1;
      incorrectTries.innerHTML = `Incorrect Guesses: ${incorrectTriesCount} <span>/</span> 6`;
      allHangmanParts[hangmanPartsCounter].classList.add('_visible');
      hangmanPartsCounter += 1;
      if (incorrectTriesCount === 0) {
        winOrLose = false;
        winnerOrLoser(winOrLose);
      }
    }
    let counterGuesses = 0;
    allLetters.forEach((item) => {
      if (item.classList.contains('_active')) counterGuesses += 1;
    });
    if (counterGuesses === currQuestion.answer.length) {
      winOrLose = true;
      winnerOrLoser(winOrLose);
    }
  }
}

function winnerOrLoser(value) {
  modalWindow.classList.add('_active');
  shadow.classList.add('_active');
  const sessionStrNumber = sessionStorage.getItem('randomQuestion');
  const currQuestion = questions[sessionStrNumber];
  modalWindowSecretWord.innerHTML = `Correct answer was: <span>${currQuestion.answer.toUpperCase()}</span>`;

  value ? modalWindowTitle.textContent = `Congratulations! You are a winner!` : modalWindowTitle.textContent = `I'm sorry, but you lost`;
}

function playAgain() {
  hangmanPartsCounter = 0;
  incorrectTriesCount = 6;
  winOrLose = null;
  generateQuestionRecursion();
  const sessionStrNumber = sessionStorage.getItem('randomQuestion');
  const currQuestion = questions[sessionStrNumber];
  allHangmanParts.forEach((item) => {
    item.classList.remove('_visible');
  });
  lettersContainer.innerHTML = '';
  const questionLength = currQuestion.answer.length;
  for (let i = 0; i < questionLength; i += 1) {
    const letter = createElem('div', 'main__right-column__letter');
    lettersContainer.append(letter);
  }
  hintMessage.innerHTML = `<span>Hint:</span> ${currQuestion.hint}`;
  incorrectTries.innerHTML = `Incorrect Guesses: ${incorrectTriesCount} <span>/</span> 6`;

  const allKeys = document.querySelectorAll('.key');
  allKeys.forEach((item) => {
    item.classList.remove('_active');
    item.classList.remove('_disabled');
    item.disabled = false;
  })

  shadow.classList.remove('_active');
  modalWindow.classList.remove('_active');
}

function generateQuestionRecursion() {
  const currQuestion = sessionStorage.getItem('randomQuestion');
  const randomNumber = Math.floor(Math.random() * questions.length);
  if (currQuestion === randomNumber.toString()) {
    return generateQuestionRecursion();
  } else {
    sessionStorage.setItem('randomQuestion', randomNumber);
  }
}

modalWindowBtn.addEventListener('click', playAgain);