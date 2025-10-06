import type { KenoRisk } from '@repo/common/game-utils/keno/types.js';
import {
  NO_OF_TILES_KENO,
  PAYOUT_MULTIPLIERS,
} from '@repo/common/game-utils/keno/constants.js';
import { calculateSelectedGems } from '@repo/common/game-utils/keno/utils.js';
import { convertFloatsToGameEvents } from '@repo/common/game-utils/mines/utils.js';
import type { UserInstance } from '../../user/user.service';

const getPayoutMultiplier = (
  drawnNumbers: number[],
  selectedTiles: number[],
  risk: KenoRisk
) => {
  const drawnNumbersSet = new Set(drawnNumbers);
  let matches = 0;
  for (const tile of selectedTiles) {
    if (drawnNumbersSet.has(tile)) {
      matches++;
    }
  }
  return PAYOUT_MULTIPLIERS[risk][selectedTiles.length][matches];
};

export const getResult = ({
  userInstance,
  selectedTiles,
  risk,
}: {
  userInstance: UserInstance;
  selectedTiles: number[];
  risk: KenoRisk;
}) => {
  const floats = userInstance.generateFloats(10);

  const gameEvents = convertFloatsToGameEvents(floats, NO_OF_TILES_KENO);

  const drawnNumbers = calculateSelectedGems(gameEvents, 10).map(
    num => num + 1
  );

  const payoutMultiplier = getPayoutMultiplier(
    drawnNumbers,
    selectedTiles,
    risk
  );

  return {
    state: {
      risk,
      selectedTiles,
      drawnNumbers,
    },
    payoutMultiplier,
  };
};
