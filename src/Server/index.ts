import express from 'express';
import bodyParser from 'body-parser';
import { Server as HttpServer } from 'http';
import mainRouter from '../Controllers';
import { mongoClient } from '../DB';
import { GlobalMiddleware } from './Middleware/global';

export class Server {
  private app: express.Application;

  private port: number;

  public constructor() {
    this.port = Number(process.env.PORT) ?? 7777;

    this.app = express();

    this.app.use(bodyParser.json());

    this.app.use(GlobalMiddleware.globalLogging);

    this.app.use(mainRouter);

    this.app.use(GlobalMiddleware.globalErrorHandling);
  }

  public async run() {
    await mongoClient.connect();
    await mongoClient.db().command({ ping: 1 });

    const server = this.app.listen(this.port, () => {
      console.log(`Started on port ${this.port}`);
    });

    this.setShutdownHandlers(server);
  }

  private setShutdownHandlers(server: HttpServer) {
    const shutdownSignals: { [signal: string]: number } = {
      SIGHUP: 1,
      SIGINT: 2,
      SIGTERM: 15,
    };

    Object.keys(shutdownSignals).forEach((signal) => {
      process.on(signal, () => {
        this.shutdown(signal);

        server.close(() => {
          process.exit(128 + shutdownSignals[signal]);
        });
      });
    }, this);
  }

  private async shutdown(signal: string) {
    console.log(`Recieved ${signal}. Gracefully shutting down.`);
    mongoClient.close();
  }
}
