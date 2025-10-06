import { Percent, RefreshCw, XIcon } from 'lucide-react';
import type { DiceCondition } from '@repo/common/game-utils/dice/types.js';
import type { DiceStore } from '../store/diceStore';

export interface BaseControl {
  id: string;
  label: string;
}

export interface NumericControl extends BaseControl {
  type: 'numeric';
  icon: typeof XIcon;
  min: number;
  max: number;
  step: number;
  getValue: (state: DiceStore) => number;
  setValue: (state: DiceStore, value: number) => void;
  getValidationMessage: (value: number) => string;
}

export interface RollControl extends BaseControl {
  type: 'roll';
  icon: typeof RefreshCw;
  getValue: (state: DiceStore) => number;
  getCondition: (state: DiceStore) => DiceCondition;
  onToggle: (state: DiceStore) => void;
}

export type GameControl = NumericControl | RollControl;

export enum GameControlIds {
  MULTIPLIER = 'multiplier',
  WIN_CHANCE = 'winChance',
  ROLL = 'roll',
}

export const diceGameControls: GameControl[] = [
  {
    id: GameControlIds.MULTIPLIER,
    type: 'numeric',
    label: 'Multiplier',
    icon: XIcon,
    min: 1.0102,
    max: 9900,
    step: 0.0001,
    getValue: state => state.multiplier,
    setValue: (state, value) => {
      state.setMultiplier(value);
    },
    getValidationMessage: value =>
      `${value < 1.0102 ? 'Minimum' : 'Maximum'} is ${
        value < 1.0102 ? '1.0102' : '9900'
      }`,
  },
  {
    id: GameControlIds.ROLL,
    type: 'roll',
    label: 'Roll',
    icon: RefreshCw,
    getValue: state => state.target,
    getCondition: state => state.condition,
    onToggle: state => {
      state.toggleCondition();
    },
  },
  {
    id: GameControlIds.WIN_CHANCE,
    type: 'numeric',
    label: 'Win chance',
    icon: Percent,
    min: 0.01,
    max: 98,
    step: 0.01,
    getValue: state => state.winChance,
    setValue: (state, value) => {
      state.setWinningChance(value);
    },
    getValidationMessage: value =>
      `${value < 0.01 ? 'Minimum' : 'Maximum'} is ${
        value < 0.01 ? '0.01' : '98'
      }`,
  },
];
