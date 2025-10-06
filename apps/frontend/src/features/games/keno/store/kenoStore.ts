import { create } from 'zustand';
import type {
  KenoResponse,
  KenoRisk,
} from '@repo/common/game-utils/keno/types.js';

interface KenoStore {
  betAmount: number;
  setBetAmount: (betAmount: number) => void;
  kenoRisk: KenoRisk;
  setKenoRisk: (kenoRisk: KenoRisk) => void;
  selectedTiles: number[];
  updateSelectedTile: (selectedTile: number) => void;
  clearTiles: () => void;
  hoveredTile: number | null;
  setHoveredTile: (hoveredTile: number | null) => void;
  outcome: null | KenoResponse;
  setOutcome: (outcome: KenoResponse | null) => void;
}

const useKenoStore = create<KenoStore>(set => ({
  betAmount: 0,
  setBetAmount: betAmount => {
    set({ betAmount });
  },
  kenoRisk: 'classic',
  setKenoRisk: kenoRisk => {
    set({ kenoRisk });
  },
  selectedTiles: [],
  clearTiles: () => {
    set({ selectedTiles: [], outcome: null });
  },
  updateSelectedTile: (selectedTile: number) => {
    set(state => {
      if (
        state.selectedTiles.length >= 10 &&
        !state.selectedTiles.includes(selectedTile)
      ) {
        return state;
      }
      return {
        selectedTiles: state.selectedTiles.includes(selectedTile)
          ? state.selectedTiles.filter(t => t !== selectedTile)
          : [...state.selectedTiles, selectedTile],
        outcome: null,
      };
    });
  },
  hoveredTile: null,
  setHoveredTile: (hoveredTile: number | null) => {
    set({ hoveredTile });
  },
  outcome: null,
  setOutcome: (outcome: KenoResponse | null) => {
    set({ outcome });
  },
}));

export default useKenoStore;
