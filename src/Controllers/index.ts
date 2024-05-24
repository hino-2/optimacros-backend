import { Router } from 'express';
import { HealthcheckController } from './Healthcheck/';
import { middleware } from './middleware';
import { authService, carsService, usersService } from '../Services';
import { UsersController } from './Users';
import { CarsController } from './Cars';
import { AuthController } from './Auth';

/** Controllers */
const usersController = new UsersController(usersService, middleware);
const carsController = new CarsController(carsService, middleware);
const authController = new AuthController(authService);
const healthcheckController = new HealthcheckController();

/** Router */
const mainRouter = Router();

mainRouter.use(usersController.path, usersController.router);
mainRouter.use(carsController.path, carsController.router);
mainRouter.use(authController.path, authController.router);
mainRouter.use(healthcheckController.path, healthcheckController.router);

export default mainRouter;
