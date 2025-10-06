import Overview from '@/features/provaly-fair/Overview';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_public/provably-fair/overview')({
  component: RouteComponent,
});

function RouteComponent() {
  return <Overview />;
}
