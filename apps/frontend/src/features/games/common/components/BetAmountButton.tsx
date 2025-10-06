import { Button } from '@/components/ui/button';

export function BetAmountButton({
  label,
  onClick,
  disabled,
}: {
  label: string;
  onClick: () => void;
  disabled?: boolean;
}): JSX.Element {
  return (
    <Button
      className="bg-input-disabled text-white rounded-none h-full hover:bg-opacity-80 hover:bg-[#557086]"
      disabled={disabled}
      onClick={onClick}
    >
      {label}
    </Button>
  );
}
