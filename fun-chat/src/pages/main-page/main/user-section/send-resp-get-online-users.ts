import { GetAllOnlineUsersClientResp } from '../../../../web-socket/web-socket-interfaces';

function sendRespToGetOnlineUsers(websocket: WebSocket) {
  const messageData: GetAllOnlineUsersClientResp = {
    id: 'offline',
    type: 'USER_ACTIVE',
    payload: null,
  };

  websocket.send(JSON.stringify(messageData));
}

export default sendRespToGetOnlineUsers;
