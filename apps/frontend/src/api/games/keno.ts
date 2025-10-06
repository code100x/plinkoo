import type { ApiResponse } from '@repo/common/types';
import type { KenoResponse } from '@repo/common/game-utils/keno/types.js';
import { fetchPost } from '../_utils/fetch';

export const placeBet = async ({
  betAmount,
  selectedTiles,
  risk,
}: {
  betAmount: number;
  selectedTiles: number[];
  risk: string;
}): Promise<ApiResponse<KenoResponse>> => {
  return fetchPost(
    '/api/v1/games/keno/place-bet',
    { betAmount, selectedTiles, risk },
    {
      withCredentials: true,
    }
  );
};
