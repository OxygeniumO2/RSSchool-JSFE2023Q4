import createElem from '../../../../utils/create-elem';
import formatDateTime from '../../../../utils/format-date';
import { Message } from './send-resp-get-messages-from-user';

function createMessage(currUserFromSS: string, msg: Message): HTMLElement {
  const msgContainer = createElem({
    tagName: 'div',
    classNames: ['message-container'],
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

  msgContainer.append(userNameDateContainer, msgElem);

  return msgContainer;
}

export default createMessage;
