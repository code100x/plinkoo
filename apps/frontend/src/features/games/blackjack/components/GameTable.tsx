import { LayoutGroup } from 'motion/react';
import type { PlayerGameState } from '@repo/common/game-utils/blackjack/types.js';
import {
  getCurrentActiveHandIndex,
  calculateHandValueWithSoft,
} from '@repo/common/game-utils/blackjack/utils.js';
import PlayingCard, { CardBorders } from '@/components/ui/playing-card';
import useBlackjackStore from '../store/blackjackStore';
import { FACE_DOWN_HIDDEN_DEALER_CARD } from '../const';
import { getBlackjackGameResult } from '../utils';
import HandValue from './HandValue';
import { useViewportType } from '@/common/hooks/useViewportType';
import { calculateCardPosition, getCardTopLeft } from '../utils/widthUtils';
import { cn } from '@/lib/utils';

function GameTable(): JSX.Element {
  const { gameState, gameOver, cardInDeck, flippedCards, incomingCards } =
    useBlackjackStore();

  const viewportType = useViewportType();

  // Show dealer's hole card only when game is not active
  const showDealerHoleCard =
    gameState &&
    gameState.state.dealer.cards.length > 1 &&
    incomingCards.has(gameState.state.dealer.cards[1].id);

  const currentActiveHandIndex = getCurrentActiveHandIndex(
    gameState?.state.player
  );

  const renderDealerHand = (): JSX.Element | null => {
    if (!gameState?.state.dealer.cards.length) return null;

    // Calculate center offset: -48 - (totalCards - 1) * 20
    const totalCards =
      gameState.state.dealer.cards.filter(card => incomingCards.has(card.id))
        .length +
      (!showDealerHoleCard && incomingCards.has(FACE_DOWN_HIDDEN_DEALER_CARD)
        ? 1
        : 0);

    const { rightPosition, centerOffset } = calculateCardPosition({
      totalCards,
      viewportType,
    });

    return (
      <div className="flex flex-col items-center">
        <div className="relative">
          <HandValue
            rightPosition={rightPosition}
            value={calculateHandValueWithSoft(
              gameState.state.dealer.cards.filter(card =>
                flippedCards.has(card.id)
              )
            )}
          />
          {gameState.state.dealer.cards.map((card, index) => {
            const isHoleCard = index === 1;
            const shouldShowCard = !isHoleCard || showDealerHoleCard;
            if (!incomingCards.has(card.id)) {
              return;
            }

            return (
              <div
                className="absolute"
                key={card.id}
                style={{
                  ...getCardTopLeft({ viewportType, index, centerOffset }),
                }}
              >
                <PlayingCard
                  faceDown={!flippedCards.has(card.id)}
                  layoutId={card.id}
                  rank={shouldShowCard ? card.rank : undefined}
                  suit={shouldShowCard ? card.suit : undefined}
                />
              </div>
            );
          })}
          {!showDealerHoleCard &&
          incomingCards.has(FACE_DOWN_HIDDEN_DEALER_CARD) ? (
            <div
              className="absolute"
              style={{
                ...getCardTopLeft({ viewportType, index: 1, centerOffset }),
              }}
            >
              <PlayingCard faceDown layoutId={FACE_DOWN_HIDDEN_DEALER_CARD} />
            </div>
          ) : null}
        </div>
      </div>
    );
  };

  const renderPlayerHand = (
    hand: PlayerGameState,
    handIndex = 0
  ): JSX.Element => {
    const isMultipleHands = hand.cards.length > 1;

    const totalCards = Math.max(
      hand.cards.filter(card => incomingCards.has(card.id)).length,
      1
    );
    const { rightPosition, centerOffset } = calculateCardPosition({
      totalCards,
      viewportType,
    });

    const result =
      gameState !== null
        ? getBlackjackGameResult({
            hand,
            dealerState: gameState.state.dealer,
            isActive:
              currentActiveHandIndex === handIndex &&
              gameState.state.player.length > 1 &&
              hand.cards.every(card => flippedCards.has(card.id)),
            gameOver,
          })
        : CardBorders.TRANSPARENT;
    return (
      <div
        className={`flex flex-col items-center ${isMultipleHands ? 'mx-8' : ''}`}
        key={`hand-${handIndex}`}
      >
        <div className="relative">
          <HandValue
            background={result}
            rightPosition={rightPosition}
            value={calculateHandValueWithSoft(
              hand.cards.filter(card => flippedCards.has(card.id))
            )}
          />
          {hand.cards.map((card, cardIndex) => {
            // Calculate center offset: -48 - (totalCards - 1) * 20

            if (!incomingCards.has(card.id)) {
              return;
            }

            return (
              <div
                className="absolute"
                key={card.id}
                style={{
                  ...getCardTopLeft({
                    viewportType,
                    index: cardIndex,
                    centerOffset,
                  }),
                }}
              >
                <PlayingCard
                  border={result}
                  faceDown={!flippedCards.has(card.id)}
                  layoutId={card.id}
                  rank={card.rank}
                  suit={card.suit}
                />
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderDeck = (): JSX.Element => (
    <div className="absolute -top-12 right-20 lg:right-32 transform">
      <div className="relative">
        {/* Stack effect with multiple card backs */}
        {[0, 1, 2, 3].map(offset => (
          <div
            className="absolute"
            key={offset}
            style={{
              transform: `translateY(${offset * 2}px)`,
              zIndex: 10 - offset,
            }}
          >
            <PlayingCard faceDown />
          </div>
        ))}
        {cardInDeck ? (
          <div
            className="absolute"
            style={{
              transform: `translateY(8px)`,
              zIndex: 5,
            }}
          >
            <PlayingCard faceDown layoutId={cardInDeck} />
          </div>
        ) : null}
      </div>
    </div>
  );

  return (
    <LayoutGroup>
      {renderDeck()}
      <div
        className="w-full h-full min-h-[360px] lg:min-h-[600px] flex flex-col items-center lg:py-8 bg-[url('/games/blackjack/background.svg')] bg-center bg-no-repeat justify-evenly"
        style={{ backgroundSize: '40%' }}
      >
        {/* Deck positioned on the top right */}

        {/* Dealer's hand at the top */}
        <div className="flex pt-12 flex-1 lg:flex-initial h-full justify-center w-full lg:pt-16">
          {renderDealerHand()}
        </div>

        {/* Player's hand(s) at the bottom */}
        <div className="flex pt-12 flex-1 lg:flex-initial justify-center pb-4 h-full w-full lg:pt-16">
          <div
            className={cn('flex justify-center', {
              'gap-20 lg:gap-40': (gameState?.state.player.length || 0) > 1,
            })}
          >
            {gameState?.state.player.map((hand, index) =>
              renderPlayerHand(hand, index)
            )}
          </div>
        </div>
      </div>
    </LayoutGroup>
  );
}

export default GameTable;
