import { Request, Response, Router } from 'express';
import { failResp, okResp } from '../helpers';
import { IExpressController } from '../interfaces';
import { UsersService } from '../../Services/Users';
import { ControllersMiddleware } from '../middleware';
import { UsersValidator } from './validator';

export class UsersController implements IExpressController {
  public readonly path = '/users';

  public readonly router: Router;

  private usersService: UsersService;

  private middleware: ControllersMiddleware;

  public constructor(
    usersService: UsersService,
    middleware: ControllersMiddleware,
  ) {
    this.usersService = usersService;
    this.middleware = middleware;

    this.router = Router();

    this.initRoutes();
  }

  private initRoutes() {
    this.router.get(
      '/:email',
      UsersValidator.getByEmail,
      this.middleware.auth,
      this.getUserByEmail,
    );

    this.router.post('/', UsersValidator.create, this.create);

    this.router.delete(
      '/:email',
      UsersValidator.delete,
      this.middleware.auth,
      this.delete,
    );
  }

  private getUserByEmail = async (req: Request, res: Response) => {
    try {
      const user = await this.usersService.getByEmail(res.locals.params);

      res
        .status(user ? 200 : 404)
        .json(okResp(user))
        .end();
    } catch (error) {
      res.status(500).json(failResp(error)).end();
    }
  };

  private create = async (req: Request, res: Response) => {
    try {
      const newUser = await this.usersService.create(res.locals.params);

      res
        .status(newUser ? 200 : 400)
        .json(okResp(newUser))
        .end();
    } catch (error) {
      res.status(500).json(failResp(error)).end();
    }
  };

  private delete = async (req: Request, res: Response) => {
    try {
      await this.usersService.delete(res.locals.params);

      res.status(200).json(okResp('OK')).end();
    } catch (error) {
      res.status(500).json(failResp(error)).end();
    }
  };
}
