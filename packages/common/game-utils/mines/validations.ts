import { z } from 'zod';

export const MinesBetSchema = z.object({
  betAmount: z.number().min(0.01, 'Bet amount must be at least 0.01'),
  minesCount: z
    .number()
    .min(1, 'Mines count must be at least 1')
    .max(24, 'Mines count must be less than 25'),
});
