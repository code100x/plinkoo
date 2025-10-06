import {
  blackNumbers,
  redNumbers,
} from '@repo/common/game-utils/roulette/constants.js';
import { RouletteBetTypes } from '@repo/common/game-utils/roulette/index.js';

const getIsColumnHover = ({
  number,
  hoverId,
}: {
  number: number;
  hoverId: string;
}): boolean => {
  const column = parseInt(hoverId.split('-')[1]);
  return number !== 0 && number % 3 === column % 3;
};

const getIsDozenHover = ({
  number,
  hoverId,
}: {
  number: number;
  hoverId: string;
}): boolean => {
  const dozen = parseInt(hoverId.split('-')[1]);
  return number > (dozen - 1) * 12 && number <= dozen * 12;
};

const checkIsChipHover = ({
  number,
  hoverId,
}: {
  number: number;
  hoverId: string;
}): boolean => {
  const [betType, ...selection] = hoverId.split('-');

  switch (betType as RouletteBetTypes) {
    case RouletteBetTypes.STRAIGHT:
    case RouletteBetTypes.SPLIT:
    case RouletteBetTypes.SIXLINE:
    case RouletteBetTypes.CORNER:
    case RouletteBetTypes.STREET:
      return selection.includes(number.toString());
    default:
      return false;
  }
};

const getIsNumberHover = ({
  number,
  hoverId,
}: {
  number: number;
  hoverId: string | null;
}): boolean => {
  if (hoverId === null) return false;

  if (hoverId.startsWith('column-')) {
    return getIsColumnHover({ number, hoverId });
  }
  if (hoverId.startsWith('dozen-')) {
    return getIsDozenHover({ number, hoverId });
  }
  switch (hoverId as RouletteBetTypes) {
    case RouletteBetTypes.LOW:
      return number >= 1 && number <= 18;
    case RouletteBetTypes.HIGH:
      return number >= 19 && number <= 36;
    case RouletteBetTypes.EVEN:
      return number % 2 === 0;
    case RouletteBetTypes.ODD:
      return number % 2 !== 0;
    case RouletteBetTypes.RED:
      return redNumbers.includes(number.toString());
    case RouletteBetTypes.BLACK:
      return blackNumbers.includes(number.toString());
    default:
      return checkIsChipHover({ number, hoverId });
  }
};

export { getIsNumberHover };
