import useDiceStore from '@/features/games/dice/store/diceStore';
import { Games } from '@/const/games';
import { BettingControls } from '../common/components/BettingControls';
import GameSettingsBar from '../common/components/game-settings';
import { DiceResultPillsCarousel } from './components/DiceResultPillsCarousel';
import { useDiceAudio } from './hooks/useDiceAudio';
import { useDiceBetting } from './hooks/useBetting';
import { useResultSlider } from './hooks/useResultSlider';
import { useSliderValue } from './hooks/useSliderValue';
import DiceSlider from './components/DiceSlider';
import { DiceGameControls } from './components/DiceGameControls';
import { diceGameControls } from './config/controls';

export function DiceGame(): JSX.Element {
  const diceState = useDiceStore();
  const { betAmount, profitOnWin, results, setBetAmount, setResult } =
    diceState;
  const { playBetSound } = useDiceAudio(false);
  const { showResultSlider, setLastResultId } = useResultSlider();
  const { handleValueChange } = useSliderValue();
  const { mutate, isPending } = useDiceBetting({
    setResult,
    setLastResultId,
  });

  const handleBet = async (): Promise<void> => {
    await playBetSound();
    mutate({
      target: diceState.target,
      condition: diceState.condition,
      betAmount,
    });
  };

  return (
    <div className="container">
      <div className="flex flex-col-reverse lg:flex-row w-full items-stretch mx-auto rounded-t-md overflow-hidden shadow-md">
        <BettingControls
          betAmount={betAmount}
          isPending={isPending}
          onBet={handleBet}
          onBetAmountChange={(amount, multiplier = 1) => {
            setBetAmount(amount * multiplier);
          }}
          profitOnWin={profitOnWin}
        />
        <div className="flex-1 bg-brand-stronger p-3">
          <DiceResultPillsCarousel results={results} />
          <div className="py-16 lg:py-40 w-full lg:w-3/4 mx-auto flex flex-col gap-2">
            <DiceSlider
              handleValueChange={handleValueChange}
              showResultSlider={showResultSlider}
            />
          </div>
          <DiceGameControls controls={diceGameControls} state={diceState} />
        </div>
      </div>
      <GameSettingsBar game={Games.DICE} />
    </div>
  );
}
