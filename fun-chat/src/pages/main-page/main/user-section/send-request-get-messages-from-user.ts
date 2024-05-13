import IdRequest from '../../../../utils/websocket-custom-id-request';
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

type AllMessages = Message[];

function getMessages(
  websocket: WebSocket,
  currUserName: string,
  msgFrom: string = IdRequest.Message,
) {
  const getMessagesPayload: GetAllMessagesClientResp = {
    id: msgFrom,
    type: WebSocketMessageTypes.MsgFromUser,
    payload: {
      user: {
        login: currUserName,
      },
    },
  };
  websocket.send(JSON.stringify(getMessagesPayload));
}

export { getMessages, Message, AllMessages };
