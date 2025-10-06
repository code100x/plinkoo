import { createFileRoute } from '@tanstack/react-router';
import UnhashServerSeed from '@/features/provaly-fair/UnhashServerSeed';

export const Route = createFileRoute(
  '/_public/provably-fair/unhash-server-seed'
)({
  component: UnhashServerSeed,
});
