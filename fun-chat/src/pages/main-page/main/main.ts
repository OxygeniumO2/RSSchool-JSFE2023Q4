import './main.css';
import createElem from '../../../utils/create-elem';
import createUserSection from './user-section/user-section';
import {
  ChatSectionData,
  createChatSection,
} from './chat-section/chat-section';

function createMain(): HTMLElement {
  const main = createElem({ tagName: 'main' });

  const { section, sectionChildren }: ChatSectionData = createChatSection();

  const userSection = createUserSection(sectionChildren);

  main.append(userSection, section);

  return main;
}

export default createMain;
