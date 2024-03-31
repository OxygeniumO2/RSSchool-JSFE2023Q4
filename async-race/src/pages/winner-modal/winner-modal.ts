import './winner-modal.css';
import { APP_CONTAINER } from '../../app-container/app-container';
import createElem from '../../utils/create-elem';

const MODAL_WINNER = createElem({
  tagName: 'div',
  classNames: ['winner__modal'],
});

function appendModalWinnerToApp() {
  APP_CONTAINER.append(MODAL_WINNER);
}

export { MODAL_WINNER, appendModalWinnerToApp };
