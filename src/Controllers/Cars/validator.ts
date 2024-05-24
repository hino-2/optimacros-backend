import Joi from 'joi';
import { NextFunction, Request, Response } from 'express';

export class CarsValidator {
  public static getById = (req: Request, res: Response, next: NextFunction) => {
    const schema = Joi.object().keys({
      id: Joi.string().required(),
    });

    const { value, error } = schema.validate(req.params);

    if (error) {
      next(new Error(error.annotate(true)));
    }

    res.locals.params = value;

    next();
  };

  public static getByMake = (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    const schema = Joi.object().keys({
      make: Joi.string().required(),
    });

    const { value, error } = schema.validate(req.params);

    if (error) {
      next(new Error(error.annotate(true)));
    }

    res.locals.params = value;

    next();
  };

  public static create = (req: Request, res: Response, next: NextFunction) => {
    const schema = Joi.object().keys({
      year: Joi.number().greater(1900).required(),
      make: Joi.string().required(),
      model: Joi.string().required(),
      price: Joi.number().greater(-1).required(),
    });

    const { value, error } = schema.validate(req.body);

    if (error) {
      next(new Error(error.annotate(true)));
    }

    res.locals.params = value;

    next();
  };

  public static update = (req: Request, res: Response, next: NextFunction) => {
    const schema = Joi.object().keys({
      id: Joi.string().required(),
      year: Joi.number().greater(1900),
      make: Joi.string(),
      model: Joi.string(),
      price: Joi.number().greater(-1),
    });

    const { value, error } = schema.validate(
      Object.assign(req.params, req.body),
    );

    if (error) {
      next(new Error(error.annotate(true)));
    }

    const { id, ...rest } = value;

    res.locals.params = {
      id,
      updates: rest,
    };

    next();
  };

  public static delete = (req: Request, res: Response, next: NextFunction) => {
    const schema = Joi.object().keys({
      id: Joi.string().required(),
    });

    const { value, error } = schema.validate(req.params);

    if (error) {
      next(new Error(error.annotate(true)));
    }

    res.locals.params = value;

    next();
  };
}
