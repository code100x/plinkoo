import type { UseMutateFunction } from '@tanstack/react-query';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import type {
  DicePlaceBetRequestBody,
  DicePlaceBetResponse,
} from '@repo/common/game-utils/dice/types.js';
import type { ApiResponse } from '@repo/common/types';
import { placeBet } from '@/api/games/dice';
import { useAudio } from '@/common/hooks/useAudio';
import win from '@/assets/audio/win.mp3';

interface UseDiceBettingProps {
  setResult: (result: DicePlaceBetResponse) => void;
  setLastResultId: (id: string) => void;
}

interface UseDiceBettingResult {
  mutate: UseMutateFunction<
    ApiResponse<DicePlaceBetResponse>,
    Error,
    DicePlaceBetRequestBody
  >;
  isPending: boolean;
}

export function useDiceBetting({
  setResult,
  setLastResultId,
}: UseDiceBettingProps): UseDiceBettingResult {
  const { play: playWinSound } = useAudio(win);
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: placeBet,
    onSuccess: (response: ApiResponse<DicePlaceBetResponse>) => {
      setLastResultId(Date.now().toString());
      setResult(response.data);
      queryClient.setQueryData(['balance'], () => response.data.balance);
      if (response.data.payoutMultiplier > 0) {
        void playWinSound();
      }
    },
  });

  return {
    mutate,
    isPending,
  };
}
