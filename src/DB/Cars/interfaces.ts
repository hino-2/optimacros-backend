import { WithId } from 'mongodb';
import { ICrudRepository } from '../interfaces';

export interface ICar {
  make: string;
  model: string;
  year: number;
  price: number;
}

export interface ICarDocument extends WithId<ICar> {}

export interface ICarsRepository extends ICrudRepository<ICar> {
  deleteAll: () => Promise<void>;
}
