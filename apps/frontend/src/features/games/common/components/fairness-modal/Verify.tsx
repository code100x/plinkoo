import { useState } from 'react';
import CommonSelect from '@/components/ui/common-select';
import { GAMES_DROPDOWN_OPTIONS, type Game } from '@/const/games';
import VerificationResult from './VerificationResult';
import VerificationInputs from './VerificationInputs';
import { Route } from '@/routes/__root';
import { useSearch } from '@tanstack/react-router';
import { GLOBAL_MODAL } from '@/features/global-modals/types';

function Verify({ game }: { game: Game }): JSX.Element {
  const [outcome, setOutcome] = useState<string | number[] | null>(null);
  const [selectedGame, setSelectedGame] = useState<Game>(game);

  const search = useSearch({
    from: '__root__',
    select: state => {
      if (state?.modal === GLOBAL_MODAL.FAIRNESS) {
        return {
          clientSeed: state.clientSeed,
          serverSeed: state.serverSeed,
          nonce: state.nonce,
        };
      }
    },
  });

  return (
    <>
      <div className="p-3">
        <VerificationResult game={selectedGame} outcome={outcome} />
      </div>
      <div className="bg-brand-stronger p-3 flex flex-col gap-2">
        <CommonSelect
          label="Game"
          onValueChange={value => {
            setSelectedGame(value as Game);
          }}
          options={GAMES_DROPDOWN_OPTIONS}
          value={selectedGame}
        />
        <VerificationInputs
          game={selectedGame}
          setOutcome={setOutcome}
          initialInputState={search}
        />
      </div>
    </>
  );
}

export default Verify;
