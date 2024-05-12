import WebSocketMessageTypes from '../../../../utils/websocket-msg-types';

function sendRequestToModifyMessage(
  websocket: WebSocket,
  msgId: string,
  newTextMsg: string,
) {
  const requestData = {
    id: 'modify-msg',
    type: WebSocketMessageTypes.msgEdit,
    payload: {
      message: {
        id: msgId,
        text: newTextMsg,
      },
    },
  };

  websocket.send(JSON.stringify(requestData));
}

export default sendRequestToModifyMessage;
