import { Request, Response, NextFunction } from 'express';
import { failResp } from '../../Controllers/helpers';

export class GlobalMiddleware {
  public static globalLogging = (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    if (process.env.NODE_ENV === 'development') {
      console.log(`Request: ${req.method} ${req.url}`);

      if (req.body && Object.keys(req.body).length) {
        console.log('Body:', req.body);
      }
    }

    next();
  };

  public static globalErrorHandling = (
    error: any,
    req: Request,
    res: Response,
    next: NextFunction /** Do not call next 'cause this one is the last one */,
  ) => {
    console.log({ error });
    res.status(500).json(failResp(error)).end();
  };
}
