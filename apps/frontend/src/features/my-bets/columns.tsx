import type { PaginatedBetData } from '@repo/common/types';
import type { ColumnDef } from '@tanstack/react-table';
import { BadgeDollarSign, ListChecksIcon } from 'lucide-react';
import { Link } from '@tanstack/react-router';
import { format, isValid } from 'date-fns';
import { GAME_VALUES_MAPPING } from '@/const/games';
import { cn } from '@/lib/utils';
import { BetsTableColumns } from '@/const/tables';
import { ViewportType } from '@/common/hooks/useViewportType';
import { GLOBAL_MODAL } from '../global-modals/types';

export const columns = (
  viewport: ViewportType
): ColumnDef<PaginatedBetData>[] => {
  return [
    {
      header: 'Game',
      id: BetsTableColumns.GAME,
      accessorKey: BetsTableColumns.GAME,
      cell: ({ row }) => {
        const game =
          GAME_VALUES_MAPPING[
            row.original.game as keyof typeof GAME_VALUES_MAPPING
          ];

        if (viewport !== ViewportType.Desktop) {
          return (
            <Link
              to={window.location.pathname}
              search={{
                modal: GLOBAL_MODAL.BET,
                iid: Number(row.original.betId),
              }}
            >
              <div className="flex items-center gap-2 font-semibold group hover:cursor-pointer">
                {'icon' in game && (
                  <game.icon className="size-3 icon-neutral-weak group-hover:icon-neutral-default" />
                )}
                {game.label}
              </div>
            </Link>
          );
        }

        return (
          <Link to={game.path}>
            <div className="flex items-center gap-2 font-semibold group hover:cursor-pointer">
              {'icon' in game && (
                <game.icon className="size-3 icon-neutral-weak group-hover:icon-neutral-default" />
              )}
              {game.label}
            </div>
          </Link>
        );
      },
    },
    {
      header: 'Bet ID',
      accessorKey: BetsTableColumns.BET_ID,
      id: BetsTableColumns.BET_ID,
      cell: ({ row }) => {
        return (
          <Link
            to={window.location.pathname}
            search={{
              modal: GLOBAL_MODAL.BET,
              iid: Number(row.original.betId),
            }}
          >
            <div className="flex items-center gap-2 group hover:cursor-pointer font-medium">
              <ListChecksIcon className="size-4 icon-neutral-weak group-hover:icon-neutral-default" />
              {row.original.betId}
            </div>
          </Link>
        );
      },
    },

    {
      header: 'Date',
      accessorKey: BetsTableColumns.DATE,
      id: BetsTableColumns.DATE,
      cell: ({ row }) => {
        // Format the date using date-fns
        const date = new Date(row.original.date);
        const formattedDate = isValid(date)
          ? format(date, 'h:mm a M/d/yyyy')
          : String(row.original.date);

        return (
          <div className="text-neutral-weak font-medium">{formattedDate}</div>
        );
      },
      meta: {
        alignment: 'right',
      },
    },
    {
      header: 'Bet Amount',
      accessorKey: BetsTableColumns.BET_AMOUNT,
      id: BetsTableColumns.BET_AMOUNT,
      cell: ({ row }) => {
        return (
          <div className="text-neutral-weak font-medium flex items-center gap-1 justify-end">
            {row.original.betAmount.toFixed(2)}{' '}
            <BadgeDollarSign className="size-3.5 icon-neutral-weak" />
          </div>
        );
      },
      meta: {
        alignment: 'right',
      },
    },
    {
      header: 'Multiplier',
      accessorKey: BetsTableColumns.PAYOUT_MULTIPLIER,
      id: BetsTableColumns.PAYOUT_MULTIPLIER,
      cell: ({ row }) => {
        return (
          <div className="text-neutral-weak font-medium">
            {row.original.payoutMultiplier.toFixed(2)}x
          </div>
        );
      },
      meta: {
        alignment: 'right',
      },
    },
    {
      header: 'Payout',
      accessorKey: BetsTableColumns.PAYOUT,
      id: BetsTableColumns.PAYOUT,
      cell: ({ row }) => {
        return (
          <div
            className={cn(
              'text-neutral-weak font-medium flex items-center gap-1 justify-end',
              {
                'text-[#00e701]': row.original.payout > 0,
              }
            )}
          >
            {row.original.payout.toFixed(2)}{' '}
            <BadgeDollarSign className="size-3.5 icon-neutral-weak" />
          </div>
        );
      },
      meta: {
        alignment: 'right',
      },
    },
  ];
};
