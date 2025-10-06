import { cn } from '@/lib/utils';
import React from 'react';

const KenoTileUI = ({
  isSelected,
  isDrawn,
  index,
  onClick,
  onKeyDown,
  isTileDisabled,
  className,
}: {
  isSelected: boolean;
  isDrawn: boolean;
  index: number;
  onClick?: () => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLDivElement>) => void;
  isTileDisabled: boolean;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        'size-8 sm:size-12 md:size-16 lg:size-20 bg-brand-weaker rounded-lg cursor-pointer flex items-center justify-center hover:-translate-y-0.5 text-xs sm:text-sm md:text-xl lg:text-2xl font-semibold hover:bg-brand-weakest shadow-lg p-3',
        {
          'bg-keno-selected-tile hover:bg-keno-selected-tile hover:-translate-y-0 shadow-[0_0.3em_rgb(113,0,199)] cursor-default':
            isSelected && !isDrawn,
          'bg-[#071824] shadow-[0.1px_0.3em_#001017_inset] text-end text-[#e9113c]':
            isDrawn && !isSelected,
          "shadow-[0_0.3em_rgb(113,0,199),0_0_0_0.3em_rgb(150,46,255)_inset] text-[#008a01] bg-[url('/games/keno/gem.svg')] bg-center bg-clip-content bg-origin-content cursor-default":
            isDrawn && isSelected,
          'hover:translate-y-0 hover:bg-[#071824]':
            isDrawn && (isSelected || isTileDisabled),
          'shadow-[0_0.3em_#213743]': !isSelected && !isDrawn,
          'opacity-40 cursor-default hover:bg-brand-weaker hover:-translate-y-0':
            isTileDisabled,
          'hover:bg-[#071824]': isTileDisabled && isDrawn && !isSelected,
        },
        className
      )}
      key={index}
      onClick={onClick}
      onKeyDown={onKeyDown}
      role="button"
      tabIndex={0}
    >
      {index}
    </div>
  );
};

export default KenoTileUI;
