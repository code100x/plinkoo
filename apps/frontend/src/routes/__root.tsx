import * as React from 'react';
import { Outlet, createRootRouteWithContext } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import type { AuthState } from '@/features/auth/store/authStore';
import { useAuthStore } from '@/features/auth/store/authStore';
import { setupInterceptors } from '@/api/_utils/axiosInstance';
import { LoginModal } from '@/features/auth/components/LoginModal';
import { Header } from '@/components/Header';
import { z } from 'zod';
import { GLOBAL_MODAL } from '@/features/global-modals/types';
import GlobalModals from '@/features/global-modals';
import { gameSchema, type Game, type Games } from '@/const/games';

interface RouterContext {
  authStore: AuthState | undefined;
}

// Types for each modal's search params
export const betModalSearchSchema = z.object({
  iid: z.number().optional(),
  modal: z.literal(GLOBAL_MODAL.BET).optional(),
});

export const fairnessModalSearchSchema = z.object({
  game: gameSchema.optional(),
  modal: z.literal(GLOBAL_MODAL.FAIRNESS).optional(),
  tab: z.enum(['seeds', 'verify', 'overview']).default('seeds').optional(),
  clientSeed: z.string().optional(),
  serverSeed: z.string().optional(),
  nonce: z.number().optional(),
});

// Union type for all modals
export const rootSearchSchema = z
  .union([betModalSearchSchema, fairnessModalSearchSchema])
  .optional();

export const Route = createRootRouteWithContext<RouterContext>()({
  validateSearch: rootSearchSchema,
  component: RootLayout,
});

function RootLayout(): JSX.Element {
  return (
    <>
      <Outlet />
      <LoginModal />
      <GlobalModals />
      {import.meta.env.DEV ? <TanStackRouterDevtools /> : null}
    </>
  );
}
