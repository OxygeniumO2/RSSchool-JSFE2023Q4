import IdRequest from '../../../../utils/websocket-custom-id-request';
import WebSocketMessageTypes from '../../../../utils/websocket-msg-types';
import { SendMessageToUserData } from '../../../../web-socket/web-socket-interfaces';

function sendMessage(websocket: WebSocket, user: string, textMessage: string) {
  const data: SendMessageToUserData = {
    id: IdRequest.SendMsg,
    type: WebSocketMessageTypes.MsgSend,
    payload: {
      message: {
        to: user,
        text: textMessage,
      },
    },
  };

  websocket.send(JSON.stringify(data));
}

export default sendMessage;
