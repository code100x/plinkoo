import { createFileRoute } from '@tanstack/react-router';
import Login from '@/features/auth';

export const Route = createFileRoute('/_public/login')({
  component: Login,
});
