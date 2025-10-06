import { useEffect } from 'react';
import bet from '@/assets/audio/bet.mp3';
import rolling from '@/assets/audio/rolling.mp3';
import { useAudio } from '@/common/hooks/useAudio';

export function useDiceAudio(isPending: boolean): {
  playBetSound: () => Promise<void>;
} {
  const { play: playBetSound } = useAudio(bet);
  const { playInfinite: playRollingSound, stop: stopRollingSound } =
    useAudio(rolling);

  useEffect(() => {
    if (isPending) {
      playRollingSound();
    } else {
      stopRollingSound();
    }

    return () => {
      stopRollingSound();
    };
  }, [isPending, playRollingSound, stopRollingSound]);

  return {
    playBetSound,
  };
}
