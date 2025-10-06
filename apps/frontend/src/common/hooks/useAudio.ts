import { useCallback, useRef, useState } from 'react';
import throttle from 'lodash/throttle';

const useAudio = (
  audioSrc: string,
  volume = 1
): {
  isPlaying: boolean;
  play: () => Promise<void>;
  playThrottled: () => void;
  playInfinite: () => void;
  pause: () => void;
  stop: () => void;
  setVolume: (volume: number) => void;
  setCurrentTime: (time: number) => void;
} => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(new Audio(audioSrc));

  const playThrottledRef = useRef(
    throttle(() => {
      const audio = new Audio(audioSrc);
      audio.volume = volume;
      audio
        .play()
        .then(() => {
          setIsPlaying(true);
          audio.onended = () => {
            setIsPlaying(false);
          };
        })
        .catch((error: Error) => {
          return error;
        });
    }, 2)
  );

  const play = async (): Promise<void> => {
    return new Promise<void>((resolve, reject) => {
      const audio = new Audio(audioSrc);
      audio.volume = volume;

      audio
        .play()
        .then(() => {
          setIsPlaying(true);
          audio.onended = () => {
            setIsPlaying(false);
            resolve();
          };
        })
        .catch((error: Error) => {
          reject(error);
        });
    });
  };

  const playInfinite = useCallback((): void => {
    const audio = audioRef.current;
    audio.loop = true;
    audio.volume = volume;
    audio
      .play()
      .then(() => {
        setIsPlaying(true);
      })
      .catch((error: Error) => {
        return error;
      });
  }, [volume]);

  const playThrottled = (): void => {
    playThrottledRef.current();
  };

  const pause = (): void => {
    audioRef.current.pause();
    setIsPlaying(false);
  };

  const stop = useCallback((): void => {
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
    audioRef.current.loop = false;
    setIsPlaying(false);
  }, []);

  const setVolume = (newVolume: number): void => {
    audioRef.current.volume = newVolume;
  };

  const setCurrentTime = (time: number): void => {
    audioRef.current.currentTime = time;
  };

  return {
    isPlaying,
    play,
    playThrottled,
    playInfinite,
    pause,
    stop,
    setVolume,
    setCurrentTime,
  };
};

export { useAudio };
