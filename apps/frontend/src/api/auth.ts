import type { IUser, ApiResponse } from '@repo/common/types';
import { fetchGet } from './_utils/fetch';

export const getUserDetails = async (): Promise<ApiResponse<IUser>> => {
  return fetchGet('/api/v1/auth/me', {
    withCredentials: true,
  });
};
