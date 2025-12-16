export class GameLoop {
  private lastTime: number = 0;
  private running: boolean = false;

  start(): void {
    this.running = true;
  }

  stop(): void {
    this.running = false;
  }
}
