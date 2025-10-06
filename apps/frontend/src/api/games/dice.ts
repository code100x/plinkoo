import type { ApiResponse } from '@repo/common/types';
import type {
  DicePlaceBetRequestBody,
  DicePlaceBetResponse,
} from '@repo/common/game-utils/dice/types.js';
import { fetchPost } from '../_utils/fetch';

export const placeBet = async (
  data: DicePlaceBetRequestBody
): Promise<ApiResponse<DicePlaceBetResponse>> => {
  return fetchPost<DicePlaceBetRequestBody, ApiResponse<DicePlaceBetResponse>>(
    '/api/v1/games/dice/place-bet',
    data,
    {
      withCredentials: true,
    }
  );
};
