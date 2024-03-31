function setUpdateToNewState(state: boolean): void {
  const updateCarContainer = document.querySelector('.update__cars-container');
  const updateCarAllItems = Array.from(updateCarContainer!.children) as
    | HTMLInputElement[]
    | HTMLButtonElement[];

  updateCarAllItems.forEach((item) => {
    const currentItem = item;
    currentItem.disabled = !state;
  });
}

export default setUpdateToNewState;
