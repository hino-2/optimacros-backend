import { WithId } from 'mongodb';
import { ICrudRepository } from '../interfaces';

export interface IUser {
  email: string;
  password: string;
}

export interface IUserDocument extends WithId<IUser> {}

export interface IUsersRepository extends ICrudRepository<IUser> {}
