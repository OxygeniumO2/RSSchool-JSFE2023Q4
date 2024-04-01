function setNewStateToControlBtns(state: boolean) {
  const allBtns = document.querySelectorAll('.btn');
  allBtns.forEach((btn) => {
    const btnToChange = btn as HTMLButtonElement;
    if (
      !(
        btnToChange.classList.contains('drive__car') ||
        btnToChange.classList.contains('stop__car') ||
        btnToChange.textContent === 'To Garage' ||
        btnToChange.textContent === 'To Winners'
      )
    ) {
      btnToChange.disabled = !state;
    }
  });
}

export default setNewStateToControlBtns;
