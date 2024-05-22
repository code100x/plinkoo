import { useEffect, useRef, useState } from "react"
import { BallManager } from "../game/classes/BallManager";
import axios from "axios";


export function Game() {
    const [ballManager, setBallManager] = useState<BallManager>();
    const canvasRef = useRef<any>();

    useEffect(() => {
        if (canvasRef.current) {
            const ballManager = new BallManager(canvasRef.current as unknown as HTMLCanvasElement,)
            setBallManager(ballManager)
        }

    }, [canvasRef])

    return (
        <div>
            <canvas ref={canvasRef} width="800" height="800"></canvas>
            <button onClick={async() => {
                const response = await axios.post("http://localhost:3000/game", {data: 1});
                if (ballManager) {
                    ballManager.addBall(response.data.point);
                }
            }}>Add ball</button>
        </div>
    )
}