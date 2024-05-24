import bcrypt from 'bcrypt';
import { UsersRepository } from '../../DB/Users';
import { IUserDocument } from '../../DB/Users/interfaces';
import { IUsersService } from './interfaces';

export class UsersService implements IUsersService {
  private repo: UsersRepository;

  public constructor(usersRepository: UsersRepository) {
    this.repo = usersRepository;
  }

  public async getByEmail(email: string, withPassword = false) {
    const user = await this.repo
      .find({ email })
      .then((users) => users[0] ?? null);

    if (user && !withPassword) delete user.password;

    return user;
  }

  public async create(user: IUserDocument) {
    const existingUser = await this.getByEmail(user.email);

    if (existingUser) throw new Error(`User ${user.email} already exists`);

    const hashedPassword = await bcrypt.hash(user.password, 10);

    const result = await this.repo.create({
      ...user,
      password: hashedPassword,
    });

    if (!result.acknowledged) throw new Error('Failed to create a new user');

    const newUser = await this.getByEmail(user.email);

    delete newUser.password;

    return newUser;
  }

  public async delete(id: string) {
    return this.repo.delete(id);
  }

  public async getById(id: string) {
    throw new Error('Not implemented');
    return {} as IUserDocument;
  }

  public async update(id: string, updates: Partial<IUserDocument>) {
    throw new Error('Not implemented');
    return {} as IUserDocument;
  }
}
