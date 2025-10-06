import { sum } from 'lodash';
import type { RouletteBet } from '@repo/common/game-utils/roulette/validations.js';
import { validateBets } from '@repo/common/game-utils/roulette/validations.js';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { BadgeDollarSignIcon, RefreshCcwIcon, Undo2Icon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { placeBet } from '@/api/games/roulette';
import { getBalance } from '@/api/balance';
import { Games } from '@/const/games';
import GameSettingsBar from '../common/components/game-settings';
import BettingControls from './components/BettingControls';
import RouletteTable from './components/RouletteTable';
import RouletteWheel from './components/RouletteWheel';
import useRouletteStore from './store/rouletteStore';
import { parseBetId } from './utils/helpers';
import { RouletteProvider } from './context/RouletteContext';
import { useWinningNumber } from './store/rouletteStoreSelectors';
import { cn } from '@/lib/utils';

export function Roulette({
  isPreview = false,
}: {
  isPreview?: boolean;
}): JSX.Element {
  const {
    undoBet,
    clearBets,
    bets,
    betHistory,
    betAmount,
    setLatestResult,
    latestResult,
    isRouletteWheelStopped,
    setIsRouletteWheelStopped,
  } = useRouletteStore();
  const queryClient = useQueryClient();
  const { data: balance = 0 } = useQuery({
    queryKey: ['balance'],
    queryFn: getBalance,
    refetchInterval: 120000,
    // Refetch every 2 minutes
  });

  const { mutate, isPending: isSpinning } = useMutation({
    mutationFn: (rouletteBets: RouletteBet[]) => placeBet(rouletteBets),
    onSuccess: ({ data }) => {
      setLatestResult(data);
      queryClient.setQueryData(['balance'], data.balance);
      return data;
    },
    onError: error => {
      return error;
    },
  });

  const winningNumber = useWinningNumber();

  const onBet = (): void => {
    if (latestResult) {
      setLatestResult(null);
      return;
    }
    const rouletteBet = Object.entries(bets).map(([betId, amounts]) => {
      const { betType, selection } = parseBetId(betId);
      const totalBetAmount = sum(amounts) / 100;
      return {
        betType,
        ...(selection === null ? {} : { selection }),
        amount: totalBetAmount,
      } as RouletteBet;
    });

    const rouletteBets = validateBets(rouletteBet);
    setIsRouletteWheelStopped(false);
    mutate(rouletteBets);
  };

  return (
    <div className="container">
      <RouletteProvider
        isPreview={isSpinning || isPreview || Boolean(latestResult)}
      >
        <div className="flex lg:flex-row flex-col-reverse w-full items-stretch mx-auto rounded-t-md overflow-hidden shadow-md select-none">
          <BettingControls
            betButtonText={latestResult ? 'Spin Again' : 'Spin'}
            icon={latestResult ? <RefreshCcwIcon className="size-4" /> : null}
            isDisabled={
              latestResult
                ? false
                : betHistory.length === 0 ||
                  isSpinning ||
                  !isRouletteWheelStopped ||
                  balance * 100 < betAmount
            }
            isPending={isSpinning ? true : !isRouletteWheelStopped}
            onBet={onBet}
          />
          <div className="flex-1 bg-brand-stronger p-0 lg:p-3 relative">
            <div className="absolute left-1/2 -translate-x-1/2 -translate-y-[60%] hidden lg:block">
              <RouletteWheel
                isSpinning={isSpinning}
                winningNumber={winningNumber}
              />
            </div>
            <div className="absolute left-[15%] top-[20%] bg-brand-weaker size-12 rounded font-semibold text-2xl text-neutral-default items-center justify-center hidden lg:flex">
              {isRouletteWheelStopped ? winningNumber : null}
            </div>
            <div className="py-8 grid grid-cols-3 gap-4 lg:block lg:mt-60 lg:p-0 relative">
              <div className="hidden lg:block absolute -top-16 left-1/2 -translate-x-1/2">
                {latestResult?.payout && isRouletteWheelStopped ? (
                  <div className="border-4 border-[#00e600] rounded px-6 py-1.5 text-[#00e600] font-bold text-base flex items-center gap-1">
                    {latestResult.payoutMultiplier.toFixed(2)}x
                    <span className="text-neutral-weaker mx-1">|</span>
                    {latestResult.payout}
                    <BadgeDollarSignIcon className="size-4" />
                  </div>
                ) : null}
              </div>
              <div className="lg:hidden col-span-1 bg-brand-weaker size-12 rounded font-semibold text-2xl text-neutral-default flex items-center justify-center justify-self-center mt-8">
                {isRouletteWheelStopped ? winningNumber : null}
              </div>
              <div className="col-span-2">
                <RouletteTable />
              </div>
              <div
                className={cn('lg:hidden mx-auto col-span-3 invisible', {
                  visible: latestResult?.payout && isRouletteWheelStopped,
                })}
              >
                <div className="border-4 border-[#00e600] rounded px-6 py-1.5 text-[#00e600] font-bold text-base flex items-center gap-1">
                  {latestResult?.payoutMultiplier.toFixed(2)}x
                  <span className="text-neutral-weaker mx-1">|</span>
                  {latestResult?.payout}
                  <BadgeDollarSignIcon className="size-4" />
                </div>
              </div>
            </div>
            <div className="flex justify-between mt-2">
              <Button
                className="flex items-center gap-1 bg-transparent hover:bg-transparent text-neutral-default shadow-none group font-semibold"
                onClick={undoBet}
              >
                <Undo2Icon className="size-4 text-neutral-weak group-hover:text-neutral-default" />
                Undo
              </Button>
              <Button
                className="flex items-center gap-1 bg-transparent hover:bg-transparent text-neutral-default shadow-none group font-semibold"
                onClick={clearBets}
              >
                Clear
                <RefreshCcwIcon className="size-4 text-neutral-weak group-hover:text-neutral-default" />
              </Button>
            </div>
          </div>
        </div>
      </RouletteProvider>
      {/* <GameSettingsBar game={Games.ROULETTE} /> */}
    </div>
  );
}
