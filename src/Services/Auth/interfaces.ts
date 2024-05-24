import { ObjectId } from 'mongodb';
import { IUserDocument } from '../../DB/Users/interfaces';

export interface IAuthService {
  authenticate: (
    email: string,
    password: string,
  ) => Promise<{ accessToken: string }>;
  decodeToken: (token: string) => Promise<IUserDocument>;
}

export interface IJWTPayload {
  sub: string;
  id: ObjectId;
  exp: number;
}

export const MINUTE = 1000 * 60;
export const HOUR = 60 * MINUTE;
export const DAY = 24 * HOUR;
export const MONTH = 30 * DAY;
