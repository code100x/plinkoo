import { createFileRoute } from '@tanstack/react-router';
import ProvablyFair from '@/features/provaly-fair';

export const Route = createFileRoute('/_public/provably-fair')({
  component: ProvablyFair,
});
