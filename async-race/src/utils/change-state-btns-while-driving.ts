function changeStateBtnWhileDriving(state: boolean) {
  const allBtns = document.querySelectorAll('.btn');
  allBtns.forEach((btn) => {
    const currBtn = btn as HTMLButtonElement;
    if (
      !(
        currBtn.classList.contains('drive__car') ||
        currBtn.classList.contains('stop__car') ||
        currBtn.classList.contains('reset__race-btn')
      )
    ) {
      currBtn.disabled = !state;
    }
  });
}

export default changeStateBtnWhileDriving;
