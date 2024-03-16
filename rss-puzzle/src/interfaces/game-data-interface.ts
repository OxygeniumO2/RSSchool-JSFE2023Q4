interface LevelData {
  id: string;
  name: string;
  imageSrc: string;
  cutSrc: string;
  author: string;
  year: string;
}

export interface Words {
  audioExample: string;
  textExample: string;
  textExampleTranslate: string;
  id: number;
  word: string;
  wordTranslate: string;
}

interface GameData {
  levelData: LevelData;
  words: Words[];
}

export interface Level {
  rounds: {
    levelData: LevelData;
    words: Words[];
  }[];
  roundsCount: number;
}

export default GameData;
