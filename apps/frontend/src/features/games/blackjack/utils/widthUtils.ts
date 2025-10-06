import { ViewportType } from '@/common/hooks/useViewportType';

export const CARD_WIDTH = {
  [ViewportType.Mobile]: 48,
  [ViewportType.Tablet]: 48,
  [ViewportType.Desktop]: 96,
};

const CARD_TOP_OFFSET = {
  [ViewportType.Mobile]: 12,
  [ViewportType.Tablet]: 12,
  [ViewportType.Desktop]: 20,
};

const CARD_LEFT_OFFSET = {
  [ViewportType.Mobile]: 24,
  [ViewportType.Tablet]: 24,
  [ViewportType.Desktop]: 50,
};

export const calculateCardPosition = ({
  totalCards,
  viewportType,
}: {
  totalCards: number;
  viewportType: ViewportType;
}) => {
  const centerOffset =
    -(CARD_WIDTH[viewportType] / 2) -
    ((totalCards - 1) * CARD_LEFT_OFFSET[viewportType]) / 2;
  const rightmostCardLeft =
    (totalCards - 1) * CARD_LEFT_OFFSET[viewportType] + centerOffset;
  const cardWidth = CARD_WIDTH[viewportType];
  const rightPosition = rightmostCardLeft + cardWidth;

  return {
    rightPosition,
    centerOffset,
  };
};

export const getCardTopLeft = ({
  viewportType,
  index,
  centerOffset,
}: {
  viewportType: ViewportType;
  index: number;
  centerOffset: number;
}) => {
  return {
    top: index * CARD_TOP_OFFSET[viewportType],
    left: index * CARD_LEFT_OFFSET[viewportType] + centerOffset,
  };
};
