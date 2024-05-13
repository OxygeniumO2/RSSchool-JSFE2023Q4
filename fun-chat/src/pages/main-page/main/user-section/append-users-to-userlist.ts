import createElem from '../../../../utils/create-elem';
import { UserServerResp } from '../../../../web-socket/web-socket-interfaces';
import { getMessages } from './send-request-get-messages-from-user';

enum UserStatus {
  Online = 'online',
  Offline = 'offline',
}

function addUsers(
  websocket: WebSocket,
  users: UserServerResp[],
  userList: HTMLElement,
  currUserFromSS: string,
) {
  users.forEach((user) => {
    if (currUserFromSS && currUserFromSS !== user.login) {
      const statusResp = user.isLogined;

      const status = statusResp ? UserStatus.Online : UserStatus.Offline;

      const userContainer = createElem({
        tagName: 'div',
        classNames: ['user-container'],
      });

      const newUser = createElem({
        tagName: 'div',
        classNames: ['registered__user', `_${status}`],
        textContent: `${user.login}`,
      });

      const unreadMessagesElem = createElem({
        tagName: 'div',
        classNames: ['unread__messages'],
      });

      userContainer.append(newUser, unreadMessagesElem);

      userList.append(userContainer);

      getMessages(websocket, user.login); // Maybe it's better to send requests after full build of users
    }
  });
}

export { addUsers, UserStatus };
