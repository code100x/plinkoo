import { useState } from 'react';
import { useAudio } from '@/common/hooks/useAudio';
import tick from '@/assets/audio/tick.mp3';
import useDiceStore from '../store/diceStore';

export function useSliderValue(): {
  handleValueChange: (value: number[]) => void;
} {
  const { setTarget } = useDiceStore();
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const { playThrottled: playTickSound } = useAudio(tick, 0.8);

  const handleValueChange = (value: number[]): void => {
    const newValue = value[0];

    if (previousValue === newValue) return;

    if (previousValue !== null) {
      playSoundForRange(previousValue, newValue);
    }

    setPreviousValue(newValue);
    setTarget(newValue);
  };

  const playSoundForRange = (start: number, end: number): void => {
    const lowerBound = Math.min(start, end);
    const upperBound = Math.max(start, end);

    for (let i = lowerBound; i <= upperBound; i++) {
      playTickSound();
    }
  };

  return { handleValueChange };
}
