import './user-section.css';
import createElem from '../../../../utils/create-elem';
import { ChatSectionDataChildren } from '../chat-section/chat-section';
import getOnlineUsers from './get-online-users';
import getOfflineUsers from './get-offline-users';
import { UsersServerResp } from '../../../../web-socket/web-socket-interfaces';
import removeAllChildren from '../../../../utils/remove-all-children';
import SessionStorageKeys from '../../../../utils/session-storage-keys';

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
  }

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
    }
  });

  userSearch.addEventListener('input', () => {
    const userSearchText = userSearch.value.trim().toLowerCase();
    const allUsers = Array.from(userList.children);

    allUsers.forEach((item, index) => {
      const userName = allUsers[index].textContent?.trim().toLowerCase();

      if (userName && !userName.includes(userSearchText)) {
        item.classList.add('_hidden');
      } else {
        item.classList.remove('_hidden');
      }
    });
  });

  userList.addEventListener('click', (event) => {
    const currUser = event.target as HTMLElement;

    if (currUser && currUser.classList.contains('registered__user')) {
      const { userName, userStatus } = chatSectionChildren;
      userName.textContent = `${currUser.textContent}`;

      const currUserStatus: string = currUser.classList.contains('_online')
        ? 'online'
        : 'offline';

      userStatus.textContent = `${currUserStatus}`;

      userStatus.classList.remove('_online', '_offline');
      userStatus.classList.add(`_${currUserStatus}`);
    }
  });

  userSection.append(userSearch, userList);

  return userSection;
}

export default createUserSection;
