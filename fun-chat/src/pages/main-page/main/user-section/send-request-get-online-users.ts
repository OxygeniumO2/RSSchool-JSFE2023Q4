import WebSocketMessageTypes from '../../../../utils/websocket-msg-types';
import { GetAllOnlineUsersClientResp } from '../../../../web-socket/web-socket-interfaces';

function sendRequestToGetOnlineUsers(websocket: WebSocket) {
  const messageData: GetAllOnlineUsersClientResp = {
    id: 'online',
    type: WebSocketMessageTypes.userActive,
    payload: null,
  };

  websocket.send(JSON.stringify(messageData));
}

export default sendRequestToGetOnlineUsers;
