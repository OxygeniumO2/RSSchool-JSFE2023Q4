function setUpdateToNewState(state: boolean) {
  const updateCarContainer = document.querySelector('.update__cars-container');
  const updateCarAllItems = Array.from(updateCarContainer!.children) as
    | HTMLInputElement[]
    | HTMLButtonElement[];

  updateCarAllItems.forEach((item) => {
    const currentItem = item;
    currentItem.disabled = !state;
  });
}

function selectCar(index: number): void {
  const allCarsElements = Array.from(
    document.querySelectorAll('.car__control__container'),
  );
  allCarsElements.forEach((item, ind) => {
    if (index === ind) {
      item.classList.add('_active');
    } else {
      item.classList.remove('_active');
    }
  });
  setUpdateToNewState(true);
}

export { selectCar, setUpdateToNewState };
