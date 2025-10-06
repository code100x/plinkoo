import { range } from 'lodash';
import { NO_OF_TILES } from './constants';

const convertFloatsToGameEvents = (
  floats: number[] | undefined,
  totalEvents: number
): number[] => {
  if (!floats || floats.length === 0) {
    return [];
  }
  let remainingEvents = totalEvents;
  return floats.map(float => {
    const event = Math.floor(float * remainingEvents);
    remainingEvents -= 1;
    return event;
  });
};

const calculateMines = (gameEvents: number[], minesCount: number): number[] => {
  if (gameEvents.length === 0) {
    return [];
  }
  let tileNumbers = range(NO_OF_TILES);
  const minePositions = [];
  for (let i = 0; i < NO_OF_TILES; i++) {
    const chosenIndex = gameEvents[i];

    minePositions.push(tileNumbers[chosenIndex]);

    if (minePositions.length === minesCount) {
      break;
    }
    tileNumbers = [
      ...tileNumbers.slice(0, chosenIndex),
      ...tileNumbers.slice(chosenIndex + 1),
    ];
  }

  return minePositions;
};

export { convertFloatsToGameEvents, calculateMines };
