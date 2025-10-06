import { sum } from 'lodash';
import { motion } from 'motion/react';
import { useMemo } from 'react';
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

function DozenBet({
  dozen,
  className,
}: {
  dozen: number;
  className?: string;
}): JSX.Element {
  const { setHoverId } = useRouletteBoardHoverStore();

  const { isPreview } = useRouletteContext();

  const betId = `${RouletteBetTypes.DOZEN}-${dozen}`;
  const { bets, addBet, isRouletteWheelStopped } = useRouletteStore();

  const isBet = bets[betId] && bets[betId].length > 0;
  const betAmount = sum(bets[betId]);

  const winningNumber = useWinningNumber();
  const betKey = useBetKey();
  const isWinning = useMemo(() => {
    if (!isRouletteWheelStopped) return false;
    return (
      winningNumber &&
      Number(winningNumber) > (dozen - 1) * 12 &&
      Number(winningNumber) <= dozen * 12
    );
  }, [dozen, isRouletteWheelStopped, winningNumber]);

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
        'cursor-pointer relative select-none rounded-sm flex items-center justify-center h-10 w-full text-sm font-semibold bg-brand-stronger hover:bg-roulette-black-hover shadow-[inset_0_0_0_.15em_#2f4553] hover:shadow-[inset_0_0_0_.15em_#4b6e84]',
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
        setHoverId(betId);
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
      <span className="text-xs md:text-md lg:rotate-0 flex items-center rotate-90">
        {12 * (dozen - 1) + 1} to {12 * (dozen - 1) + 12}
      </span>
      {isBet ? (
        <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2">
          <Chip id={betId} size={6} value={betAmount} />
        </div>
      ) : null}
    </motion.div>
  );
}

export default DozenBet;
