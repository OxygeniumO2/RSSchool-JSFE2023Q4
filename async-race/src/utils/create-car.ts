interface Car {
  name: string;
  color: string;
}

function createCar(name: string, color: string): Car {
  const newCar: Car = {
    name,
    color,
  };
  return newCar;
}

export { Car, createCar };
