function setStateMainPagesBtns(state: boolean) {
  const toGarageBtn = document.querySelector(
    '.to__garage-btn',
  ) as HTMLButtonElement;
  const toWinnersBtn = document.querySelector(
    '.to__winners-btn',
  ) as HTMLButtonElement;
  toGarageBtn.disabled = !state;
  toWinnersBtn.disabled = !state;
}

export default setStateMainPagesBtns;
