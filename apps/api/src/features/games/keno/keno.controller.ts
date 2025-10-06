import type { Request, Response } from 'express';
import type { KenoResponse } from '@repo/common/game-utils/keno/types.js';
import { KenoRequestSchema } from '@repo/common/game-utils/keno/types.js';
import { StatusCodes } from 'http-status-codes';
import { ApiResponse } from '@repo/common/types';
import { BadRequestError } from '../../../errors';
import { getResult } from './keno.service';
import { createBetTransaction, minorToAmount } from '../../../utils/bet.utils';
import { formatGameResponse } from '../../../utils/game.utils';

export const placeBet = async (
  req: Request,
  res: Response<ApiResponse<KenoResponse>>
) => {
  const parsedRequest = KenoRequestSchema.safeParse(req.body);
  if (!parsedRequest.success) {
    throw new BadRequestError('Invalid request body');
  }
  const { betAmount, selectedTiles, risk } = parsedRequest.data;

  const { betAmountInCents, userInstance } = req.validatedBet!;

  const result = getResult({ userInstance, selectedTiles, risk });

  const { payoutMultiplier } = result;

  const payoutInCents =
    payoutMultiplier > 0 ? Math.round(betAmountInCents * payoutMultiplier) : 0;

  const transaction = await createBetTransaction({
    betAmount: betAmountInCents,
    userInstance,
    game: 'keno',
    gameState: result.state,
    payoutAmount: payoutInCents, // Convert to dollars
    active: false,
  });

  const response = formatGameResponse(
    {
      gameState: result.state,
      payout: minorToAmount(payoutInCents),
      payoutMultiplier,
    },
    transaction,
    betAmount
  );

  // Update balance and create bet in a single transaction

  res.status(StatusCodes.OK).json(
    new ApiResponse(StatusCodes.OK, {
      ...result,
      balance: response.balance,
      id: response.id,
      payout: response.payout,
    })
  );
};
