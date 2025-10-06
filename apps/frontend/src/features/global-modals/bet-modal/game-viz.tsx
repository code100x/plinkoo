import { Games } from '@/const/games';
import { BetData } from '@repo/common/types';
import DiceBetViz from '@/features/games/dice/components/DiceBetViz';
import MinesBetViz from '@/features/games/mines/components/MinesBetViz';
import KenoBetViz from '@/features/games/keno/components/KenoBetViz';
import BlackjackBetViz from '@/features/games/blackjack/components/BlackjackBetVIz';

const GameViz = ({ bet }: { bet: BetData }) => {
  switch (bet.game as Games) {
    case Games.DICE: {
      return <DiceBetViz gameState={bet.gameState} />;
    }
    case Games.MINES: {
      return <MinesBetViz bet={bet} />;
    }
    case Games.KENO: {
      return <KenoBetViz bet={bet} />;
    }
    case Games.BLACKJACK: {
      return <BlackjackBetViz bet={bet} />;
    }
    default:
      return null;
  }
};

export default GameViz;
