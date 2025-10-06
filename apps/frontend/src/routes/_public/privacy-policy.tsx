import { createFileRoute } from '@tanstack/react-router';
import PrivacyPolicy from '@/features/privacy-policy';

export const Route = createFileRoute('/_public/privacy-policy')({
  component: PrivacyPolicy,
});
