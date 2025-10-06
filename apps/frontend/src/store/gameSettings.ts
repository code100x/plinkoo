import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface GameSettingsState {
  // Audio settings
  volume: number;

  // Visual settings
  animations: boolean;

  // Betting settings
  showMaxBetButton: boolean;
  instantBet: boolean;

  // Controls
  hotkeysEnabled: boolean;

  // Actions
  setVolume: (volume: number) => void;
  setAnimations: (enabled: boolean) => void;
  setShowMaxBetButton: (show: boolean) => void;
  setInstantBet: (enabled: boolean) => void;
  setHotkeysEnabled: (enabled: boolean) => void;

  // Reset all settings to defaults
  resetToDefaults: () => void;
}

// Default settings
const defaultSettings = {
  volume: 100,
  animations: true,
  showMaxBetButton: false,
  instantBet: false,
  hotkeysEnabled: false,
};

export const useGameSettingsStore = create<GameSettingsState>()(
  persist(
    set => ({
      // Initial state with defaults
      ...defaultSettings,

      // Actions to update individual settings
      setVolume: volume => {
        // Ensure volume is between 0 and 100
        const validVolume = Math.max(0, Math.min(100, volume));
        set({ volume: validVolume });
      },

      setAnimations: enabled => {
        set({ animations: enabled });
      },

      setShowMaxBetButton: show => {
        set({ showMaxBetButton: show });
      },

      setInstantBet: enabled => {
        set({ instantBet: enabled });
      },

      setHotkeysEnabled: enabled => {
        set({ hotkeysEnabled: enabled });
      },

      // Reset all settings to default values
      resetToDefaults: () => {
        set(defaultSettings);
      },
    }),
    {
      name: 'game-settings-storage', // localStorage key
      // Sync with localStorage immediately
      skipHydration: false,
    }
  )
);
