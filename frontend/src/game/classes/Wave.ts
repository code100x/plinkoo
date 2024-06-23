export class Wave {
  private x: number;
  private y: number;
  private radius: number;
  private alpha: number;
  private ctx: CanvasRenderingContext2D;

  constructor(x: number, y: number, ctx: CanvasRenderingContext2D) {
    this.x = x;
    this.y = y;
    this.radius = 0;
    this.alpha = 1;
    this.ctx = ctx;
  }

  

  draw() {
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    this.ctx.strokeStyle = `rgba(255, 255, 255, ${this.alpha})`;
    this.ctx.lineWidth = 2;
    this.ctx.stroke();
    this.ctx.closePath();
  }

  update() {
    this.radius += 0.3;
    this.alpha -= 0.02;
  }

  isDone() {
    return this.alpha <= 0;
  }
}
