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

function sendRequestToGetMessagesFromUser(
  websocket: WebSocket,
  currUserName: string,
  msgFrom: string = 'message',
) {
  const requestGetMessages: GetAllMessagesClientResp = {
    id: `${msgFrom}`,
    type: 'MSG_FROM_USER',
    payload: {
      user: {
        login: currUserName,
      },
    },
  };
  websocket.send(JSON.stringify(requestGetMessages));
}

export { sendRequestToGetMessagesFromUser, Message, AllMessages };
