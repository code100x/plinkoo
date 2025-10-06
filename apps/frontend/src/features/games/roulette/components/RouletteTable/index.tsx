import ZeroBet from './ZeroBet';
import NumberBet from './NumberBet';
import ColumnBet from './ColumnBet';
import DozenBet from './DozenBet';
import BottomBets, { bottomBets } from './BottomBets';
import BottomNumberBets from './BottomNumberBets';
import BottomColorBets from './BottomColorBets';
import { cn } from '@/lib/utils';

function RouletteTable(): JSX.Element {
  return (
    <>
      <div className="w-fit grid-cols-14 mx-auto gap-1 hidden lg:grid">
        <div className="flex items-stretch justify-center gap-1 col-span-full">
          <ZeroBet />
          {Array.from({ length: 12 }, (_, index) => index).map(colNum => (
            <div className="flex flex-col-reverse gap-1" key={colNum}>
              {Array.from({ length: 3 }, (_, index) => index + 1).map(
                rowNum => {
                  return (
                    <NumberBet
                      key={`${colNum}-${rowNum}`}
                      number={colNum * 3 + rowNum}
                    />
                  );
                }
              )}
            </div>
          ))}
          <div className="flex flex-col-reverse gap-1">
            <ColumnBet column={1} />
            <ColumnBet column={2} />
            <ColumnBet column={3} />
          </div>
        </div>
        <div className="col-span-1" />
        <div className="col-span-4">
          <DozenBet dozen={1} />
        </div>
        <div className="col-span-4">
          <DozenBet dozen={2} />
        </div>
        <div className="col-span-4">
          <DozenBet dozen={3} />
        </div>
        <div className="col-span-1" />
        <div className="col-span-1" />
        <BottomBets />
      </div>
      <div className="w-5/6 md:w-3/4 lg:w-fit grid-cols-5 grid-rows-[repeat(14,minmax(0,0.5fr)] mx-auto gap-1 grid lg:hidden grid-auto-rows-[5rem] grid-auto-cols-[5rem] items-stretch">
        <div className="col-span-2 row-[1/-1]" />
        <div className="col-span-3 row-[1/-1]">
          <ZeroBet className="w-full h-9" />
        </div>
        {bottomBets.map(({ action, label }, index) => {
          return (
            <div
              className={cn(`row-start-${2 * (index + 1)} row-span-2  col-[1]`)}
            >
              {typeof label === 'string' ? (
                <BottomNumberBets
                  action={action}
                  key={action}
                  label={label}
                  className="h-full"
                />
              ) : (
                <BottomColorBets
                  action={action}
                  key={action}
                  className="h-full"
                />
              )}
            </div>
          );
        })}
        <div className="row-start-2 row-span-4 col-[2]">
          <DozenBet dozen={1} className="h-full" />
        </div>
        <div className="row-start-6 row-span-4 col-[2]">
          <DozenBet dozen={2} className="h-full" />
        </div>
        <div className="row-start-10 row-span-4 col-[2]">
          <DozenBet dozen={3} className="h-full" />
        </div>
        {Array.from({ length: 12 }, (_, index) => index).map(
          (colNum, index) => (
            <div
              className={cn(
                'flex gap-1 col-span-3 h-9 w-full',
                `row-${index + 2}`
              )}
              key={colNum}
            >
              {Array.from({ length: 3 }, (_, index) => index + 1).map(
                rowNum => {
                  return (
                    <NumberBet
                      key={`${colNum}-${rowNum}`}
                      number={colNum * 3 + rowNum}
                      className="h-9 flex-1"
                    />
                  );
                }
              )}
            </div>
          )
        )}
        <div className="col-span-2" />
        <div className="flex col-span-3 w-full row-14 gap-1">
          <ColumnBet column={1} className="flex-1 h-9" />
          <ColumnBet column={2} className="flex-1 h-9" />
          <ColumnBet column={3} className="flex-1 h-9" />
        </div>
      </div>
    </>
  );
}

export default RouletteTable;
