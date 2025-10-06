import Conversions from '@/features/provaly-fair/Conversions';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_public/provably-fair/conversions')({
  component: RouteComponent,
});

function RouteComponent() {
  return <Conversions />;
}
