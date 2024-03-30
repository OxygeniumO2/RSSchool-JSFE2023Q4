import setUpdateToNewState from '../../utils/setUpdateToNewState';

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

export default selectCar;
