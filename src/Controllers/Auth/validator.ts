import Joi from 'joi';
import { NextFunction, Request, Response } from 'express';

export class AuthValidator {
  public static getToken = (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    const schema = Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    });

    const { value, error } = schema.validate(req.body);

    if (error) {
      next(new Error(error.annotate(true)));
    }

    res.locals.params = value;

    next();
  };
}
