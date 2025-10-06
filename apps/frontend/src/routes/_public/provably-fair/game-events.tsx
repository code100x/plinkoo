import GameEvents from '@/features/provaly-fair/GameEvents';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_public/provably-fair/game-events')({
  component: RouteComponent,
});

function RouteComponent() {
  return <GameEvents />;
}
