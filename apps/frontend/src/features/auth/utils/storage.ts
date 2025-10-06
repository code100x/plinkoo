import type { IUser } from '@repo/common/types';
import { key } from '../const/immutableConst';

export const getStoredUser = (): IUser | null => {
  const user = localStorage.getItem(key);
  return user ? (JSON.parse(user) as IUser) : null;
};

export const setStoredUser = (user: IUser | null): void => {
  if (user) {
    localStorage.setItem(key, JSON.stringify(user));
  } else {
    localStorage.removeItem(key);
  }
};
