import { ICar, ICarDocument } from '../../DB/Cars/interfaces';
import { ICrudService } from '../interfaces';

export interface ICarsService extends ICrudService<ICar> {
  getByMake: (make: string) => Promise<ICarDocument[]>;
  getListsByMake: () => Promise<{ [make: string]: ICarDocument[] }>;
  deleteAll: () => Promise<void>;
}
