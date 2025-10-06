import { useCallback, useEffect, useState } from 'react';

export function useResultSlider(): {
  showResultSlider: boolean;
  setLastResultId: (id: string) => void;
} {
  const [showResultSlider, setShowResultSlider] = useState(false);
  const [lastResultId, setLastResultId] = useState<string | null>(null);

  const startTimer = useCallback(() => {
    setShowResultSlider(true);
    const timer = setTimeout(() => {
      setShowResultSlider(false);
    }, 3000);
    return timer;
  }, []);

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    if (lastResultId) {
      timer = startTimer();
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [lastResultId, startTimer]);

  return {
    showResultSlider,
    setLastResultId,
  };
}
