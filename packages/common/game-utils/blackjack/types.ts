import type { CardDeck } from '../cards/types';

export enum BlackjackActions {
  DEAL = 'deal',
  HIT = 'hit',
  STAND = 'stand',
  DOUBLE = 'double',
  SPLIT = 'split',
  INSURANCE = 'insurance',
  NOINSURANCE = 'noInsurance',
  BUST = 'bust',
  FULL = 'full',
  BLACKJACK = 'blackjack',
  WIN = 'win',
  LOSE = 'lose',
  PUSH = 'push',
}

export interface PlayerGameState {
  actions: BlackjackActions[];
  value: number;
  cards: CardDeck[];
}

export interface DealerGameState {
  actions: (
    | BlackjackActions.DEAL
    | BlackjackActions.HIT
    | BlackjackActions.BLACKJACK
    | BlackjackActions.BUST
  )[];
  value: number;
  cards: CardDeck[];
}

export interface SafeDealerGameState {
  actions: (
    | BlackjackActions.DEAL
    | BlackjackActions.HIT
    | BlackjackActions.BLACKJACK
    | BlackjackActions.BUST
  )[];
  value: number;
  cards: [CardDeck];
}

export interface BlackjackGameState {
  player: PlayerGameState[];
  dealer: DealerGameState;
}

export interface SafeBlackjackGameState {
  player: PlayerGameState[];
  dealer: SafeDealerGameState;
}

export interface BlackjackPlayRoundResponse {
  id: string;
  state: SafeBlackjackGameState | BlackjackGameState;
  active: boolean;
  betAmount: number;
  amountMultiplier: number;
  payout?: number;
  payoutMultiplier?: number;
  balance: number;
}
