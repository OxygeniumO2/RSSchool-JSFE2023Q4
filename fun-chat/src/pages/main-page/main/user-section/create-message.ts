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
  });

  msgElem.innerHTML = `<pre>${msg.text}</pre>`;

  const isDelivered = msg.status.isDelivered ? 'Delivered' : 'Sent';
  const isRead = msg.status.isReaded ? 'Read' : '';
  const iEdited = msg.status.isEdited ? 'Edited' : '';

  const msgDelivered = createElem({
    tagName: 'div',
    classNames: ['message__status'],
    textContent: `${isRead || isDelivered}`,
  });

  const msgInfoStatusContainer = createElem({
    tagName: 'div',
    classNames: ['message__status__info-container'],
  });

  const msgInfoModified = createElem({
    tagName: 'div',
    classNames: ['message__status__modified'],
    textContent: `${iEdited}`,
  });

  msgInfoStatusContainer.append(msgInfoModified);

  msgContainer.append(userNameDateContainer, msgElem, msgInfoStatusContainer);

  if (userText === 'you') {
    // msgInfoStatusContainer.append(msgStatus);
    msgInfoStatusContainer.append(msgDelivered);

    msgContainer.classList.add(`_${userText}`);

    msgContainer.addEventListener('contextmenu', (event) => {
      event.preventDefault();
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

      msgContainer.append(contextMenu);

      const formToSend = document.querySelector('.send__message__form');
      formToSend?.setAttribute('action-type', 'send');
    });
  }

  return msgContainer;
}

export default createMessage;
