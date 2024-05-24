import path from 'path';
import fs from 'fs';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { IUsersService } from '../Users/interfaces';
import { IAuthService, IJWTPayload, MONTH } from './interfaces';
import { IUserDocument } from '../../DB/Users/interfaces';

export class AuthService implements IAuthService {
  private usersService: IUsersService;

  private secret: string;

  public constructor(usersService: IUsersService) {
    this.usersService = usersService;

    this.secret = fs
      .readFileSync(path.join('secrets', 'jwt_secret_key.txt'))
      .toString();
  }

  public async authenticate(email: string, password: string) {
    const user = await this.usersService.getByEmail(email, true);

    if (!user) throw new Error(`User ${email} not found`);

    const isAuthenticated = await bcrypt.compare(password, user.password);

    if (!isAuthenticated) throw new Error(`Authentication failed`);

    return {
      accessToken: jwt.sign(this.makePayload(user), this.secret, {
        algorithm: 'HS256',
      }),
    };
  }

  public async decodeToken(token: string) {
    if (!token) return null;

    try {
      let payload = jwt.verify(token, this.secret, { algorithms: ['HS256'] });

      if (typeof payload === 'string') {
        payload = JSON.parse(payload);
      }

      const email = String(payload.sub);

      const user = await this.usersService.getByEmail(email);

      return user as IUserDocument;
    } catch {
      throw new Error(`Authorization failed`);
    }
  }

  private makePayload(user: IUserDocument): IJWTPayload {
    return {
      sub: user.email,
      id: user._id,
      exp: new Date().getTime() + MONTH,
    };
  }
}
