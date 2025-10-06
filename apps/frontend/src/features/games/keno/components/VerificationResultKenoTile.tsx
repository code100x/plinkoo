import { cn } from '@/lib/utils';

function VerificationResultKenoTile({
  drawnNumbers,
  index,
}: {
  drawnNumbers: Set<number>;
  index: number;
}): JSX.Element {
  const isDrawn = drawnNumbers.has(index);

  return (
    <div
      className={cn(
        'size-12 bg-brand-weaker rounded-lg cursor-pointer flex items-center justify-center font-semibold p-2 shadow-[0_0.3em_#213743]',
        {
          "shadow-[0_0.3em_rgb(113,0,199),0_0_0_0.3em_rgb(150,46,255)_inset] text-[#008a01] bg-[url('/games/keno/gem.svg')] bg-[#071824] bg-center bg-clip-content bg-origin-content":
            isDrawn,
        }
      )}
      key={index}
    >
      {index}
    </div>
  );
}

export default VerificationResultKenoTile;
