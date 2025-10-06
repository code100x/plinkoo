import { useViewportType } from '@/common/hooks/useViewportType';
import PlayingCard from '@/components/ui/playing-card';
import { CARD_DECK } from '@repo/common/game-utils/cards/constants.js';
import React from 'react';
import { calculateCardPosition, getCardTopLeft } from '../utils/widthUtils';
import HandValue from './HandValue';
import { calculateHandValueWithSoft } from '@repo/common/game-utils/blackjack/utils.js';

const BlackjackResultPreview = ({ result }: { result: number[] }) => {
  const viewportType = useViewportType();
  const playerCards = [CARD_DECK[result[0]], CARD_DECK[result[1]]];
  const dealerCards = [CARD_DECK[result[2]], CARD_DECK[result[3]]];
  const remainingCards = result.slice(4).map(index => CARD_DECK[index]);

  const { rightPosition, centerOffset } = calculateCardPosition({
    totalCards: 2,
    viewportType,
  });

  return (
    <div className="flex flex-col gap-4 w-full">
      {/* Dealer Cards */}
      <div className="flex flex-col gap-8 items-center">
        <div className="text-xs lg:text-sm text-muted-foreground">Dealer</div>
        <div className="flex flex-col items-center h-24 lg:h-48">
          <div className="relative">
            <HandValue
              rightPosition={rightPosition}
              value={calculateHandValueWithSoft(dealerCards)}
            />
            {dealerCards.map((card, index) => {
              return (
                <div
                  className="absolute"
                  key={card.id}
                  style={{
                    ...getCardTopLeft({ viewportType, index, centerOffset }),
                  }}
                >
                  <PlayingCard rank={card.rank} suit={card.suit} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
      {/* Player Cards */}
      <div className="flex flex-col gap-8 items-center">
        <div className="text-xs lg:text-base text-muted-foreground">Player</div>
        <div className="flex flex-col items-center h-24 lg:h-48">
          <div className="relative h-full">
            <HandValue
              rightPosition={rightPosition}
              value={calculateHandValueWithSoft(playerCards)}
            />
            {playerCards.map((card, index) => {
              return (
                <div
                  className="absolute"
                  key={card.id}
                  style={{
                    ...getCardTopLeft({ viewportType, index, centerOffset }),
                  }}
                >
                  <PlayingCard rank={card.rank} suit={card.suit} />
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* All 52 Cards */}
      <div className="flex flex-col gap-2">
        {/* Scroll container */}
        {/* Row that can overflow horizontally */}
        <div className="flex gap-1 overflow-x-auto">
          {remainingCards.map((card, index) => (
            <div key={index} className="flex-shrink-0">
              <PlayingCard rank={card.rank} suit={card.suit} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlackjackResultPreview;
