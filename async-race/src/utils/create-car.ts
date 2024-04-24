interface CarData {
  name: string;
  color: string;
}

class Car implements CarData {
  constructor(
    public name: string,
    public color: string,
  ) {}
}

export { CarData, Car };
