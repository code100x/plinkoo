import { BlackjackActions } from './types';

const PLAYER_TURN_OVER_ACTIONS = [
  BlackjackActions.STAND,
  BlackjackActions.BUST,
  BlackjackActions.DOUBLE,
  BlackjackActions.FULL,
  BlackjackActions.BLACKJACK,
];

export const BLACKJACK = 21;
export const DEALER_STAND_VALUE = 17;

export const PAYOUTS = {
  [BlackjackActions.BLACKJACK]: 1.5,
  [BlackjackActions.WIN]: 1,
  [BlackjackActions.PUSH]: 0,
  [BlackjackActions.LOSE]: -1,
  [BlackjackActions.DOUBLE]: 2,
};

export { PLAYER_TURN_OVER_ACTIONS };
