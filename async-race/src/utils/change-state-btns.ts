function changeBtnsState(state: boolean) {
  const driveCarBtns = document.querySelectorAll('.btn');
  driveCarBtns.forEach((btn) => {
    const currBtn = btn as HTMLButtonElement;
    currBtn.disabled = !state;
  });
}

export default changeBtnsState;
