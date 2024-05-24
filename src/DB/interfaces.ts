import { InsertOneResult, UpdateResult, WithId } from 'mongodb';

export interface IGroupByResult<G> {
  [key: string]: G[];
}

export interface ICrudRepository<T> {
  create: (entity: T) => Promise<InsertOneResult<WithId<T>>>;
  getById: (id: string) => Promise<WithId<T>>;
  update: (id: string, updates: Partial<T>) => Promise<UpdateResult<WithId<T>>>;
  delete: (id: string) => Promise<void>;
  find: (filter: Partial<T>) => Promise<WithId<T>[]>;
  groupBy: (key: keyof T) => Promise<IGroupByResult<WithId<T>>>;
}
