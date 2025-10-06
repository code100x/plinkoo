import { ViewportType } from '@/common/hooks/useViewportType';

export enum BetsTableColumns {
  BET_ID = 'betId',
  GAME = 'game',
  DATE = 'date',
  BET_AMOUNT = 'betAmount',
  PAYOUT = 'payout',
  PAYOUT_MULTIPLIER = 'payoutMultiplier',
  USER = 'user',
}

export const betsTableViewportWiseColumns = {
  [ViewportType.Mobile]: [BetsTableColumns.GAME, BetsTableColumns.PAYOUT],
  [ViewportType.Tablet]: [
    BetsTableColumns.GAME,
    BetsTableColumns.PAYOUT,
    BetsTableColumns.PAYOUT_MULTIPLIER,
  ],
  [ViewportType.Desktop]: null,
};
