import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { AlertCircleIcon } from 'lucide-react';
import { Label } from '@/components/ui/label';
import InputWithIcon from '@/common/forms/components/InputWithIcon';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { fetchRevealedServerSeed } from '@/api/user';

function UnhashServerSeed(): JSX.Element {
  const [hashedServerSeed, setHashedServerSeed] = useState<string>('');
  const [revealedServerSeed, setRevealedServerSeed] = useState<string | null>(
    null
  );

  const {
    mutate: revealServerSeed,
    isPending: isRevealing,
    isError,
    error,
  } = useMutation({
    mutationFn: async () => {
      setRevealedServerSeed(null);
      if (!hashedServerSeed || hashedServerSeed.length !== 64) {
        throw new Error('Hashed server seed must be 64 characters long');
      }
      const apiResponse = await fetchRevealedServerSeed(hashedServerSeed);
      if (!apiResponse.data.serverSeed) {
        throw new Error('Server seed not found');
      }
      return apiResponse;
    },
    onSuccess: data => {
      setRevealedServerSeed(data.data.serverSeed);
    },
  });
  return (
    <div className="flex flex-col gap-3">
      <div>
        <Label className="pl-px text-xs text-neutral-weak font-medium">
          Server Seed (Hashed)
        </Label>
        <div className="flex h-8 rounded-sm overflow-hidden group">
          <div className="flex items-center bg-brand-weaker w-full">
            <InputWithIcon
              className="text-neutral-default font-medium text-xs"
              icon={null}
              onChange={e => {
                setHashedServerSeed(e.target.value);
              }}
              value={hashedServerSeed}
              wrapperClassName={cn(
                'bg-brand-stronger border-brand-weaker shadow-none w-full pr-0 h-8 rounded-r-none',
                {
                  'border-red-500': isError,
                }
              )}
            />
          </div>

          <Button
            className="text-xs rounded-none h-8 hover:bg-opacity-80 bg-[#00e600] hover:bg-[#1fff20] shadow-none px-6 font-medium"
            disabled={isRevealing}
            onClick={() => {
              revealServerSeed();
            }}
          >
            Unhash
          </Button>
        </div>
        {isError ? (
          <div className="text-red-500 text-xs flex items-center gap-1 my-2">
            <AlertCircleIcon className="size-4" />
            {error.message}
          </div>
        ) : null}
      </div>
      <div>
        <Label className="pl-px text-xs text-neutral-weak font-medium">
          Server Seed
        </Label>
        <div className="flex h-8 rounded-sm overflow-hidden group">
          <div className="rounded-l-sm flex items-center bg-brand-weaker w-full">
            <InputWithIcon
              className="text-neutral-default disabled:opacity-100 font-medium text-xs"
              disabled
              icon={null}
              value={isRevealing ? '⏳' : revealedServerSeed || ''}
              wrapperClassName={cn(
                'bg-brand-weaker border-brand-weaker shadow-none h-8 w-full pr-0'
              )}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default UnhashServerSeed;
