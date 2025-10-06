import { createFileRoute } from '@tanstack/react-router';
import { z } from 'zod';

export const Route = createFileRoute('/_public')({
  validateSearch: z.object({
    redirect: z.string().optional().catch(''),
  }),
});
