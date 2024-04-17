import {
  GetAllOnlineUsersClientResp,
  UsersServerResp,
} from '../../../../web-socket/web-socket-interfaces';

function getOnlineUsers(websocket: WebSocket): Promise<UsersServerResp> {
  return new Promise((resolve) => {
    const messageData: GetAllOnlineUsersClientResp = {
      id: 'offline',
      type: 'USER_ACTIVE',
      payload: null,
    };

    websocket.send(JSON.stringify(messageData));

    websocket.addEventListener('message', (event) => {
      const message = JSON.parse(event.data);

      if (message.type === 'USER_ACTIVE') {
        const onlineUsers: UsersServerResp = message.payload.users;
        resolve(onlineUsers);
      }
    });
  });
}

export default getOnlineUsers;
