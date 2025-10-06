import { createFileRoute } from '@tanstack/react-router';
import Landing from '@/features/landing';

export const Route = createFileRoute('/_public/')({
  component: RouteComponent,
});

function RouteComponent(): JSX.Element {
  return <Landing />;
}
