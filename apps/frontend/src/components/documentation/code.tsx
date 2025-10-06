import { cn } from '@/lib/utils';
import React from 'react';

const Code = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <code
      className={cn(
        `overflow-x-auto text-sm bg-brand-weak p-4 rounded ${className}`
      )}
    >
      {children}
    </code>
  );
};

export default Code;
