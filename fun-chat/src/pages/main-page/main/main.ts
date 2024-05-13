import './main.css';
import createElem from '../../../utils/create-elem';
import { createUserSection } from './user-section/user-section';
import {
  ChatSectionData,
  createChatSection,
} from './chat-section/chat-section';

document.addEventListener('click', (event) => {
  const contextMenu = document.querySelector('.context__menu');
  if (contextMenu && !contextMenu.contains(event.target as Node)) {
    contextMenu.remove();
  }
});

function createMain(websocket: WebSocket) {
  const main = createElem({ tagName: 'main' });

  const { section, sectionChildren }: ChatSectionData = createChatSection();

  const userSection = createUserSection(websocket, sectionChildren);

  main.append(userSection, section);

  return main;
}

export default createMain;
