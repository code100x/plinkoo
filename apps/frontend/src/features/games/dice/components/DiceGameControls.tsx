import InputWithIcon from '@/common/forms/components/InputWithIcon';
import { Label } from '@/components/ui/label';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import type {
  GameControl,
  NumericControl,
  RollControl,
} from '../config/controls';
import type { DiceStore } from '../store/diceStore';
import RollInput from './RollInput';
import NumericInput from './NumericInput';

interface GameControlsProps {
  controls: GameControl[];
  state: DiceStore;
}

function NumericControlInput({
  control,
  state,
}: {
  control: NumericControl;
  state: DiceStore;
}): JSX.Element {
  const value = control.getValue(state);
  const isValid = value >= control.min && value <= control.max;
  const Icon = control.icon;

  return (
    <NumericInput
      isValid={isValid}
      label={control.label}
      min={control.min}
      max={control.max}
      step={control.step}
      value={value}
      onChange={e => {
        control.setValue(state, Number(e.target.value));
      }}
      icon={Icon}
      tooltipContent={
        <TooltipContent className="text-xs p-3 font-semibold" sideOffset={10}>
          <p>{control.getValidationMessage(value)}</p>
        </TooltipContent>
      }
    />
  );
}

function RollControlInput({
  control,
  state,
}: {
  control: RollControl;
  state: DiceStore;
}): JSX.Element {
  const value = control.getValue(state);
  const condition = control.getCondition(state);
  const Icon = control.icon;

  return (
    <RollInput
      label={control.label}
      condition={condition}
      onClick={() => {
        control.onToggle(state);
      }}
      onKeyDown={e => {
        if (e.key === 'Enter' || e.key === ' ') {
          control.onToggle(state);
        }
      }}
      value={value}
      icon={Icon}
    />
  );
}

function ControlInput({
  control,
  state,
}: {
  control: GameControl;
  state: DiceStore;
}): JSX.Element {
  if (control.type === 'numeric') {
    return <NumericControlInput control={control} state={state} />;
  }
  return <RollControlInput control={control} state={state} />;
}

export function DiceGameControls({
  controls,
  state,
}: GameControlsProps): JSX.Element {
  return (
    <div className="bg-brand-weak px-2 py-1 lg:px-4 lg:py-2 lg:pb-3 rounded flex gap-2 lg:gap-4 w-full">
      {controls.map(control => (
        <ControlInput control={control} key={control.id} state={state} />
      ))}
    </div>
  );
}
