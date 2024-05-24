import Joi from 'joi';
import { NextFunction, Request, Response } from 'express';

export class UsersValidator {
  public static getByEmail = (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    const schema = Joi.object().keys({
      email: Joi.string().required(),
    });

    const { value, error } = schema.validate(req.params);

    if (error) {
      next(new Error(error.annotate(true)));
    }

    res.locals.params = value.email;

    next();
  };

  public static create = (req: Request, res: Response, next: NextFunction) => {
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

  public static delete = (req: Request, res: Response, next: NextFunction) => {
    const schema = Joi.object().keys({
      email: Joi.string().required(),
    });

    const { value, error } = schema.validate(req.params);

    if (error) {
      next(new Error(error.annotate(true)));
    }

    res.locals.params = value;

    next();
  };
}
