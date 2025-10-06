import React from 'react';
import HandValue from './HandValue';
import { calculateCardPosition, getCardTopLeft } from '../utils/widthUtils';
import { useViewportType, ViewportType } from '@/common/hooks/useViewportType';
import { BetData } from '@repo/common/types';
import {
  BlackjackGameState,
  PlayerGameState,
} from '@repo/common/game-utils/blackjack/types.js';
import { calculateHandValueWithSoft } from '@repo/common/game-utils/blackjack/utils.js';
import PlayingCard from '@/components/ui/playing-card';
import { cn } from '@/lib/utils';
import { getBlackjackGameResult } from '../utils';

const BlackjackBetViz = ({ bet }: { bet: BetData }) => {
  const viewportType = ViewportType.Mobile;
  const gameState: BlackjackGameState = bet.gameState;
  const { dealer, player } = gameState;

  const { rightPosition, centerOffset } = calculateCardPosition({
    totalCards: dealer.cards.length,
    viewportType,
  });

  const renderPlayerHand = (hand: PlayerGameState, handIndex: number) => {
    const totalCards = hand.cards.length;
    const { rightPosition, centerOffset } = calculateCardPosition({
      totalCards,
      viewportType,
    });

    const result = getBlackjackGameResult({
      hand,
      dealerState: dealer,
      isActive: false,
      gameOver: true,
    });

    return (
      <div className="flex flex-col items-center h-24">
        <div className="relative h-full">
          <HandValue
            rightPosition={rightPosition}
            value={calculateHandValueWithSoft(hand.cards)}
            background={result}
            className="px-3 lg:px-3 lg:-top-6 lg:text-xs text-xs"
          />
          {hand.cards.map((card, index) => {
            return (
              <div
                className="absolute"
                key={card.id}
                style={{
                  ...getCardTopLeft({
                    viewportType,
                    index,
                    centerOffset,
                  }),
                }}
              >
                <PlayingCard
                  rank={card.rank}
                  suit={card.suit}
                  border={result}
                  className="lg:w-12 lg:aspect-[3/5]"
                  rankClassName="lg:text-xl"
                  cardClassName="lg:border-2"
                  suitAndRankClassName="lg:gap-0 lg:pt-0"
                  suitClassName="lg:scale-[70%]"
                />
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col gap-8 w-full py-4">
      {/* Dealer Cards */}
      <div className="flex flex-col gap-8 items-center">
        <div className="text-sm text-muted-foreground">Dealer</div>
        <div className="flex flex-col items-center h-24">
          <div className="relative">
            <HandValue
              rightPosition={rightPosition}
              value={calculateHandValueWithSoft(dealer.cards)}
              className="px-3 lg:px-3 lg:-top-6 lg:text-xs text-xs"
            />
            {dealer.cards.map((card, index) => {
              return (
                <div
                  className="absolute"
                  key={card.id}
                  style={{
                    ...getCardTopLeft({ viewportType, index, centerOffset }),
                  }}
                >
                  <PlayingCard
                    rank={card.rank}
                    suit={card.suit}
                    className="lg:w-12 lg:aspect-[3/5]"
                    rankClassName="lg:text-xl"
                    cardClassName="lg:border-2"
                    suitAndRankClassName="lg:gap-0 lg:pt-0"
                    suitClassName="lg:scale-[70%]"
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
      {/* Player Cards */}
      <div className="flex flex-col gap-8 items-center">
        <div className="text-sm text-muted-foreground">Player</div>
        <div className={cn('flex justify-center w-full gap-40')}>
          {player.map((hand, index) => renderPlayerHand(hand, index))}
        </div>
      </div>
    </div>
  );
};

export default BlackjackBetViz;
