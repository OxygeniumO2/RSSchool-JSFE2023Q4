import WebSocketMessageTypes from '../../../../utils/websocket-msg-types';

function editMessage(websocket: WebSocket, msgId: string, newTextMsg: string) {
  const requestData = {
    id: 'modify-msg',
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
