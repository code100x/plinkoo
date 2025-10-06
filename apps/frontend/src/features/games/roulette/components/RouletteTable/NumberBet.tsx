import { redNumbers } from '@repo/common/game-utils/roulette/constants.js';
import { RouletteBetTypes } from '@repo/common/game-utils/roulette/index.js';
import { useRef } from 'react';
import { sum } from 'lodash';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';
import { useRouletteBoardHoverStore } from '../../store/rouletteBoardHoverStore';
import { getIsNumberHover } from '../../utils/hover';
import {
  shouldRenderBottom,
  shouldRenderCornerBet,
  shouldRenderRight,
  shouldRenderSixLineBet,
  shouldRenderTop,
} from '../../utils/shouldRender';
import useRouletteStore from '../../store/rouletteStore';
import Chip from '../Chip';
import {
  useWinningNumber,
  useBetKey,
} from '../../store/rouletteStoreSelectors';
import { useRouletteContext } from '../../context/RouletteContext';
import DroppableArea from './DroppableArea';

function NumberBet({
  number,
  className,
}: {
  number: number;
  className?: string;
}): JSX.Element {
  const { hoverId } = useRouletteBoardHoverStore();
  const winningNumber = useWinningNumber();
  const betKey = useBetKey();
  const { isPreview } = useRouletteContext();
  const referenceDiv = useRef<HTMLDivElement | null>(null);

  const isRedNumber = redNumbers.includes(number.toString());
  const isNumberHover = !isPreview && getIsNumberHover({ number, hoverId });

  const betId = `${RouletteBetTypes.STRAIGHT}-${number}`;

  const { bets, addBet, isRouletteWheelStopped } = useRouletteStore();

  const isBet = bets[betId] && bets[betId].length > 0;
  const betAmount = sum(bets[betId]);

  return (
    <motion.div
      animate={
        isRouletteWheelStopped && Number(winningNumber) === number
          ? {
              backgroundColor: isRedNumber
                ? ['#fe2247', '#fe6e86', '#fe2247']
                : ['#2f4553', '#4b6e84', '#2f4553'],
            }
          : {}
      }
      className={cn(
        'cursor-pointer rounded-sm flex items-center justify-center size-10 text-sm font-semibold relative',
        isRedNumber
          ? 'bg-roulette-red hover:bg-roulette-red-hover'
          : 'bg-roulette-black hover:bg-roulette-black-hover',
        {
          'bg-roulette-red-hover': isRedNumber && isNumberHover,
          'bg-roulette-black-hover': !isRedNumber && isNumberHover,
        },
        className
      )}
      key={betKey}
      onClick={e => {
        e.stopPropagation();
        if (!isPreview) {
          addBet(betId);
        }
      }}
      onKeyDown={event => {
        return event;
      }}
      ref={el => {
        referenceDiv.current = el;
      }}
      role="button"
      tabIndex={0}
      transition={
        isRouletteWheelStopped && Number(winningNumber) === number
          ? {
              duration: 1,
              repeat: Infinity,
            }
          : {
              duration: 0,
              repeat: 0,
            }
      }
    >
      {number}
      {isBet ? (
        <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2">
          <Chip id={betId} size={6} value={betAmount} />
        </div>
      ) : null}

      {shouldRenderCornerBet(number) && (
        <DroppableArea
          betTypeData={{
            betType: RouletteBetTypes.CORNER,
            selection: [number, number + 1, number + 3, number + 4],
          }}
          position="TR"
          reference={referenceDiv}
        />
      )}
      {number === 1 && (
        <DroppableArea
          betTypeData={{
            betType: RouletteBetTypes.STREET,
            selection: [0, 1, 2],
          }}
          position="TL"
          reference={referenceDiv}
        />
      )}
      {number === 2 && (
        <DroppableArea
          betTypeData={{
            betType: RouletteBetTypes.STREET,
            selection: [0, 2, 3],
          }}
          position="TL"
          reference={referenceDiv}
        />
      )}
      {shouldRenderTop(number) && (
        <DroppableArea
          betTypeData={{
            betType: RouletteBetTypes.SPLIT,
            selection: [number, number + 1],
          }}
          position="TC"
          reference={referenceDiv}
        />
      )}
      {shouldRenderRight(number) && (
        <DroppableArea
          betTypeData={{
            betType: RouletteBetTypes.SPLIT,
            selection: [number, number + 3],
          }}
          position="CR"
          reference={referenceDiv}
        />
      )}
      {shouldRenderBottom(number) && (
        <DroppableArea
          betTypeData={{
            betType: RouletteBetTypes.STREET,
            selection: [number, number + 1, number + 2],
          }}
          position="BC"
          reference={referenceDiv}
        />
      )}
      {shouldRenderSixLineBet(number) && (
        <DroppableArea
          betTypeData={{
            betType: RouletteBetTypes.SIXLINE,
            selection: [
              number,
              number + 1,
              number + 2,
              number + 3,
              number + 4,
              number + 5,
            ],
          }}
          position="BR"
          reference={referenceDiv}
        />
      )}
    </motion.div>
  );
}

export default NumberBet;
