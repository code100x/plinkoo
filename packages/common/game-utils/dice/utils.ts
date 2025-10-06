import { HOUSE_EDGE } from './constants';
import type { DiceCondition } from './types';

export const calculateMultiplier = (
  target: number,
  condition: DiceCondition
) => {
  let value = 0;
  switch (condition) {
    case 'above':
      value = (HOUSE_EDGE / (100 - target)) * 100;
      break;
    case 'below':
      value = (HOUSE_EDGE / target) * 100;
      break;
    default:
      value = 0;
  }
  return parseFloat(value.toFixed(4));
};

export const calculateProfit = (multiplier: number, betAmount: number) => {
  return parseFloat((betAmount * (multiplier - 1)).toFixed(2));
};

export const calculateWinningChance = (
  target: number,
  condition: DiceCondition
) => {
  const chance = condition === 'above' ? 100 - target : target;
  return parseFloat(chance.toFixed(4));
};

export const calculateTargetWithMultiplier = (
  multiplier: number,
  condition: DiceCondition
) => {
  let target = 0;
  switch (condition) {
    case 'above':
      target = 100 - (HOUSE_EDGE * 100) / multiplier;
      break;
    case 'below':
      target = (HOUSE_EDGE * 100) / multiplier;
      break;
    default:
      target = 0;
  }
  return parseFloat(target.toFixed(2));
};

export const calculateTargetFromChance = (
  winningChance: number,
  condition: DiceCondition
): number => {
  let target = 0;
  switch (condition) {
    case 'above':
      target = 100 - winningChance;
      break;
    case 'below':
      target = winningChance;
      break;
    default:
      target = 0;
  }
  return parseFloat(target.toFixed(2));
};

export const calculateFinalOutcome = (outcome: number) => {
  return parseFloat(
    (Number(String(outcome * 10001).split('.')[0]) / 100).toFixed(2)
  );
};
