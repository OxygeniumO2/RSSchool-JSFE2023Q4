import collectMessagesToRead from '../user-section/collect-messages-to-read';
import readMessage from '../user-section/send-request-messages-read';
import createNewMessagesLineElem from './new-messages-line';

function handleUnreadMessages(
  websocket: WebSocket,
  line: HTMLElement,
  userNameElem: HTMLElement,
  onlineUsersList: HTMLElement,
  offlineUsersList: HTMLElement,
) {
  const messagesToRead = collectMessagesToRead(line);
  line.remove();

  // eslint-disable-next-line no-param-reassign
  line = createNewMessagesLineElem(); // MAYBE RESP FROM SERVER NEED TO REMOVE LINE AND CREATE NEW ONE

  const onlineUsers = Array.from(onlineUsersList.children);
  const offlineUsers = Array.from(offlineUsersList.children);
  const allUsers = [...onlineUsers, ...offlineUsers];

  allUsers.forEach((user) => {
    if (user.children[0].textContent === userNameElem.textContent) {
      const currUser = user;
      currUser.children[1].textContent = '';
    }
  });

  messagesToRead.forEach((item) => {
    readMessage(websocket, item.id);
  });
}

export default handleUnreadMessages;
