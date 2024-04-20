function sendRequestMessageRead(websocket: WebSocket, idMsg: string) {
  const requestData = {
    id: 'read',
    type: 'MSG_READ',
    payload: {
      message: {
        id: idMsg,
      },
    },
  };

  websocket.send(JSON.stringify(requestData));
}

export default sendRequestMessageRead;
