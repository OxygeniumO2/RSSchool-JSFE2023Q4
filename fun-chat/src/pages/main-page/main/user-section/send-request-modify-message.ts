function sendRequestToModifyMessage(
  websocket: WebSocket,
  msgId: string,
  newTextMsg: string,
) {
  const requestData = {
    id: 'modify-msg',
    type: 'MSG_EDIT',
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
