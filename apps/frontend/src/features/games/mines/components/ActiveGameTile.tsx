import { motion } from 'motion/react';
import { cn } from '@/lib/utils';
import { useSelectedTiles } from '../store/minesSelectors';

function ActiveGameTile({
  onClick,
  isLoading,
  index,
}: {
  isLoading: boolean;
  onClick: () => void;
  index: number;
}): JSX.Element {
  const selectedTiles = useSelectedTiles();
  const hasDiamond = selectedTiles?.has(index);

  return (
    <motion.div
      animate={
        isLoading && !hasDiamond
          ? {
              scale: [1, 1.1, 1],
            }
          : {}
      }
      className={cn(
        'size-16 md:size-[76px] lg:size-24 bg-brand-weaker rounded-md cursor-pointer flex items-center justify-center',
        { '!bg-brand-strongest': hasDiamond },
        { 'hover:bg-brand-weakest hover:-translate-y-0.5': !hasDiamond }
      )}
      key={index}
      onClick={onClick}
      style={
        !hasDiamond
          ? {
              boxShadow: '0 0.3em #213743',
            }
          : {}
      }
      transition={{
        duration: 0.5,
        repeat: isLoading ? Infinity : 0,
      }}
    >
      {hasDiamond ? (
        <img
          alt="diamond"
          className="scale-[0.67]"
          src="/games/mines/diamond.svg"
        />
      ) : null}
    </motion.div>
  );
}

export default ActiveGameTile;
