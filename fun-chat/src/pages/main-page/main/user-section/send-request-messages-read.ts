import WebSocketMessageTypes from '../../../../utils/websocket-msg-types';

function sendRequestMessageRead(websocket: WebSocket, idMsg: string) {
  const requestData = {
    id: 'read',
    type: WebSocketMessageTypes.msgRead,
    payload: {
      message: {
        id: idMsg,
      },
    },
  };

  websocket.send(JSON.stringify(requestData));
}

export default sendRequestMessageRead;
