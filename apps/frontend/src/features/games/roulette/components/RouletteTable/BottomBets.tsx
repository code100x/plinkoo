import { RouletteBetTypes } from '@repo/common/game-utils/roulette/validations.js';
import BottomNumberBets from './BottomNumberBets';
import BottomColorBets from './BottomColorBets';

export const bottomBets = [
  {
    action: RouletteBetTypes.LOW,
    label: '1 to 18',
  },
  {
    action: RouletteBetTypes.EVEN,
    label: 'Even',
  },
  {
    action: RouletteBetTypes.RED,
    label: null,
  },
  {
    action: RouletteBetTypes.BLACK,
    label: null,
  },
  {
    action: RouletteBetTypes.ODD,
    label: 'Odd',
  },
  {
    action: RouletteBetTypes.HIGH,
    label: '19 to 36',
  },
];

function BottomBets(): JSX.Element {
  return (
    <>
      {bottomBets.map(({ action, label }) => {
        if (typeof label === 'string') {
          return (
            <BottomNumberBets action={action} key={action} label={label} />
          );
        }
        return <BottomColorBets action={action} key={action} />;
      })}
    </>
  );
}

export default BottomBets;
