import createElem from '../utils/create-elem';

const APP_CONTAINER = createElem({ tag: 'div', classesCss: ['container'] });

function addContainerToBody() {
  document.body.append(APP_CONTAINER);
}

export { APP_CONTAINER, addContainerToBody };
