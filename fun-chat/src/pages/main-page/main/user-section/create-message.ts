import createElem from '../../../../utils/create-elem';
import formatDateTime from '../../../../utils/format-date';
import createContextMenu from './message-context-menu';
import { Message } from './send-request-get-messages-from-user';

function createMessage(
  websocket: WebSocket,
  currUserFromSS: string,
  msg: Message,
  allMsgContainer: HTMLElement,
): HTMLElement {
  const msgContainer = createElem({
    tagName: 'div',
    classNames: ['message-container'],
    attributes: [
      ['id', `${msg.id}`],
      ['read', `${msg.status.isReaded}`],
    ],
  });

  const userText = currUserFromSS === msg.from ? 'you' : msg.from;

  const userNameDateContainer = createElem({
    tagName: 'div',
    classNames: ['username__date-container'],
  });

  const userNameElem = createElem({
    tagName: 'div',
    textContent: `${userText}`,
  });

  const msgDate = formatDateTime(msg.datetime);

  const msgDateElem = createElem({
    tagName: 'div',
    textContent: `${msgDate}`,
  });

  userNameDateContainer.append(userNameElem, msgDateElem);

  const msgElem = createElem({
    tagName: 'div',
    classNames: ['message'],
    textContent: `${msg.text}`,
  });

  const isDelivered = msg.status.isDelivered ? 'Delivered' : 'Sent';
  const isRead = msg.status.isReaded ? 'Read' : '';

  // const msgStatus = createElem({ tagName: 'div', textContent: `${isRead}` });

  const msgDelivered = createElem({
    tagName: 'div',
    classNames: ['message__status'],
    textContent: `${isRead || isDelivered}`,
  });

  const msgInfoStatusContainer = createElem({
    tagName: 'div',
    classNames: ['message__status__info-container'],
  });

  msgContainer.append(userNameDateContainer, msgElem, msgInfoStatusContainer);

  if (userText === 'you') {
    // msgInfoStatusContainer.append(msgStatus);
    msgInfoStatusContainer.append(msgDelivered);

    msgContainer.classList.add(`_${userText}`);

    msgContainer.addEventListener('contextmenu', (event) => {
      event.preventDefault();

      const mouseEvent = event as MouseEvent;

      const containerRect = msgContainer.getBoundingClientRect();
      const menuX = mouseEvent.clientX - containerRect.left;
      const menuY = mouseEvent.clientY - containerRect.top;

      const allMsgs = Array.from(allMsgContainer.children);

      allMsgs.forEach((messageElem) => {
        if (messageElem.lastElementChild?.classList.contains('context__menu')) {
          messageElem.removeChild(messageElem.lastElementChild);
        }
      });

      if (msgContainer.lastElementChild?.classList.contains('context__menu')) {
        msgContainer.removeChild(msgContainer.lastElementChild);
      }

      const contextMenu = createContextMenu(websocket, msgContainer.id);
      contextMenu.style.top = `${menuY}px`;
      contextMenu.style.left = `${menuX}px`;

      msgContainer.append(contextMenu);
    });
  }

  return msgContainer;
}

export default createMessage;
