import React from 'react';
import { cn } from '@/lib/utils';

const BetsIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      fill="currentColor"
      viewBox="0 0 64 64"
      className={cn('svg-icon size-4 icon-neutral-weak', className)}
    >
      <title></title>
      <path d="M0 3.55v7.12h7.12v49.787h6.214c.778-3.122 3.556-5.398 6.866-5.398a7.07 7.07 0 0 1 6.856 5.348l.01.048h9.974c.778-3.122 3.556-5.398 6.866-5.398a7.07 7.07 0 0 1 6.856 5.348l.01.048h6.16V10.667h7.066v-7.12zm35.546 37.335h-17.76V35.55h17.76zM46.214 26.67H17.788v-5.334h28.426z"></path>
    </svg>
  );
};

export default BetsIcon;
