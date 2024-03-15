import './continue-btn.css';
import { createElem } from '../../../../utils/createElem';

const BTN_CONTINUE_TEXT = 'Continue';

function createContinueBtn(): HTMLElement {
  const btn = createElem({
    tag: 'button',
    classesCss: ['btn', 'continue__btn_default'],
    textContent: BTN_CONTINUE_TEXT,
  });
  btn.addEventListener('click', changeRowOrRound);
  return btn;
}

function changeRowOrRound() {
  console.log('sas');
}

export default createContinueBtn;
