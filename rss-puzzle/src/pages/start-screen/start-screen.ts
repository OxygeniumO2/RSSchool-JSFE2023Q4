import './start-screen.css';
import { container } from '../../app-container/container';
import { createElem } from '../../utils/createElem';

const START_SCREEN_TITLE = 'RSS PUZZLE';
const START_SCREEN_DESC = 'You can learn English by clicking on words';

function generateStartScreen() {
  const startScreen = createElem({ tag: 'div', classesCss: ['start__screen'] });
  const startScreenTitle = createElem({
    tag: 'h1',
    classesCss: ['start__screen__title'],
    textContent: START_SCREEN_TITLE,
  });
  const startScreenDesc = createElem({ tag: 'p', classesCss: ['start__screen__desc'], textContent: START_SCREEN_DESC });
  startScreen.append(startScreenTitle, startScreenDesc);
  container.append(startScreen);
}

export default generateStartScreen;
