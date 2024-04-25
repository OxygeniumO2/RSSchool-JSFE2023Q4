import './winner-modal.css';
import { APP_CONTAINER } from '../../app-container/app-container';
import createElem from '../../utils/create-elem';

const ModalWinner = createElem({
  tagName: 'div',
  classNames: ['winner__modal'],
});

function appendModalWinnerToApp() {
  APP_CONTAINER.append(ModalWinner);
}

export { ModalWinner, appendModalWinnerToApp };
