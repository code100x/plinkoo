import { ApiResponse } from '@repo/common/types';
import type { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';

interface CustomError {
  statusCode: number;
  message: string;
  data?: unknown;
}

export const errorHandlerMiddleware = (
  err: Error | CustomError,
  _: Request,
  res: Response,
  __: NextFunction
) => {
  const defaultError: CustomError = {
    statusCode:
      (err as CustomError).statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    message:
      (err as CustomError).message || 'Something went wrong, try again later',
  };

  return res
    .status(defaultError.statusCode)
    .json(new ApiResponse(defaultError.statusCode, {}, defaultError.message));
};
