import { Request, Response, Router } from 'express';
import { okResp, failResp } from '../helpers';
import { IExpressController } from '../interfaces';
import { ControllersMiddleware } from '../middleware';
import { ICarsService } from '../../Services/Cars/interfaces';
import { CarsValidator } from './validator';

export class CarsController implements IExpressController {
  public readonly path = '/cars';

  public readonly router: Router;

  private carsService: ICarsService;

  private middleware: ControllersMiddleware;

  public constructor(
    contentService: ICarsService,
    middleware: ControllersMiddleware,
  ) {
    this.carsService = contentService;
    this.middleware = middleware;

    this.router = Router();

    this.initRoutes();
  }

  private initRoutes() {
    this.router.get(
      '/:id',
      this.middleware.auth,
      CarsValidator.getById,
      this.getById,
    );

    this.router.get(
      '/make/:make',
      this.middleware.auth,
      CarsValidator.getByMake,
      this.getByMake,
    );

    this.router.get('/lists/make/', this.middleware.auth, this.getListsByMake);

    this.router.post(
      '/',
      this.middleware.auth,
      CarsValidator.create,
      this.create,
    );

    this.router.put(
      '/:id',
      this.middleware.auth,
      CarsValidator.update,
      this.update,
    );

    this.router.delete(
      '/:id',
      this.middleware.auth,
      CarsValidator.delete,
      this.delete,
    );
  }

  private getById = async (req: Request, res: Response) => {
    try {
      const car = await this.carsService.getById(res.locals?.params?.id);

      res
        .status(car ? 200 : 404)
        .json(okResp(car))
        .end();
    } catch (error) {
      res.status(500).json(failResp(error)).end();
    }
  };

  private getByMake = async (req: Request, res: Response) => {
    try {
      const { make } = res.locals?.params ?? {};

      const car = await this.carsService.getByMake(make);

      res
        .status(car ? 200 : 404)
        .json(okResp(car))
        .end();
    } catch (error) {
      res.status(500).json(failResp(error)).end();
    }
  };

  private getListsByMake = async (req: Request, res: Response) => {
    try {
      const car = await this.carsService.getListsByMake();

      res
        .status(car ? 200 : 404)
        .json(okResp(car))
        .end();
    } catch (error) {
      res.status(500).json(failResp(error)).end();
    }
  };

  private create = async (req: Request, res: Response) => {
    try {
      const newCar = await this.carsService.create(res.locals.params);

      res
        .status(newCar ? 200 : 400)
        .json(okResp(newCar))
        .end();
    } catch (error) {
      res.status(500).json(failResp(error)).end();
    }
  };

  private update = async (req: Request, res: Response) => {
    try {
      const { id, updates } = res.locals.params;

      const updatedCar = await this.carsService.update(id, updates);

      res
        .status(updatedCar ? 200 : 400)
        .json(okResp(updatedCar))
        .end();
    } catch (error) {
      res.status(500).json(failResp(error)).end();
    }
  };

  private delete = async (req: Request, res: Response) => {
    try {
      await this.carsService.delete(res.locals.params);

      res.status(200).json(okResp('OK')).end();
    } catch (error) {
      res.status(500).json(failResp(error)).end();
    }
  };
}
