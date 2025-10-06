import type { ApiResponse } from '@repo/common/types';
import { fetchGet } from './_utils/fetch';

interface BalanceResponse {
  balance: number;
}

export const getBalance = async (): Promise<number> => {
  const { data } = await fetchGet<Promise<ApiResponse<BalanceResponse>>>(
    '/api/v1/user/balance',
    {
      withCredentials: true,
    }
  );
  return data.balance;
};
