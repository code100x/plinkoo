import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { KenoRisk } from '@repo/common/game-utils/keno/types.js';
import { NO_OF_TILES_KENO } from '@repo/common/game-utils/keno/constants.js';
import CommonSelect from '@/components/ui/common-select';
import { Button } from '@/components/ui/button';
import { placeBet } from '@/api/games/keno';
import { BetButton } from '../../common/components/BettingControls';
import { BetAmountInput } from '../../common/components/BetAmountInput';
import useKenoStore from '../store/kenoStore';
import { KenoRiskDropdown } from '../const';
import { useSelectedTiles } from '../store/kenoSelectors';

function BettingControls(): JSX.Element {
  const {
    betAmount,
    setBetAmount,
    kenoRisk,
    setKenoRisk,
    clearTiles,
    updateSelectedTile,
    setOutcome,
  } = useKenoStore();

  const selectedTiles = useSelectedTiles();

  const queryClient = useQueryClient();
  const balance = queryClient.getQueryData<number>(['balance']);

  const { mutate: placeBetMutation, isPending } = useMutation({
    mutationKey: ['keno-start-game'],
    mutationFn: () =>
      placeBet({
        betAmount,
        selectedTiles: Array.from(selectedTiles),
        risk: kenoRisk,
      }),
    onSuccess: async ({ data }): Promise<void> => {
      const drawnNumbers = data.state.drawnNumbers;

      const updatePromises = Array.from(drawnNumbers.keys()).map(index =>
        sleep(100 * index).then(() => {
          setOutcome({
            ...data,
            state: {
              ...data.state,
              drawnNumbers: drawnNumbers.slice(0, index + 1),
            },
          });
        })
      );

      await Promise.all(updatePromises);

      queryClient.setQueryData(['balance'], data.balance);
    },
  });

  const isDisabled =
    betAmount > (balance ?? 0) || betAmount <= 0 || selectedTiles.size === 0;

  // async function to update selected tile and sleep for 200ms
  const sleep = (ms: number): Promise<void> =>
    new Promise(resolve => {
      setTimeout(resolve, ms);
    });

  const autoPickTiles = async (): Promise<void> => {
    // Choose 10 random tiles between 1 and 40
    const randomTiles = new Set<number>();
    while (randomTiles.size < 10) {
      const randomTile = Math.floor(Math.random() * NO_OF_TILES_KENO) + 1;
      randomTiles.add(randomTile);
    }

    // Update tiles with delays
    const tilesArray = Array.from(randomTiles);
    const updatePromises = tilesArray.map((tile, index) =>
      sleep(index * 100).then(() => {
        updateSelectedTile(tile);
      })
    );

    await Promise.all(updatePromises);
  };

  return (
    <div className="w-full lg:w-1/4 bg-brand-weak flex flex-col gap-4 p-3">
      <div className="flex flex-col gap-2">
        <BetAmountInput
          betAmount={betAmount}
          onBetAmountChange={(amount, multiplier = 1) => {
            setBetAmount(amount * multiplier);
          }}
        />
        <CommonSelect
          label="Risk"
          labelClassName="font-semibold"
          onValueChange={value => {
            setKenoRisk(value as KenoRisk);
          }}
          options={KenoRiskDropdown}
          triggerClassName="h-10 text-sm font-medium bg-brand-stronger"
          value={kenoRisk}
        />
        <Button
          className="bg-brand-weaker rounded-sm text-neutral-default font-medium hover:bg-brand-weakest text-sm mt-1"
          onClick={() => void autoPickTiles()}
        >
          Auto Pick
        </Button>
        <Button
          className="bg-brand-weaker rounded-sm text-neutral-default font-medium hover:bg-brand-weakest text-sm mt-1"
          onClick={clearTiles}
        >
          Clear Table
        </Button>
      </div>

      <BetButton
        animate="animate-pulse"
        disabled={isDisabled}
        isPending={isPending}
        loadingImage="/games/mines/bomb.png"
        onClick={placeBetMutation}
      />
    </div>
  );
}

export default BettingControls;
