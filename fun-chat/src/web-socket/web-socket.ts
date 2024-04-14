import APP_CONTAINER from '../app-container/app-container';
import createReconnectModal from '../modal-lost-connect/modal';

let isReconnectModalOpen = false;

function createWebSocket(): WebSocket {
  const socket = new WebSocket('ws://localhost:4000');

  const appContainerLastChild = APP_CONTAINER.lastChild as HTMLElement;

  socket.addEventListener('open', () => {
    if (isReconnectModalOpen) {
      APP_CONTAINER.removeChild(appContainerLastChild);
    }
  });

  socket.addEventListener('close', (event) => {
    if (event.wasClean) {
      console.log('Соединение закрыто чисто');
    } else {
      setTimeout(() => {
        createWebSocket();
      }, 1600);
    }
  });

  socket.addEventListener('error', () => {
    if (!isReconnectModalOpen) {
      const modalReconnect = createReconnectModal();
      APP_CONTAINER.append(modalReconnect);
      isReconnectModalOpen = true;
    }
  });

  return socket;
}

export default createWebSocket;
