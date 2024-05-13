import IdRequest from '../../../../utils/websocket-custom-id-request';
import WebSocketMessageTypes from '../../../../utils/websocket-msg-types';
import { ReadMessage } from '../../../../web-socket/web-socket-interfaces';

function readMessage(websocket: WebSocket, idMsg: string) {
  const requestData: ReadMessage = {
    id: IdRequest.Read,
    type: WebSocketMessageTypes.MsgRead,
    payload: {
      message: {
        id: idMsg,
      },
    },
  };

  websocket.send(JSON.stringify(requestData));
}

export default readMessage;
