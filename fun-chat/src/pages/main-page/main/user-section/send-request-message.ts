import WebSocketMessageTypes from '../../../../utils/websocket-msg-types';

interface SendMessageToUserData {
  id: string;
  type: WebSocketMessageTypes.MsgSend;
  payload: {
    message: {
      to: string;
      text: string;
    };
  };
}

function sendRequestMessageToUser(
  websocket: WebSocket,
  user: string,
  textMessage: string,
) {
  const data: SendMessageToUserData = {
    id: 'send-msg',
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

export default sendRequestMessageToUser;
