import { Server } from './Server';

class Application {
  private server: Server;

  public constructor() {
    this.server = new Server();
  }

  public start() {
    this.server.run();
  }
}

new Application().start();
