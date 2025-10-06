import { HashLoader } from 'react-spinners';
import { NO_OF_TILES } from '@repo/common/game-utils/mines/constants.js';
import { NO_OF_TILES_KENO } from '@repo/common/game-utils/keno/constants.js';
import DiceResultPreview from '@/features/games/dice/components/DiceResultPreview';
import { Games, type Game } from '@/const/games';
import RouletteWheel from '@/features/games/roulette/components/RouletteWheel';
import InactiveGameTile from '@/features/games/mines/components/InactiveGameTile';
import VerificationResultKenoTile from '@/features/games/keno/components/VerificationResultKenoTile';
import BlackjackResultPreview from '@/features/games/blackjack/components/BlackjackResultPreview';
import { cn } from '@/lib/utils';
import { ViewportType } from '@/common/hooks/useViewportType';
function VerificationResult({
  game,
  outcome,
}: {
  game: Game | null;
  outcome: string | number[] | null;
}): JSX.Element | null {
  const getResult = (): JSX.Element => {
    switch (game) {
      case Games.DICE:
        return <DiceResultPreview result={Number(outcome)} />;
      // case Games.ROULETTE:
      //   return (
      //     <div className="lg:h-24">
      //       <div className="absolute left-1/2 -translate-x-1/2 -translate-y-[80%] hidden lg:block">
      //         <RouletteWheel
      //           isPreview
      //           isSpinning={false}
      //           winningNumber={String(outcome)}
      //         />
      //       </div>
      //       <div className="lg:absolute left-5 bottom-5 bg-brand-weaker size-12 rounded font-semibold text-2xl text-neutral-default flex items-center justify-center">
      //         {outcome}
      //       </div>
      //     </div>
      //   );

      case Games.MINES: {
        if (typeof outcome === 'string' || !outcome) return <>{null}</>;
        return (
          <div className="inline-grid grid-cols-5 mx-auto justify-items-center gap-2.5 lg:-my-8 py-2">
            {Array.from({ length: NO_OF_TILES }, (_, i) => i).map(number => (
              <InactiveGameTile
                index={number}
                key={number}
                {...{
                  isPreview: true,
                  isGameLost: false,
                  mines: new Set(outcome),
                }}
                className="size-16 md:size-16 lg:size-16"
              />
            ))}
          </div>
        );
      }
      case Games.KENO: {
        if (typeof outcome === 'string' || !outcome) return <>{null}</>;
        return (
          <div className="grid grid-cols-8 mx-auto justify-items-center gap-2.5 py-2">
            {Array.from({ length: NO_OF_TILES_KENO }, (_, i) => i).map(
              number => (
                <VerificationResultKenoTile
                  drawnNumbers={new Set(outcome)}
                  index={number + 1}
                  key={number}
                />
              )
            )}
          </div>
        );
      }
      case Games.BLACKJACK:
        if (
          typeof outcome === 'string' ||
          !outcome ||
          (Array.isArray(outcome) && outcome.length !== 52)
        )
          return <>{null}</>;
        return <BlackjackResultPreview result={outcome} />;

      default:
        return <div>Unknown game</div>;
    }
  };

  return (
    <div
      className={cn(
        'border border-brand-weaker border-dashed rounded-lg p-3 lg:py-12 relative overflow-hidden flex justify-center',
        { 'lg:py-6': game === Games.BLACKJACK }
        // {''}
      )}
    >
      {outcome ? (
        getResult()
      ) : (
        <div className="flex flex-col items-center justify-center gap-2 py-2 lg:py-0">
          <p className="text-neutral-weak text-xs font-medium">
            More inputs are required to verify result
          </p>
          <HashLoader color="#b1b4d3" size={16} />
        </div>
      )}
    </div>
  );
}

export default VerificationResult;
