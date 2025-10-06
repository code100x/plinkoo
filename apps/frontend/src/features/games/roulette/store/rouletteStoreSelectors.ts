import useRouletteStore from './rouletteStore';

export const useWinningNumber = (): string | null =>
  useRouletteStore(state => {
    const winningNumber = state.latestResult?.state.winningNumber;
    return winningNumber || null;
  });

export const useBetKey = (): string | null =>
  useRouletteStore(state => state.latestResult?.id ?? null);
