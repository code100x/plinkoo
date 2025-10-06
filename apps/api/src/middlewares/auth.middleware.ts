import type { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { UnAuthenticatedError } from '../errors';

export const isAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (!req.isAuthenticated()) {
    throw new UnAuthenticatedError(
      'You must be logged in to access this resource'
    );
  }
  next();
};
