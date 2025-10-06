import { range } from 'lodash';
import { NO_OF_TILES_KENO } from './constants';

const calculateSelectedGems = (
  gameEvents: number[],
  gemsCount: number
): number[] => {
  if (gameEvents.length === 0) {
    return [];
  }
  let tileNumbers = range(NO_OF_TILES_KENO);
  const gemPositions = [];
  for (let i = 0; i < NO_OF_TILES_KENO; i++) {
    const chosenIndex = gameEvents[i];

    gemPositions.push(tileNumbers[chosenIndex]);

    if (gemPositions.length === gemsCount) {
      break;
    }
    tileNumbers = [
      ...tileNumbers.slice(0, chosenIndex),
      ...tileNumbers.slice(chosenIndex + 1),
    ];
  }

  return gemPositions;
};

export { calculateSelectedGems };
