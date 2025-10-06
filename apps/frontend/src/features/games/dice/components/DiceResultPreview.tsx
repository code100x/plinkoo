import { Slider } from '@/components/ui/dice-slider';
import { Slider as ResultSlider } from '@/components/ui/dice-result-slider';

function DiceResultPreview({ result }: { result: number }): JSX.Element {
  return (
    <div className="w-full py-6">
      <div className="flex items-center justify-between w-full gap-2 pl-6 pr-4">
        {[0, 25, 50, 75, 100].map(value => (
          <div className="font-semibold text-xs" key={value}>
            {value}
          </div>
        ))}
      </div>
      <div className="border-input-disabled border-8 p-2 rounded-full relative">
        <Slider condition="above" step={1} value={[0]} />
        <div className="absolute w-full -top-6 transition-transform animate-slideInLeft">
          <ResultSlider success value={[result]} />
        </div>
      </div>
    </div>
  );
}

export default DiceResultPreview;
