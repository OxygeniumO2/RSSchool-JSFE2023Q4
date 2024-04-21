import { Message } from './send-request-get-messages-from-user';

function updateUnreadMessagesInterface(
  messages: Message[],
  onlineUsersList: HTMLElement,
  offlineUsersList: HTMLElement,
) {
  const onlineUsers = Array.from(onlineUsersList.children);
  const offlineUsers = Array.from(offlineUsersList.children);
  const allUsers = [...onlineUsers, ...offlineUsers];

  allUsers.forEach((user) => {
    const currUserName = user.children[0].textContent;
    let countOfUnreadMessages = 0;

    messages.forEach((msg: Message) => {
      if (msg.from === currUserName && !msg.status.isReaded) {
        countOfUnreadMessages += 1;
      }
    });

    const numOfUnreadMessagesElem = user.children[1];

    if (numOfUnreadMessagesElem && !numOfUnreadMessagesElem.textContent) {
      numOfUnreadMessagesElem.textContent = `${countOfUnreadMessages === 0 ? '' : countOfUnreadMessages}`;
    }
  });
}

export default updateUnreadMessagesInterface;
