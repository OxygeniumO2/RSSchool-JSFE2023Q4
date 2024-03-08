import './login-screen.css';
import { createElem } from '../utils/createElem';
import { container } from '../app-container/container';

// const VALIDATE_REGEX: RegExp = /^[A-Z][-a-zA-Z]+$/;
const MINIMUM_FIRSTNAME_LENGTH: number = 3;
const MINIMUM_LASTNAME_LENGTH: number = 4;
const INPUT_REGEX: string = '[A-Z][a-z]*-?[a-z]*';
const INPUT_PLACEHOLDER_DEFAULT: string = 'First letter must be uppercase';
const INPUT_TITLE_FIRSTNAME_DEFAULT: string = 'First letter uppercase, English alphabet, at least 3 characters';
const INPUT_TITLE_LASTNAME_DEFAULT: string = 'First letter uppercase, English alphabet, at least 4 characters';

type ValidateUserInfo = (name: string, lastName: string) => void;

function createLoginScreen() {
  const loginScreen = createElem({ tag: 'div', classesCss: ['login__screen'] });
  const loginScreenFormContainer = createElem({ tag: 'form', classesCss: ['login__screen__form-container'] });
  loginScreen.append(loginScreenFormContainer);

  const labelFirstName = createElem({ tag: 'label' });
  const firstNameSpan = createElem({ tag: 'span', textContent: 'First name' });
  const firstNameInput = createElem({
    tag: 'input',
    type: 'text',
    required: true,
    minLength: MINIMUM_FIRSTNAME_LENGTH,
    pattern: INPUT_REGEX,
    placeholder: INPUT_PLACEHOLDER_DEFAULT,
    title: INPUT_TITLE_FIRSTNAME_DEFAULT,
  }) as HTMLInputElement;

  labelFirstName.append(firstNameSpan, firstNameInput);

  const labelLastName = createElem({ tag: 'label' });
  const lastNameSpan = createElem({ tag: 'span', textContent: 'Surname' });
  const lastNameInput = createElem({
    tag: 'input',
    type: 'text',
    required: true,
    minLength: MINIMUM_LASTNAME_LENGTH,
    pattern: INPUT_REGEX,
    placeholder: INPUT_PLACEHOLDER_DEFAULT,
    title: INPUT_TITLE_LASTNAME_DEFAULT,
  }) as HTMLInputElement;

  labelLastName.append(lastNameSpan, lastNameInput);

  const loginScreenBtn = createElem({
    tag: 'button',
    classesCss: ['btn', 'login__screen__form-btn'],
    type: 'submit',
    textContent: 'Login',
  });

  loginScreenFormContainer.append(labelFirstName, labelLastName, loginScreenBtn);
  container.append(loginScreen);

  loginScreenFormContainer.addEventListener('submit', function (event) {
    event.preventDefault();
    validateUserInfo(firstNameInput.value, lastNameInput.value);
  });
}

const validateUserInfo: ValidateUserInfo = (name, lastName) => {
  console.log(name, lastName);
};

export default createLoginScreen;
