import { useEffect, useState } from 'react';
import { sum } from 'lodash';
import { getBetTypeSelectionId } from '../../utils/helpers';
import useRouletteStore from '../../store/rouletteStore';
import Chip from '../Chip';
import { useRouletteBoardHoverStore } from '../../store/rouletteBoardHoverStore';
import { useRouletteContext } from '../../context/RouletteContext';

interface PositionValues {
  top: string | number;
  left: string | number;
  transform?: string;
}

const POSITIONS: Record<string, PositionValues> = {
  TL: { top: '0%', left: '0%', transform: 'translate(-50%, -50%)' },
  TC: { top: '0%', left: '50%', transform: 'translate(-50%, -50%)' },
  TR: {
    top: '0%',
    left: 'calc(100% + 2px)',
    transform: 'translate(-50%, -50%)',
  },
  CR: {
    top: '50%',
    left: 'calc(100% + 2px)',
    transform: 'translate(-50%, -50%)',
  },
  BC: { top: '100%', left: '50%', transform: 'translate(-50%, -50%)' },
  BR: {
    top: 'calc(100% + 2px)',
    left: 'calc(100% + 2px)',
    transform: 'translate(-50%, -50%)',
  },

  // Custom Positions for 0-1, 0-2, 0-3 in Roulette with enlarged hit areas
  '0-1': {
    top: `83.33%`,
    left: 'calc(100% + 2px)',
    transform: 'translate(-50%, -50%)',
  },
  '0-3': {
    top: `16.66%`,
    left: 'calc(100% + 2px)',
    transform: 'translate(-50%, -50%)',
  },
};

function DroppableArea({
  position,
  reference,
  betTypeData,
  width,
  height,
}: {
  position: keyof typeof POSITIONS;
  reference: React.RefObject<HTMLDivElement>;
  betTypeData: {
    betType: string;
    selection: number | number[] | null;
  };
  width?: string;
  height?: string;
}): JSX.Element {
  const betId = `${betTypeData.betType}-${getBetTypeSelectionId(
    betTypeData.selection || null
  )}`;

  const { setHoverId } = useRouletteBoardHoverStore();

  const { isPreview } = useRouletteContext();

  const { bets, addBet } = useRouletteStore();

  const [style, setStyle] = useState({});

  useEffect(() => {
    if (reference.current) {
      const rect = reference.current.getBoundingClientRect();

      const { top, left, transform } = POSITIONS[position];

      setStyle({
        position: 'absolute',
        top: typeof top === 'number' ? rect.top + top : top,
        left: typeof left === 'number' ? rect.left + left : left,
        transform: transform || undefined,
        width: width || '12px',
        height: height || '12px',
        zIndex: 10,
      });
    }
  }, [position, reference, width, height]);

  const isBet = bets[betId] && bets[betId].length > 0;
  const betAmount = sum(bets[betId]);

  return (
    <div
      onClick={e => {
        e.stopPropagation();
        if (isPreview) return;
        addBet(betId);
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
      style={style}
      tabIndex={0}
    >
      {/* Use a transparent div with the full size for the hit area */}
      <div className="w-full h-full relative">
        {isBet ? (
          <div className="absolute w-full h-full lg:-translate-y-[20%] lg:-translate-x-[10%] flex lg:block items-center justify-center">
            <Chip id={betId} size={6} value={betAmount} />
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default DroppableArea;
