import { Request, Response, Router } from 'express';
import { IExpressController } from '../interfaces';
import { AuthValidator } from './validator';
import { IAuthService } from '../../Services/Auth/interfaces';
import { okResp, failResp } from '../helpers';

export class AuthController implements IExpressController {
  public readonly path = '/auth';

  public readonly router: Router;

  private authService: IAuthService;

  public constructor(authService: IAuthService) {
    this.authService = authService;
    this.router = Router();

    this.initRoutes();
  }

  private initRoutes() {
    this.router.post('/', AuthValidator.getToken, this.getToken);
  }

  private getToken = async (req: Request, res: Response) => {
    try {
      const { email, password } = res.locals.params;

      const token = await this.authService.authenticate(email, password);

      console.log('token', token);

      res
        .status(token ? 200 : 400)
        .json(okResp(token))
        .end();
    } catch (error) {
      res.status(500).json(failResp(error)).end();
    }
  };
}
