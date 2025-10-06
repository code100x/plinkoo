import type { MinesRound } from '@repo/common/game-utils/mines/types.js';
import React from 'react';
import { cn } from '@/lib/utils';

interface InactiveGameTileProps {
  index: number;
  isGameLost: boolean;
  mines: Set<number> | null;
  selectedTiles?: Set<number> | null;
  lastRound?: MinesRound | null;
  isPreview?: boolean;
  className?: string;
}
function InactiveGameTile({
  index,
  isGameLost,
  mines,
  selectedTiles,
  lastRound,
  isPreview = false,
  className = '',
}: InactiveGameTileProps): JSX.Element {
  const renderTile = (): JSX.Element => {
    if (isPreview) {
      if (mines?.has(index))
        return (
          <img
            alt="diamond"
            className="scale-[0.67]"
            src="/games/mines/mine.svg"
          />
        );
      return (
        <img
          alt="diamond"
          className="scale-[0.67]"
          src="/games/mines/diamond.svg"
        />
      );
    }
    if (isGameLost) {
      if (index === lastRound?.selectedTileIndex)
        return (
          <>
            <img
              alt="diamond"
              className="absolute top-1/2 left-1/2 scale-125 -translate-x-1/2 -translate-y-1/2"
              src="/games/mines/bomb-effect.webp"
            />
            <img
              alt="diamond"
              className="scale-[0.67]"
              src="/games/mines/mine.svg"
            />
          </>
        );
      if (mines?.has(index))
        return (
          <img
            alt="diamond"
            className="scale-50 opacity-30"
            src="/games/mines/mine.svg"
          />
        );
      if (selectedTiles?.has(index))
        return (
          <img
            alt="diamond"
            className="scale-[0.67]"
            src="/games/mines/diamond.svg"
          />
        );
      return (
        <img
          alt="diamond"
          className="scale-50 opacity-30"
          src="/games/mines/diamond.svg"
        />
      );
    }
    if (selectedTiles?.has(index))
      return (
        <img
          alt="diamond"
          className="scale-[0.67]"
          src="/games/mines/diamond.svg"
        />
      );
    if (mines?.has(index))
      return (
        <img
          alt="diamond"
          className="scale-50 opacity-30"
          src="/games/mines/mine.svg"
        />
      );
    return (
      <img
        alt="diamond"
        className="scale-50 opacity-30"
        src="/games/mines/diamond.svg"
      />
    );
  };
  return (
    <div
      className={cn(
        'size-16 md:size-[76px] lg:size-24 bg-brand-strongest rounded-md cursor-pointer flex items-center justify-center relative',
        className
      )}
      key={index}
    >
      {renderTile()}
    </div>
  );
}

export default InactiveGameTile;
