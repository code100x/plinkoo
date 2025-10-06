import { createFileRoute } from '@tanstack/react-router';
import TermsAndConditions from '@/features/terms-and-conditions';

export const Route = createFileRoute('/_public/terms-and-conditions')({
  component: TermsAndConditions,
});
