import type { RouletteBet } from './validations';

export interface RouletterPlaceBetState {
  bets: RouletteBet[];
  winningNumber: string;
}

export interface RoulettePlaceBetResponse {
  id: string;
  state: RouletterPlaceBetState;
  payoutMultiplier: number;
  payout: number;
  balance: number;
}
