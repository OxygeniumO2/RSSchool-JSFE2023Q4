/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import { Round } from '../interfaces/game-data-interface';
import { LOCALSTORAGE_KEY_ROUND, LOCALSTORAGE_KEY_ROUND_NUMBER } from './localStorageKeys';

export interface RoundDataFromLS {
  localStorageRoundNumber: number;
  localStorageRound: string | null;
  currRound: Round | null;
}

export function getDataRoundFromLS(): RoundDataFromLS {
  const localStorageRoundNumber = +localStorage.getItem(LOCALSTORAGE_KEY_ROUND_NUMBER)!;
  const localStorageRound = localStorage.getItem(LOCALSTORAGE_KEY_ROUND);
  const currRound: Round | null = localStorageRound ? JSON.parse(localStorageRound) : null;
  return { localStorageRoundNumber, localStorageRound, currRound };
}
