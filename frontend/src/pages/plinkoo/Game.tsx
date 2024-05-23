import { useEffect, useRef, useState } from "react";
import { BallManager } from "../../game/classes/BallManager.ts";
import axios from "axios";
import { Button } from "../../components/ui";

export function Game() {
  const [ballManager, setBallManager] = useState<BallManager>();
  const canvasRef = useRef<any>();
  const BACKEND_URL = import.meta.env.VITE_APP_BACKEND_URL ?? 'http://localhost:3000';

  useEffect(() => {
    if (canvasRef.current) {
      const ballManager = new BallManager(
        canvasRef.current as unknown as HTMLCanvasElement
      );
      setBallManager(ballManager);
    }
  }, [canvasRef]);

  return (
    <div className="flex flex-col lg:flex-row items-center justify-center">
      <canvas ref={canvasRef} width="800" height="800"></canvas>
      <Button
        className="px-10 mb-4"
        onClick={async () => {
          const response = await axios.post(`${BACKEND_URL}/plinkoo/game`, {
            data: 1,
          });
          if (ballManager) {
            ballManager.addBall(response.data.point);
          }
        }}
      >
        Add ball
      </Button>
    </div>
  );
}
