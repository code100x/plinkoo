import {
  blackNumbers,
  redNumbers,
  type RouletteBet,
  RouletteBetTypes,
} from '@repo/common/game-utils/roulette/index.js';
import { sum } from 'lodash';
import { userManager, UserInstance } from '../../user/user.service';
import { isNumberInRange } from '../../../utils/numbers';

const spinWheel = async (userInstance: UserInstance) => {
  const [float] = userInstance.generateFloats(1);
  return Math.floor(float * 37); // Generates a number between 0 and 36
};

const calculatePayout = (bets: RouletteBet[], winningNumber: number) => {
  const payouts = bets.map(bet => {
    switch (bet.betType) {
      case RouletteBetTypes.STRAIGHT:
        return bet.selection === winningNumber ? bet.amount * 36 : 0;
      case RouletteBetTypes.SPLIT:
        return bet.selection.includes(winningNumber) ? bet.amount * 18 : 0;
      case RouletteBetTypes.STREET:
        return bet.selection.includes(winningNumber) ? bet.amount * 12 : 0;
      case RouletteBetTypes.CORNER:
        return bet.selection.includes(winningNumber) ? bet.amount * 9 : 0;
      case RouletteBetTypes.SIXLINE:
        return bet.selection.includes(winningNumber) ? bet.amount * 6 : 0;
      case RouletteBetTypes.DOZEN:
        switch (bet.selection) {
          case 1:
            return isNumberInRange(winningNumber, 1, 12) ? bet.amount * 3 : 0;
          case 2:
            return isNumberInRange(winningNumber, 13, 24) ? bet.amount * 3 : 0;
          case 3:
            return isNumberInRange(winningNumber, 25, 36) ? bet.amount * 3 : 0;
          default:
            return 0;
        }
      case RouletteBetTypes.COLUMN: {
        if (winningNumber === 0) return 0;
        switch (bet.selection) {
          case 1:
            return winningNumber % 3 === 1 ? bet.amount * 3 : 0;
          case 2:
            return winningNumber % 3 === 2 ? bet.amount * 3 : 0;
          case 3:
            return winningNumber % 3 === 0 ? bet.amount * 3 : 0;
          default:
            return 0;
        }
      }
      case RouletteBetTypes.BLACK:
        return winningNumber !== 0 &&
          blackNumbers.includes(winningNumber.toString())
          ? bet.amount * 2
          : 0;
      case RouletteBetTypes.RED:
        return winningNumber !== 0 &&
          redNumbers.includes(winningNumber.toString())
          ? bet.amount * 2
          : 0;
      case RouletteBetTypes.EVEN:
        return winningNumber !== 0 && winningNumber % 2 === 0
          ? bet.amount * 2
          : 0;
      case RouletteBetTypes.ODD:
        return winningNumber % 2 === 1 ? bet.amount * 2 : 0;
      case RouletteBetTypes.HIGH:
        return isNumberInRange(winningNumber, 19, 36) ? bet.amount * 2 : 0;
      case RouletteBetTypes.LOW:
        return isNumberInRange(winningNumber, 1, 18) ? bet.amount * 2 : 0;
      default:
        return 0;
    }
  });

  return sum(payouts);
};

export { spinWheel, calculatePayout };
