import { motion, useAnimation } from 'motion/react';
import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { cn } from '@/lib/utils';
import useRouletteStore from '../store/rouletteStore';

const normalizeAngle = (angle: number): number => ((angle % 360) + 360) % 360;

const rouletteWheelNumbers = [
  '0',
  '32',
  '15',
  '19',
  '4',
  '21',
  '2',
  '25',
  '17',
  '34',
  '6',
  '27',
  '13',
  '36',
  '11',
  '30',
  '8',
  '23',
  '10',
  '5',
  '24',
  '16',
  '33',
  '1',
  '20',
  '14',
  '31',
  '9',
  '22',
  '18',
  '29',
  '7',
  '28',
  '12',
  '35',
  '3',
  '26',
];

function RouletteWheel({
  isSpinning,
  winningNumber,
  isPreview = false,
}: {
  isSpinning: boolean;
  winningNumber: string | null;
  isPreview?: boolean;
}): JSX.Element {
  const selectedNumber = winningNumber || '0';
  const radius = 202;
  const angleStep = 360 / 37;
  const textRadius = radius - 25; // Move text inward
  const textOffset = 15; // Small shift left/right inside the segment
  const selectedIndex = rouletteWheelNumbers.indexOf(selectedNumber);
  const rotationOffset =
    selectedIndex !== -1 ? -(selectedIndex * angleStep) + 90 : 0;

  const rotationAngle = normalizeAngle(rotationOffset);

  const controls = useAnimation();
  const { setIsRouletteWheelStopped } = useRouletteStore();
  useEffect(() => {
    if (isSpinning && !isPreview)
      void controls.start({
        rotate: [rotationAngle, rotationAngle + 360],
        transition: { repeat: Infinity, duration: 1, ease: 'linear' },
      });
  }, [controls, isSpinning, rotationAngle, isPreview]);

  useEffect(() => {
    if (winningNumber && !isPreview) {
      controls.stop();
      void controls
        .start({
          rotate: [rotationAngle, rotationAngle + 360],
          transition: { duration: 1, ease: 'easeOut' },
        })
        .then(() => {
          setIsRouletteWheelStopped(true);
        });
    }
  }, [
    controls,
    rotationAngle,
    setIsRouletteWheelStopped,
    winningNumber,
    isPreview,
  ]);

  return (
    <div className="relative w-96 h-96">
      {/* The fixed arrow that doesn't rotate with the wheel */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 translate-y-[20%] z-50 rotate-90">
        <img
          alt="Roulette Wheel Arrow"
          className="size-24"
          src="/games/roulette/roulette-wheel-arrow.svg"
        />
      </div>

      <motion.div
        animate={isPreview ? undefined : controls}
        className="absolute top-0 left-0 w-full h-full flex items-center justify-center border rounded-full"
        style={
          isPreview
            ? {
                rotate: rotationAngle,
              }
            : {}
        }
      >
        {/* Inner Circle (Clipping Center) */}
        <div className="absolute w-80 h-80 rounded-full bg-opacity-50 backdrop-blur-lg shadow-lg backdrop-opacity-20 z-20" />

        <div className="absolute w-64 h-64 rounded-full border bg-brand-weakest z-20 flex items-center justify-center" />

        {/* Segments */}
        {Array.from({ length: 37 }, (_, i) => {
          const rotation = i * angleStep;

          return (
            <div
              className={cn('absolute w-full h-full', {
                'bg-roulette-black': i % 2 === 0,
                'bg-roulette-red': i % 2 !== 0,
                'bg-roulette-green': i === 0,
              })}
              key={i}
              style={{
                clipPath: `polygon(
                  50% 50%,
                  ${50 + 50 * Math.cos(((rotation - angleStep / 2) * Math.PI) / 180)}% 
                  ${50 + 50 * Math.sin(((rotation - angleStep / 2) * Math.PI) / 180)}%,
                  ${50 + 50 * Math.cos(((rotation + angleStep / 2) * Math.PI) / 180)}% 
                  ${50 + 50 * Math.sin(((rotation + angleStep / 2) * Math.PI) / 180)}%
                )`,
              }}
            />
          );
        })}

        {/* Numbers */}
        {rouletteWheelNumbers.map((number, i) => {
          const angle = (i - 0.5) * angleStep; // Offset to center of segment
          const radian = (angle * Math.PI) / 180;
          const x = textRadius * Math.cos(radian);
          const y = textRadius * Math.sin(radian);

          // Shift perpendicular to the spoke direction
          const shiftX = textOffset * Math.cos((angle + 90) * (Math.PI / 180));
          const shiftY = textOffset * Math.sin((angle + 90) * (Math.PI / 180));

          return (
            <div
              className="absolute text-white text-sm font-bold"
              key={`num-${number}`}
              style={{
                transform: `translate(${x + shiftX}px, ${y + shiftY}px) rotate(${angle + 270}deg)`,
                transformOrigin: 'center',
              }}
            >
              {number}
            </div>
          );
        })}
      </motion.div>
    </div>
  );
}

export default RouletteWheel;
