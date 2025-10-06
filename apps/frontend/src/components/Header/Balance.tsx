import { useQuery } from '@tanstack/react-query';
import { BadgeDollarSign } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { getBalance } from '@/api/balance';
import InputWithIcon from '@/common/forms/components/InputWithIcon';

function useAnimatedValue(targetValue: number): string {
  const [displayValue, setDisplayValue] = useState(targetValue);
  const animationRef = useRef<number>();

  useEffect(() => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }

    const startValue = displayValue;
    const endValue = targetValue;
    const duration = 200; // Fast 300ms animation
    const startTime = performance.now();

    const animate = (currentTime: number): void => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function for smooth animation
      const easeOut = 1 - Math.pow(1 - progress, 3);

      const currentValue = startValue + (endValue - startValue) * easeOut;
      setDisplayValue(currentValue);

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      }
    };

    if (startValue !== endValue) {
      animationRef.current = requestAnimationFrame(animate);
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [targetValue, displayValue]);

  return displayValue.toFixed(2);
}

export function Balance(): JSX.Element {
  const { data: balance } = useQuery({
    queryKey: ['balance'],
    queryFn: getBalance,
    refetchInterval: 120000,
    // Refetch every 2 minutes
  });

  const animatedBalance = useAnimatedValue(balance ?? 0);

  return (
    <InputWithIcon
      className="disabled:opacity-100 text-base font-semibold"
      disabled
      icon={<BadgeDollarSign className="text-gray-500" />}
      value={animatedBalance}
      wrapperClassName="shadow-md w-32 sm:w-48 md:w-60"
    />
  );
}
