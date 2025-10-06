import { cn } from '@/lib/utils';
import { ExternalLink } from 'lucide-react';
import React from 'react';

const Link = ({
  link,
  text,
  className,
}: {
  link: string;
  text: string;
  className?: string;
}) => {
  return (
    <span
      className={cn(
        'font-semibold text-primary inline-flex gap-1.5 pr-2 text-sm items-center',
        className
      )}
    >
      <a href={link} target="_blank" rel="noopener noreferrer">
        {text}
      </a>
      <ExternalLink className="size-4 icon-neutral-weakest" />
    </span>
  );
};

export default Link;
