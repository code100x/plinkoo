import type { IUser } from '@repo/common/types';
import { create } from 'zustand';
import { getStoredUser, setStoredUser } from '../utils/storage';

export interface AuthState {
  user: IUser | null;
  isModalOpen: boolean;
  setUser: (user: IUser | null) => void;
  showLoginModal: () => void;
  hideLoginModal: () => void;
}

export const useAuthStore = create<AuthState>(set => ({
  user: getStoredUser(),
  isModalOpen: false,
  setUser: user => {
    setStoredUser(user);
    set({ user });
  },
  showLoginModal: () => {
    set({ isModalOpen: true });
  },
  hideLoginModal: () => {
    set({ isModalOpen: false });
  },
}));

export const getAuthState = (): AuthState => {
  const state = useAuthStore.getState();
  return {
    user: state.user,
    isModalOpen: state.isModalOpen,
    setUser: state.setUser,
    showLoginModal: state.showLoginModal,
    hideLoginModal: state.hideLoginModal,
  };
};
