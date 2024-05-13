import WebSocketMessageTypes from '../../../../utils/websocket-msg-types';
import { GetAllOnlineUsersClientResp } from '../../../../web-socket/web-socket-interfaces';

function getOnlineUsers(websocket: WebSocket) {
  const messageData: GetAllOnlineUsersClientResp = {
    id: 'online',
    type: WebSocketMessageTypes.UserActive,
    payload: null,
  };

  websocket.send(JSON.stringify(messageData));
}

export default getOnlineUsers;
