import { Slider as ResultSlider } from '@/components/ui/dice-result-slider';
import { Slider } from '@/components/ui/dice-slider';
import useDiceStore from '../store/diceStore';
import DiceSlideNumbers from './DiceSlideNumbers';
import DiceResultSlide from './DiceResultSlide';

interface DiceSliderProps {
  handleValueChange: (value: number[]) => void;
  showResultSlider: boolean;
}

function DiceSlider({
  handleValueChange,
  showResultSlider,
}: DiceSliderProps): JSX.Element {
  const { target, condition, results } = useDiceStore();
  const lastResult = results.at(-1);

  return (
    <>
      <DiceSlideNumbers />
      <div className="border-input-disabled border-[10px] p-2 rounded-full relative">
        <Slider
          condition={condition}
          onValueChange={handleValueChange}
          step={1}
          value={[target]}
        />
        {showResultSlider && lastResult?.state.result ? (
          <DiceResultSlide
            success={lastResult.payoutMultiplier > 0}
            value={[lastResult.state.result]}
          />
        ) : null}
      </div>
    </>
  );
}

export default DiceSlider;
