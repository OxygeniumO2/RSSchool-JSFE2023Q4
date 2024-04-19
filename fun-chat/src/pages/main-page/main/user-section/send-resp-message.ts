interface SendMessageToUserData {
  id: string;
  type: 'MSG_SEND';
  payload: {
    message: {
      to: string;
      text: string;
    };
  };
}

function sendMessageToUser(
  websocket: WebSocket,
  user: string,
  textMessage: string,
) {
  const data: SendMessageToUserData = {
    id: 'send-msg',
    type: 'MSG_SEND',
    payload: {
      message: {
        to: user,
        text: textMessage,
      },
    },
  };

  websocket.send(JSON.stringify(data));
}

export default sendMessageToUser;
