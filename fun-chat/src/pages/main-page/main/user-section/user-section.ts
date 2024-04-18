import './user-section.css';
import createElem from '../../../../utils/create-elem';
import { ChatSectionDataChildren } from '../chat-section/chat-section';
import getOnlineUsers from './get-online-users';
import getOfflineUsers from './get-offline-users';
import { UsersServerResp } from '../../../../web-socket/web-socket-interfaces';
import removeAllChildren from '../../../../utils/remove-all-children';
import SessionStorageKeys from '../../../../utils/session-storage-keys';
import getMessagesFromUser from './get-messages-from-user';
import sendMessageToUser from './send-message';
import formatDateTime from '../../../../utils/format-date';

async function createUserSection(
  websocket: WebSocket,
  chatSectionChildren: ChatSectionDataChildren,
): Promise<HTMLElement> {
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

  if (currUserFromSS) {
    websocket.addEventListener('open', async () => {
      const onlineUsers: UsersServerResp = await getOnlineUsers(websocket);
      const offlineUsers: UsersServerResp = await getOfflineUsers(websocket);
      const allUsers = [...onlineUsers, ...offlineUsers];

      removeAllChildren(userList);

      allUsers.forEach((user) => {
        if (currUserFromSS && currUserFromSS !== user.login) {
          const statusResp = user.isLogined;

          const status = statusResp ? 'online' : 'offline';

          const newUser = createElem({
            tagName: 'div',
            classNames: ['registered__user', `_${status}`],
            textContent: `${user.login}`,
          });

          userList.append(newUser);
        }
      });
    });

    setTimeout(async () => {
      const onlineUsers: UsersServerResp = await getOnlineUsers(websocket);
      const offlineUsers: UsersServerResp = await getOfflineUsers(websocket);
      const allUsers = [...onlineUsers, ...offlineUsers];

      removeAllChildren(userList);

      allUsers.forEach((user) => {
        if (currUserFromSS && currUserFromSS !== user.login) {
          const statusResp = user.isLogined;

          const status = statusResp ? 'online' : 'offline';

          const newUser = createElem({
            tagName: 'div',
            classNames: ['registered__user', `_${status}`],
            textContent: `${user.login}`,
          });

          userList.append(newUser);
        }
      });
    }, 0);
  }

  const { chatSendMessageForm, chatWindow, userName, userStatus } =
    chatSectionChildren;

  const messagesToWindowChatElem = createElem({ tagName: 'div' });

  websocket.addEventListener('message', async (event) => {
    const message = JSON.parse(event.data);

    if (
      message.type === 'USER_EXTERNAL_LOGIN' ||
      message.type === 'USER_LOGIN' ||
      message.type === 'USER_EXTERNAL_LOGOUT'
    ) {
      const onlineUsers: UsersServerResp = await getOnlineUsers(websocket);
      const offlineUsers: UsersServerResp = await getOfflineUsers(websocket);

      const allUsers = [...onlineUsers, ...offlineUsers];

      removeAllChildren(userList);

      allUsers.forEach((user) => {
        if (currUserFromSS && currUserFromSS !== user.login) {
          const statusResp = user.isLogined;

          const status = statusResp ? 'online' : 'offline';

          const newUser = createElem({
            tagName: 'div',
            classNames: ['registered__user', `_${status}`],
            textContent: `${user.login}`,
          });

          userList.append(newUser);
        }
      });

      console.log(userList);
    }

    if (
      message.type === 'MSG_SEND' &&
      ((currUserFromSS === message.payload.message.from &&
        userName.textContent === message.payload.message.to) ||
        (currUserFromSS === message.payload.message.to &&
          userName.textContent === message.payload.message.from))
    ) {
      const { from, to, text, datetime, status } = message.payload.message;

      const msgContainer = createElem({
        tagName: 'div',
        classNames: ['message-container'],
      });

      const userText = currUserFromSS === from ? 'you' : from;

      const userNameDateContainer = createElem({
        tagName: 'div',
        classNames: ['username__date-container'],
      });

      const userNameElem = createElem({
        tagName: 'div',
        textContent: `${userText}`,
      });

      const msgDate = formatDateTime(datetime);

      const msgDateElem = createElem({
        tagName: 'div',
        textContent: `${msgDate}`,
      });

      userNameDateContainer.append(userNameElem, msgDateElem);

      const msgElem = createElem({
        tagName: 'div',
        classNames: ['message'],
        textContent: `${text}`,
      });

      msgContainer.append(userNameDateContainer, msgElem);

      messagesToWindowChatElem.append(msgContainer);
      console.log(to, status);
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

      const allMessages = await getMessagesFromUser(websocket, currUserName);

      console.log(allMessages);
    }
  });

  chatSendMessageForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const inputElem = form.elements[0] as HTMLInputElement;
    const inputValue = inputElem.value;

    sendMessageToUser(websocket, userSendMessageTo, inputValue);
  });

  chatWindow.append(messagesToWindowChatElem);

  userSection.append(userSearch, userList);

  return userSection;
}

export default createUserSection;
