import { BadgeDollarSign } from 'lucide-react';
import { useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import InputWithIcon from '@/common/forms/components/InputWithIcon';
import { BetAmountInput } from './BetAmountInput';

export interface BettingControlsProps {
  betAmount?: number;
  profitOnWin?: number;
  isPending?: boolean;
  onBetAmountChange?: (amount: number, multiplier?: number) => void;
  onBet?: () => Promise<void>;
  betButtonText?: string;
  icon?: React.ReactNode;
}

function ProfitDisplay({
  profitOnWin,
}: Pick<BettingControlsProps, 'profitOnWin'>): JSX.Element {
  return (
    <div>
      <Label className="pl-px text-xs font-semibold">Profit on Win</Label>
      <InputWithIcon
        className="disabled:opacity-100"
        disabled
        icon={<BadgeDollarSign className="text-gray-500" />}
        value={profitOnWin}
        wrapperClassName="bg-input-disabled shadow-md"
      />
    </div>
  );
}

export function BetButton({
  isPending,
  disabled,
  onClick,
  loadingImage,
  betButtonText,
  icon,
  animate = 'animate-spin',
}: Pick<BettingControlsProps, 'isPending'> & {
  disabled: boolean;
  onClick: () => void;
} & {
  loadingImage: string;
  betButtonText?: string;
  icon?: React.ReactNode;
  animate?: string;
}): JSX.Element {
  return (
    <Button
      className="w-full bg-[#00e600] hover:bg-[#1fff20] text-black font-semibold h-12 text-sm"
      disabled={disabled}
      onClick={onClick}
    >
      {isPending ? (
        <img
          alt="Result Dice"
          className={`h-4 w-4 ${animate}`}
          src={loadingImage}
        />
      ) : (
        <div className="flex items-center gap-2">
          {icon}
          {betButtonText ?? 'Bet'}
        </div>
      )}
    </Button>
  );
}

export function BettingControls({
  betAmount,
  profitOnWin,
  isPending,
  onBetAmountChange,
  onBet,
  betButtonText,
  icon,
}: BettingControlsProps): JSX.Element {
  const queryClient = useQueryClient();
  const balance = queryClient.getQueryData<number>(['balance']);
  const isDisabled =
    (betAmount ?? 0) > (balance ?? 0) || (betAmount ?? 0) <= 0 || isPending;

  return (
    <div className="w-full lg:w-1/4 bg-brand-weak flex flex-col gap-4 p-3 py-4">
      <BetAmountInput
        betAmount={betAmount}
        onBetAmountChange={onBetAmountChange}
      />
      <ProfitDisplay profitOnWin={profitOnWin} />
      <BetButton
        betButtonText={betButtonText}
        disabled={Boolean(isDisabled)}
        icon={icon}
        isPending={isPending}
        loadingImage="/games/dice/loading-dice.png"
        onClick={() => void onBet?.()}
      />
    </div>
  );
}
