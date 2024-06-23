import {
  HEIGHT,
  WIDTH,
  ballRadius,
  obstacleRadius,
  sinkWidth,
} from "../constants";
import { Obstacle, Sink, createObstacles, createSinks } from "../objects";
import { pad, unpad } from "../padding";
import { Ball } from "./Ball";

export class BallManager {
  private balls: Ball[];
  private canvasRef: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private obstacles: Obstacle[];
  private sinks: Sink[];
  private requestId?: number;
  private onFinish?: (
    index: number,
    startX?: number,
    multiplier?: number
  ) => void;
  private stack: number[]; // Stack to store the last 6 entries

  constructor(
    canvasRef: HTMLCanvasElement,
    onFinish?: (index: number, startX?: number, multiplier?: number) => void
  ) {
    this.balls = [];
    this.canvasRef = canvasRef;
    this.ctx = this.canvasRef.getContext("2d")!;
    this.obstacles = createObstacles();
    this.sinks = createSinks();
    this.update();
    this.onFinish = onFinish;
    this.stack = [];
  }

  addBall(startX?: number, multiplier?: number) {
    const newBall = new Ball(
      startX || pad(WIDTH / 2 + 13),
      pad(50),
      ballRadius,
      "red",
      this.ctx,
      this.obstacles,
      this.sinks,
      (index) => {
        this.balls = this.balls.filter((ball) => ball !== newBall);
        this.onFinish?.(index, startX, multiplier); // Pass the multiplier to onFinish callback
      },
      multiplier
    ); // Pass the multiplier to the Ball constructor
    this.balls.push(newBall);
  }
  getLastPoints() {
    return [...this.stack]; // Return a copy of the stack
  }

  drawObstacles() {
    this.ctx.fillStyle = "white";
    this.obstacles.forEach((obstacle) => {
      this.ctx.beginPath();
      this.ctx.arc(
        unpad(obstacle.x),
        unpad(obstacle.y),
        obstacle.radius,
        0,
        Math.PI * 2
      );
      this.ctx.fill();
      this.ctx.closePath();
    });
  }

  getColor(index: number) {
    if (index < 3 || index > this.sinks.length - 3) {
      return { background: "#ff003f", color: "white" };
    }
    if (index < 6 || index > this.sinks.length - 6) {
      return { background: "#ff7f00", color: "white" };
    }
    if (index < 9 || index > this.sinks.length - 9) {
      return { background: "#ffbf00", color: "black" };
    }
    if (index < 12 || index > this.sinks.length - 12) {
      return { background: "#ffff00", color: "black" };
    }
    if (index < 15 || index > this.sinks.length - 15) {
      return { background: "#bfff00", color: "black" };
    }
    return { background: "#7fff00", color: "black" };
  }
  drawSinks() {
    const SPACING = obstacleRadius * 2;
    for (let i = 0; i < this.sinks.length; i++) {
      const sink = this.sinks[i];
      const color = this.getColor(i).background;

      // Draw rounded rectangle with drop shadow
      this.ctx.save();
      this.ctx.shadowColor = "rgba(0, 0, 0, 0.3)";
      this.ctx.shadowBlur = 5;
      this.ctx.shadowOffsetX = 2;
      this.ctx.shadowOffsetY = 2;
      this.ctx.fillStyle = color;
      this.roundedRect(
        sink.x,
        sink.y - sink.height / 2,
        sink.width - SPACING + 5,
        sink.height,
        10
      );
      this.ctx.fill();
      this.ctx.restore();

      // Calculate maximum font size to fit in the box
      const maxFontSize = Math.min(sink.width - SPACING, sink.height) * 0.8;

      // Draw text
      this.ctx.fillStyle = "white"; // Change text color to white
      this.ctx.font = `bold ${maxFontSize}px Arial`; // Set font size dynamically
      this.ctx.textAlign = "center"; // Align text to center
      this.ctx.textBaseline = "middle"; // Center vertically

      // Truncate text if too long
      const text = sink?.multiplier?.toString() + "x";
      const textWidth = this.ctx.measureText(text).width;
      if (textWidth > sink.width - SPACING) {
        // Adjust font size to fit in the box
        this.ctx.font = `bold ${
          (maxFontSize * (sink.width - SPACING)) / textWidth
        }px Arial`;
      }

      this.ctx.fillText(text, sink.x + sinkWidth / 2, sink.y); // Adjust text position
    }
  }

  roundedRect(
    x: number,
    y: number,
    width: number,
    height: number,
    radius: number
  ) {
    this.ctx.beginPath();
    this.ctx.moveTo(x + radius, y);
    this.ctx.arcTo(x + width, y, x + width, y + height, radius);
    this.ctx.arcTo(x + width, y + height, x, y + height, radius);
    this.ctx.arcTo(x, y + height, x, y, radius);
    this.ctx.arcTo(x, y, x + width, y, radius);
    this.ctx.closePath();
  }

  draw() {
    this.ctx.clearRect(0, 0, WIDTH, HEIGHT);
    this.drawObstacles();
    this.drawSinks();
    this.balls.forEach((ball) => {
      ball.draw();
      ball.update();
    });
  }

  update() {
    this.draw();
    this.requestId = requestAnimationFrame(this.update.bind(this));
  }

  stop() {
    if (this.requestId) {
      cancelAnimationFrame(this.requestId);
    }
  }
}
