import type {
  MinesGameOverResponse,
  MinesPlayRoundResponse,
} from '@repo/common/game-utils/mines/types.js';
import { create } from 'zustand';

interface MinesStore {
  betAmount: number;
  setBetAmount: (betAmount: number) => void;
  minesCount: number;
  setMinesCount: (minesCount: number) => void;
  gameState: MinesPlayRoundResponse | MinesGameOverResponse | null;
  setGameState: (
    gameState: MinesPlayRoundResponse | MinesGameOverResponse | null
  ) => void;
}

const useMinesStore = create<MinesStore>(set => ({
  betAmount: 0,
  setBetAmount: betAmount => {
    set({ betAmount });
  },
  minesCount: 3,
  setMinesCount: minesCount => {
    set({ minesCount });
  },
  gameState: null,
  setGameState: gameState => {
    set({ gameState });
  },
}));

export default useMinesStore;
