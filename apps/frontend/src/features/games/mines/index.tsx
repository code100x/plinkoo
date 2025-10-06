import { NO_OF_TILES } from '@repo/common/game-utils/mines/constants.js';
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { BadgeDollarSignIcon } from 'lucide-react';
import { Games } from '@/const/games';
import { playRound } from '@/api/games/mines';
import GameSettingsBar from '../common/components/game-settings';
import BettingControls from './components/BettingControls';
import useMinesStore from './store/minesStore';
import {
  useIsGameActive,
  useIsGameLost,
  useIsGameWon,
  useLastRound,
  useMines,
  usePayoutMultiplier,
  useSelectedTiles,
  useTotalPayout,
} from './store/minesSelectors';
import ActiveGameTile from './components/ActiveGameTile';
import InactiveGameTile from './components/InactiveGameTile';

export function Mines(): JSX.Element {
  const { setGameState, gameState } = useMinesStore();
  const [loadingTiles, setLoadingTiles] = useState<Set<number>>(new Set());
  const { mutate: play } = useMutation({
    mutationKey: ['mines-play-round'],
    mutationFn: (selectedTileIndex: number) => playRound(selectedTileIndex),
    onSuccess: ({ data }) => {
      setGameState(data);
      setLoadingTiles(prev => {
        const newSet = new Set(prev);
        data.state.rounds.forEach(round => {
          newSet.delete(round.selectedTileIndex);
        });
        return newSet;
      });
    },
  });

  const isGameActive = useIsGameActive();

  const isGameWon = useIsGameWon();
  const isGameLost = useIsGameLost();
  const mines = useMines();
  const selectedTiles = useSelectedTiles();
  const lastRound = useLastRound();
  const payoutMultiplier = usePayoutMultiplier();
  const payout = useTotalPayout();

  const pickRandomTile = () => {
    if (!gameState) return;
    const availableTiles = Array.from(
      { length: NO_OF_TILES },
      (_, i) => i
    ).filter(index => !selectedTiles?.has(index) && !loadingTiles.has(index));
    if (availableTiles.length === 0) return;
    const randomIndex = Math.floor(Math.random() * availableTiles.length);
    const tileToPick = availableTiles[randomIndex];
    setLoadingTiles(prev => {
      const newSet = new Set(prev);
      newSet.add(tileToPick);
      return newSet;
    });
    play(tileToPick);
  };
  return (
    <div className="container">
      <div className="flex flex-col-reverse lg:flex-row w-full items-stretch mx-auto rounded-t-md overflow-hidden shadow-md">
        <BettingControls pickRandomTile={pickRandomTile} />

        <div className="lg:px-24 lg:flex-1 bg-brand-stronger p-2 flex justify-center relative">
          <div className="inline-grid grid-cols-5 mx-auto justify-items-center gap-2 md:gap-2.5">
            {Array.from({ length: NO_OF_TILES }, (_, i) => i).map(number =>
              isGameActive || !gameState ? (
                <ActiveGameTile
                  index={number}
                  isLoading={loadingTiles.has(number)}
                  key={number}
                  onClick={() => {
                    if (isGameActive) {
                      setLoadingTiles(prev => {
                        const newSet = new Set(prev);
                        newSet.add(number);
                        return newSet;
                      });
                      play(number);
                    }
                  }}
                />
              ) : (
                <InactiveGameTile
                  index={number}
                  key={number}
                  {...{
                    isGameWon,
                    isGameLost,
                    mines,
                    selectedTiles,
                    lastRound,
                  }}
                />
              )
            )}
          </div>
          {isGameWon ? (
            <div className="absolute flex flex-col gap-2 border-[6px] border-[#00e600] rounded-xl left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-brand-default p-2.5 w-32 items-center">
              <p className="text-[#00e600] text-xl font-bold">
                {payoutMultiplier || '1.00'}x
              </p>
              <div className="border-2 border-neutral-weaker w-1/2" />
              <p className="text-[#00e600] text-lg font-bold flex items-center gap-1">
                {payout || 0}
                <BadgeDollarSignIcon className="size-4" />
              </p>
            </div>
          ) : null}
        </div>
      </div>
      <GameSettingsBar game={Games.MINES} />
    </div>
  );
}
