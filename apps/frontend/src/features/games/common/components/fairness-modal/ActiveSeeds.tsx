import { CopyIcon } from 'lucide-react';
import type { ProvablyFairStateResponse } from '@repo/common/types';
import InputWithIcon from '@/common/forms/components/InputWithIcon';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

function ActiveSeeds({
  activeSeeds,
  isLoading,
}: {
  activeSeeds?: ProvablyFairStateResponse;
  isLoading: boolean;
}): JSX.Element {
  const activeSeedInputs = [
    {
      key: 'clientSeed',
      label: 'Active Client Seed',
      value: activeSeeds?.clientSeed,
      isCopyActive: true,
    },
    {
      key: 'hashedServerSeed',
      label: 'Active Server Seed (Hashed)',
      value: activeSeeds?.hashedServerSeed,
      isCopyActive: true,
    },
    {
      key: 'nonce',
      label: 'Total bets made with this pair',
      value: activeSeeds?.nonce,
      isCopyActive: false,
    },
  ];

  return (
    <div className="flex flex-col gap-2 p-3">
      {activeSeedInputs.map(input => (
        <div key={input.key}>
          <Label className="pl-px text-xs text-neutral-weak font-medium">
            {input.label}
          </Label>
          <div className="flex h-8 rounded-sm overflow-hidden group">
            <div className="rounded-l-sm flex items-center bg-brand-weaker w-full">
              <InputWithIcon
                className="text-neutral-default disabled:opacity-100 font-medium text-xs disabled:cursor-text"
                disabled={isLoading}
                icon={null}
                value={isLoading ? '⏳' : input.value}
                wrapperClassName={cn(
                  'bg-brand-weaker h-8 border-brand-weaker shadow-none w-full pr-0 '
                )}
              />
            </div>
            {input.isCopyActive ? (
              <Button
                className="bg-brand-weaker text-white rounded-none h-full hover:bg-opacity-80 hover:bg-brand-weakest shadow-none"
                disabled={isLoading}
                onClick={() => {
                  void navigator.clipboard.writeText(String(input.value || ''));
                }}
              >
                <CopyIcon className="size-4" />
              </Button>
            ) : null}
          </div>
        </div>
      ))}
    </div>
  );
}

export default ActiveSeeds;
