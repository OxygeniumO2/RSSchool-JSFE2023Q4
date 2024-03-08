import { createElem } from '../utils/createElem';

const container = createElem({ tag: 'div', classesCss: ['container'] });

function addContainerToBody() {
  document.body.append(container);
}

export { container, addContainerToBody };
