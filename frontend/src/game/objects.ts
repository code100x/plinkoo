import { HEIGHT, NUM_SINKS, WIDTH, obstacleRadius, sinkWidth } from "./constants";
import { pad } from "./padding";

export interface Obstacle {
    x: number;
    y: number;
    radius: number;
}

export interface Sink {
    x: number;
    y: number;
    width: number;
    height: number;
    multiplier?: number;
}

const LOW_MULTIPLIERS: {[ key: number ]: number} = {
    1: 16,
    2: 9,
    3: 2,
    4: 1.4,
    5: 1.4,
    6: 1.2,
    7: 1.1,
    8: 1,
    9: 0.5,
    10: 1,
    11: 1.1,
    12: 1.2,
    13: 1.4,
    14: 1.4,
    15: 2,
    16: 9,
    17: 16
}
const MED_MULTIPLIERS: {[ key: number ]: number} = {
    1: 110,
    2: 41,
    3: 10,
    4: 5,
    5: 3,
    6: 1.5,
    7: 1,
    8: 0.5,
    9: 0.3,
    10: 0.5,
    11: 1,
    12: 1.5,
    13: 3,
    14: 5,
    15: 10,
    16: 41,
    17: 110
}
const HIGH_MULTIPLIERS: {[ key: number ]: number} = {
    1: 1000,
    2: 130,
    3: 26,
    4: 9,
    5: 4,
    6: 2,
    7: 0.2,
    8: 0.2,
    9: 0.2,
    10: 0.2,
    11: 0.2,
    12: 2,
    13: 4,
    14: 9,
    15: 26,
    16: 130,
    17: 1000
}

export const createObstacles = (): Obstacle[] => {
    const obstacles: Obstacle[] = [];
    const rows = 18;
    for (let row = 2; row < rows; row++) {
        const numObstacles = row + 1;
        const y = 0 + row * 35;
        const spacing = 36;
        for (let col = 0; col < numObstacles; col++) {
            const x = WIDTH / 2 - spacing * (row / 2 - col);
            obstacles.push({x: pad(x), y: pad(y), radius: obstacleRadius });
        }   
    }
    return obstacles;
}

export const createSinks = (type:string): Sink[] => {
    const sinks = [];
    const SPACING = obstacleRadius * 2;

    for (let i = 0; i < NUM_SINKS; i++) {
      const x = WIDTH / 2 + sinkWidth * (i - Math.floor(NUM_SINKS/2)) - SPACING * 1.5;
      const y = HEIGHT - 170;
      const width = sinkWidth;
      const height = width;
      if(type == "Low")sinks.push({ x, y, width, height, multiplier: LOW_MULTIPLIERS[i+1] });
      else if(type == "Medium"){
        sinks.push({ x, y, width, height, multiplier: MED_MULTIPLIERS[i+1] })
      }
      else{
        sinks.push({ x, y, width, height, multiplier: HIGH_MULTIPLIERS[i+1] })
      }
    }

    return sinks;
}
