import type { DicePlaceBetResponse } from '@repo/common/game-utils/dice/types.js';
import { cn } from '@/lib/utils';

interface DiceResultPillsCarouselProps {
  results: DicePlaceBetResponse[];
}

export function DiceResultPillsCarousel({
  results,
}: DiceResultPillsCarouselProps): JSX.Element {
  const getAnimationClass = (index: number, resultsLength: number): string => {
    if (resultsLength <= 5) return 'animate-slideInLeft';
    return index === 0
      ? 'animate-slideOutLeft opacity-0'
      : 'animate-slideInLeft';
  };

  return (
    <div className="flex w-full items-center justify-end gap-2 min-h-8">
      {results.map(({ id, payoutMultiplier, state }, index) => (
        <span
          className={cn(
            'text-white p-2 rounded-full transition-transform w-16 text-center text-xs font-semibold',
            getAnimationClass(index, results.length),
            payoutMultiplier > 0
              ? 'bg-[#00e600] text-black'
              : 'bg-secondary-light'
          )}
          key={id}
        >
          {state.result}
        </span>
      ))}
    </div>
  );
}
