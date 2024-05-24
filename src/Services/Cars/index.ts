import { CarsRepository } from '../../DB/Cars';
import { ICar, ICarDocument } from '../../DB/Cars/interfaces';
import { ICarsService } from './interfaces';

export class CarsService implements ICarsService {
  private repo: CarsRepository;

  public constructor(carsRepository: CarsRepository) {
    this.repo = carsRepository;
  }

  public async update(id: string, updates: Partial<ICarDocument>) {
    const result = await this.repo.update(id, updates);

    if (!result.acknowledged) throw new Error('Failed to update a new car');

    const updatedCar = await this.getById(id);

    return updatedCar;
  }

  public async delete(id: string) {
    await this.repo.delete(id);
  }

  public async create(car: ICar) {
    const result = await this.repo.create(car);

    if (!result.acknowledged) throw new Error('Failed to create a new car');

    const newCar = await this.getById(result.insertedId.toString());

    return newCar;
  }

  public async getById(id: string) {
    return this.repo.getById(id);
  }

  public async getByMake(make: string) {
    return this.repo.find({
      // @ts-ignore
      make: new RegExp('^' + make + '$', 'i'),
    });
  }

  public async getListsByMake() {
    return this.repo.groupBy('make');
  }

  public async deleteAll() {
    return this.repo.deleteAll();
  }
}
