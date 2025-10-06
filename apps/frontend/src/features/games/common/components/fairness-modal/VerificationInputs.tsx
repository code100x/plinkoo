import { useEffect, useState } from 'react';
import { ChevronDownIcon, ChevronUpIcon } from 'lucide-react';
import { Link, useLocation } from '@tanstack/react-router';
import { Label } from '@/components/ui/label';
import InputWithIcon from '@/common/forms/components/InputWithIcon';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import type { GameMeta } from '@/lib/verificationOutcomes';
import { getVerificationOutcome } from '@/lib/verificationOutcomes';
import { Games, type Game } from '@/const/games';
import CommonSelect from '@/components/ui/common-select';

export interface VerificationInputsState {
  clientSeed: string;
  serverSeed: string;
  nonce: number;
  meta?: GameMeta;
}
export interface MaybeVerificationInputsState {
  clientSeed?: string;
  serverSeed?: string;
  nonce?: number;
}

function VerificationInputs({
  setOutcome,
  onSetVerificationInputs,
  game,
  initialInputState,
}: {
  setOutcome: (outcome: string | number[] | null) => void;
  onSetVerificationInputs?: (inputs: VerificationInputsState | null) => void;
  game: Game;
  initialInputState?: MaybeVerificationInputsState | null;
}): JSX.Element {
  const { pathname } = useLocation();

  const [meta, setMeta] = useState<GameMeta | null>(null);

  const [verificationInputs, setVerificationInputs] =
    useState<VerificationInputsState>({
      clientSeed: '',
      serverSeed: '',
      nonce: 1,
    });

  useEffect(() => {
    if (initialInputState) {
      setVerificationInputs({
        clientSeed: initialInputState.clientSeed ?? '',
        serverSeed: initialInputState.serverSeed ?? '',
        nonce: initialInputState.nonce ?? 1,
      });
    }
  }, [initialInputState]);

  const handleInputChange = (
    input: keyof VerificationInputsState,
    value: string
  ): void => {
    setVerificationInputs(prev => ({ ...prev, [input]: value }));
  };

  const incrementNonce = (): void => {
    setVerificationInputs(prev => ({
      ...prev,
      nonce: Number(prev.nonce) + 1,
    }));
  };

  const decrementNonce = (): void => {
    setVerificationInputs(prev => ({
      ...prev,
      nonce: Math.max(0, Number(prev.nonce) - 1),
    }));
  };

  const getGameMeta = (): JSX.Element | null => {
    switch (game) {
      case Games.MINES:
        return (
          <CommonSelect
            label="Mines"
            onValueChange={(value: string) => {
              setMeta({ minesCount: Number(value) });
              setVerificationInputs(prev => ({
                ...prev,
                meta: { minesCount: Number(value) },
              }));
            }}
            options={Array.from({ length: 24 }, (_, i) => ({
              label: (i + 1).toString(),
              value: (i + 1).toString(),
            }))}
            value={meta?.minesCount.toString() ?? '3'}
          />
        );
      default:
        return null;
    }
  };

  useEffect(() => {
    const { clientSeed, serverSeed, nonce } = verificationInputs;
    if (!clientSeed || !serverSeed) {
      setOutcome(null);
      onSetVerificationInputs?.(null);
      return;
    }

    void (async () => {
      try {
        const outcome = await getVerificationOutcome({
          game,
          clientSeed,
          serverSeed,
          nonce,
          ...(meta ? { meta } : {}),
        });
        setOutcome(outcome);
        onSetVerificationInputs?.(verificationInputs);
      } catch (error: unknown) {
        return error;
      }
    })();
  }, [verificationInputs, setOutcome, onSetVerificationInputs, game, meta]);

  return (
    <div className="flex flex-col gap-2">
      <div>
        <Label className="pl-px text-xs text-neutral-weak font-medium">
          Client Seed
        </Label>
        <div className="flex h-8 rounded-sm overflow-hidden group">
          <InputWithIcon
            className="text-neutral-default disabled:opacity-100 font-medium text-sm disabled:cursor-text"
            icon={null}
            onChange={e => {
              handleInputChange('clientSeed', e.target.value);
            }}
            value={verificationInputs.clientSeed}
            wrapperClassName={cn(
              'bg-brand-stonger h-8 border-brand-weaker shadow-none w-full pr-0 '
            )}
          />
        </div>
      </div>
      <div>
        <Label className="pl-px text-xs text-neutral-weak font-medium">
          Server Seed
        </Label>
        <div className="flex h-8 rounded-sm overflow-hidden group">
          <InputWithIcon
            className="text-neutral-default disabled:opacity-100 font-medium text-sm disabled:cursor-text"
            icon={null}
            onChange={e => {
              handleInputChange('serverSeed', e.target.value);
            }}
            value={verificationInputs.serverSeed}
            wrapperClassName={cn(
              'bg-brand-stronger h-8 border-brand-weaker shadow-none w-full pr-0 '
            )}
          />
        </div>
      </div>
      <div>
        <Label className="pl-px text-xs text-neutral-weak font-medium">
          Nonce
        </Label>
        <div className="flex h-8 rounded-sm overflow-hidden group">
          <div className="rounded-l-sm flex items-center bg-brand-weaker w-full">
            <InputWithIcon
              className="text-neutral-default disabled:opacity-100 font-medium text- disabled:cursor-text"
              icon={null}
              min={0}
              onChange={e => {
                handleInputChange('nonce', e.target.value);
              }}
              step={1}
              type="number"
              value={verificationInputs.nonce}
              wrapperClassName={cn(
                'bg-brand-stronger h-8 border-brand-weaker shadow-none w-full pr-0 rounded-r-none'
              )}
            />
          </div>

          <Button
            className="bg-brand-weaker text-white rounded-none h-full hover:bg-opacity-80 hover:bg-brand-weakest shadow-none"
            onClick={incrementNonce}
          >
            <ChevronUpIcon className="size-4" />
          </Button>
          <Button
            className="bg-brand-weaker text-white rounded-none h-full hover:bg-opacity-80 hover:bg-brand-weakest shadow-none"
            onClick={decrementNonce}
          >
            <ChevronDownIcon className="size-4" />
          </Button>
        </div>
      </div>
      <div>{getGameMeta()}</div>
      {!pathname.includes('/provably-fair/calculation') && (
        <Link
          target="_blank"
          to="/provably-fair/calculation"
          search={{
            game,
            clientSeed: verificationInputs.clientSeed,
            serverSeed: verificationInputs.serverSeed,
            nonce: verificationInputs.nonce,
          }}
        >
          <p className="text-xs text-center font-medium my-2">
            View calculation breakdown
          </p>
        </Link>
      )}
    </div>
  );
}

export default VerificationInputs;
