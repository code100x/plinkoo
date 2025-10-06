import { Slider as ResultSlider } from '@/components/ui/dice-result-slider';

const DiceResultSlide = ({
  success,
  value,
}: {
  success: boolean;
  value: number[];
}) => {
  return (
    <div className="absolute w-full -top-6 transition-transform animate-slideInLeft">
      <ResultSlider success={success} value={value} />
    </div>
  );
};

export default DiceResultSlide;
