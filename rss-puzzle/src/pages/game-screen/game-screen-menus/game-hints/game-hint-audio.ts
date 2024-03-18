import './game-hint-audio.css';
import { createElem } from '../../../../utils/createElem';
import { HINT_CONTAINER } from './game-hint-text';
import { currAudio } from '../../game-screen';

export const AUDIO_ICO_CONTAINER = createElem({ tag: 'div', classesCss: ['audio__ico-container', '_open'] });
export const AUDIO_ICO = createElem({ tag: 'img', classesCss: ['audio__ico'], src: './img/audio.svg', alt: 'sound' });
export function createHintAudioIco() {
  AUDIO_ICO_CONTAINER.append(AUDIO_ICO);
  HINT_CONTAINER.insertAdjacentElement('afterend', AUDIO_ICO_CONTAINER);
}

export function playAudio(this: HTMLElement) {
  console.log(this, 'sas');
  const currAudioToPlay = currAudio;
  console.log(currAudioToPlay);
  if (currAudioToPlay) {
    currAudioToPlay.currentTime = 0;
    currAudioToPlay.play();
  }
}
