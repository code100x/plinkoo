import type { MinesRound } from '@repo/common/game-utils/mines/types.js';
import useMinesStore from './minesStore';

export const useIsGameActive = (): boolean =>
  useMinesStore(state => state.gameState?.active ?? false);

export const useIsGameWon = (): boolean => {
  const isGameActive = useIsGameActive();
  return useMinesStore(state =>
    !isGameActive && state.gameState && 'payoutMultiplier' in state.gameState
      ? Boolean(state.gameState.payoutMultiplier > 0)
      : false
  );
};

export const useIsGameLost = (): boolean => {
  const isGameActive = useIsGameActive();
  const isGameWon = useIsGameWon();
  return !isGameActive && !isGameWon;
};

export const useLastRound = (): MinesRound | null =>
  useMinesStore(state => state.gameState?.state.rounds.at(-1) ?? null);

export const useTotalPayout = (): number | null =>
  useMinesStore(state =>
    state.gameState && 'payout' in state.gameState
      ? state.gameState.payout
      : null
  );

export const usePayoutMultiplier = (): number | null =>
  useMinesStore(state =>
    state.gameState && 'payoutMultiplier' in state.gameState
      ? state.gameState.payoutMultiplier
      : null
  );

export const useSelectedTiles = (): Set<number> | null =>
  useMinesStore(state => {
    if (!state.gameState) return null;
    return new Set(
      state.gameState.state.rounds.map(round => round.selectedTileIndex)
    );
  });

export const useMines = (): Set<number> | null =>
  useMinesStore(state => {
    if (!state.gameState) return null;
    return new Set(state.gameState.state.mines);
  });

export const useMinesCount = (): number | null =>
  useMinesStore(state => state.gameState?.state.minesCount ?? null);
