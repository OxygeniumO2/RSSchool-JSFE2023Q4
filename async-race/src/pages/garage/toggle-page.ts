const TO_WINNERS_BTN_TEXT = 'To Winners';

function togglePage(btn: HTMLElement) {
  const garage = document.querySelector('.garage');
  const winners = document.querySelector('.winners');

  if (btn.textContent === TO_WINNERS_BTN_TEXT) {
    garage?.classList.add('_hidden');
    winners?.classList.remove('_hidden');
  } else {
    garage?.classList.remove('_hidden');
    winners?.classList.add('_hidden');
  }
}

export default togglePage;
