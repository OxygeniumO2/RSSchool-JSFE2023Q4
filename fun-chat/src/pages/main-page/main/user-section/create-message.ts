import createElem from '../../../../utils/create-elem';
import formatDateTime from '../../../../utils/format-date';
import createContextMenu from './message-context-menu';
import { Message } from './send-request-get-messages-from-user';

enum MessageStatus {
  Delivered = 'Delivered',
  Sent = 'Sent',
  Read = 'Read',
  Edited = 'Edited',
}

enum MessageSender {
  You = 'you',
}

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

  const userText = currUserFromSS === msg.from ? MessageSender.You : msg.from;

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

  const isDelivered = msg.status.isDelivered
    ? MessageStatus.Delivered
    : MessageStatus.Sent;

  const isRead = msg.status.isReaded ? MessageStatus.Read : '';
  const iEdited = msg.status.isEdited ? MessageStatus.Edited : '';

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

  if (userText === MessageSender.You) {
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
