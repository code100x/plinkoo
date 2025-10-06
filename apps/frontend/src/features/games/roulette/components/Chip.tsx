import { useMemo } from 'react';
import { BadgeDollarSignIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { formatCompactNumber, getYellowToRedColor } from '@/lib/formatters';
import CommonTooltip from '@/components/ui/common-tooltip';

interface ChipProps {
  size?: number;
  value?: number;
  customColor?: string;
  disabled?: boolean;
  onClick?: () => void;
  isSelected?: boolean;
  id?: string;
}

function Chip({
  size = 10,
  value = 1,
  customColor,
  disabled,
  onClick,
  isSelected,
  id,
}: ChipProps): JSX.Element {
  // Calculate color based on value
  // Scale with logarithmic values to better handle a wide range of chip values
  // Example ranges:
  // 1 to 10 = bright yellow
  // 100 to 1000 = orange
  // 10,000+ = bright red
  const chipColor = useMemo(() => {
    if (customColor) return customColor;

    // Use log scale for better distribution across a wide range of values
    const logValue = Math.log10(Math.max(1, value));
    // Using our modified getYellowToRedColor which now transitions from yellow (255,206,0) to deep red (180,0,0)
    return getYellowToRedColor(logValue, 0, 15);
  }, [value, customColor]);

  // Calculate a darker version of the chip color for the shadow
  const shadowColor = useMemo(() => {
    // Get RGB values from the chipColor
    const rgbMatch = /rgb\((?<red>\d+),\s*(?<green>\d+),\s*(?<blue>\d+)\)/.exec(
      chipColor
    );
    if (rgbMatch?.groups) {
      const r = Math.max(0, parseInt(rgbMatch.groups.red, 10) - 80); // Reduce red by 80
      const g = Math.max(0, parseInt(rgbMatch.groups.green, 10) - 60); // Reduce green by 60
      const b = Math.max(0, parseInt(rgbMatch.groups.blue, 10)); // Keep blue as is
      return `rgb(${r}, ${g}, ${b})`;
    }
    return 'rgb(144, 102, 0)'; // Default shadow color
  }, [chipColor]);

  // Get formatted value text
  const formattedValue = formatCompactNumber(value);

  // Generate box shadow based on disabled state
  const boxShadowStyle = isSelected
    ? `${shadowColor} 0px 0.125rem 0px 0px, rgba(255, 255, 255) 0px 0.065rem 0px 0.2rem`
    : `${shadowColor} 0px 0.125rem 0px 0px`;

  return (
    <CommonTooltip
      content={
        <div className="flex items-center gap-1 x">
          <span>{value / 100}</span>
          <span>
            <BadgeDollarSignIcon className="size-4" />
          </span>
        </div>
      }
    >
      <div
        className={cn(
          "bg-[url('/games/roulette/chip-bg-img.svg')] bg-contain bg-no-repeat bg-center rounded-full flex items-center justify-center shrink-0",
          { 'opacity-40': disabled },
          { 'cursor-default': disabled }
        )}
        onClick={() => {
          if (!disabled) {
            onClick?.();
          }
        }}
        onKeyDown={e => {
          if (e.key === 'Enter' || e.key === ' ') {
            if (!disabled) {
              onClick?.();
            }
          }
        }}
        role="button"
        style={{
          backgroundColor: chipColor,
          width: `${size * 4}px`,
          height: `${size * 4}px`,
          boxShadow: boxShadowStyle,
        }}
        tabIndex={0}
      >
        <span
          className={cn(
            'select-none text-black text-[9px] font-bold drop-shadow-sm truncate',
            {
              'text-[8px]': id,
            }
          )}
        >
          {formattedValue}
        </span>
      </div>
    </CommonTooltip>
  );
}

export default Chip;
