import {
  calculateMultiplier,
  type DiceCondition,
} from '@repo/common/game-utils/dice/index.js';
import type { UserInstance } from '../../user/user.service';

const getPayoutMultiplier = ({
  condition,
  target,
  result,
}: {
  condition: DiceCondition;
  target: number;
  result: number;
}): number => {
  const multiplier = calculateMultiplier(target, condition);
  switch (condition) {
    case 'above':
      return result > target ? multiplier : 0;
    case 'below':
      return result < target ? multiplier : 0;
    default:
      return 0;
  }
};

export const getResult = ({
  target,
  condition,
  userInstance,
}: {
  target: number;
  condition: DiceCondition;
  userInstance: UserInstance;
}) => {
  const [float] = userInstance.generateFloats(1);
  const result = (float * 10001) / 100; // 0.00 to 100.00

  const payoutMultiplier = getPayoutMultiplier({
    result,
    condition,
    target,
  });

  return {
    state: {
      target,
      condition,
      result: parseFloat(result.toFixed(2)),
    },
    payoutMultiplier,
  };
};
