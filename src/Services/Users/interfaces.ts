import { IUserDocument } from '../../DB/Users/interfaces';
import { ICrudService } from '../interfaces';

export interface IUsersService extends ICrudService<IUserDocument> {
  getByEmail: (email: string, withPassword?: boolean) => Promise<IUserDocument>;
}
