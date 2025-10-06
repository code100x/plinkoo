import { useRef } from 'react';
import { sum } from 'lodash';
import { motion } from 'motion/react';
import { RouletteBetTypes } from '@repo/common/game-utils/roulette/validations.js';
import { cn } from '@/lib/utils';
import { useRouletteBoardHoverStore } from '../../store/rouletteBoardHoverStore';
import { getIsNumberHover } from '../../utils/hover';
import useRouletteStore from '../../store/rouletteStore';
import Chip from '../Chip';
import {
  useWinningNumber,
  useBetKey,
} from '../../store/rouletteStoreSelectors';
import { useRouletteContext } from '../../context/RouletteContext';
import DroppableArea from './DroppableArea';

function ZeroBet({ className }: { className?: string }): JSX.Element {
  const { hoverId } = useRouletteBoardHoverStore();
  const referenceDiv = useRef<HTMLDivElement | null>(null);

  const { isPreview } = useRouletteContext();

  const isNumberHover = !isPreview && getIsNumberHover({ number: 0, hoverId });
  const winningNumber = useWinningNumber();

  const betId = `${RouletteBetTypes.STRAIGHT}-0`;
  const { bets, addBet, isRouletteWheelStopped } = useRouletteStore();

  const isBet = bets[betId] && bets[betId].length > 0;
  const betAmount = sum(bets[betId]);

  const isWinning = isRouletteWheelStopped && Number(winningNumber) === 0;
  const betKey = useBetKey();
  return (
    <motion.div
      animate={
        isWinning
          ? {
              backgroundColor: ['#419e3f', '#69c267', '#419e3f'],
            }
          : {}
      }
      className={cn(
        'cursor-pointer select-none relative rounded-sm flex items-center justify-center w-10 text-sm font-semibold bg-roulette-green lg:hover:bg-roulette-green-hover',
        {
          'lg:bg-roulette-green-hover': isNumberHover,
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
        isWinning
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
      0
      {isBet ? (
        <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2">
          <Chip id={betId} size={6} value={betAmount} />
        </div>
      ) : null}
      <DroppableArea
        betTypeData={{
          betType: RouletteBetTypes.SPLIT,
          selection: [0, 1],
        }}
        position="0-1"
        reference={referenceDiv}
      />
      <DroppableArea
        betTypeData={{
          betType: RouletteBetTypes.SPLIT,
          selection: [0, 2],
        }}
        position="CR"
        reference={referenceDiv}
      />
      <DroppableArea
        betTypeData={{
          betType: RouletteBetTypes.SPLIT,
          selection: [0, 3],
        }}
        position="0-3"
        reference={referenceDiv}
      />
      <DroppableArea
        betTypeData={{
          betType: RouletteBetTypes.CORNER,
          selection: [0, 1, 2, 3],
        }}
        position="BR"
        reference={referenceDiv}
      />
    </motion.div>
  );
}

export default ZeroBet;
