import { DiceState } from '@repo/common/game-utils/dice/types.js';
import React from 'react';
import DiceSlideNumbers from './DiceSlideNumbers';
import { Slider } from '@/components/ui/dice-slider';
import DiceResultSlide from './DiceResultSlide';
import { diceGameControls, GameControlIds } from '../config/controls';
import NumericInput from './NumericInput';
import {
  calculateMultiplier,
  calculateWinningChance,
} from '@repo/common/game-utils/dice/utils.js';
import RollInput from './RollInput';

const DiceBetViz = ({ gameState }: { gameState: DiceState }) => {
  const { target, condition, result } = gameState;

  const getValue = (controlId: GameControlIds) => {
    switch (controlId) {
      case GameControlIds.MULTIPLIER:
        return calculateMultiplier(target, condition);
      case GameControlIds.ROLL:
        return condition;
      case GameControlIds.WIN_CHANCE:
        return calculateWinningChance(target, condition);
      default:
        return null;
    }
  };

  return (
    <div className="w-full pt-12 px-2">
      <DiceSlideNumbers />
      <div className="border-input-disabled border-[10px] p-2 rounded-full relative">
        <Slider condition={condition} step={1} value={[target]} />
        <DiceResultSlide success value={[result]} />
      </div>
      <div className="bg-brand-weak mt-16 px-2 py-1 lg:px-4 lg:py-2 lg:pb-3 rounded flex gap-2 lg:gap-4 w-full">
        {diceGameControls.map(control =>
          control.type === 'numeric' ? (
            <NumericInput
              isValid
              value={getValue(control.id as GameControlIds) as number}
              label={control.label}
              icon={control.icon}
              disabled
            />
          ) : (
            <RollInput
              condition={condition}
              label={control.label}
              value={target}
              icon={control.icon}
              disabled
            />
          )
        )}
      </div>
    </div>
  );
};

export default DiceBetViz;
