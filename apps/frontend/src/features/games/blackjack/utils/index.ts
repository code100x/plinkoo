import { BlackjackActions } from '@repo/common/game-utils/blackjack/types.js';
import type {
  SafeDealerGameState,
  DealerGameState,
  PlayerGameState,
} from '@repo/common/game-utils/blackjack/types.js';
import { CardBorders } from '@/components/ui/playing-card';

export const getBlackjackGameResult = ({
  hand,
  dealerState,
  isActive,
  gameOver,
}: {
  hand: PlayerGameState;
  dealerState: DealerGameState | SafeDealerGameState;
  isActive: boolean;
  gameOver: boolean;
}): CardBorders => {
  const playerValue = hand.value;
  if (isActive) {
    return CardBorders.INFO;
  }

  if (!gameOver) return CardBorders.TRANSPARENT;
  const dealerValue = dealerState.value;

  if (playerValue > 21 || hand.actions.includes(BlackjackActions.BUST))
    return CardBorders.ERROR;
  if (
    playerValue === 21 ||
    dealerValue > 21 ||
    dealerState.actions.includes(BlackjackActions.BUST)
  ) {
    return CardBorders.SUCCESS;
  }
  if (playerValue === dealerValue) return CardBorders.WARNING;
  return playerValue > dealerValue ? CardBorders.SUCCESS : CardBorders.ERROR;
};
