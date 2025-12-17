export class GameLoop {
  lastTime = 0;
  running = false;

  start() {
    this.running = true;
  }

  stop() {
    this.running = false;
  }
}
