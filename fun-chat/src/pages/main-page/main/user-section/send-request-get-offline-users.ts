import WebSocketMessageTypes from '../../../../utils/websocket-msg-types';
import { GetAllOfflineUsersClientResp } from '../../../../web-socket/web-socket-interfaces';

function getOfflineUsers(websocket: WebSocket) {
  const messageData: GetAllOfflineUsersClientResp = {
    id: 'offline',
    type: WebSocketMessageTypes.UserInactive,
    payload: null,
  };

  websocket.send(JSON.stringify(messageData));
}

export default getOfflineUsers;
