import { Message } from './send-request-get-messages-from-user';

function updateUnreadMessagesInterface(
  messages: Message[],
  onlineUsersList: HTMLElement,
  offlineUsersList: HTMLElement,
) {
  const onlineUsers = Array.from(onlineUsersList.children);
  const offlineUsers = Array.from(offlineUsersList.children);
  const allUsers = [...onlineUsers, ...offlineUsers];

  const unreadMessagesCount: { [userName: string]: number } = {};

  allUsers.forEach((user) => {
    const userName = user.textContent || '';
    if (!(userName in unreadMessagesCount)) {
      unreadMessagesCount[userName] = 0;
    }
  });

  messages.forEach((msg: Message) => {
    if (!msg.status.isReaded) {
      unreadMessagesCount[msg.from] += 1;
    }
  });

  allUsers.forEach((user) => {
    const userName = user.textContent || '';
    const numOfUnreadMessagesElem = user.children[1];

    if (userName && numOfUnreadMessagesElem) {
      if (!numOfUnreadMessagesElem.textContent) {
        const unreadCount = unreadMessagesCount[userName];
        numOfUnreadMessagesElem.textContent = `${unreadCount || ''}`;
      }
    }
  });
}

export default updateUnreadMessagesInterface;
