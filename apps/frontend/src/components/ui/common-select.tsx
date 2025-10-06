import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './select';
import { Label } from './label';

interface CommonSelectProps {
  label: ReactNode;
  options: {
    label: ReactNode;
    value: string;
  }[];
  onValueChange: (value: string) => void;
  value: string | null;
  triggerClassName?: string;
  labelClassName?: string;
}

function CommonSelect({
  label,
  options,
  onValueChange,
  value,
  triggerClassName,
  labelClassName,
}: CommonSelectProps): JSX.Element {
  return (
    <div>
      <Label
        className={cn(
          'pl-px text-xs text-neutral-weak font-medium',
          labelClassName
        )}
      >
        {label}
      </Label>
      <Select onValueChange={onValueChange} value={value ?? ''}>
        <SelectTrigger
          className={cn('h-8 pl-2 text-sm font-medium', triggerClassName)}
        >
          <SelectValue className="text-neutral-default" />
        </SelectTrigger>
        <SelectContent>
          {options.map(option => (
            <SelectItem
              className="h-7 text-sm font-medium"
              key={option.value}
              value={option.value}
            >
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

export default CommonSelect;
