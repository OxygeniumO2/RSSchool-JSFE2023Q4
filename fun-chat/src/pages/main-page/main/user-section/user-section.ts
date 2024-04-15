import './user-section.css';
import createElem from '../../../../utils/create-elem';
import { ChatSectionDataChildren } from '../chat-section/chat-section';

function createUserSection(
  chatSectionChildren: ChatSectionDataChildren,
): HTMLElement {
  const userSection = createElem({ tagName: 'section' });

  const userSearch = createElem({
    tagName: 'input',
    classNames: ['search__user'],
    attributes: [
      ['type', 'text'],
      ['placeholder', 'Search user'],
    ],
  }) as HTMLInputElement;

  const userList = createElem({ tagName: 'div' });

  const userTest = createElem({
    tagName: 'div',
    textContent: 'Vasya',
    classNames: ['registered__user', '_online'],
  });

  const userTest2 = createElem({
    tagName: 'div',
    textContent: 'Petya',
    classNames: ['registered__user', '_offline'],
  });

  userSearch.addEventListener('input', () => {
    const userSearchText = userSearch.value.trim().toLowerCase();
    const allUsers = Array.from(userList.children);

    allUsers.forEach((item, index) => {
      const userName = allUsers[index].textContent?.trim().toLowerCase();

      if (userName && !userName.includes(userSearchText)) {
        item.classList.add('_hidden');
      } else {
        item.classList.remove('_hidden');
      }
    });
  });

  console.log(chatSectionChildren);

  userList.addEventListener('click', (event) => {
    const currUser = event.target as HTMLElement;

    if (currUser && currUser.classList.contains('registered__user')) {
      const chatSectionUserName = chatSectionChildren.userName;
      chatSectionUserName.textContent = `${currUser.textContent}`;
    }
  });

  userList.append(userTest, userTest2);

  userSection.append(userSearch, userList);

  return userSection;
}

export default createUserSection;
