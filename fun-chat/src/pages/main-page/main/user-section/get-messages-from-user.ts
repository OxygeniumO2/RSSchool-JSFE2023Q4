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

async function getMessagesFromUser(
  websocket: WebSocket,
  currUserName: string,
): Promise<AllMessages> {
  return new Promise((resolve) => {
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

    let allMessages: AllMessages;

    websocket.addEventListener('message', async (event) => {
      const message = JSON.parse(event.data);

      if (message.type === 'MSG_FROM_USER') {
        allMessages = message.payload.messages;
        resolve(allMessages);
      }
    });
  });
}

export default getMessagesFromUser;
