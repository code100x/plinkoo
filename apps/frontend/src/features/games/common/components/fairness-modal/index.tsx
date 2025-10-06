import { ScaleIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Games, type Game } from '@/const/games';
import { cn } from '@/lib/utils';
import Seeds from './Seeds';
import Verify from './Verify';
import { useNavigate, useRouter } from '@tanstack/react-router';
import { fetchActiveSeeds } from '@/api/user';
import { useQuery } from '@tanstack/react-query';
import { GLOBAL_MODAL } from '@/features/global-modals/types';
import Overview from './Overview';

export function FairnessModal({
  game,
  show,
  tab,
}: {
  game?: Game;
  show: boolean;
  tab: 'seeds' | 'verify' | 'overview';
}): JSX.Element {
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'seeds' | 'verify' | 'overview'>(
    tab
  );
  const navigate = useNavigate();

  const { isPending, data: activeSeeds } = useQuery({
    queryKey: ['active-seeds'],
    queryFn: async () => {
      const apiResponse = await fetchActiveSeeds();
      return apiResponse.data;
    },
    enabled: open,
  });

  useEffect(() => {
    if (tab) {
      setActiveTab(tab);
    }
  }, [tab]);

  const handleRemoveParams = () => {
    // Navigate to the current route's path but with the specified search params removed.
    // Remove 'iid' and 'modal' from the search params object before navigating
    navigate({
      search: searchParam =>
        ({
          game: undefined,
          modal: undefined,
          clientSeed: searchParam.clientSeed,
          serverSeed: searchParam.serverSeed,
          nonce: searchParam.nonce,
        }) as never,
    });
  };

  const onOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    if (!isOpen) {
      handleRemoveParams();
    }
  };

  useEffect(() => {
    setOpen(show);
  }, [show]);

  return (
    <Dialog onOpenChange={onOpenChange} open={show}>
      <DialogContent
        className={cn(
          'sm:max-w-md max-h-[80vh] overflow-y-auto p-0 border-0 max-w-sm sm:w-full flex flex-col',
          {
            'sm:max-w-lg': game === Games.KENO,
          }
        )}
      >
        <DialogHeader className="p-3">
          <DialogTitle className="text-sm font-semibold text-neutral-default flex items-center gap-2">
            <ScaleIcon className="w-4 h-4 icon-neutral-weak" />
            Fairness
          </DialogTitle>
        </DialogHeader>
        <Tabs
          defaultValue={tab}
          onValueChange={value => {
            setActiveTab(value as 'seeds' | 'verify' | 'overview');
            navigate({
              search: {
                modal: GLOBAL_MODAL.FAIRNESS,
                game,
                tab: value,
              } as never,
            });
          }}
          value={activeTab}
        >
          <TabsList className="grid w-3/4 grid-cols-3 mx-auto h-[44px]">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="seeds">Seeds</TabsTrigger>
            <TabsTrigger value="verify">Verify</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <Overview />
          </TabsContent>

          <TabsContent value="seeds">
            <Seeds isPending={isPending} activeSeeds={activeSeeds} />
          </TabsContent>
          <TabsContent value="verify">
            <Verify game={game || Games.DICE} />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
