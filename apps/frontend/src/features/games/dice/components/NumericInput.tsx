import InputWithIcon from '@/common/forms/components/InputWithIcon';
import { Label } from '@/components/ui/label';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { Fragment } from 'react';

const NumericInput = ({
  isValid,
  label,
  min,
  max,
  step,
  value,
  onChange = () => {},
  icon: Icon,
  tooltipContent = <></>,
  disabled = false,
}: {
  isValid: boolean;
  label: string;
  min?: number;
  max?: number;
  step?: number;
  value: number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  tooltipContent?: React.ReactNode;
  icon: React.ElementType;
  disabled?: boolean;
}) => {
  return (
    <div className="flex-1">
      <Label className="pl-px text-xs font-semibold">{label}</Label>
      <TooltipProvider>
        <Tooltip delayDuration={0}>
          {!isValid && (
            <TooltipTrigger>
              <InputWithIcon
                icon={<Icon className="text-gray-500 w-5 h-5" />}
                min={min}
                max={max}
                onChange={onChange}
                step={step}
                type="number"
                value={value}
                wrapperClassName="border-red-500 hover:border-red-500"
              />
            </TooltipTrigger>
          )}
          {tooltipContent}
        </Tooltip>
      </TooltipProvider>
      {isValid ? (
        <InputWithIcon
          icon={<Icon className="text-gray-500 w-5 h-5" />}
          min={min}
          onChange={onChange}
          step={step}
          max={max}
          type="number"
          value={value}
          disabled={disabled}
          wrapperClassName={cn({
            'bg-brand-weaker h-8 mt-1': disabled,
          })}
          className={cn({ 'disabled:opacity-100': disabled })}
        />
      ) : null}
    </div>
  );
};

export default NumericInput;
