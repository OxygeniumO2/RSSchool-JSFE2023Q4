import './user-section.css';
import createElem from '../../../../utils/create-elem';
import { ChatSectionDataChildren } from '../chat-section/chat-section';
import SessionStorageKeys from '../../../../utils/session-storage-keys';
import createMessage from './create-message';
import appendUsersToUserList from './append-users-to-userlist';
import { UserServerResp } from '../../../../web-socket/web-socket-interfaces';
import removeAllChildren from '../../../../utils/remove-all-children';
import {
  Message,
  sendRequestToGetMessagesFromUser,
} from './send-request-get-messages-from-user';
import sendRequestToGetOnlineUsers from './send-request-get-online-users';
import sendRequestToGetOfflineUsers from './send-request-get-offline-users';
import sendRequestMessageToUser from './send-request-message';
import createNewMessagesLineElem from '../chat-section/new-messages-line';
import handleContextMenuAndScroll from '../chat-section/chat-window-new-messages-handler';

function createUserSection(
  websocket: WebSocket,
  chatSectionChildren: ChatSectionDataChildren,
) {
  const userSection = createElem({ tagName: 'section' });

  const userSearch = createElem({
    tagName: 'input',
    classNames: ['search__user'],
    attributes: [
      ['type', 'text'],
      ['placeholder', 'Search user'],
    ],
  }) as HTMLInputElement;

  const userList = createElem({ tagName: 'div' });

  const onlineUsersList = createElem({ tagName: 'div' });
  const offlineUsersList = createElem({ tagName: 'div' });

  userList.append(onlineUsersList, offlineUsersList);

  const currUserFromSS = sessionStorage.getItem(SessionStorageKeys.login);

  const { chatSendMessageForm, chatWindow, userName, userStatus } =
    chatSectionChildren;

  const messagesToWindowChatElem = createElem({
    tagName: 'div',
    classNames: ['all__messages-container'],
  });

  const chooseUserElem = createElem({
    tagName: 'div',
    classNames: ['start__dialogue'],
    textContent: 'Choose user to dialogue',
  });

  let line = createNewMessagesLineElem();

  messagesToWindowChatElem.append(chooseUserElem);

  const startDialogueElem = createElem({
    tagName: 'div',
    classNames: ['start__dialogue'],
    textContent: 'Start your dialogue',
  });

  websocket.addEventListener('message', (event) => {
    const message = JSON.parse(event.data);

    if (
      message.type === 'USER_EXTERNAL_LOGIN' ||
      message.type === 'USER_LOGIN' ||
      message.type === 'USER_EXTERNAL_LOGOUT' ||
      message.type === 'EXTERNAL_LOGIN'
    ) {
      sendRequestToGetOnlineUsers(websocket);
      sendRequestToGetOfflineUsers(websocket);

      if (message.payload.user.login === userName.textContent) {
        const newUserStatus = message.payload.user.isLogined
          ? 'online'
          : 'offline';

        userStatus.textContent = newUserStatus;
        userStatus.classList.remove('_online', '_offline');
        userStatus.classList.add(`_${newUserStatus}`);
      }
    }

    if (message.type === 'USER_ACTIVE') {
      removeAllChildren(onlineUsersList);
      const onlineUsers: UserServerResp[] = message.payload.users;
      appendUsersToUserList(
        onlineUsers,
        onlineUsersList,
        currUserFromSS as string,
      );
    }

    if (message.type === 'USER_INACTIVE') {
      removeAllChildren(offlineUsersList);
      const offlineUsers: UserServerResp[] = message.payload.users;
      appendUsersToUserList(
        offlineUsers,
        offlineUsersList,
        currUserFromSS as string,
      );
    }

    if (message.type === 'MSG_SEND' && message.id === 'send-msg') {
      const msgData: Message = message.payload.message;

      const newMessage = createMessage(
        websocket,
        currUserFromSS as string,
        msgData,
        messagesToWindowChatElem,
      );

      messagesToWindowChatElem.append(newMessage);

      chatWindow.scrollTop = 0;
    }

    if (
      message.type === 'MSG_SEND' &&
      message.id === null &&
      currUserFromSS === message.payload.message.to &&
      userName.textContent === message.payload.message.from
    ) {
      const allChildrenMessages = Array.from(messagesToWindowChatElem.children);

      if (
        !allChildrenMessages.some((item: Element) =>
          (item as HTMLElement).classList.contains('new__message__line'),
        )
      ) {
        messagesToWindowChatElem.append(line);
      }

      const msgData: Message = message.payload.message;

      const newMessage = createMessage(
        websocket,
        currUserFromSS as string,
        msgData,
        messagesToWindowChatElem,
      );

      messagesToWindowChatElem.append(newMessage);

      chatWindow.scrollTop = 0;
    }

    if (message.type === 'MSG_FROM_USER') {
      removeAllChildren(messagesToWindowChatElem);

      const allMessages: Message[] = message.payload.messages;

      let isLineAppend = false;

      allMessages.forEach((msgData: Message) => {
        const newMessage = createMessage(
          websocket,
          currUserFromSS as string,
          msgData,
          messagesToWindowChatElem,
        );

        const isRead = newMessage.getAttribute('read');

        if (
          isRead !== 'true' &&
          !isLineAppend &&
          !newMessage.classList.contains('_you')
        ) {
          messagesToWindowChatElem.append(line);
          isLineAppend = true;
        }

        messagesToWindowChatElem.append(newMessage);
      });

      if (!allMessages.length) {
        messagesToWindowChatElem.append(startDialogueElem);
      }

      const lineExists = messagesToWindowChatElem.contains(line);

      if (lineExists) {
        const chatWindowTop = chatWindow.getBoundingClientRect().top;
        const lineTop = line.getBoundingClientRect().top;

        const scrollAmount = lineTop - chatWindowTop;

        chatWindow.scrollTop += scrollAmount;
      }
    }

    if (message.type === 'MSG_DELETE') {
      const allMsgs = Array.from(messagesToWindowChatElem.children);
      const msgToDelete = message.payload.message.id;

      allMsgs.forEach((msg) => {
        if (msgToDelete === msg.id) {
          msg.remove();
        }
      });

      if (
        allMsgs.length === 1 &&
        !allMsgs[0].classList.contains('start__dialogue')
      ) {
        messagesToWindowChatElem.append(startDialogueElem);
      }
    }

    if (message.type === 'MSG_READ' && message.id === null) {
      const messagesToWindowChatElemChildren = Array.from(
        messagesToWindowChatElem.children,
      );

      messagesToWindowChatElemChildren.forEach((elem) => {
        if (elem.id === message.payload.message.id) {
          const msgStatus = elem.querySelector('.message__status');

          msgStatus!.textContent = 'Read';
        }
      });
    }

    if (message.type === 'MSG_READ') {
      line.remove();
      line = createNewMessagesLineElem(); // MAYBE BETTER TO REMOVE LINE INSTANTLY WITHOUT WAITING SERVER RESPONSE
    }
  });

  userSearch.addEventListener('input', () => {
    const userSearchText = userSearch.value.trim().toLowerCase();

    const onlineUsers = Array.from(onlineUsersList.children);
    const offlineUsers = Array.from(offlineUsersList.children);
    const allUsers = [...onlineUsers, ...offlineUsers];

    allUsers.forEach((item, index) => {
      const currUserName = allUsers[index].textContent?.trim().toLowerCase();

      if (currUserName && !currUserName.includes(userSearchText)) {
        item.classList.add('_hidden');
      } else {
        item.classList.remove('_hidden');
      }
    });
  });

  let userSendMessageTo: string;

  userList.addEventListener('click', async (event) => {
    const currUser = event.target as HTMLElement;

    if (
      currUser &&
      currUser.classList.contains('registered__user') &&
      userName.textContent !== currUser.textContent
    ) {
      const currUserName = currUser.textContent as string;

      userName.textContent = `${currUserName}`;
      userSendMessageTo = currUserName;

      const currUserStatus: string = currUser.classList.contains('_online')
        ? 'online'
        : 'offline';

      userStatus.textContent = `${currUserStatus}`;

      userStatus.classList.remove('_online', '_offline');
      userStatus.classList.add(`_${currUserStatus}`);

      sendRequestToGetMessagesFromUser(websocket, currUserName);

      chatSendMessageForm.classList.remove('_hidden');
      const formInput = chatSendMessageForm.children[0] as HTMLInputElement;
      formInput.value = '';
    }
  });

  chatSendMessageForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const inputElem = form.elements[0] as HTMLInputElement;
    const inputValue = inputElem.value;

    if (
      messagesToWindowChatElem.children[0] &&
      messagesToWindowChatElem.children[0].classList.contains('start__dialogue')
    ) {
      removeAllChildren(messagesToWindowChatElem);
    }

    handleContextMenuAndScroll(websocket, line);
    sendRequestMessageToUser(websocket, userSendMessageTo, inputValue);
  });

  chatWindow.addEventListener('click', () => {
    handleContextMenuAndScroll(websocket, line);
  });

  chatWindow.addEventListener('contextmenu', () => {
    handleContextMenuAndScroll(websocket, line);
  });

  chatWindow.addEventListener('wheel', () => {
    handleContextMenuAndScroll(websocket, line);
  });

  chatWindow.append(messagesToWindowChatElem);

  userSection.append(userSearch, userList);

  return userSection;
}

export default createUserSection;
