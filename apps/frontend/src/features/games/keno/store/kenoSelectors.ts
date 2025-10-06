import useKenoStore from './kenoStore';

export const useSelectedTiles = (): Set<number> =>
  useKenoStore(state => {
    return new Set(state.selectedTiles);
  });

export const useDrawnNumbers = (): Set<number> =>
  useKenoStore(state => {
    return new Set(state.outcome?.state.drawnNumbers ?? []);
  });

export const usePayoutMultiplier = (): number =>
  useKenoStore(state => {
    return state.outcome?.payoutMultiplier ?? 0;
  });

export const usePayout = (): number =>
  useKenoStore(state => {
    return state.outcome?.payout ?? 0;
  });
