import { WIDTH, obstacleRadius } from "../constants";
import { pad } from "../constants/padding";
import { Obstacle } from "../types/types";

export const getObstacles = (): Obstacle[] => {
    const obstacles: Obstacle[] = [];
    const rows = 18;
    for (let row = 2; row < rows; row++) {
        const numObstacles = row + 1;
        const y = 0 + row * 35;
        const spacing = 36;
        for (let col = 0; col < numObstacles; col++) {
            const x = WIDTH / 2 - spacing * (row / 2 - col);
            obstacles.push({ x: pad(x), y: pad(y), radius: obstacleRadius });
        }
    }
    return obstacles;
}