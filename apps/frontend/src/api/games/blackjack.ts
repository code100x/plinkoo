import type {
  BlackjackActions,
  BlackjackPlayRoundResponse,
} from '@repo/common/game-utils/blackjack/types.js';
import type { ApiResponse } from '@repo/common/types';
import { fetchGet, fetchPost } from '../_utils/fetch';

export const blackjackBet = async ({
  betAmount,
}: {
  betAmount: number;
}): Promise<ApiResponse<BlackjackPlayRoundResponse>> => {
  return fetchPost(
    '/api/v1/games/blackjack/bet',
    { betAmount },
    {
      withCredentials: true,
    }
  );
};

export const getActiveGame = async (): Promise<
  ApiResponse<BlackjackPlayRoundResponse | undefined>
> => {
  return fetchGet('/api/v1/games/blackjack/active', {
    withCredentials: true,
  });
};

export const playRound = async (
  action: BlackjackActions
): Promise<ApiResponse<BlackjackPlayRoundResponse>> => {
  return fetchPost(
    '/api/v1/games/blackjack/next',
    { action },
    {
      withCredentials: true,
    }
  );
};
