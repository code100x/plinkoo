import { DicesIcon, ShipWheelIcon } from 'lucide-react';
import { z } from 'zod';

export enum Games {
  DICE = 'dice',
  // ROULETTE = 'roulette',
  MINES = 'mines',
  KENO = 'keno',
  BLACKJACK = 'blackjack',
}

export const gameSchema = z.enum([
  Games.DICE,
  // Games.ROULETTE,
  Games.MINES,
  Games.KENO,
  Games.BLACKJACK,
]);

export type Game = (typeof Games)[keyof typeof Games];

export const GAME_VALUES_MAPPING = {
  [Games.DICE]: { label: 'Dice', icon: DicesIcon, path: '/casino/games/dice' },
  // [Games.ROULETTE]: {
  //   label: 'Roulette',
  //   icon: ShipWheelIcon,
  //   path: '/casino/games/roulette',
  // },
  [Games.MINES]: {
    label: 'Mines',
    // icon: DicesIcon,
    path: '/casino/games/mines',
  },
  [Games.KENO]: {
    label: 'Keno',
    // icon: DicesIcon,
    path: '/casino/games/keno',
  },
  [Games.BLACKJACK]: {
    label: 'Blackjack',
    // icon: DicesIcon,
    path: '/casino/games/blackjack',
  },
};

export const GAMES_DROPDOWN_OPTIONS = [
  {
    label: GAME_VALUES_MAPPING[Games.DICE].label,
    value: Games.DICE,
  },
  // {
  //   label: GAME_VALUES_MAPPING[Games.ROULETTE].label,
  //   value: Games.ROULETTE,
  // },
  {
    label: GAME_VALUES_MAPPING[Games.MINES].label,
    value: Games.MINES,
  },
  {
    label: GAME_VALUES_MAPPING[Games.KENO].label,
    value: Games.KENO,
  },
  {
    label: GAME_VALUES_MAPPING[Games.BLACKJACK].label,
    value: Games.BLACKJACK,
  },
];
