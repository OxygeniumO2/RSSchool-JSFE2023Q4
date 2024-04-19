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
  sendRespToGetMessagesFromUser,
} from './send-resp-get-messages-from-user';
import sendRespToGetOnlineUsers from './send-resp-get-online-users';
import sendRespToGetOfflineUsers from './send-resp-get-offline-users';
import sendMessageToUser from './send-resp-message';

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
      sendRespToGetOnlineUsers(websocket);
      sendRespToGetOfflineUsers(websocket);

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
      removeAllChildren(userList);
      const onlineUsers: UserServerResp[] = message.payload.users;
      appendUsersToUserList(onlineUsers, userList, currUserFromSS as string);
    }

    if (message.type === 'USER_INACTIVE') {
      const offlineUsers: UserServerResp[] = message.payload.users;
      appendUsersToUserList(offlineUsers, userList, currUserFromSS as string);
    }

    if (
      message.type === 'MSG_SEND' &&
      ((currUserFromSS === message.payload.message.from &&
        userName.textContent === message.payload.message.to) ||
        (currUserFromSS === message.payload.message.to &&
          userName.textContent === message.payload.message.from))
    ) {
      const msgData: Message = message.payload.message;

      const newMessage = createMessage(currUserFromSS as string, msgData);

      messagesToWindowChatElem.append(newMessage);
    }

    if (message.type === 'MSG_FROM_USER') {
      removeAllChildren(messagesToWindowChatElem);

      const allMessages: Message[] = message.payload.messages;

      allMessages.forEach((msgData: Message) => {
        const newMessage = createMessage(currUserFromSS as string, msgData);
        messagesToWindowChatElem.append(newMessage);
      });

      if (!allMessages.length) {
        messagesToWindowChatElem.append(startDialogueElem);
      }
    }
  });

  userSearch.addEventListener('input', () => {
    const userSearchText = userSearch.value.trim().toLowerCase();
    const allUsers = Array.from(userList.children);

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

    if (currUser && currUser.classList.contains('registered__user')) {
      const currUserName = currUser.textContent as string;

      userName.textContent = `${currUserName}`;
      userSendMessageTo = currUserName;

      const currUserStatus: string = currUser.classList.contains('_online')
        ? 'online'
        : 'offline';

      userStatus.textContent = `${currUserStatus}`;

      userStatus.classList.remove('_online', '_offline');
      userStatus.classList.add(`_${currUserStatus}`);

      sendRespToGetMessagesFromUser(websocket, currUserName);

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
      messagesToWindowChatElem.children[0].classList.contains('start__dialogue')
    ) {
      removeAllChildren(messagesToWindowChatElem);
    }

    sendMessageToUser(websocket, userSendMessageTo, inputValue);
  });

  chatWindow.append(messagesToWindowChatElem);

  userSection.append(userSearch, userList);

  return userSection;
}

export default createUserSection;
