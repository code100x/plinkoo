import { sum } from 'lodash';
import {
  redNumbers,
  blackNumbers,
} from '@repo/common/game-utils/roulette/constants.js';
import { useMemo } from 'react';
import { motion } from 'motion/react';
import { RouletteBetTypes } from '@repo/common/game-utils/roulette/validations.js';
import { cn } from '@/lib/utils';
import { useRouletteBoardHoverStore } from '../../store/rouletteBoardHoverStore';
import useRouletteStore from '../../store/rouletteStore';
import Chip from '../Chip';
import {
  useWinningNumber,
  useBetKey,
} from '../../store/rouletteStoreSelectors';
import { useRouletteContext } from '../../context/RouletteContext';

function BottomColorBets({
  action,
  className,
}: {
  action: RouletteBetTypes;
  className?: string;
}): JSX.Element {
  const { setHoverId } = useRouletteBoardHoverStore();

  const betId = action;
  const { bets, addBet, isRouletteWheelStopped } = useRouletteStore();

  const isBet = bets[betId] && bets[betId].length > 0;
  const betAmount = sum(bets[betId]);

  const { isPreview } = useRouletteContext();

  const winningNumber = useWinningNumber();
  const betKey = useBetKey();
  const isWinning = useMemo(() => {
    if (!winningNumber || !isRouletteWheelStopped) return false;
    switch (action) {
      case RouletteBetTypes.RED:
        return redNumbers.includes(winningNumber.toString());
      case RouletteBetTypes.BLACK:
        return blackNumbers.includes(winningNumber.toString());
      default:
        return false;
    }
  }, [action, isRouletteWheelStopped, winningNumber]);

  return (
    <motion.div
      animate={
        isWinning
          ? {
              backgroundColor:
                action === RouletteBetTypes.RED
                  ? ['#fe2247', '#fe6e86', '#fe2247']
                  : ['#2f4553', '#4b6e84', '#2f4553'],
            }
          : {}
      }
      className={cn(
        'cursor-pointer relative col-span-2 w-full h-10 rounded-sm',
        action === RouletteBetTypes.RED
          ? 'bg-roulette-red hover:bg-roulette-red-hover'
          : 'bg-roulette-black hover:bg-roulette-black-hover',
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
      onMouseEnter={() => {
        setHoverId(action);
      }}
      onMouseLeave={() => {
        setHoverId(null);
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
      {isBet ? (
        <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2">
          <Chip id={betId} size={6} value={betAmount} />
        </div>
      ) : null}
    </motion.div>
  );
}

export default BottomColorBets;
