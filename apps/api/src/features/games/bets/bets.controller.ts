import type { BetData, PaginatedBetData } from '@repo/common/types';
import { ApiResponse } from '@repo/common/types';
import type { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { getBetById, getTopBets } from './bets.service';

export const getBets = async (
  req: Request,
  res: Response<ApiResponse<{ bets: PaginatedBetData[] }>>
) => {
  // Get paginated bets
  const paginatedBets = await getTopBets();

  res
    .status(StatusCodes.OK)
    .json(new ApiResponse(StatusCodes.OK, paginatedBets));
};

export const getBet = async (
  req: Request,
  res: Response<ApiResponse<{ bet: BetData | null }>>
) => {
  const { betId } = req.params;

  const bet = await getBetById(betId, req.isMyBet);

  res.status(StatusCodes.OK).json(new ApiResponse(StatusCodes.OK, { bet }));
};
