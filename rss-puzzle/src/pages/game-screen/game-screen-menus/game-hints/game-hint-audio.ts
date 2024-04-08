import './game-hint-audio.css';
import createElem from '../../../../utils/createElem';
import { HINT_CONTAINER } from './game-hint-text';
import { currAudio } from '../../game-screen';

export const HINT_AUDIO_TEXT = 'Audio Hint - ON';
const HINT_AUDIO_TEXT_OFF = 'Audio Hint - OFF';

export const AUDIO_ICO_CONTAINER = createElem({ tagName: 'div', classNames: ['audio__ico-container', '_open'] });
export const AUDIO_ICO = createElem({ tagName: 'img', classNames: ['audio__ico'],
attributes: [ ['src', './img/audio.svg'],
 ['alt', 'sound'] ]});

export function createHintAudioIco() {
  AUDIO_ICO_CONTAINER.append(AUDIO_ICO);
  HINT_CONTAINER.insertAdjacentElement('afterend', AUDIO_ICO_CONTAINER);
}

export function playAudio() {
  const currAudioToPlay = currAudio;
  if (currAudioToPlay) {
    currAudioToPlay.currentTime = 0;
    currAudioToPlay.play();
    AUDIO_ICO.classList.add('_audioPlaying');
    AUDIO_ICO_CONTAINER.classList.add('_showAfter');
    currAudioToPlay.addEventListener('ended', () => {
      AUDIO_ICO.classList.remove('_audioPlaying');
      AUDIO_ICO_CONTAINER.classList.remove('_showAfter');
    });
  }
}

export function createAudioHintBtn() {
  const btn = createElem({ tagName: 'button', classNames: ['btn', 'hint-btn'], textContent: HINT_AUDIO_TEXT });
  btn.addEventListener('click', toggleAudioHint);
  return btn;
}

function toggleAudioHint(this: HTMLElement) {
  this.classList.toggle('_off');
  if (this.textContent === HINT_AUDIO_TEXT) {
    this.textContent = HINT_AUDIO_TEXT_OFF;
    AUDIO_ICO_CONTAINER.classList.remove('_open');
    AUDIO_ICO.classList.add('_hidden');
  } else {
    this.textContent = HINT_AUDIO_TEXT;
    AUDIO_ICO_CONTAINER.classList.add('_open');
    AUDIO_ICO.classList.remove('_hidden');
  }
}
