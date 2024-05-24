import { Request, Response, NextFunction } from 'express';
import { IAuthService } from '../Services/Auth/interfaces';
import { authService } from '../Services';

export class ControllersMiddleware {
  private authService: IAuthService;

  public constructor(authService: IAuthService) {
    this.authService = authService;
  }

  public auth = async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.headers.authorization) {
        res.status(401).json('Unauthorized').end();

        return;
      }

      const token = this.extractTokenFromHeader(req);

      const user = await this.authService.decodeToken(token);

      if (!user) {
        res.status(401).json('Unauthorized').end();

        return;
      }

      // @ts-ignore
      req[Symbol('user')] = user;

      next();
      return;
    } catch (error) {
      console.log(error);
    }

    res.status(401).json('Unauthorized').end();
  };

  private extractTokenFromHeader(req: Request): string | undefined {
    const [type, token] = req.headers.authorization?.split(' ') ?? [];

    return type === 'Bearer' ? token : undefined;
  }
}

export const middleware = new ControllersMiddleware(authService);
