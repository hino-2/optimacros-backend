import { carsRepository, usersRepository } from '../DB';
import { AuthService } from './Auth';
import { CarsService } from './Cars';
import { UsersService } from './Users/';

export const carsService = new CarsService(carsRepository);
export const usersService = new UsersService(usersRepository);
export const authService = new AuthService(usersService);
