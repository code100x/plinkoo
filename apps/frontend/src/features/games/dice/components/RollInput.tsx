import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import React from 'react';

const RollInput = ({
  condition,
  label,
  onClick,
  onKeyDown,
  value,
  icon: Icon,
  disabled = false,
}: {
  condition: 'above' | 'below';
  label: string;
  onClick?: () => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLDivElement>) => void;
  value: number;
  icon: React.ElementType;
  disabled?: boolean;
}) => {
  return (
    <div className="flex-1">
      <Label className="pl-px font-semibold">
        {label} {condition === 'above' ? 'Over' : 'Under'}
      </Label>
      <div
        className={cn(
          'bg-background h-10 w-full rounded flex items-center justify-between px-3 text-sm cursor-pointer border-2 border-brand-weaker',
          {
            'bg-brand-weaker h-8 mt-1': disabled,
          }
        )}
        onClick={onClick}
        onKeyDown={onKeyDown}
        role="button"
        tabIndex={0}
      >
        <span>{value}</span>
        <Icon className="text-gray-500 w-5 h-5 cursor-pointer" />
      </div>
    </div>
  );
};

export default RollInput;
