import { useEffect, useRef, useState } from "react";
import { BallManager } from "../game/classes/BallManager";
import axios from "axios";
import { Button } from "../components/ui";
import { baseURL } from "../utils";
import { GameBalancer} from "../components";

export function Game() {
  const [ballManager, setBallManager] = useState<BallManager>();
  const [rows, setRows] = useState(18)
  const canvasRef = useRef<any>();

  useEffect(() => {
    if (canvasRef.current) {
      const ballManager = new BallManager(
        canvasRef.current as unknown as HTMLCanvasElement,
        rows
      );
      setBallManager(ballManager);
    }
  }, [canvasRef, rows]);



  return (
    <div className="flex flex-col lg:flex-row items-center justify-center">
      <div className="flex flex-row bg-slate-800 h-5/9">
      <div className="bg-white w-60 flex items-center justify-center h-full">
      <GameBalancer setRows={setRows}rows={rows}/>
    </div>
      <canvas ref={canvasRef} width="800" height="800"></canvas>
      </div>
      <Button
        className="px-10 mb-4"
        onClick={async () => {
          const response = await axios.post(`${baseURL}/game`, {
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
