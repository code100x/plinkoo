import { create } from 'zustand';

interface RouletteBoardHoverStore {
  hoverId: string | null;
  setHoverId: (hoverId: string | null) => void;
}

export const useRouletteBoardHoverStore = create<RouletteBoardHoverStore>(
  set => ({
    hoverId: null,
    setHoverId: hoverId => {
      set({ hoverId });
    },
  })
);
