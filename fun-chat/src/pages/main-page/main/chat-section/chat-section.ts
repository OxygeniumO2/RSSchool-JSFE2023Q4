import './chat-section.css';
import createElem from '../../../../utils/create-elem';
import { FormActionType } from '../user-section/user-section';

interface ChatSectionData {
  section: HTMLElement;
  sectionChildren: ChatSectionDataChildren;
}

interface ChatSectionDataChildren {
  userName: HTMLElement;
  userStatus: HTMLElement;
  chatWindow: HTMLElement;
  chatSendMessageForm: HTMLElement;
}

function createChatSection(): ChatSectionData {
  const chatSection = createElem({
    tagName: 'section',
    classNames: ['chat__section'],
  });

  const chatHeader = createElem({
    tagName: 'div',
    classNames: ['chat__username__status-container'],
  });

  const chatHeaderUserName = createElem({
    tagName: 'div',
    classNames: ['chat__header__user'],
  });

  const chatHeaderUserStatus = createElem({
    tagName: 'div',
    classNames: ['chat__user__status'],
  });

  chatHeader.append(chatHeaderUserName, chatHeaderUserStatus);

  const chatWindow = createElem({
    tagName: 'div',
    classNames: ['chat__window'],
  });

  const chatSendMessageForm = createElem({
    tagName: 'form',
    classNames: ['send__message__form', '_hidden'],
    attributes: [['action-type', FormActionType.Send]],
  }) as HTMLFormElement;

  const chatMessageTextInput = createElem({
    tagName: 'input',
    classNames: ['message__text__input'],
    attributes: [
      ['type', 'text'],
      ['required', true],
      ['placeholder', 'Enter message'],
      ['pattern', '.*\\S.*'],
      ['title', 'Message cannot be empty'],
    ],
  });

  const chatSendMessageBtn = createElem({
    tagName: 'button',
    textContent: 'Send',
    attributes: [['type', 'submit']],
  });

  chatSendMessageForm.append(chatMessageTextInput, chatSendMessageBtn);

  chatSection.append(chatHeader, chatWindow, chatSendMessageForm);

  const sectionData: ChatSectionData = {
    section: chatSection,
    sectionChildren: {
      userName: chatHeaderUserName,
      userStatus: chatHeaderUserStatus,
      chatWindow,
      chatSendMessageForm,
    },
  };

  return sectionData;
}

export { ChatSectionDataChildren, ChatSectionData, createChatSection };
