import { WithId } from 'mongodb';

export interface ICrudService<T> {
  create: (entitry: T) => Promise<WithId<T>>;
  getById: (id: string) => Promise<WithId<T>>;
  update: (id: string, updates: Partial<T>) => Promise<WithId<T>>;
  delete: (id: string) => Promise<void>;
}
