import React, { useEffect } from 'react';
import { GLOBAL_MODAL } from '../types';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import BetsIcon from '@/assets/icons/bets';
import { cn } from '@/lib/utils';
import { Link, useRouter } from '@tanstack/react-router';
import { Route } from '@/routes/__root';
import BetIcon from '@/assets/icons/bet';
import { useQuery } from '@tanstack/react-query';
import { fetchAllBets, fetchBetById } from '@/api/games/bets';
import { Game, GAME_VALUES_MAPPING, Games } from '@/const/games';
import chunk from 'lodash/chunk';
import CopyIcon from '@/assets/icons/copy';
import { Tooltip } from '@/components/ui/tooltip';
import CommonTooltip from '@/components/ui/common-tooltip';
import { format, isValid } from 'date-fns';
import { BadgeDollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import ProvablyFair from './provably-fair';
import GameViz from './game-viz';

const BetModal = ({ iid, modal }: { iid?: number; modal?: GLOBAL_MODAL }) => {
  const [open, setOpen] = React.useState(!!(iid && modal === GLOBAL_MODAL.BET));
  const [showCopiedText, setShowCopiedText] = React.useState(false);
  const router = useRouter();
  const currentSearchParams = Route.useSearch();

  const { data } = useQuery({
    queryKey: [modal, iid],
    queryFn: () => {
      return fetchBetById(iid!);
    },
    placeholderData: prev => prev,
    enabled: open,
  });

  const { bet } = data?.data || {};

  const handleRemoveParams = () => {
    // Navigate to the current route's path but with the specified search params removed.
    // Remove 'iid' and 'modal' from the search params object before navigating
    router.navigate({
      search: () => {
        return {
          iid: undefined,
          modal: undefined,
        } as never;
      },
    });
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setShowCopiedText(true);
    setTimeout(() => setShowCopiedText(false), 2000);
  };

  useEffect(() => {
    setOpen(!!(iid && modal === GLOBAL_MODAL.BET));
  }, [iid, modal]);

  const onOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    if (!isOpen) {
      handleRemoveParams();
    }
  };

  return (
    <Dialog onOpenChange={onOpenChange} open={open}>
      <DialogContent
        className={cn(
          'sm:max-w-md md:max-w-lg max-h-[80vh] overflow-y-auto p-0 border-0 max-w-sm sm:w-full flex flex-col'
        )}
      >
        <DialogHeader className="p-3 fixed w-full h-12 z-20 bg-brand-default">
          <DialogTitle className="text-sm font-semibold text-neutral-default flex items-center gap-2">
            <BetIcon />
            Bet
          </DialogTitle>
        </DialogHeader>
        {bet ? (
          <div className="flex-1 overflow-auto no-scrollbar">
            <div className="flex flex-col gap-4 pt-12 p-3 pb-4 items-center text-sm">
              <div className="text-center">
                <span className="font-semibold">
                  {GAME_VALUES_MAPPING[bet.game as Game].label}
                </span>
                <div className="flex items-center gap-2 font-semibold text-base">
                  <span>
                    ID:{' '}
                    {chunk(bet.betId, 3)
                      .map(idChunk => idChunk.join(''))
                      .join(',')}
                  </span>

                  <CommonTooltip
                    content={'Copied, share online!'}
                    contentClassName="p-2 px-3 bg-primary text-primary-foreground text-xs"
                    open={showCopiedText}
                    arrowClassName="fill-primary"
                  >
                    <div onClick={handleCopyLink}>
                      <CopyIcon className="cursor-pointer hover:text-neutral-default size-3.5" />
                    </div>
                  </CommonTooltip>
                </div>
              </div>
              <div className="text-neutral-weak text-xs text-center flex flex-col gap-1">
                <div>
                  Placed by{' '}
                  <span className="font-semibold hover:text-primary cursor-pointer">
                    {bet?.user?.name}
                  </span>
                </div>
                <div>
                  on {format(new Date(bet?.date), 'M/d/yyyy')} at{' '}
                  {format(new Date(bet?.date), 'h:mm a')}
                </div>
              </div>
              <div className="flex gap-4 w-full before:block before:w-full before:h-0.5 before:bg-brand-weaker items-center after:block after:bg-brand-weaker after:w-full after:h-0.5">
                <img
                  alt="SimCasino Logo"
                  className="h-4 my-4 w-auto before:content-['']"
                  src="/sim-casino-logo.webp"
                />
              </div>
              <div className="rounded-sm bg-brand-strongest flex items-stretch p-4 w-full font-medium">
                <div className="flex flex-1 gap-2 flex-col items-center text-neutral-weak text-xs">
                  <span>Bet</span>
                  <span className="text-sm text-primary flex gap-1 items-center">
                    {bet?.betAmount.toFixed(2)}
                    <BadgeDollarSign className="text-gray-500 size-4" />
                  </span>
                </div>
                <div className="bg-brand-weaker w-0.5" />
                <div className="flex flex-1 flex-col gap-2 items-center text-neutral-weak text-xs">
                  <span>Multiplier</span>
                  <span className="text-sm text-primary flex gap-1 items-center">
                    {bet?.payoutMultiplier.toFixed(2)}x
                  </span>
                </div>
                <div className="bg-brand-weaker w-0.5" />
                <div className="flex flex-1 gap-2 flex-col items-center text-neutral-weak text-xs">
                  <span>Payout</span>
                  <span
                    className={cn('text-sm flex gap-1 items-center', {
                      'text-[#00e701]': bet?.payout - bet?.betAmount > 0,
                    })}
                  >
                    {(bet?.payout - bet?.betAmount).toFixed(2)}
                    <BadgeDollarSign className="text-gray-500 size-4" />
                  </span>
                </div>
              </div>
              <GameViz bet={bet} />
              <Link to={`/casino/games/${bet.game}`}>
                <Button className="rounded-sm bg-brand-weaker text-primary hover:bg-brand-weakest px-5 py-4 h-10 font-medium text-xs">
                  Play {GAME_VALUES_MAPPING[bet.game as Game].label}
                </Button>
              </Link>
            </div>
            {bet.provablyFairState && (
              <Accordion type="single" collapsible>
                <AccordionItem
                  value="provable-fairness"
                  className="bg-brand-stronger"
                >
                  <AccordionTrigger className="p-3 w-full hover:no-underline text-xs">
                    Provable Fairness
                  </AccordionTrigger>
                  <AccordionContent className="px-3">
                    <ProvablyFair bet={bet} />
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            )}
          </div>
        ) : null}
      </DialogContent>
    </Dialog>
  );
};

export default BetModal;
