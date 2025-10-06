import { z } from 'zod';

export const placeBetSchema = z.object({
  target: z.number(),
  condition: z.enum(['above', 'below']),
  betAmount: z.number(),
});
