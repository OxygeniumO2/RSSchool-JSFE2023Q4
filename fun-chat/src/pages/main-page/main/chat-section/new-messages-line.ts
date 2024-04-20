import createElem from '../../../../utils/create-elem';

function createNewMessagesLineElem(): HTMLElement {
  const line = createElem({
    tagName: 'div',
    classNames: ['new__message__line'],
  });

  const messageInLine = createElem({
    tagName: 'div',
    classNames: ['message__line__text'],
    textContent: 'New Messages',
  });

  const messageLine = createElem({
    tagName: 'div',
    classNames: ['message__line'],
  });
  const messageLine2 = createElem({
    tagName: 'div',
    classNames: ['message__line'],
  });

  line.append(messageLine, messageInLine, messageLine2);

  return line;
}

export default createNewMessagesLineElem;
