import type { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ApiResponse } from '@repo/common/types';

const notFoundMiddleware = (_: Request, res: Response) => {
  res
    .status(StatusCodes.BAD_REQUEST)
    .send(new ApiResponse(StatusCodes.BAD_REQUEST, {}, 'Route does not exist'));
};

export default notFoundMiddleware;
