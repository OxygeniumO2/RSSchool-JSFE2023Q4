import './chat-section.css';
import createElem from '../../../../utils/create-elem';

interface ChatSectionData {
  section: HTMLElement;
  sectionChildren: ChatSectionDataChildren;
}

interface ChatSectionDataChildren {
  userName: HTMLElement;
  userStatus: HTMLElement;
}

function createChatSection(): ChatSectionData {
  const chatSection = createElem({
    tagName: 'section',
    classNames: ['chat__section'],
  });

  const chatHeader = createElem({ tagName: 'div' });

  const chatHeaderUserName = createElem({
    tagName: 'div',
    classNames: ['chat__header__user'],
  });

  const chatHeaderUserStatus = createElem({ tagName: 'div' });

  chatHeader.append(chatHeaderUserName, chatHeaderUserStatus);

  const chatWindow = createElem({ tagName: 'div' });

  const chatSendMessageForm = createElem({ tagName: 'form' });
  const chatMessageTextInput = createElem({
    tagName: 'input',
    attributes: [
      ['type', 'text'],
      ['required', true],
      ['placeholder', 'Write your message'],
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
    },
  };

  return sectionData;
}

export { ChatSectionDataChildren, ChatSectionData, createChatSection };
