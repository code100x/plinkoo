import { Fragment, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { HashLoader } from 'react-spinners';
import { calculateFinalOutcome } from '@repo/common/game-utils/dice/utils.js';
import { getGeneratedFloats, byteGenerator } from '@/lib/crypto';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
// Simple function to
//  generate a stable unique ID without using array indices
const generateUniqueId = (
  prefix: string,
  ...parts: (string | number)[]
): string => {
  return `${prefix}-${parts.join('-')}`;
};

interface DiceResultBreakdownProps {
  nonce?: number;
  serverSeed?: string;
  clientSeed?: string;
}

function DiceResultBreakdown({
  nonce,
  serverSeed,
  clientSeed,
}: DiceResultBreakdownProps): JSX.Element {
  const { data: hmacArray = [] } = useQuery({
    queryKey: ['hmacBuffer', serverSeed, clientSeed, nonce],
    queryFn: async () => {
      const bytes = await byteGenerator(
        serverSeed ?? '',
        `${clientSeed}:${nonce}`,
        1
      );
      return bytes;
    },
  });

  const { data: outcome } = useQuery({
    queryKey: ['result-dice', serverSeed, clientSeed, nonce],
    queryFn: async () => {
      const result = await getGeneratedFloats({
        count: 1,
        seed: serverSeed ?? '',
        message: `${clientSeed}:${nonce}`,
      });
      return result[0];
    },
  });

  const selectedBytes = hmacArray.slice(0, 4);

  // Create unique identifiers for each byte in the hmacArray
  const hmacByteIds = useMemo(() => {
    return hmacArray.map((byte, idx) => ({
      byte,
      id: generateUniqueId('byte', byte, idx, Date.now()),
    }));
  }, [hmacArray]);

  // Create unique identifiers for selected bytes
  const selectedByteIds = useMemo(() => {
    return selectedBytes.map((byte, idx) => ({
      byte,
      id: generateUniqueId('selected-byte', byte, idx, Date.now()),
    }));
  }, [selectedBytes]);

  if (!serverSeed || !clientSeed || !outcome) {
    return <HashLoader className="mx-auto my-16" color="#b1b4d3" size={16} />;
  }

  const finalOutcome = calculateFinalOutcome(outcome);

  return (
    <div className="flex flex-col gap-3">
      <div>
        <Label>Final Result</Label>
        <p className="font-semibold text-sm">{finalOutcome}</p>
      </div>
      <div>
        <Label>Casino Seeds to Bytes</Label>
        <p className="text-sm my-1 mb-0.5 font-semibold tracking-wider">
          {`HMAC_SHA256(${serverSeed}, ${clientSeed}:${nonce}:0)`}
        </p>
        <div className="flex gap-2 text-sm overflow-x-auto no-scrollbar">
          {hmacByteIds.map(({ byte, id }, index) => (
            <div
              className={cn(
                'text-neutral-weak flex flex-col gap-1 items-center font-medium',
                {
                  'text-neutral-default': index < 4,
                }
              )}
              key={id}
            >
              <span>{byte.toString(16).padStart(2, '0')}</span>
              <span className="font-semibold">{byte}</span>
            </div>
          ))}
        </div>
      </div>
      <div>
        <Label>Bytes to Number</Label>
        <div className="flex gap-2 text-sm overflow-x-auto no-scrollbar">
          <div className="grid grid-cols-11">
            <div className="col-span-11 font-semibold tracking-widest">{`(${selectedBytes.join(', ')}) -> [0, ..., 10000] = ${String(outcome * 10001).split('.')[0]}`}</div>
            {selectedByteIds.map(({ byte, id }, index) => (
              <Fragment key={id}>
                <span className="col-span-1 font-medium">
                  {index > 0 ? '+' : ''}
                </span>
                <span className="font-semibold col-span-5 place-self-end grid grid-cols-14 gap-[0.5px]">
                  {(byte / 256 ** (index + 1))
                    .toFixed(12)
                    .split('')
                    .map((char, charIndex) => (
                      <div
                        className="place-self-center"
                        key={generateUniqueId('char', char, charIndex, byte)}
                      >
                        {char}
                      </div>
                    ))}
                </span>
                <span className="text-neutral-weak col-span-5 place-self-end tracking-wider">
                  {`(${Array((3 - (byte.toString().length % 3)) % 3)
                    .fill('0')
                    .join('')}${byte} / (256 ^ ${index + 1}))`}
                </span>
              </Fragment>
            ))}
            <span className="col-span-1 font-medium">=</span>
            <span className="font-semibold col-span-5 place-self-end grid grid-cols-14 gap-[0.5px]">
              {outcome
                .toFixed(12)
                .split('')
                .map((char, charIndex) => (
                  <div
                    className="place-self-center"
                    key={generateUniqueId('outcome-char', char, charIndex)}
                  >
                    {char}
                  </div>
                ))}
            </span>
            <span className="text-neutral-weak col-span-5 place-self-end tracking-wider">
              (&#215; 10001)
            </span>
            <span className="col-span-1 font-medium">=</span>
            <span className="font-semibold col-span-5 place-self-start tracking-widest">
              {String(outcome * 10001).split('.')[0]}
              <span className="text-neutral-weak">
                .{String(outcome * 10001).split('.')[1]}
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DiceResultBreakdown;
