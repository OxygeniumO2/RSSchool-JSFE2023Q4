import createElem from '../../../../utils/create-elem';
import WebSocketMessageTypes from '../../../../utils/websocket-msg-types';

function createContextMenu(websocket: WebSocket, idMsg: string): HTMLElement {
  const menu = createElem({ tagName: 'div', classNames: ['context__menu'] });

  const deleteMessageElem = createElem({
    tagName: 'div',
    classNames: ['delete__message'],
    textContent: 'Delete',
  });
  const modifyMessageElem = createElem({
    tagName: 'div',
    textContent: 'Modify',
  });

  deleteMessageElem.addEventListener('click', () => {
    const msgToDelete = {
      id: 'delete',
      type: WebSocketMessageTypes.msgDelete,
      payload: {
        message: {
          id: idMsg,
        },
      },
    };
    websocket.send(JSON.stringify(msgToDelete));
  });

  modifyMessageElem.addEventListener('click', () => {
    const sendMsgForm = document.querySelector(
      '.send__message__form',
    ) as HTMLFormElement;

    if (!sendMsgForm?.classList.contains('_hidden')) {
      sendMsgForm?.setAttribute('action-type', 'modify');

      menu.style.display = 'none';
      const inputElem = sendMsgForm!.elements[0] as HTMLInputElement;

      const currMsgContainer = menu.parentElement as HTMLElement;
      const currMsgText = currMsgContainer?.children[1].children[0]
        .textContent as string;

      inputElem.value = currMsgText;

      sendMsgForm.setAttribute('currMsgId', currMsgContainer.id);
    }
  });

  menu.append(deleteMessageElem, modifyMessageElem);

  return menu;
}

export default createContextMenu;
