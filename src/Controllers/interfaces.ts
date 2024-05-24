import { Router } from 'express';

export interface IExpressController {
  readonly path: string;
  readonly router: Router;
}
