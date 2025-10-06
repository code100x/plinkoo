import { cn } from '@/lib/utils';
import { useDrawnNumbers, useSelectedTiles } from '../store/kenoSelectors';
import useKenoStore from '../store/kenoStore';
import KenoTileUI from './KenoTileUI';

function KenoTile({
  isLoading,
  index,
}: {
  isLoading: boolean;
  index: number;
}): JSX.Element {
  const selectedTiles = useSelectedTiles();
  const drawnNumbers = useDrawnNumbers();

  const { updateSelectedTile, outcome } = useKenoStore();

  const isSelected = selectedTiles.has(index);
  const isDrawn = drawnNumbers.has(index);

  const handleClick = (): void => {
    if (isLoading) return;
    updateSelectedTile(index);
  };

  const isTileDisabled = Boolean(outcome) && !isSelected;

  return (
    <KenoTileUI
      isSelected={isSelected}
      isDrawn={isDrawn}
      index={index}
      onClick={handleClick}
      onKeyDown={e => {
        if (e.key === 'Enter' || e.key === ' ') {
          handleClick();
        }
      }}
      isTileDisabled={isTileDisabled}
    />
  );
}

export default KenoTile;
