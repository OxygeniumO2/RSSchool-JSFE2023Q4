import './main.css';
import createElem from '../../../utils/create-elem';
import createUserSection from './user-section/user-section';
import {
  ChatSectionData,
  createChatSection,
} from './chat-section/chat-section';

async function createMain(websocket: WebSocket): Promise<HTMLElement> {
  const main = createElem({ tagName: 'main' });

  const { section, sectionChildren }: ChatSectionData = createChatSection();

  const userSection = createUserSection(websocket, sectionChildren);

  main.append(await userSection, section);

  return main;
}

export default createMain;
