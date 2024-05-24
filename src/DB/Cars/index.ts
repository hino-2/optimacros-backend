import { Collection, Db, ObjectId } from 'mongodb';
import { ICar, ICarDocument, ICarsRepository } from './interfaces';
import { IGroupByResult } from '../interfaces';

const CARS_COLLECTION_NAME = 'cars';

export class CarsRepository implements ICarsRepository {
  private db: Db;

  private collection: Collection<ICar>;

  constructor(mongoClientDb: Db) {
    this.db = mongoClientDb;
    this.collection = this.db.collection(CARS_COLLECTION_NAME);
  }

  public async create(car: ICar) {
    return this.collection.insertOne(car);
  }

  public async update(id: string, updates: Partial<ICar>) {
    return this.collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updates },
    );
  }

  public async delete(id: string) {
    await this.collection.deleteOne({ _id: new ObjectId(id) });
  }

  public async getById(id: string) {
    return this.collection.findOne({ _id: new ObjectId(id) });
  }

  public async find(filter: Partial<ICar>) {
    return this.collection.find(filter).toArray();
  }

  public async groupBy(key: keyof ICar) {
    const res = await this.collection
      .aggregate<{ _id: ObjectId; cars: ICarDocument[] }>([
        {
          $group: {
            _id: `$${key}`,
            cars: {
              $push: '$$ROOT',
            },
          },
        },
        // { $sort: { [key]: 1 } },
      ])
      .toArray();

    return res.reduce<IGroupByResult<ICarDocument>>((acc, item) => {
      acc[item._id.toString()] = item.cars;

      return acc;
    }, {});
  }

  public async deleteAll() {
    await this.collection.drop();
  }
}
