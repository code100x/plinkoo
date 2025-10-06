import { NotepadTextIcon } from 'lucide-react';
import MyBetsTable from './my-bets-table';
import BetsIcon from '@/assets/icons/bets';

const provablyFairRoutes = [
  {
    label: 'Overview',
    path: '/provably-fair',
  },
  {
    label: 'Implementation',
    path: '/provably-fair/implementation',
  },
  {
    label: 'Conversions',
    path: '/provably-fair/conversions',
  },
  {
    label: 'Game Events',
    path: '/provably-fair/game-events',
  },
  {
    label: 'Unhash Server Seed',
    path: '/provably-fair/unhash-server-seed',
  },
  {
    label: 'Calculation',
    path: '/provably-fair/calculation',
  },
];

function MyBets(): JSX.Element {
  return (
    <div className="container py-6">
      <div className="flex items-center gap-2">
        <BetsIcon />
        <h2 className="font-semibold">My Bets</h2>
      </div>
      <MyBetsTable />
    </div>
  );
}

export default MyBets;
