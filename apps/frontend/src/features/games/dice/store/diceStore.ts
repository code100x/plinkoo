import {
  calculateMultiplier,
  calculateProfit,
  calculateTargetFromChance,
  calculateTargetWithMultiplier,
  calculateWinningChance,
} from '@repo/common/game-utils/dice/index.js';
import type {
  DiceCondition,
  DicePlaceBetResponse,
} from '@repo/common/game-utils/dice/index.js';
import { create } from 'zustand';

const initalTarget = 50.5;
const initialCondition: DiceCondition = 'above';

export interface DiceStore {
  betAmount: number;
  profitOnWin: number;
  multiplier: number;
  target: number;
  winChance: number;
  condition: DiceCondition;
  results: DicePlaceBetResponse[];
  setTarget: (target: number) => void;
  toggleCondition: () => void;
  setMultiplier: (multiplier: number) => void;
  setWinningChance: (winChance: number) => void;
  setBetAmount: (betAmount: number) => void;
  setResult: (result: DicePlaceBetResponse) => void;
}

const useDiceStore = create<DiceStore>(set => ({
  betAmount: 0,
  profitOnWin: 0,
  multiplier: calculateMultiplier(initalTarget, initialCondition),
  target: initalTarget,
  winChance: calculateWinningChance(initalTarget, initialCondition),
  condition: initialCondition,
  results: [],

  setTarget: (target: number) => {
    const clampedTarget = Math.min(98, Math.max(2, target));
    set(state => {
      const multiplier = calculateMultiplier(clampedTarget, state.condition);
      return {
        ...state,
        target: clampedTarget,
        multiplier,
        winChance: calculateWinningChance(clampedTarget, state.condition),
        profitOnWin: calculateProfit(multiplier, state.betAmount),
      };
    });
  },

  setBetAmount: (betAmount: number) => {
    set(state => ({
      ...state,
      betAmount,
      profitOnWin: calculateProfit(state.multiplier, betAmount),
    }));
  },

  toggleCondition: () => {
    set(state => {
      const target = 100 - state.target;
      const condition = state.condition === 'above' ? 'below' : 'above';
      const multiplier = calculateMultiplier(target, condition);
      return {
        ...state,
        condition,
        multiplier,
        winChance: calculateWinningChance(target, condition),
        target,
        profitOnWin: calculateProfit(multiplier, state.betAmount),
      };
    });
  },

  setMultiplier: (multiplier: number) => {
    const clampedMultiplier = Math.min(9900, multiplier);
    set(state => {
      const target = calculateTargetWithMultiplier(
        clampedMultiplier,
        state.condition
      );
      return {
        ...state,
        multiplier,
        winChance: calculateWinningChance(target, state.condition),
        target,
        profitOnWin: calculateProfit(multiplier, state.betAmount),
      };
    });
  },

  setWinningChance: (winChance: number) => {
    const clampedWinChance = Math.min(99.99, Math.max(0.01, winChance));
    set(state => {
      const target = calculateTargetFromChance(
        clampedWinChance,
        state.condition
      );
      const multiplier = calculateMultiplier(target, state.condition);
      return {
        ...state,
        winChance: clampedWinChance,
        target,
        multiplier,
        profitOnWin: calculateProfit(multiplier, state.betAmount),
      };
    });
  },

  setResult: (result: DicePlaceBetResponse) => {
    set(state => {
      const newResults = [...state.results, result];
      if (newResults.length > 6) {
        newResults.shift();
      }
      return { ...state, results: newResults };
    });
  },
}));

export default useDiceStore;
