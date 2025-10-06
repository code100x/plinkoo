import React from 'react';
import { Games } from '@/const/games';
import GameSettingsBar from '../common/components/game-settings';
import BettingControls from './components/BettingControls';
import GameTable from './components/GameTable';
import useBlackjackStore from './store/blackjackStore';

export default function Blackjack(): JSX.Element {
  return (
    <div className="container">
      <div className="flex flex-col-reverse lg:flex-row w-full items-stretch mx-auto rounded-t-md overflow-hidden shadow-md">
        <BettingControls />
        <div className="lg:flex-1 bg-brand-stronger relative">
          <GameTable />
        </div>
      </div>
      <GameSettingsBar game={Games.BLACKJACK} />
    </div>
  );
}
