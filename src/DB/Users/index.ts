import { Collection, Db, ObjectId, UpdateResult } from 'mongodb';
import { IUser, IUserDocument, IUsersRepository } from './interfaces';

const USERS_COLLECTION_NAME = 'users';

export class UsersRepository implements IUsersRepository {
  private db: Db;

  private collection: Collection<IUser>;

  constructor(mongoClientDb: Db) {
    this.db = mongoClientDb;
    this.collection = this.db.collection(USERS_COLLECTION_NAME);
  }

  public async create(user: IUser) {
    return this.collection.insertOne(user);
  }

  public async delete(id: string) {
    await this.collection.deleteOne({ _id: new ObjectId(id) });
  }

  public async find(filter: Partial<IUser>) {
    return this.collection.find(filter).toArray();
  }

  public async getById(id: string) {
    throw new Error('Not implemented');
    return {} as IUserDocument;
  }

  public async update(id: string, updates: Partial<IUser>) {
    throw new Error('Not implemented');
    return {} as UpdateResult<IUserDocument>;
  }

  public async groupBy(field: keyof IUser) {
    throw new Error('Not implemented');
    return {};
  }
}
