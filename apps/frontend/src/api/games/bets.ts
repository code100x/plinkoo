import type {
  ApiResponse,
  PaginatedBetData,
  BetData,
} from '@repo/common/types';
import { fetchGet } from '../_utils/fetch';

export const fetchAllBets = async (): Promise<
  ApiResponse<{ bets: PaginatedBetData[] }>
> => fetchGet('/api/v1/games/bets');

export const fetchBetById = async (
  betId: number
): Promise<ApiResponse<{ bet: BetData | null }>> => {
  if (!betId) {
    return Promise.resolve({
      data: { bet: null },
      statusCode: 200,
      error: null,
      message: '',
      success: true,
    });
  }
  return fetchGet(`/api/v1/games/bets/${betId}`, { withCredentials: true });
};
