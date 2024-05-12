import WebSocketMessageTypes from '../../../../utils/websocket-msg-types';
import { GetAllOfflineUsersClientResp } from '../../../../web-socket/web-socket-interfaces';

function sendRequestToGetOfflineUsers(websocket: WebSocket) {
  const messageData: GetAllOfflineUsersClientResp = {
    id: 'offline',
    type: WebSocketMessageTypes.userInactive,
    payload: null,
  };

  websocket.send(JSON.stringify(messageData));
}

export default sendRequestToGetOfflineUsers;
