import { createFileRoute } from '@tanstack/react-router';
import { Roulette } from '@/features/games/roulette';
import { Mines } from '@/features/games/mines';
import { Plinkoo } from '@/features/games/plinkoo';
import { DiceGame } from '@/features/games/dice';
import { Keno } from '@/features/games/keno';
import Blackjack from '@/features/games/blackjack';

export const Route = createFileRoute('/_protected/casino/games/$gameId')({
  component: GamePage,
});

function GamePage(): JSX.Element {
  const { gameId } = Route.useParams();

  switch (gameId) {
    case 'dice':
      return <DiceGame />;
    case 'mines':
      return <Mines />;
    case 'plinkoo':
      return <Plinkoo />;
    case 'keno':
      return <Keno />;
    case 'blackjack':
      return <Blackjack />;
    default:
      return <div>Game not found</div>;
  }
}
