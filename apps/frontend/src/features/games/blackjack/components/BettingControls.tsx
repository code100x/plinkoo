import React, { useEffect } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getValidActionsFromState } from '@repo/common/game-utils/blackjack/utils.js';
import { BlackjackActions } from '@repo/common/game-utils/blackjack/types.js';
import { Button } from '@/components/ui/button';
import { blackjackBet, getActiveGame, playRound } from '@/api/games/blackjack';
import useBlackjackStore from '../store/blackjackStore';
import { BetAmountInput } from '../../common/components/BetAmountInput';
import { BetButton } from '../../common/components/BettingControls';

const BlackjackActionButtons = [
  {
    label: 'Hit',
    value: BlackjackActions.HIT,
    icon: '/games/blackjack/hit.svg',
  },
  {
    label: 'Stand',
    value: BlackjackActions.STAND,
    icon: '/games/blackjack/stand.svg',
  },
  {
    label: 'Split',
    value: BlackjackActions.SPLIT,
    icon: '/games/blackjack/split.svg',
  },
  {
    label: 'Double',
    value: BlackjackActions.DOUBLE,
    icon: '/games/blackjack/double.svg',
  },
];

function BettingControls(): JSX.Element {
  const {
    betAmount,
    setBetAmount,
    gameState,
    setGameState,
    playNextRoundHandler,
    setActiveGame,
    initializeGame,
  } = useBlackjackStore();

  const { isPending: isFetchingActiveGame, data: activeGame } = useQuery({
    queryKey: ['blackjack-active-game'],
    queryFn: getActiveGame,
    retry: false,
  });

  const queryClient = useQueryClient();

  // Load active game on mount
  useEffect(() => {
    if (activeGame?.data && !gameState) {
      setBetAmount(Number(activeGame.data.betAmount));
      setActiveGame(activeGame.data);
    }
  }, [activeGame, gameState, setGameState, setBetAmount, setActiveGame]);

  const { mutate: bet, isPending: isStartingGame } = useMutation({
    mutationKey: ['blackjack-bet'],
    mutationFn: () => blackjackBet({ betAmount }),
    onSuccess: async ({ data }) => {
      setGameState(data, false);
      setBetAmount(Number(data.betAmount));
      if (data.active) {
        void initializeGame(data);
      } else {
        await initializeGame(data);
      }
      queryClient.setQueryData(['balance'], data.balance);
    },
  });

  const { mutate: playNextRound, isPending: isPlayingRound } = useMutation({
    mutationKey: ['blackjack-play-round'],
    mutationFn: (action: BlackjackActions) => playRound(action),
    onSuccess: async ({ data }) => {
      setGameState(data, false);
      setBetAmount(Number(data.betAmount));
      await playNextRoundHandler(data);
      queryClient.setQueryData(['balance'], data.balance);
    },
  });
  const balance = queryClient.getQueryData<number>(['balance']);
  const isDisabled = betAmount > (balance ?? 0) || betAmount <= 0;

  const validActions = getValidActionsFromState({
    state: gameState?.state || null,
    active: gameState?.active || false,
  });

  return (
    <div className="w-full lg:w-1/4 bg-brand-weak flex flex-col gap-4 p-3">
      <div className="flex flex-col gap-2">
        <BetAmountInput
          betAmount={betAmount}
          onBetAmountChange={(amount, multiplier = 1) => {
            setBetAmount(amount * multiplier);
          }}
        />
        <div className="grid grid-cols-2 gap-2 gap-y-3 my-2">
          {validActions.insurance ? (
            <>
              <div className="flex items-center justify-center col-span-2 font-semibold text-sm my-2">
                Insurance?
              </div>
              <Button
                className="bg-brand-weaker rounded-sm text-neutral-default font-medium hover:bg-brand-weakest text-xs mt-1 h-12 flex items-center justify-center gap-1"
                onClick={() => {
                  playNextRound(BlackjackActions.INSURANCE);
                }}
              >
                Accept Insurance
              </Button>
              <Button
                className="bg-brand-weaker rounded-sm text-neutral-default font-medium hover:bg-brand-weakest text-xs mt-1 h-12 flex items-center justify-center gap-1"
                onClick={() => {
                  playNextRound(BlackjackActions.NOINSURANCE);
                }}
              >
                No Insurance
              </Button>
            </>
          ) : (
            BlackjackActionButtons.map(action => (
              <Button
                className="bg-brand-weaker rounded-sm text-neutral-default font-medium hover:bg-brand-weakest text-xs mt-1 h-12 flex items-center justify-center gap-1"
                disabled={
                  !validActions[action.value as keyof typeof validActions]
                }
                key={action.label}
                onClick={() => {
                  playNextRound(action.value);
                }}
              >
                {action.label}
                <img alt={action.label} className="size-4" src={action.icon} />
              </Button>
            ))
          )}
          {}
        </div>
      </div>

      <BetButton
        animate="animate-pulse"
        disabled={
          isDisabled ||
          isFetchingActiveGame ||
          Boolean(gameState?.active) ||
          isPlayingRound
        }
        isPending={isFetchingActiveGame || isStartingGame}
        loadingImage="/games/mines/bomb.png"
        onClick={bet}
      />
    </div>
  );
}

export default BettingControls;
