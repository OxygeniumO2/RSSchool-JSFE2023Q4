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
import handleUnreadMessages from '../chat-section/chat-window-new-messages-handler';
import updateUnreadMessagesInterface from './messages-unread-update';
import sendRequestToModifyMessage from './send-request-modify-message';
import WebSocketMessageTypes from '../../../../utils/websocket-msg-types';

let currUserFromSS = sessionStorage.getItem(SessionStorageKeys.login);
let userSendMessageTo: string;

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

  const userList = createElem({ tagName: 'div', classNames: ['total__users'] });

  const onlineUsersList = createElem({ tagName: 'div' });
  const offlineUsersList = createElem({ tagName: 'div' });

  userList.append(onlineUsersList, offlineUsersList);

  currUserFromSS = sessionStorage.getItem(SessionStorageKeys.login);

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
      message.type === WebSocketMessageTypes.userExternalLogin ||
      message.type === WebSocketMessageTypes.userLogin ||
      message.type === WebSocketMessageTypes.userExternalLogout
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

    if (message.type === WebSocketMessageTypes.userActive) {
      removeAllChildren(onlineUsersList);
      const onlineUsers: UserServerResp[] = message.payload.users;
      appendUsersToUserList(
        websocket,
        onlineUsers,
        onlineUsersList,
        currUserFromSS as string,
      );

      // onlineUsers.forEach((user) => {
      //   if (currUserFromSS !== user.login) {
      //     sendRequestToGetMessagesFromUser(websocket, user.login);  Maybe it's better to send requests after full build of users
      //   }
      // });
    }

    if (message.type === WebSocketMessageTypes.userInactive) {
      removeAllChildren(offlineUsersList);
      const offlineUsers: UserServerResp[] = message.payload.users;
      appendUsersToUserList(
        websocket,
        offlineUsers,
        offlineUsersList,
        currUserFromSS as string,
      );

      // offlineUsers.forEach((user) => {
      //   if (currUserFromSS !== user.login) {
      //     sendRequestToGetMessagesFromUser(websocket, user.login);  Maybe it's better to send requests after full build of users
      //   }
      // });
    }

    if (
      message.type === WebSocketMessageTypes.msgSend &&
      message.id === 'send-msg'
    ) {
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
      message.type === WebSocketMessageTypes.msgSend &&
      message.id === null &&
      currUserFromSS === message.payload.message.to &&
      userName.textContent === message.payload.message.from
    ) {
      const allChildrenMessages = Array.from(messagesToWindowChatElem.children);

      if (allChildrenMessages[0].classList.contains('start__dialogue')) {
        allChildrenMessages[0].remove();
      }

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

      const lineExists = messagesToWindowChatElem.contains(line);

      if (lineExists) {
        const chatWindowTop = chatWindow.getBoundingClientRect().top;
        const lineTop = line.getBoundingClientRect().top;

        const scrollAmount = lineTop - chatWindowTop;

        chatWindow.scrollTop += scrollAmount;
      }
    }

    if (message.type === WebSocketMessageTypes.msgSend && message.id === null) {
      const onlineUsers = Array.from(onlineUsersList.children);
      const offlineUsers = Array.from(offlineUsersList.children);
      const allUsers = [...onlineUsers, ...offlineUsers];

      allUsers.forEach((user) => {
        if (user.children[0].textContent === message.payload.message.from) {
          const currUser = user;

          let currUnreadValueNumber: number = Number(
            user.children[1].textContent,
          );

          currUnreadValueNumber += 1;
          currUser.children[1].textContent = currUnreadValueNumber.toString();
        }
      });
    }

    if (
      message.type === WebSocketMessageTypes.msgFromUser &&
      userName.textContent &&
      message.id === userName.textContent
    ) {
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

    if (message.type === WebSocketMessageTypes.msgFromUser) {
      updateUnreadMessagesInterface(
        message.payload.messages,
        onlineUsersList,
        offlineUsersList,
      );
    }

    if (message.type === WebSocketMessageTypes.msgDelete) {
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

      if (
        allMsgs.length === 2 &&
        allMsgs[0].classList.contains('new__message__line')
      ) {
        line.remove();
        line = createNewMessagesLineElem();
        messagesToWindowChatElem.append(startDialogueElem);
      }

      if (
        allMsgs[allMsgs.length - 2] &&
        allMsgs[allMsgs.length - 2].classList.contains('new__message__line')
      ) {
        line.remove();
        line = createNewMessagesLineElem();
      }
    }

    if (
      message.type === WebSocketMessageTypes.msgDelete &&
      message.id === null
    ) {
      if (
        messagesToWindowChatElem.children[0] &&
        messagesToWindowChatElem.children[0].classList.contains(
          'new__message__line',
        )
      ) {
        messagesToWindowChatElem.append(startDialogueElem);
      }
    }

    if (message.type === WebSocketMessageTypes.msgRead && message.id === null) {
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

    // if (message.type === 'MSG_READ') {
    //   line.remove();
    //   line = createNewMessagesLineElem(); // MAYBE BETTER TO REMOVE LINE INSTANTLY WITHOUT WAITING SERVER RESPONSE
    // }

    if (
      message.type === WebSocketMessageTypes.msgDeliver &&
      userName.textContent
    ) {
      const allMsgsInContainer = Array.from(messagesToWindowChatElem.children);

      allMsgsInContainer.forEach((msg) => {
        if (msg.id === message.payload.message.id) {
          const msgInfoStatus = msg.querySelector('.message__status');
          const newStatus =
            msgInfoStatus?.textContent !== 'Read'
              ? 'Delivered'
              : msgInfoStatus.textContent;
          msgInfoStatus!.textContent = newStatus;
        }
      });
    }

    if (
      message.type === WebSocketMessageTypes.msgEdit &&
      message.id === null &&
      userName.textContent
    ) {
      const allMsgsInContainer = Array.from(messagesToWindowChatElem.children);

      allMsgsInContainer.forEach((msg) => {
        if (msg.id === message.payload.message.id) {
          const msgInfoModified = msg.querySelector(
            '.message__status__modified',
          );
          msgInfoModified!.textContent = 'Edited';

          const currMsg = msg.querySelector('.message')?.children[0];
          currMsg!.innerHTML = `<pre>${message.payload.message.text}</pre>`;
        }
      });
    }

    if (
      message.type === WebSocketMessageTypes.msgEdit &&
      message.id === 'modify-msg'
    ) {
      const allMessages = Array.from(messagesToWindowChatElem.children);
      const msgToModify = allMessages.find(
        (msg) => msg.id === message.payload.message.id,
      );

      if (msgToModify) {
        const msgToModifyTextContainer = msgToModify.querySelector('.message');
        msgToModifyTextContainer!.innerHTML = `<pre>${message.payload.message.text}</pre>`;
      }
    }
  });

  userSearch.addEventListener('input', () => {
    const userSearchText = userSearch.value.trim().toLowerCase();

    const onlineUsers = Array.from(onlineUsersList.children);
    const offlineUsers = Array.from(offlineUsersList.children);
    const allUsers = [...onlineUsers, ...offlineUsers];

    allUsers.forEach((item, index) => {
      const currUserName = allUsers[index].children[0].textContent
        ?.trim()
        .toLowerCase();

      if (currUserName && !currUserName.includes(userSearchText)) {
        item.classList.add('_hidden');
      } else {
        item.classList.remove('_hidden');
      }
    });
  });

  userList.addEventListener('click', (event) => {
    const currUser = event.target as HTMLElement;
    chatSendMessageForm.setAttribute('action-type', 'send');

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

      sendRequestToGetMessagesFromUser(
        websocket,
        currUserName,
        userName.textContent,
      );

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

    const startDialogue = messagesToWindowChatElem.children[0];
    if (startDialogue && startDialogue.classList.contains('start__dialogue')) {
      removeAllChildren(messagesToWindowChatElem);
    }

    handleUnreadMessages(
      websocket,
      line,
      userName,
      onlineUsersList,
      offlineUsersList,
    );

    const formActionType = chatSendMessageForm.getAttribute('action-type');

    if (formActionType === 'send') {
      sendRequestMessageToUser(websocket, userSendMessageTo, inputValue);
    } else {
      const msgIdToModify = chatSendMessageForm.getAttribute(
        'currMsgId',
      ) as string;
      sendRequestToModifyMessage(websocket, msgIdToModify, inputValue);

      const allMsgs = Array.from(messagesToWindowChatElem.children);

      allMsgs.forEach((msg) => {
        if (msg.id === msgIdToModify) {
          const modifyElem = msg.querySelector('.message__status__modified');
          modifyElem!.textContent = 'Edited';
        }
      });

      chatSendMessageForm.setAttribute('action-type', 'send');
    }

    inputElem.value = '';
  });

  chatWindow.addEventListener('click', () => {
    handleUnreadMessages(
      websocket,
      line,
      userName,
      onlineUsersList,
      offlineUsersList,
    );
  });

  chatWindow.addEventListener('contextmenu', () => {
    handleUnreadMessages(
      websocket,
      line,
      userName,
      onlineUsersList,
      offlineUsersList,
    );
  });

  chatWindow.addEventListener(
    'wheel',
    () => {
      handleUnreadMessages(
        websocket,
        line,
        userName,
        onlineUsersList,
        offlineUsersList,
      );
    },
    { passive: true },
  );

  chatWindow.append(messagesToWindowChatElem);

  userSection.append(userSearch, userList);

  return userSection;
}

export default createUserSection;
