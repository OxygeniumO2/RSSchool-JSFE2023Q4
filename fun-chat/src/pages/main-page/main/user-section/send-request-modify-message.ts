import IdRequest from '../../../../utils/websocket-custom-id-request';
import WebSocketMessageTypes from '../../../../utils/websocket-msg-types';

function editMessage(websocket: WebSocket, msgId: string, newTextMsg: string) {
  const requestData = {
    id: IdRequest.ModifyMsg,
    type: WebSocketMessageTypes.MsgEdit,
    payload: {
      message: {
        id: msgId,
        text: newTextMsg,
      },
    },
  };

  websocket.send(JSON.stringify(requestData));
}

export default editMessage;
