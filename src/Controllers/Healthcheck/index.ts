import { Request, Response, Router } from 'express';
import { IExpressController } from '../interfaces';

export class HealthcheckController implements IExpressController {
  public readonly path = '/healthcheck';

  public readonly router: Router;

  public constructor() {
    this.router = Router();
    this.initRoutes();
  }

  private initRoutes() {
    this.router.get('/', this.replyOk);
  }

  private replyOk = async (req: Request, res: Response) => {
    res.status(200).end();
  };
}
