import * as React from 'react';
import * as SliderPrimitive from '@radix-ui/react-slider';
import { cn } from '@/lib/utils';

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root> & {
    success?: boolean;
  }
>(({ className, success, ...props }, ref) => {
  return (
    props.value && (
      <SliderPrimitive.Root
        className={cn(
          'relative flex w-full touch-none select-none items-center',
          className
        )}
        ref={ref}
        {...props}
      >
        <SliderPrimitive.Thumb
          asChild
          className="focus-visible:outline-none mr-2"
        >
          <div className="relative size-[48px] lg:size-[60px]">
            <img alt="Result Dice" src="/games/dice/result-dice.png" />
            <div
              className={cn(
                'absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-semibold text-xs lg:text-sm',
                success ? 'text-green-600' : 'text-red-600'
              )}
            >
              {props.value[0]}
            </div>
          </div>
        </SliderPrimitive.Thumb>
      </SliderPrimitive.Root>
    )
  );
});

Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };
