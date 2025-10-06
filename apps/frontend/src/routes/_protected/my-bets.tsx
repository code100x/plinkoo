import MyBets from '@/features/my-bets';
import { createFileRoute } from '@tanstack/react-router';
import { rootSearchSchema } from '../__root';

export const Route = createFileRoute('/_protected/my-bets')({
  component: MyBets,
});
