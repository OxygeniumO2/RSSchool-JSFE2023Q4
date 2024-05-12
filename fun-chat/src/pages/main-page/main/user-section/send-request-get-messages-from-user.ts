import WebSocketMessageTypes from '../../../../utils/websocket-msg-types';
import { GetAllMessagesClientResp } from '../../../../web-socket/web-socket-interfaces';

interface Message {
  datetime: number;
  from: string;
  id: string;
  status: {
    isDelivered: boolean;
    isEdited: boolean;
    isReaded: boolean;
  };
  text: string;
  to: string;
}

enum IdRequest {
  Message = 'message',
}

type AllMessages = Message[];

function sendRequestToGetMessagesFromUser(
  websocket: WebSocket,
  currUserName: string,
  msgFrom: string = IdRequest.Message,
) {
  const requestGetMessages: GetAllMessagesClientResp = {
    id: `${msgFrom}`,
    type: WebSocketMessageTypes.MsgFromUser,
    payload: {
      user: {
        login: currUserName,
      },
    },
  };
  websocket.send(JSON.stringify(requestGetMessages));
}

export { sendRequestToGetMessagesFromUser, Message, AllMessages };
