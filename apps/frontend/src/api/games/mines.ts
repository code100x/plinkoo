import type { ApiResponse } from '@repo/common/types';
import type {
  MinesGameOverResponse,
  MinesPlayRoundResponse,
} from '@repo/common/game-utils/mines/types.js';
import { fetchGet, fetchPost } from '../_utils/fetch';

export const startGame = async ({
  betAmount,
  minesCount,
}: {
  betAmount: number;
  minesCount: number;
}): Promise<ApiResponse<MinesPlayRoundResponse>> => {
  return fetchPost(
    '/api/v1/games/mines/start',
    { betAmount, minesCount },
    {
      withCredentials: true,
    }
  );
};

export const playRound = async (
  selectedTileIndex: number
): Promise<ApiResponse<MinesPlayRoundResponse | MinesGameOverResponse>> => {
  return fetchPost(
    '/api/v1/games/mines/play-round',
    { selectedTileIndex },
    {
      withCredentials: true,
    }
  );
};

export const cashOut = async (): Promise<
  ApiResponse<MinesGameOverResponse>
> => {
  return fetchPost(
    '/api/v1/games/mines/cash-out',
    {},
    {
      withCredentials: true,
    }
  );
};

export const getActiveGame = async (): Promise<
  ApiResponse<MinesPlayRoundResponse | undefined>
> => {
  return fetchGet('/api/v1/games/mines/active', {
    withCredentials: true,
  });
};
