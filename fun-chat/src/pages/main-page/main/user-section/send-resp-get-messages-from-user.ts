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

function sendRespToGetMessagesFromUser(
  websocket: WebSocket,
  currUserName: string,
) {
  const respGetMessages: GetAllMessagesClientResp = {
    id: 'messages',
    type: 'MSG_FROM_USER',
    payload: {
      user: {
        login: currUserName,
      },
    },
  };
  websocket.send(JSON.stringify(respGetMessages));
}

export { sendRespToGetMessagesFromUser, Message, AllMessages };
