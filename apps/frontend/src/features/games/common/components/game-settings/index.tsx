import { SettingsIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import CommonTooltip from '@/components/ui/common-tooltip';
import type { Game } from '@/const/games';
import { Link } from '@tanstack/react-router';
import { GLOBAL_MODAL } from '@/features/global-modals/types';

function GameSettingsBar({ game }: { game: Game }): JSX.Element {
  return (
    <div className="bg-brand-stronger container w-full pr-4 p-2 flex items-center justify-between rounded-b-md border-t-brand-weak border-t-2">
      <div className="flex items-center gap-2">
        <CommonTooltip content={<p>Game Settings</p>}>
          <Button className="hover:bg-transparent" size="icon" variant="ghost">
            <SettingsIcon className="size-3.5 icon-neutral-weak hover:icon-neutral-default" />
          </Button>
        </CommonTooltip>
      </div>
      <Link
        to={window.location.pathname}
        search={{
          modal: GLOBAL_MODAL.FAIRNESS,
          game,
        }}
      >
        <p className="text-neutral-weak text-sm font-medium hover:text-neutral-default">
          Fairness
        </p>
      </Link>
    </div>
  );
}

export default GameSettingsBar;
