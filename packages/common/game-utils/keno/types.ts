import { z } from 'zod';

export type KenoRisk = 'low' | 'medium' | 'high' | 'classic';
export type KenoPayout = Record<number, Record<number, number>>;
export type KenoPayoutMultiplier = Record<KenoRisk, KenoPayout>;

export const KenoRequestSchema = z.object({
  risk: z.enum(['low', 'medium', 'high', 'classic']),
  selectedTiles: z.array(z.number().int().min(1).max(40)).min(1).max(10),
  betAmount: z.number().positive(),
});

export type KenoRequest = z.infer<typeof KenoRequestSchema>;

export interface KenoState {
  risk: KenoRisk;
  selectedTiles: number[];
  drawnNumbers: number[];
}

export interface KenoResponse {
  id: string;
  state: KenoState;
  payoutMultiplier: number;
  payout: number;
  balance: number;
}
