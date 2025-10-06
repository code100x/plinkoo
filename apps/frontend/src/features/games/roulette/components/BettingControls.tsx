import { BetAmountInput } from '../../common/components/BetAmountInput';
import { BetButton } from '../../common/components/BettingControls';
import useRouletteStore from '../store/rouletteStore';
import ChipCarousel from './ChipCarousel';

interface BettingControlsProps {
  betButtonText?: string;
  icon?: React.ReactNode;
  isDisabled: boolean;
  isPending: boolean;
  onBet: () => void;
}

function BettingControls({
  isDisabled,
  isPending,
  onBet,
  betButtonText,
  icon,
}: BettingControlsProps): JSX.Element {
  const { betAmount, setBetAmount, multiplyBets } = useRouletteStore();
  return (
    <div className="w-full lg:w-1/4 bg-brand-weak flex flex-col gap-4 p-3">
      <ChipCarousel />
      <BetAmountInput
        betAmount={betAmount / 100}
        isInputDisabled
        onBetAmountChange={(amount, multiplier = 1) => {
          setBetAmount(amount * 100 * multiplier);
          multiplyBets(multiplier);
        }}
      />
      <BetButton
        betButtonText={betButtonText}
        disabled={isDisabled}
        icon={icon}
        isPending={isPending}
        loadingImage="/games/roulette/loading-roulette.png"
        onClick={() => {
          if (isDisabled) return;
          onBet();
        }}
      />
    </div>
  );
}

export default BettingControls;
