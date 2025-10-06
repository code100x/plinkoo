import React, { useEffect } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { NO_OF_TILES } from '@repo/common/game-utils/mines/constants.js';
import { startGame, getActiveGame, cashOut } from '@/api/games/mines';
import CommonSelect from '@/components/ui/common-select';
import { Label } from '@/components/ui/label';
import InputWithIcon from '@/common/forms/components/InputWithIcon';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { BetButton } from '../../common/components/BettingControls';
import { BetAmountInput } from '../../common/components/BetAmountInput';
import useMinesStore from '../store/minesStore';
import { useIsGameActive, useLastRound } from '../store/minesSelectors';

function BettingControls({
  pickRandomTile,
}: {
  pickRandomTile: () => void;
}): JSX.Element {
  const { betAmount, setBetAmount, minesCount, setMinesCount, setGameState } =
    useMinesStore();

  const queryClient = useQueryClient();
  const balance = queryClient.getQueryData<number>(['balance']);

  const {
    isPending: isFetchingActiveGame,
    data: activeGame,
    isError,
  } = useQuery({
    queryKey: ['mines-active-game'],
    queryFn: getActiveGame,
    retry: false,
  });

  const { mutate: cashout, isPending: isCashingOut } = useMutation({
    mutationKey: ['mines-cashout'],
    mutationFn: cashOut,
    onSuccess: ({ data }) => {
      setGameState(data);
      queryClient.setQueryData(['balance'], data.balance);
    },
  });

  const { mutate: start, isPending: isStartingGame } = useMutation({
    mutationKey: ['mines-start-game'],
    mutationFn: () => startGame({ betAmount, minesCount }),
    onSuccess: ({ data }) => {
      setGameState(data);
      setBetAmount(Number(data.betAmount));
      if (data.balance) {
        queryClient.setQueryData(['balance'], data.balance);
      }
    },
  });

  const isDisabled = betAmount > (balance ?? 0) || betAmount <= 0;

  const isGameActive = useIsGameActive();
  const lastRound = useLastRound();
  useEffect(() => {
    if (isError) {
      setGameState(null);
      setBetAmount(0);
      return;
    }
    if (activeGame) {
      setGameState(activeGame.data || null);
      setBetAmount(Number(activeGame.data?.betAmount || 0));
    }
  }, [activeGame, isError, setGameState, setBetAmount]);

  return (
    <div className="w-full lg:w-1/4 bg-brand-weak flex flex-col gap-4 p-3 py-4">
      <div className="flex flex-col gap-2">
        <BetAmountInput
          betAmount={betAmount}
          isInputDisabled={isGameActive}
          onBetAmountChange={(amount, multiplier = 1) => {
            setBetAmount(amount * multiplier);
          }}
        />
        {isGameActive ? (
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <div className="flex-1">
                <Label className="pl-px text-xs text-neutral-weak font-medium">
                  Mines
                </Label>
                <div className="flex h-8 rounded-sm overflow-hidden group">
                  <div className="rounded-l-sm flex items-center bg-brand-weaker w-full">
                    <InputWithIcon
                      className="text-neutral-default disabled:opacity-100 font-medium text-sm disabled:cursor-text select-none"
                      disabled={isGameActive}
                      icon={null}
                      value={minesCount}
                      wrapperClassName={cn(
                        'bg-brand-weaker h-8 border-brand-weaker shadow-none w-full pr-0 '
                      )}
                    />
                  </div>
                </div>
              </div>
              <div className="flex-1">
                <Label className="pl-px text-xs text-neutral-weak font-medium">
                  Gems
                </Label>
                <div className="flex h-8 rounded-sm overflow-hidden group">
                  <div className="rounded-l-sm flex items-center bg-brand-weaker w-full">
                    <InputWithIcon
                      className="text-neutral-default disabled:opacity-100 font-medium text-sm disabled:cursor-text"
                      disabled={isGameActive}
                      icon={null}
                      value={NO_OF_TILES - minesCount}
                      wrapperClassName={cn(
                        'bg-brand-weaker h-8 border-brand-weaker shadow-none w-full pr-0'
                      )}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div>
              <Label className="pl-px text-xs text-neutral-weak font-medium">
                Total Profit ({lastRound?.payoutMultiplier || '1.00'}x)
              </Label>
              <div className="flex h-8 rounded-sm overflow-hidden group">
                <div className="rounded-l-sm flex items-center bg-brand-weaker w-full">
                  <InputWithIcon
                    className="text-neutral-default disabled:opacity-100 font-medium text-sm disabled:cursor-text select-none"
                    disabled
                    icon={null}
                    value={(
                      betAmount * (lastRound?.payoutMultiplier || 1)
                    ).toFixed(2)}
                    wrapperClassName={cn(
                      'bg-brand-weaker h-8 border-brand-weaker shadow-none w-full pr-0 '
                    )}
                  />
                </div>
              </div>
            </div>
            <Button
              className="bg-brand-weaker rounded-sm text-neutral-default font-semibold hover:bg-brand-weakest text-sm mt-2 h-10"
              onClick={pickRandomTile}
            >
              Pick random tile
            </Button>
          </div>
        ) : (
          <CommonSelect
            label="Mines"
            labelClassName="font-semibold"
            onValueChange={(value: string) => {
              setMinesCount(Number(value));
            }}
            options={Array.from({ length: 24 }, (_, i) => ({
              label: (i + 1).toString(),
              value: (i + 1).toString(),
            }))}
            triggerClassName="h-10 text-sm font-medium bg-brand-stronger"
            value={minesCount.toString()}
          />
        )}
      </div>

      {isGameActive ? (
        <BetButton
          animate="animate-pulse"
          betButtonText="Cashout"
          disabled={
            !(lastRound && 'selectedTileIndex' in lastRound) ||
            isDisabled ||
            isFetchingActiveGame ||
            isStartingGame ||
            isCashingOut
          }
          isPending={isFetchingActiveGame || isStartingGame || isCashingOut}
          loadingImage="/games/mines/bomb.png"
          onClick={() => {
            cashout();
          }}
        />
      ) : (
        <BetButton
          animate="animate-pulse"
          disabled={isDisabled || isFetchingActiveGame}
          isPending={isFetchingActiveGame || isStartingGame || isCashingOut}
          loadingImage="/games/mines/bomb.png"
          onClick={start}
        />
      )}
    </div>
  );
}

export default BettingControls;
