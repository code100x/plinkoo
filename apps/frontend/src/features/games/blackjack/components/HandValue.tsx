import React from 'react';
import { Badge } from '@/components/ui/badge';
import { CardBorders } from '@/components/ui/playing-card';
import { cn } from '@/lib/utils';

function HandValue({
  value,
  rightPosition,
  background = CardBorders.TRANSPARENT,
  className,
}: {
  value: number | string;
  rightPosition: number;
  background?: CardBorders;
  className?: string;
}): JSX.Element | null {
  if (!value) {
    return null;
  }
  return (
    <Badge
      className={cn(
        'absolute -top-6 lg:-top-8 transform rounded-full px-2 lg:px-4 font-bold text-[10px] lg:text-sm text-black transition-all duration-300 ease-in-out min-w-max',
        {
          'bg-roulette-red hover:bg-roulette-red':
            background === CardBorders.ERROR,
          'bg-[#1fff20] hover:bg-[#1fff20]': background === CardBorders.SUCCESS,
          'bg-[#ff9d00] hover:bg-[#ff9d00]': background === CardBorders.WARNING,
          'bg-[#1475e1] hover:bg-[#1475e1]': background === CardBorders.INFO,
          'bg-brand-weakest hover:bg-brand-weakest text-primary':
            background === CardBorders.TRANSPARENT,
        },
        className
      )}
      style={{
        right: -rightPosition,
        transition: 'right 0.3s ease-in-out, transform 0.3s ease-in-out',
      }}
    >
      {value}
    </Badge>
  );
}

export default HandValue;
