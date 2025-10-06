import type { User } from '@prisma/client';
import type {
  DiceCondition,
  DicePlaceBetResponse,
} from '@repo/common/game-utils/dice/types.js';
import type { Request, Response } from 'express';
import { ApiResponse } from '@repo/common/types';
import { StatusCodes } from 'http-status-codes';
import { getResult } from './dice.service';
import { createBetTransaction, minorToAmount } from '../../../utils/bet.utils';
import {
  formatGameResponse,
  validateGameInput,
} from '../../../utils/game.utils';

interface DiceRequestBody {
  target: number;
  condition: DiceCondition;
  betAmount: number;
}

export const placeBet = async (
  req: Request,
  res: Response<ApiResponse<DicePlaceBetResponse>>
) => {
  const { target, condition, betAmount } = req.body as DiceRequestBody;

  // Get validated bet data from middleware
  const validatedBet = req.validatedBet!;
  const { userInstance, betAmountInCents } = validatedBet;

  // Validate game-specific input
  validateGameInput('dice', { target, condition });

  // Generate game result
  const result = getResult({ userInstance, target, condition });

  // Calculate payout
  const { payoutMultiplier } = result;
  const payoutInCents =
    payoutMultiplier > 0 ? Math.round(betAmountInCents * payoutMultiplier) : 0;

  // Create bet transaction using utility
  const transaction = await createBetTransaction({
    betAmount: betAmountInCents,
    userInstance,
    game: 'dice',
    gameState: result.state,
    payoutAmount: payoutInCents, // Convert to dollars
    active: false,
  });

  // Format and send response
  const response = formatGameResponse(
    {
      gameState: result.state,
      payout: minorToAmount(payoutInCents),
      payoutMultiplier,
    },
    transaction,
    betAmount
  );

  res.status(StatusCodes.OK).json(
    new ApiResponse(StatusCodes.OK, {
      ...result,
      balance: response.balance,
      id: response.id,
      payout: response.payout,
    })
  );
};
