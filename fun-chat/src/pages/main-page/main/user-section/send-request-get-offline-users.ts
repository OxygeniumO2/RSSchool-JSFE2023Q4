import { GetAllOfflineUsersClientResp } from '../../../../web-socket/web-socket-interfaces';

function sendRespToGetOfflineUsers(websocket: WebSocket) {
  const messageData: GetAllOfflineUsersClientResp = {
    id: 'offline',
    type: 'USER_INACTIVE',
    payload: null,
  };

  websocket.send(JSON.stringify(messageData));
}

export default sendRespToGetOfflineUsers;
