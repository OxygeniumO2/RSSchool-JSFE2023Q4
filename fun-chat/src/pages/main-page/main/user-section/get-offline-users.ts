import {
  GetAllOfflineUsersClientResp,
  UsersServerResp,
} from '../../../../web-socket/web-socket-interfaces';

function getOfflineUsers(websocket: WebSocket): Promise<UsersServerResp> {
  return new Promise((resolve) => {
    const messageData: GetAllOfflineUsersClientResp = {
      id: 'offline',
      type: 'USER_INACTIVE',
      payload: null,
    };

    websocket.send(JSON.stringify(messageData));

    websocket.addEventListener('message', (event) => {
      const message = JSON.parse(event.data);

      if (message.type === 'USER_INACTIVE') {
        const offlineUsers: UsersServerResp = message.payload.users;
        resolve(offlineUsers);
      }
    });
  });
}

export default getOfflineUsers;
