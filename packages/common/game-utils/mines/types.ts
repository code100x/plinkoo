import type { z } from 'zod';
import type { MinesBetSchema } from './validations';

export type MinesBet = z.infer<typeof MinesBetSchema>;

export interface MinesRound {
  selectedTileIndex: number;
  payoutMultiplier: number;
}

export interface MinesRevealedState {
  mines: number[];
  minesCount: number;
  rounds: MinesRound[];
}

export interface MinesHiddenState {
  mines: null;
  minesCount: number;
  rounds: MinesRound[];
}

export interface MinesPlayRoundResponse {
  id: string;
  state: MinesHiddenState;
  active: boolean;
  betAmount: number;
  balance?: number;
}

export interface MinesGameOverResponse {
  id: string;
  state: MinesRevealedState;
  payoutMultiplier: number;
  payout: number;
  balance: number;
  active: boolean;
}
