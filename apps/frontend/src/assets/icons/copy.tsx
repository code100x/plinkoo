import { cn } from '@/lib/utils';
import React from 'react';

const CopyIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      fill="currentColor"
      viewBox="0 0 64 64"
      className={cn('svg-icon size-4 icon-neutral-weak', className)}
    >
      <path d="M61.332 64H15.998V12.986h45.334zM2.664 0v45.466h6.614V6.506h38.96V0z"></path>
    </svg>
  );
};

export default CopyIcon;
