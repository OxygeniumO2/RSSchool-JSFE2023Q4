/* eslint-disable import/no-unresolved */
// eslint-disable-next-line import/extensions
import createElem from '../utils/createElem';

const container = createElem({ tagName: 'div', classNames: ['container'] });

function addContainerToBody() {
  document.body.append(container);
}

export { container, addContainerToBody };
