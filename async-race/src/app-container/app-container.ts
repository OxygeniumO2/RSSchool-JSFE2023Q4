import createElem from '../utils/create-elem';

const APP_CONTAINER = createElem({ tagName: 'div', classNames: ['container'] });

function addContainerToBody() {
  document.body.append(APP_CONTAINER);
}

export { APP_CONTAINER, addContainerToBody };
