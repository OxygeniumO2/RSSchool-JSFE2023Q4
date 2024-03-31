function removeActiveStateFromCars() {
  const carControlContainers = document.querySelectorAll(
    '.car__control__container',
  );
  carControlContainers.forEach((container) => {
    container.classList.remove('_active');
  });
}

export default removeActiveStateFromCars;
