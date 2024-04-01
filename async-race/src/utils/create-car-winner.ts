interface Winner {
  id: number;
  wins: number;
  time: number;
}

function createCarWinner(id: number, wins: number, time: number): Winner {
  const newCarWinner = {
    id,
    wins,
    time,
  };
  return newCarWinner;
}

export { Winner, createCarWinner };
