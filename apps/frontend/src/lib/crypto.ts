import { range } from 'lodash';
import chunk from 'lodash/chunk';

export const generateRandomString = (length = 10): string => {
  const array = new Uint8Array(length);
  return btoa(
    String.fromCharCode.apply(null, Array.from(crypto.getRandomValues(array)))
  )
    .replace(/[^a-zA-Z0-9]/g, '') // Remove non-alphanumeric characters
    .slice(0, length); // Ensure exact length
};

export const getHmacSeed = async (
  seed: string,
  message: string
): Promise<string> => {
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(seed),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  const signature = await crypto.subtle.sign(
    'HMAC',
    key,
    encoder.encode(message)
  );
  return Array.from(new Uint8Array(signature))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
};

export const getHmacBuffer = async (
  seed: string,
  message: string
): Promise<ArrayBuffer> => {
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(seed),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  return crypto.subtle.sign('HMAC', key, encoder.encode(message));
};

export async function byteGenerator(
  seed: string,
  message: string,
  rounds: number
): Promise<number[]> {
  const promises: Promise<Uint8Array>[] = [];

  for (let i = 0; i < rounds; i++) {
    promises.push(
      getHmacBuffer(seed, `${message}:${i}`).then(buf => new Uint8Array(buf))
    );
  }

  const buffers = await Promise.all(promises);
  return buffers.flatMap(buffer => Array.from(buffer));
}

export const getGeneratedFloats = async ({
  count,
  seed,
  message,
}: {
  count: number;
  seed: string;
  message: string;
}): Promise<number[]> => {
  const bytesNeeded = count * 4;
  const rounds = Math.ceil(bytesNeeded / 32); // Each HMAC buffer gives 32 bytes

  const bytes = await byteGenerator(seed, message, rounds);
  const selectedBytes = bytes.slice(0, bytesNeeded);

  return chunk(selectedBytes, 4).map(bytesChunk =>
    bytesChunk.reduce((result, value, i) => {
      const divider = 256 ** (i + 1);
      return result + value / divider;
    }, 0)
  );
};

export const getFisherYatesShuffle = ({
  gameEvents,
  stopCount,
  totalEventsPossible,
}: {
  gameEvents: number[];
  stopCount: number;
  totalEventsPossible: number;
}): { array: number[]; chosenIndex: number }[] => {
  if (gameEvents.length === 0) {
    return [];
  }
  let eventNumbers = range(totalEventsPossible);
  const outcomes = [];
  const result: { array: number[]; chosenIndex: number }[] = [
    { array: [...eventNumbers], chosenIndex: gameEvents[0] },
  ];
  for (let i = 0; i < totalEventsPossible; i++) {
    const chosenIndex = gameEvents[i];
    outcomes.push(eventNumbers[chosenIndex]);
    if (outcomes.length === stopCount) {
      break;
    }

    eventNumbers = [
      ...eventNumbers.slice(0, chosenIndex),
      ...eventNumbers.slice(chosenIndex + 1),
    ];
    result.push({
      array: [...outcomes, ...eventNumbers],
      chosenIndex: outcomes.length + gameEvents[i + 1],
    });
  }
  return result;
};
