import collectMessagesToRead from '../user-section/collect-messages-to-read';
import sendRequestMessageRead from '../user-section/send-request-messages-read';
import createNewMessagesLineElem from './new-messages-line';

function handleContextMenuAndScroll(websocket: WebSocket, line: HTMLElement) {
  const messagesToRead = collectMessagesToRead(line);
  line.remove();

  // eslint-disable-next-line no-param-reassign
  line = createNewMessagesLineElem(); // MAYBE RESP FROM SERVER NEED TO REMOVE LINE AND CREATE NEW ONE

  messagesToRead.forEach((item) => {
    sendRequestMessageRead(websocket, item.id);
  });
}

export default handleContextMenuAndScroll;
