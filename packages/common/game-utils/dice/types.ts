import { z } from 'zod';
import { placeBetSchema } from './schema';

export type DiceCondition = 'above' | 'below';

export type DicePlaceBetRequestBody = z.infer<typeof placeBetSchema>;

export interface DiceState {
  target: number;
  condition: DiceCondition;
  result: number;
}

export interface DicePlaceBetResponse {
  id: string;
  state: DiceState;
  payoutMultiplier: number;
  payout: number;
  balance: number;
}
