import { HEIGHT, WIDTH, obstacleRadius, sinkWidth } from "./constants";
import { pad } from "./padding";
import { MULTIPLIERS_18, MULTIPLIERS_17,MULTIPLIERS_16,MULTIPLIERS_15,MULTIPLIERS_14, MULTIPLIERS_13 } from "../utils/customMultiplers";

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


export const createObstacles = (rows: number): Obstacle[] => {
    const obstacles: Obstacle[] = [];
    // const rows = 18;
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

export const createSinks = (rows:number): Sink[] => {
    const sinks = [];
    const SPACING = obstacleRadius * 2;

    let num_sinks = rows - 1;


    for (let i = 0; i < num_sinks; i++) {
      const x = WIDTH / 2 + sinkWidth * (i - Math.floor(num_sinks/2)) - SPACING * 1.5;
      const y = (HEIGHT - 170);
      const width = sinkWidth;
      const height = width;
      if(rows = 18){
          sinks.push({ x, y, width, height, multiplier: MULTIPLIERS_18[i+1] });
      }else if (rows = 17){
        sinks.push({ x, y, width, height, multiplier: MULTIPLIERS_17[i+1] });
      }else if(rows =16){
        sinks.push({ x, y, width, height, multiplier: MULTIPLIERS_16[i+1] });
      }else if(rows = 15){
        sinks.push({ x, y, width, height, multiplier: MULTIPLIERS_15[i+1] });
      }else if(rows = 14){
        sinks.push({ x, y, width, height, multiplier: MULTIPLIERS_14[i+1] });
      }else if (rows = 13){
        sinks.push({ x, y, width, height, multiplier: MULTIPLIERS_13[i+1] });
      }else if (rows = 12){
        sinks.push({ x, y, width, height, multiplier: MULTIPLIERS_14[i+1] });
      }else if(rows = 11){
        sinks.push({ x, y, width, height, multiplier: MULTIPLIERS_14[i+1] });
      }else if(rows =10){
        sinks.push({ x, y, width, height, multiplier: MULTIPLIERS_14[i+1] });
      }else if(rows  = 9){
        sinks.push({ x, y, width, height, multiplier: MULTIPLIERS_14[i+1] });
      }
    }

    return sinks;
}
