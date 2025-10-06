import { cn } from '@/lib/utils';
import React from 'react';

const Paragraph = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return <p className={cn('text-sm text-[#b1bad3]', className)}>{children}</p>;
};

export default Paragraph;
