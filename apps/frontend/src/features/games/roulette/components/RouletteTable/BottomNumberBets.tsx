import { useMemo } from 'react';
import sum from 'lodash/sum';
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

function BottomNumberBets({
  action,
  label,
  className,
}: {
  action: string;
  label: string;
  className?: string;
}): JSX.Element {
  const { setHoverId } = useRouletteBoardHoverStore();
  const betId = action;
  const { bets, addBet, isRouletteWheelStopped } = useRouletteStore();
  const isBet = bets[betId] && bets[betId].length > 0;
  const betAmount = sum(bets[betId]);
  const winningNumber = useWinningNumber();
  const betKey = useBetKey();
  const { isPreview } = useRouletteContext();
  const isWinning = useMemo(() => {
    if (!winningNumber || !isRouletteWheelStopped || winningNumber === '0')
      return false;
    switch (action as RouletteBetTypes) {
      case RouletteBetTypes.LOW:
        return Number(winningNumber) >= 1 && Number(winningNumber) <= 18;
      case RouletteBetTypes.HIGH:
        return Number(winningNumber) >= 19 && Number(winningNumber) <= 36;
      case RouletteBetTypes.EVEN:
        return Number(winningNumber) % 2 === 0;
      case RouletteBetTypes.ODD:
        return Number(winningNumber) % 2 !== 0;
      default:
        return false;
    }
  }, [action, isRouletteWheelStopped, winningNumber]);

  return (
    <motion.div
      animate={
        isWinning
          ? {
              backgroundColor: ['#0f212e', '#4b6e84', '#0f212e'],
            }
          : {}
      }
      className={cn(
        'col-span-2 relative cursor-pointer rounded-sm flex items-center justify-center h-10 w-full text-sm font-semibold bg-brand-stronger hover:bg-roulette-black-hover shadow-[inset_0_0_0_.15em_#2f4553] hover:shadow-[inset_0_0_0_.15em_#4b6e84]',
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
      <span className="text-[10px] md:text-xs lg:text-sm lg:rotate-0 flex items-center rotate-90">
        {label}
      </span>
      {isBet ? (
        <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2">
          <Chip id={betId} size={6} value={betAmount} />
        </div>
      ) : null}
    </motion.div>
  );
}

export default BottomNumberBets;
