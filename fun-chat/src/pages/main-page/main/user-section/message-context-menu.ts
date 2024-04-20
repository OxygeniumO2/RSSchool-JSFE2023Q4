import createElem from '../../../../utils/create-elem';

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
      type: 'MSG_DELETE',
      payload: {
        message: {
          id: idMsg,
        },
      },
    };
    websocket.send(JSON.stringify(msgToDelete));
  });

  menu.append(deleteMessageElem, modifyMessageElem);

  return menu;
}

export default createContextMenu;
