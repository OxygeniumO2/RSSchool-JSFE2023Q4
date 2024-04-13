import './modal.css';
import createElem from '../utils/create-elem';
import SVG_LOADING_DATA from './modal-svg-data';

function createTryToReconnectModal(): HTMLElement {
  const modal = createElem({
    tagName: 'div',
    classNames: ['reconnect__modal'],
  });

  const modalContentContainer = createElem({
    tagName: 'div',
    classNames: ['modal__content-container'],
  });

  const svgData = SVG_LOADING_DATA;
  const svgContainer = createElem({
    tagName: 'div',
    classNames: ['svg__container'],
  });

  svgContainer.innerHTML = svgData;
  const modalText = createElem({
    tagName: 'div',
    textContent: 'Reconnecting...',
  });

  modalContentContainer.append(svgContainer, modalText);

  modal.append(modalContentContainer);
  return modal;
}

export default createTryToReconnectModal;
