import './login-screen.css';
import { createElem } from '../utils/createElem';
import { container } from '../app-container/container';

function createLoginScreen() {
  const loginScreen = createElem({ tag: 'div', classesCss: ['login__screen'] });
  const loginScreenFormContainer = createElem({ tag: 'form', classesCss: ['login__screen__form-container'] });
  loginScreen.append(loginScreenFormContainer);

  const labelFirstName = createElem({ tag: 'label' });
  const firstNameSpan = createElem({ tag: 'span', textContent: 'First name' });
  const firstNameInput = createElem({ tag: 'input', type: 'text' }) as HTMLInputElement;
  firstNameInput.required = true;

  labelFirstName.append(firstNameSpan, firstNameInput);

  const labelLastName = createElem({ tag: 'label' });
  const lastNameSpan = createElem({ tag: 'span', textContent: 'Surname' });
  const lastNameInput = createElem({ tag: 'input', type: 'text' }) as HTMLInputElement;
  lastNameInput.required = true;

  labelLastName.append(lastNameSpan, lastNameInput);

  const loginScreenBtn = createElem({
    tag: 'button',
    classesCss: ['btn', 'login__screen__form-btn'],
    type: 'submit',
    textContent: 'Login',
  });

  loginScreenFormContainer.append(labelFirstName, labelLastName, loginScreenBtn);
  container.append(loginScreen);
}

export default createLoginScreen;
