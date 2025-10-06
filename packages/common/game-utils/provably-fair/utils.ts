import { createHash, createHmac, getRandomValues } from 'node:crypto';
import chunk from 'lodash/chunk';

export const generateRandomString = (length = 10) => {
  const array = new Uint8Array(length);
  getRandomValues(array);
  return btoa(String.fromCharCode.apply(null, Array.from(array)))
    .replace(/[^a-zA-Z0-9]/g, '') // Remove non-alphanumeric characters
    .slice(0, length); // Ensure exact length
};

export const getHashedSeed = (seed: string): string => {
  return createHash('sha256').update(seed).digest('hex');
};

export const getHmacSeed = (seed: string, message: string): string => {
  const hmac = createHmac('sha256', seed);
  hmac.update(message);
  return hmac.digest('hex');
};

export const getHmacBuffer = (seed: string, message: string): Buffer => {
  const hmac = createHmac('sha256', seed);
  hmac.update(message);
  return hmac.digest();
};

export function* byteGenerator(seed: string, message: string) {
  let currentRound = 0;
  let currentRoundCursor = 0;
  for (;;) {
    const buffer = getHmacBuffer(seed, `${message}:${currentRound}`);

    while (currentRoundCursor < 32) {
      yield Number(buffer[currentRoundCursor]);
      currentRoundCursor += 1;
    }
    currentRoundCursor = 0;
    currentRound += 1;
  }
}

export const getGeneratedFloats = ({
  count,
  seed,
  message,
}: {
  count: number;
  seed: string;
  message: string;
}): number[] => {
  const rng = byteGenerator(seed, message);

  const bytes: number[] = [];

  while (bytes.length < count * 4) {
    bytes.push(rng.next().value as number);
  }

  return chunk(bytes, 4).map(bytesChunk =>
    bytesChunk.reduce((result, value, i) => {
      const divider = 256 ** (i + 1);
      const partialResult = value / divider;
      return result + partialResult;
    }, 0)
  );
};
