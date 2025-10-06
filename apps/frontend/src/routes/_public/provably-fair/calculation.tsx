import { createFileRoute } from '@tanstack/react-router';
import ProvablyFairCalculation from '@/features/provaly-fair/ProvablyFairCalculation';
import { gameSchema } from '@/const/games';
import { z } from 'zod';

export const calculationSearchSchema = z.object({
  game: gameSchema.optional(),
  clientSeed: z.string().optional(),
  serverSeed: z.string().optional(),
  nonce: z.number().optional(),
});

export const Route = createFileRoute('/_public/provably-fair/calculation')({
  validateSearch: calculationSearchSchema,
  component: ProvablyFairCalculation,
});
