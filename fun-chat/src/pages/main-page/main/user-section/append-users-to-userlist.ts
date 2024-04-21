import createElem from '../../../../utils/create-elem';
import { UserServerResp } from '../../../../web-socket/web-socket-interfaces';

function appendUsersToUserList(
  users: UserServerResp[],
  userList: HTMLElement,
  currUserFromSS: string,
) {
  users.forEach((user) => {
    if (currUserFromSS && currUserFromSS !== user.login) {
      const statusResp = user.isLogined;

      const status = statusResp ? 'online' : 'offline';

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
    }
  });
}

export default appendUsersToUserList;
