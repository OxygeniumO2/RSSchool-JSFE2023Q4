import { GetAllOnlineUsersClientResp } from '../../../../web-socket/web-socket-interfaces';

function sendRequestToGetOnlineUsers(websocket: WebSocket) {
  const messageData: GetAllOnlineUsersClientResp = {
    id: 'online',
    type: 'USER_ACTIVE',
    payload: null,
  };

  websocket.send(JSON.stringify(messageData));
}

export default sendRequestToGetOnlineUsers;
