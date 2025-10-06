import Implementation from '@/features/provaly-fair/Implementation';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_public/provably-fair/implementation')({
  component: RouteComponent,
});

function RouteComponent() {
  return <Implementation />;
}
