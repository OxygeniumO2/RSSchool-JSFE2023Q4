function changeStateRaceStopBtns(state: boolean) {
  const resetRaceBtn = document.querySelector(
    '.reset__race-btn',
  ) as HTMLButtonElement;
  const updateCarBtn = document.querySelector(
    '.update__car-btn',
  ) as HTMLButtonElement;

  updateCarBtn.disabled = !state;
  resetRaceBtn.disabled = !state;

  const allCarsStopBtn = document.querySelectorAll('.stop__car');

  allCarsStopBtn.forEach((btn) => {
    const carBtn = btn as HTMLButtonElement;
    carBtn.disabled = !state;
  });

  const carControlContainers = document.querySelectorAll(
    '.car__control__container',
  );
  carControlContainers.forEach((car) => {
    car.classList.remove('_active');
  });
}

export default changeStateRaceStopBtns;
