import { z } from 'zod';
import { BlackjackActions } from './types';

export const BlackjackBetSchema = z.object({
  betAmount: z.number().min(0.01, 'Bet amount must be at least 0.01'),
});

export const BlackjackPlayRoundSchema = z.object({
  action: z
    .enum([
      BlackjackActions.HIT,
      BlackjackActions.STAND,
      BlackjackActions.DOUBLE,
      BlackjackActions.SPLIT,
      BlackjackActions.INSURANCE,
      BlackjackActions.NOINSURANCE,
    ])
    .refine(val => Boolean(val), {
      message: 'Invalid blackjack action',
    }),
});
