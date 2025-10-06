import type { Request, Response } from 'express';
import type {
  RouletteBet,
  RoulettePlaceBetResponse,
} from '@repo/common/game-utils/roulette/index.js';
import { StatusCodes } from 'http-status-codes';
import { ApiResponse } from '@repo/common/types';
import { calculatePayout, spinWheel } from './roulette.service';
import {
  createBetTransaction,
  minorToAmount,
  amountToMinor,
} from '../../../utils/bet.utils';
import { formatGameResponse } from '../../../utils/game.utils';

export const placeBetAndSpin = async (
  request: Request,
  res: Response<ApiResponse<RoulettePlaceBetResponse>>
): Promise<void> => {
  const { bets } = request.body as { bets: RouletteBet[] };

  const { userInstance, betAmountInCents } = request.validatedBet!;

  const winningNumber = await spinWheel(userInstance);

  const payout = calculatePayout(bets, winningNumber);

  const gameState = {
    bets,
    winningNumber: String(winningNumber),
  };

  const payoutInCents = Math.round(payout * 100);

  const transaction = await createBetTransaction({
    betAmount: betAmountInCents,
    userInstance,
    game: 'roulette',
    gameState,
    payoutAmount: payoutInCents, // Convert to dollars
    active: false,
  });

  const response = formatGameResponse(
    {
      gameState,
      payout: minorToAmount(payoutInCents),
      payoutMultiplier: payoutInCents / betAmountInCents,
    },
    transaction,
    amountToMinor(betAmountInCents)
  );

  res.status(StatusCodes.OK).json(
    new ApiResponse(StatusCodes.OK, {
      id: transaction.bet.id,
      state: gameState,
      payoutMultiplier: response.payoutMultiplier,
      payout: response.payout,
      balance: response.balance,
    })
  );
};
