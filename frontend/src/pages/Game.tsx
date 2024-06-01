import { useEffect, useRef, useState } from "react";
import { BallManager } from "../game/classes/BallManager";
import axios from "axios";
import { Button } from "../components/ui";
import { baseURL } from "../utils";
import Selector from "../components/Risk";
type Option = 'Low' | 'Medium' | 'High';
export function Game() {
  const [ballManager, setBallManager] = useState<BallManager>();
  const canvasRef = useRef<any>();
  const [selectedOption, setSelectedOption] = useState<Option>('Low');
  useEffect(() => {
    if (canvasRef.current) {
      const ballManager = new BallManager(
        canvasRef.current as unknown as HTMLCanvasElement,selectedOption
      );
      setBallManager(ballManager);
    }
  }, [canvasRef,selectedOption]);

  return (
    <div className="flex flex-col lg:flex-row items-center justify-center">
      <canvas ref={canvasRef} width="800" height="800"></canvas>
      <div className=" border-black border-2 bg-zinc-800 shadow-2xl w-80 ml-10">
      <div>
        <h1 className="ml-1 text-lg font-thin">Risk</h1>
        <Selector selectedOption={selectedOption} setSelectedOption={setSelectedOption} />
      </div>
      <div className="flex justify-center">
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
     </div>
    </div>
  );
}
