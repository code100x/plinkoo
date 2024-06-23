import { useEffect, useRef, useState } from "react";
import { BallManager } from "../game/classes/BallManager";
import axios from "axios";
import { Button } from "../components/ui";
import { baseURL } from "../utils";
import "../App.css";

export function Game() {
  const [ballManager, setBallManager] = useState<BallManager>();
  const [lastPoints, setLastPoints] = useState<number[]>([]);
  const canvasRef = useRef<any>();

  useEffect(() => {
    if (canvasRef.current) {
      const ballManager = new BallManager(
        canvasRef.current as unknown as HTMLCanvasElement,
        handleBallFinish // Pass the handleBallFinish function to BallManager
      );
      setBallManager(ballManager);
    }
  }, [canvasRef]);

  const handleAddBall = async () => {
    try {
      const response = await axios.post(`${baseURL}/game`, {
        data: 1,
      });
      if (ballManager) {
        const multiplier = response.data.multiplier;
        ballManager.addBall(response.data.point, multiplier);
      }
    } catch (error) {
      console.error("Error adding ball:", error);
    }
  };

  // Callback function to update the stack
const handleBallFinish = (index: number, startX?: number, multiplier?: number) => {
  if (multiplier !== undefined) {
      setLastPoints((prevPoints) => {
          const updatedPoints = [...prevPoints, multiplier];
          // If the stack length exceeds 6, remove the oldest entry
          if (updatedPoints.length > 6) {
              updatedPoints.shift();
          }
          return updatedPoints;
      });
  }
};


  return (
    <div className="flex flex-col lg:flex-row items-center justify-center">
      <canvas ref={canvasRef} width="800" height="800"></canvas>
      <Button className="px-10 mb-4" onClick={handleAddBall}>
        Add ball
      </Button>
      <div className="mt-4 ml-20 stack-container">
        <ul className="stack-list">
          {lastPoints.map((point, index) => (
            <li key={index} className="stack-item">
              {point}x
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
