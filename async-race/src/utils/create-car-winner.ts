interface Winner {
  id: number;
  wins: number;
  time: number;
}

class CarWinner implements Winner {
  constructor(
    public id: number,
    public wins: number,
    public time: number,
  ) {}
}

export { Winner, CarWinner };
