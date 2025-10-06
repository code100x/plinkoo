import type { ApiResponse } from '@repo/common/types';
import type {
  RouletteBet,
  RoulettePlaceBetResponse,
} from '@repo/common/game-utils/roulette/index.js';
import { fetchPost } from '../_utils/fetch';

export const placeBet = async (
  bets: RouletteBet[]
): Promise<ApiResponse<RoulettePlaceBetResponse>> => {
  return fetchPost(
    '/api/v1/games/roulette/place-bet',
    { bets },
    {
      withCredentials: true,
    }
  );
};
