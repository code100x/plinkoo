import { CardSuits } from '@repo/common/game-utils/cards/types.js';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';
import { ViewportType } from '@/common/hooks/useViewportType';
import { CARD_WIDTH } from '@/features/games/blackjack/utils/widthUtils';

export enum CardBorders {
  SUCCESS = 'success',
  ERROR = 'error',
  WARNING = 'warning',
  TRANSPARENT = 'transparent',
  INFO = 'info',
}

function PlayingCard({
  border = CardBorders.TRANSPARENT,
  cardClassName,
  className,
  faceDown = false,
  layoutId,
  rank,
  rankClassName,
  suit,
  suitClassName,
  suitAndRankClassName,
}: {
  border?: CardBorders;
  cardClassName?: string;
  className?: string;
  faceDown?: boolean;
  layoutId?: string;
  rank?: string;
  rankClassName?: string;
  suit?: CardSuits;
  suitClassName?: string;
  suitAndRankClassName?: string;
}): JSX.Element {
  return (
    <motion.div
      className={cn(
        'w-12 lg:w-24 rounded shadow-[0_0_0.25em_#0710174d] aspect-[3/5] lg:aspect-[2/3]',
        className
      )}
      layout
      layoutId={layoutId}
      style={{
        perspective: '1000px',
      }}
      transition={{ duration: 0.4, ease: 'easeInOut' }}
    >
      <motion.div
        animate={{ rotateY: faceDown ? 180 : 0 }}
        className="w-full h-full relative"
        initial={{ rotateY: faceDown ? 180 : 0 }}
        style={{ transformStyle: 'preserve-3d' }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      >
        <div
          className={cn(
            'absolute inset-0 w-full h-full rounded bg-white select-none border-2 lg:border-[5px]',
            {
              'border-roulette-red': border === CardBorders.ERROR,
              'border-[#1fff20]': border === CardBorders.SUCCESS,
              'border-[#ff9d00]': border === CardBorders.WARNING,
              'border-[#1475e1]': border === CardBorders.INFO,
              'border-transparent': border === CardBorders.TRANSPARENT,
            },
            cardClassName
          )}
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(0deg)',
          }}
        >
          {rank && suit ? (
            <div
              className={cn(
                'w-1/2 ml-[5%] flex flex-col lg:gap-1 items-center justify-center lg:pt-2',
                suitAndRankClassName
              )}
            >
              <span
                className={cn(
                  'font-bold text-xl lg:text-4xl',
                  {
                    'text-[#e9113c]': [
                      CardSuits.HEARTS,
                      CardSuits.DIAMONDS,
                    ].includes(suit),
                    'text-brand-default': [
                      CardSuits.SPADES,
                      CardSuits.CLUBS,
                    ].includes(suit),
                  },
                  rankClassName
                )}
              >
                {rank}
              </span>
              <img
                alt={`${suit} icon`}
                className={cn('p-0 scale-[70%] lg:scale-[80%]', suitClassName)}
                src={`/games/cards/${suit}.png`}
              />
            </div>
          ) : null}
        </div>

        {/* Card Back Face */}
        <div
          className="absolute inset-0 w-full h-full rounded select-none"
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}
        >
          <img
            alt="Card back"
            className="w-full h-full rounded object-cover"
            src="/games/cards/back.png"
          />
        </div>
      </motion.div>
    </motion.div>
  );
}

export default PlayingCard;
