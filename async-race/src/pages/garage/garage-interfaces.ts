interface GarageCar {
  color: string;
  name: string;
  id: number;
  status?: string;
}

interface CarTravelData {
  velocity: number;
  distance: number;
}

export { GarageCar, CarTravelData };
