import './login-screen.css';
import createElem from '../../utils/createElem';
import { container } from '../../app-container/container';
import { LOCALSTORAGE_KEY_LASTNAME, LOCALSTORAGE_KEY_NAME } from '../../utils/localStorageKeys';
import generateStartScreen from '../start-screen/start-screen';

const MINIMUM_FIRSTNAME_LENGTH: number = 3;
const MINIMUM_LASTNAME_LENGTH: number = 4;
const INPUT_REGEX: string = '[A-Z][a-zA-Z]*-?[a-zA-Z]*';
const INPUT_PLACEHOLDER_DEFAULT: string = 'First letter must be uppercase';
const INPUT_TITLE_FIRSTNAME_DEFAULT: string = `First letter uppercase, English alphabet, at least ${MINIMUM_FIRSTNAME_LENGTH} characters`;
const INPUT_TITLE_LASTNAME_DEFAULT: string = `First letter uppercase, English alphabet, at least ${MINIMUM_LASTNAME_LENGTH} characters`;

type SaveUserInfoInLocalStorage = (name: string, lastName: string) => void;

const saveUserInfoInLocalStorage: SaveUserInfoInLocalStorage = (name, lastName) => {
  localStorage.setItem(LOCALSTORAGE_KEY_NAME, name);
  localStorage.setItem(LOCALSTORAGE_KEY_LASTNAME, lastName);
};

function createLoginScreen() {
  const loginScreen = createElem({ tagName: 'div', classNames: ['login__screen'] });
  const loginScreenFormContainer = createElem({ tagName: 'form', classNames: ['login__screen__form-container'] });
  loginScreen.append(loginScreenFormContainer);

  const labelFirstName = createElem({ tagName: 'label' });
  const firstNameSpan = createElem({ tagName: 'span', textContent: 'First name' });
  const firstNameInput = createElem({
    tagName: 'input',
    attributes: [ ['type', 'text'],
     ['required', true],
     ['minLength', MINIMUM_FIRSTNAME_LENGTH],
     ['pattern',INPUT_REGEX],
     ['placeholder', INPUT_PLACEHOLDER_DEFAULT],
     ['title', INPUT_TITLE_FIRSTNAME_DEFAULT] ]
  }) as HTMLInputElement;

  labelFirstName.append(firstNameSpan, firstNameInput);

  const labelLastName = createElem({ tagName: 'label' });
  const lastNameSpan = createElem({ tagName: 'span', textContent: 'Surname' });
  const lastNameInput = createElem({
    tagName: 'input',
    attributes: [ ['type', 'text'],
     ['required', true],
     ['minLength', MINIMUM_LASTNAME_LENGTH],
     ['pattern',INPUT_REGEX],
     ['placeholder', INPUT_PLACEHOLDER_DEFAULT],
     ['title', INPUT_TITLE_LASTNAME_DEFAULT] ]
  }) as HTMLInputElement;

  labelLastName.append(lastNameSpan, lastNameInput);

  const loginScreenBtn = createElem({
    tagName: 'button',
    classNames: ['btn', 'login__screen__form-btn'],
    textContent: 'Login',
    attributes: [ ['type', 'submit']],
  });

  loginScreenFormContainer.append(labelFirstName, labelLastName, loginScreenBtn);
  container.append(loginScreen);

  loginScreenFormContainer.addEventListener('submit', (event) => {
    event.preventDefault();
    saveUserInfoInLocalStorage(firstNameInput.value, lastNameInput.value);

    generateStartScreen();

    loginScreen.classList.add('_hidden');
  });
}

export default createLoginScreen;
